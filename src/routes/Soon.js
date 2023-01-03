import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useOutletContext } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'

export default function Soon() {
  const { characters } = useOutletContext()

  return (
    <>
      <Helmet>
        <title>Pop-Book - Prochainement</title>
      </Helmet>
      <Banner h1="Prohaines sorties" h2="Pour etre au courant de toutes les nouveautes !" />

      {characters && (
        <ListingCards
          type="soon"
          data={_.orderBy(
            _.filter(characters, (character) => {
              return (
                (_.includes(character.release_date, '-00-') &&
                  moment().isBefore(moment(_.replace(character.release_date, '-00-', '-01-')))) ||
                moment().isBefore(moment(character.release_date))
              )
            }),
            ['release_date', 'title', 'label']
          )}
          addMarginTop={true}
        />
      )}

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
