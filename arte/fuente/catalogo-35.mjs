// Catálogo para aprobar, lote 14g: HUD con día, momento, clima y lugar; dormir en la carpa.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { carpa } from './edificios2.mjs';
import { O, T, moneda, tel, css } from './catalogo-29.mjs';

// íconos de momento (caja 0 a 20)
const MOM = {
  manana: `<path d="M1,15 L19,15" stroke="#7a4a2a" stroke-width="1.6"/><path d="M4,15 A6,6 0 0 1 16,15Z" fill="#f2c23a" stroke="${O}" stroke-width="1.4"/>${[-60, -30, 0, 30, 60].map((a) => `<path d="M10,6 L10,3" stroke="#e8a21a" stroke-width="1.6" stroke-linecap="round" transform="rotate(${a} 10 15)"/>`).join('')}`,
  tarde: `<circle cx="10" cy="10" r="5" fill="#f28a2a" stroke="${O}" stroke-width="1.4"/>${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M10,3 L10,1" stroke="#e86a1a" stroke-width="1.6" stroke-linecap="round" transform="rotate(${a} 10 10)"/>`).join('')}`,
  noche: `<path d="M13,3 C7,4 4,9 6,14 C8,18 13,19 17,16 C11,16 8,10 13,3Z" fill="#f4ead2" stroke="${O}" stroke-width="1.4"/><circle cx="16" cy="6" r="1.4" fill="#f4ead2"/>`,
};
const NOMMOM = { manana: 'mañana', tarde: 'tarde', noche: 'noche' };
const CLI = {
  despejado: '',
  nublado: `<path d="M4,15 C1,15 1,10 5,10 C5,6 11,5 13,9 C17,8 19,12 17,15Z" fill="#e2e6e8" stroke="${O}" stroke-width="1.4"/>`,
  lluvia: `<path d="M4,12 C1,12 1,7 5,7 C5,3 11,2 13,6 C17,5 19,9 17,12Z" fill="#b8c2c8" stroke="${O}" stroke-width="1.4"/><path d="M6,15 L5,18 M10,15 L9,18 M14,15 L13,18" stroke="#3b7fb8" stroke-width="1.6" stroke-linecap="round"/>`,
  viento: `<path d="M2,6 C8,3 12,9 18,6 M2,11 C8,8 12,14 18,11 M2,16 C8,13 12,19 18,16" stroke="#5a6a7a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
  nieve: `<path d="M4,12 C1,12 1,7 5,7 C5,3 11,2 13,6 C17,5 19,9 17,12Z" fill="#e2e6e8" stroke="${O}" stroke-width="1.4"/>${[[6, 16], [10, 18], [14, 16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#fff" stroke="#8aa4b8" stroke-width=".8"/>`).join('')}`,
};
const cap = (x, y, w, fill, cont) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="26" rx="13" fill="${fill}" stroke="${O}" stroke-width="2"/><rect x="3" y="3" width="${w - 6}" height="6" rx="3" fill="#fff" opacity=".18"/>${cont}</g>`;
export const hud = (lugar, dia, mom, cli) => `${cap(8, 10, 60, '#b8382a', `<g transform="translate(10 8)"><path d="M0,1 L12,1 M0,5 L12,5 M0,9 L12,9" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>${T(38, 18, 11.5, 'Menú', { w: 800, a: 'middle', c: '#fff' })}`)}
  ${cap(74, 10, 196, '#3f6e34', T(98, 18, 12, lugar, { w: 800, a: 'middle', c: '#fff' }))}
  ${cap(276, 10, 76, '#b8862a', `${`<g transform="translate(14 13) scale(.7)">${moneda(0, 0).replace('<g transform="translate(0 0)">', '<g>')}</g>`}${T(66, 18, 12, '1.250', { w: 800, a: 'end', c: '#fff' })}`)}
  ${cap(49, 40, 150, mom === 'noche' ? '#23365a' : '#2f7fb8', `<g transform="translate(8 3)">${MOM[mom]}</g>${T(34, 18, 11.5, `Día ${dia}, ${NOMMOM[mom]}`, { w: 800, c: '#fff' })}`)}
  ${cap(205, 40, 106, '#e7b93a', `${cli === 'despejado' ? '' : `<g transform="translate(8 3)">${CLI[cli]}</g>`}${T(cli === 'despejado' ? 53 : 32, 18, 11, cli[0].toUpperCase() + cli.slice(1), { w: 800, a: cli === 'despejado' ? 'middle' : 'start', c: '#3a2a10' })}`)}`;
