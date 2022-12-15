import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
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

export default function TitleCard(props) {
  return (
    <Link
      to={`/titles/${props.title.name}`}
      style={{ textDecoration: 'none' }}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 m-2"
    >
      <Card className="card" style={{ fontFamily: 'Blomberg', padding: 0 }}>
        <Star>
          <FontAwesomeIcon icon={props.title.acquired ? faSolidStar : faRegularStar} size="lg" />
        </Star>
        <img
          src={process.env.PUBLIC_URL + '/images/thumbs/' + props.title.name + '-thumb.webp'}
          alt={'Miniature' + props.title.label}
          className='"'
          style={{ borderRadius: '3px 3px 0 0' }}
        />
        <div className="card-body text-center">
          <img
            src={process.env.PUBLIC_URL + '/images/logos/' + props.title.name + '-logo.webp'}
            alt={'Logo' + props.title.label}
            style={{ maxHeight: '40px', maxWidth: '150px' }}
          />
        </div>
        <div className="card-footer text-center">
          <small className="text-muted">{props.title.label}</small>
        </div>
      </Card>
    </Link>
  )
}
