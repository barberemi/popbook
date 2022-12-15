import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import LogoPop from '../components/LogoPop'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons'

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
    color: #f9b337;

    &:hover {
      cursor: pointer;
      font-size: 2em;
      transition: 1s ease-out;
    }
  }
`

export default function CharacterCard(props) {
  return (
    <Link
      //   to={`/titles/${props.title.name}`}
      to={'/'}
      style={{ textDecoration: 'none' }}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 m-2"
    >
      <Card className="card text-center" style={{ fontFamily: 'Blomberg', padding: 0 }}>
        <Star>
          <FontAwesomeIcon
            icon={props.character.acquired ? faSolidStar : faRegularStar}
            size="lg"
          />
        </Star>
        <img
          src={process.env.PUBLIC_URL + '/images/characters/' + props.character.name + '.webp'}
          alt={'Miniature' + props.character.label}
          style={{ borderRadius: '3px 3px 0 0' }}
        />
        <div className="card-body">
          <img
            src={process.env.PUBLIC_URL + '/images/logos/' + props.character.title + '-logo.webp'}
            className="img-fluid"
            alt={'Logo' + props.character.label}
          />
        </div>
        <div className="card-footer text-black">
          <small>
            {props.character.label}
            <br />
            <span className="text-muted">
              <LogoPop key="listing" /> #{props.character.num}
            </span>
          </small>
        </div>
      </Card>
    </Link>
  )
}
