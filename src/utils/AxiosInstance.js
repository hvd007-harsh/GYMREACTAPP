import axios from 'axios';

const axioInstance = axios.create({
    baseURL: 'http://localhost:5000',
})

export default axioInstance;