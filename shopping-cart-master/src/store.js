import {
   createStore,
   applyMiddleware,
   compose
} from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

const initState = {};

const middleware = [thunk];

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initState, enhancer);

export default store;