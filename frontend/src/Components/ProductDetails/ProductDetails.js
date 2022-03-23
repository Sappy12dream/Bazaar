import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiHeartAddFill } from "react-icons/ri";
import Review from "./Review/Review";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../Redux/ActionCreater/ProductAction";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { addItem, clearErrs } from "../../Redux/ActionCreater/WishListAction";
import { BiCommentAdd } from "react-icons/bi";
import { Rating } from "@mui/material";

function ProductDetails() {
  const [rating, setrating] = useState(0);
  const [comment, setComment] = useState('');
  const [Active, setActive] = useState(false)
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { loadng, success, err} = useSelector((state) => state.addwishList);
  const { success:reviewSuccess, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (err) {
      alert.error(err);
      dispatch(clearErrs());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrs());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, err,reviewError]);

  const handleSubmit = (e) => {
    navigate("/login?redirect=/");

    if (product) {
      let productId = product._id;
      dispatch(addItem(productId));
      if (success) {
        alert.success("Item added to WishList Successfully!");
        
      }
    }

  };

  const revSubmit = () => {
    let productId = product._id;

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));

    setActive(false);
    if(reviewSuccess){
      alert.success("Review Added Successfully")
    }
    window.location.reload()
  };

  const style = { color: "white", fontSize: "20px" };
  return (
    <>
      {loading && loadng ? (
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
                    <p>{product.artistName}</p>
                  </div>
                  <span>Created At</span>
                  <div className="artist_info">
                    <p>{product.createdAt}</p>
                  </div>
                </div>
                <div className="price">
                  <p>Price</p>
                  <span>{product.price} RS</span>
                </div>
                <div className="action">
                  <a href={product.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <IoLogoWhatsapp style={{ color: "green" }} />
                  </a>
                  <RiHeartAddFill
                    onClick={handleSubmit}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "10px",
                      color: "red",
                    }}
                  />
                  <BiCommentAdd 
                  onClick={()=>setActive(true)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      marginRight: "10px",
                      color: "#301934",

                    }
                  }
                  />
                </div>
                {
                  Active?(<div className="rev-form">
                  <h4>Add Review!</h4>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setrating(e.target.value)}
                    precision={0.5}
                  />
                  <input type="text" placeholder="comment.."  onChange={(e)=>setComment(e.target.value)}/>
                  <div>
                    <button onClick={()=> setActive(false)}>Cancel</button>
                    <button onClick={revSubmit}>Submit</button>
                  </div>
                </div>):(<></>)
                }
                
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
