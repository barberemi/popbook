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
    // Remove old localstorage
    if (localStorage.getItem('version')) {
      localStorage.removeItem('version')
    }
    if (localStorage.getItem('characters')) {
      localStorage.removeItem('characters')
    }

    // Add IndexedDB
    const request = indexedDB.open('popbook', 1)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Delete if exists
      if (db.objectStoreNames.contains('characters')) {
        db.deleteObjectStore('characters')
      }
      // Create
      const objStore = db.createObjectStore('characters', { keyPath: 'name' })

      // Store data
      charactersJson.hits.forEach((character) => {
        objStore.put(character)
      })
    }

    request.onsuccess = (event) => {
      const db = event.target.result.transaction('characters', 'readwrite')
      const store = db.objectStore('characters')
      const allCharacters = store.getAll()

      allCharacters.onsuccess = (e) => {
        setCharacters(e.target.result)
      }
    }

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
