/* ===== Main JavaScript — Pioneers.ai ===== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Nav Scroll Behavior --- */
  var nav = document.querySelector('.nav');
  var ticking = false;

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

  /* --- Mobile Nav Toggle --- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var backdrop = null;

  function openNav() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
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
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (backdrop) {
      backdrop.classList.remove('visible');
      backdrop.removeEventListener('click', closeNav);
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeNav();
    }
  });

  /* --- Hero Text Reveal Animation --- */
  var heroWords = document.querySelectorAll('.hero-word');
  var heroCta = document.querySelector('.hero-cta');

  if (heroWords.length > 0 && !prefersReducedMotion) {
    requestAnimationFrame(function () {
      heroWords.forEach(function (word) {
        word.classList.add('hero-word--visible');
      });
      if (heroCta) {
        setTimeout(function () {
          heroCta.classList.add('hero-cta--visible');
        }, 800);
      }
    });
  } else {
    heroWords.forEach(function (word) {
      word.classList.add('hero-word--visible');
    });
    if (heroCta) heroCta.classList.add('hero-cta--visible');
  }

  /* --- Hero Scroll Parallax --- */
  var hero = document.querySelector('.hero');
  var heroContent = document.querySelector('.hero-content');
  var heroDecorations = document.querySelectorAll('.hero-decoration');
  var heroGradient = document.querySelector('.hero-gradient');
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');
  var parallaxTicking = false;

  function updateParallax() {
    if (!hero || prefersReducedMotion) return;
    var scrollY = window.scrollY;
    var heroHeight = hero.offsetHeight;
    var progress = Math.min(scrollY / heroHeight, 1);

    // Content fades and moves up
    if (heroContent) {
      heroContent.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
      heroContent.style.opacity = 1 - progress * 1.5;
    }

    // Decorations drift with parallax
    heroDecorations.forEach(function (dec, i) {
      var speed = 0.1 + (i * 0.05);
      dec.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });

    // Gradient shifts
    if (heroGradient) {
      heroGradient.style.opacity = 1 - progress;
    }

    // Scroll indicator fades
    if (scrollIndicator) {
      scrollIndicator.style.opacity = 1 - progress * 3;
    }

    parallaxTicking = false;
  }

  if (hero && !prefersReducedMotion) {
    window.addEventListener('scroll', function () {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
  }

  /* --- Particle System with Connection Lines --- */
  var canvas = document.getElementById('hero-particles');

  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var mouse = { x: -1000, y: -1000 };
    var animId = null;
    var width, height;
    var connectionDistance = 120;

    function getParticleCount() {
      if (window.innerWidth < 480) return 25;
      if (window.innerWidth < 768) return 45;
      return 80;
    }

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      var count = getParticleCount();
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.15 + 0.05
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (var i = 0; i < particles.length; i++) {
        var p1 = particles[i];
        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < -10) p1.x = width + 10;
        if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        if (p1.y > height + 10) p1.y = -10;

        // Mouse interaction — gentle repulsion
        var dx = p1.x - mouse.x;
        var dy = p1.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          var force = (150 - dist) / 150 * 0.02;
          p1.vx += dx / dist * force;
          p1.vy += dy / dist * force;
          // Dampen velocity
          p1.vx *= 0.99;
          p1.vy *= 0.99;
        }

        // Draw connections to nearby particles
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var cdx = p1.x - p2.x;
          var cdy = p1.y - p2.y;
          var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < connectionDistance) {
            var alpha = (1 - cdist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, ' + p1.opacity + ')';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function init() {
      resize();
      createParticles();
      draw();
    }

    // Track mouse over hero for interactive particles
    hero.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', function () {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    var resizeTimer;
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

  /* --- Scroll Reveal with Multiple Effects --- */
  var reveals = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
  } else if (reveals.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* --- Scroll-Linked Section Scale Effect --- */
  var scaleSections = document.querySelectorAll('.scroll-scale');

  if (scaleSections.length > 0 && !prefersReducedMotion) {
    var scaleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var ratio = entry.intersectionRatio;
          var scale = 0.95 + (ratio * 0.05);
          var opacity = 0.4 + (ratio * 0.6);
          entry.target.style.transform = 'scale(' + scale + ')';
          entry.target.style.opacity = opacity;
        }
      });
    }, { threshold: buildThresholdArray() });

    scaleSections.forEach(function (el) { scaleObserver.observe(el); });
  }

  function buildThresholdArray() {
    var thresholds = [];
    for (var i = 0; i <= 20; i++) {
      thresholds.push(i / 20);
    }
    return thresholds;
  }

  /* --- Smooth Counter Animation --- */
  var counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 1500;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* --- Copy to Clipboard --- */
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
