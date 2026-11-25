// Catálogo para aprobar, lote 17a: pantallas que faltaban (inicial, desafío, derrota, opciones, cómo se juega) e íconos de chipá y tamales.
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { jugador, maestro } from './adultos.mjs';
import { anselmo } from './personas-salta.mjs';
import { O, T, tel, css, moneda, fondo, cab, papel, chipTipo, tilde } from './catalogo-29.mjs';
import { boton } from './catalogo-30.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { N as N32 } from './catalogo-32.mjs';
import { ICN } from './catalogo-39.mjs';
import { ajinina, pasacan, yakusapo } from './catalogo-1.mjs';
import { galponS } from './edificios-galpon.mjs';
import { busto } from './catalogo-40.mjs';
import { mateN } from './catalogo-37.mjs';
import { FONDO, interiorTop, FINAL } from './catalogo-38.mjs';
import { postera } from './personas-salta3.mjs';

const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);
const caja = (x, y, w, h, c = '#f4ead2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${c}" stroke="${O}" stroke-width="2.6"/>`;
const flecha = (x, y) => `<path d="M${x},${y} l8,0 l-4,6Z" fill="#7a4a2a"/>`;
const r2 = (quien, id, nombre, l1, l2, y0 = 470) => `<g transform="translate(8 ${y0})">${busto(quien, id, 132, 150, 2.1)}<rect width="132" height="150" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></g><g transform="translate(10 ${y0 + 142})">${caja(0, 0, 340, 128)}${T(18, 28, 15, nombre, { f: 'Bree', c: '#7a4a2a' })}${T(18, 58, 14, l1, { w: 800 })}${T(18, 80, 14, l2, { w: 800 })}${flecha(318, 110)}</g>`;

// ---------- IN1 y IN2: elegir la inicial con Don Abel ----------
const ladrillos = (y0, y1) => { let r = ''; for (let y = y0, f = 0; y < y1; y += 22, f++) for (let x = (f % 2) * -22; x < 360; x += 44) r += `<rect x="${x + 2}" y="${y + 2}" width="40" height="18" rx="3" fill="${['#d8b98a', '#d2b080', '#dcc094'][(x + y) % 3 === 0 ? 0 : (x + y) % 3]}" stroke="#b8956a" stroke-width="1.2"/>`; return r; };
const ristra = (x) => `<path d="M${x},20 L${x},74" stroke="#8a6a3e" stroke-width="1.6"/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${x},${28 + i * 8} c${i % 2 ? 7 : -7},2 ${i % 2 ? 8 : -8},7 ${i % 2 ? 4 : -4},10 c${i % 2 ? -2 : 2},-3 ${i % 2 ? -3 : 3},-6 ${i % 2 ? -4 : 4},-10Z" fill="#c8362b" stroke="${O}" stroke-width="1"/>`).join('')}`;
const rancho = `<rect width="360" height="760" fill="#c9a877"/>${ladrillos(18, 440)}
  <rect width="360" height="20" fill="#5a3a22"/>${[30, 120, 210, 300].map((x) => `<rect x="${x}" y="0" width="16" height="26" rx="3" fill="#6b4226" stroke="${O}" stroke-width="1.6"/>`).join('')}<path d="M0,20 L360,20" stroke="${O}" stroke-width="2"/>
  ${ristra(16)}${ristra(344)}
  <g transform="translate(22 336)"><rect x="-6" y="-6" width="112" height="92" rx="4" fill="#8a6a46" stroke="${O}" stroke-width="2"/><rect width="100" height="80" fill="#9fd0e8"/><path d="M0,58 C20,36 34,44 50,30 C66,18 82,34 100,26 L100,80 L0,80Z" fill="#c8765a"/><path d="M0,70 C26,62 60,66 100,58 L100,80 L0,80Z" fill="#8aa86a"/><path d="M50,0 L50,80" stroke="#8a6a46" stroke-width="5"/><rect width="100" height="80" fill="none" stroke="${O}" stroke-width="1.6"/><rect x="-10" y="80" width="120" height="8" rx="2" fill="#a8845a" stroke="${O}" stroke-width="1.6"/></g>
  <g transform="translate(196 380)"><rect x="0" y="0" width="150" height="8" rx="2" fill="#8a6a46" stroke="${O}" stroke-width="1.6"/><path d="M10,8 L16,20 M140,8 L134,20" stroke="#6b4226" stroke-width="3"/>
    <g transform="translate(20 -26)"><path d="M0,26 C-4,14 4,4 14,4 C24,4 30,14 26,26Z" fill="#7a7a80" stroke="${O}" stroke-width="1.6"/><path d="M24,10 C32,8 36,12 34,18" stroke="${O}" stroke-width="2.4" fill="none"/><path d="M8,4 C8,0 18,0 18,4" stroke="${O}" stroke-width="2" fill="none"/></g>
    <g transform="translate(62 -22)"><path d="M2,6 C-2,14 2,22 10,22 C18,22 22,14 18,6Z" fill="#a8743a" stroke="${O}" stroke-width="1.6"/><path d="M14,-6 L10,8" stroke="#c9ced2" stroke-width="2.4"/></g>
    ${[[96, '#c8e0a0'], [114, '#e8c46a'], [130, '#d8a0a0']].map(([x, c]) => `<rect x="${x}" y="-20" width="12" height="20" rx="3" fill="${c}" stroke="${O}" stroke-width="1.4"/><rect x="${x + 2}" y="-24" width="8" height="5" fill="#8a6a46" stroke="${O}" stroke-width="1"/>`).join('')}</g>
  <path d="M150,330 L150,440" stroke="#6b4226" stroke-width="3"/><g transform="translate(150 330)"><circle r="3" fill="#6b4226"/><path d="M-22,4 L22,4 L18,70 L-18,70Z" fill="#c8362b" stroke="${O}" stroke-width="1.8"/><path d="M-20,30 L20,30 M-19,46 L19,46" stroke="#1b1a22" stroke-width="3"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${-17 + i * 5.6},70 l0,6" stroke="#c8362b" stroke-width="1.6"/>`).join('')}</g>
  <rect y="440" width="360" height="320" fill="#b89268"/>${Array.from({ length: 24 }, (_, i) => `<ellipse cx="${(i * 71) % 360}" cy="${452 + (i * 29) % 300}" rx="12" ry="3" fill="#a8845a" opacity=".6"/>`).join('')}<path d="M0,440 L360,440" stroke="${O}" stroke-width="2"/>
  <g transform="translate(60 52)"><rect width="240" height="58" rx="14" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/></g>`;
const INI = [['Ajinina', 'Fuego', ajinina()], ['Pasacán', 'Flora', pasacan()], ['Yakusapo', 'Agua', yakusapo()]];
const cartaIni = (i, sel) => { const [n, t, d] = INI[i]; return `<g transform="translate(${12 + i * 114} 130)"><rect width="108" height="190" rx="14" fill="${sel ? '#fff4d0' : '#f4ead2'}" stroke="${sel ? '#c8962a' : O}" stroke-width="${sel ? 3.4 : 2.2}"/><circle cx="54" cy="70" r="44" fill="${COLOR_TIPO[t]}" opacity=".22"/><g transform="translate(4 20) scale(.5)">${d}</g>${T(54, 150, 15, n, { f: 'Bree', a: 'middle', c: '#3a2a1a' })}<g transform="translate(${54 - (t.length * 6.6 + 14) / 2} 160)">${chipTipo(0, 0, t)}</g></g>`; };
const IN1 = marco('in1', `${rancho}${T(180, 80, 20, 'Elegí tu primer bicho', { f: 'Bree', a: 'middle', c: '#3a2a1a' })}${T(180, 100, 12.5, 'Tocá uno para ver su ficha.', { w: 700, a: 'middle', c: '#5a4636' })}${[0, 1, 2].map((i) => cartaIni(i, false)).join('')}
  ${r2(maestro(), 'ab1', 'Don Abel', 'Elegí uno. Te va a acompañar', 'todo el camino, cuidalo.')}`);
const tIco = (k, s = .5) => `<g transform="scale(${s})"><circle cx="24" cy="24" r="21" fill="${COLOR_TIPO[k]}" stroke="${O}" stroke-width="3"/>${FINAL[k]}</g>`;
const est = (y, n, v) => `${T(20, y + 10, 12.5, n, { w: 800 })}<rect x="104" y="${y}" width="170" height="12" rx="6" fill="#e2d6bc" stroke="${O}" stroke-width="1.2"/><rect x="105" y="${y + 1}" width="${168 * v / 100}" height="10" rx="5" fill="#c8562a"/>${T(316, y + 11, 13, String(v), { f: 'Bree', a: 'end' })}`;
const tec = (y, n, t, d) => `<g transform="translate(14 ${y})"><rect width="312" height="36" rx="10" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(6 6)">${tIco(t, .5)}</g>${T(38, 23, 13.5, n, { w: 800 })}${T(300, 23, 12.5, `Daño ${d}`, { w: 800, a: 'end', c: '#7a4a2a' })}</g>`;
const IN2 = marco('in2', `${rancho}${[0, 1, 2].map((i) => cartaIni(i, i === 0)).join('')}<rect width="360" height="760" fill="#1b1a22" opacity=".45"/>
  <g transform="translate(10 24)">${caja(0, 0, 340, 726)}
  <circle cx="86" cy="86" r="70" fill="${COLOR_TIPO.Fuego}" opacity=".2"/><g transform="translate(16 18) scale(.7)">${ajinina()}</g>
  ${T(170, 50, 24, 'Ajinina', { f: 'Bree', c: '#3a2a1a' })}<g transform="translate(170 62)">${chipTipo(0, 0, 'Fuego')}</g><g transform="translate(222 62)"><rect width="50" height="17" rx="8.5" fill="#e8d4b0" stroke="${O}" stroke-width="1"/>${T(25, 12.5, 10, 'Salta', { w: 800, a: 'middle', c: '#5a4636' })}</g>
  ${T(170, 104, 12.5, 'Rol: golpeador', { w: 800, c: '#5a4636' })}${T(170, 124, 12, 'Iguana colorada del monte.', { w: 600, c: '#5a4636' })}
  <path d="M14,164 L326,164" stroke="#d8c8a8" stroke-width="1.4"/>
  ${est(176, 'Vida', 70)}${est(198, 'Ataque', 85)}${est(220, 'Defensa', 65)}${est(242, 'Velocidad', 80)}
  <g transform="translate(14 268)"><rect width="312" height="48" rx="10" fill="#fff4d0" stroke="#c8962a" stroke-width="1.4"/>${T(12, 20, 12.5, 'Pasiva: Picante', { w: 800, c: '#7a4a2a' })}${T(12, 38, 12, 'Con menos de media vida pega 10 % más.', { w: 600 })}</g>
  ${T(18, 338, 13, 'Técnicas', { f: 'Bree', c: '#7a4a2a' })}${tec(346, 'Mordisco', 'Común', 30)}${tec(388, 'Brasa', 'Fuego', 40)}
  ${T(18, 450, 12.5, 'Le pega fuerte a', { w: 800 })}<g transform="translate(130 434)">${tIco('Flora')}</g><g transform="translate(158 434)">${tIco('Hielo')}</g>
  ${T(190, 450, 12.5, 'Le cuesta', { w: 800 })}<g transform="translate(260 434)">${tIco('Agua')}</g><g transform="translate(288 434)">${tIco('Roca')}</g>
  <path d="M14,470 L326,470" stroke="#d8c8a8" stroke-width="1.4"/>
  ${T(18, 492, 13, 'En el nivel 4 elegís su camino', { f: 'Bree', c: '#7a4a2a' })}
  <g transform="translate(14 502)"><rect width="150" height="132" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(15 0) scale(.6)">${ajinina('quitucho')}</g>${T(75, 122, 13, 'Quituchón', { f: 'Bree', a: 'middle' })}</g>
  <g transform="translate(176 502)"><rect width="150" height="132" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(15 0) scale(.6)">${ajinina('monte')}</g>${T(75, 122, 13, 'Montají', { f: 'Bree', a: 'middle' })}</g>
  ${boton(14, 656, 148, 'Ver otro', '#8a7a62')}${boton(178, 656, 148, 'Elijo a Ajinina', '#2f7d5b')}</g>`);

