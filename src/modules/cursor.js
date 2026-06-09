import { gsap } from 'gsap';

/* ── Player accent color map ── */
const PLAYER_COLORS = {
  mbappe:    { base: '#00d4ff', glow: 'rgba(0,212,255,0.2)' },
  vini:      { base: '#00ffb2', glow: 'rgba(0,255,178,0.2)' },
  bellingham: { base: '#f7c948', glow: 'rgba(247,201,72,0.2)' },
  yamal:     { base: '#ff3e3e', glow: 'rgba(255,62,62,0.2)' },
  haaland:   { base: '#4deaff', glow: 'rgba(77,234,255,0.2)' },
};

/* ── Messi / Ronaldo duel colors ── */
const DUEL_COLORS = {
  messiColumn:  { base: '#00d4ff', glow: 'rgba(0,212,255,0.2)' },
  ronaldoColumn: { base: '#ff3e3e', glow: 'rgba(255,62,62,0.2)' },
};

let center, ring, trail, label, orbital;
let cursorParticlesCanvas, ctx, particles = [];
let mouseX = 0, mouseY = 0;
let centerX = 0, centerY = 0, ringX = 0, ringY = 0, trailX = 0, trailY = 0;
let idleTimer = null;
let isPenalty = false;
let isGoalFlashing = false;
let isTrophy = false;

/* ── Resolve CSS custom property ── */
function resolveColor(prop) {
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}

/* ── Set cursor accent color ── */
function setAccent(base, glowColor) {
  const g = glowColor || `rgba(${hexToRgb(base)},0.2)`;
  center.style.background = base;
  center.style.boxShadow = `0 0 6px ${base}, 0 0 20px ${base}, 0 0 50px ${base}44`;
  trail.style.background = `radial-gradient(circle, ${g} 0%, transparent 70%)`;
  ring.style.borderColor = base + '66';
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ── Cursor Particles Canvas ── */
class CursorParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = mouseX;
    this.y = mouseY;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = Math.random() * 0.03 + 0.02;
    this.size = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.life -= this.decay;
  }
  draw(ctx) {
    ctx.globalAlpha = this.life * 0.6;
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = this.size * 4;
    ctx.shadowColor = resolveColor('--gold') || '#f7c948';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();
  }
}

function emitParticles(n) {
  for (let i = 0; i < n; i++) {
    if (particles.length < 60) particles.push(new CursorParticle());
  }
}

function animateParticles() {
  if (!ctx || !cursorParticlesCanvas) return;
  ctx.clearRect(0, 0, cursorParticlesCanvas.width, cursorParticlesCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw(ctx);
    if (p.life <= 0) particles.splice(i, 1);
  }
  if (particles.length > 0) requestAnimationFrame(animateParticles);
}

/* ── Goal Explosion ── */
function goalExplosion() {
  if (isGoalFlashing) return;
  isGoalFlashing = true;
  const el = document.querySelector('.custom-cursor');
  el.classList.add('goal-flash');
  for (let i = 0; i < 40; i++) emitParticles(1);
  gsap.delayedCall(0.6, () => {
    el.classList.remove('goal-flash');
    isGoalFlashing = false;
  });
}

/* ── Trophy Mode ── */
function trophyMode() {
  isTrophy = true;
  const el = document.querySelector('.custom-cursor');
  el.classList.add('trophy');
  label.textContent = '\u{1F3C6}';
  label.style.opacity = 1;
  gsap.delayedCall(2.2, () => {
    el.classList.remove('trophy');
    label.textContent = '';
    label.style.opacity = 0;
    isTrophy = false;
  });
}

/* ── Penalty Focus (idle easter egg) ── */
function startPenaltyFocus() {
  if (isPenalty) return;
  isPenalty = true;
  const el = document.querySelector('.custom-cursor');
  el.classList.add('penalty');
}

function endPenaltyFocus() {
  if (!isPenalty) return;
  isPenalty = false;
  const el = document.querySelector('.custom-cursor');
  el.classList.remove('penalty');
  goalExplosion();
}

function resetIdleTimer() {
  if (isTrophy) return;
  if (isPenalty) endPenaltyFocus();
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startPenaltyFocus, 10000);
}

