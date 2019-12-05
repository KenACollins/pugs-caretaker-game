import { combineReducers } from 'redux';
//import { reducer as reduxForm } from 'redux-form';
import pugsReducer from './pugsReducer';
import imageReducer from './imageReducer';

/**
 * This is where we name our state properties when using Redux. We want to give some thought 
 * to the property names we assign for the elements of state we are tracking. 
 * In the case of Redux Form, it requires the key to be named 'form'.
 */
export default combineReducers({
    //form: reduxForm,
    pugs: pugsReducer,
    image: imageReducer
});
