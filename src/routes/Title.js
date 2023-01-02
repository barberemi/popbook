import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import TitleThread from '../components/TitleThread'

export default function Titles() {
  const [characters, setCharacters] = useState(null)
  const { name } = useParams()

  useEffect(() => {
    setCharacters(null)
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacters(_.orderBy(_.filter(response.data.hits, { title: name }), ['label']))
    })
  }, [name])

  return (
    <>
      <Helmet>
        {characters && <title>Pop-Book - {_.upperCase(characters[0].title_label)}</title>}
      </Helmet>

      {characters && (
        <>
          <Banner
            h1={_.upperCase(characters[0].title_label)}
            h2="Trouvez la figurine de vos reves"
            banner={name}
          />
          <div className="container mt-4">
            <TitleThread name={name} titleRegex={_.upperCase(characters[0].title_label)} />
          </div>
          <ListingCards type="oneTitle" title={name} data={characters} addMarginTop={false} />
        </>
      )}

      {!characters && (
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
