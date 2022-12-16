import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Acquired() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Souhaits</title>
      </Helmet>
      <Banner
        h1="Les figurines Pop souhaitees par Aude"
        h2="Pour une idee de cadeau des plus facile !"
      />
      <ListingCards type="wish" />
    </>
  )
}
