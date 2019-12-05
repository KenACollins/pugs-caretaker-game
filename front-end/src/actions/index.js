import axios from 'axios';
import { FETCH_PUGS, FETCH_IMAGE, PUG_CARE } from './actionTypes';
import originalPugs from '../pugs.json';

/**
 * Both the fetchPugs and fetchImage action creators make third party API calls to retrieve one random URL to an image of a pug.
 * The third party API that returns random images of pugs, http://pugme.herokuapp.com/random, does not include a 
 * 'Access-Control-Allow-Origin' header in its response and this causes a CORS error. To avoid this nuisance, I installed 
 * http-proxy-middleware and configured src/setupProxy.js file.
 * 
 * The API response is in the data property and has the form {"pug":"http://27.media.tumblr.com/tumblr_ltuo57ahqE1qa6z3eo1_500.jpg"}
 * so I extract the image URL from response.data.pug property.
 */

export const fetchPugs = () => async dispatch => {
    // Loop through each of the pugs and retrieve an image URL that is then appended to url property of each pug.
    const promisesArray = await originalPugs.map(async pug => {
        const response = await axios.get('/random');
        pug.url = response.data.pug;
        return pug;
    });
    const pugsWithImages = await Promise.all(promisesArray);
    dispatch({ type: FETCH_PUGS, payload: pugsWithImages });
};

export const fetchImage = () => async dispatch => {
    const response = await axios.get('/random');
    dispatch({ type: FETCH_IMAGE, payload: response.data.pug });
}

export const servicePug = (pugId, amount) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, amount } });
};
