// Backend portunu kontrol edin - launchSettings.json'dan
const API_URL = 'http://localhost:5144/api'; // HTTP portu kullanın

class ApiService {
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    console.log('Getting token from localStorage:', token ? 'Token exists' : 'No token'); // Debug
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
    
    console.log('Request headers:', headers); // Debug
    return headers;
  }

  async makeRequest(url, options = {}) {
    try {
      const fullUrl = `${API_URL}${url}`;
      const requestOptions = {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers
        }
      };

      console.log(`Making request to: ${fullUrl}`); // Debug
      console.log('Request method:', requestOptions.method || 'GET'); // Debug
      console.log('Request body:', requestOptions.body); // Debug
      console.log('Request headers:', requestOptions.headers); // Debug

      const response = await fetch(fullUrl, requestOptions);
      
      console.log(`Response status: ${response.status}`); // Debug
      console.log(`Response ok: ${response.ok}`); // Debug
      console.log(`Response status text: ${response.statusText}`); // Debug

      // Response'u text olarak al
      const text = await response.text();
      console.log('Raw response text:', text); // Debug
      
      // Boş response kontrolü
      if (!text) {
        if (response.ok) {
          return { success: true };
        } else {
          const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          console.error('Empty error response:', errorMessage);
          throw new Error(errorMessage);
        }
      }

      // JSON parse et
      let data;
      try {
        data = JSON.parse(text);
        console.log('Parsed response data:', data); // Debug
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Raw text that failed to parse:', text);
        throw new Error(`Invalid JSON response: ${text}`);
      }

      if (!response.ok) {
        const errorMessage = data.message || data.Message || data.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API Error Response:', data);
        throw new Error(errorMessage);
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

  async createEvent(eventData) {
    console.log('=== CREATE EVENT START ===');
    console.log('Event data being sent:', eventData);
    console.log('Event data type checks:');
    console.log('- title:', typeof eventData.title, eventData.title);
    console.log('- sportType:', typeof eventData.sportType, eventData.sportType);
    console.log('- location:', typeof eventData.location, eventData.location);
    console.log('- eventDate:', typeof eventData.eventDate, eventData.eventDate);
    console.log('- maxParticipants:', typeof eventData.maxParticipants, eventData.maxParticipants);
    console.log('- skillLevel:', typeof eventData.skillLevel, eventData.skillLevel);
    console.log('- description:', typeof eventData.description, eventData.description);
    console.log('=== CREATE EVENT END ===');
    
    return await this.makeRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async joinEvent(eventId) {
    console.log('Joining event:', eventId); // Debug
    return await this.makeRequest(`/events/${eventId}/join`, {
      method: 'POST'
    });
  }

  async leaveEvent(eventId) {
    console.log('Leaving event:', eventId); // Debug
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