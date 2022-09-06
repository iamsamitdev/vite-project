import axios from "axios";

const authService = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  },
});

export default authService;