import axios from 'axios';

const keys = require('../config/keys');

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: `Client-ID ${keys.UNSPLASH_API_KEY}`
    }
});