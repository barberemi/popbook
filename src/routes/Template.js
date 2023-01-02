import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Template() {
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacters(response.data.hits)
    })
  }, [])

  return (
    <>
      <NavBar characters={characters} />
      <div className="container-fluid p-0">
        <Outlet context={[characters]} />
      </div>
      <Footer />
    </>
  )
}
