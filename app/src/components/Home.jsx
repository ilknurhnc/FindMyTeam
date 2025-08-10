import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalUsers: 0,
    totalEvents: 0,
    totalParticipants: 0
  });
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([
      loadEvents(),
      loadStats()
    ]);
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await apiService.getEvents();
      console.log('Events loaded:', eventsData); // Debug için
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error('Events loading failed:', error);
      showNotification('❌ Etkinlikler yüklenemedi. Backend bağlantısını kontrol edin.', 'error');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await apiService.getStats();
      console.log('Stats loaded:', statsData); // Debug için
      setStats(statsData);
    } catch (error) {
      console.error('Stats loading failed:', error);
      // Stats yüklenemezse varsayılan değerler kalsın
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await apiService.joinEvent(eventId);
      console.log('Join response:', response); // Debug için
      
      if (response.success) {
        showNotification('🎉 Etkinliğe başarıyla katıldınız!');
        await loadEvents(); // Listeyi yenile
      } else {
        showNotification(`❌ ${response.message || 'Katılamadı'}`, 'error');
      }
    } catch (error) {
      console.error('Join event failed:', error);
      showNotification(`❌ ${error.message || 'Etkinliğe katılınamadı'}`, 'error');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      const response = await apiService.leaveEvent(eventId);
      console.log('Leave response:', response); // Debug için
      
      if (response.success) {
        showNotification('👋 Etkinlikten ayrıldınız.');
        await loadEvents(); // Listeyi yenile
      } else {
        showNotification(`❌ ${response.message || 'Ayrılamadı'}`, 'error');
      }
    } catch (error) {
      console.error('Leave event failed:', error);
      showNotification(`❌ ${error.message || 'Etkinlikten ayrılınamadı'}`, 'error');
    }
  };

  return (
    <main className="main-content">
      <section className="hero">
        <h1><i className="fas fa-fire"></i> Find My Team!</h1>
        <p>Çevrendeki sporcularla tanış, etkinliklere katıl ve aktif yaşamının tadını çıkar!</p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.activeEvents}</span>
            <span className="stat-label">Aktif Etkinlik</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalUsers}</span>
            <span className="stat-label">Kayıtlı Kullanıcı</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalEvents}</span>
            <span className="stat-label">Toplam Etkinlik</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">🔥 Popüler Etkinlikler</h2>
        
        {loading ? (
          <div className="loading-events">
            <i className="fas fa-spinner fa-spin"></i> Etkinlikler yükleniyor...
          </div>
        ) : events.length === 0 ? (
          <div className="loading-events">
            <i className="fas fa-calendar-times"></i>
            <h3>Henüz etkinlik bulunmuyor</h3>
            <p>İlk etkinliği sen oluştur!</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onJoin={() => handleJoinEvent(event.id)}
                onLeave={() => handleLeaveEvent(event.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

