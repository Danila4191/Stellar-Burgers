import { Middleware, MiddlewareAPI } from "redux";
import { IWsActions } from "../actions/soketAction/soketAction";
import { TWSActions } from "../types/types";

//////////////////////////////////////////////////////////

export const socketMiddleware =( wsUrl:string , wsActions:IWsActions) => {
  return (store:any) => {
   
    let socket:any = null;

    return (next:any) => (action:any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsActions.wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}${payload.url}`);
  
      } 
      if (socket ) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event:any) => {
          dispatch({ type: wsActions.onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event:any) => {
          alert("Пожалуйста отключите adBlock, чтобы приложение работало нормально. Рекламы тут нет.")
          dispatch({ type: wsActions.onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        if (type === wsActions.wsInit) {
          socket.onmessage = (event:any) => {
            const { data } = event;
            dispatch({ type: payload.caseNameOnMessage, payload: data });
          };
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event:any) => {
          dispatch({ type: wsActions.onClose, payload: event });
        };

        if (type === wsActions.wsSendMessage) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
