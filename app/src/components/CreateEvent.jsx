// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { useNotification } from '../hooks/useNotification';

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    sportType: '',
    title: '',
    location: '',
    eventDate: '',
    maxParticipants: '',
    skillLevel: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tarihi UTC formatına çevir
      const eventDate = new Date(formData.eventDate);
      
      const eventData = {
        title: formData.title,
        sportType: formData.sportType,
        location: formData.location,
        eventDate: eventDate.toISOString(), // ISO string formatında gönder
        maxParticipants: parseInt(formData.maxParticipants),
        skillLevel: formData.skillLevel,
        description: formData.description || '' // Boşsa empty string
      };

      console.log('Form data being sent:', eventData); // DEBUG

      const response = await apiService.createEvent(eventData);
      console.log('Create event response:', response); // DEBUG

      if (response.success) {
        showNotification('🚀 Etkinlik başarıyla oluşturuldu!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        showNotification(`❌ ${response.message || 'Etkinlik oluşturulamadı.'}`, 'error');
      }
    } catch (error) {
      console.error('Create event error:', error); // DEBUG
      showNotification(`❌ ${error.message || 'Etkinlik oluşturulamadı.'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <section>
        <h2 className="section-title"><i className="fas fa-magic"></i> Yeni Etkinlik Oluştur</h2>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <select 
                  className="form-select" 
                  name="sportType" 
                  value={formData.sportType}
                  onChange={handleChange}
                  required
                >
                  <option value="">🏃‍♂️ Spor Türü Seçin</option>
                  <option value="football">⚽ Futbol</option>
                  <option value="basketball">🏀 Basketbol</option>
                  <option value="volleyball">🏐 Voleybol</option>
                  <option value="tennis">🎾 Tenis</option>
                  <option value="running">🏃‍♂️ Koşu</option>
                  <option value="cycling">🚴‍♂️ Bisiklet</option>
                  <option value="swimming">🏊‍♂️ Yüzme</option>
                  <option value="badminton">🏸 Badminton</option>
                </select>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  name="title" 
                  placeholder="🏆 Etkinlik Adı"
                  value={formData.title}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  name="location" 
                  placeholder="📍 Konum (örn: Atatürk Parkı)"
                  value={formData.location}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="datetime-local" 
                  className="form-input" 
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)} // Geçmiş tarih seçilemez
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="number" 
                  className="form-input" 
                  name="maxParticipants" 
                  placeholder="👥 Maksimum Katılımcı" 
                  min="2" 
                  max="50"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <select 
                  className="form-select" 
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">📊 Seviye Seçin</option>
                  <option value="beginner">🌱 Başlangıç</option>
                  <option value="intermediate">⭐ Orta</option>
                  <option value="advanced">🏆 İleri</option>
                  <option value="mixed">🎯 Karma</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <textarea 
                className="form-textarea" 
                name="description" 
                placeholder="📝 Etkinlik açıklaması (isteğe bağlı)"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <button type="submit" className={`submit-btn ${loading ? 'btn-loading' : ''}`} disabled={loading}>
              <span className="btn-text">
                <i className="fas fa-rocket"></i> 
                {loading ? 'Oluşturuluyor...' : 'Etkinliği Oluştur'}
              </span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}



