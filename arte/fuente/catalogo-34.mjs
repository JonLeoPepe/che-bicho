// Catálogo para aprobar, lote 14f: pantalla Personaje, pilchas de la feria y ropero.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { O, T, fondo, cab, papel, sec, moneda, tel, css } from './catalogo-29.mjs';
import { boton } from './catalogo-30.mjs';

// ---- pilchas: el mismo protagonista con otra ropa ----
const base = jugador();
const iSombrero = base.indexOf('<path d="M34,19 C34,14 86,14 86,19');
const finCabeza = base.lastIndexOf('</g>');
const iCabeza = base.indexOf('<g class="cabeza"');
const cierreCuerpo = base.lastIndexOf('</g>', iCabeza);
const SOMB = {
  boina: `<path d="M42,20 C42,9 78,9 80,18 C80,22 44,24 42,20Z" fill="#23304a" ${'stroke="#2a1c15" stroke-width="2.2"'}/><path d="M60,10 L61,6" stroke="#2a1c15" stroke-width="2.4" stroke-linecap="round"/>`,
  chullo: `<path d="M45,24 C44,8 76,8 75,24Z" fill="#c8562a" stroke="#2a1c15" stroke-width="2.2"/><path d="M46,18 L74,18" stroke="#f2b03a" stroke-width="3"/><path d="M47,13 L73,13" stroke="#2f7d5b" stroke-width="2.4"/><path d="M45,24 L43,36 L48,34 L48,24Z M75,24 L77,36 L72,34 L72,24Z" fill="#c8562a" stroke="#2a1c15" stroke-width="1.8" stroke-linejoin="round"/><circle cx="60" cy="7" r="4" fill="#f2b03a" stroke="#2a1c15" stroke-width="1.6"/>`,
  negro: `<path d="M32,19 C32,14 88,14 88,19 C88,23 32,23 32,19Z" fill="#1f1a18" stroke="#2a1c15" stroke-width="2.2"/><path d="M46,17 L47,6 L73,6 L74,17Z" fill="#2a2420" stroke="#2a1c15" stroke-width="2.2"/><path d="M46,15 L74,15" stroke="#a8322a" stroke-width="2.6"/>`,
};
const PONCHO = (c, g) => `<path d="M48,54 C52,59 68,59 72,54 L92,102 C78,112 42,112 28,102Z" fill="${c}" stroke="#2a1c15" stroke-width="2.4" stroke-linejoin="round"/><path d="M33,96 C46,103 74,103 87,96" stroke="${g}" stroke-width="3.4" fill="none"/><path d="M31,100 C46,107 74,107 89,100" stroke="#1f1a18" stroke-width="1.6" fill="none"/><path d="M30,104 L29,110 M38,107 L37,113 M46,109 L46,115 M54,110 L54,116 M62,110 L62,116 M70,109 L70,115 M78,107 L79,113 M86,104 L87,110" stroke="${c}" stroke-width="1.8"/>`;
const pilcha = ({ col = {}, somb, poncho } = {}) => {
  let s = base;
  if (somb) s = s.slice(0, iSombrero) + SOMB[somb] + s.slice(s.indexOf('</g>', iSombrero));
  if (poncho) { const k = s.lastIndexOf('</g>', s.indexOf('<g class="cabeza"')); s = s.slice(0, k) + PONCHO(...poncho) + s.slice(k); }
  for (const [a, b] of Object.entries(col)) s = s.split(a).join(b);
  return s;
};
const PIL = [
  ['De arranque', 'Salta', 0, 'puesta', {}],
  ['Poncho salteño', 'Salta', 400, 'tenes', { poncho: ['#a8322a', '#1f1a18'] }],
  ['De gala', 'Salta', 500, '', { somb: 'negro', col: { '#7a4e2c': '#1f1a18', '#b9a681': '#3a3434', '#a8956f': '#2e2a2a' } }],
  ['Boina y bombacha', 'Corrientes', 350, '', { somb: 'boina', col: { '#e9e1cf': '#cfe2ee', '#b9a681': '#8a8f7a', '#a8956f': '#7a7f6a', '#7a4e2c': '#3a4a6a' } }],
  ['Chullo', 'Jujuy', 350, '', { somb: 'chullo', col: { '#7a4e2c': '#7a3a6a' } }],
  ['Poncho de llama', 'Jujuy', 450, '', { somb: 'negro', poncho: ['#c9a87a', '#7a4a2a'] }],
];
const PROVC = { Salta: '#b8432e', Corrientes: '#2f7d5b', Jujuy: '#7a5aa8' };

