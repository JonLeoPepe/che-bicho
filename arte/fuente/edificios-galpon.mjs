// Galpones de capataz, uno por provincia (lote 15f). viewBox 0 0 240 200, piso y≈178. Sin letras ni cruces.
import { O, L } from './base-arte.mjs';
import { defsEd, sombraEd } from './edificios.mjs';
import { pirca, torta, cardon } from './edificios-jujuy.mjs';

let n = 0;
const id = (p) => `${p}g${n++}`;
// portón de tablas verticales, dos hojas, con bisagras de fleje
const porton = (x, y, w, h, c, c2, flejes = '#2a2624') => `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 4}" fill="${c2}" ${L(2)}/>
  ${[0, 1].map((k) => `<rect x="${x + k * w / 2}" y="${y}" width="${w / 2}" height="${h}" fill="${c}" ${L(2)}/>${Array.from({ length: 4 }, (_, i) => `<path d="M${x + k * w / 2 + (i + 1) * w / 10},${y + 2} L${x + k * w / 2 + (i + 1) * w / 10},${y + h}" stroke="${O}" stroke-width="1" opacity=".45"/>`).join('')}`).join('')}
  ${[0.2, 0.75].map((f) => `<path d="M${x + 3},${y + h * f} L${x + w / 2 - 6},${y + h * f} M${x + w / 2 + 6},${y + h * f} L${x + w - 3},${y + h * f}" stroke="${flejes}" stroke-width="3.4" stroke-linecap="round"/>`).join('')}
  <rect x="${x + w / 2 - 5}" y="${y + h * 0.48}" width="4" height="10" rx="1" fill="#d9b06a" ${L(1)}/><rect x="${x + w / 2 + 1}" y="${y + h * 0.48}" width="4" height="10" rx="1" fill="#d9b06a" ${L(1)}/>`;
const farol = (x, y) => `<path d="M${x - 8},${y - 6} L${x},${y - 6} L${x},${y}" stroke="${O}" stroke-width="2.2" fill="none"/><path d="M${x - 5},${y} L${x + 5},${y} L${x + 6},${y + 12} L${x - 6},${y + 12}Z" fill="#f2c25a" ${L(1.5)}/><path d="M${x - 7},${y + 12} L${x + 7},${y + 12}" stroke="${O}" stroke-width="2.4"/>`;
const rejilla = (x, y, w, h, marco, fondo = '#2e2a2a') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fondo}" stroke="${marco}" stroke-width="4"/>${Array.from({ length: Math.floor(w / 7) }, (_, i) => `<path d="M${x + 6 + i * 7},${y} L${x + 6 + i * 7},${y + h}" stroke="${marco}" stroke-width="1.8"/>`).join('')}<rect x="${x - 2}" y="${y}" width="${w + 4}" height="${h}" fill="none" ${L(1.4)}/>`;
const tinaja = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8,0 C-12,-8 -10,-18 -4,-20 L4,-20 C10,-18 12,-8 8,0Z" fill="#b4683a" ${L(1.6)}/><path d="M-5,-20 L5,-20 L4,-24 L-4,-24Z" fill="#a05a32" ${L(1.4)}/><path d="M-8,-10 L8,-10" stroke="#e2c49a" stroke-width="1.6"/></g>`;
const fardo = (x, y) => `<rect x="${x}" y="${y}" width="34" height="18" rx="2" fill="#d8b85a" ${L(1.6)}/><path d="M${x + 11},${y} L${x + 11},${y + 18} M${x + 23},${y} L${x + 23},${y + 18}" stroke="#8a5a32" stroke-width="1.8"/><path d="M${x + 3},${y + 7} L${x + 31},${y + 6} M${x + 3},${y + 13} L${x + 31},${y + 12}" stroke="#b8963a" stroke-width="1"/>`;

