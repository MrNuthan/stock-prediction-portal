import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSpinner, 
  faChartLine, 
  faUser, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faCircleExclamation, 
  faCheck,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../axiosInstance'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    const userData = {
      username: username.trim(),
      email: email.trim(),
      password
    }

    try {
      await axiosInstance.post('/register/', userData)
      setErrors({})
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      const errData = error.response?.data || { non_field_errors: ['Network error. Please try again.'] }
      setErrors(errData)
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
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Register to unlock the stock prediction and analytics terminal.</p>
              </div>

              {success && (
                <div className="auth-alert auth-alert-success" role="alert">
                  <FontAwesomeIcon icon={faCheck} className="alert-icon" />
                  <span>Registration successful! Redirecting to sign in...</span>
                </div>
              )}

              {errors.non_field_errors && (
                <div className="auth-alert auth-alert-danger" role="alert">
                  <FontAwesomeIcon icon={faCircleExclamation} className="alert-icon" />
                  <span>{Array.isArray(errors.non_field_errors) ? errors.non_field_errors.join(' ') : errors.non_field_errors}</span>
                </div>
              )}

              <form onSubmit={handleRegistration} noValidate>
                <div className="form-group mb-3">
                  <label htmlFor="register-username" className="form-label">
                    Username
                  </label>
                  <div className={`input-group-modern ${errors.username ? 'input-error' : ''}`}>
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      id="register-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      className="form-control-modern"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  {errors.username && (
                    <small className="field-error-text">
                      {Array.isArray(errors.username) ? errors.username.join(' ') : errors.username}
                    </small>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="register-email" className="form-label">
                    Email Address
                  </label>
                  <div className={`input-group-modern ${errors.email ? 'input-error' : ''}`}>
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      id="register-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="form-control-modern"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {errors.email && (
                    <small className="field-error-text">
                      {Array.isArray(errors.email) ? errors.email.join(' ') : errors.email}
                    </small>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="register-password" className="form-label">
                    Password
                  </label>
                  <div className={`input-group-modern ${errors.password ? 'input-error' : ''}`}>
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      id="register-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="form-control-modern"
                      placeholder="At least 8 characters"
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
                  {errors.password && (
                    <small className="field-error-text">
                      {Array.isArray(errors.password) ? errors.password.join(' ') : errors.password}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-auth-submit w-100"
                  disabled={loading || success || !username || !email || !password}
                >
                  {loading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="auth-card-footer text-center mt-4">
                <p className="auth-footer-text">
                  Already have an account?{' '}
                  <Link to="/login" className="auth-link">
                    Sign in here
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

export default Register