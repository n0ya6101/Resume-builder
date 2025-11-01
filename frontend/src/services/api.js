import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

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
      message: error.message,
      code: error.code
    });
    
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server took too long to respond');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error - check if backend is running on port 8080');
    } else if (error.response?.status === 401) {
      console.error('Unauthorized - token may be expired');
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    
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
      responseType: 'blob',
      timeout: 60000 // 60 seconds for PDF generation
    }),

  saveResume: async (resumeData, templateId, name) => {
    try {
      const response = await api.post('/user/resumes', {
        ...resumeData,
        templateId,
        name
      });
      
      // Extract the resume from the response wrapper
      return {
        ...response,
        data: response.data.resume || response.data
      };
    } catch (error) {
      console.error('Save resume error:', error);
      throw error;
    }
  },

  getUserResumes: () =>
    api.get('/user/resumes'),

  getResume: (id) =>
    api.get(`/user/resumes/${id}`),

  updateResume: async (id, resumeData) => {
    try {
      const response = await api.put(`/user/resumes/${id}`, resumeData);
      
      // Extract the resume from the response wrapper
      return {
        ...response,
        data: response.data.resume || response.data
      };
    } catch (error) {
      console.error('Update resume error:', error);
      throw error;
    }
  },

  deleteResume: (id) =>
    api.delete(`/user/resumes/${id}`)
};

export default api;