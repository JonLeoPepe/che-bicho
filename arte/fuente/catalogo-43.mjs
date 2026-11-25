// Catálogo para aprobar, lote 16a: el Mapa como carta antigua (provincia y Argentina).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { O, T, tel, css, moneda, fondo, cab } from './catalogo-29.mjs';
import { fogonI } from './marca-changa.mjs';

const INK = '#5a3a22';
const tinta = (d, w = 1.6, extra = '', col = INK) => `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const pestanas = (sel) => ['Salta', 'Argentina'].map((n, i) => `<g transform="translate(${70 + i * 116} 64)"><rect width="104" height="30" rx="15" fill="${i === sel ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${T(52, 20, 12.5, n, { w: 800, a: 'middle' })}</g>`).join('');
// papel viejo: bordes quemados y manchas
const papel = (id) => `<defs><radialGradient id="pv${id}" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#f1e3bd"/><stop offset=".75" stop-color="#e4cf9c"/><stop offset="1" stop-color="#c9a86a"/></radialGradient><clipPath id="pc${id}"><path d="M14,110 C60,104 120,108 180,104 C240,108 300,104 346,110 C350,200 344,300 348,400 C344,480 350,540 346,602 C280,608 200,602 140,606 C90,602 50,608 14,602 C10,520 16,420 12,320 C16,220 10,160 14,110Z"/></clipPath></defs>
  <path d="M14,110 C60,104 120,108 180,104 C240,108 300,104 346,110 C350,200 344,300 348,400 C344,480 350,540 346,602 C280,608 200,602 140,606 C90,602 50,608 14,602 C10,520 16,420 12,320 C16,220 10,160 14,110Z" fill="url(#pv${id})" stroke="#8a6a3a" stroke-width="2"/>
  <g clip-path="url(#pc${id})">${[[60, 160, 26], [300, 520, 34], [250, 140, 18], [90, 560, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#b8955a" opacity=".12"/>`).join('')}</g>
  <rect x="24" y="118" width="312" height="476" fill="none" stroke="${INK}" stroke-width="1.4"/><rect x="28" y="122" width="304" height="468" fill="none" stroke="${INK}" stroke-width=".8"/>
  ${[[24, 118], [336, 118], [24, 594], [336, 594]].map(([x, y]) => `<path d="M${x - 5},${y} L${x},${y - 5} L${x + 5},${y} L${x},${y + 5}Z" fill="${INK}"/>`).join('')}`;
const niebla = (pts, id) => `<g opacity=".92"><path d="${pts}" fill="#efe3c4"/><path d="${pts}" fill="none" stroke="#a8875a" stroke-width="1.4" stroke-dasharray="2 4"/></g>`;
const casa = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6,0 L-6,-7 L0,-12 L6,-7 L6,0Z" fill="#f4ead2" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/><path d="M-6,-7 L0,-12 L6,-7" fill="#c0553a" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/></g>`;
const pueblo = (x, y, nom, grande, lado = 'abajo') => `${casa(x - 6, y, grande ? 1.1 : .9)}${casa(x + 6, y + 2, grande ? 1.1 : .9)}${grande ? casa(x, y - 6, 1) : ''}${lado === 'der' ? T(x + 12, y + 22, grande ? 16 : 14, nom, { f: 'Caveat', w: 700, c: INK }) : lado === 'arriba' ? T(x, y - 18, grande ? 16 : 14, nom, { f: 'Caveat', w: 700, a: 'middle', c: INK }) : lado === 'izq' ? T(x - 16, y + 2, grande ? 16 : 14, nom, { f: 'Caveat', w: 700, a: 'end', c: INK }) : T(x, y + 18, grande ? 16 : 14, nom, { f: 'Caveat', w: 700, a: 'middle', c: INK })}`;
const galponI = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-10,0 L-10,-10 L0,-17 L10,-10 L10,0Z" fill="#c99a68" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/><path d="M-12,-9 L0,-18 L12,-9" stroke="#c0553a" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-4" y="-8" width="8" height="8" fill="#6b4226"/></g>`;
const insigniaI = (x, y, ganado, s = .55) => `<g transform="translate(${x - 20 * s} ${y - 20 * s}) scale(${s})"><path d="M20,2 L26,6 L33,6 L34,13 L38,20 L34,27 L33,34 L26,34 L20,38 L14,34 L7,34 L6,27 L2,20 L6,13 L7,6 L14,6Z" fill="#d9dee3" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="20" r="12" fill="#eef1f3" stroke="#8a9095" stroke-width="1.4"/><path d="M12,23 C12,15 28,15 28,23Z" fill="#d8a45a" stroke="${INK}" stroke-width="1.4"/><path d="M15,19 l1.5,-1.6 M19,17.6 l1.4,-1.6 M23,18.4 l1.4,-1.5" stroke="${INK}" stroke-width="1.1"/>${ganado ? `<g transform="translate(34 6)"><circle r="8" fill="#2f7d5b" stroke="${O}" stroke-width="1.4"/><path d="M-3.8,0 L-1,3 L4,-3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}</g>`;
const sombreroI = (x, y, hecho) => `<g transform="translate(${x} ${y})"><path d="M-9,0 C-9,-3 9,-3 9,0 C9,2 -9,2 -9,0Z" fill="#2a2624"/><path d="M-5,-1 C-5,-8 5,-8 5,-1Z" fill="#2a2624"/>${hecho ? `<g transform="translate(9 -9)"><circle r="5.5" fill="#2f7d5b" stroke="${O}" stroke-width="1"/><path d="M-2.6,0 L-.6,2 L2.8,-2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>` : ''}</g>`;
const panuI = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-1.5" y="-14" width="3" height="16" fill="#7a5a3a"/><path d="M1,-13 C6,-12 10,-9 11,-5 L6,-6 C5,-9 3,-10 1,-10Z" fill="#d23a2a" stroke="${O}" stroke-width=".8"/></g>`;
const macheteI = (x, y, abierto) => `<g transform="translate(${x} ${y})">${abierto ? '' : '<circle r="13" fill="#8a8478" opacity=".18"/>'}<g transform="rotate(-35)"><path d="M-2,-14 C2,-14 4,-6 3,6 L-2,6Z" fill="${abierto ? '#c9ced2' : '#9a958c'}" stroke="${abierto ? INK : '#6a655c'}" stroke-width="1.2"/><rect x="-2.5" y="6" width="5" height="9" rx="1.5" fill="${abierto ? '#6b4226' : '#7a7468'}" stroke="${abierto ? INK : '#6a655c'}" stroke-width="1"/></g>${abierto ? `<g transform="translate(9 -10)"><circle r="5.5" fill="#2f7d5b" stroke="${O}" stroke-width="1"/><path d="M-2.6,0 L-.6,2 L2.8,-2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>` : ''}</g>`;
const pin = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#d23a2a" opacity=".18"/><path d="M0,0 C-8,-8 -8,-20 0,-20 C8,-20 8,-8 0,0Z" fill="#d23a2a" stroke="${O}" stroke-width="1.6"/><circle cy="-13" r="3.6" fill="#fff"/></g>`;
const cerros = (x, y, n, c = '#b08a54') => Array.from({ length: n }, (_, i) => { const px = x + (i % 3) * 22 + (Math.floor(i / 3) % 2) * 11, py = y + Math.floor(i / 3) * 18; return `<path d="M${px - 10},${py} C${px - 6},${py - 4} ${px - 3},${py - 12} ${px},${py - 13} C${px + 3},${py - 12} ${px + 6},${py - 4} ${px + 10},${py}" fill="${c}" stroke="${INK}" stroke-width="1.3"/><path d="M${px},${py - 12} C${px + 2},${py - 8} ${px + 3},${py - 4} ${px + 4},${py - 1}" stroke="${INK}" stroke-width=".8" fill="none"/>`; }).join('');
const arboles = (x, y, n, c = '#5f8a4a') => Array.from({ length: n }, (_, i) => { const px = x + (i % 4) * 14 + (Math.floor(i / 4) % 2) * 7, py = y + Math.floor(i / 4) * 13; return `<circle cx="${px}" cy="${py}" r="6.5" fill="${c}" stroke="${INK}" stroke-width="1.1"/>`; }).join('');
const lavado = (d, c) => `<path d="${d}" fill="${c}" opacity=".55"/><path d="${d}" fill="none" stroke="${INK}" stroke-width=".9" stroke-dasharray="1 3"/>`;

