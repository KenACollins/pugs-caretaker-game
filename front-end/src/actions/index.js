// import axios from 'axios';
import unsplash from '../api/unsplash';
import { START_GAME, FETCH_PUGS, FETCH_IMAGE, PUG_CARE, PUG_NEGLECTED } from './actionTypes';
import { ADD_PUG, REMOVE_PUG, COUNT_DEAD_PUGS } from './actionTypes';
import originalPugs from '../pugs.json';

// const imageUrI = (window.location.href.includes('localhost:30')) ? '/random' : '/proxy/random';

/**
 * The fetchImage() action creator makes third party API calls to retrieve one random URL to an image of a pug. 
 * 
 * I originally tried using the suggested third party API, http://pugme.herokuapp.com/random, which returns its response in the
 * data property and has the form {"pug":"http://27.media.tumblr.com/tumblr_ltuo57ahqE1qa6z3eo1_500.jpg"} so the image URL can be
 * extracted from the response.data.pug property.
 * 
 * I found that this suggested third party API does not include an Access-Control-Allow-Origin header in its HTTP response and this 
 * causes the web browser to issue an access forbidden Error 403 accompanied by a CORS warning that cross-site requests are refused. 
 * I was able to get around this nuisance on my local development server running at localhost:3000, by installing the 
 * http-proxy-middleware package in the front-end React app and by configuring src/setupProxy.js file.
 * 
 * However,the victory was short lived when the same problem resurfaced after I deployed my app on a production cloud service
 * hosted by Heroku. My attempts at configuring a server-side proxy showed signs of success, but I was missing some small configuration
 * step and the result was that I still was getting the access forbidden Error 403. 
 * 
 * My final recourse was to abandon the suggested third party API mentioned above in favor of using an API from Unsplash.com, that can
 * also return a random image of a pug on each request, where I have a registered account as a developer and have been issued an API key.
 * 
 * The API response is in the data property and has the form {"pug":"http://27.media.tumblr.com/tumblr_ltuo57ahqE1qa6z3eo1_500.jpg"}
 * so we extract the image URL from response.data.pug property.
 */

// Retrieves a random image of a pug and stores its URL in state.lastRetrievedPugImageUrl property.
export const fetchImage = () => async dispatch => {
/*     const response = await axios.get('/random');
    dispatch({ type: FETCH_IMAGE, payload: response.data.pug }); */
    const response = await unsplash.get('/photos/random', {
        params: { query: 'pugs' }
    });
    dispatch({ type: FETCH_IMAGE, payload: response.data.urls.small });
}

// Loads initial set of pugs from data store and obtains an image for each one. 
export const fetchPugs = () => async (dispatch, getState) => {
    // Loop through each of the pugs and retrieve an image URL that is then appended to url property of each pug.
    const promisesArray = await originalPugs.map(async pug => {
        await dispatch(fetchImage());   // Invoke fetchImage() action creator above and wait for it to finish setting state.lastRetrievedPugImageUrl property.
        pug.url = getState().lastRetrievedPugImageUrl;  // getState() is passed to this action creator and is updated after previous line alters state. 
        return pug;
    });
    const pugsWithImages = await Promise.all(promisesArray);
    dispatch({ type: FETCH_PUGS, payload: pugsWithImages });
};

// Sets Boolean flag after initial game start to prevent PugList from reloading original set of pugs, wiping out current state of pugs.
export const startGame = () => dispatch => {
    dispatch({ type: START_GAME, payload: false });
};

// Processes 'Feed Me' and 'Walk Me' button clicks.
export const servicePug = (pugId = null, weightChange = 0) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, weightChange } });
};

// Processes pug becoming unhealthy due to neglect.
export const pugNeglected = (pugId = null) => dispatch => {
    dispatch({ type: PUG_NEGLECTED, payload: { pugId } });
};

// Handles new pug form submission and obtains an image for it.
export const submitPugRequest = (formValues, history) => async (dispatch, getState) => {
    await dispatch(fetchImage());
    dispatch({ type: ADD_PUG, payload: {...formValues, url: getState().lastRetrievedPugImageUrl } });
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