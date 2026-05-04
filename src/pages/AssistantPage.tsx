import { useState } from "react";
import type { Message } from '../types/message';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NavBar from "../components/Navbar";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";
import { useNavigate, useParams } from "react-router-dom";
import { sendChatMessage } from "../api/chat";
import { getConversation } from "../api/conversations";
import ConversationSidebar from "../components/ConversationSidebar";

const AssistantPage = () => {

  const { conversationId: conversationIdParam } = useParams()
  const navigate = useNavigate()
  const conversationId: number | undefined = conversationIdParam ? Number(conversationIdParam) : undefined

  const { data: conversation } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversation(conversationId!),
    enabled: conversationId !== undefined,
  })

  const serverMessages: Message[] = (conversation?.messages ?? []).map(m => ({
    id: String(m.id),
    role: m.role,
    content: m.content,
  }))


  const [messages, setMessages] = useState<Message[]>([])
  const queryClient = useQueryClient()

  const allMessages = [...serverMessages, ...messages]

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (reply) => {

      if (!conversationId) {
        navigate(`/assistant/${reply.conversation_id}`)
      }
      queryClient.invalidateQueries({ queryKey: ['conversation', reply.conversation_id] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      setMessages([])
    },
  })

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }

    setMessages(prev => [...prev, userMsg])

    mutation.mutate({ content: text, conversation_id: conversationId })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <ConversationSidebar activeConversationId={conversationId} />
        <div className="flex flex-col flex-1">
          <ChatMessageList
            messages={allMessages}
            isPending={mutation.isPending}
            isError={mutation.isError}
          />
          <ChatInput
            onSend={handleSend}
            disabled={mutation.isPending}
          />
        </div>
      </div>
    </div>
  )
}

export default AssistantPage;