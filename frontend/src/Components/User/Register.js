import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  userRegister,
} from "../../Redux/ActionCreater/UserAction";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/logo512.png");
  const [avatarPreview, setAvatarPreview] = useState("/logo512.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(userRegister(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <div className=" Register Login">
      <h3>Get Started!</h3>
      <p>Register on Bazaar</p>
      <form>
        <input
          type="type"
          placeholder="username"
          name="name"
          onChange={registerDataChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={registerDataChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={registerDataChange}
          required
        />
        <div className="pic">
          <img src={avatarPreview} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={registerDataChange}
            className="custom-file-input"
          />
        </div>
        <Link to="/forgot">Forgot password?</Link>
        <input
          type="submit"
          value="Register"
          className="login-btn"
          onClick={registerSubmit}
        />
      </form>
      <Link to="/login">Already registered? login</Link>
    </div>
  );
}

export default Register;
