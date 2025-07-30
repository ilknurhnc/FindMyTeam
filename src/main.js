// main.js - Yeni routing sistemi ile
import './style.css'

// Sayfa şablonları
const pages = {
  login: `
    <div class="login-box">
      <div class="avatar"></div>
      <div class="tabs">
        <span class="active" data-tab="login">Giriş</span>
        <span data-tab="register">Kayıt</span>
      </div>
      <form class="login-form" id="loginForm">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Şifre" required />
        <button type="submit">Giriş Yap</button>
        <a href="#" class="forgot">Şifremi unuttum?</a>
      </form>
    </div>
  `,
  
  register: `
    <div class="login-box">
      <div class="avatar"></div>
      <div class="tabs">
        <span data-tab="login">Giriş</span>
        <span class="active" data-tab="register">Kayıt</span>
      </div>
      <form class="register-form" id="registerForm">
        <input type="text" placeholder="Ad Soyad" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Şifre" required />
        <input type="password" placeholder="Şifre Tekrar" required />
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  `,
  
  home: `
    <div class="main-app">
      <header class="app-header">
        <h1>🏃‍♂️ Spor Arkadaşı</h1>
        <nav class="top-nav">
          <button class="nav-btn" data-page="home">🏠 Ana Sayfa</button>
          <button class="nav-btn" data-page="create">➕ Etkinlik Oluştur</button>
          <button class="nav-btn" data-page="map">📍 Harita</button>
          <button class="nav-btn" data-page="profile">👤 Profil</button>
          <button class="nav-btn logout-btn">🚪 Çıkış</button>
        </nav>
      </header>
      
      <main class="main-content">
        <div class="welcome">
          <h2>Yakındaki Etkinlikler</h2>
          <p>Çevrendeki spor etkinliklerine katıl veya yeni etkinlik başlat!</p>
        </div>
        
        <div class="events-list">
          <div class="event-card">
            <div class="event-sport">⚽ Futbol</div>
            <div class="event-info">
              <h3>5 vs 5 Futbol Maçı</h3>
              <p>📍 Atatürk Parkı</p>
              <p>🕐 Bugün 18:00</p>
              <p>👥 6/10 kişi</p>
            </div>
            <button class="join-btn">Katıl</button>
          </div>
          
          <div class="event-card">
            <div class="event-sport">🏀 Basketbol</div>
            <div class="event-info">
              <h3>Basketbol Turnuvası</h3>
              <p>📍 Spor Salonu</p>
              <p>🕐 Yarın 20:00</p>
              <p>👥 4/8 kişi</p>
            </div>
            <button class="join-btn">Katıl</button>
          </div>
        </div>
      </main>
    </div>
  `,
  
  create: `
    <div class="main-app">
      <header class="app-header">
        <h1>🏃‍♂️ Spor Arkadaşı</h1>
        <nav class="top-nav">
          <button class="nav-btn" data-page="home">🏠 Ana Sayfa</button>
          <button class="nav-btn active" data-page="create">➕ Etkinlik Oluştur</button>
          <button class="nav-btn" data-page="map">📍 Harita</button>
          <button class="nav-btn" data-page="profile">👤 Profil</button>
          <button class="nav-btn logout-btn">🚪 Çıkış</button>
        </nav>
      </header>
      
      <main class="main-content">
        <div class="create-event">
          <h2>Yeni Etkinlik Oluştur</h2>
          <form class="event-form" id="eventForm">
            <select required>
              <option value="">Spor Türü Seçin</option>
              <option value="football">⚽ Futbol</option>
              <option value="basketball">🏀 Basketbol</option>
              <option value="volleyball">🏐 Voleybol</option>
              <option value="tennis">🎾 Tenis</option>
              <option value="running">🏃‍♂️ Koşu</option>
            </select>
            
            <input type="text" placeholder="Etkinlik Adı" required />
            <input type="text" placeholder="Konum (örn: Atatürk Parkı)" required />
            <input type="datetime-local" required />
            <input type="number" placeholder="Maksimum Katılımcı Sayısı" min="2" max="50" required />
            <textarea placeholder="Açıklama (isteğe bağlı)" rows="3"></textarea>
            
            <button type="submit">Etkinlik Oluştur</button>
          </form>
        </div>
      </main>
    </div>
  `,
  
  profile: `
    <div class="main-app">
      <header class="app-header">
        <h1>🏃‍♂️ Spor Arkadaşı</h1>
        <nav class="top-nav">
          <button class="nav-btn" data-page="home">🏠 Ana Sayfa</button>
          <button class="nav-btn" data-page="create">➕ Etkinlik Oluştur</button>
          <button class="nav-btn" data-page="map">📍 Harita</button>
          <button class="nav-btn active" data-page="profile">👤 Profil</button>
          <button class="nav-btn logout-btn">🚪 Çıkış</button>
        </nav>
      </header>
      
      <main class="main-content">
        <div class="profile-section">
          <div class="profile-header">
            <div class="profile-avatar"></div>
            <h2>Ahmet Yılmaz</h2>
            <p>ahmet@email.com</p>
          </div>
          
          <div class="profile-stats">
            <div class="stat">
              <h3>5</h3>
              <p>Katıldığım Etkinlik</p>
            </div>
            <div class="stat">
              <h3>2</h3>
              <p>Oluşturduğum Etkinlik</p>
            </div>
            <div class="stat">
              <h3>⚽</h3>
              <p>Favori Spor</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
}

// Mevcut kullanıcı durumu (geçici - sonra backend'den gelecek)
let currentUser = null

// Sayfa routing fonksiyonu
function navigateTo(page) {
  const app = document.querySelector('#app')
  
  // Eğer giriş yapmamışsa ve login/register sayfası değilse, login'e yönlendir
  if (!currentUser && page !== 'login' && page !== 'register') {
    page = 'login'
  }
  
  // Sayfa içeriğini güncelle
  app.innerHTML = pages[page] || pages['login']
  
  // Sayfa özel event listener'larını ekle
  setupPageEvents(page)
  
  // URL'i güncelle (isteğe bağlı)
  window.location.hash = page
}

// Her sayfa için özel event listener'lar
function setupPageEvents(page) {
  switch(page) {
    case 'login':
      setupLoginEvents()
      break
    case 'register':
      setupRegisterEvents()
      break
    case 'home':
      setupHomeEvents()
      break
    case 'create':
      setupCreateEvents()
      break
  }
  
  // Genel navigation event'leri
  setupNavigationEvents()
}

// Login sayfası event'leri
function setupLoginEvents() {
  // Tab switching
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetPage = e.target.dataset.tab
      navigateTo(targetPage)
    })
  })
  
  // Login form
  const loginForm = document.querySelector('#loginForm')
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      // Geçici - her girişi kabul et
      currentUser = {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com'
      }
      
      alert('Giriş başarılı!')
      navigateTo('home')
    })
  }
}

// Register sayfası event'leri
function setupRegisterEvents() {
  // Tab switching
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetPage = e.target.dataset.tab
      navigateTo(targetPage)
    })
  })
  
  // Register form
  const registerForm = document.querySelector('#registerForm')
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      // Basit şifre kontrolü
      const passwords = registerForm.querySelectorAll('input[type="password"]')
      if (passwords[0].value !== passwords[1].value) {
        alert('Şifreler eşleşmiyor!')
        return
      }
      
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.')
      navigateTo('login')
    })
  }
}

// Ana sayfa event'leri
function setupHomeEvents() {
  // Join button'ları
  document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Etkinliğe katıldınız!')
      btn.textContent = 'Ayrıl'
      btn.classList.add('joined')
    })
  })
}

// Etkinlik oluşturma sayfası event'leri
function setupCreateEvents() {
  const eventForm = document.querySelector('#eventForm')
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault()
      alert('Etkinlik başarıyla oluşturuldu!')
      navigateTo('home')
    })
  }
}

// Navigation event'leri
function setupNavigationEvents() {
  // Nav button'ları
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const page = e.target.dataset.page
      navigateTo(page)
    })
  })
  
  // Logout button
  const logoutBtn = document.querySelector('.logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentUser = null
      navigateTo('login')
    })
  }
}

// Uygulama başlatma
function initApp() {
  // URL'den sayfa al veya login'e git
  const hash = window.location.hash.slice(1)
  const initialPage = hash || 'login'
  
  navigateTo(initialPage)
}

// Browser back/forward button desteği
window.addEventListener('hashchange', () => {
  const page = window.location.hash.slice(1) || 'login'
  navigateTo(page)
})

// Uygulamayı başlat
initApp()