export const equipoMini = `<g transform="translate(10 680)">${['#a8743a', '#e8c23a', '#8a6a4a', '#9aa4ac', '#5f7f32', '#6a9a7a'].map((c, i) => `<g transform="translate(${i * 37} 0)"><circle cx="16" cy="16" r="15" fill="#efe6d2" stroke="${O}" stroke-width="2"/><circle cx="16" cy="16" r="9.5" fill="${c}" stroke="${O}" stroke-width="1.4"/><rect x="3" y="33" width="26" height="5" rx="2.5" fill="#3a2a22"/><rect x="4" y="34" width="${[22, 24, 18, 0, 14, 24][i]}" height="3" rx="1.5" fill="#5fb346"/></g>`).join('')}</g>`;
export const mini = `<g transform="translate(304 700)"><circle r="40" fill="#e9dcc0" stroke="${O}" stroke-width="2.6"/><clipPath id="mcz"><circle r="36"/></clipPath><g clip-path="url(#mcz)"><rect x="-40" y="-40" width="80" height="80" fill="#a8b86a"/><path d="M-40,20 C-10,6 10,-6 40,-20" stroke="#d7b685" stroke-width="10" fill="none"/></g><circle r="4" fill="#c8362b" stroke="${O}" stroke-width="1.4"/></g>`;
const cardon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="16" ry="5" fill="rgba(30,30,10,.22)"/><path d="M-6,0 L-6,-56 C-6,-64 6,-64 6,-56 L6,0Z" fill="#6a8a3a" stroke="${O}" stroke-width="2"/><path d="M-6,-24 L-16,-24 C-20,-24 -20,-28 -20,-30 L-20,-42 C-20,-48 -12,-48 -12,-42 L-12,-32 L-6,-32Z M6,-30 L14,-30 L14,-46 C14,-52 22,-52 22,-46 L22,-26 C22,-22 18,-22 16,-22 L6,-22Z" fill="#6a8a3a" stroke="${O}" stroke-width="2"/></g>`;
export const suelo = `<rect width="360" height="760" fill="#b8b46a"/>${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 83) % 350 + 5},${(i * 137) % 740 + 10} l3,-6 l3,6" stroke="#8a8a4a" stroke-width="1.4" fill="none"/>`).join('')}
  <path d="M-10,600 C80,560 140,470 190,450 C250,426 300,330 380,300" stroke="#d7b685" stroke-width="34" fill="none"/><path d="M-10,600 C80,560 140,470 190,450 C250,426 300,330 380,300" stroke="#c9a46a" stroke-width="2" stroke-dasharray="8 10" fill="none"/>
  ${cardon(60, 300)}${cardon(300, 560, .9)}${cardon(90, 520, .8)}${cardon(280, 200, .85)}
  ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${200 + i * 15}" cy="${640 + (i % 2) * 2}" rx="9" ry="7" fill="${i % 3 ? '#a59a88' : '#948a78'}" stroke="${O}" stroke-width="1.6"/>`).join('')}`;
export const pj = `<g transform="translate(162 360) scale(.3)">${jugador()}</g>`;
const tienda = `<g transform="translate(126 343) scale(.45)">${carpa()}</g>`;
const fogon = `<g transform="translate(232 418)"><ellipse rx="22" ry="12" fill="#f2a03a" opacity=".25"/><path d="M-10,4 L10,-2 M-10,-2 L10,4" stroke="#5a3a22" stroke-width="4" stroke-linecap="round"/><path d="M0,-18 C7,-10 9,-4 6,1 C4,4 -4,4 -6,1 C-9,-4 -6,-10 0,-18Z" fill="#f28a2a" stroke="${O}" stroke-width="1.4"/></g>`;
const tinte = (c, a) => `<rect width="360" height="760" fill="${c}" opacity="${a}"/>`;
const marco = (cont) => svg('0 0 360 760', `<defs><clipPath id="tel"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#tel)">${cont}</g>`);

// H1: HUD en el mapa, de día
const h1 = marco(`${suelo}${pj}${hud('Ruta 68, Salta', 14, 'tarde', 'nublado')}${equipoMini}${mini}`);
// S1: de noche, la carpa reemplaza al personaje
const s1 = marco(`${suelo}${tienda}${fogon}${tinte('#0e1a3a', .55)}<g transform="translate(232 418)"><ellipse rx="40" ry="22" fill="#f2a03a" opacity=".22"/></g>${hud('Ruta 68, Salta', 14, 'noche', 'despejado')}
  <g transform="translate(40 84)"><rect width="280" height="40" rx="12" fill="rgba(20,14,10,.8)" stroke="#f2b03a" stroke-width="1.4"/>${T(140, 26, 13, 'Armás la carpa y te acostás', { w: 800, a: 'middle', c: '#f4ead2' })}</g>${equipoMini}${mini}`);
