import { START_GAME } from '../actions/actionTypes';

export default function(loadOriginalPugsList = true, action) {
    switch (action.type) {
        case START_GAME: return action.payload;
        default:
            return loadOriginalPugsList;
    }
}