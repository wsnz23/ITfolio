import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Work from '../components/Work'
import HeroImg2 from '../components/HeroImg2'


const About = () => {
  return (
    <div className="about">
     <Navbar/> 
     <HeroImg2 heading="What Makes Us Different" text="Uncover the possibilities with our curated on-site service selection"/>
     <Work/>
     <Footer/>
    </div>
  )
}

export default About
