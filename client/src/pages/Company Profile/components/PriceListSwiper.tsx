import React, { useEffect, useState } from 'react'
import './PriceListSwiper.css'

import { p1, p2, p3, p4 } from '../../../assets/images/PriceList'

export default () => {
  const [images, setImages] = useState([p1, p2, p3, p4])
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleChangeImage = () => {
    setActiveImageIndex((index) => {
      if (index === images.length - 1) return 0
      return index + 1
    })
  }

  useEffect(() => {
    const interval = setInterval(handleChangeImage, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <img src={images[activeImageIndex]} className="price-list" />
    </>
  )
}
