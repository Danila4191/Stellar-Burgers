import { rootReducer } from '../reducers/rootReducer'; 
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middleware/soketMiddleware';
import { wsActions } from '../actions/soketAction/soketAction';
let wsURL =  "wss://norma.nomoreparties.space/orders/all"

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
    const enhancer = composeEnhancers(applyMiddleware(thunk),socketMiddleware(wsURL, wsActions ) )  ;


export const store = createStore(rootReducer, enhancer);

