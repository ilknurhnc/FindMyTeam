const Map = () => {
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
                            <button class="nav-btn active" data-page="map">
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
                    <section>
                        <h2 class="section-title"><i class="fas fa-globe-americas"></i> Etkinlik Haritası</h2>
                        <div class="map-container">
                            <div class="map-placeholder">
                                <i class="fas fa-map-marked-alt"></i>
                                <h3>Harita Entegrasyonu</h3>
                                <p>Google Maps API ile etkinlikleri harita üzerinde görüntüleyebileceksiniz.</p>
                                <p>Yakında aktif olacak!</p>
                            </div>
                        </div>
                    </section>
                </main></>)
}

export default Map