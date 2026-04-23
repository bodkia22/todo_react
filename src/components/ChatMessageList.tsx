import type { Message } from "../types/message";

interface ChatMessageListProps {
    messages: Message[]
    isPending: boolean
    isError: boolean
}

const ChatMessageList = ({ messages, isPending, isError }: ChatMessageListProps) => {

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-3xl mx-auto flex flex-col gap-3">
                {messages.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        Ask the assistant a question — e.g., "what tasks do I have this week?"
                    </p>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-2xl ${msg.role === 'user'
                                ? 'bg-red-600 text-white rounded-br-sm'
                                : 'bg-gray-800 text-gray-100 rounded-bl-sm'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isPending && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-2xl rounded-bl-sm">
                            ...
                        </div>
                    </div>
                )}

                {isError && (
                    <div className="bg-red-900/50 text-red-200 text-center py-2 rounded-lg text-sm">
                        Something went wrong. Please try again.
                    </div>
                )}
            </div>
        </div>)
}

export default ChatMessageList;