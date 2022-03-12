import React from "react";
import { Link } from "react-router-dom";
import {IoLogoWhatsapp} from 'react-icons/io'
import {IoArrowBackCircleOutline} from 'react-icons/io5'
import {MdOutlineFavorite} from 'react-icons/md'
import Review from "./Review/Review";

function ProductDetails() {
  const style = { color: "white", fontSize: "20px" }
  return (
    <div className="Product_container">
      <Link to='/' className="go_back"><IoArrowBackCircleOutline style={style} /><span>Go back</span></Link>
      <div className="Product_wrapper">
        <div className="image">
          <img src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=945&q=80" alt="" />
        </div>
        <div className="details">
          <div className="head">
            <h2>Dream Catcher</h2>
            <p>Home Decor</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="artist">
            <span>Created By</span>
            <div className="artist_info">
              <div className="logo"></div>
              <p>sappy12dream</p>
            </div>
          </div>
          <div className="price">
              <p>Price</p>
              <span>100.00 RS</span>
        </div>
        <div className="action">
            <Link to='/'><IoLogoWhatsapp style={{color:'green'}}/></Link>
            <Link to='/'><MdOutlineFavorite style={{color:'red', marginLeft:10}}/></Link>
        </div>
        </div>
      </div>
      <h3>Reviews</h3>

      <div className="review-wrapper">
      <Review/>
      <Review/>
      <Review/>
      </div>
    </div>
  );
}

export default ProductDetails;
