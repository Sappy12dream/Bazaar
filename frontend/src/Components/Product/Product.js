import React from "react";
import { ImWhatsapp } from "react-icons/im";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
function Product() {
  return (
    <div className="Product">
      <div className="product_image">
        <img src="" alt="product_name" />
      </div>
      <div className="product_info">
        <div className="line_1">
          <div>
            <h4>Dream Catcher</h4>
            <span>home decor</span>
          </div>
          <div>
            <span>100.00rs</span>
          </div>
        </div>
        <div className="line_2">
          <span>4.5</span>
          <div>
            <span><ImWhatsapp /></span>
            <AiFillHeart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
