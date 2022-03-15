import React from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import { Routes, Route } from "react-router-dom";
import ProductDetails from '../ProductDetails/ProductDetails';
import Login from '../User/Login';
import Register from '../User/Register';


const Home = () => {
  return (
    <div className='Home'>
        <Header/>
        <Routes>
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/" element={<Main/>} />
        <Route path="/products/:keyword" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      </Routes>
    </div>
  )
}

export default Home