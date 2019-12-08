import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 2172e2aabb66bc7934f5f8c5fdb6c66bdfd5b5dfd5eed79d4b899ec31c8e50af'
    }
});