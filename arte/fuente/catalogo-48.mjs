// Catálogo para aprobar, lote 18a: kit de terreno de Salta.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import { jugador } from './adultos.mjs';
import * as K from './kit-salta.mjs';

const pieza = (cod, nom, vb, dib, txt, ancho = '') => `<figure class="pz ${ancho}"><span class="cod">${cod}</span><div class="lz">${svg(vb, dib)}</div><figcaption><b>${nom}</b>${txt ? `<p>${txt}</p>` : ''}</figcaption></figure>`;
const SUE = [['tierra', 'Tierra del valle', 'Valle de Lerma y pueblos.'], ['pasto', 'Pasto bajo', 'Se camina; salen bichos sueltos.'], ['ripio', 'Ripio', 'Rutas y Puna.'], ['colorada', 'Tierra colorada', 'Quebrada de las Conchas y Valles.'], ['salar', 'Salar', 'Puna: costra blanca en losas.'], ['barro', 'Barro', 'Orillas de río y laguna.'], ['empedrado', 'Empedrado', 'Plazas y calles de pueblo.'], ['huella', 'Huella de tierra', 'Caminos rurales con dos surcos.']];
const suelos = SUE.map(([k, n, t], i) => pieza(`S${i + 1}`, n, '0 0 96 96', `<defs>${K.patron('p' + k, k, 7 + i)}</defs><rect width="96" height="96" fill="url(#p${k})"/>`, t)).join('');
const pastoAltoP = pieza('S9', 'Pasto alto', '0 0 120 60', `<rect width="120" height="60" fill="#a8b86a"/>${K.pastoAlto(10, 50, 7, 3)}${K.pastoAlto(60, 54, 8, 4)}`, 'Te esconde de los bichos tímidos. Se mece.');
const agua = pieza('A1', 'Río, vado, puente y lagunas', '0 0 360 170', `<defs>${K.patron('pa1', 'pasto', 3)}</defs><rect width="360" height="170" fill="url(#pa1)"/>
  ${K.rio('M-10,40 C60,30 110,70 170,80 C230,90 300,60 370,70', 34)}${K.puente(120, 52, 46)}${K.piedrasVado(232, 80)}
  ${K.laguna(70, 128, 52, 26, 5)}${K.juncos(108, 140, 5, 9)}${K.juncos(20, 120, 4, 10)}${K.laguna(270, 132, 64, 28, 6, true)}`, 'Río con corriente, vado de piedras, puente de tablas; laguna con juncos y dique (agua profunda, más oscura, no se cruza).', 'ancho');
const VEG = [['V1', 'Algarrobo', '0 0 150 150', K.algarrobo(70, 140, 1, 11), 'Valle y pueblos.'], ['V2', 'Cardón', '0 0 120 150', K.cardon(60, 140, 1.4), 'Quebrada, Valles y Puna.'], ['V3', 'Jarilla', '0 0 100 80', K.jarilla(50, 70, 1.4), 'Arbusto del monte seco.'], ['V4', 'Cebil de las yungas', '0 0 150 170', K.cebil(75, 160, 1.15), 'Monte húmedo del este.'], ['V5', 'Helechos', '0 0 100 80', K.helechos(50, 70, 1.3), 'Sotobosque de yungas.'], ['V6', 'Paja brava', '0 0 100 80', K.pajaBrava(50, 70, 1.6), 'Puna.'], ['V7', 'Sauce criollo', '0 0 140 150', K.sauce(70, 140, 1.4), 'Orillas de río.']];
const veg = VEG.map(([c, n, vb, d, t]) => pieza(c, n, vb, d, t)).join('');
const relieve = [
  pieza('R1', 'Rocas', '0 0 150 80', `${K.roca(40, 66, 1.3, 51)}${K.roca(100, 70, 1.8, 52, false)}`, 'Chica con musgo y grande.'),
  pieza('R3', 'Pared de quebrada', '0 0 220 150', K.paredQuebrada(10, 10, 200, 130, 71), 'Borde del mapa en la Quebrada: estratos colorados.'),
  pieza('R4', 'Cerros de fondo', '0 0 220 110', `${K.cerroFondo(0, 20, 130, 86, '#b89a6a')}${K.cerroFondo(80, 6, 140, 100, '#a8865a')}`, 'Borde del mapa en el valle; no se caminan.'),
].join('');
const cercos = [
  pieza('C1', 'Alambrado', '0 0 200 60', K.alambrado(10, 190, 50), 'Corta el paso; se pasa por la tranquera.'),
  pieza('C2', 'Pirca', '0 0 200 60', K.pirca(10, 54, 180, 30, 81), 'Muro de piedra seca.'),
  pieza('C3', 'Tranquera', '0 0 120 70', K.tranquera(20, 60), 'Se abre tocándola.'),
].join('');
const rincon = [
  pieza('M1', 'Maleza cerrada', '0 0 220 90', K.maleza(10, 80, 200, false, 91), 'Monte cerrado con espinas y lianas. Sin machete no se pasa.'),
  pieza('M2', 'Maleza abierta', '0 0 220 90', `<defs>${K.patron('pm2', 'tierra', 5)}</defs><rect width="220" height="90" fill="url(#pm2)"/>${K.maleza(10, 80, 200, true, 91)}`, 'Con el machete quedan los troncos cortados y se abre el sendero.'),
].join('');

