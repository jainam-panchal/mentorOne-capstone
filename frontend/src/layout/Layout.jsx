import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers.jsx'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routers />
      </main>
      <Footer />
    </div>
  )
}
export default Layout
