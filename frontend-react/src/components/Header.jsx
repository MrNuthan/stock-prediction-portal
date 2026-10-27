import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faArrowRightFromBracket, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../AuthProvider'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link className="site-brand" to="/" aria-label="Stock Prediction Portal Home">
          <div className="brand-icon-wrapper">
            <FontAwesomeIcon icon={faChartLine} className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">
              Stock Prediction <span className="brand-highlight">Portal</span>
            </span>
            <span className="brand-badge">LSTM ANALYTICS</span>
          </div>
        </Link>

        <nav className="header-nav" aria-label="Main Navigation">
          {isLoggedIn ? (
            <div className="nav-actions">
              <Link to="/dashboard" className="btn-nav btn-nav-dashboard">
                <FontAwesomeIcon icon={faChartSimple} className="me-2" />
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogout} className="btn-nav btn-nav-logout" type="button" aria-label="Sign out of account">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="nav-actions">
              <Link to="/login" className="btn-nav btn-nav-login">
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="btn-nav btn-nav-register">
                <span>Create Account</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header