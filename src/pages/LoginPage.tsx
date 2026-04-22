import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleLogin = async () => {

        try {
            const log_data = await login(email, password);
            localStorage.setItem('token', log_data.access_token);
            navigate('/tasks')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail || 'Login failed')
            }
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Welcome back</h1>

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Login
                    </button>

                    <p className="text-gray-400 text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-400 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;