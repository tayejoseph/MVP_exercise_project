import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  AppLogo,
  BarChart,
  Menu,
  Computer,
  PieChart,
  Power,
  AppMenu,
} from 'assets/convertedSvgs'
import Container from './Dashboard.styles'

const navLinks = [
  {
    icon: <BarChart />,
    route: '/',
  },
  {
    icon: <Menu />,
    route: '/',
  },
  {
    icon: <Computer />,
    route: '/',
  },
  {
    icon: <PieChart />,
    route: '/',
  },
  {
    icon: <Power />,
    route: '/',
  },
]

const bottomNavLinks = [
  { title: 'Terms & Condition', route: '/terms&Condition' },
  { title: 'Privacy Policy', route: '/privacy-policy' },
]
const Dashboard = ({ children }) => {
  return (
    <Container>
      <div className="dashboard-top_nav">
        <div className="col-1">
          <Link to="/" className="brand-logo">
            <AppLogo />
          </Link>
          <button aria-label="menu" className="menu-btn">
            <AppMenu />
          </button>
        </div>
        <div className="col-2">
          <div className="profile-name">
            <p>JD</p>
          </div>
          <p>John Doe</p>
        </div>
      </div>
      <div className="dashboard-row">
        <aside className="dashboard-aside">
          <nav>
            <ol>
              {navLinks &&
                navLinks.map((item, i) => (
                  <li key={`navLink-${i}`}>
                    <NavLink to={item.route}>{item.icon}</NavLink>
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
  )
}

export default Dashboard
