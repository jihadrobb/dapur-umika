import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import RedirectPage from '../RedirectPage'

import Profile from './Profile'

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route
          path="/shop"
          element={<RedirectPage url="http://shop.localhost:3000" />}
        />
        <Route
          path="/external/:destination"
          element={<RedirectPage url="" />}
        />
      </Routes>
    </Router>
  )
}
