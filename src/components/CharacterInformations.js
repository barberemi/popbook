import React from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fr'

import LogoPop from '../components/LogoPop'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Titre = styled.h3`
  font-family: 'Blomberg';
  text-align: center;
  color: #fff;
`

export default function TallCharacterCard(props) {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        lineHeight: '40px',
        margin: 'auto 0'
      }}
    >
      <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
        <img
          src={process.env.PUBLIC_URL + '/images/logos/' + props.character.title + '-logo.webp'}
          alt={'Logo ' + props.character.title}
          style={{ maxWidth: '140px', maxHeight: '50px' }}
        />
      </div>
      <Titre>
        <span className="badge text-bg-warning text-white">{props.character.label}</span>
      </Titre>

      <div className="d-flex">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faFolderOpen} size="xl" style={{ color: 'orange' }} />
        </div>
        <div>{props.titleRegex}</div>
      </div>

      {props.character.funko_id && (
        <div className="d-flex">
          <div style={{ width: '50px', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faInfoCircle} size="xl" style={{ color: 'orange' }} />
          </div>
          <div>Ref. Funko Pop #{props.character.funko_id}</div>
        </div>
      )}

      <div className="d-flex">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faCalendar} size="xl" style={{ color: 'orange' }} />
        </div>
        <div>
          {_.includes(props.character.release_date, '-00-') && (
            <>Sortie en {props.character.release_date.slice(0, 4)}</>
          )}
          {!_.includes(props.character.release_date, '-00-') && (
            <>{_.upperFirst(moment(props.character.release_date).format('MMMM YYYY'))}</>
          )}
        </div>
      </div>

      <div className="d-flex">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <LogoPop key={props.character.num} />
        </div>
        <div>{props.character.num}</div>
      </div>
    </div>
  )
}
