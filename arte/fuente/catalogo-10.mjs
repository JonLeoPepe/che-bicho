// Catálogo para aprobar, lote 5b: carpincho, tero, aguará guazú y ciervo de los pantanos (Corrientes).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
import { tero } from './muestra-bichos.mjs';

// patas con anatomía: delantera (codo atrás, muñeca) y trasera (rodilla adelante, garrón atrás)
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const pataDel = (x, y, len, col, w = 5.6, pie = 'pata') => trazo(`M${x},${y} L${x + 3},${y + len * 0.38} L${x},${y + len * 0.78} L${x - 2},${y + len}`, col, w) + (pie === 'pezuna' ? `<path d="M${x - 6},${y + len} L${x + 3},${y + len} L${x + 1},${y + len + 4} L${x - 7},${y + len + 4}Z" fill="#2a2420" ${L(1.4)}/>` : `<path d="M${x - 8},${y + len + 2} L${x + 3},${y + len + 2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/>`);
const pataTras = (x, y, len, col, w = 5.6, pie = 'pata') => trazo(`M${x},${y} L${x - 7},${y + len * 0.32} L${x + 7},${y + len * 0.62} L${x + 3},${y + len}`, col, w) + (pie === 'pezuna' ? `<path d="M${x - 2},${y + len} L${x + 7},${y + len} L${x + 5},${y + len + 4} L${x - 3},${y + len + 4}Z" fill="#2a2420" ${L(1.4)}/>` : `<path d="M${x - 4},${y + len + 2} L${x + 8},${y + len + 2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/>`);
const gotas = (pts) => `<g class="gotas">${pts.map(([x, y], i) => `<path d="M${x},${y} C${x - 2},${y + 4} ${x + 2},${y + 6} ${x + 3},${y + 2} C${x + 3},${y} ${x + 1},${y - 2} ${x},${y}Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1" style="animation-delay:${i * 0.25}s"/>`).join('')}</g>`;

