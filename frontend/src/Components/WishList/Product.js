import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { ImWhatsapp } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrs,
  deleteItem,
} from "../../Redux/ActionCreater/WishListAction";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function Product({ product, id }) {
  const navigate = useNavigate();
  const [Active, setActive] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loadng, success, err } = useSelector((state) => state.addwishList);

  const options = {
    edit: false,
    activeColor: "yellow",
    color: "grey",
    value: product.ratings,
    isHalf: true,
    size: 12,
  };
  const removeItem = (e) => {
    e.preventDefault();
    dispatch(deleteItem(id));
   
      alert.success("Removed");
    
  };
  useEffect(() => {
    if (err) {
      alert.error(err);
      dispatch(clearErrs());
    }
    if(success){
    window.location.reload();

    }
  }, [dispatch, alert, err,success]);
  return (
    <>
      {loadng ? (
        <div className="loader">
          <ThreeDots
            type="Spinner Type"
            color="crimson"
            height={80}
            width={80}
          />
        </div>
      ) : (
        <div className="Product wishlist-pro">
          <span className="dots" onClick={() => setActive(!Active)}>
            <BiDotsVerticalRounded />
            {Active ? (
              <button className="remove" onClick={removeItem}>
                remove
              </button>
            ) : (
              <></>
            )}
          </span>
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
                <ReactStars {...options} />
                <span>{`(${product.numberOfReviews} reviews)`}</span>
              </div>

              <div>
                <span>
                  <ImWhatsapp />
                </span>
                <AiFillHeart />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
