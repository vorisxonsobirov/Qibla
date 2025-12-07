import React, { useState, useEffect, useCallback } from 'react';
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

// ==========================================
// КОНФИГУРАЦИЯ ПО УМОЛЧАНИЮ (Наманган)
// ==========================================
const DEFAULT_LOCATION = {
  latitude: 40.9983,
  longitude: 71.6726,
  city: 'Наманган',
  country: 'Узбекистан',
  timezone: 5 // UTC+5
};

// ==========================================
// ФУНКЦИИ ДЛЯ РАСЧЁТА ВРЕМЕНИ
// ==========================================

// Получение смещения часового пояса по координатам (приблизительно)
function getTimezoneOffset(longitude) {
  // Приблизительный расчёт часового пояса по долготе
  // Каждые 15 градусов = 1 час
  return Math.round(longitude / 15);
}

// Функция для расчёта времени намаза
function calculatePrayerTimes(date, latitude, longitude, timezoneOffset) {
  const DEG_TO_RAD = Math.PI / 180;
  const RAD_TO_DEG = 180 / Math.PI;
  
  // Параметры расчёта (метод Muslim World League)
  const fajrAngle = 18;
  const ishaAngle = 17;
  const asrFactor = 1; // Стандартный (Шафии)
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Юлианская дата
  const A = Math.floor((14 - month) / 12);
  const Y = year + 4800 - A;
  const M = month + 12 * A - 3;
  const JD = day + Math.floor((153 * M + 2) / 5) + 365 * Y + Math.floor(Y / 4) - Math.floor(Y / 100) + Math.floor(Y / 400) - 32045;
  
  const D = JD - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * Math.sin(g * DEG_TO_RAD) + 0.020 * Math.sin(2 * g * DEG_TO_RAD)) % 360;
  const e = 23.439 - 0.00000036 * D;
  const RA = Math.atan2(Math.cos(e * DEG_TO_RAD) * Math.sin(L * DEG_TO_RAD), Math.cos(L * DEG_TO_RAD)) * RAD_TO_DEG;
  const Dec = Math.asin(Math.sin(e * DEG_TO_RAD) * Math.sin(L * DEG_TO_RAD)) * RAD_TO_DEG;
  
  const EqT = (q - RA) / 15;
  const Dhuhr = 12 + timezoneOffset - longitude / 15 - EqT;
  
  const computeTime = (angle) => {
    const cosHA = (Math.sin(-angle * DEG_TO_RAD) - Math.sin(latitude * DEG_TO_RAD) * Math.sin(Dec * DEG_TO_RAD)) /
                  (Math.cos(latitude * DEG_TO_RAD) * Math.cos(Dec * DEG_TO_RAD));
    if (cosHA < -1 || cosHA > 1) return NaN;
    return Math.acos(cosHA) * RAD_TO_DEG / 15;
  };
  
  const sunriseOffset = computeTime(0.833);
  const fajrOffset = computeTime(fajrAngle);
  const ishaOffset = computeTime(ishaAngle);
  
  const asrDec = Math.atan(1 / (asrFactor + Math.tan(Math.abs(latitude - Dec) * DEG_TO_RAD))) * RAD_TO_DEG;
  const asrOffset = computeTime(-asrDec);
  
  const formatTime = (hours) => {
    if (isNaN(hours)) return '--:--';
    let h = Math.floor(hours);
    let m = Math.round((hours - h) * 60);
    if (m === 60) { h++; m = 0; }
    if (h >= 24) h -= 24;
    if (h < 0) h += 24;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };
  
  return {
    Fajr: formatTime(Dhuhr - fajrOffset),
    Sunrise: formatTime(Dhuhr - sunriseOffset),
    Dhuhr: formatTime(Dhuhr),
    Asr: formatTime(Dhuhr + asrOffset),
    Maghrib: formatTime(Dhuhr + sunriseOffset),
    Isha: formatTime(Dhuhr + ishaOffset)
  };
}