// ───────── KAPIYVÁ (Común) · carpincho ─────────
const C_CA = { pe: '#9a6e46', so: '#6e4a2c', lu: '#bf9064', ho: '#5a3c26' };
const cabezaCarpincho = (x, y, r = 0, s = 1, ojos = 'abiertos') => { const C = C_CA; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M14,-18 C14,-26 22,-26 22,-18Z" fill="${C.so}" ${L(1.8)}/>
  <path d="M24,-10 C22,-20 10,-24 -4,-22 C-18,-20 -30,-14 -34,-4 C-36,6 -32,14 -24,16 C-10,18 8,18 18,12 C26,6 26,-2 24,-10Z" fill="${C.pe}" ${L(2.6)}/>
  <path d="M-34,-4 C-36,6 -32,14 -24,16 C-28,8 -28,0 -26,-6Z" fill="${C.ho}"/><ellipse cx="-31" cy="-2" rx="2" ry="1.4" fill="${O}"/>
  <path d="M-26,10 C-20,12 -14,12 -8,10" ${L(1.4)} fill="none"/><path d="M-4,-20 C8,-22 18,-18 22,-10" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${ojos === 'cerrados' ? `<path d="M-4,-10 C0,-7 6,-7 10,-10" ${L(2)} fill="none"/>` : ojoAlm(3, -10, 3.6, 2.1, '#2a1a12')}</g>`; };
export function kapiyva(v = 'base') {
  const C = C_CA;
  if (v === 'tranquilo') return `${sombra(104, 182, 78)}
    <g class="respira" style="transform-origin:104px 180px">
      <path d="M40,152 C40,124 74,110 112,110 C150,110 174,126 174,152 C174,172 156,180 124,180 L76,180 C52,180 40,170 40,152Z" fill="${C.pe}" ${L()}/>
      ${Array.from({ length: 30 }, (_, i) => `<path d="M${58 + (i % 10) * 11},${124 + Math.floor(i / 10) * 14} l-2,6" stroke="${C.lu}" stroke-width="1.4"/>`).join('')}
      <path d="M48,166 C70,176 140,178 168,164 C162,176 146,182 124,182 L76,182 C60,182 50,176 48,166Z" fill="${C.so}" opacity=".6"/>
      <path d="M140,150 C156,146 170,154 168,168 C160,176 146,176 138,170Z" fill="${C.so}" opacity=".45"/>
      <path d="M60,170 C54,170 50,178 56,181 L74,181 C78,178 74,170 68,170Z M80,172 C74,172 72,180 78,182 L94,182 C98,180 94,172 88,172Z" fill="${C.pe}" ${L(2)}/>
      <path d="M74,116 C96,108 136,110 160,124" stroke="${C.lu}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <g class="cabeza" style="transform-origin:60px 150px">${cabezaCarpincho(44, 150, 10, 1.05, 'cerrados')}</g>
    <g class="zz" fill="none" stroke="#a9c9d6" stroke-width="2" stroke-linecap="round"><path d="M70,104 l8,0 l-8,8 l8,0"/><path d="M84,90 l6,0 l-6,6 l6,0"/></g>`;
    if (v === 'nadador') return `${sombra(108, 182, 66)}${gotas([[78, 158], [126, 160], [148, 150]])}
  <path d="M86,140 L84,172 C84,176 96,176 96,172 L98,142Z M130,140 L132,172 C132,176 144,176 144,172 L142,140Z" fill="${C.so}" ${L(2.4)}/>
  <g class="respira" style="transform-origin:106px 150px">
    <path d="M58,118 C58,96 82,86 110,88 C138,90 158,102 158,124 C158,142 142,150 118,150 L84,150 C66,150 58,138 58,118Z" fill="${C.pe}" ${L()}/>
    ${Array.from({ length: 24 }, (_, i) => `<path d="M${72 + (i % 8) * 10},${98 + Math.floor(i / 8) * 14} l-2,6" stroke="${C.lu}" stroke-width="1.4"/>`).join('')}
    <path d="M64,138 C80,148 130,150 154,136 C148,148 134,152 118,152 L84,152 C72,152 66,146 64,138Z" fill="${C.so}" opacity=".6"/>
    <path d="M72,140 L70,172 C70,176 82,176 82,172 L84,142Z M118,142 L120,172 C120,176 132,176 132,172 L130,142Z" fill="${C.pe}" ${L(2.4)}/>
  </g>
  <path d="M72,96 C96,88 126,88 150,98" stroke="#cfe9f2" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M84,112 C104,106 124,106 142,112" stroke="#cfe9f2" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
  <g class="cabeza" style="transform-origin:66px 110px">${cabezaCarpincho(56, 104, 4, 1)}
    <g transform="translate(56 104) rotate(4)">
      <g class="jopo" style="transform-origin:58px 84px"><path d="M-8,-21 C-14,-40 6,-50 20,-40 C26,-36 24,-28 18,-28 C16,-36 6,-36 4,-28 C2,-24 -2,-22 -8,-21Z" fill="#4a2e1a" stroke="#2a1c15" stroke-width="2.2" stroke-linejoin="round"/><path d="M2,-38 C8,-42 14,-40 18,-36" stroke="#7a5a3a" stroke-width="2" fill="none" stroke-linecap="round"/></g>
      <path d="M-20,-14 L22,-14" stroke="#2a1c15" stroke-width="2.6"/>
      <path d="M-14,-15 L10,-15 C12,-8 8,-3 0,-3 C-8,-3 -14,-8 -14,-15Z" fill="#1f2a33" stroke="#2a1c15" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-10,-12 L-4,-12 L-8,-6Z" fill="#9fd3ef" opacity=".7"/><path d="M2,-12 L6,-12" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
      <path d="M10,-14 L22,-12" stroke="#2a1c15" stroke-width="2.4" stroke-linecap="round"/>
    </g></g>`;
  return `${sombra(108, 182, 66)}
  <path d="M86,140 L84,172 C84,176 96,176 96,172 L98,142Z M130,140 L132,172 C132,176 144,176 144,172 L142,140Z" fill="${C.so}" ${L(2.4)}/>
  <g class="respira" style="transform-origin:106px 150px">
    <path d="M58,118 C58,96 82,86 110,88 C138,90 158,102 158,124 C158,142 142,150 118,150 L84,150 C66,150 58,138 58,118Z" fill="${C.pe}" ${L()}/>
    ${Array.from({ length: 24 }, (_, i) => `<path d="M${72 + (i % 8) * 10},${98 + Math.floor(i / 8) * 14} l-2,6" stroke="${C.lu}" stroke-width="1.4"/>`).join('')}
    <path d="M64,138 C80,148 130,150 154,136 C148,148 134,152 118,152 L84,152 C72,152 66,146 64,138Z" fill="${C.so}" opacity=".6"/>
    <path d="M72,140 L70,172 C70,176 82,176 82,172 L84,142Z M118,142 L120,172 C120,176 132,176 132,172 L130,142Z" fill="${C.pe}" ${L(2.4)}/>
  </g>
  <g class="cabeza" style="transform-origin:66px 110px">${cabezaCarpincho(56, 104, 4, 1)}</g>`;
}

// ───────── tero: gritón y espolón ─────────
function teroV(v) {
  const k = nuevoId('te');
  const espolon = v === 'espolon';
  return `${sombra(102, 184, 42)}
  <g class="viento" fill="none" stroke="#9fc8d8" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M150,40 C170,36 186,44 182,56"/><path d="M16,60 C30,54 44,58 42,68"/></g>
  <path d="M98,${espolon ? 132 : 140} L94,176 M112,${espolon ? 132 : 140} L116,176" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M98,${espolon ? 132 : 140} L94,176 M112,${espolon ? 132 : 140} L116,176" stroke="#d6716a" stroke-width="3" stroke-linecap="round"/>
  <path d="M94,176 L84,180 M94,176 L100,181 M116,176 L106,181 M116,176 L124,180" ${L(2.2)}/>
  ${espolon ? `<g class="alas" style="transform-origin:104px 104px">
      <path d="M90,100 C70,70 60,40 66,20 C80,36 92,56 100,86Z" fill="#7d7a66" ${L(2.6)}/><path d="M66,20 C64,34 68,48 74,58" stroke="#1f1c1c" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M84,74 L74,66 L86,70Z" fill="#c8362b" ${L(1.6)}/>
      <path d="M118,100 C140,70 152,40 146,20 C132,36 120,56 112,86Z" fill="#6f6c5a" ${L(2.6)}/><path d="M146,20 C148,34 144,48 138,58" stroke="#1f1c1c" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M128,74 L138,66 L126,70Z" fill="#c8362b" ${L(1.6)}/>
      <path d="M100,86 C96,70 94,54 96,40 M112,86 C116,70 118,54 116,40" stroke="#f4f1e8" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/></g>` : ''}
  <g class="respira" style="transform-origin:106px 138px">
    <path d="M150,${espolon ? 104 : 112} L178,${espolon ? 98 : 104} L174,${espolon ? 110 : 116} L150,${espolon ? 114 : 120}Z" fill="#1f1c1c" ${L(2.4)}/>
    <path d="M${espolon ? 70 : 64},${espolon ? 104 : 112} C74,${espolon ? 84 : 94} 96,${espolon ? 78 : 86} 116,${espolon ? 82 : 90} C138,${espolon ? 86 : 94} 156,${espolon ? 98 : 106} 160,${espolon ? 110 : 118} C144,${espolon ? 116 : 124} 132,${espolon ? 128 : 136} 114,${espolon ? 134 : 142} C94,${espolon ? 138 : 146} 74,${espolon ? 128 : 136} ${espolon ? 70 : 64},${espolon ? 104 : 112}Z" fill="#8f8b78" ${L()}/>
    <path d="M${espolon ? 74 : 68},${espolon ? 116 : 124} C84,${espolon ? 130 : 138} 102,${espolon ? 136 : 144} 118,${espolon ? 132 : 140} C106,${espolon ? 124 : 132} 94,${espolon ? 114 : 122} 88,${espolon ? 102 : 110}Z" fill="#f4f1e8"/>
    <path d="M${espolon ? 70 : 64},${espolon ? 100 : 108} C${espolon ? 72 : 66},${espolon ? 112 : 120} 78,${espolon ? 122 : 130} 88,${espolon ? 126 : 134} C84,${espolon ? 112 : 120} 82,${espolon ? 100 : 108} 80,${espolon ? 92 : 100}Z" fill="#1e1b1b"/>
    ${espolon ? '' : `<path d="M96,96 C116,88 142,96 156,110 C142,118 124,120 108,116 C98,112 94,104 96,96Z" fill="#7d7a66" ${L(2.4)}/><path d="M104,100 C110,98 118,98 124,100" stroke="#6a8f66" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M98,100 L90,94 L98,94Z" fill="#c8362b" ${L(1.6)}/>`}
  </g>
  ${v === 'griton' ? `<g class="cabeza" style="transform-origin:78px 108px">
      <path d="M72,112 C64,100 58,88 54,76 L66,70 C70,82 76,94 84,104Z" fill="#8f8b78" ${L(2.4)}/>
      <circle cx="58" cy="66" r="15" fill="#9a9785" ${L()}/><path d="M50,54 C58,48 70,50 74,58 C66,58 58,60 52,64Z" fill="#1e1b1b"/>
      <g class="cresta2"><path d="M70,54 C80,40 92,30 108,26 C100,36 90,46 74,60Z" fill="#1e1b1b" ${L(1.8)}/></g>
      <path d="M46,60 L20,44 L44,54Z" fill="#d6716a" ${L(2)}/><path d="M46,68 L22,76 L46,72Z" fill="#d6716a" ${L(2)}/><path d="M46,58 L46,70 L36,64Z" fill="#7a2a3a"/><path d="M24,45 L20,44 L22,48Z M24,75 L22,76 L25,72Z" fill="#1e1b1b"/>
      <circle cx="56" cy="62" r="4.6" fill="#c8362b" ${L(1.6)}/><circle cx="55.6" cy="62" r="2" fill="#1b120e"/><path d="M50,56 L62,60" ${L(2.4)}/>
      <g class="grito" fill="none" stroke="#e0b03a" stroke-width="2.6" stroke-linecap="round"><path d="M14,52 C10,58 10,66 14,72"/><path d="M6,46 C0,56 0,70 6,78"/></g></g>`
  : `<g class="cabeza" style="transform-origin:76px 96px">
      <path d="M72,96 C68,82 70,70 76,62 L88,68 C84,76 84,88 86,98Z" fill="#8f8b78" ${L(2.4)}/>
      <circle cx="76" cy="58" r="15" fill="#9a9785" ${L()}/><path d="M64,52 C68,42 80,40 88,46 C80,48 72,50 66,56Z" fill="#1e1b1b"/>
      <path d="M86,46 C98,40 110,38 122,42 C112,44 100,48 90,54Z" fill="#1e1b1b" ${L(1.6)}/>
      <path d="M62,58 L44,60 L62,64Z" fill="#d6716a" ${L(2)}/><path d="M50,60 L44,60 L50,62Z" fill="#1e1b1b"/>
      <circle cx="72" cy="56" r="4.6" fill="#c8362b" ${L(1.6)}/><circle cx="71.6" cy="56" r="2" fill="#1b120e"/><path d="M66,51 L78,54" ${L(2.4)}/></g>`}`;
}

// ───────── AGUARÁ GUAZÚ (Tierra) ─────────
const C_AG = { pe: '#c8602a', so: '#8e3e18', lu: '#e88a4a', ne: '#2a2420', bl: '#f1e6d4', ba: '#7a5a3a' };
const cabezaAguara = (x, y, r = 0, s = 1, bravo = false) => { const C = C_AG; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M10,-14 L14,-40 L24,-12Z" fill="${C.pe}" ${L(2.2)}/><path d="M13,-16 L15,-34 L21,-15Z" fill="${C.bl}"/>
  <path d="M0,-14 L-2,-40 L10,-14Z" fill="${C.so}" ${L(2.2)}/>
  <path d="M24,-6 C22,-16 10,-18 0,-14 C-10,-10 -20,-6 -30,-2 C-36,0 -36,6 -30,8 C-18,10 -4,10 8,8 C18,6 26,2 24,-6Z" fill="${C.pe}" ${L(2.6)}/>
  <path d="M-30,-2 C-36,0 -36,6 -30,8 C-22,10 -14,10 -8,9 C-12,6 -16,2 -18,-2Z" fill="${C.ne}"/><ellipse cx="-33" cy="2" rx="2.4" ry="2" fill="${O}"/>
  ${bravo ? `<path d="M-30,8 C-22,14 -12,14 -6,10" fill="#7a2a3a" ${L(1.6)}/><path d="M-26,9 l1,4 l2,-3 M-16,10 l1,4 l2,-3" fill="#fff" stroke="${O}" stroke-width="1"/>` : ''}
  <path d="M-4,8 C2,8 8,6 12,4" stroke="${C.bl}" stroke-width="2.4" stroke-linecap="round"/>
  ${ojoAlm(4, -6, 3.6, 2.1, '#d99a1c')}<path d="${bravo ? 'M-2,-12 C2,-11 6,-10 10,-8' : 'M-2,-11 C2,-13 7,-13 11,-10'}" ${L(2)} fill="none"/></g>`; };
