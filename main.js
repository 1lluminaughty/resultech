/* ============================================================
   BI HUB — Interaktion
   1) Navigation: Hintergrund ab dem ersten Scrollen
   2) Reveal-Animationen per IntersectionObserver
   3) Showcase: scrollgesteuertes Aufklappen + Produkt-Karussell
   ============================================================ */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth  = t => t * t * (3 - 2 * t);   // sanft an beiden Enden

  /* ── Jahr im Footer ─────────────────────────────────────── */
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* ── 0 · Preloader ──────────────────────────────────────────
     Nur auf der Startseite vorhanden (kein Element auf den
     Blog-Seiten). Läuft einmal pro Tab-Sitzung: sessionStorage
     verhindert eine Wiederholung, wenn man von einer Unterseite
     zurück auf die Startseite navigiert.

     Ablauf: Icon-Blöcke gestaffelt (0,95s) → Icon rutscht links,
     Wort blendet ein (0,6s) → kurze Pause (0,35s) → Kreis öffnet
     sich (0,8s). */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const seen = sessionStorage.getItem('resultech-intro-seen');
    if (reduced || seen) {
      preloader.remove();
    } else {
      sessionStorage.setItem('resultech-intro-seen', '1');

      const BLOCKS   = 950;                 // vier Icon-Blöcke fertig gestaffelt
      const WORD_DUR = 600;                 // Icon rutscht, Wort blendet ein
      const HOLD     = 350;                 // komplettes Lockup steht kurz
      const OUT_AT   = BLOCKS + WORD_DUR + HOLD;
      const DONE_AT  = OUT_AT + 800;

      requestAnimationFrame(() => requestAnimationFrame(() => {
        preloader.classList.add('is-blocks');
      }));
      setTimeout(() => preloader.classList.add('is-word'), BLOCKS);
      setTimeout(() => preloader.classList.add('is-out'), OUT_AT);
      setTimeout(() => preloader.classList.add('is-done'), DONE_AT);
    }
  }

  /* ── 1 · Navigation ─────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onNav = () => nav.classList.toggle('stuck', scrollY > 24);
  addEventListener('scroll', onNav, { passive: true });
  onNav();

  /* ── 1b · Lesefortschritt (nur Artikelseiten) ───────────── */
  const bar = document.querySelector('[data-progress]');
  if (bar) {
    const article = document.querySelector('.article') || document.body;
    let queued = false;

    const drawBar = () => {
      queued = false;
      const end = article.offsetTop + article.offsetHeight - innerHeight;
      const span = end - article.offsetTop;
      bar.style.setProperty('--p', span > 0 ? clamp((scrollY - article.offsetTop) / span).toFixed(4) : '0');
    };
    const onRead = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(drawBar);
    };

    addEventListener('scroll', onRead, { passive: true });
    addEventListener('resize', onRead);
    drawBar();
  }

  /* ── 2 · Reveal ─────────────────────────────────────────── */
  const targets = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    targets.forEach(el => io.observe(el));
  }

  /* ── 3 · Showcase ───────────────────────────────────────── */
  const section = document.querySelector('[data-showcase]');
  if (!section) return;

  const laptop  = section.querySelector('[data-laptop]');
  const slides  = [...section.querySelectorAll('[data-slide]')];
  const ticks   = [...section.querySelectorAll('[data-go]')];
  const caption = section.querySelector('[data-sc-caption]');

  const LID_SHUT = -108;     // Grad, muss zu --open in styles.css passen
  const HOLD     = 0.05;     // solange bleibt das Gerät zu, bevor es aufklappt
  const OPEN_END = 0.26;     // Anteil des Scrollwegs für das Aufklappen
  const TAIL     = 0.04;     // Puffer am Ende, damit der letzte Slide steht
  const N        = slides.length;

  const CAPTIONS = [
    'Power BI · Berichte, die Entscheidungen auslösen',
    'Power Automate · Prozesse, die ohne Sie weiterlaufen',
    'Power Apps · Anwendungen für den Arbeitsalltag',
    'Microsoft Fabric · das Fundament unter allem'
  ];
  const IDLE = 'Scrollen Sie weiter — der Rest erklärt sich selbst.';

  let current = -1;

  const setSlide = i => {
    if (i === current) return;
    current = i;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
    ticks.forEach((t, n) => t.setAttribute('aria-selected', String(n === i)));
  };

  let label = null;
  const setCaption = text => {
    if (!caption || text === label) return;
    label = text;
    caption.textContent = text;
  };

  /* Bei reduzierter Bewegung: Gerät offen, Wechsel nur über die Schalter */
  if (reduced) {
    laptop.style.setProperty('--open', '0deg');
    laptop.style.setProperty('--zoom', '1');
    laptop.classList.add('is-lit');
    setSlide(0);
    setCaption(CAPTIONS[0]);
    ticks.forEach((t, i) => t.addEventListener('click', () => {
      setSlide(i);
      setCaption(CAPTIONS[i]);
    }));
    return;
  }

  /* Scrollgesteuerte Animation */
  let ticking = false;

  const frame = () => {
    ticking = false;

    const rect  = section.getBoundingClientRect();
    const range = rect.height - innerHeight;
    if (range <= 0) return;

    const p = clamp(-rect.top / range);

    /* Phase 1 — Deckel aufklappen */
    const o = smooth(clamp((p - HOLD) / (OPEN_END - HOLD)));
    laptop.style.setProperty('--open', `${LID_SHUT * (1 - o)}deg`);
    laptop.style.setProperty('--zoom', (0.78 + 0.22 * o).toFixed(4));
    laptop.style.setProperty('--shadow', (0.18 + 0.3 * o).toFixed(3));
    laptop.style.setProperty('--glare', (1 - 0.7 * o).toFixed(3));
    laptop.classList.toggle('is-lit', o > 0.45);

    /* Phase 2 — Produkte durchblättern */
    if (p < OPEN_END * 0.92) {
      setSlide(0);                       // Power BI liegt beim Aufklappen schon an
      setCaption(IDLE);
    } else {
      const span = (1 - OPEN_END - TAIL) / N;
      const i = clamp(Math.floor((p - OPEN_END) / span), 0, N - 1);
      setSlide(i);
      setCaption(CAPTIONS[i]);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(frame);
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* Schalter springen an die passende Scrollposition */
  ticks.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const range = section.offsetHeight - innerHeight;
      if (range <= 0) return;
      const span = (1 - OPEN_END - TAIL) / N;
      const p = OPEN_END + span * (i + 0.45);
      scrollTo({ top: section.offsetTop + range * p, behavior: 'smooth' });
    });
  });
})();
