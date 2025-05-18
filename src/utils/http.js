import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://swiftport-logistics-production.up.railway.app/api';

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // ✅ Add this only if you're using cookies/sessions
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