// ---------- M1: Salta ----------
const mapaSalta = `${lavado('M28,122 L132,122 C126,200 138,260 128,330 L28,340Z', '#e2c48a')}
  ${lavado('M28,340 L128,330 C150,380 170,430 176,590 L28,590Z', '#d9a07a')}
  ${lavado('M132,122 L250,122 C238,220 246,320 236,420 C220,480 200,540 176,590 C170,430 150,380 128,330 C138,260 126,200 132,122Z', '#b8c88a')}
  ${lavado('M250,122 L332,122 L332,590 L176,590 C200,540 220,480 236,420 C246,320 238,220 250,122Z', '#8aa86a')}
  <path d="M58,226 C70,218 92,222 98,232 C92,244 66,246 58,236Z" fill="#f4f0e6" stroke="${INK}" stroke-width="1.2"/>
  ${cerros(44, 200, 6)}${cerros(50, 290, 6)}${cerros(60, 420, 6, '#c8765a')}${cerros(104, 540, 3, '#c8765a')}
  ${arboles(262, 330, 12)}${arboles(258, 470, 12)}${arboles(268, 160, 12, '#3f6e34')}
  ${tinta('M150,150 C160,190 170,230 190,270 C206,300 214,330 214,360', 2.4, '', '#3b7fb8')}${tinta('M214,360 C200,400 190,450 196,520', 2.4, '', '#3b7fb8')}
  <path d="M196,352 C214,344 236,354 232,370 C226,384 200,384 194,372Z" fill="#7ab4d8" stroke="${INK}" stroke-width="1.2"/>
  ${tinta('M184,206 L190,150', 2.4, 'stroke-dasharray="6 4"', '#b8382a')}${tinta('M172,286 C150,320 130,350 110,400 C96,430 92,450 92,470', 2.4, 'stroke-dasharray="6 4"', '#b8382a')}${tinta('M178,214 L176,280', 2.4, 'stroke-dasharray="6 4"', '#b8382a')}${tinta('M178,212 C150,206 120,200 72,194', 2.4, 'stroke-dasharray="6 4"', '#b8382a')}
  ${pueblo(182, 214, 'Salta', true, 'der')}${pueblo(176, 290, 'Cerrillos', false, 'izq')}${pueblo(92, 484, 'Cafayate')}
  ${insigniaI(210, 200, true)}
  ${sombreroI(140, 340, true)}${sombreroI(186, 160, false)}${sombreroI(110, 196, false)}
  ${fogonI(112, 380)}${fogonI(222, 318)}
  ${niebla('M28,122 L140,122 C142,140 126,150 110,148 C96,160 80,150 66,164 C50,170 40,160 28,170Z', 'a')}
  ${niebla('M236,122 L332,122 L332,240 C318,246 306,236 296,244 C284,236 270,240 262,226 C252,214 254,196 244,186 C246,166 236,150 240,136Z', 'b')}
  ${niebla('M28,540 C50,530 70,546 92,536 C112,544 128,534 150,548 L160,590 L28,590Z', 'c')}
  ${niebla('M282,246 C296,240 314,246 332,240 L332,318 C318,322 304,314 292,318 C282,304 290,290 282,278 C290,266 280,258 282,246Z', 'r')}
  ${macheteI(310, 284, true)}
  ${pin(156, 318)}
  ${T(184, 116 + 22, 15, 'a Jujuy', { f: 'Caveat', w: 700, c: INK })}
  <g transform="translate(34 566)"><rect width="22" height="5" fill="${INK}"/><rect x="22" width="22" height="5" fill="#f4ead2" stroke="${INK}" stroke-width="1"/><rect x="44" width="22" height="5" fill="${INK}"/></g>`;

