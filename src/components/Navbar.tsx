import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from "../api/axios";

const NavBar = () => {
  const navigate = useNavigate()
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUser
  })
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    try {
      await api.post('auth/logout')
    } catch (error) {
      console.error('Logout request failed', error)
    }
    queryClient.clear()
    navigate('/login')
  }

  return (
    <nav className="w-full bg-gray-800 px-8 py-4 flex items-center gap-6">
      <h1 className="text-white font-bold text-xl">Weekly Planner</h1>

      <div className="flex gap-4">
        <Link to="/tasks" className="text-gray-400 hover:text-white transition-colors">
          Tasks
        </Link>
        <Link to="/assistant" className="text-gray-400 hover:text-white transition-colors">
          Assistant
        </Link>
      </div>

      <span className="text-gray-400 text-sm ml-auto">
        {user?.username} | {user?.email}
      </span>

      <button
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;