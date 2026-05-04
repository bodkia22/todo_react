import api from "./axios"

interface ChatRequest {
  conversation_id?: number
  content: string
}

interface ChatResponse {
  conversation_id: number
  message: string
}

export const sendChatMessage = async (payload: ChatRequest): Promise<ChatResponse> => {

  const response = await api.post<ChatResponse>('/chat', payload);
  return response.data
}