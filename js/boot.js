/* ============================================================
   NXR here — boot sequence + language gate
   glyph LED matrix (canvas) + cinematic power-on
   ============================================================ */
(function () {
  'use strict';

  const RED = [215, 25, 33];
  const WHITE = 232;

  /* ---------- LED matrix ---------- */
  const canvas = document.getElementById('bootCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let W = 0, H = 0, dpr = 1, dots = [], cx = 0, cy = 0;

  function build() {
    if (!ctx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W * 0.5; cy = H * 0.46;
    dots = [];
    const gap = 22;
    for (let y = gap / 2; y < H; y += gap) {
      for (let x = gap / 2; x < W; x += gap) {
        const dx = x - cx, dy = y - cy;
        dots.push({ x, y, d: Math.hypot(dx, dy), a: Math.atan2(dy, dx) });
      }
    }
  }

  function angDist(a, b) {
    let d = Math.abs(a - b) % (Math.PI * 2);
    return d > Math.PI ? Math.PI * 2 - d : d;
  }

  const t0 = performance.now();
  let raf = null;

  function frame(now) {
    if (!ctx) return;
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);

    const ring1 = (t * 90) % 420;
    const ring2 = (t * 90 + 210) % 420;
    const arm = (t * 0.9) % (Math.PI * 2);
    const core = (Math.sin(t * 1.6) + 1) / 2;

    for (let i = 0; i < dots.length; i++) {
      const p = dots[i];
      let lit = 0.05;
      let red = 0;

      const e1 = Math.abs(p.d - ring1), e2 = Math.abs(p.d - ring2);
      if (e1 < 26) { const b = 1 - e1 / 26; if (b > lit) { lit = b; red = 1; } }
      if (e2 < 26) { const b = 1 - e2 / 26; if (b > lit) { lit = b; red = 1; } }

      if (p.d > 40 && angDist(p.a, arm) < 0.32) {
        const b = 1 - angDist(p.a, arm) / 0.32;
        if (b > lit) lit = Math.max(lit, b * 0.9);
      }

      if (p.d < 70) {
        const b = core * (1 - p.d / 70);
        if (b > lit) { lit = b; red = 1; }
      }

      const c = red ? [RED[0], RED[1], RED[2]] : [WHITE, WHITE, WHITE];
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(lit, 1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      if (lit > 0.7) {
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${((lit - 0.7) * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5.6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    raf = requestAnimationFrame(frame);
  }

  build();
  window.addEventListener('resize', build);
  raf = requestAnimationFrame(frame);

  /* ---------- elements ---------- */
  const boot = document.getElementById('boot');
  const enteringEl = document.getElementById('bootEntering');
  const brandEl = document.getElementById('bootBrand');
  const byEl = document.getElementById('bootBy');
  const statusEl = document.getElementById('bootStatus');
  const barEl = document.getElementById('bootBar');
  const sweepEl = document.getElementById('bootSweep');
  const gateEl = document.getElementById('langGate');
  const cells = barEl.querySelectorAll('i');

  const TYPE_TEXT = 'ENTERING NXRLABS';
  let phase = 'boot'; // boot -> gate -> done

  /* ---------- helpers ---------- */
  function typeText(elm, text, speed, done) {
    let i = 0;
    (function step() {
      i++;
      elm.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
      if (i < text.length) setTimeout(step, speed);
      else if (done) done();
    })();
  }

  function fillBar(done) {
    let i = 0;
    (function step() {
      if (i < cells.length) {
        cells[i].classList.add('fill');
        i++;
        setTimeout(step, 85);
      } else if (done) done();
    })();
  }

  function showGate() {
    if (phase !== 'boot') return;
    phase = 'gate';
    statusEl.innerHTML = '<span class="sig"></span> READY';
    statusEl.classList.add('granted');
    barEl.classList.add('done');
    setTimeout(() => boot.classList.add('gate-shown'), 350);
  }

  function exit() {
    if (phase === 'done') return;
    phase = 'done';
    if (raf) cancelAnimationFrame(raf);
    boot.classList.add('boot-exit');
    document.body.classList.add('booted');
    setTimeout(() => boot.remove(), 620);
  }

  function pickLang(lang) {
    if (phase !== 'gate') return;
    // flash the chosen card, then exit
    const card = gateEl.querySelector(`[data-lang="${lang}"]`);
    if (card) card.classList.add('chosen');
    if (window.setLang) window.setLang(lang);
    setTimeout(exit, 380);
  }

  /* ---------- input ---------- */
  // click during boot sequence = skip straight to language gate
  boot.addEventListener('click', ev => {
    if (ev.target.closest('.gate-card')) return;
    if (phase === 'boot') showGate();
  });

  gateEl.querySelectorAll('.gate-card').forEach(card => {
    card.addEventListener('click', () => pickLang(card.dataset.lang));
  });

  document.addEventListener('keydown', function onKey(e) {
    if (phase === 'boot' && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
      showGate();
    } else if (phase === 'gate') {
      if (e.key === '1') pickLang('id');
      if (e.key === '2') pickLang('en');
    }
  });

  /* ---------- slower cinematic sequence ---------- */
  requestAnimationFrame(() => boot.classList.add('on'));

  setTimeout(() => {
    typeText(enteringEl, TYPE_TEXT, 62, () => {
      setTimeout(() => {
        brandEl.classList.add('on');
        setTimeout(() => {
          byEl.classList.add('on');
          setTimeout(() => fillBar(() => {
            setTimeout(showGate, 400);
          }), 350);
        }, 500);
      }, 260);
    });
  }, 900);

  // failsafe — never trap the visitor
  setTimeout(() => { if (phase === 'boot') showGate(); }, 12000);
  setTimeout(() => { if (phase === 'gate') pickLang('id'); }, 45000);
})();
