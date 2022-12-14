import React from 'react'
import styled from '@emotion/styled'
import StyledH1 from './StyledH1'
import StyledH2 from './StyledH2'

const Header = styled.div`
  background-image: url('${process.env.PUBLIC_URL + '/images/banners/dragon-ball-banniere.webp'}');
  background-size: contain;
  background-repeat: no-repeat;
  margin-top: 62px;
  height: 150px;
  background-color: #252525;
  background-position: right;

  @media (max-width: 992px) {
    margin-top: 72px;
  }

  @media (max-width: 768px) {
    margin-top: 100px;
  }
`

export default function Banner(props) {
  return (
    <Header className="col-sm-12 pt-4">
      <StyledH1 value={props.h1} />
      <StyledH2 value={props.h2} />
    </Header>
  )
}
