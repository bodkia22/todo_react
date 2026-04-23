import { useState, type FormEvent } from "react";
interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        onSend(input)
        setInput('')
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-800 px-8 py-4"
        >
            <div className="max-w-3xl mx-auto flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Напиши щось..."
                    disabled={disabled}
                    className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                    Send
                </button>
            </div>
        </form>)
}

export default ChatInput;