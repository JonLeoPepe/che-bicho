// Catálogo para aprobar, lote 14b: Menú del juego y Libreta (lista y ficha de especie).
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
import { lucerna } from './luciernaga.mjs';
import { kapiyva, guasu } from './catalogo-10.mjs';
import { qaqapuma } from './catalogo-19.mjs';
import { insig, G } from './marcas.mjs';

export const O = '#2a1c15';
export const T = (x, y, s, txt, { f = 'Nunito', w = 400, c = '#3a2414', a = 'start', st = '' } = {}) => `<text x="${x}" y="${y}" font-family="${f}" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="${a}" ${st ? `font-style="${st}"` : ''}>${txt}</text>`;
const cuero = `<pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern>`;
const sil = `<filter id="sil"><feFlood flood-color="#5a4434"/><feComposite in2="SourceAlpha" operator="in"/></filter>`;
export const fondo = `<defs>${cuero}${sil}</defs><rect width="360" height="760" rx="26" fill="url(#cuero)"/>`;
const volver = `<g transform="translate(16 18)"><circle cx="18" cy="18" r="18" fill="#7a4a2a" stroke="${O}" stroke-width="2"/><path d="M22,10 L13,18 L22,26" stroke="#fbf3e2" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
export const cab = (txt) => `${volver}${T(180, 44, 21, txt, { f: 'Bree', a: 'middle', c: '#fbf3e2' })}`;
export const papel = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/>`;
export const chipTipo = (x, y, t) => `<rect x="${x}" y="${y}" width="${t.length * 6.6 + 14}" height="17" rx="8.5" fill="${COLOR_TIPO[t]}" stroke="${O}" stroke-width="1"/>${T(x + 7, y + 12.5, 10, t, { w: 800, c: '#fff' })}`;
export const PROV = { Salta: '#b8432e', Corrientes: '#2f7d5b', Jujuy: '#7a5aa8' };
export const chipProv = (xd, y, p, izq = false) => { const w = p.length * 6.4 + 22; return `<g transform="translate(${izq ? xd : xd - w} ${y})"><rect width="${w}" height="17" rx="8.5" fill="#fffaf0" stroke="${PROV[p]}" stroke-width="1.6"/><circle cx="9" cy="8.5" r="3.6" fill="${PROV[p]}"/>${T(16, 12.5, 10, p, { w: 800, c: PROV[p] })}</g>`; };
export const tilde = (x, y, r = 9) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#2f9a5b" stroke="${O}" stroke-width="1.4"/><path d="M${-r * .45},0 L${-r * .1},${r * .38} L${r * .48},${-r * .36}" stroke="#fff" stroke-width="${r * .28}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;

