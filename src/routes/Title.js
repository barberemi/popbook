import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { useOutletContext } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import TitleThread from '../components/TitleThread'

export default function Titles() {
  const [characters] = useOutletContext()
  const [charactersFilter, setCharactersFilter] = useState(null)
  const { name } = useParams()

  useEffect(() => {
    if (characters) {
      setCharactersFilter(_.orderBy(_.filter(characters, { title: name }), ['label']))
    }
  }, [name, characters])

  return (
    <>
      <Helmet>
        {charactersFilter && (
          <title>Pop-Book - {_.upperCase(charactersFilter[0].title_label)}</title>
        )}
      </Helmet>

      {charactersFilter && (
        <>
          <Banner
            h1={_.upperCase(charactersFilter[0].title_label)}
            h2="Trouvez la figurine de vos reves"
            banner={name}
          />
          <div className="container mt-4">
            <TitleThread name={name} titleRegex={_.upperCase(charactersFilter[0].title_label)} />
          </div>
          <ListingCards type="oneTitle" title={name} data={charactersFilter} addMarginTop={false} />
        </>
      )}

      {!charactersFilter && (
        <>
          <Banner h1={_.upperCase(name)} h2="Trouvez la figurine de vos reves" banner={name} />
          <div style={{ textAlign: 'center', padding: '50px 0 140px 0' }}>
            <div
              className="spinner-border text-warning"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            ></div>
          </div>
        </>
      )}
    </>
  )
}
