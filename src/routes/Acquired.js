import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Acquired() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Acquis</title>
      </Helmet>
      <Banner
        h1="Vos figurines Pop"
        h2="Pour visualiser toutes les figurines que vous possedez !"
      />
      <ListingCards type="character" />
    </>
  )
}
