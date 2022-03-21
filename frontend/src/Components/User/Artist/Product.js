
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";

function Product({product,id}) {
  const [Active, setActive] = useState(false);

    const { loading,  } = useSelector((state) => state.artistProducts);
    const options = {
        edit: false,
        activeColor: "yellow",
        color: "grey",
        value: product.ratings,
        isHalf: true,
        size: 12,
      };
 
  return (
    <>
    {loading ? (
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
            <button className="remove" >
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
  )
}

export default Product