import { PUG_CARE } from '../actions/actionTypes';

/**
 * States:
 * 1. Set default return value to an empty object indicating when app first boots up, we do not yet have a pug.
 * 2. When we have gotten a response from our action, it will be a specific pug whose weight needs to change 
 *    which we need to calculate and return immediately.
 */
export default function(pug = {}, action) {
    switch (action.type) {
        case PUG_CARE: return {...pug, weight: pug.weight + action.payload.amount };
        default: return pug;
    }
}