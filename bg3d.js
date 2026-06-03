/* ============================================================
   Arroyo Vista IT — ambient 3D background
   Futuristic data viz: angled floating code, plexus network,
   telemetry waves. No person.
   ============================================================ */
(function () {
  'use strict';

  // ---------- angled floating code texture ----------
  function buildCodeCanvas() {
    const W = 1024, H = 2048;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    const KW = ['#46e6ff', '#5ad1ff']; // cyan keywords
    const STR = '#ffb454'; // orange strings
    const FN = '#ffd479';
    const VAR = '#cfe9ff';
    const DIM = '#5b87a8';

    const tokens = [
      ['def ', KW[0]], ['route_ticket', FN], ['(payload):', VAR],
      ['if ', KW[0]], ['status == ', VAR], ['"OPEN"', STR], [':', VAR],
      ['queue.', VAR], ['assign', FN], ['(agent_id)', VAR],
      ['telemetry.', VAR], ['push', FN], ['(node, latency)', VAR],
      ['for ', KW[0]], ['site ', VAR], ['in ', KW[0]], ['network.nodes:', VAR],
      ['encrypt', FN], ['(session, ', VAR], ['"AES-256"', STR], [')', VAR],
      ['return ', KW[0]], ['{ "ok": ', VAR], ['True', '#7dffb0'], [' }', VAR],
      ['#', DIM], [' sync NextGen cache', DIM],
      ['await ', KW[0]], ['spiceworks.', VAR], ['fetch', FN], ['(open)', VAR],
      ['print(', VAR], ['"node online"', STR], [')', VAR],
      ['class ', KW[0]], ['SecureLink', FN], [':', VAR],
      ['self.', VAR], ['handshake', FN], ['(tls=1.3)', VAR]
    ];

    function line(y, indent) {
      let x = 30 + indent * 34;
      const n = 2 + (Math.random() * 4 | 0);
      for (let i = 0; i < n; i++) {
        const tk = tokens[(Math.random() * tokens.length) | 0];
        ctx.fillStyle = tk[1];
        ctx.fillText(tk[0], x, y);
        x += ctx.measureText(tk[0]).width + 6;
        if (x > W - 120) break;
      }
    }

    ctx.clearRect(0, 0, W, H);
    ctx.font = '600 26px "Space Grotesk", monospace';
    ctx.textBaseline = 'middle';
    const lh = 38;
    let indent = 0;
    for (let y = lh; y < H; y += lh) {
      // simple indent rhythm
      const r = Math.random();
      if (r < 0.18) indent = Math.max(0, indent - 1);
      else if (r < 0.4) indent = Math.min(4, indent + 1);
      line(y, indent);
      // line numbers
      ctx.fillStyle = '#2c4a5e';
      ctx.fillText(String(((y / lh) | 0) + 100).slice(-3), 4, y);
    }
    return cv;
  }

  function initBgScreens() {
    if (!window.THREE) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.getElementById('bg-screens');
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030a14, 0.018);
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    // ---------- angled floating code planes (disabled) ----------
    const codePlanes = [];

    // ---------- plexus network ----------
    function makePlexus(opts) {
      const { count, region, color, linkDist, speed, lineOpacity } = opts;
      const pts = [];
      for (let i = 0; i < count; i++) {
        pts.push({
          p: new THREE.Vector3(
            region.x + (Math.random() - 0.5) * region.w,
            region.y + (Math.random() - 0.5) * region.h,
            region.z + (Math.random() - 0.5) * region.d
          ),
          v: new THREE.Vector3((Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed, (Math.random() - 0.5) * speed),
          ph: Math.random() * 6
        });
      }
      const nodeGeo = new THREE.BufferGeometry();
      const nodePos = new Float32Array(count * 3);
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
      const nodeMat = new THREE.PointsMaterial({ color, size: 0.32, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
      const nodes = new THREE.Points(nodeGeo, nodeMat);
      scene.add(nodes);

      const maxSeg = count * 6;
      const lineGeo = new THREE.BufferGeometry();
      const linePos = new Float32Array(maxSeg * 6);
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: lineOpacity, blending: THREE.AdditiveBlending, depthWrite: false });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      return { pts, region, linkDist, nodes, nodePos, nodeGeo, lines, linePos, lineGeo, maxSeg };
    }

    const cyan = makePlexus({ count: 46, region: { x: 4, y: -2, z: -4, w: 26, h: 20, d: 14 }, color: 0x32e6e6, linkDist: 4.4, speed: 0.6, lineOpacity: 0.32 });
    const red = makePlexus({ count: 22, region: { x: 11, y: -7, z: -2, w: 16, h: 12, d: 10 }, color: 0xff3b54, linkDist: 4.2, speed: 0.7, lineOpacity: 0.34 });
    const plexi = [cyan, red];

    function updatePlexus(pl, dt, t) {
      const { pts, region, linkDist } = pl;
      // move nodes
      for (let i = 0; i < pts.length; i++) {
        const n = pts[i];
        n.p.addScaledVector(n.v, dt);
        // bounce within region box
        if (Math.abs(n.p.x - region.x) > region.w / 2) n.v.x *= -1;
        if (Math.abs(n.p.y - region.y) > region.h / 2) n.v.y *= -1;
        if (Math.abs(n.p.z - region.z) > region.d / 2) n.v.z *= -1;
        pl.nodePos[i * 3] = n.p.x;
        pl.nodePos[i * 3 + 1] = n.p.y;
        pl.nodePos[i * 3 + 2] = n.p.z;
      }
      pl.nodeGeo.attributes.position.needsUpdate = true;
      // links
      let s = 0;
      const lp = pl.linePos, max = pl.maxSeg;
      for (let i = 0; i < pts.length && s < max; i++) {
        for (let j = i + 1; j < pts.length && s < max; j++) {
          const a = pts[i].p, b = pts[j].p;
          const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
          if (dx * dx + dy * dy + dz * dz < linkDist * linkDist) {
            lp[s * 6] = a.x; lp[s * 6 + 1] = a.y; lp[s * 6 + 2] = a.z;
            lp[s * 6 + 3] = b.x; lp[s * 6 + 4] = b.y; lp[s * 6 + 5] = b.z;
            s++;
          }
        }
      }
      pl.lineGeo.setDrawRange(0, s * 2);
      pl.lineGeo.attributes.position.needsUpdate = true;
    }

    // ---------- telemetry waves ----------
    const waves = [];
    function addWave(y, z, amp, freq, speed, color, op, rotZ) {
      const N = 140;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false });
      const line = new THREE.Line(geo, mat);
      line.rotation.z = rotZ;
      scene.add(line);
      waves.push({ N, geo, pos, y, z, amp, freq, speed, span: 60 });
    }
    addWave(-1, -6, 1.6, 0.5, 1.1, 0x2fe0e6, 0.28, 0.08);
    addWave(-4, -9, 2.2, 0.34, 0.8, 0x39a0ff, 0.2, -0.05);
    addWave(3, -12, 1.2, 0.7, 1.5, 0x36f0d0, 0.16, 0.12);

    function updateWave(w, t) {
      const { N, pos, y, z, amp, freq, speed, span } = w;
      for (let i = 0; i < N; i++) {
        const x = -span / 2 + (span * i) / (N - 1);
        pos[i * 3] = x;
        pos[i * 3 + 1] = y + Math.sin(x * freq + t * speed) * amp * (0.5 + 0.5 * Math.sin(x * 0.15 + t * 0.4));
        pos[i * 3 + 2] = z;
      }
      w.geo.attributes.position.needsUpdate = true;
    }

    // ---------- light flares (orange top-left, cyan right) ----------
    function flare(x, y, z, size, color, op) {
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const g = c.getContext('2d');
      const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      rg.addColorStop(0, color); rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false }));
      sp.position.set(x, y, z); sp.scale.set(size, size, 1);
      scene.add(sp);
      return sp;
    }
    flare(-13, 9, -6, 22, 'rgba(255,150,40,0.9)', 0.7);   // orange sun flare top-left
    flare(14, 0, -14, 34, 'rgba(40,180,220,0.8)', 0.55);  // cyan glow right
    flare(9, -8, -6, 16, 'rgba(255,60,90,0.7)', 0.4);     // red glow lower-right

    let w = 0, h = 0;
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    let tpx = 0, tpy = 0, px = 0, py = 0;
    window.addEventListener('pointermove', (e) => {
      tpx = (e.clientX / window.innerWidth - 0.5);
      tpy = (e.clientY / window.innerHeight - 0.5);
    });

    let running = true;
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) { last = clock.getElapsedTime(); loop(); }
    });

    const clock = new THREE.Clock();
    let last = 0;

    function frame() {
      const t = clock.getElapsedTime();
      const dt = Math.min(t - last, 0.05); last = t;

      px += (tpx - px) * 0.03; py += (tpy - py) * 0.03;
      camera.position.x = px * 4 + Math.sin(t * 0.08) * 1.2;
      camera.position.y = -py * 3 + Math.cos(t * 0.07) * 0.9;
      camera.lookAt(0, 0, -6);

      for (const pl of plexi) updatePlexus(pl, dt, t);
      for (const wv of waves) updateWave(wv, t);

      renderer.render(scene, camera);
    }

    function loop() {
      if (!running) return;
      requestAnimationFrame(loop);
      frame();
    }

    // init draw
    for (const pl of plexi) updatePlexus(pl, 0.016, 0);
    for (const wv of waves) updateWave(wv, 0);

    if (reduce) { renderer.render(scene, camera); }
    else loop();
  }

  window.initBgScreens = initBgScreens;
})();
