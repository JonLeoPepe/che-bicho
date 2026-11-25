// Catálogo para aprobar, lote 23a: íconos de marca y de efecto (caravanas) y la pantalla de la ronda simultánea (combate v5).
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
import { tero, yacare } from './muestra-bichos.mjs';
import { lucerna } from './luciernaga.mjs';
import { kapiyva } from './catalogo-10.mjs';
import { tipoIco } from './catalogo-40.mjs';

const O = '#2a1c15', H = '#fbf3e2', CU = '#3a2414';
const T = (x, y, s, txt, { f = 'Nunito', w = 400, c = '#3a2414', a = 'start' } = {}) => `<text x="${x}" y="${y}" font-family="${f}" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="${a}">${txt}</text>`;
const L = (c = O, w = 2) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// ── Caravana: la chapita que se le pone al ganado en la oreja. Forma propia, distinta del círculo de los tipos. ──
const FORMA = 'M17,3 L31,3 C33.5,3 35,4.5 35,7 L35,11 L42,18 C43.3,19.3 44,21 44,23 L44,40 C44,43.5 41.5,46 38,46 L10,46 C6.5,46 4,43.5 4,40 L4,23 C4,21 4.7,19.3 6,18 L13,11 L13,7 C13,4.5 14.5,3 17,3Z';
const caravana = (glifo, { fondo = H, borde = O, color = O } = {}) => `<path d="${FORMA}" fill="${fondo}" stroke="${borde}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="9" r="2.6" fill="${borde === O ? '#c9b48a' : borde}" stroke="${O}" stroke-width="1.2"/>${glifo(color)}`;

