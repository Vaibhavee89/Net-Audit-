import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

// Configure axios defaults for Python Flask integration
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('networkaudit_token')
    const userData = localStorage.getItem('networkaudit_user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem('networkaudit_token')
        localStorage.removeItem('networkaudit_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('password', password)

      const response = await axios.post('/login', formData)
      
      if (response.status === 200) {
        const userData = { email, token: 'authenticated' }
        setUser(userData)
        localStorage.setItem('networkaudit_token', 'authenticated')
        localStorage.setItem('networkaudit_user', JSON.stringify(userData))
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Login failed. Please check your credentials.' 
      }
    }
  }

  const signup = async (email, password) => {
    try {
      const formData = new URLSearchParams()
      formData.append('email', email)
      formData.append('password', password)

      const response = await axios.post('/signup', formData)
      
      if (response.status === 200) {
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Signup failed. Please try again.' 
      }
    }
  }

  const logout = async () => {
    try {
      await axios.get('/logout')
    } catch (error) {
      console.log('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('networkaudit_token')
      localStorage.removeItem('networkaudit_user')
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}