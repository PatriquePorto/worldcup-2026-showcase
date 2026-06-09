import './styles/base.css';
import './styles/desktop.css';
import './styles/mobile.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { initPreloader, triggerHeroReveal } from './modules/preloader';
import { initTranslator, setLanguage, getCurrentLang, t } from './modules/translator';
import { initCountdown } from './modules/countdown';
import { initCursor } from './modules/cursor';
import { initParticles } from './modules/particles';
import { initAudio } from './modules/audio';
import { initSlider } from './modules/slider';
import { initTilt } from './modules/tilt';
import { initDuel } from './modules/duel';
import { initMap } from './modules/map';

/* ── Register GSAP plugins once at the root level ── */
gsap.registerPlugin(ScrollTrigger);

/* ── Detect reduced-motion preference early (sets <html> data attr) ── */
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.dataset.reducedMotion = motionQuery.matches;
motionQuery.addEventListener('change', () => {
  document.documentElement.dataset.reducedMotion = motionQuery.matches;
  window.location.reload();
});

/* ── Touch device detection: hide custom cursor on touch-only devices ── */
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.documentElement.classList.add('is-touch');
}

/* ==========================================================================
   BOOT
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // ── 0. Init translator BEFORE preloader (so hero title splits with correct language)
  initTranslator();

  // ── 1. Accessibility: detect first mouse move → toggle cursor CSS class
  window.addEventListener('mousemove', function onFirstMouse() {
    document.body.classList.add('has-mouse');
    window.removeEventListener('mousemove', onFirstMouse);
  });

  // ── 2. Lenis Smooth Scroll (bypassed when reduced motion is preferred)
  const prefersReduced = document.documentElement.dataset.reducedMotion === 'true';
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !prefersReduced,
    wheelMultiplier: 0.9,
  });

  // Bridge Lenis ↔ ScrollTrigger so pinning stays in sync
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ── 3. Initialise all feature modules
  initCursor();
  initParticles();
  initAudio();
  initSlider();
  initTilt();
  initDuel();
  initMap();
  initCountdown();

  // ── 5. Preloader: tracks real asset loads, fires callback on complete
  initPreloader(() => {
    triggerHeroReveal();
  });

  // ── 6. Header nav smooth-scroll (respects Lenis, prevents hard jumps)
  document.querySelectorAll('.nav-link, .header-logo').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        lenis.scrollTo(0, { duration: 1.4 });
      } else {
        const target = document.querySelector(href);
        if (target) lenis.scrollTo(target, { duration: 1.4 });
      }
    });
  });

  // ── 7. "Enter Experience" hero CTA + header "Explore Teams" scroll to Chapter 1
  function scrollToChapter1() {
    const ch1 = document.getElementById('chapter1');
    if (ch1) lenis.scrollTo(ch1, { duration: 1.6 });
  }

  const enterBtn = document.getElementById('enterBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', scrollToChapter1);
    enterBtn.removeAttribute('onclick');
  }

  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', scrollToChapter1);
  }

  // ── 8. Language toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const nextLang = getCurrentLang() === 'en' ? 'pt-BR' : 'en';
      setLanguage(nextLang);
      // Re-init audio text after language change
      const audioText = document.querySelector('.audio-text');
      const audioBtn = document.getElementById('audioToggle');
      if (audioText && audioBtn) {
        const isActive = audioBtn.classList.contains('active');
        audioText.textContent = isActive ? t('audio.on') : t('audio.off');
      }
    });
  }

  // ── 9. Mobile hamburger menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  const headerNav = document.querySelector('.header-nav');
  if (hamburgerBtn && headerNav) {
    function closeMobileNav() {
      hamburgerBtn.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
      headerNav.classList.remove('is-open');
      navOverlay?.classList.remove('is-visible');
    }
    function openMobileNav() {
      hamburgerBtn.classList.add('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
      headerNav.classList.add('is-open');
      navOverlay?.classList.add('is-visible');
    }
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = headerNav.classList.contains('is-open');
      isOpen ? closeMobileNav() : openMobileNav();
    });
    navOverlay?.addEventListener('click', closeMobileNav);
    // Close nav on link click
    headerNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
    // Close nav on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && headerNav.classList.contains('is-open')) {
        closeMobileNav();
        hamburgerBtn.focus();
      }
    });
  }

  // ── 10. Gradient orb parallax — moves subtly with scroll for depth
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1 && orb2) {
    lenis.on('scroll', ({ progress }) => {
      const y1 =  progress * 120;
      const y2 = -progress * 80;
      orb1.style.transform = `translateY(${y1}px)`;
      orb2.style.transform = `translateY(${y2}px)`;
    });
  }
});
