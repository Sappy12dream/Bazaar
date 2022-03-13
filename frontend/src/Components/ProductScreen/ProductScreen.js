import { useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Redux/ActionCreater/ProductAction";
import Product from "../Product/Product";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

function ProductScreen() {
  const { keyword } = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount, nbHits } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    
    dispatch(getProduct(keyword));
    

    console.log("yes");
  }, [dispatch, error, alert, keyword]);

  return (
    <>
      <div className="Product_screen">
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
                <p>Results: 1-{nbHits} of {productCount}</p>
              </div>
              <div className="page_fun">
                <IoIosArrowBack />
                <span>page 1</span>
                <IoIosArrowForward />
              </div>
            </div>
            <div className="products-wrapper">
              {products &&
                products.map((product) => <Product product={product} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductScreen;
