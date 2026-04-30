import { useState } from "react";
import type { Message } from '../types/message';
import { useMutation } from "@tanstack/react-query";
import { sendMessageToAssistant } from "../api/assistant";
import NavBar from "../components/Navbar";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";

const AssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const mutation = useMutation({
    mutationFn: sendMessageToAssistant,
    onSuccess: (reply) => {
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'assistant', content: reply }])
    },
  })

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }

    const updatedMessages = [...messages, userMsg]   // ← новий масив руками

    setMessages(updatedMessages)

    mutation.mutate(updatedMessages)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-8">
      <NavBar />
      <ChatMessageList
        messages={messages}
        isPending={mutation.isPending}
        isError={mutation.isError}
      />
      <ChatInput
        onSend={handleSend}
        disabled={mutation.isPending}
      />
    </div>
  )
}

export default AssistantPage;