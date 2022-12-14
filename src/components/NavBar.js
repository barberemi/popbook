import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'

const Avatar = styled.div`
  width: 60px;
  height: 40px;
  background-image: url(${process.env.PUBLIC_URL + '/images/aude-pop.png'});
  -webkit-filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white);
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white);
  background-size: 100%;
  background-position: 0;
  background-repeat: no-repeat;
  display: inline-block;
`

const Logo = styled.div`
  width: 150px;
  height: 40px;
  background-image: url(${process.env.PUBLIC_URL + '/images/pop-book.png'});
  -webkit-filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
  filter: drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
  background-size: 100%;
  background-position: 0;
  background-repeat: no-repeat;
  display: inline-block;
`

export default function NavBar() {
  const location = useLocation()

  return (
    <header>
      <nav
        className="navbar fixed-top navbar-expand-md navbar-dark"
        style={{ backgroundColor: '#f9b337' }}
      >
        <div className="container-fluid">
          <Link to={`/`}>
            <Avatar />
            <Logo />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll text-center fs-5"
              style={{ fontFamily: 'Blomberg' }}
            >
              <li className="nav-item">
                <Link
                  to={`/`}
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                >
                  TITRES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/acquired`}
                  className={`nav-link ${
                    location.pathname === '/acquired' ? 'active' : ''
                  }`}
                >
                  ACQUIS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/soon`}
                  className={`nav-link ${
                    location.pathname === '/soon' ? 'active' : ''
                  }`}
                >
                  PROCHAINEMENT
                </Link>
              </li>
            </ul>
          </div>
          <form className="d-flex col-md-4 col-sm-12 col-12">
            <input
              className="form-control"
              type="search"
              placeholder="Rechercher titre/référence/nom de personnage..."
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </header>
  )
}
