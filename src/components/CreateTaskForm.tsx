import { useState } from "react";
import { createTask } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateTaskFormProps {
  onTaskCreated: () => void
}

const CreateTaskForm = ({ onTaskCreated }: CreateTaskFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => createTask(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setTitle('')
      setDescription('')
      onTaskCreated()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500

"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
      />
      <button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors">
        {mutation.isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form >
  )
}

export default CreateTaskForm;