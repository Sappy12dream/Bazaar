import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { artistlogin } from "../../../Redux/ActionCreater/ArtistAction";
import { clearErrors } from "../../../Redux/ActionCreater/UserAction";

function LoginArtist() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [Email, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const { error, loading, role } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (role === "artist") {
      console.log(true);
      navigate("/artist/products");
    }
  }, [dispatch, error, alert, role, navigate]);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(artistlogin(Email, Password));
  };
  return (
    <>
      {loading ? (
        <>
          <div className="loader">
            <ThreeDots
              type="Spinner Type"
              color="crimson"
              height={80}
              width={80}
            />
          </div>
        </>
      ) : (
        <div className="Login">
          <h3>Welcome Back Artist!</h3>
          <p>login on Bazaar</p>
          <form>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/artist/forgot">Forgot password?</Link>
            <input
              type="submit"
              value="login"
              className="login-btn"
              onClick={handleLogin}
            />
          </form>
          <Link to="/register/artist">Click here to create an account</Link>
        </div>
      )}
    </>
  );
}

export default LoginArtist;
