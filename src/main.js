import './style.css'

// App state
let currentUser = null;
let currentPage = 'auth';
let isSignUp = false;
let events = [
  {
    id: 1,
    title: "Sunday Football Match",
    sport: "football",
    date: "2024-01-21",
    time: "14:00",
    location: "Central Park",
    description: "Friendly football match, all skill levels welcome!",
    maxParticipants: 22,
    participants: [
      { id: 1, name: "John Doe", avatar: "/avatar.png" },
      { id: 2, name: "Jane Smith", avatar: "/avatar.png" },
      { id: 3, name: "Mike Johnson", avatar: "/avatar.png" },
      { id: 4, name: "Sarah Wilson", avatar: "/avatar.png" },
      { id: 5, name: "Tom Brown", avatar: "/avatar.png" }
    ],
    organizer: { id: 1, name: "John Doe" },
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Morning Run Group",
    sport: "running",
    date: "2024-01-22",
    time: "07:00",
    location: "Riverside Trail",
    description: "5K morning run, perfect for starting the day!",
    maxParticipants: 15,
    participants: [
      { id: 1, name: "John Doe", avatar: "/avatar.png" },
      { id: 6, name: "Lisa Davis", avatar: "/avatar.png" },
      { id: 7, name: "Chris Lee", avatar: "/avatar.png" }
    ],
    organizer: { id: 6, name: "Lisa Davis" },
    createdAt: "2024-01-16"
  },
  {
    id: 3,
    title: "Beach Volleyball Tournament",
    sport: "volleyball",
    date: "2024-01-23",
    time: "16:00",
    location: "Sunset Beach",
    description: "Competitive volleyball tournament with prizes!",
    maxParticipants: 12,
    participants: [
      { id: 8, name: "Alex Wong", avatar: "/avatar.png" },
      { id: 9, name: "Emma Taylor", avatar: "/avatar.png" },
      { id: 10, name: "David Kim", avatar: "/avatar.png" },
      { id: 11, name: "Sophie Clark", avatar: "/avatar.png" },
      { id: 12, name: "Ryan Miller", avatar: "/avatar.png" },
      { id: 13, name: "Mia Anderson", avatar: "/avatar.png" },
      { id: 14, name: "Jake Thompson", avatar: "/avatar.png" },
      { id: 15, name: "Zoe Martinez", avatar: "/avatar.png" },
      { id: 16, name: "Noah Garcia", avatar: "/avatar.png" },
      { id: 17, name: "Chloe Rodriguez", avatar: "/avatar.png" },
      { id: 18, name: "Ethan Lopez", avatar: "/avatar.png" },
      { id: 19, name: "Ava Gonzalez", avatar: "/avatar.png" }
    ],
    organizer: { id: 8, name: "Alex Wong" },
    createdAt: "2024-01-17"
  },
  {
    id: 4,
    title: "Tennis Practice Session",
    sport: "tennis",
    date: "2024-01-24",
    time: "18:00",
    location: "City Tennis Club",
    description: "Improve your tennis skills with experienced players",
    maxParticipants: 8,
    participants: [
      { id: 20, name: "Oliver Wilson", avatar: "/avatar.png" },
      { id: 21, name: "Isabella Moore", avatar: "/avatar.png" }
    ],
    organizer: { id: 20, name: "Oliver Wilson" },
    createdAt: "2024-01-18"
  },
  {
    id: 5,
    title: "Basketball Pickup Game",
    sport: "basketball",
    date: "2024-01-25",
    time: "19:00",
    location: "Street Court",
    description: "Casual basketball game, bring your A-game!",
    maxParticipants: 10,
    participants: [
      { id: 22, name: "Mason Taylor", avatar: "/avatar.png" },
      { id: 23, name: "Aria Johnson", avatar: "/avatar.png" },
      { id: 24, name: "Lucas Brown", avatar: "/avatar.png" }
    ],
    organizer: { id: 22, name: "Mason Taylor" },
    createdAt: "2024-01-19"
  }
];

let filters = {
  sport: '',
  date: '',
  location: ''
};

// Sports data
const sports = {
  football: { icon: '⚽', name: 'Football' },
  basketball: { icon: '🏀', name: 'Basketball' },
  tennis: { icon: '🎾', name: 'Tennis' },
  volleyball: { icon: '🏐', name: 'Volleyball' },
  running: { icon: '🏃', name: 'Running' },
  swimming: { icon: '🏊', name: 'Swimming' },
  cycling: { icon: '🚴', name: 'Cycling' },
  baseball: { icon: '⚾', name: 'Baseball' }
};

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

function generateId() {
  return Math.max(...events.map(e => e.id)) + 1;
}

