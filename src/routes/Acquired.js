import React from 'react'
import { useOutletContext } from 'react-router-dom'
import _ from 'lodash'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Acquired() {
  const [characters] = useOutletContext()

  return (
    <>
      <Helmet>
        <title>Pop-Book - Acquis</title>
      </Helmet>
      <Banner h1="Les figurines Pop de Aude" h2="Pour visualiser toutes ses figurines !" />

      {characters && (
        <ListingCards
          type="acquired"
          data={_.orderBy(_.filter(characters, { acquired: true }), ['title', 'label'])}
          addMarginTop={true}
        />
      )}

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
