import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import characters from '../datasources/characters.json'

export default function Titles() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Titres</title>
      </Helmet>
      <Banner
        h1="Trouvez vos figurines par titre"
        h2="Pour une recherche directement par le titre de votre serie preferee !"
      />
      <ListingCards
        type="titles"
        data={_.orderBy(_.uniqBy(characters.hits, 'title'), ['title'])}
        addMarginTop={true}
      />
    </>
  )
}
