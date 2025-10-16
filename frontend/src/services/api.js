import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// In your api.js, update the request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Making API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData) => 
    api.post('/auth/register', userData),
};

export const resumeAPI = {
  generatePDF: (resumeData, templateId) => 
    api.post('/resume/generate', {
      ...resumeData,
      templateId
    }, {
      responseType: 'blob'
    }),

  saveResume: (resumeData, templateId, name) =>
    api.post('/user/resumes', {
      ...resumeData,
      templateId,
      name
    }),

  getUserResumes: () =>
    api.get('/user/resumes'),

  getResume: (id) =>
    api.get(`/user/resumes/${id}`),

  updateResume: (id, resumeData) =>
    api.put(`/user/resumes/${id}`, resumeData),

  deleteResume: (id) =>
    api.delete(`/user/resumes/${id}`)
};

export default api;