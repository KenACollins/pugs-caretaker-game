import axios from 'axios';
import { FETCH_PUGS, FETCH_IMAGE, PUG_CARE } from './actionTypes';
import cannedData from '../pugs.json';

export const fetchPugs = () => dispatch => {
    dispatch({ type: FETCH_PUGS, payload: cannedData });
};

export const fetchImage = () => async dispath => {
    const response = await axios.get('http://pugme.herokuapp.com/random');
    dispatch({ type: FETCH_IMAGE, payload: response });    // Actually, just one image. Change tense.
}

export const servicePug = (pugId, amount) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, amount } });
};
