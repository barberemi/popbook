import React from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fr'
import { Link } from 'react-router-dom'
import LogoPop from '../components/LogoPop'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck as faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const Card = styled.div`
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`

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

const getLabelFromReleaseDate = (date) => {
  if (_.includes(date, '-00-')) {
    return 'Sortie ' + date.slice(0, 4)
  }

  if (moment().isBefore(moment(date))) {
    return _.upperFirst(moment(date).format('MMMM YYYY'))
  }

  return null
}

export default function CharacterCard(props) {
  return (
    <Link
      //   to={`/titles/${props.title.name}`}
      to={'/'}
      style={{ textDecoration: 'none' }}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 m-2"
    >
      <Card className="card text-center" style={{ fontFamily: 'Blomberg', padding: 0 }}>
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
          src={process.env.PUBLIC_URL + '/images/characters/' + props.character.name + '.webp'}
          alt={'Miniature' + props.character.label}
          style={{ borderRadius: '3px 3px 0 0' }}
          className="p-2"
        />
        {props.displayLogo && (
          <div className="card-body p-1">
            <img
              src={process.env.PUBLIC_URL + '/images/logos/' + props.character.title + '-logo.webp'}
              className="img-fluid"
              alt={'Logo ' + props.character.label}
            />
          </div>
        )}
        <div className="card-footer text-black">
          <small>
            {props.character.label}
            <br />
            <span className="text-muted">
              <LogoPop key={props.character.num} /> #{props.character.num}
            </span>
            {props.character.release_date && (
              <div className="fs-6" style={{ fontFamily: 'monospace' }}>
                <span className="badge text-bg-warning">
                  {getLabelFromReleaseDate(props.character.release_date)}
                </span>
              </div>
            )}
          </small>
        </div>
      </Card>
    </Link>
  )
}