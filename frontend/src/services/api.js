import axios from 'axios';

const api = axios.create({
  // Use the environment variable for the live URL, or localhost for development
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  This is an interceptor. It's a special function that runs on every request 
  sent from our frontend. Its job is to check if we have a token in localStorage, 
  and if we do, it adds it to the 'Authorization' header.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // If the token exists, add it to the request headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // If there's an error with the request setup, this will handle it
    return Promise.reject(error);
  }
);

export default api;