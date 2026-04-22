import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

api.interceptors.response.use(
    (response) => response,  // якщо ок — пропускаємо
    (error) => {
        if (error.response?.status === 401) {
            // logout
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api