// ---------- DC1: desafío de capataz ----------
const sueloS = `<rect width="360" height="760" fill="#c9b46a"/>${Array.from({ length: 30 }, (_, i) => `<path d="M${(i * 83) % 350 + 5},${(i * 137) % 380 + 80} l3,-6 l3,6" stroke="#9a8a4a" stroke-width="1.4" fill="none"/>`).join('')}`;
const miniBicho = (x, y, col, n, vale) => `<g transform="translate(${x} ${y})" opacity="${vale ? 1 : .45}"><circle cx="20" cy="20" r="19" fill="#efe6d2" stroke="${vale ? O : '#c8362b'}" stroke-width="${vale ? 2 : 3}"/><circle cx="20" cy="20" r="12" fill="${col}"/>${T(20, 54, 10.5, n, { w: 800, a: 'middle' })}</g>`;
const DC1 = marco('dc1', `${sueloS}<g transform="translate(70 100) scale(.92)">${galponS()}</g><g transform="translate(150 230) scale(.3)">${anselmo()}</g><g transform="translate(190 300) scale(.3)">${jugador()}</g>
  ${hud('Galpón de Anselmo', 12, 'tarde', 'despejado')}<rect width="360" height="760" fill="#1b1a22" opacity=".25"/>
  <g transform="translate(8 330)">${busto(anselmo(), 'an1', 120, 140, 2.1)}<rect width="120" height="140" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></g>
  <g transform="translate(10 462)">${caja(0, 0, 340, 288)}${T(18, 30, 15, 'Desafío de Anselmo', { f: 'Bree', c: '#7a4a2a' })}${T(18, 54, 13.5, 'A ver qué hacés sin tu primer bicho.', { w: 800 })}
  <g transform="translate(12 66)"><rect width="316" height="40" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/>${T(12, 25, 13.5, 'Regla: sin tu inicial en el equipo', { w: 800 })}</g>
  ${miniBicho(14, 114, '#c8562a', 'Ajinina', false)}${[['#8a6a4a', 'Kirkallpa'], ['#e8c23a', 'Lucerna'], ['#9aa4ac', 'Pirkasol'], ['#5f7f32', 'Pasacán'], ['#6a9a7a', 'Miyurá']].map(([c, n], i) => miniBicho(68 + i * 52, 114, c, n, true)).join('')}
  ${T(18, 196, 12.5, 'Premio, una sola vez:', { w: 800, c: '#5a4636' })}<g transform="translate(160 176) scale(.62)">${N32.espuelas}</g>${T(196, 196, 14, 'Espuelas', { f: 'Bree' })}
  <g transform="translate(12 214)"><rect width="150" height="44" rx="14" fill="#c8562a" stroke="${O}" stroke-width="2"/>${T(75, 28, 13.5, 'Cambiar equipo', { w: 800, a: 'middle', c: '#fff' })}</g>
  <g transform="translate(178 214)"><rect width="150" height="44" rx="14" fill="#cfc6b4" stroke="#9a907e" stroke-width="2"/>${T(75, 28, 14, 'Pelear', { w: 800, a: 'middle', c: '#8a8070' })}</g>
  ${T(170, 278, 11.5, 'Sacá a Ajinina para poder pelear.', { w: 700, a: 'middle', c: '#c8362b' })}</g>`);

