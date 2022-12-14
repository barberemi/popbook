import React from 'react'
import _ from 'lodash'
import TitleCard from '../components/TitleCard'
import titles from '../datasources/titles.json'

export default function ListingCards() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {_.map(titles.hits, (title) => (
          <TitleCard title={title} />
        ))}
      </div>
    </div>
  )
}
