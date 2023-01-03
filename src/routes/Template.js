import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import charactersJson from './../datasources/characters.json'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Template() {
  const [wishAndAcquired, setWishAndAcquired] = useState(null)
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('characters')) {
      localStorage.setItem('characters', JSON.stringify(charactersJson.hits))
    }
    setCharacters(JSON.parse(localStorage.getItem('characters')))

    axios.get(process.env.PUBLIC_URL + '/wish_and_acquired.json').then((response) => {
      setWishAndAcquired(response.data)
    })
  }, [])

  return (
    <>
      <NavBar characters={characters} />
      <div className="container-fluid p-0">
        <Outlet context={{ characters, wishAndAcquired }} />
      </div>
      <Footer />
    </>
  )
}
