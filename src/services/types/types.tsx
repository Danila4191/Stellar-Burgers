import React, { FC } from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, AppThunk } from "../store/store";

export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;
//export const useDispatchTyped = () => useDispatch<AppDispatch | AppThunk>();
export const useDispatchTyped = () => useDispatch<AppDispatch>();

export interface ApproutesProps {
  auth: boolean;
  setOnCloseFunc: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<undefined>>;
  modalActive: boolean;
  onCloseFunc: (() => void) | undefined;
  modal: any;
  //children: React.ReactChild
}
export interface ProtectedRouteProps {
  auth: boolean;
  link?: string;
  setlastPage?: (link: string) => void;
  children: React.ReactChild | React.ReactNode | undefined;
}
export interface ModalOverlayProps {
  active: boolean;
  onCloseFunc: (() => void) | undefined;
  children: React.ReactChild | React.ReactNode;
}
export interface ModalProps {
  active: boolean;
  onCloseFunc: (() => void) | undefined;
  children: React.ReactChild | React.ReactNode;
}
export interface MobileMenuProps {
  auth: boolean;
  setMenuMobileActive: (any: boolean) => void;
  menuMobileActive: boolean;
}
export interface MenuProps {
  text?: string;
  setMenuMobileActive?: (any: boolean) => void;
}
export interface NavigationProps {
  auth: boolean;
  setMenuMobileActive?: (any: boolean) => void;
  menuMobileActive?: boolean;
}

export interface ingredientObjectProps {
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
export interface FormProps {
  title?: string;
  button: string;
  buttonState: boolean;
  buttonCansel: () => void;
  buttonFunc: () => void;
  children: React.ReactChild | React.ReactNode;
}
export interface OrderProps {
  ingredients: ingredientObjectProps[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface OrdersProps {
  total: number;
  totalToday: number;
  orders: OrderProps[];
}
export interface FeedOrdersProps {
  setOnCloseFunc: (any: any) => void;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  modalActive: boolean;
  orders: any;
}
export interface FeedOrderProps {
  time: string;
  orderId: number;
  title: string;
  status: string;
  setOnCloseFunc: (any: any) => void;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  modalActive: boolean;
  orders: any;
}
export interface ValidationProps {
  error: boolean;
  errorText: string;
}
export interface ProfileOrdersProps {
  setOnCloseFunc: (any: any) => void;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  modalActive: boolean;
  orders: any;
}
export interface LoginProps {
  lastPage: string;
  auth: boolean;
  setlastPage: (any: any) => void;
}
export interface FeedIdElementProps {
  title: string;
  count: string;
  price: number;
  img: string;
}
export interface FeedIdProps {
  orderId?: number;
  modalActive?: boolean;
}
export interface IngredientsProps {
  setOnCloseFunc: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  modalActive: boolean;
  pageChange: () => void;
}
export interface IngredientProps {
  setOnCloseFunc: (any: any) => void;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  modalActive: boolean;
  ingredient: ingredientObjectProps;
}
export interface IngredientsGridProps {
  id: string;
  title: string;
  children: React.ReactChild | React.ReactNode;
}
export interface IngredientConctructorProps {
  ingredient: ingredientObjectProps;
  position?: "bottom" | "top" | undefined;
}
export interface BurgerConstructorProps {
  setOnCloseFunc: (any: any) => void;
  setModalActive: (any: boolean) => void;
  setModal: (any: any) => void;
  pageChange: () => void;
}
