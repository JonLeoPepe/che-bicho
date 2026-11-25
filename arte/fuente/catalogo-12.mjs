// Catálogo para aprobar, lote 5d: mitos de Corrientes (Pombero y Yasí Yateré).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
const f1 = (n) => n.toFixed(1);
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const peludo = (cx, cy, rx, ry, n = 26, amp = 5) => {
  let d = '';
  for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 1 : 1 + amp / Math.min(rx, ry); d += (i ? ' L' : 'M') + f1(cx + Math.cos(a) * rx * r) + ',' + f1(cy + Math.sin(a) * ry * r); }
  return d + 'Z';
};
// ala de paja deshilachada (amplitud absoluta)
const fleco = (rx, ry, n, amp) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, k = i % 2 ? 0 : amp; d += (i ? ' L' : 'M') + f1(Math.cos(a) * (rx + k)) + ',' + f1(Math.sin(a) * (ry + k * 0.5)); } return d + 'Z'; };
const sombreroPaja = (x, y, s = 1, r = 0, C, pluma = false) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M-24,2 C-22,-18 -14,-32 0,-34 C14,-32 22,-18 24,2Z" fill="${C.pa}" ${L(2.4)}/>
  <path d="M-12,-26 C-6,-20 -4,-12 -4,-6 M6,-30 C8,-22 8,-14 8,-8" stroke="${C.pa2}" stroke-width="1.4" fill="none"/>
  <path d="M-23,-7 C-10,-11 10,-11 23,-7 L24,1 C10,-3 -10,-3 -24,1Z" fill="${C.ba}" ${L(1.4)}/>
  ${pluma ? `<path d="M14,-8 C22,-22 30,-30 38,-34 C34,-24 26,-14 18,-6Z" fill="#c8362b" ${L(1.6)}/><path d="M16,-8 C24,-18 30,-26 36,-32" stroke="#8a1f1a" stroke-width="1" fill="none"/>` : ''}
  <path d="${fleco(52, 10, 30, 3)}" fill="${C.pa}" ${L(2.2)}/>
  <path d="M-40,2 C-20,8 20,8 40,2 M-30,-3 C-10,1 10,1 30,-3" stroke="${C.pa2}" stroke-width="1.4" fill="none"/></g>`;
const garra = (x, y, ang, col) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M-6,-2 C-6,-9 6,-9 6,-2 C6,4 3,6 0,6 C-3,6 -6,4 -6,-2Z" fill="${col}" ${L(2)}/>${trazo('M-4,4 L-6,13', col, 2.4)}${trazo('M0,5 L0,15', col, 2.4)}${trazo('M4,4 L7,12', col, 2.4)}</g>`;
const pie = (x, y, dir, col) => `<path d="M${x},${y} C${x},${y - 9} ${x + dir * 14},${y - 11} ${x + dir * 26},${y - 5} C${x + dir * 30},${y - 2} ${x + dir * 28},${y + 2} ${x + dir * 22},${y + 2} L${x + dir * 2},${y + 2}Z" fill="${col}" ${L(2.2)}/><path d="M${x + dir * 20},${y - 4} l${dir * 2},5 M${x + dir * 14},${y - 5} l${dir},6" ${L(1.4)}/>`;

