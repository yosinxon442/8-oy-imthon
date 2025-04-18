// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Phone, Lock } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && !value.startsWith('+998')) {
      setPhone('+998');
    } else {
      setPhone(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!/^\+998\d{9}$/.test(phone)) {
      setError('Iltimos, toʻgʻri telefon raqam kiriting (masalan: +998901234567)');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat boʻlishi kerak');
      setIsSubmitting(false);
      return;
    }

    try {
      await login(phone, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Kirish muvaffaqiyatsiz. Iltimos, qayta urinib koʻring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/logo.png" alt="UzLib" className="login-logo" />
          <h1>Tizimga kirish</h1>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <Phone className="input-icon" />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+998 XX XXX XX XX"
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Kirish...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
