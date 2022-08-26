import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN,
  GET_USER,
  GET_USER_LOADING,
  GET_USER_FAILED,
} from "../../actions/userActions/userActions";

const loginState = {
  user: null,
  loading: false,
  failed: false,
  accessToken: "",
  refreshToken: "",
};
const userState = {
  userData: null,
  loading: false,
  failed: false,
};
export const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
      };
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        failed: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case AUTH_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
      };
    default:
      return state;
  }
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
      };
    case GET_USER:
      return {
        ...state,
        userData: action.payload.userData,
        loading: false,
        failed: false,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
      };
    default:
      return state;
  }
};
