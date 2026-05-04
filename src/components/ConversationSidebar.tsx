import { useQuery } from "@tanstack/react-query"
import { getConversations } from "../api/conversations"
import { Link } from "react-router-dom"

interface ConversationSidebarProps {
  activeConversationId?: number
}

const ConversationSidebar = ({ activeConversationId }: ConversationSidebarProps) => {

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations
  })

  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col gap-1">
      {conversations.map(c => (
        <Link
          key={c.id}                     // ← key тепер на Link
          to={`/assistant/${c.id}`}
          className={`block px-3 py-2 rounded ${activeConversationId === c.id
            ? 'bg-blue-500'
            : 'hover:bg-gray-700'
            }`}
        >
          {c.title ?? 'Untitled'}
        </Link>
      ))}
    </aside>
  )
}

export default ConversationSidebar