import axios from "axios";

const baseURL = import.meta.env.VITE_API_HOST
const http = axios.create({
    baseURL
});

export default http;
