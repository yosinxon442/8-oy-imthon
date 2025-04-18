// utils/api.ts
import axios from 'axios';

const API_URL = 'https://s-libraries.uz/api/v1/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;