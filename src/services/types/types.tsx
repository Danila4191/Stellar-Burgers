import React from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";
import {
  IAuthLoginAction,
  IAuthLoginLoadingAction,
  IAuthLoginFailedAction,
  IGetUserAction,
  IGetUserLoadingAction,
  IGetUserFailedAction,
  IAuthOutAction,
  IAuthOutLoadingAction,
  IAuthOutFailedAction,
  IAuthOutFailedReloadAction,
} from "../actions/userActions/userActions";
import {
  IGetIngredientsAction,
  IGetIngredientsLoadingAction,
  IGetIngredientsFailedAction,
  IAddIngredientAction,
  IDeleteIngredientAction,
  IDeleteIngredientsConsructorAction,
  IAddIngredientsConstructorAction,
  IGetOrderLoadingAction,
  IGetOrderAction,
  IGetOrderFailedAction,
  ISetTotalAction,
  IToogleIngredientsConstructorAction,
} from "../actions/ingredientsActions/ingredientsActions";
import {
  IWsConnectionSuccessAction,
  IWsGetMessageAction,
  IWsConnectionStartAction,
  IWsSendMessageAction,
  IWsConnectionClosedAction,
  IWsConnectionErrorAction,
  IWsConnectionStartProfileAction,
  IWsGetMessageProfileAction,
} from "../actions/soketAction/soketAction";
import {
  Action,
  ActionCreator,
} from "redux";
import  { ThunkAction } from "redux-thunk";
//export const useDispatchTyped = () => useDispatch<AppDispatch | AppThunk>();
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;
export const useDispatchTyped = () => useDispatch<AppDispatch>();

export interface IApproutesProps {
  auth: boolean;
  setOnCloseFunc: (func: ()=>void) => void; 
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement | null) => void;
  modalActive: boolean;
  onCloseFunc: (() => void) | undefined;
  modal: React.ReactElement | null;
  setAuth:(active: boolean) => void
}
export interface IAppHeaderProps {
  auth: boolean;
}
export interface Scroll {
  y: number
}
export interface IModalOverlayProps {
  active: boolean;
  onCloseFunc: (() => void) | undefined;
  children: React.ReactChild | React.ReactNode;
}
export interface IModalProps {
  active: boolean;
  onCloseFunc: (() => void) | undefined;
  children: React.ReactChild | React.ReactNode;
}
export interface IMobileMenuProps {
  auth: boolean;
  setMenuMobileActive: (active: boolean) => void;
  menuMobileActive: boolean;
}
export interface IMenuProps {
  text?: string;
  setMenuMobileActive?: (active: boolean) => void;
}
export interface INavigationProps {
  auth: boolean;
  setMenuMobileActive?: (active: boolean) => void;
  menuMobileActive?: boolean;
}
export interface IAuthLogin {
  user?: IGetUser;
  accessToken: string;
  refreshToken: string;
  
}
export interface IisMobile {
  isMobile: boolean
}
export interface IcodeSend {
  codeSend: boolean
  setCodeSend:(any:any) => void
}
export interface IGetUser {
  email: string;
  name: string;
}
export interface IingredientObjectProps {
  _id: string;
  image: string;
  price: number;
  image_mobile: string;
  number: number;
  name: string;
  calories: string;
  proteins: string;
  fat: string;
  status: string;
  carbohydrates: string;
  type: string;
  idKey?: string;
}
export interface IFormProps {
  title?: string;
  button: string;
  buttonState: boolean;
  buttonCansel: () => void;
  buttonFunc: () => void;
  children: React.ReactChild | React.ReactNode;
}
export interface IOrderProps {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface IOrderNewProps {
  ingredients: IingredientObjectProps[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface IOrdersProps {
  success: boolean
  total: number;
  totalToday: number;
  orders: IOrderProps[];
}
export interface IFeedProps {
  setOnCloseFunc: (func: ()=>void) => void; 
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement | null) => void;
  modalActive: boolean;
  orders: IOrdersProps;
}
export interface IFeedOrdersProps {
  setOnCloseFunc: (func: ()=>void) => void;
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement | null) => void;
  modalActive: boolean;
  orders: IOrderProps[]; 
}
export interface IFeedOrderProps {
  time: string;
  orderId: number;
  title: string;
  status: string;
  setOnCloseFunc: (func: ()=>void) => void; 
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement | null) => void;
  modalActive: boolean;
  orders: string[]; 
}
export interface IValidationProps {
  error: boolean;
  errorText: string;
}
export interface IProfileOrdersProps {
  setOnCloseFunc: (func: ()=>void) => void; 
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement | null) => void;
  modalActive: boolean;
  orders: IOrdersProps; 
}
export interface ILoginProps {
  lastPage: string | null;
  auth: boolean;
  setlastPage: (link: string | null) => void;
  setAuth:(active: boolean) => void
}
export interface IProtectedRouteProps {
  auth: boolean;
  link?: string;
  setlastPage?: (link: string) => void;
  children: JSX.Element | null;
}
export interface IFeedIdElementProps {
  title: string;
  count: number;
  price: number;
  img: string;
}
export interface IFeedIdProps {
  orderId?: number;
  modalActive?: boolean;
}
export interface IIngredientsProps {
  setOnCloseFunc: (func: ()=>void) => void | undefined; 
  setModalActive: (active: boolean) => void;
  setModal: (any: React.ReactElement) => void;
  modalActive: boolean;
  pageChange: () => void;
}
export interface IIngredientProps {
  setOnCloseFunc: (func: any) => void;
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement) => void;
  modalActive: boolean;
  ingredient: IingredientObjectProps;
}
export interface IIngredientsGridProps {
  id: string;
  title: string;
  children: React.ReactChild | React.ReactNode;
}
export interface IIngredientConctructorProps {
  ingredient: IingredientObjectProps;
  position?: "bottom" | "top" | undefined;
}
export interface IBurgerConstructorProps {
  setOnCloseFunc: (func: ()=>void) => void; 
  setModalActive: (active: boolean) => void;
  setModal: (modal: React.ReactElement) => void;
  pageChange: () => void;
}
export interface IOutProps {
 
  setAuth: (active: boolean) => void;

}
export type TAllActions =
TWSActions|TUserActions|TIngredientsActions
export type TWSActions =
  | IWsConnectionSuccessAction
  | IWsGetMessageAction
  | IWsConnectionStartAction
  | IWsSendMessageAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsConnectionStartProfileAction
  | IWsGetMessageProfileAction;
export type TUserActions =
  | IAuthLoginAction
  | IAuthLoginLoadingAction
  | IAuthLoginFailedAction
  | IGetUserAction
  | IGetUserLoadingAction
  | IGetUserFailedAction
  | IAuthOutAction
  | IAuthOutLoadingAction
  | IAuthOutFailedAction
  | IAuthOutFailedReloadAction;
export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsLoadingAction
  | IGetIngredientsFailedAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IDeleteIngredientsConsructorAction
  | IAddIngredientsConstructorAction
  | IGetOrderLoadingAction
  | IGetOrderAction
  | IGetOrderFailedAction
  | ISetTotalAction
  | IToogleIngredientsConstructorAction;


  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TAllActions>
  >;
  export type AppDispatch = typeof store.dispatch;