// Dibujos: lo que le pasa al bicho (no el elemento), centrados en 24,31.
const GL = {
  mojado: (c) => [[17, 22], [29, 20], [23, 33]].map(([x, y]) => `<path d="M${x},${y} C${x - 4},${y + 6} ${x - 4},${y + 9} ${x},${y + 10} C${x + 4},${y + 9} ${x + 4},${y + 6} ${x},${y}Z" fill="${c}" ${L(O, 1.4)}/>`).join(''),
  chamuscado: (c) => `<path d="M11,38 C10,32 15,30 18,32 C19,27 26,26 28,30 C31,28 37,30 36,35 C38,38 35,42 31,41 C28,44 20,44 17,41 C13,42 11,41 11,38Z" fill="#5a5048" ${L(O, 1.5)}/><circle cx="20" cy="37" r="2" fill="${c}"/><circle cx="28" cy="35" r="1.6" fill="#f2b03a"/><path d="M25,26 C21,23 27,20 24,15" fill="none" ${L('#9a948c', 2.4)}/>`,
  enredado: (c) => `<rect x="19" y="17" width="10" height="27" rx="5" fill="#c9a06a" ${L(O, 1.6)}/><path d="M16,24 L32,30 M16,34 L32,40" ${L(c, 3.4)}/>${[[13, 22, -150], [33, 30, 20], [12, 35, -160]].map(([x, y, r]) => `<path d="M0,0 C4,-5 10,-4 11,0 C10,4 4,5 0,0Z" transform="translate(${x} ${y}) rotate(${r})" fill="${c}" ${L(O, 1.1)}/>`).join('')}`,
  embarrado: (c) => `<path d="M10,40 C9,35 14,33 16,36 C16,30 23,28 25,33 C27,29 34,30 33,35 C37,35 38,40 34,41 L12,41 C10,41 10,40 10,40Z" fill="${c}" ${L(O, 1.6)}/><path d="M18,41 L18,45 M27,41 L27,44" ${L(c, 2.6)}/><circle cx="18" cy="24" r="2.4" fill="${c}"/><circle cx="31" cy="22" r="1.8" fill="${c}"/>`,
  escarcha: (c) => `<path d="M9,20 C14,17 34,17 39,20 L39,23 L9,23Z" fill="#ffffff" ${L(O, 1.6)}/>${[[14, 36], [24, 42], [33, 32]].map(([x, y]) => `<path d="M${x - 3.2},23 L${x},${y} L${x + 3.2},23Z" fill="${c}" ${L(O, 1.3)}/>`).join('')}`,
  cargado: (c) => `<path d="M27,16 L17,32 L23,32 L20,44 L32,27 L26,27Z" fill="${c}" ${L(O, 1.6)}/>${[[12, 24], [36, 22], [11, 38], [37, 39]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${c}" ${L(O, .9)}/>`).join('')}`,
  apestado: (c) => `<path d="M11,38 C7,38 7,31 13,31 C13,25 21,23 24,28 C27,24 35,26 34,31 C39,31 39,38 34,38Z" fill="${c}" ${L(O, 1.5)}/><path d="M14,24 C12,21 16,19 14,16 M35,24 C33,21 37,19 35,16" fill="none" ${L(c, 2.2)}/>`,
  polvareda: () => `<circle cx="17" cy="35" r="6.5" fill="#a8a29a" ${L(O, 1.4)}/><circle cx="28" cy="33" r="8" fill="#bdb8b0" ${L(O, 1.4)}/><circle cx="22" cy="28" r="5" fill="#9a948c" ${L(O, 1.4)}/>${[[11, 24], [36, 22], [39, 40], [9, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#8a847c"/>`).join('')}`,
  // efectos y reacciones de control
  sueno: (c) => `<path d="M28,18 C19,20 15,28 18,35 C21,42 30,43 35,37 C28,37 23,32 23,26 C23,22 25,19 28,18Z" fill="${c}" ${L(O, 1.5)}/><circle cx="34" cy="22" r="1.7" fill="${c}"/><circle cx="37" cy="29" r="1.3" fill="${c}"/>`,
  empaque: (c) => `<ellipse cx="22" cy="42" rx="13" ry="3.6" fill="#8a6a46" ${L(O, 1.3)}/><path d="M18,41 L18,22 L22,16 L26,22 L26,41Z" fill="${c}" ${L(O, 1.6)}/><path d="M26,29 C30,27 32,33 36,31 C38,30 39,32 40,34" fill="none" ${L('#e8d8b0', 2.4)}/>`,
  furia: (c) => `<path d="M12,38 C12,28 18,24 24,24 C30,24 36,28 36,38" fill="${c}" ${L(O, 1.6)}/><path d="M16,26 C12,22 12,18 16,16 M32,26 C36,22 36,18 32,16" fill="none" ${L(O, 2.6)}/><path d="M19,33 L22,35 M29,33 L26,35" ${L(O, 2)}/><path d="M20,20 C19,17 21,15 20,12 M28,20 C27,17 29,15 28,12" fill="none" ${L('#e8e4dc', 2.2)}/>`,
  helado: (c) => `<rect x="13" y="21" width="22" height="21" rx="3" fill="${c}" ${L(O, 1.6)}/><path d="M17,26 L22,26 M17,30 L20,30" ${L('#ffffff', 1.8)}/><path d="M28,36 L32,32" ${L('#ffffff', 1.8)}/>`,
  atado: (c) => `<path d="M10,27 C18,22 30,34 38,27 M10,36 C18,31 30,43 38,36" fill="none" ${L(c, 3)}/><circle cx="24" cy="31.5" r="4.4" fill="${c}" ${L(O, 1.4)}/>`,
  lodazal: (c) => `<path d="M8,36 C12,32 16,36 20,33 C24,30 28,36 40,32 L40,43 L8,43Z" fill="${c}" ${L(O, 1.5)}/><circle cx="17" cy="25" r="3" fill="none" ${L(c, 1.8)}/><circle cx="29" cy="22" r="2.2" fill="none" ${L(c, 1.6)}/>`,
  encandilado: (c) => `<path d="M10,32 C16,25 32,25 38,32 C32,39 16,39 10,32Z" fill="${c}" ${L(O, 1.5)}/><path d="M16,32 C20,35 28,35 32,32" fill="none" ${L(O, 2)}/><path d="M24,16 L24,21 M14,19 L16.5,23 M34,19 L31.5,23" ${L(c, 2.2)}/>`,
  humareda: (c) => `<path d="M11,38 C7,38 7,30 13,30 C13,23 22,21 25,26 C29,22 37,25 35,31 C40,32 39,39 34,39Z" fill="${c}" ${L(O, 1.5)}/><circle cx="18" cy="34" r="2" fill="${O}" opacity=".35"/><circle cx="28" cy="33" r="2.4" fill="${O}" opacity=".35"/>`,
  avivado: (c) => `<path d="M17,42 C11,42 9,37 11,33 C13,29 16,28 16,22 C20,26 22,30 21,35 C24,33 24,30 23,27 C29,31 31,36 29,40 C27,43 22,43 17,42Z" fill="${c}" ${L(O, 1.5)}/><path d="M33,22 L37,18 M35,28 L40,27" ${L(c, 2)}/>`,
  nube: (c) => `<path d="M12,32 C8,32 8,25 14,25 C14,19 23,18 25,22 C29,19 36,22 34,27 C39,27 39,33 34,33 L13,33 C12,33 12,32 12,32Z" fill="${c}" ${L(O, 1.5)}/><path d="M17,37 L16,41 M24,37 L24,42 M31,37 L32,41" ${L(c, 2.2)}/>`,
  corto: (c) => [0, 1].map((i) => `<rect x="${13 + i * 13}" y="${25 + i * 3}" width="10" height="10" rx="2" transform="rotate(45 ${18 + i * 13} ${30 + i * 3})" fill="${c}" ${L(O, 1.4)}/>`).join('') + `<path d="M15,23 L19,30 L16,33 L21,40 M28,26 L32,33 L29,36 L34,42" fill="none" ${L(O, 1.6)}/>`,
};
const MARCAS = [
  ['Mojado', 'mojado', 'Agua', '−1 de Velocidad.', 'Rayo (Descarga) y Hielo (Helado)'],
  ['Chamuscado', 'chamuscado', 'Fuego', '−4 % de vida por ronda.', 'Viento (Avivado) y Veneno (Humareda)'],
  ['Enredado', 'enredado', 'Flora', '−15 % de ataque.', 'Fuego (Quemazón) y Tierra (Atado)'],
  ['Embarrado', 'embarrado', 'Tierra', 'No puede cubrirse.', 'Agua (Lodazal)'],
  ['Escarcha', 'escarcha', 'Hielo', '−10 % de defensa.', 'Roca (Quebranto)'],
  ['Cargado', 'cargado', 'Rayo', 'Su próxima técnica cuesta +1.', 'Agua (Cortocircuito)'],
  ['Apestado', 'apestado', 'Veneno', '−4 % de vida por ronda.', 'Viento (Nube)'],
  ['Polvareda', 'polvareda', 'Viento', '−10 % de daño.', 'Flora (Encandilado)'],
];
const EFECTOS = [
  ['Sueño', 'sueno', '#8a9ad0', 'Pierde su próxima ronda.', 'Técnica de efecto'],
  ['Empaque', 'empaque', '#c9a86a', 'No se cubre ni hace Relevo. 2 rondas.', 'Técnica de efecto'],
  ['Furia', 'furia', '#d8503a', 'Pega +20 %, recibe +20 %, no se cubre. 2 rondas.', 'Técnica de efecto o salvaje bravo'],
  ['Helado', 'helado', '#9fd0ea', '−2 de Velocidad. 2 rondas.', 'Mojado + Hielo'],
  ['Atado', 'atado', '#7fb85a', 'No puede hacer Relevo. 2 rondas.', 'Enredado + Tierra'],
  ['Lodazal', 'lodazal', '#a07a4a', 'No puede cubrirse. 2 rondas.', 'Embarrado + Agua'],
  ['Encandilado', 'encandilado', '#e8d07a', 'Su próximo golpe hace −30 %.', 'Polvareda + Flora'],
  ['Humareda', 'humareda', '#a8a49a', '−15 % de daño. 2 rondas.', 'Chamuscado + Veneno'],
  ['Avivado', 'avivado', '#e8892a', '−8 % de vida por ronda. 2 rondas.', 'Chamuscado + Viento'],
  ['Nube', 'nube', '#9ac05a', '−6 % por ronda a quien esté en esa cancha. 3 rondas.', 'Apestado + Viento'],
  ['Cortocircuito', 'corto', '#e2a72e', '−2 de aguante, en el acto.', 'Cargado + Agua'],
];
const BORDE_MARCA = { polvareda: '#8a847c' };
const marcaSvg = (k, tipo) => caravana(GL[k], { fondo: H, borde: BORDE_MARCA[k] || COLOR_TIPO[tipo], color: COLOR_TIPO[tipo] });
const efectoSvg = (k, c) => caravana(GL[k], { fondo: CU, borde: c, color: c });
// en pantalla: caravana chica con las rondas que le quedan
const tag = (inner, x, y, s = 22, n) => `<g transform="translate(${x} ${y}) scale(${s / 48})">${inner}${n ? `<circle cx="40" cy="42" r="9" fill="${H}" stroke="${O}" stroke-width="2.2"/>${T(40, 47, 14, n, { w: 800, a: 'middle' })}` : ''}</g>`;
const tagM = (k, tipo, x, y, s, n) => tag(marcaSvg(k, tipo), x, y, s, n);
const tagE = (k, x, y, s, n) => tag(efectoSvg(k, EFECTOS.find((e) => e[1] === k)[2]), x, y, s, n);

// ── Pantalla de combate (zonas de lote 13) ──
const vida = (x, y, w, f) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="#5a4636" stroke="${O}" stroke-width="1.4"/><rect x="${x + 1}" y="${y + 1}" width="${Math.max(0, (w - 2) * f)}" height="7" rx="3.5" fill="${f > 0.5 ? '#6fbf5a' : f > 0.2 ? '#e2b83a' : '#d8402a'}"/>`;
const rombos = (x, y, n, max = 6, s = 9, gasto = 0) => Array.from({ length: max }, (_, i) => `<rect x="${x + i * (s + 3.5)}" y="${y}" width="${s}" height="${s}" rx="2.2" transform="rotate(45 ${x + i * (s + 3.5) + s / 2} ${y + s / 2})" fill="${i < n ? '#e2a72e' : i < n + gasto ? '#f6e0a8' : '#5a4636'}" stroke="${O}" stroke-width="1.2" ${i >= n && i < n + gasto ? 'class="late"' : ''}/>`).join('');
const chip = (x, y, tipo) => { const c = tipo === 'Sin tipo' ? '#9a8e7e' : COLOR_TIPO[tipo]; return `<rect x="${x}" y="${y}" width="${tipo.length * 6.2 + 12}" height="15" rx="7.5" fill="${c}"/>${T(x + 6, y + 11, 9.5, tipo, { w: 800, c: '#fff' })}`; };
const panel = (x, y, w, h, fill = '#f4ead2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${O}" stroke-width="2"/>`;
const fondo = `<defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ec"/><stop offset="1" stop-color="#eef4e6"/></linearGradient><pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern></defs>
  <rect width="360" height="760" rx="26" fill="url(#cielo)"/><path d="M0,250 C80,236 180,240 360,232 L360,400 L0,400Z" fill="#a8c47a"/><path d="M0,300 C120,290 240,296 360,288 L360,400 L0,400Z" fill="#8fb45e"/>
  <ellipse cx="276" cy="382" rx="70" ry="11" fill="#7f9e4e"/><ellipse cx="90" cy="382" rx="74" ry="11" fill="#7f9e4e"/>`;
const tope = `<rect x="12" y="10" width="232" height="28" rx="14" fill="#7a4a2a" stroke="${O}" stroke-width="1.6"/>${T(26, 29, 12.5, 'Domador Eusebio, Iberá', { w: 800, c: '#fff' })}<rect x="252" y="10" width="96" height="28" rx="14" fill="#e2b83a" stroke="${O}" stroke-width="1.6"/>${T(300, 29, 12, 'Ronda 4', { w: 800, a: 'middle' })}`;
// relevos: fichas redondas con dos flechas que se cruzan (cambio)
const fichaRel = (x, y, on) => `<g transform="translate(${x} ${y})"><circle r="8" fill="${on ? '#6fbf5a' : '#5a4636'}" stroke="${O}" stroke-width="1.4"/><path d="M-4,-2 L3,-2 M1,-4.5 L3.5,-2 L1,0.5 M4,2.5 L-3,2.5 M-1,0 L-3.5,2.5 L-1,5" fill="none" stroke="${on ? '#fff' : '#9a8a7a'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const relevos = (x, y, n, max = 2) => Array.from({ length: max }, (_, i) => fichaRel(x + i * 19, y, i < n)).join('');
// rival: panel 186–350 × 48–144
const rival = (marcas, f, estado = '') => `${panel(186, 48, 164, 96)}${T(198, 68, 16, 'Ventero', { f: 'Bree' })}${T(338, 68, 11.5, 'Nv 5', { w: 800, a: 'end', c: '#5a3e28' })}${chip(198, 76, 'Viento')}${vida(198, 100, 140, f)}${marcas}${estado || relevos(318, 126, 2)}`;
const bichoRival = (cls = '', extra = '') => `<g class="${cls}"><g transform="translate(206 232) scale(.7)">${tero()}</g></g>${extra}`;
// propio: panel 10–174 × 48–144, rombos de aguante y marcas
const yo = (nom, tipo, marcas, f, num, ag, gasto = 0) => `${panel(10, 48, 164, 96)}${T(22, 68, 16, nom, { f: 'Bree' })}${T(162, 68, 11.5, 'Nv 6', { w: 800, a: 'end', c: '#5a3e28' })}${chip(22, 76, tipo)}${T(162, 88, 11, num, { w: 800, a: 'end', c: '#5a3e28' })}${vida(22, 100, 140, f)}${rombos(26, 120, ag, 6, 9, gasto)}${marcas}`;
const pumaYo = `<g transform="translate(168 236) scale(-.76 .76)">${puma()}</g>`;
const lucernaYo = `<g transform="translate(166 246) scale(-.74 .74)">${lucerna()}</g>`;
// retratos del equipo (4 elegidos), con el bicho adentro, sin letras
let nclip = 0;
const retrato = (dib, x, y, r, { act = false, caido = false, freno = 0, s = .17, dx = 0, dy = 0 } = {}) => { const id = `rt${nclip++}`; return `<g transform="translate(${x} ${y})"><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#efe6d2" stroke="${act ? '#f2d23a' : O}" stroke-width="${act ? 3.2 : 1.8}"/><g clip-path="url(#${id})" ${caido ? 'opacity=".35"' : ''}><g transform="translate(${-r * 1.05 + dx} ${-r * 1.05 + dy}) scale(${s * r / 16})">${dib}</g></g>${freno ? `<circle cx="${r * .72}" cy="${-r * .72}" r="7.5" fill="#7a4a2a" stroke="${O}" stroke-width="1.2"/>${T(r * .72, -r * .72 + 4, 10, freno, { w: 800, a: 'middle', c: H })}` : ''}</g>`; };
const EQ = [puma(), lucerna(), yacare(), kapiyva()];
const equipo = (act, { caido = -1, freno = {} } = {}) => `${EQ.map((d, i) => retrato(d, 30 + i * 42, 430, 16, { act: i === act, caido: i === caido, freno: freno[i] })).join('')}${T(232, 426, 10, 'RELEVO', { w: 800, c: '#f4ead2' })}${relevos(240, 438, 2)}${T(300, 426, 10, 'RIVAL', { w: 800, c: '#f4ead2' })}${[0, 1, 2, 3].map((i) => `<circle cx="${304 + i * 12}" cy="438" r="4.6" fill="${i < 3 ? '#e2b83a' : '#5a4636'}" stroke="${O}" stroke-width="1.1"/>`).join('')}`;
const pie = (msg, extra = '') => `<rect x="0" y="400" width="360" height="360" fill="url(#cuero)"/><path d="M0,400 L360,400" stroke="${O}" stroke-width="2"/>${extra}<rect x="12" y="454" width="336" height="32" rx="10" fill="#3a2010"/>${msg}`;
const msgT = (txt, x = 24, c = H) => T(x, 475, 12.5, txt, { w: 800, c });
const flecha = (f) => f ? (f[0] === '▲' ? `<path d="M0,0 L5,-8 L10,0Z" fill="#2f8a3b"/>` : `<path d="M0,-8 L5,0 L10,-8Z" fill="#b8322a"/>`) : '';
const revienta = (x, y) => `<g transform="translate(${x} ${y})"><path d="M7,-6 L11,-8 M8,-1 L12.5,-1 M7,4 L11,6" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/><rect x="-9" y="-5" width="16" height="13" rx="4" fill="#f2b03a" stroke="${O}" stroke-width="1.3"/>${[-6, -2.2, 1.6, 5.2].map((cx) => `<rect x="${cx - 2}" y="-8.5" width="4" height="7" rx="2" fill="#f2b03a" stroke="${O}" stroke-width="1.1"/>`).join('')}<path d="M-9,1.5 C-6,0 -1,0 2,1.5 C3,2.2 2.6,4.2 1.2,4.2 L-7,4.2" fill="#f6c45a" stroke="${O}" stroke-width="1.1" stroke-linejoin="round"/></g>`;
const tecnica = (x, y, nom, tipo, costo, fz, f, { marca, rev, sel, sello } = {}) => `<g transform="translate(${x} ${y})"><rect width="164" height="70" rx="12" fill="${H}" stroke="${sel ? '#f2d23a' : O}" stroke-width="${sel ? 3.4 : 1.8}"/><rect width="9" height="70" rx="4.5" fill="${tipo === 'Sin tipo' ? '#9a8e7e' : COLOR_TIPO[tipo]}"/>
  ${T(16, 21, 13.5, nom, { w: 800 })}${costo ? rombos(152 - costo * 12.5, 10, costo, costo, 8) : T(152, 20, 10, 'gratis', { w: 800, a: 'end', c: '#5a8a3a' })}
  ${chip(16, 29, tipo)}${T(16, 61, 10.5, 'Daño', { c: '#5a3e28' })}${T(46, 61, 13, `≈ ${fz}`, { w: 800 })}<g transform="translate(${70 + String(fz).length * 7} 61)">${flecha(f)}</g>
  ${marca ? tagM(marca[0], marca[1], 126, 32, 26) : ''}${rev ? `${revienta(136, 46)}` : ''}${sello ? `<g transform="translate(82 35) rotate(-8)"><rect x="-44" y="-13" width="88" height="26" rx="6" fill="none" stroke="#2f7d5b" stroke-width="3"/>${T(0, 6, 14, 'ELEGIDA', { f: 'Bree', a: 'middle', c: '#2f7d5b' })}</g>` : ''}</g>`;
const tecnicas = ({ sel, sello, rev = false } = {}) => `${tecnica(12, 494, 'Zarpazo', 'Sin tipo', 0, 10, '', { sel: sel === 0, sello: sello === 0 })}${tecnica(184, 494, 'Terronazo', 'Tierra', 1, 8, '▼', { marca: ['embarrado', 'Tierra'], sel: sel === 1, sello: sello === 1 })}
  ${tecnica(12, 570, 'Zarpa de tierra', 'Tierra', 2, 15, '▼', { sel: sel === 2, sello: sello === 2, rev })}${tecnica(184, 570, 'Pedrada', 'Roca', 2, 26, '▲', { sel: sel === 3, sello: sello === 3, rev })}`;
// botones: Cubrirse (escudo de cuero) y Relevo
const btn = (x, w, txt, ico, { on = false, off = false } = {}) => `<g transform="translate(${x} 700)" ${off ? 'opacity=".45"' : ''}><rect width="${w}" height="46" rx="12" fill="${on ? '#e2b83a' : '#7a4a2a'}" stroke="${O}" stroke-width="1.8"/>${ico}${T(w / 2 + 12, 28, 13, txt, { w: 800, a: 'middle', c: on ? CU : H })}</g>`;
const icoCubre = `<path d="M22,12 L34,16 L33,27 C32,32 28,35 22,37 C16,35 12,32 11,27 L10,16Z" transform="translate(4 -1)" fill="#c9a86a" stroke="${O}" stroke-width="1.5"/>`;
const icoRel = `<g transform="translate(30 23)">${fichaRel(0, 0, true)}</g>`;
const acciones = ({ cub = {}, rel = {} } = {}) => `${btn(12, 164, 'Cubrirse', icoCubre, cub)}${btn(184, 164, 'Relevo', icoRel, rel)}`;
// carta dada vuelta (el rival eligió y no se ve qué)
const dorso = (x, y, w = 40, h = 54) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="6" fill="#7a2a2a" stroke="${O}" stroke-width="1.8"/><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="4" fill="none" stroke="#e2b83a" stroke-width="1.4"/>${[0, 1, 2].map((i) => `<path d="M${w / 2},${12 + i * 12} l6,6 l-6,6 l-6,-6Z" fill="#e2b83a" opacity=".8"/>`).join('')}</g>`;

// R1: elegir
const r1 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival(tagM('mojado', 'Agua', 200, 112, 22, '2'), .58, `<g transform="translate(300 112)" class="late">${dorso(0, -2, 20, 27)}</g>${T(292, 133, 10, 'eligió', { w: 800, a: 'end', c: '#5a3e28' })}`)}${pumaYo}${yo('Allpuma', 'Tierra', '', .74, '59/80', 4)}
  ${pie(msgT('Eusebio ya eligió. Te toca.'), equipo(0))}${tecnicas({ sel: 3, rev: true })}${T(180, 660, 11, 'El rival está Mojado: los golpes de 2 o más lo revientan', { a: 'middle', c: '#f4ead2' })}${revienta(34, 676)}${T(180, 682, 11, '(×1,3; con Rayo o Hielo, reacción especial).', { a: 'middle', c: '#f4ead2' })}${acciones()}`);
// R2: revelado (las dos cartas se dan vuelta abajo)
const carta = (x, y, titulo, sub, color, dib, cls = '') => `<g transform="translate(${x} ${y})"><g class="${cls}"><rect width="150" height="190" rx="14" fill="${H}" stroke="${O}" stroke-width="2.2"/><rect width="150" height="40" rx="14" fill="${color}"/><rect y="26" width="150" height="14" fill="${color}"/>${T(75, 27, 15, titulo, { f: 'Bree', a: 'middle', c: '#fff' })}<g transform="translate(75 108)">${dib}</g>${T(75, 176, 11.5, sub, { w: 800, a: 'middle', c: '#5a3e28' })}</g></g>`;
const dibPiedra = `<path d="M-30,10 C-34,-10 -18,-26 0,-26 C20,-26 34,-12 30,8 C27,22 12,28 -4,28 C-20,28 -28,22 -30,10Z" fill="${COLOR_TIPO.Roca}" ${L(O, 2.2)}/><path d="M-10,-14 L-2,-2 L-8,10 M8,-18 L12,0" fill="none" ${L('#5a4e3e', 2)}/>`;
const dibEscudo = `<path d="M0,-34 L28,-24 L26,4 C24,18 14,28 0,34 C-14,28 -24,18 -26,4 L-28,-24Z" fill="#c9a86a" ${L(O, 2.4)}/><path d="M0,-24 L18,-18 L17,2 C16,12 9,19 0,23 C-9,19 -16,12 -17,2 L-18,-18Z" fill="none" ${L('#8a6a3a', 2)}/>`;
const r2 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival(tagM('mojado', 'Agua', 200, 112, 22, '2'), .58, ' ')}${pumaYo}${yo('Allpuma', 'Tierra', '', .74, '59/80', 4)}
  ${pie(msgT('¡Se dan vuelta las cartas!'), equipo(0))}${carta(18, 500, 'Pedrada', 'Roca, 2 de aguante', COLOR_TIPO.Roca, dibPiedra, 'vuelta')}${carta(192, 500, 'Cubrirse', 'Ventero', '#7a4a2a', dibEscudo, 'vuelta2')}
  ${T(180, 716, 12, 'Allpuma (tu elección)', { a: 'middle', c: '#f4ead2', w: 800 }).replace('x="180"', 'x="93"')}${T(267, 716, 12, 'Eusebio', { a: 'middle', c: '#f4ead2', w: 800 })}`);
// R3: choque: la cubierta frena el golpe fuerte
const cupula = `<g class="halo"><path d="M200,236 C200,120 352,120 352,236" fill="#f2e6c2" opacity=".35" stroke="#c9a86a" stroke-width="4"/></g><g transform="translate(276 176)"><rect x="-46" y="-15" width="92" height="28" rx="14" fill="#7a4a2a" stroke="${O}" stroke-width="1.6"/>${T(0, 5, 14, '¡Frenado!', { f: 'Bree', a: 'middle', c: H })}</g>`;
const r3 = svg('0 0 360 760', `${fondo}${tope}${bichoRival('', cupula)}${rival(tagM('mojado', 'Agua', 200, 112, 22, '2'), .58)}${pumaYo}${yo('Allpuma', 'Tierra', '', .74, '59/80', 2, 2)}
  ${pie(msgT('Ventero se cubrió. Tu Pedrada no entró.'), equipo(0))}<g transform="translate(12 498)">${panel(0, 0, 336, 120, '#f4ead2')}${T(16, 28, 14, 'Te leyó', { f: 'Bree' })}${T(16, 52, 12, 'Pagaste 2 de aguante y no hiciste daño.', { c: '#5a3e28' })}${T(16, 72, 12, 'Ventero no puede cubrirse la ronda que viene:', { c: '#5a3e28' })}${T(16, 92, 12, 'esa es tu chance.', { w: 800 })}${rombos(250, 82, 2, 6, 9, 2)}</g>
  ${T(180, 650, 11, 'Si se hubiera cubierto contra un golpe de 0 o 1, recibía la mitad.', { a: 'middle', c: '#f4ead2' })}${acciones()}`);
// R4: moneda por empate de Velocidad
const moneda = `<g transform="translate(110 186)"><g class="moneda"><ellipse rx="24" ry="24" fill="#e2b83a" stroke="${O}" stroke-width="2.4"/><ellipse rx="18" ry="18" fill="none" stroke="#a87a1a" stroke-width="1.6"/><path d="M-9,4 C-9,-4 -3,-8 0,-8 C3,-8 9,-4 9,4 L6,9 L-6,9Z" fill="#a87a1a"/></g></g>${T(110, 228, 10.5, 'Velocidad 3 y 3', { a: 'middle', w: 800, c: '#3a5a2a' })}`;
const r4 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${moneda}${rival(tagM('mojado', 'Agua', 200, 112, 22, '1'), .58)}${pumaYo}${yo('Allpuma', 'Tierra', '', .74, '59/80', 3)}
  ${pie(msgT('Misma Velocidad: decide la moneda.'), equipo(0))}${carta(18, 500, 'Zarpa de tierra', 'Tierra, 2 de aguante', COLOR_TIPO.Tierra, `<g transform="scale(.9)">${dibPiedra.replace(COLOR_TIPO.Roca, COLOR_TIPO.Tierra)}</g>`)}${carta(192, 500, 'Ráfaga', 'Viento, 2 de aguante', COLOR_TIPO.Viento, `<path d="M-30,-10 C-10,-22 20,-20 26,-6 C30,6 14,10 8,2 M-30,8 C-6,0 22,4 24,18" fill="none" ${L(COLOR_TIPO.Viento, 5)}/>`)}
  ${T(180, 716, 12, 'Gana la moneda: pega primero quien sale arriba.', { a: 'middle', c: '#f2d23a', w: 800 })}`);
