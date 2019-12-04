import { PUG_CARE } from './actionTypes';

export const servicePug = (pugId, amount) => {
    return {
        type: PUG_CARE,
        payload: {
            pugId: pugId,
            amount: amount
        }
    };
};