// ---------- T6 Menú ----------
const ic = {
  equipo: `<ellipse cx="24" cy="31" rx="11" ry="9" fill="#c8562a" stroke="${O}" stroke-width="2"/>${[[9, 19], [17, 11], [31, 11], [39, 19]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.6" ry="5.6" fill="#c8562a" stroke="${O}" stroke-width="2"/>`).join('')}`,
  libreta: `<path d="M6,10 L24,14 L42,10 L42,40 L24,44 L6,40Z" fill="#fffaf0" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/><path d="M24,14 L24,44" stroke="${O}" stroke-width="2"/><path d="M11,20 L19,22 M11,27 L19,29 M29,22 L37,20 M29,29 L37,27" stroke="#9a7a5a" stroke-width="2" stroke-linecap="round"/>`,
  mochila: `<path d="M17,10 C17,3 31,3 31,10" stroke="${O}" stroke-width="3" fill="none"/><rect x="8" y="10" width="32" height="34" rx="9" fill="#a8743a" stroke="${O}" stroke-width="2.2"/><path d="M8,22 C14,28 34,28 40,22 L40,16 L8,16Z" fill="#7a4a2a" stroke="${O}" stroke-width="2"/><circle cx="24" cy="26" r="2.6" fill="#f2b03a" stroke="${O}" stroke-width="1.2"/>`,
  cinto: `<rect x="2" y="16" width="44" height="16" rx="4" fill="#5e351c" stroke="${O}" stroke-width="2"/>${[10, 24, 38].map((x) => `<circle cx="${x}" cy="24" r="6" fill="#d8dde2" stroke="${O}" stroke-width="1.8"/><circle cx="${x}" cy="24" r="2.2" fill="#9aa4ac"/>`).join('')}`,
  personaje: `<path d="M10,46 L14,26 C16,20 32,20 34,26 L38,46Z" fill="#a8322a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M13,40 L35,40" stroke="#1f1a18" stroke-width="2.4"/><circle cx="24" cy="15" r="7" fill="#cf9a72" stroke="${O}" stroke-width="2"/><path d="M10,9 C10,6 38,6 38,9 C38,11 10,11 10,9Z M17,8 C17,1 31,1 31,8Z" fill="#6b4a2e" stroke="${O}" stroke-width="1.8"/>`,
  mapa: `<path d="M4,10 L17,6 L31,10 L44,6 L44,38 L31,42 L17,38 L4,42Z" fill="#e9d9a8" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/><path d="M17,6 L17,38 M31,10 L31,42" stroke="#b89a5a" stroke-width="1.6"/><path d="M9,34 C15,26 22,30 27,22 C31,16 36,18 39,13" stroke="#c8562a" stroke-width="2.4" stroke-dasharray="3 3" fill="none"/><circle cx="39" cy="13" r="3" fill="#c8562a" stroke="${O}" stroke-width="1.2"/>`,
  como: `<rect x="6" y="10" width="24" height="32" rx="4" fill="#fffaf0" stroke="${O}" stroke-width="2" transform="rotate(-12 18 26)"/><rect x="18" y="8" width="24" height="32" rx="4" fill="#f2b03a" stroke="${O}" stroke-width="2" transform="rotate(8 30 24)"/><circle cx="30" cy="24" r="5" fill="#fffaf0" stroke="${O}" stroke-width="1.4"/>`,
  opciones: `<g transform="translate(24 24)">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="-4.5" y="-21" width="9" height="10" rx="2" fill="#9aa4ac" stroke="${O}" stroke-width="1.8" transform="rotate(${a})"/>`).join('')}<circle r="14" fill="#9aa4ac" stroke="${O}" stroke-width="2"/><circle r="5.5" fill="#f4ead2" stroke="${O}" stroke-width="1.8"/></g>`,
  salir: `<rect x="8" y="5" width="22" height="38" rx="2" fill="#7a4a2a" stroke="${O}" stroke-width="2.2"/><path d="M8,5 L22,10 L22,46 L8,43Z" fill="#a8743a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M28,24 L44,24 M38,18 L44,24 L38,30" stroke="#c8562a" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};
const losas = [['equipo', 'Equipo', '6 bichos'], ['libreta', 'Libreta', '14 de 105'], ['mochila', 'Mochila', '23 cosas'], ['personaje', 'Personaje', 'pilchas, cinto y apero'], ['mapa', 'Mapa', 'Cafayate, Salta'], ['como', 'Cómo se juega', '5 tarjetas'], ['opciones', 'Opciones', 'sonido y partida'], ['salir', 'Salir', 'al inicio']];
export const moneda = (x, y) => `<g transform="translate(${x} ${y})"><circle r="12" fill="#f2b03a" stroke="${O}" stroke-width="1.6"/><circle r="9.4" fill="none" stroke="#c88a1a" stroke-width="1.2"/><path d="M-5,-1.5 C-7.5,4 -4,8 0,8 C4,8 7.5,4 5,-1.5Z" fill="#b8761a"/><path d="M-5.4,-2 L5.4,-2" stroke="#b8761a" stroke-width="2.2" stroke-linecap="round"/><path d="M1.5,-2 L5,-8.5" stroke="#b8761a" stroke-width="1.8" stroke-linecap="round"/><path d="M-3,2 C-3,4.5 -1.5,5.5 0,5.8" stroke="#f8d27a" stroke-width="1.2" fill="none" stroke-linecap="round"/></g>`;
const menu = svg('0 0 360 760', `${fondo}${cab('Menú')}
  ${papel(20, 72, 320, 100)}${T(38, 102, 19, 'Jonathan', { f: 'Bree' })}${T(38, 124, 12, 'Salta ★, 12 h 40 min jugadas', { c: '#5a3e28' })}
  ${moneda(236, 97)}${T(322, 102, 15, '1.250', { f: 'Bree', a: 'end' })}${T(322, 124, 11, 'chirolas', { w: 800, a: 'end', c: '#5a3e28' })}
  <path d="M38,138 L322,138" stroke="#d9ccb4" stroke-width="1.4"/>${T(38, 158, 11.5, 'Insignias', { w: 800, c: '#5a3e28' })}${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${112 + i * 27}" cy="154" r="9" fill="${i < 2 ? '#d8dde2' : '#e9e0cc'}" stroke="${i < 2 ? O : '#c9b48a'}" stroke-width="1.4" stroke-dasharray="${i < 2 ? '' : '3 3'}"/>`).join('')}
  ${losas.map(([k, n, s], i) => { const x = 20 + (i % 2) * 166, y = 190 + Math.floor(i / 2) * 126; return `<g transform="translate(${x} ${y})"><rect y="4" width="154" height="112" rx="16" fill="${O}"/><rect width="154" height="112" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.2"/><g transform="translate(53 12)">${ic[k]}</g>${T(77, 84, 16, n, { f: 'Bree', a: 'middle' })}${T(77, 102, 11, s, { w: 800, a: 'middle', c: '#8a6a4a' })}</g>`; }).join('')}
  ${T(180, 712, 11.5, 'La partida se guarda sola cada vez que cambiás de lugar.', { a: 'middle', c: '#e9d9b8' })}`);

// ---------- T7 Libreta: lista por familias ----------
const caja = (x, y, dib, est, nombre) => {
  const cuerpo = est === 'sin' ? `<g filter="url(#sil)" opacity=".85">${dib}</g>` : dib;
  return `<g transform="translate(${x} ${y})"><rect width="84" height="66" rx="10" fill="${est === 'sin' ? '#e4d8bf' : '#fffaf0'}" stroke="${est === 'atr' ? '#2f9a5b' : '#c9b48a'}" stroke-width="${est === 'atr' ? 2.4 : 1.6}"/><g transform="translate(12 2) scale(.31)">${cuerpo}</g>${est === 'atr' ? tilde(76, 8, 8) : ''}
  ${est === 'sin' ? T(42, 80, 11, 'Sin ver', { a: 'middle', c: '#9a8a74', w: 800 }) : T(42, 80, 11.5, nombre, { a: 'middle', w: 800 })}</g>`;
};
const familia = (y, tipo, prov, [b, c1, c2]) => `<g transform="translate(16 ${y})">${papel(0, 0, 328, 118)}${chipTipo(12, 9, tipo)}${chipProv(12 + tipo.length * 6.6 + 22, 9, prov, true)}
  ${caja(12, 30, ...b)}<path d="M100,63 L118,63" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/><path d="M113,58 L119,63 L113,68" stroke="${O}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${T(219, 22, 10, 'caminos en Nv 4', { w: 800, a: 'middle', c: '#8a6a4a' })}${caja(128, 30, ...c1)}${caja(224, 30, ...c2)}</g>`;
const libreta = svg('0 0 360 760', `${fondo}${cab('Libreta')}
  ${T(180, 78, 13, '14 atrapados y 23 vistos de 105', { w: 800, a: 'middle', c: '#f2d9a8' })}
  ${['Todas', 'Salta', 'Corrientes', 'Jujuy'].map((p, i) => { const w = [64, 64, 96, 64][i], x = [20, 92, 164, 268][i]; return `<g transform="translate(${x} 92)"><rect width="${w}" height="30" rx="15" fill="${i === 0 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${i ? `<circle cx="13" cy="15" r="4.4" fill="${PROV[p]}"/>` : ''}${T(i ? w / 2 + 6 : w / 2, 20, 12, p, { w: 800, a: 'middle' })}</g>`; }).join('')}
  <g transform="translate(0 150)">${tilde(34, 0, 8)}${T(48, 4.5, 11.5, 'Atrapado', { w: 800, c: '#f4ead2' })}<rect x="128" y="-8" width="16" height="16" rx="4" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.6"/>${T(150, 4.5, 11.5, 'Visto', { w: 800, c: '#f4ead2' })}<rect x="210" y="-8" width="16" height="16" rx="4" fill="#5a4434"/>${T(232, 4.5, 11.5, 'Sin ver (silueta)', { w: 800, c: '#f4ead2' })}</g>
  ${familia(172, 'Rayo', 'Salta', [[lucerna(), 'atr', 'Lucerna'], [lucerna('destello'), 'vis', 'Destellón'], [lucerna('farol'), 'sin']])}
  ${familia(298, 'Común', 'Corrientes', [[kapiyva(), 'atr', 'Kapiyvá'], [kapiyva('tranquilo'), 'atr', 'Pachorra'], [kapiyva('nadador'), 'vis', 'Chapuzón']])}
  ${familia(424, 'Flora', 'Corrientes', [[guasu(), 'vis', 'Guasú'], [guasu('pantano'), 'sin'], [guasu('cornamenta'), 'sin']])}
  ${familia(550, 'Tierra', 'Jujuy', [[puma(), 'atr', 'Allpuma'], [puma({ fin: true }), 'vis', 'Apu Puma'], [qaqapuma(), 'sin']])}
  <rect x="16" y="682" width="328" height="56" rx="14" fill="#4e2a14" opacity=".9"/>${T(180, 706, 11.5, 'Deslizá para ver las 35 familias.', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 724, 11.5, 'Tocá un bicho para abrir su página.', { a: 'middle', c: '#e9d9b8' })}`);

// ---------- T8 Libreta: página de una especie ----------
const dato = (y, etq, val) => `${T(38, y, 11.5, etq, { w: 800, c: '#8a6a4a' })}${T(122, y, 12.5, val, { w: 800 })}`;
const mini = (x, y, dib, est, n, sub) => `<g transform="translate(${x} ${y})"><rect width="84" height="74" rx="10" fill="${est === 'sin' ? '#e4d8bf' : '#fffaf0'}" stroke="${est === 'atr' ? '#2f9a5b' : '#c9b48a'}" stroke-width="${est === 'atr' ? 2.4 : 1.6}"/><g transform="translate(10 2) scale(.32)">${est === 'sin' ? `<g filter="url(#sil)">${dib}</g>` : dib}</g>${est === 'atr' ? tilde(76, 8, 8) : ''}${T(42, 92, 11.5, n, { w: 800, a: 'middle' })}${T(42, 106, 10, sub, { a: 'middle', c: '#8a6a4a' })}</g>`;
const pagina8 = svg('0 0 360 760', `${fondo}${cab('Libreta')}
  ${papel(16, 70, 328, 658)}${T(36, 100, 11.5, 'N.º 43', { w: 800, c: '#8a6a4a' })}${T(36, 126, 24, 'Kapiyvá', { f: 'Bree' })}${chipTipo(36, 138, 'Común')}${chipProv(324, 86, 'Corrientes')}${tilde(312, 128, 11)}${T(296, 133, 11.5, 'Atrapado', { w: 800, a: 'end', c: '#2f9a5b' })}
  <ellipse cx="180" cy="290" rx="92" ry="12" fill="#d9ccb4"/><g transform="translate(92 120) scale(.88)">${kapiyva()}</g>
  ${T(180, 330, 12.5, 'Carpincho manso que pasa la siesta en el agua.', { a: 'middle', c: '#3a2414' })}
  <path d="M36,348 L324,348" stroke="#d9ccb4" stroke-width="1.4"/>
  ${dato(374, 'De dónde es', 'Corrientes, esteros y lagunas')}${dato(398, 'Cuándo sale', 'de día, con sol o nublado')}${dato(422, 'Atrapados', '2 (el mejor, Nv 7)')}
  <path d="M36,440 L324,440" stroke="#d9ccb4" stroke-width="1.4"/>${T(36, 464, 14, 'Sus caminos', { f: 'Bree' })}${T(324, 464, 11, 'se elige en Nv 4', { w: 800, a: 'end', c: '#8a6a4a' })}
  ${mini(36, 478, kapiyva(), 'atr', 'Kapiyvá', 'base')}<path d="M124,515 L136,515 M131,510 L137,515 L131,520" stroke="${O}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${mini(142, 478, kapiyva('tranquilo'), 'atr', 'Pachorra', 'camino 1')}${mini(240, 478, kapiyva('nadador'), 'vis', 'Chapuzón', 'camino 2')}
  <g transform="translate(36 610)"><rect y="4" width="288" height="48" rx="14" fill="${O}"/><rect width="288" height="48" rx="14" fill="#c8562a" stroke="${O}" stroke-width="2.4"/>${T(144, 30, 15, 'Ver fuerzas y técnicas', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}</g>
  ${T(180, 690, 11, 'Abre la misma ficha que ves en combate,', { a: 'middle', c: '#5a3e28' })}${T(180, 706, 11, 'con todo lo que ya descubriste del bicho.', { a: 'middle', c: '#5a3e28' })}`);


// ---------- T9 Fuerzas y técnicas (C5 abierta desde la libreta) ----------
export const ico = (k, color, x, y, s = 22) => `<g transform="translate(${x} ${y})">${insig(COLOR_TIPO[color] || color, G[k]).replace('<svg ', `<svg width="${s}" height="${s}" `)}</g>`;
export const barra = (y, nom, v) => `${T(34, y, 11.5, nom, { c: '#5a3e28' })}<rect x="104" y="${y - 9}" width="150" height="9" rx="4.5" fill="#d9ccb4"/><rect x="104" y="${y - 9}" width="${(v - 60) / 80 * 150}" height="9" rx="4.5" fill="#c8562a"/>${T(326, y, 11.5, v, { w: 800, a: 'end' })}`;
export const pts = (y, nom, n) => `${T(34, y, 11.5, nom, { c: '#5a3e28' })}${[0, 1, 2, 3, 4].map((i) => `<circle cx="${110 + i * 14}" cy="${y - 4}" r="5" fill="${i < n ? '#2f6a8a' : '#d9ccb4'}"/>`).join('')}`;
export const rombos = (x, y, n) => n ? [...Array(n)].map((_, i) => `<path d="M${x + i * 11},${y - 9} l4.5,4.5 l-4.5,4.5 l-4.5,-4.5Z" fill="#2f6a8a"/>`).join('') : T(x - 4, y, 11, 'gratis', { c: '#8a7a6a', w: 800 });
export const tec = (y, n, tipo, ag, f, marca) => `${T(34, y, 12, n, { w: 800 })}${T(122, y, 11.5, tipo, { w: 800, c: COLOR_TIPO[tipo] })}${rombos(184, y, ag)}${marca ? ico(marca, tipo, 226, y - 14, 18) : ''}${T(326, y, 12, f, { w: 800, a: 'end' })}`;
export const sec = (y, t) => T(34, y, 13.5, t, { f: 'Bree' });
const fuerzas = svg('0 0 360 760', `${fondo}${cab('Libreta')}${papel(16, 70, 328, 672)}
  ${T(34, 100, 21, 'Kapiyvá', { f: 'Bree' })}${chipTipo(34, 110, 'Común')}${T(34, 146, 11.5, 'Carpincho de Corrientes', { c: '#5a3e28' })}${T(34, 162, 11.5, 'Rareza: común ★', { c: '#5a3e28' })}
  <g transform="translate(232 72) scale(.48)">${kapiyva()}</g><path d="M34,176 L326,176" stroke="#d9ccb4" stroke-width="1.4"/>
  ${sec(198, 'Fuerzas')}${barra(218, 'Vida', 120)}${barra(236, 'Ataque', 85)}${barra(254, 'Defensa', 95)}
  ${pts(278, 'Velocidad', 3)}${pts(296, 'Crítico', 3)}${pts(314, 'Amague', 3)}${T(326, 296, 11, 'ritmo parejo', { w: 800, a: 'end', c: '#8a6a4a' })}
  ${sec(344, 'Marcas')}${ico('furia', '#c8562a', 34, 354, 24)}${T(64, 371, 11.5, 'Inmune a Furia', { c: '#5a3e28' })}${ico('mojado', 'Agua', 180, 354, 24)}${T(210, 371, 11.5, 'Resiste Mojado', { c: '#5a3e28' })}
  ${sec(404, 'Tipos')}${T(34, 424, 11.5, '▲ Le pegan fuerte: ningún tipo', { w: 800, c: '#2f7d3b' })}${T(34, 442, 11.5, '▼ Le hacen poco: Mito', { w: 800, c: '#8a5a4a' })}${T(34, 460, 11.5, '⚠ Pega fuerte a: ningún tipo; poco a Roca', { w: 800, c: '#a8322a' })}
  ${sec(490, 'Técnicas')}${T(122, 490, 9.5, 'tipo', { w: 800, c: '#8a7a6a' })}${T(180, 490, 9.5, 'aguante', { w: 800, c: '#8a7a6a' })}${T(226, 490, 9.5, 'marca', { w: 800, c: '#8a7a6a' })}${T(326, 490, 9.5, 'daño', { w: 800, a: 'end', c: '#8a7a6a' })}
  ${tec(512, 'Topetazo', 'Común', 0, 40)}${tec(532, 'Revolcón', 'Común', 1, 45)}${tec(552, 'Embestida', 'Común', 2, 70)}${tec(572, 'Chapoteo', 'Agua', 2, 60, 'mojado')}
  ${sec(604, 'Pasivas')}${T(34, 624, 11.5, 'Fija: Cuero duro (−10 % de daño recibido)', { c: '#5a3e28' })}${T(34, 642, 11.5, 'En Nv 3 elegís: Tozudo o Solero', { c: '#5a3e28' })}
  ${sec(670, 'Salvaje')}${T(118, 670, 11.5, 'manso, paciencia de 8 turnos', { c: '#5a3e28' })}
  <g transform="translate(34 684)"><rect y="4" width="292" height="40" rx="13" fill="${O}"/><rect width="292" height="40" rx="13" fill="#7a4a2a" stroke="${O}" stroke-width="2.2"/>${T(146, 26, 14, 'Volver a la libreta', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}</g>`);

export const tel = (cod, nom, dib, txt) => `<figure class="tel"><span class="cod">${cod}</span>${dib}<figcaption><b>${nom}</b><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Siguen: ficha de mi bicho y mochila (14c), tiendas y corral (14d).</div>
<section><div class="tres">
${tel('T6', 'Menú', menu, 'Se abre desde el juego. Arriba, tu nombre, tiempo, chirolas e insignias. Ocho losas grandes con ícono y un dato útil abajo. Personaje reemplaza a Cinto: adentro están las pilchas, el cinto y el apero.')}
${tel('T7', 'Libreta', libreta, 'Todas las especies agrupadas por familia: el bicho base y sus dos caminos. Tilde verde si lo atrapaste, a color si solo lo viste, silueta si nunca lo viste. Cada familia dice su tipo y de qué provincia es. Se filtra por provincia.')}
${tel('T8', 'Página de una especie', pagina8, 'De dónde es y cuándo sale (hora y clima), cuántos atrapaste y sus caminos. El botón abre la ficha de fuerzas y técnicas, la misma del combate (C5).')}
${tel('T9', 'Fuerzas y técnicas', fuerzas, 'La ficha C5 abierta desde la libreta. Como el Kapiyvá ya está atrapado, se ve todo. El botón vuelve a la libreta en vez de al combate.')}
</div></section>`;
export const css = `.tres{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.tel{margin:0;position:relative}.tel svg{width:100%;height:auto;border-radius:22px;box-shadow:0 8px 22px rgba(0,0,0,.25)}.tel .cod{position:absolute;top:-10px;left:-6px;z-index:2}.tel figcaption b{font-family:Bree,serif;font-size:17px}.tel p{font-size:13px;color:#5a4636;margin:4px 0 0}@media (max-width:760px){.tres{grid-template-columns:1fr 1fr}}`;
writeFileSync(new URL('./catalogo-29.html', import.meta.url), pagina('Catálogo para aprobar, lote 14b', 'Menú del juego y Libreta', cuerpo, css));
