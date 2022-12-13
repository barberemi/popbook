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
      class="card col-4 col-sm-3 col-md-2 m-2"
      style={{ fontFamily: 'Blomberg', padding: 0 }}
    >
      <Star>
        <FontAwesomeIcon icon={faStar} size="lg" />
      </Star>
      <img
        src="https://www.placedespop.com/img/licences/thumbs/1001-pattes-disney-image_240x170.jpg"
        alt="Card image cap"
        className='card-img-top"'
        style={{ borderRadius: '3px 3px 0 0' }}
      />
      <div class="card-body text-center">
        <img
          src="https://www.placedespop.com/img/licences/thumbs/1001-pattes-disney-logo_0x48.png"
          alt="Card image cap"
        />
      </div>
      <div class="card-footer text-center">
        <small class="text-muted">1001 Pattes [Disney]</small>
      </div>
    </div>
  )
}
