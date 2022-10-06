import { getIngredientsApi, getOrderNumberApi } from "../../api/api";
import { AppDispatch, AppThunk} from "../../store/store";
export const GET_INGREDIENTS:"GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_LOADING:"GET_INGREDIENTS_LOADING" = "GET_INGREDIENTS_LOADING";
export const GET_INGREDIENTS_FAILED:"GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const ADD_INGREDIENT:"ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT:"DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const DELETE_INGREDIENTS_CONSTRUCTOR:"DELETE_INGREDIENTS_CONSTRUCTOR" = "DELETE_INGREDIENTS_CONSTRUCTOR";
export const ADD_INGREDIENTS_CONSTRUCTOR:"ADD_INGREDIENTS_CONSTRUCTOR" = "ADD_INGREDIENTS_CONSTRUCTOR";
export const GET_ORDER_LOADING:"GET_ORDER_LOADING" = "GET_ORDER_LOADING";
export const GET_ORDER:"GET_ORDER" = "GET_ORDER";
export const GET_ORDER_FAILED:"GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const SET_TOTAL:"SET_TOTAL" = "SET_TOTAL";
export const TOOGLE_INGREDIENTS_CONSTRUCTOR:"TOOGLE_INGREDIENTS_CONSTRUCTOR" = "TOOGLE_INGREDIENTS_CONSTRUCTOR";
export type TTodoActions = 
    | IgetIngredientsAction
  |IGetIngredientsLoadingAction
  | IGetIngredientsFailedAction
  | IAddIngredientAction 
  | IDeleteIngredientAction 
  | IDeleteIngredientsConsructorAction
  | IAddIngredientsConstructorAction 
  | IGetOrderLoadingAction
  |  IGetOrderAction 
  | IGetOrderFailedAction
  | ISetTotalAction
  | IToogleIngredientsConstructorAction 

export interface IgetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: any;
}
export interface IGetIngredientsLoadingAction {
  readonly type: typeof GET_INGREDIENTS_LOADING;
  
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: any;
}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;

}

export interface IDeleteIngredientsConsructorAction {
  readonly type: typeof DELETE_INGREDIENTS_CONSTRUCTOR;
  readonly payload: [];
}

export interface IAddIngredientsConstructorAction {
    readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR;
    readonly payload: [];

}
export interface IGetOrderLoadingAction {
  readonly type: typeof GET_ORDER_LOADING;

}
export interface IGetOrderAction {
   readonly type: typeof GET_ORDER;
   readonly payload: any;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;

}
export interface ISetTotalAction {
   readonly type: typeof SET_TOTAL;
   readonly payload: number;

}
export interface IToogleIngredientsConstructorAction {
  readonly type: typeof TOOGLE_INGREDIENTS_CONSTRUCTOR;
  readonly payload: [];
}
export function getOrderNumber(data:object){
  return function (dispatch:AppDispatch) {
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
  return function (dispatch:AppDispatch) {
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
