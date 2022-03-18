import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import Product from '../Product/Product';
import { clearErrs, myWishList } from '../../Redux/ActionCreater/WishListAction';

function WishList() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, items, nbHits, } =
      useSelector((state) => state.myWishList);

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrs());
        }
        dispatch(myWishList());
    
      }, [dispatch, error, alert]);
  return (
    <>
      <div className="Product_screen wishlist">
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
          <>
            <div className="page">
              <div className="info">
                <p>
                  Results:{nbHits}
                </p>
              </div>
            
            </div>
            <div className="products-wrapper">
              {items &&
                items.map((product) => <Product product={product.product} key={product._id}/>)}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default WishList