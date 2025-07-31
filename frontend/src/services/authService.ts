import axios from '../api/axios';

const API_URL = '/auth';

export interface User {
  id: number;
  username: string;
  email: string;
  profile_image_url?: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
 
const saveAuthData = (data: AuthResponse) => {
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
};
 
export const login = async (
  credentials: { email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
  const data = response.data;
  saveAuthData(data);
  return data;
};
 
export const register = async (
  userData: { username: string; email: string; password: string }
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
  const data = response.data;
  saveAuthData(data);
  return data;
};
 
export const resetPassword = async (
  email: string
): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/reset-password`, { email });
  return response.data;
};
 
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
 
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};
 
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
 
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};
