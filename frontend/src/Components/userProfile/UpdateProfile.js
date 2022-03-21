import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ThreeDots } from "react-loader-spinner";

import {
  clearErrors,
  updateUserProfile,
  loadUser,
} from "../../Redux/ActionCreater/UserAction";
import { USER_UPDATE_RESET } from "../../Redux/ActionTypes/userActionType";
import { useNavigate } from "react-router-dom";
import {
  loadArtist,
  updateArtistProfile,
} from "../../Redux/ActionCreater/ArtistAction";

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user, role } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [whatsappLink, setwhatsappLink] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    myForm.set("whatsappLink", whatsappLink);

    if (role === "artist") {
      dispatch(updateArtistProfile(myForm));
      console.log(true);
    } else {
      dispatch(updateUserProfile(myForm));
    }
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setwhatsappLink(user.whatsappLink);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      if (role === "artist") {
        dispatch(loadArtist());
      } else {
        dispatch(loadUser());
      }

      navigate("/");

      dispatch({
        type: USER_UPDATE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated,role]);
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
      ) : (
        <div className=" Register Login">
          <h3>Update Profile!</h3>
          <p>Update to Change Profile</p>
          <form onSubmit={updateProfileSubmit}>
            <input
              type="type"
              placeholder="username"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {role === "artist" && (
              <input
                type="url"
                placeholder="whatsapp link..."
                name="whatsappLink"
                value={whatsappLink}
                onChange={(e) => setwhatsappLink(e.target.value)}
                required
              />
            )}

            <div className="pic">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
                className="custom-file-input"
              />
            </div>
            <input type="submit" value="Update" className="login-btn" />
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
