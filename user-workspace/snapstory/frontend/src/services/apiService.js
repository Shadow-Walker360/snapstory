import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const { getToken } = useAuth();
    const token = await getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle error responses
    if (error.response) {
      const { status, data } = error.response;
      
      // Custom error handling based on status codes
      switch (status) {
        case 401:
          // Handle unauthorized access
          break;
        case 403:
          // Handle forbidden access
          break;
        case 404:
          // Handle not found errors
          break;
        case 500:
          // Handle server errors
          break;
        default:
          // Handle other errors
      }
      
      return Promise.reject(data?.message || 'An error occurred');
    }
    return Promise.reject(error.message || 'Network error');
  }
);

// HTTP methods
export const get = (url, params) => api.get(url, { params });
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const patch = (url, data) => api.patch(url, data);
export const del = (url) => api.delete(url);

// File upload helper
export const upload = (url, file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });
};

export default api;