// Catálogo para aprobar, lote 19c: el mapa de Corrientes dibujado con el kit, una pantalla por zona.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { O, tel, css } from './catalogo-29.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { postaC, almacenC, curanderaC, feriaC, terminalC, ranchoOrilla, guardaparques } from './edificios-corrientes.mjs';
import { galponC, conMicro } from './edificios-galpon.mjs';
import { pescador, guia, acordeonista, canoero, guardaparque, pocha } from './personas-corrientes.mjs';
import { kapiyva, guasu, aguara } from './catalogo-10.mjs';
import { tero } from './muestra-bichos.mjs';
import { mbarigui, rayaja, pirayu } from './catalogo-11.mjs';
import { fogon, cssFogon } from './marca-changa.mjs';
import { micro } from './edificios2.mjs';
import * as K from './kit-corrientes.mjs';

const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);
const pj = (x, y) => `<g transform="translate(${x} ${y}) scale(.3)">${jugador()}</g>`;
const gente = (x, y, f, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -.3 : .3} .3)${flip ? ' translate(-120 0)' : ''}">${f()}</g>`;
const bicho = (x, y, f, s = .42, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})${flip ? ' translate(-200 0)' : ''}">${f()}</g>`;
const ed = (x, y, f, s = .7) => `<g transform="translate(${x} ${y}) scale(${s})">${f()}</g>`;
const pie = `${equipoMini}${mini}`;
const fondoP = (k, seed, id) => `<defs>${K.patron('f' + id, k, seed)}</defs><rect width="360" height="760" fill="url(#f${id})"/>`;
const camino = (d, k, id, w = 40) => `<defs>${K.patron('c' + id, k, 9)}</defs><path d="${d}" stroke="url(#c${id})" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
const canoaGris = (x, y) => `<g transform="translate(${x} ${y})"><circle r="13" fill="#8a8478" opacity=".2"/><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><path d="M-9,0 C-5,5 5,5 9,0Z" fill="#9a958c" stroke="${O}" stroke-width="1"/><path d="M4,-8 L-2,4" stroke="#7a7468" stroke-width="1.8"/></g>`;

// Z1 Corrientes capital y costa
const Z1 = marco('z1', `${fondoP('arena', 4, 'z1')}<defs>${K.patron('ad1', 'adoquin', 2)}</defs>${K.rioParana('M-20,150 C100,140 260,170 380,150', 110)}
  <path d="M-10,420 L370,400 L370,470 L-10,490Z" fill="url(#ad1)" stroke="${O}" stroke-width="2"/>
  ${ed(4, 520, () => conMicro(terminalC, micro, ['#2f7d5b', '#1f5a3e', '#4aa078']), .46)}${ed(226, 526, postaC, .48)}
  ${K.ceibo(60, 330, .8, 33)}${K.ceibo(310, 330, .7, 34)}
  ${bicho(220, 116, pirayu, .3)}${bicho(40, 238, kapiyva, .34)}
  ${gente(250, 290, canoero, true)}${pj(160, 340)}
  ${hud('Corrientes capital', 8, 'manana', 'despejado')}${pie}`);

// Z2 Campo y lomadas
const Z2 = marco('z2', `${fondoP('pasto', 3, 'z2')}${camino('M-20,700 C80,620 140,520 180,440 C220,360 260,280 380,220', 'huella', 'z2')}
  ${K.alambrado(10, 200, 300)}${K.tranquera(206, 300)}${K.alambrado(296, 380, 300)}
  ${K.caranday(60, 250, .8)}${K.caranday(320, 210, .7)}${K.tacuru(100, 400, 1)}${K.tacuru(300, 560, .8)}${K.espinillo(250, 420, 1)}
  ${K.pajonal(20, 560, 9, 6)}${K.pajonal(220, 650, 8, 7)}
  ${gente(250, 360, acordeonista, true)}${pj(150, 470)}
  ${bicho(70, 186, tero, .34)}${bicho(40, 590, aguara, .36)}
  ${hud('Campo, camino a Mercedes', 8, 'tarde', 'viento')}${pie}`);

// Z3 Mercedes
const Z3 = marco('z3', `${fondoP('colorada', 5, 'z3')}<defs>${K.patron('ad3', 'adoquin', 3)}</defs><rect x="80" y="260" width="200" height="190" rx="18" fill="url(#ad3)" stroke="${O}" stroke-width="2"/>
  ${ed(8, 100, postaC, .5)}${ed(218, 100, almacenC, .5)}
  ${K.lapacho(160, 410, .65, 14)}
  ${ed(8, 500, curanderaC, .5)}${ed(218, 512, feriaC, .5)}
  ${gente(220, 330, pocha)}${pj(160, 450)}
  ${K.espinillo(180, 230, .7)}
  ${hud('Mercedes, Corrientes', 9, 'manana', 'nublado')}${pie}`);

// Z4 Colonia Pellegrini
const Z4 = marco('z4', `${fondoP('pasto', 6, 'z4')}<path d="M-10,96 L370,96 L370,250 C260,270 120,240 -10,262Z" fill="#5a9aa8" stroke="${O}" stroke-width="2"/>${[30, 90, 150, 220, 290, 330].map((x, i) => K.camalote(x, 150 + (i % 2) * 40, 1.1, i % 2 === 0)).join('')}
  ${camino('M180,800 C170,660 190,560 180,440 C176,380 190,320 200,280', 'huella', 'z4', 34)}
  ${ed(8, 300, galponC, .5)}${ed(218, 296, guardaparques, .5)}${fogon(250, 464, 1.1)}${gente(290, 400, guardaparque, true)}
  ${ed(8, 540, postaC, .5)}
  ${K.caranday(300, 620, .7)}${bicho(228, 600, rayaja, .32)}
  ${gente(250, 540, guia, true)}${pj(160, 470)}
  ${hud('Colonia Pellegrini', 10, 'tarde', 'despejado')}${pie}`);

// Z5 Esteros del Iberá
const Z5 = marco('z5', `${fondoP('barro', 7, 'z5')}<defs>${K.patron('em5', 'embalsado', 8)}</defs>
  ${K.estero(120, 300, 150, 120, 9)}${K.estero(270, 560, 110, 80, 10)}
  <path d="M220,200 C260,190 330,200 350,230 C360,260 320,290 280,284 C240,278 210,240 220,200Z" fill="url(#em5)" stroke="${O}" stroke-width="2"/>
  ${K.totora(40, 450, 7, 13)}${K.totora(300, 470, 6, 14)}${K.irupe(110, 300, 1)}
  ${ed(220, 360, ranchoOrilla, .5)}${fogon(172, 466, 1.1)}${gente(190, 400, pescador)}
  ${bicho(250, 180, guasu, .38)}${bicho(40, 400, mbarigui, .3)}${bicho(140, 650, kapiyva, .34)}
  ${pj(150, 500)}
  ${hud('Esteros del Iberá', 10, 'manana', 'nublado')}${pie}`);

// Z6 Monte
const Z6 = marco('z6', `${fondoP('colorada', 9, 'z6')}<rect width="360" height="760" fill="#3f6a2a" opacity=".3"/>${camino('M-20,640 C80,600 140,520 180,440 C220,360 260,300 380,260', 'huella', 'z6', 34)}
  ${K.lapacho(70, 230, .9, 15)}${K.ceibo(300, 220, .9, 35)}${K.lapacho(300, 470, .8, 16)}${K.ceibo(60, 520, .8, 36)}${K.lapacho(220, 700, .7, 17)}
  ${K.espinillo(150, 330, 1)}${K.espinillo(120, 620, .9)}${K.espinillo(330, 600, .8)}
  ${pj(170, 430)}
  ${hud('Monte, Corrientes', 11, 'manana', 'despejado')}${pie}`);

// Z7 Isla del estero (rincón cerrado)
const Z7 = marco('z7', `${fondoP('barro', 11, 'z7')}${K.canal(-10, 180, 380, 170, false, 52)}
  <path d="M-10,96 L370,96 L370,190 L-10,200Z" fill="#3f6e34" stroke="${O}" stroke-width="2"/>${[30, 90, 160, 230, 300].map((x, i) => `<circle cx="${x}" cy="${130 + (i % 2) * 20}" r="${22 + (i % 2) * 6}" fill="${['#2f5a2a', '#3f6e34'][i % 2]}" stroke="${O}" stroke-width="1.4"/>`).join('')}
  ${K.totora(20, 400, 7, 15)}${K.totora(280, 410, 6, 16)}${K.caranday(70, 560, .8)}
  ${canoaGris(180, 380)}
  ${pj(170, 460)}
  ${hud('Orilla del canal', 11, 'tarde', 'nublado')}${pie}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Una pantalla de juego por zona, dibujada con el kit aprobado.</div>
