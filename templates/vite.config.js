import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Force IPv4 to avoid EACCES on ::1
    port: 3000,         // Use a common available port
    proxy: {
      '/login': 'http://localhost:5000',
      '/signup': 'http://localhost:5000',
      '/logout': 'http://localhost:5000',
      '/phase1': 'http://localhost:5000',
      '/phase2': 'http://localhost:5000',
      '/phase3': 'http://localhost:5000',
      '/phase4': 'http://localhost:5000',
      '/phase5': 'http://localhost:5000',
      '/phase6': 'http://localhost:5000',
      '/phase7': 'http://localhost:5000',
      '/phase8': 'http://localhost:5000',
      '/phase9': 'http://localhost:5000',
      '/phase10': 'http://localhost:5000',
      '/phase11': 'http://localhost:5000',
    }
  }
})