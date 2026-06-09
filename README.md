# FIFA World Cup 2026 — The Next Legends

Experiência web cinematográfica e interativa inspirada na Copa do Mundo FIFA 2026. Combina estética de landing pages Awwwards/FWA com design dinâmico de showcases esportivos e elementos espaciais.

---

## Stack

- **Estrutura**: HTML5 Semântico (WCAG 2.2 AA)
- **Estilização**: CSS3 Moderno (Custom Properties, clamp fluid scale, glassmorphism)
- **Lógica**: JavaScript ES6+ Modular (18 módulos)
- **Animações**: GSAP 3 + ScrollTrigger
- **Scroll**: Lenis (Studio Freight)
- **Canvas**: HTML5 Canvas 2D (partículas)
- **Áudio**: Web Audio API (sintetizador procedural)
- **Bundler**: Vite 5

---

## Recursos

### Preloader Cinematográfico
Rastreamento real de assets (8 imagens), barra de progresso com glow, scanlines, bypass após 6s em rede lenta.

### Hero Section
Background de estádio com overlay radial, spotlight dourado/cyan, ghost number "2026" gigante ao fundo, tagline com deco lines, badge "16 CITIES · 3 NATIONS · ONE STAGE", contagem regressiva para 11/06/2026. Revelação com timeline GSAP (cada caractere animado individualmente).

### Slider de Jogadores (Horizontal ScrollTrigger)
5 jogadores em tela cheia com pinning horizontal, parallax multicamadas, HUD de estatísticas com count-up animado e barras de progresso, cores dinâmicas por jogador (cyan, green, gold, red, cyan-glow).

### Efeito 3D Tilt
Parallax 3D com mousemove throttled via rAF. Profundidade em camadas (background → glow → player image → HUD). Desligado em touch / reduced-motion.

### The Last Dance (Messi × Ronaldo)
Card duplo com fotos reais (Messi e Cristiano Ronaldo), glow azul/vermelho, estatísticas对比, backdrop-filter glass.

### Road to Glory (Mapa Interativo)
SVG com linhas de voo animadas via ScrollTrigger, 5 pinos de cidades-sede com popup de capacidade/partidas, bandeiras das 3 nações anfitriãs.

### Sintetizador de Estádio (Web Audio API)
Sub-bass + ruído filtrado. Sem arquivos de áudio externos. Toggle "STADIUM SOUND".

### Tradução EN / PT-BR
Toggle no header com dicionário completo (~90 chaves). Detecta idioma do navegador. Persiste escolha em localStorage. Herói re-splitta ao trocar idioma.

### Acessibilidade
- Skip link
- `prefers-reduced-motion` (desliga partículas, cursor customizado, parallax, scanlines)
- Touch detection (esconde cursor customizado)
- `focus-visible` ring
- ARIA labels em todos os cards e botões
- Atributos `aria-hidden` em elementos decorativos

---

## Estrutura

```
world-cup-2026/
├── public/
│   └── assets/
│       ├── backgrounds/
│       │   └── stadium-bg.png
│       └── players/
│           ├── mbappe.png
│           ├── vini-jr.png
│           ├── bellingham.png
│           ├── yamal.png
│           ├── haaland.png
│           ├── messi.png
│           └── cristiano.png
├── src/
│   ├── modules/
│   │   ├── audio.js
│   │   ├── countdown.js
│   │   ├── cursor.js
│   │   ├── map.js
│   │   ├── particles.js
│   │   ├── preloader.js
│   │   ├── slider.js
│   │   ├── tilt.js
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

## Como Rodar

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # → dist/
```

Build atual: **19 módulos**, ~163KB JS + 34KB CSS (gzip ~60KB + 7KB).
