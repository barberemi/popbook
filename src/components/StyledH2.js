import React from 'react'
import styled from '@emotion/styled'

const Titre = styled.h4`
  font-family: 'Blomberg';
  text-align: center;
  color: #fff;
  text-shadow: rgb(0 0 0 / 50%) 1px 1px 5px;
`

export default function StyledH2(props) {
  return (
    <i>
      <Titre>{props.value}</Titre>
    </i>
  )
}
