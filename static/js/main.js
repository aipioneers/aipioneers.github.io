/* ===== Main JavaScript — Pioneers.ai ===== */

(function () {
  'use strict';

  /* --- Nav Scroll Behavior (T012) --- */
  const nav = document.querySelector('.nav');
  let ticking = false;

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  /* --- Mobile Nav Toggle (T012, T033) --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  let backdrop = null;

  function openNav() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    navToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }
    requestAnimationFrame(function () {
      backdrop.classList.add('visible');
    });
    backdrop.addEventListener('click', closeNav);
  }

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (backdrop) {
      backdrop.classList.remove('visible');
      backdrop.removeEventListener('click', closeNav);
    }
  }

  navToggle?.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      closeNav();
    }
  });

  /* --- Particle System (T015) --- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('hero-particles');

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let animId = null;
    let width, height;

    function getParticleCount() {
      if (window.innerWidth < 480) return 20;
      if (window.innerWidth < 768) return 40;
      return 100;
    }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    function createParticles() {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1,
          opacity: Math.random() * 0.08 + 0.02
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, ' + p.opacity + ')';
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    function init() {
      resize();
      createParticles();
      draw();
    }

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createParticles();
      }, 200);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    });

    init();
  }

  /* --- Scroll Reveal (T035) --- */
  const reveals = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
  } else if (reveals.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* --- Copy to Clipboard (T038) --- */
  window.copyText = function (el, text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(el);
      }).catch(function () {
        fallbackCopy(el, text);
      });
    } else {
      fallbackCopy(el, text);
    }
  };

  function fallbackCopy(el, text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopied(el); } catch (e) { /* silent */ }
    document.body.removeChild(ta);
  }

  function showCopied(el) {
    el.classList.add('copied');
    setTimeout(function () { el.classList.remove('copied'); }, 2000);
  }

})();
