import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ url, text, class: legacyClass, className = '', children, icon, type = 'button', onClick, disabled = false, ...rest }) => {
  const combinedClass = `btn ${legacyClass || ''} ${className}`.trim()

  if (url) {
    return (
      <Link className={combinedClass} to={url} {...rest}>
        {icon && <span className="btn-icon">{icon}</span>}
        {text || children}
      </Link>
    )
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} disabled={disabled} {...rest}>
      {icon && <span className="btn-icon">{icon}</span>}
      {text || children}
    </button>
  )
}

export default Button