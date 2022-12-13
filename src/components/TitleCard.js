import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'

const Star = styled.span`
  svg {
    right: 5px;
    top: 5px;
    position: absolute;
    color: #f9b337;

    &:hover {
      cursor: pointer;
      font-size: 2em;
      transition: 1s ease-out;
    }
  }
`

export default function TitleCard() {
  return (
    <div
      className="card col-4 col-sm-3 col-md-2 m-2"
      style={{ fontFamily: 'Blomberg', padding: 0 }}
    >
      <Star>
        <FontAwesomeIcon icon={faStar} size="lg" />
      </Star>
      <img
        src={process.env.PUBLIC_URL + '/images/thumbs/dragon-ball-thumb.webp'}
        alt="Miniature Dragon Ball"
        className='card-img-top"'
        style={{ borderRadius: '3px 3px 0 0' }}
      />
      <div className="card-body text-center">
        <img
          src={process.env.PUBLIC_URL + '/images/logos/dragon-ball-logo.webp'}
          alt="Logo Dragon Ball"
        />
      </div>
      <div className="card-footer text-center">
        <small className="text-muted">Dragon Ball</small>
      </div>
    </div>
  )
}