function isEventFull(event) {
  return event.participants.length >= event.maxParticipants;
}

function isUserJoined(event, userId) {
  return event.participants.some(p => p.id === userId);
}

// Page rendering functions
function renderAuthPage() {
  return `
    <div class="auth-container fade-in">
      <div class="auth-card">
        <div class="auth-welcome">
          <img src="/avatar.png" alt="SportyMatch Logo" class="logo">
          <h1>SportyMatch</h1>
          <p>Connect with local sports enthusiasts and join exciting events in your area. Build your community, stay active, and make new friends!</p>
          <div class="flex gap-4">
            <div class="flex items-center gap-2">
              <span>⚽</span>
              <span>🏀</span>
              <span>🎾</span>
            </div>
          </div>
        </div>
        <div class="auth-form-container">
          <div class="auth-tabs">
            <div class="auth-tab ${!isSignUp ? 'active' : ''}" data-tab="login">Login</div>
            <div class="auth-tab ${isSignUp ? 'active' : ''}" data-tab="signup">Sign Up</div>
          </div>
          <form class="auth-form" id="authForm">
            ${isSignUp ? `
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="input" name="name" placeholder="Enter your full name" required>
              </div>
            ` : ''}
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="input" name="email" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="input" name="password" placeholder="Enter your password" required>
            </div>
            ${isSignUp ? `
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="input" name="confirmPassword" placeholder="Confirm your password" required>
              </div>
            ` : ''}
            <button type="submit" class="btn btn-primary btn-lg w-full">
              ${isSignUp ? 'Create Account' : 'Sign In'}
            </button>
            ${!isSignUp ? `
              <a href="#" class="forgot-password">Forgot your password?</a>
            ` : ''}
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderTopNav() {
  return `
    <nav class="top-nav">
      <div class="nav-brand">
        <img src="/avatar.png" alt="SportyMatch">
        <span>SportyMatch</span>
      </div>
      <div class="nav-actions">
        <button class="notification-btn">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-3.5-3.5a50.002 50.002 0 00-2.5-2.5m0 0a50.002 50.002 0 00-2.5 2.5L8 17h5m2-2V9a3 3 0 10-6 0v6m6 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
          <span class="notification-badge">3</span>
        </button>
        <img src="/avatar.png" alt="User Avatar" class="user-avatar">
        <button class="btn btn-outline btn-sm" onclick="logout()">Logout</button>
      </div>
    </nav>
  `;
}

function renderFilters() {
  return `
    <div class="filters slide-up">
      <div class="filters-row">
        <div class="filter-group">
          <label class="form-label">Sport Type</label>
          <select class="input select" id="sportFilter">
            <option value="">All Sports</option>
            ${Object.entries(sports).map(([key, sport]) => 
              `<option value="${key}" ${filters.sport === key ? 'selected' : ''}>${sport.icon} ${sport.name}</option>`
            ).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label class="form-label">Date</label>
          <input type="date" class="input" id="dateFilter" value="${filters.date}">
        </div>
        <div class="filter-group">
          <label class="form-label">Location</label>
          <input type="text" class="input" id="locationFilter" placeholder="Search location..." value="${filters.location}">
        </div>
        <div class="filter-group">
          <button class="btn btn-outline" onclick="clearFilters()">Clear All</button>
        </div>
      </div>
    </div>
  `;
}

function renderEventCard(event) {
  const sport = sports[event.sport];
  const isFull = isEventFull(event);
  const isJoined = currentUser && isUserJoined(event, currentUser.id);
  const availableSpots = event.maxParticipants - event.participants.length;

  return `
    <div class="event-card ${isFull ? 'event-full' : ''}" data-event-id="${event.id}">
      <div class="sport-icon">${sport.icon}</div>
      <h3 class="event-title">${event.title}</h3>
      <div class="event-details">
        <div class="event-detail">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>${formatDate(event.date)} at ${formatTime(event.time)}</span>
        </div>
        <div class="event-detail">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>${event.location}</span>
        </div>
        <div class="event-detail">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Organized by ${event.organizer.name}</span>
        </div>
      </div>
      <div class="event-participants">
        <div class="participants-count">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>${event.participants.length}/${event.maxParticipants} joined</span>
          ${availableSpots > 0 ? `<span class="text-success">(${availableSpots} spots left)</span>` : ''}
        </div>
        <div class="participants-avatars">
          ${event.participants.slice(0, 5).map(participant => 
            `<img src="${participant.avatar}" alt="${participant.name}" class="participant-avatar" title="${participant.name}">`
          ).join('')}
          ${event.participants.length > 5 ? `<div class="participant-avatar">+${event.participants.length - 5}</div>` : ''}
        </div>
      </div>
      <div class="event-actions">
        ${isJoined ? 
          `<button class="btn btn-outline btn-sm" onclick="leaveEvent(${event.id})">Leave Event</button>` :
          isFull ? 
            `<button class="btn btn-primary btn-sm" disabled>Event Full</button>` :
            `<button class="btn btn-primary btn-sm" onclick="joinEvent(${event.id})">Join Event</button>`
        }
        <button class="btn btn-outline btn-sm">View Details</button>
      </div>
    </div>
  `;
}

function renderEventsPage() {
  const filteredEvents = filterEvents();
  
  return `
    <div class="app-container">
      ${renderTopNav()}
      <main class="main-content">
        ${renderFilters()}
        <div class="events-grid">
          ${filteredEvents.length > 0 ? 
            filteredEvents.map(event => renderEventCard(event)).join('') :
            `<div class="text-center p-4">
              <h3>No events found</h3>
              <p>Try adjusting your filters or create a new event!</p>
            </div>`
          }
        </div>
        <button class="floating-add" onclick="showAddEventPage()">+</button>
      </main>
      ${renderBottomNav()}
    </div>
  `;
}

function renderAddEventPage() {
  return `
    <div class="app-container">
      ${renderTopNav()}
      <main class="main-content">
        <div class="form-container slide-up">
          <div class="form-card">
            <h2 class="form-title">Create New Event</h2>
            <form id="addEventForm" class="auth-form">
              <div class="form-group">
                <label class="form-label">Event Title</label>
                <input type="text" class="input" name="title" placeholder="e.g., Sunday Football Match" required>
              </div>
              
              <div class="form-group">
                <label class="form-label">Sport Type</label>
                <div class="sport-selector">
                  ${Object.entries(sports).map(([key, sport]) => 
                    `<div class="sport-option" data-sport="${key}">
                      <div class="sport-option-icon">${sport.icon}</div>
                      <div class="sport-option-label">${sport.name}</div>
                    </div>`
                  ).join('')}
                </div>
                <input type="hidden" name="sport" required>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Date</label>
                  <input type="date" class="input" name="date" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Time</label>
                  <input type="time" class="input" name="time" required>
                </div>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Location</label>
                  <input type="text" class="input" name="location" placeholder="e.g., Central Park" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Max Participants</label>
                  <input type="number" class="input" name="maxParticipants" min="2" max="100" value="10" required>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">Description (Optional)</label>
                <textarea class="input textarea" name="description" placeholder="Tell people more about your event..."></textarea>
              </div>
              
              <div class="flex gap-4 mt-4">
                <button type="button" class="btn btn-outline flex-1" onclick="showEventsPage()">Cancel</button>
                <button type="submit" class="btn btn-primary flex-1">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      ${renderBottomNav()}
    </div>
  `;
}

function renderBottomNav() {
  return `
    <nav class="bottom-nav">
      <div class="bottom-nav-items">
        <a href="#" class="bottom-nav-item ${currentPage === 'events' ? 'active' : ''}" onclick="showEventsPage()">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 15v-4a2 2 0 114 0v4m0-8V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.4"></path>
          </svg>
          <span>Events</span>
        </a>
        <a href="#" class="bottom-nav-item ${currentPage === 'add' ? 'active' : ''}" onclick="showAddEventPage()">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Add Event</span>
        </a>
        <a href="#" class="bottom-nav-item">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>Profile</span>
        </a>
      </div>
    </nav>
  `;
}

// Event filtering
function filterEvents() {
  return events.filter(event => {
    const matchesSport = !filters.sport || event.sport === filters.sport;
    const matchesDate = !filters.date || event.date === filters.date;
    const matchesLocation = !filters.location || 
      event.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSport && matchesDate && matchesLocation;
  });
}

// Event actions
function joinEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event || !currentUser) return;
  
  if (isEventFull(event)) {
    showMessage('Event is already full!', 'error');
    return;
  }
  
  if (isUserJoined(event, currentUser.id)) {
    showMessage('You are already joined to this event!', 'warning');
    return;
  }
  
  event.participants.push({
    id: currentUser.id,
    name: currentUser.name,
    avatar: '/avatar.png'
  });
  
  showMessage('Successfully joined the event!', 'success');
  render();
}

function leaveEvent(eventId) {
  const event = events.find(e => e.id === eventId);
  if (!event || !currentUser) return;
  
  event.participants = event.participants.filter(p => p.id !== currentUser.id);
  showMessage('You have left the event.', 'success');
  render();
}

// Filter actions
function clearFilters() {
  filters = { sport: '', date: '', location: '' };
  document.getElementById('sportFilter').value = '';
  document.getElementById('dateFilter').value = '';
  document.getElementById('locationFilter').value = '';
  render();
}

// Page navigation
function showEventsPage() {
  currentPage = 'events';
  render();
}

function showAddEventPage() {
  currentPage = 'add';
  render();
}

function logout() {
  currentUser = null;
  currentPage = 'auth';
  render();
}

// Message system
function showMessage(text, type = 'success') {
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const message = document.createElement('div');
  message.className = `message message-${type}`;
  message.innerHTML = `
    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      ${type === 'success' ? 
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' :
        type === 'error' ?
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' :
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"></path>'
      }
    </svg>
    <span>${text}</span>
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Main render function
function render() {
  const app = document.querySelector('#app');
  
  if (!currentUser) {
    app.innerHTML = renderAuthPage();
  } else {
    switch (currentPage) {
      case 'events':
        app.innerHTML = renderEventsPage();
        break;
      case 'add':
        app.innerHTML = renderAddEventPage();
        break;
      default:
        app.innerHTML = renderEventsPage();
    }
  }
  
  setupEventListeners();
}

// Event listeners setup
function setupEventListeners() {
  // Auth form
  const authForm = document.getElementById('authForm');
  if (authForm) {
    authForm.addEventListener('submit', handleAuth);
  }
  
  // Auth tabs
  const authTabs = document.querySelectorAll('.auth-tab');
  authTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabType = e.target.dataset.tab;
      isSignUp = tabType === 'signup';
      render();
    });
  });
  
  // Add event form
  const addEventForm = document.getElementById('addEventForm');
  if (addEventForm) {
    addEventForm.addEventListener('submit', handleAddEvent);
  }
  
  // Sport selector
  const sportOptions = document.querySelectorAll('.sport-option');
  sportOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const selectedSport = e.currentTarget.dataset.sport;
      
      // Remove previous selection
      sportOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selection to clicked option
      e.currentTarget.classList.add('selected');
      
      // Update hidden input
      const hiddenInput = document.querySelector('input[name="sport"]');
      if (hiddenInput) {
        hiddenInput.value = selectedSport;
      }
    });
  });
  
  // Filters
  const sportFilter = document.getElementById('sportFilter');
  const dateFilter = document.getElementById('dateFilter');
  const locationFilter = document.getElementById('locationFilter');
  
  if (sportFilter) {
    sportFilter.addEventListener('change', (e) => {
      filters.sport = e.target.value;
      render();
    });
  }
  
  if (dateFilter) {
    dateFilter.addEventListener('change', (e) => {
      filters.date = e.target.value;
      render();
    });
  }
  
  if (locationFilter) {
    locationFilter.addEventListener('input', (e) => {
      filters.location = e.target.value;
      // Debounce the filter update
      clearTimeout(window.filterTimeout);
      window.filterTimeout = setTimeout(() => {
        render();
      }, 300);
    });
  }
}

