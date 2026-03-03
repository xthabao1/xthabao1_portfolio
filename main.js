/* ─────────────────────────────────────────────
   Portfolio — Bùi Hà Gia Bảo
   main.js
───────────────────────────────────────────── */

/* ============================================
   1. Animated Star / Nebula Canvas
   ============================================ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], nebula = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.15,
      alpha: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
      vy: Math.random() * 0.07 + 0.01,
    }));
    const palettes = ['rgba(124,58,237,', 'rgba(76,29,149,', 'rgba(168,85,247,'];
    nebula = Array.from({ length: 9 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 230 + 90,
      col: palettes[i % palettes.length],
      a: Math.random() * 0.09 + 0.03,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
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
  resize(); init(); draw();
})();


/* ============================================
   2. Tab switching
   ============================================ */
document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.classList.remove('active'));
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
  const lb = document.getElementById('lightbox');
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.closeLightboxBg = closeLightboxBg;


/* ============================================
   4. Contact form → mailto
   ============================================ */
function handleSend(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg = document.getElementById('c-msg').value.trim();
  const to = 'xthabao@gmail.com';
  const sub = encodeURIComponent(`[Portfolio] Message from ${name}`);
  const body = encodeURIComponent(`Name:  ${name}\nEmail: ${email}\n\n${msg}`);
  window.open(`mailto:${to}?subject=${sub}&body=${body}`);
  const status = document.getElementById('send-status');
  status.textContent = currentLang === 'vi'
    ? '✦ Đã mở email — tin nhắn của bạn sẵn sàng gửi!'
    : '✦ Email client opened — your message is ready to send!';
  setTimeout(() => { status.textContent = ''; }, 5500);
}
window.handleSend = handleSend;


/* ============================================
   5. i18n — Language Switcher (EN / VI)
   ============================================ */
let currentLang = 'en';

const translations = {
  en: {
    tab_about: 'About',
    tab_resume: 'Resume',
    tab_contact: 'Contact',
    label_email: 'Email',
    label_phone: 'Phone',
    label_birthday: 'Birthday',
    label_address: 'Address',
    about_html: `Hello! I'm <strong>Hà Bảo</strong> — a 10A1 student at Le Loi High School, passionate about the intersection of technology and art. I enjoy creating digital products that are both visually appealing and highly effective, from refined web interfaces to complex software systems. With a creative mindset and a solid technical foundation, I always strive to deliver the best possible experience for end users. I look forward to collaborating and working with you.`,
    tl: [
      '<strong>2nd Prize, Computer Science — Provincial Academic Excellence Competition 2025–2026</strong>',
      '<strong>1st Place English, 1st Place Math, 2nd Place Overall — Grade 10 High School Entrance Exam 2025</strong>',
      '<strong>Consolation Prize — Provincial Young Programmers Contest 2025</strong>',
      '<strong>2nd Prize, Computer Science — Provincial Academic Excellence Competition 2024–2025</strong>',
      '<strong>Consolation Prize — Provincial Young Programmers Contest 2024</strong>',
      '<strong>3rd Prize, Computer Science — Provincial Academic Excellence Competition 2023–2024</strong>',
    ],
    label_name: 'Name',
    label_message: 'Message',
    ph_name: 'Your name...',
    ph_email: 'your@email.com',
    ph_message: 'Write your message...',
    btn_send: 'Send',
    win_profile: 'profile.exe',
    win_portfolio: 'portfolio.app',
    tagline: '10A1 &middot; K66<br>Le Loi High School',
  },
  vi: {
    tab_about: 'Giới thiệu',
    tab_resume: 'Thành tích',
    tab_contact: 'Liên hệ',
    label_email: 'Email',
    label_phone: 'Điện thoại',
    label_birthday: 'Ngày sinh',
    label_address: 'Địa chỉ',
    about_html: `Xin chào! Tôi là <strong>Hà Bảo</strong> — học sinh lớp 10A1 trường THPT Lê Lợi, đam mê sự giao thoa giữa công nghệ và nghệ thuật. Tôi thích tạo ra các sản phẩm số vừa đẹp về thẩm mỹ lẫn hiệu quả cao, từ giao diện web tinh tế đến các hệ thống phần mềm phức tạp. Với tư duy sáng tạo và nền tảng kỹ thuật vững chắc, tôi luôn cố gắng mang lại trải nghiệm tốt nhất cho người dùng. Rất mong được hợp tác và làm việc cùng bạn.`,
    tl: [
      '<strong>Đạt giải Nhì, môn Tin học — Kỳ thi học sinh giỏi cấp tỉnh năm học 2025–2026</strong>',
      '<strong>Thủ Khoa Tiếng Anh, Thủ Khoa Toán, Á Khoa Tổng — Kỳ thi tuyển sinh vào lớp 10 THPT 2025</strong>',
      '<strong>Đạt giải Khuyến Khích — Kỳ thi Tin Học Trẻ cấp tỉnh năm 2025</strong>',
      '<strong>Đạt giải Nhì, môn Tin học — Kỳ thi học sinh giỏi cấp tỉnh năm học 2024–2025</strong>',
      '<strong>Đạt giải Khuyến Khích — Kỳ thi Tin Học Trẻ cấp tỉnh năm 2024</strong>',
      '<strong>Đạt giải Ba, môn Tin học — Kỳ thi học sinh giỏi cấp tỉnh năm học 2023–2024</strong>',
    ],
    label_name: 'Tên',
    label_message: 'Tin nhắn',
    ph_name: 'Tên của bạn...',
    ph_email: 'email@cua.ban.com',
    ph_message: 'Viết tin nhắn...',
    btn_send: 'Gửi',
    win_profile: 'hồ-sơ.exe',
    win_portfolio: 'portfolio.app',
    tagline: '10A1 &middot; K66<br>THPT Lê Lợi',
  }
};

function applyLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  /* Tab labels */
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    const key = 'tab_' + btn.dataset.tab;
    const icon = btn.querySelector('i');
    btn.innerHTML = '';
    if (icon) btn.appendChild(icon);
    btn.appendChild(document.createTextNode(' ' + t[key]));
  });

  /* Panel A labels */
  const labels = document.querySelectorAll('.info-item .label');
  ['label_email', 'label_phone', 'label_birthday', 'label_address']
    .forEach((key, i) => { if (labels[i]) labels[i].textContent = t[key]; });

  /* About */
  const aboutEl = document.querySelector('#tab-about .about-text');
  if (aboutEl) aboutEl.innerHTML = t.about_html;

  /* Resume */
  document.querySelectorAll('.tl-desc')
    .forEach((el, i) => { if (t.tl[i]) el.innerHTML = t.tl[i]; });

  /* Contact labels */
  const fGroups = document.querySelectorAll('#tab-contact .field-group');
  [['label_name', 0], ['label_email', 1], ['label_message', 2]].forEach(([key, idx]) => {
    const lbl = fGroups[idx] && fGroups[idx].querySelector('label');
    if (lbl) {
      const icon = lbl.querySelector('i');
      lbl.innerHTML = '';
      if (icon) lbl.appendChild(icon);
      lbl.appendChild(document.createTextNode(' ' + t[key]));
    }
  });
  const cName = document.getElementById('c-name'); if (cName) cName.placeholder = t.ph_name;
  const cEmail = document.getElementById('c-email'); if (cEmail) cEmail.placeholder = t.ph_email;
  const cMsg = document.getElementById('c-msg'); if (cMsg) cMsg.placeholder = t.ph_message;

  const btnSend = document.querySelector('.btn-send');
  if (btnSend) {
    const icon = btnSend.querySelector('i');
    btnSend.innerHTML = '';
    if (icon) btnSend.appendChild(icon);
    btnSend.appendChild(document.createTextNode(' ' + t.btn_send));
  }

  /* Window titles */
  const wt = document.querySelectorAll('.win-title');
  if (wt[0]) wt[0].textContent = t.win_profile;
  if (wt[1]) wt[1].textContent = t.win_portfolio;

  /* Tagline */
  const tagEl = document.querySelector('.tagline');
  if (tagEl) tagEl.innerHTML = t.tagline;

  /* Active state */
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );
}

/* Attach listeners */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});
