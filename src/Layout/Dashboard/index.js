import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { axios } from 'lib'
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
  const [userData, setUserData] = useState(null)
  const [showMenu, setDisplay] = useState(true)

  useEffect(() => {
    const handleGetUser = async () => {
      const { data: response } = await axios.get('/users')
      if (response?.data) {
        setUserData(response.data[0])
      }
    }
    handleGetUser()
  }, [])

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
