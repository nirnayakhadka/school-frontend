import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize AOS after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    offset: 120,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    disable: 'mobile',
    delay: 0
  });
});
