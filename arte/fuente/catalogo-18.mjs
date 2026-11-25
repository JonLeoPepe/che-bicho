// Catálogo para aprobar, lote 8b: pato de torrente, suri, chinchilla y vizcacha (Jujuy).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
const f1 = (n) => n.toFixed(1);
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const gotas = (pts) => `<g class="gotas">${pts.map(([x, y], i) => `<path d="M${x},${y} C${x - 2},${y + 4} ${x + 2},${y + 6} ${x + 3},${y + 2} C${x + 3},${y} ${x + 1},${y - 2} ${x},${y}Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1" style="animation-delay:${i * 0.25}s"/>`).join('')}</g>`;
const pelos = (x0, y0, w, h, n, col) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + ((i * 37) % w)},${y0 + ((i * 23) % h)} l-3,5" stroke="${col}" stroke-width="1.3" stroke-linecap="round"/>`).join('');
const copo = (x, y, r = 4) => `<path d="M${x - r},${y} L${x + r},${y} M${x},${y - r} L${x},${y + r} M${x - r * 0.7},${y - r * 0.7} L${x + r * 0.7},${y + r * 0.7} M${x + r * 0.7},${y - r * 0.7} L${x - r * 0.7},${y + r * 0.7}" stroke="#f4fbff" stroke-width="1.6" stroke-linecap="round"/>`;
const pataPalmeada = (x, y, col) => `<path d="M${x - 9},${y} L${x},${y - 4} L${x + 6},${y} L${x + 1},${y + 2}Z" fill="${col}" ${L(1.4)}/>`;
const pataAve = (x, y, dir = -1, col = '#b8a888') => `<path d="M${x},${y} l${dir * 12},2 M${x},${y} l${dir * 9},-3 M${x},${y} l${-dir * 6},1" stroke="${O}" stroke-width="4.4" stroke-linecap="round"/><path d="M${x},${y} l${dir * 12},2 M${x},${y} l${dir * 9},-3 M${x},${y} l${-dir * 6},1" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`;

