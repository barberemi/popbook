import React from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Template() {
  return (
    <>
      <NavBar />
      <div className="container-fluid p-0">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
