import React from 'react'
import './index.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useAppSelector } from '../../../hooks/useCustomRedux'
import HeroSection from '../components/HeroSection'
import Motto from '../components/Motto'
import Contact from '../components/Contact'

export default () => {
  const { motto, sections } = useAppSelector((state) => state.profile)

  return (
    <>
      <Navbar />
      <Motto />
      <HeroSection {...sections[0]} id="about" name="about" />
      <HeroSection
        {...sections[1]}
        id="products"
        name="products"
        withPriceListSwiper
        buttonText="Selengkapnya"
      />
      <Contact />
    </>
  )
}
