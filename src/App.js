import React, { useEffect } from 'react'
import { Route, useLocation, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { SkeletonTheme } from 'react-loading-skeleton'
import { IconContext } from 'react-icons'
import theme from 'base/theme'
import { Reports } from 'Views'
import GlobalStyle from 'base/globalStyles'
import { Dashboard } from 'Layout'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <IconContext.Provider
          value={{
            className: 'icon',
            style: { verticalAlign: 'middle' },
          }}
        >
          <Dashboard>
            <Switch>
              <Route path={'/report'} component={Reports} />
              <Route path={'*'}>
                <Redirect to="/report" />
              </Route>
            </Switch>
          </Dashboard>
        </IconContext.Provider>
      </SkeletonTheme>
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default App
