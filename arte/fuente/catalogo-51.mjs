// Catálogo para aprobar, lote 19a: kit de terreno de Corrientes.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import { jugador } from './adultos.mjs';
import * as K from './kit-corrientes.mjs';

const pieza = (cod, nom, vb, dib, txt, ancho = '') => `<figure class="pz ${ancho}"><span class="cod">${cod}</span><div class="lz">${svg(vb, dib)}</div><figcaption><b>${nom}</b>${txt ? `<p>${txt}</p>` : ''}</figcaption></figure>`;
const SUE = [['colorada', 'Tierra colorada', 'El suelo rojo de Corrientes.'], ['pasto', 'Pasto verde', 'Campos y lomadas.'], ['arena', 'Arena', 'Bancos y playas del Paraná.'], ['barro', 'Barro de estero', 'Orillas del Iberá.'], ['embalsado', 'Embalsado', 'Isla flotante de plantas: se camina con cuidado.'], ['adoquin', 'Adoquines', 'Calles de pueblo.'], ['huella', 'Huella colorada', 'Caminos rurales.']];
const suelos = SUE.map(([k, n, t], i) => pieza(`S${i + 1}`, n, '0 0 96 96', `<defs>${K.patron('p' + k, k, 7 + i)}</defs><rect width="96" height="96" fill="url(#p${k})"/>`, t)).join('') + pieza('S8', 'Pajonal', '0 0 120 70', `<rect width="120" height="70" fill="#8fb85a"/>${K.pajonal(6, 62, 8, 3)}${K.pajonal(60, 66, 9, 4)}`, 'Paja alta dorada: te esconde de los bichos tímidos.');
const agua = pieza('A1', 'Paraná, estero, lagunas', '0 0 360 190', `<defs>${K.patron('pa1', 'pasto', 3)}${K.patron('pa2', 'arena', 4)}</defs><rect width="360" height="190" fill="url(#pa1)"/><path d="M0,0 L360,0 L360,60 C240,70 120,50 0,64Z" fill="url(#pa2)"/>
  ${K.rioParana('M-20,22 C100,14 260,30 380,18', 46)}
  ${K.estero(90, 130, 74, 40, 5)}${K.totora(150, 150, 6, 9)}${K.laguna(270, 130, 60, 30, 6)}${K.irupe(260, 132, .9)}${K.juncos(316, 150, 5, 10)}`, 'Río Paraná ancho y color café con leche; estero con camalotes en flor y totora; laguna con irupé.', 'ancho');
const VEG = [['V1', 'Palmera caranday', '0 -16 140 176', K.caranday(70, 150, 1.25), 'Campos y esteros.'], ['V2', 'Lapacho', '0 0 150 140', K.lapacho(75, 130, 1, 12), 'Florece rosado.'], ['V3', 'Ceibo', '0 0 130 120', K.ceibo(65, 112, 1.1, 32), 'Orillas, flor roja.'], ['V4', 'Espinillo', '0 0 100 80', K.espinillo(50, 72, 1.3), 'Bolitas amarillas.'], ['V5', 'Totora', '0 0 100 80', K.totora(30, 74, 8, 41), 'Bordes del estero.'], ['V6', 'Camalotes e irupé', '0 0 120 80', `<rect width="120" height="80" fill="#5a9aa8"/>${K.camalote(30, 30, 1.4, true)}${K.camalote(64, 50, 1.2)}${K.irupe(84, 26, .9)}`, 'Flotan en el agua.']];
const veg = VEG.map(([c, n, vb, d, t]) => pieza(c, n, vb, d, t)).join('');
const relieve = [pieza('R1', 'Tacurú', '0 0 120 70', `${K.tacuru(40, 62, 1.3)}${K.tacuru(90, 64, .9)}`, 'Hormiguero de tierra colorada: el obstáculo típico del campo correntino.'), pieza('R2', 'Lomada', '0 0 200 70', K.lomada(10, 62, 180, 40), 'Correntino es llano: los bordes del mapa son lomadas suaves y monte.')].join('');
const cercos = [pieza('C1', 'Alambrado', '0 0 200 60', K.alambrado(10, 190, 50), ''), pieza('C2', 'Cerco de tacuara', '0 0 200 60', K.cercoTacuara(10, 54, 180), 'Cañas atadas: patios y chacras.'), pieza('C3', 'Tranquera', '0 0 120 70', K.tranquera(20, 60), '')].join('');
const rincon = [pieza('M1', 'Canal cerrado', '0 0 240 110', `<defs>${K.patron('pm1', 'barro', 5)}</defs><rect width="240" height="110" fill="url(#pm1)"/>${K.canal(40, 20, 190, 70, false, 51)}`, 'Agua honda con camalotes: sin canoa no se cruza.'), pieza('M2', 'Con la canoa', '0 0 240 110', `<defs>${K.patron('pm2', 'barro', 5)}</defs><rect width="240" height="110" fill="url(#pm2)"/>${K.canal(40, 20, 190, 70, true, 51)}`, 'Con la canoa aparece el muelle y se cruza a la isla.')].join('');

