import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import characters from '../datasources/characters.json'

export default function Acquired() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Acquis</title>
      </Helmet>
      <Banner h1="Les figurines Pop de Aude" h2="Pour visualiser toutes ses figurines !" />
      <ListingCards
        type="acquired"
        data={_.orderBy(_.filter(characters.hits, { acquired: true }), ['title'])}
        addMarginTop={true}
      />
    </>
  )
}
