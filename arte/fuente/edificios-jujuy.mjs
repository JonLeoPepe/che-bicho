// Edificios de Jujuy (lote 10a): adobe, techos planos de torta de barro, vigas y puertas de cardón, pircas. Sin letras. viewBox 0 0 240 200, piso y≈178.
import { O, L } from './base-arte.mjs';
import { defsEd, sombraEd } from './edificios.mjs';

let n = 0;
const id = (p) => `${p}${n++}`;
const f1 = (v) => v.toFixed(1);
// pirca: muro de piedras encastradas
export const pirca = (x, y, w, h) => { const k = id('pc'); const st = []; for (let r = 0; r * 10 < h + 10; r++) for (let c = 0; c * 14 < w + 14; c++) { const px = x + c * 14 + (r % 2) * 7 - 4, py = y + r * 10; st.push(`<path d="M${px},${py + 9} L${px + 1},${py + 2} L${px + 6},${py} L${px + 12},${py + 1} L${px + 13},${py + 8} L${px + 7},${py + 10}Z" fill="${['#9a8f80', '#b0a594', '#8a8072', '#a69a88'][(r * 3 + c) % 4]}" stroke="#6a6258" stroke-width="1"/>`); } return `<clipPath id="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7a7266"/><g clip-path="url(#${k})">${st.join('')}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${L(2.4)}/>`; };
// techo plano de torta de barro con las puntas de las vigas asomando
export const torta = (x0, y, w, vigas = 7) => `<path d="M${x0 - 6},${y} C${x0 + w * 0.3},${y - 3} ${x0 + w * 0.7},${y + 2} ${x0 + w + 6},${y - 1} L${x0 + w + 6},${y + 9} L${x0 - 6},${y + 9}Z" fill="#a8835a" ${L(2.2)}/><path d="M${x0 - 4},${y + 2} C${x0 + w * 0.4},${y} ${x0 + w * 0.6},${y + 3} ${x0 + w + 4},${y + 1}" stroke="#c9a47a" stroke-width="2" fill="none"/>${Array.from({ length: vigas }, (_, i) => `<rect x="${f1(x0 + 6 + i * ((w - 18) / (vigas - 1)))}" y="${y + 9}" width="7" height="6" rx="1" fill="#8a6a46" ${L(1.4)}/>`).join('')}<path d="M${x0 - 6},${y + 15} L${x0 + w + 6},${y + 15}" stroke="#5a4028" stroke-width="2"/>`;
// madera de cardón: clara y con agujeritos
export const cardon = (x, y, w, h, vert = true) => { const k = id('cd'); return `<clipPath id="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#caa66c" ${L(2)}/><g clip-path="url(#${k})">${Array.from({ length: Math.ceil((vert ? w : h) / 7) }, (_, i) => vert ? `<path d="M${x + 7 + i * 7},${y} L${x + 7 + i * 7},${y + h}" stroke="#9a7a46" stroke-width="1.2"/>` : `<path d="M${x},${y + 7 + i * 7} L${x + w},${y + 7 + i * 7}" stroke="#9a7a46" stroke-width="1.2"/>`).join('')}${Array.from({ length: Math.round((w * h) / 70) }, (_, i) => `<ellipse cx="${x + 3 + ((i * 17) % (w - 4))}" cy="${y + 3 + ((i * 29) % (h - 4))}" rx="1.4" ry="2.2" fill="#6a4a26"/>`).join('')}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${L(2)}/>`; };
const adobe = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#adb)" ${L(2.4)}/><rect x="${x}" y="${y}" width="${w}" height="14" fill="url(#alero)"/><path d="M${x + 10},${y + h * 0.5} C${x + 18},${y + h * 0.46} ${x + 26},${y + h * 0.54} ${x + 34},${y + h * 0.5}" stroke="#d9b080" stroke-width="5" opacity=".6"/>`;
const ventanita = (x, y, w = 18, h = 18) => `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="5" fill="#caa66c" ${L(1.4)}/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2e2a2a" ${L(1.8)}/><path d="M${x + w / 2},${y} L${x + w / 2},${y + h} M${x},${y + h / 2} L${x + w},${y + h / 2}" stroke="#caa66c" stroke-width="2"/>`;
const poste = (x, y0, y1, c = '#8a6a46') => `<path d="M${x},${y0} L${x},${y1}" stroke="${O}" stroke-width="8" stroke-linecap="round"/><path d="M${x},${y0} L${x},${y1}" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 8},${y0 + 1} L${x + 8},${y0 + 1}" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 8},${y0 + 1} L${x + 8},${y0 + 1}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
const tinaja = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-8,0 C-12,-8 -10,-18 -4,-20 L4,-20 C10,-18 12,-8 8,0Z" fill="#b4683a" ${L(1.6)}/><path d="M-5,-20 L5,-20 L4,-24 L-4,-24Z" fill="#a05a32" ${L(1.4)}/><path d="M-8,-10 L8,-10" stroke="#e2c49a" stroke-width="1.6"/></g>`;

