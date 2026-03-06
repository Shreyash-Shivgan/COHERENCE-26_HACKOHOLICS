import axios from 'axios';

// Base API instance — Vite proxy forwards /api to backend
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('govflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ──────────────────────────────────────────────────────────
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  role: string;
  department?: string;
}

export interface UserInfo {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department: string;
  profile_completed: boolean;
  phone: string;
  designation: string;
  officer_id: string;
  state: string;
  district: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserInfo;
}

export const authApi = {
  login: (data: LoginPayload) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterPayload) =>
    api.post<AuthResponse>('/auth/register', data),

  me: () => api.get<UserInfo>('/auth/me'),

  updateProfile: (data: Partial<UserInfo>) =>
    api.put<UserInfo>('/auth/profile', data),
};

// ─── Dashboard ─────────────────────────────────────────────────────
export interface DashboardSummary {
  totalAllocated: number;
  totalUtilized: number;
  activeAnomalies: number;
  riskScore: number;
  utilizationPct: number;
  allocationVsUtilization: { month: string; allocated: number; utilized: number }[];
  anomaliesTrend: { month: string; count: number }[];
  label: string;
  projectCount: number;
}

export const dashboardApi = {
  getSummary: (state: string, district?: string) =>
    api.get<DashboardSummary>('/dashboard/summary', {
      params: { state, district },
    }),
};

// ─── Projects ──────────────────────────────────────────────────────
export interface ProjectData {
  project_id: number;
  project_name: string;
  project_type: string | null;
  project_budget: number;
  project_status: string;
  department: string | null;
  scheme: string | null;
  vendor: string | null;
  state: string | null;
  district: string | null;
  utilized_amount: number;
  start_date: string | null;
  end_date: string | null;
  anomaly_flag: boolean;
}

export interface FlowNodeData {
  level: number;
  levelLabel: string;
  entity: string;
  role: string;
  allocated: number;
  disbursed: number;
  utilized: number;
  date: string;
  status: string;
  alert?: string | null;
}

export const projectsApi = {
  list: (params: {
    state: string;
    district?: string;
    department?: string;
    scheme?: string;
    status?: string;
    vendor?: string;
    search?: string;
  }) =>
    api.get<ProjectData[]>('/projects', { params }),

  getById: (id: number) =>
    api.get<ProjectData>(`/projects/${id}`),

  getFlow: (id: number) =>
    api.get<FlowNodeData[]>(`/projects/${id}/flow`),
};

// ─── Anomalies ─────────────────────────────────────────────────────
export interface AnomalyData {
  id: number;
  anomaly_id: string;
  project_id: number;
  project_name: string;
  department: string;
  scheme: string;
  vendor: string;
  project_status: string;
  anomaly_type: string;
  severity: string;
  status: string;
  description: string;
  amount_at_risk: number;
  date: string;
  district: string;
  state: string;
}

export const anomaliesApi = {
  list: (params: {
    state: string;
    district?: string;
    department?: string;
    scheme?: string;
    vendor?: string;
    severity?: string;
    status?: string;
    search?: string;
  }) =>
    api.get<AnomalyData[]>('/anomalies', { params }),
};

// ─── Complaints ────────────────────────────────────────────────────
export interface ComplaintPayload {
  project_id: number;
  project_name: string;
  department: string;
  scheme: string;
  vendor: string;
  issue_type: string;
  rating: number;
  description: string;
  photo_count: number;
  reporter_name: string;
  reporter_phone: string;
  photos?: string[];
}

export const complaintsApi = {
  submit: (data: ComplaintPayload) =>
    api.post('/complaints', data),

  list: () => api.get('/complaints'),
};

// ─── Predict (ML) ──────────────────────────────────────────────────
export const predictApi = {
  predict: (features: number[]) =>
    api.post('/predict/', features),
};

export default api;
