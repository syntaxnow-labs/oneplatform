// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from "@oneplatform/shared-components";
import '@oneplatform/shared-components/styles';
import LedgerPage from "../pages/LedgerPage";


export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      // Call your API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route 
          path="/login" 
          element={
            <LoginPage 
              onLogin={handleLogin}
              error={error}
              companyName="Admin Panel"
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <LedgerPage /> : <Navigate to="/login" />} 
        >
        </Route>
      </Routes>
  );
}

export default App;


