import api from './axios';

type AssistantApiResponse = { message: string }

export const sendMessageToAssistant = async (message: string): Promise<string> => {
    const response = await api.post<AssistantApiResponse>('/assistant', { message });

    return response.data.message;
}