import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://landver0.onrender.com/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
  timeout: 6000, 
});

export default axiosInstance;
