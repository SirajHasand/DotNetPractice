
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5179/api',
}); 
export const getAllEmployees = () => API.get('/employees');
export const getEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (data) => API.post(`/employees`,data);
export const updateEmployee = (id,data) => API.put(`/employees/${id}`,data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const getAllDepartments = () => API.get('/department');
