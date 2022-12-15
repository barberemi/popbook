import React from 'react'
import _ from 'lodash'
import TitleCard from '../components/TitleCard'
import titles from '../datasources/titles.json'
import styled from '@emotion/styled'

const Strong = styled.strong`
  font-size: 1.2em;
  color: #f9b337;
`

export default function ListingCards() {
  return (
    <div className="container mt-4 text-center">
      <div className="mb-3">
        Actuellement <Strong>{titles.hits.length}</Strong> titres de figurines Pop
      </div>
      <div className="row justify-content-center">
        {_.map(titles.hits, (title) => (
          <TitleCard title={title} />
        ))}
      </div>
    </div>
  )
}
