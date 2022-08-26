import { combineReducers } from "redux";
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
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN,
 GET_USER,
 GET_USER_LOADING ,
 GET_USER_FAILED
} from "../actions/actions";
// типы экшены

// начальные состояния
const  loginState = {
  user: null,
  loading: false,
  failed: false,
  accessToken: "",
  refreshToken: "",
};
const  userState = {
  userData: null,
  loading: false,
  failed: false,
};
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
//экшены

// Редьюсеры
const totalReducer = (state = totalState, action) => {
  switch (action.type) {
    case SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
};
const ingredientsReducer = (state = ingredientsState, action) => {
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
const ingredientReducer = (state = ingredientState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, data: action.payload };
    case DELETE_INGREDIENT:
      return { ...state, data: null };
    default:
      return state;
  }
};
const orderReducer = (state = orderState, action) => {
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


const  LoginReducer = (state = loginState, action) => {
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

const  UserReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_USER_LOADING :
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

    case GET_USER_FAILED :
      return {
        ...state,
        loading: false,
        failed: true,
      };
    default:
      return state;
  }
};


const ingredientsConstructorReducer = (
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

export const RootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  reducer: orderReducer,
  total: totalReducer,
  Login: LoginReducer,
  User: UserReducer,
});
