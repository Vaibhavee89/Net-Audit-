import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import AuditPhase from './pages/AuditPhase'

function ProtectedRoute({ children }) {
  const { user: currentUser, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return currentUser ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/audit/:phaseId" 
              element={
                <ProtectedRoute>
                  <AuditPhase />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App