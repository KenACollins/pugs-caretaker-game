import { combineReducers } from 'redux';
//import { reducer as reduxForm } from 'redux-form';
import fetchAllReducer from './fetchAllReducer';
import careReducer from './careReducer';

/**
 * We want to give some thought to the property names we assign for the elements of state we are tracking. 
 * In the case of Redux Form, it requires the key to be named 'form'.
 */

export default combineReducers({
    //form: reduxForm,
    pugs: fetchAllReducer,
    careForPug: careReducer
});
