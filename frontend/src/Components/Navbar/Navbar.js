import React from "react";
import { useState, useEffect } from "react";
import { FaOpencart, FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
function Navbar() {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--background-color",
      darkTheme ? "#262833" : "#fff"
    );
    root?.style.setProperty("--text-color", darkTheme ? "#fff" : "#262833");
  }, [darkTheme]);
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
        <Link to="/">
          <MdFavorite />
          <span>Favorite</span>
        </Link>
      </div>
      <button onClick={() => setDarkTheme(!darkTheme)}>change</button>
    </div>
  );
}

export default Navbar;
