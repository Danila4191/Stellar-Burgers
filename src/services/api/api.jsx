import baseUrl from "../../utils/utils";
import { getCookie } from "../../utils/cookie/cookie";
export const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function getIngredientsApi() {
  return fetch(`${baseUrl}/ingredients`).then((res) => onResponce(res));
}

export const getOrderNumberApi = (data) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const getEmailCodeApi = (data) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const resetPasswordApi = (data) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const registrationApi = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const authLoginApi = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const getUserApi = (data) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const userFixApi = (data) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};

export const authOutApi = (data) => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
export const getTokenApi = (data) => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => onResponce(res));
};
