import { t } from './translator';

const TARGET = new Date('2026-06-11T00:00:00-04:00');

const UNITS = [
  { key: 'days', labelKey: 'cd.days', divisor: 86400000 },
  { key: 'hours', labelKey: 'cd.hours', divisor: 3600000 },
  { key: 'minutes', labelKey: 'cd.min', divisor: 60000 },
  { key: 'seconds', labelKey: 'cd.sec', divisor: 1000 },
];

let intervalId = null;

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}

function tick() {
  const el = document.getElementById('heroCountdown');
  if (!el) return;

  const diff = TARGET.getTime() - Date.now();

  if (diff <= 0) {
    el.innerHTML = `<span class="cd-unit"><span class="cd-num">00</span><span class="cd-label">${t('cd.days')}</span></span>`;
    if (intervalId) clearInterval(intervalId);
    return;
  }

  let html = '';
  UNITS.forEach(u => {
    const val = Math.floor(diff / u.divisor) % (u.key === 'days' ? 365 : u.key === 'hours' ? 24 : u.key === 'minutes' ? 60 : 60);
    html += `<span class="cd-unit"><span class="cd-num">${pad(val)}</span><span class="cd-label">${t(u.labelKey)}</span></span>`;
    if (u.key !== 'seconds') html += '<span class="cd-sep">:</span>';
  });
  el.innerHTML = html;
}

export function initCountdown() {
  tick();
  intervalId = setInterval(tick, 1000);
}
