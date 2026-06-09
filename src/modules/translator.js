import { splitTextIntoSpans } from './preloader';

const i18n = {
  'en': {
    'lang': 'en',
    'meta.title': 'FIFA World Cup 2026 - The Next Legends | Cinematic Showcase',
    'meta.desc': 'Explore the elite football athletes and matches defining the future of the FIFA World Cup 2026 in USA, Canada, and Mexico. A cinematic, multi-layered 3D web experience.',
    'meta.og.title': 'FIFA World Cup 2026 - The Next Legends',
    'meta.og.desc': 'Explore the elite football athletes and matches defining the future of the FIFA World Cup 2026. A cinematic, multi-layered 3D web experience.',
    'skip': 'Skip to main content',
    'preloader.subtitle': 'LOADING ASSETS...',
    'preloader.bypass': 'Bypass loading',
    'audio.off': 'STADIUM SOUND: OFF',
    'audio.on': 'STADIUM SOUND: ON',
    'nav.home': 'HOME',
    'nav.ch1': 'CHAPTER I',
    'nav.ch2': 'CHAPTER II',
    'nav.ch3': 'ROAD TO GLORY',
    'header.cta': 'EXPLORE TEAMS',
    'hero.tagline': 'THE GREATEST STAGE ON EARTH',
    'hero.title.l1': 'FIFA WORLD CUP 2026',
    'hero.title.l2': 'THE NEXT LEGENDS',
    'hero.subtitle': 'Explore the stars who will define football\'s biggest stage. An interactive showcase of elite talent.',
    'hero.badge': '16 CITIES · 3 NATIONS · ONE STAGE',
    'hero.cta': 'ENTER EXPERIENCE',
    'hero.scroll': 'SCROLL TO DISCOVER',
    'ch1.num': 'CHAPTER I',
    'ch1.title': 'RISE OF NEW LEGENDS',
    'ch1.desc': 'The vanguard of modern football. Young, relentless, and hungry for absolute global glory in North America.',
    'ch1.swipe': 'SCROLL DOWN TO PROGRESS HORIZONTALLY',
    'player.mbappe.country': 'FRANCE',
    'player.mbappe.name': 'KYLIAN',
    'player.mbappe.surname': 'MBAPPÉ',
    'player.mbappe.desc': 'World champion and lightning-fast attacker, poised to carry France to another historic milestone.',
    'player.mbappe.club': 'REAL MADRID // L1',
    'player.mbappe.age': 'AGE: 27',
    'stat.pace': 'PACE',
    'stat.shooting': 'SHOOTING',
    'stat.dribbling': 'DRIBBLING',
    'stat.passing': 'PASSING',
    'stat.physical': 'PHYSICAL',
    'player.mbappe.footer1': 'WC GOALS: 12',
    'player.mbappe.footer2': 'VALUE: €180M',
    'player.vini.country': 'BRAZIL',
    'player.vini.name': 'VINÍCIUS',
    'player.vini.surname': 'JÚNIOR',
    'player.vini.desc': 'Brazil\'s explosive spearhead, combining lethal velocity and samba dribbling to dominate the left wing.',
    'player.vini.club': 'REAL MADRID // L2',
    'player.vini.age': 'AGE: 25',
    'player.vini.footer1': 'APP: 35',
    'player.vini.footer2': 'VALUE: €150M',
    'player.bellingham.country': 'ENGLAND',
    'player.bellingham.name': 'JUDE',
    'player.bellingham.surname': 'BELLINGHAM',
    'player.bellingham.desc': 'The complete modern midfielder. Vision, power, and high football IQ that dictates the rhythm of the game.',
    'player.bellingham.club': 'REAL MADRID // L3',
    'player.bellingham.age': 'AGE: 22',
    'player.bellingham.footer1': 'APP: 40',
    'player.bellingham.footer2': 'VALUE: €180M',
    'player.yamal.country': 'SPAIN',
    'player.yamal.name': 'LAMINE',
    'player.yamal.surname': 'YAMAL',
    'player.yamal.desc': 'The teenage prodigy redefining limits. Spain\'s most creative spark, ready to take the world by storm.',
    'player.yamal.club': 'BARCELONA // L4',
    'player.yamal.age': 'AGE: 18',
    'player.yamal.footer1': 'APP: 16',
    'player.yamal.footer2': 'VALUE: €120M',
    'player.haaland.country': 'NORWAY',
    'player.haaland.name': 'ERLING',
    'player.haaland.surname': 'HAALAND',
    'player.haaland.desc': 'An unstoppable machine. Pure physical power and clinical finishing that strikes fear into any defence.',
    'player.haaland.club': 'MANCHESTER CITY // L5',
    'player.haaland.age': 'AGE: 25',
    'player.haaland.footer1': 'GOALS: 90+',
    'player.haaland.footer2': 'VALUE: €180M',
    'ch2.num': 'CHAPTER II',
    'ch2.title': 'THE LAST DANCE',
    'legends.title': 'TWO LEGENDS.<br>ONE LAST WORLD STAGE.',
    'legends.text': '<p>For nearly twenty years, football lived through an era unlike any other.</p><p>Two icons.</p><p>Two paths.</p><p>Two definitions of greatness.</p><p>One inspired through genius.</p><p>The other through relentless determination.</p><p>Together, they elevated the sport to heights never seen before.</p><p>Stadiums erupted.</p><p>Generations were inspired.</p><p>History was rewritten.</p><p>As the lights shine on football\'s biggest tournament once again, the world watches not only for goals and victories.</p><p>But for one final opportunity to witness greatness.</p><p>Before the curtain falls on an unforgettable era.</p>',
    'legends.final': 'AN ERA THAT CHANGED FOOTBALL FOREVER',
    'messi.country': 'ARGENTINA',
    'messi.name': 'LIONEL',
    'messi.surname': 'MESSI',
    'messi.desc': 'Some players win matches. Some players win trophies. Few redefine the game itself. For more than two decades, Lionel Messi transformed football into art.',
    'messi.subtitle': 'THE FINAL MASTERPIECE',
    'messi.bio': '<p>Some players win matches.</p><p>Some players win trophies.</p><p>Few redefine the game itself.</p><p>For more than two decades, Lionel Messi transformed football into art, turning impossible moments into timeless memories.</p><p>As the world gathers once again for football\'s greatest stage, every touch, every pass, and every goal carries the weight of a legacy that inspired generations.</p><p>This is more than another World Cup.</p><p>It may be the final chapter of the greatest story ever told on a football pitch.</p>',
    'messi.stat1': 'BALLONS D\'OR',
    'messi.stat2': 'WORLD CUPS',
    'messi.stat3': 'GOALS',
    'ronaldo.country': 'PORTUGAL',
    'ronaldo.name': 'CRISTIANO',
    'ronaldo.surname': 'RONALDO',
    'ronaldo.desc': 'Records were never the destination. They were simply milestones along the way. Through relentless ambition and unmatched discipline, Cristiano Ronaldo became one of the most iconic athletes in sporting history.',
    'ronaldo.subtitle': 'BEYOND GREATNESS',
    'ronaldo.bio': '<p>Records were never the destination.</p><p>They were simply milestones along the way.</p><p>Through relentless ambition, unmatched discipline, and an unbreakable desire to win, Cristiano Ronaldo became one of the most iconic athletes in sporting history.</p><p>Every challenge was answered.</p><p>Every doubt became fuel.</p><p>Now, as another World Cup approaches, the journey continues.</p><p>Not as a promise of what can be achieved.</p><p>But as proof of what happens when greatness refuses to stop.</p>',
    'ronaldo.stat1': 'BALLONS D\'OR',
    'ronaldo.stat2': 'CHAMPIONS LEAGUE',
    'ronaldo.stat3': 'GOALS',
    'ch3.num': 'CHAPTER III',
    'ch3.title': 'ROAD TO GLORY',
    'map.heading': 'UNITED BY FOOTBALL',
    'map.desc': 'Three host nations. 16 iconic cities. 48 teams. The largest tournament in history, bridging oceans and continents to crown the ultimate champion.',
    'map.badge1': 'UNITED STATES',
    'map.badge2': 'CANADA',
    'map.badge3': 'MEXICO',
    'map.capacity': 'CAPACITY',
    'map.matches': 'MATCHES',
    'footer.title': 'ARE YOU READY FOR HISTORY?',
    'footer.desc': 'The countdown to the largest sporting spectacle has begun. Witness the legends rise.',
    'footer.cta': 'EXPLORE STATIONS',
    'footer.copy': '© 2026 FIFA Cinematic Web Experience. Designed for recruiters and fans.',
    'footer.explore': 'EXPLORE',
    'footer.connect': 'CONNECT',
    'footer.link.heroes': 'Heroes',
    'footer.link.stadiums': 'Stadiums',
    'footer.link.countdown': 'Countdown',
    'footer.link.history': 'History',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.terms': 'Terms of Service',
    'footer.legal.accessibility': 'Accessibility',
    'cursor.label': 'VIEW',
    'cd.days': 'DAYS',
    'cd.hours': 'HOURS',
    'cd.min': 'MIN',
    'cd.sec': 'SEC',

    /* HTML-safe keys (preserve <br> and <span> markup) */
    'html.player.mbappe': 'KYLIAN<br><span class="highlight">MBAPPÉ</span>',
    'html.player.vini': 'VINÍCIUS<br><span class="highlight">JÚNIOR</span>',
    'html.player.bellingham': 'JUDE<br><span class="highlight">BELLINGHAM</span>',
    'html.player.yamal': 'LAMINE<br><span class="highlight">YAMAL</span>',
    'html.player.haaland': 'ERLING<br><span class="highlight">HAALAND</span>',
    'html.messi': 'LIONEL<br><span class="gold-text">MESSI</span>',
    'html.ronaldo': 'CRISTIANO<br><span class="red-text">RONALDO</span>',
  },

  'pt-BR': {
    'lang': 'pt-BR',
    'meta.title': 'Copa do Mundo FIFA 2026 - As Próximas Lendas | Experiência Cinemática',
    'meta.desc': 'Explore os atletas de elite do futebol que definem o futuro da Copa do Mundo FIFA 2026 nos EUA, Canadá e México. Uma experiência web cinemática em 3D com múltiplas camadas.',
    'meta.og.title': 'Copa do Mundo FIFA 2026 - As Próximas Lendas',
    'meta.og.desc': 'Explore os atletas de elite do futebol que definem o futuro da Copa do Mundo FIFA 2026. Uma experiência web cinemática em 3D.',
    'skip': 'Pular para o conteúdo principal',
    'preloader.subtitle': 'CARREGANDO...',
    'preloader.bypass': 'Pular carregamento',
    'audio.off': 'SOM DO ESTÁDIO: DESL.',
    'audio.on': 'SOM DO ESTÁDIO: LIG.',
    'nav.home': 'INÍCIO',
    'nav.ch1': 'CAPÍTULO I',
    'nav.ch2': 'CAPÍTULO II',
    'nav.ch3': 'CAMINHO PARA GLÓRIA',
    'header.cta': 'EXPLORAR TIMES',
    'hero.tagline': 'O MAIOR PALCO DA TERRA',
    'hero.title.l1': 'COPA DO MUNDO FIFA 2026',
    'hero.title.l2': 'AS PRÓXIMAS LENDAS',
    'hero.subtitle': 'Conheça as estrelas que definirão o maior palco do futebol. Uma vitrine interativa de talento de elite.',
    'hero.badge': '16 CIDADES · 3 NAÇÕES · UM PALCO',
    'hero.cta': 'ENTRAR NA EXPERIÊNCIA',
    'hero.scroll': 'ROLE PARA DESCOBRIR',
    'ch1.num': 'CAPÍTULO I',
    'ch1.title': 'A ASCENSÃO DAS NOVAS LENDAS',
    'ch1.desc': 'A vanguarda do futebol moderno. Jovens, implacáveis e famintos pela glória global absoluta na América do Norte.',
    'ch1.swipe': 'ROLE PARA BAIXO PARA AVANÇAR HORIZONTALMENTE',
    'player.mbappe.country': 'FRANÇA',
    'player.mbappe.name': 'KYLIAN',
    'player.mbappe.surname': 'MBAPPÉ',
    'player.mbappe.desc': 'Campeão mundial e atacante velocíssimo, pronto para levar a França a mais um marco histórico.',
    'player.mbappe.club': 'REAL MADRID // L1',
    'player.mbappe.age': 'IDADE: 27',
    'stat.pace': 'VELOCIDADE',
    'stat.shooting': 'FINALIZAÇÃO',
    'stat.dribbling': 'DRIBLE',
    'stat.passing': 'PASSE',
    'stat.physical': 'FÍSICO',
    'player.mbappe.footer1': 'GOLS NA COPA: 12',
    'player.mbappe.footer2': 'VALOR: €180M',
    'player.vini.country': 'BRASIL',
    'player.vini.name': 'VINÍCIUS',
    'player.vini.surname': 'JÚNIOR',
    'player.vini.desc': 'A ponta de lança explosiva do Brasil, combinando velocidade letal e drible de samba para dominar a ponta esquerda.',
    'player.vini.club': 'REAL MADRID // L2',
    'player.vini.age': 'IDADE: 25',
    'player.vini.footer1': 'JOGOS: 35',
    'player.vini.footer2': 'VALOR: €150M',
    'player.bellingham.country': 'INGLATERRA',
    'player.bellingham.name': 'JUDE',
    'player.bellingham.surname': 'BELLINGHAM',
    'player.bellingham.desc': 'O meio-campista moderno completo. Visão, força e QI de futebol elevado que dita o ritmo do jogo.',
    'player.bellingham.club': 'REAL MADRID // L3',
    'player.bellingham.age': 'IDADE: 22',
    'player.bellingham.footer1': 'JOGOS: 40',
    'player.bellingham.footer2': 'VALOR: €180M',
    'player.yamal.country': 'ESPANHA',
    'player.yamal.name': 'LAMINE',
    'player.yamal.surname': 'YAMAL',
    'player.yamal.desc': 'O prodígio adolescente redefinindo limites. A centelha mais criativa da Espanha, pronta para conquistar o mundo.',
    'player.yamal.club': 'BARCELONA // L4',
    'player.yamal.age': 'IDADE: 18',
    'player.yamal.footer1': 'JOGOS: 16',
    'player.yamal.footer2': 'VALOR: €120M',
    'player.haaland.country': 'NORUEGA',
    'player.haaland.name': 'ERLING',
    'player.haaland.surname': 'HAALAND',
    'player.haaland.desc': 'Uma máquina imparável. Força física pura e finalização clínica que infunde medo em qualquer defesa.',
    'player.haaland.club': 'MANCHESTER CITY // L5',
    'player.haaland.age': 'IDADE: 25',
    'player.haaland.footer1': 'GOLS: 90+',
    'player.haaland.footer2': 'VALOR: €180M',
    'ch2.num': 'CAPÍTULO II',
    'ch2.title': 'A ÚLTIMA DANÇA',
    'legends.title': 'DUAS LENDAS.<br>UM ÚLTIMO PALCO MUNDIAL.',
    'legends.text': '<p>Por quase vinte anos, o futebol viveu uma era diferente de qualquer outra.</p><p>Dois ícones.</p><p>Dois caminhos.</p><p>Duas definições de grandeza.</p><p>Um inspirado pela genialidade.</p><p>O outro pela determinação implacável.</p><p>Juntos, eles elevaram o esporte a patamares nunca antes vistos.</p><p>Estádios explodiram.</p><p>Gerações foram inspiradas.</p><p>A história foi reescrita.</p><p>Quando as luzes se acendem para o maior torneio de futebol mais uma vez, o mundo assiste não apenas a gols e vitórias.</p><p>Mas a uma última oportunidade de testemunhar a grandeza.</p><p>Antes que a cortina se feche sobre uma era inesquecível.</p>',
    'legends.final': 'UMA ERA QUE MUDOU O FUTEBOL PARA SEMPRE',
    'messi.country': 'ARGENTINA',
    'messi.name': 'LIONEL',
    'messi.surname': 'MESSI',
    'messi.desc': 'Alguns jogadores vencem partidas. Alguns jogadores vencem troféus. Poucos redefinem o próprio jogo. Por mais de duas décadas, Lionel Messi transformou o futebol em arte.',
    'messi.subtitle': 'A OBRA-PRIMA FINAL',
    'messi.bio': '<p>Alguns jogadores vencem partidas.</p><p>Alguns jogadores vencem troféus.</p><p>Poucos redefinem o próprio jogo.</p><p>Por mais de duas décadas, Lionel Messi transformou o futebol em arte, transformando momentos impossíveis em memórias atemporais.</p><p>Enquanto o mundo se reúne mais uma vez para o maior palco do futebol, cada toque, cada passe e cada gol carregam o peso de um legado que inspirou gerações.</p><p>Isto é mais do que outra Copa do Mundo.</p><p>Pode ser o capítulo final da maior história já contada em um campo de futebol.</p>',
    'messi.stat1': 'BALLONS D\'OR',
    'messi.stat2': 'COPAS DO MUNDO',
    'messi.stat3': 'GOLS',
    'ronaldo.country': 'PORTUGAL',
    'ronaldo.name': 'CRISTIANO',
    'ronaldo.surname': 'RONALDO',
    'ronaldo.desc': 'Recordes nunca foram o destino. Foram apenas marcos ao longo do caminho. Com ambição implacável e disciplina incomparável, Cristiano Ronaldo tornou-se um dos atletas mais icônicos da história do esporte.',
    'ronaldo.subtitle': 'ALÉM DA GRANDEZA',
    'ronaldo.bio': '<p>Recordes nunca foram o destino.</p><p>Foram apenas marcos ao longo do caminho.</p><p>Com ambição implacável, disciplina incomparável e uma vontade inabalável de vencer, Cristiano Ronaldo tornou-se um dos atletas mais icônicos da história do esporte.</p><p>Cada desafio foi respondido.</p><p>Cada dúvida virou combustível.</p><p>Agora, enquanto outra Copa do Mundo se aproxima, a jornada continua.</p><p>Não como uma promessa do que pode ser alcançado.</p><p>Mas como a prova do que acontece quando a grandeza se recusa a parar.</p>',
    'ronaldo.stat1': 'BALLONS D\'OR',
    'ronaldo.stat2': 'LIGA DOS CAMPEÕES',
    'ronaldo.stat3': 'GOLS',
    'ch3.num': 'CAPÍTULO III',
    'ch3.title': 'CAMINHO PARA A GLÓRIA',
    'map.heading': 'UNIDOS PELO FUTEBOL',
    'map.desc': 'Três nações-sede. 16 cidades icônicas. 48 seleções. O maior torneio da história, unindo oceanos e continentes para coroar o campeão definitivo.',
    'map.badge1': 'ESTADOS UNIDOS',
    'map.badge2': 'CANADÁ',
    'map.badge3': 'MÉXICO',
    'map.capacity': 'CAPACIDADE',
    'map.matches': 'PARTIDAS',
    'footer.title': 'VOCÊ ESTÁ PRONTO PARA A HISTÓRIA?',
    'footer.desc': 'A contagem regressiva para o maior espetáculo esportivo começou. Testemunhe as lendas surgirem.',
    'footer.cta': 'EXPLORAR ESTAÇÕES',
    'footer.copy': '© 2026 Experiência Cinemática FIFA. Projetado para recrutadores e fãs.',
    'footer.explore': 'EXPLORAR',
    'footer.connect': 'CONECTAR',
    'footer.link.heroes': 'Heróis',
    'footer.link.stadiums': 'Estádios',
    'footer.link.countdown': 'Contagem Regressiva',
    'footer.link.history': 'História',
    'footer.legal.privacy': 'Política de Privacidade',
    'footer.legal.terms': 'Termos de Serviço',
    'footer.legal.accessibility': 'Acessibilidade',
    'cursor.label': 'VER',
    'cd.days': 'DIAS',
    'cd.hours': 'HORAS',
    'cd.min': 'MIN',
    'cd.sec': 'SEG',

    /* HTML-safe keys (preserve <br> and <span> markup) */
    'html.player.mbappe': 'KYLIAN<br><span class="highlight">MBAPPÉ</span>',
    'html.player.vini': 'VINÍCIUS<br><span class="highlight">JÚNIOR</span>',
    'html.player.bellingham': 'JUDE<br><span class="highlight">BELLINGHAM</span>',
    'html.player.yamal': 'LAMINE<br><span class="highlight">YAMAL</span>',
    'html.player.haaland': 'ERLING<br><span class="highlight">HAALAND</span>',
    'html.messi': 'LIONEL<br><span class="gold-text">MESSI</span>',
    'html.ronaldo': 'CRISTIANO<br><span class="red-text">RONALDO</span>',
  },
};

