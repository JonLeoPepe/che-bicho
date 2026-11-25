// Catálogo para aprobar, lote 19b: plano del mapa de Corrientes.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import * as K from './kit-corrientes.mjs';
import { rio } from './kit-salta.mjs';

const O = '#2a1c15', INK = '#4a2e1a';
const T = (x, y, s, t, o = {}) => `<text x="${x}" y="${y}" font-family="${o.f || 'Nunito'}" font-size="${s}" font-weight="${o.w || 800}" fill="${o.c || INK}" text-anchor="${o.a || 'start'}">${t}</text>`;
const zona = (d, fill, pat) => `<path d="${d}" fill="${pat ? `url(#${pat})` : fill}" stroke="${O}" stroke-width="2"/>`;
const casas = (x, y, n = 3) => Array.from({ length: n }, (_, i) => `<g transform="translate(${x + (i % 3) * 13 - 13} ${y + Math.floor(i / 3) * 10})"><path d="M-6,0 L-6,-7 L0,-12 L6,-7 L6,0Z" fill="#f4ead2" stroke="${O}" stroke-width="1.3"/><path d="M-6,-7 L0,-12 L6,-7" fill="#c0553a" stroke="${O}" stroke-width="1.3"/></g>`).join('');
const sombrero = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><path d="M-8,2 C-8,0 8,0 8,2 C8,4 -8,4 -8,2Z" fill="#2a2624"/><path d="M-4,1 C-4,-6 4,-6 4,1Z" fill="#2a2624"/></g>`;
const panu = (x, y) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><rect x="-2.5" y="-8" width="3" height="15" fill="#7a5a3a"/><path d="M0,-7 C5,-6 8,-3 9,1 L4,0 C3,-3 2,-4 0,-4Z" fill="#d23a2a"/></g>`;
const insig = (x, y) => `<g transform="translate(${x - 14} ${y - 14}) scale(.7)"><path d="M20,2 L26,6 L33,6 L34,13 L38,20 L34,27 L33,34 L26,34 L20,38 L14,34 L7,34 L6,27 L2,20 L6,13 L7,6 L14,6Z" fill="#d9dee3" stroke="${O}" stroke-width="2"/><circle cx="20" cy="20" r="12" fill="#eef1f3" stroke="#8a9095" stroke-width="1.4"/><path d="M12,23 C12,15 28,15 28,23Z" fill="#d8a45a" stroke="${O}" stroke-width="1.4"/></g>`;
const canoa = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><path d="M-9,0 C-5,5 5,5 9,0Z" fill="#9a958c" stroke="${O}" stroke-width="1"/><path d="M4,-8 L-2,4" stroke="#7a7468" stroke-width="1.8"/></g>`;
const num = (x, y, n, c = '#2f7d5b') => `<g transform="translate(${x} ${y})"><circle r="10" fill="${c}" stroke="${O}" stroke-width="1.6"/>${T(0, 4.5, 12, n, { a: 'middle', c: '#fff' })}</g>`;

const W = 560, H = 760;
const plano = `<defs>${K.patron('zp', 'pasto', 3)}${K.patron('zc', 'colorada', 4)}${K.patron('za', 'arena', 5)}${K.patron('zb', 'barro', 6)}</defs>
  <rect width="${W}" height="${H}" fill="#efe6d4"/>
  ${zona('M20,20 L540,20 L540,740 L20,740Z', '', 'zp')}
  <path d="M20,20 L540,20 L540,70 C400,90 240,70 120,110 C80,130 60,220 64,320 C66,440 50,600 70,740 L20,740Z" fill="url(#za)" stroke="${O}" stroke-width="1.6"/>
  ${K.rioParana('M540,40 C420,56 260,44 140,80 C60,110 40,200 42,320 C44,460 30,600 40,760', 52)}
  <path d="M250,250 C300,200 420,190 500,230 C540,260 540,520 500,600 C440,680 320,670 280,600 C240,520 230,330 250,250Z" fill="#5a9aa8" opacity=".85" stroke="${O}" stroke-width="2"/>
  ${Array.from({ length: 26 }, (_, i) => K.camalote(270 + (i * 53) % 240, 260 + (i * 97) % 360, 1.3, i % 4 === 0)).join('')}
  <path d="M380,400 C410,380 470,386 486,410 C498,440 470,470 432,472 C398,474 372,450 380,400Z" fill="url(#zb)" stroke="${O}" stroke-width="2" stroke-dasharray="5 4"/>
  ${Array.from({ length: 12 }, (_, i) => `<circle cx="${120 + (i * 41) % 120}" cy="${560 + (i * 37) % 140}" r="${10 + (i % 3) * 2}" fill="${['#3f6e34', '#4f7e3a', '#2f5a2a'][i % 3]}" stroke="${O}" stroke-width="1"/>`).join('')}
  ${[[150, 300], [180, 360], [130, 420], [200, 470]].map(([x, y]) => `<path d="M${x - 12},${y} C${x - 10},${y - 10} ${x + 10},${y - 10} ${x + 12},${y}Z" fill="#b8703e" stroke="${O}" stroke-width="1.2"/>`).join('')}
  <path d="M110,120 L160,200 L180,330 L190,430 L226,560 L246,690" stroke="#b8382a" stroke-width="5" fill="none" stroke-dasharray="10 6" stroke-linecap="round"/>
  <path d="M190,430 C230,430 260,440 300,460" stroke="#8a6a46" stroke-width="4" fill="none" stroke-dasharray="4 5"/>
  ${casas(110, 120, 6)}${T(130, 106, 14, 'Corrientes')}
  ${casas(190, 440, 5)}${T(150, 470, 14, 'Mercedes', { a: 'end' })}
  ${casas(262, 704, 3)}${T(262, 734, 13, 'Colonia Pellegrini', { a: 'middle' })}${insig(312, 700)}
  ${sombrero(96, 220)}${sombrero(230, 390)}${sombrero(356, 712)}
  ${panu(236, 540)}${panu(206, 690)}
  ${canoa(432, 404)}
  ${T(470, 120, 14, 'PARANÁ', { a: 'middle', c: '#6a4a2a' })}${T(150, 260, 14, 'CAMPO Y LOMADAS', { a: 'middle', c: '#3f5a24' })}${T(400, 240, 14, 'ESTEROS DEL IBERÁ', { a: 'middle', c: '#1f3f5f' })}${T(118, 548, 14, 'MONTE', { a: 'middle', c: '#2f4a24' })}${T(432, 492, 12, 'Isla del estero', { a: 'middle', c: '#1f3f5f' })}
  ${num(140, 150, 1)}${num(120, 300, 2)}${num(214, 470, 3)}${num(286, 664, 4)}${num(170, 600, 5)}${num(460, 430, 6, '#5a5a5a')}`;

const ZONAS = [
  ['1', 'Corrientes capital y costa del Paraná', 'Llegada en micro. Terminal y posta. Arena, río ancho, sauces y ceibos.', 'Pirayú (en el río), Kapiyvá (orilla). Raro: Tatakú, en los techos del pueblo con sol.', 'Domador Canoero Eusebio, en la costa.'],
  ['2', 'Campo y lomadas', 'Pasto verde, pajonal, tacurúes, palmeras caranday, espinillos.', 'Ventero (palmeras y árboles del campo, día), Pajonero (pajonal, tarde y noche).', 'Domador Acordeonista Ireneo, en el camino a Mercedes.'],
  ['3', 'Mercedes', 'Pueblo completo: posta, almacén, curandera y feria correntinas.', '—', 'Don Aurelio, Ña Chela, Ña Elena, Ramona.'],
  ['4', 'Esteros del Iberá y Colonia Pellegrini', 'Estero con camalotes, embalsados, totora, lagunas con irupé.', 'Guasú (embalsado y pajonal, mañana), Mbarigüí (totora, tarde y noche), Kapiyvá (orilla). Rayajá en tierra firme junto a las palmeras de la orilla (día). Raro: Yacarón, en el agua a la siesta con sol.', 'Galpón de Rosendo y posta chica en Pellegrini. Domador Guía Aníbal. Changueros: Pescador Ramón (orilla del estero) y Guardaparque Sol (seccional).'],
  ['5', 'Monte', 'Lapachos, ceibos, sotobosque cerrado al sur.', 'Raro: Mburucoa, a la mañana.', '—'],
  ['6', 'Isla del estero (rincón)', 'Se llega cruzando el canal con la canoa.', 'Pombero (noche) y Yasí Yateré (tarde, siesta).', 'Ermitaño Don Anacleto.'],
];
const tabla = `<table class="tz"><tr><th></th><th>Zona</th><th>Suelo y paisaje</th><th>Bichos</th><th>Gente y lugares</th></tr>${ZONAS.map((z) => `<tr>${z.map((c, i) => `<td${i === 0 ? ' class="n"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const cuerpo = `<div class="como">Plano para aprobar <b>antes</b> de dibujar las zonas con el kit. Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Plano de Corrientes</h3><p class="nota">Norte arriba. El Paraná bordea el norte y el oeste. Ruta en rojo; sendero marrón al estero. Íconos: insignia = capataz, sombrero = domador, poste con pañuelo = changuero, canoa = rincón. El número es el orden sugerido; el recorrido es libre.</p><div class="pl">${svg(`0 0 ${W} ${H}`, plano)}</div></section>
<section><h3>Qué hay en cada zona</h3>${tabla}
<p class="nota">Los tres iniciales de Corrientes salen como raros en su provincia (Tatakú, Yacarón y Mburucoa), cada uno con su condición. Domadores: Eusebio, Ireneo y Aníbal (Pescador Ramón y Guardaparque Sol quedan como changueros, Peona Ramona atiende la feria).</p></section>`;
const css2 = css + `.pl{background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;max-width:600px}.pl svg{width:100%;height:auto;display:block}.tz{border-collapse:collapse;width:100%;font-size:13.5px;background:#fffaf0}.tz th,.tz td{border:1px solid #d8c8a8;padding:8px;vertical-align:top;text-align:left}.tz th{background:#efe6d4}.tz .n{font-weight:800;text-align:center}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-84}}`;
writeFileSync(new URL('./catalogo-52.html', import.meta.url), pagina('Catálogo para aprobar, lote 19b', 'Plano del mapa de Corrientes', cuerpo, css2));
console.log('ok 52');