// Auth handler
function handleAuth(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  if (isSignUp) {
    if (data.password !== data.confirmPassword) {
      showMessage('Passwords do not match!', 'error');
      return;
    }
    
    // Simulate user creation
    currentUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      avatar: '/avatar.png'
    };
    
    showMessage('Account created successfully! Welcome to SportyMatch!', 'success');
  } else {
    // Simulate login
    currentUser = {
      id: 1,
      name: 'John Doe',
      email: data.email,
      avatar: '/avatar.png'
    };
    
    showMessage('Welcome back to SportyMatch!', 'success');
  }
  
  currentPage = 'events';
  render();
}

// Add event handler
function handleAddEvent(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  if (!data.sport) {
    showMessage('Please select a sport type!', 'error');
    return;
  }
  
  const newEvent = {
    id: generateId(),
    title: data.title,
    sport: data.sport,
    date: data.date,
    time: data.time,
    location: data.location,
    description: data.description || '',
    maxParticipants: parseInt(data.maxParticipants),
    participants: [{
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar
    }],
    organizer: {
      id: currentUser.id,
      name: currentUser.name
    },
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  events.unshift(newEvent);
  showMessage('Event created successfully!', 'success');
  currentPage = 'events';
  render();
}

// Make functions global for onclick handlers
window.joinEvent = joinEvent;
window.leaveEvent = leaveEvent;
window.showEventsPage = showEventsPage;
window.showAddEventPage = showAddEventPage;
window.logout = logout;
window.clearFilters = clearFilters;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  render();
});

// Set minimum date for event creation to today
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    if (input.name === 'date') {
      input.min = today;
    }
  });
});

// Export for debugging
window.SportyMatchApp = {
  currentUser,
  events,
  filters,
  render
};
