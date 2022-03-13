import React from "react";
import { ImWhatsapp } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'

function Product({product}) {
  const options ={
    edit:false,
    activeColor:'yellow',
    color:"grey",
    value:product.ratings,
    isHalf:true,
    size:12
  }
  console.log(product)
  return (
    
    <Link to={`/product/${product._id}`}>
    <div className="Product">
      <div className="product_image">
      
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="product_info">
        <div className="line_1">
          <div>
            <h4>{product.name}</h4>
            <span>{product.category}</span>
          </div>
          <div>
            <span>{`${product.price} Rs`}</span>
          </div>
        </div>
        <div className="line_2">
          <div className="flex">
          <ReactStars {...options}/>
          <span>{`(${product.numberOfReviews} reviews)`}</span>
          </div>
          
          <div>
            <span><ImWhatsapp /></span>
            <AiFillHeart />
          </div>
        </div>
      </div>
    </div>
    </Link>
    
  );
}

export default Product;
