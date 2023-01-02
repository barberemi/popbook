import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import TallCharacterCard from '../components/TallCharacterCard'
import CharacterInformations from '../components/CharacterInformations'
import CharacterThread from '../components/CharacterThread'

export default function Character() {
  const [character, setCharacter] = useState(null)
  const { name, title } = useParams()

  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacter(_.find(response.data.hits, { name: name }))
    })
  }, [name])

  return (
    <>
      <Helmet>{character && <title>Pop-Book - {character.label}</title>}</Helmet>
      {character && (
        <>
          <Banner
            h1={character.label}
            h2={`Figurine ${character.label} dans l'univers ${character.title_label}`}
            banner={character.title}
          />
          <div className="container mt-4">
            <CharacterThread character={character} />
            <div className="d-flex justify-content-center">
              <TallCharacterCard character={character} />
              <CharacterInformations character={character} />
            </div>
          </div>
        </>
      )}
      {!character && (
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
