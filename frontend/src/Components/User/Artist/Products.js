import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { clearErrors, deleteProduct, getArtistProduct } from '../../../Redux/ActionCreater/ProductAction';
import Product from './Product';
import { DELETE_PRODUCT_RESET } from '../../../Redux/ActionTypes/productActionType';
import { useNavigate } from 'react-router-dom';

function Products() {
  
    const alert = useAlert();
    const dispatch = useDispatch();
const navigate = useNavigate()

    const { loading, error, products,nbHits } =
      useSelector((state) => state.artistProducts);
      const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
      );
    
      const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
      };

      useEffect(() => {
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          alert.success("Product Deleted Successfully");
          navigate("/");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        dispatch(getArtistProduct());
    
      }, [dispatch, error, alert, deleteError,isDeleted,navigate]);
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
                products.map((product) => <Product product={product} key={product._id} id={product._id} deleteH={deleteProductHandler}/>)}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Products