const Home = () => {
    return (< >
    <header class="app-header">
        <div class="header-content">
            <a href="#" class="logo">
                <div class="logo-icon">
                    <i class="fas fa-running"></i>
                </div>
                <span>Spor Arkadaşı</span>
            </a>
            <nav class="nav-menu">
                <button class="nav-btn active" data-page="home">
                    <i class="fas fa-home"></i> Ana Sayfa
                </button>
                <button class="nav-btn" data-page="create">
                    <i class="fas fa-plus-circle"></i> Etkinlik Oluştur
                </button>
                <button class="nav-btn" data-page="map">
                    <i class="fas fa-map-marker-alt"></i> Harita
                </button>
                <button class="nav-btn" data-page="profile">
                    <i class="fas fa-user"></i> Profil
                </button>
                <button class="nav-btn logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Çıkış
                </button>
            </nav>
        </div>
    </header>

        <main class="main-content">
            <section class="hero">
                <h1><i class="fas fa-fire"></i> Find My Team!</h1>
                <p>Çevrendeki sporcularla tanış, etkinliklere katıl ve aktif yaşamının tadını çıkar!</p>
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number" id="activeEvents">0</span>
                        <span class="stat-label">Aktif Etkinlik</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="totalUsers">0</span>
                        <span class="stat-label">Kayıtlı Kullanıcı</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="sportsCount">8</span>
                        <span class="stat-label">Spor Dalı</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 class="section-title">🔥 Popüler Etkinlikler</h2>
                <div class="events-grid" id="eventsGrid">
                    !-- Etkinlikler buraya yüklenecek --
                </div>
            </section>
        </main></>)
}

export default Home