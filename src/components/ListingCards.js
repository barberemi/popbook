import React, { Fragment } from 'react'
import _ from 'lodash'
import TitleCard from '../components/TitleCard'
import titles from '../datasources/titles.json'
import characters from '../datasources/characters.json'
import styled from '@emotion/styled'

const Strong = styled.strong`
  font-size: 1.2em;
  color: #f9b337;
`

export default function ListingCards(props) {
  return (
    <div className="container mt-4 text-center">
      <div className="mb-3">
        {props.type === 'title' && (
          <>
            Actuellement <Strong>{titles.hits.length}</Strong> titres de figurines Pop
          </>
        )}
        {props.type === 'acquired' && (
          <>
            Vous possèdez <Strong>{characters.hits.length}</Strong> figurines Pop
          </>
        )}
      </div>
      <div className="row justify-content-center">
        {_.map(titles.hits, (title, index) => (
          <Fragment key={index}>
            <TitleCard title={title} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
