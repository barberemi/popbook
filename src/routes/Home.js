import React from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import ListingCards from '../components/ListingCards'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <NavBar />

      <div className="container-fluid p-0">
        <Banner
          h1="Trouvez vos figurines par titre"
          h2="Pour une recherche directement par le titre de votre serie preferee !"
        />
        <ListingCards type="titles" />
      </div>

      <Footer />
    </>
  )
}
