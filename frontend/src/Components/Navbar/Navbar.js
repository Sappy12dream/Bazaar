import React from "react";
import { useState, useEffect } from "react";
import { FaOpencart, FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdClose, MdShoppingBasket } from "react-icons/md";
import { logoutUser } from "../../Redux/ActionCreater/UserAction";
import { useNavigate } from "react-router-dom";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa";
import { logoutArtist } from "../../Redux/ActionCreater/ArtistAction";
import { NavLink } from "react-router-dom";
function Navbar({ menuActive, setmenuActive }) {
  const navigate = useNavigate();
  const alert = useAlert();

  const [darkTheme, setDarkTheme] = useState(false);
  const { role, isAuthenticated } = useSelector((state) => state.user);
  const logOutUser = () => {
    dispatch(logoutUser());
    alert.success("Logout Successfully!");
    navigate("/");
  };
  const logOutArtist = () => {
    dispatch(logoutArtist());
    alert.success("Logout Successfully!");
    navigate("/");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      darkTheme ? "#262833" : "#fff"
    );
    root?.style.setProperty("--text-color", darkTheme ? "#fff" : "#262833");
    root?.style.setProperty("--dark-color", darkTheme ? "#050505" : "#FFFFFF");
    root?.style.setProperty("--color", darkTheme ? "#383838" : "#eceff1");
    root?.style.setProperty("--light-color", darkTheme ? "#6a6767" : "#f0f4fc");
    root?.style.setProperty("--main", darkTheme ? "#171917" : "#d8dde8");
  }, [darkTheme, dispatch]);
  return (
    <div className={`Navbar ${menuActive ? "" : "menuu"}`}>
      <div className="close" onClick={() => setmenuActive(false)}>
        <MdClose />
      </div>
      <div className="logo">
        <FaOpencart style={{ fontSize: "20px" }} />
        <h1>AS|MART</h1>
      </div>
      <div className="menu">
        <NavLink
          to="/"
          activeClassName="active"
          onClick={() => setmenuActive(false)}
        >
          <FaHome />
          <span>Home</span>
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/wishlist"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <MdFavorite />
            <span>Wish-List</span>
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/orders"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <MdShoppingBasket />
            <span>My Orders</span>
          </NavLink>
        )}

        {role !== "artist" && (
          <NavLink
            to="/login/artist"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <FaUserLock />
            <span>Artist</span>
          </NavLink>
        )}

        {role === "artist" && (
          <NavLink
            to="/artist/products"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <FaUserLock />
            <span>My Products </span>
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            to="/admin/users"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <FaUserLock />
            <span>Users</span>
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            to="/admin/order"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <FaUserLock />
            <span>Orders</span>
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink
            to="/admin/artists"
            activeClassName="active"
            onClick={() => setmenuActive(false)}
          >
            <FaUserLock />
            <span>Artists</span>
          </NavLink>
        )}
      </div>
      <button className="btn" onClick={() => setDarkTheme(!darkTheme)}>
        <IoColorPaletteOutline />
        <span>Change</span>
      </button>

      {role === "user" && (
        <button onClick={logOutUser} className="btn">
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </button>
      )}
      {role === "artist" && (
        <button className="btn" onClick={logOutArtist}>
          <RiLogoutBoxRLine />
          <span>Logout Artist</span>
        </button>
      )}
      {role === "admin" && (
        <button className="btn" onClick={logOutArtist}>
          <RiLogoutBoxRLine />
          <span>Logout Artist</span>
        </button>
      )}
    </div>
  );
}

export default Navbar;
