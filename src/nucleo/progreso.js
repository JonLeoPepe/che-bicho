// Progreso de la aventura: bichos propios, equipo y corral, experiencia, libreta, mochila y reloj.
// Reglas puras, sin navegador (GDD v2, secciones 4, 6, 7 y 11; bichos-por-zona y economia-v1).
import { FAMILIAS } from '../datos/familias.js';
import { crearBicho } from './combate.js';

export const NIVEL_MAX = 10;
export const MOMENTOS = ['manana', 'tarde', 'noche'];
export const NOMBRE_MOMENTO = { manana: 'mañana', tarde: 'tarde', noche: 'noche' };
export const MIN_FRANJA = 8;
export const MIN_DIA = 24;
export const RAREZA_EXP = { comun: 1, 'poco comun': 1.2, raro: 1.5, mito: 2 };
export const TIPO_RIVAL_EXP = { salvaje: 1, domador: 1.5, ermitano: 2, capataz: 2, torneo: 2 };
export const TOPE_REMEDIO = 5;

/** Para subir del nivel N hacen falta 60 × N puntos. */
export const expParaSubir = (n) => 60 * n;

/** Experiencia por vencer (o atrapar) a un bicho. */
export function expVencido(nivelVencido, nivelPropio, rareza = 'comun', tipoRival = 'salvaje') {
  const d = nivelVencido - nivelPropio;
  const dif = d >= 0 ? Math.min(1.5, 1 + 0.1 * d) : Math.max(0.25, 1 - 0.15 * -d);
  return Math.round(10 * nivelVencido * dif * (RAREZA_EXP[rareza] || 1) * (TIPO_RIVAL_EXP[tipoRival] || 1));
}

/** Suma experiencia y devuelve los niveles que subió. Pasiva en el 3 y camino en el 4 quedan pendientes. */
export function darExp(b, exp) {
  const subidas = [];
  if (b.nivel >= NIVEL_MAX) return subidas;
  b.exp += exp;
  while (b.nivel < NIVEL_MAX && b.exp >= expParaSubir(b.nivel)) {
    b.exp -= expParaSubir(b.nivel); b.nivel += 1; subidas.push(b.nivel);
    if (b.nivel === 3 && !b.pasiva) b.pendiente = 'pasiva';
    if (b.nivel === 4 && !b.camino) b.pendiente = b.pendiente === 'pasiva' ? 'pasiva' : 'camino';
  }
  if (b.nivel >= NIVEL_MAX) b.exp = 0;
  return subidas;
}
/** Qué tiene que elegir todavía (pasiva antes que camino). */
export function eleccionPendiente(b) {
  if (b.nivel >= 3 && !b.pasiva) return 'pasiva';
  if (b.nivel >= 4 && !b.camino) return 'camino';
  return null;
}

// ---------- reloj ----------
export const dia = (t) => Math.floor(t / MIN_DIA) + 1;
export const momento = (t) => MOMENTOS[Math.min(2, Math.floor((t % MIN_DIA) / MIN_FRANJA))];
/** Mate amargo: pasa a la franja siguiente del mismo día; no cruza la medianoche. */
export function tomarMate(t) {
  if (momento(t) === 'noche') return null;
  return (Math.floor(t / MIN_FRANJA) + 1) * MIN_FRANJA;
}
/** Carpa: de noche, a la mañana siguiente. */
export const armarCarpa = (t) => (momento(t) === 'noche' ? dia(t) * MIN_DIA : null);
/** El momento del bicho coincide con el del reloj. */
export function enSuMomento(m, mom) {
  if (m === 'siempre') return true;
  if (m === 'dia') return mom !== 'noche';
  if (m === 'tardenoche') return mom !== 'manana';
  return m === mom;
}

