import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import charactersJson from './../datasources/characters.json'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import { db } from '../datasources/firebase'
import { onValue, ref } from 'firebase/database'

export default function Template() {
  const [wishAndAcquired, setWishAndAcquired] = useState(null)
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    if (!localStorage.getItem('version')) {
      localStorage.setItem('version', '2')
      localStorage.removeItem('characters')
    }

    if (!localStorage.getItem('characters')) {
      localStorage.setItem('characters', JSON.stringify(charactersJson.hits))
    }

    setCharacters(JSON.parse(localStorage.getItem('characters')))

    onValue(ref(db), (snapshot) => {
      const data = snapshot.val()
      setWishAndAcquired(data)
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
