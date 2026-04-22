import { useState } from "react";
import { createTask } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateTaskForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => createTask(title, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            setTitle('')
            setDescription('')
            setIsOpen(false)
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate()
    }

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-3"
            >
                {isOpen ? '✕ Cancel' : '+ New Task'}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-800 p-6 rounded-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                        />
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                            {mutation.isPending ? 'Creating...' : 'Create Task'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskForm;