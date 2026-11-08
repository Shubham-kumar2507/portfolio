/* ═══════════════════════════════════════════════════
   SHUBHAM KUMAR — PORTFOLIO
   Enhanced Interactive Scripts with Particles & Cursor
   ═══════════════════════════════════════════════════ */

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function startAtTop() {
  if (window.location.hash) {
    history.replaceState(history.state, '', window.location.pathname + window.location.search);
  }
  const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  resetScroll();
  requestAnimationFrame(() => requestAnimationFrame(resetScroll));
}
startAtTop();
window.addEventListener('load', startAtTop);
window.addEventListener('pageshow', startAtTop);

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

  /* ── PARTICLE BACKGROUND ── */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 120;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,117,0,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(226,117,0,${0.08 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ── CUSTOM CURSOR ── */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    function followRing() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(followRing);
    }
    followRing();
    document.querySelectorAll('a, button, .btn-primary, .btn-outline, .project-card, .project-link-btn').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

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

  /* ── TILT EFFECT ON PROJECT CARDS ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── SCROLL PROGRESS BAR ── */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ── VISIT COUNTER ── */
  const visitEl = document.getElementById('visitNumber');
  if (visitEl) {
    const STORAGE_KEY = 'shubham_portfolio_visits';
    const BASE_COUNT = 1840; // baseline realistic visitor count
    let visits = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    
    // Increment visit once per session
    const sessionKey = 'shubham_visited_session';
    if (!sessionStorage.getItem(sessionKey)) {
      visits = (visits === 0 ? BASE_COUNT : visits) + 1;
      localStorage.setItem(STORAGE_KEY, visits.toString());
      sessionStorage.setItem(sessionKey, '1');
    } else if (visits === 0) {
      visits = BASE_COUNT;
      localStorage.setItem(STORAGE_KEY, visits.toString());
    }

    // Rolling counter animation
    const targetCount = visits;
    const startCount = Math.max(0, targetCount - 45);
    const duration = 1600;
    const startTime = performance.now();

    function formatVisitNum(num) {
      return String(num).padStart(6, '0');
    }

    function animateVisitCounter(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startCount + (targetCount - startCount) * ease);
      visitEl.textContent = formatVisitNum(current);

      if (progress < 1) {
        requestAnimationFrame(animateVisitCounter);
      } else {
        visitEl.textContent = formatVisitNum(targetCount);
      }
    }

    setTimeout(() => {
      requestAnimationFrame(animateVisitCounter);
    }, 600);
  }

  /* ── NUMBER STATS COUNTER ANIMATION ── */
  const counterElements = document.querySelectorAll('.counter-anim[data-target]');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 1800;
      const startTime = performance.now();

      function updateCount(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * ease);
        el.textContent = current + '+';

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target + '+';
        }
      }
      requestAnimationFrame(updateCount);
    });
    countersAnimated = true;
  }

  const statsBar = document.querySelector('.hero-stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsBar);
    // Fallback trigger after 2 seconds
    setTimeout(runCounters, 2200);
  }

  /* ── BUTTON CLICK RIPPLE EFFECT ── */
  document.querySelectorAll('.btn-primary, .btn-outline, .project-link-btn, .cli-chip').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existing = this.querySelector('.ripple-effect');
      if (existing) existing.remove();

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(circle);

      setTimeout(() => circle.remove(), 600);
    });
  });

  /* ══════════════════════════════════════
     CLI TERMINAL ENGINE
     ══════════════════════════════════════ */
  const cliTerminal = document.getElementById('cliTerminal');
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');
  const cliFullscreenBtn = document.getElementById('cliFullscreenBtn');
  const cliChips = document.querySelectorAll('.cli-chip');

  if (cliTerminal && cliInput && cliOutput) {
    let commandHistory = [];
    let historyIndex = -1;

    // Full resume database for the CLI
    const cvData = {
      name: "Shubham Kumar",
      title: "Computer Science Undergraduate (B.Tech, Class of 2027) & Full-Stack Developer",
      location: "Lovely Professional University, Phagwara, Punjab | Home: Bihar, India",
      email: "shubham.cse.2005@gmail.com",
      phone: "+91 9931372825",
      github: "https://github.com/Shubham-kumar2507",
      linkedin: "https://www.linkedin.com/in/shubham-07-kumar/",
      leetcode: "https://leetcode.com/u/Shubham_kumar_025/",
      cgpa: "7.95 / 10.0",
      stats: {
        projects: "9+ Shipped Projects",
        leetcodeProblems: "500+ Questions Solved",
        leetcodeRating: "1750+ Rating",
        dsaProblems: "450+ Algorithmic Challenges (CSE Pathshala)",
        certifications: "7 Recognized Certifications"
      },
      skills: {
        languages: ["C++", "Java", "Python", "C", "JavaScript", "PHP"],
        csFundamentals: ["Data Structures & Algorithms", "Object-Oriented Design (OOP)", "Operating Systems", "DBMS", "Complexity Analysis", "System Design"],
        web: ["React", "Node.js", "Express", "Spring Boot", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
        databasesAndTools: ["MySQL", "MongoDB", "SQLite", "Git", "Docker", "Linux", "REST APIs", "FastAPI"]
      },
      projects: [
        {
          id: "shipguard",
          name: "ShipGuard — PR Security & Supply-Chain Automation",
          timeline: "Sep '26 – Present",
          stack: "Python, FastAPI, GitHub App, OPA, SBOM, LLM evaluation, Copier",
          desc: "Built a Python CLI and GitHub App for automated PR security, supply-chain, and policy checks. Its signature-verified FastAPI webhook isolates untrusted PR code; the project also includes OPA policy-as-code, SBOM generation, an LLM reviewer with an evaluation harness, and a Copier template for hardened FastAPI services.",
          github: "https://github.com/Shubham-kumar2507/shipGuard"
        },
        {
          id: "ekyam",
          name: "EKYAM — Decentralized Community Management Platform",
          timeline: "Jan '26 – Mar '26",
          stack: "MERN (MongoDB, Express, React, Node.js), RBAC, REST API",
          desc: "Architected a decentralized community management platform enabling autonomous user-led moderation, custom settings, and automated administrative workflows. Built real-time event lifecycle for RSVPs and implemented granular RBAC for secure document sharing.",
          live: "https://ekyam-pro.vercel.app/",
          github: "https://github.com/Shubham-kumar2507/ekyam_pro"
        },
        {
          id: "job",
          name: "Job Ingestion Pipeline",
          timeline: "July '26 – Aug '26",
          stack: "Python, FastAPI, httpx, tenacity, Pydantic, SQLite, Groq LLM fallback",
          desc: "Architected a resilient data ingestion pipeline with UA rotation, randomized delays, and exponential backoff circuit breakers. Features a hybrid validator combining strict Pydantic enforcement with Groq LLM fallback repairs and a FastAPI health dashboard.",
          github: "https://github.com/Shubham-kumar2507"
        },
        {
          id: "chatbot",
          name: "Spring Boot AI Chatbot",
          timeline: "2025",
          stack: "Java 17, Spring Boot, Google Gemini API, WebClient, Docker",
          desc: "Conversational AI system built with Spring Boot utilizing Google Gemini API for intelligent response generation. Features modular controller-service-model architecture with fallback stability and Docker Compose setup.",
          live: "https://spring-boot-chatbot.onrender.com/",
          github: "https://github.com/Shubham-kumar2507"
        },
        {
          id: "nirvana",
          name: "Nirvana — Mood & Language Music Discovery App",
          timeline: "Dec '24 – Apr '25",
          stack: "JavaScript, HTML5, CSS3, YouTube Data API v3",
          desc: "Music discovery web application that curates responsive playlists matching mood and language preferences via real-time YouTube Data API v3 integration with an intuitive chat search interface.",
          live: "https://shubham-kumar2507.github.io/Nirvana/",
          github: "https://github.com/Shubham-kumar2507/Nirvana"
        },
        {
          id: "optimizer",
          name: "AI System Call Optimizer",
          timeline: "2024 – 2025",
          stack: "Python, JavaScript, Machine Learning, Data Visualization",
          desc: "Performance analysis dashboard leveraging ML to detect system call bottlenecks and optimize OS resource dispatch, driving up to a 25% throughput gain.",
          live: "https://shubham-kumar2507.github.io/AI-System-Call-Optimizer/",
          github: "https://github.com/Shubham-kumar2507"
        },
        {
          id: "monitoring",
          name: "C++ Monitoring Agent",
          timeline: "2024",
          stack: "C++, IoT Telemetry, Docker, POSIX Systems",
          desc: "High-throughput asynchronous telemetry agent for resource-constrained IoT systems featuring dynamic metric collectors and containerized deployment.",
          github: "https://github.com/Shubham-kumar2507/work_I"
        }
      ],
      experience: [
        {
          role: "Advanced C++ & DSA Bootcamp Trainee",
          org: "CSE Pathshala",
          period: "Jun '25 – Jul '25 (32-day Intensive Program)",
          points: [
            "Completed 32-day rigorous program covering advanced OOP and DSA from scratch to expert level.",
            "Solved 450+ complex algorithmic challenges spanning trees, graphs, dynamic programming, backtracking, and greedy paradigms.",
            "Built 5+ production-quality C++ projects implementing AVL trees, Dijkstra's shortest path, and hash tables."
          ]
        },
        {
          role: "Hardware & Operating Systems (with Honours)",
          org: "IBM Certification Program",
          period: "Aug '24 – Sep '24",
          points: [
            "Studied OS kernel internals, memory management, process synchronization, and modern GPU architectures (CUDA/parallel pipelines).",
            "Configured and hardened Linux & Windows environments; built real-time system monitoring solutions."
          ]
        }
      ],
      certifications: [
        { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", org: "Oracle", date: "May 2026", status: "Verified" },
        { name: "Computational Theory: Language Principles & Finite Automata Theory", org: "Infosys", date: "Aug 2025", status: "Verified" },
        { name: "Social Networks Analysis & Graph Theory", org: "Govt. of India, NPTEL", date: "Apr 2025", status: "Verified" },
        { name: "The Bits and Bytes of Computer Networking", org: "Google", date: "Sep 2024", status: "Verified" },
        { name: "Responsive Web Design (Developer Certification)", org: "freeCodeCamp", date: "Oct 2023", status: "Verified" }
      ],
      achievements: [
        { icon: "💻", title: "500+ LeetCode Questions Solved (1750+ Rating)", desc: "Consistent top-bracket problem solver in Dynamic Programming, Graphs, and Greedy algorithms." },
        { icon: "🏆", title: "2nd Runner-up — CYPHERTHON Coding Challenge", desc: "Ranked top 3 in competitive coding hackathon (March 2025)." },
        { icon: "🥇", title: "Winner — CPEC Club Debate Competition", desc: "First prize in technical debate and communication championship (Nov 2024)." },
        { icon: "📊", title: "1st Social Media Ranking — CPEC Club", desc: "Maintained #1 club presence across campus for 3 consecutive months (Sep 2023 – Mar 2024)." }
      ],
      education: [
        {
          degree: "B.Tech in Computer Science and Engineering",
          school: "Lovely Professional University, Phagwara, Punjab",
          timeline: "Aug 2023 – Present (Expected Graduation: 2027)",
          meta: "CGPA: 7.95 / 10.0"
        },
        {
          degree: "Intermediate (Class XII) — Science",
          school: "TRIDENT Public School, Muzaffarpur, Bihar",
          timeline: "Apr 2021 – Mar 2022"
        },
        {
          degree: "Matriculation (Class X)",
          school: "VISHASHVI Public School, Patna, Bihar",
          timeline: "Apr 2019 – Mar 2020"
        }
      ]
    };

    function appendOutput(html) {
      const line = document.createElement('div');
      line.className = 'cli-line';
      line.innerHTML = html;
      cliOutput.appendChild(line);
      cliBody.scrollTop = cliBody.scrollHeight;
    }

    function processCommand(rawInput) {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      // Echo command
      appendOutput(`
        <div class="cli-cmd-line">
          <span class="cli-prompt-text">visitor@shubham:~$</span>
          <span class="cli-user-input">${escapeHTML(trimmed)}</span>
        </div>
      `);

      commandHistory.push(trimmed);
      historyIndex = commandHistory.length;

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ').toLowerCase();

      switch (cmd) {
        case 'help':
        case '?':
        case 'commands':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>Available Commands:</strong></p>
              <table class="cli-table">
                <tr><td>about / bio</td><td>Overview, summary, and current academic standing</td></tr>
                <tr><td>skills / tech</td><td>Languages, frameworks, databases, and CS fundamentals</td></tr>
                <tr><td>projects / work</td><td>List all featured projects with tech stacks and links</td></tr>
                <tr><td>project &lt;name&gt;</td><td>Deep dive into a specific project (e.g. <code>project ekyam</code>, <code>project job</code>)</td></tr>
                <tr><td>leetcode / lc</td><td>Competitive programming stats, 500+ problems, and 1750+ rating</td></tr>
                <tr><td>experience</td><td>CSE Pathshala Bootcamp & IBM Honours training</td></tr>
                <tr><td>education / edu</td><td>B.Tech at LPU, intermediate & school background</td></tr>
                <tr><td>certs / awards</td><td>Oracle AI, Infosys, NPTEL, Google, freeCodeCamp certifications</td></tr>
                <tr><td>contact / socials</td><td>Email, Phone, LinkedIn, GitHub, LeetCode profile links</td></tr>
                <tr><td>all / full</td><td>Print complete comprehensive CV in terminal format</td></tr>
                <tr><td>cv / download</td><td>Trigger CV download or get direct link</td></tr>
                <tr><td>theme &lt;name&gt;</td><td>Switch terminal theme (matrix | cyber | amber | default)</td></tr>
                <tr><td>clear / cls</td><td>Clear the terminal screen</td></tr>
                <tr><td>fullscreen</td><td>Toggle terminal fullscreen mode</td></tr>
              </table>
            </div>
          `);
          break;

        case 'about':
        case 'bio':
        case 'whoami':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>${cvData.name}</strong> — ${cvData.title}</p>
              <p style="margin: 6px 0;">📍 <em>${cvData.location}</em> | 🎓 <strong>CGPA: ${cvData.cgpa}</strong></p>
              <p class="cli-card-desc">Computer Science undergraduate with hands-on experience building scalable, fault-tolerant systems in Python, C++, and the MERN stack. Strong grounding in algorithms, OOP, OS, DBMS, and complexity analysis; comfortable turning ambiguous problems into shipped, production-style software.</p>
              <div class="cli-card-tags" style="margin-top: 10px;">
                <span class="cli-tag">500+ LeetCode Solved</span>
                <span class="cli-tag">1750+ Contest Rating</span>
                <span class="cli-tag">9+ Projects</span>
                <span class="cli-tag">Oracle Cloud AI Certified</span>
              </div>
            </div>
          `);
          break;

        case 'skills':
        case 'tech':
        case 'stack':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>Technical Expertise:</strong></p>
              <table class="cli-table">
                <tr><td>Languages:</td><td>${cvData.skills.languages.map(s => `<span class="cli-tag">${s}</span>`).join(' ')}</td></tr>
                <tr><td>CS Fundamentals:</td><td>${cvData.skills.csFundamentals.map(s => `<span class="cli-tag">${s}</span>`).join(' ')}</td></tr>
                <tr><td>Web & Frameworks:</td><td>${cvData.skills.web.map(s => `<span class="cli-tag">${s}</span>`).join(' ')}</td></tr>
                <tr><td>Databases & DevOps:</td><td>${cvData.skills.databasesAndTools.map(s => `<span class="cli-tag">${s}</span>`).join(' ')}</td></tr>
              </table>
            </div>
          `);
          break;

        case 'projects':
        case 'work':
          let projHtml = `<div class="cli-output-block"><p class="cli-highlight"><strong>Featured Projects (${cvData.projects.length}):</strong></p>`;
          cvData.projects.forEach((p, idx) => {
            projHtml += `
              <div class="cli-card">
                <div class="cli-card-title">${idx + 1}. ${p.name} <span class="cli-card-meta">(${p.timeline})</span></div>
                <div class="cli-card-desc">${p.desc}</div>
                <div class="cli-card-tags">
                  <span class="cli-tag" style="background: rgba(88,166,255,0.15); color: #58a6ff; border-color: rgba(88,166,255,0.3);">${p.stack}</span>
                </div>
                <div style="margin-top: 6px; font-size: 0.8rem;">
                  ${p.live ? `🚀 <a href="${p.live}" target="_blank" class="cli-link">Live Demo</a> &nbsp;|&nbsp; ` : ''}
                  ${p.github ? `💻 <a href="${p.github}" target="_blank" class="cli-link">Source Code</a>` : ''}
                </div>
              </div>
            `;
          });
          projHtml += `<p style="margin-top: 8px; font-size: 0.8rem; color: #8b949e;">💡 Tip: Type <code>project &lt;name&gt;</code> (e.g. <code>project ekyam</code> or <code>project job</code>) for full details.</p></div>`;
          appendOutput(projHtml);
          break;

        case 'project':
          if (!arg) {
            appendOutput(`<p class="cli-error">⚠️ Please specify a project name. Example: <code>project ekyam</code>, <code>project job</code>, <code>project chatbot</code></p>`);
            break;
          }
          const matched = cvData.projects.find(p =>
            p.id.includes(arg) || p.name.toLowerCase().includes(arg)
          );
          if (matched) {
            appendOutput(`
              <div class="cli-output-block">
                <p class="cli-highlight" style="font-size: 1.05rem;"><strong>${matched.name}</strong></p>
                <p class="cli-card-meta">Timeline: ${matched.timeline} | Stack: ${matched.stack}</p>
                <p class="cli-card-desc" style="margin: 8px 0; line-height: 1.6;">${matched.desc}</p>
                <div style="margin-top: 10px;">
                  ${matched.live ? `<a href="${matched.live}" target="_blank" class="cli-link" style="margin-right: 15px;">🚀 Open Live Deployment</a>` : ''}
                  ${matched.github ? `<a href="${matched.github}" target="_blank" class="cli-link">💻 View GitHub Repository</a>` : ''}
                </div>
              </div>
            `);
          } else {
            appendOutput(`<p class="cli-error">Project "${escapeHTML(arg)}" not found. Type <code>projects</code> to see the full list.</p>`);
          }
          break;

        case 'leetcode':
        case 'lc':
        case 'dsa':
        case 'coding':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>LeetCode & Competitive Programming:</strong></p>
              <table class="cli-table">
                <tr><td>Problems Solved:</td><td><strong style="color: #3fb950;">500+ Questions</strong> across LeetCode, Codeforces & GeeksforGeeks</td></tr>
                <tr><td>Contest Rating:</td><td><strong style="color: var(--accent);">1750+ Rating</strong> (Top Competitive Tier)</td></tr>
                <tr><td>Core Strengths:</td><td>Dynamic Programming, Graphs (BFS/DFS, Dijkstra), Trees, Sliding Window, Backtracking</td></tr>
                <tr><td>Profile URL:</td><td><a href="${cvData.leetcode}" target="_blank" class="cli-link">${cvData.leetcode}</a></td></tr>
              </table>
            </div>
          `);
          break;

        case 'experience':
        case 'training':
        case 'internship':
          let expHtml = `<div class="cli-output-block"><p class="cli-highlight"><strong>Professional Training & Experience:</strong></p>`;
          cvData.experience.forEach(e => {
            expHtml += `
              <div class="cli-card">
                <div class="cli-card-title">${e.org} — ${e.role}</div>
                <div class="cli-card-meta">📅 ${e.period}</div>
                <ul style="margin: 6px 0 0 16px; font-size: 0.85rem; line-height: 1.6;">
                  ${e.points.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              </div>
            `;
          });
          expHtml += `</div>`;
          appendOutput(expHtml);
          break;

        case 'education':
        case 'edu':
        case 'college':
          let eduHtml = `<div class="cli-output-block"><p class="cli-highlight"><strong>Academic Background:</strong></p>`;
          cvData.education.forEach(ed => {
            eduHtml += `
              <div class="cli-card">
                <div class="cli-card-title">🎓 ${ed.degree}</div>
                <div style="color: #c9d1d9; font-size: 0.88rem;">${ed.school}</div>
                <div class="cli-card-meta">${ed.timeline} ${ed.meta ? `&nbsp;|&nbsp; <strong>${ed.meta}</strong>` : ''}</div>
              </div>
            `;
          });
          eduHtml += `</div>`;
          appendOutput(eduHtml);
          break;

        case 'certs':
        case 'certifications':
        case 'awards':
        case 'achievements':
          let certHtml = `
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>Certifications (${cvData.certifications.length}):</strong></p>
              <table class="cli-table">
          `;
          cvData.certifications.forEach(c => {
            certHtml += `<tr><td>${c.org}</td><td>${c.name} <span class="cli-card-meta">(${c.date})</span></td></tr>`;
          });
          certHtml += `</table><p class="cli-highlight" style="margin-top: 14px;"><strong>Honors & Key Milestones:</strong></p>`;
          cvData.achievements.forEach(a => {
            certHtml += `
              <div style="margin: 6px 0; font-size: 0.85rem;">
                ${a.icon} <strong>${a.title}</strong> — <span style="color:#8b949e;">${a.desc}</span>
              </div>
            `;
          });
          certHtml += `</div>`;
          appendOutput(certHtml);
          break;

        case 'contact':
        case 'socials':
        case 'email':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-highlight"><strong>Get In Touch:</strong></p>
              <table class="cli-table">
                <tr><td>📧 Email:</td><td><a href="mailto:${cvData.email}" class="cli-link">${cvData.email}</a></td></tr>
                <tr><td>📞 Phone:</td><td><a href="tel:${cvData.phone}" class="cli-link">${cvData.phone}</a></td></tr>
                <tr><td>💼 LinkedIn:</td><td><a href="${cvData.linkedin}" target="_blank" class="cli-link">${cvData.linkedin}</a></td></tr>
                <tr><td>🐙 GitHub:</td><td><a href="${cvData.github}" target="_blank" class="cli-link">${cvData.github}</a></td></tr>
                <tr><td>💻 LeetCode:</td><td><a href="${cvData.leetcode}" target="_blank" class="cli-link">${cvData.leetcode}</a></td></tr>
              </table>
            </div>
          `);
          break;

        case 'all':
        case 'full':
        case 'cv':
        case 'resume':
          appendOutput(`
            <div class="cli-output-block">
              <pre class="cli-ascii" style="font-size: 0.55rem;">
================================================================================
                    SHUBHAM KUMAR — RESUME CLI DUMP
================================================================================
              </pre>
              <p><strong>${cvData.name}</strong> | ${cvData.email} | ${cvData.phone}</p>
              <p>${cvData.linkedin} | ${cvData.github}</p>
              <p style="margin: 8px 0; color: #8b949e;">${cvData.title}</p>
              <p>🎓 <strong>LPU B.Tech CSE (Class of 2027)</strong> — CGPA: <strong>${cvData.cgpa}</strong></p>
              <p>🏆 <strong>LeetCode:</strong> 500+ Solved | 1750+ Rating</p>
              <p>⚡ <strong>Key Skills:</strong> ${cvData.skills.languages.join(', ')} | ${cvData.skills.web.slice(0, 4).join(', ')} | ${cvData.skills.databasesAndTools.slice(0, 4).join(', ')}</p>
              <div style="margin-top: 10px;">
                <a href="Shubham_Kumar_SDE_Intern_CV_Acko%20(2).pdf" download="Shubham_Kumar_CV.pdf" class="btn-primary" style="padding: 6px 16px; font-size: 0.78rem; text-decoration: none;">↓ Download PDF CV</a>
              </div>
            </div>
          `);
          break;

        case 'download':
          appendOutput(`
            <div class="cli-output-block">
              <p class="cli-success">📄 Triggering CV download...</p>
              <p>If download doesn't begin automatically, <a href="Shubham_Kumar_SDE_Intern_CV_Acko%20(2).pdf" download="Shubham_Kumar_CV.pdf" class="cli-link">click here to download the PDF CV</a>.</p>
            </div>
          `);
          const dlLink = document.createElement('a');
          dlLink.href = 'Shubham_Kumar_SDE_Intern_CV_Acko%20(2).pdf';
          dlLink.download = 'Shubham_Kumar_CV.pdf';
          document.body.appendChild(dlLink);
          dlLink.click();
          dlLink.remove();
          break;

        case 'theme':
          const themeName = arg.trim();
          if (themeName === 'matrix') {
            cliTerminal.style.background = '#031408';
            cliTerminal.style.borderColor = '#00ff41';
            cliTerminal.style.boxShadow = '0 0 25px rgba(0,255,65,0.2)';
            appendOutput(`<p class="cli-success">Terminal theme switched to: <strong>Matrix</strong> 🕶️</p>`);
          } else if (themeName === 'cyber' || themeName === 'cyan') {
            cliTerminal.style.background = '#05131e';
            cliTerminal.style.borderColor = '#00e5ff';
            cliTerminal.style.boxShadow = '0 0 25px rgba(0,229,255,0.2)';
            appendOutput(`<p class="cli-info">Terminal theme switched to: <strong>Cyber Cyan</strong> 🌐</p>`);
          } else if (themeName === 'amber' || themeName === 'retro') {
            cliTerminal.style.background = '#1a0e03';
            cliTerminal.style.borderColor = '#ffb300';
            cliTerminal.style.boxShadow = '0 0 25px rgba(255,179,0,0.2)';
            appendOutput(`<p style="color: #ffb300;">Terminal theme switched to: <strong>Amber Retro</strong> 📻</p>`);
          } else {
            cliTerminal.style.background = '#0d1117';
            cliTerminal.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            cliTerminal.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(226, 117, 0, 0.08)';
            appendOutput(`<p class="cli-highlight">Terminal theme reset to <strong>Default</strong>. Options: <code>theme matrix</code>, <code>theme cyber</code>, <code>theme amber</code>, <code>theme default</code></p>`);
          }
          break;

        case 'clear':
        case 'cls':
          cliOutput.innerHTML = '';
          break;

        case 'fullscreen':
          cliTerminal.classList.toggle('is-fullscreen');
          const isFull = cliTerminal.classList.contains('is-fullscreen');
          appendOutput(`<p class="cli-info">Fullscreen mode: <strong>${isFull ? 'ON (press ESC or click button to exit)' : 'OFF'}</strong></p>`);
          break;

        case 'date':
        case 'time':
          appendOutput(`<p class="cli-info">🕒 Current System Time: ${new Date().toLocaleString()}</p>`);
          break;

        case 'echo':
          appendOutput(`<p>${escapeHTML(arg)}</p>`);
          break;

        default:
          appendOutput(`
            <p class="cli-error">command not found: <code>${escapeHTML(trimmed)}</code></p>
            <p style="color: #8b949e; font-size: 0.8rem;">Type <span class="cli-highlight">help</span> to view available commands.</p>
          `);
          break;
      }
    }

    function escapeHTML(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Input keyboard events
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = cliInput.value;
        cliInput.value = '';
        processCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          cliInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          cliInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          cliInput.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = cliInput.value.trim().toLowerCase();
        if (!current) return;
        const available = [
          'help', 'about', 'bio', 'skills', 'projects', 'project', 'leetcode',
          'experience', 'education', 'certs', 'achievements', 'contact', 'cv',
          'download', 'theme', 'clear', 'fullscreen'
        ];
        const match = available.find(c => c.startsWith(current));
        if (match) cliInput.value = match;
      }
    });

    // Clicking quick chips runs the command
    cliChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          cliInput.value = '';
          processCommand(cmd);
          cliInput.focus();
        }
      });
    });

    // Window control buttons
    const redDot = cliTerminal.querySelector('.cli-dot-red');
    const yellowDot = cliTerminal.querySelector('.cli-dot-yellow');
    const greenDot = cliTerminal.querySelector('.cli-dot-green');

    if (redDot) {
      redDot.addEventListener('click', () => {
        cliOutput.innerHTML = '';
        appendOutput('<p style="color: #8b949e;">Terminal cleared.</p>');
      });
    }

    if (yellowDot) {
      yellowDot.addEventListener('click', () => {
        cliTerminal.classList.remove('is-fullscreen');
        window.scrollBy({ top: 300, behavior: 'smooth' });
      });
    }

    if (greenDot) {
      greenDot.addEventListener('click', () => {
        cliTerminal.classList.toggle('is-fullscreen');
      });
    }

    if (cliFullscreenBtn) {
      cliFullscreenBtn.addEventListener('click', () => {
        cliTerminal.classList.toggle('is-fullscreen');
      });
    }

    // Escape exits fullscreen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cliTerminal.classList.contains('is-fullscreen')) {
        cliTerminal.classList.remove('is-fullscreen');
      }
    });

    // Keep focus inside terminal when clicking anywhere in cliBody
    cliTerminal.querySelector('.cli-body')?.addEventListener('click', (e) => {
      if (!window.getSelection().toString()) {
        cliInput.focus();
      }
    });
  }

  /* ── INITIAL CHECKS ── */
  setTimeout(() => { checkAnims(); highlightBottomNav(); }, 150);
});
