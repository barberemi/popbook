import React from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import TitleThread from '../components/TitleThread'
import characters from '../datasources/characters.json'

export default function Titles() {
  const { name } = useParams()
  const { title } = _.find(characters.hits, { title: name })
  const titleRegex = _.upperCase(title)

  return (
    <>
      <Helmet>
        <title>Pop-Book - {titleRegex}</title>
      </Helmet>
      <Banner h1={titleRegex} h2="Trouvez la figurine de vos reves" banner={name} />
      <div className="container mt-4">
        <TitleThread name={name} titleRegex={titleRegex} />
      </div>
      <ListingCards
        type="oneTitle"
        title={name}
        data={_.orderBy(_.filter(characters.hits, { title: name }), ['title'])}
        addMarginTop={false}
      />
    </>
  )
}
