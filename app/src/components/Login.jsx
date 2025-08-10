import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.success) {
        showNotification('🎉 Hoş geldiniz! Giriş başarılı.');
        navigate('/');
      } else {
        showNotification('❌ Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.', 'error');
      }
    } catch (error) {
      showNotification('❌ Giriş yapılamadı. Lütfen tekrar deneyin.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass">
        <div className="auth-avatar">
          <i className="fas fa-running"></i>
        </div>
        
        <div className="auth-tabs">
          <button className="tab-btn active">
            <i className="fas fa-sign-in-alt"></i> Giriş Yap
          </button>
          <Link to="/register" className="tab-btn">
            <i className="fas fa-user-plus"></i> Kayıt Ol
          </Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="✉️ E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="🔒 Şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className={`submit-btn ${loading ? 'btn-loading' : ''}`}>
            <span className="btn-text">
              <i className="fas fa-sign-in-alt"></i> Giriş Yap
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