// ───────── MAYUQ (Agua) · pato de torrente ─────────
const C_PT = { bl: '#f4f1ea', ne: '#22201e', pi: '#d23a2a', cu: '#4a4a52', cu2: '#7a7a84', ro: '#b8643a', pa: '#d8603a', ve: '#3a7a6a' };
const cabezaPato = (x, y, r = 0, s = 1, { ceno = false, abierto = false } = {}) => { const C = C_PT; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M14,-4 C14,-16 2,-20 -8,-16 C-14,-12 -16,-6 -16,0 C-16,6 -10,10 -2,10 C8,10 14,6 14,-4Z" fill="${C.bl}" ${L(2.4)}/>
  <path d="M-15,-6 C-10,-15 4,-20 14,-10 C10,-12 0,-14 -6,-10 C-10,-8 -13,-6 -15,-6Z" fill="${C.ne}"/><path d="M-3,-3 C4,-4 10,-2 14,4" stroke="${C.ne}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-16,-3 L-32,-1 C-34,1 -33,3 -31,3 L-16,4Z" fill="${C.pi}" ${L(1.8)}/>${abierto ? `<path d="M-16,4 L-30,8 L-16,7Z" fill="${C.pi}" ${L(1.4)}/>` : ''}<path d="M-31,-1 C-34,0 -34,3 -32,4" stroke="${O}" stroke-width="1.4" fill="none"/>
  ${ojoAlm(-6, -4, 3, 2, '#c84a2a')}${ceno ? `<path d="M-10,-8 L-2,-6" ${L(2.4)}/>` : ''}</g>`; };
const alaPato = (d, C = C_PT) => `<path d="${d}" fill="${C.cu}" ${L(2.2)}/>`;
export function mayuq(v = 'base') {
  const C = C_PT, k = nuevoId('pt');
  if (v === 'torrente') {
    const cu = 'M70,110 C74,96 100,90 126,94 C146,98 158,108 156,118 C152,128 130,132 104,130 C84,128 70,122 70,110Z';
    return `${sombra(96, 184, 46)}<g class="bucea"><g transform="rotate(32 110 112)"><defs>${clip(k, cu)}</defs>
      <path d="M150,106 L188,88 L180,104 L192,100 L172,116Z" fill="${C.ne}" ${L(2)}/>
      <path d="${cu}" fill="${C.cu}"/><g clip-path="url(#${k})">${Array.from({ length: 16 }, (_, i) => `<path d="M${80 + (i % 8) * 10},${100 + Math.floor(i / 8) * 12} l8,2" stroke="${C.cu2}" stroke-width="2"/>`).join('')}<ellipse cx="108" cy="132" rx="40" ry="8" fill="${C.ro}" opacity=".7"/></g><path d="${cu}" fill="none" ${L()}/>
      <g class="aleteo" style="transform-origin:120px 100px"><path d="M100,102 C114,76 140,64 164,64 C152,80 138,94 120,106Z" fill="${C.cu}" ${L(2.4)}/><path d="M118,96 C130,84 142,78 152,74" stroke="${C.ve}" stroke-width="4" fill="none"/><path d="M110,100 C124,82 140,72 160,68" stroke="${C.cu2}" stroke-width="1.4" fill="none"/></g>
      ${trazo('M136,126 L152,134', C.pa, 3.4)}${pataPalmeada(160, 136, C.pa)}
      ${trazo('M76,108 C66,106 60,104 54,104', C.bl, 9)}<path d="M72,102 C66,100 62,100 58,100" stroke="${C.ne}" stroke-width="2.4"/>
      ${cabezaPato(48, 104, 0, 1.1, { ceno: true })}</g></g>
      <g class="salpica" fill="none" stroke="#7fb2cc" stroke-width="2.4" stroke-linecap="round"><path d="M40,170 C44,156 52,150 60,152"/><path d="M84,172 C82,160 88,152 96,150"/><path d="M28,160 C30,150 34,146 40,146"/></g>${gotas([[34, 136], [70, 142], [92, 136], [52, 128]])}`;
  }
  if (v === 'laguna') {
    const cu = 'M78,112 C78,92 100,82 122,84 C144,86 156,100 154,120 C152,138 134,146 112,144 C90,142 78,132 78,112Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(114, 184, 50)}${gotas([[86, 170], [140, 168], [114, 176]])}
    <g class="aleteo" style="transform-origin:114px 100px">
      <path d="M100,98 C82,72 72,46 70,18 C88,30 104,58 114,92Z" fill="${C.cu}" ${L(2.4)}/>${[0, 1, 2, 3].map((i) => `<path d="M${74 + i * 4},${24 + i * 10} C${84 + i * 4},${40 + i * 8} ${94 + i * 3},${60 + i * 6} ${104 + i * 2},${82 + i * 4}" stroke="${C.cu2}" stroke-width="1.4" fill="none"/>`).join('')}<path d="M96,80 C100,86 104,90 108,94" stroke="${C.ve}" stroke-width="5"/>
      <path d="M130,96 C150,70 166,46 182,24 C180,52 164,80 142,102Z" fill="${C.cu}" ${L(2.4)}/>${[0, 1, 2, 3].map((i) => `<path d="M${178 - i * 4},${30 + i * 10} C${168 - i * 4},${46 + i * 8} ${156 - i * 3},${64 + i * 6} ${144 - i * 2},${86 + i * 4}" stroke="${C.cu2}" stroke-width="1.4" fill="none"/>`).join('')}<path d="M148,84 C144,90 140,94 136,98" stroke="${C.ve}" stroke-width="5"/>
    </g>
    ${trazo('M104,140 L98,160', C.pa, 3.4)}${pataPalmeada(98, 164, C.pa)}${trazo('M124,140 L128,158', C.pa, 3.4)}${pataPalmeada(130, 162, C.pa)}
    <g class="respira" style="transform-origin:114px 140px"><path d="${cu}" fill="${C.cu}"/><g clip-path="url(#${k})"><path d="M76,96 C90,110 96,130 104,150 L70,150Z" fill="${C.ro}"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${110 + (i % 4) * 10},${96 + Math.floor(i / 4) * 14} l8,2" stroke="${C.cu2}" stroke-width="2"/>`).join('')}</g><path d="${cu}" fill="none" ${L()}/>
      <path d="M150,124 L172,140 L160,142Z" fill="${C.ne}" ${L(1.8)}/></g>
    <g class="cabeza" style="transform-origin:96px 88px">${trazo('M94,94 C90,82 90,70 94,60', C.bl, 9)}<path d="M92,88 C90,80 90,72 92,64" stroke="${C.ne}" stroke-width="2.4" fill="none"/>${cabezaPato(98, 52, -20, 1.15, { abierto: true, ceno: true })}</g>`;
  }
  const cu = 'M86,98 C78,114 80,142 94,156 C108,168 136,166 146,150 C152,138 148,118 138,106 C126,94 102,90 86,98Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(116, 184, 40)}
  <path d="M140,148 L174,176 L166,160 L180,164Z" fill="${C.ne}" ${L(2)}/>
  ${trazo('M108,160 L104,178', C.pa, 3.4)}${pataPalmeada(104, 182, C.pa)}${trazo('M124,160 L128,178', C.pa, 3.4)}${pataPalmeada(130, 182, C.pa)}
  <g class="respira" style="transform-origin:114px 160px">
    <path d="${cu}" fill="${C.cu}"/><g clip-path="url(#${k})"><path d="M80,100 C92,116 96,140 100,166 L70,166Z" fill="${C.ro}"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${104 + (i % 4) * 10},${104 + Math.floor(i / 4) * 14} l8,3" stroke="${C.cu2}" stroke-width="2"/>`).join('')}</g><path d="${cu}" fill="none" ${L()}/>
    ${alaPato('M112,108 C130,104 146,118 148,140 C140,150 126,150 118,140 C112,130 110,118 112,108Z')}<path d="M124,124 C132,130 138,138 142,144" stroke="${C.ve}" stroke-width="4"/>
  </g>
  <g class="cabeza" style="transform-origin:94px 96px">${trazo('M94,102 C92,92 92,84 94,76', C.bl, 9)}<path d="M92,98 C90,90 90,84 92,78" stroke="${C.ne}" stroke-width="2.4" fill="none"/>${cabezaPato(98, 66, 0, 1.15)}</g>`;
}

// ───────── SURI (Común) · ñandú de la Puna ─────────
const C_SU = { pe: '#8a8478', so: '#5e594f', bl: '#ece6d6', pa: '#b8a888', pi: '#9a9282' };
const cabezaSuri = (x, y, r = 0, s = 1, { abierto = false, ceno = false } = {}) => { const C = C_SU; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M8,-4 C8,-11 0,-13 -6,-11 C-11,-9 -13,-4 -13,0 C-13,5 -6,7 0,7 C6,7 8,2 8,-4Z" fill="${C.pe}" ${L(2.2)}/>
  <path d="M-12,-3 L-26,-1 C-27,1 -26,3 -24,3 L-12,3Z" fill="${C.pi}" ${L(1.6)}/>${abierto ? `<path d="M-12,4 L-24,10 L-12,7Z" fill="${C.pi}" ${L(1.4)}/><path d="M-14,4 L-22,7" stroke="#7a1f1a" stroke-width="2"/>` : ''}
  ${ojoAlm(-3, -3, 2.8, 2, '#7a4a1a')}<path d="M-7,${ceno ? -6 : -7} L1,${ceno ? -5 : -7}" ${L(ceno ? 2.2 : 1.6)}/></g>`; };
