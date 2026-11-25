// Efectos de sonido de ¡Che, Bicho!, sintetizados con Web Audio (sin archivos).
// Estilo: chiptune (cuadrada, triángulo) con textura natural de ruido filtrado.
(function () {
  let ctx, master, eco, ruidoBuf, K = 1;
  // Ganancia por efecto para que todos suenen parejo dentro de su grupo (medida con medir()).
  const GAN = /*GAN*/{"pasoTierra":1.36,"pasoPasto":1.56,"pasoRipio":2.56,"pasoArena":2,"pasoAgua":1.25,"pasoNieve":1.22,"pasoEmpedrado":1.23,"puerta":1.24,"hablar":1.38,"vozGrave":1.85,"vozMedia":1,"vozAguda":1.5,"salvaje":1.24,"fogon":1.44,"mate":2.25,"carpa":1.24,"boleadora":3.85,"lanzar":3.71,"guayaca":1.44,"sacudida":2.6,"atrapado":1.08,"escapo":1.24,"Fuego":3.81,"Flora":2.22,"Agua":2.67,"Tierra":0.8,"Roca":4.94,"Viento":5.52,"Rayo":2.39,"Hielo":1.67,"Veneno":1.82,"Común":2.96,"Mito":2.11,"critico":2.22,"amague":9.14,"cubrirse":2.29,"marca":2.67,"reaccion":0.65,"vencido":0.84,"relevo":1.28,"boton":3,"volver":3,"noSe":1.73,"changa":1.18,"chirolas":2.17,"nivel":1.24,"camino":1.13,"insignia":0.9,"libreta":1.86};
  const R = Math.random;

  function armar(c) {
    ctx = c;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4; comp.attack.value = .003; comp.release.value = .15;
    master = ctx.createGain(); master.gain.value = window.SFX_VOL ?? .8;
    master.connect(comp); comp.connect(ctx.destination);
    eco = ctx.createDelay(1); eco.delayTime.value = .16;
    const fb = ctx.createGain(); fb.gain.value = .35;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
    const salida = ctx.createGain(); salida.gain.value = .5;
    eco.connect(lp); lp.connect(fb); fb.connect(eco); lp.connect(salida); salida.connect(master);
    ruidoBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = ruidoBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = R() * 2 - 1;
  }

  function env(g, T, a, d, v) {
    g.gain.setValueAtTime(.0001, T);
    g.gain.exponentialRampToValueAtTime(v * K, T + a);
    g.gain.exponentialRampToValueAtTime(.0001, T + a + d);
  }
  function salida(g, ecoV) {
    g.connect(master);
    if (ecoV) { const s = ctx.createGain(); s.gain.value = ecoV; g.connect(s); s.connect(eco); }
  }
  // Tono: f a f2, forma, ataque, caída, volumen, eco, vibrato y filtro pasa bajos opcional.
  function tono({ f = 440, f2 = 0, tipo = 'square', t = 0, a = .005, d = .15, v = .3, ec = 0, vib = 0, vibF = 6, lp = 0 }) {
    const T = ctx.currentTime + t, fin = T + a + d + .05;
    const o = ctx.createOscillator(); o.type = tipo;
    o.frequency.setValueAtTime(f, T);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, T + a + d);
    const g = ctx.createGain(); env(g, T, a, d, v);
    if (lp) { const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); fl.connect(g); } else o.connect(g);
    if (vib) { const l = ctx.createOscillator(); l.frequency.value = vibF; const lg = ctx.createGain(); lg.gain.value = vib; l.connect(lg); lg.connect(o.frequency); l.start(T); l.stop(fin); }
    salida(g, ec); o.start(T); o.stop(fin);
  }
  // Ruido filtrado: tipo de filtro, frecuencia que va de f a f2, Q.
  function ruido({ t = 0, a = .005, d = .1, v = .3, fil = 'bandpass', f = 1000, f2 = 0, q = 1, ec = 0, lfo = 0, lfoF = 3 }) {
    const T = ctx.currentTime + t, fin = T + a + d + .05;
    const s = ctx.createBufferSource(); s.buffer = ruidoBuf; s.loop = true;
    const fl = ctx.createBiquadFilter(); fl.type = fil; fl.Q.value = q;
    fl.frequency.setValueAtTime(f, T);
    if (f2) fl.frequency.exponentialRampToValueAtTime(f2, T + a + d);
    if (lfo) { const l = ctx.createOscillator(); l.frequency.value = lfoF; const lg = ctx.createGain(); lg.gain.value = lfo; l.connect(lg); lg.connect(fl.frequency); l.start(T); l.stop(fin); }
    const g = ctx.createGain(); env(g, T, a, d, v);
    s.connect(fl); fl.connect(g); salida(g, ec);
    s.start(T, R() * 1.5); s.stop(fin);
  }
  const varia = (x, p = .08) => x * (1 + (R() * 2 - 1) * p);

  // ---------- pasos ----------
  const PASO = {
    tierra: (t) => { ruido({ t, fil: 'lowpass', f: varia(700), d: .06, v: .5 }); tono({ t, tipo: 'sine', f: varia(110), f2: 70, d: .05, v: .18 }); },
    pasto: (t) => { ruido({ t, f: varia(3500), q: .8, a: .012, d: .08, v: .35 }); ruido({ t: t + .01, fil: 'highpass', f: 6000, d: .04, v: .12 }); },
    ripio: (t) => { for (let k = 0; k < 4; k++) ruido({ t: t + k * .013, f: 2400 + R() * 1600, q: 3, d: .02, v: .4 }); ruido({ t, fil: 'lowpass', f: 600, d: .05, v: .2 }); },
    arena: (t) => ruido({ t, f: varia(1800), q: .7, a: .025, d: .1, v: .3 }),
    agua: (t) => { ruido({ t, fil: 'lowpass', f: 1800, f2: 500, d: .12, v: .45 }); tono({ t: t + .03, tipo: 'sine', f: varia(480), f2: 880, d: .06, v: .12 }); },
    nieve: (t) => { ruido({ t, fil: 'lowpass', f: varia(1500), a: .035, d: .12, v: .35 }); for (let k = 0; k < 3; k++) ruido({ t: t + .02 + k * .025, fil: 'highpass', f: 3500, d: .015, v: .12 }); },
    empedrado: (t) => { tono({ t, tipo: 'triangle', f: varia(220), f2: 160, d: .03, v: .28 }); ruido({ t, fil: 'highpass', f: 2500, d: .03, v: .25 }); },
  };
  const caminar = (k) => { for (let i = 0; i < 4; i++) PASO[k](i * .32); return 1.3; };

  // voz en "idioma bicho": sílabas cortas alrededor de una nota base
  const voz = (base, tipo, lp) => { const salto = [0, .12, .25, -.1, .18]; for (let i = 0; i < 11; i++) { if (i === 5) continue; tono({ t: i * .075, tipo, f: base * (1 + salto[Math.floor(R() * salto.length)]), d: .05, v: .14, lp }); } return 1; };

  const S = {
    // Mapa
    pasoTierra: () => caminar('tierra'), pasoPasto: () => caminar('pasto'), pasoRipio: () => caminar('ripio'), pasoArena: () => caminar('arena'),
    pasoAgua: () => caminar('agua'), pasoNieve: () => caminar('nieve'), pasoEmpedrado: () => caminar('empedrado'),
    puerta: () => { ruido({ f: 400, f2: 1600, a: .15, d: .25, v: .3 }); tono({ tipo: 'triangle', f: 300, f2: 900, a: .2, d: .2, v: .12 }); return .5; },
    hablar: () => { tono({ tipo: 'triangle', f: 660, d: .06, v: .22 }); tono({ tipo: 'triangle', f: 990, t: .07, d: .1, v: .22 }); return .3; },
    vozGrave: () => voz(140, 'sawtooth', 900), vozMedia: () => voz(260, 'square', 1800), vozAguda: () => voz(420, 'triangle'),
    salvaje: () => { ruido({ fil: 'highpass', f: 3000, d: .05, v: .3 }); [520, 780, 1040].forEach((f, i) => tono({ f, t: i * .07, d: i === 2 ? .18 : .06, v: .18 })); return .5; },
    fogon: () => { ruido({ fil: 'lowpass', f: 300, a: .3, d: 1.8, v: .1 }); for (let i = 0; i < 26; i++) ruido({ t: R() * 2.1, fil: 'highpass', f: 2000 + R() * 3000, q: .5, d: .01 + R() * .02, v: .08 + R() * .3 }); return 2.3; },
    mate: () => { ruido({ f: 700, f2: 2600, q: 6, a: .05, d: .45, v: .35, lfo: 300, lfoF: 14 }); for (let i = 0; i < 3; i++) tono({ t: .55 + i * .07, tipo: 'sine', f: 300 + R() * 200, f2: 520, d: .05, v: .12 }); return .9; },
    carpa: () => { [880, 740, 659, 587, 494].forEach((f, i) => tono({ tipo: 'triangle', f, t: i * .18, d: .4, v: .15, ec: .4 })); return 1.5; },
    // Captura
    boleadora: () => { for (let i = 0; i < 3; i++) ruido({ t: i * .28, f: 500 + i * 120, f2: 1600 + i * 300, q: 2, a: .12, d: .14, v: .32 }); return .9; },
    lanzar: () => { ruido({ f: 1800, f2: 400, q: 1.5, a: .02, d: .35, v: .35 }); tono({ tipo: 'sine', f: 900, f2: 300, d: .3, v: .08 }); return .45; },
    guayaca: () => { tono({ tipo: 'sine', f: 140, f2: 55, d: .2, v: .5 }); ruido({ fil: 'lowpass', f: 900, d: .08, v: .4 }); ruido({ t: .05, f: 2500, q: 4, d: .15, v: .15 }); return .35; },
    sacudida: () => { for (let i = 0; i < 3; i++) { tono({ t: i * .55, tipo: 'triangle', f: 330, d: .05, v: .3 }); ruido({ t: i * .55, f: 1200, q: 2, d: .04, v: .2 }); } return 1.4; },
    atrapado: () => { [523, 659, 784, 1047].forEach((f, i) => tono({ f, t: i * .09, d: .12, v: .15 })); [1047, 1319].forEach((f) => tono({ tipo: 'triangle', f, t: .38, d: .55, v: .14, ec: .4 })); for (let i = 0; i < 4; i++) tono({ tipo: 'sine', f: 2093 + R() * 1200, t: .4 + i * .08, d: .1, v: .05 }); return 1.1; },
    escapo: () => { ruido({ fil: 'highpass', f: 1500, d: .05, v: .4 }); tono({ f: 660, f2: 440, t: .08, d: .1, v: .15 }); tono({ f: 440, f2: 300, t: .2, d: .22, v: .15 }); return .5; },
    // Combate por tipo
    Fuego: () => { ruido({ f: 300, f2: 2500, q: .8, a: .06, d: .4, v: .5 }); ruido({ fil: 'lowpass', f: 220, a: .02, d: .45, v: .3 }); tono({ tipo: 'sawtooth', f: 90, f2: 60, d: .35, v: .15, lp: 400 }); return .55; },
    Flora: () => { ruido({ fil: 'highpass', f: 4000, a: .02, d: .25, v: .25 }); ruido({ f: 2500, f2: 6000, q: 3, d: .08, v: .3 }); [784, 988, 1175].forEach((f, i) => tono({ tipo: 'triangle', f, t: .02 + i * .05, d: i === 2 ? .15 : .08, v: .15 })); return .4; },
    Agua: () => { ruido({ fil: 'lowpass', f: 3000, f2: 400, a: .01, d: .3, v: .5 }); for (let i = 0; i < 6; i++) { const f = 400 + R() * 500; tono({ tipo: 'sine', f, f2: f * 1.6, t: .05 + i * .05, d: .05, v: .1 }); } return .45; },
    Tierra: () => { tono({ tipo: 'sine', f: 95, f2: 38, d: .45, v: .7 }); ruido({ fil: 'lowpass', f: 250, a: .02, d: .6, v: .5 }); tono({ tipo: 'sine', f: 80, f2: 40, t: .14, d: .25, v: .35 }); return .7; },
    Roca: () => { tono({ f: 160, f2: 90, d: .06, v: .3 }); ruido({ fil: 'highpass', f: 1800, d: .07, v: .5 }); for (let i = 0; i < 5; i++) ruido({ t: .08 + i * .05 + R() * .02, f: 3000, q: 4, d: .02, v: .15 }); return .45; },
    Viento: () => { ruido({ f: 400, f2: 2400, q: 3, a: .25, d: .4, v: .5 }); ruido({ t: .2, f: 800, f2: 300, q: 3, d: .3, v: .25 }); return .75; },
    Rayo: () => { tono({ tipo: 'sawtooth', f: 1800, f2: 120, d: .25, v: .22, vib: 120, vibF: 45 }); ruido({ fil: 'highpass', f: 3000, d: .3, v: .3, lfo: 2500, lfoF: 30 }); tono({ f: 60, d: .3, v: .14, lp: 300 }); return .45; },
    Hielo: () => { [2093, 2637, 3136, 4186].forEach((f, i) => tono({ tipo: 'sine', f, t: i * .03, d: .6, v: .1, ec: .4 })); ruido({ fil: 'highpass', f: 6000, a: .01, d: .15, v: .2 }); return .8; },
    Veneno: () => { for (let i = 0; i < 8; i++) { const f = 200 + R() * 250; tono({ tipo: 'sine', f, f2: f * .7, t: i * .06, d: .07, v: .16 }); } ruido({ f: 1200, q: 1, a: .1, d: .4, v: .15 }); return .6; },
    Común: () => { ruido({ fil: 'lowpass', f: 1500, d: .08, v: .5 }); tono({ tipo: 'sine', f: 220, f2: 70, d: .12, v: .5 }); return .25; },
    Mito: () => { tono({ tipo: 'triangle', f: 220, f2: 330, a: .1, d: .8, v: .18, ec: .6, vib: 4 }); tono({ tipo: 'triangle', f: 223, f2: 335, a: .1, d: .8, v: .18, ec: .6, vib: 4 }); tono({ tipo: 'sine', f: 880, t: .3, d: .7, v: .06, ec: .6 }); return 1.3; },
    critico: () => { S.Común(); tono({ f: 1568, t: .06, d: .12, v: .12 }); tono({ f: 2093, t: .1, d: .2, v: .1, ec: .3 }); return .45; },
    amague: () => { ruido({ f: 3000, f2: 800, q: 2, a: .01, d: .15, v: .35 }); ruido({ t: .12, f: 800, f2: 3000, q: 2, d: .12, v: .2 }); return .35; },
    cubrirse: () => { tono({ tipo: 'triangle', f: 440, d: .4, v: .25, ec: .4 }); tono({ tipo: 'triangle', f: 663, d: .35, v: .12 }); ruido({ f: 3000, d: .03, v: .3 }); return .6; },
    marca: () => { ruido({ fil: 'lowpass', f: 900, d: .05, v: .4 }); tono({ f: 880, t: .06, d: .06, v: .1 }); tono({ f: 1320, t: .11, d: .1, v: .1 }); return .3; },
    reaccion: () => { [392, 523, 659, 784].forEach((f, i) => tono({ f, t: i * .05, d: .06, v: .12 })); tono({ tipo: 'sine', f: 120, f2: 40, t: .25, d: .5, v: .6 }); ruido({ fil: 'lowpass', f: 2000, f2: 200, t: .25, d: .6, v: .5, ec: .2 }); return .95; },
    vencido: () => { tono({ f: 440, f2: 110, d: .5, v: .15, lp: 1500 }); tono({ tipo: 'sine', f: 80, f2: 40, t: .5, d: .2, v: .5 }); ruido({ fil: 'lowpass', f: 400, t: .5, d: .2, v: .3 }); return .8; },
    relevo: () => { tono({ tipo: 'sine', f: 1400, f2: 2100, a: .03, d: .12, v: .25, vib: 30, vibF: 9 }); tono({ tipo: 'sine', f: 2100, f2: 1500, t: .2, a: .02, d: .2, v: .25, vib: 30, vibF: 9 }); return .5; },
    // Avisos y menú
    boton: () => { tono({ tipo: 'triangle', f: 1200, d: .03, v: .2 }); return .1; },
    volver: () => { tono({ tipo: 'triangle', f: 900, f2: 600, d: .05, v: .2 }); return .1; },
    noSe: () => { tono({ f: 140, d: .08, v: .16, lp: 800 }); tono({ f: 140, t: .11, d: .08, v: .16, lp: 800 }); return .25; },
    changa: () => { tono({ tipo: 'triangle', f: 1319, d: .3, v: .2, ec: .3 }); tono({ tipo: 'triangle', f: 1760, t: .12, d: .5, v: .2, ec: .3 }); return .7; },
    chirolas: () => { const n = [2637, 3136, 2637, 3520, 3136, 3951, 3520]; n.forEach((f, i) => { tono({ f, t: i * .045, d: .07, v: .06 }); tono({ tipo: 'sine', f: f * 1.5, t: i * .045, d: .09, v: .04 }); }); return .5; },
    nivel: () => { [523, 659, 784, 1047, 1319].forEach((f, i) => tono({ f, t: i * .07, d: .1, v: .12 })); [1047, 1319, 1568].forEach((f) => tono({ tipo: 'triangle', f, t: .4, d: .5, v: .1, ec: .3 })); return 1; },
    camino: () => { tono({ tipo: 'triangle', f: 200, f2: 1600, a: 1.2, d: .3, v: .12, vib: 8, vibF: 7 }); ruido({ f: 1000, f2: 6000, q: 2, a: 1.2, d: .2, v: .1 }); [523, 659, 784, 1047].forEach((f) => tono({ tipo: 'sine', f, t: 1.4, d: 1, v: .1, ec: .5 })); for (let i = 0; i < 5; i++) tono({ tipo: 'sine', f: 2500 + R() * 1500, t: 1.45 + i * .07, d: .1, v: .04 }); return 2.6; },
    insignia: () => { [[392, 0, .1], [392, .12, .1], [523, .24, .35], [659, .5, .15], [784, .66, .6]].forEach(([f, t, d]) => tono({ f, t, d, v: .14, ec: .3 })); tono({ tipo: 'triangle', f: 196, d: .45, v: .18 }); tono({ tipo: 'triangle', f: 262, t: .5, d: .8, v: .18 }); return 1.5; },
    libreta: () => { for (let i = 0; i < 3; i++) ruido({ t: i * .09, f: 3500, q: 2, a: .01, d: .06, v: .25 }); tono({ tipo: 'sine', f: 1568, t: .32, d: .4, v: .12, ec: .3 }); return .8; },
  };

  window.SFX = {
    play(nombre) { if (!ctx) armar(new (window.AudioContext || window.webkitAudioContext)()); if (ctx.resume) ctx.resume(); K = GAN[nombre] ?? 1; const d = S[nombre](); K = 1; return d; },
    volumen(v) { window.SFX_VOL = v; if (master) master.gain.value = v; },
    // Para medir sin parlantes: renderiza un efecto en un contexto fuera de línea y devuelve el pico y el RMS.
    async medir(nombre, crudo) {
      const c = new OfflineAudioContext(1, 44100 * 3, 44100); armar(c); K = crudo ? 1 : (GAN[nombre] ?? 1); const dur = S[nombre](); K = 1;
      const b = await c.startRendering(); const d = b.getChannelData(0); let pk = 0, sum = 0; const n = Math.min(d.length, Math.ceil((dur + .1) * 44100));
      for (let i = 0; i < n; i++) { const x = Math.abs(d[i]); if (x > pk) pk = x; sum += x * x; }
      ctx = null; return { nombre, pico: +pk.toFixed(3), rms: +Math.sqrt(sum / n).toFixed(3), dur };
    },
    nombres: Object.keys(S),
  };
})();