// Функция для получения хиджри даты
function getHijriDate(gregorianDate) {
  const day = gregorianDate.getDate();
  const month = gregorianDate.getMonth();
  const year = gregorianDate.getFullYear();
  
  const jd = Math.floor((11 * year + 3) / 30) + 354 * year + 30 * month - Math.floor((month - 1) / 2) + day - 385;
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hijriMonth = Math.floor((24 * l3) / 709);
  const hijriDay = l3 - Math.floor((709 * hijriMonth) / 24);
  
  const hijriMonths = [
    'Мухаррам', 'Сафар', 'Раби аль-авваль', 'Раби ас-сани',
    'Джумада аль-уля', 'Джумада ас-сания', 'Раджаб', 'Шаабан',
    'Рамадан', 'Шавваль', 'Зуль-каада', 'Зуль-хиджа'
  ];
  
  return `${hijriDay} ${hijriMonths[hijriMonth - 1] || 'Неизвестно'}`;
}

// Функция для получения названия города по координатам
async function getCityName(latitude, longitude) {
  try {
    // Используем бесплатный API для reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
    );
    const data = await response.json();
    
    const city = data.address?.city || 
                 data.address?.town || 
                 data.address?.village || 
                 data.address?.state ||
                 'Неизвестно';
    const country = data.address?.country || '';
    
    return { city, country };
  } catch (error) {
    console.error('Ошибка получения названия города:', error);
    return { city: 'Неизвестно', country: '' };
  }
}

