import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearErrors, resetPassword, updateUserPassword } from '../../Redux/ActionCreater/UserAction';
import { USER_UPDATE_PASSWORD_RESET } from '../../Redux/ActionTypes/userActionType';


function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {token} = useParams()

    const alert = useAlert();
  
  
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
      );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          alert.success("Password Updated Successfully");
    
          navigate("/login");
        }
      }, [dispatch, error, alert, navigate, message]);
  
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

export default ResetPassword