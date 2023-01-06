import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'

export default function LogoPop() {
  return (
    <img
      src={process.env.PUBLIC_URL + '/images/pop-logo.jpg'}
      className="img-fluid"
      alt={'Logo pop' + propTypes.key}
      width="40px"
    />
  )
}
