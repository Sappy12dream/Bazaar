import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProduct,
} from "../../Redux/ActionCreater/ProductAction";
import Product from "../Product/Product";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

function ProductScreen({price, ratings, category}) {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [Disable, setDisable] = useState(false);
  const { keyword } = useParams();

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount, nbHits, resultPerPage } =
    useSelector((state) => state.products);

  const nextPage = (e) => {
    e.preventDefault();
    let pageNo = Math.round(productCount / resultPerPage);
    const round = productCount % resultPerPage;
    if (round > 0) {
      pageNo = pageNo + 1;
    }
    if (CurrentPage < pageNo && nbHits===8) {
      setCurrentPage(CurrentPage + 1);
    }else{
      setDisable(!Disable)
    }

    
    
  };

  const backPage = () => {
    if(CurrentPage> 1){
      setCurrentPage(CurrentPage - 1);
    }else{
      setDisable(!Disable)
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,CurrentPage,price, category,ratings));

  }, [dispatch, error, alert, keyword,CurrentPage,price, category,ratings]);

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
                <p>
                  Results: 1 - {nbHits} of {productCount}
                </p>
              </div>
              <div className="page_fun">
                <IoIosArrowBack onClick={backPage} disabled={Disable} style={{cursor:"pointer"}} />
                <span>page {CurrentPage}</span>
                <IoIosArrowForward onClick={nextPage} disabled={Disable} style={{cursor:"pointer"}}/>
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
