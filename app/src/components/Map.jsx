import React from 'react';

export default function Map() {
  return (
    <main className="main-content">
      <section>
        <h2 className="section-title"><i className="fas fa-globe-americas"></i> Etkinlik Haritası</h2>
        <div className="map-container">
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <h3>Harita Entegrasyonu</h3>
            <p>Google Maps API ile etkinlikleri harita üzerinde görüntüleyebileceksiniz.</p>
            <p>Yakında aktif olacak!</p>
          </div>
        </div>
      </section>
    </main>
  );
}