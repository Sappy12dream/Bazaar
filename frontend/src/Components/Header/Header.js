import React, {  useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import {IoCloseSharp} from 'react-icons/io5'
import {BiMenu} from 'react-icons/bi'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserProfile from "../userProfile/UserProfile";

function Header({setmenuActive}) {
  const [Active, setActive] = useState(false)
  const navigate = useNavigate();

 const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [keyword, setkeyword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      console.log(keyword);
      navigate(`/products/${keyword}`);
    } else {
      navigate("/");
    }
  };
 
  return (
    <div className="Header">
       <div className="menu" onClick={()=>setmenuActive(true)}><BiMenu style={{fontSize:"14px"}} /></div>
      
      <form className="Search_tab">
        <FiSearch />
        <input
          type="text"
          placeholder="Type here..."
          value={keyword}
          onChange={(event) => setkeyword(event.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
      <div className="user_profile" onClick={()=>setActive(!Active)}>
        {isAuthenticated ? (
          <>
            <div className="user_pic">
              <img src={user.avatar.url} alt={user.name}/>
            </div>
            <p className="user_name">{user.name}</p>
            {Active?(<IoCloseSharp/>):(<IoIosArrowDown />)}
          </>
        ) : (
          <Link to='/login' className="login-btn">login</Link>
        )}
      </div>

      {
        isAuthenticated && (
          <UserProfile user={user} Active={Active}/>
        )
      }
    </div>
  );
}

export default Header;
