import { COUNT_DEAD_PUGS } from '../actions/actionTypes';

export default function(deadPugsCount = 0, action) {
    switch (action.type) {
        case COUNT_DEAD_PUGS: return deadPugsCount + 1;
        default:
            return deadPugsCount;
    }
}