import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN,
  GET_USER,
  GET_USER_LOADING,
  GET_USER_FAILED,
  AUTH_LOGIN_FAILED_RELOAD,
} from "../../actions/userActions/userActions";
export interface IloginState {
  user: [] | null;
  loading: boolean;
  failed: boolean;
  accessToken: string;
  refreshToken: string;
}
export interface IuserData {
  name: string;
  email: string;
}
export interface IuserState {
  userData: IuserData | null;
  loading: boolean;
  failed: boolean;
}
const loginState: IloginState = {
  user: null,
  loading: false,
  failed: false,
  accessToken: "",
  refreshToken: "",
};
const userState: IuserState = {
  userData: null,
  loading: false,
  failed: false,
};
export const loginReducer = (state = loginState, action: any): IloginState => {
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
    case AUTH_LOGIN_FAILED_RELOAD:
      return {
        ...state,
        loading: false,
        failed: false,
      };
    default:
      return state;
  }
};

export const userReducer = (state = userState, action: any): IuserState => {
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