// ───────── POMBERO (Mito) ─────────
function pombero(v = 'base') {
  const k = nuevoId('pb');
  if (v === 'monte') {
    const C = { pe: '#3f3a26', so: '#2a2618', lu: '#5c5636', pi: '#7a6244', pa: '#b9a35a', pa2: '#86733a', ba: '#4f6a2a', oj: '#d8f05a' };
    const torso = peludo(100, 112, 34, 44, 26, 5);
    const hoja = (x, y, r) => `<path d="M${x},${y} c-8,-3 -12,-10 -8,-14 c4,4 10,8 8,14Z" fill="#5f8a3a" transform="rotate(${r} ${x} ${y})" ${L(1.2)}/>`;
    return `<defs>${clip(k, torso)}</defs>${sombra(102, 184, 52)}
    ${trazo('M88,148 L84,166 L86,178', C.pe, 16)}${trazo('M114,148 L118,166 L116,178', C.so, 16)}${pie(86, 182, -1, C.pi)}${pie(114, 182, 1, C.pi)}
    <g class="respira" style="transform-origin:100px 156px">
      <path d="${torso}" fill="${C.pe}" ${L(2.4)}/><g clip-path="url(#${k})"><ellipse cx="112" cy="150" rx="40" ry="16" fill="${C.so}" opacity=".6"/>
        <path d="M66,86 C84,78 116,78 136,88 C120,92 106,90 100,94 C92,90 80,92 66,86Z" fill="#6f9a3a"/>${[[72, 88], [92, 84], [116, 86], [132, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#86b04a"/>`).join('')}</g>
      <path d="M74,92 C70,110 76,128 70,146 M128,92 C134,112 128,130 134,150" stroke="#3f6a2a" stroke-width="2.4" fill="none"/>${hoja(71, 118, -20)}${hoja(132, 128, 30)}${hoja(72, 140, 10)}
      ${trazo('M128,96 C142,116 148,134 148,150', C.pe, 12)}
      <g transform="translate(150 158)"><path d="M-10,-6 C-16,4 -14,18 0,20 C14,18 16,4 10,-6 C8,-12 4,-14 0,-14 C-4,-14 -8,-12 -10,-6Z" fill="#c98a2a" ${L(2.2)}/><path d="M-5,-14 L-5,-20 L5,-20 L5,-14" fill="#8a5a2a" ${L(1.8)}/><path d="M-4,-6 C-2,0 -6,6 -4,12" stroke="#f2c25a" stroke-width="2" fill="none"/><g class="gota"><path d="M8,14 C7,18 9,21 10,18 C10,16 9,15 8,14Z" fill="#f2b03a" ${L(1)}/></g></g>
      ${garra(146, 150, 10, C.pi)}
      ${trazo('M72,94 C58,80 52,62 54,44', C.pe, 12)}${garra(54, 40, 180, C.pi)}
      <g class="pajaro" transform="translate(56 26)"><path d="M-8,4 C-10,-4 -2,-8 6,-6 C12,-4 14,2 10,6 C4,8 -4,8 -8,4Z" fill="#8f949a" ${L(1.6)}/><path d="M8,4 L20,8 L10,8Z" fill="#5a5f66" ${L(1.2)}/><circle cx="-6" cy="-6" r="6" fill="#c8362b" ${L(1.6)}/><path d="M-6,-12 L-4,-20 L-1,-11Z" fill="#c8362b" ${L(1.2)}/><path d="M-12,-6 L-16,-4 L-12,-3Z" fill="#e0c8a0" ${L(1)}/><circle cx="-8" cy="-7" r="1.4" fill="${O}"/></g>
    </g>
    <g class="cabeza" style="transform-origin:100px 80px">
      <path d="${peludo(100, 78, 26, 20, 20, 4)}" fill="${C.pe}" ${L(2.4)}/>
      <ellipse cx="100" cy="68" rx="24" ry="9" fill="#141009"/>
      <g class="brilla"><circle cx="91" cy="70" r="7" fill="${C.oj}" opacity=".25"/><circle cx="109" cy="70" r="7" fill="${C.oj}" opacity=".25"/></g><circle cx="91" cy="70" r="3.2" fill="${C.oj}"/><circle cx="109" cy="70" r="3.2" fill="${C.oj}"/>
      <path d="M96,74 C93,80 95,88 101,88 C107,88 108,80 104,74Z" fill="${C.pi}" ${L(1.8)}/>
      <g transform="translate(100 62)">${[[-16, -30, -26], [2, -34, 6], [18, -28, 30]].map(([x, y, r]) => `<path d="M${x},-12 C${x - 4},${y + 8} ${x + 2},${y} ${x + 6},${y - 6}" stroke="#4f7a2a" stroke-width="2.6" fill="none"/>${hoja(x + 6, y - 2, r)}`).join('')}</g>
      ${sombreroPaja(100, 62, 1.05, 3, C)}
      <path d="M58,64 C56,74 60,84 58,94 M142,66 C146,76 142,86 146,96" stroke="#3f6a2a" stroke-width="2" fill="none"/>${hoja(58, 96, 0)}${hoja(146, 98, 20)}
    </g>`;
  }
  if (v === 'silbador') {
    const C = { pe: '#5a4636', so: '#3a2c22', lu: '#7a6250', pi: '#9a7656', pa: '#d9b56a', pa2: '#a9853e', ba: '#3a2a22', oj: '#f2d23a' };
    const torso = peludo(0, 0, 22, 32, 22, 4);
    return `<defs>${clip(k, torso)}</defs>${sombra(108, 184, 46)}
    <g class="silbido" fill="none" stroke="#f2d23a" stroke-width="2.6" stroke-linecap="round"><path d="M48,74 C42,68 42,58 48,52"/><path d="M38,80 C28,70 28,52 38,42"/><path d="M28,86 C14,72 14,46 28,32"/></g>
    ${trazo('M124,102 L144,116 L158,104', C.so, 10)}${garra(160, 100, -120, C.pi)}
    ${trazo('M124,136 L148,146 L166,130', C.so, 13)}<g transform="translate(168 128) rotate(-50)">${pie(0, 0, 1, C.pi)}</g>
    <g class="respira" style="transform-origin:110px 150px">
      <g transform="translate(114 116) rotate(28)"><path d="${torso}" fill="${C.pe}" ${L(2.4)}/><g clip-path="url(#${k})"><ellipse cx="-14" cy="10" rx="10" ry="26" fill="${C.lu}" opacity=".55"/><ellipse cx="14" cy="20" rx="14" ry="20" fill="${C.so}" opacity=".5"/></g></g>
    </g>
    ${trazo('M106,138 L88,156 L100,174', C.pe, 14)}<path d="M92,184 C92,176 100,172 110,176 C114,180 112,184 108,184Z" fill="${C.pi}" ${L(2.2)}/>
    <g class="cabeza" style="transform-origin:84px 84px">
      <path d="${peludo(84, 70, 22, 20, 20, 4)}" fill="${C.pe}" ${L(2.4)}/>
      <path d="M64,58 C70,50 82,50 88,56 C92,64 90,76 84,82 L66,84 C60,76 60,66 64,58Z" fill="${C.pi}" ${L(2)}/>
      <path d="M66,66 C58,68 50,74 48,80 C52,84 60,82 66,76Z" fill="${C.pi}" ${L(2)}/>
      ${ojoAlm(74, 64, 4.4, 3, '#e0a020')}
      <path d="M64,58 C70,52 80,54 84,60" stroke="${O}" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      <path d="M68,78 C72,74 78,74 80,78" ${L(1.6)} fill="none"/>
      <path d="${peludo(76, 90, 16, 9, 14, 3)}" fill="${C.lu}" ${L(2)}/>
      <g transform="translate(80 44) rotate(40)">${sombreroPaja(22, -4, 0.82, 0, C, true)}</g>
    </g>
    ${trazo('M104,100 L94,112 L72,90', C.pe, 10)}
    <g transform="translate(68 84) rotate(-130)"><path d="M-6,-2 C-6,-9 6,-9 6,-2 C6,4 3,6 0,6 C-3,6 -6,4 -6,-2Z" fill="${C.pi}" ${L(2)}/>${trazo('M-2,5 L-2,14', C.pi, 2.6)}${trazo('M3,5 L3,14', C.pi, 2.6)}</g>`;
  }
  const C = { pe: '#4a3628', so: '#2f2219', lu: '#6a5040', pi: '#8a6448', pa: '#d9b56a', pa2: '#a9853e', ba: '#3a2a22', oj: '#f2d23a' };
  const torso = peludo(100, 124, 38, 32, 24, 5);
  return `<defs>${clip(k, torso)}</defs>${sombra(100, 184, 56)}
  ${trazo('M84,144 L66,160 L72,176', C.pe, 15)}${trazo('M116,144 L134,160 L128,176', C.so, 15)}${pie(74, 182, -1, C.pi)}${pie(126, 182, 1, C.pi)}
  <g class="respira" style="transform-origin:100px 156px">
    <path d="${torso}" fill="${C.pe}" ${L(2.4)}/><g clip-path="url(#${k})"><ellipse cx="112" cy="152" rx="42" ry="14" fill="${C.so}" opacity=".6"/><path d="M80,112 C88,122 112,122 120,112" stroke="${C.lu}" stroke-width="6" fill="none" opacity=".6"/></g>
    ${trazo('M72,108 C58,126 52,146 50,160', C.pe, 13)}${garra(50, 164, 6, C.pi)}
    ${trazo('M128,108 C142,126 148,146 150,160', C.so, 13)}${garra(150, 164, -6, C.pi)}
  </g>
  <g class="cabeza" style="transform-origin:100px 96px">
    <path d="${peludo(100, 98, 28, 20, 22, 4)}" fill="${C.pe}" ${L(2.4)}/>
    <ellipse cx="100" cy="86" rx="25" ry="9" fill="#1d140e"/>
    <g class="brilla"><circle cx="90" cy="87" r="7" fill="${C.oj}" opacity=".25"/><circle cx="110" cy="87" r="7" fill="${C.oj}" opacity=".25"/></g><circle cx="90" cy="87" r="3.2" fill="${C.oj}"/><circle cx="110" cy="87" r="3.2" fill="${C.oj}"/>
    <path d="M96,91 C93,97 95,104 101,104 C107,104 108,97 104,91Z" fill="${C.pi}" ${L(1.8)}/>
    ${sombreroPaja(100, 80, 1.08, -5, C)}
  </g>`;
}

// ───────── YASÍ YATERÉ (Mito) · duende ─────────
const CY = { sk: '#a68a52', sh: '#7a6236', vi: '#cdb37c', pe: '#f0c64a', pe2: '#c99a2a', pa: '#e6c27a', pa2: '#b8924a', ba: '#b83a2a', oro: '#e9b830', ro: '#fff2a8', or: '#8a5a4a' };
const baston = (x1, y1, x2, y2) => `${trazo(`M${x1},${y1} L${x2},${y2}`, CY.oro, 4.4)}<circle cx="${x1}" cy="${y1}" r="7" fill="${CY.oro}" ${L(2.2)}/><circle cx="${x1 - 2}" cy="${y1 - 2}" r="2.4" fill="${CY.ro}"/>`;
const zarpa = (x, y, ang, col = CY.sk) => `<g transform="translate(${x} ${y}) rotate(${ang})"><ellipse cx="0" cy="0" rx="4.4" ry="5" fill="${col}" ${L(1.8)}/>${[-3, 0, 3].map((dx) => `${trazo(`M${dx},3 L${dx * 1.8},12`, col, 1.8)}<path d="M${dx * 1.8},12 l${dx * 0.3},4" stroke="#2a1c15" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>`;
const patita = (x, y, dir) => `<path d="M${x},${y} C${x + dir * 4},${y - 6} ${x + dir * 14},${y - 6} ${x + dir * 18},${y - 1} L${x + dir * 18},${y + 1} L${x},${y + 1}Z" fill="${CY.sk}" ${L(1.8)}/>${[8, 13, 18].map((d) => `<path d="M${x + dir * d},${y} l${dir * 4},1" stroke="#2a1c15" stroke-width="1.8" stroke-linecap="round"/>`).join('')}`;
const cola = (d) => `${trazo(d, CY.sh, 4.4)}`;
const pajas = (x, y, w) => `<path d="M${x - w},${y} L${x + w},${y} L${x + w + 2},${y + 5} L${x - w - 2},${y + 5}Z" fill="${CY.pa2}" ${L(1.6)}/>${Array.from({ length: Math.round(w / 2.6) }, (_, i) => { const xx = x - w + 2 + i * 5.2; return `<path d="M${xx},${y + 5} L${xx + (i % 2 ? 2 : -2)},${y + 18 + (i % 3) * 2}" stroke="#2a1c15" stroke-width="3.4" stroke-linecap="round"/><path d="M${xx},${y + 5} L${xx + (i % 2 ? 2 : -2)},${y + 18 + (i % 3) * 2}" stroke="${CY.pa}" stroke-width="1.8" stroke-linecap="round"/>`; }).join('')}`;
const torsoD = 'M84,104 C78,118 80,132 88,140 C98,146 112,144 116,136 C120,122 118,106 108,98 C100,94 90,96 84,104Z';
// cabeza de duende: orejas enormes, ojos amarillos de pupila rasgada, nariz larga, sonrisa de dientes finos
const cabezaD = (x, y, r = 0, { orejas = 'abiertas', boca = 'sonrisa', ojos = 'abiertos' } = {}) => {
  const C = CY;
  const oi = orejas === 'atras' ? 'M-12,-6 C-24,-18 -34,-30 -46,-40 C-42,-26 -30,-8 -14,4Z' : orejas === 'caidas' ? 'M-12,-2 C-26,4 -36,16 -44,30 C-30,26 -18,14 -12,8Z' : 'M-12,-4 C-26,-12 -38,-18 -52,-20 C-42,-10 -28,2 -12,6Z';
  const od = orejas === 'atras' ? 'M12,-6 C22,-20 30,-32 38,-44 C38,-28 28,-8 14,4Z' : orejas === 'caidas' ? 'M12,-2 C26,4 36,16 44,30 C30,26 18,14 12,8Z' : 'M12,-4 C26,-14 40,-22 54,-26 C46,-12 30,2 12,6Z';
  const ojo = (cx, cy) => ojos === 'siesta' ? (cx < 0 ? `<path d="M${cx - 4},${cy} C${cx - 2},${cy + 2} ${cx + 2},${cy + 2} ${cx + 4},${cy}" ${L(1.8)} fill="none"/>` : `<path d="M${cx - 4.4},${cy} C${cx - 2},${cy - 2} ${cx + 2},${cy - 2} ${cx + 4.4},${cy} C${cx + 2},${cy + 1.6} ${cx - 2},${cy + 1.6} ${cx - 4.4},${cy}Z" fill="#e8c020" ${L(1.6)}/><ellipse cx="${cx}" cy="${cy}" rx=".8" ry="1.4" fill="#1b120e"/>`) : ojoAlm(cx, cy, 4.6, 3.2, '#e8c020', 'vertical');
  return `<g transform="translate(${x} ${y}) rotate(${r})">
    <g class="oreja"><path d="${oi}" fill="${C.sk}" ${L(2)}/><path d="${oi}" fill="${C.or}" transform="translate(-4 0) scale(.7) translate(-4 0)" opacity=".6"/></g>
    <g class="oreja2"><path d="${od}" fill="${C.sk}" ${L(2)}/><path d="${od}" fill="${C.or}" transform="translate(4 0) scale(.7) translate(4 0)" opacity=".6"/></g>
    <path d="M-16,-2 C-16,-16 -6,-22 2,-22 C14,-22 20,-12 18,2 C16,12 8,20 0,20 C-10,20 -16,10 -16,-2Z" fill="${C.sk}" ${L(2.4)}/>
    <path d="M-14,8 C-8,16 -2,19 0,20 C-8,20 -14,14 -14,8Z" fill="${C.sh}" opacity=".7"/>
    <path d="M-12,-4 C-12,-1 -10,1 -8,2 M12,-6 C12,-2 10,0 8,2 M-6,12 C-8,14 -10,14 -12,13" stroke="${C.sh}" stroke-width="1.2" fill="none"/>
    ${ojo(-7, -4)}${ojo(8, -5)}
    <path d="M-13,-10 L-3,-7 M3,-8 L14,-12" stroke="#2a1c15" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M0,-4 C-1,2 -3,8 -7,11 C-3,12 1,10 2,6Z" fill="${C.sk}" ${L(1.8)}/>
    ${boca === 'abierta' ? `<path d="M-10,12 C-4,20 6,20 12,10 C6,14 -4,15 -10,12Z" fill="#5a1a14" ${L(1.6)}/><path d="M-8,13 l1.4,3 l1.4,-2.6 l1.4,3 l1.4,-2.6 l1.4,3 l1.4,-2.6 l1.4,3 l1.4,-2.6 l1.4,2.4" stroke="#fbf6ea" stroke-width="1.1" fill="none"/>`
      : `<path d="M-10,12 C-4,16 4,16 11,9" ${L(1.8)} fill="none"/><path d="M-6,13.4 l1,2.4 l1,-2 M0,14.2 l1,2.4 l1,-2.2 M5,12.6 l1,2.4 l1,-2.4" stroke="#fbf6ea" stroke-width="1.2" fill="none"/>`}
    ${[[-12, -24, -24], [-5, -10, -35], [3, 8, -36], [10, 22, -28], [14, 30, -14]].map(([x0, tx, ty]) => `<path d="M${x0 - 3},-14 C${x0 - 3},-22 ${tx - 4},${ty + 6} ${tx},${ty} C${tx + 1},${ty + 8} ${x0 + 4},-20 ${x0 + 4},-12Z" fill="${C.pe}" ${L(1.5)}/>`).join('')}</g>`;
};
const melena = (x, y, largo = 44) => `<path d="M${x - 14},${y} C${x - 20},${y + largo * 0.4} ${x - 16},${y + largo * 0.8} ${x - 8},${y + largo} L${x - 2},${y + largo - 8} L${x + 4},${y + largo} L${x + 10},${y + largo - 10} C${x + 16},${y + largo * 0.6} ${x + 18},${y + largo * 0.3} ${x + 14},${y}Z" fill="${CY.pe}" ${L(2)}/><path d="M${x - 6},${y + 10} C${x - 8},${y + 24} ${x - 6},${y + 34} ${x - 2},${y + 40} M${x + 6},${y + 8} C${x + 8},${y + 20} ${x + 6},${y + 30} ${x + 4},${y + 38}" stroke="${CY.pe2}" stroke-width="1.6" fill="none"/>`;
function yasi(v = 'base') {
  const C = CY;
  const k = nuevoId('ya');
  if (v === 'baston') {
    return `<defs>${clip(k, torsoD)}</defs>${sombra(100, 184, 50)}
    <g class="rayos2" stroke="${C.ro}" stroke-width="2.6" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<path d="M${f1(146 + Math.cos(a) * 12)},${f1(32 + Math.sin(a) * 12)} L${f1(146 + Math.cos(a) * 24)},${f1(32 + Math.sin(a) * 24)}" style="animation-delay:${(i % 3) * 0.2}s"/>`; }).join('')}</g>
    <circle cx="146" cy="32" r="16" fill="${C.oro}" opacity=".25" class="brilla"/>
    ${cola('M114,140 C138,142 150,126 146,108 C144,100 138,98 134,102')}<path d="M134,102 C128,96 130,88 136,90 C140,86 146,92 142,98Z" fill="${C.pe}" ${L(1.6)}/>
    ${melena(98, 74, 50)}
    ${trazo('M92,138 L72,148 L84,164 L66,180', C.sk, 7)}${patita(66, 182, -1)}${trazo('M108,138 L130,148 L118,164 L136,180', C.sh, 7)}${patita(136, 182, 1)}
    <g transform="translate(122 118) rotate(28)">${sombreroPaja(0, 0, 0.5, 0, C)}</g>
    <path d="${torsoD}" fill="${C.sk}"/><g clip-path="url(#${k})"><ellipse cx="96" cy="124" rx="12" ry="16" fill="${C.vi}"/><ellipse cx="116" cy="140" rx="20" ry="10" fill="${C.sh}" opacity=".6"/></g><path d="${torsoD}" fill="none" ${L(2.4)}/>
    ${pajas(100, 130, 18)}
    ${trazo('M86,108 L66,118 L50,106', C.sh, 5)}${zarpa(48, 104, 120, C.sh)}
    ${trazo('M112,106 L132,86 L140,62', C.sk, 5)}
    ${baston(146, 32, 120, 126)}${zarpa(140, 60, 200)}
    <g class="cabeza" style="transform-origin:98px 90px">${cabezaD(98, 80, -10, { orejas: 'atras', boca: 'abierta' })}${''}</g>`;
  }
  if (v === 'siesta') {
    const kh = nuevoId('hb');
    const copa = 'M70,120 C72,144 84,158 100,160 C116,158 128,144 130,120Z';
    return `${sombra(100, 186, 46)}
    <g class="calor" fill="none" stroke="#e8b84a" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M56,172 q6,-5 12,0 t12,0 t12,0"/><path d="M104,178 q6,-5 12,0 t12,0 t12,0"/></g>
    <g class="flota">
      <circle cx="100" cy="104" r="56" fill="${C.oro}" opacity=".13" class="brilla"/>
      <ellipse cx="100" cy="118" rx="56" ry="12" fill="${C.pa2}" ${L(2.2)}/>
      ${baston(140, 50, 122, 118)}
      ${melena(100, 78, 34)}
      <path d="M78,118 C76,104 86,94 100,94 C114,94 124,104 122,118Z" fill="${C.sk}" ${L(2.2)}/>
      ${cola('M126,118 C146,116 156,128 152,144 C150,152 142,154 140,148')}<path d="M140,148 C134,154 136,162 142,160 C148,162 150,154 146,150Z" fill="${C.pe}" ${L(1.6)}/>
      <g class="cabeza" style="transform-origin:100px 100px">${cabezaD(100, 90, 4, { orejas: 'abiertas', ojos: 'siesta' })}</g>
      ${zarpa(84, 116, 80)}${zarpa(116, 116, -80)}
      <defs>${clip(kh, copa)}</defs><path d="${copa}" fill="${C.pa}"/><g clip-path="url(#${kh})"><path d="M70,126 C90,130 110,130 130,126 L130,134 C110,138 90,138 70,134Z" fill="${C.ba}"/><path d="M84,140 C90,150 96,154 100,156 M112,140 C110,148 106,152 102,156" stroke="${C.pa2}" stroke-width="1.4" fill="none"/></g><path d="${copa}" fill="none" ${L(2.4)}/>
      <path d="M44,118 C44,132 156,132 156,118" fill="none" stroke="#2a1c15" stroke-width="8" stroke-linecap="round"/><path d="M44,118 C44,132 156,132 156,118" fill="none" stroke="${C.pa}" stroke-width="4.4" stroke-linecap="round"/>
    </g>`;
  }
  return `<defs>${clip(k, torsoD)}</defs>${sombra(100, 184, 46)}
  ${cola('M114,138 C138,148 152,138 148,122 C146,114 138,114 136,120')}<path d="M136,120 C130,116 130,108 136,108 C140,104 146,110 142,116Z" fill="${C.pe}" ${L(1.6)}/>
  ${melena(100, 72, 48)}
  ${trazo('M94,136 L80,152 L92,166 L80,180', C.sk, 7)}${patita(80, 182, -1)}${trazo('M108,136 L122,152 L112,166 L124,180', C.sh, 7)}${patita(124, 182, 1)}
  <g class="respira" style="transform-origin:100px 150px">
    <path d="${torsoD}" fill="${C.sk}"/><g clip-path="url(#${k})"><ellipse cx="96" cy="124" rx="12" ry="16" fill="${C.vi}"/><ellipse cx="116" cy="140" rx="20" ry="10" fill="${C.sh}" opacity=".6"/><path d="M110,104 l3,4 M114,112 l3,4 M116,120 l3,4" stroke="${C.sh}" stroke-width="2"/></g><path d="${torsoD}" fill="none" ${L(2.4)}/>
    ${pajas(100, 130, 18)}
    ${baston(62, 60, 64, 182)}
    ${trazo('M86,106 L72,124 L64,112', C.sk, 5)}${zarpa(64, 110, 160)}
    ${trazo('M114,106 L128,122 L124,138', C.sh, 5)}${zarpa(124, 140, 0, C.sh)}
  </g>
  <g class="cabeza" style="transform-origin:98px 92px">${cabezaD(98, 80, -6)}${sombreroPaja(98, 58, 0.6, -10, C)}</g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Los mitos conservan su nombre de leyenda.</div>
<section>
<div class="linea"><h3>Mito · Pombero</h3>
${tarjeta('B64', 'Pombero', 'Pombero', 'Mito', 'base', pombero(), 'Petiso, ancho y peludo, agachado con los brazos largos casi tocando el suelo. El sombrero de paja le tapa la cara: solo se ven dos ojos que brillan y la nariz.')}
${tarjeta('B65', 'Pombero del monte', 'Pombero del monte', 'Mito', 'camino 1', pombero('monte'), 'Alto y cubierto de musgo y hojas, con ramas en el sombrero. Un cardenal se le posa en la mano y en la otra lleva el porongo de miel que le dejan.')}
${tarjeta('B66', 'Pombero silbador', 'Pombero silbador', 'Mito', 'camino 2', pombero('silbador'), 'Flaco y ágil, corre en puntas de pie con el sombrero echado atrás y una pluma roja; silba con los dedos imitando a los pájaros para desorientar.')}</div>
<div class="linea"><h3>Mito · Yasí Yateré</h3>
${tarjeta('B67', 'Yasí Yateré', 'Yasí Yateré', 'Mito', 'base', yasi(), 'Duende del monte: orejas enormes, ojos amarillos de pupila rasgada, nariz larga y sonrisa de dientes finos. Patas de bicho, cola con mechón rubio, melena dorada y pollera de paja. Se apoya en su bastón de oro.')}
${tarjeta('B68', 'Yasí del bastón', 'Yasí del bastón', 'Mito', 'camino 1', yasi('baston'), 'Agazapado y con las orejas para atrás, levanta el bastón de oro y la punta larga destellos; muestra los dientes y el sombrero le cuelga de la espalda.')}
${tarjeta('B69', 'Yasí de la siesta', 'Yasí de la siesta', 'Mito', 'camino 2', yasi('siesta'), 'Hecho un ovillo dentro de su sombrero dado vuelta, que flota en el aire caliente de la siesta. Las orejas le cuelgan por el borde y deja un ojo entreabierto: parece dormido, pero vigila.')}</div>
</section>`;
const css = `@keyframes brilla{0%,100%{opacity:.25}50%{opacity:.6}}@keyframes silbido{0%{opacity:0}30%,60%{opacity:1}100%{opacity:0}}@keyframes gota{0%{transform:translateY(0);opacity:1}100%{transform:translateY(10px);opacity:0}}@keyframes rayos2{0%,100%{opacity:.2}50%{opacity:1}}@keyframes flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes calor{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
.oreja,.oreja2{animation:oreja 3s ease-in-out infinite;transform-box:fill-box}.oreja{transform-origin:100% 50%}.oreja2{transform-origin:0% 50%;animation-delay:.3s}@keyframes oreja{0%,90%,100%{transform:rotate(0)}94%{transform:rotate(-8deg)}}.brilla{animation:brilla 2s ease-in-out infinite}.silbido path{animation:silbido 1.4s ease-out infinite}.silbido path:nth-child(2){animation-delay:.2s}.silbido path:nth-child(3){animation-delay:.4s}.gota{animation:gota 1.6s ease-in infinite;transform-box:fill-box}.rayos2 path{animation:rayos2 1s ease-in-out infinite}.flota{animation:flota 2.6s ease-in-out infinite;transform-box:view-box}.calor path{animation:calor 1.8s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-12.html', import.meta.url), pagina('Catálogo para aprobar · lote 5d', 'Mitos de Corrientes: Pombero y Yasí Yateré, con sus dos caminos', cuerpo, css));
console.log('ok');
