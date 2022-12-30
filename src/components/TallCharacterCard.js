import React from 'react'
import styled from '@emotion/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck as faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Emote = styled.span`
  svg {
    right: 5px;
    top: 5px;
    position: absolute;
  }
`

export default function TallCharacterCard(props) {
  return (
    <div className="card text-center col-6 col-sm-6 col-md-5 col-lg-4 col-xl-3 m-2">
      {props.character.wish && (
        <Emote>
          <FontAwesomeIcon icon={faRegularStar} size="xl" style={{ color: 'orange' }} />
        </Emote>
      )}
      {props.character.acquired && (
        <Emote>
          <FontAwesomeIcon icon={faCircleCheck} size="xl" style={{ color: 'green' }} />
        </Emote>
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
