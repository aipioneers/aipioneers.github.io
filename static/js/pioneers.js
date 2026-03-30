/* ===== Pioneer Silhouette Particle System ===== */
/* Particles converge to form silhouettes of historical pioneers,
   with quotes fading in. Enhances the hero-particles canvas. */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  /* --- Pioneer Data --- */
  var PIONEERS = [
    {
      name: 'Ada Lovelace',
      years: '1815\u20131852',
      quote: 'That brain of mine is something more than merely mortal.',
      draw: function (c, cx, cy, s) {
        // Victorian updo silhouette
        c.beginPath();
        // Shoulders
        c.moveTo(cx - s * 0.38, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.35, cy + s * 0.2, cx - s * 0.12, cy + s * 0.12);
        // Neck left
        c.lineTo(cx - s * 0.08, cy - s * 0.05);
        // Head left
        c.quadraticCurveTo(cx - s * 0.18, cy - s * 0.12, cx - s * 0.16, cy - s * 0.25);
        // Hair left - upswept Victorian style
        c.quadraticCurveTo(cx - s * 0.2, cy - s * 0.4, cx - s * 0.1, cy - s * 0.48);
        // Hair bun top
        c.quadraticCurveTo(cx - s * 0.05, cy - s * 0.58, cx + s * 0.02, cy - s * 0.55);
        c.quadraticCurveTo(cx + s * 0.1, cy - s * 0.58, cx + s * 0.12, cy - s * 0.48);
        // Hair right
        c.quadraticCurveTo(cx + s * 0.2, cy - s * 0.38, cx + s * 0.16, cy - s * 0.22);
        // Head right
        c.quadraticCurveTo(cx + s * 0.18, cy - s * 0.1, cx + s * 0.08, cy - s * 0.02);
        // Neck right
        c.lineTo(cx + s * 0.1, cy + s * 0.12);
        // Shoulders right
        c.quadraticCurveTo(cx + s * 0.35, cy + s * 0.2, cx + s * 0.38, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Marie Curie',
      years: '1867\u20131934',
      quote: 'Nothing in life is to be feared, it is only to be understood.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Shoulders
        c.moveTo(cx - s * 0.36, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.32, cy + s * 0.18, cx - s * 0.1, cy + s * 0.1);
        // Neck
        c.lineTo(cx - s * 0.07, cy - s * 0.04);
        // Head left
        c.quadraticCurveTo(cx - s * 0.17, cy - s * 0.1, cx - s * 0.15, cy - s * 0.25);
        // Hair left pulled back
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.38, cx - s * 0.08, cy - s * 0.42);
        // Neat bun on top
        c.quadraticCurveTo(cx - s * 0.06, cy - s * 0.52, cx, cy - s * 0.5);
        c.quadraticCurveTo(cx + s * 0.06, cy - s * 0.52, cx + s * 0.08, cy - s * 0.42);
        // Hair right
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.38, cx + s * 0.15, cy - s * 0.25);
        // Head right
        c.quadraticCurveTo(cx + s * 0.17, cy - s * 0.1, cx + s * 0.07, cy - s * 0.04);
        // Neck right
        c.lineTo(cx + s * 0.1, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.32, cy + s * 0.18, cx + s * 0.36, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Alan Turing',
      years: '1912\u20131954',
      quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Shoulders - suit
        c.moveTo(cx - s * 0.4, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.36, cy + s * 0.2, cx - s * 0.12, cy + s * 0.1);
        // Neck
        c.lineTo(cx - s * 0.08, cy - s * 0.04);
        // Head left
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.08, cx - s * 0.14, cy - s * 0.22);
        // Short neat hair
        c.quadraticCurveTo(cx - s * 0.15, cy - s * 0.36, cx - s * 0.08, cy - s * 0.4);
        c.quadraticCurveTo(cx - s * 0.02, cy - s * 0.44, cx + s * 0.04, cy - s * 0.42);
        c.quadraticCurveTo(cx + s * 0.12, cy - s * 0.4, cx + s * 0.14, cy - s * 0.34);
        // Head right
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.22, cx + s * 0.14, cy - s * 0.08);
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.04, cx + s * 0.08, cy - s * 0.02);
        // Neck right
        c.lineTo(cx + s * 0.12, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.36, cy + s * 0.2, cx + s * 0.4, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Albert Einstein',
      years: '1879\u20131955',
      quote: 'Imagination is more important than knowledge.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Shoulders
        c.moveTo(cx - s * 0.34, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.3, cy + s * 0.2, cx - s * 0.1, cy + s * 0.1);
        c.lineTo(cx - s * 0.07, cy - s * 0.02);
        // Head left
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.06, cx - s * 0.14, cy - s * 0.18);
        // WILD HAIR - the signature feature
        c.quadraticCurveTo(cx - s * 0.28, cy - s * 0.22, cx - s * 0.3, cy - s * 0.32);
        c.quadraticCurveTo(cx - s * 0.32, cy - s * 0.42, cx - s * 0.22, cy - s * 0.46);
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.54, cx - s * 0.08, cy - s * 0.5);
        c.quadraticCurveTo(cx - s * 0.02, cy - s * 0.56, cx + s * 0.06, cy - s * 0.52);
        c.quadraticCurveTo(cx + s * 0.14, cy - s * 0.56, cx + s * 0.22, cy - s * 0.48);
        c.quadraticCurveTo(cx + s * 0.3, cy - s * 0.44, cx + s * 0.3, cy - s * 0.34);
        c.quadraticCurveTo(cx + s * 0.28, cy - s * 0.24, cx + s * 0.14, cy - s * 0.2);
        // Head right
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.08, cx + s * 0.07, cy - s * 0.02);
        c.lineTo(cx + s * 0.1, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.3, cy + s * 0.2, cx + s * 0.34, cy + s * 0.5);
        c.closePath();
        c.fill();
        // Mustache
        c.beginPath();
        c.moveTo(cx - s * 0.08, cy + s * 0.0);
        c.quadraticCurveTo(cx - s * 0.1, cy + s * 0.04, cx - s * 0.06, cy + s * 0.04);
        c.lineTo(cx + s * 0.06, cy + s * 0.04);
        c.quadraticCurveTo(cx + s * 0.1, cy + s * 0.04, cx + s * 0.08, cy + s * 0.0);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Nikola Tesla',
      years: '1856\u20131943',
      quote: 'The present is theirs; the future, for which I really worked, is mine.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Shoulders - high collar
        c.moveTo(cx - s * 0.36, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.34, cy + s * 0.22, cx - s * 0.14, cy + s * 0.12);
        // High collar
        c.lineTo(cx - s * 0.1, cy + s * 0.06);
        c.lineTo(cx - s * 0.08, cy - s * 0.04);
        // Head left - tall and angular
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.08, cx - s * 0.13, cy - s * 0.2);
        // Tall slicked hair
        c.quadraticCurveTo(cx - s * 0.14, cy - s * 0.38, cx - s * 0.06, cy - s * 0.48);
        c.quadraticCurveTo(cx, cy - s * 0.52, cx + s * 0.06, cy - s * 0.48);
        c.quadraticCurveTo(cx + s * 0.14, cy - s * 0.38, cx + s * 0.13, cy - s * 0.2);
        // Head right
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.08, cx + s * 0.08, cy - s * 0.04);
        // Collar right
        c.lineTo(cx + s * 0.1, cy + s * 0.06);
        c.lineTo(cx + s * 0.14, cy + s * 0.12);
        c.quadraticCurveTo(cx + s * 0.34, cy + s * 0.22, cx + s * 0.36, cy + s * 0.5);
        c.closePath();
        c.fill();
        // Mustache
        c.beginPath();
        c.moveTo(cx - s * 0.07, cy + s * 0.0);
        c.quadraticCurveTo(cx, cy + s * 0.05, cx + s * 0.07, cy + s * 0.0);
        c.quadraticCurveTo(cx, cy + s * 0.02, cx - s * 0.07, cy + s * 0.0);
        c.fill();
      }
    },
    {
      name: 'Grace Hopper',
      years: '1906\u20131992',
      quote: 'The most dangerous phrase is: We\u2019ve always done it this way.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Broad shoulders - Navy uniform
        c.moveTo(cx - s * 0.42, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.38, cy + s * 0.2, cx - s * 0.12, cy + s * 0.1);
        c.lineTo(cx - s * 0.08, cy - s * 0.02);
        // Head left
        c.quadraticCurveTo(cx - s * 0.15, cy - s * 0.06, cx - s * 0.13, cy - s * 0.2);
        // Short curly hair
        c.quadraticCurveTo(cx - s * 0.16, cy - s * 0.32, cx - s * 0.1, cy - s * 0.38);
        // Naval cap
        c.lineTo(cx - s * 0.18, cy - s * 0.38);
        c.lineTo(cx - s * 0.2, cy - s * 0.42);
        c.lineTo(cx - s * 0.18, cy - s * 0.46);
        c.lineTo(cx + s * 0.18, cy - s * 0.46);
        c.lineTo(cx + s * 0.2, cy - s * 0.42);
        c.lineTo(cx + s * 0.18, cy - s * 0.38);
        // Hair right
        c.lineTo(cx + s * 0.1, cy - s * 0.38);
        c.quadraticCurveTo(cx + s * 0.16, cy - s * 0.32, cx + s * 0.13, cy - s * 0.2);
        c.quadraticCurveTo(cx + s * 0.15, cy - s * 0.06, cx + s * 0.08, cy - s * 0.02);
        c.lineTo(cx + s * 0.12, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.38, cy + s * 0.2, cx + s * 0.42, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Steve Jobs',
      years: '1955\u20132011',
      quote: 'The people crazy enough to think they can change the world are the ones who do.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Turtleneck shoulders
        c.moveTo(cx - s * 0.34, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.3, cy + s * 0.18, cx - s * 0.1, cy + s * 0.1);
        // Turtleneck collar
        c.lineTo(cx - s * 0.08, cy + s * 0.02);
        c.lineTo(cx - s * 0.07, cy - s * 0.04);
        // Head left - clean/bald
        c.quadraticCurveTo(cx - s * 0.15, cy - s * 0.08, cx - s * 0.14, cy - s * 0.22);
        c.quadraticCurveTo(cx - s * 0.14, cy - s * 0.36, cx - s * 0.06, cy - s * 0.42);
        // Smooth top
        c.quadraticCurveTo(cx, cy - s * 0.45, cx + s * 0.06, cy - s * 0.42);
        c.quadraticCurveTo(cx + s * 0.14, cy - s * 0.36, cx + s * 0.14, cy - s * 0.22);
        c.quadraticCurveTo(cx + s * 0.15, cy - s * 0.08, cx + s * 0.07, cy - s * 0.04);
        c.lineTo(cx + s * 0.08, cy + s * 0.02);
        c.lineTo(cx + s * 0.1, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.3, cy + s * 0.18, cx + s * 0.34, cy + s * 0.5);
        c.closePath();
        c.fill();
        // Round glasses
        c.beginPath();
        c.arc(cx - s * 0.06, cy - s * 0.16, s * 0.045, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(cx + s * 0.06, cy - s * 0.16, s * 0.045, 0, Math.PI * 2);
        c.fill();
      }
    },
    {
      name: 'Margaret Hamilton',
      years: '1936\u2013',
      quote: 'There was no choice but to be pioneers.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Shoulders
        c.moveTo(cx - s * 0.34, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.3, cy + s * 0.2, cx - s * 0.1, cy + s * 0.1);
        c.lineTo(cx - s * 0.07, cy - s * 0.02);
        // Head left
        c.quadraticCurveTo(cx - s * 0.15, cy - s * 0.06, cx - s * 0.14, cy - s * 0.2);
        // Long flowing hair left
        c.quadraticCurveTo(cx - s * 0.18, cy - s * 0.3, cx - s * 0.22, cy - s * 0.28);
        c.quadraticCurveTo(cx - s * 0.28, cy - s * 0.2, cx - s * 0.26, cy + s * 0.0);
        c.quadraticCurveTo(cx - s * 0.24, cy + s * 0.15, cx - s * 0.2, cy + s * 0.25);
        c.moveTo(cx - s * 0.14, cy - s * 0.2);
        // Top of head
        c.quadraticCurveTo(cx - s * 0.14, cy - s * 0.38, cx - s * 0.04, cy - s * 0.42);
        c.quadraticCurveTo(cx + s * 0.04, cy - s * 0.44, cx + s * 0.12, cy - s * 0.4);
        // Hair right
        c.quadraticCurveTo(cx + s * 0.2, cy - s * 0.34, cx + s * 0.24, cy - s * 0.28);
        c.quadraticCurveTo(cx + s * 0.28, cy - s * 0.18, cx + s * 0.26, cy + s * 0.02);
        c.quadraticCurveTo(cx + s * 0.24, cy + s * 0.15, cx + s * 0.2, cy + s * 0.25);
        // Back to head right
        c.moveTo(cx + s * 0.14, cy - s * 0.2);
        c.quadraticCurveTo(cx + s * 0.15, cy - s * 0.06, cx + s * 0.07, cy - s * 0.02);
        c.lineTo(cx + s * 0.1, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.3, cy + s * 0.2, cx + s * 0.34, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Linus Torvalds',
      years: '1969\u2013',
      quote: 'Talk is cheap. Show me the code.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Casual T-shirt shoulders
        c.moveTo(cx - s * 0.36, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.32, cy + s * 0.2, cx - s * 0.12, cy + s * 0.12);
        c.lineTo(cx - s * 0.09, cy - s * 0.02);
        // Round face left
        c.quadraticCurveTo(cx - s * 0.17, cy - s * 0.06, cx - s * 0.16, cy - s * 0.2);
        // Short messy hair
        c.quadraticCurveTo(cx - s * 0.17, cy - s * 0.34, cx - s * 0.1, cy - s * 0.4);
        c.quadraticCurveTo(cx - s * 0.04, cy - s * 0.44, cx + s * 0.02, cy - s * 0.42);
        c.quadraticCurveTo(cx + s * 0.1, cy - s * 0.44, cx + s * 0.12, cy - s * 0.38);
        // Head right
        c.quadraticCurveTo(cx + s * 0.17, cy - s * 0.3, cx + s * 0.16, cy - s * 0.18);
        c.quadraticCurveTo(cx + s * 0.17, cy - s * 0.06, cx + s * 0.09, cy - s * 0.02);
        c.lineTo(cx + s * 0.12, cy + s * 0.12);
        c.quadraticCurveTo(cx + s * 0.32, cy + s * 0.2, cx + s * 0.36, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    },
    {
      name: 'Tim Berners-Lee',
      years: '1955\u2013',
      quote: 'The web is more a social creation than a technical one.',
      draw: function (c, cx, cy, s) {
        c.beginPath();
        // Suit shoulders
        c.moveTo(cx - s * 0.38, cy + s * 0.5);
        c.quadraticCurveTo(cx - s * 0.34, cy + s * 0.2, cx - s * 0.12, cy + s * 0.1);
        c.lineTo(cx - s * 0.08, cy - s * 0.03);
        // Head left
        c.quadraticCurveTo(cx - s * 0.15, cy - s * 0.07, cx - s * 0.14, cy - s * 0.2);
        // Receding hair
        c.quadraticCurveTo(cx - s * 0.14, cy - s * 0.32, cx - s * 0.08, cy - s * 0.38);
        c.quadraticCurveTo(cx - s * 0.02, cy - s * 0.42, cx + s * 0.04, cy - s * 0.4);
        c.quadraticCurveTo(cx + s * 0.1, cy - s * 0.42, cx + s * 0.12, cy - s * 0.36);
        // Head right
        c.quadraticCurveTo(cx + s * 0.15, cy - s * 0.28, cx + s * 0.14, cy - s * 0.18);
        c.quadraticCurveTo(cx + s * 0.15, cy - s * 0.07, cx + s * 0.08, cy - s * 0.03);
        c.lineTo(cx + s * 0.12, cy + s * 0.1);
        c.quadraticCurveTo(cx + s * 0.34, cy + s * 0.2, cx + s * 0.38, cy + s * 0.5);
        c.closePath();
        c.fill();
      }
    }
  ];

  /* --- Silhouette Sampling --- */
  var SAMPLE_SIZE = 200;
  var OFFSCREEN_W = 200;
  var OFFSCREEN_H = 260;

  function sampleSilhouette(drawFn) {
    var off = document.createElement('canvas');
    off.width = OFFSCREEN_W;
    off.height = OFFSCREEN_H;
    var oc = off.getContext('2d');
    oc.fillStyle = '#000';
    drawFn(oc, OFFSCREEN_W / 2, OFFSCREEN_H / 2, OFFSCREEN_W * 0.42);
    var data = oc.getImageData(0, 0, OFFSCREEN_W, OFFSCREEN_H).data;
    var filled = [];
    for (var y = 0; y < OFFSCREEN_H; y += 2) {
      for (var x = 0; x < OFFSCREEN_W; x += 2) {
        if (data[(y * OFFSCREEN_W + x) * 4 + 3] > 64) {
          filled.push({ x: x / OFFSCREEN_W, y: y / OFFSCREEN_H });
        }
      }
    }
    // Shuffle and pick
    for (var i = filled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = filled[i]; filled[i] = filled[j]; filled[j] = t;
    }
    return filled.slice(0, SAMPLE_SIZE);
  }

  // Pre-sample all silhouettes
  var silhouettePoints = [];
  for (var p = 0; p < PIONEERS.length; p++) {
    silhouettePoints.push(sampleSilhouette(PIONEERS[p].draw));
  }

  /* --- Particle System --- */
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var mouse = { x: -1000, y: -1000 };
  var animId = null;
  var width, height;
  var CONNECT_DIST = 120;

  function getCount() {
    if (window.innerWidth < 480) return 60;
    if (window.innerWidth < 768) return 100;
    return SAMPLE_SIZE;
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
        opacity: Math.random() * 0.15 + 0.05,
        tx: 0, ty: 0 // target position
      });
    }
  }

  /* --- State Machine --- */
  var state = 'drift';
  var stateStart = 0;
  var pioneerIdx = -1;
  var progress = 0;

  var DRIFT_MS = 5000;
  var CONVERGE_MS = 2800;
  var HOLD_MS = 5500;
  var DISPERSE_MS = 2000;

  // Quote overlay
  var quoteEl = document.querySelector('.pioneer-quote');
  var nameEl = quoteEl ? quoteEl.querySelector('.pioneer-name') : null;
  var yearsEl = quoteEl ? quoteEl.querySelector('.pioneer-years') : null;
  var textEl = quoteEl ? quoteEl.querySelector('.pioneer-text') : null;

  function showQuote(pioneer) {
    if (!quoteEl) return;
    if (nameEl) nameEl.textContent = pioneer.name;
    if (yearsEl) yearsEl.textContent = pioneer.years;
    if (textEl) textEl.textContent = '\u201C' + pioneer.quote + '\u201D';
    quoteEl.classList.add('visible');
  }

  function hideQuote() {
    if (quoteEl) quoteEl.classList.remove('visible');
  }

  function assignTargets() {
    var points = silhouettePoints[pioneerIdx];
    if (!points) return;

    // Position silhouette in center of hero, vertically centered
    var silW = Math.min(width * 0.35, 320);
    var silH = silW * (OFFSCREEN_H / OFFSCREEN_W);
    var offX = (width - silW) / 2;
    var offY = (height - silH) / 2 - height * 0.02;

    for (var i = 0; i < particles.length; i++) {
      if (i < points.length) {
        particles[i].tx = offX + points[i].x * silW;
        particles[i].ty = offY + points[i].y * silH;
      } else {
        // Extra particles drift to edges
        particles[i].tx = particles[i].x + (Math.random() - 0.5) * 200;
        particles[i].ty = particles[i].y + (Math.random() - 0.5) * 200;
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

    // State transitions
    switch (state) {
      case 'drift':
        progress = 0;
        if (elapsed > DRIFT_MS) {
          state = 'converging';
          stateStart = now;
          nextPioneer();
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
          state = 'drift';
          stateStart = now;
          progress = 0;
          // Give particles a burst of velocity
          for (var d = 0; d < particles.length; d++) {
            particles[d].vx = (Math.random() - 0.5) * 1.2;
            particles[d].vy = (Math.random() - 0.5) * 1.2;
          }
        }
        break;
    }

    // Draw particles
    var connectionAlpha = (1 - progress) * 0.08;

    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];

      if (progress > 0.01) {
        // Lerp toward target
        pt.x += (pt.tx - pt.x) * progress * 0.06;
        pt.y += (pt.ty - pt.y) * progress * 0.06;

        // Breathing jitter when formed
        if (state === 'formed') {
          pt.x += Math.sin(now * 0.0015 + i * 0.8) * 0.4;
          pt.y += Math.cos(now * 0.0018 + i * 1.1) * 0.4;
        }

        // Dampen drift velocity during formation
        pt.vx *= 0.95;
        pt.vy *= 0.95;
      } else {
        // Free drift
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Dampen burst velocity back to normal
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
        var mf = (150 - md) / 150 * 0.02 * (1 - progress * 0.9);
        pt.vx += mx / md * mf;
        pt.vy += my / md * mf;
        pt.vx *= 0.99;
        pt.vy *= 0.99;
      }

      // Connection lines (fade during formation)
      if (connectionAlpha > 0.005) {
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var cdx = pt.x - p2.x;
          var cdy = pt.y - p2.y;
          var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECT_DIST) {
            var a = (1 - cdist / CONNECT_DIST) * connectionAlpha;
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + a + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particle (brighter during formation)
      var particleAlpha = pt.opacity + progress * 0.12;
      var particleRadius = pt.r + progress * 0.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 113, 227, ' + particleAlpha + ')';
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

  // Mouse tracking
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

  // Resize handler
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      createParticles();
      // Re-assign targets if mid-formation
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

  // Signal to main.js to skip basic particle init
  window.__pioneersActive = true;

  init();
})();
