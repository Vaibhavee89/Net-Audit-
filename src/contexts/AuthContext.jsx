import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
const AuthContext = createContext()
export function useAuth() {
  return useContext(AuthContext)
}

// Configure axios defaults for Python Flask integration
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return { success: true, user: userCredential.user };
      })
      .catch((error) => {
        return { success: false, error: error.message };
      });
  }
  useEffect(() => {
    const token = localStorage.getItem('networkaudit_token')
    const userData = localStorage.getItem('networkaudit_user')
    
    if (token && userData) {
      try {
        setCurrentUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem('networkaudit_token')
        localStorage.removeItem('networkaudit_user')
      }
    }
    setLoading(false)
  }, []);
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const value = {
    user: currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}