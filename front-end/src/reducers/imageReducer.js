import { FETCH_IMAGE } from '../actions/actionTypes';

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_IMAGE: return action.payload;
        default: return state;
    }
}