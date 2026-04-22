import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TasksPage from './pages/TasksPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/tasks" element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <RegistrationPage />
          </PublicRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App