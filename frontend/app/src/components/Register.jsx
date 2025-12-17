import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showNotification('❌ Şifreler eşleşmiyor!', 'error');
      return;
    }
    
    if (formData.password.length < 6) {
      showNotification('❌ Şifre en az 6 karakter olmalı!', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.success) {
        showNotification('✅ Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        navigate('/login');
      } else {
        showNotification('❌ Kayıt işlemi başarısız. Lütfen tekrar deneyin.', 'error');
      }
    } catch (error) {
      showNotification('❌ Kayıt işlemi başarısız. Lütfen tekrar deneyin.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass">
        <div className="auth-avatar">
          <i className="fas fa-user-plus"></i>
        </div>
        
        <div className="auth-tabs register-active">
          <Link to="/login" className="tab-btn">
            <i className="fas fa-sign-in-alt"></i> Giriş Yap
          </Link>
          <button className="tab-btn active">
            <i className="fas fa-user-plus"></i> Kayıt Ol
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="👤 Ad Soyad"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="✉️ E-posta adresiniz"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="🔒 Şifre"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="🔒 Şifre Tekrar"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className={`submit-btn ${loading ? 'btn-loading' : ''}`}>
            <span className="btn-text">
              <i className="fas fa-user-plus"></i> Kayıt Ol
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
