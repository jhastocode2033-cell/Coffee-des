import axios from "axios"

const api = axios.create({
  baseURL: "https://api.weatherstack.com",
});

export default api;