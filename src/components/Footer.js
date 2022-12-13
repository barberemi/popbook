import React from 'react'
import styled from '@emotion/styled'

const Pied = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
`

export default function Footer() {
  return (
    <Pied>
      <div className="container">Bonjour</div>
    </Pied>
  )
}
