// Catálogo para aprobar, lote 20b: plano del mapa de Jujuy.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import * as K from './kit-jujuy.mjs';

const O = '#2a1c15', INK = '#4a2e1a';
const T = (x, y, s, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.f || 'Nunito'}" font-size="${s}" font-weight="${o.w || 800}" fill="${o.c || INK}" text-anchor="${o.a || 'start'}">${t}</text>`;
const zona = (d, fill, pat) => `<path d="${d}" fill="${pat ? `url(#${pat})` : fill}" stroke="${O}" stroke-width="2"/>`;
const casas = (x, y, n = 3) => Array.from({ length: n }, (_, i) => `<g transform="translate(${x + (i % 3) * 13 - 13} ${y + Math.floor(i / 3) * 10})"><path d="M-6,0 L-6,-7 L0,-12 L6,-7 L6,0Z" fill="#f4ead2" stroke="${O}" stroke-width="1.3"/><path d="M-6,-7 L0,-12 L6,-7" fill="#c0553a" stroke="${O}" stroke-width="1.3"/></g>`).join('');
const sombrero = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><path d="M-8,2 C-8,0 8,0 8,2 C8,4 -8,4 -8,2Z" fill="#2a2624"/><path d="M-4,1 C-4,-6 4,-6 4,1Z" fill="#2a2624"/></g>`;
const panu = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><rect x="-2.5" y="-8" width="3" height="15" fill="#7a5a3a"/><path d="M0,-7 C5,-6 8,-3 9,1 L4,0 C3,-3 2,-4 0,-4Z" fill="#d23a2a"/></g>`;
const insig = (x, y) => `<g transform="translate(${x - 14} ${y - 14}) scale(.7)"><path d="M20,2 L26,6 L33,6 L34,13 L38,20 L34,27 L33,34 L26,34 L20,38 L14,34 L7,34 L6,27 L2,20 L6,13 L7,6 L14,6Z" fill="#d9dee3" stroke="${O}" stroke-width="2"/><circle cx="20" cy="20" r="12" fill="#eef1f3" stroke="#8a9095" stroke-width="1.4"/><path d="M12,23 C12,15 28,15 28,23Z" fill="#d8a45a" stroke="${O}" stroke-width="1.4"/></g>`;
const sogaI = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><ellipse rx="7" ry="5" fill="none" stroke="#9a958c" stroke-width="2.6"/><ellipse rx="3.6" ry="2.4" fill="none" stroke="#9a958c" stroke-width="2"/><path d="M2,-5 C5,-2 6,2 5,7" stroke="#9a958c" stroke-width="2" fill="none"/></g>`;
const machete = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><g transform="rotate(-35)"><path d="M-2,-9 C2,-9 3,-3 2,4 L-2,4Z" fill="#9a958c" stroke="${O}" stroke-width="1"/><rect x="-2.2" y="4" width="4.4" height="6" rx="1.2" fill="#7a7468"/></g></g>`;
const num = (x, y, n, c = '#2f7d5b') => `<g transform="translate(${x} ${y})"><circle r="10" fill="${c}" stroke="${O}" stroke-width="1.6"/>${T(0, 4.5, 12, n, { a: 'middle', c: '#fff' })}</g>`;

const W = 560, H = 760;
const plano = `<defs>${K.patron('zr', 'ripio', 3)}${K.patron('zo', 'ocre', 4)}${K.patron('zs', 'salar', 5)}${K.patron('zh', 'hojarasca', 6)}${K.patron('zn', 'nevado', 7)}</defs>
  <rect width="${W}" height="${H}" fill="#efe6d4"/>
  ${zona('M20,20 L230,20 C220,180 236,340 220,500 L20,520Z', '', 'zr')}
  ${zona('M20,520 L220,500 C236,580 244,660 240,740 L20,740Z', '', 'zn')}
  ${zona('M230,20 L400,20 C392,200 404,380 396,560 C392,640 400,700 404,740 L240,740 C244,660 236,580 220,500 C236,340 220,180 230,20Z', '', 'zo')}
  ${zona('M400,20 L540,20 L540,740 L404,740 C400,700 392,640 396,560 C404,380 392,200 400,20Z', '', 'zh')}
  ${Array.from({ length: 34 }, (_, i) => `<circle cx="${412 + (i * 37) % 120}" cy="${60 + (i * 61) % 560}" r="${9 + (i % 3) * 2}" fill="${['#3f6e34', '#4f7e3a', '#2f5a2a'][i % 3]}" stroke="${O}" stroke-width="1"/>`).join('')}
  <path d="M70,300 C110,280 180,290 190,320 C196,350 130,366 90,356 C60,348 50,316 70,300Z" fill="url(#zs)" stroke="${O}" stroke-width="1.6"/>
  ${K.lagunaAltura(110, 90, 56, 26, 8)}
  ${K.cerroColores(232, 330, 70, 60)}
  ${K.nevados(30, 560, 180, 90)}
  ${K.rioQuebrada('M300,20 C296,120 304,220 300,320 C296,420 304,520 320,620 C330,680 360,720 390,760', 26, 5)}
  ${[[300, 150], [300, 380], [330, 630]].map(([x, y]) => `<rect x="${x - 16}" y="${y - 6}" width="32" height="12" fill="#a8845a" stroke="${O}" stroke-width="1.4"/>`).join('')}
  <path d="M430,760 L420,640 L346,600 L344,380 L342,200 L320,152 L280,148 L230,140 L170,160" stroke="#b8382a" stroke-width="5" fill="none" stroke-dasharray="10 6" stroke-linecap="round"/>
  <path d="M344,380 L260,384 C220,370 180,340 150,330" stroke="#b8382a" stroke-width="5" fill="none" stroke-dasharray="10 6"/>
  <path d="M420,640 C450,620 470,590 486,560" stroke="#8a6a46" stroke-width="4" fill="none" stroke-dasharray="4 5"/>
  <path d="M346,610 L300,632 C250,630 200,610 160,596" stroke="#8a6a46" stroke-width="4" fill="none" stroke-dasharray="4 5"/>
  ${T(430, 752, 13, 'Ruta 9, a pie a Salta', { a: 'end' })}
  ${casas(420, 650, 5)}${T(460, 690, 14, 'San Salvador', { a: 'middle' })}
  ${casas(256, 400, 6)}${T(256, 440, 14, 'Purmamarca', { a: 'middle' })}${insig(214, 392)}
  ${casas(318, 160, 3)}${T(352, 150, 13, 'Humahuaca', { a: 'start' })}
  ${casas(170, 170, 2)}${T(170, 200, 12, 'Abra Pampa', { a: 'middle' })}
  ${sombrero(470, 520)}${sombrero(350, 240)}${sombrero(80, 230)}
  ${panu(200, 450)}${panu(500, 600)}
  ${sogaI(150, 600)}
  ${T(100, 40, 15, 'PUNA', { a: 'middle', c: '#6a5a3a' })}${T(120, 380, 11, 'Salinas Grandes', { a: 'middle' })}${T(110, 128, 11, 'Laguna de Pozuelos', { a: 'middle' })}${T(316, 46, 13, 'QUEBRADA', { a: 'middle', c: '#7a4a2a' })}${T(470, 40, 14, 'YUNGAS', { a: 'middle', c: '#f4ead2' })}${T(120, 540, 14, 'CUMBRES', { a: 'middle', c: '#4a4a5a' })}
  ${num(440, 610, 1)}${num(470, 470, 2)}${num(280, 470, 3)}${num(336, 196, 4)}${num(60, 260, 5)}${num(110, 640, 6, '#5a5a5a')}`;

const ZONAS = [
  ['1', 'San Salvador de Jujuy', 'Llegada a pie por la Ruta 9 (desde Salta) o en micro. Terminal y posta. Tierra de pueblo.', '—', '—'],
  ['2', 'Yungas de Calilegua', 'Monte húmedo, hojarasca, río torrentoso.', 'Mayuq (río torrentoso). Raro: Papacuy, en el borde del monte con la vega.', 'Domador nuevo de las yungas (a diseñar: Cañero Zenón, zafrero). Changuera Bagualera Delfina.'],
  ['3', 'Purmamarca (centro) y Quebrada', 'Pueblo completo al pie del cerro de siete colores; tierra de quebrada, cardones, tola y rocas.', 'Wiskacha (rocas), Allpuma (tierra abierta, tarde y noche), Aguijón (tola). Raro: Atoq, en lo seco con sol.', 'Galpón de Eulogia, posta, almacén, curandera, feria. Changuera Pastora Juana (puesto de llamas, a la salida).'],
  ['4', 'Humahuaca y quebrada alta', 'Ripio, cardones y queñoas en las laderas.', 'Quinti (queñoales en lo alto), Wiskacha.', 'Domadora Andinista Lucía. Posta chica.'],
  ['5', 'Puna: Salinas Grandes, Abra Pampa y Pozuelos', 'Ripio, salar, paja brava, vegas, laguna de altura. Viento y nieve.', 'Suri (Puna abierta), Tolvanera (viento, salinas), Chinchay (frío o nieve). Raro: Pariwana, en la laguna de Pozuelos.', 'Domador Minero Aniceto. Posta chica en Abra Pampa.'],
  ['6', 'Cumbres (rincón)', 'Nevados, yareta, rocas; se sube por el risco con la soga.', 'Coquena (mañana con nieve), Chinchay.', 'Ermitaño Don Pascual.'],
];
const tabla = `<table class="tz"><tr><th></th><th>Zona</th><th>Suelo y paisaje</th><th>Bichos</th><th>Gente y lugares</th></tr>${ZONAS.map((z) => `<tr>${z.map((c, i) => `<td${i === 0 ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const cuerpo = `<div class="como">Plano para aprobar <b>antes</b> de dibujar las zonas con el kit. Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Plano de Jujuy</h3><p class="nota">Norte arriba. El río Grande baja por la Quebrada y tiene tres puentes donde la cruzan los caminos. La Ruta 9 sube desde Salta por San Salvador hasta Humahuaca y Abra Pampa; la Ruta 52 va de Purmamarca a las Salinas. Senderos marrones a las yungas y, cruzando el río desde San Salvador, a las cumbres del Chañi. Íconos: insignia = capataza, sombrero = domador, poste con pañuelo = changuera, soga = rincón.</p><div class="pl">${svg(`0 0 ${W} ${H}`, plano)}</div></section>
<section><h3>Qué hay en cada zona</h3>${tabla}
<p class="nota">El centro es Purmamarca: ahí están casi todos los edificios y el galpón. Cada bicho sale donde le corresponde por tipo: Agua en ríos y lagunas, Roca en las rocas, Tierra en suelo abierto, Veneno en la tola, Viento en la Puna abierta, Hielo en el frío, Rayo en lo alto. Falta un tercer domador: la gente aprobada de Jujuy ya tiene otros papeles (Saturnino atiende la posta, Tomás el almacén, Dominga la feria, Juana y Delfina son changueras), así que propongo uno nuevo para las yungas.</p></section>`;
const css2 = css + `.pl{background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;max-width:600px}.pl svg{width:100%;height:auto;display:block}.tz{border-collapse:collapse;width:100%;font-size:13.5px;background:#fffaf0}.tz th,.tz td{border:1px solid #d8c8a8;padding:8px;vertical-align:top;text-align:left}.tz th{background:#efe6d4}.tz .n{font-weight:800;text-align:center}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-60}}`;
writeFileSync(new URL('./catalogo-55.html', import.meta.url), pagina('Catálogo para aprobar, lote 20b', 'Plano del mapa de Jujuy', cuerpo, css2));
console.log('ok 55');
