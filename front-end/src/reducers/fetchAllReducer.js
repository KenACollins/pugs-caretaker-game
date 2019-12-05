import { FETCH_PUGS, PUG_CARE } from '../actions/actionTypes';

/**
 * States:
 * 1. Set default return value to an empty array indicating when app first boots up, we do not yet have a list of pugs.
 * 2. When we have gotten a response from our action, it will be an array of pugs passed in the action.payload which we 
 *    want to return immediately.
 */
export default function(pugs = [], action) {
    switch (action.type) {
        case FETCH_PUGS:
            return action.payload;
        case PUG_CARE:
            return pugs.map(pug => {
                if (pug.id === action.payload.pugId) {
                    pug.weightInPounds = pug.weightInPounds + action.payload.weightChange;
                 }
                return pug;
            });
        default:
            return pugs;
    }
}