// Catálogo para aprobar, lote 16c: vida en el paisaje (pueblo y campo), animada y sin estorbar.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { O, tel, css } from './catalogo-29.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { almacen, talabarteria } from './edificios.mjs';
import { rosa, maestra } from './personas-salta2.mjs';
import { kirkallpa } from './catalogo-2.mjs';

const L = (w = 1.6) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
// ---------- animales y detalles (caja propia, se ubican con translate) ----------
const perro = `<g class="v-anda"><ellipse cx="0" cy="14" rx="16" ry="3" fill="rgba(40,25,10,.2)"/>
  <path d="M-12,2 C-12,-6 10,-6 12,0 C14,6 8,8 0,8 C-8,8 -12,6 -12,2Z" fill="#b8864a" ${L()}/>
  <path d="M-9,7 L-10,14 M-4,8 L-4,14 M5,8 L6,14 M9,6 L11,13" stroke="${O}" stroke-width="3.4" stroke-linecap="round"/><path d="M-9,7 L-10,14 M-4,8 L-4,14 M5,8 L6,14 M9,6 L11,13" stroke="#b8864a" stroke-width="1.8" stroke-linecap="round"/>
  <g class="v-cola" style="transform-origin:-12px 0px"><path d="M-12,0 C-18,-4 -20,-10 -17,-13" stroke="${O}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M-12,0 C-18,-4 -20,-10 -17,-13" stroke="#b8864a" stroke-width="2" fill="none" stroke-linecap="round"/></g>
  <path d="M8,-2 C10,-10 20,-11 22,-4 C24,1 20,4 16,4 C12,4 9,2 8,-2Z" fill="#b8864a" ${L()}/><path d="M12,-8 L11,-14 L16,-9Z" fill="#8a5a2a" ${L(1.2)}/><circle cx="18" cy="-4" r="1.2" fill="${O}"/><circle cx="22.4" cy="-2" r="1.3" fill="${O}"/><path d="M2,-2 C4,0 6,0 8,-1" stroke="#d8a86a" stroke-width="1.6" fill="none"/></g>`;
const gallina = (c = '#f4ead2') => `<g><ellipse cx="0" cy="9" rx="9" ry="2.2" fill="rgba(40,25,10,.2)"/><path d="M-3,6 L-3,9 M2,6 L2,9" stroke="#d8a23a" stroke-width="1.6"/>
  <path d="M-8,0 C-10,-6 -4,-9 2,-7 C6,-6 8,-2 6,3 C4,6 -4,7 -8,0Z" fill="${c}" ${L(1.4)}/><path d="M-8,-1 C-12,-4 -12,-8 -9,-9 C-8,-6 -7,-4 -6,-3Z" fill="${c}" ${L(1.2)}/>
  <g class="v-pica" style="transform-origin:4px -4px"><path d="M3,-5 C3,-10 9,-11 10,-7 C10,-4 7,-3 5,-3Z" fill="${c}" ${L(1.3)}/><path d="M10,-7 L13,-6 L10,-5Z" fill="#e8a23a" ${L(.8)}/><path d="M5,-10 C6,-12 8,-12 8,-10" fill="#c8362b" ${L(.8)}/><circle cx="7.5" cy="-7.2" r=".8" fill="${O}"/></g></g>`;
