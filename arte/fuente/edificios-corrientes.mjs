// Edificios de Corrientes (lote 7a): casas de galería, cal, tejas musleras, horcones y paja. Sin letras. viewBox 0 0 240 200, piso y≈178.
import { O, L } from './base-arte.mjs';
import { defsEd, sombraEd, puertaMadera } from './edificios.mjs';

let n = 0;
const id = (p) => `${p}${n++}`;
const tejas = (x0, y0, w, filas, alto = 6) => { const k = id('tj'); const d = `M${x0},${y0} L${x0 + w},${y0} L${x0 + w + 6},${y0 + filas * alto + 4} L${x0 - 6},${y0 + filas * alto + 4}Z`; return `<clipPath id="${k}"><path d="${d}"/></clipPath><path d="${d}" fill="#b5562e"/><g clip-path="url(#${k})">${Array.from({ length: filas }, (_, r) => Array.from({ length: Math.ceil(w / 12) + 3 }, (_, c) => `<path d="M${x0 - 12 + c * 12 + (r % 2) * 6},${y0 + 8 + r * alto} q6,-7 12,0" fill="${['#c4683a', '#b85a30', '#cf7444'][(r + c) % 3]}" stroke="#7d3519" stroke-width=".8"/>`).join('')).join('')}</g><path d="${d}" fill="none" ${L(2.4)}/><path d="M${x0},${y0} L${x0 + w},${y0}" stroke="#8a3c1e" stroke-width="5" stroke-linecap="round"/>`; };
const paja = (x0, y0, w, h, c = ['#9c844f', '#d4bd84', '#b59c62', '#8a723f']) => { const k = id('pj'); const d = `M${x0 + 6},${y0} L${x0 + w - 6},${y0} L${x0 + w + 4},${y0 + h} L${x0 - 4},${y0 + h}Z`; return `<clipPath id="${k}"><path d="${d}"/></clipPath><path d="${d}" fill="#b9a06a" ${L(2.4)}/><g clip-path="url(#${k})">${Array.from({ length: Math.round(w * h / 22) }, (_, i) => { const x = x0 + ((i * 37) % (w + 8)) - 4, y = y0 + ((i * 53) % h); return `<path d="M${x},${y} l${(i % 3) - 1},${5 + (i % 4)}" stroke="${c[i % 4]}" stroke-width="1.3"/>`; }).join('')}</g><path d="M${x0 + 6},${y0} L${x0 + w - 6},${y0}" stroke="#7a6436" stroke-width="5" stroke-linecap="round"/>${Array.from({ length: Math.round(w / 4) + 3 }, (_, i) => `<path d="M${x0 - 4 + i * 4},${y0 + h} l${(i % 3) - 1},${4 + (i % 4)}" stroke="#8a723f" stroke-width="1.4"/>`).join('')}`; };
// hoja de palma (techo de palma de los puestos y la feria)
const palma = (x0, y0, w, h) => { const k = id('pm'); const d = `M${x0},${y0 + h} L${x0 + w / 2},${y0} L${x0 + w},${y0 + h}Z`; return `<clipPath id="${k}"><path d="${d}"/></clipPath><path d="${d}" fill="#9a9a52" ${L(2.2)}/><g clip-path="url(#${k})">${Array.from({ length: Math.round(w / 5) + 2 }, (_, i) => `<path d="M${x0 + w / 2},${y0} L${x0 - 4 + i * 5},${y0 + h + 2}" stroke="${['#7a7a3a', '#b8b46a', '#8a8a44'][i % 3]}" stroke-width="1.6"/>`).join('')}</g>${Array.from({ length: Math.round(w / 4) + 1 }, (_, i) => `<path d="M${x0 + i * 4},${y0 + h} l${(i % 2) * 2 - 1},5" stroke="#6a6a32" stroke-width="1.4"/>`).join('')}`; };
const horcon = (x, y0, y1, c = '#7a5a3a') => `<path d="M${x},${y0} L${x},${y1}" stroke="${O}" stroke-width="8" stroke-linecap="round"/><path d="M${x},${y0} L${x},${y1}" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M${x - 5},${y0 + 2} L${x},${y0 + 8} L${x + 5},${y0 + 2}" stroke="${O}" stroke-width="2" fill="none"/><path d="M${x - 1},${y0 + 14} L${x - 1},${y1 - 6}" stroke="#a07a52" stroke-width="1.2"/>`;
const postigo = (x, y, w = 24, h = 30, c = '#2f6a8a') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2e2a2a" ${L(1.6)}/>${Array.from({ length: 5 }, (_, i) => `<path d="M${x + 3},${y + 4 + i * 5} L${x + w - 3},${y + 4 + i * 5}" stroke="#555" stroke-width="1.2"/>`).join('')}${[0, 1, 2, 3].map((i) => `<path d="M${x + 4 + i * 5.4},${y + 2} L${x + 4 + i * 5.4},${y + h - 2}" stroke="#777" stroke-width="1"/>`).join('')}<path d="M${x - 10},${y} L${x},${y} L${x},${y + h} L${x - 10},${y + h}Z M${x + w},${y} L${x + w + 10},${y} L${x + w + 10},${y + h} L${x + w},${y + h}Z" fill="${c}" ${L(1.4)}/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${x - 9},${y + 4 + i * 6} L${x - 1},${y + 4 + i * 6} M${x + w + 1},${y + 4 + i * 6} L${x + w + 9},${y + 4 + i * 6}" stroke="${O}" stroke-width=".8" opacity=".5"/>`).join('')}`;
const cal = (x, y, w, h, c = '#f4f0e6') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${L(2.4)}/><rect x="${x}" y="${y}" width="${w}" height="16" fill="url(#alero)"/><path d="M${x},${y + h - 10} L${x + w},${y + h - 10}" stroke="#c9b8a0" stroke-width="1.4" opacity=".7"/><ellipse cx="${x + w * 0.2}" cy="${y + h * 0.6}" rx="10" ry="5" fill="#d9c9a8" opacity=".5"/>`;
const piso = (x0, x1, y) => `<path d="M${x0},${y} L${x1},${y} L${x1 + 4},${y + 6} L${x0 - 4},${y + 6}Z" fill="#b4583a" ${L(1.8)}/>${Array.from({ length: Math.round((x1 - x0) / 10) }, (_, i) => `<path d="M${x0 + i * 10},${y} l-1,6" stroke="#8e3f26" stroke-width=".8"/>`).join('')}`;
const maceta = (x, y, flor = '#c8362b') => `<path d="M${x - 6},${y - 10} L${x + 6},${y - 10} L${x + 4},${y} L${x - 4},${y}Z" fill="#b4583a" ${L(1.4)}/><path d="M${x},${y - 10} C${x - 8},${y - 18} ${x - 6},${y - 24} ${x},${y - 20} C${x + 6},${y - 24} ${x + 8},${y - 18} ${x},${y - 10}Z" fill="#4f8a2e" ${L(1.2)}/><circle cx="${x - 3}" cy="${y - 20}" r="2.6" fill="${flor}"/><circle cx="${x + 3}" cy="${y - 18}" r="2.2" fill="${flor}"/>`;

// E13 · Posta correntina: casona de cal con galería larga sobre horcones, tejas musleras y palenque
export function postaC() {
  return `${defsEd}${sombraEd(10, 230, 178)}
  ${cal(24, 84, 192, 94)}
  ${tejas(16, 40, 208, 6)}
  <path d="M6,82 L234,82" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M6,82 L234,82" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>
  ${postigo(48, 112)}${puertaMadera(104, 104, 32, 70, '#2f6a8a', true)}${postigo(170, 112)}
  ${piso(10, 230, 172)}
  ${[12, 64, 120, 176, 228].map((x) => horcon(x, 82, 174)).join('')}
  <path d="M44,96 C40,92 40,86 46,86" stroke="#4f8a2e" stroke-width="2" fill="none"/>${maceta(40, 172)}${maceta(200, 172, '#e2a72e')}
  <g><path d="M150,150 L150,178 M210,150 L210,178" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M150,150 L150,178 M210,150 L210,178" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/><path d="M146,152 L214,152" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M146,152 L214,152" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/></g>
  <path d="M112,82 l0,10" stroke="${O}" stroke-width="1.4"/><path d="M106,92 C106,100 118,100 118,92Z" fill="#c9a84a" ${L(1.4)}/><g class="campana" style="transform-origin:112px 92px"><path d="M112,98 l0,4" stroke="${O}" stroke-width="2"/></g>`;
}

// E14 · Almacén correntino: esquina con ochava, cornisa y pretil con pilastras y jarrones, puerta alta en la ochava, toldo de lona y reja de despacho
export function almacenC() {
  const pil = (x, y0, y1, w = 10) => `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#efe2cf" ${L(1.8)}/><rect x="${x - w / 2 - 2}" y="${y0}" width="${w + 4}" height="5" fill="#e2d2ba" ${L(1.4)}/>`;
  const jarron = (x, y) => `<path d="M${x - 5},${y} C${x - 7},${y - 6} ${x - 4},${y - 12} ${x},${y - 12} C${x + 4},${y - 12} ${x + 7},${y - 6} ${x + 5},${y}Z" fill="#e2d2ba" ${L(1.6)}/><rect x="${x - 6}" y="${y}" width="12" height="3" fill="#d4c2a8" ${L(1.2)}/>`;
  return `${defsEd}${sombraEd(12, 228, 178)}
  <path d="M16,78 L106,70 L106,178 L16,178Z" fill="#e8c9b4" ${L(2.4)}/><path d="M134,70 L224,78 L224,178 L134,178Z" fill="#dcbaa4" ${L(2.4)}/><path d="M106,70 L134,70 L134,178 L106,178Z" fill="#f1d6c2" ${L(2.4)}/>
  <path d="M16,78 L106,70 L106,84 L16,92Z M134,70 L224,78 L224,92 L134,84Z" fill="url(#alero)"/>
  <path d="M12,66 L106,58 L134,58 L228,66 L228,76 L134,68 L106,68 L12,76Z" fill="#e2d2ba" ${L(2.2)}/><path d="M12,72 L106,64 L134,64 L228,72" stroke="#c9b49a" stroke-width="1.6" fill="none"/>
  <path d="M14,66 L14,46 L106,38 L134,38 L226,46 L226,66 L134,58 L106,58Z" fill="#efe2cf" ${L(2.2)}/>
  ${[[36, 44.6, 64.6], [62, 42.4, 62.4], [88, 40.2, 60.2]].map(([x, y0, y1]) => `<path d="M${x - 10},${y0 + 6} L${x + 10},${y0 + 4} L${x + 10},${y1 - 4} L${x - 10},${y1 - 2}Z" fill="#e2d2ba" ${L(1.2)}/>`).join('')}${[[152, 40], [178, 42.2], [204, 44.4]].map(([x, y0]) => `<path d="M${x - 10},${y0 + 4} L${x + 10},${y0 + 6} L${x + 10},${y0 + 18} L${x - 10},${y0 + 16}Z" fill="#e2d2ba" ${L(1.2)}/>`).join('')}
  <path d="M12,48 L106,40 L134,40 L228,48" stroke="${O}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M12,48 L106,40 L134,40 L228,48" stroke="#e2d2ba" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  ${pil(106, 38, 178, 8)}${pil(134, 38, 178, 8)}${pil(16, 46, 178, 8)}${pil(224, 46, 178, 8)}
  ${jarron(106, 38)}${jarron(134, 38)}${jarron(16, 46)}${jarron(224, 46)}
  <path d="M110,176 L110,104 C110,88 130,88 130,104 L130,176Z" fill="#2f6a52" ${L(2)}/><path d="M112,104 C112,92 128,92 128,104Z" fill="#cfe1e6" fill-opacity=".7" ${L(1.2)}/><path d="M120,92 L120,104 M114,98 L126,98" stroke="${O}" stroke-width="1"/><path d="M120,106 L120,176" stroke="${O}" stroke-width="1.6"/>${[112, 124].map((x) => `<rect x="${x}" y="112" width="6" height="24" fill="#3a7a62" ${L(1)}/><rect x="${x}" y="142" width="6" height="28" fill="#3a7a62" ${L(1)}/>`).join('')}<circle cx="117" cy="140" r="1.3" fill="#d9b06a"/><circle cx="123" cy="140" r="1.3" fill="#d9b06a"/>
  <path d="M30,108 L90,103 L90,152 L30,156Z" fill="#2e2a2a" ${L(2)}/><path d="M32,110 L88,105 L88,150 L32,154Z" fill="#5a4a3a"/>${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${36 + i * 8.6}" y="${116 - i * 0.6}" width="6" height="${12 + (i % 3) * 4}" fill="${['#c8362b', '#e2a72e', '#2f7d5b'][i % 3]}" ${L(.8)}/>`).join('')}<path d="M32,138 L88,134" stroke="#8a6a46" stroke-width="4"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${36 + i * 7.4},${108 - i * 0.6} L${36 + i * 7.4},${155 - i * 0.4}" stroke="#3a3a3a" stroke-width="1.8"/>`).join('')}
  <path d="M24,94 L96,88 L102,104 L22,112Z" fill="url(#rayaV)" ${L(1.8)}/>${Array.from({ length: 9 }, (_, i) => `<path d="M${23 + i * 9.8},${111 - i * 0.9} q4.9,5 9.8,-0.9" fill="#2f7d5b" stroke="${O}" stroke-width="1"/>`).join('')}<path d="M24,94 L22,112 M96,88 L102,104" stroke="${O}" stroke-width="1.6"/>
  ${postigo(166, 106, 24, 34, '#2f6a52')}
  <g transform="translate(178 82)"><rect x="-20" y="-6" width="40" height="16" rx="2" fill="#e9d9a8" ${L(1.6)}/><path d="M-12,6 C-14,0 -6,-2 -4,2 C-4,5 -8,6 -12,6Z" fill="#7a9a3a" ${L(1)}/><path d="M-6,0 L-2,-6" stroke="#c9cfd6" stroke-width="1.4"/><ellipse cx="4" cy="3" rx="4" ry="3" fill="#e6b45a" ${L(1)}/><ellipse cx="13" cy="3" rx="4" ry="3" fill="#e6b45a" ${L(1)}/></g>
  <path d="M12,176 L106,176 L106,182 L8,182Z M134,176 L228,176 L232,182 L134,182Z M106,176 L134,176 L134,182 L106,182Z" fill="#b8a48a" ${L(1.4)}/>
  <path d="M146,160 L176,160 L176,166 L146,166Z M150,166 L150,176 M172,166 L172,176" fill="#8a6a46" stroke="${O}" stroke-width="1.8"/>`;
}

// E15 · Casa correntina: tierra colorada, galería con mburucuyá en el horcón y postigos verdes
export function casaC() {
  return `${defsEd}${sombraEd(30, 210, 178)}
  <rect x="44" y="92" width="152" height="86" fill="#c46e48" ${L(2.4)}/><rect x="44" y="92" width="152" height="16" fill="url(#alero)"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${48 + (i * 23) % 144},${118 + (i * 17) % 50} l10,0" stroke="#a85a38" stroke-width="1.6" opacity=".6"/>`).join('')}
  ${tejas(40, 52, 160, 5)}
  <path d="M28,90 L212,90" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M28,90 L212,90" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>
  ${postigo(70, 116, 24, 30, '#3f7a4a')}${puertaMadera(108, 112, 28, 62, '#3f7a4a')}${postigo(156, 116, 24, 30, '#3f7a4a')}
  ${piso(30, 210, 172)}
  ${[34, 120, 206].map((x) => horcon(x, 90, 174)).join('')}
  <g class="viento"><path d="M206,170 C200,150 212,130 204,110 C200,100 206,94 210,92" stroke="#4f8a2e" stroke-width="2.4" fill="none"/>${[[204, 150, 0], [210, 128, 1], [202, 112, 0]].map(([x, y, f]) => `<path d="M${x},${y} c-8,-4 -10,-10 -4,-12 c4,2 6,6 4,12Z" fill="#5f9a3a" ${L(1)}/>${f ? `<circle cx="${x + 6}" cy="${y - 2}" r="4" fill="#efe6f4" ${L(1)}/><circle cx="${x + 6}" cy="${y - 2}" r="1.8" fill="#7a4a9a"/>` : ''}`).join('')}</g>
  ${maceta(52, 172)}<path d="M146,166 L160,166 L160,176 L146,176Z" fill="#8a6a46" ${L(1.4)}/>`;
}

// E16 · Casa de la curandera correntina: rancho de estanteo con techo de paja, ramada con yuyos y ollas de barro
export function curanderaC() {
  return `${defsEd}${sombraEd(20, 220, 178)}
  <rect x="34" y="100" width="112" height="78" fill="#b07a4f" ${L(2.4)}/>${Array.from({ length: 5 }, (_, r) => `<path d="M34,${112 + r * 14} L146,${112 + r * 14}" stroke="#8a5a36" stroke-width="1.6"/>`).join('')}${Array.from({ length: 8 }, (_, i) => `<path d="M${40 + i * 14},100 L${40 + i * 14},178" stroke="#8a5a36" stroke-width="1" opacity=".5"/>`).join('')}<rect x="34" y="100" width="112" height="14" fill="url(#alero)"/>
  ${paja(26, 50, 128, 52)}
  <rect x="58" y="118" width="26" height="60" fill="#2a1f1a" ${L(2)}/><path d="M60,120 C64,140 62,156 66,176 L60,176Z" fill="#8a5a36"/>
  <rect x="104" y="122" width="22" height="20" fill="#2a1f1a" ${L(1.8)}/><path d="M104,132 L126,132 M115,122 L115,142" stroke="#8a5a36" stroke-width="2"/>
  <path d="M148,92 L230,88" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M148,92 L230,88" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/>${[[160, 98], [174, 97], [188, 96], [202, 95], [216, 94]].map(([x, y], i) => `<path d="M${x},${y - 6} L${x},${y + 2}" stroke="${O}" stroke-width="1.2"/><g class="yuyo" style="animation-delay:${i * 0.3}s"><path d="M${x - 5},${y + 2} L${x + 5},${y + 2} L${x + 3},${y + 18} L${x - 3},${y + 18}Z" fill="${['#6a8a3a', '#8aa04a', '#5a7a32', '#9a8a4a', '#7a9a42'][i]}" ${L(1.2)}/><path d="M${x - 4},${y + 4} L${x + 4},${y + 4}" stroke="#c8362b" stroke-width="1.6"/></g>`).join('')}
  ${horcon(150, 88, 176)}${horcon(228, 86, 176)}
  <path d="M160,176 C158,164 172,160 178,168 C180,174 176,178 170,178Z" fill="#a85a38" ${L(1.6)}/><path d="M184,178 C182,160 202,158 206,170 C208,176 202,178 196,178Z" fill="#b4683a" ${L(1.6)}/><path d="M188,162 L200,162" stroke="#7a3a22" stroke-width="2"/><path d="M212,178 C212,170 222,168 224,176 L224,178Z" fill="#8a4a2a" ${L(1.4)}/>
  <g class="humo">${[0, 1, 2].map((i) => `<circle cx="194" cy="150" r="${3 + i}" fill="#e8e4dc" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>`;
}

// E17 · Talabartería correntina: ladrillo visto con galería, recado en el caballete, lazos y riendas colgando, cartel con estribo
export function talabarteriaC() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  <rect x="22" y="76" width="196" height="102" fill="url(#ladr)" ${L(2.4)}/><rect x="22" y="76" width="196" height="16" fill="url(#alero)"/>
  <path d="M14,70 L226,70 L226,78 L14,78Z" fill="#c9b49a" ${L(2.2)}/>${Array.from({ length: 14 }, (_, i) => `<rect x="${20 + i * 15}" y="58" width="9" height="12" fill="#c9b49a" ${L(1.4)}/>`).join('')}
  <path d="M8,98 C70,90 170,90 232,98 L232,104 C170,96 70,96 8,104Z" fill="url(#chapa)" ${L(2)}/>
  ${puertaMadera(54, 112, 32, 62, '#6b4226')}${puertaMadera(150, 112, 32, 62, '#6b4226')}<rect x="100" y="114" width="36" height="34" fill="#2e2a2a" ${L(1.8)}/><rect x="103" y="117" width="30" height="28" fill="#cfe1e6" fill-opacity=".6"/>
  ${[12, 120, 228].map((x) => horcon(x, 100, 176, '#6a4a30')).join('')}
  <g transform="translate(118 80)"><rect x="-18" y="-6" width="36" height="14" rx="2" fill="#e9d9a8" ${L(1.6)}/><path d="M-6,4 C-8,-4 8,-4 6,4 Z M-8,4 L8,4" fill="none" stroke="#6b4226" stroke-width="2.4"/><path d="M0,-4 L0,-8" stroke="#6b4226" stroke-width="2"/></g>
  <g class="lazo">${[30, 42].map((x, i) => `<ellipse cx="${x}" cy="${118 + i * 4}" rx="7" ry="10" fill="none" stroke="${O}" stroke-width="3.4"/><ellipse cx="${x}" cy="${118 + i * 4}" rx="7" ry="10" fill="none" stroke="#c9a86a" stroke-width="1.8"/>`).join('')}<path d="M196,104 C194,120 200,134 196,148 M204,104 C206,118 200,130 206,144" stroke="#5a3a22" stroke-width="2.4" fill="none"/></g>
  <g><path d="M90,160 L90,178 M118,160 L118,178 M86,164 L122,164" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M90,160 L90,178 M118,160 L118,178 M86,164 L122,164" stroke="#8a6a46" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M84,160 C84,146 96,142 104,146 C112,142 124,146 124,160 Z" fill="#7a4a2a" ${L(1.8)}/><path d="M86,156 C96,152 112,152 122,156" stroke="#e9d9a8" stroke-width="2" fill="none"/><path d="M80,160 L128,160 L126,166 L82,166Z" fill="#3a3a6a" ${L(1.4)}/>${[84, 92, 100, 108, 116, 124].map((x) => `<path d="M${x},166 l0,5" stroke="#3a3a6a" stroke-width="1.6"/>`).join('')}</g>`;
}

