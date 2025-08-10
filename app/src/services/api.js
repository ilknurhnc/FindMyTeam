// Backend portunu kontrol edin - launchSettings.json'dan
const API_URL = 'http://localhost:5144/api'; // HTTP portu kullanın

class ApiService {
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers
        }
      });

      // Response'u text olarak al
      const text = await response.text();
      
      // Boş response kontrolü
      if (!text) {
        if (response.ok) {
          return { success: true };
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      }

      // JSON parse et
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${url}):`, error);
      throw error;
    }
  }

  async login(email, password) {
    return await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userData) {
    return await this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getEvents() {
    return await this.makeRequest('/events');
  }

  async getEvent(id) {
    return await this.makeRequest(`/events/${id}`);
  }

  async createEvent(eventData) {
    return await this.makeRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async joinEvent(eventId) {
    return await this.makeRequest(`/events/${eventId}/join`, {
      method: 'POST'
    });
  }

  async leaveEvent(eventId) {
    return await this.makeRequest(`/events/${eventId}/leave`, {
      method: 'POST'
    });
  }

  async getMyEvents() {
    return await this.makeRequest('/events/my-events');
  }

  async getStats() {
    return await this.makeRequest('/stats');
  }
}

export const apiService = new ApiService();