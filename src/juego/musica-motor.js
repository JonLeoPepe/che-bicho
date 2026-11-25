// Audio sintetizado con Web Audio: música por capas, efectos, voces en "idioma bicho" y gritos por especie. Sin muestras grabadas.
const mtof = m => 440 * 2 ** ((m - 69) / 12);
// Temas en 6/8 (zamba, cueca, carnavalito). Cada capa: [paso, nota MIDI, duración en pasos]. 12 pasos por compás.
const TEMAS = {
  titulo: { bpm: 84, pasos: 48, capas: {
    bajo: [[0, 38, 6], [6, 45, 6], [12, 41, 6], [18, 45, 6], [24, 36, 6], [30, 43, 6], [36, 38, 6], [42, 45, 6]],
    melodia: [[0, 62, 3], [3, 65, 2], [5, 64, 1], [6, 62, 6], [12, 60, 3], [15, 62, 2], [17, 64, 1], [18, 65, 6], [24, 67, 3], [27, 65, 2], [29, 64, 1], [30, 62, 4], [36, 61, 3], [39, 64, 3], [42, 62, 6]],
    bombo: [[0, 0, 1], [3, 1, 1], [6, 0, 1], [12, 0, 1], [15, 1, 1], [18, 0, 1], [24, 0, 1], [27, 1, 1], [30, 0, 1], [36, 0, 1], [39, 1, 1], [42, 0, 1]] } },
  salta: { bpm: 104, pasos: 48, capas: {
    bajo: [[0, 43, 3], [3, 50, 3], [6, 47, 3], [9, 50, 3], [12, 38, 3], [15, 45, 3], [18, 42, 3], [21, 45, 3], [24, 40, 3], [27, 47, 3], [30, 43, 3], [33, 47, 3], [36, 38, 3], [39, 45, 3], [42, 43, 6]],
    melodia: [[0, 67, 2], [2, 71, 1], [3, 74, 3], [6, 72, 2], [8, 71, 1], [9, 69, 3], [12, 66, 2], [14, 69, 1], [15, 72, 3], [18, 71, 2], [20, 69, 1], [21, 67, 3], [24, 64, 3], [27, 67, 3], [30, 71, 3], [33, 69, 3], [36, 66, 3], [39, 69, 2], [41, 66, 1], [42, 67, 6]],
    bombo: [[0, 0, 1], [3, 1, 1], [5, 1, 1], [6, 0, 1], [9, 1, 1], [12, 0, 1], [15, 1, 1], [17, 1, 1], [18, 0, 1], [21, 1, 1], [24, 0, 1], [27, 1, 1], [29, 1, 1], [30, 0, 1], [33, 1, 1], [36, 0, 1], [39, 1, 1], [41, 1, 1], [42, 0, 1], [45, 1, 1]] } },
  combate: { bpm: 150, pasos: 24, capas: {
    bajo: [[0, 45, 2], [3, 45, 1], [4, 52, 2], [6, 45, 2], [9, 43, 1], [10, 50, 2], [12, 41, 2], [15, 41, 1], [16, 48, 2], [18, 40, 2], [21, 44, 1], [22, 47, 2]],
    melodia: [[0, 69, 2], [2, 72, 1], [3, 76, 2], [6, 74, 1], [7, 72, 1], [8, 71, 1], [9, 72, 3], [12, 65, 2], [14, 69, 1], [15, 72, 2], [18, 71, 2], [20, 68, 1], [21, 64, 3]],
    bombo: [[0, 0, 1], [2, 1, 1], [3, 0, 1], [6, 0, 1], [8, 1, 1], [9, 0, 1], [12, 0, 1], [14, 1, 1], [15, 0, 1], [18, 0, 1], [20, 1, 1], [21, 0, 1]] } },
};
TEMAS.capataz = { ...TEMAS.combate, bpm: 164, capas: { ...TEMAS.combate.capas, melodia: TEMAS.combate.capas.melodia.map(([s, n, d]) => [s, n + 3, d]) } };
const JINGLES = {
  victoria: [[0, 72, 1], [1, 76, 1], [2, 79, 1], [3, 84, 3]],
  captura: [[0, 67, 1], [1, 71, 1], [2, 74, 1], [3, 79, 1], [4, 74, 1], [5, 79, 3]],
  nivel: [[0, 76, 1], [1, 79, 1], [2, 83, 2]],
  medalla: [[0, 67, 2], [2, 72, 2], [4, 76, 2], [6, 79, 2], [8, 84, 6]],
};

