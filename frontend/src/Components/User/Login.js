import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { ThreeDots } from "react-loader-spinner";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearErrors, userlogin } from "../../Redux/ActionCreater/UserAction";

function Login() {
  const alert = useAlert();
  const navigate = useNavigate();

  const [Email, setEmail] = useState(" ");
  const [Password, setPassword] = useState(" ");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userlogin(Email, Password));
    console.log(Email, Password);
    console.log("loggin");
  };

  return (
    <>
      {loading ? (
        <><div className="loader">
        <ThreeDots
          type="Spinner Type"
          color="crimson"
          height={80}
          width={80}
        />
      </div></>
      ) : (
        <div className="Login">
          <h3>Welcome Back!</h3>
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
            <Link to="/forgot">Forgot password?</Link>
            <input
              type="submit"
              value="login"
              className="login-btn"
              onClick={handleLogin}
            />
          </form>
          <Link to="/Register">Click here to create an account</Link>
        </div>
      )}
    </>
  );
}

export default Login;
