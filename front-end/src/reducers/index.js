import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import pugsReducer from './pugsReducer';
import imageReducer from './imageReducer';
import gameReducer from './gameReducer';

/**
 * This is where we name our state properties, which we reference in action creators, when using Redux. We want to give some thought 
 * to the property names we assign for the elements of state we are tracking. FYI, Redux Form requires the key to be named 'form'.
 */
export default combineReducers({
    form: reduxForm,
    pugs: pugsReducer,
    image: imageReducer,
    loadOriginalPugsList: gameReducer
});
