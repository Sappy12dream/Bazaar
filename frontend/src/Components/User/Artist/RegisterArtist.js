import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { artistRegister } from '../../../Redux/ActionCreater/ArtistAction';
import { clearErrors } from '../../../Redux/ActionCreater/ProductAction';
import { ThreeDots } from "react-loader-spinner";


function RegisterArtist() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    whatsappLink:""
  });
  const { error, loading,role } = useSelector(
    (state) => state.user
  );
  const { name, email, password, whatsappLink} = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.set("whatsappLink", whatsappLink);
    dispatch(artistRegister(myForm));
  };
    const [avatar, setAvatar] = useState("/logo512.png");
  const [avatarPreview, setAvatarPreview] = useState("/logo512.png");
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
        if (role==='artist') {
          navigate("/artist/products");
        }
      }, [dispatch, error, alert, role, navigate]);
  return (
    <>
      {loading ? (
        <div className="loader">
          <ThreeDots
            type="Spinner Type"
            color="crimson"
            height={80}
            width={80}
          />
        </div>
      ) :
   ( <div className=" Register Login">
      <h3>Get Started!</h3>
      <p>Register on Bazaar</p>
      <form encType="multipart/form-data">
        <input
          type="text"
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
         <input
          type="url"
          placeholder="whatsapp link..."
          name="whatsappLink"
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
        <input
          type="submit"
          value="Register"
          className="login-btn"
          onClick={registerSubmit}
        />
      </form>
      <Link to="/login/artist">Already registered? login</Link>
    </div>
  )}
  </>
  )
}

export default RegisterArtist