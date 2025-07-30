# React Login ve Sign Up Uygulaması

Bu proje, React kullanarak geliştirilmiş modern bir login ve kayıt (sign up) sayfası içeren web uygulamasıdır.

## Özellikler

- ✅ **React 19** ile geliştirilmiş modern bileşenler
- ✅ **React Router** ile sayfa navigasyonu
- ✅ **Responsive** tasarım
- ✅ **Form validasyonu** (kayıt sayfasında)
- ✅ **Modern UI/UX** tasarımı
- ✅ **Türkçe dil desteği**

## Sayfalar

### Login Sayfası (`/login`)
- Email ve şifre ile giriş
- "Forget your password?" linki
- Sign Up sayfasına yönlendirme

### Sign Up Sayfası (`/signup`)
- İsim, email, şifre ve şifre tekrar alanları
- Gerçek zamanlı form validasyonu
- Login sayfasına yönlendirme

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda `http://localhost:5173` adresine gidin.

## Kullanılan Teknolojiler

- **React 19** - UI bileşenleri
- **React Router DOM** - Sayfa yönlendirme
- **Vite** - Geliştirme ortamı ve build tool
- **CSS3** - Styling
- **ES6+** - Modern JavaScript

## Proje Yapısı

```
src/
├── components/
│   ├── Login.jsx          # Login bileşeni
│   └── SignUp.jsx         # Sign up bileşeni
├── App.jsx                # Ana uygulama bileşeni
├── main.js                # Uygulama giriş noktası
└── style.css              # CSS stilleri
public/
├── background.jpg         # Arka plan resmi
└── avatar.jpg            # Avatar resmi
```

## Build

Üretim için build almak için:

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

## Özelleştirme

- **Renkler**: `src/style.css` dosyasındaki CSS değişkenlerini düzenleyebilirsiniz
- **Validasyon**: `src/components/SignUp.jsx` dosyasındaki `validateForm` fonksiyonunu özelleştirebilirsiniz
- **API Entegrasyonu**: Login ve SignUp bileşenlerindeki `handleSubmit` fonksiyonlarına gerçek API çağrıları ekleyebilirsiniz

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.