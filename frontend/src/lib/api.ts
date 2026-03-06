import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const budgetApi = {
  getStateSummary: () => api.get('/budget/state-summary'),
  getSchemeFlow: () => api.get('/budget/scheme-flow'),
};

export const projectApi = {
  list: () => api.get('/projects/'),
  get: (id: number) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects/', data),
};

export const anomalyApi = {
  list: () => api.get('/anomalies/'),
  getHighRisk: () => api.get('/anomalies/high-risk'),
};

export default api;
