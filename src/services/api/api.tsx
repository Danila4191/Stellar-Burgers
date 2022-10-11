import baseUrl from "../../utils/utils";
import { getCookie } from "../../utils/cookie/cookie";
import { IResetPassword,IEmailCode,Iuser,Ilogin,Itoken } from "../types/types";
export const onResponce = (res:Response) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function getIngredientsApi() {
  return fetch(`${baseUrl}/ingredients`).then((res) => onResponce(res));
}

export const getOrderNumberApi = (data:object) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const getEmailCodeApi = (data:IEmailCode) => {

  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const resetPasswordApi = (data:IResetPassword) => {

  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const registrationApi = (data:Iuser) => {
 
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const authLoginApi = (data:Ilogin) => {

  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const getUserApi = (/*data:string*/) => {

  return fetch(`${baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  //  body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const userFixApi = (data:Iuser) => {

  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const authOutApi = (data:Itoken) => {

  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const getTokenApi = (data:Itoken) => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
