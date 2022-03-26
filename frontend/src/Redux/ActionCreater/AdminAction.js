import {
    GET_USER_LIST_FAIL,
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    CLEAR_ERRORS,
    GET_ARTIST_LIST_FAIL,
    GET_ARTIST_LIST_REQUEST,
    GET_ARTIST_LIST_SUCCESS,
  } from "../ActionTypes/adminActionType.js";
  import axios from "axios";

  export const usersList = () => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_LIST_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/users");
  
      dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_USER_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const artistsList = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ARTIST_LIST_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/artists");
  
      dispatch({ type: GET_ARTIST_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ARTIST_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };