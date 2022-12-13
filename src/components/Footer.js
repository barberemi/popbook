import React from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'

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
      <div class="container">Bonjour</div>
    </Pied>
  )
}
