import React from 'react';

const sportIcons = {
  football: '⚽',
  basketball: '🏀',
  volleyball: '🏐',
  tennis: '🎾',
  running: '🏃‍♂️',
  cycling: '🚴‍♂️',
  swimming: '🏊‍♂️',
  badminton: '🏸'
};

const skillLevels = {
  beginner: '🌱 Başlangıç',
  intermediate: '⭐ Orta',
  advanced: '🏆 İleri',
};

export default function EventCard({ event, onJoin, onLeave }) {
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleShowDetails = () => {
    alert(`
Etkinlik: ${event.title}
Açıklama: ${event.description || 'Açıklama bulunmuyor.'}
Konum: ${event.location}
Tarih: ${eventDate.toLocaleString('tr-TR')}
Seviye: ${skillLevels[event.skillLevel]}
Katılımcılar: ${event.currentParticipants}/${event.maxParticipants}
Organizatör: ${event.creatorName}
    `);
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-icon">
          {sportIcons[event.sportType] || '🏃‍♂️'}
        </div>
        <h3 className="event-title">{event.title}</h3>
      </div>
      
      <div className="event-details">
        <div className="event-detail">
          <i className="fas fa-map-marker-alt"></i>
          <span>{event.location}</span>
        </div>
        <div className="event-detail">
          <i className="fas fa-clock"></i>
          <span>{formattedDate}</span>
        </div>
        <div className="event-detail">
          <i className="fas fa-users"></i>
          <span>{event.currentParticipants}/{event.maxParticipants} kişi</span>
        </div>
        <div className="event-detail">
          <i className="fas fa-chart-bar"></i>
          <span>{skillLevels[event.skillLevel]}</span>
        </div>
        <div className="event-detail">
          <i className="fas fa-user-circle"></i>
          <span>Organizatör: {event.creatorName}</span>
        </div>
      </div>
      
      <div className="event-actions">
        <button 
          className={`action-btn join-btn ${event.isJoined ? 'joined' : ''}`}
          onClick={event.isJoined ? onLeave : onJoin}
        >
          <i className={`fas fa-${event.isJoined ? 'times' : 'hand-rock'}`}></i>
          {event.isJoined ? 'Ayrıl' : 'Katıl'}
        </button>
        <button className="action-btn details-btn" onClick={handleShowDetails}>
          <i className="fas fa-info-circle"></i> Detay
        </button>
      </div>
    </div>
  );
}