const pajaro = (k) => `<g class="v-vuela v-v${k}"><g class="v-aleta"><path d="M0,0 C-4,-5 -10,-6 -13,-3 C-9,-2 -5,-1 -2,1Z" fill="#8a5a32" ${L(1)}/><path d="M2,0 C6,-5 12,-6 15,-3 C11,-2 7,-1 4,1Z" fill="#8a5a32" ${L(1)}/></g><ellipse cx="1" cy="1" rx="5" ry="2.6" fill="#a86a3a" ${L(1)}/><circle cx="6" cy="0" r="2" fill="#a86a3a" ${L(1)}/><path d="M-4,1 L-8,3 L-4,3Z" fill="#8a5a32" ${L(.8)}/></g>`;
const humo = (x, y) => `<g transform="translate(${x} ${y})">${[0, 1, 2].map((i) => `<circle class="v-humo" style="animation-delay:${i * 1.3}s" cx="0" cy="0" r="5" fill="#d8d4cc" opacity="0"/>`).join('')}</g>`;
const horno = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-18,0 C-18,-24 18,-24 18,0Z" fill="#c8764a" ${L()}/><path d="M-6,0 C-6,-8 6,-8 6,0Z" fill="#3a2420" ${L(1.4)}/><rect x="-22" y="0" width="44" height="6" fill="#a8845a" ${L(1.4)}/></g>${humo(x + 6, y - 22)}`;
const ceibo = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="2" rx="26" ry="6" fill="rgba(30,40,10,.22)"/><path d="M-4,0 C-6,-18 -2,-30 0,-36 L4,-36 C4,-26 6,-14 6,0Z" fill="#7a5a3a" ${L()}/><g class="v-copa" style="transform-origin:0px -36px">${[[-16, -46, 16], [14, -48, 16], [0, -60, 18], [-4, -42, 14]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#4f7a34" ${L(1.6)}/>`).join('')}${[[-18, -52], [8, -62], [16, -44], [-4, -48], [2, -66], [-12, -40]].map(([cx, cy]) => `<path d="M${cx},${cy} c2,-3 5,-3 6,0 c-2,3 -4,3 -6,0Z" fill="#d8322a"/>`).join('')}</g></g>`;
const vaca = (x, y, flip = 1) => `<g transform="translate(${x} ${y}) scale(${flip} 1)"><ellipse cx="0" cy="16" rx="22" ry="4" fill="rgba(40,25,10,.2)"/>${[-12, -6, 8, 14].map((lx) => `<rect x="${lx}" y="4" width="4" height="12" fill="#f4ead2" ${L(1.2)}/>`).join('')}
  <path d="M-18,-6 C-18,-14 16,-14 18,-6 L18,6 C10,10 -10,10 -18,6Z" fill="#f4ead2" ${L()}/><path d="M-10,-10 C-6,-6 -2,-8 -2,-2 C-6,2 -12,0 -12,-6Z M6,-4 C10,-8 14,-2 12,4 C8,4 6,2 6,-4Z" fill="#3a2a22"/>
  <path d="M-18,-4 C-22,-2 -22,6 -20,10" stroke="${O}" stroke-width="2" fill="none"/>
  <g class="v-pasta" style="transform-origin:18px -4px"><path d="M16,-8 C22,-12 28,-8 30,0 C31,6 26,8 22,6 C18,4 16,0 16,-8Z" fill="#f4ead2" ${L()}/><path d="M22,-10 L20,-15 M26,-9 L29,-13" stroke="#e8dcc0" stroke-width="2.4" stroke-linecap="round"/><path d="M22,-10 L20,-15 M26,-9 L29,-13" stroke="${O}" stroke-width=".8" fill="none"/><ellipse cx="28" cy="4" rx="3.6" ry="2.6" fill="#e8a8a0" ${L(1)}/><circle cx="25" cy="-3" r="1.2" fill="${O}"/></g></g>`;
const condor = `<g class="v-planea"><g class="v-alaI" style="transform-origin:0px 1px"><path d="M-2,0 C-10,-5 -24,-6 -34,0 C-30,1 -27,2 -25,4 L-29,7 L-23,6 L-25,9 L-19,7 C-13,5 -7,4 -2,4Z" fill="#2a2624" ${L(1)}/><path d="M-10,-1 C-16,-2 -22,-2 -28,0" stroke="#f4ead2" stroke-width="1.6" fill="none"/></g><g class="v-alaD" style="transform-origin:0px 1px"><path d="M2,0 C10,-5 24,-6 34,0 C30,1 27,2 25,4 L29,7 L23,6 L25,9 L19,7 C13,5 7,4 2,4Z" fill="#2a2624" ${L(1)}/><path d="M10,-1 C16,-2 22,-2 28,0" stroke="#f4ead2" stroke-width="1.6" fill="none"/></g><ellipse cx="0" cy="2" rx="5" ry="4" fill="#2a2624" ${L(1)}/><path d="M-4,-1 C-2,-4 2,-4 4,-1" stroke="#f4ead2" stroke-width="2" fill="none"/><circle cx="0" cy="-4" r="2.4" fill="#e8a090" ${L(.8)}/></g>`;
const pasto = (x, y) => `<g transform="translate(${x} ${y})" class="v-pasto">${[-6, -2, 2, 6].map((d, i) => `<path d="M${d},0 C${d - 1},-6 ${d + (i % 2 ? 3 : -3)},-10 ${d + (i % 2 ? 4 : -4)},-14" stroke="#7a8a3a" stroke-width="1.6" fill="none"/>`).join('')}</g>`;
const remolino = `<g class="v-remolino">${[0, 1, 2, 3].map((i) => `<ellipse cx="${i * 2}" cy="${-i * 8}" rx="${6 + i * 3}" ry="${2 + i}" fill="none" stroke="#c9a46a" stroke-width="1.6" opacity="${.7 - i * .12}"/>`).join('')}</g>`;
const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);

// ---------- V1: pueblo ----------
const sueloPueblo = `<rect width="360" height="760" fill="#d9c49a"/>${Array.from({ length: 60 }, (_, i) => `<ellipse cx="${(i * 61) % 360}" cy="${360 + (i * 37) % 240}" rx="9" ry="5" fill="none" stroke="#c4ac80" stroke-width="1.2"/>`).join('')}<rect y="600" width="360" height="160" fill="#b8b46a"/>`;
const V1 = marco('v1', `${sueloPueblo}
  <g transform="translate(4 110) scale(.76)">${almacen()}</g><g transform="translate(190 116) scale(.72)">${talabarteria()}</g>
  <g transform="translate(210 540)">${gallina()}</g><g transform="translate(236 552) scale(-1 1)">${gallina('#a8643a')}</g>
  ${pajaro(1)}${pajaro(2)}
  <g transform="translate(168 420) scale(.3)">${jugador()}</g>
  ${hud('Cerrillos, Salta', 9, 'manana', 'despejado')}${equipoMini}${mini}`);

// ---------- V2: campo ----------
const sueloCampo = `<rect width="360" height="760" fill="#b8b46a"/>${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 83) % 350 + 5},${(i * 137) % 600 + 90} l3,-6 l3,6" stroke="#8a8a4a" stroke-width="1.4" fill="none"/>`).join('')}<path d="M-10,640 C80,600 140,500 190,480 C250,456 300,360 380,330" stroke="#d7b685" stroke-width="34" fill="none"/>`;
const V2 = marco('v2', `${sueloCampo}
  ${vaca(70, 300)}${vaca(270, 200, -1)}
  <g transform="translate(162 470) scale(.3)">${jugador()}</g>
  <g class="v-sombra"><ellipse cx="0" cy="0" rx="20" ry="5" fill="rgba(30,20,10,.18)"/></g>
  ${condor}
  ${hud('Ruta 68, Salta', 9, 'tarde', 'viento')}${equipoMini}${mini}`);

const cssV = css + `.dos{display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:16px}@media (max-width:760px){.dos{grid-template-columns:1fr}}
.v-cola{animation:vcola .5s ease-in-out infinite alternate;transform-box:view-box}@keyframes vcola{to{transform:rotate(22deg)}}
.v-pasea{animation:vpasea 14s linear infinite}@keyframes vpasea{0%{transform:translate(0,0) scale(1,1)}45%{transform:translate(160px,6px) scale(1,1)}50%{transform:translate(160px,6px) scale(-1,1)}95%{transform:translate(0,0) scale(-1,1)}100%{transform:translate(0,0) scale(1,1)}}
.v-anda{animation:vanda .35s ease-in-out infinite alternate}@keyframes vanda{to{transform:translateY(-1.5px)}}
.v-pica{animation:vpica 1.8s ease-in-out infinite;transform-box:view-box}@keyframes vpica{0%,60%,100%{transform:rotate(0)}70%,80%{transform:rotate(38deg)}}
.v-vuela{animation:vvuela 12s linear infinite}.v-v2{animation-delay:-6s;animation-duration:15s}@keyframes vvuela{0%{transform:translate(-30px,250px)}100%{transform:translate(400px,170px)}}
.v-aleta{animation:valeta .28s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes valeta{to{transform:scaleY(-.6)}}
.v-humo{animation:vhumo 4s ease-out infinite}@keyframes vhumo{0%{opacity:0;transform:translate(0,0) scale(.6)}15%{opacity:.85}100%{opacity:0;transform:translate(10px,-46px) scale(2)}}
.v-copa{animation:vcopa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes vcopa{to{transform:rotate(1.6deg)}}
.v-pasta{animation:vpasta 4s ease-in-out infinite;transform-box:view-box}@keyframes vpasta{0%,40%,100%{transform:rotate(0)}55%,85%{transform:rotate(28deg)}}
.v-pasto{animation:vpasto 2.4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}@keyframes vpasto{to{transform:skewX(-10deg)}}
.v-remolino{animation:vremo 9s linear infinite}@keyframes vremo{0%{transform:translate(0,0);opacity:0}10%{opacity:1}80%{opacity:1}100%{transform:translate(140px,-60px);opacity:0}}
.v-alaI{animation:valaI 2.6s ease-in-out infinite;transform-box:view-box}.v-alaD{animation:valaD 2.6s ease-in-out infinite;transform-box:view-box}@keyframes valaI{0%,60%,100%{transform:rotate(0)}70%{transform:rotate(14deg)}80%{transform:rotate(-8deg)}90%{transform:rotate(10deg)}}@keyframes valaD{0%,60%,100%{transform:rotate(0)}70%{transform:rotate(-14deg)}80%{transform:rotate(8deg)}90%{transform:rotate(-10deg)}}
.v-planea{animation:vplanea 20s linear infinite}@keyframes vplanea{0%{transform:translate(-40px,160px)}50%{transform:translate(200px,120px)}100%{transform:translate(420px,180px)}}
.v-sombra{animation:vsombra 20s linear infinite}@keyframes vsombra{0%{transform:translate(-40px,420px)}50%{transform:translate(200px,380px)}100%{transform:translate(420px,440px)}}`;
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Las animaciones se mueven en la página.</div>
<section><h3>Vida en el paisaje</h3><p class="nota">Todo es decorado: no se toca, no corta el paso y nunca tapa el HUD, el equipo, el minimapa ni a la gente con la que se habla. Se mueve despacio y en las orillas. Se puede bajar en Opciones con "menos movimiento".</p><div class="dos">
${tel('VP1', 'Pueblo', V1, 'Gallinas picoteando y horneros que cruzan volando.')}
${tel('VP2', 'Campo', V2, 'Vacas pastando que bajan la cabeza y un cóndor que planea alto, con aleteos cortos y su sombra en el suelo.')}
</div></section>`;
writeFileSync(new URL('./catalogo-45.html', import.meta.url), pagina('Catálogo para aprobar, lote 16c', 'Vida en el paisaje', cuerpo, cssV));
console.log('ok 45');
