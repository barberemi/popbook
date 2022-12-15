import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Title() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Titres</title>
      </Helmet>
      <Banner
        h1="Trouvez vos figurines par titre"
        h2="Pour une recherche directement par le titre de votre serie preferee !"
      />
      <ListingCards type="title" />
    </>
  )
}
