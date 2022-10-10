
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE:'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'
export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_SEND_MESSAGE:'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE'
export const WS_CONNECTION_CLOSED:'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_START_PROFILE:'WS_CONNECTION_START_PROFILE' ='WS_CONNECTION_START_PROFILE'
export const WS_GET_MESSAGE_PROFILE:"WS_GET_MESSAGE_PROFILE" = "WS_GET_MESSAGE_PROFILE"

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;

}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: string
}
export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;

}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;

}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: boolean
}

export interface IWsConnectionStartProfileAction {
    readonly type: typeof WS_CONNECTION_START_PROFILE;

}
export interface IWsGetMessageProfileAction {
  readonly type: typeof WS_GET_MESSAGE_PROFILE;
  readonly payload: string
}

  export interface IWsActions {
    wsInit: string,
    wsSendMessage:string,
    onOpen: string,
    onClose: string,
    onError: string,
    onMessage: string
  }

export const wsActions:IWsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
  };
