import type { Task, TaskUpdate } from '../types/task';
import api from './axios';

export const getTasksForCurrentUser = async (): Promise<Task[]> => {
    const response = await api.get('/tasks');

    return response.data;
}

export const createTask = async (title: string, description: string): Promise<Task> => {
    const response = await api.post('/tasks', {
        title,
        description
    });

    return response.data;
}

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`tasks/${id}`);
}

export const updateTask = async (id: number, updates: TaskUpdate): Promise<Task> => {
    const response = await api.put(`tasks/${id}`, updates);
    return response.data;
}