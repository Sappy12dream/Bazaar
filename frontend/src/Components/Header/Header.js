import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const [auth, setauth] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if(isAuthenticated){
      setauth(user)
    }
  }, [isAuthenticated, user])
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
      <form className="Search_tab">
        <FiSearch />
        <input
          type="text"
          placeholder="Type here..."
          value={keyword}
          onChange={(event) => setkeyword(event.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          search
        </button>
      </form>
      <div className="user_profile">
        {auth ? (
          <>
            <div className="user_pic">
              <img src={auth.user.avatar.url} alt={auth.user.name}/>
            </div>
            <p className="user_name">{auth.user.name}</p>
            <IoIosArrowDown />
          </>
        ) : (
          <Link to='/login'>login</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
