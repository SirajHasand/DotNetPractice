
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5179/api',
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth functions
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

// Employees
export const getAllEmployees = () => API.get('/employees');
export const getEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (data) => API.post(`/employees`,data);
export const updateEmployee = (id,data) => API.put(`/employees/${id}`,data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// Departments
export const getAllDepartments = () => API.get('/department');
export const deleteDepartment = (id) => API.delete(`/department/${id}`);
export const createDepartment = (data) => API.post(`/department`,data);
export const getDepartment = (id) => API.get(`/department/${id}`);
export const updateDepartment = (id,data) => API.put(`/department/${id}`,data);
