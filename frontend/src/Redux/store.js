import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./Reducers/ProductReducer";
import { userReducer } from "./Reducers/UserReducer";

const reducer = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer,
    user: userReducer
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
