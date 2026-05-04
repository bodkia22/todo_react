import type { ConversationDetail, ConversationRead } from "../types/conversation";
import api from "./axios"

export const getConversations = async (): Promise<ConversationRead[]> => {
  const response = await api.get('/conversations');
  return response.data;
}

export const getConversation = async (id: number): Promise<ConversationDetail> => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
}