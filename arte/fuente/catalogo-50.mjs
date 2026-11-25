// Catálogo para aprobar, lote 18c: el mapa de Salta dibujado con el kit, una pantalla por zona.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { O, tel, css } from './catalogo-29.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { almacen, curanderaCasa, feria } from './edificios.mjs';
import { ranchoMaestro, terminal, micro, puestoPuna } from './edificios2.mjs';
import { galponS, tinglado, postaSalta, conMicro } from './edificios-galpon.mjs';
import { arriero, puestero, copleraSalta } from './personas-salta.mjs';
import { rosa, maestra, acampante } from './personas-salta2.mjs';
import { kirkallpa, llamaru, mallku, escarchuna } from './catalogo-2.mjs';
import { pirkasol, miyura } from './catalogo-3.mjs';
import { fogon, cssFogon } from './marca-changa.mjs';
import * as K from './kit-salta.mjs';

const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);
const pj = (x, y) => `<g transform="translate(${x} ${y}) scale(.3)">${jugador()}</g>`;
const gente = (x, y, f, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -.3 : .3} .3)${flip ? ' translate(-120 0)' : ''}">${f()}</g>`;
const bicho = (x, y, f, s = .42, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})${flip ? ' translate(-200 0)' : ''}">${f()}</g>`;
const ed = (x, y, f, s = .7) => `<g transform="translate(${x} ${y}) scale(${s})">${f()}</g>`;
const pie = `${equipoMini}${mini}`;
const fondoP = (k, seed, id) => `<defs>${K.patron('f' + id, k, seed)}</defs><rect width="360" height="760" fill="url(#f${id})"/>`;
const camino = (d, k, id, w = 40) => `<defs>${K.patron('c' + id, k, 9)}</defs><path d="${d}" stroke="url(#c${id})" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;

// Z1 Cerrillos
const Z1 = marco('z1', `${fondoP('tierra', 4, 'z1')}<defs>${K.patron('emp1', 'empedrado', 2)}</defs><rect x="80" y="260" width="200" height="190" rx="18" fill="url(#emp1)" stroke="${O}" stroke-width="2"/>
  ${ed(8, 100, postaSalta, .5)}${ed(218, 104, almacen, .5)}
  ${K.algarrobo(160, 400, .65, 13)}
  ${ed(8, 500, ranchoMaestro, .5)}${ed(218, 504, curanderaCasa, .5)}
  ${gente(214, 330, rosa)}${gente(240, 330, maestra, true)}${pj(160, 450)}
  ${K.jarilla(40, 300, 1)}${K.jarilla(320, 290, .9)}${K.jarilla(178, 210, .8)}${K.jarilla(178, 620, .8)}
  ${hud('Cerrillos, Salta', 1, 'manana', 'despejado')}${pie}`);

// Z2 Valle de Lerma y Ruta 68
const Z2 = marco('z2', `${fondoP('pasto', 3, 'z2')}${camino('M-20,700 C80,620 120,520 180,460 C240,400 260,300 380,240', 'huella', 'z2')}
  ${K.rio('M380,560 C320,600 300,660 330,780', 30)}
  ${K.alambrado(10, 246, 300)}${K.tranquera(256, 300)}${K.alambrado(346, 380, 300)}
  ${ed(10, 112, puestoPuna, .55)}${fogon(172, 222, 1.1)}${gente(196, 166, puestero)}
  ${K.algarrobo(300, 190, .8, 14)}${K.pastoAlto(20, 520, 8, 6)}${K.pastoAlto(60, 560, 7, 7)}${K.jarilla(250, 640, 1.1)}${K.roca(110, 610, 1, 55)}
  ${gente(250, 380, arriero, true)}${pj(150, 470)}
  ${bicho(30, 360, kirkallpa, .36)}${bicho(26, 470, miyura, .34)}${bicho(260, 520, llamaru, .4, true)}
  ${hud('Ruta 68, Salta', 2, 'tarde', 'despejado')}${pie}`);

// Z3 Salta capital
const Z3 = marco('z3', `${fondoP('tierra', 6, 'z3')}<defs>${K.patron('emp3', 'empedrado', 3)}</defs><path d="M-10,320 L370,300 L370,370 L-10,390Z" fill="url(#emp3)" stroke="${O}" stroke-width="2"/>
  ${ed(8, 100, galponS, .5)}${ed(222, 104, tinglado, .48)}
  ${ed(4, 470, () => conMicro(terminal, micro), .46)}${ed(226, 474, postaSalta, .48)}
  ${K.jarilla(180, 220, .8)}${K.jarilla(200, 610, .8)}
  ${pj(170, 290)}
  ${hud('Salta capital', 3, 'manana', 'nublado')}${pie}`);

// Z4 Quebrada de las Conchas
const Z4 = marco('z4', `${fondoP('colorada', 6, 'z4')}${camino('M180,800 C170,640 200,520 180,400 C170,300 190,200 180,90', 'ripio', 'z4', 50)}
  ${K.paredQuebrada(-10, 90, 110, 300, 72)}${K.paredQuebrada(270, 100, 110, 320, 73)}
  ${K.cardon(80, 520, 1)}${K.cardon(300, 560, .9)}${K.roca(260, 470, 1.4, 56, false)}${K.roca(60, 620, 1.2, 57, false)}
  ${bicho(220, 410, pirkasol, .34)}<g class="planea">${bicho(60, 150, mallku, .5)}</g>
  <g transform="translate(40 410) scale(.55)">${''}</g>${gente(110, 430, acampante)}${pj(170, 520)}
  ${hud('Quebrada de las Conchas', 4, 'tarde', 'viento')}${pie}`);

// Z5 Puna
const nieveCerro = (x, y, w) => `<path d="M${x + w * .4},${y + 8} C${x + w * .45},${y} ${x + w * .55},${y} ${x + w * .6},${y + 8} C${x + w * .56},${y + 14} ${x + w * .44},${y + 14} ${x + w * .4},${y + 8}Z" fill="#fbfcfd"/>`;
const Z5 = marco('z5', `${fondoP('ripio', 8, 'z5')}<rect y="96" width="360" height="120" fill="#bcd4e8"/>${K.cerroFondo(-20, 120, 200, 100, '#a8865a')}${nieveCerro(-20, 120, 200)}${K.cerroFondo(140, 100, 240, 116, '#98785a')}${nieveCerro(140, 100, 240)}
  <defs>${K.patron('sal5', 'salar', 9)}</defs><path d="M150,520 C200,490 320,500 340,540 C350,580 260,610 190,600 C140,590 120,550 150,520Z" fill="url(#sal5)" stroke="${O}" stroke-width="2"/>
  ${camino('M-20,420 C100,400 200,380 380,350', 'tierra', 'z5', 34)}
  ${ed(20, 230, puestoPuna, .6)}
  ${K.pajaBrava(60, 460, 1.3)}${K.pajaBrava(110, 520, 1.1)}${K.pajaBrava(300, 450, 1.2)}${K.pajaBrava(40, 620, 1.2)}${K.cardon(250, 300, .8)}${K.roca(320, 640, 1, 58)}
  ${bicho(200, 420, escarchuna, .42, true)}${pj(160, 340)}
  ${hud('Puna, San Antonio', 5, 'manana', 'despejado')}${pie}`);

// Z6 Yungas y monte cerrado
const Z6 = marco('z6', `${fondoP('pasto', 10, 'z6')}<rect width="360" height="760" fill="#2f5a2a" opacity=".35"/>${camino('M-20,640 C80,600 140,520 180,440 C200,400 220,360 260,330', 'huella', 'z6', 34)}
  ${K.rio('M-20,300 C60,320 120,300 150,260 C170,230 200,200 260,190', 22)}
  ${K.cebil(60, 210, .9, 32)}${K.cebil(320, 280, 1, 33)}${K.sauce(190, 250, .9)}${K.cebil(40, 700, .9, 34)}
  ${K.helechos(110, 560, 1.1)}${K.helechos(300, 600, 1)}${K.helechos(240, 680, .9)}
  <defs>${K.patron('mz6', 'tierra', 11)}</defs>${K.maleza(230, 360, 130, false, 92)}
  <g transform="translate(300 300)"><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><g transform="rotate(-35)"><path d="M-2,-9 C2,-9 3,-3 2,4 L-2,4Z" fill="#9a958c" stroke="${O}" stroke-width="1"/><rect x="-2.2" y="4" width="4.4" height="6" rx="1.2" fill="#7a7468"/></g></g>
  ${pj(170, 430)}
  ${hud('Yungas, Salta', 6, 'tarde', 'nublado')}${pie}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Una pantalla de juego por zona, dibujada con el kit aprobado.</div>
