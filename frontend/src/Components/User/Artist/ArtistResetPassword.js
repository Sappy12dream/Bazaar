import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { artistResetPassword } from '../../../Redux/ActionCreater/ArtistAction';
import { clearErrors } from '../../../Redux/ActionCreater/UserAction';

function ArtistResetPassword() {

  const dispatch = useDispatch();
    const navigate = useNavigate()
    const {token} = useParams()

    const alert = useAlert();
  
  
    const { error, loading,success } = useSelector(
        (state) => state.forgotPassword
      );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(artistResetPassword(token, myForm));
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");
    
          navigate("/login/artist");
        }
      }, [dispatch, error, alert, navigate, success]);
  
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
        <h3>Reset Password!</h3>
        <form  onSubmit={resetPasswordSubmit}>
          <input
            type="password"
            placeholder="Password"
            name="old"
            onChange={(e) => setPassword(e.target.value)}
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
            value="Reset"
            className="login-btn"
          />
        </form>
      </div>
    )}
    </>
    )
}

export default ArtistResetPassword