const leyenda = [[fogonI(10, 12), 'Changa'], [sombreroI(10, 6), 'Domador'], [insigniaI(10, 6, false, .45), 'Capataz'], [macheteI(10, 4, false), 'Rincón']];
const panelS = `<g transform="translate(12 612)"><rect width="336" height="136" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/>
  ${T(16, 30, 17, 'Valle de Lerma', { f: 'Bree', c: '#7a4a2a' })}${T(320, 30, 13, '62 % recorrido', { w: 800, a: 'end', c: '#5a4636' })}
  <rect x="16" y="40" width="304" height="10" rx="5" fill="#e2d6bc" stroke="${O}" stroke-width="1.2"/><rect x="17" y="41" width="${302 * .62}" height="8" rx="4" fill="#2f7d5b"/>
  ${T(16, 72, 12.5, 'Bichos vistos acá: 5 de 7. Domadores: 1 de 3.', { w: 700 })}
  ${leyenda.map(([ic, n], i) => `<g transform="translate(${16 + i * 80} 92)">${ic}${T(24, 16, 11.5, n, { w: 800, c: '#5a4636' })}</g>`).join('')}</g>`;
const M1 = svg('0 0 360 760', `${fondo}${cab('Mapa')}${pestanas(0)}${papel('s')}<g clip-path="url(#pcs)">${mapaSalta}</g>${T(310, 156, 22, 'Salta', { f: 'Caveat', w: 700, a: 'end', c: INK })}${panelS}`);