const plumas = (pts, C = C_SU) => pts.map(([x, y, l, r]) => `<path d="M${x},${y} C${x - 3},${y + l * 0.5} ${x - 1},${y + l * 0.8} ${x + 2},${y + l}" transform="rotate(${r} ${x} ${y})" stroke="${O}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${x},${y} C${x - 3},${y + l * 0.5} ${x - 1},${y + l * 0.8} ${x + 2},${y + l}" transform="rotate(${r} ${x} ${y})" stroke="${C.pe}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');
const faldon = (x0, x1, y, h, n = 12, C = C_SU) => { let d = `M${x0},${y}`; for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; d += ` L${f1(x + (i % 2 ? 0 : 3))},${f1(y + (i % 2 ? h * 0.55 : h))}`; } d += ` L${x1},${y}Z`; return `<path d="${d}" fill="${C.so}" ${L(2)}/>${Array.from({ length: n / 2 }, (_, i) => { const x = x0 + ((x1 - x0) * (i * 2 + 1)) / n; return `<path d="M${f1(x)},${y} L${f1(x + 2)},${f1(y + h * 0.7)}" stroke="${C.pe}" stroke-width="1.4"/>`; }).join('')}`; };
const manchas = (x0, y0, w, h, n) => Array.from({ length: n }, (_, i) => `<ellipse cx="${x0 + ((i * 29) % w)}" cy="${y0 + ((i * 17) % h)}" rx="3" ry="2" fill="${C_SU.bl}" opacity=".9"/>`).join('');
export function suri(v = 'base') {
  const C = C_SU, k = nuevoId('su');
  if (v === 'corredor') {
    const cu = 'M64,92 C70,74 104,66 134,72 C156,76 168,90 162,108 C156,124 132,130 106,126 C84,122 62,112 64,92Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(104, 186, 60)}
    <g class="polvo" fill="#d9c9a8" stroke="#b8a888" stroke-width="1"><circle cx="170" cy="176" r="6"/><circle cx="184" cy="168" r="4"/><circle cx="160" cy="182" r="3"/></g>
    ${trazo('M124,122 L144,140 L162,134 L176,140', C.pa, 4.6)}${pataAve(178, 141, 1)}
    <g class="aleteo" style="transform-origin:120px 84px"><path d="M118,84 C124,58 146,40 172,36 C166,52 156,70 138,90Z" fill="${C.so}" ${L(2.4)}/>${plumas([[166, 40, 14, -60], [158, 50, 14, -50], [150, 62, 14, -40]])}</g>
    ${faldon(72, 156, 108, 26, 14)}<path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})">${manchas(84, 76, 70, 24, 14)}<ellipse cx="112" cy="128" rx="50" ry="10" fill="${C.so}" opacity=".6"/></g><path d="${cu}" fill="none" ${L()}/>
    
    ${trazo('M100,124 L86,148 L68,160 L48,178', C.pa, 4.6)}${pataAve(46, 180, -1)}
    <g class="cabeza" style="transform-origin:70px 90px">${trazo('M72,92 C58,84 46,74 34,68', C.pe, 9)}${cabezaSuri(28, 64, 10, 1.15, { ceno: true })}</g>`;
  }
  if (v === 'hatun') {
    const cu = 'M54,118 C56,86 92,70 130,74 C166,78 184,100 178,128 C172,150 140,160 108,158 C76,156 52,144 54,118Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(114, 186, 78)}
    ${trazo('M100,154 L94,182', C.pa, 5)}${pataAve(94, 183, -1)}${trazo('M130,154 L136,182', C.pa, 5)}${pataAve(136, 183, 1)}
    <g class="aleteo" style="transform-origin:116px 110px"><path d="M70,112 C48,118 26,134 14,156 C34,152 54,144 74,132Z" fill="${C.so}" ${L(2.4)}/>${plumas([[18, 150, 16, 70], [28, 142, 16, 60], [40, 134, 16, 50]])}<path d="M162,112 C184,116 200,132 206,152 C188,150 170,142 158,130Z" fill="${C.so}" ${L(2.4)}/>${plumas([[202, 146, 16, -70], [192, 138, 16, -60]])}</g>
    <g class="respira" style="transform-origin:116px 150px">${faldon(60, 174, 132, 34, 18)}<path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})">${manchas(70, 80, 100, 40, 26)}<ellipse cx="116" cy="158" rx="64" ry="12" fill="${C.so}" opacity=".6"/></g><path d="${cu}" fill="none" ${L()}/>
