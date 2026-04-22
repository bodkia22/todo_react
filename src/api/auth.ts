import type { LoginResponse, RegisterResponse, UserResponse } from '../types/auth';
import api from './axios';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('auth/login', { email, password })

    return response.data;
}

export const register = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('auth/register', { username, email, password })

    return response.data;
}

export const getCurrentUser = async (): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('auth/me')
    return response.data
}