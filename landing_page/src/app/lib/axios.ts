import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
  },
});
