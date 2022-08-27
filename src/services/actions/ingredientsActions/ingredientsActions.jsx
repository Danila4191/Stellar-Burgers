import { getIngredientsApi, getOrderNumberApi } from "../../api/api";

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
