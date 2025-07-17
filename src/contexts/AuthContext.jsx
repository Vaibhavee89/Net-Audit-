import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import axios from 'axios';
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
 return auth.createUserWithEmailAndPassword(email, password);
  }
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
  }, []);
  function login(email, password) {
 return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
 return auth.signOut();
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });
  
    

//   const logout = async () => {
//     try {
//       await axios.get('/logout')
//     } catch (error) {
//       console.log('Logout error:', error)
//     } finally {
//       setUser(null)
//       localStorage.removeItem('networkaudit_token')
//       localStorage.removeItem('networkaudit_user')
//     }
//   }

//   const value = {
//     currentUser,
//     login,
//     signup,
//  logout
//   }

  return (
    <AuthContext.Provider value={value}>
 {!loading && children}
    </AuthContext.Provider>
  )
}