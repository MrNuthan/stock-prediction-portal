import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSpinner, 
  faChartLine, 
  faUser, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faCircleExclamation,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../axiosInstance'
import { AuthContext } from '../AuthProvider'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const userData = { username: username.trim(), password }

    try {
      const response = await axiosInstance.post('/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid username or password. Please try again.')
      } else if (!err.response) {
        setError('Unable to reach the server. Please check your network connection.')
      } else {
        setError('An unexpected error occurred during sign in. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="auth-card">
              <div className="auth-card-header text-center">
                <div className="auth-brand-badge mx-auto">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to access your stock analytics dashboard.</p>
              </div>

              {error && (
                <div className="auth-alert auth-alert-danger" role="alert">
                  <FontAwesomeIcon icon={faCircleExclamation} className="alert-icon" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} noValidate>
                <div className="form-group mb-3">
                  <label htmlFor="login-username" className="form-label">
                    Username
                  </label>
                  <div className="input-group-modern">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      id="login-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      className="form-control-modern"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="login-password" className="form-label mb-0">
                      Password
                    </label>
                  </div>
                  <div className="input-group-modern">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="form-control-modern"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-action-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-auth-submit w-100"
                  disabled={loading || !username || !password}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="auth-card-footer text-center mt-4">
                <p className="auth-footer-text">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="auth-link">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login