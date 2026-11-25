// Salvajes: boleadora, paciencia y Rajá (GDD v2, sección 9, y bichos-por-zona, aprobados).
export const BASE_BOLEADORA = { comun: 0.40, 'poco comun': 0.28, raro: 0.12, mito: 0.05 };
export const TIRO = { perfecto: 1.6, bueno: 1.2, flojo: 0.8, malo: 0.4 };
export const PACIENCIA = { timido: 4, curioso: 6, manso: 8, bravo: Infinity, mito: Infinity };
const CONTROL = { sueno: 1.4, helado: 1.4, lodazal: 1.25, atado: 1.15 };
export const TOPE = 0.85;

/** Probabilidad de atrapar con un tiro. vidaFrac: vida que le queda (0 a 1). mejoras: 0 a 3. */
export function chanceBoleadora({ rareza, vidaFrac, tiro, efectos = {}, rendido = false, mejoras = 0 }) {
  let p = BASE_BOLEADORA[rareza] * (1 + (1 - Math.max(0, Math.min(1, vidaFrac)))) * TIRO[tiro] * (1 + 0.08 * mejoras);
  for (const [k, f] of Object.entries(CONTROL)) if (efectos[k]) p *= f;
  if (rendido) p *= 1.5;
  return Math.min(TOPE, p);
}

/** Calidad del tiro según dónde se tocó: d es la distancia al centro del aro, de 0 a 1. */
export const calidadTiro = (d) => (d < 0.15 ? 'perfecto' : d < 0.4 ? 'bueno' : d < 0.7 ? 'flojo' : 'malo');

/** Paciencia del salvaje: cada ronda gasta 1, cada Relevo tuyo 1 más y cada tiro fallado 2 en vez de 1. */
export function nuevaPaciencia(caracter) { return { queda: PACIENCIA[caracter], tirosFallados: 0, caracter }; }
export function gastarPaciencia(pac, { relevo = false, tiroFallado = false } = {}) {
  if (tiroFallado) pac.tirosFallados += 1;
  if (pac.queda !== Infinity) pac.queda -= tiroFallado ? 2 : 1 + (relevo ? 1 : 0);
  return rajaSalvaje(pac);
}
/** El salvaje se va: por paciencia, o el bravo y el mito al tercer tiro fallado. */
export const rajaSalvaje = (pac) => pac.queda <= 0 || ((pac.caracter === 'bravo' || pac.caracter === 'mito') && pac.tirosFallados >= 3);

/** Chance de rajar: 50 % ± 15 % por punto de Velocidad, entre 20 y 95 %; +20 % por cada intento fallado. */
export function chanceRaja(velMia, velSalvaje, intentosFallados = 0) {
  const base = Math.max(0.2, Math.min(0.95, 0.5 + 0.15 * (velMia - velSalvaje)));
  return Math.min(0.95, base + 0.2 * intentosFallados);
}
