<div align="center">
  <br/>
  <h1>🏆 FIFA WORLD CUP 2026</h1>
  <h3>THE NEXT LEGENDS</h3>
  <br/>
  <p>
    <strong>Cinematic · Interactive · Immersive</strong>
  </p>
  <p>
    A premium, multi-layered web experience showcasing the elite talents set to define the 2026 FIFA World Cup across USA, Canada, and Mexico.
  </p>
  <br/>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-stack">Stack</a> •
    <a href="#-modules">Modules</a> •
    <a href="#-structure">Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>
  <br/>
</div>

---

## ✦ Features

### 🎬 Cinematic Preloader
Asset tracking with real progress, glowing sweep bar, retro scanlines, and a bypass for slow networks. Sets the stage for a grand reveal.

### 🌆 Hero Section
Full-viewport stadium background with radial spotlight, floating ghost "2026", gold-tinted tagline with decorative lines, tournament badge, and a **live countdown** to kickoff — June 11, 2026.

### 🏃 Player Carousel (GSAP Horizontal Scroll)
Five rising stars — **Mbappé**, **Vinícius Júnior**, **Bellingham**, **Yamal**, **Haaland** — each in a full-screen slide with:
- Multi-layer 3D parallax (stadium bg → player cutout → HUD)
- Animated stat bars with count-up (GSAP ScrollTrigger)
- Per-player accent colors (cyan · green · gold · red · cyan-glow)
- Keyboard navigation + cursor color sync

### 🔥 3D Tilt Parallax
Mouse-driven perspective shift with throttled rAF. Layers move at different depths (`translateZ`). Automatically disabled on touch devices and reduced motion.

### ⚔️ The Last Dance — Messi × Ronaldo
Side-by-side cards with actual player images, colored glows (sky blue / red), career stats, and a cinematic "duel" layout.

### 🗺️ Road to Glory — Interactive Map
SVG world map with animated flight paths (ScrollTrigger), 5 host city pins with stadium popups (capacity, matches), and host nation badges (USA · Canada · Mexico).

### 🔊 Stadium Audio
Real stadium ambient track — loops seamlessly, loads on first click. Toggle on/off from the floating button.

### 🌐 Bilingual (EN / PT-BR)
Full translation toggle in the header. Detects browser language, persists choice in localStorage. Covers ~90 keys across all sections, including meta tags and player stats.

### ♿ Accessibility
- WCAG 2.2 AA skip link
- `prefers-reduced-motion` (disables particles, cursor, parallax, scanlines)
- Touch detection (hides custom cursor)
- `focus-visible` rings, ARIA labels, semantic HTML

---

## ✦ Stack

<div align="center">

| | |
|---|---|
| **Core** | HTML5 · CSS3 (Custom Properties, clamp fluid scale) · Vanilla JS (ES6+) |
| **Animation** | GSAP 3 + ScrollTrigger |
| **Smooth Scroll** | Lenis (Studio Freight) |
| **Particles** | HTML5 Canvas 2D |
| **Audio** | Web Audio API (`.mp3` playback) |
| **Build** | Vite 5 · 19 modules · ~163KB JS + 34KB CSS (gzip ~60KB + 7KB) |

</div>

---

## ✦ Modules

| Module | Responsibility |
|---|---|
| `preloader.js` | Asset loading, progress bar, hero title split, reveal timeline |
| `countdown.js` | Live countdown to June 11, 2026 |
| `cursor.js` | Magnetic custom cursor with ring/dot/hover states |
| `particles.js` | Canvas-based rising particle system (hero bg) |
| `slider.js` | Horizontal ScrollTrigger carousel, stat bars count-up, keyboard nav |
| `tilt.js` | 3D mouse-driven parallax on player slides |
| `map.js` | SVG flight line animation, host city popups |
| `audio.js` | Stadium ambient .mp3 player with toggle |
| `translator.js` | EN/PT-BR dictionary + DOM sync |

---

## ✦ Structure

```
world-cup-2026/
├── public/assets/
│   ├── audio/
│   │   └── stadium-roar-concert.mp3
│   ├── backgrounds/
│   │   └── stadium-bg.png
│   └── players/
│       ├── mbappe.png        ├── vini-jr.png
│       ├── bellingham.png    ├── yamal.png
│       ├── haaland.png       ├── messi.png
│       └── cristiano.png
├── src/
│   ├── modules/
│   │   ├── audio.js          ├── countdown.js
│   │   ├── cursor.js         ├── map.js
│   │   ├── particles.js      ├── preloader.js
│   │   ├── slider.js         ├── tilt.js
│   │   └── translator.js
│   ├── style.css
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build

# Preview production build
npm run preview
```

### Requirements
- Node.js 18+
- npm (included)

---

<div align="center">
  <br/>
  <sub>Built with ❤️ for recruiters, designers, and football fans.</sub>
  <br/>
  <sub>© 2026 — FIFA Cinematic Web Experience</sub>
</div>
