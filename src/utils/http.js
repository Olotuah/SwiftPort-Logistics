import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api'
  : 'https://api.swiftport.org/api';

console.log("ENV:", import.meta.env.MODE);
console.log("Using API:", API_BASE_URL);

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