let currentLang = 'en';

export function getCurrentLang() {
  return currentLang;
}

export function t(key) {
  return i18n[currentLang]?.[key] ?? i18n['en']?.[key] ?? key;
}

export function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('fifa26-lang', lang);
  applyTranslations();
  document.documentElement.lang = lang === 'pt-BR' ? 'pt' : 'en';
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

function applyTranslations() {
  /* ── Meta tags ── */
  const titleEl = document.querySelector('title');
  if (titleEl) titleEl.textContent = t('meta.title');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('meta.desc'));
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('meta.og.title'));
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', t('meta.og.desc'));
  const twTitle = document.querySelector('meta[property="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', t('meta.og.title'));
  const twDesc = document.querySelector('meta[property="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', t('meta.og.desc'));

  /* ── data-i18n elements (simple textContent) ── */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && i18n[currentLang]?.[key] !== undefined) {
      el.textContent = t(key);
    }
  });

  /* ── data-i18n-html elements (preserves inner markup, replaces innerHTML) ── */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (key && i18n[currentLang]?.[key] !== undefined) {
      el.innerHTML = t(key);
    }
  });

  /* ── Hero title (re-splits if already processed by preloader) ── */
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    heroTitle.innerHTML = `${t('hero.title.l1')}<br>${t('hero.title.l2')}`;
    if (heroTitle.querySelector('.word')) {
      splitTextIntoSpans(heroTitle);
    }
  }

  /* ── Legends title (re-split after data-i18n-html overwrites spans) ── */
  const legendsTitle = document.getElementById('legendsTitle');
  if (legendsTitle && legendsTitle.hasAttribute('data-split')) {
    const html = legendsTitle.innerHTML.replace(/<br\s*\/?>/gi, '<BR>');
    const lines = html.split('<BR>');
    let result = '';
    lines.forEach((line, li) => {
      if (li > 0) result += '<br>';
      const clean = line.replace(/<[^>]*>/g, '').trim();
      if (!clean) return;
      clean.split(/\s+/).forEach((word, wi) => {
        if (wi > 0) result += ' ';
        result += '<span class="word" style="display:inline-block;white-space:nowrap;">';
        [...word].forEach(ch => {
          result += `<span class="char" style="display:inline-block;opacity:0;transform:translate3d(0,30px,0);">${ch}</span>`;
        });
        result += '</span>';
      });
    });
    legendsTitle.innerHTML = result;
  }

  /* ── Footer copyright ── */
  const copyEl = document.querySelector('.copy-text');
  if (copyEl) copyEl.textContent = t('footer.copy');

  /* ── Audio toggle ── */
  const audioText = document.querySelector('.audio-text');
  if (audioText) {
    const isActive = document.getElementById('audioToggle')?.classList.contains('active');
    audioText.textContent = isActive ? t('audio.on') : t('audio.off');
  }

  /* ── Cursor label ── */
  const cursorLabel = document.querySelector('.cursor-label');
  if (cursorLabel) cursorLabel.textContent = t('cursor.label');

  /* ── Lang toggle button ── */
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.textContent = currentLang === 'en' ? 'PT' : 'EN';
    toggle.setAttribute('aria-label', currentLang === 'en' ? 'Mudar para português' : 'Switch to English');
  }
}

/* Called once early — sets initial language before preloader runs */
export function initTranslator() {
  const saved = localStorage.getItem('fifa26-lang');
  const detected = navigator.language?.startsWith('pt') ? 'pt-BR' : 'en';
  currentLang = i18n[saved] ? saved : detected;
  document.documentElement.lang = currentLang === 'pt-BR' ? 'pt' : 'en';
  applyTranslations();
}