// ---------- clima (anexo clima) ----------
const PESOS = { sol: 0.3, nublado: 0.3, lluvia: 0.15, viento: 0.15, nieve: 0.1 };
function hash(...xs) { let h = 2166136261; for (const c of xs.join('|')) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13; return (h >>> 0) / 4294967296; }
/** Clima de una provincia en un día y un momento. Siempre el mismo para la misma partida. */
export function climaDe(semilla, prov, d, mom) {
  if (prov === 'jujuy' && mom === 'manana' && d % 2 === 0) return 'nieve'; // en Jujuy nieva al menos un día de cada dos
  const pesos = { ...PESOS };
  if (prov === 'corrientes') { const n = pesos.nieve; delete pesos.nieve; const s = 1 - n; for (const k in pesos) pesos[k] /= s; }
  // el clima dura las tres franjas con 60 %: se sortea por franja pero se arrastra
  const base = (m) => { let x = hash(semilla, prov, d, m), acc = 0; for (const [k, p] of Object.entries(pesos)) { acc += p; if (x < acc) return k; } return 'sol'; };
  const i = MOMENTOS.indexOf(mom);
  if (i > 0 && hash(semilla, prov, d, mom, 'sigue') < 0.6) return climaDe(semilla, prov, d, MOMENTOS[i - 1]);
  return base(mom);
}
/** Lo que se ve en una zona: donde no nieva, la nieve es nublado. */
export const climaZona = (c, zona) => (c === 'nieve' && !zona.nieve ? 'nublado' : c);

// ---------- bichos propios ----------
export function nuevoPropio(P, familia, { nivel = 2, camino = 0, pasiva = null, zona = '', vida = 1 } = {}) {
  const b = { id: P.sigId++, familia, nivel, exp: 0, camino, pasiva, prenda: null, apodo: '', vida, dia: dia(P.reloj), zona, rudas: 0 };
  P.bichos.push(b);
  return b;
}
export const especie = (b) => (b.camino ? FAMILIAS[b.familia].caminos[b.camino - 1] : b.familia);
export const nombreDe = (b) => b.apodo || especie(b);
export const delEquipo = (P) => P.equipo.map((id) => P.bichos.find((b) => b.id === id)).filter(Boolean);
export const enCorral = (P) => P.bichos.filter((b) => !P.equipo.includes(b.id));
/** Bicho de combate a partir de uno propio, con la vida que le queda. */
export function paraCombate(b) {
  const c = crearBicho(b.familia, { nivel: b.nivel, camino: b.camino, pasiva: b.pasiva, prenda: b.prenda });
  c.propio = b.id; c.hp = Math.max(0, Math.round(c.hpmax * b.vida)); c.nombre = especie(b); c.apodo = b.apodo;
  return c;
}
export const curarTodos = (P) => { for (const b of P.bichos) b.vida = 1; };

/** Agrega un bicho atrapado: si ya hay de esa familia, se amadrina; si no, va al equipo o al corral. */
export function atrapar(P, familia, nivel, camino, zonaNombre) {
  const F = FAMILIAS[familia];
  marcarAtrapado(P, familia, camino, zonaNombre);
  const ya = P.bichos.find((b) => b.familia === familia);
  if (ya) {
    const antes = ya.nivel;
    if (nivel > ya.nivel) { ya.nivel = nivel; ya.exp = 0; }
    return { amadrina: ya, antes, nivel: ya.nivel };
  }
  if (P.equipo.length < 6) { const b = nuevoPropio(P, familia, { nivel, camino, zona: zonaNombre }); P.equipo.push(b.id); return { nuevo: b, alEquipo: true }; }
  if (enCorral(P).length >= P.corralCap) return { lleno: true };
  const b = nuevoPropio(P, familia, { nivel, camino, zona: zonaNombre });
  void F;
  return { nuevo: b, alEquipo: false };
}

// ---------- libreta ----------
export function marcarVisto(P, familia, zonaNombre) { if (!P.libreta.vistos[familia]) P.libreta.vistos[familia] = zonaNombre; }
export function marcarAtrapado(P, familia, camino, zonaNombre) {
  marcarVisto(P, familia, zonaNombre);
  if (!P.libreta.atrapados[familia]) P.libreta.atrapados[familia] = { dia: dia(P.reloj), zona: zonaNombre };
  const F = FAMILIAS[familia];
  P.libreta.formas[camino ? F.caminos[camino - 1] : F.base] = true;
}
/** Libreta completa: todas las familias de la provincia atrapadas, sin el mito. */
export function libretaCompleta(P, provincia) {
  return Object.entries(FAMILIAS).filter(([, F]) => F.provincia === provincia && !F.mito).every(([k]) => P.libreta.atrapados[k]);
}
export const familiasDe = (provincia) => Object.entries(FAMILIAS).filter(([, F]) => F.provincia === provincia).map(([k]) => k);

// ---------- dinero y mochila ----------
export function pagar(P, n) { if (P.chirolas < n) return false; P.chirolas -= n; return true; }
export const cobrar = (P, n) => { P.chirolas += Math.round(n); };
