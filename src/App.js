

import React, { useState, useEffect } from 'react';
import './index.css';

// Иконки компоненты
const Icons = {
  Mosque: () => (
    <svg viewBox="0 0 64 64" fill="currentColor" className="icon">
      <path d="M32 4c-8 0-16 8-16 16v4H8v36h48V24h-8v-4c0-8-8-16-16-16zm0 6c5.5 0 10 4.5 10 10v4H22v-4c0-5.5 4.5-10 10-10zM14 30h8v10h-8V30zm14 0h8v24h-8V30zm14 0h8v10h-8V30z"/>
    </svg>
  ),
  Quran: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm1 4h10v2H7V6zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
    </svg>
  ),
  Prayer: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  Beads: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <circle cx="12" cy="4" r="2"/>
      <circle cx="4" cy="12" r="2"/>
      <circle cx="20" cy="12" r="2"/>
      <circle cx="12" cy="20" r="2"/>
      <circle cx="6" cy="6" r="2"/>
      <circle cx="18" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <circle cx="18" cy="18" r="2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Dua: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon-small">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon-small">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
  ),
  Apple: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="store-icon">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  Android: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="store-icon">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="menu-icon">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  ),
  Bookmark: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
    </svg>
  ),
  Repeat: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    </svg>
  )
};

