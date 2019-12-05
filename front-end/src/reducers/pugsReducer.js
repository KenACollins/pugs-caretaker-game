import { FETCH_PUGS, PUG_CARE } from '../actions/actionTypes';

/**
 * The pugsReducer reducer handles all actions that affect the state.pugs property.
 * 
 * Set default return value for state.pugs property to an empty array indicating when app first boots up, we do not yet have a list of pugs.
 * Thereafter, we will return an updated list of pugs.
 */
export default function(pugs = [], action) {
    switch (action.type) {
        case FETCH_PUGS:    // Retrieve list of pugs from data source.
            return action.payload;
        case PUG_CARE:      // Support the 'Feed Me' and 'Walk Me' buttons which alter the weightInPounds property of a specific pug.
            return pugs.map(pug => {    // Loop through all the pugs and locate the one whose ID matches that of the pug being cared for.
                if (pug.id === action.payload.pugId) {
                    pug.weightInPounds = pug.weightInPounds + action.payload.weightChange;
                 }
                return pug;
            });
        default:
            return pugs;
    }
}