// ---------- DR1: derrota ----------
const DR1 = marco('dr1', `${interiorTop('posta', 'Posta de Cerrillos', postera)}<rect width="360" height="760" fill="#1b1a22" opacity=".12"/>
  <g transform="translate(10 470)">${caja(0, 0, 340, 270)}${T(18, 32, 15, 'Maestra de posta', { f: 'Bree', c: '#7a4a2a' })}${T(18, 62, 14, 'Te trajeron medio desmayado.', { w: 800 })}${T(18, 84, 14, 'Tus bichos ya están curados.', { w: 800 })}
  <g transform="translate(14 104)"><rect width="312" height="74" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/>${['#c8562a', '#8a6a4a', '#e8c23a', '#9aa4ac', '#5f7f32', '#6a9a7a'].map((c, i) => `<g transform="translate(${12 + i * 50} 10)"><circle cx="18" cy="18" r="17" fill="#efe6d2" stroke="${O}" stroke-width="1.8"/><circle cx="18" cy="18" r="11" fill="${c}"/><rect x="2" y="40" width="32" height="5" rx="2.5" fill="#2f9a5b"/></g>`).join('')}</g>
  ${T(18, 204, 12.5, 'No perdiste chirolas.', { w: 800, c: '#2f7d5b' })}
  ${boton(96, 216, 148, 'Seguir', '#2f7d5b')}</g>`);