</g>
    <g class="cabeza" style="transform-origin:66px 100px">${trazo('M70,104 C54,96 52,80 60,70 C66,62 62,54 54,54', C.pe, 10)}${cabezaSuri(46, 56, 20, 1.3, { abierto: true, ceno: true })}</g>`;
  }
  const cu = 'M70,104 C74,82 108,72 138,80 C162,86 176,104 170,124 C164,142 140,150 112,148 C88,146 68,130 70,104Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(118, 186, 50)}
  ${trazo('M128,144 L136,164 L130,182', C.pa, 4.6)}${pataAve(130, 183, -1)}
  <g class="respira" style="transform-origin:118px 146px">${faldon(78, 166, 122, 30, 14)}<path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})">${manchas(90, 84, 70, 34, 18)}<ellipse cx="118" cy="148" rx="56" ry="10" fill="${C.so}" opacity=".6"/></g><path d="${cu}" fill="none" ${L()}/>
    <path d="M120,92 C140,92 158,102 164,118 C150,122 134,116 124,106Z" fill="${C.so}" ${L(2)}/></g>
  <g class="paso">${trazo('M106,144 L98,164 L90,182', C.pa, 4.6)}${pataAve(88, 183, -1)}</g>
  <g class="cabeza" style="transform-origin:80px 96px">${trazo('M82,100 C74,82 70,60 72,40', C.pe, 9)}${cabezaSuri(70, 36, 0, 1.15)}</g>`;
}

// ───────── roedores: helpers de pelaje y patas ─────────
const tufos = (pts, col) => pts.map(([x, y, a, l = 7]) => `<path d="M${x - 5},${y} C${x - 3},${y - l * 0.6} ${x - 2},${y - l} ${x + 2},${y - l} C${x + 1},${y - l * 0.5} ${x + 3},${y - 2} ${x + 5},${y}Z" transform="rotate(${a} ${x} ${y})" fill="${col}" ${L(1.8)}/>`).join('');
const estrella = (cx, cy, r, n = 11) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r * 0.74 : r; d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); } return d + 'Z'; };
const colaBrocha = (x0, y0, cx, cy, x1, y1, n, r0, r1, cols) => Array.from({ length: n }, (_, i) => { const t = i / (n - 1), x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1, r = r0 + (r1 - r0) * Math.sin(Math.PI * Math.min(t * 1.15, 1)); return `<path d="${estrella(x, y, r)}" fill="${cols[i % cols.length]}" ${L(1.6)}/>`; }).join('');
const pieLargo = (x, y, dir, col) => `<path d="M${x},${y - 4} C${x + dir * 6},${y - 7} ${x + dir * 22},${y - 5} ${x + dir * 28},${y - 1} C${x + dir * 30},${y + 2} ${x + dir * 26},${y + 3} ${x + dir * 20},${y + 3} L${x - dir * 2},${y + 3} C${x - dir * 5},${y + 2} ${x - dir * 4},${y - 3} ${x},${y - 4}Z" fill="${col}" ${L(1.8)}/>${[18, 23].map((d) => `<path d="M${x + dir * d},${y - 1} l${dir * 2},3" stroke="${O}" stroke-width="1.2"/>`).join('')}`;
const manito = (x, y, col) => `<path d="M${x - 5},${y - 2} C${x - 6},${y + 3} ${x + 5},${y + 4} ${x + 5},${y - 1} C${x + 4},${y - 5} ${x - 4},${y - 5} ${x - 5},${y - 2}Z" fill="${col}" ${L(1.6)}/><path d="M${x - 3},${y + 2} l-1,2 M${x},${y + 3} l0,2 M${x + 3},${y + 2} l1,2" stroke="${O}" stroke-width="1.1"/>`;

