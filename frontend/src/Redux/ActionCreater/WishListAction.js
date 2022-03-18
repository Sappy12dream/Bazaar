import {
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    CLEAR_ERRORS,
    MY_WISHLIST_FAIL,
    MY_WISHLIST_REQUEST,
    MY_WISHLIST_SUCCESS,
  } from "../ActionTypes/whishlistActionType";
import axios from "axios";

export const addItem = (productId) => async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_WISHLIST_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/wishlist/add", {product:productId}, config);
  
      dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_WISHLIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const myWishList = () => async (dispatch) => {
    try {
      dispatch({ type: MY_WISHLIST_REQUEST });
  
      const { data } = await axios.get("/api/v1/wishlist/my");
  
      dispatch({ type: MY_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MY_WISHLIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrs = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };