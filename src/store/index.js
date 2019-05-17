import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import forecast from './forecast';
import location from './location';
import temp from './temp';
import news from './news';

const reducer = combineReducers({
  forecast, location, temp, news,
});

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggingMiddleware)));


export default store;
export * from './temp';
export * from './location';
export * from './forecast';
export * from './news';
