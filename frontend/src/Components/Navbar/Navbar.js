import React from "react";
import { useState, useEffect } from "react";
import { FaOpencart, FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {RiLogoutBoxRLine} from 'react-icons/ri'
import {logoutUser} from '../../Redux/ActionCreater/UserAction'
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  const alert = useAlert()

  const [darkTheme, setDarkTheme] = useState(false);
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const logOutUser = ()=>{
    dispatch(logoutUser());
    alert.success("Logout Successfully!")
    navigate("/")
  }

const dispatch = useDispatch()
  useEffect(() => {

    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      darkTheme ? "#262833" : "#fff"
    );
    root?.style.setProperty("--text-color", darkTheme ? "#fff" : "#262833");

  }, [darkTheme,dispatch]);
  return (
    <div className="Navbar">
      <div className="logo">
        <FaOpencart />
        <h1>Bazaar</h1>
      </div>
      <div className="menu"> 
        <Link to="/">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/wishlist">
          <MdFavorite />
          <span>Wish-List</span>
        </Link>
      </div>
      <button onClick={() => setDarkTheme(!darkTheme)}>change</button>
{isAuthenticated && (
      <button onClick={logOutUser} className='logout-btn'><RiLogoutBoxRLine/><span>logout</span></button>

)}
    </div>
  );
}

export default Navbar;
