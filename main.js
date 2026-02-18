/* ─────────────────────────────────────────────
   Portfolio — Bùi Hà Gia Bảo
   main.js
───────────────────────────────────────────── */

/* ============================================
   1. Animated Star / Nebula Canvas
   ============================================ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [], nebula = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    /* Stars */
    stars = Array.from({ length: 240 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.5 + 0.15,
      alpha: Math.random(),
      da:    (Math.random() - 0.5) * 0.005,
      vy:    Math.random() * 0.07 + 0.01,
    }));

    /* Nebula blobs */
    const palettes = [
      'rgba(124,58,237,',
      'rgba(76,29,149,',
      'rgba(168,85,247,',
    ];
    nebula = Array.from({ length: 9 }, (_, i) => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 230 + 90,
      col: palettes[i % palettes.length],
      a:   Math.random() * 0.09 + 0.03,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Draw nebula */
    nebula.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.col + n.a + ')');
      g.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    /* Draw stars */
    stars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha > 1 || s.alpha < 0) s.da *= -1;
      s.y += s.vy;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, s.alpha) * 0.88})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  draw();
})();


/* ============================================
   2. Tab switching
   ============================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});


/* ============================================
   3. Lightbox
   ============================================ */
function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.src = src;
  lb.classList.add('show');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
}

function closeLightboxBg(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* Expose to global scope (called via onclick in HTML) */
window.openLightbox    = openLightbox;
window.closeLightbox   = closeLightbox;
window.closeLightboxBg = closeLightboxBg;


/* ============================================
   4. Contact form → mailto
   ============================================ */
function handleSend(e) {
  e.preventDefault();

  const name  = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg   = document.getElementById('c-msg').value.trim();

  const to   = 'xthabao@gmail.com';
  const sub  = encodeURIComponent(`[Portfolio] Message from ${name}`);
  const body = encodeURIComponent(
    `Name:  ${name}\nEmail: ${email}\n\n${msg}`
  );

  window.open(`mailto:${to}?subject=${sub}&body=${body}`);

  const status = document.getElementById('send-status');
  status.textContent = '✦ Email client opened — your message is ready to send!';
  setTimeout(() => { status.textContent = ''; }, 5500);
}

/* Expose to global scope (called via onsubmit in HTML) */
window.handleSend = handleSend;
