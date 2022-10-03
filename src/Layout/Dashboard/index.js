import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { AppLogo, BarChart, Menu, Computer, PieChart, Power, AppMenu } from 'assets/convertedSvgs';
import Container from './dashboard.styles';

const navLinks = [
  {
    icon: BarChart,
    route: '/',
    disabled: true
  },
  {
    icon: Menu,
    route: '/',
    disabled: true
  },
  {
    icon: Computer,
    route: '/users'
  },
  {
    icon: PieChart,
    route: '/report'
  },
  {
    icon: Power,
    route: '/',
    disabled: true
  }
];

const bottomNavLinks = [
  { title: 'Terms & Condition', route: '/terms&Condition' },
  { title: 'Privacy Policy', route: '/privacy-policy' }
];

const Dashboard = ({ userData, children }) => {
  const { pathname } = useLocation();
  const [showMenu, setDisplay] = useState(true);

  const renderProfileDetails = () => {
    const { firstName, lastName } = userData[0];
    return (
      <>
        <div className="profile-name">
          <p>
            {firstName[0]}
            {lastName[0]}
          </p>
        </div>
        <p>
          {firstName} {lastName}
        </p>
      </>
    );
  };

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
            onClick={() => setDisplay((s) => !s)}
          >
            <AppMenu />
          </button>
        </div>
        <div className="col-2">{userData && renderProfileDetails()}</div>
      </div>
      <div className="dashboard-row">
        <aside className="dashboard-aside">
          <nav>
            <ol>
              {navLinks &&
                navLinks.map((item, i) => (
                  <li key={`navLink-${i}`} className={item.disabled ? 'disabled-link' : ''}>
                    <NavLink to={item.route} onClick={(e) => item.disabled && e.preventDefault()}>
                      {<item.icon isActive={pathname === item.route} />}
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
  userData: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.element
};

export default Dashboard;
