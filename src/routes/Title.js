import React from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import characters from '../datasources/characters.json'

export default function Titles() {
  const { name } = useParams()
  let { title } = _.find(characters.hits, { title: name })
  title = _.upperFirst(_.replace(title, new RegExp('-', 'g'), ' '))

  return (
    <>
      <Helmet>
        <title>Pop-Book - {title}</title>
      </Helmet>
      <Banner h1={title} h2="Trouvez la figurine de vos reves" banner={name} />
      <ListingCards
        type="oneTitle"
        title={name}
        data={_.orderBy(_.filter(characters.hits, { title: name }), ['title'])}
      />
    </>
  )
}
