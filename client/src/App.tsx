import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'
import CompanyProfile from './pages/Company Profile'
import Shop from './pages/Shop'
import CMS from './pages/CMS'

function App() {
  const getActiveDomain = () => {
    const activeDomain = window.location.host.split('.')[0].toLowerCase()

    switch (activeDomain) {
      case 'shop':
        return <Shop />
      case 'admin':
        return <CMS />
      default:
        return <CompanyProfile />
    }
  }

  return <Provider store={store}>{getActiveDomain()}</Provider>
}

export default App
