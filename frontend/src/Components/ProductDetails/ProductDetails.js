import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiHeartAddFill } from "react-icons/ri";
import Review from "./Review/Review";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../Redux/ActionCreater/ProductAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { addItem, clearErrs } from "../../Redux/ActionCreater/WishListAction";

function ProductDetails() {
  const navigate = useNavigate();

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { loadng, success, err } = useSelector((state) => state.addwishList);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (err) {
      alert.error(err);
      dispatch(clearErrs());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, err]);

  
  const handleSubmit = (e) => {
    navigate("/login?redirect=wishList");
    if (product) {
      let productId = product._id
      dispatch(addItem(productId));
      if(success){
        alert.success("Item added to WishList Successfully!")

      }
      
    }
   
  };

  const style = { color: "white", fontSize: "20px" };
  return (
    <>
      {loading || loadng ? (
        <div className="loader">
          <ThreeDots
            type="Spinner Type"
            color="crimson"
            height={80}
            width={80}
          />
        </div>
      ) : (
        <>
          <div className="Product_container">
            <Link to="/" className="go_back">
              <IoArrowBackCircleOutline style={style} />
              <span>Go back</span>
            </Link>
            <div className="Product_wrapper">
              <div className="image">
                <Carousel className="cr">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        src={item.url}
                        alt={product.name}
                        key={i}
                        className="img"
                      />
                    ))}
                </Carousel>
              </div>
              <div className="details">
                <div className="head">
                  <h2>{product.name}</h2>
                  <p>{product.category}</p>
                </div>
                <p>{product.description}</p>
                <div className="artist">
                  <span>Created By</span>
                  <div className="artist_info">
                    <div className="logo"></div>
                    <p>{product.artistName}</p>
                  </div>
                </div>
                <div className="price">
                  <p>Price</p>
                  <span>{product.price} RS</span>
                </div>
                <div className="action">
                  <Link to="/">
                    <IoLogoWhatsapp style={{ color: "green" }} />
                  </Link>
                  <RiHeartAddFill
                    onClick={handleSubmit}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "red",
                    }}
                  />
                </div>
              </div>
            </div>
            <h3>Reviews</h3>

            <div className="review-wrapper">
              {product.reviews &&
                product.reviews.map((rev) => (
                  <Review rev={rev} key={rev._id} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
