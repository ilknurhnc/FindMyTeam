const Create = () => {
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
                            <button class="nav-btn active" data-page="create">
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
                    <section>
                        <h2 class="section-title"><i class="fas fa-magic"></i> Yeni Etkinlik Oluştur</h2>
                        <div class="create-form">
                            <form id="createEventForm">
                                <div class="form-row">
                                    <div class="form-group">
                                        <select class="form-select" name="sportType" required>
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
                                    <div class="form-group">
                                        <input type="text" class="form-input" name="title" placeholder="🏆 Etkinlik Adı" required/>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="text" class="form-input" name="location" placeholder="📍 Konum (örn: Atatürk Parkı)" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type="datetime-local" class="form-input" name="eventDate" required/>
                                    </div>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="number" class="form-input" name="maxParticipants" placeholder="👥 Maksimum Katılımcı" min="2" max="50" required/>
                                    </div>
                                    <div class="form-group">
                                        <select class="form-select" name="skillLevel" required>
                                            <option value="">📊 Seviye Seçin</option>
                                            <option value="beginner">🌱 Başlangıç</option>
                                            <option value="intermediate">⭐ Orta</option>
                                            <option value="advanced">🏆 İleri</option>
                                            <option value="mixed">🎯 Karma</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <textarea class="form-textarea" name="description" placeholder="📝 Etkinlik açıklaması (isteğe bağlı)"></textarea>
                                </div>
                                
                                <button type="submit" class="submit-btn">
                                    <span class="btn-text">
                                        <i class="fas fa-rocket"></i> Etkinliği Oluştur
                                    </span>
                                </button>
                            </form>
                        </div>
                    </section>
                </main></>)
}

export default Create