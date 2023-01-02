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
      setCharacters(_.orderBy(_.filter(response.data.hits, { wish: true }), ['title', 'label']))
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Pop-Book - Souhaits</title>
      </Helmet>
      <Banner
        h1="Les figurines Pop souhaitees par Aude"
        h2="Pour une idee de cadeau des plus facile !"
      />

      {characters && <ListingCards type="wish" data={characters} addMarginTop={true} />}

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
