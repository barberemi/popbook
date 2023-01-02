import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Soon() {
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacters(
        _.orderBy(
          _.filter(response.data.hits, (character) => {
            return (
              (_.includes(character.release_date, '-00-') &&
                moment().isBefore(moment(_.replace(character.release_date, '-00-', '-01-')))) ||
              moment().isBefore(moment(character.release_date))
            )
          }),
          ['release_date', 'title', 'label']
        )
      )
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Pop-Book - Prochainement</title>
      </Helmet>
      <Banner h1="Prohaines sorties" h2="Pour etre au courant de toutes les nouveautes !" />

      {characters && <ListingCards type="soon" data={characters} addMarginTop={true} />}

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