// ---------- M2: Argentina ----------
const P = (lon, lat) => [((lon + 74.5) * 11.2 + 58).toFixed(1), ((-lat - 21.5) * 13.2 + 128).toFixed(1)];
const poli = (pts) => 'M' + pts.map(([a, b]) => P(a, b).join(',')).join(' L') + 'Z';
const ARG = [[-67.2, -22.8], [-65.7, -22.1], [-64.3, -22.8], [-62.8, -22.1], [-61.5, -23.4], [-59.5, -24.3], [-57.6, -25.3], [-58.6, -27.3], [-56.0, -27.3], [-54.6, -25.6], [-53.7, -26.2], [-53.8, -27.1], [-55.7, -28.2], [-57.6, -30.2], [-58.2, -32.4], [-58.4, -33.6], [-58.4, -34.6], [-57.3, -35.6], [-56.7, -36.4], [-57.5, -38.0], [-58.7, -38.6], [-62.2, -38.9], [-62.3, -40.6], [-65.0, -40.8], [-64.2, -42.3], [-65.0, -43.0], [-65.4, -45.0], [-67.5, -45.9], [-65.9, -47.7], [-67.7, -49.3], [-68.4, -50.1], [-69.2, -51.6], [-68.4, -52.3], [-71.9, -52.0], [-72.3, -50.5], [-73.4, -48.8], [-71.9, -46.5], [-71.6, -44.5], [-71.8, -42.0], [-71.6, -39.5], [-71.1, -37.0], [-70.3, -35.0], [-70.3, -33.0], [-69.8, -30.0], [-69.0, -28.0], [-68.4, -27.0], [-68.5, -25.0], [-67.4, -24.0]];
const TDF = [[-68.6, -52.6], [-68.6, -54.9], [-66.5, -55.0], [-65.3, -54.7], [-67.5, -53.6]];
const PROV = {
  Jujuy: [[-67.2, -22.8], [-65.7, -22.1], [-64.3, -22.8], [-64.6, -23.9], [-65.0, -24.3], [-66.5, -24.2], [-67.0, -23.5]],
  Salta: [[-67.0, -23.5], [-66.5, -24.2], [-65.0, -24.3], [-64.6, -23.9], [-64.3, -22.8], [-62.8, -22.1], [-62.4, -24.3], [-63.6, -25.6], [-64.9, -26.4], [-66.4, -26.3], [-68.3, -25.2], [-68.4, -24.3], [-67.4, -24.0]],
  Corrientes: [[-58.6, -27.3], [-56.0, -27.3], [-55.6, -27.9], [-55.7, -28.2], [-57.6, -30.2], [-58.9, -30.1], [-59.6, -29.2], [-58.9, -28.0]],
};
const otras = [['Misiones', -54.8, -27.0], ['Córdoba', -64.2, -31.4], ['Mendoza', -68.8, -34.6], ['La Pampa', -65.4, -37.0], ['Chubut', -68.5, -43.8]];
const estrellas = (x, y, n) => `<g transform="translate(${x} ${y})">${Array.from({ length: n }, (_, i) => `<g transform="translate(${i * 13} 0)"><circle r="6" fill="#c9ced2" stroke="${O}" stroke-width="1"/><path d="M0,-3.6 L1,-1.1 L3.5,-1.1 L1.5,.5 L2.2,3 L0,1.5 L-2.2,3 L-1.5,.5 L-3.5,-1.1 L-1,-1.1Z" fill="#7a5a2a"/></g>`).join('')}</g>`;
const medallaE = (x, y) => `<g transform="translate(${x} ${y})"><circle r="9" fill="#e8c23a" stroke="${O}" stroke-width="1.4"/><path d="M-5,2 C-5,-4 5,-4 5,2Z" fill="#d8a45a" stroke="${O}" stroke-width="1"/><path d="M-3,-1 l1.4,-1.4 M0,-2 l1.2,-1.4 M3,-1 l1,-1.4" stroke="${O}" stroke-width=".8"/></g>`;
const [sx, sy] = P(-65.3, -24.9).map(Number), [jx, jy] = P(-65.8, -23.3).map(Number), [cx, cy] = P(-57.9, -28.6).map(Number);
const ruta = (a, b, c, d, k) => `<path d="M${a},${b} Q${(a + c) / 2},${Math.min(b, d) - k} ${c},${d}" stroke="#b8382a" stroke-width="2" fill="none" stroke-dasharray="5 4"/>`;
const pasaje = (x, y, v) => `<g transform="translate(${x} ${y})"><rect x="-4" y="-10" width="50" height="20" rx="10" fill="#f4ead2" stroke="${INK}" stroke-width="1.2"/><g transform="translate(2 -7) scale(.5)">${moneda(14, 14)}</g>${T(40, 5, 12, v, { w: 800, a: 'end', c: INK })}</g>`;
const mapaArg = `<path d="${poli(ARG)}" fill="#efe0b8" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="${poli(TDF)}" fill="#efe0b8" stroke="${INK}" stroke-width="1.6"/>
  ${tinta(`M${P(-58.4, -34.6).join(',')} C${P(-55.5, -36).join(',')} ${P(-54, -40).join(',')} ${P(-56, -45).join(',')}`, .8, 'stroke-dasharray="1 4"')}
  ${otras.map(([n, lo, la]) => { const [x, y] = P(lo, la); return `<circle cx="${x}" cy="${y}" r="4" fill="#c9b48a" stroke="${INK}" stroke-width="1"/>${n === 'Chubut' ? T(+x - 7, +y + 4, 12.5, n, { f: 'Caveat', w: 700, a: 'end', c: '#8a7458' }) : T(+x + 7, +y + 4, 12.5, n, { f: 'Caveat', w: 700, c: '#8a7458' })}`; }).join('')}
  <path d="${poli(PROV.Salta)}" fill="#e2a36a" stroke="${INK}" stroke-width="1.4"/><path d="${poli(PROV.Jujuy)}" fill="#c8765a" stroke="${INK}" stroke-width="1.4"/><path d="${poli(PROV.Corrientes)}" fill="#8fb85a" stroke="${INK}" stroke-width="1.4"/>
  ${ruta(sx, sy, cx, cy, 30)}${ruta(jx, jy, cx, cy, 64)}
  
  ${T(jx - 56, jy - 4, 15, 'Jujuy', { f: 'Caveat', w: 700, c: INK })}${estrellas(jx - 56, jy + 8, 3)}
  ${T(sx - 62, sy + 16, 15, 'Salta', { f: 'Caveat', w: 700, c: INK })}${estrellas(sx - 62, sy + 28, 1)}${medallaE(sx - 36, sy + 28)}
  ${T(cx + 14, cy + 20, 15, 'Corrientes', { f: 'Caveat', w: 700, c: INK })}${estrellas(cx + 14, cy + 32, 2)}
  ${pin(sx, sy)}
  <g transform="translate(250 430)">${tinta('M0,0 C12,-8 24,8 36,0 C48,-8 60,8 72,0', 1)}${tinta('M8,16 C20,8 32,24 44,16 C56,8 68,24 80,16', 1)}</g>`;
