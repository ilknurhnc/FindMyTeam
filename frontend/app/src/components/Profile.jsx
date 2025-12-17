import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';

export default function Profile() {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();
  const [stats, setStats] = useState({
    joinedEvents: 0,
    createdEvents: 0,
    completedEvents: 0,
    sportFriends: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      console.log('Loading user stats...'); // Debug
      
      const statsData = await apiService.getUserStats();
      console.log('User stats received:', statsData); // Debug
      
      setStats({
        joinedEvents: statsData.joinedEvents || 0,
        createdEvents: statsData.createdEvents || 0,
        completedEvents: statsData.completedEvents || 0,
        sportFriends: statsData.sportFriends || 0
      });
    } catch (error) {
      console.error('User stats loading failed:', error);
      showNotification('❌ İstatistikler yüklenemedi.', 'error');
      // Hata durumunda varsayılan değerler kalsın
      setStats({
        joinedEvents: 0,
        createdEvents: 0,
        completedEvents: 0,
        sportFriends: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="main-content">
        <div className="loading-events">
          <i className="fas fa-spinner fa-spin"></i> İstatistikler yükleniyor...
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="profile-container">
        <section className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user-athlete"></i>
          </div>
          <h2 className="profile-name">{currentUser?.name || 'Kullanıcı'}</h2>
          <p className="profile-email">{currentUser?.email || 'email@example.com'}</p>
        </section>

        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
            <h2 className="section-title">
              <i className="fas fa-chart-line"></i> İstatistiklerim
            </h2>
            <button 
              onClick={loadUserStats}
              className="refresh-btn"
              title="İstatistikleri Yenile"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-value">{stats.joinedEvents}</div>
              <div className="stat-description">Katıldığım Etkinlik</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-plus-circle"></i>
              </div>
              <div className="stat-value">{stats.createdEvents}</div>
              <div className="stat-description">Oluşturduğum Etkinlik</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="stat-value">{stats.completedEvents}</div>
              <div className="stat-description">Tamamlanan Etkinlik</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-value">{stats.sportFriends}</div>
              <div className="stat-description">Spor Arkadaşı</div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 className="section-title">
            <i className="fas fa-info-circle"></i> Bilgi
          </h2>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '20px',
            color: 'white',
            fontSize: '0.9rem'
          }}>
            <p><strong>Katıldığım Etkinlik:</strong> Şu anda katılım gösterdiğiniz toplam etkinlik sayısı</p>
            <p><strong>Oluşturduğum Etkinlik:</strong> Sizin organize ettiğiniz toplam etkinlik sayısı</p>
            <p><strong>Tamamlanan Etkinlik:</strong> Katıldığınız ve tarihi geçmiş etkinlik sayısı</p>
            <p><strong>Spor Arkadaşı:</strong> Ortak etkinliklerde tanıştığınız farklı kullanıcı sayısı</p>
          </div>
        </section>
      </div>
    </main>
  );
}

