import axios from 'axios';
import { FETCH_PUGS, FETCH_IMAGE, PUG_CARE } from './actionTypes';
import originalPugs from '../pugs.json';

export const fetchPugs = () => async dispatch => {
/*     const pugsWithImages = await originalPugs.map(pug => {
        const response = axios.get('http://pugme.herokuapp.com/random');
        pug.url = response.pug;
    }); */
    dispatch({ type: FETCH_PUGS, payload: originalPugs });
};

export const fetchImage = () => async dispatch => {
    console.log('About to fetch image...');
/*     const response = await axios.create({
        baseURL: 'https://pugme.herokuapp.com',
        headers: {
            'Access-Control-Allow-Origin': 'https://pugme.herokuapp.com',
            'Content-Type': 'application/json'
        }
    }).get('/random'); */
    const response = await axios.get('/random');
/* 
    const response = await axios('https://pugme.herokuapp.com/random', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        credentials: 'same-origin'
    }); */


    console.log('fetchImage action response.data.pug', response.data.pug);
    dispatch({ type: FETCH_IMAGE, payload: response.data.pug });
}

export const servicePug = (pugId, amount) => dispatch => {
    dispatch({ type: PUG_CARE, payload: { pugId, amount } });
};
