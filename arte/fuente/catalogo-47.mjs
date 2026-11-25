// Catálogo para aprobar, lote 17b: Torneo del Norte (sede, llave de rondas, campeón y créditos).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador, maestro } from './adultos.mjs';
import { anselmo } from './personas-salta.mjs';
import { rosendo } from './personas-corrientes.mjs';
import { eulogia } from './personas-jujuy.mjs';
import { O, T, tel, css, fondo, cab, papel, tilde } from './catalogo-29.mjs';
import { boton } from './catalogo-30.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { tinglado } from './edificios-galpon.mjs';
import { busto } from './catalogo-40.mjs';
import { ajinina } from './catalogo-1.mjs';
import { kirkallpa } from './catalogo-2.mjs';
import { pirkasol } from './catalogo-3.mjs';
import { kapiyva } from './catalogo-10.mjs';
import { suri } from './catalogo-18.mjs';
import { qaqapuma } from './catalogo-19.mjs';

const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);
const caja = (x, y, w, h, c = '#f4ead2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c}" stroke="${O}" stroke-width="2.6"/>`;
const cara = (quien, id, x, y, r = 30) => `<g transform="translate(${x} ${y})"><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#e9d9b8"/><g clip-path="url(#${id})"><g transform="translate(${-60 * 1.05} ${-38 * 1.05 - 2}) scale(1.05)">${quien}</g></g><circle r="${r}" fill="none" stroke="${O}" stroke-width="2.4"/></g>`;
const insignia = (x, y, motivo) => `<g transform="translate(${x} ${y}) scale(.6)"><path d="M20,2 L26,6 L33,6 L34,13 L38,20 L34,27 L33,34 L26,34 L20,38 L14,34 L7,34 L6,27 L2,20 L6,13 L7,6 L14,6Z" fill="#d9dee3" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="20" r="12" fill="#eef1f3" stroke="#8a9095" stroke-width="1.4"/>${motivo}</g>`;
const MOT = {
  empanada: `<path d="M12,24 C12,16 28,16 28,24Z" fill="#d8a45a" stroke="${O}" stroke-width="1.4"/>`,
  acordeon: `<rect x="11" y="14" width="18" height="12" rx="2" fill="#c8362b" stroke="${O}" stroke-width="1.4"/><path d="M15,14 L15,26 M19,14 L19,26 M23,14 L23,26" stroke="#f4ead2" stroke-width="1.2"/>`,
  cerro: `<path d="M9,27 C13,18 17,13 20,13 C23,13 27,18 31,27Z" fill="#c8765a" stroke="${O}" stroke-width="1.4"/><path d="M12,24 C16,21 24,21 28,24 M14,20 C18,18 22,18 26,20" stroke="#e8c23a" stroke-width="1.6" fill="none"/>`,
};

// ---------- TN1: el tinglado en Salta ----------
const suelo = `<rect width="360" height="760" fill="#cbbf8e"/>${Array.from({ length: 50 }, (_, i) => `<ellipse cx="${(i * 61) % 360}" cy="${300 + (i * 37) % 300}" rx="9" ry="5" fill="none" stroke="#b8ac7a" stroke-width="1.2"/>`).join('')}`;
const TN1 = marco('tn1', `${suelo}<g transform="translate(10 110) scale(1.42)">${tinglado()}</g>
  <g transform="translate(166 420) scale(.3)">${jugador()}</g>
  ${hud('Salta, la Rural', 15, 'tarde', 'despejado')}<rect width="360" height="760" fill="#1b1a22" opacity=".2"/>
  <g transform="translate(10 470)">${caja(0, 0, 340, 270)}${T(18, 32, 17, 'Torneo del Norte', { f: 'Bree', c: '#7a4a2a' })}${T(18, 58, 13, 'Se abre con las tres medallas.', { w: 700, c: '#5a4636' })}
  <g transform="translate(18 70)">${[['empanada', true], ['acordeon', true], ['cerro', true]].map(([m, ok], i) => `<g transform="translate(${i * 56} 0)">${insignia(0, 0, MOT[m])}${ok ? tilde(26, 4, 7) : ''}</g>`).join('')}</g>
  ${T(18, 124, 13, '3 rondas contra los capataces, con sus', { w: 800 })}${T(18, 144, 13, 'equipos mejorados. Mates mezclados', { w: 800 })}${T(18, 164, 13, 'en cada ronda. Sin clima, bajo techo.', { w: 800 })}
  ${boton(14, 206, 148, 'Ahora no', '#8a7a62')}${boton(178, 206, 148, 'Entrar', '#2f7d5b')}</g>`);

// ---------- TN2: llave de rondas ----------
const ronda = (y, n, quien, id, nom, mot, estado) => {
  const c = estado === 'ganada' ? '#e4f0dc' : estado === 'sigue' ? '#fff4d0' : '#e8e2d6';
  const borde = estado === 'ganada' ? '#2f7d5b' : estado === 'sigue' ? '#c8962a' : '#b8ae9c';
  return `<g transform="translate(24 ${y})" opacity="${estado === 'falta' ? .55 : 1}"><rect width="312" height="104" rx="16" fill="${c}" stroke="${borde}" stroke-width="2.6"/>
  ${cara(quien, id, 52, 52)}${T(98, 34, 12.5, `Ronda ${n}`, { w: 800, c: '#6a5440' })}${T(98, 58, 17, nom, { f: 'Bree' })}${insignia(98, 66, MOT[mot])}
  ${estado === 'ganada' ? `${tilde(288, 52, 12)}` : estado === 'sigue' ? `<g transform="translate(206 32)"><rect width="92" height="40" rx="12" fill="#2f7d5b" stroke="${O}" stroke-width="2"/>${T(46, 26, 14, 'Pelear', { w: 800, a: 'middle', c: '#fff' })}</g>` : ''}</g>`;
};
const TN2 = svg('0 0 360 760', `${fondo}${cab('Torneo del Norte')}${papel(14, 74, 332, 672)}
  ${ronda(96, 1, anselmo(), 'r1', 'Anselmo', 'empanada', 'ganada')}<path d="M180,200 L180,222" stroke="${O}" stroke-width="2.4" stroke-dasharray="4 4"/>
  ${ronda(224, 2, rosendo(), 'r2', 'Rosendo', 'acordeon', 'sigue')}<path d="M180,328 L180,350" stroke="${O}" stroke-width="2.4" stroke-dasharray="4 4"/>
  ${ronda(352, 3, eulogia(), 'r3', 'Eulogia', 'cerro', 'falta')}
  <g transform="translate(24 480)"><rect width="312" height="120" rx="14" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/>
  ${tilde(22, 26, 8)}${T(38, 31, 12.5, 'Entre ronda y ronda, tus bichos se curan.', { w: 700 })}
  ${tilde(22, 58, 8)}${T(38, 63, 12.5, 'Si perdés, el torneo vuelve a la ronda 1.', { w: 700 })}
  ${tilde(22, 90, 8)}${T(38, 95, 12.5, 'Podés salir y volver cuando quieras.', { w: 700 })}</g>
  ${boton(90, 630, 180, 'Salir del torneo', '#8a7a62')}`);

// ---------- TN3a: celebración ----------
const EQ = [['Ajinina', 10, ajinina()], ['Kirkallpa', 9, kirkallpa()], ['Pirkasol', 9, pirkasol()], ['Kapiyvá', 9, kapiyva()], ['Suri', 9, suri()], ['Qaqapuma', 10, qaqapuma()]];
const rayos = `<g class="gira" style="transform-origin:180px 300px">${Array.from({ length: 18 }, (_, i) => { const a = i * 20 * Math.PI / 180, b = (i * 20 + 9) * Math.PI / 180; return `<path d="M180,300 L${(180 + Math.cos(a) * 520).toFixed(0)},${(300 + Math.sin(a) * 520).toFixed(0)} L${(180 + Math.cos(b) * 520).toFixed(0)},${(300 + Math.sin(b) * 520).toFixed(0)}Z" fill="#f2d27a" opacity=".16"/>`; }).join('')}</g>`;
const estallido = (x, y, c, d) => `<g transform="translate(${x} ${y})">${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<circle class="estalla" style="animation-delay:${d}s;--dx:${(Math.cos(a) * 34).toFixed(1)}px;--dy:${(Math.sin(a) * 34).toFixed(1)}px" r="3" fill="${c}"/>`; }).join('')}</g>`;
const mateCopa = `<g><path d="M-26,64 L26,64 L20,54 L-20,54Z" fill="#8a9095" stroke="${O}" stroke-width="2"/><rect x="-6" y="40" width="12" height="16" fill="#c9ced2" stroke="${O}" stroke-width="2"/><path d="M-30,-6 C-34,22 -18,42 0,42 C18,42 34,22 30,-6Z" fill="#d9dee3" stroke="${O}" stroke-width="2.4"/><path d="M-30,-6 C-14,-12 14,-12 30,-6 C14,0 -14,0 -30,-6Z" fill="#eef1f3" stroke="${O}" stroke-width="2"/><path d="M-22,10 C-10,16 10,16 22,10 M-18,24 C-8,28 8,28 18,24" stroke="#8a9095" stroke-width="1.6" fill="none"/><path d="M-8,14 L-4,20 L0,14 L4,20 L8,14" stroke="#b8a04a" stroke-width="1.4" fill="none" opacity="0"/><path d="M14,-8 L26,-40" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M14,-8 L26,-40" stroke="#e8c23a" stroke-width="2.6" stroke-linecap="round"/><path class="destello" d="M-18,0 C-16,14 -10,26 -4,32" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
const persona = (x, c, sombrero, d) => `<g transform="translate(${x} 0)"><g class="salta" style="animation-delay:${d}s"><path d="M-12,60 C-12,30 12,30 12,60Z" fill="${c}" stroke="${O}" stroke-width="1.6"/><circle cy="22" r="9" fill="#b0764c" stroke="${O}" stroke-width="1.6"/><path d="M-10,36 L-18,10 M10,36 L18,10" stroke="${c}" stroke-width="6" stroke-linecap="round"/><path d="M-10,36 L-18,10 M10,36 L18,10" stroke="${O}" stroke-width="1" fill="none" opacity=".4"/>${sombrero ? `<g class="vuela" style="animation-delay:${d}s"><path d="M-12,12 C-12,9 12,9 12,12 C12,14 -12,14 -12,12Z" fill="${sombrero}" stroke="${O}" stroke-width="1.2"/><path d="M-6,11 C-6,4 6,4 6,11Z" fill="${sombrero}" stroke="${O}" stroke-width="1.2"/></g>` : ''}</g></g>`;
const publicoC = `<g transform="translate(0 676)">${[[18, '#3f7f9a', '#1c1716', 0], [56, '#c8562a', '', .2], [94, '#5f7f32', '#cdb48a', .35], [132, '#7a3a6a', '', .1], [228, '#c8962a', '#1c1716', .25], [266, '#3a6a8a', '', .05], [304, '#a8432a', '#f0ead8', .3], [342, '#5a4a3a', '', .15]].map(([x, c, h, d]) => persona(x, c, h, d)).join('')}</g>`;
const TN3a = marco('tn3a', `<rect width="360" height="760" fill="#3a1f26"/><rect width="360" height="760" fill="url(#cielo3)"/>
  <defs><radialGradient id="cielo3" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#8a4a2a"/><stop offset="1" stop-color="#1e1420"/></radialGradient></defs>
  ${rayos}${estallido(46, 52, '#f2d27a', 0)}${estallido(314, 56, '#e86a5a', .8)}${estallido(40, 230, '#8ec4d8', 1.6)}${estallido(320, 236, '#a8d86a', 2.2)}
  <g class="titulo">${T(180, 74, 15, 'Torneo del Norte', { f: 'Bree', a: 'middle', c: '#f2d27a' })}${T(180, 112, 34, '¡Campeón!', { f: 'Bree', a: 'middle', c: '#fff6dc' })}</g>
  ${T(180, 140, 13.5, 'Le ganaste a Anselmo, Rosendo y Eulogia', { w: 800, a: 'middle', c: '#f4ead2' })}
  <g transform="translate(180 230)"><circle r="70" fill="#f2d27a" opacity=".16"/></g><g class="levanta"><g transform="translate(180 196) scale(.95)">${mateCopa}</g></g>
  <g transform="translate(134 262) scale(.78)">${jugador()}</g>
  ${EQ.map(([n, lv, d], i) => { const pos = [[2, 372], [266, 372], [2, 478], [266, 478], [84, 556], [184, 556]][i]; return `<g transform="translate(${pos[0]} ${pos[1]})"><g class="salta" style="animation-delay:${(i * .18).toFixed(2)}s"><g transform="scale(.46)">${d}</g></g></g>`; }).join('')}
  ${publicoC}
  ${T(180, 752, 12, 'Tocá para seguir', { w: 800, a: 'middle', c: '#f2d27a' })}`);

