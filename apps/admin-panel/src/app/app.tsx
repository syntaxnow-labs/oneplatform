// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginPage } from "@oneplatform/shared-components";
import '@oneplatform/shared-components/styles';


export function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    <BrowserRouter>
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
          element={isAuthenticated ? <div>Dashboard</div> : <Navigate to="/login" />} 
        >
        {/* Default dashboard */}

        <Route path="quotations" element={<div>Quotations</div>} />
        <Route path="invoices" element={<div>Invoices</div>} />
        <Route path="credit-notes" element={<div>Credit Notes</div>} />
        <Route path="catalog" element={<div>Quotations</div>} />
        <Route path="inventory" element={<div>Invoices</div>} />
        <Route path="clients" element={<div>Clients</div>} />
        <Route path="expenses" element={<div>Expenses</div>} />
        <Route path="settings" element={<div>settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