// G1 Salta: galpón de estancia de adobe con frontón a dos aguas y tejas coloniales
export function galponS() {
  const k = id('gs');
  const muro = 'M22,178 L22,96 L120,48 L218,96 L218,178Z';
  const tejas = (x0, y0, x1, y1) => { const dx = x1 - x0, dy = y1 - y0, nT = 12; return Array.from({ length: nT }, (_, i) => { const t = i / nT, px = x0 + dx * t, py = y0 + dy * t; return `<path d="M${(px).toFixed(1)},${(py - 3).toFixed(1)} q${(dx / nT / 2).toFixed(1)},-7 ${(dx / nT).toFixed(1)},${(dy / nT).toFixed(1)}" fill="none" stroke="#8e3a22" stroke-width="1.4"/>`; }).join(''); };
  return `${defsEd}${sombraEd(14, 222, 178)}
  <clipPath id="${k}"><path d="${muro}"/></clipPath><path d="${muro}" fill="url(#adb)" ${L(2.4)}/>
  <g clip-path="url(#${k})"><path d="M22,96 L120,48 L218,96 L218,110 L120,62 L22,110Z" fill="url(#alero)"/><path d="M22,150 L218,150 L218,178 L22,178Z" fill="#a87a4e" opacity=".55"/></g>
  <path d="M8,106 L120,46 L232,106 L232,92 L120,32 L8,92Z" fill="#c0553a" ${L(2.4)}/>
  ${Array.from({ length: 15 }, (_, i) => { const t = (i + .5) / 15; const xa = 8 + 112 * t, ya = 92 - 60 * t, xb = 232 - 112 * t, yb = 92 - 60 * t; return `<path d="M${xa.toFixed(1)},${ya.toFixed(1)} l0,14 M${xb.toFixed(1)},${yb.toFixed(1)} l0,14" stroke="#8e3a22" stroke-width="1.6"/>`; }).join('')}
  <path d="M8,99 L120,39 L232,99" stroke="#e08a62" stroke-width="1.6" fill="none" opacity=".8"/><path d="M112,36 L120,31 L128,36 L128,44 L120,40 L112,44Z" fill="#a8452c" ${L(1.6)}/>
  ${rejilla(104, 70, 32, 18, '#5a3a22')}
  ${porton(78, 108, 84, 70, '#7a4a2a', '#4a2e1a')}
  ${rejilla(36, 118, 24, 28, '#5a3a22')}${rejilla(180, 118, 24, 28, '#5a3a22')}
  ${farol(70, 104)}${farol(178, 104)}
  ${fardo(26, 160)}${fardo(180, 160)}`;
}

// G2 Corrientes: galpón de ladrillo con techo de chapa a dos aguas y galería de postes de quebracho
export function galponC() {
  const k = id('gc');
  const muro = 'M24,178 L24,92 L120,52 L216,92 L216,178Z';
  return `${defsEd}${sombraEd(12, 226, 178)}
  <clipPath id="${k}"><path d="${muro}"/></clipPath><path d="${muro}" fill="url(#ladr)" ${L(2.4)}/>
  <g clip-path="url(#${k})"><path d="M24,92 L120,52 L216,92 L216,104 L120,64 L24,104Z" fill="url(#alero)"/></g>
  <path d="M12,98 L120,46 L228,98 L228,90 L120,38 L12,90Z" fill="url(#chapa)" ${L(2.4)}/>
  ${rejilla(106, 66, 28, 16, '#3f7f9a')}
  <path d="M6,124 L234,124 L234,136 L6,136Z" fill="url(#chapa)" ${L(2.2)}/><path d="M6,136 L234,136 L234,146 L6,146Z" fill="url(#alero)"/>
  ${[14, 66, 174, 226].map((x) => `<rect x="${x - 4}" y="136" width="8" height="42" fill="#6a4a30" ${L(1.6)}/>`).join('')}
  ${porton(84, 104, 72, 74, '#3f7f5a', '#2a5a3e', '#1f2a24')}
  ${rejilla(34, 146, 24, 26, '#3f7f9a', '#2e2a2a')}${rejilla(182, 146, 24, 26, '#3f7f9a', '#2e2a2a')}
  ${farol(78, 142)}${farol(170, 142)}
  ${tinaja(26, 178, .8)}`;
}

// G3 Jujuy: galpón bajo de pirca y adobe, techo plano de torta con vigas, portón de cardón y corral de pirca pegado
export function galponJ() {
  return `${defsEd}${sombraEd(6, 228, 178)}
  ${pirca(150, 150, 84, 28)}
  <rect x="20" y="86" width="164" height="92" fill="url(#adb)" ${L(2.4)}/><rect x="20" y="86" width="164" height="14" fill="url(#alero)"/>
  ${pirca(20, 146, 164, 32)}<rect x="20" y="146" width="164" height="32" fill="none" ${L(2.2)}/>
  ${torta(20, 74, 164, 9)}
  ${cardon(64, 110, 36, 68)}${cardon(104, 110, 36, 68)}<rect x="60" y="106" width="84" height="6" fill="#8a6a46" ${L(1.6)}/>
  <path d="M68,128 L96,128 M108,128 L136,128 M68,160 L96,160 M108,160 L136,160" stroke="#2a2624" stroke-width="3.2" stroke-linecap="round"/>
  ${rejilla(30, 108, 22, 20, '#caa66c')}${rejilla(152, 108, 22, 20, '#caa66c')}
  <g transform="translate(26 132)"><rect width="30" height="6" fill="#c8562a" ${L(1.2)}/>${['#e8a23a', '#2f7d5b', '#7a3a6a'].map((c, i) => `<rect y="${6 + i * 5}" width="30" height="5" fill="${c}"/>`).join('')}<rect width="30" height="21" fill="none" ${L(1.2)}/></g>
  ${tinaja(160, 178, .85)}${farol(58, 100)}`;
}