const pataLarga = (x, y, largo, col, inc = 0, codo = 4) => { const d = `M${x + 3},${y} L${x + 3 + codo},${y + largo * 0.5} L${x + 3 + inc},${y + largo}`; return `<path d="${d}" stroke="${O}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x + inc - 3},${y + largo + 2} L${x + inc + 9},${y + largo + 2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/>`; };
export function aguara(v = 'base') {
  const C = C_AG, zan = v === 'zancudo', est = v === 'estero';
  if (est) return `${sombra(110, 184, 74)}
    <g class="cola" style="transform-origin:154px 126px"><path d="M152,124 C168,128 180,140 182,156 C174,150 164,140 150,134Z" fill="${C.pe}" ${L(2.4)}/><path d="M182,156 C178,150 176,146 172,142 L178,140Z" fill="${C.bl}"/></g>
    ${pataTras(138, 132, 44, C.ba)}${pataDel(92, 134, 40, C.ba)}
    <g class="respira" style="transform-origin:110px 176px">
      <path d="M66,128 C70,112 90,104 114,106 C136,108 154,114 156,128 C158,142 142,146 122,144 L88,144 C74,144 66,138 66,128Z" fill="${C.pe}" ${L()}/>
      <path d="M74,136 C94,144 128,144 150,134 C146,142 136,146 122,146 L88,146 C80,146 76,142 74,136Z" fill="${C.lu}" opacity=".6"/>
      <g class="melena">${Array.from({ length: 11 }, (_, i) => `<path d="M${76 + i * 5},${108 - Math.sin((i / 10) * Math.PI) * 8} l${1 + (i % 2)},-11" stroke="${C.ne}" stroke-width="3.4" stroke-linecap="round"/>`).join('')}<path d="M72,112 C82,100 104,98 118,104 C104,106 88,110 78,118Z" fill="${C.ne}" ${L(2)}/></g>
      ${pataTras(146, 130, 46, C.pe)}${trazo('M84,138 L74,150 L64,148 L58,140', C.pe)}${pataDel(104, 138, 40, C.pe)}
      ${[[62, 140], [96, 170], [100, 176], [138, 172], [150, 176]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.4" fill="#5a3e24" opacity=".9"/>`).join('')}
    </g>
    <g class="cabeza" style="transform-origin:72px 126px">${cabezaAguara(48, 136, 16, 1.02, true)}</g>`;
  if (zan) return `<g transform="translate(14 24) scale(.87)">${sombra(110, 186, 56)}
    <g class="cola" style="transform-origin:150px 90px"><path d="M150,86 C166,92 174,108 172,126 C166,118 158,106 146,96Z" fill="${C.pe}" ${L(2.4)}/><path d="M172,126 C170,118 168,114 164,110 L170,108Z" fill="${C.bl}"/></g>
    ${pataTras(140, 96, 84, C.ne)}${pataDel(100, 100, 80, C.ne)}
    <g class="respira" style="transform-origin:110px 110px">
      <path d="M74,92 C76,76 96,70 118,72 C140,74 154,80 156,92 C158,104 144,108 124,108 L94,108 C80,108 74,102 74,92Z" fill="${C.pe}" ${L()}/>
      <path d="M80,100 C100,108 130,108 152,98 C148,106 138,110 124,110 L94,110 C86,110 82,106 80,100Z" fill="${C.lu}" opacity=".7"/>
      ${pataTras(150, 94, 86, C.ne)}${pataDel(88, 100, 82, C.ne)}
    </g>
    <g class="cabeza" style="transform-origin:82px 84px">
      <path d="M82,92 C76,74 74,52 76,36 L92,36 C92,52 94,72 98,86Z" fill="${C.pe}" ${L(2.4)}/>
      <g class="melena"><path d="M78,40 C80,58 84,74 92,88" stroke="${C.ne}" stroke-width="7" fill="none" stroke-linecap="round"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${80 + i * 1.6},${46 + i * 6} l-7,2" stroke="${C.ne}" stroke-width="3" stroke-linecap="round"/>`).join('')}</g>
      ${cabezaAguara(66, 30, -14, 1)}</g></g>`;
  const largo = zan ? 74 : 54, top = zan ? 98 : 116;
  return `${sombra(108, 184, 54)}
  <g class="cola" style="transform-origin:150px ${top + 4}px"><path d="M150,${top} C164,${top + 8} 170,${top + 24} 168,${top + 40} C162,${top + 32} 156,${top + 20} 146,${top + 12}Z" fill="${C.pe}" ${L(2.4)}/><path d="M168,${top + 40} C166,${top + 32} 164,${top + 28} 160,${top + 24} L166,${top + 22}Z" fill="${C.bl}"/></g>
  ${zan ? pataLarga(98, top + 16, largo, C.ne, 0, 2) + pataLarga(140, top + 14, largo, C.ne, 0, -3) : pataLarga(98, top + 16, largo, C.ne, 10, 6) + pataLarga(140, top + 14, largo, C.ne, -12, -2)}
  <g class="respira" style="transform-origin:110px ${top + 20}px">
    <path d="M70,${top + 8} C72,${top - 8} 92,${top - 14} 114,${top - 12} C136,${top - 10} 152,${top - 4} 154,${top + 8} C156,${top + 20} 142,${top + 24} 122,${top + 24} L92,${top + 24} C78,${top + 24} 70,${top + 18} 70,${top + 8}Z" fill="${C.pe}" ${L()}/>
    <path d="M76,${top + 16} C96,${top + 24} 128,${top + 24} 150,${top + 14} C146,${top + 22} 136,${top + 26} 122,${top + 26} L92,${top + 26} C82,${top + 26} 78,${top + 22} 76,${top + 16}Z" fill="${C.lu}" opacity=".7"/>
    <path d="M74,${top - 6} C82,${top - 16} 98,${top - 18} 110,${top - 12} C98,${top - 8} 86,${top - 4} 78,${top + 2}Z" fill="${C.ne}" ${L(2)}/>
    ${zan ? `<path d="M89,${top + 18} L80,${top + 40} L92,${top + 54}" stroke="${O}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M89,${top + 18} L80,${top + 40} L92,${top + 54}" stroke="${C.ne}" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + pataLarga(130, top + 16, largo, C.ne, 4, -2) : pataLarga(86, top + 18, largo, C.ne, -14, -4) + pataLarga(130, top + 16, largo, C.ne, 12, 8)}
  </g>
  <g class="cabeza" style="transform-origin:76px ${top}px">
    <path d="M76,${top + 6} C70,${top - 6} 66,${top - (zan ? 30 : 20)} 64,${top - (zan ? 40 : 28)} L80,${top - (zan ? 42 : 30)} C82,${top - (zan ? 30 : 20)} 86,${top - 8} 90,${top}Z" fill="${C.pe}" ${L(2.4)}/>
    <path d="M68,${top - (zan ? 34 : 24)} C70,${top - 20} 74,${top - 8} 80,${top + 2}" stroke="${C.ne}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${cabezaAguara(60, top - (zan ? 46 : 34), zan ? -6 : 0, 1)}</g>`;
}