// E18 · Feria correntina: puestos con techo de hoja de palma; chipá, naranjas, mamones y pescado del río
export function feriaC() {
  const puesto = (x, items, tela) => `${palma(x - 4, 72, 68, 34)}${horcon(x + 2, 104, 176, '#7a6a4a')}${horcon(x + 58, 104, 176, '#7a6a4a')}
    <path d="M${x - 2},104 C${x + 10},112 ${x + 20},112 ${x + 30},104 C${x + 40},112 ${x + 50},112 ${x + 62},104" fill="${tela}" ${L(1.6)}/>
    <rect x="${x + 2}" y="140" width="56" height="10" fill="#8a6a46" ${L(1.8)}/><rect x="${x + 6}" y="150" width="48" height="26" fill="${tela}" ${L(1.6)}/>${items(x)}`;
  return `${defsEd}${sombraEd(8, 232, 178)}
  ${puesto(10, (x) => `${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${x + 12 + i * 9}" cy="136" rx="5" ry="4" fill="#e6b45a" ${L(1.2)}/>`).join('')}${[0, 1, 2].map((i) => `<ellipse cx="${x + 18 + i * 9}" cy="129" rx="5" ry="4" fill="#e6b45a" ${L(1.2)}/>`).join('')}`, '#f1ebde')}
  ${puesto(88, (x) => `${[0, 1, 2, 3, 4].map((i) => `<circle cx="${x + 12 + i * 9}" cy="135" r="5" fill="#e88a2a" ${L(1.2)}/>`).join('')}${[0, 1].map((i) => `<path d="M${x + 18 + i * 18},130 C${x + 12 + i * 18},120 ${x + 20 + i * 18},112 ${x + 28 + i * 18},118 C${x + 32 + i * 18},124 ${x + 28 + i * 18},132 ${x + 18 + i * 18},130Z" fill="#e8b84a" ${L(1.2)}/><path d="M${x + 20 + i * 18},126 C${x + 22 + i * 18},122 ${x + 26 + i * 18},122 ${x + 28 + i * 18},124" stroke="#6a9a3a" stroke-width="2" fill="none"/>`).join('')}`, 'url(#rayaV)')}
  ${puesto(166, (x) => `${[0, 1, 2].map((i) => `<g transform="translate(${x + 14 + i * 16} ${132 - (i % 2) * 4}) rotate(${i % 2 ? 10 : -10})"><path d="M-9,0 C-6,-6 4,-6 7,0 C4,6 -6,6 -9,0Z" fill="#b4bcc0" ${L(1.2)}/><path d="M7,0 L12,-4 L12,4Z" fill="#7a8288" ${L(1)}/><path d="M-6,2 C-2,4 2,4 5,2" stroke="#e88a4a" stroke-width="1.6" fill="none"/></g>`).join('')}<path d="M${x + 4},120 L${x + 56},120" stroke="${O}" stroke-width="1.2"/>${[0, 1].map((i) => `<path d="M${x + 18 + i * 22},120 l0,4" stroke="${O}" stroke-width="1"/><path d="M${x + 12 + i * 22},128 C${x + 14 + i * 22},122 ${x + 22 + i * 22},122 ${x + 24 + i * 22},128 L${x + 18 + i * 22},124Z" fill="#9ab4c4" ${L(1)}/>`).join('')}`, 'url(#rayaR)')}`;
}

// ───────── Lote 7b ─────────
const tabla = (x, y, w, h, c = '#9a7450') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${L(2.4)}/>${Array.from({ length: Math.floor(w / 8) }, (_, i) => `<path d="M${x + 8 + i * 8},${y} L${x + 8 + i * 8},${y + h}" stroke="#6e5034" stroke-width="1.2"/>`).join('')}<rect x="${x}" y="${y}" width="${w}" height="12" fill="url(#alero)"/>`;
const chapaV = (x0, y0, w, h, c = '#3f6a4a') => `<path d="M${x0 + 6},${y0} L${x0 + w - 6},${y0} L${x0 + w + 4},${y0 + h} L${x0 - 4},${y0 + h}Z" fill="${c}" ${L(2.4)}/>${Array.from({ length: Math.round(w / 7) }, (_, i) => `<path d="M${x0 + 4 + i * 7},${y0} L${x0 + 2 + i * 7.4},${y0 + h}" stroke="#5a8a64" stroke-width="2"/>`).join('')}`;

// E19 · Terminal correntina: alero de hormigón ondulado sobre columnas en V, azulejos celestes y pilón con reloj
export function terminalC() {
  return `${defsEd}${sombraEd(10, 230, 178)}
  <rect x="30" y="96" width="150" height="82" fill="#f1ede4" ${L(2.4)}/>${Array.from({ length: 15 }, (_, i) => Array.from({ length: 2 }, (_, r) => `<rect x="${30 + i * 10}" y="${158 + r * 10}" width="10" height="10" fill="${(i + r) % 2 ? '#8ac0d8' : '#e8f2f6'}" stroke="#6aa0b8" stroke-width=".6"/>`).join('')).join('')}
  ${Array.from({ length: 5 }, (_, i) => `<rect x="${40 + i * 28}" y="104" width="20" height="40" fill="#cfe1e6" fill-opacity=".75" ${L(1.6)}/><path d="M${50 + i * 28},104 L${50 + i * 28},144" stroke="${O}" stroke-width="1"/>`).join('')}
  <path d="M6,88 C30,74 50,74 74,88 C98,74 118,74 142,88 C166,74 186,74 210,88 L210,96 L6,96Z" fill="#e4e0d6" ${L(2.4)}/><path d="M6,96 L210,96" stroke="#b8b2a6" stroke-width="3"/>
  ${[40, 108, 176].map((x) => `<path d="M${x - 10},94 L${x},176 L${x + 10},94" stroke="${O}" stroke-width="7" fill="none" stroke-linejoin="round"/><path d="M${x - 10},94 L${x},176 L${x + 10},94" stroke="#d4cfc4" stroke-width="4" fill="none" stroke-linejoin="round"/>`).join('')}
  <rect x="192" y="38" width="24" height="140" fill="#e4e0d6" ${L(2.4)}/>${[60, 80, 100, 120, 140].map((y) => `<path d="M192,${y} L216,${y}" stroke="#b8b2a6" stroke-width="1.4"/>`).join('')}<circle cx="204" cy="52" r="10" fill="#f6f2e8" ${L(2)}/><path d="M204,52 L204,45 M204,52 L209,55" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/><rect x="194" y="160" width="20" height="18" fill="#8ac0d8" ${L(1.4)}/>
  <path d="M60,162 L98,162 L98,168 L60,168Z M64,168 L64,176 M94,168 L94,176" fill="#8a6a46" stroke="${O}" stroke-width="1.8"/><path d="M124,162 L162,162 L162,168 L124,168Z M128,168 L128,176 M158,168 L158,176" fill="#8a6a46" stroke="${O}" stroke-width="1.8"/>`;
}

// E20 · Estancia del capataz (pago): casco con galería, mangrullo de troncos y el acordeón de la insignia en relieve
export function pagoC() {
  return `${defsEd}${sombraEd(10, 230, 178)}
  <g><path d="M182,178 L192,40 M222,178 L212,40" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M182,178 L192,40 M222,178 L212,40" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>${[150, 120, 90, 64].map((y) => `<path d="M${184 + (178 - y) * 0.07},${y} L${220 - (178 - y) * 0.07},${y}" stroke="${O}" stroke-width="4.4"/><path d="M${184 + (178 - y) * 0.07},${y} L${220 - (178 - y) * 0.07},${y}" stroke="#8a6a46" stroke-width="2.4"/>`).join('')}<path d="M186,150 L218,120 M186,120 L218,90" stroke="#8a6a46" stroke-width="2"/>
    <rect x="182" y="34" width="40" height="8" fill="#8a6a46" ${L(1.8)}/>${paja(180, 14, 44, 20)}</g>
  ${cal(18, 88, 160, 90)}
  ${tejas(12, 42, 172, 7)}
  <path d="M14,46 L98,26 L182,46Z" fill="#f1ebde" ${L(2.4)}/><circle cx="98" cy="38" r="9" fill="#e2d6c0" ${L(1.8)}/><g transform="translate(98 38)"><rect x="-6" y="-4" width="4" height="8" fill="#b8a88a" ${L(.8)}/><rect x="2" y="-4" width="4" height="8" fill="#b8a88a" ${L(.8)}/><path d="M-2,-3 L2,-3 M-2,0 L2,0 M-2,3 L2,3" stroke="#8a7a62" stroke-width="1"/></g>
  <path d="M6,86 L190,86" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M6,86 L190,86" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>
  ${postigo(38, 114, 22, 30, '#2f5a7a')}${puertaMadera(82, 106, 32, 68, '#2f5a7a', true)}${postigo(136, 114, 22, 30, '#2f5a7a')}
  ${piso(8, 188, 172)}${[10, 66, 130, 186].map((x) => horcon(x, 86, 174)).join('')}
  <path d="M30,166 L56,166 L56,172 L30,172Z M33,172 L33,178 M53,172 L53,178" fill="#8a6a46" stroke="${O}" stroke-width="1.8"/><path d="M144,170 C144,162 156,162 156,170 C156,176 144,176 144,170Z" fill="#8a5a32" ${L(1.4)}/><path d="M150,162 L153,154" stroke="#c9ced2" stroke-width="1.6"/>`;
}

// E21 · Rancho del canoero en la orilla: sobre pilotes, techo de paja, redes colgando y la canoa amarrada
export function ranchoOrilla() {
  return `${defsEd}${sombraEd(20, 220, 178)}
  ${[44, 84, 124, 164].map((x) => `<path d="M${x},128 L${x},184" stroke="${O}" stroke-width="8" stroke-linecap="round"/><path d="M${x},128 L${x},184" stroke="#6a4a30" stroke-width="5" stroke-linecap="round"/>`).join('')}<path d="M44,150 L84,170 M84,150 L124,170 M124,150 L164,170" stroke="#6a4a30" stroke-width="2.4"/>
  <rect x="30" y="124" width="150" height="8" fill="#8a6a46" ${L(2)}/>${Array.from({ length: 15 }, (_, i) => `<path d="M${34 + i * 10},124 l0,8" stroke="#6a4a30" stroke-width="1"/>`).join('')}
  ${tabla(44, 82, 112, 42)}
  ${paja(32, 38, 136, 46)}
  <rect x="66" y="92" width="24" height="32" fill="#2a1f1a" ${L(2)}/><rect x="112" y="94" width="24" height="18" fill="#2a1f1a" ${L(1.8)}/><path d="M112,103 L136,103" stroke="#9a7450" stroke-width="2"/>
  <path d="M180,124 L214,170" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M180,124 L214,170" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${184 + i * 6},${130 + i * 8} l12,-2" stroke="#8a6a46" stroke-width="2.4"/>`).join('')}
  <g class="red"><path d="M160,88 L196,96 L190,126 C180,130 168,126 164,120Z" fill="#c9b48a" fill-opacity=".25" stroke="#8a7a5a" stroke-width="1.2"/>${[0, 1, 2, 3].map((i) => `<path d="M${164 + i * 9},${89 + i * 2} L${164 + i * 7},${122 + i}" stroke="#8a7a5a" stroke-width="1.1"/>`).join('')}${[100, 110].map((y) => `<path d="M162,${y} C172,${y + 3} 184,${y + 4} 194,${y + 2}" stroke="#8a7a5a" stroke-width="1.1" fill="none"/>`).join('')}</g>
  <g><path d="M96,176 C110,186 180,186 200,174 L196,170 C176,178 116,178 100,172Z" fill="#7a4a2a" ${L(2.2)}/><path d="M104,172 C124,176 176,176 194,170" stroke="#a06a3a" stroke-width="2" fill="none"/><path d="M120,170 L150,160" stroke="#8a6a46" stroke-width="3" stroke-linecap="round"/></g><path d="M124,170 C124,160 120,150 124,140" stroke="#6a5a3a" stroke-width="1.4" fill="none"/>`;
}

// E22 · Puesto de guardaparques: cabaña elevada de madera, techo de chapa verde, mangrullo con escalera y panel solar
export function guardaparques() {
  return `${defsEd}${sombraEd(14, 226, 178)}
  <g><path d="M170,178 L178,52 M214,178 L206,52" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M170,178 L178,52 M214,178 L206,52" stroke="#8a6a46" stroke-width="4" stroke-linecap="round"/>${[150, 118, 86].map((y, i) => `<path d="M${172 + (178 - y) * 0.06},${y} L${212 - (178 - y) * 0.06},${y - 28}" stroke="#8a6a46" stroke-width="2.4"/><path d="M${172 + (178 - y) * 0.06},${y - 28} L${212 - (178 - y) * 0.06},${y}" stroke="#8a6a46" stroke-width="2.4"/>`).join('')}
    <rect x="168" y="46" width="48" height="8" fill="#8a6a46" ${L(1.8)}/><path d="M170,46 L170,32 M214,46 L214,32 M170,36 L214,36" stroke="${O}" stroke-width="4"/><path d="M170,46 L170,32 M214,46 L214,32 M170,36 L214,36" stroke="#8a6a46" stroke-width="2"/>${chapaV(162, 16, 60, 16)}</g>
  ${[34, 74, 114, 150].map((x) => `<path d="M${x},140 L${x},178" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},140 L${x},178" stroke="#6a4a30" stroke-width="4" stroke-linecap="round"/>`).join('')}
  ${tabla(28, 88, 128, 52, '#a67c52')}
  <rect x="22" y="138" width="140" height="7" fill="#8a6a46" ${L(1.8)}/>${Array.from({ length: 7 }, (_, i) => `<path d="M${26 + i * 4},145 L${16 + i * 4},${150 + i * 4}" stroke="#8a6a46" stroke-width="0"/>`).join('')}
  <path d="M40,145 L20,178" stroke="${O}" stroke-width="5"/><path d="M52,145 L32,178" stroke="${O}" stroke-width="5"/><path d="M40,145 L20,178 M52,145 L32,178" stroke="#8a6a46" stroke-width="2.6"/>${[0, 1, 2, 3].map((i) => `<path d="M${37 - i * 5},${152 + i * 7.5} l12,0" stroke="#8a6a46" stroke-width="2.4"/>`).join('')}
  ${chapaV(18, 56, 148, 34)}
  <g transform="translate(92 60) skewX(-20)"><rect x="0" y="0" width="34" height="14" fill="#2a3a5a" ${L(1.6)}/><path d="M11,0 L11,14 M22,0 L22,14 M0,7 L34,7" stroke="#8aa8c8" stroke-width="1"/></g>
  ${postigo(70, 100, 22, 26, '#3f6a4a')}<rect x="112" y="98" width="26" height="40" fill="#5a3a22" ${L(2)}/>
  <g transform="translate(130 74)"><path d="M-12,-8 L12,-8 L12,8 L-12,8Z" fill="#e9d9a8" ${L(1.6)}/><path d="M-6,4 L-5,-2 C-4,-4 2,-4 4,-2 L6,4 M4,-2 L6,-6 M-3,-3 L-6,-6" stroke="#6a4a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
}

