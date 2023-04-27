import React from 'react'
import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

function Header(props) {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <ul className="header-list">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
        </li>
        <li>
          <ul className="header-ul">
            <Link to="/" className="header-link">
              <li>Home</li>
            </Link>
            <Link to="/jobs" className="header-link">
              <li>Jobs</li>
            </Link>
          </ul>
        </li>
        <li>
          <button onClick={onClickLogout} className="header-logout">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