// ---------- escena de muestra en 6 variantes ----------
const escena = (id, nieva = false) => `<defs>${K.patron('e1' + id, 'pasto', 3)}${K.patron('e2' + id, 'huella', 5)}</defs><rect width="360" height="240" fill="url(#e1${id})"/>
  ${nieva ? `<rect width="360" height="240" fill="#f2f5f8" opacity=".72"/>${[[50, 120, 70, 20], [200, 60, 90, 22], [120, 220, 80, 18], [320, 200, 60, 16]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fbfcfd"/>`).join('')}` : ''}
  <path d="M-10,240 C60,200 120,170 200,160 C260,152 320,120 380,110" stroke="url(#e2${id})" stroke-width="38" fill="none" opacity="${nieva ? .55 : 1}"/>
  ${K.rio('M240,-10 C250,40 300,70 300,110 C300,150 330,190 380,210', 26)}${K.puente(280, 118, 46, 20)}
  ${K.roca(40, 84, .9, 54)}${K.alambrado(150, 230, 90)}
  ${K.pastoAlto(30, 196, 7, 5)}${K.jarilla(150, 220, 1.1, 22)}${K.roca(214, 200, 1.1, 53)}
  ${K.cardon(110, 150, .9)}${K.algarrobo(60, 66, .8, 12)}
  ${nieva ? `<g fill="#fbfcfd" stroke="#c8d0d8" stroke-width="1">${[[110, 83, 8, 3.2], [93, 104, 5, 2.4], [127, 110, 5, 2.4], [212, 182, 11, 3.6], [60, 30, 40, 10]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}<ellipse cx="40" cy="70" rx="9" ry="3"/>${[150, 182, 214].map((x) => `<ellipse cx="${x}" cy="62" rx="4.4" ry="2"/>`).join('')}</g>` : ''}
  <g transform="translate(176 120) scale(.26)">${jugador()}</g>`;
const VAR = [
  ['D1', 'Día', ''],
  ['D2', 'Tarde', '<rect width="360" height="240" fill="#f0a050" opacity=".2"/>'],
  ['D3', 'Noche', `<rect width="360" height="240" fill="#14203c" opacity=".58"/>${Array.from({ length: 9 }, (_, i) => `<circle class="luci" style="animation-delay:${(i * .4).toFixed(1)}s" cx="${(i * 41) % 340 + 10}" cy="${(i * 67) % 200 + 20}" r="2.2" fill="#e8f07a"/>`).join('')}`],
  ['D4', 'Nublado', `<rect width="360" height="240" fill="#7a8290" opacity=".22"/><g class="nube"><ellipse cx="60" cy="80" rx="90" ry="34" fill="#2a3040" opacity=".12"/><ellipse cx="260" cy="170" rx="80" ry="30" fill="#2a3040" opacity=".12"/></g>`],
  ['D5', 'Lluvia', `<rect width="360" height="240" fill="#4a5a6c" opacity=".3"/>${[[40, 220], [190, 210], [320, 190]].map(([x, y]) => `<ellipse class="gota" cx="${x}" cy="${y}" rx="10" ry="3" fill="none" stroke="#cfe6f0" stroke-width="1.2"/>`).join('')}<g class="llueve">${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 37) % 360},${(i * 53) % 240} l0,10" stroke="#cfe0ea" stroke-width="1.2" opacity=".6"/>`).join('')}</g>`],
  ['D6', 'Nieve (Puna y cumbres)', `<rect width="360" height="240" fill="#e8eef4" opacity=".12"/><g class="nieva">${Array.from({ length: 34 }, (_, i) => `<circle cx="${(i * 41) % 360}" cy="${(i * 59) % 240}" r="${1.4 + (i % 3) * .6}" fill="#fff"/>`).join('')}</g>`],
];
const variantes = VAR.map(([c, n, capa], i) => pieza(c, n, '0 0 360 240', `<defs><clipPath id="cv${i}"><rect width="360" height="240"/></clipPath></defs><g clip-path="url(#cv${i})">${escena(i, c === 'D6')}${capa}</g>`, '', 'media')).join('');

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Las piezas se mueven en la página.</div>
<section><h3>Suelos</h3><p class="nota">Se repiten sin costura. Cada uno marca dónde estás: valle, quebrada, Puna, pueblo, orilla.</p><div class="grilla">${suelos}${pastoAltoP}</div></section>
<section><h3>Agua</h3><div class="grilla">${agua}</div></section>
<section><h3>Vegetación salteña</h3><div class="grilla">${veg}</div></section>
<section><h3>Relieve</h3><div class="grilla">${relieve}</div></section>
<section><h3>Cercos</h3><p class="nota">Los caminos usan los suelos de ripio y huella.</p><div class="grilla">${cercos}</div></section>
<section><h3>Rincón del monte</h3><div class="grilla">${rincon}</div></section>
<section><h3>La misma escena según el momento y el clima</h3><p class="nota">Una sola capa por encima: la tarde entibia, la noche oscurece y aparecen luciérnagas, el nublado pasa sombras de nubes, la lluvia cae vertical con charcos, la nieve (solo Puna y cumbres) cubre el suelo y las copas.</p><div class="grilla dos">${variantes}</div></section>`;
const css2 = css + `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.grilla.dos{grid-template-columns:repeat(auto-fill,minmax(320px,1fr))}.pz{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;position:relative}.pz.ancho{grid-column:span 2}.pz .lz{background:#efe6d4;border-radius:10px;padding:6px;overflow:hidden}.pz svg{width:100%;height:auto;display:block}.pz figcaption p{font-size:12.5px;margin:4px 0 0}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}
.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}
.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-72}}
.brilla{animation:brilla 3s ease-in-out infinite}@keyframes brilla{0%,100%{opacity:.3}50%{opacity:1}}
.luci{animation:luci 2.4s ease-in-out infinite}@keyframes luci{0%,100%{opacity:.1}50%{opacity:1}}
.nube{animation:nube 18s linear infinite}@keyframes nube{from{transform:translateX(-80px)}to{transform:translateX(120px)}}
.llueve{animation:llueve .6s linear infinite}@keyframes llueve{from{transform:translateY(-24px)}to{transform:translateY(0)}}
.gota{animation:gota 1.4s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes gota{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}
.nieva{animation:nieva 6s linear infinite}@keyframes nieva{from{transform:translate(0,-60px)}to{transform:translate(12px,0)}}`;
writeFileSync(new URL('./catalogo-48.html', import.meta.url), pagina('Catálogo para aprobar, lote 18a', 'Kit de terreno de Salta', cuerpo, css2));
console.log('ok 48');
