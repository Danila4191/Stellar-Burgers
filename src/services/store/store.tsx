import { rootReducer } from '../reducers/rootReducer'; 
import { compose, createStore, applyMiddleware,Action, ActionCreator } from 'redux';
import thunk, { ThunkAction }  from 'redux-thunk';
import { socketMiddleware } from '../middleware/soketMiddleware';
import { wsActions } from '../actions/soketAction/soketAction';
import {
  TAllActions
} from "../types/types";


let wsURL =  "wss://norma.nomoreparties.space/orders"

const composeEnhancers =
//@ts-ignore
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  //@ts-ignore
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
    const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsURL , wsActions) ))  ;

    export const store = createStore(rootReducer, enhancer);
