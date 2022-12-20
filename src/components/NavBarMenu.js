import React from 'react'
import _ from 'lodash'
import { Link, useLocation } from 'react-router-dom'

export default function NavBarMenu() {
  const location = useLocation()

  return (
    <ul
      className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll text-center fs-5"
      style={{ fontFamily: 'Blomberg' }}
    >
      <li className="nav-item">
        <Link
          to={`/`}
          className={`nav-link ${
            location.pathname === '/' || _.includes(location.pathname, '/title') ? 'active' : ''
          }`}
        >
          TITRES
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/acquired`}
          className={`nav-link ${_.includes(location.pathname, '/acquired') ? 'active' : ''}`}
        >
          ACQUIS
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/wish`}
          className={`nav-link ${_.includes(location.pathname, '/wish') ? 'active' : ''}`}
        >
          SOUHAITS
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/soon`}
          className={`nav-link ${_.includes(location.pathname, '/soon') ? 'active' : ''}`}
        >
          PROCHAINEMENT
        </Link>
      </li>
    </ul>
  )
}
