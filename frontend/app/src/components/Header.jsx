import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../hooks/useNotification';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const handleLogout = () => {
    logout();
    showNotification('👋 Başarıyla çıkış yaptınız.');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <i className="fas fa-running"></i>
          </div>
          <span>Spor Arkadaşı</span>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
            <i className="fas fa-home"></i> Ana Sayfa
          </Link>
          <Link to="/create" className={`nav-btn ${isActive('/create') ? 'active' : ''}`}>
            <i className="fas fa-plus-circle"></i> Etkinlik Oluştur
          </Link>
          <Link to="/map" className={`nav-btn ${isActive('/map') ? 'active' : ''}`}>
            <i className="fas fa-map-marker-alt"></i> Harita
          </Link>
          <Link to="/profile" className={`nav-btn ${isActive('/profile') ? 'active' : ''}`}>
            <i className="fas fa-user"></i> Profil
          </Link>
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Çıkış
          </button>
        </nav>
      </div>
    </header>
  );
}