<section><h3>Mapa de Corrientes, zona por zona</h3><div class="tres">
${tel('Z1', 'Corrientes capital y costa', Z1, 'El Paraná ancho, arena y ceibos; terminal con su micro verde y posta, separadas, sobre la calle de adoquines. Domador Canoero Eusebio, Pirayú saltando en el río y Kapiyvá en la orilla.')}
${tel('Z2', 'Campo y lomadas', Z2, 'Huella colorada, alambrado con tranquera, carandays, tacurúes, espinillo y pajonal. Domador Acordeonista Ireneo; Ventero al pie de la palmera y Pajonero en el pajonal.')}
${tel('Z3', 'Mercedes', Z3, 'Plaza de adoquines con su lapacho; posta, almacén, curandera y feria correntinas. Doña Pocha en la plaza.')}
${tel('Z4', 'Colonia Pellegrini', Z4, 'A orillas de la laguna: galpón de Rosendo, seccional del Iberá con la guardaparque Sol y su fogón prendido, posta chica y el domador Guía Aníbal. Rayajá, junto a la palmera en tierra firme.')}
${tel('Z5', 'Esteros del Iberá', Z5, 'Esteros con camalotes, embalsado, totora e irupé. El rancho del pescador Ramón con su fogón prendido. Sueltos: Guasú en el embalsado, Mbarigüí en la totora y Kapiyvá en la orilla.')}
${tel('Z6', 'Monte', Z6, 'Lapachos en flor, ceibos y espinillos sobre tierra colorada. Acá sale Mburucoa, raro, a la mañana.')}
${tel('Z7', 'Orilla del canal (rincón)', Z7, 'El canal de agua honda con camalotes corta el paso a la isla; la canoa en gris hasta tenerla. Del otro lado, el monte de la isla.')}
</div></section>`;
const css2 = css + cssFogon + `.tres{display:grid;grid-template-columns:repeat(3,minmax(0,360px));gap:16px}@media (max-width:1100px){.tres{grid-template-columns:repeat(2,minmax(0,360px))}}@media (max-width:760px){.tres{grid-template-columns:1fr}}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-84}}.brilla{animation:brilla 3s ease-in-out infinite}@keyframes brilla{0%,100%{opacity:.3}50%{opacity:1}}`;
writeFileSync(new URL('./catalogo-53.html', import.meta.url), pagina('Catálogo para aprobar, lote 19c', 'Mapa de Corrientes', cuerpo, css2));
console.log('ok 53');
