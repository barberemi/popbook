import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Acquired() {
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacters(_.orderBy(_.filter(response.data.hits, { acquired: true }), ['title', 'label']))
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Pop-Book - Acquis</title>
      </Helmet>
      <Banner h1="Les figurines Pop de Aude" h2="Pour visualiser toutes ses figurines !" />

      {characters && <ListingCards type="acquired" data={characters} addMarginTop={true} />}

      {!characters && (
        <div style={{ textAlign: 'center', padding: '50px 0 140px 0' }}>
          <div
            className="spinner-border text-warning"
            style={{ width: '3rem', height: '3rem' }}
            role="status"
          ></div>
        </div>
      )}
    </>
  )
}
