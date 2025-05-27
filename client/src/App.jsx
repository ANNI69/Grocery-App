import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  return (
    <>
    {isSellerPath ? null : <Navbar />}

    <div className={`${isSellerPath ? "" : "px-4 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<h1>Products Page</h1>} />
        <Route path='/cart' element={<h1>Cart Page</h1>} />
        <Route path='/contact' element={<h1>Contact Page</h1>} />
        <Route path='/login' element={<h1>Login Page</h1>} />
      </Routes>
    </div>
    </>
  )
}

export default App