// Хук для получения времени намаза
function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [location, setLocation] = useState({ city: 'Определение...', country: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [hijriDate, setHijriDate] = useState('');

  // Обновление текущего времени каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Получение геолокации и времени намаза
  useEffect(() => {
    const fetchPrayerTimes = async (latitude, longitude) => {
      try {
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        
        // Получаем время намаза
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
          setHijriDate(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en}`);
        }

        // Получаем название города
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
        );
        const geoData = await geoResponse.json();
        setLocation({
          city: geoData.city || geoData.locality || 'Неизвестно',
          country: geoData.countryName || ''
        });

        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки данных');
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          // Если геолокация не доступна, используем координаты по умолчанию (Наманган)
          fetchPrayerTimes(40.9983, 71.6726);
          setLocation({ city: 'Наманган', country: 'Узбекистан' });
        }
      );
    } else {
      fetchPrayerTimes(40.9983, 71.6726);
      setLocation({ city: 'Наманган', country: 'Узбекистан' });
    }
  }, []);

  // Расчет следующего намаза и оставшегося времени
  useEffect(() => {
    if (!prayerTimes) return;

    const prayerOrder = [
      { key: 'Fajr', name: 'Фаджр' },
      { key: 'Sunrise', name: 'Восход' },
      { key: 'Dhuhr', name: 'Зухр' },
      { key: 'Asr', name: 'Аср' },
      { key: 'Maghrib', name: 'Магриб' },
      { key: 'Isha', name: 'Иша' }
    ];

    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let foundNext = false;
    for (const prayer of prayerOrder) {
      const [hours, minutes] = prayerTimes[prayer.key].split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hoursRemaining = Math.floor(diff / 60);
        const minutesRemaining = diff % 60;

        setNextPrayer({
          name: prayer.name,
          time: prayerTimes[prayer.key],
          key: prayer.key
        });

        if (hoursRemaining > 0) {
          setTimeRemaining(`через ${hoursRemaining}ч ${minutesRemaining}м`);
        } else {
          setTimeRemaining(`через ${minutesRemaining} мин`);
        }
        foundNext = true;
        break;
      }
    }

    // Если все намазы прошли, следующий - Фаджр завтра
    if (!foundNext) {
      const [hours, minutes] = prayerTimes['Fajr'].split(':').map(Number);
      const fajrMinutes = hours * 60 + minutes;
      const diff = (24 * 60 - currentMinutes) + fajrMinutes;
      const hoursRemaining = Math.floor(diff / 60);
      const minutesRemaining = diff % 60;

      setNextPrayer({
        name: 'Фаджр',
        time: prayerTimes['Fajr'],
        key: 'Fajr'
      });
      setTimeRemaining(`через ${hoursRemaining}ч ${minutesRemaining}м`);
    }
  }, [prayerTimes, currentTime]);

  return {
    prayerTimes,
    location,
    loading,
    error,
    currentTime,
    nextPrayer,
    timeRemaining,
    hijriDate
  };
}

// Навигация
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-icon">☪</span>
          <span className="logo-text">QIBLA</span>
        </a>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#features" onClick={() => setIsOpen(false)}>Возможности</a>
          <a href="#quran" onClick={() => setIsOpen(false)}>Коран</a>
          <a href="#prayer" onClick={() => setIsOpen(false)}>Намаз</a>
          <a href="#tasbih" onClick={() => setIsOpen(false)}>Тасбех</a>
          <a href="#download" onClick={() => setIsOpen(false)} className="nav-cta">Скачать</a>
        </div>
        
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>
    </nav>
  );
}

// Hero секция с реальным временем
function Hero() {
  const { 
    prayerTimes, 
    location, 
    loading, 
    currentTime, 
    nextPrayer, 
    timeRemaining,
    hijriDate 
  } = usePrayerTimes();

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <Icons.Star />
            <span>Новое приложение 2026</span>
          </div>
          
          <h1 className="hero-title">
            Ваш духовный
            <span className="gradient-text"> спутник</span>
            <br />на каждый день
          </h1>
          
          <p className="hero-description">
            QIBLA — простое и красивое приложение для чтения Корана, 
            времени намаза, дуа и тасбеха. Всё, что нужно мусульманину, 
            в одном месте.
          </p>
          
          <div className="hero-buttons">
            <a href="#download" className="btn btn-primary">
              <Icons.Apple />
              <div className="btn-text">
                <span className="btn-small">Скачать в</span>
                <span className="btn-large">App Store</span>
              </div>
            </a>
            <a href="#download" className="btn btn-secondary">
              <Icons.Android />
              <div className="btn-text">
                <span className="btn-small">Скачать в</span>
                <span className="btn-large">Google Play</span>
              </div>
            </a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">100K+</span>
              <span className="stat-label">Скачиваний</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Рейтинг</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">114</span>
              <span className="stat-label">Суры</span>
            </div>
          </div>
        </div>
        
        <div className="hero-phone">
          <div className="phone-frame">
            <div className="phone-screen">
              <div className="phone-status-bar">
                <span className="live-time">{formatTime(currentTime)}</span>
                <div className="status-icons">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>
              <div className="phone-app">
                <div className="app-header">
                  <span className="app-location">📍{location.city}</span>
                  <span className="app-date">{hijriDate || 'Загрузка...'}</span>
                </div>
                {loading ? (
                  <div className="prayer-card loading-card">
                    <span className="loading-text">Загрузка времени намаза...</span>
                  </div>
                ) : nextPrayer ? (
                  <div className="prayer-card">
                    <span className="prayer-label">Следующий намаз</span>
                    <span className="prayer-name">{nextPrayer.name}</span>
                    <span className="prayer-time">{nextPrayer.time}</span>
                    <span className="prayer-remaining">{timeRemaining}</span>
                  </div>
                ) : null}
                <div className="quick-actions">
                  <div className="quick-btn">📖 Коран</div>
                  <div className="quick-btn">🤲 <br></br> Дуа</div>
                  <div className="quick-btn">📿 Тасбех</div>
                </div>
              </div>
            </div>
            <div className="phone-notch"></div>
          </div>
          <div className="phone-glow"></div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Листайте вниз</span>
      </div>
    </section>
  );
}

// Секция возможностей
function Features() {
  const features = [
    {
      icon: <Icons.Prayer />,
      title: "Время намаза",
      description: "Точное время молитв с уведомлениями и автоматическим определением местоположения",
      color: "#10B981"
    },
    {
      icon: <Icons.Quran />,
      title: "Полный Коран",
      description: "114 сур на арабском с переводом на русский и узбекский языки",
      color: "#C9A227"
    },
    {
      icon: <Icons.Beads />,
      title: "Тасбех",
      description: "Электронные чётки с настраиваемым счётчиком и вибрацией",
      color: "#8B5CF6"
    },
    {
      icon: <Icons.Dua />,
      title: "Дуа",
      description: "Каталог молитв по категориям с транслитерацией и переводом",
      color: "#EC4899"
    },
    {
      icon: <Icons.Bookmark />,
      title: "Закладки",
      description: "Автоматическое сохранение последней страницы чтения",
      color: "#F59E0B"
    },
    {
      icon: <Icons.Moon />,
      title: "Ночной режим",
      description: "Комфортное чтение в тёмное время суток",
      color: "#6366F1"
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Возможности</span>
          <h2 className="section-title">Всё для вашей духовной практики</h2>
          <p className="section-description">
            QIBLA объединяет все необходимые инструменты для мусульманина в одном красивом и удобном приложении
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{'--accent-color': feature.color}}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Секция Коран
function QuranSection() {
  return (
    <section id="quran" className="quran-section">
      <div className="container">
        <div className="quran-content">
          <div className="quran-text">
            <span className="section-tag">Священный Коран</span>
            <h2 className="section-title">Полный текст Корана всегда с вами</h2>
            
            <div className="quran-features">
              <div className="quran-feature">
                <Icons.Check />
                <span>114 сур полностью на арабском языке</span>
              </div>
              <div className="quran-feature">
                <Icons.Check />
                <span>Переводы на русский и узбекский</span>
              </div>
              <div className="quran-feature">
                <Icons.Check />
                <span>Автоматические закладки</span>
              </div>
              <div className="quran-feature">
                <Icons.Check />
                <span>Поиск по сурам и аятам</span>
              </div>
              <div className="quran-feature">
                <Icons.Check />
                <span>Настройка размера шрифта</span>
              </div>
              <div className="quran-feature">
                <Icons.Check />
                <span>Работает офлайн</span>
              </div>
            </div>
            
            <a href="#download" className="btn btn-primary">
              Начать читать
            </a>
          </div>
          
          <div className="quran-visual">
            <div className="quran-card">
              <div className="surah-header">
                <span className="surah-number">1</span>
                <div className="surah-info">
                  <span className="surah-name-ar">الفاتحة</span>
                  <span className="surah-name">Аль-Фатиха</span>
                </div>
                <span className="surah-ayat">7 аятов</span>
              </div>
              <div className="ayat-text">
                <p className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p className="translation">Во имя Аллаха, Милостивого, Милосердного</p>
              </div>
              <div className="ayat-text">
                <p className="arabic-text">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
                <p className="translation">Хвала Аллаху, Господу миров</p>
              </div>
            </div>
            <div className="quran-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Секция Время намаза с реальными данными
function PrayerSection() {
  const { 
    prayerTimes, 
    location, 
    loading, 
    currentTime,
    nextPrayer,
    timeRemaining 
  } = usePrayerTimes();

  const prayerOrder = [
    { key: 'Fajr', name: 'Фаджр', icon: '🌙' },
    { key: 'Sunrise', name: 'Восход', icon: '🌅' },
    { key: 'Dhuhr', name: 'Зухр', icon: '☀️' },
    { key: 'Asr', name: 'Аср', icon: '🌤️' },
    { key: 'Maghrib', name: 'Магриб', icon: '🌇' },
    { key: 'Isha', name: 'Иша', icon: '🌃' }
  ];

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <section id="prayer" className="prayer-section">
      <div className="container">
        <div className="prayer-content">
          <div className="prayer-visual">
            <div className="prayer-phone">
              <div className="prayer-screen">
                <div className="prayer-header">
                  <Icons.Location />
                  <span>{location.city}{location.country ? `, ${location.country}` : ''}</span>
                </div>
                
                {/* Текущее время */}
                <div className="current-time-display">
                  <span className="current-time-label colorYell">Текущее время</span>
                  <span className="current-time-value">{formatCurrentTime()}</span>
                </div>

                {/* Следующий намаз */}
                {nextPrayer && (
                  <div className="next-prayer-banner">
                    <div className="next-prayer-info">
                      <span className="next-prayer-label colorblck">Следующий:</span>
                      <span className="next-prayer-name colorblck">{nextPrayer.name}</span>
                    </div>
                    <div className="next-prayer-time-info">
                      <span className="next-prayer-time colorblck">{nextPrayer.time}</span>
                      <span className="next-prayer-remaining colorblck">{timeRemaining}</span>
                    </div>
                  </div>
                )}

                <div className="prayer-list">
                  {loading ? (
                    <div className="prayer-loading">
                      <div className="loading-spinner"></div>
                      <span>Загрузка времени намаза...</span>
                    </div>
                  ) : (
                    prayerOrder.map((prayer, index) => {
                      const isNext = nextPrayer?.key === prayer.key;
                      const prayerTime = prayerTimes?.[prayer.key] || '--:--';
                      
                      // Проверяем, прошел ли этот намаз
                      const now = currentTime;
                      const currentMinutes = now.getHours() * 60 + now.getMinutes();
                      const [hours, minutes] = prayerTime.split(':').map(Number);
                      const prayerMinutes = hours * 60 + minutes;
                      const isPassed = prayerMinutes < currentMinutes && !isNext;

                      return (
                        <div 
                          key={index} 
                          className={`prayer-item ${isNext ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                        >
                          <span className="prayer-item-icon">{prayer.icon}</span>
                          <span className="prayer-item-name">{prayer.name}</span>
                          <span className="prayer-item-time">{prayerTime}</span>
                          {isNext && <span className="prayer-next">▶</span>}
                          {isPassed && <span className="prayer-passed">✓</span>}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="prayer-text">
            <span className="section-tag">Время намаза</span>
            <h2 className="section-title">Никогда не пропустите молитву</h2>
            <p className="section-description">
              Точное время всех пяти молитв с учётом вашего местоположения. 
              Настраиваемые уведомления помогут вам соблюдать расписание.
            </p>
            
            {/* Информация о текущем времени */}
            <div className="live-prayer-info">
              <div className="live-time-card borderblck">
                <span className="live-label  ">🕐 Сейчас</span>
                <span className="live-value colorblck">{formatCurrentTime()}</span>
              </div>
              {nextPrayer && (
                <div className="live-time-card highlight">
                  <span className="live-label colorYell">🕌 {nextPrayer.name}</span>
                  <span className="live-value colorYell">{timeRemaining}</span>
                </div>
              )}
            </div>
            
            <div className="prayer-features">
              <div className="prayer-feature-card">
                <Icons.Location />
                <div>
                  <h4>Автоопределение</h4>
                  <p>Местоположение определяется автоматически</p>
                </div>
              </div>
              <div className="prayer-feature-card">
                <Icons.Bell />
                <div>
                  <h4>Уведомления</h4>
                  <p>Напоминания перед каждой молитвой</p>
                </div>
              </div>
              <div className="prayer-feature-card">
                <Icons.Prayer />
                <div>
                  <h4>Методы расчёта</h4>
                  <p>ISNA, MWL, Umm al-Qura и другие</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Секция Тасбех
function TasbihSection() {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(33);

  const handleClick = () => {
    if (count < goal) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  const progress = (count / goal) * 565;

  return (
    <section id="tasbih" className="tasbih-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Тасбех</span>
          <h2 className="section-title">Цифровые чётки</h2>
          <p className="section-description">
            Удобный счётчик для зикра с настраиваемой целью и приятной тактильной обратной связью
          </p>
        </div>
        
        <div className="tasbih-demo">
          <div className="tasbih-circle-container">
            <svg className="tasbih-progress" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <circle
                className="progress-bg"
                cx="100"
                cy="100"
                r="90"
              />
              <circle
                className="progress-fill"
                cx="100"
                cy="100"
                r="90"
                style={{
                  strokeDasharray: `${progress} 565`
                }}
              />
            </svg>
            <button 
              className="tasbih-button"
              onClick={handleClick}
            >
              <span className="tasbih-count">{count}</span>
              <span className="tasbih-goal">из {goal}</span>
            </button>
          </div>
          
          <div className="tasbih-controls">
            <button 
              className={`goal-btn ${goal === 33 ? 'active' : ''}`}
              onClick={() => { setGoal(33); setCount(0); }}
            >
              33
            </button>
            <button 
              className={`goal-btn ${goal === 99 ? 'active' : ''}`}
              onClick={() => { setGoal(99); setCount(0); }}
            >
              99
            </button>
            <button 
              className={`goal-btn ${goal === 100 ? 'active' : ''}`}
              onClick={() => { setGoal(100); setCount(0); }}
            >
              100
            </button>
            <button 
              className="goal-btn reset"
              onClick={() => setCount(0)}
            >
              Сброс
            </button>
          </div>
        </div>
        
        <div className="tasbih-features">
          <div className="tasbih-feature">
            <Icons.Beads />
            <span>Бесконечный режим</span>
          </div>
          <div className="tasbih-feature">
            <Icons.Repeat />
            <span>Авто-сброс</span>
          </div>
          <div className="tasbih-feature">
            <Icons.Bell />
            <span>Вибрация</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Секция Ясин
function YasinSection() {
  return (
    <section className="yasin-section">
      <div className="container">
        <div className="yasin-content">
          <div className="yasin-text">
            <span className="section-tag">Сура Ясин</span>
            <h2 className="section-title">Режим 41-кратного чтения</h2>
            <p className="section-description">
              Специальный режим для чтения суры Ясин 41 раз. 
              Приложение отслеживает ваш прогресс и сохраняет его автоматически.
            </p>
            
            <div className="yasin-features">
              <div className="yasin-feature">
                <div className="yasin-icon">📊</div>
                <span>Счётчик прочтений</span>
              </div>
              <div className="yasin-feature">
                <div className="yasin-icon">💾</div>
                <span>Сохранение прогресса</span>
              </div>
              <div className="yasin-feature">
                <div className="yasin-icon">🎯</div>
                <span>Визуальный прогресс</span>
              </div>
            </div>
          </div>
          
          <div className="yasin-visual">
            <div className="yasin-progress-card">
              <div className="yasin-header">Сура Ясин</div>
              <div className="yasin-counter">
                <span className="current">17</span>
                <span className="separator">/</span>
                <span className="total">41</span>
              </div>
              <div className="yasin-bar">
                <div className="yasin-bar-fill" style={{ width: '41%' }}></div>
              </div>
              <span className="yasin-percent">41% выполнено</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Секция Дуа
function DuaSection() {
  const categories = [
    { icon: "🌅", name: "Утренние дуа", count: 12 },
    { icon: "🌙", name: "Вечерние дуа", count: 10 },
    { icon: "✈️", name: "На путешествие", count: 8 },
    { icon: "💚", name: "На здоровье", count: 15 },
    { icon: "🕌", name: "После намаза", count: 20 },
    { icon: "🍽️", name: "Перед едой", count: 5 }
  ];

  return (
    <section className="dua-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Дуа</span>
          <h2 className="section-title">Каталог молитв</h2>
          <p className="section-description">
            Обширная коллекция дуа на все случаи жизни с арабским текстом, 
            транслитерацией и переводом
          </p>
        </div>
        
        <div className="dua-grid">
          {categories.map((cat, index) => (
            <div key={index} className="dua-card">
              <span className="dua-icon">{cat.icon}</span>
              <span className="dua-name">{cat.name}</span>
              <span className="dua-count">{cat.count} дуа</span>
            </div>
          ))}
        </div>
        
        <div className="dua-example">
          <div className="dua-example-card">
            <span className="dua-category">Утренняя дуа</span>
            <p className="dua-arabic">أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ</p>
            <p className="dua-transliteration">Асбахна ва асбахаль-мульку лиЛлях</p>
            <p className="dua-translation">Мы встретили утро, и вся власть принадлежит Аллаху</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Секция загрузки
function DownloadSection() {
  return (
    <section id="download" className="download-section">
      <div className="container">
        <div className="download-content">
          <div className="download-text">
            <h2 className="download-title">
              Скачайте QIBLA <span className="gradient-text">бесплатно</span>
            </h2>
            <p className="download-description">
              Присоединяйтесь к сотням тысяч мусульман, которые уже используют 
              QIBLA для своей ежедневной духовной практики
            </p>
            
            <div className="download-buttons">
              <a href="#" className="download-btn apple">
                <Icons.Apple />
                <div className="download-btn-text">
                  <span className="download-small">Загрузить в</span>
                  <span className="download-large">App Store</span>
                </div>
              </a>
              <a href="#" className="download-btn google">
                <Icons.Android />
                <div className="download-btn-text">
                  <span className="download-small">Доступно в</span>
                  <span className="download-large">Google Play</span>
                </div>
              </a>
            </div>
            
            <div className="download-features">
              <span>✓ Бесплатно</span>
              <span>✓ Без рекламы</span>
              <span>✓ Офлайн режим</span>
            </div>
          </div>
          
          <div className="download-visual">
            <div className="download-phones">
              <div className="download-phone phone-1">
                <div className="phone-content">
                  <div className="phone-app-icon">☪</div>
                  <span>QIBLA</span>
                </div>
              </div>
              <div className="download-phone phone-2">
                <div className="phone-content">
                  <div className="phone-screen-preview">
                    <div className="preview-header">Коран</div>
                    <div className="preview-list">
                      <div className="preview-item"></div>
                      <div className="preview-item"></div>
                      <div className="preview-item"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="logo-icon">☪</span>
              <span className="logo-text">QIBLA</span>
            </a>
            <p className="footer-description">
              Ваш надёжный спутник в духовной практике. 
              Коран, намаз, дуа и тасбех — всё в одном приложении.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Приложение</h4>
              <a href="#features">Возможности</a>
              <a href="#quran">Коран</a>
              <a href="#prayer">Время намаза</a>
              <a href="#tasbih">Тасбех</a>
            </div>
            <div className="footer-column">
              <h4>Поддержка</h4>
              <a href="https://t.me/VorisxonS">Телеграм</a>
              <a href="https://t.me/VorisxonS">Связаться</a>
              <a href="https://t.me/VorisxonS">Обратная связь</a>
              <a href="phone">+998 90 550 78 07</a>
              <a href="phone">+998 93 058 60 53</a>
            </div>
            <div className="footer-column">
              <h4>Правовая информация</h4>
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Условия использования</a>
            </div>
          </div>
        </div>
        
        {/* <div className="footer-bottom">
          <p>© 2026 QIBLA. Все права защищены.</p>
          <div className="footer-social">
            <a href="https://t.me/VorisxonS">Tg</a>
            <a href="https://www.instagram.com/vorisxon_s/" aria-label="Instagram">in</a>
            <a href="vorisxon.me@gmail.com" aria-label="Email">vorisxon.me@gmail.com</a>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

// Главный компонент
function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <QuranSection />
      <PrayerSection />
      <TasbihSection />
      <YasinSection />
      <DuaSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}

export default App;