// ───────── CHINCHAY (Hielo) · chinchilla ─────────
const C_CH = { pe: '#a3adb5', so: '#737d86', lu: '#c4ccd2', bl: '#f0f2f2', or: '#d8b8c0', es: '#e6f4fb', es2: '#b8dcef' };
const cabezaChin = (x, y, r = 0, s = 1, { ceno = false, dientes = false, hielo = false } = {}) => { const C = C_CH; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M-2,-14 C-10,-30 -6,-44 4,-44 C14,-42 16,-28 8,-14Z" fill="${C.pe}" ${L(2)}/><path d="M0,-16 C-6,-28 -3,-38 4,-38 C10,-36 11,-26 6,-16Z" fill="${C.or}"/><path d="M3,-20 C2,-28 3,-34 5,-36 M5,-24 L8,-30" stroke="#b89aa2" stroke-width="1"/>
  <path d="M10,-12 C10,-28 20,-40 30,-36 C38,-30 32,-16 20,-8Z" fill="${C.so}" ${L(2)}/><path d="M13,-13 C14,-26 21,-33 27,-31 C32,-26 28,-17 19,-11Z" fill="${C.or}" opacity=".85"/>
  ${hielo ? `${[[2, -44], [28, -37]].map(([a, b]) => `<path d="M${a - 3},${b + 2} L${a},${b + 14} L${a + 3},${b + 2}Z" fill="${C.es}" ${L(1.2)}/>`).join('')}` : ''}
  <path d="M20,0 C20,-14 8,-20 -4,-19 C-16,-18 -24,-10 -27,-2 C-29,6 -24,12 -12,13 C4,14 20,10 20,0Z" fill="${C.pe}" ${L(2.4)}/>
  <path d="M-27,-2 C-24,6 -16,11 -6,12 C-12,8 -14,2 -13,-4Z" fill="${C.bl}"/><path d="M-6,-16 C2,-18 12,-14 18,-6" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-29,-3 C-28,-6 -25,-6 -24,-3Z" fill="#7a5a62" ${L(1)}/><path d="M-26,-2 L-26,3 C-24,5 -21,5 -20,4" ${L(1.2)} fill="none"/>${dientes ? `<path d="M-27,4 L-27,9 L-23,9 L-23,4Z" fill="#f2d890" ${L(1)}/>` : ''}
  ${[-10, -4, 2, 8].map((a) => `<path d="M-22,1 L-46,${a - 2}" stroke="${O}" stroke-width=".8"/>`).join('')}
  ${ojoAlm(-11, -6, 5.2, 3.6, '#16100e')}<path d="M-18,${ceno ? -11 : -12} C-12,-14 -5,-14 -2,${ceno ? -9 : -11}" ${L(ceno ? 3 : 2.2)} fill="none"/></g>`; };
export function chinchay(v = 'base') {
  const C = C_CH, k = nuevoId('chi');
  const cols = [C.pe, C.lu, C.so];
  if (v === 'real') {
    const cu = 'M78,182 C64,150 68,108 90,90 C106,78 132,82 142,100 C154,124 152,160 138,182Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(112, 188, 56)}
    <g class="cola" style="transform-origin:136px 176px">${colaBrocha(134, 176, 176, 182, 184, 146, 9, 9, 13, cols)}</g>
    ${pieLargo(84, 184, -1, C.so)}${pieLargo(128, 184, -1, C.pe)}
    <g class="respira" style="transform-origin:110px 182px">
      ${tufos([[72, 130, -80], [70, 150, -90], [146, 120, 70], [150, 142, 80]], C.pe)}
      <path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})"><path d="M84,110 C78,134 80,162 90,182 L112,182 C104,160 102,132 106,110Z" fill="${C.bl}"/>${pelos(112, 100, 34, 76, 22, C.so)}<ellipse cx="136" cy="162" rx="18" ry="22" fill="${C.so}" opacity=".45"/></g><path d="${cu}" fill="none" ${L()}/>
      <path d="M76,100 C84,84 100,80 116,84 L112,94 L120,98 L110,104 L116,112 L104,112 L106,122 L94,116 L90,128 L84,116 L76,124 C72,116 72,108 76,100Z" fill="${C.es}" ${L(2)}/>
      ${[[132, 86, 20], [142, 98, 40], [148, 114, 60], [150, 132, 80]].map(([x, y, r]) => `<path d="M${x - 4},${y + 4} L${x},${y - 12} L${x + 4},${y + 4}Z" transform="rotate(${r} ${x} ${y})" fill="${C.es2}" ${L(1.4)}/>`).join('')}
      ${trazo('M92,118 C86,128 90,136 98,136', C.so, 7)}${trazo('M110,118 C116,128 112,136 104,136', C.so, 7)}${manito(98, 137, C.pe)}${manito(106, 137, C.pe)}
    </g>
    <g class="cabeza" style="transform-origin:104px 84px">${cabezaChin(102, 70, -4, 1.3, { ceno: true, dientes: true, hielo: true })}</g>`;
  }
  if (v === 'cola') {
    return `${sombra(102, 188, 54)}
    <g class="ventisca">${[[30, 60], [52, 36], [176, 168], [190, 146], [156, 26], [30, 150], [122, 178], [70, 172]].map(([x, y]) => copo(x, y, 4)).join('')}</g>
    <g class="salto"><g transform="rotate(-14 104 110)">
      <g class="cola" style="transform-origin:140px 112px">${colaBrocha(140, 112, 176, 124, 204, 96, 11, 5, 8, cols)}</g>
      ${pieLargo(150, 128, 1, C.so)}${trazo('M128,116 L142,128 L150,126', C.so, 8)}
      ${tufos([[86, 92, -30], [104, 88, -10], [122, 90, 10], [138, 98, 40]], C.pe)}
      <path d="M68,112 C70,96 92,88 114,90 C136,92 148,102 146,114 C144,126 126,130 104,128 C86,128 68,124 68,112Z" fill="${C.pe}" ${L()}/>
      <path d="M74,120 C90,130 122,132 142,120 C138,128 124,132 104,130 C90,130 80,126 74,120Z" fill="${C.bl}"/>
      <ellipse cx="132" cy="112" rx="14" ry="12" fill="${C.so}" opacity=".45"/>
      ${trazo('M132,118 L148,132 L158,130', C.pe, 8)}${pieLargo(160, 132, 1, C.pe)}
      ${trazo('M84,122 L64,130 L52,128', C.pe, 6)}${manito(50, 128, C.pe)}${trazo('M90,124 L72,136 L60,136', C.so, 6)}${manito(58, 136, C.so)}
      ${cabezaChin(64, 102, -2, 1.15, { ceno: true })}
    </g></g>`;
  }
  const cu = 'M70,152 C66,124 88,108 116,108 C144,108 162,124 162,148 C162,168 144,176 118,176 L92,176 C78,176 70,168 70,152Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(112, 186, 60)}
  <g class="cola" style="transform-origin:156px 140px">${colaBrocha(156, 142, 186, 132, 176, 92, 10, 8, 12, cols)}</g>
  ${pieLargo(142, 182, -1, C.so)}
  <g class="respira" style="transform-origin:112px 176px">
    ${tufos([[90, 112, -30], [108, 108, -8], [126, 108, 10], [144, 114, 34], [158, 128, 60]], C.pe)}
    <path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})"><path d="M66,156 C90,172 130,176 166,160 L166,186 L66,186Z" fill="${C.bl}"/>${pelos(90, 114, 64, 40, 24, C.so)}<ellipse cx="140" cy="150" rx="22" ry="20" fill="${C.so}" opacity=".45"/></g><path d="${cu}" fill="none" ${L()}/>
    <path d="M118,130 C134,126 150,136 152,152" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${pieLargo(132, 184, -1, C.pe)}${trazo('M90,162 L86,180', C.pe, 7)}${manito(85, 182, C.pe)}${trazo('M100,164 L100,180', C.so, 7)}${manito(100, 182, C.so)}
  </g>
  <g class="cabeza" style="transform-origin:76px 140px">${cabezaChin(68, 138, 6, 1.15, { ceno: true })}</g>`;
}

// ───────── WISKACHA (Roca) · vizcacha de la sierra ─────────
const C_VI = { pe: '#a89a86', so: '#7a6e5e', lu: '#c4b8a4', bl: '#ece4d4', ne: '#2a2420', or: '#c9a898', pi: '#8f8b80', pi2: '#a8a498', li: '#c9c05a' };
const cabezaViz = (x, y, r = 0, s = 1, { ojos = 'abiertos', ceno = false, piedra = false, boca = false, orejas = 'arriba' } = {}) => { const C = C_VI;
  const o1 = orejas === 'atras' ? 'M8,-12 C18,-24 34,-30 44,-28 C40,-20 26,-12 14,-6Z' : 'M2,-12 C-4,-36 2,-52 9,-50 C16,-44 15,-28 11,-12Z';
  const o2 = orejas === 'atras' ? 'M12,-8 C24,-16 40,-18 48,-14 C42,-8 28,-4 16,-2Z' : 'M10,-12 C10,-36 20,-50 27,-46 C32,-38 25,-24 17,-10Z';
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="${o1}" fill="${C.so}" ${L(2)}/><path d="${o1}" fill="${C.or}" transform="translate(${orejas === 'atras' ? '4 2' : '2 4'}) scale(.8)" opacity=".8"/>
  <path d="${o2}" fill="${C.pe}" ${L(2)}/>
  ${piedra ? `<path d="M2,-38 L0,-50 L8,-52 L11,-40Z M18,-36 L24,-48 L30,-44 L24,-34Z" fill="${C.pi}" ${L(1.4)}/>` : ''}
  <path d="M18,-1 C18,-14 7,-19 -4,-17 C-15,-15 -23,-7 -25,2 C-25,9 -18,13 -5,13 C9,13 18,8 18,-1Z" fill="${C.pe}" ${L(2.4)}/>
  <path d="M-25,2 C-21,8 -13,12 -4,12 C-10,9 -12,4 -12,0Z" fill="${C.bl}"/><path d="M-27,0 C-26,-3 -23,-3 -22,0Z" fill="${C.ne}"/><path d="M-24,1 L-24,6 C-22,8 -19,8 -18,7" ${L(1.2)} fill="none"/>
  ${boca ? `<ellipse cx="-22" cy="9" rx="2.4" ry="2" fill="#5a1a14" ${L(1)}/>` : ''}
  ${[-14, -6, 2, 10].map((a) => `<path d="M-21,3 L-48,${a}" stroke="${C.ne}" stroke-width="1"/>`).join('')}
  <path d="M-2,-16 C6,-18 14,-14 18,-6" stroke="${C.ne}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  ${ojos === 'sueño' ? `<path d="M-14,-3 C-10,0 -5,0 -2,-3" ${L(2.2)} fill="none"/>` : ojos === 'medio' ? `<path d="M-14,-4 C-10,-6 -5,-6 -2,-4 C-5,-1 -10,-1 -14,-4Z" fill="#e8c040" ${L(1.6)}/><ellipse cx="-8" cy="-3.6" rx="1.4" ry="1" fill="${O}"/>` : `${ojoAlm(-8, -4, 4.4, 2.8, '#3a2a1a')}<path d="M-14,-6 C-10,-8 -4,-8 -1,-5" ${L(2.6)} fill="none"/>`}${ceno ? `<path d="M-14,-9 L-1,-6" ${L(2.8)}/>` : ''}</g>`; };
