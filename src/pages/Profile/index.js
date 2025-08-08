const Profile = () => {
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
                            <button class="nav-btn" data-page="home">
                                <i class="fas fa-home"></i> Ana Sayfa
                            </button>
                            <button class="nav-btn" data-page="create">
                                <i class="fas fa-plus-circle"></i> Etkinlik Oluştur
                            </button>
                            <button class="nav-btn" data-page="map">
                                <i class="fas fa-map-marker-alt"></i> Harita
                            </button>
                            <button class="nav-btn active" data-page="profile">
                                <i class="fas fa-user"></i> Profil
                            </button>
                            <button class="nav-btn logout-btn">
                                <i class="fas fa-sign-out-alt"></i> Çıkış
                            </button>
                        </nav>
                    </div>
                </header>
                
                <main class="main-content">
                    <div class="profile-container">
                        <section class="profile-header">
                            <div class="profile-avatar">
                                <i class="fas fa-user-athlete"></i>
                            </div>
                            <h2 class="profile-name" id="profileName">Kullanıcı</h2>
                            <p class="profile-email" id="profileEmail">email@example.com</p>
                        </section>

                        <section>
                            <h2 class="section-title"><i class="fas fa-chart-line"></i> İstatistiklerim</h2>
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <div class="stat-icon">
                                        <i class="fas fa-calendar-check"></i>
                                    </div>
                                    <div class="stat-value" id="joinedEvents">0</div>
                                    <div class="stat-description">Katıldığım Etkinlik</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon">
                                        <i class="fas fa-plus-circle"></i>
                                    </div>
                                    <div class="stat-value" id="createdEvents">0</div>
                                    <div class="stat-description">Oluşturduğum Etkinlik</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon">
                                        <i class="fas fa-trophy"></i>
                                    </div>
                                    <div class="stat-value" id="completedEvents">0</div>
                                    <div class="stat-description">Tamamlanan Etkinlik</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="stat-value" id="sportFriends">0</div>
                                    <div class="stat-description">Spor Arkadaşı</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main></>)
}

export default Profile