import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://landver.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
}); 