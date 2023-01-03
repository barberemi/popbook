import React from 'react'
import _ from 'lodash'
import { useOutletContext } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Acquired() {
  const { characters, wishAndAcquired } = useOutletContext()

  return (
    <>
      <Helmet>
        <title>Pop-Book - Souhaits</title>
      </Helmet>
      <Banner
        h1="Les figurines Pop souhaitees par Aude"
        h2="Pour une idee de cadeau des plus facile !"
      />

      {characters && wishAndAcquired && (
        <ListingCards
          type="wish"
          data={_.orderBy(
            _.filter(characters, (character) => {
              return _.includes(JSON.stringify(wishAndAcquired.wish), character.name)
            }),
            ['title', 'label']
          )}
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
