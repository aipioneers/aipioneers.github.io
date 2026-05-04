/* Neuron-firing particle system.
   Adapted from the HeroCanvas component on tobiasoberrauch.de.
   Phase-synchronized oscillators with refractory periods, value-noise
   flow field, mouse attraction, and chaotic firing via the logistic map. */

(function () {
  var PHI = (1 + Math.sqrt(5)) / 2;
  var TAU = Math.PI * 2;
  var GOLDEN_ANGLE = TAU / (PHI * PHI);

  function hashNoise(n) {
    n = (n << 13) ^ n;
    return ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 0x7fffffff;
  }

  function valueNoise2D(x, y) {
    var ix = Math.floor(x), iy = Math.floor(y);
    var fx = x - ix, fy = y - iy;
    var sx = fx * fx * (3 - 2 * fx);
    var sy = fy * fy * (3 - 2 * fy);
    var n00 = hashNoise(ix * 1597 + iy * 51749);
    var n10 = hashNoise((ix + 1) * 1597 + iy * 51749);
    var n01 = hashNoise(ix * 1597 + (iy + 1) * 51749);
    var n11 = hashNoise((ix + 1) * 1597 + (iy + 1) * 51749);
    return n00 * (1 - sx) * (1 - sy)
         + n10 * sx * (1 - sy)
         + n01 * (1 - sx) * sy
         + n11 * sx * sy;
  }

  function fbm(x, y, octaves) {
    var sum = 0, amp = 1, freq = 1, totalAmp = 0;
    for (var i = 0; i < octaves; i++) {
      sum += valueNoise2D(x * freq, y * freq) * amp;
      totalAmp += amp;
      amp *= 0.5;
      freq *= PHI;
    }
    return sum / totalAmp;
  }

  function logistic(x) { return 3.9999 * x * (1 - x); }

  function attach(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width = 0, height = 0;
    var mouse = { x: -1000, y: -1000 };
    var particles = [];
    var rafId = 0;
    var time = 0;
    var chaos = 0.4;

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      var count = Math.min(Math.floor(width * height / 5200), 130);
      particles = [];
      for (var i = 0; i < count; i++) {
        var t = i / count;
        var r = Math.sqrt(t) * Math.min(width, height) * 0.5;
        var theta = i * GOLDEN_ANGLE;
        particles.push({
          x: width / 2 + Math.cos(theta) * r + (Math.random() - 0.5) * width * 0.3,
          y: height / 2 + Math.sin(theta) * r + (Math.random() - 0.5) * height * 0.3,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.5 + Math.random() * 2.5,
          energy: Math.random() * 0.15,
          phase: Math.random() * TAU,
          omega: 0.012 + Math.random() * 0.024,
          refractory: 0,
          opacity: 0.25 + Math.random() * 0.4
        });
      }
      for (var k = 0; k < particles.length; k++) {
        particles[k].x = Math.max(5, Math.min(width - 5, particles[k].x));
        particles[k].y = Math.max(5, Math.min(height - 5, particles[k].y));
      }
    }

    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -1000; mouse.y = -1000; }
    function onResize() { resize(); seed(); }

    /* AI Pioneers indigo→violet palette (matches manifesto section gradient).
       low-energy:  rgb(110, 105, 220)  indigo
       high-energy: rgb(190, 130, 250)  violet
       flash:       rgb(220, 200, 255)  near-white violet */
    function colorFor(energy) {
      var r = Math.floor(110 + energy * 80);
      var g = Math.floor(105 + energy * 25);
      var b = Math.floor(220 + energy * 30);
      return [r, g, b];
    }

    function frame() {
      time += 0.007;
      ctx.clearRect(0, 0, width, height);

      var p = particles;
      var n = p.length;
      var m = mouse;

      // Chaotic trigger: drive a logistic map; when it spikes, fire one particle.
      for (var s = 0; s < 3; s++) chaos = logistic(chaos);
      if (chaos > 0.96) {
        var idx = Math.floor(chaos * n) % n;
        if (p[idx].refractory <= 0) {
          p[idx].energy = 1;
        }
      }

      // Per-particle flow field & mouse attraction
      for (var i = 0; i < n; i++) {
        var pa = p[i];
        var angle = fbm(pa.x * 0.0018 + time * 0.25, pa.y * 0.0018 + 7.7, 3) * TAU * 2;
        var force = fbm(pa.x * 0.0018 + 43, pa.y * 0.0018 + time * 0.25, 2) * 0.1;
        pa.vx += Math.cos(angle) * force;
        pa.vy += Math.sin(angle) * force;
        pa.phase = (pa.phase + pa.omega) % TAU;

        var dx = m.x - pa.x;
        var dy = m.y - pa.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 240) {
          var pull = (1 - dist / 240) * 0.0006;
          pa.vx += dx * pull;
          pa.vy += dy * pull;
          if (dist < 130 && pa.refractory <= 0) {
            pa.energy = Math.min(1, pa.energy + 0.018);
          }
        }

        if (pa.energy > 0.8 && pa.refractory <= 0) {
          pa.refractory = 70 + Math.floor(pa.omega * 500);
        }
        if (pa.refractory > 0) {
          pa.refractory--;
          pa.energy *= 0.93;
        } else {
          pa.energy += (0.12 - pa.energy) * 0.003;
        }

        // Rare quantum jump
        if (Math.random() < 0.0002) {
          var ja = Math.random() * TAU;
          var jh = Math.random();
          var jd = 40 / Math.pow(jh, 0.5);
          pa.x += Math.cos(ja) * Math.min(jd, 300);
          pa.y += Math.sin(ja) * Math.min(jd, 300);
          pa.energy = Math.min(1, pa.energy + 0.6);
        }

        pa.vx *= 0.992;
        pa.vy *= 0.992;
        pa.x += pa.vx;
        pa.y += pa.vy;

        // Wrap edges
        var pad = 40;
        if (pa.x < -pad) pa.x += width + pad * 2;
        if (pa.x > width + pad) pa.x -= width + pad * 2;
        if (pa.y < -pad) pa.y += height + pad * 2;
        if (pa.y > height + pad) pa.y -= height + pad * 2;
      }

      // Pairwise: connections, phase sync, energy spread, repulsion
      var maxDist = 165;
      var maxDistSq = maxDist * maxDist;
      for (var ai = 0; ai < n; ai++) {
        var a = p[ai];
        var neighbors = 0;
        for (var bi = ai + 1; bi < n; bi++) {
          var b = p[bi];
          var dxab = a.x - b.x;
          var dyab = a.y - b.y;
          var d2 = dxab * dxab + dyab * dyab;
          if (d2 > maxDistSq) continue;
          var d = Math.sqrt(d2);
          neighbors++;

          // Phase sync
          var coupling = 0.0025 * (1 - d / maxDist);
          var dphase = Math.sin(b.phase - a.phase);
          a.phase += coupling * dphase;
          b.phase -= coupling * dphase;

          // Energy spread
          var spread = (1 - d / maxDist) * 0.007;
          if (a.energy > 0.65 && b.refractory <= 0) {
            b.energy = Math.min(1, b.energy + spread * a.energy);
          }
          if (b.energy > 0.65 && a.refractory <= 0) {
            a.energy = Math.min(1, a.energy + spread * b.energy);
          }

          // Short-range repulsion to prevent clumping
          if (d < 55) {
            var repel = ((55 - d) / 55) * 0.012;
            var nx = dxab / d;
            var ny = dyab / d;
            a.vx += nx * repel; a.vy += ny * repel;
            b.vx -= nx * repel; b.vy -= ny * repel;
          }

          // Draw connection
          var fade = 1 - d / maxDist;
          var avgE = (a.energy + b.energy) / 2;
          var phaseAlign = (1 + Math.cos(a.phase - b.phase)) / 2;
          var alpha = fade * (0.04 + avgE * 0.3 + phaseAlign * 0.06);
          var lc = colorFor(avgE);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(' + lc[0] + ',' + lc[1] + ',' + lc[2] + ',' + alpha + ')';
          ctx.lineWidth = 0.3 + avgE * 1.6 + phaseAlign * 0.4;
          ctx.stroke();
        }
        // Loose particles drift toward center; crowded ones drift outward.
        if (neighbors < 2) {
          a.vx += (width / 2 - a.x) * 0.000025;
          a.vy += (height / 2 - a.y) * 0.000025;
        }
        if (neighbors > 7) {
          a.vx += (a.x - width / 2) * 0.000035;
          a.vy += (a.y - height / 2) * 0.000035;
          a.energy *= 0.97;
        }
        if (neighbors >= 3 && neighbors <= 5 && a.refractory <= 0) {
          a.energy = Math.min(1, a.energy + 0.0006);
        }
      }

      // Render particles + halos
      for (var pi = 0; pi < n; pi++) {
        var pp = p[pi];
        var pulse = 1 + Math.sin(pp.phase) * 0.2;
        var grow = 1 + pp.energy * 1.4;
        var rad = pp.radius * pulse * grow;
        var pc = colorFor(pp.energy);
        var alpha = Math.min(1, pp.opacity + pp.energy * 0.55);

        ctx.beginPath();
        ctx.arc(pp.x, pp.y, rad, 0, TAU);
        ctx.fillStyle = 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',' + alpha + ')';
        ctx.fill();

        if (pp.energy > 0.3) {
          var haloR = rad * (2.5 + pp.energy * 4.5);
          var halo = ctx.createRadialGradient(pp.x, pp.y, rad * 0.4, pp.x, pp.y, haloR);
          halo.addColorStop(0, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',' + (pp.energy * 0.15) + ')');
          halo.addColorStop(1, 'rgba(' + pc[0] + ',' + pc[1] + ',' + pc[2] + ',0)');
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, haloR, 0, TAU);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        if (pp.energy > 0.82) {
          var burst = (pp.energy - 0.82) * 5.5;
          var burstR = rad * 8;
          var bg = ctx.createRadialGradient(pp.x, pp.y, 0, pp.x, pp.y, burstR);
          bg.addColorStop(0, 'rgba(220,200,255,' + Math.min(0.5, burst * 0.4) + ')');
          bg.addColorStop(0.3, 'rgba(180,130,250,' + Math.min(0.3, burst * 0.15) + ')');
          bg.addColorStop(1, 'rgba(180,130,250,0)');
          ctx.beginPath();
          ctx.arc(pp.x, pp.y, burstR, 0, TAU);
          ctx.fillStyle = bg;
          ctx.fill();
        }
      }

      // Mouse aura
      if (m.x > 0 && m.y > 0) {
        var aura = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 160);
        aura.addColorStop(0, 'rgba(168,85,247,0.06)');
        aura.addColorStop(0.6, 'rgba(168,85,247,0.02)');
        aura.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.fillStyle = aura;
        ctx.fillRect(m.x - 160, m.y - 160, 320, 320);
      }

      rafId = requestAnimationFrame(frame);
    }

    resize();
    seed();
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
    rafId = requestAnimationFrame(frame);
  }

  function init() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvases = document.querySelectorAll('canvas[data-neurons]');
    for (var i = 0; i < canvases.length; i++) attach(canvases[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
