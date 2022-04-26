import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  addProductReducer,
  ArtistProductsReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./Reducers/ProductReducer";
import {
  forgotPasswordReducer,
  updateUserReducer,
  userReducer,
} from "./Reducers/UserReducer";
import { addItemReducer, myWishListReducer } from "./Reducers/WishlistReducer";
import { artistListReducer, userListReducer } from "./Reducers/AdminReducer";
import { cartReducer } from "./Reducers/CartReducer";
import {
  orderReducer,
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
} from "./Reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  addwishList: addItemReducer,
  myWishList: myWishListReducer,
  newReview: newReviewReducer,
  artistProducts: ArtistProductsReducer,
  addProduct: addProductReducer,
  product: productReducer,
  users: userListReducer,
  artists: artistListReducer,
  cart: cartReducer,
  order: orderReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