// ==========================================
// ОСНОВНОЙ ХУК ДЛЯ ВРЕМЕНИ НАМАЗА С ГЕОЛОКАЦИЕЙ
// ==========================================
function usePrayerTimes() {
  const [location, setLocation] = useState({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
    city: DEFAULT_LOCATION.city,
    country: DEFAULT_LOCATION.country,
    timezone: DEFAULT_LOCATION.timezone,
    isDefault: true
  });
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState('detecting'); // 'detecting', 'success', 'denied', 'error'

  // Обновление текущего времени каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Получение геолокации
  useEffect(() => {
    const getLocation = async () => {
      setLocationStatus('detecting');
      
      if (!navigator.geolocation) {
        console.log('Геолокация не поддерживается');
        setLocationStatus('error');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Геолокация получена:', latitude, longitude);
          
          // Получаем название города
          const { city, country } = await getCityName(latitude, longitude);
          
          // Определяем часовой пояс
          const timezone = getTimezoneOffset(longitude);
          
          setLocation({
            latitude,
            longitude,
            city,
            country,
            timezone,
            isDefault: false
          });
          
          setLocationStatus('success');
          setLoading(false);
        },
        (error) => {
          console.log('Ошибка геолокации:', error.message);
          
          if (error.code === error.PERMISSION_DENIED) {
            setLocationStatus('denied');
          } else {
            setLocationStatus('error');
          }
          
          // Используем Наманган по умолчанию
          setLocation({
            ...DEFAULT_LOCATION,
            isDefault: true
          });
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 минут кэш
        }
      );
    };

    getLocation();
  }, []);

  // Расчёт времени намаза при изменении локации
  useEffect(() => {
    if (location.latitude && location.longitude) {
      const now = new Date();
      const times = calculatePrayerTimes(
        now, 
        location.latitude, 
        location.longitude, 
        location.timezone
      );
      setPrayerTimes(times);
      setHijriDate(getHijriDate(now));
    }
  }, [location]);

  // Расчёт следующего намаза и оставшегося времени
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
      const timeStr = prayerTimes[prayer.key];
      if (!timeStr || timeStr === '--:--') continue;
      
      const [hours, minutes] = timeStr.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hoursRemaining = Math.floor(diff / 60);
        const minutesRemaining = diff % 60;

        setNextPrayer({
          name: prayer.name,
          time: timeStr,
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

    if (!foundNext && prayerTimes['Fajr']) {
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
    locationStatus,
    currentTime,
    nextPrayer,
    timeRemaining,
    hijriDate
  };
}

// ==========================================
// КОМПОНЕНТЫ
// ==========================================

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

function Hero() {
  const { 
    prayerTimes, 
    location, 
    loading, 
    locationStatus,
    currentTime, 
    nextPrayer, 
    timeRemaining,
    hijriDate 
  } = usePrayerTimes();

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Статус геолокации
  const getLocationStatusText = () => {
    switch (locationStatus) {
      case 'detecting':
        return '🔍 Определение...';
      case 'success':
        return `📍 ${location.city}`;
      case 'denied':
        return `📍 ${location.city} (по умолчанию)`;
      case 'error':
        return `📍 ${location.city} (по умолчанию)`;
      default:
        return `📍 ${location.city}`;
    }
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
            <span>Новое приложение 2024</span>
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
                  <span className="app-location">{getLocationStatusText()}</span>
                  <span className="app-date">{hijriDate || 'Загрузка...'}</span>
                </div>
                
                {/* Индикатор статуса геолокации */}
                {location.isDefault && (
                  <div className="location-notice">
                    ℹ️ Используется Наманган. Разрешите геолокацию для точного времени.
                  </div>
                )}
                
                {loading ? (
                  <div className="prayer-card loading-card">
                    <div className="loading-spinner"></div>
                    <span className="loading-text">Определение местоположения...</span>
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
                  <div className="quick-btn">🤲 Дуа</div>
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

function PrayerSection() {
  const { 
    prayerTimes, 
    location, 
    loading, 
    locationStatus,
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

  const getLocationDisplay = () => {
    if (location.country) {
      return `${location.city}, ${location.country}`;
    }
    return location.city;
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
                  <span>{getLocationDisplay()}</span>
                  {location.isDefault && <span className="default-badge">по умолчанию</span>}
                </div>
                
                <div className="current-time-display">
                  <span className="current-time-label">Текущее время (UTC+{location.timezone})</span>
                  <span className="current-time-value">{formatCurrentTime()}</span>
                </div>

                {nextPrayer && (
                  <div className="next-prayer-banner">
                    <div className="next-prayer-info">
                      <span className="next-prayer-label">Следующий:</span>
                      <span className="next-prayer-name">{nextPrayer.name}</span>
                    </div>
                    <div className="next-prayer-time-info">
                      <span className="next-prayer-time">{nextPrayer.time}</span>
                      <span className="next-prayer-remaining">{timeRemaining}</span>
                    </div>
                  </div>
                )}

                <div className="prayer-list">
                  {loading ? (
                    <div className="prayer-loading">
                      <div className="loading-spinner"></div>
                      <span>Определение местоположения...</span>
                    </div>
                  ) : (
                    prayerOrder.map((prayer, index) => {
                      const isNext = nextPrayer?.key === prayer.key;
                      const prayerTime = prayerTimes?.[prayer.key] || '--:--';
                      
                      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
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
              {location.isDefault && ' Разрешите доступ к геолокации для более точного времени.'}
            </p>
            
            <div className="live-prayer-info">
              <div className="live-time-card">
                <span className="live-label">🕐 Сейчас в {location.city}</span>
                <span className="live-value">{formatCurrentTime()}</span>
              </div>
              {nextPrayer && (
                <div className="live-time-card highlight">
                  <span className="live-label">🕌 {nextPrayer.name}</span>
                  <span className="live-value">{timeRemaining}</span>
                </div>
              )}
            </div>

            {/* Информация о координатах */}
            <div className="coordinates-info">
              <p>📍 Координаты: {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°</p>
              <p>🕐 Часовой пояс: UTC+{location.timezone}</p>
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
                  <p>Muslim World League</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              <circle className="progress-bg" cx="100" cy="100" r="90" />
              <circle
                className="progress-fill"
                cx="100"
                cy="100"
                r="90"
                style={{ strokeDasharray: `${progress} 565` }}
              />
            </svg>
            <button className="tasbih-button" onClick={handleClick}>
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
            <button className="goal-btn reset" onClick={() => setCount(0)}>
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
            </div>
            <div className="footer-column">
              <h4>Правовая информация</h4>
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Условия использования</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 QIBLA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

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