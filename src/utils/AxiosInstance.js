import axios from 'axios';

const axioInstance = axios.create({
    baseURL: 'http://localhost:4000',
})

export default axioInstance;