import React, { Fragment } from 'react'
import _ from 'lodash'
import styled from '@emotion/styled'

import TitleCard from '../components/TitleCard'
import CharacterCard from '../components/CharacterCard'
import LogoPop from '../components/LogoPop'

import titles from '../datasources/titles.json'
import characters from '../datasources/characters.json'

const Strong = styled.strong`
  font-size: 1.2em;
  color: #f9b337;
`

export default function ListingCards(props) {
  return (
    <div className="container mt-4">
      <div className="mb-3 text-center">
        {props.type === 'title' && (
          <>
            Ce site contient <Strong>{titles.hits.length}</Strong> titres de figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
        {props.type === 'character' && (
          <>
            Vous possèdez <Strong>{characters.hits.length}</Strong> figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
      </div>
      <div className="row justify-content-center">
        {props.type === 'title' &&
          _.map(_.orderBy(titles.hits, ['label']), (title, index) => (
            <Fragment key={index}>
              <TitleCard title={title} />
            </Fragment>
          ))}
        {props.type === 'character' &&
          _.map(_.orderBy(characters.hits, ['title']), (character, index) => (
            <Fragment key={index}>
              <CharacterCard character={character} />
            </Fragment>
          ))}
      </div>
    </div>
  )
}
