import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Content = styled.div`
  min-height: 100%;
`

export default function Template() {
  return (
    <>
      <NavBar />
      <Content className="container-fluid p-0">
        <Outlet />
      </Content>
      <Footer />
    </>
  )
}