export class Audio {
  constructor() { this.ctx = null; this.vol = { musica: 0.6, efectos: 0.8, voces: 0.7 }; this.tema = null; this.capasOff = new Set(); }
  /** Se llama tras el primer toque (los navegadores exigen un gesto). */
  iniciar() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext; if (!AC) return;
    this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = 0.5; this.master.connect(this.ctx.destination);
    this.bus = {}; for (const k of ['musica', 'efectos', 'voces']) { const g = this.ctx.createGain(); g.gain.value = this.vol[k]; g.connect(this.master); this.bus[k] = g; }
    const n = this.ctx.sampleRate; this.ruido = this.ctx.createBuffer(1, n, n); const d = this.ruido.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    setInterval(() => this.programar(), 50);
    if (this.pendiente) this.musica(this.pendiente);
  }
  volumen(k, v) { this.vol[k] = v; if (this.bus) this.bus[k].gain.value = v; }
  nota(bus, tipo, f, t, dur, vol, f2) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = tipo; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
    o.connect(g); g.connect(this.bus[bus]); o.start(t); o.stop(t + dur + 0.02);
  }
  golpeRuido(bus, t, dur, vol, filtro) {
    const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.ruido; f.type = 'lowpass'; f.frequency.value = filtro; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0005, t + dur);
    s.connect(f); f.connect(g); g.connect(this.bus[bus]); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  }
  /** Cambia el tema. capasOff: capas a silenciar (por ejemplo, la melodía de noche). */
  musica(nombre, capasOff = []) {
    if (!this.ctx) { this.pendiente = nombre; return; }
    this.capasOff = new Set(capasOff);
    if (this.tema && this.tema.nombre === nombre) return;
    this.tema = { nombre, def: TEMAS[nombre], paso: 0, t: this.ctx.currentTime + 0.1 };
  }
  programar() {
    if (!this.tema || !this.tema.def) return;
    const tm = this.tema, d = tm.def, dp = 60 / d.bpm / 2;
    while (tm.t < this.ctx.currentTime + 0.2) {
      const p = tm.paso % d.pasos;
      for (const [capa, notas] of Object.entries(d.capas)) {
        if (this.capasOff.has(capa)) continue;
        for (const [s, n, du] of notas) if (s === p) {
          if (capa === 'bombo') this.golpeRuido('musica', tm.t, n ? 0.06 : 0.18, n ? 0.12 : 0.35, n ? 2500 : 160);
          else if (capa === 'bajo') this.nota('musica', 'triangle', mtof(n), tm.t, du * dp * 0.95, 0.22);
          else this.nota('musica', 'square', mtof(n), tm.t, du * dp * 0.9, 0.06);
        }
      }
      tm.paso++; tm.t += dp;
    }
  }
  jingle(nombre) {
    if (!this.ctx) return; const t0 = this.ctx.currentTime + 0.02;
    for (const [s, n, d] of JINGLES[nombre]) this.nota('efectos', 'square', mtof(n), t0 + s * 0.09, d * 0.09 + 0.05, 0.09);
  }
  efecto(nombre) {
    if (!this.ctx) return; const t = this.ctx.currentTime + 0.005;
    const E = {
      menu: () => this.nota('efectos', 'square', 880, t, 0.05, 0.05),
      error: () => this.nota('efectos', 'sawtooth', 140, t, 0.18, 0.08),
      golpe: () => { this.golpeRuido('efectos', t, 0.15, 0.4, 1200); this.nota('efectos', 'square', 220, t, 0.12, 0.08, 70); },
      critico: () => { this.golpeRuido('efectos', t, 0.25, 0.5, 3000); this.nota('efectos', 'square', 440, t, 0.2, 0.1, 90); },
      bolea: () => this.golpeRuido('efectos', t, 0.35, 0.25, 800),
      sacude: () => this.nota('efectos', 'triangle', 300, t, 0.08, 0.2, 200),
      monedas: () => { this.nota('efectos', 'square', 1568, t, 0.06, 0.05); this.nota('efectos', 'square', 2093, t + 0.07, 0.12, 0.05); },
      paso: () => this.golpeRuido('efectos', t, 0.03, 0.04, 600),
      cura: () => { for (let i = 0; i < 4; i++) this.nota('efectos', 'triangle', mtof(72 + i * 4), t + i * 0.06, 0.1, 0.1); },
    };
    (E[nombre] || E.menu)();
  }
  /** Voz en idioma bicho: una sílaba sintetizada cada dos letras, con tonada de cada personaje. */
  voz(texto, tono = 220, tonada = 'salta') {
    if (!this.ctx) return; let t = this.ctx.currentTime + 0.01; const letras = texto.replace(/[^\p{L}]/gu, '');
    for (let i = 0; i < letras.length; i += 2) {
      const sube = tonada === 'salta' ? (i / letras.length) * 0.25 : 0; const v = 'aeiouáéíóú'.includes(letras[i].toLowerCase()) ? 1.12 : 1;
      this.nota('voces', 'square', tono * v * (1 + sube) * (0.95 + Math.random() * 0.1), t, 0.05, 0.05); t += 0.055;
      if (i > 60) break;
    }
  }
  /** Grito sintetizado y estable para cada especie (se deriva del nombre). */
  grito(id) {
    if (!this.ctx) return; let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const t = this.ctx.currentTime + 0.01, f1 = 180 + (h % 500), f2 = 120 + ((h >> 9) % 700), tipo = ['square', 'sawtooth', 'triangle'][h % 3];
    this.nota('efectos', tipo, f1, t, 0.18, 0.09, f2); this.nota('efectos', tipo, f2, t + 0.16, 0.22, 0.07, f1 * 0.8);
  }
}
