import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMap() {
  const mapPins = document.querySelectorAll('.map-pin.host');
  const stadiumOverlayCard = document.getElementById('stadiumOverlayCard');
  const roadGlorySection = document.querySelector('.road-glory-section');
  
  if (!stadiumOverlayCard || !roadGlorySection) return;

  const cityEl = stadiumOverlayCard.querySelector('.stadium-city');
  const nameEl = stadiumOverlayCard.querySelector('.stadium-name');
  const capEl = stadiumOverlayCard.querySelector('.stadium-capacity');
  const matchesEl = stadiumOverlayCard.querySelector('.stadium-matches');
  const cursor = document.querySelector('.custom-cursor');

  // 1. Draw SVG flight paths as the user scrolls into view
  gsap.fromTo('.flight-line', {
    strokeDashoffset: 1000,
  }, {
    strokeDashoffset: 0,
    duration: 2.0,
    stagger: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: roadGlorySection,
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  // 2. Interactive Host Pins Hover Dialog overlays
  mapPins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('view-mode');
      
      const city = pin.getAttribute('data-city');
      const stadium = pin.getAttribute('data-stadium');
      const capacity = pin.getAttribute('data-capacity');
      const matches = pin.getAttribute('data-matches');

      if (cityEl) cityEl.textContent = city;
      if (nameEl) nameEl.textContent = stadium;
      if (capEl) capEl.textContent = capacity;
      if (matchesEl) matchesEl.textContent = matches;

      // Popup slide-up fade reveal
      gsap.to(stadiumOverlayCard, {
        opacity: 1,
        visibility: 'visible',
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    pin.addEventListener('mousemove', (e) => {
      const container = document.querySelector('.map-interactive-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left + 15;
      const y = e.clientY - rect.top - 140;

      // Follow mouse coordinates inside parent container boundary
      gsap.set(stadiumOverlayCard, { left: x, top: y });
    });

    pin.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('view-mode');
      
      gsap.to(stadiumOverlayCard, {
        opacity: 0,
        visibility: 'hidden',
        y: 0,
        duration: 0.2
      });
    });

    // Keyboard Accessibility: support focus and trigger popups via keyboard Tab focus
    pin.addEventListener('focus', () => {
      const city = pin.getAttribute('data-city');
      const stadium = pin.getAttribute('data-stadium');
      const capacity = pin.getAttribute('data-capacity');
      const matches = pin.getAttribute('data-matches');

      if (cityEl) cityEl.textContent = city;
      if (nameEl) nameEl.textContent = stadium;
      if (capEl) capEl.textContent = capacity;
      if (matchesEl) matchesEl.textContent = matches;

      // Position near pin coordinates (transform coordinate translates)
      const transformAttr = pin.getAttribute('transform');
      if (transformAttr) {
        const coords = transformAttr.match(/translate\(([^,]+),\s*([^)]+)\)/);
        if (coords && coords.length >= 3) {
          const pinX = parseFloat(coords[1]);
          const pinY = parseFloat(coords[2]);
          
          gsap.set(stadiumOverlayCard, { left: pinX + 20, top: pinY - 80 });
        }
      }

      gsap.to(stadiumOverlayCard, {
        opacity: 1,
        visibility: 'visible',
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    pin.addEventListener('blur', () => {
      gsap.to(stadiumOverlayCard, {
        opacity: 0,
        visibility: 'hidden',
        y: 0,
        duration: 0.2
      });
    });
  });
}
