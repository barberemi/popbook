import React from 'react'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck as faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Star = styled.span`
  svg {
    right: 5px;
    top: 5px;
    position: absolute;

    &:hover {
      cursor: pointer;
      font-size: 2em;
      transition: 1s ease-out;
    }
  }
`

export default function TallCharacterCard(props) {
  return (
    <div className="card text-center col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3 m-2">
      {props.character.wish && (
        <Star>
          <FontAwesomeIcon icon={faRegularStar} size="lg" style={{ color: 'orange' }} />
        </Star>
      )}
      {props.character.acquired && (
        <Star>
          <FontAwesomeIcon icon={faCircleCheck} size="lg" style={{ color: 'green' }} />
        </Star>
      )}

      <img
        src={process.env.PUBLIC_URL + '/images/characters/' + props.character.name + '.jpg'}
        alt={'Miniature' + props.character.label}
        style={{ borderRadius: '3px 3px 0 0', margin: 'auto 0' }}
        className="p-2"
      />
    </div>
  )
}
