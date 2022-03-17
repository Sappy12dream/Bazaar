import {
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_RESET,
  ADD_TO_WISHLIST_SUCCESS,
} from "../ActionTypes/whishlistActionType";

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST_REQUEST:
            
            break;
    
        default:
            return state;
    }
};
