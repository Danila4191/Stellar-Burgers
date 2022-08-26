import { useNavigate } from "react-router-dom";
import {
  getIngredientsApi,
  getOrderNumberApi,
  authLoginApi,
  getUserApi,
  getTokenApi,
} from "../api/api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_LOADING = "GET_INGREDIENTS_LOADING";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const DELETE_INGREDIENTS_CONSTRUCTOR = "DELETE_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_CONSTRUCTOR = "ADD_INGREDIENTS_CONSTRUCTOR";
export const GET_ORDER_LOADING = "GET_ORDER_LOADING";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SET_TOTAL = "SET_TOTAL";
export const TOOGLE_INGREDIENTS_CONSTRUCTOR = "TOOGLE_INGREDIENTS_CONSTRUCTOR";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_LOADING = "AUTH_LOGIN_LOADING";
export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";
export const GET_USER = "GET_USER";
export const GET_USER_LOADING = "GET_USER_LOADING";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const AUTH_OUT = "AUTH_OUT";
export const AUTH_OUT_LOADING = "AUTH_OUT_LOADING";
export const AUTH_OUT_FAILED = "AUTH_OUT_FAILED";

export function deleteCookie(name) {
  // Находим куку по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(name, null, { expires: -1 });
}
function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getOrderNumber(data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_LOADING,
    });
    getOrderNumberApi(data)
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: GET_ORDER,
            payload: {
              data: dataFromServer.order.number,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        alert(`Ошибка ${err.status}`);
      });
  };
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LOADING,
    });
    getIngredientsApi()
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: GET_INGREDIENTS,
            payload: {
              productData: dataFromServer.data,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        alert(`Ошибка ${err.status}`);
      });
  };
}

export function authLogin(data) {
  return function (dispatch) {
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
        alert(`Ошибка ${err.status}`);
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_LOADING,
    });
    getUserApi()
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: GET_USER,
            payload: {
              userData: dataFromServer.user,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
       /* if (err.status !== "403") {
          dispatch({
            type: GET_USER_FAILED,
          });
          alert(`Ошибка ${err.status}`);
        }*/
      });
  };
}

export function getToken(data) {
  return function (dispatch) {
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
          window.location.reload();
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

/*

export function authOut(data) {
  return function (dispatch) {
    dispatch({
      type: AUTH_OUT_LOADING,
    });
    authLoginApi(data)
      .then((dataFromServer) => {
        if (dataFromServer) {
          dispatch({
            type: AUTH_OUT,
            payload: {
              user: dataFromServer.user,
              accessToken: dataFromServer.accessToken,
              refreshToken: dataFromServer.refreshToken,
            },
          });
        }
      
        let authToken;
        if (dataFromServer.accessToken.indexOf("Bearer") === 0) {
          authToken = dataFromServer.accessToken.split("Bearer ")[1];
        }
        if (authToken) {
          setCookie("token", authToken);
        }
       
        dispatch({ type: GET_USER, payload:  });
   
      })
      .catch((err) => {
        dispatch({
          type: AUTH_OUT_FAILED,
        });
        alert(`Ошибка ${err.status}`);
      });
  };
}
*/

/*
export function seacrchEmail() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LOADING,

    });
    getIngredientsApi().then((dataFromServer) =>{
    if(dataFromServer){
          dispatch({
            type: GET_INGREDIENTS,
            payload: {
              productData: dataFromServer.data,
            },
          });}
        })
        .catch( (err)=> {
            dispatch({
              type: GET_INGREDIENTS_FAILED,
        
            });
            alert(`Ошибка ${err.status}`);
          })
        };
};*/

/*
export function registrationApi() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LOADING,

    });
    getIngredientsApi().then((dataFromServer) =>{
    if(dataFromServer){
          dispatch({
            type: GET_INGREDIENTS,
            payload: {
              productData: dataFromServer.data,
            },
          });}
        })
        .catch( (err)=> {
            dispatch({
              type: GET_INGREDIENTS_FAILED,
        
            });
            alert(`Ошибка ${err.status}`);
          })
        };
};
*/
