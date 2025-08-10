import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    activeEvents: 0,
    totalUsers: 0,
    sportsCount: 8
  });
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadEvents();
    loadStats();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsData = await apiService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      showNotification('❌ Etkinlikler yüklenemedi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = () => {
    setTimeout(() => {
      setStats({
        activeEvents: 12,
        totalUsers: 247,
        sportsCount: 8
      });
    }, 1000);
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await apiService.joinEvent(eventId);
      if (response.success) {
        showNotification('🎉 Etkinliğe başarıyla katıldınız!');
        // Update local state
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? { ...event, currentParticipants: event.currentParticipants + 1, isJoined: true }
              : event
          )
        );
      }
    } catch (error) {
      showNotification('❌ Etkinliğe katılınamadı.', 'error');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      showNotification('👋 Etkinlikten ayrıldınız.');
      // Update local state
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, currentParticipants: event.currentParticipants - 1, isJoined: false }
            : event
        )
      );
    } catch (error) {
      showNotification('❌ İşlem başarısız.', 'error');
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
            <span className="stat-number">{stats.sportsCount}</span>
            <span className="stat-label">Spor Dalı</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">🔥 Popüler Etkinlikler</h2>
        
        {loading ? (
          <div className="loading-events">Etkinlikler yükleniyor...</div>
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
