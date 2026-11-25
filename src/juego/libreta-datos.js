// Qué familias salen en cada provincia, dónde y cuándo (sale de mundo.js, que sigue bichos-por-zona).
import { ZONAS } from '../datos/mundo.js';

export const BICHOS_POR = {};
for (const [prov, zs] of Object.entries(ZONAS)) {
  BICHOS_POR[prov] = [];
  for (const [zona, Z] of Object.entries(zs)) for (const b of Z.bichos) BICHOS_POR[prov].push({ ...b, zona, zonaNombre: Z.nombre });
}
const MOM = { siempre: 'siempre', dia: 'de día', manana: 'de mañana', tarde: 'de tarde', noche: 'de noche', tardenoche: 'de tarde y de noche' };
const CLI = { sol: 'con sol', lluvia: 'con lluvia', nieve: 'con nieve', viento: 'con viento', nublado: 'nublado' };
/** "Cuándo sale" en la libreta: "{zona}, {momento}" y, si corresponde, "con {clima}". */
export function cuandoSale(prov, familia) {
  const L = BICHOS_POR[prov].filter((b) => b.familia === familia);
  return L.map((b) => `${b.zonaNombre}, ${MOM[b.momento]}${b.clima ? ` ${CLI[b.clima]}` : ''}${b.o ? ` (${CLI[b.o]}, siempre)` : ''}`).join('. ');
}