const escena = (id) => `<defs>${K.patron('e1' + id, 'pasto', 3)}${K.patron('e2' + id, 'huella', 5)}</defs><rect width="360" height="240" fill="url(#e1${id})"/>
  <path d="M-10,240 C60,200 120,170 200,160 C260,152 320,120 380,110" stroke="url(#e2${id})" stroke-width="38" fill="none"/>
  ${K.estero(290, 190, 70, 38, 7)}${K.totora(240, 214, 5, 12)}
  ${K.alambrado(10, 120, 90)}${K.tacuru(150, 110, .9)}
  ${K.pajonal(20, 214, 8, 5)}${K.espinillo(140, 226, 1)}
  ${K.caranday(110, 236, .8)}${K.lapacho(300, 80, .7, 13)}
  <g transform="translate(176 120) scale(.26)">${jugador()}</g>`;
const VAR = [
  ['D1', 'Día', ''],
  ['D2', 'Tarde', '<rect width="360" height="240" fill="#f0a050" opacity=".2"/>'],
  ['D3', 'Noche', `<rect width="360" height="240" fill="#14203c" opacity=".58"/>${Array.from({ length: 12 }, (_, i) => `<circle class="luci" style="animation-delay:${(i * .4).toFixed(1)}s" cx="${(i * 41) % 340 + 10}" cy="${(i * 67) % 200 + 20}" r="2.2" fill="#e8f07a"/>`).join('')}`],
  ['D4', 'Nublado', `<rect width="360" height="240" fill="#7a8290" opacity=".22"/><g class="nube"><ellipse cx="60" cy="80" rx="90" ry="34" fill="#2a3040" opacity=".12"/><ellipse cx="260" cy="170" rx="80" ry="30" fill="#2a3040" opacity=".12"/></g>`],
  ['D5', 'Lluvia', `<rect width="360" height="240" fill="#4a5a6c" opacity=".3"/>${[[40, 220], [190, 210], [300, 190]].map(([x, y]) => `<ellipse class="gota" cx="${x}" cy="${y}" rx="10" ry="3" fill="none" stroke="#cfe6f0" stroke-width="1.2"/>`).join('')}<g class="llueve">${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 37) % 360},${(i * 53) % 240} l0,10" stroke="#cfe0ea" stroke-width="1.2" opacity=".6"/>`).join('')}</g>`],
];
const variantes = VAR.map(([c, n, capa], i) => pieza(c, n, '0 0 360 240', `<defs><clipPath id="cv${i}"><rect width="360" height="240"/></clipPath></defs><g clip-path="url(#cv${i})">${escena(i)}${capa}</g>`, '', 'media')).join('');

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Mismo estilo que el kit de Salta; no lleva barrancas ni bichos posados sobre nada.</div>
<section><h3>Suelos</h3><div class="grilla">${suelos}</div></section>
<section><h3>Agua</h3><div class="grilla">${agua}</div></section>
<section><h3>Vegetación correntina</h3><div class="grilla">${veg}</div></section>
<section><h3>Relieve</h3><div class="grilla">${relieve}</div></section>
<section><h3>Cercos</h3><p class="nota">Alambrado y tranquera son los mismos de Salta.</p><div class="grilla">${cercos}</div></section>
<section><h3>Rincón de la isla</h3><div class="grilla">${rincon}</div></section>
<section><h3>La misma escena según el momento y el clima</h3><p class="nota">En Corrientes no nieva: son cinco variantes. De noche hay más luciérnagas que en Salta.</p><div class="grilla dos">${variantes}</div></section>`;
const css2 = css + `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.grilla.dos{grid-template-columns:repeat(auto-fill,minmax(320px,1fr))}.pz{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;position:relative}.pz.ancho{grid-column:span 2}.pz .lz{background:#efe6d4;border-radius:10px;padding:6px;overflow:hidden}.pz svg{width:100%;height:auto;display:block}.pz figcaption p{font-size:12.5px;margin:4px 0 0}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-84}}.brilla{animation:brilla 3s ease-in-out infinite}@keyframes brilla{0%,100%{opacity:.3}50%{opacity:1}}.luci{animation:luci 2.4s ease-in-out infinite}@keyframes luci{0%,100%{opacity:.1}50%{opacity:1}}.nube{animation:nube 18s linear infinite}@keyframes nube{from{transform:translateX(-80px)}to{transform:translateX(120px)}}.llueve{animation:llueve .6s linear infinite}@keyframes llueve{from{transform:translateY(-24px)}to{transform:translateY(0)}}.gota{animation:gota 1.4s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes gota{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}`;
writeFileSync(new URL('./catalogo-51.html', import.meta.url), pagina('Catálogo para aprobar, lote 19a', 'Kit de terreno de Corrientes', cuerpo, css2));
console.log('ok 51');
