import { Middleware, MiddlewareAPI } from "redux";



//////////////////////////////////////////////////////////

export const socketMiddleware =( wsUrl , wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === wsActions.wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}${payload}`);
      } 
      if (socket ) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: wsActions.onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          alert("Пожалуйста отключите adBlock, чтобы приложение работало нормально. Рекламы тут нет.")
          dispatch({ type: wsActions.onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        if (type === wsActions.wsInit) {
          socket.onmessage = (event) => {
            const { data } = event;
            dispatch({ type: wsActions.onMessage, payload: data });
          };
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
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