export function wiskacha(v = 'base') {
  const C = C_VI, k = nuevoId('vi');
  if (v === 'piedra') {
    const cu = 'M82,182 C70,152 74,112 94,94 C110,82 134,88 142,106 C152,130 150,160 138,182Z';
    const lajas = [[120, 96, 20, 12, 20], [134, 112, 20, 12, 50], [140, 132, 18, 12, 70], [138, 152, 18, 12, 80], [108, 90, 16, 10, -10]];
    return `<defs>${clip(k, cu)}</defs>${sombra(118, 188, 58)}
    <g class="cola">${trazo('M136,170 C160,172 176,176 188,182', C.pe, 8)}${[[154, 172], [168, 176], [180, 180]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="5" fill="${C.pi}" ${L(1.4)}/>`).join('')}<path d="M186,180 C196,178 198,188 190,188 C186,188 184,184 186,180Z" fill="${C.ne}" ${L(1.4)}/></g>
    ${pieLargo(88, 186, -1, C.so)}${pieLargo(126, 186, -1, C.pe)}
    <g class="respira" style="transform-origin:112px 182px">
      <path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})"><path d="M88,110 C82,136 84,164 94,182 L112,182 C106,160 104,134 108,110Z" fill="${C.bl}"/><ellipse cx="134" cy="164" rx="18" ry="20" fill="${C.so}" opacity=".45"/></g><path d="${cu}" fill="none" ${L()}/>
      ${lajas.map(([x, y, w, h, r], i) => `<g transform="rotate(${r} ${x} ${y})"><path d="M${x - w / 2},${y + h / 2} L${x - w / 2 + 3},${y - h / 2} L${x + w / 2 - 2},${y - h / 2 - 2} L${x + w / 2},${y + h / 2 - 2}Z" fill="${i % 2 ? C.pi : C.pi2}" ${L(1.8)}/><path d="M${x - 3},${y - 3} l4,5 l-2,3" stroke="#6a665c" stroke-width="1" fill="none"/>${i % 2 === 0 ? `<circle cx="${x + 4}" cy="${y + 1}" r="2" fill="${C.li}"/>` : ''}</g>`).join('')}
      ${trazo('M96,118 L84,128 L80,122', C.so, 7)}${manito(78, 120, C.so)}${trazo('M110,120 L100,132 L94,128', C.pe, 7)}${manito(92, 126, C.pe)}
    </g>
    <g class="silbido" fill="none" stroke="#7a6e5e" stroke-width="2" stroke-linecap="round"><path d="M56,70 C50,66 50,58 54,54"/><path d="M46,76 C38,68 38,54 46,46"/></g>
    <g class="cabeza" style="transform-origin:96px 86px">${cabezaViz(90, 76, -4, 1.25, { ceno: true, piedra: true, boca: true })}</g>`;
  }
  if (v === 'sol') {
    return `<g class="sol"><circle cx="108" cy="138" r="64" fill="#f2c23a" opacity=".16"/>${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M${f1(108 + Math.cos(a) * 66)},${f1(138 + Math.sin(a) * 66)} L${f1(108 + Math.cos(a) * 76)},${f1(138 + Math.sin(a) * 76)}" stroke="#e2a72e" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`; }).join('')}</g>
    ${sombra(108, 186, 56)}
    <g class="respira2" style="transform-origin:108px 182px">
      ${tufos([[86, 104, -30], [108, 98, 0], [130, 104, 30], [148, 122, 60]], C.pe)}
      <path d="M62,150 C60,118 84,100 110,100 C138,100 158,120 156,150 C154,172 134,182 108,182 C82,182 64,172 62,150Z" fill="${C.pe}" ${L()}/>
      <path d="M78,112 C94,102 124,102 142,114" stroke="${C.ne}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M80,124 C96,116 124,116 140,126" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${trazo('M150,160 C150,180 120,190 90,184 C76,182 66,176 64,168', C.pe, 9)}<path d="M64,168 C58,162 52,170 56,176 C60,180 66,176 64,168Z" fill="${C.ne}" ${L(1.6)}/>
      ${pieLargo(118, 178, -1, C.so)}${manito(84, 168, C.pe)}
    </g>
    <g class="cabeza" style="transform-origin:76px 150px">${cabezaViz(72, 150, 16, 1.1, { ojos: 'medio', orejas: 'atras' })}</g>`;
  }
  const cu = 'M76,178 C66,152 74,120 98,110 C120,102 146,114 152,140 C158,164 146,180 126,180Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(112, 188, 58)}
  <g class="cola" style="transform-origin:150px 160px">${trazo('M148,162 C172,160 184,138 178,112 C174,98 162,98 160,108', C.pe, 7)}<path d="M160,108 C156,98 164,90 170,96 C174,102 168,110 160,108Z" fill="${C.ne}" ${L(1.6)}/>${tufos([[178, 120, 70, 6], [182, 132, 90, 6], [176, 146, 110, 6]], C.pe)}</g>
  ${pieLargo(152, 186, -1, C.so)}
  <g class="respira" style="transform-origin:112px 180px">
    ${tufos([[100, 108, -20], [120, 106, 4], [140, 116, 34], [152, 134, 64]], C.pe)}
    <path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})"><path d="M84,124 C78,146 80,168 90,180 L106,180 C100,162 98,142 102,124Z" fill="${C.bl}"/><path d="M110,104 C136,112 152,138 150,172" stroke="${C.ne}" stroke-width="3" fill="none"/>${pelos(108, 118, 40, 50, 16, C.so)}<ellipse cx="136" cy="160" rx="20" ry="20" fill="${C.so}" opacity=".45"/></g><path d="${cu}" fill="none" ${L()}/>
    ${pieLargo(142, 188, -1, C.pe)}${trazo('M88,150 L86,182', C.so, 7)}${manito(85, 184, C.so)}${trazo('M98,152 L98,182', C.pe, 7)}${manito(98, 184, C.pe)}
  </g>
  <g class="cabeza" style="transform-origin:90px 112px">${cabezaViz(84, 104, 6, 1.2, { ojos: 'medio' })}</g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Los nombres también son propuesta.</div>
<section>
<div class="linea"><h3>Agua · pato de torrente</h3>
${tarjeta('B79', 'Mayuq', 'Patito', 'Agua', 'base', mayuq(), 'Pato de torrente parado y alerta: cabeza blanca con rayas negras, pico rojo, pecho canela y cola dura en punta para remar en la corriente. <i>Mayu</i> es río.')}
${tarjeta('B80', 'Torrentero', 'Pato de torrente', 'Agua', 'camino 1', mayuq('torrente'), 'Se zambulle de cabeza en el agua blanca con las alas medio abiertas y la cola dura para atrás; salpica para todos lados.')}
${tarjeta('B81', 'Totorero', 'Pato de laguna', 'Agua', 'camino 2', mayuq('laguna'), 'Más grande, levanta vuelo de la laguna batiendo las alas, con el espejo verde a la vista y el pico abierto.')}</div>
<div class="linea"><h3>Común · suri</h3>
${tarjeta('B82', 'Suri', 'Suri', 'Común', 'base', suri(), 'El ñandú de la Puna caminando: gris pardo con pintas blancas en el lomo, plumas largas que cuelgan y patas escamosas. Conserva su nombre.')}
${tarjeta('B83', 'Zancadón', 'Suri corredor', 'Común', 'camino 1', suri('corredor'), 'A toda carrera con el cuello estirado adelante y una zancada enorme; usa el ala levantada como timón y levanta polvo.')}
${tarjeta('B84', 'Hatunsuri', 'Suri de la Puna', 'Común', 'camino 2', suri('hatun'), 'El macho que defiende el nido: inflado y enorme, con el faldón de plumas abierto, las alas extendidas y bajas, el cuello en S y el pico abierto, bufando. <i>Hatun</i> es grande.')}</div>
<div class="linea"><h3>Hielo · chinchilla</h3>
${tarjeta('B85', 'Chinchay', 'Chinchilla', 'Hielo', 'base', chinchay(), 'Chinchilla agazapada lista para saltar: orejas grandes con venas, bigotes larguísimos, patas traseras largas y pelaje gris azulado tan denso que se le eriza; la cola es una brocha enrulada sobre el lomo.')}
${tarjeta('B86', 'Rasuchay', 'Chinchilla real', 'Hielo', 'camino 1', chinchay('real'), 'Grande y erguida como centinela, con el pecho afuera: gorguera de escarcha, cristales de hielo a lo largo del lomo y carámbanos en la punta de las orejas. Muestra los dientes. <i>Rasu</i> es nieve.')}
${tarjeta('B87', 'Ventisca', 'Chinchilla de cola larga', 'Hielo', 'camino 2', chinchay('cola'), 'En pleno salto entre las piedras, estirada, con las patas traseras largas empujando y una cola larguísima que deja un remolino de copos.')}</div>
<div class="linea"><h3>Roca · vizcacha de la sierra</h3>
${tarjeta('B88', 'Wiskacha', 'Vizcachita', 'Roca', 'base', wiskacha(), 'Vizcacha de la sierra sentada de perfil, encorvada, con las patas traseras largas: orejas de conejo, bigotes negros larguísimos, raya oscura en el lomo, ojos amarillos entornados y cola enrulada con la punta negra.')}
${tarjeta('B89', 'Rumiwiska', 'Vizcacha de piedra', 'Roca', 'camino 1', wiskacha('piedra'), 'Parada en dos patas de centinela y silbando la alarma, con lajas de piedra con líquenes en el lomo, puntas de piedra en las orejas y anillos de piedra en la cola. <i>Rumi</i> es piedra.')}
${tarjeta('B90', 'Solera', 'Vizcacha dormilona', 'Roca', 'camino 2', wiskacha('sol'), 'Hecha un ovillo al sol de la mañana, con la cola rodeándola y las orejas echadas para atrás; tiene un ojo entreabierto. Si la despertás, se enoja.')}</div>
</section>`;
const css = `@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.88)}}@keyframes bucea{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,4px)}}@keyframes salpica{0%,100%{opacity:.4}50%{opacity:1}}@keyframes gotas{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}@keyframes paso{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes polvo{0%{opacity:.9;transform:translateX(0)}100%{opacity:0;transform:translateX(10px)}}@keyframes ventisca{0%,100%{transform:rotate(0)}50%{transform:rotate(6deg)}}@keyframes salto{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes sol{0%,100%{opacity:.85}50%{opacity:1}}@keyframes silbido{0%{opacity:0}30%,60%{opacity:1}100%{opacity:0}}@keyframes respira2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.04)}}
.aleteo{animation:aleteo 1.4s ease-in-out infinite;transform-box:view-box}.bucea{animation:bucea 1.4s ease-in-out infinite;transform-box:view-box}.salpica path{animation:salpica 1s ease-in-out infinite}.gotas path{animation:gotas 1.4s ease-in infinite;transform-box:fill-box}.paso{animation:paso 1.2s ease-in-out infinite;transform-box:view-box;transform-origin:106px 144px}.polvo circle{animation:polvo 1.2s ease-out infinite;transform-box:view-box}.ventisca{animation:ventisca 3s ease-in-out infinite;transform-box:view-box;transform-origin:100px 100px}.salto{animation:salto 1.4s ease-in-out infinite;transform-box:view-box}.sol{animation:sol 3s ease-in-out infinite}.silbido path{animation:silbido 1.4s ease-out infinite}.silbido path:nth-child(2){animation-delay:.2s}.respira2{animation:respira2 3.4s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-18.html', import.meta.url), pagina('Catálogo para aprobar · lote 8b', 'Bichos de Jujuy: pato de torrente, suri, chinchilla y vizcacha', cuerpo, css));
console.log('ok');
