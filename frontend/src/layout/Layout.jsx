import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers.jsx'

const Layout = () => {
  const location = useLocation()

  // Define the routes where the header should not be displayed
  const noHeaderRoutes = ['/session']

  return (
    <div className="flex flex-col min-h-screen">
      {!noHeaderRoutes.some((route) => location.pathname.startsWith(route)) && (
        <Header />
      )}
      <main className="flex-grow">
        <Routers />
      </main>
      {!noHeaderRoutes.some((route) => location.pathname.startsWith(route)) && (
        <Footer />
      )}
    </div>
  )
}

export default Layout
