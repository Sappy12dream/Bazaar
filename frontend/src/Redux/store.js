import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ArtistProductsReducer, newReviewReducer, productDetailsReducer, productsReducer } from "./Reducers/ProductReducer";
import { forgotPasswordReducer, updateUserReducer, userReducer } from "./Reducers/UserReducer";
import { addItemReducer, myWishListReducer } from "./Reducers/WishlistReducer";

const reducer = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer,
    user: userReducer,
    profile: updateUserReducer,
    forgotPassword:forgotPasswordReducer,
    addwishList:addItemReducer,
    myWishList: myWishListReducer,
    newReview: newReviewReducer,
    artistProducts: ArtistProductsReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
