import axios from "axios";

const creteAPI = () => {
  const token = localStorage.getItem("token");

  const a = axios.create({
    // baseURL: "https://emissions-api.onrender.com/",
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return a;
};

const api = creteAPI();
export default api;
