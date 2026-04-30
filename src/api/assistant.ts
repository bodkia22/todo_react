import type { Message } from '../types/message';
import api from './axios';

type AssistantApiResponse = { message: string }

export const sendMessageToAssistant = async (messages: Message[]): Promise<string> => {

  const cleanMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }))

  const response = await api.post<AssistantApiResponse>('/assistant', { messages: cleanMessages });

  return response.data.message;
}