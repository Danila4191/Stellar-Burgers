import { Middleware, MiddlewareAPI } from "redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_PROFILE,
  WS_GET_MESSAGE_PROFILE
} from "../actions/soketAction/soketAction";
import { getCookie } from "../../utils/cookie/cookie";

//////////////////////////////////////////////////////////

export const socketMiddleware = wsUrl => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === WS_CONNECTION_START_PROFILE) {
  
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${getCookie(`token`)}`);
      }
      if (socket ) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        if (type === WS_CONNECTION_START) {
          socket.onmessage = (event) => {
            const { data } = event;
            dispatch({ type: WS_GET_MESSAGE, payload: data });
          };
        }
        if (type === WS_CONNECTION_START_PROFILE) {
          socket.onmessage = (event) => {
            const { data } = event;
            dispatch({ type: WS_GET_MESSAGE_PROFILE, payload: data });
          };
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