<section><h3>Mapa de Salta, zona por zona</h3><div class="tres">
${tel('Z1', 'Cerrillos (inicio)', Z1, 'Posta y almacén arriba, rancho de Don Abel y curandera abajo, con la plaza y su algarrobo en el medio. Doña Rosa y la Maestra Inés en la plaza.')}
${tel('Z2', 'Valle de Lerma y Ruta 68', Z2, 'Huella de tierra, alambrado con tranquera, el puesto de Cirilo con el fogón prendido (tiene changa), el domador Benito en el camino, pasto alto, río y bichos sueltos: Kirkallpa, Miyurá y Llamarú.')}
${tel('Z3', 'Salta capital', Z3, 'Galpón de Anselmo y tinglado de la Rural arriba; abajo la terminal con su micro bordó y la posta. La calle empedrada en el medio.')}
${tel('Z4', 'Quebrada de las Conchas', Z4, 'Ripio entre paredes coloradas, cardones y rocas. La domadora Martina, Pirkasol sobre las piedras y Mallku planeando.')}
${tel('Z5', 'Puna y San Antonio', Z5, 'Cerros con nieve en la punta, salar, paja brava, cardón y el puesto que hace de posta chica. Escarchuña suelta.')}
${tel('Z6', 'Yungas y monte cerrado', Z6, 'Cebiles, sauce, helechos y río. La maleza cerrada corta el paso al rincón; el machete en gris hasta tenerlo.')}
</div></section>`;
const css2 = css + cssFogon + `.tres{display:grid;grid-template-columns:repeat(3,minmax(0,360px));gap:16px}@media (max-width:1100px){.tres{grid-template-columns:repeat(2,minmax(0,360px))}}@media (max-width:760px){.tres{grid-template-columns:1fr}}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-72}}.planea{animation:planea 8s ease-in-out infinite alternate}@keyframes planea{to{transform:translate(160px,30px)}}`;
writeFileSync(new URL('./catalogo-50.html', import.meta.url), pagina('Catálogo para aprobar, lote 18c', 'Mapa de Salta', cuerpo, css2));
console.log('ok 50');