// E24 · Posta jujeña: casa larga de adobe con techo de torta, galería sobre postes de algarrobo y zócalo de pirca
export function postaJ() {
  return `${defsEd}${sombraEd(12, 228, 178)}
  ${pirca(26, 156, 188, 22)}${adobe(26, 84, 188, 72)}
  ${torta(20, 64, 200, 9)}
  ${cardon(104, 100, 32, 56)}<circle cx="130" cy="130" r="1.8" fill="${O}"/>
  ${ventanita(52, 104)}${ventanita(170, 104)}
  <path d="M8,92 L232,92" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M8,92 L232,92" stroke="#8a6a46" stroke-width="4" stroke-linecap="round"/>
  <path d="M8,84 L232,84 L232,92 L8,92Z" fill="#b89a6a" ${L(1.8)}/>${Array.from({ length: 22 }, (_, i) => `<path d="M${10 + i * 10},84 l0,8" stroke="#8a723f" stroke-width="1.2"/>`).join('')}
  ${[12, 72, 168, 228].map((x) => poste(x, 92, 176)).join('')}
  ${tinaja(42, 176)}${tinaja(196, 176, .9)}
  <path d="M120,64 l0,-10" stroke="${O}" stroke-width="1.6"/><g class="campana" style="transform-origin:120px 54px"><path d="M114,66 C114,58 116,56 120,56 C124,56 126,58 126,66Z" fill="#c9a84a" ${L(1.6)}/></g>`;
}

