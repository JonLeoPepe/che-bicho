// Generador pseudoaleatorio con semilla (mulberry32). Serializable para repetir combates.
export class Rng {
  constructor(semilla = 1) { this.s = semilla >>> 0; }
  sig() {
    this.s = (this.s + 0x6D2B79F5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  entre(a, b) { return a + this.sig() * (b - a); }
  entero(a, b) { return a + Math.floor(this.sig() * (b - a + 1)); }
  elegir(lista) { return lista[Math.floor(this.sig() * lista.length)]; }
  ponderado(pares) { // [[valor, peso], ...]
    const total = pares.reduce((s, p) => s + p[1], 0);
    let r = this.sig() * total;
    for (const [v, w] of pares) { if ((r -= w) < 0) return v; }
    return pares[pares.length - 1][0];
  }
}
