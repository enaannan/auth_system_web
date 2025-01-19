import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401){
            console.info("Unauthorized")
        }
       return Promise.reject(error)}
);

export default axiosInstance;