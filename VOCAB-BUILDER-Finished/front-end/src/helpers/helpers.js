import axios from 'axios';

// Create Axios instance with baseURL pointing to backend server
const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add token to headers before every request, if available
apiInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Named export for API usage throughout the app
export const api = {
  // User login
  login: async (credentials) => {
    const response = await apiInstance.post('/users/login', credentials);
    return response.data;
  },

  // User registration
  register: async (credentials) => {
    const response = await apiInstance.post('/users/register', credentials);
    return response.data;
  },

  // Get all users (admin only)
  getUsers: async () => {
    const response = await apiInstance.get('/users');
    return response.data;
  },

  // Vocabulary APIs
  getWords: async () => {
    const response = await apiInstance.get('/words');
    return response.data;
  },

  getWord: async (id) => {
    const response = await apiInstance.get(`/words/${id}`);
    return response.data;
  },

  createWord: async (payload) => {
    const response = await apiInstance.post('/words', payload);
    return response.data;
  },

  updateWord: async (payload) => {
    const response = await apiInstance.put(`/words/${payload._id}`, payload);
    return response.data;
  },

  deleteWord: async (id) => {
    const response = await apiInstance.delete(`/words/${id}`);
    return response.data;
  }
};
