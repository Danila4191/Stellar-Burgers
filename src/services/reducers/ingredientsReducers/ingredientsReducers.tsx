import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_LOADING,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  DELETE_INGREDIENTS_CONSTRUCTOR,
  ADD_INGREDIENTS_CONSTRUCTOR,
  GET_ORDER,
  SET_TOTAL,
  TOOGLE_INGREDIENTS_CONSTRUCTOR,
  GET_ORDER_LOADING,
  GET_ORDER_FAILED,
  TTodoActions
} from "../../actions/ingredientsActions/ingredientsActions";
import { ingredientObjectProps } from "../../types/types";
export interface IingredientsState {
  productData: [],
  loading: boolean,
  failed: boolean,
}
export interface IingredientState {
  data: null|ingredientObjectProps,
}
export interface  IorderState {
  data: string|number,
  loading: boolean,
  failed: boolean,
}
export interface IingredientsConstructorState {
  items: [],
}
export interface ItotalState {
  total: number,
}
const ingredientsState:IingredientsState = {
  productData: [],
  loading: false,
  failed: false,
};
const ingredientState:IingredientState = {
  data: null,
};
const orderState:IorderState = {
  data: "",
  loading: false,
  failed: false,
};
const ingredientsConstructorState:IingredientsConstructorState = {
  items: [],
};
const totalState:ItotalState = {
  total: 0,
};
export const totalReducer = (state = totalState, action:TTodoActions):ItotalState => {
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
export const ingredientsReducer = (state = ingredientsState, action:TTodoActions):IingredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        productData: action.payload.productData,
        loading: false,
        failed: false,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
      };
    default:
      return state;
  }
};
export const ingredientReducer = (state = ingredientState, action:TTodoActions):IingredientState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, data: action.payload };
    case DELETE_INGREDIENT:
      return { ...state, data: null };
    default:
      return state;
  }
};
export const orderReducer = (state = orderState, action:TTodoActions):IorderState => {
  switch (action.type) {
    case GET_ORDER_LOADING:
      return {
        ...state,
        loading: true,
        failed: false,
        data: "",
      };
    case GET_ORDER:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        failed: false,
      };
    case GET_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        failed: true,
      };
    default:
      return state;
  }
};

export const ingredientsConstructorReducer = (
  state = ingredientsConstructorState,
  action:TTodoActions
):IingredientsConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENTS_CONSTRUCTOR:
      return { ...state, items: action.payload };
    case DELETE_INGREDIENTS_CONSTRUCTOR:
      return { ...state, items: action.payload };
    case TOOGLE_INGREDIENTS_CONSTRUCTOR:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