// R5: reventón con reacción especial (Descarga) y combo de equipo
const destello = `<g class="destello"><circle cx="276" cy="198" r="48" fill="#fff6c0" opacity=".7"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return `<path d="M${(276 + Math.cos(a) * 38).toFixed(1)},${(198 + Math.sin(a) * 38).toFixed(1)} L${(276 + Math.cos(a) * 52).toFixed(1)},${(198 + Math.sin(a) * 52).toFixed(1)}" stroke="#f2d23a" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>`;
const r5 = svg('0 0 360 760', `${fondo}${tope}${destello}${bichoRival('temblor')}${rival('', .16)}${T(344, 226, 22, '−52', { f: 'Bree', a: 'end', c: '#d8402a' })}${lucernaYo}${yo('Lucerna', 'Rayo', '', .9, '58/64', 3)}
  ${pie(`${revienta(30, 470)}${msgT('Descarga ×1,6 y combo de equipo +0,2', 46)}`, equipo(1, { freno: { 0: 2 } }))}<g transform="translate(12 498)">${panel(0, 0, 336, 150, '#f4ead2')}${T(16, 28, 14, 'Combo de equipo', { f: 'Bree' })}${tagM('mojado', 'Agua', 16, 42, 34)}${T(60, 58, 12, 'Yacarón lo dejó Mojado,', { c: '#5a3e28' })}${T(60, 76, 12, 'entró Lucerna con Relevo', { c: '#5a3e28' })}${T(60, 94, 12, 'y lo reventó con Rayo.', { c: '#5a3e28' })}${T(16, 128, 12, 'La marca se gasta al reventar.', { w: 800 })}</g>${acciones({ rel: { off: true } })}`);
// R6: reemplazo a la vez, cuando cae un bicho
const r6 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival('', .16, `<g transform="translate(300 112)" class="late">${dorso(0, -2, 20, 27)}</g>${T(292, 133, 10, 'eligió', { w: 800, a: 'end', c: '#5a3e28' })}`)}
  <g opacity=".4">${lucernaYo}</g><g transform="translate(90 330)">${[0, 1, 2].map((i) => `<path d="M${-14 + i * 14},-6 l3,-8 l3,8 l8,0 l-6,5 l3,8 l-8,-5 l-8,5 l3,-8 l-6,-5Z" fill="#f2d23a" stroke="${O}" stroke-width="1" transform="translate(0 ${-20 + (i % 2) * 6})"/>`).join('')}</g>${panel(10, 48, 164, 96)}${T(22, 68, 16, 'Lucerna', { f: 'Bree' })}${T(22, 92, 12, 'Desmayada', { w: 800, c: '#a8322a' })}${vida(22, 100, 140, 0)}
  ${pie(msgT('Cayó Lucerna. Elegí quién entra.'), equipo(-1, { caido: 1 }))}<g transform="translate(12 498)">${panel(0, 0, 336, 190, '#f4ead2')}${T(16, 28, 14, 'Entra gratis, sin gastar Relevo', { f: 'Bree' })}${T(16, 48, 11.5, 'Eusebio también elige ahora, sin ver al tuyo.', { c: '#5a3e28' })}
    ${[[puma(), 'Allpuma', 'Tierra', 2], [yacare(), 'Yacarón', 'Agua', 0], [kapiyva(), 'Kapiyvá', 'Común', 0]].map(([d, n, t, fr], i) => `<g transform="translate(${56 + i * 112} 108)">${retrato(d, 0, 0, 34, { act: i === 1, s: .17 })}${T(0, 52, 12.5, n, { f: 'Bree', a: 'middle' })}${chip(-(t.length * 6.2 + 12) / 2, 58, t)}${fr ? T(0, -40, 10, 'vuelve en 2', { w: 800, a: 'middle', c: '#a8322a' }) : ''}</g>`).join('')}</g>`);

