import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateArtistPassword } from '../../Redux/ActionCreater/ArtistAction';
import { clearErrors, updateUserPassword } from '../../Redux/ActionCreater/UserAction';
import { USER_UPDATE_PASSWORD_RESET } from '../../Redux/ActionTypes/userActionType';

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert();


  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { role } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
if(role==='artist'){
dispatch(updateArtistPassword(myForm))
}else{
  dispatch(updateUserPassword(myForm));

}
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/");

      dispatch({
        type: USER_UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

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
      <h3>Change Password!</h3>
      <form  onSubmit={updatePasswordSubmit}>
        <input
          type="type"
          placeholder="Old Password"
          name="old"
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="Password"
          placeholder="New Passowrd"
          name="new"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="confirm"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <input
          type="submit"
          value="Update"
          className="login-btn"
        />
      </form>
    </div>
  )}
  </>
  )
}

export default ChangePassword