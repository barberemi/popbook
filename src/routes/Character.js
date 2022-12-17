import React from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

import { Helmet } from 'react-helmet'
import Banner from '../components/Banner'
import TallCharacterCard from '../components/TallCharacterCard'
import CharacterInformations from '../components/CharacterInformations'
import characters from '../datasources/characters.json'

export default function Character() {
  const { name } = useParams()
  const character = _.find(characters.hits, { name: name })
  const titleRegex = _.upperFirst(_.replace(character.title, new RegExp('-', 'g'), ' '))

  return (
    <>
      <Helmet>
        <title>Pop-Book - {character.label}</title>
      </Helmet>
      <Banner
        h1={character.label}
        h2={`Figurine ${character.label} dans l'univers ${titleRegex}`}
        banner={character.title}
      />
      <div className="container mt-4 d-flex justify-content-center">
        <TallCharacterCard character={character} />
        <CharacterInformations character={character} titleRegex={titleRegex} />
      </div>
    </>
  )
}