export function initCursor() {
  if (document.documentElement.classList.contains('is-touch')) return;

  center  = document.querySelector('.cursor-center');
  ring    = document.querySelector('.cursor-ring');
  trail   = document.querySelector('.cursor-trail');
  label   = document.querySelector('.cursor-label');
  orbital = document.querySelector('.orbital-lines');
  cursorParticlesCanvas = document.getElementById('cursorParticles');

  if (!center || !ring || !trail) return;

  /* ── Setup particle canvas ── */
  if (cursorParticlesCanvas) {
    ctx = cursorParticlesCanvas.getContext('2d');
    function resize() {
      cursorParticlesCanvas.width = window.innerWidth;
      cursorParticlesCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
  }

  /* ── Mouse tracking ── */
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    resetIdleTimer();

    gsap.to(center, { x: mouseX, y: mouseY, duration: 0.04, ease: 'power1.out' });
    gsap.to(orbital, { x: mouseX, y: mouseY, duration: 0.06, ease: 'power1.out' });

    emitParticles(1);

    if (!isGoalFlashing && !isPenalty) {
      if (particles.length === 0) animateParticles();
    }
  });

  /* ── GSAP ticker: smooth ring / trail follow with inertia ── */
  gsap.ticker.add(() => {
    const dt = 0.12;
    ringX  += (mouseX - ringX)  * dt;
    ringY  += (mouseY - ringY)  * dt;
    trailX += (mouseX - trailX) * dt * 0.6;
    trailY += (mouseY - trailY) * dt * 0.6;
    gsap.set(ring,  { x: ringX, y: ringY });
    gsap.set(trail, { x: trailX, y: trailY });
  });

  /* ── Continuous ring rotation ── */
  gsap.to('.cursor-ring', {
    rotate: 360,
    duration: 6,
    repeat: -1,
    ease: 'none',
  });

  /* ── Orbital lines slow counter-rotation ── */
  gsap.to('.orbital-lines', {
    rotate: 360,
    duration: 12,
    repeat: -1,
    ease: 'none',
  });

  /* ── Subtle center pulse ── */
  gsap.to('.cursor-center', {
    scale: 1.2,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  /* ── Hover events ── */
  const cursor = document.querySelector('.custom-cursor');

  function bindHover() {
    const targets = document.querySelectorAll(
      'a, button, .btn-magnetic, .map-pin.host, .duel-column, .player-wrapper, .slide'
    );
    targets.forEach((item) => {
      item.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }
  bindHover();

  /* ── View mode (map pins) ── */
  const mapPins = document.querySelectorAll('.map-pin.host');
  mapPins.forEach((pin) => {
    pin.addEventListener('mouseenter', () => cursor.classList.add('view-mode'));
    pin.addEventListener('mouseleave', () => cursor.classList.remove('view-mode'));
  });

  /* ── Player accent sync ── */
  const playerSlides = document.querySelectorAll('.player-slide');
  playerSlides.forEach((slide) => {
    slide.addEventListener('mouseenter', () => {
      const player = slide.getAttribute('data-player');
      const c = PLAYER_COLORS[player];
      if (c) setAccent(c.base, c.glow);
    });
    slide.addEventListener('mouseleave', () => {
      setAccent(resolveColor('--cyan'), 'rgba(0,212,255,0.2)');
    });
  });

  /* ── Duel section accent sync ── */
  const messiCard = document.getElementById('messiCard');
  const ronaldoCard = document.getElementById('ronaldoCard');
  if (messiCard) {
    messiCard.addEventListener('mouseenter', () => {
      const c = DUEL_COLORS.messiColumn;
      setAccent(c.base, c.glow);
    });
    messiCard.addEventListener('mouseleave', () => {
      setAccent(resolveColor('--cyan'), 'rgba(0,212,255,0.2)');
    });
  }
  if (ronaldoCard) {
    ronaldoCard.addEventListener('mouseenter', () => {
      const c = DUEL_COLORS.ronaldoColumn;
      setAccent(c.base, c.glow);
    });
    ronaldoCard.addEventListener('mouseleave', () => {
      setAccent(resolveColor('--cyan'), 'rgba(0,212,255,0.2)');
    });
  }

  /* ── Slide change: goal explosion + accent sync ── */
  window.addEventListener('cursor:slidechange', (e) => {
    const player = e.detail?.player;
    if (player && PLAYER_COLORS[player]) {
      const c = PLAYER_COLORS[player];
      setAccent(c.base, c.glow);
    }
    goalExplosion();
  });

  /* ── Trophy mode on reaching chapter 3 ── */
  const ch3 = document.getElementById('chapter3');
  if (ch3 && 'IntersectionObserver' in window) {
    const trophyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) trophyMode();
        });
      },
      { threshold: 0.3 }
    );
    trophyObs.observe(ch3);
  }

  /* ── Idle penalty focus ── */
  idleTimer = setTimeout(startPenaltyFocus, 10000);

  /* ── Hide / show on viewport leave ── */
  document.addEventListener('mouseleave', () => {
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.3 });
  });

  /* ── Magnetic button physics ── */
  document.querySelectorAll('.btn-magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const bound = el.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
      const glow = el.querySelector('.btn-glow');
      if (glow) gsap.to(glow, { x: x * 0.6, y: y * 0.6, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.1, 0.4)' });
      const glow = el.querySelector('.btn-glow');
      if (glow) gsap.to(glow, { x: 0, y: 0, duration: 0.5 });
    });
  });

  /* ── Default accent ── */
  setAccent(resolveColor('--cyan'), 'rgba(0,212,255,0.2)');
}
