import { gsap } from 'gsap';

function splitTextToChars(element) {
  if (!element) return;
  const text = element.textContent.trim();
  const isBr = element.innerHTML.includes('<br>');
  if (isBr) {
    const parts = element.innerHTML.split('<br>');
    let result = '';
    parts.forEach((part, idx) => {
      if (idx > 0) result += '<br>';
      const clean = part.replace(/<[^>]*>/g, '').trim();
      if (!clean) return;
      clean.split(/\s+/).forEach((word, wIdx) => {
        if (wIdx > 0) result += ' ';
        result += '<span class="word" style="display:inline-block;white-space:nowrap;">';
        [...word].forEach(ch => {
          result += `<span class="char" style="display:inline-block;opacity:0;transform:translate3d(0,30px,0);">${ch}</span>`;
        });
        result += '</span>';
      });
    });
    element.innerHTML = result;
  } else {
    const words = text.split(/\s+/);
    let result = '';
    words.forEach((word, idx) => {
      if (idx > 0) result += ' ';
      result += '<span class="word" style="display:inline-block;white-space:nowrap;">';
      [...word].forEach(ch => {
        result += `<span class="char" style="display:inline-block;opacity:0;transform:translate3d(0,30px,0);">${ch}</span>`;
      });
      result += '</span>';
    });
    element.innerHTML = result;
  }
}

export function initDuel() {
  if (document.documentElement.dataset.reducedMotion === 'true') return;

  const legendsDivider = document.getElementById('legendsDivider');
  const legendsTitle = document.getElementById('legendsTitle');
  const legendsLine = document.getElementById('legendsLine');
  const legendsNarrative = document.getElementById('legendsNarrative');
  const legendsFinal = document.getElementById('legendsFinal');

  if (!legendsDivider) return;

  splitTextToChars(legendsTitle);

  const narrativeParagraphs = legendsNarrative
    ? Array.from(legendsNarrative.querySelectorAll('p'))
    : [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: legendsDivider,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.to(legendsTitle.querySelectorAll('.char'), {
    opacity: 1,
    y: 0,
    stagger: 0.025,
    duration: 0.6,
    ease: 'back.out(1.4)',
  })
    .to(legendsLine, {
      opacity: 1,
      width: 120,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.2')
    .fromTo(narrativeParagraphs,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.3',
    )
    .to(legendsFinal, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.2');
}
