// Una pelea completa entre dos lados manejados por agentes (jugadores automáticos o IA). Para pruebas y balance.
import { nuevoLado, ronda, reemplazosMaquina, vivos, claseVista, Rng, crearBicho } from './combate.js';

export function pelear(eqA, eqB, agentes, semilla, clima = null, reg = null) {
  const rng = new Rng(semilla);
  const S = [nuevoLado(eqA), nuevoLado(eqB)]; // arranca el primero de cada lado, como en el simulador
  const mem = [{ hist: [] }, { hist: [] }];
  let rondas = 0;
  for (; rondas < 80; rondas++) {
    const acts = [0, 1].map((k) => agentes[k](S, k, clima, rng, mem[k]));
    for (const k of [0, 1]) mem[k].hist.push(claseVista(S, 1 - k, acts[1 - k]));
    ronda(S, acts, clima, rng, reg);
    if (!vivos(S[0]).length || !vivos(S[1]).length) break;
    reemplazosMaquina(S, clima);
  }
  const v0 = vivos(S[0]).length > 0, v1 = vivos(S[1]).length > 0;
  return { resultado: v0 && !v1 ? 1 : v1 && !v0 ? 0 : 0.5, rondas: rondas + 1 };
}
export function sorteo(rng, familias, nivel, delta = [0]) {
  const pool = [...familias]; const salen = [];
  for (let i = 0; i < 4; i++) salen.push(pool.splice(Math.floor(rng.sig() * pool.length), 1)[0]);
  return salen.map((f) => { const nv = Math.max(1, Math.min(10, nivel + rng.elegir(delta))); return crearBicho(f, { nivel: nv, camino: nv >= 4 ? rng.entero(1, 2) : 0 }); });
}