// Tinglado de la Rural, sede del Torneo del Norte (Salta capital). Techo de chapa en arco, frente de ladrillo y gradas a los costados.
export function tinglado() {
  const k = id('tr');
  const arco = 'M8,112 C8,40 232,40 232,112Z';
  return `${defsEd}${sombraEd(2, 238, 178)}
  ${[0, 1, 2].map((i) => `<rect x="${-2 + i * 0}" y="${130 + i * 14}" width="26" height="12" fill="#b8a07a" ${L(1.4)}/><rect x="${216}" y="${130 + i * 14}" width="26" height="12" fill="#b8a07a" ${L(1.4)}/>`).join('')}
  <rect x="16" y="106" width="208" height="72" fill="url(#ladr)" ${L(2.4)}/>
  <clipPath id="${k}"><path d="${arco}"/></clipPath><path d="${arco}" fill="#b8bcc0" ${L(2.4)}/>
  <g clip-path="url(#${k})">${Array.from({ length: 22 }, (_, i) => `<path d="M${10 + i * 10},40 L${10 + i * 10},112" stroke="#8a9095" stroke-width="2"/>`).join('')}<path d="M8,112 C8,60 232,60 232,112" fill="none" stroke="#d8dce0" stroke-width="3" opacity=".6"/></g>
  <path d="M8,112 L232,112" stroke="${O}" stroke-width="2.4"/>
  <path d="M84,178 L84,124 C84,104 156,104 156,124 L156,178Z" fill="#3a2a22" ${L(2.2)}/>${porton(88, 124, 64, 54, '#7a4a2a', '#4a2e1a')}
  ${rejilla(34, 124, 30, 22, '#5a3a22')}${rejilla(176, 124, 30, 22, '#5a3a22')}
  ${farol(80, 118)}${farol(168, 118)}`;
}

// Posta colonial de Salta (versión suelta del mapa v2): muro encalado, techo de tejas, galería con columnas y espadaña con campana.
export function postaSalta() {
  const tej = Array.from({ length: 5 }, (_, r) => Array.from({ length: 21 }, (_, c) => `<path d="M${8 + c * 11 + (r % 2) * 5},${62 + r * 8} q5.5,-6 11,0" fill="none" stroke="#8e3a22" stroke-width="1.3"/>`).join('')).join('');
  return `${defsEd}${sombraEd(10, 236, 178)}
  <rect x="16" y="98" width="208" height="80" fill="#efe6d4" ${L(2.4)}/><rect x="16" y="160" width="208" height="18" fill="#8a3a2a" ${L(2)}/>
  <rect x="104" y="16" width="32" height="44" fill="#efe6d4" ${L(2.2)}/><path d="M100,18 L120,6 L140,18Z" fill="#c0553a" ${L(2)}/><path d="M112,48 L112,32 C112,24 128,24 128,32 L128,48Z" fill="#3a2a22" ${L(1.6)}/><path d="M116,40 C116,34 124,34 124,40 L125,43 L115,43Z" fill="#d8a23a" ${L(1.2)}/>
  <path d="M6,60 L234,60 L238,100 L2,100Z" fill="#c0553a" ${L(2.4)}/>${tej}<path d="M4,100 L236,100" stroke="#8e3a22" stroke-width="5"/>
  <rect x="10" y="100" width="220" height="10" fill="#6b4a2e" ${L(1.6)}/>
  ${[22, 70, 162, 210].map((x) => `<rect x="${x - 4}" y="110" width="8" height="58" fill="#e2d6bc" ${L(1.6)}/><rect x="${x - 6}" y="106" width="12" height="5" fill="#c8bea8" ${L(1.2)}/>`).join('')}
  <path d="M100,178 L100,124 C100,112 140,112 140,124 L140,178Z" fill="#3f6e5a" ${L(2)}/><path d="M120,118 L120,178" stroke="${O}" stroke-width="1.4"/><circle cx="114" cy="148" r="2" fill="#d8b06a"/><circle cx="126" cy="148" r="2" fill="#d8b06a"/>
  ${rejilla(36, 124, 22, 28, '#3f6e5a')}${rejilla(182, 124, 22, 28, '#3f6e5a')}
  <path d="M150,178 C150,168 168,168 168,178Z" fill="#7aa8c8" ${L(1.6)}/>${farol(96, 116)}`;
}

// Terminal con el ómnibus estacionado al costado (todas las terminales lo muestran). viewBox 0 0 392 230.
export function conMicro(terminalF, microF, color = null) {
  let m = microF();
  if (color) m = m.replace(/#b3261e/g, color[0]).replace(/#8a1f1a/g, color[1]).replace(/#e04a3a/g, color[2]);
  return `<g transform="translate(0 0) scale(.92)">${terminalF()}</g><g transform="translate(206 62) scale(.76)">${m}</g>`;
}
