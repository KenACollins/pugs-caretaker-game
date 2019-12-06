import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';      // Actual export name is "combineReducers".

/**
 * Create Redux store and pass the following parameters.
 * 1) All reducers.
 * 2) Initial state of application - most relevant when taking care of server-side rendering.  For now pass in empty object.
 * 3) Middleware - Redux Thunk.
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
 * Provider is a React component that knows how to read data from Redux store. Any time that Redux store state changes, 
 * Provider will notify all of its child components with the new state.
 */
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);
