// Catálogo para aprobar, lote 18b: plano del mapa de Salta (antes de dibujarlo con el kit).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import * as K from './kit-salta.mjs';

const O = '#2a1c15', INK = '#4a2e1a';
const T = (x, y, s, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.f || 'Nunito'}" font-size="${s}" font-weight="${o.w || 800}" fill="${o.c || INK}" text-anchor="${o.a || 'start'}">${t}</text>`;
const zona = (d, fill, pat) => `<path d="${d}" fill="${pat ? `url(#${pat})` : fill}" stroke="${O}" stroke-width="2"/>`;
const casas = (x, y, n = 3) => Array.from({ length: n }, (_, i) => `<g transform="translate(${x + (i % 3) * 13 - 13} ${y + Math.floor(i / 3) * 10})"><path d="M-6,0 L-6,-7 L0,-12 L6,-7 L6,0Z" fill="#f4ead2" stroke="${O}" stroke-width="1.3"/><path d="M-6,-7 L0,-12 L6,-7" fill="#c0553a" stroke="${O}" stroke-width="1.3"/></g>`).join('');
const sombrero = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><path d="M-8,2 C-8,0 8,0 8,2 C8,4 -8,4 -8,2Z" fill="#2a2624"/><path d="M-4,1 C-4,-6 4,-6 4,1Z" fill="#2a2624"/></g>`;
const panu = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><rect x="-2.5" y="-8" width="3" height="15" fill="#7a5a3a"/><path d="M0,-7 C5,-6 8,-3 9,1 L4,0 C3,-3 2,-4 0,-4Z" fill="#d23a2a"/></g>`;
const insig = (x, y) => `<g transform="translate(${x - 14} ${y - 14}) scale(.7)"><path d="M20,2 L26,6 L33,6 L34,13 L38,20 L34,27 L33,34 L26,34 L20,38 L14,34 L7,34 L6,27 L2,20 L6,13 L7,6 L14,6Z" fill="#d9dee3" stroke="${O}" stroke-width="2"/><circle cx="20" cy="20" r="12" fill="#eef1f3" stroke="#8a9095" stroke-width="1.4"/><path d="M12,23 C12,15 28,15 28,23Z" fill="#d8a45a" stroke="${O}" stroke-width="1.4"/></g>`;
const machete = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><g transform="rotate(-35)"><path d="M-2,-9 C2,-9 3,-3 2,4 L-2,4Z" fill="#9a958c" stroke="${O}" stroke-width="1"/><rect x="-2.2" y="4" width="4.4" height="6" rx="1.2" fill="#7a7468"/></g></g>`;
const num = (x, y, n, c = '#2f7d5b') => `<g transform="translate(${x} ${y})"><circle r="10" fill="${c}" stroke="${O}" stroke-width="1.6"/>${T(0, 4.5, 12, n, { a: 'middle', c: '#fff' })}</g>`;

const W = 560, H = 760;
const plano = `<defs>${K.patron('zp', 'pasto', 3)}${K.patron('zt', 'tierra', 4)}${K.patron('zr', 'ripio', 5)}${K.patron('zc', 'colorada', 6)}${K.patron('zs', 'salar', 7)}</defs>
  <rect width="${W}" height="${H}" fill="#efe6d4"/>
  ${zona('M20,20 L210,20 C200,140 214,250 196,360 L20,380Z', '', 'zr')}
  <path d="M60,170 C90,150 140,160 150,190 C140,220 80,226 60,206Z" fill="url(#zs)" stroke="${O}" stroke-width="1.6"/>
  ${zona('M20,380 L196,360 C220,450 246,560 252,740 L20,740Z', '', 'zc')}
  ${zona('M210,20 L390,20 C380,170 392,300 380,430 C370,560 330,650 300,740 L252,740 C246,560 220,450 196,360 C214,250 200,140 210,20Z', '', 'zp')}
  ${zona('M390,20 L540,20 L540,740 L300,740 C330,650 370,560 380,430 C392,300 380,170 390,20Z', '#5f8a4a')}
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${400 + (i * 37) % 135}" cy="${40 + (i * 61) % 690}" r="${9 + (i % 3) * 2}" fill="${['#3f6e34', '#4f7e3a', '#2f5a2a'][i % 3]}" stroke="${O}" stroke-width="1"/>`).join('')}
  <path d="M440,250 C470,236 520,246 534,262 L534,400 C510,414 470,404 448,412 C430,380 446,340 432,310 C446,290 428,270 440,250Z" fill="#1f3f1f" opacity=".85" stroke="${O}" stroke-width="2" stroke-dasharray="5 4"/>
  ${[[60, 330], [100, 300], [150, 90], [40, 120]].map(([x, y]) => `<path d="M${x - 12},${y} C${x - 7},${y - 6} ${x - 3},${y - 16} ${x},${y - 18} C${x + 3},${y - 16} ${x + 7},${y - 6} ${x + 12},${y}" fill="#b08a54" stroke="${O}" stroke-width="1.3"/>`).join('')}
  ${K.rio('M250,40 C270,140 300,220 320,320 C336,400 330,440 330,470', 14)}
  <path d="M300,470 C320,452 370,460 372,482 C374,506 330,516 306,504 C292,496 290,480 300,470Z" fill="#3a7aa8" stroke="${O}" stroke-width="2"/>
  <path d="M300,40 L304,140 L296,200 L292,300 L270,420 L200,520 L120,640" stroke="#b8382a" stroke-width="5" fill="none" stroke-dasharray="10 6" stroke-linecap="round"/>
  <path d="M300,140 C240,150 170,160 110,160" stroke="#b8382a" stroke-width="5" fill="none" stroke-dasharray="10 6"/>
  <path d="M300,140 C360,150 400,160 440,180" stroke="#8a6a46" stroke-width="4" fill="none" stroke-dasharray="4 5"/>
  <path d="M300,20 L300,40" stroke="#b8382a" stroke-width="5"/>${T(300, 14, 13, 'Ruta 9, a pie a Jujuy', { a: 'middle' })}
  ${casas(300, 150, 6)}${T(316, 132, 14, 'Salta')}${insig(346, 170)}
  ${casas(270, 430, 5)}${T(206, 436, 14, 'Cerrillos', { a: 'end' })}${num(270, 400, '★', '#c8962a')}
  ${casas(120, 650, 3)}${T(120, 680, 13, 'Cafayate', { a: 'middle' })}
  ${casas(110, 160, 2)}${T(110, 190, 12, 'San Antonio', { a: 'middle' })}
  ${sombrero(286, 470)}${sombrero(334, 520)}${sombrero(190, 530)}
  ${panu(230, 476)}${panu(356, 432)}
  ${machete(486, 330)}
  ${T(100, 60, 15, 'PUNA', { a: 'middle', c: '#7a5a3a' })}${T(110, 470, 15, 'QUEBRADA Y VALLES', { a: 'middle', c: '#7a3a2a' })}${T(300, 600, 15, 'VALLE DE LERMA', { a: 'middle', c: '#3f5a24' })}${T(466, 60, 15, 'YUNGAS', { a: 'middle', c: '#f4ead2' })}${T(486, 430, 12, 'Monte cerrado', { a: 'middle', c: '#f4ead2' })}
  ${T(380, 500, 11, 'Dique', { a: 'start', c: '#1f3f5f' })}
  ${num(250, 300, 1)}${num(262, 176, 2)}${num(210, 610, 3)}${num(170, 250, 4)}${num(486, 300, 5, '#5a5a5a')}`;

const ZONAS = [
  ['★', 'Cerrillos (inicio)', 'Rancho de Don Abel, posta, almacén, curandera y feria. Empedrado y tierra.', '—', '—'],
  ['1', 'Valle de Lerma y Ruta 68', 'Pasto bajo y alto, algarrobos, jarilla, río Arenales y dique.', 'Kirkallpa (día), Llamarú (día, junto a los puestos), Miyurá (pasto alto, tarde), Lucerna (noche, cerca del agua). Raro: Yakusapo, en el dique con lluvia.', 'Domador Benito en la Ruta 68; Coplera Eusebia junto al río. Changueros: Puestero Cirilo (Ruta 68) y Baqueano Fermín (rancho del río).'],
  ['2', 'Salta capital', 'Pueblo grande.', '—', 'Galpón de Anselmo, terminal, tinglado de la Rural, posta.'],
  ['3', 'Quebrada de las Conchas y Cafayate', 'Tierra colorada, paredes de quebrada, cardones y rocas.', 'Pirkasol (rocas, con sol), Mallku (viento, sobre la quebrada). Raro: la inicial de Fuego que no elegiste, en la siesta.', 'Acampante Martina (domadora). Posta chica en Cafayate.'],
  ['4', 'Puna y San Antonio de los Cobres', 'Ripio, salar, paja brava, cardones. Nieve algunos días.', 'Escarchuña (frío o nieve), Mallku. ', 'Posta chica en San Antonio.'],
  ['5', 'Yungas y monte cerrado (rincón)', 'Cebil, helechos, sauces; el monte cerrado necesita el machete.', 'Raro: la inicial de Flora que no elegiste, al borde de las yungas. En el rincón: Ucumar (mito, de noche).', 'Ermitaño Don Higinio en el rincón.'],
];
const tabla = `<table class="tz"><tr><th></th><th>Zona</th><th>Suelo y paisaje</th><th>Bichos</th><th>Gente y lugares</th></tr>${ZONAS.map((z) => `<tr>${z.map((c, i) => `<td${i === 0 ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const cuerpo = `<div class="como">Plano para aprobar <b>antes</b> de dibujar el mapa entero con el kit. Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Plano de Salta</h3><p class="nota">Norte arriba. Rutas en rojo; el sendero marrón va a las yungas. Íconos: insignia = capataz, sombrero = domador, poste con pañuelo = changuero, machete = rincón. El número indica el orden sugerido, pero el recorrido es libre.</p><div class="pl">${svg(`0 0 ${W} ${H}`, plano)}</div></section>
<section><h3>Qué hay en cada zona</h3>${tabla}
<p class="nota">Recorrido: arrancás en Cerrillos, en el valle juntás los primeros 6 (Kirkallpa, Llamarú, Miyurá, Lucerna y Pirkasol están a mano, con la inicial son 6), peleás con los domadores, subís a Salta capital por el capataz y después la Quebrada y la Puna completan la libreta. Las yungas te esperan hasta tener el machete. Cambio a confirmar: la changa de Fermín pasa de "Ganale a Rolo" a "Ganale a Eusebia, la coplera del río", porque Rolo no es un domador del juego.</p></section>`;
const css2 = css + `.pl{background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;max-width:600px}.pl svg{width:100%;height:auto;display:block}.tz{border-collapse:collapse;width:100%;font-size:13.5px;background:#fffaf0}.tz th,.tz td{border:1px solid #d8c8a8;padding:8px;vertical-align:top;text-align:left}.tz th{background:#efe6d4}.tz .n{font-weight:800;text-align:center}`;
writeFileSync(new URL('./catalogo-49.html', import.meta.url), pagina('Catálogo para aprobar, lote 18b', 'Plano del mapa de Salta', cuerpo, css2));
console.log('ok 49');
