import React, { useContext } from 'react'
// Added Navigate to help with redirection
import { Route, Routes, Navigate } from 'react-router-dom' 
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import context to check for token
import { ShopContext } from './context/ShopContext'

const App = () => {

  const { token } = useContext(ShopContext);

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      
      <Routes>
        {/* The Login route is always accessible */}
        <Route path='/login' element={<Login />} />

        {/* PROTECTED ROUTES: Only show if token exists */}
        {token ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
          </>
        ) : (
          /* REDIRECT: If no token, any URL sends user to login */
          <Route path='*' element={<Navigate to='/login' />} />
        )}
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App