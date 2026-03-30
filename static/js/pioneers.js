/* ===== Pioneer Silhouette Particle System ===== */
/* Particles converge to form side-profile head silhouettes of historical
   pioneers, with quotes fading in below. Each profile emphasises the
   person's most recognisable features (Einstein's wild hair, Jobs's
   glasses, Hopper's naval cap, etc.). */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  /* ================================================================
     Pioneer data — each `draw` function paints a RIGHT-FACING side
     profile on an offscreen canvas (300 x 400 coordinate space).
     The silhouette is then pixel-sampled into a point cloud.
     ================================================================ */

  var PIONEERS = [

    /* ---- Ada Lovelace ---- */
    { name: 'Ada Lovelace', years: '1815\u20131852',
      quote: 'That brain of mine is something more than merely mortal.',
      draw: function (c) {
        c.beginPath();
        // back shoulder
        c.moveTo(30, 400);
        c.lineTo(30, 340);
        // back of neck
        c.quadraticCurveTo(35, 310, 50, 280);
        // back of head
        c.quadraticCurveTo(40, 250, 35, 220);
        // Victorian upswept hair — elaborate bun
        c.bezierCurveTo(25, 190, 20, 160, 30, 130);
        c.bezierCurveTo(35, 110, 50, 85, 70, 70);
        c.bezierCurveTo(85, 58, 110, 48, 130, 50);
        // hair ornament / top bump
        c.bezierCurveTo(140, 45, 148, 42, 155, 48);
        c.bezierCurveTo(162, 52, 165, 60, 168, 70);
        // forehead
        c.bezierCurveTo(172, 85, 178, 100, 180, 115);
        // brow
        c.quadraticCurveTo(182, 125, 180, 135);
        // eye socket
        c.quadraticCurveTo(178, 142, 180, 150);
        // nose — small, slightly upturned
        c.bezierCurveTo(185, 158, 195, 168, 192, 178);
        c.quadraticCurveTo(188, 182, 182, 184);
        // upper lip
        c.quadraticCurveTo(178, 188, 175, 192);
        // lower lip
        c.quadraticCurveTo(178, 198, 176, 205);
        // chin — delicate, pointed
        c.bezierCurveTo(172, 215, 165, 228, 158, 238);
        // jawline
        c.quadraticCurveTo(150, 248, 140, 255);
        // neck
        c.quadraticCurveTo(130, 265, 125, 285);
        // high collar
        c.quadraticCurveTo(120, 300, 118, 320);
        // front shoulder
        c.lineTo(270, 400);
        c.closePath();
        c.fill();
        // ringlet curls at the side
        c.beginPath();
        c.ellipse(55, 240, 12, 20, -0.3, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(48, 210, 10, 16, -0.2, 0, Math.PI * 2);
        c.fill();
      }
    },

    /* ---- Marie Curie ---- */
    { name: 'Marie Curie', years: '1867\u20131934',
      quote: 'Nothing in life is to be feared, it is only to be understood.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(30, 400); c.lineTo(30, 330);
        // back/neck
        c.quadraticCurveTo(38, 300, 55, 275);
        // back of head
        c.quadraticCurveTo(42, 240, 38, 210);
        // bun at back — tight, neat
        c.bezierCurveTo(30, 185, 25, 160, 35, 140);
        c.bezierCurveTo(40, 125, 55, 115, 65, 108);
        // top of head — hair pulled back neatly
        c.bezierCurveTo(80, 95, 100, 75, 125, 65);
        c.bezierCurveTo(140, 60, 155, 62, 165, 70);
        // forehead — high, prominent
        c.bezierCurveTo(172, 78, 178, 92, 180, 108);
        c.quadraticCurveTo(183, 120, 182, 132);
        // brow ridge
        c.quadraticCurveTo(184, 140, 182, 148);
        // nose — straight, strong
        c.bezierCurveTo(188, 158, 198, 172, 200, 182);
        c.quadraticCurveTo(198, 188, 190, 190);
        // mouth area
        c.quadraticCurveTo(185, 195, 182, 200);
        c.quadraticCurveTo(184, 208, 180, 215);
        // chin — determined
        c.bezierCurveTo(175, 225, 168, 238, 158, 248);
        c.quadraticCurveTo(148, 258, 138, 265);
        // neck — slender
        c.quadraticCurveTo(130, 278, 125, 300);
        // high collar / dress neckline
        c.quadraticCurveTo(120, 320, 115, 340);
        c.lineTo(270, 400);
        c.closePath();
        c.fill();
      }
    },

    /* ---- Alan Turing ---- */
    { name: 'Alan Turing', years: '1912\u20131954',
      quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 330);
        // back neck
        c.quadraticCurveTo(50, 300, 60, 275);
        // back of head
        c.quadraticCurveTo(48, 240, 48, 210);
        // short neatly parted hair — side part
        c.bezierCurveTo(45, 180, 48, 150, 60, 120);
        c.bezierCurveTo(72, 95, 95, 72, 120, 60);
        c.bezierCurveTo(140, 52, 155, 55, 165, 62);
        // forehead — broad, intelligent
        c.bezierCurveTo(172, 70, 178, 85, 180, 105);
        c.quadraticCurveTo(183, 118, 182, 130);
        // brow
        c.quadraticCurveTo(184, 138, 183, 145);
        // nose — straight, moderate
        c.bezierCurveTo(188, 155, 195, 168, 195, 180);
        c.quadraticCurveTo(193, 186, 186, 188);
        // lips
        c.quadraticCurveTo(182, 194, 180, 200);
        c.quadraticCurveTo(182, 208, 178, 215);
        // chin — firm, angular
        c.bezierCurveTo(172, 228, 162, 242, 150, 252);
        // strong jawline
        c.quadraticCurveTo(140, 260, 130, 268);
        // neck
        c.quadraticCurveTo(125, 282, 120, 300);
        // suit collar — V-shaped
        c.lineTo(115, 315);
        c.lineTo(100, 340);
        c.lineTo(150, 340);
        c.lineTo(135, 315);
        c.lineTo(130, 305);
        c.quadraticCurveTo(140, 320, 160, 340);
        c.lineTo(270, 400);
        c.closePath();
        c.fill();
      }
    },

    /* ---- Albert Einstein ---- */
    { name: 'Albert Einstein', years: '1879\u20131955',
      quote: 'Imagination is more important than knowledge.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 335);
        // back
        c.quadraticCurveTo(48, 305, 58, 280);
        // back of head
        c.quadraticCurveTo(45, 250, 40, 220);
        // WILD HAIR — the signature (big, chaotic, exploding outward)
        c.bezierCurveTo(25, 200, 10, 175, 5, 150);
        c.bezierCurveTo(0, 130, 5, 105, 15, 90);
        c.bezierCurveTo(20, 78, 10, 65, 20, 50);
        c.bezierCurveTo(30, 35, 50, 20, 75, 15);
        c.bezierCurveTo(95, 10, 115, 8, 135, 15);
        c.bezierCurveTo(150, 20, 160, 12, 175, 22);
        c.bezierCurveTo(188, 30, 195, 45, 190, 60);
        c.bezierCurveTo(198, 55, 205, 65, 200, 80);
        // forehead — receding under wild hair
        c.bezierCurveTo(195, 90, 188, 100, 185, 115);
        // heavy brow ridge
        c.quadraticCurveTo(190, 128, 188, 138);
        // deep-set eyes area
        c.quadraticCurveTo(185, 145, 188, 152);
        // PROMINENT nose — long, drooping
        c.bezierCurveTo(195, 162, 210, 180, 208, 195);
        c.quadraticCurveTo(205, 200, 195, 202);
        // THICK MUSTACHE
        c.quadraticCurveTo(198, 206, 202, 210);
        c.quadraticCurveTo(205, 216, 198, 220);
        c.quadraticCurveTo(190, 224, 182, 222);
        // mouth under mustache
        c.quadraticCurveTo(178, 228, 176, 235);
        // rounded chin
        c.bezierCurveTo(172, 248, 164, 260, 155, 268);
        // jowls
        c.quadraticCurveTo(145, 275, 135, 280);
        // neck
        c.quadraticCurveTo(128, 295, 122, 315);
        // collar
        c.lineTo(118, 340);
        c.lineTo(260, 400);
        c.closePath();
        c.fill();
      }
    },

    /* ---- Nikola Tesla ---- */
    { name: 'Nikola Tesla', years: '1856\u20131943',
      quote: 'The present is theirs; the future, for which I really worked, is mine.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 330);
        // back
        c.quadraticCurveTo(48, 300, 58, 275);
        // back of head — flat
        c.quadraticCurveTo(48, 240, 50, 200);
        // TALL slicked-back hair
        c.bezierCurveTo(48, 170, 52, 130, 65, 95);
        c.bezierCurveTo(75, 70, 95, 48, 120, 35);
        c.bezierCurveTo(138, 28, 155, 30, 165, 40);
        // forehead — high, angular
        c.bezierCurveTo(172, 50, 178, 68, 180, 90);
        c.quadraticCurveTo(183, 108, 182, 125);
        // sharp brow
        c.quadraticCurveTo(185, 135, 184, 145);
        // nose — sharp, aquiline
        c.bezierCurveTo(190, 155, 200, 170, 202, 182);
        c.quadraticCurveTo(200, 188, 192, 190);
        // thin mustache
        c.quadraticCurveTo(195, 194, 197, 198);
        c.quadraticCurveTo(195, 202, 188, 202);
        // thin lips
        c.quadraticCurveTo(184, 207, 182, 212);
        c.quadraticCurveTo(183, 218, 180, 225);
        // angular chin
        c.bezierCurveTo(175, 238, 168, 248, 160, 255);
        c.quadraticCurveTo(152, 262, 142, 268);
        // thin neck
        c.quadraticCurveTo(135, 278, 132, 290);
        // HIGH STARCHED COLLAR
        c.lineTo(128, 298);
        c.lineTo(120, 295);
        c.lineTo(115, 308);
        c.lineTo(110, 295);
        c.lineTo(105, 310);
        c.quadraticCurveTo(100, 330, 95, 350);
        c.lineTo(260, 400);
        c.closePath();
        c.fill();
      }
    },

    /* ---- Grace Hopper ---- */
    { name: 'Grace Hopper', years: '1906\u20131992',
      quote: 'The most dangerous phrase is: We\u2019ve always done it this way.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(30, 400); c.lineTo(30, 325);
        // BROAD SHOULDERS — Navy uniform
        c.quadraticCurveTo(38, 300, 55, 275);
        // back of head
        c.quadraticCurveTo(45, 245, 45, 215);
        // short curled hair under cap
        c.bezierCurveTo(40, 195, 42, 175, 50, 160);
        // NAVAL PEAKED CAP — the distinguishing feature
        c.lineTo(35, 155);
        c.lineTo(25, 148);
        c.lineTo(25, 140);
        c.lineTo(30, 135);
        // cap crown
        c.bezierCurveTo(45, 115, 70, 95, 100, 82);
        c.bezierCurveTo(120, 76, 140, 78, 155, 85);
        // cap brim — extends forward
        c.lineTo(165, 88);
        c.lineTo(195, 92);
        c.lineTo(200, 98);
        c.lineTo(190, 102);
        c.lineTo(170, 100);
        // forehead
        c.bezierCurveTo(172, 110, 175, 125, 176, 138);
        // brow
        c.quadraticCurveTo(178, 145, 176, 152);
        // nose
        c.bezierCurveTo(182, 162, 190, 174, 188, 184);
        c.quadraticCurveTo(185, 189, 180, 190);
        // mouth
        c.quadraticCurveTo(176, 196, 174, 202);
        c.quadraticCurveTo(176, 210, 172, 218);
        // chin
        c.bezierCurveTo(168, 230, 160, 242, 150, 250);
        c.quadraticCurveTo(142, 258, 134, 264);
        // neck
        c.quadraticCurveTo(128, 276, 124, 292);
        // uniform collar
        c.lineTo(120, 310);
        c.lineTo(270, 400);
        c.closePath();
        c.fill();
        // cap badge / anchor detail
        c.beginPath();
        c.arc(110, 100, 8, 0, Math.PI * 2);
        c.fill();
      }
    },

    /* ---- Steve Jobs ---- */
    { name: 'Steve Jobs', years: '1955\u20132011',
      quote: 'The people who are crazy enough to think they can change the world are the ones who do.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 330);
        // back
        c.quadraticCurveTo(48, 300, 55, 275);
        // back of head — bald/very short
        c.quadraticCurveTo(45, 245, 45, 210);
        // smooth, bald head — clean dome
        c.bezierCurveTo(42, 175, 48, 140, 62, 110);
        c.bezierCurveTo(75, 85, 100, 65, 130, 55);
        c.bezierCurveTo(150, 50, 165, 55, 172, 65);
        // forehead — smooth
        c.bezierCurveTo(178, 75, 182, 92, 183, 112);
        c.quadraticCurveTo(185, 125, 184, 135);
        // brow
        c.quadraticCurveTo(186, 142, 184, 150);
        // nose — distinctive
        c.bezierCurveTo(190, 160, 200, 175, 198, 188);
        c.quadraticCurveTo(195, 193, 188, 194);
        // lips — thin
        c.quadraticCurveTo(184, 200, 182, 206);
        c.quadraticCurveTo(183, 213, 180, 220);
        // chin — prominent
        c.bezierCurveTo(175, 235, 166, 250, 155, 260);
        c.quadraticCurveTo(145, 268, 135, 274);
        // neck
        c.quadraticCurveTo(128, 286, 124, 300);
        // TURTLENECK — signature
        c.lineTo(122, 305);
        c.quadraticCurveTo(120, 315, 118, 325);
        c.lineTo(115, 340);
        c.lineTo(265, 400);
        c.closePath();
        c.fill();
        // ROUND WIREFRAME GLASSES — the other signature
        c.save();
        c.strokeStyle = '#000';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(178, 142, 16, 0, Math.PI * 2);
        c.stroke();
        // earpiece going back
        c.beginPath();
        c.moveTo(162, 142);
        c.lineTo(120, 148);
        c.stroke();
        c.restore();
      }
    },

    /* ---- Margaret Hamilton ---- */
    { name: 'Margaret Hamilton', years: '1936\u2013',
      quote: 'There was no choice but to be pioneers.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(20, 400); c.lineTo(20, 330);
        // back
        c.quadraticCurveTo(28, 305, 38, 280);
        // LONG FLOWING HAIR cascading down the back
        c.quadraticCurveTo(25, 260, 18, 240);
        c.bezierCurveTo(8, 210, 5, 180, 10, 150);
        // hair flows over the top
        c.bezierCurveTo(15, 120, 30, 90, 55, 70);
        c.bezierCurveTo(75, 55, 100, 45, 125, 42);
        c.bezierCurveTo(145, 40, 158, 45, 165, 55);
        // forehead
        c.bezierCurveTo(170, 65, 175, 82, 178, 100);
        c.quadraticCurveTo(180, 115, 179, 128);
        // brow
        c.quadraticCurveTo(181, 136, 180, 144);
        // nose
        c.bezierCurveTo(185, 154, 192, 168, 190, 180);
        c.quadraticCurveTo(187, 185, 182, 186);
        // mouth
        c.quadraticCurveTo(178, 192, 176, 198);
        c.quadraticCurveTo(178, 206, 174, 214);
        // chin
        c.bezierCurveTo(170, 226, 162, 238, 152, 248);
        c.quadraticCurveTo(144, 256, 136, 262);
        // neck
        c.quadraticCurveTo(130, 274, 126, 290);
        // collar
        c.lineTo(122, 310);
        c.lineTo(260, 400);
        c.closePath();
        c.fill();
        // separate hair strand flowing down in front of shoulder
        c.beginPath();
        c.moveTo(140, 268);
        c.bezierCurveTo(145, 290, 148, 320, 146, 360);
        c.quadraticCurveTo(144, 380, 140, 400);
        c.lineTo(128, 400);
        c.bezierCurveTo(130, 380, 132, 340, 128, 300);
        c.quadraticCurveTo(126, 280, 130, 268);
        c.closePath();
        c.fill();
        // hair strand at back
        c.beginPath();
        c.moveTo(30, 280);
        c.bezierCurveTo(22, 310, 18, 350, 22, 400);
        c.lineTo(8, 400);
        c.bezierCurveTo(2, 360, 5, 320, 15, 280);
        c.closePath();
        c.fill();
      }
    },

    /* ---- Linus Torvalds ---- */
    { name: 'Linus Torvalds', years: '1969\u2013',
      quote: 'Talk is cheap. Show me the code.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 330);
        // back
        c.quadraticCurveTo(48, 300, 58, 275);
        // back of head — rounder
        c.quadraticCurveTo(46, 242, 46, 210);
        // short hair, slightly messy
        c.bezierCurveTo(42, 178, 48, 145, 60, 115);
        c.bezierCurveTo(72, 90, 92, 70, 118, 58);
        c.bezierCurveTo(138, 50, 155, 54, 165, 62);
        // forehead
        c.bezierCurveTo(172, 70, 178, 88, 180, 108);
        c.quadraticCurveTo(182, 120, 181, 132);
        // brow
        c.quadraticCurveTo(183, 140, 182, 148);
        // nose — slightly upturned
        c.bezierCurveTo(187, 158, 194, 170, 192, 182);
        c.quadraticCurveTo(190, 187, 184, 188);
        // slight smile area
        c.quadraticCurveTo(180, 194, 178, 200);
        c.quadraticCurveTo(180, 208, 177, 216);
        // ROUND chin / fuller face
        c.bezierCurveTo(174, 230, 170, 244, 162, 255);
        c.quadraticCurveTo(155, 265, 145, 272);
        // fuller neck
        c.quadraticCurveTo(138, 282, 134, 298);
        // casual T-shirt collar
        c.quadraticCurveTo(130, 315, 125, 340);
        c.lineTo(265, 400);
        c.closePath();
        c.fill();
        // GLASSES — rectangular/slightly rounded
        c.save();
        c.strokeStyle = '#000';
        c.lineWidth = 3.5;
        c.beginPath();
        // lens
        // manual rounded rect for browser compat
        const rx=166,ry=132,rw=28,rh=22,rr=4;
        c.moveTo(rx+rr,ry);
        c.lineTo(rx+rw-rr,ry);c.arcTo(rx+rw,ry,rx+rw,ry+rr,rr);
        c.lineTo(rx+rw,ry+rh-rr);c.arcTo(rx+rw,ry+rh,rx+rw-rr,ry+rh,rr);
        c.lineTo(rx+rr,ry+rh);c.arcTo(rx,ry+rh,rx,ry+rh-rr,rr);
        c.lineTo(rx,ry+rr);c.arcTo(rx,ry,rx+rr,ry,rr);
        c.closePath();
        c.stroke();
        // earpiece
        c.beginPath();
        c.moveTo(166, 143);
        c.lineTo(120, 150);
        c.stroke();
        c.restore();
      }
    },

    /* ---- Tim Berners-Lee ---- */
    { name: 'Tim Berners-Lee', years: '1955\u2013',
      quote: 'The web is more a social creation than a technical one.',
      draw: function (c) {
        c.beginPath();
        c.moveTo(40, 400); c.lineTo(40, 330);
        // back
        c.quadraticCurveTo(48, 300, 58, 278);
        // back of head
        c.quadraticCurveTo(46, 245, 46, 215);
        // hair at back — remaining hair
        c.bezierCurveTo(42, 188, 45, 160, 55, 135);
        // RECEDING HAIRLINE — distinctive
        c.bezierCurveTo(62, 115, 72, 98, 88, 85);
        // bald/thin at top
        c.bezierCurveTo(105, 72, 128, 62, 148, 60);
        c.bezierCurveTo(158, 58, 165, 62, 168, 70);
        // forehead — exposed, high
        c.bezierCurveTo(172, 78, 178, 95, 180, 115);
        c.quadraticCurveTo(182, 128, 181, 138);
        // brow
        c.quadraticCurveTo(183, 146, 182, 154);
        // nose
        c.bezierCurveTo(188, 164, 196, 178, 195, 190);
        c.quadraticCurveTo(192, 195, 186, 196);
        // mouth
        c.quadraticCurveTo(182, 202, 180, 208);
        c.quadraticCurveTo(182, 216, 178, 224);
        // chin
        c.bezierCurveTo(174, 236, 166, 250, 156, 260);
        c.quadraticCurveTo(148, 268, 138, 274);
        // neck
        c.quadraticCurveTo(132, 286, 128, 302);
        // open collar / casual
        c.quadraticCurveTo(124, 318, 120, 340);
        c.lineTo(265, 400);
        c.closePath();
        c.fill();
      }
    }
  ];

  /* ================================================================
     Silhouette Sampling — draw each profile on an offscreen canvas,
     then collect filled-pixel coordinates as a point cloud.
     ================================================================ */
  var PARTICLE_COUNT = 500;
  var OFF_W = 300;
  var OFF_H = 400;

  function sampleSilhouette(drawFn) {
    var off = document.createElement('canvas');
    off.width = OFF_W;
    off.height = OFF_H;
    var oc = off.getContext('2d');
    oc.fillStyle = '#000';
    drawFn(oc);
    var data = oc.getImageData(0, 0, OFF_W, OFF_H).data;
    var filled = [];
    // sample every 2 pixels for density
    for (var y = 0; y < OFF_H; y += 2) {
      for (var x = 0; x < OFF_W; x += 2) {
        if (data[(y * OFF_W + x) * 4 + 3] > 80) {
          filled.push({ x: x / OFF_W, y: y / OFF_H });
        }
      }
    }
    // Fisher-Yates shuffle, pick PARTICLE_COUNT
    for (var i = filled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = filled[i]; filled[i] = filled[j]; filled[j] = t;
    }
    return filled.slice(0, PARTICLE_COUNT);
  }

  // Pre-sample every silhouette
  var silhouettePoints = [];
  for (var p = 0; p < PIONEERS.length; p++) {
    silhouettePoints.push(sampleSilhouette(PIONEERS[p].draw));
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
  var CONNECT_DIST = 90;

  function getCount() {
    if (window.innerWidth < 480) return 200;
    if (window.innerWidth < 768) return 350;
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
  var CONVERGE_MS = 3000;
  var HOLD_MS     = 5000;
  var DISPERSE_MS = 1800;
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

    // fit silhouette into hero: height-based sizing, horizontally centered
    var silH = Math.min(height * 0.72, 520);
    var silW = silH * (OFF_W / OFF_H);
    var offX = (width - silW) / 2;
    var offY = (height - silH) / 2 - height * 0.02;

    for (var i = 0; i < particles.length; i++) {
      if (i < points.length) {
        particles[i].tx = offX + points[i].x * silW;
        particles[i].ty = offY + points[i].y * silH;
      } else {
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

    // --- Draw particles ---
    var connAlpha = (1 - progress) * 0.06;

    for (var i = 0; i < particles.length; i++) {
      var pt = particles[i];

      if (progress > 0.01) {
        pt.x += (pt.tx - pt.x) * progress * 0.07;
        pt.y += (pt.ty - pt.y) * progress * 0.07;
        if (state === 'formed') {
          pt.x += Math.sin(now * 0.001 + i * 0.7) * 0.2;
          pt.y += Math.cos(now * 0.0013 + i * 0.9) * 0.2;
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
      if (md < 150) {
        var mf = (150 - md) / 150 * 0.02 * (1 - progress * 0.85);
        pt.vx += mx / md * mf; pt.vy += my / md * mf;
        pt.vx *= 0.99; pt.vy *= 0.99;
      }

      // Connection lines
      if (connAlpha > 0.003) {
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var cdx = pt.x - p2.x, cdy = pt.y - p2.y;
          var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + ((1 - cdist / CONNECT_DIST) * connAlpha) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particle dot
      var alpha  = pt.opacity + progress * 0.22;
      var radius = pt.r + progress * 0.7;
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
  function init() {
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
  init();
})();