// E23 · Casucha de la mielera: rancho chico de adobe con paja, cajones de colmena al costado y frascos en la ventana
export function casuchaMiel() {
  const colmena = (x, c) => `<rect x="${x}" y="150" width="24" height="10" fill="${c}" ${L(1.6)}/><rect x="${x}" y="140" width="24" height="10" fill="${c}" ${L(1.6)}/><rect x="${x - 2}" y="134" width="28" height="6" fill="#8a8a8a" ${L(1.4)}/><path d="M${x + 6},158 L${x + 18},158" stroke="${O}" stroke-width="2"/><path d="M${x + 2},160 L${x + 2},170 M${x + 22},160 L${x + 22},170" stroke="${O}" stroke-width="3"/>`;
  return `${defsEd}${sombraEd(14, 226, 178)}
  <rect x="26" y="102" width="112" height="76" fill="url(#adb)" ${L(2.4)}/><rect x="26" y="102" width="112" height="14" fill="url(#alero)"/>
  ${paja(18, 56, 128, 48)}
  <rect x="44" y="120" width="24" height="58" fill="#2a1f1a" ${L(2)}/><path d="M46,122 C50,140 48,156 52,176 L46,176Z" fill="#8a5a36"/>
  <rect x="88" y="122" width="34" height="26" fill="#2a1f1a" ${L(1.8)}/><path d="M88,136 L122,136" stroke="#8a6a46" stroke-width="3"/>${[0, 1, 2].map((i) => `<rect x="${92 + i * 10}" y="126" width="7" height="10" rx="1" fill="#e8a024" ${L(1)}/><rect x="${92 + i * 10}" y="124" width="7" height="3" fill="#7a4a2a"/>`).join('')}
  ${colmena(150, '#f1ebde')}${colmena(180, '#e8d07a')}${colmena(210, '#9ac0a8')}
  <g class="abejas">${[[160, 124], [186, 118], [208, 128], [196, 108]].map(([x, y], i) => `<g style="animation-delay:${i * 0.25}s"><ellipse cx="${x}" cy="${y}" rx="2.6" ry="2" fill="#e2b83a" ${L(.8)}/><path d="M${x},${y - 2} c-2,-3 -4,-2 -3,0 M${x},${y - 2} c2,-3 4,-2 3,0" fill="#fff" stroke="#999" stroke-width=".5"/></g>`).join('')}</g>
  <path d="M28,170 C28,160 40,160 40,170 L40,178 L28,178Z" fill="#b4683a" ${L(1.4)}/>`;
}
