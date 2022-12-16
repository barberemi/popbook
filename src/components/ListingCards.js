import React, { Fragment } from 'react'
import _ from 'lodash'
import styled from '@emotion/styled'
import moment from 'moment'

import TitleCard from '../components/TitleCard'
import CharacterCard from '../components/CharacterCard'
import LogoPop from '../components/LogoPop'

// ATTENTION : DOUBLE IMPORTATION AVEC L IMPORT DANS TITLE PAGE ??
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
        {props.type === 'titles' && (
          <>
            Ce site contient <Strong>{titles.hits.length}</Strong> titres de figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
        {props.type === 'acquired' && (
          <>
            Aude posséde <Strong>{_.filter(characters.hits, { acquired: true }).length}</Strong>{' '}
            figurines <LogoPop key="listing" />
          </>
        )}
        {props.type === 'wish' && (
          <>
            Aude a <Strong>{_.filter(characters.hits, { wish: true }).length}</Strong> figurines{' '}
            <LogoPop key="listing" /> en souhaits
          </>
        )}
        {props.type === 'soon' && (
          <>
            <Strong>{titles.hits.length}</Strong> figurines <LogoPop key="listing" /> à venir
          </>
        )}
        {props.type === 'oneTitle' && props.title && (
          <>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/logos/' + props.title + '-logo.webp'}
                alt={'Logo ' + props.title}
                style={{ maxWidth: '140px', maxHeight: '50px' }}
              />
            </div>
            Ce titre contient{' '}
            <Strong>{_.filter(characters.hits, { title: props.title }).length}</Strong> figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
      </div>
      <div className="row justify-content-center">
        {props.type === 'titles' &&
          _.map(_.orderBy(titles.hits, ['label']), (title, index) => (
            <Fragment key={index}>
              <TitleCard title={title} />
            </Fragment>
          ))}
        {props.type === 'acquired' &&
          _.map(
            _.orderBy(_.filter(characters.hits, { acquired: true }), ['title']),
            (character, index) => (
              <Fragment key={index}>
                <CharacterCard character={character} displayLogo={true} />
              </Fragment>
            )
          )}
        {props.type === 'wish' &&
          _.map(
            _.orderBy(_.filter(characters.hits, { wish: true }), ['title']),
            (character, index) => (
              <Fragment key={index}>
                <CharacterCard character={character} displayLogo={true} />
              </Fragment>
            )
          )}
        {props.type === 'soon' &&
          _.map(
            _.orderBy(
              _.filter(characters.hits, (character) => {
                return (
                  _.includes(character.release_date, '-00-') ||
                  moment().isBefore(moment(character.release_date))
                )
              }),
              ['title']
            ),
            (character, index) => (
              <Fragment key={index}>
                <CharacterCard character={character} displayLogo={true} />
              </Fragment>
            )
          )}
        {props.type === 'oneTitle' &&
          props.title &&
          _.map(
            _.orderBy(_.filter(characters.hits, { title: props.title }), ['title']),
            (character, index) => (
              <Fragment key={index}>
                <CharacterCard character={character} displayLogo={false} />
              </Fragment>
            )
          )}
      </div>
    </div>
  )
}
