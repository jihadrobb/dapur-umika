import React from 'react'
import './Contact.css'
import { Element } from 'react-scroll'
import { FaWhatsapp, FaWhatsappSquare } from 'react-icons/fa'
import SocialMedia from './SocialMedia'
import { useNavigate } from 'react-router-dom'

import wa from '../../../assets/icons/wa.png'
import ig from '../../../assets/icons/ig.png'
import fb from '../../../assets/icons/fb.png'
import shopee from '../../../assets/icons/shopee.png'
import tokopedia from '../../../assets/icons/tokopedia.png'

export default () => {
  const navigate = useNavigate()
  return (
    <>
      <Element name="contact">
        <div className="element-container">
          <span className="contact-heading"></span>
          <div className="contact-row">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.7257295331256!2d106.03868101483968!3d-6.032328695631201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418f8ea2b30903%3A0x1f57233c64308131!2sIKAN%20GILING%20DAPUR%20UMIKA!5e0!3m2!1sen!2sid!4v1657672358200!5m2!1sen!2sid"
              className="iframe-map"
              loading="lazy"
            />
            <p className="contact-address">
              <p className="contact-address-heading">Address:</p> Cluster Amyra,
              <br />
              Jalan Remazol 1 No.3 Ciwedus Kecamatan Cilegon Banten 42418
              Indonesia
            </p>
            <div className="social-col">
              <div className="social-row">
                <SocialMedia
                  name="+62 815-1717-0599"
                  imgSrc={wa}
                  imgAlt="whatsapp"
                  // fontColor="#25D366"
                  onClick={() => navigate('/external/whatsapp')}
                />
                <SocialMedia
                  name="@dapurumika"
                  imgSrc={ig}
                  imgAlt="instagram"
                  // fontColor="#fff"
                  onClick={() => navigate('/external/instagram')}
                />
                <SocialMedia
                  name="dapurumika"
                  imgSrc={fb}
                  imgAlt="facebook"
                  // fontColor="#4267B2"
                  onClick={() => navigate('/external/facebook')}
                />
              </div>
              <div className="social-row">
                <SocialMedia
                  name="DAPUR UMIKA"
                  imgSrc={shopee}
                  imgAlt="shopee"
                  // fontColor="#EE4D2D"
                  onClick={() => navigate('/external/shopee')}
                />
                <SocialMedia
                  name="dapur umika"
                  imgSrc={tokopedia}
                  imgAlt="tokopedia"
                  onClick={() => navigate('/external/tokopedia')}
                />
              </div>
            </div>
          </div>
          <span className="footer-copyright">Copyright © 2022 Dapur Umika</span>
        </div>
      </Element>
    </>
  )
}
