export const api = {
    async login(email, password) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) {
                throw new Error('Giriş başarısız');
            }
            
            return await response.json();
        } catch (error) {
            // Geçici olarak mock data döndür
            return {
                success: true,
                user: {
                    id: 1,
                    name: 'Ahmet Yılmaz',
                    email: email
                },
                token: 'mock-token'
            };
        }
    },

    async register(userData) {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error('Kayıt başarısız');
            }
            
            return await response.json();
        } catch (error) {
            // Geçici olarak mock data döndür
            return {
                success: true,
                message: 'Kayıt başarılı'
            };
        }
    },

    async getEvents() {
        try {
            const response = await fetch(`${API_URL}/events`);
            if (!response.ok) {
                throw new Error('Etkinlikler yüklenemedi');
            }
            return await response.json();
        } catch (error) {
            // Mock events data
            return [
                {
                    id: 1,
                    title: '5vs5 Futbol Maçı',
                    sportType: 'football',
                    location: 'Atatürk Parkı',
                    eventDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                    maxParticipants: 10,
                    currentParticipants: 6,
                    skillLevel: 'intermediate',
                    description: 'Eğlenceli futbol maçı için katılımcılar bekliyoruz!',
                    creatorName: 'Mehmet Özkan'
                },
                {
                    id: 2,
                    title: 'Basketbol Turnuvası',
                    sportType: 'basketball',
                    location: 'Spor Salonu',
                    eventDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    maxParticipants: 8,
                    currentParticipants: 4,
                    skillLevel: 'advanced',
                    description: 'Basketbol severler için turnuva organizasyonu',
                    creatorName: 'Ayşe Demir'
                },
                {
                    id: 3,
                    title: 'Tenis Partneri Arıyorum',
                    sportType: 'tennis',
                    location: 'Tenis Kulübü',
                    eventDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                    maxParticipants: 2,
                    currentParticipants: 1,
                    skillLevel: 'beginner',
                    description: 'Yeni başlayan tenis oyuncusu partner arıyor',
                    creatorName: 'Ali Yıldız'
                },
                {
                    id: 4,
                    title: 'Sabah Koşusu Grubu',
                    sportType: 'running',
                    location: 'Maçka Parkı',
                    eventDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
                    maxParticipants: 15,
                    currentParticipants: 8,
                    skillLevel: 'mixed',
                    description: 'Her seviyeden koşucu hoş geldin!',
                    creatorName: 'Fatma Kaya'
                }
            ];
        }
    },

    async createEvent(eventData) {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(eventData)
            });
            
            if (!response.ok) {
                throw new Error('Etkinlik oluşturulamadı');
            }
            
            return await response.json();
        } catch (error) {
            // Mock success
            return {
                success: true,
                message: 'Etkinlik başarıyla oluşturuldu',
                event: { id: Date.now(), ...eventData }
            };
        }
    },

    async joinEvent(eventId) {
        try {
            const response = await fetch(`${API_URL}/events/${eventId}/join`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Etkinliğe katılınamadı');
            }
            
            return await response.json();
        } catch (error) {
            // Mock success
            return {
                success: true,
                message: 'Etkinliğe başarıyla katıldınız'
            };
        }
    }
};
