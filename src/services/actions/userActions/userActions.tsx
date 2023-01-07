import { setCookie, getCookie } from "../../../utils/cookie/cookie";
import { authLoginApi, getUserApi, getTokenApi } from "../../api/api";
import { AppDispatch,IAuthLogin,IGetUser,Ilogin,Itoken } from "../../types/types";

export const AUTH_LOGIN: "AUTH_LOGIN" = "AUTH_LOGIN";
export const AUTH_LOGIN_LOADING: "AUTH_LOGIN_LOADING" = "AUTH_LOGIN_LOADING";
export const AUTH_LOGIN_FAILED: "AUTH_LOGIN_FAILED" = "AUTH_LOGIN_FAILED";
export const GET_USER: "GET_USER" = "GET_USER";
export const GET_USER_LOADING: "GET_USER_LOADING" = "GET_USER_LOADING";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const AUTH_OUT: "AUTH_OUT" = "AUTH_OUT";
export const AUTH_OUT_LOADING: "AUTH_OUT_LOADING" = "AUTH_OUT_LOADING";
export const AUTH_OUT_FAILED: "AUTH_OUT_FAILED" = "AUTH_OUT_FAILED";
export const AUTH_LOGIN_FAILED_RELOAD: "AUTH_LOGIN_FAILED_RELOAD" =
  "AUTH_LOGIN_FAILED_RELOAD";


export interface IAuthLoginAction {
  readonly type: typeof AUTH_LOGIN;
  readonly payload: IAuthLogin;
}
export interface IGetUserAction {
  readonly type: typeof GET_USER;
  readonly payload: IGetUser;
}
export interface IAuthLoginLoadingAction {
  readonly type: typeof AUTH_LOGIN_LOADING;
}

export interface IAuthLoginFailedAction {
  readonly type: typeof AUTH_LOGIN_FAILED;
}

export interface IGetUserLoadingAction {
  readonly type: typeof GET_USER_LOADING;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IAuthOutAction {
  readonly type: typeof AUTH_OUT;
}
export interface IAuthOutLoadingAction {
  readonly type: typeof AUTH_OUT_LOADING;
}
export interface IAuthOutFailedAction {
  readonly type: typeof AUTH_OUT_FAILED;
}
export interface IAuthOutFailedReloadAction {
  readonly type: typeof AUTH_LOGIN_FAILED_RELOAD;
}

export function authLogin(data:Ilogin) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_LOGIN_LOADING,
    });
    authLoginApi(data)
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: AUTH_LOGIN,
            payload: {
              user: dataFromServer.user,
              accessToken: dataFromServer.accessToken,
              refreshToken: dataFromServer.refreshToken,
            },
          });
        }

        let authToken;
        let refreshToken;

        if (dataFromServer.accessToken.indexOf("Bearer") === 0) {
          authToken = dataFromServer.accessToken.split("Bearer ")[1];
        }
        if (dataFromServer.refreshToken) {
          refreshToken = dataFromServer.refreshToken;
        }
        if (authToken) {
          setCookie("token", authToken);
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken);
        }
        dispatch(getUser());
      })
      .catch((err) => {
        dispatch({
          type: AUTH_LOGIN_FAILED,
        });
        if (err.status !== 401) {
          alert(`Ошибка ${err.status}`);
        }
      });
  };
}

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_LOADING,
    });
    getUserApi()
      .then((dataFromServer) => {
        if (dataFromServer) {
      
          dispatch({
            type: GET_USER,
            payload: dataFromServer.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
        if (getCookie("refreshToken") !== undefined) {
          dispatch(
            getToken({
              token: getCookie("refreshToken"),
            })
          );
        } else if (err.status !== "403") {
          dispatch({
            type: GET_USER_FAILED,
          });
          alert(`Ошибка ${err.status}`);
        }
      });
  };
}
export function getToken(data: Itoken) {
  return function (dispatch: AppDispatch) {
    getTokenApi(data)
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: AUTH_LOGIN,
            payload: {
              accessToken: dataFromServer.accessToken,
              refreshToken: dataFromServer.refreshToken,
            },
          });

          let authToken;
          if (dataFromServer.accessToken.indexOf("Bearer") === 0) {
            authToken = dataFromServer.accessToken.split("Bearer ")[1];
          }
          if (authToken) {
            setCookie("token", authToken);
          }
          let refreshToken;
          if (dataFromServer.refreshToken) {
            refreshToken = dataFromServer.refreshToken;
          }
          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }
          dispatch(getUser());
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_LOGIN_FAILED,
        });
        alert(`Ошибка ${err.status}`);
      });
  };
}
