// IA de rivales (ia-de-rivales, aprobado): nunca ve lo que elegiste. Mira cada acción, imagina qué puede
// hacer el jugador según lo que viene haciendo (si "lee") y elige lo mejor. Tres perillas: yerro, lectura y estilo.
import { acciones, activo, amenaza, amenazaTec, clonar, ronda, reemplazosMaquina, evaluar, REAC, DET, MARCA, vivos, puedeCubrirse, Rng } from './combate.js';

function fuerte(S, k, clima, A) {
  const a = activo(S[k]), o = activo(S[1 - k]);
  const t = A.filter((x) => x[0] === 't');
  return t.length ? t.reduce((m, x) => (amenazaTec(a, o, a.tec[x[1]], clima) > amenazaTec(a, o, a.tec[m[1]], clima) ? x : m)) : A[0];
}
function barato(S, k, clima, A) {
  const a = activo(S[k]), o = activo(S[1 - k]);
  const t = A.filter((x) => x[0] === 't' && a.tec[x[1]].c <= 1);
  return t.length ? t.reduce((m, x) => (amenazaTec(a, o, a.tec[x[1]], clima) > amenazaTec(a, o, a.tec[m[1]], clima) ? x : m)) : A[0];
}
const ventaja = (b, o, clima) => amenaza(b, o, clima) / Math.max(o.hp, 1) - amenaza(o, b, clima) / Math.max(b.hp, 1);
function mejorRelevo(S, k, clima, A) {
  const L = S[k], o = activo(S[1 - k]);
  const sw = A.filter((x) => x[0] === 's');
  return sw.length ? sw.reduce((m, x) => (ventaja(L.eq[x[1]], o, clima) > ventaja(L.eq[m[1]], o, clima) ? x : m)) : null;
}
function concreta(S, j, clima, cls) {
  const A = acciones(S[j]);
  if (cls === 'c' && A.some((x) => x[0] === 'c')) return ['c', 0];
  if (cls === 's') { const x = mejorRelevo(S, j, clima, A); if (x) return x; }
  if (cls === 'l') return barato(S, j, clima, A);
  return fuerte(S, j, clima, A);
}
export function clase(S, k, x) {
  if (x[0] === 'c') return 'cubre';
  if (x[0] === 's') return 'relevo';
  if (x[0] === 'n') return 'nada';
  const t = activo(S[k]).tec[x[1]];
  return t.m ? 'marca' : t.c >= 2 ? 'fuerte' : 'liviano';
}

/** Probabilidad de lo que hará el rival: con lectura, cuenta sus últimas 8 jugadas. */
function distribucion(S, k, mem, lee) {
  const o = activo(S[1 - k]);
  const h = mem.hist.slice(-8);
  const cnt = lee ? { f: h.filter((c) => c === 'f').length + 1.2, l: h.filter((c) => c === 'l').length + 0.8, c: h.filter((c) => c === 'c').length + 0.6, s: h.filter((c) => c === 's').length + 0.4 } : { f: 1, l: 1, c: 1, s: 1 };
  if (o.ag + 1 < 2) cnt.f = 0;
  if (!puedeCubrirse(o)) cnt.c = 0;
  if (!acciones(S[1 - k]).some((x) => x[0] === 's')) cnt.s = 0;
  const tot = Object.values(cnt).reduce((a, b) => a + b, 0) || 1;
  return Object.entries(cnt).filter(([, v]) => v > 0).map(([c, v]) => [c, v / tot]);
}

/** Crea una IA. Devuelve (S, k, clima, rng, mem) => acción. */
export function hacerIA({ yerro = 0, lee = true, sesgo = {} } = {}) {
  return (S, k, clima, rng, mem) => {
    const A = acciones(S[k]);
    if (A.length === 1) return A[0];
    if (rng.sig() < yerro) return rng.elegir(A);
    const dist = distribucion(S, k, mem, lee);
    const opp = Object.fromEntries(dist.map(([c]) => [c, concreta(S, 1 - k, clima, c)]));
    let best = null, bv = -Infinity;
    for (const x of A) {
      let v = 0;
      for (const [c, p] of dist) {
        const acts = k === 0 ? [x, opp[c]] : [opp[c], x];
        for (const f of [0, 1]) {
          const T = clonar(S);
          ronda(T, acts, clima, new Rng(5 + f), null, f);
          reemplazosMaquina(T, clima);
          v += p * evaluar(T, k, clima) / 2;
        }
      }
      v += sesgo[clase(S, k, x)] || 0;
      if (v > bv) { best = x; bv = v; }
    }
    return best;
  };
}

