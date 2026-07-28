/* ============================================================
   NXR here — app engine (bilingual: id / en)
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const messagesEl = $('#messages');
  const inputEl = $('#msgInput');
  const headName = $('#headName');
  const headTopic = $('#headTopic');
  const typingEl = $('#typing');
  const typingText = $('#typingText');

  /* ---------- language ---------- */
  const saved = localStorage.getItem('nxr-lang');
  let LANG = (saved === 'id' || saved === 'en') ? saved : 'id';
  let PACK = PACKS[LANG];

  window.setLang = function (lang) {
    LANG = lang;
    PACK = PACKS[lang];
    localStorage.setItem('nxr-lang', lang);
    document.documentElement.lang = lang;
    // refresh static UI strings
    $('#memberActAnasta').textContent = PACK.ui.actAnasta;
    $('#memberActArc').textContent = PACK.ui.actArc;
    $('#offlineMsg').textContent = PACK.ui.offlineMsg;
    $('#popNote').textContent = PACK.ui.popNote;
    showChannel(currentChan, true);
  };

  let currentChan = 'about-me';
  let msgIndex = 0;

  /* ---------- helpers ---------- */
  function scrollBottom(smooth) {
    requestAnimationFrame(() => {
      messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
    });
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function nowTime() {
    return new Date().toTimeString().slice(0, 5).replace(':', '.');
  }

  /* ---------- renderers ---------- */
  function renderReacts(m, reacts) {
    const wrap = el('div', 'm-reacts');
    reacts.forEach(r => {
      const b = el('button', 'react', `${r.e} <b>${r.n}</b>`);
      b.addEventListener('click', () => {
        const mine = b.classList.toggle('mine');
        const count = b.querySelector('b');
        count.textContent = +count.textContent + (mine ? 1 : -1);
        b.style.transform = 'scale(1.25)';
        setTimeout(() => (b.style.transform = ''), 150);
      });
      wrap.appendChild(b);
    });
    m.appendChild(wrap);
  }

  function renderEmbed(m, em) {
    const e = el('div', 'm-embed');
    e.style.borderLeftColor = em.color || '#5865f2';
    if (em.kicker) e.appendChild(el('div', 'embed-kicker', em.kicker));
    if (em.title) e.appendChild(el('div', 'embed-title', em.title));
    if (em.desc) e.appendChild(el('div', 'embed-desc', em.desc));
    if (em.fields) {
      const f = el('div', 'embed-fields');
      em.fields.forEach(fd => {
        f.appendChild(el('div', null, `<div class="ef-label">${fd.l}</div><div class="ef-value">${fd.v}</div>`));
      });
      e.appendChild(f);
    }
    m.appendChild(e);
  }

  function renderProjects(m, projects) {
    const grid = el('div', 'proj-grid');
    projects.forEach((p, i) => {
      const card = el('article', 'proj-card');
      card.style.setProperty('--pc', p.color);
      card.style.animationDelay = (i * 60) + 'ms';
      card.innerHTML = `
        <div class="pc-top">
          <span class="pc-ico">${p.icon}</span>
          <span class="pc-name"><a href="${p.url}" target="_blank" rel="noopener">${p.name}</a></span>
          ${p.stars ? `<span class="pc-star">★ ${p.stars}</span>` : ''}
        </div>
        <p class="pc-desc">${p.desc}</p>
        <div class="pc-foot">
          <span class="pc-lang"><i style="--lc:${p.lc}"></i>${p.lang}</span>
          ${p.chips.map(c => `<span class="pc-chip">${c}</span>`).join('')}
        </div>`;
      card.addEventListener('mousemove', ev => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((ev.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((ev.clientY - r.top) / r.height * 100) + '%');
      });
      grid.appendChild(card);
    });
    m.appendChild(grid);
  }

  function renderSkills(m, skills) {
    const wrap = el('div', 'skill-row');
    skills.forEach((s, i) => {
      const row = el('div', 'skill', `
        <div class="skill-top"><b>${s.name}</b><span>${s.pct}%</span></div>
        <div class="skill-bar"><div class="skill-fill" style="--sc:${s.color}"></div></div>`);
      wrap.appendChild(row);
      setTimeout(() => {
        row.querySelector('.skill-fill').style.width = s.pct + '%';
      }, 150 + i * 120);
    });
    m.appendChild(wrap);
  }

  function renderContacts(m, contacts) {
    const grid = el('div', 'contact-grid');
    contacts.forEach((c, i) => {
      const a = el('a', 'c-card');
      a.href = c.url;
      if (!c.url.startsWith('mailto')) { a.target = '_blank'; a.rel = 'noopener'; }
      a.style.setProperty('--cc', c.color);
      a.style.animationDelay = (i * 70) + 'ms';
      a.innerHTML = `
        <span class="c-ico">${c.icon}</span>
        <span><span class="c-label">${c.label}</span><span class="c-value">${c.value}</span></span>`;
      grid.appendChild(a);
    });
    m.appendChild(grid);
  }

  /* ---------- terminal ---------- */
  function renderTerminal(m) {
    const term = el('div', 'term');
    term.innerHTML = `
      <div class="term-bar">
        <span class="tb-dots"><i style="background:#f23f43"></i><i style="background:#f0b232"></i><i style="background:#23a55a"></i></span>
        <span>nxr@nxr-labs: ~/portfolio — zsh</span>
      </div>
      <div class="term-body"></div>
      <div class="term-input-row">
        <span class="t-prompt">➜</span><span style="color:#00a8fc">~</span>
        <input spellcheck="false" aria-label="terminal input">
      </div>`;
    const body = term.querySelector('.term-body');
    const tInput = term.querySelector('input');

    function line(type, text, url) {
      const l = el('div', 't-line');
      if (type === 'cmd') l.innerHTML = `<span class="t-prompt">➜</span> <span style="color:#00a8fc">~</span> <span class="t-cmd">${text}</span>`;
      else if (type === 'link') l.innerHTML = `<span class="t-link" data-url="${url}">${text}</span>`;
      else l.innerHTML = `<span class="t-${type}">${text}</span>`;
      body.appendChild(l);
      body.scrollTop = body.scrollHeight;
    }

    body.addEventListener('click', ev => {
      const link = ev.target.closest('.t-link');
      if (link) window.open(link.dataset.url, '_blank', 'noopener');
    });

    const boot = [
      ['dim', 'NXR LABS shell v2.6 — type `help` for commands'],
      ['dim', '────────────────────────────────────────────']
    ];
    boot.forEach((b, i) => setTimeout(() => line(b[0], b[1]), 200 + i * 180));

    function run(raw) {
      const cmd = raw.trim().toLowerCase();
      line('cmd', raw);
      if (!cmd) return;
      if (cmd === 'clear') { body.innerHTML = ''; return; }
      const fn = PACK.termCmds[cmd];
      if (fn) {
        fn().forEach((l, i) => setTimeout(() => line(l[0], l[1], l[2]), 90 + i * 70));
      } else {
        setTimeout(() => line('err', `zsh: command not found: ${cmd} — ${PACK.termTry} \`help\``), 120);
      }
    }

    tInput.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') {
        const v = tInput.value;
        tInput.value = '';
        run(v);
      }
    });
    term.addEventListener('click', ev => {
      if (!ev.target.closest('a,.t-link')) tInput.focus();
    });

    m.appendChild(term);
    m.appendChild(el('div', 'term-hint', PACK.termPsst));
  }

  /* ---------- message builder ---------- */
  function buildMessage(msg) {
    const isCompact = msg.compact;
    const wrap = el('div', 'msg' + (isCompact ? ' compact' : ''));
    wrap.style.animationDelay = Math.min(msgIndex * 70, 500) + 'ms';
    msgIndex++;

    if (isCompact) {
      wrap.appendChild(el('span', 'm-time-hover', msg.time));
      const body = el('div', 'm-body');
      if (msg.html) body.appendChild(el('div', 'm-text', msg.html));
      wrap.appendChild(body);
      return wrap;
    }

    const ava = msg.avatar
      ? el('img', 'm-avatar')
      : el('div', 'm-avatar');
    if (msg.avatar) {
      ava.src = msg.avatar;
      ava.alt = msg.author;
      ava.addEventListener('click', () => openProfile());
    } else {
      ava.style.cssText = `background:${msg.color || '#5865f2'};display:grid;place-items:center;font-size:20px;`;
      ava.textContent = msg.icon || '🤖';
    }
    wrap.appendChild(ava);

    const body = el('div', 'm-body');
    const head = el('div', 'm-head');
    head.appendChild(el('span', 'm-author', msg.author));
    head.lastChild.style.color = msg.color || '#f2f3f5';
    if (msg.badge) head.appendChild(el('span', 'm-badge', msg.badge));
    head.appendChild(el('span', 'm-time', msg.time.includes('/') ? msg.time : PACK.todayAt + msg.time));
    body.appendChild(head);

    if (msg.html) body.appendChild(el('div', 'm-text', msg.html));
    if (msg.embed) renderEmbed(body, msg.embed);
    if (msg.projects) renderProjects(body, msg.projects);
    if (msg.skills) renderSkills(body, msg.skills);
    if (msg.contacts) renderContacts(body, msg.contacts);
    if (msg.terminal) renderTerminal(body);
    if (msg.reacts) renderReacts(body, msg.reacts);

    wrap.appendChild(body);
    return wrap;
  }

  /* ---------- channel switching ---------- */
  function showChannel(id, push) {
    const chan = PACK.channels[id] ? id : 'about-me';
    currentChan = chan;
    msgIndex = 0;

    $$('.chan[data-chan]').forEach(c => c.classList.toggle('active', c.dataset.chan === chan));
    headName.textContent = chan;
    headTopic.textContent = PACK.channels[chan].topic;
    inputEl.placeholder = 'Message #' + chan;

    messagesEl.innerHTML = '';
    PACK.channels[chan].messages.forEach(m => messagesEl.appendChild(buildMessage(m)));
    scrollBottom(false);

    if (push && history.replaceState) history.replaceState(null, '', '#' + chan);
    closeSidebar();
  }

  $$('.chan[data-chan]').forEach(c => {
    c.addEventListener('click', ev => {
      ev.preventDefault();
      showChannel(c.dataset.chan, true);
    });
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id && PACK.channels[id] && id !== currentChan) showChannel(id, false);
  });

  /* ---------- composer + bot ---------- */
  function botReply(userText) {
    const lower = userText.toLowerCase().replace(/[?!.,]/g, '').trim();

    let reply = null;
    for (const key of Object.keys(PACK.botEaster)) {
      if (lower === key || lower.startsWith(key + ' ')) { reply = PACK.botEaster[key]; break; }
    }
    if (!reply) reply = PACK.botReplies[Math.floor(Math.random() * PACK.botReplies.length)];

    typingText.textContent = 'NXR Bot is typing...';
    typingEl.classList.add('show');

    setTimeout(() => {
      typingEl.classList.remove('show');
      const m = buildMessage({
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: nowTime(),
        html: reply
      });
      m.style.animationDelay = '0ms';
      messagesEl.appendChild(m);
      scrollBottom(true);
    }, 900 + Math.random() * 900);
  }

  inputEl.addEventListener('keydown', ev => {
    if (ev.key !== 'Enter') return;
    const v = inputEl.value.trim();
    if (!v) return;
    inputEl.value = '';

    const m = buildMessage({
      author: LANG === 'id' ? 'kamu' : 'you',
      color: '#00a8fc', avatar: null, icon: '🫵',
      time: nowTime(),
      html: v.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    });
    m.style.animationDelay = '0ms';
    messagesEl.appendChild(m);
    scrollBottom(true);
    botReply(v);
  });

  /* ---------- profile popout ---------- */
  const modal = $('#profileModal');
  function openProfile() { modal.classList.add('open'); }
  function closeProfile() { modal.classList.remove('open'); }
  $('#openProfile').addEventListener('click', openProfile);
  $('#memberNxr').addEventListener('click', openProfile);
  $('#closeProfile').addEventListener('click', closeProfile);
  modal.addEventListener('click', ev => { if (ev.target === modal) closeProfile(); });
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') closeProfile(); });

  /* ---------- member list toggle ---------- */
  const membersEl = $('#members');
  const toggleBtn = $('#toggleMembers');
  toggleBtn.setAttribute('aria-pressed', 'true');
  toggleBtn.addEventListener('click', () => {
    const hidden = membersEl.style.display === 'none';
    membersEl.style.display = hidden ? '' : 'none';
    toggleBtn.setAttribute('aria-pressed', String(hidden));
  });

  /* ---------- mobile sidebar ---------- */
  const sidebar = $('#sidebar');
  const backdrop = $('#sbBackdrop');
  function closeSidebar() { sidebar.classList.remove('open'); backdrop.classList.remove('show'); }
  $('#hamburger').addEventListener('click', () => {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
  });
  backdrop.addEventListener('click', closeSidebar);

  /* ---------- rotating status ---------- */
  const STATUSES = [
    ['🎮 Playing AnastaChronicle', '🎮 Playing AnastaChronicle'],
    ['🔮 Deploying on Ritual', '🔮 Deploying on Ritual'],
    ['⚡ Building on Monad', '⚡ Building on Monad'],
    ['🕹️ Grinding Arc testnet', '🕹️ Grinding Arc testnet'],
    ['🧪 Cooking new agent', '🧪 Cooking new agent'],
    ['🌴 Touching grass in Bali', '🌴 Touching grass in Bali']
  ];
  let si = 0;
  const ubStatus = $('#userbarStatus');
  const mAct = $('#memberActivity');
  setInterval(() => {
    si = (si + 1) % STATUSES.length;
    ubStatus.textContent = STATUSES[si][0];
    mAct.textContent = STATUSES[si][1];
  }, 4000);

  /* ---------- window bar easter eggs ---------- */
  $$('.wbtn').forEach(b => {
    b.addEventListener('click', () => {
      const app = $('.app');
      if (b.classList.contains('wbtn-x')) {
        app.style.transition = 'transform .4s, opacity .4s';
        app.style.transform = 'scale(.96)';
        app.style.opacity = '.4';
        setTimeout(() => { app.style.transform = ''; app.style.opacity = ''; }, 500);
      } else if (b.textContent.trim() === '─') {
        app.style.transition = 'transform .3s';
        app.style.transform = 'translateY(12px)';
        setTimeout(() => (app.style.transform = ''), 350);
      } else {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    });
  });

  /* ---------- init ---------- */
  document.documentElement.lang = LANG;
  $('#memberActAnasta').textContent = PACK.ui.actAnasta;
  $('#memberActArc').textContent = PACK.ui.actArc;
  $('#offlineMsg').textContent = PACK.ui.offlineMsg;
  $('#popNote').textContent = PACK.ui.popNote;

  const initial = location.hash.slice(1);
  showChannel(PACK.channels[initial] ? initial : 'about-me', true);
})();
