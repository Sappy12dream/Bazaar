import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  MY_WISHLIST_FAIL,
  MY_WISHLIST_REQUEST,
  MY_WISHLIST_SUCCESS,
  CLEAR_ERRORS,
} from "../ActionTypes/whishlistActionType";

export const addItemReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST_REQUEST:
        return {
          ...state,
          loadng: true,
        };
  
      case ADD_TO_WISHLIST_SUCCESS:
        return {
          loadng: false,
          success: action.payload.success,
        };
  
      case ADD_TO_WISHLIST_FAIL:
        return {
          loading: false,
          err: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          err: null,
        };
  
      default:
        return state;
    }
  };



  export const myWishListReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case MY_WISHLIST_REQUEST:
        return {
          loading: true,
        };
  
      case MY_WISHLIST_SUCCESS:
        return {
          loading: false,
          items: action.payload.items,
          nbHits: action.payload.nbHits,

        };
  
      case MY_WISHLIST_FAIL:
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