// E25 · Almacén jujeño: adobe encalado con zócalo azul, puerta doble de cardón, banco de adobe y cartel con pan y llama pintados
export function almacenJ() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  <rect x="22" y="80" width="196" height="98" fill="#f1ebdd" ${L(2.4)}/><rect x="22" y="80" width="196" height="14" fill="url(#alero)"/><rect x="22" y="150" width="196" height="28" fill="#4a7aa8" ${L(1.8)}/>
  ${torta(16, 60, 208, 10)}
  ${cardon(46, 104, 22, 46)}${cardon(70, 104, 22, 46)}<path d="M44,102 L94,102" stroke="${O}" stroke-width="5"/><path d="M44,102 L94,102" stroke="#caa66c" stroke-width="3"/>
  <rect x="126" y="104" width="52" height="34" fill="#2e2a2a" ${L(2)}/><rect x="128" y="106" width="48" height="30" fill="#5a4a3a"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${132 + i * 9}" y="110" width="7" height="${10 + (i % 2) * 6}" fill="${['#c8362b', '#e2a72e', '#2f7d5b', '#7a3a8a', '#e86a3a'][i]}" ${L(.8)}/>`).join('')}<path d="M128,128 L176,128" stroke="#8a6a46" stroke-width="4"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${130 + i * 7.6},104 L${130 + i * 7.6},138" stroke="#3a3a3a" stroke-width="1.8"/>`).join('')}
  <g transform="translate(152 88)"><rect x="-22" y="-8" width="44" height="16" rx="2" fill="#e9d9a8" ${L(1.6)}/><ellipse cx="-10" cy="1" rx="7" ry="4" fill="#d9a050" ${L(1)}/><path d="M-14,0 l3,-2 M-10,0 l3,-2 M-6,0 l2,-2" stroke="#a86a2a" stroke-width="1"/><path d="M4,5 L18,5 L18,-1 L4,-4Z" fill="#f2d27a" stroke="#8a6a2a" stroke-width="1.2"/><circle cx="9" cy="1.5" r="1.2" fill="#d9b050"/><circle cx="14" cy="2.5" r="1" fill="#d9b050"/></g>
  <path d="M190,150 L214,150 L214,166 L190,166Z" fill="#c99a68" ${L(1.8)}/><path d="M196,150 C196,140 208,140 208,150" stroke="#4f8a2e" stroke-width="3" fill="none"/>
  <path d="M100,164 L120,164 L120,178 L100,178Z" fill="#c99a68" ${L(1.6)}/>`;
}

// E26 · Casa jujeña: adobe con techo de torta, escalera de cardón al techo y horno de barro al costado
export function casaJ() {
  return `${defsEd}${sombraEd(20, 220, 178)}
  ${adobe(40, 96, 130, 82)}${torta(34, 76, 142, 7)}
  ${cardon(64, 116, 26, 62)}${ventanita(122, 116, 22, 20)}
  <path d="M28,178 C26,150 50,140 64,156 C72,166 70,178 66,178Z" fill="#b07a4f" ${L(2.2)}/><path d="M34,162 C38,150 50,148 56,154" stroke="#cf9a6a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M40,178 L40,170 Q48,162 56,170 L56,178Z" fill="#2a1a14" ${L(1.6)}/>
  <g><path d="M178,178 L168,74 M196,178 L186,74" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M178,178 L168,74 M196,178 L186,74" stroke="#caa66c" stroke-width="3.4" stroke-linecap="round"/>${[160, 140, 120, 100, 82].map((y) => { const t = (178 - y) / 104; return `<path d="M${f1(178 - 10 * t)},${y} L${f1(196 - 10 * t)},${y}" stroke="${O}" stroke-width="4.4"/><path d="M${f1(178 - 10 * t)},${y} L${f1(196 - 10 * t)},${y}" stroke="#caa66c" stroke-width="2.4"/>`; }).join('')}</g>
  <path d="M60,76 L60,60 L72,60 L72,76" fill="#b07a4f" ${L(2)}/><g class="humo">${[0, 1, 2].map((i) => `<circle cx="66" cy="54" r="${4 + i}" fill="#e8e4dc" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>
  <path d="M100,76 C108,70 120,70 128,76" stroke="#c9a47a" stroke-width="0"/>${[[110, 72], [122, 72], [134, 72]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="${['#7a4a7a', '#c9a04a', '#b8504a'][i]}" ${L(1)}/>`).join('')}`;
}

// E27 · Casa de la curandera jujeña: casita de pirca con techo de paja brava, yuyos colgando y un sahumerio
export function curanderaJ() {
  const paja = Array.from({ length: 130 }, (_, i) => { const x = 30 + ((i * 37) % 140), y = 50 + ((i * 53) % 44); return `<path d="M${x},${y} l${(i % 3) - 1},${6 + (i % 4)}" stroke="${['#c9b06a', '#e0c88a', '#a8904a', '#d4bc7a'][i % 4]}" stroke-width="1.3"/>`; }).join('');
  return `${defsEd}${sombraEd(20, 220, 178)}
  ${pirca(40, 100, 120, 78)}
  <clipPath id="pjC"><path d="M28,98 C40,64 80,46 100,46 C120,46 160,64 172,98Z"/></clipPath><path d="M28,98 C40,64 80,46 100,46 C120,46 160,64 172,98Z" fill="#d4bc7a" ${L(2.4)}/><g clip-path="url(#pjC)">${paja}</g><path d="M28,98 C40,64 80,46 100,46 C120,46 160,64 172,98Z" fill="none" ${L(2.4)}/>${Array.from({ length: 36 }, (_, i) => `<path d="M${28 + i * 4},98 l${(i % 3) - 1},${4 + (i % 4)}" stroke="#a8904a" stroke-width="1.4"/>`).join('')}
  ${cardon(84, 118, 28, 60)}
  <path d="M172,96 L226,92" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M172,96 L226,92" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/>${[[182, 100], [196, 99], [210, 98]].map(([x, y], i) => `<path d="M${x},${y - 6} L${x},${y + 2}" stroke="${O}" stroke-width="1.2"/><g class="yuyo" style="animation-delay:${i * 0.3}s"><path d="M${x - 5},${y + 2} L${x + 5},${y + 2} L${x + 3},${y + 18} L${x - 3},${y + 18}Z" fill="${['#7a9a42', '#9a8a4a', '#6a8a3a'][i]}" ${L(1.2)}/><path d="M${x - 4},${y + 4} L${x + 4},${y + 4}" stroke="#7a3a8a" stroke-width="1.6"/></g>`).join('')}${poste(224, 92, 176)}
  <g transform="translate(192 176)"><path d="M-10,0 C-12,-10 -6,-14 0,-14 C6,-14 12,-10 10,0Z" fill="#8a4a2a" ${L(1.6)}/><path d="M-6,-14 L6,-14" stroke="#e86a2a" stroke-width="3"/></g><g class="humo">${[0, 1, 2].map((i) => `<circle cx="192" cy="154" r="${3 + i}" fill="#e8e4dc" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>
  ${tinaja(62, 176, .9)}`;
}

// E28 · Talabartería jujeña: adobe con alero de caña, monturas y riendas trenzadas colgando, cartel con estribo de madera
export function talabarteriaJ() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  ${adobe(22, 88, 196, 90)}${torta(16, 68, 208, 10)}
  <path d="M10,98 L230,98 L232,108 L8,108Z" fill="url(#cania)" ${L(2)}/>
  ${[14, 120, 226].map((x) => poste(x, 106, 176)).join('')}
  ${cardon(54, 120, 32, 58)}${cardon(150, 120, 32, 58)}
  <rect x="96" y="122" width="44" height="30" fill="#2e2a2a" ${L(1.8)}/><rect x="99" y="125" width="38" height="24" fill="#cfe1e6" fill-opacity=".55"/>
  <g transform="translate(118 80)"><rect x="-20" y="-6" width="40" height="14" rx="2" fill="#caa66c" ${L(1.6)}/><path d="M-6,4 C-8,-4 8,-4 6,4 Z M-8,4 L8,4" fill="none" stroke="#5a3a22" stroke-width="2.4"/></g>
  <g class="lazo"><path d="M30,108 C28,124 34,138 30,152 M38,108 C40,122 34,134 40,148" stroke="#5a3a22" stroke-width="2.4" fill="none"/>${[0, 1, 2, 3].map((i) => `<path d="M${29 + (i % 2) * 2},${116 + i * 9} l4,3" stroke="#c9a86a" stroke-width="1.4"/>`).join('')}<path d="M196,108 C194,124 200,138 196,152" stroke="#5a3a22" stroke-width="2.4" fill="none"/></g>
  <g><path d="M92,162 L92,178 M120,162 L120,178 M88,166 L124,166" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M92,162 L92,178 M120,162 L120,178 M88,166 L124,166" stroke="#caa66c" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M86,162 C86,148 98,144 106,148 C114,144 126,148 126,162 Z" fill="#5a3a22" ${L(1.8)}/><path d="M82,162 L130,162 L128,168 L84,168Z" fill="#c8362b" ${L(1.4)}/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${86 + i * 9}" y="163" width="4" height="4" fill="${['#e2a72e', '#2f7d5b', '#7a3a8a', '#e2a72e', '#2f7d5b'][i]}"/>`).join('')}</g>`;
}

