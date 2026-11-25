// Catálogo para aprobar, lote 20a: kit de terreno de Jujuy.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import { jugador } from './adultos.mjs';
import * as K from './kit-jujuy.mjs';

const pieza = (cod, nom, vb, dib, txt, ancho = '') => `<figure class="pz ${ancho}"><span class="cod">${cod}</span><div class="lz">${svg(vb, dib)}</div><figcaption><b>${nom}</b>${txt ? `<p>${txt}</p>` : ''}</figcaption></figure>`;
const SUE = [['ripio', 'Ripio puneño', 'Puna y caminos altos.'], ['ocre', 'Tierra de quebrada', 'Quebrada de Humahuaca.'], ['colores', 'Tierra de colores', 'Laderas de Purmamarca.'], ['salar', 'Salar', 'Salinas Grandes.'], ['vega', 'Vega', 'Pasto húmedo de altura con ojos de agua.'], ['nevado', 'Suelo nevado', 'Cumbres.'], ['hojarasca', 'Hojarasca', 'Yungas de Calilegua.'], ['tierraPueblo', 'Tierra de pueblo', 'Calles de Purmamarca.']];
const suelos = SUE.map(([k, n, t], i) => pieza(`S${i + 1}`, n, '0 0 96 96', `<defs>${K.patron('p' + k, k, 7 + i)}</defs><rect width="96" height="96" fill="url(#p${k})"/>`, t)).join('');
const agua = pieza('A1', 'Río de quebrada, laguna de altura, ojos de agua', '0 0 360 190', `<defs>${K.patron('pa1', 'ripio', 3)}${K.patron('pa2', 'vega', 4)}</defs><rect width="360" height="190" fill="url(#pa1)"/><path d="M0,120 C80,110 160,130 200,190 L0,190Z" fill="url(#pa2)"/>
  ${K.rioQuebrada('M-20,40 C80,60 160,30 240,50 C300,66 340,40 380,50', 56, 5)}${K.puente(150, 30, 52, 20)}
  ${K.ojoDeAgua(40, 150, 1)}${K.ojoDeAgua(110, 170, .8)}${K.lagunaAltura(280, 140, 64, 30, 6)}`, 'Río ancho de piedras con hilos de agua y puente; vega con ojos de agua; laguna de altura con borde de sal.', 'ancho');
const VEG = [['V1', 'Cardón', '0 0 120 150', K.cardon(60, 140, 1.4), 'Quebrada y Puna.'], ['V2', 'Queñoa', '0 0 130 110', K.queñoa(65, 102, 1.3, 13), 'Árbol de altura, corteza roja.'], ['V3', 'Tola', '0 0 100 70', K.tola(50, 62, 1.4), 'Arbusto de la Puna.'], ['V4', 'Yareta', '0 0 120 60', K.yareta(60, 52, 1.6), 'Almohadón verde de las cumbres.'], ['V5', 'Paja brava', '0 0 100 80', K.pajaBrava(50, 70, 1.6), 'Puna.'], ['V6', 'Yungas', '0 0 150 170', K.cebil(75, 160, 1.15, 37), 'Monte húmedo de Calilegua.']];
const veg = VEG.map(([c, n, vb, d, t]) => pieza(c, n, vb, d, t)).join('');
const relieve = [pieza('R1', 'Cerro de siete colores', '0 0 240 140', K.cerroColores(10, 20, 220, 110), 'Borde del mapa en la Quebrada.'), pieza('R2', 'Nevados de fondo', '0 0 240 110', K.nevados(10, 10, 220, 96), 'Borde del mapa en la Puna y las cumbres.'), pieza('R3', 'Rocas', '0 0 150 80', `${K.roca(40, 66, 1.3, 61)}${K.roca(100, 70, 1.8, 62, false)}`, '')].join('');
const cercos = [pieza('C1', 'Pirca', '0 0 200 60', K.pirca(10, 54, 180, 30, 84), ''), pieza('C2', 'Corral de pirca', '0 0 200 110', K.corralPirca(20, 20, 160, 70), 'Corrales de llamas.'), pieza('C3', 'Tranquera', '0 0 120 70', K.tranquera(20, 60), '')].join('');
const rincon = [pieza('M1', 'Risco', '0 0 200 160', `<defs>${K.patron('pm1', 'ripio', 5)}</defs><rect width="200" height="160" fill="url(#pm1)"/>${K.risco(30, 10, 140, 130, false, 93)}`, 'Pared de roca: sin soga no se sube.'), pieza('M2', 'Con la soga', '0 0 200 160', `<defs>${K.patron('pm2', 'ripio', 5)}</defs><rect width="200" height="160" fill="url(#pm2)"/>${K.risco(30, 10, 140, 130, true, 93)}`, 'Con la soga queda atada arriba y se trepa a las cumbres.')].join('');

