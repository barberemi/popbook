import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import StyledH1 from './StyledH1'
import StyledH2 from './StyledH2'

const Header = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 62px;
  height: 150px;
  background-color: #252525;
  background-position: right;
  ${(props) =>
    props.banner &&
    css`
      background-image: url('${process.env.PUBLIC_URL +
      '/images/banners/' +
      props.banner +
      '-banniere.webp'}');
    `};

  @media (max-width: 992px) {
    margin-top: 72px;
  }

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`

export default function Banner(props) {
  return (
    <Header className="col-sm-12 pt-4" banner={props.banner ?? 'aude'}>
      <StyledH1 value={props.h1} />
      <StyledH2 value={props.h2} />
    </Header>
  )
}
