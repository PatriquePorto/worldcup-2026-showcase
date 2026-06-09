import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Evaluate a quadratic bezier at t ∈ [0,1] */
function quadBezier(px, py, cx, cy, ex, ey, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * px + 2 * mt * t * cx + t * t * ex,
    y: mt * mt * py + 2 * mt * t * cy + t * t * ey,
  };
}

/* Parse a "M x1,y1 Q cx,cy ex,ey" path and return the control points */
function parseQuadPath(d) {
  const m = d.match(/M\s*([\d.]+),([\d.]+)\s+Q\s+([\d.]+),([\d.]+)\s+([\d.]+),([\d.]+)/);
  if (!m) return null;
  return { px: +m[1], py: +m[2], cx: +m[3], cy: +m[4], ex: +m[5], ey: +m[6] };
}

export function initMap() {
  const mapPins = document.querySelectorAll('.map-pin.host');
  const stadiumOverlayCard = document.getElementById('stadiumOverlayCard');
  const roadGlorySection = document.querySelector('.road-glory-section');
  const svg = document.getElementById('worldMapSvg');
  
  if (!stadiumOverlayCard || !roadGlorySection || !svg) return;

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

  // 2. Animated traveling dots along flight paths
  function createTravelDots() {
    const lines = document.querySelectorAll('.flight-line');
    lines.forEach(line => {
      const d = line.getAttribute('d');
      const cp = parseQuadPath(d);
      if (!cp) return;

      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3');
      dot.setAttribute('class', 'flight-dot');
      svg.appendChild(dot);

      const duration = 3 + Math.random() * 2;
      const delay = Math.random() * 2;

      gsap.to(dot, {
        progress: 1,
        duration,
        repeat: -1,
        ease: 'none',
        delay,
        onUpdate() {
          const t = this.progress();
          const pos = quadBezier(cp.px, cp.py, cp.cx, cp.cy, cp.ex, cp.ey, t);
          dot.setAttribute('cx', pos.x);
          dot.setAttribute('cy', pos.y);
        },
      });
    });
  }

  ScrollTrigger.create({
    trigger: roadGlorySection,
    start: 'top 70%',
    onEnter: createTravelDots,
    once: true,
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
      const cardW = stadiumOverlayCard.offsetWidth || 260;
      const cardH = stadiumOverlayCard.offsetHeight || 180;
      let x = e.clientX - rect.left + 15;
      let y = e.clientY - rect.top - 140;

      // Clamp within container bounds
      x = Math.max(10, Math.min(x, rect.width - cardW - 10));
      y = Math.max(10, Math.min(y, rect.height - cardH - 10));

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

      // Position near pin coordinates, clamped within viewport
      const container = document.querySelector('.map-interactive-container');
      const cardW = stadiumOverlayCard.offsetWidth || 260;
      const cardH = stadiumOverlayCard.offsetHeight || 180;
      const transformAttr = pin.getAttribute('transform');
      if (transformAttr) {
        const coords = transformAttr.match(/translate\(([^,]+),\s*([^)]+)\)/);
        if (coords && coords.length >= 3) {
          let pinX = parseFloat(coords[1]) + 20;
          let pinY = parseFloat(coords[2]) - 80;
          if (container) {
            const rect = container.getBoundingClientRect();
            pinX = Math.max(10, Math.min(pinX, rect.width - cardW - 10));
            pinY = Math.max(10, Math.min(pinY, rect.height - cardH - 10));
          }
          gsap.set(stadiumOverlayCard, { left: pinX, top: pinY });
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