// ---------- T17 Personaje ----------
const herr = {
  boleadora: `<path d="M14,30 C18,22 26,22 30,16 M14,30 C20,32 28,34 34,32" stroke="#8a5a32" stroke-width="2" fill="none"/>${[[12, 32], [32, 14], [36, 32]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#9aa4ac" stroke="${O}" stroke-width="1.8"/>`).join('')}`,
  machete: `<path d="M8,36 L14,30" stroke="#5e351c" stroke-width="6" stroke-linecap="round"/><path d="M14,30 L36,8 C40,6 42,10 38,14 L18,34Z" fill="#c9ced2" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/>`,
  canoa: `<path d="M2,22 C10,32 30,32 38,22 L34,20 C26,24 14,24 6,20Z" fill="#8a5a32" stroke="${O}" stroke-width="1.8"/><path d="M26,8 L18,30" stroke="#5e351c" stroke-width="2.6" stroke-linecap="round"/>`,
  soga: `<ellipse cx="20" cy="22" rx="15" ry="11" fill="none" stroke="#c9a46a" stroke-width="5"/><ellipse cx="20" cy="22" rx="9" ry="6" fill="none" stroke="#c9a46a" stroke-width="4"/>`,
};
const caja = (x, k, n, sub, tiene) => `<g transform="translate(${x} 452)"><rect width="70" height="96" rx="10" fill="${tiene ? '#fffaf0' : '#e4d8bf'}" stroke="${tiene ? '#c9b48a' : '#b8a88c'}" stroke-width="1.4" ${tiene ? '' : 'stroke-dasharray="4 3"'}/><g transform="translate(10 6) scale(1.05)" ${tiene ? '' : 'filter="url(#sil)" opacity=".6"'}>${herr[k]}</g>${T(35, 66, 11.5, n, { w: 800, a: 'middle', c: tiene ? '#3a2414' : '#8a7a64' })}${sub.map((l, i) => T(35, 80 + i * 11, 9, l, { a: 'middle', c: '#8a6a4a' })).join('')}</g>`;
const personaje = svg('0 0 360 760', `${fondo}${cab('Personaje')}${papel(16, 70, 328, 672)}
  <ellipse cx="100" cy="398" rx="62" ry="9" fill="#d9ccb4"/><g transform="translate(10 88) scale(1.5)">${pilcha(PIL[1][4])}</g>
  ${T(190, 104, 20, 'Jonathan', { f: 'Bree' })}${T(190, 126, 12, 'Salta ★, 12 h 40 min', { c: '#5a3e28' })}
  ${T(190, 156, 11, 'Pilcha puesta', { w: 800, c: '#8a6a4a' })}${T(190, 174, 14, 'Poncho salteño', { f: 'Bree' })}${boton(190, 186, 136, 'Ropero', '#7a4a2a', 38)}
  <g transform="translate(190 246)"><rect width="136" height="128" rx="12" fill="#5e351c" stroke="${O}" stroke-width="2"/>${T(68, 24, 14, 'Cinto', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${23 + (i % 4) * 30}" cy="${48 + Math.floor(i / 4) * 30}" r="11" fill="${i < 2 ? '#d8dde2' : '#4e2a14'}" stroke="${i < 2 ? O : '#a8804e'}" stroke-width="1.6" stroke-dasharray="${i < 2 ? '' : '3 3'}"/>`).join('')}${T(68, 116, 11, '2 de 8, tocá para abrir', { w: 800, a: 'middle', c: '#f2d9a8' })}</g>
  <path d="M34,418 L326,418" stroke="#d9ccb4" stroke-width="1.4"/>${sec(442, 'Apero')}${T(326, 442, 10, 'no se gastan ni se compran', { w: 800, a: 'end', c: '#8a6a4a' })}
  ${caja(34, 'boleadora', 'Boleadora', ['1 mejora de 3'], 1)}${caja(108, 'machete', 'Machete', ['abre el monte'], 1)}${caja(182, 'canoa', 'Canoa', ['Capataz', 'Rosendo'], 0)}${caja(256, 'soga', 'Soga', ['Capataza', 'Eulogia'], 0)}
  ${T(180, 576, 11.5, 'Las herramientas abren rincones en otras', { a: 'middle', c: '#5a3e28' })}${T(180, 592, 11.5, 'provincias. Tocá una para ver cuáles.', { a: 'middle', c: '#5a3e28' })}
  <g transform="translate(34 612)"><rect width="292" height="56" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(8 8)"><path d="M6,4 L34,4 L34,36 L6,36Z" fill="#f4ead2" stroke="${O}" stroke-width="1.8"/><path d="M10,30 C14,22 20,26 24,18 C26,14 29,15 30,10" stroke="#c8562a" stroke-width="2" stroke-dasharray="3 3" fill="none"/></g>${T(56, 24, 14, 'Papeles', { f: 'Bree' })}${T(56, 42, 11.5, '2 pistas y el encargo de hoy', { c: '#5a3e28' })}${T(278, 34, 18, '›', { w: 800, a: 'end', c: '#8a6a4a' })}</g>
  ${T(180, 700, 11.5, 'Rincones abiertos: 1 de 6', { w: 800, a: 'middle', c: '#5a3e28' })}`);

// ---------- T18 Feria, pestaña Pilchas (el ropero es igual, sin precios) ----------
const carta = (x, y, [n, prov, precio, est, o]) => `<g transform="translate(${x} ${y})"><rect width="150" height="184" rx="14" fill="#fffaf0" stroke="${est === 'puesta' ? '#2f9a5b' : O}" stroke-width="${est === 'puesta' ? 3 : 1.6}"/><g transform="translate(42 2) scale(.6)">${pilcha(o)}</g>
  ${T(75, 142, 13, n, { f: 'Bree', a: 'middle' })}<circle cx="${75 - prov.length * 3.2 - 6}" cy="${153}" r="3.6" fill="${PROVC[prov]}"/>${T(75 + 2, 157, 10, prov, { w: 800, a: 'middle', c: PROVC[prov] })}
  ${est === 'puesta' ? `<rect x="40" y="163" width="70" height="18" rx="9" fill="#2f9a5b"/>${T(75, 176, 10, 'Puesta', { w: 800, a: 'middle', c: '#fff' })}` : est === 'tenes' ? `<rect x="36" y="163" width="78" height="18" rx="9" fill="#c9b48a"/>${T(75, 176, 10, 'La tenés', { w: 800, a: 'middle', c: '#3a2414' })}` : `${moneda(56, 171)}${T(74, 176, 13, precio, { f: 'Bree' })}`}</g>`;
const pilchas = svg('0 0 360 760', `${fondo}${cab('Feria')}${moneda(262, 70)}${T(326, 75, 14, '1.250', { f: 'Bree', a: 'end', c: '#fbf3e2' })}
  ${[['Prendas', 100], ['Pilchas', 100]].map(([n, w], i) => `<g transform="translate(${20 + i * 108} 94)"><rect width="${w}" height="30" rx="15" fill="${i === 1 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${T(w / 2, 20, 12.5, n, { w: 800, a: 'middle' })}</g>`).join('')}
  ${PIL.map((p, i) => carta(20 + (i % 2) * 170, 136 + Math.floor(i / 2) * 192, p)).join('')}
  ${T(180, 732, 11, 'Solo cambian cómo te ves: no dan ventajas.', { w: 800, a: 'middle', c: '#f4ead2' })}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). T10 se actualizó en el lote 14c: ahora tiene una sola ranura de prenda.</div>
<section><div class="tres">
${tel('T17', 'Personaje', personaje, 'Desde el Menú (reemplaza al botón Cinto). Tu personaje con la pilcha puesta, el cinto (se toca para abrirlo), el apero con la boleadora y las herramientas (las que faltan, en sombra con quién las da) y los papeles de pistas y encargos.')}
${tel('T18', 'Feria: pilchas', pilchas, 'Ropa del protagonista, distinta en cada provincia. Solo cambian cómo te ves. El Ropero (botón en Personaje) es la misma grilla con las que tenés, sin precios.')}
</div></section>`;
writeFileSync(new URL('./catalogo-34.html', import.meta.url), pagina('Catálogo para aprobar, lote 14f', 'Personaje, pilchas y ropero', cuerpo, css));
