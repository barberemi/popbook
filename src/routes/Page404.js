import React from 'react'
import { useRouteError } from 'react-router-dom'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

const Content = styled.div`
  min-height: 100%;
`

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <Helmet>
        <title>Pop-Book - Erreur</title>
      </Helmet>
      <NavBar />
      <Content className="container-fluid p-0">
        <Banner h1="Oops!" h2="Une erreur est survenue." />
        <div id="error-page" className="container mt-4">
          <i>{error.statusText || error.message}</i>
        </div>
      </Content>
      <Footer />
    </>
  )
}
