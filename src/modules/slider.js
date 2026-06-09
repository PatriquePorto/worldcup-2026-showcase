import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ==========================================================================
   HORIZONTAL SCROLL SLIDER — Chapter I "Rise of New Legends"
   Controls the pinned horizontal-scroll section with keyboard + scroll-driven nav.
   ========================================================================== */
export function initSlider() {
  const section = document.querySelector('.horizontal-scroll-section');
  const track   = document.querySelector('.horizontal-slider');
  const slides  = document.querySelectorAll('.slide');
  const prefersReduced = document.documentElement.dataset.reducedMotion === 'true';

  if (!section || !track || slides.length === 0) return;

  const SLIDE_COUNT = slides.length;
  let currentIndex  = 0;

  function dispatchSlideEvent(slide) {
    const player = slide?.getAttribute('data-player') || null;
    window.dispatchEvent(new CustomEvent('cursor:slidechange', { detail: { player } }));
  }

  // ── ARIA setup for carousel — HTML already has role="group" aria-roledescription="slide"
  track.setAttribute('aria-label', 'Football legends carousel');
  slides.forEach((slide, i) => {
    slide.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    slide.setAttribute('tabindex', i === 0 ? '0' : '-1');
  });

  // Make track width dynamic based on number of slides
  track.style.width = `${SLIDE_COUNT * 100}vw`;

  // ── Helper: Animate stat bars on slide enter
  function animateStatBars(slide) {
    const stats = slide.querySelectorAll('.hud-stat');
    stats.forEach(statEl => {
      const value = parseInt(statEl.dataset.stat || '0', 10);
      const bar   = statEl.querySelector('.stat-bar');
      const label = statEl.querySelector('.stat-val');
      if (!bar) return;

      if (prefersReduced) {
        bar.style.width = `${value}%`;
        if (label) label.textContent = value;
        return;
      }

      gsap.to(bar,   { width: `${value}%`, duration: 1.1, ease: 'expo.out', delay: 0.25 });
      gsap.fromTo({ v: 0 }, { v: value },  {
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.25,
        onUpdate() {
          if (label) label.textContent = Math.round(this.targets()[0].v);
        },
      });
    });
  }

  // ── Core navigation
  function goToSlide(idx) {
    if (idx < 0 || idx >= SLIDE_COUNT || idx === currentIndex) return;
    currentIndex = idx;

    // Center the target slide in view (translate track)
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap        = 32; // matches CSS gap
    const targetX    = -(idx * (slideWidth + gap));

    if (prefersReduced) {
      gsap.set(track, { x: targetX });
    } else {
      gsap.to(track, {
        x: targetX,
        duration: 0.9,
        ease: 'expo.out',
      });
    }

    // Update ARIA + tabindex
    slides.forEach((s, i) => {
      const active = i === idx;
      s.classList.toggle('is-active',   active);
      s.setAttribute('aria-selected', active ? 'true' : 'false');
      s.setAttribute('tabindex',      active ? '0' : '-1');
    });

    // Focus management
    slides[idx]?.focus({ preventScroll: true });

    animateStatBars(slides[idx]);
    dispatchSlideEvent(slides[idx]);
  }

  // ── Click to navigate
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => goToSlide(i));
  });

  // ── Keyboard navigation
  section.addEventListener('keydown', (e) => {
    if (!section.contains(document.activeElement)) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        goToSlide(Math.min(currentIndex + 1, SLIDE_COUNT - 1));
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goToSlide(Math.max(currentIndex - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(SLIDE_COUNT - 1);
        break;
    }
  });

  // ── Touch swipe navigation for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;

  section.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = false;
  }, { passive: true });

  section.addEventListener('touchmove', (e) => {
    if (!isSwiping) {
      const dx = Math.abs(e.changedTouches[0].screenX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].screenY - touchStartY);
      if (dx > 10 && dx > dy) isSwiping = true;
    }
  }, { passive: true });

  section.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx > 0
        ? goToSlide(Math.max(currentIndex - 1, 0))
        : goToSlide(Math.min(currentIndex + 1, SLIDE_COUNT - 1));
    }
  }, { passive: true });

  // ── ScrollTrigger: horizontal scrub driven by page scroll
  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      id: 'horizontalSlider',
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth + window.innerWidth}`,
      pin: true,
      scrub: prefersReduced ? false : 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Keep keyboard index in sync with scroll position
        const targetIdx = Math.min(
          SLIDE_COUNT - 1,
          Math.round(self.progress * (SLIDE_COUNT - 1))
        );
        if (targetIdx !== currentIndex) {
          currentIndex = targetIdx;
          slides.forEach((s, i) => {
            const active = i === targetIdx;
            s.classList.toggle('is-active', active);
            s.setAttribute('aria-selected', active ? 'true' : 'false');
            s.setAttribute('tabindex', active ? '0' : '-1');
          });
          animateStatBars(slides[targetIdx]);
          dispatchSlideEvent(slides[targetIdx]);
        }
      },
    },
  });

  // ── Initial state: animate first card stats + cursor colour
  animateStatBars(slides[0]);
  dispatchSlideEvent(slides[0]);

  if (!prefersReduced) {
    gsap.from(track, {
      opacity: 0,
      y: 40,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}
