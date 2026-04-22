import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import axios from "axios";

const RegistrationPage = () => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    const handleRegistration = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await register(username, email, password)
            navigate('/login')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail || 'Registration failed')
            }
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-2 text-center">Create an account</h1>
                <p className="text-gray-400 text-center mb-6">Join us and start managing your tasks!</p>

                <form onSubmit={handleRegistration} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="text-red-400">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Register
                    </button>

                    <p className="text-gray-400 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;