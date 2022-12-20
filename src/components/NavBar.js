import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import NavBarMenu from './NavBarMenu'
import ResultBar from './ResultBar'
import SearchForm from './SearchForm'

const Navigation = styled.nav`
  background-color: #f9b337;
  box-shadow: 0 10px 20px rgb(0 0 0 / 0.3);
`

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
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <header>
      <Navigation className="navbar fixed-top navbar-expand-md navbar-dark">
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
            <NavBarMenu />
          </div>
          <SearchForm setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          <ResultBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
      </Navigation>
    </header>
  )
}
