import React from 'react'
import  "./Home.css"
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Featured from '../../Components/Featured/Featured'
import PropertyList from '../../Components/PropertyList/PropertyList'
import FeaturedProperties from '../../Components/FeaturedProperties/FeaturedProperties'
import MailList from '../../Components/MailList/MailList'
import Footer from '../../Components/Footer/Footer'
const Home = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList/>
        <h1 className='homeTitle'>Loved homes</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home

