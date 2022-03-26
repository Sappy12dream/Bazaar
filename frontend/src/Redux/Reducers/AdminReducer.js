import {
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  CLEAR_ERRORS,
  GET_ARTIST_LIST_FAIL,
  GET_ARTIST_LIST_REQUEST,
  GET_ARTIST_LIST_SUCCESS,
} from "../ActionTypes/adminActionType.js";

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case GET_USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        nbHits: action.payload.nbHits,
        success:action.payload.success
      };
    case GET_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const artistListReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case GET_ARTIST_LIST_REQUEST:
      return {
        loading: true,
        artists: [],
      };
    case GET_ARTIST_LIST_SUCCESS:
      return {
        loading: false,
        artists: action.payload.artists,
        nbHits: action.payload.nbHits,
        success:action.payload.success
      };
    case GET_ARTIST_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
