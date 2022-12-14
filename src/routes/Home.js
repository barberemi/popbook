import React from 'react'
import styled from '@emotion/styled'
import NavBar from '../components/NavBar'
import StyledH1 from '../components/StyledH1'
import StyledH2 from '../components/StyledH2'
import TitleCard from '../components/TitleCard'
import Footer from '../components/Footer'

const Header = styled.div`
  background-image: url('${process.env.PUBLIC_URL +
  '/images/bannieres/dragon-ball-banniere.webp'}');
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

export default function Home() {
  return (
    <>
      <NavBar />

      <div className="container-fluid p-0">
        <Header className="col-sm-12 pt-4">
          <StyledH1 value="Trouvez vos figurines par titre" />
          <StyledH2 value="Pour une recherche directement par le titre de votre serie preferee !" />
        </Header>
        <div className="container">
          <div className="row justify-content-center">
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
            <TitleCard />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
