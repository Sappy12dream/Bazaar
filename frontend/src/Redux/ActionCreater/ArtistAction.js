import axios from "axios";
import { ARTIST_FORGOT_PASSWORD_FAIL, ARTIST_FORGOT_PASSWORD_REQUEST, ARTIST_FORGOT_PASSWORD_SUCCESS, ARTIST_LOGIN_FAIL, ARTIST_LOGIN_REQUEST, ARTIST_LOGIN_SUCCESS, ARTIST_REGISTER_FAIL, ARTIST_REGISTER_REQUEST, ARTIST_REGISTER_SUCCESS, ARTIST_RESET_PASSWORD_FAIL, ARTIST_RESET_PASSWORD_REQUEST, ARTIST_RESET_PASSWORD_SUCCESS, ARTIST_UPDATE_FAIL, ARTIST_UPDATE_PASSWORD_FAIL, ARTIST_UPDATE_PASSWORD_REQUEST, ARTIST_UPDATE_PASSWORD_SUCCESS, ARTIST_UPDATE_REQUEST, ARTIST_UPDATE_SUCCESS, LOAD_ARTIST_FAIL, LOAD_ARTIST_REQUEST, LOAD_ARTIST_SUCCESS, LOGOUT_ARTIST_FAIL, LOGOUT_ARTIST_SUCCESS } from "../ActionTypes/userActionType";

export const artistlogin = (Email, Password) => async (dispatch) => {
    try {
      dispatch({
        type: ARTIST_LOGIN_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/v1/artist/login`,
        { email: Email, password: Password },
        config
      );
  
      dispatch({
        type: ARTIST_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ARTIST_LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const loadArtist = () => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_ARTIST_REQUEST,
      });
      const { data } = await axios.get(`/api/v1/artist/me`);
      dispatch({
        type: LOAD_ARTIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_ARTIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const artistRegister = (userData) => async (dispatch) => {
    try {
      dispatch({
        type: ARTIST_REGISTER_REQUEST,
      });
      const config = { headers: { "Content-Type": "mutltipart/form-data" } };
      const { data } = await axios.post(
        `/api/v1/artist/register`,
        userData,
        config
      );
  
      dispatch({
        type: ARTIST_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ARTIST_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const updateArtistProfile = (userData) => async (dispatch) => {
    try {
      dispatch({
        type: ARTIST_UPDATE_REQUEST,
      });
      const config = { headers: { "Content-Type": "mutltipart/form-data" } };
      const { data } = await axios.put(
        `/api/v1/artist/profile/update`,
        userData,
        config
      );
  
      dispatch({
        type: ARTIST_UPDATE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ARTIST_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const updateArtistPassword = (passwords) => async (dispatch) => {
    try {
      dispatch({
        type: ARTIST_UPDATE_PASSWORD_REQUEST,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/artist/password/update`,
        passwords,
        config
      );
  
      dispatch({
        type: ARTIST_UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ARTIST_UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const logoutArtist = () => async (dispatch) => {
    try {
  
      await axios.get(`/api/v1/artist/logout`);
  
      dispatch({
        type: LOGOUT_ARTIST_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_ARTIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

  export const artistforgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: ARTIST_FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } =
        (await axios.post(`/api/v1/artist/password/forgot`, email, config)) 
  
      dispatch({ type: ARTIST_FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: ARTIST_FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const artistResetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: ARTIST_RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } =
        (await axios.put(
          `/api/v1/artist/password/reset/${token}`,
          passwords,
          config
        ));
  
      dispatch({ type: ARTIST_RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: ARTIST_RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  