// E29 · Feria jujeña: puestos de pirca y caña con techo de aguayo; papas andinas, tejidos y cerámica
export function feriaJ() {
  const rayas = ['#c8362b', '#e2a72e', '#2f7d5b', '#7a3a8a', '#e86a3a', '#2f5a8a'];
  const toldo = (x) => { const k = id('tl'); return `<clipPath id="${k}"><path d="M${x - 6},98 L${x + 66},98 L${x + 60},80 L${x},80Z"/></clipPath><path d="M${x - 6},98 L${x + 66},98 L${x + 60},80 L${x},80Z" fill="#c8362b"/><g clip-path="url(#${k})">${Array.from({ length: 8 }, (_, i) => `<rect x="${x - 10}" y="${80 + i * 2.6}" width="80" height="2" fill="${rayas[i % 6]}"/>`).join('')}</g><path d="M${x - 6},98 L${x + 66},98 L${x + 60},80 L${x},80Z" fill="none" ${L(1.8)}/>`; };
  const puesto = (x, items) => `${toldo(x)}${[x, x + 60].map((px) => `<path d="M${px},98 L${px},176" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M${px},98 L${px},176" stroke="#b08a54" stroke-width="3.4" stroke-linecap="round"/>`).join('')}${pirca(x + 2, 148, 56, 30)}${items(x)}`;
  return `${defsEd}${sombraEd(8, 232, 178)}
  ${puesto(12, (x) => `${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="${x + 10 + (i % 3) * 18}" cy="${140 - Math.floor(i / 3) * 7}" rx="7" ry="5" fill="${['#7a4a7a', '#c9a04a', '#b8504a'][i % 3]}" ${L(1.2)}/>`).join('')}`)}
  ${puesto(90, (x) => `<path d="M${x + 6},104 L${x + 26},104 L${x + 26},140 L${x + 6},140Z" fill="#c8362b" ${L(1.6)}/>${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${x + 6},${108 + i * 6} L${x + 26},${108 + i * 6}" stroke="${rayas[(i + 1) % 6]}" stroke-width="2.6"/>`).join('')}<path d="M${x + 32},104 L${x + 54},104 L${x + 54},140 L${x + 32},140Z" fill="#2f5a8a" ${L(1.6)}/>${[0, 1, 2].map((i) => `<path d="M${x + 36},${112 + i * 10} l4,-4 l4,4 l4,-4 l4,4" stroke="#f4efe4" stroke-width="1.6" fill="none"/>`).join('')}`)}
  ${puesto(168, (x) => `${tinaja(x + 14, 146)}${tinaja(x + 32, 146, .8)}${tinaja(x + 48, 146, .9)}<path d="M${x + 6},118 C${x + 6},110 ${x + 22},110 ${x + 22},118 Z" fill="#b4683a" ${L(1.4)}/><path d="M${x + 30},118 C${x + 30},110 ${x + 46},110 ${x + 46},118 Z" fill="#a05a32" ${L(1.4)}/>`)}`;
}

