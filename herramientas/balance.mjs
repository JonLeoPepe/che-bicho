// Repite en JavaScript las pruebas de balance del simulador (equipos-y-niveles y combate-v5) para compararlas.
// Uso: node herramientas/balance.mjs [peleas por casilla]
import { Rng, CLIMAS } from '../src/nucleo/combate.js';
import { FAMILIAS } from '../src/datos/familias.js';
import { hacerIA, NIVELES_IA, JUGADORES } from '../src/nucleo/ia.js';
import { pelear, sorteo } from '../src/nucleo/batalla.js';

const N = Number(process.argv[2] || 60);
const EQ = {
  Benito: ['Salta', 3, ['Kirkallpa', 'Llamarú', 'Pasacán', 'Pirkasol', 'Mallku', 'Miyurá'], 3, ['Salta']],
  Eusebia: ['Salta', 3, ['Yakusapo', 'Lucerna', 'Miyurá', 'Ajinina', 'Llamarú', 'Escarchuña'], 3, ['Salta']],
  Martina: ['Salta', 4, ['Pirkasol', 'Mallku', 'Escarchuña', 'Kirkallpa', 'Lucerna', 'Pasacán'], 4, ['Salta']],
  Anselmo: ['Salta', 4, ['Pasacán', 'Ajinina', 'Mallku', 'Kirkallpa', 'Llamarú', 'Lucerna'], 4, ['Salta']],
  Higinio: ['Salta', 5, ['Pasacán', 'Yakusapo', 'Ajinina', 'Miyurá', 'Escarchuña', 'Pirkasol'], 5, ['Salta']],
  Eusebio: ['Corrientes', 5, ['Yacarón', 'Pirayú', 'Rayajá', 'Mbarigüí', 'Kapiyvá', 'Guasú'], 6, ['Salta', 'Corrientes']],
  Ireneo: ['Corrientes', 5, ['Tatakú', 'Kapiyvá', 'Mburucoa', 'Pajonero', 'Yacarón', 'Ventero'], 6, ['Salta', 'Corrientes']],
  Aníbal: ['Corrientes', 6, ['Ventero', 'Guasú', 'Rayajá', 'Pajonero', 'Pirayú', 'Mbarigüí'], 7, ['Salta', 'Corrientes']],
  Rosendo: ['Corrientes', 7, ['Yacarón', 'Rayajá', 'Pajonero', 'Pirayú', 'Mburucoa', 'Tatakú'], 7, ['Salta', 'Corrientes']],
  Anacleto: ['Corrientes', 8, ['Mbarigüí', 'Guasú', 'Kapiyvá', 'Tatakú', 'Ventero', 'Mburucoa'], 8, ['Salta', 'Corrientes']],
  Zenón: ['Jujuy', 7, ['Allpuma', 'Suri', 'Atoq', 'Aguijón', 'Papacuy', 'Quinti'], 8, ['Salta', 'Corrientes', 'Jujuy']],
  Lucía: ['Jujuy', 8, ['Quinti', 'Mayuq', 'Tolvanera', 'Chinchay', 'Wiskacha', 'Atoq'], 9, ['Salta', 'Corrientes', 'Jujuy']],
  Aniceto: ['Jujuy', 8, ['Wiskacha', 'Allpuma', 'Pariwana', 'Suri', 'Aguijón', 'Tolvanera'], 9, ['Salta', 'Corrientes', 'Jujuy']],
  Eulogia: ['Jujuy', 9, ['Pariwana', 'Chinchay', 'Wiskacha', 'Mayuq', 'Allpuma', 'Quinti'], 9, ['Salta', 'Corrientes', 'Jujuy']],
  Pascual: ['Jujuy', 10, ['Chinchay', 'Tolvanera', 'Papacuy', 'Pariwana', 'Suri', 'Atoq'], 10, ['Salta', 'Corrientes', 'Jujuy']],
};
const GALPON = new Set(['Anselmo', 'Rosendo', 'Eulogia']);
const DOC = { Benito: [68, 85, 92], Eusebia: [81, 85, 85], Martina: [64, 85, 91], Anselmo: [50, 65, 79], Higinio: [32, 59, 74], Eusebio: [76, 85, 92], Ireneo: [74, 81, 91], Aníbal: [54, 74, 76], Rosendo: [32, 54, 72], Anacleto: [32, 52, 61], Zenón: [57, 69, 81], Lucía: [55, 59, 81], Aniceto: [72, 81, 91], Eulogia: [39, 61, 62], Pascual: [31, 50, 55] };
const comunes = Object.values(FAMILIAS).filter((f) => !f.mito);
console.log(`Escalera en JavaScript, ${N} peleas por casilla (cada número puede variar unos ${Math.round(50 / Math.sqrt(N) * 2)} puntos arriba o abajo). Entre paréntesis, el simulador.`);
let dif = 0, n = 0;
for (const [rival, [prov, niv, fams, llega, provs]] of Object.entries(EQ)) {
  const fila = [];
  for (const [ji, jug] of ['novato', 'intermedio', 'experto'].entries()) {
    let g = 0;
    for (let i = 0; i < N; i++) {
      const r = new Rng(120000 + i * 7 + ji);
      const clima = GALPON.has(rival) ? null : r.elegir([...CLIMAS, null]);
      const pool = comunes.filter((f) => provs.includes(f.provincia)).map((f) => f.base);
      const mios = []; const p2 = [...pool]; for (let j = 0; j < 6; j++) mios.push(p2.splice(Math.floor(r.sig() * p2.length), 1)[0]);
      const a = sorteo(r, mios, llega, [-1, 0, 0, 1]); const b = sorteo(r, fams, niv, [-1, 0, 0]);
      const ia = hacerIA(NIVELES_IA[rival]); const J = JUGADORES[jug];
      g += (pelear(a, b, [J, ia], 1000 + i, clima).resultado + 1 - pelear(b, a, [ia, J], 5000 + i, clima).resultado) / 2;
    }
    const pct = Math.round(100 * g / N); fila.push(`${String(pct).padStart(3)} % (${DOC[rival][ji]})`); dif += Math.abs(pct - DOC[rival][ji]); n++;
  }
  console.log(`${rival.padEnd(9)} ${fila.join('   ')}`);
}
console.log(`Diferencia media con el simulador: ${(dif / n).toFixed(1)} puntos.`);
