import { FETCH_PUGS } from '../actions/actionTypes';

/**
 * States:
 * 1. Set default return value to an empty array indicating when app first boots up, we do not yet have a list of pugs.
 * 2. When we have gotten a response from our action, it will be an array of pugs passed in the action.payload which we 
 *    want to return immediately.
 */
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PUGS: return action.payload;
        default: return state;
    }
}