// ───────── Lote 10b ─────────
const chapaCurva = (x, y, w, h) => `<path d="M${x},${y + h} C${x},${y} ${x + w},${y} ${x + w},${y + h}Z" fill="#a9aeb2" ${L(2.4)}/>${Array.from({ length: Math.round(w / 8) }, (_, i) => `<path d="M${x + 4 + i * 8},${y + h} C${x + 4 + i * 8},${y + h * 0.4} ${x + w / 2},${y + 2} ${x + w / 2},${y + 2}" stroke="#c9ced2" stroke-width="1.2" fill="none"/>`).join('')}`;
const guarda = (x, y, w, h) => { const cols = ['#c8362b', '#e2a72e', '#2f7d5b', '#7a3a8a', '#2f5a8a']; const k = id('gd'); return `<clipPath id="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f1ebdd"/><g clip-path="url(#${k})">${Array.from({ length: Math.ceil(w / 20) }, (_, i) => `<path d="M${x + i * 20},${y + h} L${x + i * 20 + 10},${y} L${x + i * 20 + 20},${y + h}Z" fill="${cols[i % 5]}"/><path d="M${x + i * 20 + 6},${y + h} L${x + i * 20 + 10},${y + h * 0.4} L${x + i * 20 + 14},${y + h}Z" fill="#f1ebdd"/>`).join('')}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${L(1.8)}/>`; };
const flor = (x, y, c) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${c}" ${L(1)}/><circle cx="${x}" cy="${y}" r="1.2" fill="#f2d23a"/>`;

