import React from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import { Routes, Route } from "react-router-dom";
import ProductDetails from '../ProductDetails/ProductDetails';
import Login from '../User/Login';
import Register from '../User/Register';
import UpdateProfile from '../userProfile/UpdateProfile';
import ChangePassword from '../ChangePassword/ChangePassword';
import ForgotPassword from '../User/ForgotPassword';
import ResetPassword from '../User/ResetPassword';
import WishList from '../WishList/WishList';
import LoginArtist from '../User/Artist/LoginArtist';
import RegisterArtist from '../User/Artist/RegisterArtist';
import ArtistForgotPassword from '../User/Artist/ArtistForgotPassword';
import ArtistResetPassword from '../User/Artist/ArtistResetPassword';
import CreateProduct from '../User/Artist/CreateProduct';
import Products from '../User/Artist/Products';
import UpdateProduct from '../User/Artist/UpdateProduct';
import Users from '../User/Admin/Users';
import Artists from '../User/Admin/Artists';


const Home = () => {
  return (
    <div className='Home'>
       <Header/>
       <Routes>
       <Route path="/" element={<Main/>} />
       <Route path="/products/:keyword" element={<Main/>} />
       <Route path="/product/:id" element={<ProductDetails/>} />

      <Route path="/login" element={<Login/>} />
      <Route path='*' element={<div className='invalid'>404<br/>Page not found</div>}/>
      <Route path="/admin/users" element={<Users/>} />
      <Route path="/admin/artists" element={<Artists/>} />
      <Route path="/artist" element={<div>artist</div>} />
      <Route path="/login/artist" element={<LoginArtist/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/artist/product/create" element={<CreateProduct/>} />
      <Route path="/register/artist" element={<RegisterArtist/>} />
      <Route path="/me/update" element={<UpdateProfile/>} />
      <Route path="/password/change" element={<ChangePassword/>} />
      <Route path="/forgot" element={<ForgotPassword/>} />
      <Route path="/artist/forgot" element={<ArtistForgotPassword/>} />
      <Route path="/wishlist" element={<WishList/>} />
      <Route path="/artist/products" element={<Products/>} />
      <Route path="/update/product/:id" element={<UpdateProduct/>} />
      <Route path="/password/reset/:token" element={<ResetPassword/>} />
      <Route path="/artist/password/reset/:token" element={<ArtistResetPassword/>} />
       </Routes>
    </div>
  )
}

export default Home