// ───────── GUASÚ (Flora) · ciervo de los pantanos ─────────
const C_CI = { pe: '#b06a3a', so: '#7e4422', lu: '#d08c58', bl: '#f1e6d4', ne: '#2a2420' };
const cabezaCiervo = (x, y, r = 0, s = 1) => { const C = C_CI; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M8,-12 C14,-26 28,-26 26,-14 C22,-10 14,-8 8,-10Z" fill="${C.pe}" ${L(2.2)}/><path d="M12,-13 C16,-22 24,-22 23,-15Z" fill="${C.bl}"/>
  <path d="M20,-4 C18,-14 6,-16 -4,-12 C-12,-8 -22,-4 -28,2 C-32,6 -30,12 -24,12 C-12,12 4,10 14,6 C20,4 22,0 20,-4Z" fill="${C.pe}" ${L(2.6)}/>
  <path d="M-28,2 C-32,6 -30,12 -24,12 L-14,11 C-18,8 -20,4 -20,0Z" fill="${C.ne}"/><ellipse cx="-28" cy="5" rx="2" ry="1.6" fill="${O}"/>
  <path d="M-16,10 C-8,12 2,10 10,6" stroke="${C.bl}" stroke-width="2.4" stroke-linecap="round"/>
  ${ojoAlm(0, -5, 4, 2.6, '#1f140e')}<path d="M-6,-11 C-1,-13 5,-13 9,-10" ${L(1.9)} fill="none"/></g>`; };
const hojaC = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0,0 C-6,-4 -7,-12 -2,-16 C2,-12 6,-12 8,-16 C10,-8 6,-2 0,0Z" fill="#5f9a3a" ${L(1.4)}/></g>`;
export function guasu(v = 'base') {
  const C = C_CI, pan = v === 'pantano', cor = v === 'cornamenta';
  const top = cor ? 96 : 110, largo = cor ? 60 : 54;
  const pata = (x, y, inc = 0, col = C.so) => `<path d="M${x},${y} C${x},${y + largo * 0.5} ${x + inc * 0.5},${y + largo * 0.8} ${x + inc},${y + largo} L${x + inc - 5},${y + largo + 5} L${x + inc + 9},${y + largo + 5} L${x + inc + 7},${y + largo} C${x + 7 + inc * 0.5},${y + largo * 0.8} ${x + 7},${y + largo * 0.5} ${x + 7},${y}Z" fill="${col}" ${L(2.2)}/><path d="M${x + inc + 1},${y + largo + 5} l0,-4" stroke="${O}" stroke-width="1.4"/>`;
  const cuerpo = `M70,${top + 10} C72,${top - 6} 92,${top - 12} 116,${top - 10} C140,${top - 8} 156,${top - 2} 158,${top + 12} C160,${top + 26} 146,${top + 30} 124,${top + 30} L94,${top + 30} C80,${top + 30} 70,${top + 22} 70,${top + 10}Z`;
  const cuernos = cor ? `<g class="cuernos">${[[-1, 0], [1, 0]].map(([d]) => { const bx = 74 + d * 6; return `<path d="M${bx},${top - 68} C${bx - 4 * d},${top - 90} ${bx - 2 * d},${top - 104} ${bx + 8 * d},${top - 120} M${bx - 2 * d},${top - 86} C${bx - 18 * d},${top - 94} ${bx - 26 * d},${top - 104} ${bx - 30 * d},${top - 116} M${bx},${top - 100} C${bx + 14 * d},${top - 104} ${bx + 22 * d},${top - 110} ${bx + 26 * d},${top - 120} M${bx - 18 * d},${top - 94} C${bx - 26 * d},${top - 90} ${bx - 36 * d},${top - 92} ${bx - 42 * d},${top - 98}" stroke="${O}" stroke-width="6.4" fill="none" stroke-linecap="round"/><path d="M${bx},${top - 68} C${bx - 4 * d},${top - 90} ${bx - 2 * d},${top - 104} ${bx + 8 * d},${top - 120} M${bx - 2 * d},${top - 86} C${bx - 18 * d},${top - 94} ${bx - 26 * d},${top - 104} ${bx - 30 * d},${top - 116} M${bx},${top - 100} C${bx + 14 * d},${top - 104} ${bx + 22 * d},${top - 110} ${bx + 26 * d},${top - 120} M${bx - 18 * d},${top - 94} C${bx - 26 * d},${top - 90} ${bx - 36 * d},${top - 92} ${bx - 42 * d},${top - 98}" stroke="#7a5a3a" stroke-width="3.6" fill="none" stroke-linecap="round"/>${[[bx + 8 * d, top - 120, 0], [bx - 30 * d, top - 116, -30 * d], [bx + 26 * d, top - 120, 30 * d], [bx - 42 * d, top - 98, -60 * d], [bx - 12 * d, top - 92, -20 * d]].map(([x, y, r]) => hojaC(x, y, r, 0.9)).join('')}`; }).join('')}</g>` : '';
  if (pan) return `${sombra(112, 182, 66)}
    <path d="M154,${top - 2} C164,${top - 6} 170,${top} 166,${top + 6} C162,${top + 4} 158,${top + 2} 156,${top + 2}Z" fill="${C.bl}" ${L(2)}/>
    ${pataTras(140, top + 22, 50, C.so, 6, 'pezuna')}${pataDel(98, top + 24, 48, C.so, 6, 'pezuna')}
    <g class="respira" style="transform-origin:112px ${top + 32}px">
      <path d="${cuerpo}" fill="#9a5a30" ${L()}/>
      <path d="M76,${top + 20} C100,${top + 30} 132,${top + 30} 154,${top + 18} C148,${top + 28} 138,${top + 32} 124,${top + 32} L94,${top + 32} C84,${top + 32} 78,${top + 28} 76,${top + 20}Z" fill="${C.bl}" opacity=".8"/>
      <path d="M84,${top - 4} C104,${top - 10} 130,${top - 8} 150,${top}" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${pataTras(150, top + 20, 52, '#9a5a30', 6, 'pezuna')}
      ${trazo(`M86,${top + 24} L76,${top + 36} L64,${top + 34} L58,${top + 42}`, '#9a5a30', 6)}<path d="M52,${top + 40} L62,${top + 40} L60,${top + 46} L52,${top + 46}Z" fill="#2a2420" ${L(1.4)}/>
      ${[[100, 170], [140, 170], [152, 170]].map(([x, y]) => `<path d="M${x - 6},${y - 14} L${x + 8},${y - 14}" stroke="#3e2c1e" stroke-width="2" opacity=".6"/>`).join('')}
      <path d="M92,${top + 60} C98,${top + 64} 104,${top + 64} 110,${top + 60} M136,${top + 62} C142,${top + 66} 148,${top + 66} 156,${top + 62}" stroke="#2a3e4a" stroke-width="3" fill="none" opacity=".35"/>
    </g>
    <g class="cabeza" style="transform-origin:82px ${top}px">
      <path d="M84,${top + 8} C76,${top - 4} 68,${top - 18} 60,${top - 30} L74,${top - 38} C80,${top - 24} 88,${top - 10} 98,${top + 2}Z" fill="#9a5a30" ${L(2.4)}/>
      <path d="M66,${top - 28} C72,${top - 16} 80,${top - 4} 88,${top + 6}" stroke="${C.bl}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>
      ${[[-1], [1]].map(([d]) => { const bx = 60 + d * 4; return trazo(`M${bx},${top - 48} C${bx - 2 * d},${top - 60} ${bx + 4 * d},${top - 70} ${bx + 12 * d},${top - 76} M${bx - 1 * d},${top - 58} C${bx - 8 * d},${top - 62} ${bx - 14 * d},${top - 66} ${bx - 18 * d},${top - 72}`, '#7a5a3a', 3.4); }).join('')}
      ${cabezaCiervo(50, top - 40, 8, 1.02)}</g>`;
  return `${cor ? '<g transform="translate(18 34) scale(.82)">' : ''}${sombra(110, 184, 56)}
  <path d="M152,${top + 2} C162,${top - 2} 168,${top + 4} 164,${top + 10} C160,${top + 8} 156,${top + 6} 154,${top + 6}Z" fill="${C.bl}" ${L(2)}/>
  ${pata(98, top + 24)}${pata(144, top + 22)}
  <g class="respira" style="transform-origin:112px ${top + 30}px"><path d="${cuerpo}" fill="${C.pe}" ${L()}/><path d="M76,${top + 20} C100,${top + 30} 132,${top + 30} 154,${top + 18} C148,${top + 28} 138,${top + 32} 124,${top + 32} L94,${top + 32} C84,${top + 32} 78,${top + 28} 76,${top + 20}Z" fill="${C.bl}" opacity=".8"/>
    <path d="M84,${top - 4} C104,${top - 10} 130,${top - 8} 150,${top}" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${cor ? [[100, top - 4, 20], [124, top - 6, -10], [140, top, 30]].map(([x, y, r]) => hojaC(x, y, r, 0.8)).join('') : ''}
    ${pata(86, top + 26, 0, C.pe)}${pata(132, top + 24, 0, C.pe)}</g>
  <g class="cabeza" style="transform-origin:80px ${top}px">
    <path d="M78,${top + 8} C72,${top - 10} 70,${top - 34} 72,${top - 52} L88,${top - 52} C88,${top - 34} 90,${top - 12} 94,${top + 2}Z" fill="${C.pe}" ${L(2.4)}/>
    <path d="M74,${top - 30} C74,${top - 14} 78,${top} 84,${top + 6} L88,${top + 2} C84,${top - 10} 82,${top - 22} 82,${top - 32}Z" fill="${C.bl}" opacity=".85"/>
    ${cuernos}${cabezaCiervo(66, top - 58, 0, cor ? 1.05 : 1)}</g>${cor ? '</g>' : ''}`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Tres siluetas distintas por familia, sin escenario. B46 es el Ventero que ya aprobaste en la muestra.</div>
<section>
<div class="linea"><h3>Común · carpincho</h3>
${tarjeta('B43', 'Kapiyvá', 'Carpincho', 'Común', 'base', kapiyva(), 'Carpincho parado en cuatro patas: cuerpo de barril, cabeza cuadrada con los ojos y la nariz bien arriba. <i>Kapiyva</i> es su nombre en guaraní. Manso.')}
${tarjeta('B44', 'Pachorra', 'Carpincho tranquilo', 'Común', 'camino 1', kapiyva('tranquilo'), 'Más grande y pesado, echado de panza como un pan, con los ojos cerrados y el mentón apoyado. Nada lo apura: aguanta muchísimo.')}
${tarjeta('B45', 'Chapuzón', 'Carpincho nadador', 'Común', 'camino 2', kapiyva('nadador'), 'Igual de parado que el base, pero recién salido del agua y canchero: gafas de sol, jopo peinado para arriba, pelo mojado y brillante y gotas que le caen. Rápido y escurridizo.')}</div>
<div class="linea"><h3>Viento · tero</h3>
${tarjeta('B46', 'Ventero', 'Tero', 'Viento', 'base · aprobado', tero(), 'El de la muestra: tero de cresta larga, espolón rojo en el ala.')}
${tarjeta('B47', 'Gritón', 'Tero gritón', 'Viento', 'camino 1', teroV('griton'), 'Con el cuello estirado hacia adelante y el pico abierto de par en par: su grito aturde. Cresta parada.')}
${tarjeta('B48', 'Espolón', 'Tero guardián', 'Viento', 'camino 2', teroV('espolon'), 'Defiende el nido con las dos alas levantadas en arco sobre el lomo, mostrando los espolones rojos.')}</div>
<div class="linea"><h3>Tierra · aguará guazú</h3>
${tarjeta('B49', 'Pajonero', 'Aguará', 'Tierra', 'base', aguara(), 'Aguará guazú joven al trote: rojo, patas negras largas, melena oscura en la nuca y orejas enormes. Tímido: se esconde en el pajonal.')}
${tarjeta('B50', 'Zancón', 'Aguará zancudo', 'Tierra', 'camino 1', aguara('zancudo'), 'Las patas y el cuello se le estiraron como zancos (con codo, rodilla y garrón como el animal real): parado bien alto, mira por encima de todo el pajonal.')}
${tarjeta('B51', 'Barrero', 'Aguará del estero', 'Tierra', 'camino 2', aguara('estero'), 'Bajo y al acecho, con una mano recogida para saltar, la melena erizada y las patas embarradas. Gruñe con los colmillos a la vista.')}</div>
<div class="linea"><h3>Flora · ciervo de los pantanos</h3>
${tarjeta('B52', 'Guasú', 'Ciervito', 'Flora', 'base', guasu(), 'Ciervo joven, todavía sin cuernos, con las patas negras y el hocico oscuro. <i>Guasu</i> es venado en guaraní. Tímido.')}
${tarjeta('B53', 'Pantanero', 'Ciervo del pantano', 'Flora', 'camino 1', guasu('pantano'), 'Vadeando el bañado: avanza levantando bien alta una mano, con el cuello estirado hacia adelante y las patas mojadas más oscuras hasta la rodilla. Cuernos cortos de pantano.')}
${tarjeta('B54', 'Ramazón', 'Ciervo de cornamenta', 'Flora', 'camino 2', guasu('cornamenta'), 'Alto y orgulloso, con una cornamenta enorme que echa hojas como un árbol.')}</div>
</section>`;
const css = `@keyframes gotas{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}@keyframes salto{0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(0,-5px) rotate(-3deg)}}@keyframes zz{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes alas{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.06)}}@keyframes grito{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}@keyframes cresta2{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.9)}}@keyframes aleta{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}@keyframes gota{0%{transform:translateY(0);opacity:1}100%{transform:translateY(26px);opacity:0}}@keyframes cuernos{0%,100%{transform:rotate(0)}50%{transform:rotate(1.4deg)}}
.gotas path{animation:gotas 1.4s ease-in infinite;transform-box:fill-box}.salto{animation:salto 1.6s ease-in-out infinite;transform-box:view-box}.zz{animation:zz 2s ease-in-out infinite}
.alas{animation:alas 1.6s ease-in-out infinite;transform-box:view-box}.grito{animation:grito 1s ease-in-out infinite;transform-box:fill-box;transform-origin:right center}.cresta2{animation:cresta2 1.2s ease-in-out infinite;transform-box:view-box;transform-origin:84px 50px}
.aleta{animation:aleta 1.8s ease-in-out infinite;transform-box:fill-box}.gota{animation:gota 2.2s ease-in infinite;transform-box:fill-box}.cuernos{animation:cuernos 4s ease-in-out infinite;transform-box:view-box;transform-origin:80px 40px}
.ala{animation:ala 5s infinite;transform-box:view-box}@keyframes ala{0%,80%,100%{transform:rotate(0)}88%{transform:rotate(-10deg)}}.cresta{animation:cresta 1.6s ease-in-out infinite;transform-box:view-box}@keyframes cresta{0%,100%{transform:rotate(0) scaleX(1)}50%{transform:rotate(-4deg) scaleX(1.05)}}`;
writeFileSync(new URL('./catalogo-10.html', import.meta.url), pagina('Catálogo para aprobar · lote 5b', 'Bichos de Corrientes: carpincho, tero, aguará guazú y ciervo de los pantanos', cuerpo, css));
console.log('ok');
