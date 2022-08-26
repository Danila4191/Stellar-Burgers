import { combineReducers } from "redux";
import {
  ingredientsReducer,
  ingredientsConstructorReducer,
  totalReducer,
  orderReducer,
  ingredientReducer,
} from "./ingredientsReducers/ingredientsReducers";
import { loginReducer, userReducer } from "./userReducers/userReducers";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  reducer: orderReducer,
  total: totalReducer,
  Login: loginReducer,
  User: userReducer,
});
