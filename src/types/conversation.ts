
export interface MessageRead {
  id: number
  content: string
  role: 'user' | 'assistant'
  created_at: string
}

export interface ConversationRead {
  id: number
  title: string | null
  created_at: string
  updated_at: string
}

export interface ConversationDetail extends ConversationRead {
  messages: MessageRead[]
}
