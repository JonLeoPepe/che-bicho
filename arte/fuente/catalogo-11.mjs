// Catálogo para aprobar, lote 5c: mbarigüí, chajá y palometa (Corrientes).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const gotas = (pts) => `<g class="gotas">${pts.map(([x, y], i) => `<path d="M${x},${y} C${x - 2},${y + 4} ${x + 2},${y + 6} ${x + 3},${y + 2} C${x + 3},${y} ${x + 1},${y - 2} ${x},${y}Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1" style="animation-delay:${i * 0.25}s"/>`).join('')}</g>`;

// ───────── MBARIGÜÍ (Veneno) · jején ─────────
const ojoFacetado = (cx, cy, r, col) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}" ${L(2)}/>${Array.from({ length: 7 }, (_, i) => `<circle cx="${cx + Math.cos(i) * r * 0.5}" cy="${cy + Math.sin(i) * r * 0.5}" r="${r * 0.22}" fill="none" stroke="#5a0f1a" stroke-width=".8" opacity=".7"/>`).join('')}<circle cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" r="${r * 0.25}" fill="#fff" opacity=".8"/>`;
function jejen({ x, y, s = 1, panza = 'normal' }) {
  const gordo = panza === 'llena';
  const abd = gordo ? 'M8,-2 C24,-16 58,-12 62,6 C64,24 40,34 18,26 C6,20 2,8 8,-2Z' : 'M8,-4 C22,-10 46,-6 54,2 C56,8 46,14 30,12 C18,10 10,6 8,-4Z';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g class="ala" style="transform-origin:0px -6px"><path d="M-2,-8 C6,-44 38,-60 54,-50 C46,-36 22,-18 2,-6Z" fill="#e8f2f6" fill-opacity=".55" ${L(1.6)}/><path d="M0,-10 C14,-34 32,-46 48,-48 M8,-16 C20,-30 30,-36 40,-38" stroke="#8aa" stroke-width="1" fill="none"/></g>
    ${[[-10, 6, -24, 34], [-2, 8, -6, 40], [6, 8, 18, 38]].map(([a, b, c, d]) => trazo(`M${a},${b} L${(a + c) / 2 - 4},${(b + d) / 2} L${c},${d}`, '#3a2a3a', 1.8)).join('')}
    <path d="${abd}" fill="${gordo ? '#9a2a3a' : '#5a4a5e'}" ${L(2.4)}/>${(gordo ? [16, 28, 40, 52] : [18, 28, 38, 46]).map((xx) => `<path d="M${xx},${gordo ? -10 : -5} C${xx + 4},${gordo ? 6 : 2} ${xx + 2},${gordo ? 18 : 8} ${xx - 2},${gordo ? 26 : 12}" stroke="${gordo ? '#c94a5a' : '#8a6a9a'}" stroke-width="2" fill="none" opacity=".8"/>`).join('')}
    ${gordo ? '<path d="M20,0 C30,-8 44,-8 52,0" stroke="#e8a0aa" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>' : ''}
    <path d="M-16,-2 C-14,-14 2,-16 10,-8 C14,0 8,10 -4,10 C-14,10 -18,6 -16,-2Z" fill="#3e3442" ${L(2.4)}/><path d="M-10,-10 C-4,-14 4,-12 8,-8" stroke="#6a5a72" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-22,0 C-22,-8 -14,-10 -12,-4 C-10,4 -16,8 -20,6Z" fill="#3e3442" ${L(2)}/>
    ${ojoFacetado(-20, -2, 6, '#c8362b')}${gordo ? '<path d="M-26,-6 C-22,-9 -16,-9 -14,-6 L-14,-3 C-18,-5 -22,-5 -26,-3Z" fill="#3e3442"/>' : ''}
    <path d="M-24,4 L-40,${gordo ? 18 : 14}" stroke="${O}" stroke-width="3" stroke-linecap="round"/><path d="M-24,4 L-40,${gordo ? 18 : 14}" stroke="#8a5a7a" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M-22,-6 C-30,-16 -36,-20 -42,-20 M-20,-8 C-26,-20 -30,-26 -36,-28" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`;
}
export function mbarigui(v = 'base') {
  if (v === 'enjambre') {
    const pts = []; for (let i = 0; i < 46; i++) { const a = i * 2.4, r = 12 + ((i * 37) % 44); pts.push([100 + Math.cos(a) * r * 1.15, 96 + Math.sin(a) * r * 0.85]); }
    return `${sombra(100, 182, 46)}<g class="nube">
      <ellipse cx="100" cy="96" rx="64" ry="48" fill="#4a3a52" opacity=".18"/>
      ${pts.map(([x, y], i) => `<g class="mosca" style="animation-delay:${(i % 7) * 0.15}s"><path d="M${x.toFixed(1)},${y.toFixed(1)} l-3,-4 M${x.toFixed(1)},${y.toFixed(1)} l3,-4" stroke="#bcd" stroke-width="1.2"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3" ry="1.8" fill="#3e3442"/></g>`).join('')}
      <circle cx="86" cy="92" r="8" fill="#ff5a4a" opacity=".35"/><circle cx="114" cy="92" r="8" fill="#ff5a4a" opacity=".35"/>
      ${ojoFacetado(86, 92, 5.5, '#e83a2b')}${ojoFacetado(114, 92, 5.5, '#e83a2b')}<path d="M78,82 L94,88 M122,82 L106,88" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/></g>`;
  }
  if (v === 'siesta') return `${sombra(108, 180, 46)}<g class="flota">${jejen({ x: 84, y: 112, s: 1.35, panza: 'llena' })}</g>`;
  return `${sombra(104, 182, 34)}<g class="flota">${jejen({ x: 90, y: 104, s: 1.5 })}</g>`;
}

// ───────── RAYAJÁ (Rayo) · chajá ─────────
const C_CH = { pl: '#8e9098', so: '#62646c', lu: '#b4b6bc', ne: '#2a2626', bl: '#f1efe8', ro: '#d6716a', ra: '#f2d23a' };
const espolones = (x, y, s = 1, chispa = true) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 L-8,-12 L4,-4Z M6,4 L-2,-8 L10,0Z" fill="#e6dcc0" ${L(1.6)}/>${chispa ? `<g class="chispa"><path d="M-10,-14 l-4,-4 M-6,-16 l0,-6 M-12,-10 l-6,0" stroke="${C_CH.ra}" stroke-width="2" stroke-linecap="round"/></g>` : ''}</g>`;
const cabezaChaja = (x, y, r = 0, s = 1, abierta = false) => { const C = C_CH; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <g class="cresta2"><path d="M6,-10 C14,-20 22,-24 30,-24 C24,-18 18,-12 10,-6Z" fill="${C.so}" ${L(1.6)}/></g>
  <path d="M-12,2 C-14,-10 -4,-16 6,-14 C16,-12 18,0 14,8 C10,14 0,14 -6,12 C-10,10 -12,6 -12,2Z" fill="${C.pl}" ${L(2.4)}/>
  <path d="M-12,0 L-24,2 C-26,4 -24,6 -22,6 L-12,6Z" fill="#3a3436" ${L(1.6)}/>${abierta ? `<path d="M-12,6 L-24,12 L-12,9Z" fill="#3a3436" ${L(1.4)}/>` : ''}
  <circle cx="-2" cy="-2" r="5.4" fill="${C.ro}" ${L(1.4)}/>${ojoAlm(-2, -2, 3, 2, '#c87a2a')}</g>`; };
export function rayaja(v = 'base') {
  const C = C_CH, vig = v === 'vigia', tro = v === 'trueno';
  const cuerpo = 'M64,112 C62,88 84,74 112,76 C140,78 158,96 156,120 C154,142 134,152 110,150 C84,148 66,136 64,112Z';
  const k = nuevoId('ch');
  if (tro) return `<defs>${clip(k, cuerpo)}</defs>${sombra(104, 184, 54)}
    <g class="rayos" fill="none" stroke="${C.ra}" stroke-width="2.8" stroke-linejoin="round"><path d="M40,54 l10,8 l-6,4 l10,10"/><path d="M166,50 l-10,8 l6,4 l-10,10"/><path d="M100,22 l-4,10 l6,2 l-4,10"/></g>
    <g class="aleteo" style="transform-origin:110px 100px">
      <path d="M92,96 C70,74 44,62 14,62 C24,72 30,80 32,92 C22,96 16,104 14,114 C34,112 54,112 76,118Z" fill="${C.so}" ${L(2.6)}/>${[0, 1, 2].map((i) => `<path d="M${22 + i * 8},${74 + i * 10} C${40 + i * 8},${78 + i * 8} ${56 + i * 6},${86 + i * 8} ${70 + i * 4},${98 + i * 6}" stroke="${C.lu}" stroke-width="1.6" fill="none"/>`).join('')}${espolones(80, 86, 1.6)}
      <path d="M128,96 C150,74 176,62 196,62 C188,72 182,80 180,92 C190,96 194,104 196,114 C176,112 156,112 136,118Z" fill="${C.pl}" ${L(2.6)}/>${espolones(132, 86, 1.6)}
    </g>
    ${trazo('M100,146 L96,172', C.ro, 7)}${trazo('M118,146 L120,172', C.ro, 7)}<path d="M88,174 L104,174 M112,174 L128,174" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
    <path d="${cuerpo}" fill="${C.pl}"/><g clip-path="url(#${k})"><ellipse cx="110" cy="146" rx="50" ry="14" fill="${C.so}" opacity=".6"/></g><path d="${cuerpo}" fill="none" ${L()}/>
    <g class="cabeza" style="transform-origin:96px 80px"><path d="M86,84 C82,70 82,58 86,48 L100,52 C98,62 98,74 102,84Z" fill="${C.pl}" ${L(2.4)}/><path d="M84,70 C90,72 96,72 100,70" stroke="${C.ne}" stroke-width="7"/><path d="M84,64 C90,66 96,66 100,64" stroke="${C.bl}" stroke-width="3"/>${cabezaChaja(92, 40, -8, 1.15, true)}</g>`;
  const neckTop = vig ? 30 : 54;
  return `<defs>${clip(k, cuerpo)}</defs>${sombra(108, 184, 46)}
  ${vig ? `${trazo('M110,146 L108,178', C.ro, 7)}${trazo('M118,144 L130,154 L120,160', C.ro, 6)}<path d="M100,180 L116,180" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` : `${trazo('M100,146 L96,176', C.ro, 7)}${trazo('M118,146 L120,176', C.ro, 7)}<path d="M88,178 L104,178 M112,178 L128,178" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`}
  <g class="respira" style="transform-origin:108px 150px">
    <path d="M150,118 L178,138 L170,146 L146,132Z" fill="${C.ne}" ${L(2.4)}/>
    <path d="${cuerpo}" fill="${C.pl}"/><g clip-path="url(#${k})"><ellipse cx="110" cy="148" rx="50" ry="14" fill="${C.so}" opacity=".6"/><path d="M84,84 C104,78 130,82 146,96" stroke="${C.lu}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    <path d="M96,90 C118,84 142,94 152,114 C140,124 120,126 104,118 C94,112 92,100 96,90Z" fill="${C.so}" ${L(2.4)}/>${[0, 1, 2].map((i) => `<path d="M${108 + i * 10},${96 + i * 6} q8,2 8,10" stroke="${C.lu}" stroke-width="1.6" fill="none"/>`).join('')}
    ${espolones(98, 94, 1.6)}
  </g>
  <g class="cabeza" style="transform-origin:88px 90px">
    <path d="M78,96 C72,${neckTop + 30} 72,${neckTop + 14} 76,${neckTop + 2} L92,${neckTop + 4} C90,${neckTop + 16} 90,${neckTop + 30} 96,96Z" fill="${C.pl}" ${L(2.4)}/>
    <path d="M74,${neckTop + 22} C82,${neckTop + 24} 88,${neckTop + 24} 94,${neckTop + 22}" stroke="${C.ne}" stroke-width="7"/><path d="M74,${neckTop + 16} C82,${neckTop + 18} 88,${neckTop + 18} 94,${neckTop + 16}" stroke="${C.bl}" stroke-width="3"/>
    ${cabezaChaja(82, neckTop - 8, vig ? -14 : 0, 1)}</g>`;
}

// ───────── PIRAYÚ (Agua) · palometa ─────────
function pez({ x, y, r = 0, s = 1, C, largo = false, boca = 'abierta', cicatriz = false }) {
  const k = nuevoId('pz');
  const cuerpo = largo ? 'M-56,0 C-44,-22 -6,-30 26,-22 C42,-18 52,-8 56,0 C52,8 42,16 26,20 C-6,26 -44,20 -56,0Z' : 'M-46,2 C-40,-30 -6,-44 22,-36 C40,-30 50,-14 52,2 C50,18 40,32 22,38 C-6,46 -40,32 -46,2Z';
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><defs>${clip(k, cuerpo)}</defs>
    <g class="cola2" style="transform-origin:${x + 50 * s}px ${y}px"><path d="M48,0 L78,${largo ? -18 : -24} L72,0 L78,${largo ? 18 : 24}Z" fill="${C.al}" ${L(2.4)}/><path d="M74,${largo ? -16 : -22} L72,0 L74,${largo ? 16 : 22}" stroke="${O}" stroke-width="3" fill="none"/></g>
    <path d="M-4,${largo ? -24 : -38} C6,${largo ? -40 : -54} 20,${largo ? -40 : -54} 30,${largo ? -24 : -34}Z" fill="${C.al}" ${L(2)}/>
    <path d="M-10,${largo ? 22 : 38} C4,${largo ? 34 : 50} 26,${largo ? 34 : 50} 40,${largo ? 18 : 28}Z" fill="${C.al}" ${L(2)}/>
    <path d="${cuerpo}" fill="${C.cu}"/><g clip-path="url(#${k})"><path d="M-60,${largo ? 6 : 10} C-20,${largo ? 22 : 34} 30,${largo ? 22 : 34} 60,${largo ? 8 : 12} L60,50 L-60,50Z" fill="${C.pa}"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle cx="${-20 + (i % 7) * 10}" cy="${(largo ? -10 : -18) + Math.floor(i / 7) * 10}" r="2" fill="${C.ma}" opacity=".7"/>`).join('')}
      <path d="M-30,${largo ? -14 : -24} C-6,${largo ? -24 : -36} 20,${largo ? -24 : -34} 40,${largo ? -12 : -20}" stroke="#fff" stroke-width="4" fill="none" opacity=".45" stroke-linecap="round"/>
      ${cicatriz ? '<path d="M4,-20 l14,10 M10,-24 l6,16" stroke="#f1e6d4" stroke-width="2" stroke-linecap="round"/>' : ''}</g>
    <path d="${cuerpo}" fill="none" ${L(2.6)}/>
    <path d="M-12,${largo ? -14 : -22} C-18,${largo ? -4 : -6} -18,${largo ? 6 : 10} -12,${largo ? 14 : 22}" stroke="${O}" stroke-width="1.8" fill="none" opacity=".6"/>
    <path d="M-6,${largo ? 4 : 6} C2,${largo ? 2 : 4} 10,${largo ? 6 : 8} 14,${largo ? 12 : 16} C8,${largo ? 12 : 16} 0,${largo ? 10 : 14} -6,${largo ? 4 : 6}Z" fill="${C.al}" ${L(1.4)}/>
    ${boca === 'abierta' ? `<path d="M-46,${largo ? 0 : 2} L-30,${largo ? 2 : 4} L-44,${largo ? 12 : 16}Z" fill="#7a1f2a" ${L(1.6)}/><path d="M-44,${largo ? 1 : 3} l2,4 l2,-4 l2,4 l2,-4 l2,4 l2,-4" stroke="#fff" stroke-width="1.6" fill="none"/><path d="M-43,${largo ? 11 : 15} l2,-4 l2,4 l2,-4 l2,4 l2,-4" stroke="#fff" stroke-width="1.6" fill="none"/>`
      : boca === 'enorme' ? `<path d="M-46,-4 L-24,6 L-48,30 C-54,22 -54,8 -46,-4Z" fill="#6a1520" ${L(1.8)}/><path d="M-46,-2 l3,6 l3,-5 l3,6 l3,-5 l3,6 l3,-5 l3,6" stroke="#fff" stroke-width="2" fill="none"/><path d="M-46,26 l3,-6 l3,5 l3,-6 l3,5 l3,-6" stroke="#fff" stroke-width="2" fill="none"/>` : `<path d="M-56,0 L-40,2" ${L(1.6)}/>`}
    ${ojoAlm(-28, largo ? -6 : -12, 5, 4, '#e0b03a')}<path d="M-34,${largo ? -12 : -19} L-20,${largo ? -9 : -15}" ${L(2.4)}/></g>`;
}
function correnton() {
  const k = nuevoId('cr');
  const cu = 'M-76,1 C-66,-18 -42,-28 -12,-28 C16,-27 38,-15 52,-3 C57,0 57,6 52,9 C38,19 16,27 -12,26 C-42,24 -64,16 -76,1Z';
  return `${sombra(100, 184, 58)}
  <g class="burbujas"><circle cx="178" cy="78" r="4" fill="none" stroke="#7fb2cc" stroke-width="1.6"/><circle cx="188" cy="94" r="2.6" fill="none" stroke="#7fb2cc" stroke-width="1.4"/><circle cx="176" cy="104" r="3" fill="none" stroke="#7fb2cc" stroke-width="1.4"/></g>
  <g class="nada"><g transform="translate(98 104) rotate(-14) scale(1.12)"><defs>${clip(k, cu)}</defs>
    <g class="coletazo"><path d="M50,3 C62,-6 76,-20 96,-30 C88,-14 82,-5 77,3 C82,11 88,20 96,36 C76,26 62,12 50,3Z" fill="#3e6a86" ${L(2.4)}/><path d="M60,-2 C70,-10 80,-18 90,-24 M60,8 C70,16 80,24 90,30" stroke="#7fa6bc" stroke-width="1.6" fill="none"/></g>
    <path d="M-22,-27 C-10,-40 12,-44 32,-40 C26,-32 22,-26 18,-20Z" fill="#3e6a86" ${L(2)}/><path d="M-12,-30 L-4,-38 M0,-28 L8,-40 M12,-24 L20,-38" stroke="#7fa6bc" stroke-width="1.4"/><path d="M38,-12 L48,-20 L50,-8Z" fill="#3e6a86" ${L(1.6)}/>
    <path d="M8,23 C16,34 28,38 42,34 C35,26 32,19 30,16Z" fill="#5a86a0" ${L(2)}/>
    <path d="${cu}" fill="#a8c6d6"/><g clip-path="url(#${k})">
      <path d="M-80,-4 C-40,-10 10,-8 60,-2 L60,-40 L-80,-40Z" fill="#3e6a86"/>
      <path d="M-80,10 C-40,18 10,20 60,8 L60,40 L-80,40Z" fill="#eef4f6"/>
      <path d="M-60,2 C-20,4 20,4 54,3" stroke="#e4f2f8" stroke-width="2.4" fill="none" opacity=".9"/>
      ${Array.from({ length: 9 }, (_, i) => `<circle cx="${-30 + i * 9}" cy="${-11 + (i % 2) * 3}" r="1.6" fill="#24485e" opacity=".8"/>`).join('')}
      <path d="M-50,-17 C-20,-23 16,-20 44,-10" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/></g>
    <path d="${cu}" fill="none" ${L(2.6)}/>
    <path d="M-46,-12 C-50,-4 -50,6 -46,13" stroke="${O}" stroke-width="1.8" fill="none" opacity=".6"/>
    <path d="M-38,6 C-26,9 -12,16 -2,26 C-16,25 -30,17 -38,6Z" fill="#5a86a0" ${L(1.6)}/>
    <path d="M-77,2 L-62,7" ${L(2)}/><path d="M-74,4 l1,-3 l2,3 l2,-3 l2,3" stroke="#fff" stroke-width="1.3" fill="none"/>
    ${ojoAlm(-58, -6, 4.2, 3.4, '#e0b03a')}<path d="M-65,-12 L-50,-9" ${L(2.6)}/></g></g>`;
}
function dentuda() {
  const k = nuevoId('dn');
  const cu = 'M-54,6 C-56,-14 -42,-40 -18,-54 C2,-64 28,-56 42,-38 C54,-22 58,-4 56,12 C54,32 38,48 14,54 C-10,60 -36,50 -46,34 C-50,26 -52,16 -54,6Z';
  return `${sombra(104, 186, 60)}
  <g class="burbujas"><circle cx="26" cy="132" r="4" fill="none" stroke="#7fb2cc" stroke-width="1.6"/><circle cx="18" cy="116" r="2.6" fill="none" stroke="#7fb2cc" stroke-width="1.4"/></g>
  <g class="acecha"><g transform="translate(108 100) rotate(10) scale(1.2)"><defs>${clip(k, cu)}</defs>
    <g class="coletazo"><path d="M52,2 L84,-30 L80,-16 L90,-10 L80,-2 L90,8 L80,14 L86,34 Z" fill="#2c3338" ${L(2.4)}/><path d="M60,0 L78,-18 M60,6 L78,22" stroke="#555f66" stroke-width="1.6"/></g>
    <path d="M-6,-58 L0,-76 L8,-66 L14,-80 L20,-68 L30,-72 L28,-58 L36,-48Z" fill="#2c3338" ${L(2)}/>
    <path d="M6,54 L8,70 L16,62 L22,72 L28,60 L36,62 L32,46Z" fill="#2c3338" ${L(2)}/>
    <path d="${cu}" fill="#5f696f"/><g clip-path="url(#${k})">
      <path d="M-60,-10 C-30,-24 20,-26 60,-14 L60,-70 L-60,-70Z" fill="#30373c"/>
      <path d="M-60,14 C-40,22 -20,40 -4,64 L-60,64Z" fill="#c8352a"/>
      <path d="M-10,40 C10,44 30,40 56,26 L56,64 L-10,64Z" fill="#a82e26" opacity=".85"/>
      ${Array.from({ length: 16 }, (_, i) => `<circle cx="${-10 + (i % 6) * 10 + (Math.floor(i / 6) % 2) * 5}" cy="${-20 + Math.floor(i / 6) * 11}" r="2.2" fill="#1f2529" opacity=".75"/>`).join('')}
      <path d="M-6,-30 l20,16 M2,-36 l8,22 M24,6 l18,-10 M30,14 l10,8" stroke="#c9a89a" stroke-width="1.5" stroke-linecap="round" opacity=".85"/></g>
    <path d="${cu}" fill="none" ${L(2.8)}/>
    <path d="M-30,-20 C-36,-4 -36,14 -30,28" stroke="${O}" stroke-width="2" fill="none" opacity=".6"/>
    <path d="M-20,10 C-8,12 4,18 10,28 C-2,28 -14,22 -20,10Z" fill="#2c3338" ${L(1.6)}/>
    <path d="M-55,2 L-34,14 L-60,24Z" fill="#5a1218" ${L(1.8)}/>
    <path d="M-54,24 C-66,26 -74,32 -72,40 C-64,46 -48,46 -38,38 L-36,26Z" fill="#c8352a" ${L(2.4)}/>
    <path d="M-54,3 L-51,10 L-48,5 L-45,12 L-42,7 L-39,13 L-36,10" fill="#fbf6ea" stroke="${O}" stroke-width="1" stroke-linejoin="round"/>
    <path d="M-70,30 L-67,22 L-64,29 L-61,21 L-58,28 L-55,20 L-52,27 L-49,20 L-46,27" fill="#fbf6ea" stroke="${O}" stroke-width="1" stroke-linejoin="round"/>
    <circle cx="-34" cy="-16" r="5.2" fill="#d33a2a" ${L(1.6)}/><circle cx="-35" cy="-16" r="2.2" fill="${O}"/><circle cx="-36" cy="-18" r="1" fill="#fff"/>
    <path d="M-46,-22 C-40,-28 -30,-28 -24,-22" stroke="${O}" stroke-width="4.2" fill="none" stroke-linecap="round"/>
    <path d="M-40,-30 l8,20" stroke="#c9a89a" stroke-width="1.5" stroke-linecap="round"/></g></g>`;
}
export function pirayu(v = 'base') {
  if (v === 'rio') return correnton();
  if (v === 'brava') return dentuda();
  if (v === 'rio') return `${sombra(100, 182, 52)}<g class="viento" fill="none" stroke="#a9cfe0" stroke-width="2.4" stroke-linecap="round"><path d="M150,80 L190,80"/><path d="M156,100 L196,100"/><path d="M148,120 L186,120"/></g>
    <g class="nada">${pez({ x: 96, y: 100, s: 1.25, largo: true, boca: 'cerrada', C: { cu: '#9ab4c4', pa: '#dfe8ec', ma: '#4a6a80', al: '#5a7a90' } })}</g>`;
  if (v === 'brava') return `${sombra(104, 184, 62)}<g class="nada">${pez({ x: 100, y: 96, s: 1.4, boca: 'enorme', cicatriz: true, C: { cu: '#6f7a80', pa: '#d8402a', ma: '#2a3238', al: '#3a4248' } })}</g>`;
  return `${sombra(104, 184, 40)}${gotas([[44, 140], [64, 152], [150, 70], [160, 92]])}
  <g class="salta">${pez({ x: 100, y: 98, r: -18, s: 1.2, C: { cu: '#b4bcc0', pa: '#e88a4a', ma: '#5a6268', al: '#7a8288' } })}</g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Tres siluetas distintas por familia, sin escenario.</div>
<section>
<div class="linea"><h3>Veneno · mbarigüí</h3>
${tarjeta('B55', 'Mbarigüí', 'Mbarigüí', 'Veneno', 'base', mbarigui(), 'Jején del estero en grande: ojos compuestos rojos, trompa para picar, alas de vidrio que zumban y patas largas colgando. Conserva su nombre guaraní.')}
${tarjeta('B56', 'Nubarrón', 'Mbarigüí de enjambre', 'Veneno', 'camino 1', mbarigui('enjambre'), 'Ya no es uno: es una nube de cientos que se mueve como un solo bicho, con dos ojos rojos que brillan en el medio.')}
${tarjeta('B57', 'Siestero', 'Mbarigüí de siesta', 'Veneno', 'camino 2', mbarigui('siesta'), 'Gordo, con la panza roja llena y los párpados caídos; vuela bajo y lento a la hora de la siesta, pero su picadura dura días.')}</div>
<div class="linea"><h3>Rayo · chajá</h3>
${tarjeta('B58', 'Rayajá', 'Chajá', 'Rayo', 'base', rayaja(), 'Chajá gris con collar negro y blanco, piel roja alrededor del ojo, cresta en la nuca y dos espolones en el ala que chisporrotean.')}
${tarjeta('B59', 'Vigía', 'Chajá centinela', 'Rayo', 'camino 1', rayaja('vigia'), 'Parado en una pata con el cuello estirado bien alto, vigilando todo el estero: avisa antes que nadie.')}
${tarjeta('B60', 'Tronador', 'Chajá trueno', 'Rayo', 'camino 2', rayaja('trueno'), 'Con las alas abiertas y el pico abierto, grita como un trueno; saltan rayos entre los espolones.')}</div>
<div class="linea"><h3>Agua · palometa</h3>
${tarjeta('B61', 'Pirayú', 'Palometa', 'Agua', 'base', pirayu(), 'Palometa saltando fuera del agua: cuerpo alto y plateado, garganta naranja y dientes de sierra. De <i>pirá</i>, pez en guaraní.')}
${tarjeta('B62', 'Correntón', 'Palometa de río', 'Agua', 'camino 1', pirayu('rio'), 'Larga y afilada como un torpedo: lomo azul oscuro, cola de horquilla y aletas barridas hacia atrás. Remonta la corriente más rápido que nadie.')}
${tarjeta('B63', 'Dentuda', 'Palometa brava', 'Agua', 'camino 2', pirayu('brava'), 'Alta y jorobada, casi negra, con la garganta roja y la mandíbula de abajo salida hacia adelante llena de dientes. Aletas rotas y cicatrices de pelea.')}</div>
</section>`;
const css = `@keyframes ala{0%,100%{transform:rotate(0)}50%{transform:rotate(-14deg)}}@keyframes flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes mosca{0%,100%{transform:translate(0,0)}25%{transform:translate(2px,-2px)}75%{transform:translate(-2px,1px)}}@keyframes nube{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes chispa{0%,60%,100%{opacity:0}70%,80%{opacity:1}}@keyframes cresta2{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes rayos{0%,60%,100%{opacity:0}70%,80%{opacity:1}}@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.9)}}
@keyframes cola2{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}@keyframes salta{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-6px) rotate(-3deg)}}@keyframes nada{0%,100%{transform:translateX(0)}50%{transform:translateX(-4px)}}@keyframes gotas{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}
.ala{animation:ala .12s linear infinite;transform-box:view-box}.flota{animation:flota 1.8s ease-in-out infinite;transform-box:view-box}.mosca{animation:mosca .5s linear infinite;transform-box:fill-box}.nube{animation:nube 2.4s ease-in-out infinite;transform-box:view-box;transform-origin:100px 96px}
.chispa{animation:chispa 1.6s infinite}.cresta2{animation:cresta2 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:left bottom}.rayos path{animation:rayos 1.4s infinite}.rayos path:nth-child(2){animation-delay:.4s}.rayos path:nth-child(3){animation-delay:.8s}.aleteo{animation:aleteo 1.8s ease-in-out infinite;transform-box:view-box}
.cola2{animation:cola2 .8s ease-in-out infinite;transform-box:view-box}.salta{animation:salta 1.6s ease-in-out infinite;transform-box:view-box;transform-origin:100px 98px}.nada{animation:nada 1.2s ease-in-out infinite;transform-box:view-box}.coletazo{animation:cola2 .5s ease-in-out infinite;transform-box:fill-box;transform-origin:0% 50%}.acecha{animation:acecha 2.2s ease-in-out infinite;transform-box:view-box}.burbujas circle{animation:burb 1.8s ease-in infinite;transform-box:fill-box}.burbujas circle:nth-child(2){animation-delay:.6s}.burbujas circle:nth-child(3){animation-delay:1.2s}@keyframes acecha{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,2px)}}@keyframes burb{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-16px);opacity:0}}.gotas path{animation:gotas 1.4s ease-in infinite;transform-box:fill-box}`;
writeFileSync(new URL('./catalogo-11.html', import.meta.url), pagina('Catálogo para aprobar · lote 5c', 'Bichos de Corrientes: mbarigüí, chajá y palometa', cuerpo, css));
console.log('ok');
