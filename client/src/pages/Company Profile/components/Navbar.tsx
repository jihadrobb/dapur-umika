import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll'
import { FaBars, FaShoppingBasket, FaTimes } from 'react-icons/fa'
import { TbToolsKitchen } from 'react-icons/tb'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import logo from '../../../assets/logo.png'
import logoBg from '../../../assets/images/logo-bg.png'

export default () => {
  const navigate = useNavigate()

  const [openMenu, setOpenMenu] = useState(false)
  const [button, setButton] = useState(true)

  const handleOpenMenu = () => setOpenMenu(!openMenu)
  const closeMobileMenu = () => setOpenMenu(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
    window.addEventListener('resize', showButton)
    return () => {
      window.removeEventListener('resize', showButton)
    }
  }, [])

  return (
    <>
      <IconContext.Provider value={{ color: '#9d6f70' }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link
              to="motto"
              className="navbar-logo"
              spy
              smooth
              isDynamic
              offset={-80}
              onClick={closeMobileMenu}
            >
              <img src={logoBg} className="navbar-icon" sizes="80px" />
              <span className="navbar-brand">DAPUR UMIKA</span>
            </Link>
            <span className="navbar-brand-mobile">DAPUR UMIKA</span>
            <div className="menu-icon" onClick={handleOpenMenu}>
              {openMenu ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={openMenu ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link
                  to="about"
                  className="nav-link"
                  spy
                  smooth
                  isDynamic
                  offset={-80}
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="products"
                  className="nav-link"
                  spy
                  smooth
                  offset={-80}
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="contact"
                  className="nav-link"
                  spy
                  smooth
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-btn">
                {button ? (
                  <Button
                    onClick={() => navigate('/shop')}
                    buttonStyle="btn-outline"
                    Icon={() => (
                      <FaShoppingBasket className="fa-shoppingbasket" />
                    )}
                  >
                    Shop
                  </Button>
                ) : (
                  <div className="btn-link">
                    <Button
                      onClick={() => navigate('/shop')}
                      buttonStyle="btn-outline"
                      buttonSize="btn-mobile"
                      Icon={() => (
                        <FaShoppingBasket className="fa-shoppingbasket" />
                      )}
                    >
                      Shop
                    </Button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}
