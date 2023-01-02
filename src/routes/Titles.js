import React from 'react'
import { Helmet } from 'react-helmet'
import _ from 'lodash'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import { useOutletContext } from 'react-router-dom'

export default function Titles() {
  const [characters] = useOutletContext()

  return (
    <>
      <Helmet>
        <title>Pop-Book - Titres</title>
      </Helmet>
      <Banner
        h1="Trouvez vos figurines par titre"
        h2="Pour une recherche directement par le titre de votre serie preferee !"
      />

      {characters && (
        <ListingCards
          type="titles"
          data={_.orderBy(_.uniqBy(characters, 'title'), ['title'])}
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