// S2: pasa la noche rápido (rueda del día)
const rueda = `<g transform="translate(180 250)"><circle r="62" fill="rgba(20,14,10,.75)" stroke="#f2b03a" stroke-width="2"/>${[['manana', -90], ['tarde', 30], ['noche', 150]].map(([k, a]) => { const r = a * Math.PI / 180; return `<g transform="translate(${Math.cos(r) * 40 - 10} ${Math.sin(r) * 40 - 10})">${MOM[k]}</g>`; }).join('')}<path d="M0,0 L0,-46" stroke="#f2b03a" stroke-width="4" stroke-linecap="round" transform="rotate(-30)"/><circle r="5" fill="#f2b03a"/></g>`;
const s2 = marco(`${suelo}${tienda}${tinte('#e8865a', .3)}${tinte('#2a2a5a', .2)}${hud('Ruta 68, Salta', 15, 'manana', 'despejado')}${rueda}
  ${T(180, 344, 14, 'Amaneciendo', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}${T(180, 362, 11, 'La noche pasa en 2 segundos', { w: 800, a: 'middle', c: '#f4ead2' })}${equipoMini}${mini}`);
// S3: mañana, vuelve el personaje y aviso
const s3 = marco(`${suelo}${pj}${hud('Ruta 68, Salta', 15, 'manana', 'despejado')}
  <g transform="translate(40 84)"><rect width="280" height="54" rx="14" fill="#f4ead2" stroke="${O}" stroke-width="2"/><g transform="translate(10 15) scale(1.1)">${MOM.manana}</g>${T(42, 24, 13.5, 'Día 15, a la mañana', { f: 'Bree' })}${T(42, 42, 11, 'A tu carpa le quedan 4 usos de 5.', { c: '#5a3e28' })}</g>${equipoMini}${mini}`);

// placa de íconos del HUD
const ic = (d) => `<svg viewBox="-2 -2 24 24" width="40" height="40">${d}</svg>`;
const tablaIcos = `<div class="ics"><div><h4>Momento del día</h4>${Object.entries(MOM).map(([k, d]) => `<p>${ic(d)}<span>${NOMMOM[k]}</span></p>`).join('')}</div><div><h4>Clima</h4>${Object.entries(CLI).map(([k, d]) => `<p>${d ? ic(d) : '<i class="vacio"></i>'}<span>${k}</span></p>`).join('')}</div></div>`;

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><div class="tres">
${tel('H1', 'HUD en el mapa', h1, 'Arriba: Menú, lugar y chirolas. Debajo del lugar, dos cápsulas: día y momento (con su ícono) y el clima. De noche la cápsula del día se pone azul. Abajo, equipo y minimapa como estaban.')}
${tel('S1', 'Dormir: la carpa', s1, 'Fuera de los pueblos se usa la carpa desde la mochila. El personaje desaparece y en su lugar queda la carpa armada, con un fogón.')}
${tel('S2', 'Pasa la noche', s2, 'La rueda del día gira de noche a mañana mientras el mapa se aclara. Dura unos 2 segundos. La cápsula del día cambia sola.')}
${tel('S3', 'A la mañana', s3, 'Se desarma la carpa, vuelve el personaje y aparece un aviso con el nuevo día y los usos que le quedan a la carpa.')}
</div>${tablaIcos}</section>`;
const css2 = css + `.ics{display:flex;gap:30px;flex-wrap:wrap;background:#fbf6ea;border:2px solid #e2d6c2;border-radius:16px;padding:12px 16px}.ics h4{margin:0 0 6px;font-family:Bree,serif}.ics p{display:flex;align-items:center;gap:8px;margin:4px 0;font-weight:800}.ics svg{background:#2f7fb8;border-radius:10px}.vacio{display:inline-block;width:40px;height:40px;border-radius:10px;background:#e7b93a}`;
writeFileSync(new URL('./catalogo-35.html', import.meta.url), pagina('Catálogo para aprobar, lote 14g', 'HUD con día, momento, clima y lugar; dormir en la carpa', cuerpo, css2));
