import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


const apiUrl = "/choreo-apis/reactdjangoapp/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL: apiUrl // access the url from .env file
})

// add the token to the request accepted everytime using api and axios
api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default api