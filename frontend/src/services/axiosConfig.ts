import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.SERVER_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
