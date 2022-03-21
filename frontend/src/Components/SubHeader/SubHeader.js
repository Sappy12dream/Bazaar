import React, { useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SubHeader({ setprice, setratings, setcategory }) {
  const [ActivePrice, setActivePrice] = useState(false);
  const [Activecategory, setActivecategory] = useState(false);
  const [ActiveRating, setActiveRating] = useState(false);
  const priceVal = [5000, 4000, 3000, 1000, 500, 300];
  const categoryVal = ["home decor", "Decor", "room"];
  const ratingVal = [1, 2, 3, 4];
  const { role } = useSelector((state) => state.user);
  return (
    <div className="Sub_header">
      <div className="options">
        <>
          <div
            className="price_filter filter"
            onClick={() => setActivePrice(!ActivePrice)}
          >
            <span>price</span>
            {ActivePrice ? <IoClose /> : <IoIosArrowDown />}
          </div>
          {ActivePrice && (
            <div className="list" onClick={() => setActivePrice(!ActivePrice)}>
              {priceVal.map((val) => (
                <div className="item" onClick={() => setprice(val)}>
                  <span>Below</span> {val}
                </div>
              ))}
            </div>
          )}
        </>
        <>
          <div
            className="rating_filter filter"
            onClick={() => setActiveRating(!ActiveRating)}
          >
            <span>ratings</span>
            {ActiveRating ? <IoClose /> : <IoIosArrowDown />}
          </div>
          {ActiveRating && (
            <div
              className="list rating"
              onClick={() => setActiveRating(!ActiveRating)}
            >
              {ratingVal.map((val) => (
                <div className="item" onClick={() => setratings(val)}>
                  <span>Above</span> {val}
                </div>
              ))}
            </div>
          )}
        </>
        <>
          <div
            className="category_filter filter"
            onClick={() => setActivecategory(!Activecategory)}
          >
            <span>Category</span>
            {Activecategory ? <IoClose /> : <IoIosArrowDown />}
          </div>
          {Activecategory && (
            <div
              className="list category"
              onClick={() => setActivecategory(!Activecategory)}
            >
              {categoryVal.map((val) => (
                <div className="item" onClick={() => setcategory(val)}>
                  {val} <span> Decor</span>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
      {role === "artist" && (
        <Link to='artist/product/create'className="add_btn" >
          <button>
            <span>
              <MdOutlineAddBox />
            </span>
            Add Product
          </button>
        </Link>
      )}
    </div>
  );
}

export default SubHeader;
