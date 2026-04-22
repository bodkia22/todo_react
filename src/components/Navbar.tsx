import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import { useQuery } from '@tanstack/react-query'

const NavBar = () => {
    const navigate = useNavigate()
    const { data: user } = useQuery({
        queryKey: ['me'],
        queryFn: getCurrentUser
    })


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <nav className="w-full bg-gray-800 px-8 py-4 flex items-center justify-between">
            <h1 className="text-white font-bold text-xl">Todo App</h1>
            <span className="text-gray-400 text-sm">
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