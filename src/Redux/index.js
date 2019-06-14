import { applyMiddleware, createStore, compose } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import myReducer from './Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(myReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;