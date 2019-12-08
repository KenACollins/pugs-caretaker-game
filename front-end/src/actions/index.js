import axios from 'axios';
import { START_GAME, FETCH_PUGS, FETCH_IMAGE, PUG_CARE } from './actionTypes';
import { ADD_PUG, REMOVE_PUG, COUNT_DEAD_PUGS } from './actionTypes';
import originalPugs from '../pugs.json';

const imageUrI = (window.location.href.includes('localhost:3000')) ? '/random' : 'https://localhost:5000/random';

// Sets Boolean flag after initial game start to prevent PugList from reloading original set of pugs, wiping out current state of pugs.
export const startGame = () => dispatch => {
    dispatch({ type: START_GAME, payload: false });
};

/**
 * Both the fetchPugs and submitPugRequest action creators make third party API calls to retrieve one random URL to an image of a pug.
 * The third party API that returns random images of pugs, http://pugme.herokuapp.com/random, does not include a 
 * 'Access-Control-Allow-Origin' header in its response and this causes the web browser to issue a CORS error and refuse to allow
 * the external connection. To avoid this nuisance, we installed http-proxy-middleware and configured src/setupProxy.js file.
 * 
 * The API response is in the data property and has the form {"pug":"http://27.media.tumblr.com/tumblr_ltuo57ahqE1qa6z3eo1_500.jpg"}
 * so we extract the image URL from response.data.pug property.
 */

// Loads initial set of pugs from data store and obtains an image for each one. 
export const fetchPugs = () => async dispatch => {
    // Loop through each of the pugs and retrieve an image URL that is then appended to url property of each pug.
    const promisesArray = await originalPugs.map(async pug => {
        const response = await axios.get('/random');
        console.log(response);
        pug.url = response.data.pug;
        return pug;
    });
    const pugsWithImages = await Promise.all(promisesArray);
    dispatch({ type: FETCH_PUGS, payload: pugsWithImages });
};

// Retrieves an image of a pug not associated with any displayed on-screen.
// ABANDONED: 
// This action creator and its corresponding imageReducer reducer are not being used.
// I thought I would need this for new pug form submission but could not find a way to
// invoke this action creator in the PugAddForm and PugFormEdit components managed by 
// Redux Form.
export const fetchImage = () => async dispatch => {
    const response = await axios.get(imageUrI);
    dispatch({ type: FETCH_IMAGE, payload: response.data.pug });
}

// Processes 'Feed Me' and 'Walk Me' button clicks.
export const servicePug = (pugId = null, weightChange = 0) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, weightChange } });
};

// Handles new pug form submission and obtains an image for it.
export const submitPugRequest = (formValues, history) => async dispatch => {
    const response = await axios.get(imageUrI);
    dispatch({ type: ADD_PUG, payload: {...formValues, url: response.data.pug } });
    history.push('/pugs');   // React Router way to redirect user after form submission.
};

// Removes pug that has died from list of pugs maintained in memory.
export const removePug = (pugId = null) => dispatch => {
    dispatch({ type: REMOVE_PUG, payload: { pugId } });
};

// Counts the number of pugs that have died under the caretaker's watch.
export const countDeadPugs = () => dispatch => {
    dispatch({ type: COUNT_DEAD_PUGS });
};