// ---------- OP1: opciones ----------
const barra = (y, nom, v) => `${T(30, y, 14, nom, { w: 800 })}<rect x="30" y="${y + 12}" width="300" height="10" rx="5" fill="#e2d6bc" stroke="${O}" stroke-width="1.2"/><rect x="31" y="${y + 13}" width="${298 * v}" height="8" rx="4" fill="#c8962a"/><circle cx="${31 + 298 * v}" cy="${y + 17}" r="11" fill="#f4ead2" stroke="${O}" stroke-width="2"/>`;
const segmento = (y, nom, opts, sel) => `${T(30, y, 14, nom, { w: 800 })}<g transform="translate(30 ${y + 10})"><rect width="300" height="34" rx="17" fill="#e2d6bc" stroke="${O}" stroke-width="1.6"/>${opts.map((o, i) => `${i === sel ? `<rect x="${i * 100 + 3}" y="3" width="94" height="28" rx="14" fill="#f2b03a" stroke="${O}" stroke-width="1.4"/>` : ''}${T(i * 100 + 50, 22, 12.5, o, { w: 800, a: 'middle' })}`).join('')}</g>`;
const llave = (y, nom, nota, on) => `${T(30, y, 14, nom, { w: 800 })}${T(30, y + 20, 11.5, nota, { w: 600, c: '#6a5440' })}<g transform="translate(270 ${y - 16})"><rect width="58" height="32" rx="16" fill="${on ? '#2f7d5b' : '#cfc6b4'}" stroke="${O}" stroke-width="1.6"/><circle cx="${on ? 42 : 16}" cy="16" r="12" fill="#fff" stroke="${O}" stroke-width="1.4"/></g>`;
const OP1 = svg('0 0 360 760', `${fondo}${cab('Opciones')}${papel(14, 74, 332, 672)}
  ${barra(116, 'Música', .7)}${barra(172, 'Efectos', .85)}${barra(228, 'Voces de los bichos', .6)}
  ${segmento(292, 'Velocidad del texto', ['Lenta', 'Normal', 'Rápida'], 1)}
  ${llave(372, 'Menos movimiento', 'Frena animaciones y sacudidas.', false)}
  <path d="M30,412 L330,412" stroke="#d8c8a8" stroke-width="1.4"/>
  ${T(30, 444, 14, 'Código de partida', { w: 800 })}${T(30, 464, 11.5, 'Para jugar en otro teléfono o guardar una copia.', { w: 600, c: '#6a5440' })}
  ${boton(30, 480, 140, 'Copiar código', '#3f7f9a')}${boton(190, 480, 140, 'Cargar código', '#8a7a62')}
  <path d="M30,548 L330,548" stroke="#d8c8a8" stroke-width="1.4"/>
  ${boton(30, 570, 300, 'Cerrar sesión', '#c8562a')}
  ${T(180, 720, 11.5, 'Prototipo v1.0. By J. Pepe', { w: 700, a: 'middle', c: '#8a7458' })}`);

