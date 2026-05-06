import type { RegisterResponse, UserResponse } from '../types/auth';
import api from './axios';

export const login = async (email: string, password: string): Promise<void> => {
  await api.post('auth/login', { email, password })
}

export const register = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('auth/register', { username, email, password })

  return response.data;
}

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('auth/me')
  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('auth/logout')
}