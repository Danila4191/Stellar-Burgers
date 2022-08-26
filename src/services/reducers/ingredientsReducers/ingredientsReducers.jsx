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
} from "../../actions/ingredientsActions/ingredientsActions";

const ingredientsState = {
  productData: [],
  loading: false,
  failed: false,
};
const ingredientState = {
  data: null,
};
const orderState = {
  data: "",
  loading: false,
  failed: false,
};
const ingredientsConstructorState = {
  items: [],
};
const totalState = {
  total: 0,
};
export const totalReducer = (state = totalState, action) => {
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
export const ingredientsReducer = (state = ingredientsState, action) => {
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
export const ingredientReducer = (state = ingredientState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, data: action.payload };
    case DELETE_INGREDIENT:
      return { ...state, data: null };
    default:
      return state;
  }
};
export const orderReducer = (state = orderState, action) => {
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
  action
) => {
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
