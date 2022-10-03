import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { axios } from 'lib';
import { handleError } from 'helpers';
import { AppLogo, BarChart, Menu, Computer, PieChart, Power, AppMenu } from 'assets/convertedSvgs';
import Container from './Dashboard.styles';

const navLinks = [
  {
    icon: <BarChart />,
    route: '/',
    disabled: true
  },
  {
    icon: <Menu />,
    route: '/',
    disabled: true
  },
  {
    icon: <Computer />,
    route: '/',
    disabled: true
  },
  {
    icon: <PieChart />,
    route: '/report'
  },
  {
    icon: <Power />,
    route: '/',
    disabled: true
  }
];

const bottomNavLinks = [
  { title: 'Terms & Condition', route: '/terms&Condition' },
  { title: 'Privacy Policy', route: '/privacy-policy' }
];

const Dashboard = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [showMenu, setDisplay] = useState(true);

  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch(handleError);
  }, []);

  return (
    <Container showMenu={showMenu}>
      <div className="dashboard-top_nav">
        <div className="col-1">
          <Link to="/" className="brand-logo">
            <AppLogo />
          </Link>
          <button
            aria-label={showMenu ? 'hide menu' : 'show menu'}
            className="menu-btn"
            onClick={() => setDisplay((s) => !s)}>
            <AppMenu />
          </button>
        </div>
        <div className="col-2">
          {userData && (
            <>
              <div className="profile-name">
                <p>
                  {userData.firstName[0]}
                  {userData.lastName[0]}
                </p>
              </div>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="dashboard-row">
        <aside className="dashboard-aside">
          <nav>
            <ol>
              {navLinks &&
                navLinks.map((item, i) => (
                  <li key={`navLink-${i}`} className={item.disabled ? 'disabled-link' : ''}>
                    <NavLink to={item.route} onClick={(e) => item.disabled && e.preventDefault()}>
                      {item.icon}
                    </NavLink>
                  </li>
                ))}
            </ol>
          </nav>
        </aside>
        <main className="dashboard-main">{children}</main>

        <footer className="dashboard-footer">
          <nav>
            <ol>
              {bottomNavLinks &&
                bottomNavLinks.map((item, i) => (
                  <li key={`bottomNav-${i}`}>
                    <NavLink to={item.route}>{item.title}</NavLink>
                  </li>
                ))}
            </ol>
          </nav>
        </footer>
      </div>
    </Container>
  );
};

Dashboard.propTypes = {
  children: PropTypes.element
};

export default Dashboard;
