import { gsap } from 'gsap';

/* ==========================================================================
   Split text into individual character spans for GSAP animation.
   Self-contained here to avoid circular imports with main.js.
   ========================================================================== */
export function splitTextIntoSpans(element) {
  if (!element) return;
  // Normalize <br> variants to a consistent marker for splitting
  const html = element.innerHTML.replace(/<br\s*\/?>/gi, '<BR>');
  const lines = html.split('<BR>');
  let result = '';

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) result += '<br>';
    // Strip any remaining HTML tags from the line text
    const clean = line.replace(/<[^>]*>/g, '').trim();
    if (!clean) return;
    const words = clean.split(/\s+/);
    words.forEach((word, wordIdx) => {
      if (wordIdx > 0) result += ' ';
      const lineClass = lineIdx === 0 ? 'char-l1' : 'char-l2';
      result += `<span class="word" style="display:inline-block;white-space:nowrap;">`;
      [...word].forEach(char => {
        result += `<span class="char ${lineClass}" style="display:inline-block;opacity:0;transform:translate3d(0,50px,0);">${char}</span>`;
      });
      result += `</span>`;
    });
  });

  element.innerHTML = result;
}

/* ==========================================================================
   PRELOADER — actual image asset tracking
   ========================================================================== */
export function initPreloader(onCompleteCallback) {
  const preloader   = document.getElementById('preloader');
  const percentEl   = preloader?.querySelector('.loader-percentage');
  const barEl       = preloader?.querySelector('.loader-bar');
  const bypassBtn   = document.getElementById('loaderBypass');

  // Split hero title chars now, before preloader hides (avoids layout flash)
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) splitTextIntoSpans(heroTitle);

  const assets = [
    '/assets/backgrounds/stadium-bg.webp',
    '/assets/players/mbappe.webp',
    '/assets/players/vini-jr.webp',
    '/assets/players/bellingham.webp',
    '/assets/players/yamal.webp',
    '/assets/players/haaland.webp',
    '/assets/players/messi.webp',
    '/assets/players/cristiano.webp',
    '/assets/backgrounds/trophy.webp',
  ];

  let loaded = 0;
  let finished = false;

  // Show bypass button after 6 s on slow networks
  const bypassTimer = setTimeout(() => {
    if (!finished && bypassBtn) bypassBtn.classList.add('show');
  }, 6000);

  function setProgress(pct) {
    if (barEl)     barEl.style.width = `${pct}%`;
    if (percentEl) percentEl.textContent = `${pct}%`;
  }

  function onAssetSettled() {
    loaded++;
    const pct = Math.min(100, Math.round((loaded / assets.length) * 100));
    setProgress(pct);
    if (loaded >= assets.length) finish();
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(bypassTimer);

    // Small delay so the user sees 100 % for a beat
    setTimeout(() => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          preloader.style.visibility = 'hidden';
          preloader.style.display    = 'none';
          onCompleteCallback?.();
        },
      });
    }, 300);
  }

  if (assets.length === 0) {
    finish();
  } else {
    assets.forEach(src => {
      const img = new Image();
      img.onload  = onAssetSettled;
      img.onerror = onAssetSettled; // don't block on broken URLs
      img.src     = src;
    });
  }

  bypassBtn?.addEventListener('click', finish);
}

/* ==========================================================================
   HERO REVEAL — cinematic timeline fired after preloader exits
   ========================================================================== */
export function triggerHeroReveal() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.main-header',                 { y: -60, opacity: 0, duration: 0.9 })
    .from('.header-logo, .nav-link, #exploreBtn',
                                          { y: -18, opacity: 0, stagger: 0.07, duration: 0.7 }, '-=0.55')
    .to('#heroTitle .char',               { opacity: 1, y: 0, stagger: 0.018, duration: 0.75, ease: 'back.out(1.6)' }, '-=0.45')
    .from('#heroSubtitle',                { opacity: 0, y: 24, duration: 0.75 }, '-=0.4')
    .from('.hero-badge',                  { opacity: 0, y: 12, duration: 0.5 }, '-=0.25')
    .from('#enterBtn',                    { scale: 0.82, opacity: 0, duration: 0.75, ease: 'back.out(1.5)' }, '-=0.4')
    .from('.scroll-indicator',            { opacity: 0, y: 14, duration: 0.55 }, '-=0.3')
    .from('.hero-ghost-number',           { opacity: 0, scale: 0.92, duration: 1.2, ease: 'power2.out' }, '-=0.6')
    .from('.hero-spotlight',              { opacity: 0, duration: 1.0 }, '-=0.7')
    .from('.audio-toggle',                { opacity: 0, x: -20, duration: 0.5 }, '-=0.4');
}
