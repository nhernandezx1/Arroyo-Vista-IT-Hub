/* ============================================================
   Arroyo Vista IT Central Hub — application logic
   ============================================================ */
(function () {
  'use strict';

  let DATA = loadData();
  const screenEl = document.getElementById('screen');
  const isAdminWanted = new URLSearchParams(location.search).get('admin') === 'true';
  let adminMode = false;

  /* =========================================================
     THEME
     ========================================================= */
  const THEMES = ['green', 'amber', 'azure'];
  function applyTheme(t) {
    if (t === 'green') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('av_it_theme', t);
  }
  applyTheme(localStorage.getItem('av_it_theme') || 'green');
  document.getElementById('theme-btn').addEventListener('click', () => {
    const cur = localStorage.getItem('av_it_theme') || 'green';
    const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
    applyTheme(next);
  });

  /* =========================================================
     RENDERING
     ========================================================= */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function renderHero() {
    document.getElementById('hero-headline').textContent = DATA.hero.headline;
    document.getElementById('hero-subhead').textContent = DATA.hero.subhead;
  }

  function renderStats() {
    document.getElementById('stats-bar').innerHTML = DATA.stats.map((s, i) => `
      <button class="glass glass-hover" data-jump="${esc(s.jump || 'roadmap')}" style="padding:20px; text-align:left; cursor:pointer; font-family:inherit; color:inherit;">
        <i class="fa-solid ${esc(s.icon)}" style="color:var(--accent); font-size:18px;"></i>
        <div class="font-display" style="font-size:34px; font-weight:700; margin-top:12px; line-height:1;">${esc(s.value)}</div>
        <div style="color:var(--muted); font-size:13px; margin-top:6px; letter-spacing:.02em;">${esc(s.label)}</div>
      </button>`).join('');
  }

  function renderArticles() {
    document.getElementById('articles-grid').innerHTML = DATA.articles.map(a => `
      <button class="glass glass-hover article-card" data-id="${esc(a.id)}" style="padding:22px; text-align:left; cursor:pointer; font-family:inherit; color:inherit; display:flex; flex-direction:column; gap:14px; min-height:200px;">
        <span class="pill pill-cat" style="align-self:flex-start;">${esc(a.category)}</span>
        <h3 class="font-display" style="font-size:19px; font-weight:600; line-height:1.25; margin:0; flex:1;">${esc(a.title)}</h3>
        <div style="display:flex; align-items:center; gap:10px; color:var(--faint); font-size:12px;" class="mono">
          <span>${esc(a.date)}</span><span>·</span><span>${esc(a.readTime)}</span>
        </div>
      </button>`).join('');
  }

  function renderLinks() {
    document.getElementById('links-grid').innerHTML = DATA.links.map(l => `
      <a class="glass glass-hover" href="${esc(l.url)}" target="_blank" rel="noopener" style="padding:16px 18px; display:flex; align-items:center; gap:14px; text-decoration:none;">
        <span style="width:40px; height:40px; border-radius:10px; display:grid; place-items:center; background:rgba(var(--accent-rgb),0.1); color:var(--accent); flex-shrink:0;"><i class="fa-solid ${esc(l.icon)}"></i></span>
        <span style="flex:1; min-width:0;">
          <span style="display:block; font-weight:600; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(l.name)}</span>
          <span class="mono" style="display:block; color:var(--faint); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(l.url.replace(/^https?:\/\//, ''))}</span>
        </span>
        <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--muted); font-size:12px;"></i>
      </a>`).join('');
  }

  function renderTeam() {
    document.getElementById('team-grid').innerHTML = DATA.team.map(t => `
      <button class="glass glass-hover team-card tt" data-id="${esc(t.id)}" style="padding:22px; text-align:center; cursor:pointer; font-family:inherit; color:inherit;">
        <div class="tt-pop">
          <div style="color:var(--accent); font-weight:600;">${esc(t.email)}</div>
          <div style="color:var(--muted); margin-top:2px;">Ext. ${esc(t.ext)}</div>
        </div>
        <div style="width:66px; height:66px; border-radius:50%; margin:0 auto; display:grid; place-items:center; background:linear-gradient(140deg, rgba(var(--accent-rgb),0.25), rgba(var(--accent-rgb),0.05)); border:1px solid rgba(var(--accent-rgb),0.3); color:var(--accent); font-weight:700; font-size:22px;" class="font-display">${esc(t.initials)}</div>
        <div style="font-weight:600; font-size:15.5px; margin-top:14px;">${esc(t.name)}</div>
        <div style="color:var(--accent); font-size:12.5px; margin-top:3px;">${esc(t.role)}</div>
        <div style="color:var(--faint); font-size:11.5px; margin-top:8px;" class="mono">${esc(t.ext)}</div>
      </button>`).join('');
  }

  function renderFaqs() {
    document.getElementById('faq-list').innerHTML = DATA.faqs.map((f, i) => `
      <div class="faq-item" data-i="${i}">
        <button class="faq-q"><span>${esc(f.q)}</span><i class="fa-solid fa-chevron-down"></i></button>
        <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
      </div>`).join('');
  }

  function renderNextgen() {
    const list = document.getElementById('nextgen-list');
    if (list) {
      list.innerHTML = (DATA.nextgenFaqs || []).map((f, i) => `
        <div class="faq-item" data-i="${i}">
          <button class="faq-q"><span>${esc(f.q)}</span><i class="fa-solid fa-chevron-down"></i></button>
          <div class="faq-a"><div class="faq-a-inner">${esc(f.a)}</div></div>
        </div>`).join('');
    }
    const kb = document.getElementById('nextgen-kb-link');
    if (kb) kb.href = DATA.nextgenKbUrl || '#';
  }

  function renderAll() {
    renderHero(); renderStats(); renderArticles(); renderLinks(); renderTeam(); renderFaqs(); renderNextgen();
  }

  /* =========================================================
     ROADMAP
     ========================================================= */
  let activeStage = 0, autoTimer = null;

  function renderStageTrack() {
    document.getElementById('stage-track').innerHTML = ROADMAP.map((s, i) => `
      <div class="stage-node ${i === activeStage ? 'active' : (i < activeStage ? 'done' : '')}" data-stage="${i}">
        <div class="stage-line"></div>
        <div class="stage-dot">${i < activeStage ? '<i class="fa-solid fa-check"></i>' : (i + 1)}</div>
        <div class="stage-label">${esc(s.title)}</div>
      </div>`).join('');
  }

  function showStage(i, animate = true) {
    activeStage = (i + ROADMAP.length) % ROADMAP.length;
    const s = ROADMAP[activeStage];
    renderStageTrack();
    const num = String(activeStage + 1).padStart(2, '0');
    document.getElementById('stage-bignum').textContent = num;
    document.getElementById('stage-tag').textContent = 'Stage ' + num + ' / 06';
    document.getElementById('stage-title').textContent = s.title;
    document.getElementById('stage-desc').textContent = s.desc;
    document.getElementById('stage-meta').innerHTML = s.meta.map(m =>
      `<span class="pill" style="background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--muted);"><i class="fa-solid fa-circle" style="font-size:5px; color:var(--accent);"></i> ${esc(m)}</span>`).join('');
    if (animate && window.gsap) {
      gsap.fromTo('#stage-panel', { opacity: 0.4, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      gsap.fromTo('#stage-bignum', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' });
    }
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    document.getElementById('auto-icon').className = 'fa-solid fa-play';
    document.getElementById('auto-label').textContent = 'Auto Cycle';
  }
  document.getElementById('stage-prev').addEventListener('click', () => { stopAuto(); showStage(activeStage - 1); });
  document.getElementById('stage-next').addEventListener('click', () => { stopAuto(); showStage(activeStage + 1); });
  document.getElementById('stage-auto').addEventListener('click', () => {
    if (autoTimer) { stopAuto(); return; }
    document.getElementById('auto-icon').className = 'fa-solid fa-pause';
    document.getElementById('auto-label').textContent = 'Stop';
    autoTimer = setInterval(() => showStage(activeStage + 1), 2200);
  });
  document.getElementById('stage-track').addEventListener('click', (e) => {
    const node = e.target.closest('.stage-node');
    if (node) { stopAuto(); showStage(+node.dataset.stage); }
  });

  /* =========================================================
     3D NETWORK JUMP TRANSITION (Three.js)
     ========================================================= */
  const jumpOverlay = document.getElementById('jump-overlay');
  let three = null;
  function buildThree() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    jumpOverlay.insertBefore(renderer.domElement, jumpOverlay.firstChild);

    const COUNT = 66, SPREAD = 60, DEPTH = 220;
    const pts = [];
    for (let i = 0; i < COUNT; i++) {
      pts.push(new THREE.Vector3((Math.random() - 0.5) * SPREAD, (Math.random() - 0.5) * SPREAD, -Math.random() * DEPTH));
    }
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const nodeMat = new THREE.PointsMaterial({ color: 0x22c55e, size: 1.5, transparent: true, opacity: 0.95 });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodes);

    const linePos = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < 26) {
          linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.22 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    three = { scene, camera, renderer, nodes, lines, raf: null };
    resizeThree();
  }
  function resizeThree() {
    if (!three) return;
    const w = jumpOverlay.clientWidth, h = jumpOverlay.clientHeight;
    three.renderer.setSize(w, h);
    three.camera.aspect = w / h; three.camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', () => { resizeThree(); resizeJumpAware(); });

  let jumping = false;
  function jumpTo(sectionId) {
    if (jumping) return;
    const target = document.getElementById(sectionId);
    if (!target) return;
    jumping = true;
    if (!three) buildThree(); else resizeThree();
    jumpOverlay.style.display = 'block';
    gsap.set(jumpOverlay, { opacity: 1 });
    gsap.fromTo('#jump-msg', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });

    const cam = three.camera;
    cam.position.set(0, 0, 30);
    const start = performance.now(), DUR = 1350;
    function loop(now) {
      const t = Math.min((now - start) / DUR, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      cam.position.z = 30 - ease * 240;
      three.nodes.rotation.z += 0.0016;
      three.lines.rotation.z = three.nodes.rotation.z;
      three.renderer.render(three.scene, cam);
      if (t < 1) { three.raf = requestAnimationFrame(loop); }
      else {
        // arrive: scroll target into view, fade overlay
        const navH = 72;
        screenEl.scrollTo({ top: Math.max(0, target.offsetTop - navH), behavior: 'auto' });
        gsap.to(jumpOverlay, {
          opacity: 0, duration: 0.5, ease: 'power2.in',
          onComplete: () => { jumpOverlay.style.display = 'none'; jumping = false; flashBezel(0.25); }
        });
      }
    }
    three.raf = requestAnimationFrame(loop);
  }
  function resizeJumpAware() { /* placeholder kept for resize hook */ }

  // Wire all [data-jump]
  document.addEventListener('click', (e) => {
    const j = e.target.closest('[data-jump]');
    if (j) { e.preventDefault(); jumpTo(j.dataset.jump); }
  });

  /* =========================================================
     BEZEL FLASH
     ========================================================= */
  function flashBezel(max = 0.7) {
    const f = document.getElementById('bezel-flash');
    gsap.fromTo(f, { opacity: max }, { opacity: 0, duration: 0.7, ease: 'power2.out' });
  }

  /* =========================================================
     BOOT SEQUENCE
     ========================================================= */
  function boot() {
    const bootScreen = document.getElementById('boot-screen');
    const out = document.getElementById('boot-text');
    const modWrap = document.getElementById('boot-modules');
    const bar = document.getElementById('boot-progress-bar');
    const pctEl = document.getElementById('boot-pct');
    const labelEl = document.getElementById('boot-stage-label');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const MODS = ['NET', 'AUTH', 'TICKET', 'NEXTGEN', 'TELEMETRY', '3D'];
    modWrap.innerHTML = MODS.map((m, i) =>
      `<span class="boot-mod" data-m="${i}"><span>${m}</span><span class="bm-stat"><span class="bm-spin">/</span></span></span>`).join('');
    const modEls = [...modWrap.children];

    const lines = [
      'AV IT TERMINAL v4.8.2',
      'Copyright (C) 2026 Arroyo Vista Family Health Center',
      '',
      'POST complete · memory OK · 5 sites linked',
      'Mounting secure kernel …',
      'Verifying certificates …',
      'Establishing encrypted session …'
    ];
    const full = lines.join('\n');
    out.innerHTML = '<span id="boot-acc"></span><span id="boot-cursor"></span>';
    const acc = document.getElementById('boot-acc');

    function setProg(p, label) {
      const v = Math.min(100, Math.max(0, p));
      bar.style.width = v + '%';
      pctEl.textContent = Math.round(v) + '%';
      if (label) labelEl.textContent = label;
    }
    function markOk(el) {
      el.classList.remove('loading'); el.classList.add('ok');
      el.querySelector('.bm-stat').innerHTML = 'OK';
    }

    if (window.gsap && !reduce) {
      gsap.from('#boot-logo', { opacity: 0, y: 14, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo(modEls, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.25, ease: 'power2.out' });
    } else {
      modEls.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    }

    function finish() {
      if (!window.gsap) { bootScreen.style.display = 'none'; flashBezel(0.55); return; }
      const stage = document.getElementById('boot-stage');
      gsap.timeline({ onComplete: () => { bootScreen.style.display = 'none'; flashBezel(0.6); } })
        .to(stage, { opacity: 0, scale: 0.97, duration: 0.28, ease: 'power2.in' })
        .set(bootScreen, { transformOrigin: '50% 50%', background: '#dffbe9', boxShadow: '0 0 80px 12px rgba(34,197,94,.55)' })
        .to(bootScreen, { scaleY: 0.005, duration: 0.32, ease: 'power3.in' })
        .to(bootScreen, { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, '>-0.05');
    }

    if (reduce) {
      acc.textContent = full;
      modEls.forEach(markOk);
      setProg(100, 'SYSTEM READY');
      setTimeout(finish, 550);
      return;
    }

    let m = 0;
    function checkModules() {
      if (m < modEls.length) {
        const el = modEls[m];
        el.classList.add('loading');
        setTimeout(() => {
          markOk(el);
          setProg(52 + ((m + 1) / modEls.length) * 48, 'LINKING MODULES');
          if (window.gsap) gsap.fromTo(el, { scale: 0.88 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
          m++;
          setTimeout(checkModules, 200);
        }, 240);
      } else {
        setProg(100, 'SYSTEM READY');
        setTimeout(finish, 540);
      }
    }

    let i = 0;
    const speed = 11;
    setProg(6, 'COLD START');
    function type() {
      if (i <= full.length) {
        acc.textContent = full.slice(0, i);
        setProg(6 + (i / full.length) * 44, 'BOOTING');
        const ch = full[i - 1];
        i++;
        setTimeout(type, ch === '\n' ? 78 : (speed + Math.random() * 16));
      } else {
        setTimeout(checkModules, 240);
      }
    }
    type();
  }

  /* =========================================================
     MODALS (generic)
     ========================================================= */
  function openModalEl(el) {
    el.classList.add('open');
    const card = el.querySelector('.modal-card');
    if (window.gsap) gsap.fromTo(card, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
  }
  function closeModalEl(el) { el.classList.remove('open'); }
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]')) {
      const root = e.target.closest('.modal-root');
      if (root) closeModalEl(root);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-root.open').forEach(closeModalEl);
      if (document.getElementById('mc').classList.contains('open')) closeMC();
    }
  });

  const modal = document.getElementById('modal');
  const modalCard = document.getElementById('modal-card');
  function showModal(html, maxw = 640) {
    modalCard.style.maxWidth = maxw + 'px';
    modalCard.innerHTML = html;
    openModalEl(modal);
  }

  // Article viewer
  document.getElementById('articles-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.article-card');
    if (!card) return;
    const a = DATA.articles.find(x => x.id === card.dataset.id);
    if (!a) return;
    showModal(`
      <div style="padding:26px 30px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; justify-content:space-between; gap:16px;">
        <div>
          <span class="pill pill-cat">${esc(a.category)}</span>
          <h2 class="font-display" style="font-size:26px; font-weight:600; line-height:1.2; margin:14px 0 12px;">${esc(a.title)}</h2>
          <div class="mono" style="display:flex; gap:12px; color:var(--faint); font-size:12.5px;">
            <span><i class="fa-regular fa-calendar"></i> ${esc(a.date)}</span>
            <span><i class="fa-regular fa-user"></i> ${esc(a.author)}</span>
            <span><i class="fa-regular fa-clock"></i> ${esc(a.readTime)}</span>
          </div>
        </div>
        <div class="x-btn" data-close><i class="fa-solid fa-xmark"></i></div>
      </div>
      <div style="padding:26px 30px; line-height:1.72; color:var(--text); font-size:15px;" class="article-body">${a.body}</div>
      ${adminMode ? `<div style="padding:0 30px 24px;"><button class="btn btn-ghost" id="edit-article-btn"><i class="fa-solid fa-pen"></i> Edit Article</button></div>` : ''}
    `, 660);
    const eb = document.getElementById('edit-article-btn');
    if (eb) eb.addEventListener('click', () => { closeModalEl(modal); openEditor('articles'); });
  });

  // Team profile
  document.getElementById('team-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.team-card');
    if (!card) return;
    const t = DATA.team.find(x => x.id === card.dataset.id);
    if (!t) return;
    showModal(`
      <div style="padding:30px; position:relative;">
        <div class="x-btn" data-close style="position:absolute; top:18px; right:18px;"><i class="fa-solid fa-xmark"></i></div>
        <div style="display:flex; align-items:center; gap:20px;">
          <div style="width:88px; height:88px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(140deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.05)); border:1px solid rgba(var(--accent-rgb),0.35); color:var(--accent); font-weight:700; font-size:30px; flex-shrink:0;" class="font-display">${esc(t.initials)}</div>
          <div>
            <h2 class="font-display" style="font-size:24px; font-weight:600; margin:0;">${esc(t.name)}</h2>
            <div style="color:var(--accent); font-size:15px; margin-top:4px;">${esc(t.role)}</div>
            <div style="color:var(--faint); font-size:12.5px; margin-top:6px;" class="mono">${esc(t.tenure)}</div>
          </div>
        </div>
        <div style="margin-top:24px;">
          <div class="kicker" style="font-size:11px;">About</div>
          <p style="color:var(--muted); line-height:1.7; font-size:15px; margin:12px 0 0;">${esc(t.about)}</p>
        </div>
        <div style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <a class="glass" href="mailto:${esc(t.email)}" style="padding:14px 16px; display:flex; align-items:center; gap:12px; text-decoration:none;">
            <i class="fa-solid fa-envelope" style="color:var(--accent);"></i>
            <span style="min-width:0;"><span style="display:block; font-size:11px; color:var(--faint);">EMAIL</span><span style="display:block; font-size:13.5px; font-weight:600; overflow:hidden; text-overflow:ellipsis;">${esc(t.email)}</span></span>
          </a>
          <div class="glass" style="padding:14px 16px; display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-phone" style="color:var(--accent);"></i>
            <span><span style="display:block; font-size:11px; color:var(--faint);">EXTENSION</span><span style="display:block; font-size:13.5px; font-weight:600;">${esc(t.ext)}</span></span>
          </div>
        </div>
      </div>
    `, 560);
  });

  // Contact IT
  function showContact() {
    showModal(`
      <div style="padding:30px; position:relative;">
        <div class="x-btn" data-close style="position:absolute; top:18px; right:18px;"><i class="fa-solid fa-xmark"></i></div>
        <div class="kicker">Support</div>
        <h2 class="font-display" style="font-size:24px; font-weight:600; margin:14px 0 8px;">Contact IT</h2>
        <p style="color:var(--muted); font-size:14.5px; line-height:1.6; margin:0 0 22px;">Reach the Help Desk during business hours, Mon–Fri 8:00am–5:00pm. For urgent patient-care system outages, call and stay on the line.</p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <button class="glass glass-hover" id="contact-ticket-btn" style="width:100%; text-align:left; padding:16px; display:flex; align-items:center; gap:14px; cursor:pointer; font-family:inherit; color:inherit; border:1px solid rgba(var(--accent-rgb),0.35); background:rgba(var(--accent-rgb),0.06);"><i class="fa-solid fa-ticket" style="color:var(--accent); font-size:18px;"></i><span><span style="display:block; font-weight:600;">Submit a Ticket</span><span style="display:block; color:var(--faint); font-size:12.5px;" class="mono">Guided form · routes to itstaff@arroyovista.org</span></span></button>
          <a class="glass glass-hover" href="tel:+13239872033" style="padding:16px; display:flex; align-items:center; gap:14px; text-decoration:none;"><i class="fa-solid fa-phone" style="color:var(--accent); font-size:18px;"></i><span><span style="display:block; font-weight:600;">Help Desk · Ext. 2033</span><span style="display:block; color:var(--faint); font-size:12.5px;" class="mono">Fastest for urgent issues</span></span></a>
          <a class="glass glass-hover" href="mailto:itstaff@arroyovista.org" style="padding:16px; display:flex; align-items:center; gap:14px; text-decoration:none;"><i class="fa-solid fa-envelope" style="color:var(--accent); font-size:18px;"></i><span><span style="display:block; font-weight:600;">itstaff@arroyovista.org</span><span style="display:block; color:var(--faint); font-size:12.5px;" class="mono">Email us directly</span></span></a>
        </div>
      </div>
    `, 520);
    const ctb = document.getElementById('contact-ticket-btn');
    if (ctb) ctb.addEventListener('click', () => { closeModalEl(modal); showTicket(); });
  }
  document.getElementById('contact-btn').addEventListener('click', showContact);
  document.getElementById('contact-btn2').addEventListener('click', showContact);

  /* =========================================================
     SUBMIT A TICKET
     ========================================================= */
  function showTicketSent(to, href) {
    showModal(`
      <div style="padding:36px 30px; text-align:center;">
        <div style="width:64px; height:64px; border-radius:50%; margin:0 auto 18px; display:grid; place-items:center; background:rgba(var(--accent-rgb),0.12); border:1px solid rgba(var(--accent-rgb),0.4); color:var(--accent); font-size:26px;"><i class="fa-solid fa-paper-plane"></i></div>
        <h2 class="font-display" style="font-size:23px; font-weight:600; margin:0 0 10px;">Opening your email…</h2>
        <p style="color:var(--muted); font-size:14.5px; line-height:1.6; margin:0 auto 24px; max-width:46ch;">Your email app should open with the ticket pre-filled and addressed to <span class="mono" style="color:var(--accent);">${esc(to)}</span>. Review the details and hit send. If nothing opened, use the button below.</p>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
          <a class="btn btn-accent" href="${esc(href)}" style="padding:11px 20px;"><i class="fa-solid fa-envelope"></i> Open Email Again</a>
          <button class="btn btn-ghost" data-close style="padding:11px 20px;">Done</button>
        </div>
      </div>
    `, 520);
  }

  function showTicket() {
    const cats = DATA.ticketCategories || ['Other'];
    const to = DATA.ticketEmail || 'itstaff@arroyovista.org';
    showModal(`
      <div style="padding:26px 30px; border-bottom:1px solid var(--border); display:flex; align-items:flex-start; justify-content:space-between; gap:16px;">
        <div>
          <div class="kicker">Support Request</div>
          <h2 class="font-display" style="font-size:24px; font-weight:600; margin:12px 0 6px;">Submit a Ticket</h2>
          <p style="color:var(--muted); font-size:13.5px; line-height:1.55; margin:0; max-width:54ch;">Tell us what's going on and we'll route it to <span class="mono" style="color:var(--accent);">${esc(to)}</span>. Fields marked <span style="color:var(--danger);">*</span> are required.</p>
        </div>
        <div class="x-btn" data-close><i class="fa-solid fa-xmark"></i></div>
      </div>
      <form id="ticket-form" style="padding:24px 30px; display:flex; flex-direction:column; gap:16px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div class="field"><label for="tk-name">Your Name</label><input class="input" id="tk-name" placeholder="Jane Doe" autocomplete="name" /></div>
          <div class="field"><label for="tk-email">Your Email <span style="color:var(--danger);">*</span></label><input class="input" id="tk-email" type="email" placeholder="you@arroyovista.org" autocomplete="email" /></div>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div class="field"><label for="tk-cat">Category <span style="color:var(--danger);">*</span></label>
            <select class="select" id="tk-cat">${cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select></div>
          <div class="field"><label for="tk-site">Site / Location</label><input class="input" id="tk-site" placeholder="e.g. Figueroa St · Room 4" /></div>
        </div>
        <div class="field"><label for="tk-subject">Subject <span style="color:var(--danger);">*</span></label><input class="input" id="tk-subject" placeholder="Short summary of the issue" /></div>
        <div class="field"><label for="tk-problem">Describe the problem <span style="color:var(--danger);">*</span></label><textarea class="textarea" id="tk-problem" style="min-height:120px;" placeholder="What's happening? What have you already tried? Any error messages or codes?"></textarea></div>
        <div id="tk-error" style="display:none; color:var(--danger); font-size:13px; background:rgba(244,97,90,0.08); border:1px solid rgba(244,97,90,0.3); border-radius:8px; padding:9px 12px;"></div>
        <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
          <button type="submit" class="btn btn-accent" style="padding:12px 22px;"><i class="fa-solid fa-paper-plane"></i> Send to IT</button>
          <span style="color:var(--faint); font-size:12px;" class="mono">Opens your email app · routes to ${esc(to)}</span>
        </div>
      </form>
    `, 640);

    const form = document.getElementById('ticket-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = id => (document.getElementById(id).value || '').trim();
      const name = val('tk-name'), email = val('tk-email'), cat = document.getElementById('tk-cat').value,
            site = val('tk-site'), subject = val('tk-subject'), problem = val('tk-problem');
      const errEl = document.getElementById('tk-error');
      if (!email || !subject || !problem) {
        errEl.textContent = 'Please add your email, a subject, and a description of the problem.';
        errEl.style.display = 'block';
        return;
      }
      const mailSubject = `[${cat}] ${subject}`;
      const body = [
        `Name: ${name || '—'}`,
        `Email: ${email}`,
        `Category: ${cat}`,
        `Site / Location: ${site || '—'}`,
        '',
        'Problem:',
        problem,
        '',
        '— Submitted via the AV IT Central Hub'
      ].join('\n');
      const href = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      showTicketSent(to, href);
    });
  }

  ['ticket-btn', 'ticket-btn-hero'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', showTicket);
  });
  window.showTicket = showTicket;

  /* =========================================================
     FAQ
     ========================================================= */
  document.querySelectorAll('#faq-list, #nextgen-list').forEach(listEl => {
    listEl.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-q');
      if (!q) return;
      const item = q.closest('.faq-item');
      const ans = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0px';
    });
  });

  /* =========================================================
     MISSION CONTROL
     ========================================================= */
  const mc = document.getElementById('mc');
  const mcLog = document.getElementById('mc-log');
  const mcInput = document.getElementById('mc-input');
  let mcTimers = [];

  function mcPrint(html, cls = '') {
    const line = document.createElement('div');
    line.className = 'logline ' + cls;
    line.innerHTML = html;
    mcLog.appendChild(line);
    if (window.gsap) gsap.from(line, { opacity: 0, y: 6, duration: 0.3 });
    while (mcLog.children.length > 60) mcLog.removeChild(mcLog.firstChild);
    mcLog.scrollTop = mcLog.scrollHeight;
  }
  const now = () => new Date().toLocaleTimeString('en-US', { hour12: false });
  const stamp = () => `<span class="t">[${now()}]</span> `;

  const ACTIVITY = [
    ['NET', 'Heartbeat OK · Figueroa ↔ Broadway tunnel stable', ''],
    ['AUTH', 'Badge auth success · workstation FIG-RECEP-04', ''],
    ['TICKET', 'New ticket #48' + Math.floor(Math.random() * 90 + 10) + ' assigned to queue', ''],
    ['BACKUP', 'Nightly snapshot verified · 0 errors', ''],
    ['NET', 'Latency to NovaPACS 23ms', ''],
    ['WARN', 'Printer FIG-LAB-02 low toner', 'w'],
    ['AUTH', 'VPN session established · mobile clinic', ''],
    ['SCAN', 'Endpoint scan complete · 0 threats', ''],
    ['WARN', 'Failed login retry · locked after 3 attempts', 'w'],
    ['SYNC', 'NextGen template cache refreshed', '']
  ];
  function pushActivity() {
    const a = ACTIVITY[Math.floor(Math.random() * ACTIVITY.length)];
    mcPrint(`${stamp()}<span style="color:#4ade80;">${a[0]}</span> · ${a[1]}`, a[2]);
  }

  function setMeter(barId, valId, val, suffix) {
    document.getElementById(valId).textContent = val + (suffix || '');
    const bar = document.getElementById(barId);
    if (bar) bar.style.width = Math.min(100, val) + '%';
  }
  function tickTelemetry() {
    const tickets = DATA.stats.find(s => /ticket/i.test(s.label));
    const base = tickets ? parseInt(tickets.value) || 37 : 37;
    document.getElementById('tm-tickets').textContent = base + Math.floor(Math.random() * 5 - 2);
    setMeter('tm-load-bar', 'tm-load', Math.floor(28 + Math.random() * 34), '%');
    setMeter('tm-net-bar', 'tm-net', Math.floor(95 + Math.random() * 5), '%');
    document.getElementById('tm-sess').textContent = Math.floor(12 + Math.random() * 9);
  }

  function renderMCNodes() {
    const nodes = [
      ['Figueroa St · Core', 'ok'], ['Broadway · Clinic', 'ok'], ['Valley Blvd · Clinic', 'ok'],
      ['Huntington Dr · Clinic', 'ok'], ['Mobile Unit', 'warn'], ['NextGen Cloud', 'ok'], ['NovaPACS', 'ok']
    ];
    document.getElementById('mc-nodes').innerHTML = nodes.map(n =>
      `<div class="node-row"><i class="fa-solid fa-circle ${n[1]}" style="font-size:7px;"></i> ${n[0]} <span style="margin-left:auto; opacity:.6; font-size:11px;">${n[1] === 'ok' ? 'ONLINE' : 'DEGRADED'}</span></div>`).join('');
  }

  function openMC() {
    mc.classList.add('open');
    if (window.gsap) gsap.fromTo(mc, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    mcLog.innerHTML = '';
    mcPrint(`${stamp()}Secure session established. Type <span style="color:#7dffb0;">help</span> for commands.`);
    renderMCNodes();
    tickTelemetry();
    mcTimers.push(setInterval(tickTelemetry, 2600));
    mcTimers.push(setInterval(pushActivity, 3400));
    mcTimers.push(setInterval(() => { document.getElementById('mc-clock').textContent = now(); }, 1000));
    document.getElementById('mc-clock').textContent = now();
    setTimeout(() => mcInput.focus(), 200);
  }
  function closeMC() {
    mc.classList.remove('open');
    mcTimers.forEach(clearInterval); mcTimers = [];
  }
  document.getElementById('mc-open').addEventListener('click', openMC);
  document.getElementById('mc-close').addEventListener('click', closeMC);

  const COMMANDS = {
    help: () => mcPrint('Commands: <span style="color:#7dffb0;">help status tickets team ping whoami clear exit</span>'),
    status: () => {
      mcPrint(`${stamp()}SYSTEM STATUS`);
      mcPrint('&nbsp;&nbsp;kernel ........ secure / nominal');
      mcPrint('&nbsp;&nbsp;sites ......... 5 connected · 1 degraded (mobile)', 'w');
      mcPrint('&nbsp;&nbsp;ehr ........... NextGen online');
      mcPrint('&nbsp;&nbsp;backups ....... verified ' + now());
    },
    tickets: () => {
      mcPrint(`${stamp()}OPEN QUEUE (top 4)`);
      [['#4821', 'P2', 'NextGen template error · Broadway'],
       ['#4822', 'P3', 'Printer mapping · Valley Blvd'],
       ['#4825', 'P1', 'Phishing report · review', 'e'],
       ['#4826', 'P4', 'New workstation request · Figueroa']].forEach(t =>
        mcPrint(`&nbsp;&nbsp;<span style="color:#7dffb0;">${t[0]}</span> [${t[1]}] ${t[2]}`, t[3] || ''));
    },
    team: () => {
      mcPrint(`${stamp()}PERSONNEL`);
      DATA.team.forEach(t => mcPrint(`&nbsp;&nbsp;${t.name} · ${t.role} · ${t.ext}`));
    },
    ping: (arg) => {
      const host = arg || 'figueroa-core';
      mcPrint(`${stamp()}PING ${host} ...`);
      let n = 0;
      const t = setInterval(() => {
        mcPrint(`&nbsp;&nbsp;reply from ${host}: time=${(18 + Math.random() * 14).toFixed(1)}ms`);
        if (++n >= 3) { clearInterval(t); mcPrint(`&nbsp;&nbsp;3 packets, 0% loss`); }
      }, 360);
    },
    whoami: () => mcPrint('root@av-it-secure · session ' + Math.random().toString(16).slice(2, 10).toUpperCase() + ' · clearance: ELEVATED'),
    clear: () => { mcLog.innerHTML = ''; },
    exit: () => closeMC()
  };
  mcInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const raw = mcInput.value.trim();
    mcInput.value = '';
    if (!raw) return;
    mcPrint(`<span style="color:#4ade80;">root@av-it-secure:~$</span> ${esc(raw)}`);
    const [cmd, ...rest] = raw.split(/\s+/);
    const fn = COMMANDS[cmd.toLowerCase()];
    if (fn) fn(rest.join(' '));
    else mcPrint(`command not found: ${esc(cmd)} — type <span style="color:#7dffb0;">help</span>`, 'e');
  });

  /* =========================================================
     ADMIN SYSTEM
     ========================================================= */
  function enableAdmin() {
    if (adminMode) return;
    adminMode = true;
    document.getElementById('admin-fab').classList.add('show');
    flashBezel(0.3);
  }
  // ?admin=true
  if (isAdminWanted) enableAdmin();
  // Ctrl+A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'a' || e.key === 'A')) { e.preventDefault(); enableAdmin(); }
  });
  // logo: shift-click + rapid triple click
  const logoBtn = document.getElementById('logo-btn');
  let clicks = [], shiftDown = false;
  document.addEventListener('keydown', e => { if (e.key === 'Shift') shiftDown = true; });
  document.addEventListener('keyup', e => { if (e.key === 'Shift') shiftDown = false; });
  logoBtn.addEventListener('click', (e) => {
    if (e.shiftKey) { enableAdmin(); return; }
    const t = Date.now();
    clicks = clicks.filter(x => t - x < 1200); clicks.push(t);
    if (clicks.length >= 3) { enableAdmin(); clicks = []; }
  });

  document.getElementById('open-editor').addEventListener('click', () => openEditor('stats'));

  // ---- editor ----
  const editor = document.getElementById('editor');
  const editorBody = document.getElementById('editor-body');
  let draft = null, curTab = 'stats';

  const ADD_LABELS = { stats: 'Add Stat', articles: 'Add Article', links: 'Add Link', team: 'Add Member', faq: 'Add FAQ' };
  const BLANKS = {
    stats: () => ({ icon: 'fa-star', value: '0', label: 'New Stat', jump: 'roadmap' }),
    articles: () => ({ id: 'a' + Date.now(), category: 'General', title: 'New Article', date: 'Today', author: 'IT', readTime: '2 min', body: '<p>Write the article body here. Basic HTML is supported.</p>' }),
    links: () => ({ name: 'New Link', icon: 'fa-link', url: 'https://' }),
    team: () => ({ id: 't' + Date.now(), initials: 'NN', name: 'New Member', role: 'Role', tenure: 'New', email: 'name@arroyovista.org', ext: 'x0000', about: 'Bio goes here.' }),
    faq: () => ({ q: 'New question?', a: 'Answer goes here.' })
  };

  function field(label, val, f, i, type) {
    const id = `f-${f}-${i}`;
    if (type === 'textarea')
      return `<div class="field"><label for="${id}">${label}</label><textarea class="textarea" id="${id}" data-i="${i}" data-f="${f}">${esc(val)}</textarea></div>`;
    return `<div class="field"><label for="${id}">${label}</label><input class="input" id="${id}" data-i="${i}" data-f="${f}" value="${esc(val)}" /></div>`;
  }
  const delBtn = (i) => `<button class="x-btn row-del" data-del="${i}" title="Delete"><i class="fa-solid fa-trash"></i></button>`;

  function buildEditor(tab) {
    let html = '';
    if (tab === 'stats') {
      html += `<div class="edit-row" style="margin-bottom:14px; border-color:rgba(var(--accent-rgb),0.3);">
        ${field('Hero Headline', draft.hero.headline, 'headline', 'H', 'textarea')}
        ${field('Hero Subhead', draft.hero.subhead, 'subhead', 'H', 'textarea')}
      </div>`;
      html += draft.stats.map((s, i) => `<div class="edit-row item-row" style="grid-template-columns:1fr 1fr 2fr;">${delBtn(i)}
        ${field('Icon (fa-…)', s.icon, 'icon', i)}${field('Value', s.value, 'value', i)}${field('Label', s.label, 'label', i)}</div>`).join('');
    } else if (tab === 'articles') {
      html += draft.articles.map((a, i) => `<div class="edit-row item-row">${delBtn(i)}
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">${field('Category', a.category, 'category', i)}${field('Date', a.date, 'date', i)}${field('Read time', a.readTime, 'readTime', i)}</div>
        ${field('Title', a.title, 'title', i)}${field('Author', a.author, 'author', i)}${field('Body (HTML)', a.body, 'body', i, 'textarea')}</div>`).join('');
    } else if (tab === 'links') {
      html += draft.links.map((l, i) => `<div class="edit-row item-row" style="grid-template-columns:2fr 1fr;">${delBtn(i)}
        <div style="display:grid; grid-template-columns:2fr 1fr; gap:10px;">${field('Name', l.name, 'name', i)}${field('Icon', l.icon, 'icon', i)}</div>
        ${field('URL', l.url, 'url', i)}</div>`).join('');
    } else if (tab === 'team') {
      html += draft.team.map((t, i) => `<div class="edit-row item-row">${delBtn(i)}
        <div style="display:grid; grid-template-columns:80px 1fr 1fr; gap:10px;">${field('Initials', t.initials, 'initials', i)}${field('Name', t.name, 'name', i)}${field('Role', t.role, 'role', i)}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">${field('Tenure', t.tenure, 'tenure', i)}${field('Email', t.email, 'email', i)}${field('Ext', t.ext, 'ext', i)}</div>
        ${field('About', t.about, 'about', i, 'textarea')}</div>`).join('');
    } else if (tab === 'faq') {
      html += draft.faqs.map((f, i) => `<div class="edit-row item-row">${delBtn(i)}
        ${field('Question', f.q, 'q', i)}${field('Answer', f.a, 'a', i, 'textarea')}</div>`).join('');
    }
    editorBody.innerHTML = html;
    document.getElementById('add-label').textContent = ADD_LABELS[tab];
    runTabTransition(tab);
  }

  function runTabTransition(tab) {
    if (!window.gsap) return;
    const rows = editorBody.querySelectorAll('.edit-row');
    if (!rows.length) return;
    // Motion-only entrances (rows stay visible at base opacity) so content is
    // never stuck hidden if animation is throttled / reduced-motion / printed.
    const cfg = {
      stats:    { from: { y: 26, scale: 0.9 },          ease: 'back.out(1.4)',       stagger: 0.06, duration: 0.5 },
      articles: { from: { x: -36, y: 12 },              ease: 'power3.out',          stagger: 0.07, duration: 0.5 },
      links:    { from: { scale: 0.6, rotation: -5 },   ease: 'elastic.out(1,0.6)',  stagger: 0.05, duration: 0.7 },
      team:     { from: { y: 28, rotation: 2.5 },       ease: 'power2.out',          stagger: 0.08, duration: 0.55 },
      faq:      { from: { x: 18 },                       ease: 'steps(5)',            stagger: 0.1,  duration: 0.45 }
    }[tab];
    gsap.fromTo(rows, cfg.from, { x: 0, y: 0, scale: 1, rotation: 0, ease: cfg.ease, stagger: cfg.stagger, duration: cfg.duration, clearProps: 'transform' });
  }

  // tab switching
  document.querySelectorAll('.editor-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      curTab = btn.dataset.tab;
      document.querySelectorAll('.editor-tab').forEach(b => b.classList.toggle('active', b === btn));
      buildEditor(curTab);
    });
  });

  // live binding
  editorBody.addEventListener('input', (e) => {
    const el = e.target;
    const f = el.dataset.f, i = el.dataset.i;
    if (f == null) return;
    if (i === 'H') { draft.hero[f] = el.value; return; }
    const arrKey = { stats: 'stats', articles: 'articles', links: 'links', team: 'team', faq: 'faqs' }[curTab];
    draft[arrKey][+i][f] = el.value;
  });
  // delete
  editorBody.addEventListener('click', (e) => {
    const d = e.target.closest('[data-del]');
    if (!d) return;
    const arrKey = { stats: 'stats', articles: 'articles', links: 'links', team: 'team', faq: 'faqs' }[curTab];
    draft[arrKey].splice(+d.dataset.del, 1);
    buildEditor(curTab);
  });
  // add
  document.getElementById('add-item').addEventListener('click', () => {
    const arrKey = { stats: 'stats', articles: 'articles', links: 'links', team: 'team', faq: 'faqs' }[curTab];
    draft[arrKey].push(BLANKS[curTab]());
    buildEditor(curTab);
    editorBody.scrollTop = editorBody.scrollHeight;
  });
  // save
  document.getElementById('save-data').addEventListener('click', () => {
    DATA = JSON.parse(JSON.stringify(draft));
    saveData(DATA);
    renderAll();
    closeModalEl(editor);
    flashBezel(0.3);
  });
  // reset
  document.getElementById('reset-data').addEventListener('click', () => {
    resetData();
    DATA = loadData();
    draft = JSON.parse(JSON.stringify(DATA));
    buildEditor(curTab);
    renderAll();
  });

  function openEditor(tab) {
    draft = JSON.parse(JSON.stringify(DATA));
    curTab = tab || 'stats';
    document.querySelectorAll('.editor-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === curTab));
    openModalEl(editor);
    buildEditor(curTab);
  }
  window.openEditor = openEditor;

  /* =========================================================
     INIT
     ========================================================= */
  renderAll();
  showStage(0, false);
  boot();
})();
