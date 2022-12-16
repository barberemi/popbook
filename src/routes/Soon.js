import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Soon() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Prochainement</title>
      </Helmet>
      <Banner h1="Prohaines sorties" h2="Pour etre au courant de toutes les nouveautes !" />
      <ListingCards type="soon" />
    </>
  )
}
