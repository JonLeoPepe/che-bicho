// Catálogo para aprobar, lote 8a: iniciales de Jujuy (cuy con papa andina, zorro culpeo con tola, parina).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const pataDel = (x, y, len, col, w = 5.6) => trazo(`M${x},${y} L${x + 3},${y + len * 0.38} L${x},${y + len * 0.78} L${x - 2},${y + len}`, col, w) + `<path d="M${x - 8},${y + len + 2} L${x + 3},${y + len + 2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/>`;
const pataTras = (x, y, len, col, w = 5.6) => trazo(`M${x},${y} L${x - 7},${y + len * 0.32} L${x + 7},${y + len * 0.62} L${x + 3},${y + len}`, col, w) + `<path d="M${x - 4},${y + len + 2} L${x + 8},${y + len + 2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/>`;
const gotas = (pts) => `<g class="gotas">${pts.map(([x, y], i) => `<path d="M${x},${y} C${x - 2},${y + 4} ${x + 2},${y + 6} ${x + 3},${y + 2} C${x + 3},${y} ${x + 1},${y - 2} ${x},${y}Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1" style="animation-delay:${i * 0.25}s"/>`).join('')}</g>`;

// ───────── PAPACUY (Flora) · cuy con papa andina ─────────
const C_CU = { bl: '#efe4cc', ma: '#9a6438', ma2: '#7a4a28', ne: '#3a2e28', ho: '#5f8a3a', ho2: '#3f6a2a', fl: '#9a6ab8', pa1: '#6a3e6a', pa2: '#c9a04a', pa3: '#b8504a', oc: '#c8705a', oc2: '#e08a8a', ch: '#4a3e46', ch2: '#5e5058', es: '#eef6fa' };
const hojaP = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0,0 L0,-22" stroke="${C_CU.ho2}" stroke-width="2"/>${[[-6, -8], [6, -12], [-6, -16], [0, -24]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="5" ry="3.4" transform="rotate(${a < 0 ? -30 : a > 0 ? 30 : 90} ${a} ${b})" fill="${C_CU.ho}" ${L(1.2)}/>`).join('')}</g>`;
const florP = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map((a) => `<path d="M0,0 L-3,-8 L0,-10 L3,-8Z" fill="${C_CU.fl}" transform="rotate(${a})" ${L(1)}/>`).join('')}<circle r="2.4" fill="#f2d23a" ${L(.8)}/></g>`;
const papa = (x, y, rx, ry, c, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="${rx}" ry="${ry}" fill="${c}" ${L(1.8)}/>${[[-rx * 0.4, -ry * 0.2], [rx * 0.3, ry * 0.3], [rx * 0.1, -ry * 0.5]].map(([a, b]) => `<circle cx="${a.toFixed(1)}" cy="${b.toFixed(1)}" r="1.2" fill="${O}" opacity=".5"/>`).join('')}</g>`;
const pelos = (x0, y0, w, h, n, col) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + ((i * 37) % w)},${y0 + ((i * 23) % h)} l-3,5" stroke="${col}" stroke-width="1.3" stroke-linecap="round"/>`).join('');
// cabeza de cuy: hocico romo, labio en Y, orejas de pétalo, ojo al costado, mancha blanca en la frente
const cabezaCuy = (x, y, r = 0, s = 1, { ceno = false, dientes = false, piel = C_CU.ma } = {}) => { const C = C_CU; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M8,-16 C2,-28 16,-32 22,-22 C25,-16 20,-11 14,-11Z" fill="${piel}" ${L(1.8)}/><path d="M11,-17 C8,-24 15,-26 18,-21Z" fill="${C.ma2}" opacity=".7"/>
  <path d="M26,-2 C26,-16 14,-24 0,-22 C-14,-20 -24,-12 -28,-2 C-30,6 -26,12 -18,14 C-4,16 14,14 22,8 C26,4 26,2 26,-2Z" fill="${piel}" ${L(2.6)}/>
  <path d="M-28,-2 C-24,-12 -14,-18 -4,-20 C-8,-14 -14,-6 -16,4 C-18,10 -22,12 -26,8 C-30,6 -30,2 -28,-2Z" fill="${C.bl}"/>
  <path d="M-29,-2 C-28,-5 -25,-5 -24,-2Z" fill="${C.ne}" ${L(1)}/><path d="M-26,-1 L-26,4 M-26,4 C-24,6 -21,6 -20,5" ${L(1.3)} fill="none"/>
  ${dientes ? `<path d="M-26,5 L-26,10 L-22,10 L-22,5Z" fill="#fbf6ea" ${L(1)}/>` : ''}
  <path d="M-22,2 L-38,-2 M-22,4 L-38,6 M-21,6 L-35,12" stroke="${O}" stroke-width=".9"/>
  ${ojoAlm(-8, -8, 4.2, 3, '#2a1810')}<path d="M-14,${ceno ? -12 : -13} C-9,-16 -3,-15 1,${ceno ? -11 : -13}" ${L(ceno ? 2.8 : 2)} fill="none"/>
  <path d="M6,-18 l-2,4 M12,-16 l-2,4 M16,-8 l-3,3 M18,0 l-3,3" stroke="${C.ma2}" stroke-width="1.2"/></g>`; };
const patita = (x, y, col, dedos = 4) => `<path d="M${x - 2},${y - 14} L${x - 3},${y - 2}" stroke="${O}" stroke-width="9" stroke-linecap="round"/><path d="M${x - 2},${y - 14} L${x - 3},${y - 2}" stroke="${col}" stroke-width="5.6" stroke-linecap="round"/><path d="M${x - 10},${y} C${x - 10},${y - 5} ${x + 2},${y - 5} ${x + 2},${y}Z" fill="${col}" ${L(1.6)}/>${Array.from({ length: dedos - 1 }, (_, i) => `<path d="M${x - 7 + i * 3},${y} l0,-2" stroke="${O}" stroke-width="1"/>`).join('')}`;
export function papacuy(v = 'base') {
  const C = C_CU, k = nuevoId('cu');
  if (v === 'chunio') {
    const cu = 'M34,154 C30,116 70,92 116,92 C160,92 186,118 182,154 C180,174 154,182 112,182 C70,182 36,176 34,154Z';
    const placas = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 7 - r; c++) { const x = 52 + c * 20 + r * 10, y = 100 + r * 14; placas.push(`<path d="M${x - 11},${y + 8} C${x - 12},${y - 2} ${x - 6},${y - 8} ${x},${y - 8} C${x + 6},${y - 8} ${x + 12},${y - 2} ${x + 11},${y + 8} C${x + 4},${y + 10} ${x - 4},${y + 10} ${x - 11},${y + 8}Z" fill="${(r + c) % 2 ? C.ch : C.ch2}" ${L(1.8)}/><path d="M${x - 6},${y - 2} C${x - 3},${y} ${x - 1},${y - 2} ${x + 2},${y} M${x - 4},${y + 4} C${x},${y + 6} ${x + 3},${y + 3} ${x + 6},${y + 5}" stroke="#2e262c" stroke-width="1.1" fill="none"/><path d="M${x - 8},${y - 3} C${x - 4},${y - 8} ${x + 4},${y - 8} ${x + 8},${y - 3}" stroke="${C.es}" stroke-width="2" fill="none" stroke-linecap="round"/>`); }
    return `<defs>${clip(k, cu)}</defs>${sombra(108, 186, 78)}
    ${patita(150, 184, C.ma2)}${patita(64, 184, C.ma2)}
    <g class="respira" style="transform-origin:108px 180px">
      <path d="${cu}" fill="${C.ma}"/><g clip-path="url(#${k})">${pelos(40, 140, 140, 36, 30, C.ma2)}<ellipse cx="110" cy="182" rx="80" ry="12" fill="${C.ma2}" opacity=".6"/>${placas.join('')}</g><path d="${cu}" fill="none" ${L()}/>
      ${[[70, 88, -20], [96, 80, -6], [124, 80, 8], [150, 88, 22]].map(([x, y, r]) => `<path d="M${x - 5},${y + 12} L${x},${y - 6} L${x + 5},${y + 12}Z" fill="#d8ecf4" transform="rotate(${r} ${x} ${y + 6})" ${L(1.6)}/>`).join('')}
      ${patita(132, 186, C.ma)}${patita(80, 186, C.ma)}
    </g>
    <g class="cabeza" style="transform-origin:52px 150px">${cabezaCuy(40, 148, 16, 1.25, { ceno: true, dientes: true })}<path d="M30,130 l8,12 M24,134 l4,6" stroke="#f1e6d4" stroke-width="2" stroke-linecap="round"/></g>`;
  }
  if (v === 'oca') {
    const cu = 'M52,140 C54,118 78,104 108,104 C138,104 158,110 164,128 C168,144 152,156 126,156 L88,156 C66,156 52,152 52,140Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(108, 184, 60)}
    <g class="cola" style="transform-origin:160px 124px">${[[164, 118, 9, 7], [172, 106, 8, 6.4], [178, 94, 7, 5.6], [182, 82, 6, 5]].map(([x, y, rx, ry], i) => papa(x, y, rx, ry, i % 2 ? C.oc2 : '#d86a6a', -50)).join('')}<g transform="translate(184 66)">${papa(0, 0, 10, 13, '#c84a5a', -20)}${papa(-7, -8, 5, 6, '#e8a04a', 20)}${papa(7, -6, 5, 6, '#e08a8a', -30)}</g></g>
    ${trazo('M140,148 L132,166 L146,178 L142,184', C.ma2, 6.4)}${trazo('M80,150 L84,168 L80,184', C.ma2, 6.4)}
    <g class="respira" style="transform-origin:108px 150px">
      <path d="${cu}" fill="${C.oc}"/><g clip-path="url(#${k})"><path d="M50,144 C80,156 130,158 168,140 L168,170 L50,170Z" fill="${C.bl}"/>${pelos(70, 108, 90, 30, 26, '#9a4a3a')}</g><path d="${cu}" fill="none" ${L()}/>
      ${[[80, 106, -20], [100, 102, -6], [120, 102, 6], [140, 106, 20]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0,0 L0,-12" stroke="${C.ho2}" stroke-width="1.8"/>${[-120, 0, 120].map((a) => `<path d="M0,-12 C-5,-14 -6,-20 -2,-22 C0,-20 0,-20 2,-22 C6,-20 5,-14 0,-12Z" fill="${C.ho}" transform="rotate(${a / 2} 0 -12)" ${L(1)}/>`).join('')}</g>`).join('')}
      ${trazo('M150,140 L158,160 L148,174 L154,184', C.ma, 6.4)}${trazo('M72,146 L64,166 L70,184', C.ma, 6.4)}
      <path d="M62,186 L76,186 M146,186 L160,186" stroke="${O}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g class="cabeza" style="transform-origin:60px 140px">${cabezaCuy(46, 140, 14, 1.1, { ceno: true, dientes: true, piel: C.oc })}</g>`;
  }
  const cu = 'M54,150 C52,126 74,112 106,112 C140,112 162,124 164,148 C166,166 150,176 122,176 L84,176 C66,176 54,166 54,150Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(108, 184, 60)}
  ${patita(144, 184, C.ma2)}${patita(78, 184, C.ma2)}
  <g class="viento">${hojaP(84, 120, -24, 1.2)}${hojaP(100, 114, -8, 1.3)}${hojaP(118, 112, 6, 1.35)}${hojaP(136, 116, 22, 1.2)}${hojaP(150, 124, 40, 1.05)}${florP(104, 84, 1.05)}${florP(124, 82, .95)}${florP(142, 94, .85)}</g>
  <g class="respira" style="transform-origin:108px 176px">
    <path d="${cu}" fill="${C.bl}"/><g clip-path="url(#${k})"><path d="M112,108 C140,110 166,124 166,154 C150,160 130,152 122,136 C116,124 112,116 112,108Z" fill="${C.ma}"/><ellipse cx="150" cy="168" rx="22" ry="14" fill="${C.ne}"/>${pelos(70, 118, 90, 40, 30, '#c9b896')}<ellipse cx="108" cy="178" rx="60" ry="10" fill="${C.ma2}" opacity=".35"/></g><path d="${cu}" fill="none" ${L()}/>
    ${papa(152, 154, 7, 5, C.pa1, 20)}${papa(160, 162, 6, 4.4, C.pa2, -10)}${papa(146, 164, 5, 4, C.pa3, 30)}
    ${patita(130, 186, C.ma)}<g class="paso">${patita(92, 182, C.ma)}</g>
  </g>
  <g class="cabeza" style="transform-origin:66px 148px">${cabezaCuy(58, 150, 10, 1.1)}</g>`;
}

// ───────── ATOQ (Fuego) · zorro colorado con cola de tola ─────────
const C_ZO = { pe: '#c0703a', so: '#8a4a26', bl: '#f1e2c8', ne: '#3a2a22', to: '#6a7a4a', to2: '#4a5a32', br: '#f28a2a', fu: '#f2c23a' };
const cabezaZorro = (x, y, r = 0, s = 1, { boca = 'cerrada', ceno = false, orejas = 'arriba' } = {}) => { const C = C_ZO; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  ${orejas === 'atras' ? `<path d="M6,-12 L34,-24 L22,-6Z" fill="${C.pe}" ${L(2)}/><path d="M10,-12 L28,-20 L20,-9Z" fill="${C.ne}"/><path d="M14,-8 L38,-14 L26,-2Z" fill="${C.so}" ${L(2)}/>` : `<path d="M8,-12 L12,-36 L22,-10Z" fill="${C.pe}" ${L(2)}/><path d="M11,-14 L13,-30 L18,-12Z" fill="${C.ne}"/>
  <path d="M16,-8 L26,-32 L28,-4Z" fill="${C.so}" ${L(2)}/>`}
  <path d="M24,-4 C22,-18 6,-20 -6,-14 C-16,-10 -28,-4 -38,2 C-40,5 -38,8 -34,8 C-20,10 -4,10 10,6 C18,4 26,4 24,-4Z" fill="${C.pe}" ${L(2.6)}/>
  <path d="M-34,8 C-20,12 -2,12 12,6 C6,16 -16,16 -32,10Z" fill="${C.bl}" ${L(1.6)}/>
  ${boca === 'abierta' ? `<path d="M-36,8 L-10,10 L-30,20Z" fill="#6a1a14" ${L(1.6)}/><path d="M-32,9 l2,3 l2,-3 l2,3 M-30,17 l2,-3 l2,3" stroke="#fff" stroke-width="1.2" fill="none"/>` : ''}
  <ellipse cx="-37" cy="4" rx="2.6" ry="2" fill="${O}"/>
  ${ojoAlm(0, -6, 4.2, 2.6, '#e0a020', 'vertical')}<path d="M-8,${ceno ? -10 : -12} C-2,-14 4,-14 8,${ceno ? -9 : -11}" ${L(ceno ? 2.8 : 2)} fill="none"/></g>`; };
