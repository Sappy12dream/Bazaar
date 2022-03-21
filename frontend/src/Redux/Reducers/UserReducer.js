import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_RESET,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  CLEAR_ERRORS,
  ARTIST_LOGIN_REQUEST,
  ARTIST_LOGIN_SUCCESS,
  ARTIST_LOGIN_FAIL,
  ARTIST_REGISTER_REQUEST,
  ARTIST_REGISTER_SUCCESS,
  ARTIST_REGISTER_FAIL,
  LOAD_ARTIST_REQUEST,
  LOAD_ARTIST_SUCCESS,
  LOAD_ARTIST_FAIL,
  ARTIST_UPDATE_REQUEST,
  ARTIST_UPDATE_SUCCESS,
  ARTIST_UPDATE_FAIL,
  ARTIST_UPDATE_RESET,
  ARTIST_UPDATE_PASSWORD_REQUEST,
  ARTIST_UPDATE_PASSWORD_SUCCESS,
  ARTIST_UPDATE_PASSWORD_FAIL,
  ARTIST_UPDATE_PASSWORD_RESET,
  LOGOUT_ARTIST_SUCCESS,
  LOGOUT_ARTIST_FAIL,
  ARTIST_FORGOT_PASSWORD_REQUEST,
  ARTIST_FORGOT_PASSWORD_SUCCESS,
  ARTIST_FORGOT_PASSWORD_FAIL,
  ARTIST_FORGOT_PASSWORD_RESET,
  ARTIST_RESET_PASSWORD_SUCCESS,
  ARTIST_RESET_PASSWORD_FAIL,
  ARTIST_RESET_PASSWORD_REQUEST,
} from "../ActionTypes/userActionType";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case ARTIST_LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      case LOAD_ARTIST_REQUEST:
    case ARTIST_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case USER_LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case ARTIST_LOGIN_SUCCESS:
    case ARTIST_REGISTER_SUCCESS:
      case LOAD_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.user.role
        
      };
    case LOGOUT_USER_SUCCESS:
      case LOGOUT_ARTIST_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case ARTIST_LOGIN_FAIL:
    case ARTIST_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      case LOAD_ARTIST_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER_FAIL:
      case LOGOUT_ARTIST_FAIL:
      return {
        ...state,
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

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      case ARTIST_UPDATE_REQUEST:
    case USER_UPDATE_PASSWORD_REQUEST:
      case ARTIST_UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      case ARTIST_UPDATE_SUCCESS:
    case USER_UPDATE_PASSWORD_SUCCESS:
      case ARTIST_UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case USER_UPDATE_FAIL:
      case ARTIST_UPDATE_FAIL:
    case USER_UPDATE_PASSWORD_FAIL:
      case ARTIST_UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      case ARTIST_UPDATE_RESET:
    case USER_UPDATE_PASSWORD_RESET:
      case ARTIST_UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
    case USER_RESET_PASSWORD_REQUEST:
      case ARTIST_RESET_PASSWORD_REQUEST:
      case ARTIST_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_FORGOT_PASSWORD_SUCCESS:
      case ARTIST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case USER_RESET_PASSWORD_SUCCESS:
      case ARTIST_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case USER_FORGOT_PASSWORD_FAIL:
    case USER_RESET_PASSWORD_FAIL:
      case ARTIST_RESET_PASSWORD_FAIL:
      case ARTIST_FORGOT_PASSWORD_FAIL:

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USER_FORGOT_PASSWORD_RESET:
      case ARTIST_FORGOT_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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
