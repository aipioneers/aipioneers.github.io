/* ===== Pioneer Silhouette Particle System ===== */
/* Particles converge to form silhouettes derived from real photographs
   of historical pioneers via AI background-removal. Each silhouette PNG
   is loaded, drawn to an offscreen canvas, and pixel-sampled into a
   dense point cloud (2 000+ particles). */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  /* ================================================================
     Pioneer data — `img` is the filename in /img/pioneers/<name>.png
     ================================================================ */

  var PIONEERS = [
    { name: 'Ada Lovelace', years: '1815\u20131852',
      quote: 'That brain of mine is something more than merely mortal.',
      img: 'lovelace' },

    { name: 'Marie Curie', years: '1867\u20131934',
      quote: 'Nothing in life is to be feared, it is only to be understood.',
      img: 'curie' },

    { name: 'Alan Turing', years: '1912\u20131954',
      quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
      img: 'turing' },

    { name: 'Albert Einstein', years: '1879\u20131955',
      quote: 'Imagination is more important than knowledge.',
      img: 'einstein' },

    { name: 'Nikola Tesla', years: '1856\u20131943',
      quote: 'The present is theirs; the future, for which I really worked, is mine.',
      img: 'tesla' },

    { name: 'Grace Hopper', years: '1906\u20131992',
      quote: 'The most dangerous phrase is: We\u2019ve always done it this way.',
      img: 'hopper' },

    { name: 'Steve Jobs', years: '1955\u20132011',
      quote: 'The people who are crazy enough to think they can change the world are the ones who do.',
      img: 'jobs' },

    { name: 'Margaret Hamilton', years: '1936\u2013',
      quote: 'There was no choice but to be pioneers.',
      img: 'hamilton' },

    { name: 'Linus Torvalds', years: '1969\u2013',
      quote: 'Talk is cheap. Show me the code.',
      img: 'torvalds' },

    { name: 'Tim Berners-Lee', years: '1955\u2013',
      quote: 'The web is more a social creation than a technical one.',
      img: 'berners-lee' }
  ];

  /* ================================================================
     Silhouette Sampling — load each PNG, draw to offscreen canvas,
     collect filled-pixel coordinates as a dense point cloud.
     ================================================================ */
  var PARTICLE_COUNT = 2500;
  var OFF_W = 400;
  var OFF_H = 500;
  var BASE_PATH = (document.querySelector('script[src*="pioneers"]') || {}).src || '';
  // Derive base URL from script's own location
  BASE_PATH = BASE_PATH.replace(/js\/pioneers\.js.*$/, '') + 'img/pioneers/';

  function sampleImagePixels(img) {
    var off = document.createElement('canvas');
    off.width = OFF_W;
    off.height = OFF_H;
    var oc = off.getContext('2d');

    // Clear to white, draw silhouette (black on transparent)
    oc.fillStyle = '#fff';
    oc.fillRect(0, 0, OFF_W, OFF_H);

    // Center the image on the offscreen canvas
    var scale = Math.min(OFF_W / img.naturalWidth, OFF_H / img.naturalHeight);
    var dw = img.naturalWidth * scale;
    var dh = img.naturalHeight * scale;
    var dx = (OFF_W - dw) / 2;
    var dy = (OFF_H - dh) / 2;
    oc.drawImage(img, dx, dy, dw, dh);

    var data = oc.getImageData(0, 0, OFF_W, OFF_H).data;
    var edges = [];
    var interior = [];

    // Classify each dark pixel as edge or interior
    function isDark(x, y) {
      if (x < 0 || x >= OFF_W || y < 0 || y >= OFF_H) return false;
      var i = (y * OFF_W + x) * 4;
      return data[i + 3] > 128 && data[i] < 80 && data[i + 1] < 80 && data[i + 2] < 80;
    }

    for (var y = 0; y < OFF_H; y += 1) {
      for (var x = 0; x < OFF_W; x += 1) {
        if (!isDark(x, y)) continue;
        var pt = { x: x / OFF_W, y: y / OFF_H };
        // Edge pixel: at least one non-dark neighbour
        if (!isDark(x - 1, y) || !isDark(x + 1, y) ||
            !isDark(x, y - 1) || !isDark(x, y + 1)) {
          edges.push(pt);
        } else {
          interior.push(pt);
        }
      }
    }

    // Shuffle both arrays (Fisher-Yates)
    function shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
    }
    shuffle(edges);
    shuffle(interior);

    // 40% edge particles for sharp outline, 60% interior for fill
    var edgeCount = Math.min(Math.floor(PARTICLE_COUNT * 0.4), edges.length);
    var intCount  = Math.min(PARTICLE_COUNT - edgeCount, interior.length);
    return edges.slice(0, edgeCount).concat(interior.slice(0, intCount));
  }

  /* ================================================================
     Load all silhouette PNGs + reference photos, then initialise
     ================================================================ */
  var silhouettePoints = new Array(PIONEERS.length);
  var photoImages = new Array(PIONEERS.length); // original photos for ghost overlay
  var imagesLoaded = 0;
  var totalToLoad = PIONEERS.length * 2; // silhouette + photo per pioneer

  function checkAllLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalToLoad) initAnimation();
  }

  for (var p = 0; p < PIONEERS.length; p++) {
    (function (idx) {
      // Load silhouette PNG
      var sil = new Image();
      sil.crossOrigin = 'anonymous';
      sil.onload = function () {
        silhouettePoints[idx] = sampleImagePixels(sil);
        checkAllLoaded();
      };
      sil.onerror = function () {
        var pts = [];
        for (var i = 0; i < PARTICLE_COUNT; i++) {
          var angle = Math.random() * Math.PI * 2;
          var rad = Math.random() * 0.3;
          pts.push({ x: 0.5 + Math.cos(angle) * rad, y: 0.45 + Math.sin(angle) * rad });
        }
        silhouettePoints[idx] = pts;
        checkAllLoaded();
      };
      sil.src = BASE_PATH + PIONEERS[idx].img + '.png';

      // Load reference photo (grayscale JPEG)
      var photo = new Image();
      photo.crossOrigin = 'anonymous';
      photo.onload = function () { photoImages[idx] = photo; checkAllLoaded(); };
      photo.onerror = function () { photoImages[idx] = null; checkAllLoaded(); };
      photo.src = BASE_PATH + PIONEERS[idx].img + '-photo.jpg';
    })(p);
  }

  /* ================================================================
     Canvas & Particle System
     ================================================================ */
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var mouse = { x: -1000, y: -1000 };
  var animId = null;
  var width, height;
  var CONNECT_DIST = 70;

  function getCount() {
    if (window.innerWidth < 480) return 800;
    if (window.innerWidth < 768) return 1400;
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
        r: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.10 + 0.03,
        tx: 0, ty: 0
      });
    }
  }

  /* ================================================================
     State Machine
     ================================================================ */
  var state = 'hero';
  var stateStart = 0;
  var pioneerIdx = -1;
  var progress = 0;

  var HERO_MS     = 6000;
  var FADEOUT_MS  = 900;
  var CONVERGE_MS = 2800;
  var HOLD_MS     = 5000;
  var DISPERSE_MS = 1600;
  var FADEIN_MS   = 900;

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
    var points = silhouettePoints[pioneerIdx];
    if (!points) return;

    // Fit silhouette into hero: height-based sizing, horizontally centered
    var silH = Math.min(height * 0.78, 580);
    var silW = silH * (OFF_W / OFF_H);
    var offX = (width - silW) / 2;
    var offY = (height - silH) / 2 - height * 0.02;

    for (var i = 0; i < particles.length; i++) {
      if (i < points.length) {
        particles[i].tx = offX + points[i].x * silW;
        particles[i].ty = offY + points[i].y * silH;
      } else {
        // Scatter overflow particles around the silhouette area
        var angle = Math.random() * Math.PI * 2;
        var dist  = Math.random() * 180 + 120;
        particles[i].tx = width / 2 + Math.cos(angle) * dist;
        particles[i].ty = height / 2 + Math.sin(angle) * dist;
      }
    }
  }

  function nextPioneer() {
    pioneerIdx = (pioneerIdx + 1) % PIONEERS.length;
    assignTargets();
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ================================================================
     Main Draw Loop
     ================================================================ */
  function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = Date.now();
    var elapsed = now - stateStart;

    switch (state) {
      case 'hero':
        progress = 0;
        if (elapsed > HERO_MS) {
          state = 'fadeout'; stateStart = now;
          fadeHeroOut(); nextPioneer();
        }
        break;
      case 'fadeout':
        progress = 0;
        if (elapsed >= FADEOUT_MS) { state = 'converging'; stateStart = now; }
        break;
      case 'converging':
        progress = easeInOutCubic(Math.min(elapsed / CONVERGE_MS, 1));
        if (elapsed >= CONVERGE_MS) {
          state = 'formed'; stateStart = now; progress = 1;
          showQuote(PIONEERS[pioneerIdx]);
        }
        break;
      case 'formed':
        progress = 1;
        if (elapsed >= HOLD_MS) { state = 'dispersing'; stateStart = now; hideQuote(); }
        break;
      case 'dispersing':
        progress = 1 - easeInOutCubic(Math.min(elapsed / DISPERSE_MS, 1));
        if (elapsed >= DISPERSE_MS) {
          state = 'fadein'; stateStart = now; progress = 0; fadeHeroIn();
          for (var d = 0; d < particles.length; d++) {
            particles[d].vx = (Math.random() - 0.5) * 1.5;
            particles[d].vy = (Math.random() - 0.5) * 1.5;
          }
        }
        break;
      case 'fadein':
        progress = 0;
        if (elapsed >= FADEIN_MS) { state = 'hero'; stateStart = now; }
        break;
    }

    // --- Ghost photo behind particles ---
    if (progress > 0.3 && pioneerIdx >= 0 && photoImages[pioneerIdx]) {
      var photo = photoImages[pioneerIdx];
      var silH = Math.min(height * 0.78, 580);
      var silW = silH * (OFF_W / OFF_H);
      var pScale = Math.min(silW / photo.naturalWidth, silH / photo.naturalHeight);
      var pw = photo.naturalWidth * pScale;
      var ph = photo.naturalHeight * pScale;
      var px = (width - pw) / 2;
      var py = (height - ph) / 2 - height * 0.02;
      // Fade in gently: max ~8% opacity
      var ghostAlpha = Math.min((progress - 0.3) / 0.7, 1) * 0.08;
      ctx.save();
      ctx.globalAlpha = ghostAlpha;
      ctx.drawImage(photo, px, py, pw, ph);
      ctx.restore();
    }

    // --- Draw particles ---
    var connAlpha = (1 - progress) * 0.05;
    var skipConn = 3; // check every Nth particle pair for connections (perf)

    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];

      if (progress > 0.01) {
        pt.x += (pt.tx - pt.x) * progress * 0.08;
        pt.y += (pt.ty - pt.y) * progress * 0.08;
        if (state === 'formed') {
          // Gentle breathing motion
          pt.x += Math.sin(now * 0.0008 + i * 0.5) * 0.15;
          pt.y += Math.cos(now * 0.001 + i * 0.7) * 0.15;
        }
        pt.vx *= 0.9; pt.vy *= 0.9;
      } else {
        pt.x += pt.vx; pt.y += pt.vy;
        if (Math.abs(pt.vx) > 0.5) pt.vx *= 0.99;
        if (Math.abs(pt.vy) > 0.5) pt.vy *= 0.99;
        if (pt.x < -10) pt.x = width + 10;
        if (pt.x > width + 10) pt.x = -10;
        if (pt.y < -10) pt.y = height + 10;
        if (pt.y > height + 10) pt.y = -10;
      }

      // Mouse repulsion
      var mx = pt.x - mouse.x, my = pt.y - mouse.y;
      var md = Math.sqrt(mx * mx + my * my);
      if (md < 120) {
        var mf = (120 - md) / 120 * 0.015 * (1 - progress * 0.85);
        pt.vx += mx / md * mf; pt.vy += my / md * mf;
        pt.vx *= 0.99; pt.vy *= 0.99;
      }

      // Connection lines (only during free-floating, sampled for perf)
      if (connAlpha > 0.003 && i % skipConn === 0) {
        for (var j = i + skipConn; j < particles.length; j += skipConn) {
          var p2 = particles[j];
          var cdx = pt.x - p2.x, cdy = pt.y - p2.y;
          var cdist = cdx * cdx + cdy * cdy;
          if (cdist < CONNECT_DIST * CONNECT_DIST) {
            cdist = Math.sqrt(cdist);
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + ((1 - cdist / CONNECT_DIST) * connAlpha) + ')';
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Particle dot
      var alpha  = pt.opacity + progress * 0.25;
      var radius = pt.r + progress * 0.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 113, 227, ' + alpha + ')';
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  /* ================================================================
     Init & Event Listeners
     ================================================================ */
  function initAnimation() {
    resize(); createParticles();
    stateStart = Date.now();
    draw();
  }

  var hero = canvas.parentElement;
  hero.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', function () {
    mouse.x = -1000; mouse.y = -1000;
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize(); createParticles();
      if (progress > 0 && pioneerIdx >= 0) assignTargets();
    }, 200);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(animId); }
    else { stateStart = Date.now(); draw(); }
  });

  window.__pioneersActive = true;
})();