const escena = (id, nieva = false) => `<defs>${K.patron('e1' + id, 'ocre', 3)}${K.patron('e2' + id, 'ripio', 5)}</defs><rect width="360" height="240" fill="url(#e1${id})"/>${nieva ? '<rect width="360" height="240" fill="#f2f5f8" opacity=".72"/>' : ''}
  ${K.cerroColores(150, 4, 230, 90)}
  <path d="M-10,240 C60,200 120,170 200,160 C260,152 320,150 380,150" stroke="url(#e2${id})" stroke-width="38" fill="none" opacity="${nieva ? .6 : 1}"/>
  ${K.rioQuebrada('M-20,60 C60,80 100,110 120,140 C140,170 130,210 140,250', 40, 7)}${K.puente(108, 160, 46, 20)}
  ${K.corralPirca(250, 190, 90, 40)}${K.tola(220, 140, 1)}${K.pajaBrava(40, 210, 1.1)}
  ${K.cardon(70, 130, .8)}${K.queñoa(300, 130, .8, 14)}
  ${nieva ? `<g fill="#fbfcfd" stroke="#c8d0d8" stroke-width="1"><path d="M215,22 C235,4 270,0 292,20 C270,16 240,18 215,22Z"/><ellipse cx="70" cy="62" rx="8" ry="3"/><ellipse cx="300" cy="76" rx="24" ry="6"/><ellipse cx="220" cy="130" rx="15" ry="4"/></g>` : ''}
  <g transform="translate(176 112) scale(.26)">${jugador()}</g>`;
const VAR = [
  ['D1', 'Día', ''],
  ['D2', 'Tarde', '<rect width="360" height="240" fill="#f0a050" opacity=".2"/>'],
  ['D3', 'Noche', `<rect width="360" height="240" fill="#14203c" opacity=".58"/>${Array.from({ length: 12 }, (_, i) => `<circle class="luci" style="animation-delay:${(i * .4).toFixed(1)}s" cx="${(i * 41) % 340 + 10}" cy="${(i * 67) % 200 + 20}" r="2.2" fill="#e8f07a"/>`).join('')}`],
  ['D4', 'Nublado', `<rect width="360" height="240" fill="#7a8290" opacity=".22"/><g class="nube"><ellipse cx="60" cy="80" rx="90" ry="34" fill="#2a3040" opacity=".12"/><ellipse cx="260" cy="170" rx="80" ry="30" fill="#2a3040" opacity=".12"/></g>`],
  ['D5', 'Lluvia', `<rect width="360" height="240" fill="#4a5a6c" opacity=".3"/>${[[40, 220], [190, 210], [300, 190]].map(([x, y]) => `<ellipse class="gota" cx="${x}" cy="${y}" rx="10" ry="3" fill="none" stroke="#cfe6f0" stroke-width="1.2"/>`).join('')}<g class="llueve">${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 37) % 360},${(i * 53) % 240} l0,10" stroke="#cfe0ea" stroke-width="1.2" opacity=".6"/>`).join('')}</g>`],
  ['D6', 'Nieve (cumbres y Puna)', `<rect width="360" height="240" fill="#e8eef4" opacity=".12"/><g class="nieva">${Array.from({ length: 34 }, (_, i) => `<circle cx="${(i * 41) % 360}" cy="${(i * 59) % 240}" r="${1.4 + (i % 3) * .6}" fill="#fff"/>`).join('')}</g>`],
];
const variantes = VAR.map(([c, n, capa], i) => pieza(c, n, '0 0 360 240', `<defs><clipPath id="cv${i}"><rect width="360" height="240"/></clipPath></defs><g clip-path="url(#cv${i})">${escena(i, c === 'D6')}${capa}</g>`, '', 'media')).join('');

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Mismo estilo que los kits de Salta y Corrientes.</div>
<section><h3>Suelos</h3><div class="grilla">${suelos}</div></section>
<section><h3>Agua</h3><div class="grilla">${agua}</div></section>
<section><h3>Vegetación jujeña</h3><div class="grilla">${veg}</div></section>
<section><h3>Relieve</h3><div class="grilla">${relieve}</div></section>
<section><h3>Cercos</h3><p class="nota">En Jujuy casi no hay alambrado: pirca y corrales de piedra.</p><div class="grilla">${cercos}</div></section>
<section><h3>Rincón de las cumbres</h3><div class="grilla">${rincon}</div></section>
<section><h3>La misma escena según el momento y el clima</h3><p class="nota">Seis variantes: en Jujuy la nieve es común en la Puna y las cumbres.</p><div class="grilla dos">${variantes}</div></section>`;
const css2 = css + `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.grilla.dos{grid-template-columns:repeat(auto-fill,minmax(320px,1fr))}.pz{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;position:relative}.pz.ancho{grid-column:span 2}.pz .lz{background:#efe6d4;border-radius:10px;padding:6px;overflow:hidden}.pz svg{width:100%;height:auto;display:block}.pz figcaption p{font-size:12.5px;margin:4px 0 0}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-84}}.brilla{animation:brilla 3s ease-in-out infinite}@keyframes brilla{0%,100%{opacity:.3}50%{opacity:1}}.luci{animation:luci 2.4s ease-in-out infinite}@keyframes luci{0%,100%{opacity:.1}50%{opacity:1}}.nube{animation:nube 18s linear infinite}@keyframes nube{from{transform:translateX(-80px)}to{transform:translateX(120px)}}.llueve{animation:llueve .6s linear infinite}@keyframes llueve{from{transform:translateY(-24px)}to{transform:translateY(0)}}.nieva{animation:nieva 6s linear infinite}@keyframes nieva{from{transform:translate(0,-60px)}to{transform:translate(12px,0)}}.gota{animation:gota 1.4s ease-out infinite;transform-box:fill-box;transform-origin:center}@keyframes gota{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}`;
writeFileSync(new URL('./catalogo-54.html', import.meta.url), pagina('Catálogo para aprobar, lote 20a', 'Kit de terreno de Jujuy', cuerpo, css2));
console.log('ok 54');