const panelA = `<g transform="translate(12 612)"><rect width="336" height="136" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/>
  ${T(16, 30, 17, 'Corrientes', { f: 'Bree', c: '#7a4a2a' })}${estrellas(120, 25, 2)}${T(320, 30, 12.5, 'Nivel sugerido 6 a 7', { w: 800, a: 'end', c: '#5a4636' })}
  ${T(16, 58, 12.5, 'Libreta: 0 de 12. Medalla: todavía no.', { w: 700 })}${T(16, 80, 12.5, 'Se llega en micro desde la terminal.', { w: 700, c: '#5a4636' })}
  <g transform="translate(16 92)"><rect width="304" height="34" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/>${T(14, 22, 12.5, 'Pasaje desde Salta', { w: 800 })}<g transform="translate(232 5) scale(.82)">${moneda(14, 14)}</g>${T(292, 23, 15, '260', { f: 'Bree', a: 'end' })}</g></g>`;
const M2 = svg('0 0 360 760', `${fondo}${cab('Mapa')}${pestanas(1)}${papel('a')}<g clip-path="url(#pca)">${mapaArg}</g>${T(310, 156, 22, 'Argentina', { f: 'Caveat', w: 700, a: 'end', c: INK })}${panelA}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Mapa como carta antigua</h3><p class="nota">Se abre desde el Menú. Papel viejo con bordes gastados, tinta sepia, letra a mano. Lo que no recorriste queda bajo una niebla de papel. Tocar una zona o una provincia la muestra abajo.</p><div class="dos">
${tel('MP1', 'Provincia', M1, 'Regiones pintadas a la acuarela (Puna, Valles, Valle de Lerma, Yungas), ríos, rutas en rayado rojo, pueblos, capataz con la insignia de la provincia (tilde verde si ya le ganaste), domadores (tilde si ya les ganaste), changueros con changa (el fogón prendido) y el rincón con la herramienta de la provincia: en gris mientras no la tenés; cuando la conseguís, a color y con tilde verde, pero la zona sigue bajo la niebla hasta que la recorras (acá, Anselmo ya vencido y el machete en la mano). Abajo, la zona tocada: cuánto recorriste, bichos vistos y domadores.')}
${tel('MP2', 'Argentina', M2, 'Contorno del país con las tres provincias de la etapa a color y las demás en gris. Estrellas de dificultad, medalla ganada, dónde estás y rutas de micro. Abajo, la provincia tocada: nivel sugerido, libreta, medalla y pasaje.')}
</div></section>`;
const css2 = css + `.dos{display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:16px}@media (max-width:760px){.dos{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-43.html', import.meta.url), pagina('Catálogo para aprobar, lote 16a', 'Mapa como carta antigua', cuerpo, css2));
console.log('ok 43');
