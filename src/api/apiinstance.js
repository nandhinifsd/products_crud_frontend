import axios from 'axios';

const api = axios.create({
    baseURL: "https://productscrudbackend.vercel.app"
})
export default api;
