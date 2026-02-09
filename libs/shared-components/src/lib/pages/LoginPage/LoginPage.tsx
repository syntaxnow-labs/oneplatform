import React, { useState } from 'react';
import  Button from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Card } from '../../components/Card/Card';
import styles from './LoginPage.module.css';

export interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  logo?: string;
  companyName?: string;
  isLoading?: boolean;
  error?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  logo,
  companyName = 'OnePlatform',
  isLoading = false,
  error
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.loginCard}>
        <div className={styles.header}>
          {logo && <img src={logo} alt={companyName} className={styles.logo} />}
          <h1>{companyName}</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className={styles.actions}>
            {onForgotPassword && (
              <button 
                type="button" 
                className={styles.link}
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            )}
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          {onSignUp && (
            <div className={styles.signup}>
              Don't have an account?{' '}
              <button 
                type="button" 
                className={styles.link}
                onClick={onSignUp}
              >
                Sign up
              </button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};