// ---------- TN3b: libreta de campeones ----------
const TN3b = marco('tn3b', `${fondo}<rect width="360" height="760" fill="#2a2228" opacity=".5"/>
  <g transform="translate(18 60)"><rect width="324" height="560" rx="10" fill="#b8925e" stroke="${O}" stroke-width="2.6"/><rect x="10" y="10" width="304" height="540" rx="6" fill="#f1e3bd" stroke="${O}" stroke-width="1.6"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M24,${70 + i * 22} L300,${70 + i * 22}" stroke="#d8c49a" stroke-width="1"/>`).join('')}<path d="M54,20 L54,540" stroke="#d88a7a" stroke-width="1.2"/>
  ${T(66, 50, 22, 'Campeones del Norte', { f: 'Caveat', w: 700, c: '#5a3a22' })}${T(66, 82, 16, 'Jonathan, día 34', { f: 'Caveat', w: 700, c: '#5a3a22' })}
  ${EQ.map(([n, lv, d], i) => { const x = 30 + (i % 2) * 140, y = 100 + Math.floor(i / 2) * 136; return `<g transform="translate(${x} ${y})"><rect width="128" height="124" rx="8" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g class="aparece" style="animation-delay:${(i * .5).toFixed(1)}s"><g transform="translate(14 0) scale(.5)">${d}</g></g>${T(64, 104, 14, n, { f: 'Bree', a: 'middle' })}${T(64, 118, 11.5, `Nivel ${lv}`, { w: 800, a: 'middle', c: '#6a5440' })}</g>`; }).join('')}
  <g class="sello" transform="translate(272 62) rotate(-14)"><circle r="32" fill="#fff4ec" fill-opacity=".4" stroke="#b8382a" stroke-width="3.4"/><circle r="26" fill="none" stroke="#b8382a" stroke-width="1.4"/>${T(0, -2, 8.5, 'CAMPEÓN', { f: 'Bree', a: 'middle', c: '#b8382a' })}${T(0, 10, 8.5, 'DEL NORTE', { f: 'Bree', a: 'middle', c: '#b8382a' })}</g></g>
  ${T(180, 660, 13, 'Queda guardado para siempre en tu libreta.', { w: 800, a: 'middle', c: '#f4ead2' })}
  ${boton(110, 680, 140, 'Seguir', '#2f7d5b')}`);

// ---------- TN3c: Don Abel y créditos ----------
const brillos = Array.from({ length: 14 }, (_, i) => `<circle class="brillo" style="animation-delay:${(i * .37).toFixed(2)}s" cx="${(i * 97) % 340 + 10}" cy="${(i * 53) % 240 + 90}" r="${2 + (i % 3)}" fill="#f2d27a"/>`).join('');
const TN3 = marco('tn3c', `${fondo}<rect width="360" height="760" fill="#2a2228" opacity=".55"/>${brillos}
  ${T(180, 70, 15, 'Torneo del Norte', { f: 'Bree', a: 'middle', c: '#f2d27a' })}${T(180, 104, 28, 'Campeón del Norte', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}
  <g transform="translate(70 120) scale(.75)">${maestro()}</g><g transform="translate(200 120) scale(.75)">${jugador()}</g>
  <g transform="translate(140 214)"><rect width="34" height="44" rx="3" fill="#b8925e" stroke="${O}" stroke-width="2"/><rect x="4" y="4" width="26" height="36" fill="#e8d4a8" stroke="${O}" stroke-width="1.2"/><path d="M8,12 L26,12 M8,18 L26,18 M8,24 L22,24" stroke="#8a6a3e" stroke-width="1.4"/></g>
  <g transform="translate(10 300)">${caja(0, 0, 340, 120)}${T(18, 30, 15, 'Don Abel', { f: 'Bree', c: '#7a4a2a' })}${T(18, 60, 14, "Me llenaste la libreta, m'hijo.", { w: 800 })}${T(18, 82, 14, 'Ahora el país entero te espera.', { w: 800 })}</g>
  <g class="sube">${[['Una aventura gaucha', 'Bree', 17, '#f2d27a'], ['Idea y diseño', 'Nunito', 12, '#c9b48a'], ['Jonathan Pepe', 'Bree', 16, '#fbf3e2'], ['Arte, música y sonido', 'Nunito', 12, '#c9b48a'], ['Dibujados y compuestos por código', 'Bree', 14, '#fbf3e2'], ['Gracias por jugar', 'Bree', 17, '#f2d27a']].map(([t, f, z, c], i) => T(180, 470 + i * 34, z, t, { f, w: f === 'Nunito' ? 800 : 400, a: 'middle', c })).join('')}</g>
  ${boton(70, 690, 220, 'Seguir jugando', '#2f7d5b')}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Torneo del Norte</h3><p class="nota">Se hace en el tinglado de la Rural, en Salta capital: techo de chapa en arco, frente de ladrillo y gradas a los costados. Por dentro, fondo cerrado con público como los galpones, sin clima.</p><div class="tres">
${tel('TN1', 'Llegada al tinglado', TN1, 'Al tocar la puerta: qué es, las tres insignias que hacen falta (con tilde si ya las tenés) y cómo es el torneo. Sin las tres medallas, la puerta dice cuántas faltan.')}
${tel('TN2', 'Rondas', TN2, 'Anselmo, Rosendo y Eulogia, con equipos mejorados y sorteo de mates en cada ronda. Propuesta: tus bichos se curan entre rondas; si perdés, vuelve a la ronda 1; se puede salir y volver.')}
${tel('TN3a', '¡Campeón!', TN3a, 'Apenas cae el último bicho de Eulogia: rayos dorados que giran, fuegos artificiales de puntos de colores, el jugador levanta el Mate de Plata del Norte, sus 6 bichos saltan y el público festeja tirando los sombreros. Suena el remate de la chacarera.')}
${tel('TN3b', 'Libreta de campeones', TN3b, 'Tus 6 bichos aparecen uno por uno en la página de campeones de la libreta, con nombre y nivel, tu nombre y el día. Cae el sello rojo de Campeón del Norte. Queda para siempre.')}
${tel('TN3c', 'Don Abel y créditos', TN3, 'Don Abel recibe la libreta, dice dos líneas y suben los créditos. "Seguir jugando" vuelve al mapa: revanchas, libreta completa y lo que falte.')}
</div></section>`;
const css2 = css + `.tres{display:grid;grid-template-columns:repeat(3,minmax(0,360px));gap:16px}@media (max-width:1100px){.tres{grid-template-columns:repeat(2,minmax(0,360px))}}@media (max-width:760px){.tres{grid-template-columns:1fr}}.brillo{animation:brillo 2.4s ease-in-out infinite}@keyframes brillo{0%,100%{opacity:.15}50%{opacity:1}}
.gira{animation:gira 24s linear infinite;transform-box:view-box}@keyframes gira{to{transform:rotate(360deg)}}
.estalla{animation:estalla 2.6s ease-out infinite}@keyframes estalla{0%{transform:translate(0,0);opacity:0}10%{opacity:1}70%{opacity:.9}100%{transform:translate(var(--dx),var(--dy));opacity:0}}
.salta{animation:salta .9s ease-in-out infinite alternate}@keyframes salta{to{transform:translateY(-10px)}}
.vuela{animation:vuela 1.8s ease-in-out infinite}@keyframes vuela{0%,40%{transform:translateY(0) rotate(0)}70%{transform:translateY(-40px) rotate(-30deg)}100%{transform:translateY(0) rotate(0)}}
.levanta{animation:levanta 1.4s ease-in-out infinite alternate}@keyframes levanta{to{transform:translateY(-8px)}}
.destello{animation:destello 1.6s ease-in-out infinite}@keyframes destello{0%,100%{opacity:0}50%{opacity:.9}}
.titulo{animation:titulo 1.6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes titulo{to{transform:scale(1.06)}}
.aparece{animation:aparece .6s ease-out both}@keyframes aparece{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.sello{animation:sello 3.4s ease-out both}@keyframes sello{0%,80%{opacity:0;transform:translate(272px,62px) rotate(-14deg) scale(2.4)}90%{opacity:1;transform:translate(272px,62px) rotate(-14deg) scale(.92)}100%{opacity:1;transform:translate(272px,62px) rotate(-14deg) scale(1)}}`;
writeFileSync(new URL('./catalogo-47.html', import.meta.url), pagina('Catálogo para aprobar, lote 17b', 'Torneo del Norte', cuerpo, css2));
console.log('ok 47');