// E30 · Terminal jujeña: zócalo alto de pirca, techo grande de chapa a un agua sobre vigas de madera, torre de piedra con reloj y andén con pérgola de cardón
export function terminalJ() {
  return `${defsEd}${sombraEd(10, 230, 178)}
  ${pirca(20, 140, 150, 38)}<rect x="20" y="96" width="150" height="44" fill="#f1ebdd" ${L(2.4)}/><rect x="20" y="96" width="150" height="12" fill="url(#alero)"/>
  ${[0, 1, 2, 3].map((i) => `<rect x="${32 + i * 34}" y="104" width="24" height="30" fill="#cfe1e6" fill-opacity=".75" ${L(1.8)}/><path d="M${44 + i * 34},104 L${44 + i * 34},134" stroke="${O}" stroke-width="1.2"/>`).join('')}
  ${cardon(82, 140, 26, 38)}
  <path d="M8,98 L176,70 L180,80 L12,108Z" fill="#a9aeb2" ${L(2.4)}/>${Array.from({ length: 20 }, (_, i) => `<path d="M${14 + i * 8.4},${107 - i * 1.4} L${12 + i * 8.4},${98 - i * 1.4}" stroke="#c9ced2" stroke-width="1.4"/>`).join('')}
  ${[24, 58, 92, 126, 160].map((x) => `<rect x="${x - 3}" y="${f1(108.5 - (x - 12) * 0.167)}" width="7" height="6" fill="#8a6a46" ${L(1.2)}/>`).join('')}
  ${pirca(176, 40, 30, 138)}<path d="M172,40 L210,40 L202,26 L180,26Z" fill="#b5562e" ${L(2)}/><circle cx="191" cy="62" r="10" fill="#f6f2e8" ${L(2)}/><path d="M191,62 L191,55 M191,62 L196,64" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/><rect x="184" y="150" width="14" height="28" fill="#3a2a22" ${L(1.6)}/>
  <path d="M206,96 L238,96" stroke="${O}" stroke-width="6"/><path d="M206,96 L238,96" stroke="#caa66c" stroke-width="3.4"/>${[210, 218, 226, 234].map((x) => `<path d="M${x},90 L${x},102" stroke="${O}" stroke-width="4"/><path d="M${x},90 L${x},102" stroke="#caa66c" stroke-width="2"/>`).join('')}${[214, 234].map((x) => `<path d="M${x},100 L${x},178" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},100 L${x},178" stroke="#8a6a46" stroke-width="4" stroke-linecap="round"/>`).join('')}
  <path d="M30,170 L70,170 L70,176 L30,176Z M120,170 L160,170 L160,176 L120,176Z" fill="#8a6a46" ${L(1.6)}/>`;
}

// E31 · Pago de la capataza (Purmamarca): casona de adobe con frontón escalonado donde está tallado el Cerro de Siete Colores, portón de cardón y balcón de madera
export function pagoJ() {
  const franjas = ['#c8362b', '#e86a3a', '#e2a72e', '#9a7a3a', '#5f8a6a', '#7a3a8a', '#b8604a'];
  const fronton = 'M70,96 L70,64 L84,64 L84,50 L98,50 L98,36 L142,36 L142,50 L156,50 L156,64 L170,64 L170,96Z';
  return `${defsEd}${sombraEd(10, 230, 178)}
  ${adobe(14, 96, 60, 82)}${adobe(166, 96, 60, 82)}${torta(8, 82, 70, 4)}${torta(162, 82, 70, 4)}
  ${ventanita(32, 120, 18, 20)}${ventanita(190, 120, 18, 20)}
  <path d="${fronton}" fill="#efe2c8" ${L(2.4)}/><path d="M70,96 L170,96 L170,178 L70,178Z" fill="#efe2c8" ${L(2.4)}/><path d="M70,96 L170,96 L170,108 L70,108Z" fill="url(#alero)"/>
  <path d="M66,64 L88,64 M80,50 L102,50 M94,36 L146,36 M138,50 L160,50 M152,64 L174,64" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M66,64 L88,64 M80,50 L102,50 M94,36 L146,36 M138,50 L160,50 M152,64 L174,64" stroke="#d9c4a0" stroke-width="2.6" stroke-linecap="round"/>
  <clipPath id="cerroJ2"><path d="M94,84 L106,62 L114,70 L122,54 L134,68 L142,62 L150,84Z"/></clipPath><path d="M94,84 L106,62 L114,70 L122,54 L134,68 L142,62 L150,84Z" fill="#c8362b"/><g clip-path="url(#cerroJ2)">${franjas.map((c, i) => `<path d="M90,${86 - i * 4.4} C106,${80 - i * 4.4} 132,${82 - i * 4.4} 154,${78 - i * 4.4}" stroke="${c}" stroke-width="4.4" fill="none"/>`).join('')}</g><path d="M94,84 L106,62 L114,70 L122,54 L134,68 L142,62 L150,84Z" fill="none" ${L(2.2)}/><path d="M90,86 L154,86" stroke="#c9b490" stroke-width="3"/>
  <path d="M96,178 L96,134 C96,116 144,116 144,134 L144,178Z" fill="#3a2a22" ${L(2.2)}/>${cardon(100, 132, 19, 46)}${cardon(121, 132, 19, 46)}<path d="M100,132 C100,120 140,120 140,132" fill="#caa66c" ${L(1.6)}/>
  <path d="M74,106 L166,106" stroke="${O}" stroke-width="0"/>
  <g><rect x="76" y="108" width="20" height="4" fill="#8a6a46" ${L(1.4)}/>${[78, 84, 90].map((x) => `<path d="M${x},112 L${x},124" stroke="#8a6a46" stroke-width="2"/>`).join('')}<path d="M76,124 L96,124" stroke="${O}" stroke-width="3"/><path d="M76,124 L96,124" stroke="#8a6a46" stroke-width="1.6"/><rect x="144" y="108" width="20" height="4" fill="#8a6a46" ${L(1.4)}/>${[146, 152, 158].map((x) => `<path d="M${x},112 L${x},124" stroke="#8a6a46" stroke-width="2"/>`).join('')}<path d="M144,124 L164,124" stroke="${O}" stroke-width="3"/><path d="M144,124 L164,124" stroke="#8a6a46" stroke-width="1.6"/></g>
  ${tinaja(84, 176)}${tinaja(156, 176, .9)}`;
}

// E32 · Puesto de la pastora: casita de piedra con techo de paja brava a dos aguas y corral de pirca con tranquera de cardón
export function puestoPastora() {
  const paja = Array.from({ length: 110 }, (_, i) => { const x = 40 + ((i * 37) % 110), y = 46 + ((i * 53) % 50); return `<path d="M${x},${y} l${(i % 3) - 1},${6 + (i % 4)}" stroke="${['#c9b06a', '#e0c88a', '#a8904a', '#d4bc7a'][i % 4]}" stroke-width="1.3"/>`; }).join('');
  return `${defsEd}${sombraEd(14, 226, 178)}
  ${pirca(132, 140, 96, 38)}<path d="M150,140 L150,178 M176,140 L176,178" stroke="${O}" stroke-width="0"/>${cardon(150, 146, 26, 32, false)}
  ${pirca(36, 100, 108, 78)}
  <clipPath id="pjP"><path d="M28,100 L90,44 L152,100Z"/></clipPath><path d="M28,100 L90,44 L152,100Z" fill="#d4bc7a" ${L(2.4)}/><g clip-path="url(#pjP)">${paja}</g><path d="M28,100 L90,44 L152,100Z" fill="none" ${L(2.4)}/>${Array.from({ length: 31 }, (_, i) => `<path d="M${28 + i * 4},100 l${(i % 3) - 1},${4 + (i % 4)}" stroke="#a8904a" stroke-width="1.4"/>`).join('')}<path d="M84,44 L96,44" stroke="#7a6436" stroke-width="5" stroke-linecap="round"/>
  ${cardon(76, 122, 26, 56)}
  <path d="M106,96 L210,124" stroke="#8a6a46" stroke-width="0"/>${[[110, 112], [124, 112]].map(([x, y]) => `<path d="M${x},${y} l0,10" stroke="${O}" stroke-width="1.4"/>`).join('')}
  <g transform="translate(116 124)"><rect x="-12" y="0" width="24" height="14" fill="#c8362b" ${L(1.4)}/>${[0, 1, 2].map((i) => `<path d="M-12,${3 + i * 4} L12,${3 + i * 4}" stroke="${['#e2a72e', '#2f7d5b', '#2f5a8a'][i]}" stroke-width="2"/>`).join('')}</g>
  <path d="M110,112 L124,112" stroke="${O}" stroke-width="2"/>`;
}

// E33 · Campamento en el cerro: refugio de piedra con techo de chapa curva, antena y una carpa de montaña al lado
export function refugio() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  ${pirca(30, 110, 110, 68)}${chapaCurva(24, 76, 122, 40)}
  <rect x="68" y="130" width="28" height="48" fill="#c8362b" ${L(2)}/><circle cx="90" cy="156" r="1.8" fill="${O}"/><rect x="110" y="128" width="20" height="16" fill="#cfe1e6" fill-opacity=".7" ${L(1.6)}/>
  <path d="M126,80 L126,46" stroke="${O}" stroke-width="3"/><path d="M118,40 C118,48 126,52 132,48Z" fill="#d8dce0" ${L(1.6)}/><path d="M124,46 L130,42" stroke="${O}" stroke-width="1.4"/><rect x="132" y="58" width="12" height="8" fill="#2a3a5a" ${L(1.2)}/><path d="M126,62 L132,62" stroke="${O}" stroke-width="1.4"/>
  <path d="M150,178 L180,124 L214,178Z" fill="#e2a72e" ${L(2.4)}/><path d="M180,124 L176,178 M180,124 L196,178" stroke="#c48a1e" stroke-width="1.6"/><path d="M172,178 C176,160 186,160 190,178Z" fill="#3a2a22" ${L(1.6)}/><path d="M146,178 L156,170 M218,178 L208,170" stroke="${O}" stroke-width="1.4"/>
  <g transform="translate(46 170)"><rect x="-6" y="-14" width="14" height="22" rx="4" fill="#2f6a8a" ${L(1.6)}/><path d="M-2,-14 L-2,8 M4,-14 L4,8" stroke="#24546e" stroke-width="1.4"/><path d="M12,8 L18,-22" stroke="${O}" stroke-width="3.4" stroke-linecap="round"/><path d="M12,8 L18,-22" stroke="#a8adb2" stroke-width="1.6" stroke-linecap="round"/><path d="M14,-24 C18,-26 22,-24 24,-20" stroke="${O}" stroke-width="3" fill="none"/></g>`;
}