// ---------- CJ1: cómo se juega ----------
const CJ = [
  ['Caminá y tocá', 'Tocá el suelo para ir, o a la gente y los edificios para hablar y entrar.'],
  ['Bichos sueltos', 'Andan por el mapa. Tocalos para pelear y tirales la boleadora cuando el anillo se achica.'],
  ['Equipo de 6', 'Contra domadores, mates mezclados: salen 4 de cada lado al azar. Entrená a los 6.'],
  ['Changas', 'Pañuelo rojo en el poste: hay changa. Cumplila y volvé a cobrar.'],
  ['Capataz', 'Ganale para llevarte la medalla y la herramienta que abre su rincón.'],
];
const ilu = `<g transform="translate(180 250)"><circle r="96" fill="#efe6d2" stroke="${O}" stroke-width="2"/>${[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2, x = Math.cos(a) * 58, y = Math.sin(a) * 58; return `<g transform="translate(${(x - 23).toFixed(1)} ${(y - 28).toFixed(1)}) scale(.95)">${mateN}</g>`; }).join('')}<g class="giro" style="transform-origin:0px 0px"><path d="M-16,-6 C-8,-16 8,-16 16,-6" stroke="#c8962a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M16,6 C8,16 -8,16 -16,6" stroke="#c8962a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M12,-11 L17,-5 L10,-4Z M-12,11 L-17,5 L-10,4Z" fill="#c8962a"/></g></g>`;
const CJ1 = svg('0 0 360 760', `${fondo}${cab('Cómo se juega')}${papel(14, 74, 332, 600)}${ilu}
  ${T(180, 400, 20, `3. ${CJ[2][0]}`, { f: 'Bree', a: 'middle', c: '#7a4a2a' })}${T(180, 432, 14, 'Contra domadores, mates mezclados:', { w: 700, a: 'middle' })}${T(180, 454, 14, 'salen 4 de cada lado al azar.', { w: 700, a: 'middle' })}${T(180, 476, 14, 'Entrená a los 6.', { w: 700, a: 'middle' })}
  <g transform="translate(130 520)">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${i * 25}" cy="0" r="${i === 2 ? 7 : 5}" fill="${i === 2 ? '#c8962a' : '#d8c8a8'}" stroke="${O}" stroke-width="1.2"/>`).join('')}</g>
  ${boton(30, 580, 130, 'Anterior', '#8a7a62')}${boton(200, 580, 130, 'Siguiente', '#2f7d5b')}`);

// ---------- íconos de convite ----------
const chipa = `<path d="M4,34 C4,40 44,40 44,34 L40,26 L8,26Z" fill="#b8925e" stroke="${O}" stroke-width="2"/><path d="M8,30 L40,30" stroke="#8a6a3e" stroke-width="1.4"/>${[[15, 22, 8], [31, 22, 8], [23, 15, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e8b85a" stroke="${O}" stroke-width="1.8"/><path d="M${x - 4},${y - 2} C${x - 2},${y - 4} ${x + 1},${y - 4} ${x + 3},${y - 3}" stroke="#c88a2a" stroke-width="1.4" fill="none"/><circle cx="${x + 2}" cy="${y + 3}" r="1" fill="#c88a2a"/>`).join('')}`;
const tamal = `<path d="M12,20 C18,14 30,14 36,20 C38,24 38,28 36,30 C30,36 18,36 12,30 C10,28 10,24 12,20Z" fill="#e8d49a" stroke="${O}" stroke-width="2"/><path d="M15,22 C22,19 28,19 34,22 M15,28 C22,31 28,31 34,28" stroke="#c8b070" stroke-width="1.3" fill="none"/><path d="M12,21 C8,17 4,16 2,18 C4,22 4,28 2,32 C4,34 8,33 12,29Z M36,21 C40,17 44,16 46,18 C44,22 44,28 46,32 C44,34 40,33 36,29Z" fill="#d8c080" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/><path d="M12,20 L12,30 M36,20 L36,30" stroke="#8a6a3a" stroke-width="2.8" stroke-linecap="round"/>`;
const empanada = `<path d="M4,32 C4,18 16,10 24,10 C32,10 44,18 44,32Z" fill="#e8b85a" stroke="${O}" stroke-width="2"/><path d="M4,32 L44,32" stroke="${O}" stroke-width="2"/>${Array.from({ length: 9 }, (_, i) => { const t = i / 8, a = Math.PI * (1 - t), x = 24 + Math.cos(a) * 18, y = 31 - Math.sin(a) * 18; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.6" ry="1.6" fill="#d89a3a" stroke="${O}" stroke-width=".9" transform="rotate(${(90 - t * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('')}<path d="M14,26 C18,24 22,24 26,26" stroke="#c88a2a" stroke-width="1.2" fill="none"/>`;
const iconos = `<div class="ics">${[['Empanadas salteñas', empanada], ['Chipá', chipa], ['Tamales', tamal]].map(([n, d]) => `<figure class="ic"><div class="pap">${svg('0 0 48 48', d)}<div class="chico">${svg('0 0 48 48', d)}</div></div><figcaption>${n}</figcaption></figure>`).join('')}</div>`;

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Elegir la inicial</h3><p class="nota">En el rancho de Don Abel. Diálogo R2 corto; tocar un bicho abre su ficha con qué le pega fuerte y qué le cuesta.</p><div class="dos">${tel('IN1', 'Las tres iniciales', IN1, 'Ajinina (Fuego), Pasacán (Flora) y Yakusapo (Agua). Don Abel dice una sola línea.')}${tel('IN2', 'Confirmar', IN2, 'Ficha completa antes de confirmar: tipo, provincia, rol, las 4 estadísticas, pasiva, técnicas con su daño, a qué le pega fuerte y qué le cuesta, y sus dos caminos del nivel 4. Los números son de muestra: se fijan con el simulador en el ítem 4.')}</div></section>
<section><h3>Desafío de capataz, derrota</h3><div class="dos">${tel('DC1', 'Desafío de capataz', DC1, 'Se abre tocando al capataz después de ganarle. Muestra la regla, tu equipo con lo que no vale marcado en rojo y el premio. "Pelear" se apaga hasta que el equipo cumple la regla; "Cambiar equipo" lleva al corral.')}${tel('DR1', 'Derrota', DR1, 'Aparecés adentro de la última posta. La maestra de posta dice dos líneas, tus 6 bichos se ven con la vida llena y una línea verde aclara que no perdiste chirolas. Changas y domadores siguen como estaban.')}</div></section>
<section><h3>Opciones y Cómo se juega</h3><div class="dos">${tel('OP1', 'Opciones', OP1, 'Volumen de música, efectos y voces de los bichos; velocidad del texto; menos movimiento; código de partida para copiar o cargar; cerrar sesión. Abajo, la versión.')}${tel('CJ1', 'Cómo se juega', CJ1, 'Cinco tarjetas con dibujo animado: 1 Caminá y tocá; 2 Bichos sueltos (boleadora); 3 Equipo de 6 (mates); 4 Changas (pañuelo rojo); 5 Capataz (medalla y herramienta). Se pasan con Anterior y Siguiente.')}</div></section>
<section><h3>Íconos de convite</h3><p class="nota">Cada uno con forma propia: empanada con el repulgue por el borde, chipá en canasto (tres bollos con costra) y tamal acostado, envuelto en chala con las dos puntas atadas.</p>${iconos}</section>`;
const css2 = css + `.giro{animation:giro 3s linear infinite;transform-box:view-box}@keyframes giro{to{transform:rotate(360deg)}}.dos{display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:16px}@media (max-width:760px){.dos{grid-template-columns:1fr}}.ics{display:flex;gap:12px;flex-wrap:wrap}.ic{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px}.pap{background:#f1e3bd;border-radius:10px;padding:12px;display:flex;align-items:flex-end;gap:14px}.pap>svg{width:96px;height:96px}.chico svg{width:28px;height:28px}.ic figcaption{font-size:13px;font-weight:700;margin-top:6px}`;
writeFileSync(new URL('./catalogo-46.html', import.meta.url), pagina('Catálogo para aprobar, lote 17a', 'Pantallas que faltaban', cuerpo, css2));
console.log('ok 46');
