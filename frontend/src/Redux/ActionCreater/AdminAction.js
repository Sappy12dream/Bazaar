import {
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  CLEAR_ERRORS,
  GET_ARTIST_LIST_FAIL,
  GET_ARTIST_LIST_REQUEST,
  GET_ARTIST_LIST_SUCCESS,
  DELETE_USER_LIST_REQUEST,
  DELETE_USER_LIST_SUCCESS,
  DELETE_USER_LIST_FAIL,
  DELETE_ARTIST_LIST_REQUEST,
  DELETE_ARTIST_LIST_SUCCESS,
  DELETE_ARTIST_LIST_FAIL,
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

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_LIST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteArtist = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ARTIST_LIST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/artist/${id}`);

    dispatch({ type: DELETE_ARTIST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ARTIST_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
