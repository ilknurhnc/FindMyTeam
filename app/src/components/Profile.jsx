import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    joinedEvents: 0,
    createdEvents: 0,
    completedEvents: 0,
    sportFriends: 0
  });

  useEffect(() => {
    // Mock istatistikler yükle
    setTimeout(() => {
      setStats({
        joinedEvents: 5,
        createdEvents: 2,
        completedEvents: 3,
        sportFriends: 12
      });
    }, 500);
  }, []);

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
          <h2 className="section-title"><i className="fas fa-chart-line"></i> İstatistiklerim</h2>
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
      </div>
    </main>
  );
}
