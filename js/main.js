// Contact form: messages are sent directly to Radh Shahmat's inbox via FormSubmit.
// FormSubmit will ask you to confirm the email address once before the first live submission.
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

// split headings into animated characters (words stay unbroken)
$$('[data-split]').forEach(el => {
  let i = 0;
  el.setAttribute('aria-label', el.textContent);
  el.innerHTML = el.textContent.split(' ').map(w => `<span class="w" aria-hidden="true">${[...w].map(ch => `<span class="ch" style="--i:${i++}">${ch}</span>`).join('')}</span>`).join(' ');
});

// Ra.One-style intro: cubes fly in and fill up the name
function intro(done) {
  const box = $('#intro'), cv = $('#cubes'), x = cv.getContext('2d');
  let fin = false;
  const end = () => { if (fin) return; fin = true; box.classList.add('hide'); setTimeout(() => box.remove(), 900); done(); };
  if (RM) { box.remove(); return done(); }
  box.onclick = end;
  setTimeout(end, 9000);
  (document.fonts ? document.fonts.load('800 100px Unbounded') : Promise.resolve()).catch(() => {}).then(() => {
    if (fin) return;
    const d = Math.min(devicePixelRatio || 1, 2), W = innerWidth, H = innerHeight;
    cv.width = W * d; cv.height = H * d; x.scale(d, d);
    const m = W < 700, lines = m ? ['RADH', 'SHAHMAT'] : ['RADH SHAHMAT'], fs = m ? W * .14 : W * .085, s = m ? 6 : 10;
    const o = document.createElement('canvas'); o.width = W; o.height = H;
    const g = o.getContext('2d');
    g.fillStyle = '#fff'; g.font = `800 ${fs}px Unbounded, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    lines.forEach((t, i) => g.fillText(t, W / 2, H / 2 + (i - (lines.length - 1) / 2) * fs * 1.25));
    const D = g.getImageData(0, 0, W, H).data, C = [];
    for (let yy = 0; yy < H; yy += s) for (let xx = 0; xx < W; xx += s) {
      if (D[(((yy + s / 2) | 0) * W + ((xx + s / 2) | 0)) * 4 + 3] > 120)
        C.push({ x: xx, y: yy, sx: Math.random() * W, sy: Math.random() * H * 1.4 - H * .2, d: Math.random() * 1.7 + xx / W * .9, u: .7 + Math.random() * .5 });
    }
    const T = Math.max(...C.map(c => c.d + c.u)), t0 = performance.now();
    (function f(n) {
      if (fin) return;
      const t = (n - t0) / 1000; let k = 0;
      x.clearRect(0, 0, W, H);
      for (const c of C) {
        const p = Math.min(Math.max((t - c.d) / c.u, 0), 1);
        if (p <= 0) continue;
        if (p >= 1) k++;
        const e = 1 - Math.pow(1 - p, 3), px = c.sx + (c.x - c.sx) * e, py = c.sy + (c.y - c.sy) * e, q = (s - 1) * (.3 + .7 * e);
        x.globalAlpha = Math.min(1, p * 2);
        x.fillStyle = '#3ee6ff'; x.fillRect(px, py, q, q);
        x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(px, py, q, Math.max(1, q * .22));
        x.fillStyle = 'rgba(20,40,120,.45)'; x.fillRect(px, py + q * .78, q, q * .22);
      }
      x.globalAlpha = 1;
      $('#pct').textContent = Math.round(k / C.length * 100);
      if (t < T + .2) requestAnimationFrame(f);
      else { $('#pct').textContent = 100; box.classList.add('done'); setTimeout(end, 1100); }
    })(t0);
  });
}

// floating cubes in the background
function bg() {
  const c = $('#bg'), x = c.getContext('2d'); let W, H, P;
  const rs = () => {
    W = c.width = innerWidth; H = c.height = innerHeight;
    P = Array.from({ length: Math.round(W / 45) }, () => ({ x: Math.random() * W, y: Math.random() * H, s: 8 + Math.random() * 26, v: .1 + Math.random() * .35, r: Math.random() * 6, a: .04 + Math.random() * .08 }));
  };
  rs(); addEventListener('resize', rs);
  (function f() {
    x.clearRect(0, 0, W, H);
    for (const p of P) {
      p.y -= p.v; p.r += .004; if (p.y < -40) p.y = H + 40;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r);
      x.fillStyle = `rgba(139,107,255,${p.a})`; x.strokeStyle = `rgba(62,230,255,${p.a * 2})`;
      x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); x.strokeRect(-p.s / 2, -p.s / 2, p.s, p.s); x.restore();
    }
    requestAnimationFrame(f);
  })();
}

function count(el) {
  const n = +el.dataset.n, t0 = performance.now();
  (function f(now) { const p = Math.min((now - t0) / 1200, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}

function typed() {
  const el = $('#role'), R = ['Full-Stack Developer', 'NLP Researcher', 'UI Craftsman'];
  let i = 0, j = 0, del = false;
  (function f() {
    const w = R[i]; el.textContent = w.slice(0, j);
    if (!del && j === w.length) { del = true; return setTimeout(f, 1400); }
    if (del && j === 0) { del = false; i = (i + 1) % R.length; }
    j += del ? -1 : 1; setTimeout(f, del ? 35 : 70);
  })();
}

function init() {
  document.body.classList.add('ready');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.dataset.n) count(e.target);
  }), { threshold: .15 });
  $$('.rv,[data-split],[data-n]').forEach(e => io.observe(e));

  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) $$('#menu a').forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50%' });
  $$('section[id]').forEach(s => so.observe(s));

  typed();
  if (!RM) bg();
}

// scroll progress
addEventListener('scroll', () => {
  $('#bar').style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`;
}, { passive: true });

// cursor glow, card tilt, magnetic buttons
let gx = 0, gy = 0, tx = 0, ty = 0;
if (!RM) {
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function f() { gx += (tx - gx) * .12; gy += (ty - gy) * .12; $('#glow').style.transform = `translate(${gx}px,${gy}px)`; requestAnimationFrame(f); })();
  document.addEventListener('mousemove', e => {
    const c = e.target.closest && e.target.closest('.tilt');
    if (c) {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--ry', ((px - .5) * 8).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - py) * 8).toFixed(2) + 'deg');
      c.style.setProperty('--mx', px * 100 + '%'); c.style.setProperty('--my', py * 100 + '%');
    }
    const b = e.target.closest && e.target.closest('.mag');
    if (b) { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; }
  });
  document.addEventListener('mouseout', e => {
    const c = e.target.closest && e.target.closest('.tilt'), b = e.target.closest && e.target.closest('.mag');
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); c.style.setProperty('--mx', '50%'); c.style.setProperty('--my', '0%'); }
    if (b && !b.contains(e.relatedTarget)) b.style.transform = '';
  });
}

// mobile menu
$('#burger').onclick = () => $('#nav').classList.toggle('open');
$$('#menu a').forEach(a => a.addEventListener('click', () => $('#nav').classList.remove('open')));

// Contact form uses a standard FormSubmit POST so it works on static hosting
// (GitHub Pages / Vercel / Render) without browser-side fetch/CORS issues.

intro(init);
