import axios from "axios";

const api = axios.create({
    baseURL: "https://emissions-api.onrender.com/",
});

export default api;