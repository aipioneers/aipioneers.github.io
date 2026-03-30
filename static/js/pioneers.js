/* ===== Pioneer Text Particle System ===== */
/* Particles converge to form pioneer NAMES as readable text,
   with quotes fading in below. */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  /* --- Pioneer Data --- */
  var PIONEERS = [
    { name: 'Ada Lovelace', years: '1815\u20131852', quote: 'That brain of mine is something more than merely mortal.' },
    { name: 'Marie Curie', years: '1867\u20131934', quote: 'Nothing in life is to be feared, it is only to be understood.' },
    { name: 'Alan Turing', years: '1912\u20131954', quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.' },
    { name: 'Nikola Tesla', years: '1856\u20131943', quote: 'The present is theirs; the future, for which I really worked, is mine.' },
    { name: 'Grace Hopper', years: '1906\u20131992', quote: 'The most dangerous phrase is: We\u2019ve always done it this way.' },
    { name: 'Margaret Hamilton', years: '1936\u2013', quote: 'There was no choice but to be pioneers.' },
    { name: 'Albert Einstein', years: '1879\u20131955', quote: 'Imagination is more important than knowledge.' },
    { name: 'Steve Jobs', years: '1955\u20132011', quote: 'The people who are crazy enough to think they can change the world are the ones who do.' },
    { name: 'Linus Torvalds', years: '1969\u2013', quote: 'Talk is cheap. Show me the code.' },
    { name: 'Tim Berners-Lee', years: '1955\u2013', quote: 'The web is more a social creation than a technical one.' }
  ];

  /* --- Text-to-Points Sampling --- */
  var PARTICLE_COUNT = 350;
  var OFF_W = 900;
  var OFF_H = 180;

  function sampleText(text) {
    var off = document.createElement('canvas');
    off.width = OFF_W;
    off.height = OFF_H;
    var oc = off.getContext('2d');

    // Auto-size: shrink until text fits 90% of canvas width
    var fontSize = 140;
    var fontFamily = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Helvetica, Arial, sans-serif';
    oc.font = '700 ' + fontSize + 'px ' + fontFamily;
    while (oc.measureText(text).width > OFF_W * 0.92 && fontSize > 30) {
      fontSize -= 4;
      oc.font = '700 ' + fontSize + 'px ' + fontFamily;
    }

    oc.fillStyle = '#000';
    oc.textAlign = 'center';
    oc.textBaseline = 'middle';
    oc.fillText(text, OFF_W / 2, OFF_H / 2);

    // Scan filled pixels
    var data = oc.getImageData(0, 0, OFF_W, OFF_H).data;
    var filled = [];
    for (var y = 0; y < OFF_H; y += 2) {
      for (var x = 0; x < OFF_W; x += 2) {
        if (data[(y * OFF_W + x) * 4 + 3] > 100) {
          filled.push({ x: x / OFF_W, y: y / OFF_H });
        }
      }
    }

    // Fisher-Yates shuffle, then pick PARTICLE_COUNT
    for (var i = filled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = filled[i]; filled[i] = filled[j]; filled[j] = t;
    }
    return filled.slice(0, PARTICLE_COUNT);
  }

  // Pre-sample every name
  var textPoints = [];
  for (var p = 0; p < PIONEERS.length; p++) {
    textPoints.push(sampleText(PIONEERS[p].name));
  }

  /* --- Canvas & Particles --- */
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var mouse = { x: -1000, y: -1000 };
  var animId = null;
  var width, height;
  var CONNECT_DIST = 100;

  function getCount() {
    if (window.innerWidth < 480) return 150;
    if (window.innerWidth < 768) return 250;
    return PARTICLE_COUNT;
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
    var count = getCount();
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.12 + 0.04,
        tx: 0,
        ty: 0
      });
    }
  }

  /* --- State Machine --- */
  var state = 'hero';        // hero → fadeout → converging → formed → dispersing → fadein → hero
  var stateStart = 0;
  var pioneerIdx = -1;
  var progress = 0;           // 0 = drifting, 1 = fully formed

  var HERO_MS    = 6000;      // hero content visible
  var FADEOUT_MS = 900;       // hero fades out
  var CONVERGE_MS = 2800;     // particles converge
  var HOLD_MS    = 5000;      // text + quote hold
  var DISPERSE_MS = 1800;     // particles scatter
  var FADEIN_MS  = 900;       // hero fades back in

  // DOM refs
  var heroContent = document.querySelector('.hero-content');
  var quoteEl  = document.querySelector('.pioneer-quote');
  var nameEl   = quoteEl ? quoteEl.querySelector('.pioneer-name') : null;
  var yearsEl  = quoteEl ? quoteEl.querySelector('.pioneer-years') : null;
  var textEl   = quoteEl ? quoteEl.querySelector('.pioneer-text') : null;

  function showQuote(pioneer) {
    if (!quoteEl) return;
    if (nameEl)  nameEl.textContent  = pioneer.name;
    if (yearsEl) yearsEl.textContent = pioneer.years;
    if (textEl)  textEl.textContent  = '\u201C' + pioneer.quote + '\u201D';
    quoteEl.classList.add('visible');
  }

  function hideQuote() {
    if (quoteEl) quoteEl.classList.remove('visible');
  }

  function fadeHeroOut() {
    if (heroContent) {
      heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(-20px)';
      heroContent.style.pointerEvents = 'none';
    }
  }

  function fadeHeroIn() {
    if (heroContent) {
      heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
      heroContent.style.pointerEvents = '';
      // Clear inline styles after transition so scroll parallax works again
      setTimeout(function () {
        if (state === 'hero') {
          heroContent.style.transition = '';
          heroContent.style.opacity = '';
          heroContent.style.transform = '';
        }
      }, 1000);
    }
  }

  function assignTargets() {
    var points = textPoints[pioneerIdx];
    if (!points) return;

    // Scale text to fill ~80% of hero width, centered
    var textW = Math.min(width * 0.82, 750);
    var textH = textW * (OFF_H / OFF_W);
    var offX = (width - textW) / 2;
    var offY = (height - textH) / 2 - height * 0.04;

    for (var i = 0; i < particles.length; i++) {
      if (i < points.length) {
        particles[i].tx = offX + points[i].x * textW;
        particles[i].ty = offY + points[i].y * textH;
      } else {
        // Scatter extra particles softly around edges
        var angle = Math.random() * Math.PI * 2;
        var dist  = Math.random() * 200 + 150;
        particles[i].tx = width / 2 + Math.cos(angle) * dist;
        particles[i].ty = height / 2 + Math.sin(angle) * dist;
      }
    }
  }

  function nextPioneer() {
    pioneerIdx = (pioneerIdx + 1) % PIONEERS.length;
    assignTargets();
  }

  /* --- Easing --- */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* --- Main Draw Loop --- */
  function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = Date.now();
    var elapsed = now - stateStart;

    // --- State transitions ---
    switch (state) {
      case 'hero':
        progress = 0;
        if (elapsed > HERO_MS) {
          state = 'fadeout';
          stateStart = now;
          fadeHeroOut();
          nextPioneer();
        }
        break;

      case 'fadeout':
        progress = 0;
        if (elapsed >= FADEOUT_MS) {
          state = 'converging';
          stateStart = now;
        }
        break;

      case 'converging':
        progress = easeInOutCubic(Math.min(elapsed / CONVERGE_MS, 1));
        if (elapsed >= CONVERGE_MS) {
          state = 'formed';
          stateStart = now;
          progress = 1;
          showQuote(PIONEERS[pioneerIdx]);
        }
        break;

      case 'formed':
        progress = 1;
        if (elapsed >= HOLD_MS) {
          state = 'dispersing';
          stateStart = now;
          hideQuote();
        }
        break;

      case 'dispersing':
        progress = 1 - easeInOutCubic(Math.min(elapsed / DISPERSE_MS, 1));
        if (elapsed >= DISPERSE_MS) {
          state = 'fadein';
          stateStart = now;
          progress = 0;
          fadeHeroIn();
          // Burst velocity for scatter
          for (var d = 0; d < particles.length; d++) {
            particles[d].vx = (Math.random() - 0.5) * 1.5;
            particles[d].vy = (Math.random() - 0.5) * 1.5;
          }
        }
        break;

      case 'fadein':
        progress = 0;
        if (elapsed >= FADEIN_MS) {
          state = 'hero';
          stateStart = now;
        }
        break;
    }

    // --- Draw particles ---
    var connAlpha = (1 - progress) * 0.06;

    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];

      if (progress > 0.01) {
        // Move toward target
        pt.x += (pt.tx - pt.x) * progress * 0.08;
        pt.y += (pt.ty - pt.y) * progress * 0.08;

        // Subtle breathing when fully formed
        if (state === 'formed') {
          pt.x += Math.sin(now * 0.001 + i * 0.7) * 0.25;
          pt.y += Math.cos(now * 0.0013 + i * 0.9) * 0.25;
        }

        pt.vx *= 0.9;
        pt.vy *= 0.9;
      } else {
        // Free drift
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Dampen burst velocity
        if (Math.abs(pt.vx) > 0.5) pt.vx *= 0.99;
        if (Math.abs(pt.vy) > 0.5) pt.vy *= 0.99;

        // Wrap edges
        if (pt.x < -10) pt.x = width + 10;
        if (pt.x > width + 10) pt.x = -10;
        if (pt.y < -10) pt.y = height + 10;
        if (pt.y > height + 10) pt.y = -10;
      }

      // Mouse repulsion (reduced during formation)
      var mx = pt.x - mouse.x;
      var my = pt.y - mouse.y;
      var md = Math.sqrt(mx * mx + my * my);
      if (md < 150) {
        var mf = (150 - md) / 150 * 0.02 * (1 - progress * 0.85);
        pt.vx += mx / md * mf;
        pt.vy += my / md * mf;
        pt.vx *= 0.99;
        pt.vy *= 0.99;
      }

      // Connection lines (fade as particles form text)
      if (connAlpha > 0.003) {
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var cdx = pt.x - p2.x;
          var cdy = pt.y - p2.y;
          var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECT_DIST) {
            var a = (1 - cdist / CONNECT_DIST) * connAlpha;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + a + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particle dot (gets bigger and brighter during formation)
      var alpha  = pt.opacity + progress * 0.25;
      var radius = pt.r + progress * 0.8;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 113, 227, ' + alpha + ')';
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  /* --- Init --- */
  function init() {
    resize();
    createParticles();
    stateStart = Date.now();
    draw();
  }

  // Mouse tracking on hero
  var hero = canvas.parentElement;
  hero.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Responsive resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      createParticles();
      if (progress > 0 && pioneerIdx >= 0) assignTargets();
    }, 200);
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      stateStart = Date.now();
      draw();
    }
  });

  // Signal to main.js to skip basic particle system
  window.__pioneersActive = true;

  init();
})();
