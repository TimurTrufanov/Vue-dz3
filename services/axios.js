import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.jikan.moe/v4/',
    headers:{
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;