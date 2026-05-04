import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteConversation, getConversations } from "../api/conversations"
import { Link, useNavigate } from "react-router-dom"

interface ConversationSidebarProps {
  activeConversationId?: number
}

const ConversationSidebar = ({ activeConversationId }: ConversationSidebarProps) => {

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations
  })

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });

      if (variables === activeConversationId) {
        navigate('/assistant');
      }
    }
  });

  const handleDelete = (id: number) => {

    deleteMutation.mutate(id);
  }

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col gap-1">
      {conversations.map(c => (
        <Link
          key={c.id}
          to={`/assistant/${c.id}`}
          className={`flex items-center justify-between px-3 py-2 rounded ${activeConversationId === c.id
            ? 'bg-blue-800'
            : 'hover:bg-gray-700'
            }`}
        >
          <span>{c.title ?? 'Untitled'}</span>
          <button className="text-gray-500 hover:text-red-400 transition-colors text-lg leading-none" onClick={() => {
            handleDelete(c.id);
          }} onPointerDown={(e) => e.stopPropagation()}>
            ✕
          </button>
        </Link>
      ))}
    </aside>
  )
}

export default ConversationSidebar