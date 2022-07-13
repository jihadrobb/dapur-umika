import React from 'react'
import './Motto.css'

import products from '../../../assets/images/Products'
import { Element } from 'react-scroll'

export default () => {
  return (
    <>
      <Element name="motto">
        <div className="motto-container">
          <div className="text-container">
            <p className="motto-heading">Dapur Umika</p>
            <p className="motto-description">Dapurnyo uong kito</p>
          </div>
        </div>
      </Element>
    </>
  )
}
