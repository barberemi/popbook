import React from 'react'
import styled from '@emotion/styled'

const Titre = styled.h1`
  font-family: 'Blomberg';
  text-align: center;
  color: #f9b337;
  text-shadow: rgb(0 0 0 / 50%) 1px 1px 5px;
`

export default function StyledH1(props) {
  return <Titre>{props.value}</Titre>
}
