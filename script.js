/* ═══════════════════════════════════════════════════
   SHUBHAM KUMAR — PORTFOLIO
   Nikola-style Interactive Scripts
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  });
  // Fallback: hide after 3s even if load event fires early
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  /* ── TYPEWRITER EFFECT ── */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = [
      'Full-Stack Developer',
      'Competitive Programmer',
      'C++ Enthusiast',
      'Problem Solver',
      'AI / ML Explorer'
    ];
    let roleIdx = 0, charIdx = 0, isDeleting = false;
    const typeSpeed = 80, deleteSpeed = 40, pauseEnd = 1800, pauseStart = 400;

    function typeStep() {
      const current = roles[roleIdx];
      if (!isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(typeStep, pauseEnd);
          return;
        }
        setTimeout(typeStep, typeSpeed);
      } else {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(typeStep, pauseStart);
          return;
        }
        setTimeout(typeStep, deleteSpeed);
      }
    }
    setTimeout(typeStep, 2200); // start after preloader
  }

  /* ── SCROLL ANIMATIONS ── */
  const animElements = document.querySelectorAll(
    '.stack-card, .project-card, .exp-item, .cert-card, .achieve-card, ' +
    '.edu-card, .contact-card, .about-photo-col, .about-text-col, ' +
    '.section-tag, .section-title, .hero-stats-bar, .hero-subtitle-row, ' +
    '.hero-name-row, .hero-top-row'
  );
  animElements.forEach(el => el.classList.add('anim-up'));

  function checkAnims() {
    animElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && !el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkAnims);
  setTimeout(checkAnims, 200);

  /* ── HERO ENTRANCE (staggered) ── */
  const heroElements = document.querySelectorAll(
    '.hero-top-row, .hero-name-row, .hero-subtitle-row, .hero-stats-bar'
  );
  heroElements.forEach((el, i) => {
    el.style.transitionDelay = `${.2 + i * .15}s`;
    setTimeout(() => el.classList.add('visible'), 50);
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 40,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── BOTTOM NAV — Active section highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const bnavLinks = document.querySelectorAll('.bnav-link[data-section]');

  function highlightBottomNav() {
    const y = window.scrollY + window.innerHeight / 3;
    let current = '';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const id = sec.getAttribute('id');
      if (y >= top && y < top + sec.offsetHeight) {
        current = id;
      }
    });

    bnavLinks.forEach(link => {
      const isActive = link.getAttribute('data-section') === current;
      link.classList.toggle('active', isActive);
    });
  }
  window.addEventListener('scroll', highlightBottomNav);
  highlightBottomNav();

  /* ── PARALLAX HERO + PORTRAIT SCROLL EFFECT ── */
  const heroContent = document.querySelector('.hero-content');
  const heroPortrait = document.querySelector('.hero-portrait');
  const heroSection = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;

    if (y < heroH && heroContent) {
      heroContent.style.transform = `translateY(${y * 0.2}px)`;
      heroContent.style.opacity = Math.max(0, 1 - (y / heroH) * 0.8);
    }

    /* Portrait: slide right, grayscale, fade out */
    if (heroPortrait && y < heroH) {
      const progress = Math.min(y / (heroH * 0.55), 1); // 0→1 over first 55% of hero
      const moveX = progress * 120;          // slide up to 120px right
      const gray = progress * 100;           // 0% → 100% grayscale
      const fade = Math.max(0, 1 - progress * 1.3); // fade out faster

      heroPortrait.style.transform = `translateX(${moveX}px) scale(${1 - progress * 0.15})`;
      heroPortrait.style.filter = `grayscale(${gray}%)`;
      heroPortrait.style.opacity = fade;
    }
  });

  /* ── CARD HOVER SPOTLIGHT ── */
  document.querySelectorAll(
    '.project-card, .cert-card, .stack-card-inner, .achieve-card, .edu-card, .contact-card'
  ).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(0) + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(0) + '%');
    });
  });

  /* ── BOTTOM NAV HIDE/SHOW on scroll direction ── */
  let lastScrollY = 0;
  const bottomNav = document.getElementById('bottomNav');
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY < 100) {
      bottomNav.style.transform = 'translateX(-50%) translateY(0)';
    } else if (currentY > lastScrollY + 10) {
      bottomNav.style.transform = 'translateX(-50%) translateY(120%)';
    } else if (currentY < lastScrollY - 10) {
      bottomNav.style.transform = 'translateX(-50%) translateY(0)';
    }
    lastScrollY = currentY;
  });

  /* ── SCROLL-REVEAL WORD-BY-WORD TEXT ── */
  document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
    // Wrap each word in a span
    const text = el.textContent.trim();
    el.innerHTML = text.split(/\s+/).map(w =>
      `<span class="reveal-word">${w}</span>`
    ).join(' ');

    const words = el.querySelectorAll('.reveal-word');

    function updateReveal() {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress 0→1: starts when top enters 80% of viewport, ends when top reaches 20%
      const start = winH * 0.8;
      const end = winH * 0.2;
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      const revealCount = Math.floor(progress * words.length);

      words.forEach((w, i) => {
        w.classList.toggle('revealed', i < revealCount);
      });
    }

    window.addEventListener('scroll', updateReveal, { passive: true });
    updateReveal();
  });

  /* ── INITIAL CHECKS ── */
  setTimeout(() => { checkAnims(); highlightBottomNav(); }, 150);
});
