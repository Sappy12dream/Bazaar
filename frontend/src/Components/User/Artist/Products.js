import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { clearErrors, getArtistProduct } from '../../../Redux/ActionCreater/ProductAction';
import Product from './Product';

function Products() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products,nbHits } =
      useSelector((state) => state.artistProducts);

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        dispatch(getArtistProduct());
    
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
              {products &&
                products.map((product) => <Product product={product} key={product._id} id={product._id}/>)}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Products