const tel = (cod, nom, dib, txt) => `<figure class="tel"><span class="cod">${cod}</span>${dib}<figcaption><b>${nom}</b><p>${txt}</p></figcaption></figure>`;
const fichaIco = (cod, inner, nom, efecto, extra) => `<figure class="ico"><span class="cod">${cod}</span><div>${svg('0 0 48 48', inner)}</div><figcaption><b>${nom}</b><span>${efecto}</span><i>${extra}</i></figcaption></figure>`;
const compara = `<div class="compara">${['Agua', 'Fuego', 'Flora', 'Hielo'].map((t) => `<div><span>${svg('0 0 48 48', tipoIco(t))}</span><span>${svg('0 0 48 48', marcaSvg(MARCAS.find((m) => m[2] === t)[1], t))}</span><small>${t}: tipo y marca</small></div>`).join('')}</div>`;
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Los nombres de técnicas son provisorios.</div>
<section><h3>Marcas como caravanas</h3><p class="nota">La marca es una caravana, la chapita que se le pone al ganado en la oreja. Así no se confunde con el ícono de tipo, que es redondo. La de marca es clara, con el borde del color del tipo que la dejó, y el dibujo muestra lo que le pasa al bicho, no el elemento. En pantalla lleva un numerito con las rondas que le quedan.</p>${compara}
<div class="grilla">${MARCAS.map(([n, k, t, ef, det], i) => fichaIco(`M${i + 1}`, marcaSvg(k, t), n, ef, `La deja ${t}. Reacción especial con ${det}.`)).join('')}</div></section>
<section><h3>Efectos: caravanas oscuras</h3><p class="nota">Los efectos no se revientan, solo duran. Por eso van en caravana oscura, de cuero, con el dibujo en color. Las reacciones de golpe (Descarga, Quemazón, Quebranto) y el reventón son instantáneos y no dejan caravana: se ven con el puño dorado en la barra de mensajes.</p>
<div class="grilla">${EFECTOS.map(([n, k, c, ef, como], i) => fichaIco(`F${i + 1}`, efectoSvg(k, c), n, ef, como)).join('')}<figure class="ico"><span class="cod">F12</span><div>${svg('-14 -12 28 24', revienta(0, 0))}</div><figcaption><b>Reventón y reacción de golpe</b><span>Puño dorado junto al mensaje.</span><i>Sin caravana: pasa en el acto.</i></figcaption></figure></div></section>
<section><h3>La ronda, paso a paso</h3><p class="nota">Pantalla del lote 13 adaptada al combate v5: sin Envión ni Pase, con fichas de Relevo y caravanas. Abajo de los retratos, los Relevos que te quedan y los bichos que le quedan al rival.</p><div class="tres">
${tel('R1', 'Elegir', r1, 'El rival ya eligió y lo ves como una carta dada vuelta. Tocás una técnica (su daño titila en la barra del rival, como en C7) y la confirmás tocando de nuevo. Si el rival tiene una marca, las técnicas que la revientan llevan el puño.')}
${tel('R2', 'Revelado', r2, 'Las dos cartas se dan vuelta a la vez, con un giro corto. Es el momento de tensión de cada ronda.')}
${tel('R3', 'Choque', r3, 'Cubierta contra golpe fuerte: aparece el escudo sobre el rival y el cartel Frenado, y los 2 rombos de aguante gastados titilan. El mensaje recuerda que el rival no puede cubrirse la ronda siguiente.')}
${tel('R4', 'Moneda', r4, 'Si los dos tienen la misma Velocidad, gira una moneda entre los bichos antes de resolver. El Veloz gana siempre los empates, sin moneda.')}
${tel('R5', 'Reventón y combo', r5, 'Destello, temblor y daño junto al rival; la caravana desaparece. El puño en la barra de mensajes nombra la reacción. Allpuma salió con Relevo: su retrato muestra en cuántas rondas puede volver.')}
${tel('R6', 'Reemplazo a la vez', r6, 'Cuando cae un bicho, los dos eligen el que entra sin ver al otro. Entra gratis. El que salió con Relevo hace poco aparece con las rondas que le faltan.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}.ico{position:relative;margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:26px 10px 10px;text-align:center}.ico>div svg{width:64px;height:64px}.ico b{display:block;font:16px Bree,serif}.ico span{display:block;font-size:12.5px}.ico i{display:block;font-size:11.5px;color:#7a6a58;font-style:normal;margin-top:3px}.ico .cod{position:absolute;top:-9px;left:-6px}
.compara{display:flex;flex-wrap:wrap;gap:14px;margin:6px 0 16px}.compara div{display:flex;align-items:center;gap:6px;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:12px;padding:6px 10px}.compara svg{width:44px;height:44px}.compara small{font-size:12px;margin-left:4px}
.tres{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.tel{margin:0;position:relative}.tel svg{width:100%;height:auto;border-radius:22px;box-shadow:0 8px 22px rgba(0,0,0,.25)}.tel .cod{position:absolute;top:-10px;left:-6px;z-index:2}.tel figcaption b{font-family:Bree,serif;font-size:17px}.tel figcaption p{font-size:13px;line-height:1.4;margin:4px 0 0}
@keyframes late{0%,100%{opacity:1}50%{opacity:.4}}.late{animation:late 1s ease-in-out infinite}
@keyframes temblor{0%,100%{transform:translate(0,0)}25%{transform:translate(-3px,1px)}75%{transform:translate(3px,-1px)}}.temblor{animation:temblor .25s linear infinite}
@keyframes destello{0%,100%{opacity:0}10%,35%{opacity:1}}.destello{animation:destello 1.6s ease-out infinite}@keyframes halo{0%,100%{opacity:.55}50%{opacity:1}}.halo{animation:halo 1.2s ease-in-out infinite}
@keyframes moneda{0%{transform:scaleX(1)}25%{transform:scaleX(.08)}50%{transform:scaleX(1)}75%{transform:scaleX(.08)}100%{transform:scaleX(1)}}.moneda{animation:moneda 1s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes vuelta{0%,15%{transform:scaleX(.04)}45%,100%{transform:scaleX(1)}}.vuelta,.vuelta2{animation:vuelta 2.6s ease-out infinite;transform-box:fill-box;transform-origin:center}.vuelta2{animation-delay:.08s}
@media (max-width:760px){.tres{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-60.html', import.meta.url), pagina('Catálogo para aprobar, lote 23a', 'Marcas, efectos y la ronda del combate v5', cuerpo, css));
console.log('ok 60');
export { tecnica, fondo as fondoCombate, tagE, tagM, vida, rombos, chip, panel, relevos, fichaRel, retrato, pie, msgT, btn, icoCubre, icoRel, revienta, flecha, caravana, GL, H, CU };
