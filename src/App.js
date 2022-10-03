import React, { useEffect, useState } from 'react';
import { Route, useLocation, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { IconContext } from 'react-icons';
import { axios } from 'lib';
import { theme, GlobalStyle } from 'styles';
import { Reports, Users } from 'pages';
import { handleError } from 'helpers';
import { Dashboard } from 'layout';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleGetUsers = () => {
    axios
      .get('/users')
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <IconContext.Provider
          value={{
            className: 'icon',
            style: { verticalAlign: 'middle' }
          }}
        >
          <Dashboard {...{ userData }}>
            <Switch>
              <Route path={'/report'} component={Reports} />
              <Route path={'/users'}>
                <Users {...{ userData }} />
              </Route>
              <Route path={'*'}>
                <Redirect to="/report" />
              </Route>
            </Switch>
          </Dashboard>
        </IconContext.Provider>
      </SkeletonTheme>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default App;
