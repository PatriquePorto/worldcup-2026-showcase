import { gsap } from 'gsap';

export function initCursor() {
  // No custom cursor on touch devices
  if (document.documentElement.classList.contains('is-touch')) return;

  const cursor = document.querySelector('.custom-cursor');
  const ring = document.querySelector('.cursor-ring');
  const dot = document.querySelector('.cursor-dot');
  
  if (!cursor || !ring || !dot) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isMoving = false;

  // Track cursor coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    // Quick dot follow
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power1.out' });
  });

  // GSAP Ticker loop to animate ring follow (with elastic inertia)
  gsap.ticker.add(() => {
    if (!isMoving) return;
    const dt = 0.15; // interpolation weight
    ringX += (mouseX - ringX) * dt;
    ringY += (mouseY - ringY) * dt;
    gsap.set(ring, { x: ringX, y: ringY });
  });

  // Cursor Hover Events (Grow & Tint overlays)
  const bindHoverEvents = () => {
    const targets = document.querySelectorAll('a, button, .btn-magnetic, .map-pin, .duel-column');
    targets.forEach(item => {
      item.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
      });
    });
  };
  bindHoverEvents();

  // Hide cursor when leaving viewport
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  });

  // Magnetic Button Physics
  const magneticElements = document.querySelectorAll('.btn-magnetic');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const bound = el.getBoundingClientRect();
      // Mouse coordinates relative to element center
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;

      // Elastic pull on main container
      gsap.to(el, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Reflection glow movement inside the button
      const glow = el.querySelector('.btn-glow');
      if (glow) {
        gsap.to(glow, {
          x: x * 0.6,
          y: y * 0.6,
          duration: 0.3
        });
      }
    });

    el.addEventListener('mouseleave', () => {
      // Spring back to base center
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)'
      });
      
      const glow = el.querySelector('.btn-glow');
      if (glow) {
        gsap.to(glow, { x: 0, y: 0, duration: 0.5 });
      }
    });
  });
}