// E34 · Rancho de Don Fidel en las yungas: casa de madera sobre pilotes bajos, techo de chapa a dos aguas, galería y flores para los picaflores
export function ranchoYungas() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  ${[30, 80, 130, 180].map((x) => `<rect x="${x - 4}" y="156" width="8" height="22" fill="#6a4a30" ${L(1.6)}/>`).join('')}
  <rect x="22" y="150" width="176" height="8" fill="#8a6a46" ${L(1.8)}/>
  <rect x="34" y="92" width="152" height="58" fill="#5aa8a0" ${L(2.4)}/>${Array.from({ length: 18 }, (_, i) => `<path d="M${34 + i * 8.5},92 L${34 + i * 8.5},150" stroke="#3f8a82" stroke-width="1.2"/>`).join('')}<rect x="34" y="92" width="152" height="12" fill="url(#alero)"/>
  <path d="M16,94 L110,40 L204,94Z" fill="#c9ced2" ${L(2.4)}/>${Array.from({ length: 14 }, (_, i) => `<path d="M${110 - 94 + i * 13.4},94 L110,40" stroke="#a9aeb2" stroke-width="1.2"/>`).join('')}<path d="M100,74 L120,74 L120,94 L100,94" fill="#5aa8a0" ${L(1.6)}/>
  <rect x="96" y="104" width="28" height="46" fill="#e8d8b8" ${L(2)}/><circle cx="118" cy="128" r="1.8" fill="${O}"/>
  ${[[52, 110], [150, 110]].map(([x, y]) => `<rect x="${x}" y="${y}" width="22" height="22" fill="#2e2a2a" ${L(1.8)}/><path d="M${x - 6},${y} L${x},${y} L${x},${y + 22} L${x - 6},${y + 22}Z M${x + 22},${y} L${x + 28},${y} L${x + 28},${y + 22} L${x + 22},${y + 22}Z" fill="#e8d8b8" ${L(1.2)}/>`).join('')}
  ${[[50, 136], [154, 136]].map(([x, y]) => `<rect x="${x}" y="${y}" width="26" height="8" fill="#b4583a" ${L(1.4)}/>${[0, 1, 2, 3].map((i) => flor(x + 3 + i * 7, y - 3, ['#c8362b', '#e2a72e', '#c8506a', '#c8362b'][i])).join('')}`).join('')}
  <path d="M190,150 C186,130 194,112 188,96" stroke="#4f8a2e" stroke-width="2.4" fill="none"/>${[[188, 140], [192, 124], [188, 108]].map(([x, y], i) => `<path d="M${x},${y} c6,-2 8,-8 4,-10 c-3,2 -5,6 -4,10Z" fill="#5f9a3a" ${L(1)}/>${flor(x - 4, y - 4, ['#c8362b', '#e86a8a', '#c8362b'][i])}`).join('')}
  <g class="picaflor"><g transform="translate(206 104)"><path d="M-2,0 C-2,-5 6,-6 8,-2 C10,2 4,5 0,4Z" fill="#2f9a6a" ${L(1.2)}/><path d="M-2,0 L-12,2" stroke="${O}" stroke-width="1.4"/><path d="M2,-2 C0,-10 4,-14 8,-14 C8,-8 6,-4 4,-2Z" fill="#6a7a4a" ${L(1)}/></g></g>
  ${[[16, 178], [24, 170], [204, 178]].map(([x, y]) => `<path d="M${x},${y} l0,0" stroke="${O}" stroke-width="0"/>`).join('')}`;
}
