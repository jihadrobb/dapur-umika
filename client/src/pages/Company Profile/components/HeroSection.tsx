import React, { useEffect } from 'react'
import './HeroSection.css'
import { Button } from './Button'
import { Element } from 'react-scroll'
import { useAppDispatch } from '../../../hooks/useCustomRedux'
import { Swiper, SwiperSlide } from 'swiper/react'
import PriceListSwiper from './PriceListSwiper'
import { useNavigate } from 'react-router-dom'

interface HeroSectionProps {
  id?: string
  name?: string
  background: 'light' | 'dark'
  text: 'light' | 'dark'
  textDescription: 'light' | 'dark'
  topline?: string
  headline: string
  description: string
  buttonText?: string
  buttonDestination?: string
  imageUrl?: string
  imagePosition?: 'left' | 'right'
  imageAlt?: string
  withPriceListSwiper?: boolean
}

export default ({
  id,
  name,
  background,
  text,
  textDescription,
  topline,
  headline,
  description,
  buttonText,
  imageUrl,
  imagePosition,
  imageAlt,
  withPriceListSwiper
}: HeroSectionProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return (
    <>
      <Element name={name || ''}>
        <div
          id={id}
          className={
            background == 'light'
              ? 'home_hero-section'
              : 'home_hero-section dark-background'
          }
        >
          <div className="hero-container">
            <div
              className="row home_hero-row"
              style={{
                display: 'flex',
                flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row'
              }}
            >
              <div className="col">
                <div
                  className={
                    imagePosition === 'left'
                      ? 'home_hero-text-wrapper'
                      : 'home_hero-text-wrapper left'
                  }
                >
                  <div className="top-line">{topline}</div>
                  <h1 className={text == 'light' ? 'heading' : 'heading dark'}>
                    {headline}
                  </h1>
                  <p
                    className={
                      textDescription == 'light'
                        ? 'home_hero-subtitle'
                        : 'home_hero-subtitle dark'
                    }
                  >
                    {description}
                  </p>
                  {buttonText ? (
                    <Button
                      buttonSize="btn-wide"
                      buttonColor="red"
                      onClick={() => navigate('shop')}
                    >
                      {buttonText}
                    </Button>
                  ) : null}
                </div>
              </div>
              {imageUrl ? (
                <div className="col">
                  <div className="home_hero-img-wrapper">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="home_hero-img"
                    />
                  </div>
                </div>
              ) : null}
              {withPriceListSwiper ? (
                <div className="col">
                  <div className="home_hero-img-wrapper">
                    <PriceListSwiper />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Element>
    </>
  )
}
