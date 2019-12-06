import axios from 'axios';
import { FETCH_PUGS, FETCH_IMAGE, PUG_CARE, ADD_PUG, START_GAME } from './actionTypes';
import originalPugs from '../pugs.json';

/**
 * Both the fetchPugs and fetchImage action creators make third party API calls to retrieve one random URL to an image of a pug.
 * The third party API that returns random images of pugs, http://pugme.herokuapp.com/random, does not include a 
 * 'Access-Control-Allow-Origin' header in its response and this causes the web browser to issue a CORS error and refuse to allow
 * the external connection. To avoid this nuisance, we installed http-proxy-middleware and configured src/setupProxy.js file.
 * 
 * The API response is in the data property and has the form {"pug":"http://27.media.tumblr.com/tumblr_ltuo57ahqE1qa6z3eo1_500.jpg"}
 * so we extract the image URL from response.data.pug property.
 */

// Loads initial set of pugs from data store and obtains an image for each one. 
export const fetchPugs = (getState) => async dispatch => {
    // Loop through each of the pugs and retrieve an image URL that is then appended to url property of each pug.
    const promisesArray = await originalPugs.map(async pug => {
        const response = await axios.get('/random');
        pug.url = response.data.pug;
        return pug;
    });
    const pugsWithImages = await Promise.all(promisesArray);
    dispatch({ type: FETCH_PUGS, payload: pugsWithImages });
};

// Retrieves image for new pug that user is adding by filling out and submitting a form.
export const fetchImage = () => async dispatch => {
    const response = await axios.get('/random');
    dispatch({ type: FETCH_IMAGE, payload: response.data.pug });
}

// Processes 'Feed Me' and 'Walk Me' button clicks.
export const servicePug = (pugId = null, weightChange = 0) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, weightChange } });
};

// Handles new pug form submission.
export const submitPugRequest = (formValues, history) => dispatch => {
    dispatch({ type: ADD_PUG, payload: formValues });
    history.push('/pugs');   // React Router way to redirect user after form submission.
};

// Sets Boolean flag after initial game start to prevent PugList from reloading original set of pugs, wiping out current state of pugs.
export const startGame = () => dispatch => {
    dispatch({ type: START_GAME, payload: false });
};
