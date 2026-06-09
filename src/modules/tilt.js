import { gsap } from 'gsap';

export function initTilt() {
  // Skip 3D tilt on touch devices and when user prefers reduced motion
  if (document.documentElement.classList.contains('is-touch') ||
      document.documentElement.dataset.reducedMotion === 'true') return;

  const playerSlides = document.querySelectorAll('.player-slide');
  const duelCards = document.querySelectorAll('.duel-column');

  function handle3DTilt(element, layers) {
    let ticking = false;

    element.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      // Throttle mousemove calls using requestAnimationFrame to protect GPU performance
      requestAnimationFrame(() => {
        const bound = element.getBoundingClientRect();
        const x = (e.clientX - bound.left) / bound.width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - bound.top) / bound.height - 0.5;  // -0.5 to 0.5

        // Card Tilt rotations
        gsap.to(element, {
          rotateY: x * 12,
          rotateX: -y * 12,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000
        });

        // Layer depth translate shifts
        layers.forEach(layer => {
          const target = element.querySelector(layer.selector);
          if (target) {
            gsap.to(target, {
              x: x * layer.multiplierX,
              y: y * layer.multiplierY,
              duration: 0.5,
              ease: 'power2.out'
            });
          }
        });

        // Dynamic colored glow position shift
        const glow = element.querySelector('.player-glow, .duel-glow');
        if (glow) {
          gsap.to(glow, {
            x: (e.clientX - bound.left),
            y: (e.clientY - bound.top),
            duration: 0.3
          });
        }

        ticking = false;
      });
    });

    element.addEventListener('mouseleave', () => {
      // Smooth reset back to baseline
      gsap.to(element, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      layers.forEach(layer => {
        const target = element.querySelector(layer.selector);
        if (target) {
          gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
        }
      });
      
      const glow = element.querySelector('.player-glow, .duel-glow');
      if (glow) {
        gsap.to(glow, { x: '50%', y: '50%', duration: 0.7, ease: 'power3.out' });
      }
    });
  }

  // Hook 3D Parallax on player slides
  playerSlides.forEach(slide => {
    handle3DTilt(slide, [
      { selector: '.stadium-bg', multiplierX: -20, multiplierY: -20 },
      { selector: '.player-wrapper', multiplierX: 15, multiplierY: 8 },
      { selector: '.player-content', multiplierX: 25, multiplierY: 25 },
      { selector: '.hud-stats-card', multiplierX: 10, multiplierY: 10 }
    ]);
  });

  // Hook 3D Parallax on Chapter 2 Cards
  duelCards.forEach(card => {
    handle3DTilt(card, [
      { selector: '.duel-player-wrapper', multiplierX: 12, multiplierY: 6 },
      { selector: '.duel-content', multiplierX: 20, multiplierY: 20 }
    ]);
  });
}
