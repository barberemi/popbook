import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const Card = styled.div`
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`

export default function TitleCard(props) {
  return (
    <Link
      to={`/titles/${props.title}`}
      style={{ textDecoration: 'none' }}
      className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 m-2"
    >
      <Card className="card text-center" style={{ fontFamily: 'Blomberg', padding: 0 }}>
        <img
          src={process.env.PUBLIC_URL + '/images/thumbs/' + props.title + '.jpg'}
          alt={'Miniature' + props.title_label}
          style={{ borderRadius: '3px 3px 0 0' }}
        />
        <div className="card-body">
          <img
            src={process.env.PUBLIC_URL + '/images/logos/' + props.title + '.png'}
            style={{ maxWidth: '150px', maxHeight: '38px' }}
            alt={'Logo ' + props.title_label}
          />
        </div>
        <div className="card-footer text-black">
          <small>
            {_.truncate(_.upperCase(props.title_label), {
              length: 25
            })}
          </small>
        </div>
      </Card>
    </Link>
  )
}
