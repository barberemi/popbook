import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import moment from 'moment'

import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import characters from '../datasources/characters.json'

export default function Soon() {
  return (
    <>
      <Helmet>
        <title>Pop-Book - Prochainement</title>
      </Helmet>
      <Banner h1="Prohaines sorties" h2="Pour etre au courant de toutes les nouveautes !" />
      <ListingCards
        type="soon"
        data={_.orderBy(
          _.filter(characters.hits, (character) => {
            return (
              _.includes(character.release_date, '-00-') ||
              moment().isBefore(moment(character.release_date))
            )
          }),
          ['title']
        )}
      />
    </>
  )
}
