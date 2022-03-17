import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../Redux/ActionCreater/UserAction';
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
    const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
    
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);

    }
  }, [dispatch, error, alert,navigate, message]);
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
      <h3>Forgot Password</h3>
      <p>Please enter your email to send an OTP</p>
      <form onSubmit={forgotPasswordSubmit}>
       
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       
        <input
          type="submit"
          value="Send"
          className="login-btn"
        />
      </form>
    </div>
  )}
  </>
  )
}

export default ForgotPassword