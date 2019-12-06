import { FETCH_PUGS, PUG_CARE } from '../actions/actionTypes';
import { LOW_WEIGHT_TEMPERAMENT, HIGH_WEIGHT_TEMPERAMENT } from './unhealthyStates';
import { LOW_WEIGHT_THRESHOLD, HIGH_WEIGHT_THRESHOLD } from './unhealthyStates';

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
        case PUG_CARE:      // Support the 'Feed Me' and 'Walk Me' buttons.
            return pugs.map(pug => {    // Loop through all the pugs and locate the one whose ID matches that of the pug being cared for.
                if (pug.id === action.payload.pugId) {
                    // Process weight gain or loss.
                    pug.weightInPounds = pug.weightInPounds + action.payload.weightChange;

                    // The pugs.temperament property is an array, initially with one element containing the pug's original disposition.
                    // The PugCard component knows to display whatever is contained in the first element of this array.
                    // If the current change in weight causes pug to become unhealthy, we want to change the on-screen temperament
                    // without losing the original temperament because that value will be restored on-screen if pug returns to health.
                    // Therefore, we temporarily insert a new unhealthy temperament into the first position of the array. 
                    if (pug.weightInPounds < LOW_WEIGHT_THRESHOLD) {
                        pug.isUnhealthy = true;
                        if (pug.temperament.length === 1) { pug.temperament.unshift(LOW_WEIGHT_TEMPERAMENT); }  // Insert new unhealthy temperament in first position.
                        else {  // Otherwise, pug.temperament array already has two elements, replace first one just to be sure. 
                            // Pug may already have been below 10 pounds and recent action kept it in that range, or pug may have been precisely 10 pounds, neglected, then walked and reduced down to 9.75 pounds.
                            pug.temperament[0] = LOW_WEIGHT_TEMPERAMENT;
                        }
                    }
                    else if (pug.weightInPounds > HIGH_WEIGHT_THRESHOLD) {
                        pug.isUnhealthy = true;
                        if (pug.temperament.length === 1) { pug.temperament.unshift(HIGH_WEIGHT_TEMPERAMENT); }
                        else {
                            pug.temperament[0] = HIGH_WEIGHT_TEMPERAMENT;
                        }
                    }
                    else {  // Otherwise, pug is in safe range. Remove unhealthy temperament from first position in array if present.
                        pug.isUnhealthy = false;
                        if (pug.temperament.length === 2) { pug.temperament.shift(); }
                    }
                 }
                return pug;
            });
        default:
            return pugs;
    }
}