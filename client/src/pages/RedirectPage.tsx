import React, { useEffect } from 'react'
import './RedirectPage.css'

import logoBg from '../assets/images/logo-bg.png'
import { useParams } from 'react-router-dom'

interface RedirectProps {
  url: string
}

export default ({ url }: RedirectProps) => {
  const { destination } = useParams()

  useEffect(() => {
    if (destination) {
      let destinationUrl = 'https://www.instagram.com/dapurumika'
      switch (destination) {
        case 'whatsapp':
          destinationUrl = 'https://wa.me/6281517170599'
          break
        case 'instagram':
          destinationUrl = 'https://www.instagram.com/dapurumika'
          break
        case 'facebook':
          destinationUrl = 'https://www.facebook.com/dapurumika'
          break
        case 'shopee':
          destinationUrl = 'https://shopee.co.id/rizkanovarina'
          break
        case 'tokopedia':
          destinationUrl = 'https://www.tokopedia.com/dapurumika'
          break
      }
      window.location.replace(destinationUrl)
    } else {
      window.location.replace(url)
    }
  }, [])

  return (
    <>
      <div className="redirect-container">
        <img src={logoBg} alt="logo" className="logo" />
        <h2 className="text">Redirecting...</h2>
      </div>
    </>
  )
}
