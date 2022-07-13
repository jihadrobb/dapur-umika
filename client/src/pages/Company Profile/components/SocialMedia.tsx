import React from 'react'
import './SocialMedia.css'

interface SocialMediaProps {
  imgSrc: string
  imgAlt: string
  name: string
  fontColor?: string
  onClick?: () => void
}

export default ({
  imgSrc,
  imgAlt,
  name,
  fontColor,
  onClick
}: SocialMediaProps) => {
  return (
    <>
      <div
        className="social-media-container"
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
      >
        <img src={imgSrc} alt={imgAlt} className="social-media-logo" />
        <span
          className="social-media-name"
          style={{
            color: fontColor || '#fff'
          }}
        >
          {name}
        </span>
      </div>
    </>
  )
}