// cola de tola: matas tupidas a lo largo de una curva cuadrática
const estrella = (cx, cy, r, n = 11) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r * 0.72 : r; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr).toFixed(1); } return d + 'Z'; };
const mata = (x0, y0, cx, cy, x1, y1, n = 9, r0 = 9, r1 = 13) => Array.from({ length: n }, (_, i) => { const t = i / (n - 1), x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1, r = r0 + (r1 - r0) * Math.sin(Math.PI * Math.min(t * 1.2, 1)); return `<path d="${estrella(x, y, r)}" fill="${['#7a8a4a', '#5f6e3a', '#8f9a58'][i % 3]}" ${L(1.6)}/><path d="M${(x - r * 0.4).toFixed(1)},${(y - r * 0.2).toFixed(1)} l${(r * 0.5).toFixed(1)},${(-r * 0.3).toFixed(1)} M${x.toFixed(1)},${(y + r * 0.3).toFixed(1)} l${(r * 0.4).toFixed(1)},${(-r * 0.4).toFixed(1)}" stroke="#4a5a2e" stroke-width="1.2"/>`; }).join('');
const colaTola = (d, fuego = 0) => { const C = C_ZO; const k = nuevoId('tl'); return `<defs>${clip(k, d)}</defs><path d="${d}" fill="${C.to}" ${L(2.4)}/><g clip-path="url(#${k})">${Array.from({ length: 40 }, (_, i) => `<circle cx="${100 + ((i * 41) % 110)}" cy="${30 + ((i * 29) % 130)}" r="${2 + (i % 3)}" fill="${[C.to2, '#8a9a5a', C.to2][i % 3]}"/>`).join('')}</g><path d="${d}" fill="none" ${L(2.4)}/>${fuego ? '' : ''}`; };
const llama = (x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><g class="llama"><path d="M0,0 C-8,-6 -8,-18 -2,-26 C0,-18 6,-16 4,-24 C12,-16 12,-4 0,0Z" fill="${C_ZO.br}" ${L(1.6)}/><path d="M0,-3 C-4,-8 -3,-14 0,-17 C2,-12 5,-10 4,-6 C4,-4 2,-3 0,-3Z" fill="${C_ZO.fu}"/></g></g>`;
export function atoq(v = 'base') {
  const C = C_ZO;
  if (v === 'nina') {
    return `${sombra(104, 184, 52)}
    <g class="cola" style="transform-origin:140px 160px">${mata(138, 160, 190, 160, 180, 96, 10, 10, 16)}${[[176, 96, 1.2, 10], [186, 116, 1.1, 30], [184, 138, 1, 50], [168, 156, .9, 70], [178, 104, 1.3, -10]].map((a) => llama(...a)).join('')}</g>
    ${trazo('M134,150 C150,154 154,170 146,180', C.so, 12)}<path d="M136,182 L152,182" stroke="${O}" stroke-width="5" stroke-linecap="round"/>
    <g class="respira" style="transform-origin:110px 170px">
      <path d="M80,180 C74,150 82,118 100,104 C116,94 136,104 142,126 C148,150 144,172 132,180Z" fill="${C.pe}" ${L()}/>
      <path d="M86,128 C84,146 88,166 96,178 L110,178 C104,160 102,140 104,120Z" fill="${C.bl}" ${L(1.8)}/>
      ${trazo('M98,140 L96,180', C.ne, 7)}${trazo('M112,140 L114,180', C.ne, 7)}<path d="M88,182 L100,182 M110,182 L122,182" stroke="${O}" stroke-width="5" stroke-linecap="round"/>
      <path d="M120,112 l10,14 M126,108 l6,16" stroke="#f1d6b8" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g class="melena">${[[92, 90, -30], [100, 82, -10], [110, 80, 10], [118, 86, 30], [122, 98, 50]].map(([x, y, r]) => llama(x, y, 1.1, r)).join('')}</g>
    <g class="cabeza" style="transform-origin:100px 100px"><path d="M92,112 C88,96 90,80 96,70 L112,74 C110,86 110,100 114,112Z" fill="${C.pe}" ${L(2.4)}/>${cabezaZorro(92, 60, -38, 1.15, { boca: 'abierta', ceno: true })}</g>`;
  }
  if (v === 'wayra') {
    const cu = 'M66,128 C68,112 90,106 112,108 C134,110 150,116 152,128 C154,140 138,144 118,144 L88,144 C74,144 66,138 66,128Z';
    return `${sombra(112, 186, 62)}
    <g class="viento2" fill="none" stroke="#c9d6dc" stroke-width="2.6" stroke-linecap="round"><path d="M8,96 C40,90 70,96 96,102"/><path d="M4,150 C24,146 40,148 52,152"/><path d="M60,74 C90,70 120,78 150,92"/><path d="M120,160 C150,164 176,160 198,150"/></g>
    <g class="cola" style="transform-origin:150px 124px">${mata(148, 124, 172, 116, 198, 116, 9, 7, 12)}${[[198, 114, .7, 100], [192, 120, .6, 110]].map((a) => llama(...a)).join('')}<g class="chispas2">${[[184, 104], [196, 132], [176, 134], [192, 98]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${C.br}"/>`).join('')}</g></g>
    ${trazo('M148,130 L164,146 L160,164 L174,180', C.ne, 6)}${trazo('M96,138 L90,158 L82,176 L78,182', C.ne, 6)}
    <path d="M172,184 L184,184 M72,184 L84,184" stroke="${O}" stroke-width="5" stroke-linecap="round"/>
    <g class="respira" style="transform-origin:110px 144px">
      <path d="${cu}" fill="${C.pe}" ${L()}/>
      <path d="M72,136 C92,146 128,146 148,136 C144,144 132,148 118,148 L88,148 C80,148 74,142 72,136Z" fill="${C.bl}" opacity=".8"/>
      ${[[96, 116], [112, 114], [128, 118], [104, 126], [122, 128]].map(([x, y]) => `<path d="M${x},${y} C${x + 8},${y - 1} ${x + 14},${y + 1} ${x + 18},${y - 2}" stroke="${C.so}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M150,118 l8,-4 l-4,6 l9,-2 l-6,6 l8,1" ${L(1.8)} fill="${C.pe}"/>
      ${trazo('M140,132 L154,148 L148,166 L160,182', C.so, 6)}${trazo('M88,136 L80,158 L70,174 L64,182', C.so, 6)}
      <path d="M58,184 L70,184 M156,184 L168,184" stroke="${O}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g class="cabeza" style="transform-origin:76px 122px"><path d="M86,134 C78,126 70,120 62,116 L68,104 C76,108 86,114 94,124Z" fill="${C.pe}" ${L(2.4)}/>${cabezaZorro(54, 112, 6, 1.05, { ceno: true, orejas: 'atras' })}</g>`;
  }
  return `${sombra(108, 184, 56)}
  <g class="cola" style="transform-origin:150px 116px">${mata(146, 114, 182, 112, 180, 62, 9, 8, 13)}<g class="chispas">${[[176, 50], [190, 60], [168, 54]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${C.br}"/>`).join('')}</g></g>
  ${pataTras(140, 120, 54, C.ne)}${pataDel(96, 124, 52, C.ne)}
  <g class="respira" style="transform-origin:110px 124px">
    <path d="M70,118 C72,102 92,96 114,98 C136,100 152,106 154,118 C156,130 140,134 120,134 L90,134 C76,134 70,128 70,118Z" fill="${C.pe}" ${L()}/>
    <path d="M76,126 C96,134 128,134 150,124 C146,132 136,136 120,136 L90,136 C82,136 78,132 76,126Z" fill="${C.bl}" opacity=".8"/>
    <path d="M100,100 C116,98 136,100 150,108" stroke="${C.so}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
    ${pataTras(150, 120, 56, C.ne)}${pataDel(84, 126, 54, C.ne)}
  </g>
  <g class="cabeza" style="transform-origin:80px 104px"><path d="M84,112 C78,102 76,92 78,84 L92,84 C92,94 94,104 98,110Z" fill="${C.pe}" ${L(2.4)}/>${cabezaZorro(74, 78, -6, 1)}</g>`;
}

// ───────── PARIWANA (Agua) · parina (flamenco andino) ─────────
const C_PA = { ro: '#ea9fad', ro2: '#c85a7a', bl: '#f6e6ea', ne: '#2a2420', pa: '#d9b83a', pi: '#e8c84a' };
const cabezaParina = (x, y, r = 0, s = 1) => { const C = C_PA; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M-10,0 C-10,-10 8,-12 12,-2 C14,6 4,10 -4,8 C-8,6 -10,4 -10,0Z" fill="${C.ro}" ${L(2.2)}/>
  <path d="M-8,-2 C-18,-4 -26,2 -28,12 C-28,18 -24,20 -22,16 C-22,10 -16,6 -8,6Z" fill="${C.pi}" ${L(2)}/><path d="M-28,12 C-28,18 -24,20 -22,16 L-24,10Z" fill="${C.ne}"/>
  ${ojoAlm(0, -2, 3, 2, '#e8d070')}<path d="M-5,-6 C-1,-8 3,-8 6,-6" ${L(1.8)} fill="none"/></g>`; };
const patasParina = (x, y, len, abierto = 0) => { const C = C_PA; return `${trazo(`M${x},${y} L${x - 2 + abierto},${y + len * 0.5} L${x + abierto * 2},${y + len}`, C.pa, 3.4)}<path d="M${x + abierto * 2 - 7},${y + len + 1} L${x + abierto * 2 + 6},${y + len + 1}" stroke="${O}" stroke-width="4" stroke-linecap="round"/><circle cx="${x - 2 + abierto}" cy="${y + len * 0.5}" r="3" fill="${C.pa}" ${L(1.4)}/>`; };
function pariwana(v = 'base') {
  const C = C_PA, k = nuevoId('pa');
  if (v === 'qocha') {
    const cu = 'M84,108 C86,90 108,82 128,86 C146,90 154,104 148,118 C142,130 120,132 102,128 C90,124 84,118 84,108Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(114, 184, 46)}${gotas([[96, 170], [134, 168]])}
    ${patasParina(108, 124, 56, -2)}${patasParina(126, 124, 56, 3)}
    <g class="aleteo" style="transform-origin:116px 104px">
      <path d="M104,100 C88,76 72,52 64,30 C82,36 98,56 110,86Z" fill="${C.ro2}" ${L(2.4)}/><path d="M64,30 C70,42 78,52 84,58 L76,62 C72,52 66,42 64,30Z" fill="${C.ne}"/>
      <path d="M134,98 C152,74 166,48 172,26 C156,34 140,56 128,86Z" fill="${C.ro2}" ${L(2.4)}/><path d="M172,26 C168,40 160,50 154,56 L162,60 C166,50 170,40 172,26Z" fill="${C.ne}"/>
    </g>
    <g class="respira" style="transform-origin:116px 120px"><path d="${cu}" fill="${C.ro}"/><g clip-path="url(#${k})"><ellipse cx="120" cy="128" rx="34" ry="10" fill="${C.ro2}" opacity=".5"/></g><path d="${cu}" fill="none" ${L()}/><path d="M146,112 L164,118 L148,124Z" fill="${C.ne}" ${L(1.6)}/></g>
    <g class="cabeza" style="transform-origin:96px 96px">${trazo('M92,100 C88,80 92,60 98,40 C100,32 98,24 94,20', C.ro, 7)}${cabezaParina(98, 18, -60, 1.15)}</g>`;
  }
  if (v === 'puyu') {
    const cu = 'M80,100 C84,90 106,86 126,88 C142,90 150,98 146,106 C140,114 118,114 100,112 C88,110 78,108 80,100Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(108, 184, 50)}
    <g class="nube" fill="#f1eef0" stroke="#c9c2c6" stroke-width="1.4"><ellipse cx="140" cy="150" rx="18" ry="6"/><ellipse cx="74" cy="156" rx="14" ry="5"/></g>
    <g class="vuelo">
    <g class="aleteo" style="transform-origin:112px 98px">
      <path d="M100,96 C92,72 92,46 100,24 C112,40 118,66 118,92Z" fill="${C.ro2}" ${L(2.4)}/><path d="M100,24 C98,36 98,46 100,54 L108,52 C106,42 104,32 100,24Z" fill="${C.ne}"/>
    </g>
    ${trazo('M144,102 L170,104 L196,100', C.pa, 3.4)}${trazo('M142,98 L168,96 L194,92', C.pa, 3.4)}
    <path d="${cu}" fill="${C.ro}"/><g clip-path="url(#${k})"><ellipse cx="112" cy="112" rx="34" ry="6" fill="${C.ro2}" opacity=".5"/></g><path d="${cu}" fill="none" ${L()}/>
    <g class="aleteo2" style="transform-origin:118px 100px">
      <path d="M110,100 C112,78 124,56 142,40 C142,62 134,84 124,102Z" fill="${C.ro}" ${L(2.4)}/><path d="M142,40 C136,48 132,56 130,62 L138,64 C140,56 142,48 142,40Z" fill="${C.ne}"/>
    </g>
    ${trazo('M82,100 C68,98 54,98 40,100', C.ro, 7)}${cabezaParina(34, 100, 10, 1)}
    </g>`;
  }
  const cu = 'M90,104 C92,88 112,82 132,86 C150,90 158,104 152,118 C146,128 126,130 108,126 C96,122 90,116 90,104Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(118, 184, 40)}
  ${patasParina(112, 122, 58, 1)}${patasParina(128, 122, 58, -1)}
  <g class="respira" style="transform-origin:120px 120px">
    <path d="${cu}" fill="${C.ro}"/><g clip-path="url(#${k})"><path d="M108,96 C126,90 146,96 156,110 C146,116 126,114 112,108Z" fill="${C.ro2}"/><path d="M140,100 C150,104 156,110 158,118 L148,118Z" fill="${C.ne}"/><ellipse cx="122" cy="126" rx="34" ry="8" fill="${C.ro2}" opacity=".4"/></g><path d="${cu}" fill="none" ${L()}/>
  </g>
  <g class="cabeza" style="transform-origin:94px 100px">${trazo('M96,104 C82,96 80,80 90,66 C98,54 96,42 86,40', C.ro, 7)}${cabezaParina(82, 44, -10, 1.1)}</g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Los nombres también son propuesta: en Jujuy uso quechua.</div>
<section>
<div class="linea"><h3>Flora · cuy con papa andina</h3>
${tarjeta('B70', 'Papacuy', 'Papita', 'Flora', 'base', papacuy(), 'Cuy de la Quebrada caminando con el hocico bajo: hocico romo, orejas de pétalo y pelaje blanco, canela y negro. Le crece una mata de papa andina en flor a lo largo del lomo y tiene papas de colores en la cadera.')}
${tarjeta('B71', 'Chuñucuy', 'Papa andina', 'Flora', 'camino 1', papacuy('chunio'), 'Grande y macizo, con la cabeza gacha y los dientes a la vista. El lomo es una coraza de placas oscuras y arrugadas como el chuño negro, con escarcha y espinas de hielo.')}
${tarjeta('B72', 'Ocacuy', 'Papa oca', 'Flora', 'camino 2', papacuy('oca'), 'Ágil y de patas largas, pelaje colorado y panza clara, hojas de oca en el lomo. Levanta una cola hecha de ocas que termina en un racimo duro, como una maza.')}</div>
<div class="linea"><h3>Fuego · zorro colorado con tola</h3>
${tarjeta('B73', 'Atoq', 'Tolita', 'Fuego', 'base', atoq(), 'Zorro colorado de la Puna: la cola es una mata de tola, el arbusto resinoso que prende fácil, con brasas en la punta. <i>Atoq</i> es zorro en quechua.')}
${tarjeta('B74', 'Atoqnina', 'Tola encendida', 'Fuego', 'camino 1', atoq('nina'), 'Sentado y aullando, con la cola de tola encendida y una melena de llamas en el cuello. <i>Nina</i> es fuego.')}
${tarjeta('B75', 'Wayratoq', 'Tola del viento', 'Fuego', 'camino 2', atoq('wayra'), 'Firme contra la ráfaga: agazapado con las patas abiertas clavadas en el suelo, la cabeza baja de frente al viento y las orejas para atrás. El viento le peina el pelo y le estira la cola de tola, que larga chispas. <i>Wayra</i> es viento.')}</div>
<div class="linea"><h3>Agua · parina</h3>
${tarjeta('B76', 'Pariwana', 'Parinita', 'Agua', 'base', pariwana(), 'Parina de la Laguna de Pozuelos: rosada, con el ala negra y roja, patas amarillas y pico curvo de punta negra. <i>Pariwana</i> es flamenco en quechua.')}
${tarjeta('B77', 'Qochawana', 'Parina grande', 'Agua', 'camino 1', pariwana('qocha'), 'Más grande, en pleno cortejo: abre las alas para mostrar el rojo y el negro y estira el cuello hacia arriba. <i>Qocha</i> es laguna.')}
${tarjeta('B78', 'Puyuwana', 'Parina chica', 'Agua', 'camino 2', pariwana('puyu'), 'En vuelo, con el cuello estirado adelante y las patas atrás, cruzando entre las nubes bajas de la Puna. <i>Puyu</i> es nube.')}</div>
</section>`;
const css = `@keyframes llama{0%,100%{transform:scale(1)}50%{transform:scale(1.12,.92)}}@keyframes chispas{0%,100%{opacity:.3}50%{opacity:1}}@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.9)}}@keyframes aleteo2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.85)}}@keyframes vuelo{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes nube{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}@keyframes gotas{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}@keyframes viento2{0%,100%{opacity:.3;transform:translateX(0)}50%{opacity:1;transform:translateX(6px)}}@keyframes chispas2{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(12px)}}@keyframes salto{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,4px)}}@keyframes remolino{0%,100%{opacity:.4}50%{opacity:1}}@keyframes paso{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes polvo{0%{opacity:.9;transform:translateX(0)}100%{opacity:0;transform:translateX(10px)}}@keyframes melena{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
.llama{animation:llama .5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.chispas circle{animation:chispas .8s ease-in-out infinite}.chispas circle:nth-child(2){animation-delay:.3s}.aleteo{animation:aleteo 1.6s ease-in-out infinite;transform-box:view-box}.aleteo2{animation:aleteo2 1.6s ease-in-out infinite;transform-box:view-box}.vuelo{animation:vuelo 1.6s ease-in-out infinite;transform-box:view-box}.nube{animation:nube 4s ease-in-out infinite;transform-box:view-box}.gotas path{animation:gotas 1.4s ease-in infinite;transform-box:fill-box}.viento2 path{animation:viento2 1s ease-in-out infinite;transform-box:view-box}.chispas2 circle{animation:chispas2 1s ease-out infinite;transform-box:view-box}.chispas2 circle:nth-child(2){animation-delay:.3s}.chispas2 circle:nth-child(3){animation-delay:.6s}.salto{animation:salto 1.4s ease-in-out infinite;transform-box:view-box}.remolino path{animation:remolino 1.4s ease-in-out infinite}.remolino path:nth-child(2){animation-delay:.5s}.paso{animation:paso 1s ease-in-out infinite;transform-box:view-box}.polvo circle{animation:polvo 1.2s ease-out infinite;transform-box:view-box}.polvo circle:nth-child(2){animation-delay:.4s}.melena{animation:melena .8s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-17.html', import.meta.url), pagina('Catálogo para aprobar · lote 8a', 'Iniciales de Jujuy: cuy, zorro colorado y parina', cuerpo, css));
console.log('ok');