// Niveles aprobados (ia-de-rivales y equipos-y-niveles).
export const NIVELES_IA = {
  Benito: { yerro: 0.6, lee: false, sesgo: { fuerte: 0.06 } },
  Eusebia: { yerro: 0.6, lee: false, sesgo: { marca: 0.06 } },
  Martina: { yerro: 0.6, lee: false, sesgo: { relevo: 0.06 } },
  Eusebio: { yerro: 0.4, lee: false, sesgo: { marca: 0.06 } },
  Ireneo: { yerro: 0.4, lee: false, sesgo: { cubre: 0.06 } },
  Aníbal: { yerro: 0.4, lee: false, sesgo: { relevo: 0.06 } },
  Zenón: { yerro: 0.25, lee: false, sesgo: { fuerte: 0.06 } },
  Lucía: { yerro: 0.25, lee: false, sesgo: { relevo: 0.06 } },
  Aniceto: { yerro: 0.25, lee: false, sesgo: { cubre: 0.06 } },
  Anselmo: { yerro: 0.4, lee: true, sesgo: { marca: 0.04, fuerte: 0.03 } },
  Higinio: { yerro: 0.4, lee: true, sesgo: { marca: 0.04, fuerte: 0.03 } },
  Rosendo: { yerro: 0.25, lee: true, sesgo: { marca: 0.04, relevo: 0.03 } },
  Anacleto: { yerro: 0.25, lee: true, sesgo: { marca: 0.04, relevo: 0.03 } },
  Eulogia: { yerro: 0.15, lee: true, sesgo: { marca: 0.04 } },
  Pascual: { yerro: 0.15, lee: true, sesgo: { marca: 0.04 } },
  'Torneo 1': { yerro: 0.5, lee: true, sesgo: { marca: 0.04, fuerte: 0.03 } },
  'Torneo 2': { yerro: 0.4, lee: true, sesgo: { marca: 0.04, relevo: 0.03 } },
  'Torneo 3': { yerro: 0.3, lee: true, sesgo: { marca: 0.04 } },
  // salvajes, según su carácter
  timido: { yerro: 0.75, lee: false, sesgo: { cubre: 0.08 } },
  curioso: { yerro: 0.6, lee: false, sesgo: {} },
  manso: { yerro: 0.75, lee: false, sesgo: { liviano: 0.08 } },
  bravo: { yerro: 0.4, lee: false, sesgo: { fuerte: 0.08 } },
  mito: { yerro: 0.4, lee: true, sesgo: {} },
};

// ---------------- Jugadores automáticos (para las pruebas de balance) ----------------
export const bruto = (S, k, clima) => fuerte(S, k, clima, acciones(S[k]));
export function cambiador(S, k, clima) {
  const A = acciones(S[k]); const a = activo(S[k]), o = activo(S[1 - k]);
  const x = mejorRelevo(S, k, clima, A);
  if (x && ventaja(S[k].eq[x[1]], o, clima) - ventaja(a, o, clima) > 0.35) return x;
  return fuerte(S, k, clima, A);
}
export function combo(S, k, clima) {
  const A = acciones(S[k]); const L = S[k], a = activo(L), o = activo(S[1 - k]);
  if (o.marca) {
    const det = A.filter((x) => x[0] === 't' && REAC[`${o.marca}|${a.tec[x[1]].t}`]);
    if (det.length) return det.reduce((m, x) => (a.tec[x[1]].p > a.tec[m[1]].p ? x : m));
    if (o.mt >= 2) for (const x of A) if (x[0] === 's' && L.eq[x[1]].tec.some((t) => REAC[`${o.marca}|${t.t}`])) return x;
  } else {
    const mk = A.filter((x) => x[0] === 't' && a.tec[x[1]].m);
    if (mk.length && L.eq.some((b) => b.hp > 0 && b.tec.some((t) => DET[MARCA[a.tipo]]?.has(t.t)))) return mk[0];
  }
  return fuerte(S, k, clima, A);
}
const ruido = (base, p) => (S, k, clima, rng, mem) => (rng.sig() < p ? rng.elegir(acciones(S[k])) : base(S, k, clima, rng, mem));
export const JUGADORES = {
  novato: ruido(bruto, 0.25),
  intermedio: ruido(cambiador, 0.1),
  experto: hacerIA({ yerro: 0, lee: true }),
};
export { vivos };
