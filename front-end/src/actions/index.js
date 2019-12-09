import unsplash from '../api/unsplash';
import { START_GAME, FETCH_PUGS, FETCH_IMAGE, PUG_CARE, PUG_NEGLECTED } from './actionTypes';
import { ADD_PUG, REMOVE_PUG, COUNT_DEAD_PUGS } from './actionTypes';
import originalPugs from '../pugs.json';

// Calls a third party API to retrieve a random image of a pug and store its URL in state.lastRetrievedPugImageUrl property.
export const fetchImage = () => async dispatch => {
    const response = await unsplash.get('/photos/random', { params: { query: 'pugs' } });
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