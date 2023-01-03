import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { useOutletContext } from 'react-router-dom'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import TallCharacterCard from '../components/TallCharacterCard'
import CharacterInformations from '../components/CharacterInformations'
import CharacterThread from '../components/CharacterThread'

export default function Character() {
  const { characters } = useOutletContext()
  const [characterFilter, setCharacterFilter] = useState(null)
  const { name, title } = useParams()

  useEffect(() => {
    if (characters) {
      setCharacterFilter(_.find(characters, { name: name }))
    }
  }, [name, characters])

  return (
    <>
      <Helmet>{characterFilter && <title>Pop-Book - {characterFilter.label}</title>}</Helmet>
      {characterFilter && (
        <>
          <Banner
            h1={characterFilter.label}
            h2={`Figurine ${characterFilter.label} dans l'univers ${characterFilter.title_label}`}
            banner={characterFilter.title}
          />
          <div className="container mt-4">
            <CharacterThread character={characterFilter} />
            <div className="d-flex justify-content-center">
              <TallCharacterCard character={characterFilter} />
              <CharacterInformations character={characterFilter} />
            </div>
          </div>
        </>
      )}
      {!characterFilter && (
        <>
          <Banner h1="Chargement du personnage" banner={title} />
          <div className="container mt-4">
            <div className="text-center text-warning">
              <div className="spinner-border" role="status" />
            </div>
          </div>
        </>
      )}
    </>
  )
}
