import React from 'react'
import { useState } from 'react'
import Hero from '../components/Hero'
import Test from '../components/Test'
import Parallex from '../components/Parallex'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClientReviews from "../components/ClientReviews"


function Home({ isModalOpen, handleOpenModal, handleCloseModal, setVideoSrc }) {



  return (
    <div>
      <section id="Homepage">
        <Navbar />

        <Hero />
      </section>
      <section id="Services"><Parallex type="services" heading="What We Do" /></section>
      <section><Services /></section>
      <section id="Portfolio" ><Parallex type="portfolio" heading="What We've Done" /></section>
      <Portfolio isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} setVideoSrc={setVideoSrc} />

      <section id="Reviews" ><Parallex type="services" heading="What Clients Say" /></section>
      <section>
        <ClientReviews />
      </section>




      <section id="Contact"><Contact /></section>
      <Footer />
    </div>
  )
}

export default Home


