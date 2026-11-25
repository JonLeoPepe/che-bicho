// Catálogo para aprobar, lote 2b: yarará, lagartija de pirca, luciérnaga y Ucumar (Salta).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';

const f1 = (n) => n.toFixed(1);
// contorno peludo: elipse con borde en picos
const peludo = (cx, cy, rx, ry, n = 26, amp = 5, fase = 0) => {
  let d = '';
  for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2 + fase, r = i % 2 ? 1 : 1 + amp / Math.min(rx, ry); const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r; d += (i ? ' L' : 'M') + f1(x) + ',' + f1(y); }
  return d + 'Z';
};

// ───────── MIYURÁ (Veneno) · yarará ─────────
const cuerpoVibora = (d, w, base, mancha, borde) => `<path d="${d}" stroke="${O}" stroke-width="${w + 4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" stroke="${borde}" stroke-width="${w * 0.75}" fill="none" stroke-dasharray="${w * 0.7} ${w * 0.9}" stroke-linecap="butt"/><path d="${d}" stroke="${mancha}" stroke-width="${w * 0.55}" fill="none" stroke-dasharray="${w * 0.7} ${w * 0.9}" stroke-linecap="butt"/>
  <path d="${d}" stroke="#fff" stroke-width="${w * 0.14}" fill="none" opacity=".25" transform="translate(0 -${w * 0.25})"/>`;
const cabezaVibora = (x, y, s, C, abierta = false, cruz = false) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M28,6 C20,-8 4,-12 -10,-6 C-18,-2 -20,6 -14,10 C-2,16 16,16 28,12Z" fill="${C.ba}" ${L(2.6)}/>
  <path d="M24,2 C16,-6 4,-8 -6,-4 C2,-2 10,0 18,4Z" fill="${C.ma}" opacity=".8"/>
  ${cruz ? '<path d="M2,-7 L6,4 M-3,-2 L11,-3" stroke="#efe3c0" stroke-width="2.6" stroke-linecap="round"/>' : ''}
  ${abierta ? `<path d="M-14,10 C-4,22 12,22 24,14 L20,10 C10,14 0,14 -12,8Z" fill="#7a2a3a" ${L(2)}/><path d="M-6,12 l1,6 l2,-5 M6,13 l1,6 l2,-5" fill="#f4efe2" stroke="${O}" stroke-width="1"/>` : `<path d="M-14,9 C-2,14 12,14 26,11" ${L(1.6)} fill="none"/>`}
  <circle cx="-13" cy="3" r="1.4" fill="${O}"/>
  ${ojoAlm(-3, 0, 4.2, 2.6, '#d9a62a', 'vertical')}<path d="M-9,-4 C-4,-6 2,-6 6,-3" ${L(2.2)} fill="none"/>
  <g class="lengua"><path d="M-18,8 L-28,8 L-32,5 M-28,8 L-32,11" stroke="#c23a4a" stroke-width="1.8" fill="none" stroke-linecap="round"/></g></g>`;
export function miyura(v = 'base') {
  if (v === 'monte') {
    const C = { ba: '#6f5a3a', ma: '#2e2218', bo: '#d9c79a' };
    const espiral = [[110, 166, 54, 13], [108, 154, 44, 11], [106, 143, 33, 9]].map(([x, y, rx, ry]) => `M${x - rx},${y} A${rx},${ry} 0 1 0 ${x + rx},${y} A${rx},${ry} 0 1 0 ${x - rx},${y}`).join(' ');
    return `${sombra(110, 178, 70)}
    ${[[110, 166, 54, 13], [108, 154, 44, 11], [106, 143, 33, 9]].map(([x, y, rx, ry]) => cuerpoVibora(`M${x - rx},${y} A${rx},${ry} 0 1 0 ${x + rx},${y} A${rx},${ry} 0 1 0 ${x - rx},${y}`, 16, C.ba, C.ma, C.bo)).join('')}
    <g class="acecho" style="transform-origin:106px 140px">${cuerpoVibora('M112,138 C124,124 118,104 100,98 C82,92 76,80 80,66', 14, C.ba, C.ma, C.bo)}${cabezaVibora(60, 58, 1.25, C, true, true)}</g>`;
  }
  if (v === 'chica') {
    const C = { ba: '#a29a84', ma: '#3a342a', bo: '#ece2c6' };
    return `${sombra(118, 176, 40)}
    ${cuerpoVibora('M150,168 C170,166 172,156 156,154 C140,152 126,158 112,160 C96,162 92,170 108,172 C124,174 140,170 146,164', 11, C.ba, C.ma, C.bo)}
    <g class="latigo" style="transform-origin:118px 160px">
      <g fill="none" stroke="#c9bfa4" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M96,92 C108,84 124,86 132,96"/><path d="M90,80 C106,70 128,72 140,86"/></g>
      ${cuerpoVibora('M116,158 C100,142 132,128 114,112 C100,100 80,106 66,100', 11, C.ba, C.ma, C.bo)}
      <g transform="translate(28 106)"><g class="chasquido"><path d="M0,-12 L3,-3 L12,-4 L5,2 L9,11 L0,5 L-9,11 L-5,2 L-12,-4 L-3,-3Z" fill="#fff4c2" stroke="#e2b23a" stroke-width="1.6"/></g></g>
      ${cabezaVibora(54, 94, 1.05, C, true)}
    </g>`;
  }
  const C = { ba: '#8a7350', ma: '#3e2c1e', bo: '#d9c79a' };
  return `${sombra(108, 176, 74)}
  ${cuerpoVibora('M176,170 C186,164 180,154 166,156 C150,158 140,170 120,166 C100,162 104,142 86,138 C70,134 62,126 70,114', 14, C.ba, C.ma, C.bo)}
  <path d="M176,170 C182,172 188,170 190,166" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M176,170 C182,172 188,170 190,166" stroke="${C.ba}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g class="cabeza" style="transform-origin:72px 116px">${cabezaVibora(58, 104, 1, C)}</g>`;
}

// ───────── PIRKASOL (Roca) · lagartija de pirca ─────────
const escamasPiedra = (x0, y0, w, h, c1, c2) => Array.from({ length: Math.floor(w / 7) * Math.floor(h / 6) }, (_, i) => { const cols = Math.floor(w / 7), x = x0 + (i % cols) * 7 + (Math.floor(i / cols) % 2) * 3.5, y = y0 + Math.floor(i / cols) * 6; return `<path d="M${x},${y} l3,-2 l3,2 l-1,3 l-4,0Z" fill="${i % 3 ? c1 : c2}" opacity=".85"/>`; }).join('');
function lagartija({ x, y, s = 1, rot = 0, C, cuerno = false, espinas = false, plana = false, flexion = false, pirca = false }) {
  const k = nuevoId('lg');
  const cuerpo = pirca ? 'M-36,2 C-34,-16 -10,-22 14,-20 C32,-18 44,-8 46,2 C44,8 32,12 14,12 C-8,14 -32,12 -36,2Z' : plana ? 'M-34,0 C-30,-12 -8,-14 14,-12 C30,-10 40,-6 42,0 C40,6 30,10 14,12 C-8,14 -30,12 -34,0Z' : 'M-34,0 C-30,-14 -8,-16 14,-14 C30,-12 40,-6 42,0 C40,8 30,12 14,12 C-8,14 -30,12 -34,0Z';
  const patas = flexion ? `<path d="M-22,6 L-26,24 L-34,26 M-26,24 L-30,30 M-26,24 L-22,30" ${L(5)} fill="none"/><path d="M-22,6 L-26,24 L-34,26 M-26,24 L-30,30 M-26,24 L-22,30" stroke="${C.cu}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24,8 L34,18 L30,26 L38,28 M30,26 L26,30" ${L(5)} fill="none"/><path d="M24,8 L34,18 L30,26 L38,28 M30,26 L26,30" stroke="${C.cu}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
    : `${[[-22, 8, -36, 22], [-18, -8, -34, -24], [26, 8, 40, 22], [26, -8, 40, -22]].map(([a, b, c, d]) => `<path d="M${a},${b} L${(a + c) / 2},${b + (d - b) * 0.3} L${c},${d} M${c},${d} l-5,2 M${c},${d} l-2,5 M${c},${d} l3,3" ${L(5)} fill="none"/><path d="M${a},${b} L${(a + c) / 2},${b + (d - b) * 0.3} L${c},${d}" stroke="${C.cu}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}`;
  const cola = espinas ? `<path d="M40,-4 C56,-6 70,-2 80,4 C70,6 56,8 40,6Z" fill="${C.cu}" ${L(2.4)}/>${[46, 54, 62, 70].map((xx, i) => `<path d="M${xx},${-5 + i * 0.6} l3,-7 l3,7" fill="${C.es}" ${L(1.4)}/><path d="M${xx},${5 + i * 0.2} l3,6 l3,-6" fill="${C.es}" ${L(1.4)}/>`).join('')}`
    : `<path d="M40,-3 C60,-4 80,0 104,8 C80,6 60,6 40,5Z" fill="${C.cu}" ${L(2.2)}/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><defs>${clip(k, cuerpo)}</defs>
    <g class="cola" style="transform-origin:${x + 40 * s}px ${y}px">${cola}</g>${patas}
    <path d="${cuerpo}" fill="${C.cu}"/><g clip-path="url(#${k})">${escamasPiedra(-34, -14, 76, 28, C.lu, C.so)}<path d="M-34,6 C-10,12 20,12 42,4 L42,16 L-34,16Z" fill="${C.pa}" opacity=".9"/>${C.liquen ? '<circle cx="-6" cy="-6" r="4" fill="#c9c25a" opacity=".85"/><circle cx="18" cy="-4" r="3" fill="#9fb85a" opacity=".85"/><circle cx="6" cy="4" r="2.4" fill="#c9c25a" opacity=".8"/>' : ''}</g>
    <path d="${cuerpo}" fill="none" ${L(2.4)}/>
    ${pirca ? [[-24, -10, 8, 6], [-10, -15, 9, 6.5], [6, -16, 9, 6.5], [22, -13, 8, 6], [34, -6, 6, 5], [-16, -3, 7, 5], [0, -5, 8, 5.5], [16, -4, 7, 5]].map(([a, b, rx, ry], i) => `<ellipse cx="${a}" cy="${b}" rx="${rx}" ry="${ry}" fill="${['#a39886', '#958a78', '#b0a592', '#9c917e'][i % 4]}" stroke="${O}" stroke-width="1.5"/><path d="M${a - rx * 0.5},${b - ry * 0.3} q${rx * 0.4},${-ry * 0.5} ${rx * 0.9},0" stroke="#d2c9b4" stroke-width="1.3" fill="none"/>${i % 3 === 0 ? `<circle cx="${a + 2}" cy="${b + 1}" r="2" fill="#c9c25a"/>` : ''}`).join('') : ''}
    <path d="M-30,-6 C-40,-14 -54,-14 -62,-8 C-68,-4 -66,4 -60,6 C-50,8 -40,6 -32,4Z" fill="${C.cu}" ${L(2.4)}/>
    <path d="M-36,2 C-42,6 -52,7 -60,5" stroke="${C.ga}" stroke-width="4" stroke-linecap="round"/>
    ${cuerno ? `<path d="M-40,-12 l2,-8 l4,7 M-48,-13 l1,-8 l4,7 M-32,-10 l4,-6 l2,6" fill="${C.es}" ${L(1.4)}/>` : ''}
    <path d="M-62,0 C-54,2 -46,2 -38,0" ${L(1.4)} fill="none"/><circle cx="-63" cy="-5" r="1" fill="${O}"/>
    ${ojoAlm(-48, -6, 3.6, 2.2, '#c98a2a')}<path d="M-53,-10 C-49,-12 -44,-12 -41,-10" ${L(1.8)} fill="none"/>
  </g>`;
}
export function pirkasol(v = 'base') {
  if (v === 'pirca') {
    const C = { cu: '#8f8a7a', so: '#6f6a5c', lu: '#b2ab98', pa: '#d9d2bf', ga: '#5a5448', es: '#e6dfcc', liquen: true };
    return `${sombra(104, 164, 80)}${lagartija({ x: 96, y: 134, s: 1.4, C, pirca: true })}`;
  }
  if (v === 'quebrada') {
    const C = { cu: '#b0603a', so: '#7a3a22', lu: '#d08a5a', pa: '#ecc89a', ga: '#4a2416', es: '#f1e3c4' };
    return `${sombra(104, 178, 76)}
    ${lagartija({ x: 96, y: 150, s: 1.3, C, cuerno: true, espinas: true, flexion: true })}`;
  }
  const C = { cu: '#a8957a', so: '#7a6a52', lu: '#c9b796', pa: '#e6d8b8', ga: '#3a3024', es: '#efe3c6' };
  return `${sombra(102, 176, 66)}
  <g class="sol"><circle cx="164" cy="34" r="14" fill="#f2c84a" opacity=".55"/></g>
  ${lagartija({ x: 96, y: 150, s: 1.05, rot: -8, C, flexion: true })}`;
}

// ───────── LUCERNA (Rayo) · luciérnaga ─────────
function escarabajo({ x, y, s = 1, rot = 0, vuelo = false, farol = false }) {
  const k = nuevoId('lu');
  const abd = farol ? 'M12,-12 L26,-20 L44,-14 L52,0 L44,14 L26,20 L12,12Z' : 'M14,-6 C30,-8 40,-2 40,4 C40,10 30,14 14,12Z';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><defs><radialGradient id="${k}g"><stop offset="0" stop-color="#fbffc2"/><stop offset=".45" stop-color="#d9f25a" stop-opacity=".85"/><stop offset="1" stop-color="#b8e03a" stop-opacity="0"/></radialGradient>
    <radialGradient id="${k}f"><stop offset="0" stop-color="#fff2b0"/><stop offset=".6" stop-color="#ffb84a"/><stop offset="1" stop-color="#e07a1a"/></radialGradient></defs>
    <circle class="brillo" cx="${farol ? 30 : 32}" cy="${farol ? 3 : 3}" r="${farol ? 42 : 26}" fill="url(#${k}g)"/>
    ${[[-6, 8, -14, 24], [4, 10, 0, 26], [14, 10, 18, 24]].map(([a, b, c, d]) => `<path d="M${a},${b} L${(a + c) / 2 - 3},${d - 6} L${c},${d}" ${L(3.6)} fill="none"/>`).join('')}
    ${vuelo ? `<g class="ala1" style="transform-origin:${x}px ${y}px"><path d="M-4,-10 C10,-50 46,-58 60,-40 C44,-30 20,-18 -2,-8Z" fill="#e8f2f6" fill-opacity=".6" ${L(1.6)}/><path d="M0,-12 C14,-36 36,-44 50,-38" stroke="#9ab" stroke-width="1" fill="none"/></g>
      <path d="M-10,-10 C-6,-32 14,-40 26,-34 C20,-22 8,-12 -6,-6Z" fill="#2a2420" ${L(2)}/><path d="M-6,-12 C0,-26 10,-32 20,-32" stroke="#e2c25a" stroke-width="2" fill="none"/>` : ''}
    <path d="${abd}" fill="${farol ? `url(#${k}f)` : '#f4f6b0'}" ${L(2.4)}/>
    ${farol ? `<path d="M26,-20 L26,20 M44,-14 L44,14 M12,0 L52,0" stroke="#2e2a28" stroke-width="3.2"/><path class="llamita" d="M34,-6 C30,-2 30,4 34,6 C38,4 38,-2 34,-6Z" fill="#fff6c8" stroke="#e08a2a" stroke-width="1.2"/><path d="M52,0 L60,0 M56,-4 L56,4" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` : `<path d="M22,-6 L22,12 M30,-6 L30,12" stroke="#c9d25a" stroke-width="1.4"/>`}
    ${vuelo ? `<path d="M-12,-6 C-6,-12 10,-10 16,-4 C18,4 10,10 0,10 C-8,10 -14,4 -12,-6Z" fill="#2a2420" ${L(2.4)}/>` : `<path d="M-12,-8 C-4,-16 14,-14 22,-6 C24,2 18,10 4,10 C-8,10 -14,4 -12,-8Z" fill="#2a2420" ${L(2.4)}/><path d="M-10,-6 C-2,-12 12,-12 20,-6" stroke="#e2c25a" stroke-width="2" fill="none"/><path d="M4,-12 L6,10" stroke="#4a403a" stroke-width="1.4"/>`}
    <path d="M-26,-4 C-26,-14 -16,-18 -8,-14 C-4,-8 -6,2 -14,4 C-20,5 -26,2 -26,-4Z" fill="#e0703a" ${L(2.2)}/><path d="M-20,-12 C-16,-14 -12,-12 -11,-8 C-14,-6 -18,-8 -20,-12Z" fill="#2a2420"/>
    <path d="M-28,0 C-34,-2 -36,4 -32,6 C-28,7 -26,4 -26,2Z" fill="#2a2420" ${L(1.6)}/>${ojoAlm(-30, 1, 2.4, 1.6, '#1b120e')}
    <path d="M-30,-4 C-38,-16 -44,-20 -50,-20 M-28,-4 C-32,-18 -36,-24 -40,-26" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>`;
}
function lucerna(v = 'base') {
  if (v === 'destello') return `<g class="rayos" fill="none" stroke="#f2d23a" stroke-width="2.6" stroke-linejoin="round"><path d="M40,40 l8,10 l-6,2 l8,12"/><path d="M162,58 l-8,10 l6,2 l-8,12"/><path d="M150,150 l-10,4 l2,6 l-12,4"/></g>
    <path class="estela" d="M150,120 C170,140 184,150 196,146" stroke="#e8f27a" stroke-width="3" stroke-dasharray="2 8" fill="none" stroke-linecap="round"/>
    ${sombra(110, 184, 30)}<g class="vuela">${escarabajo({ x: 100, y: 106, s: 1.55, rot: -14, vuelo: true })}</g>`;
  if (v === 'farol') {
    const k = nuevoId('fa');
    return `<defs><radialGradient id="${k}g"><stop offset="0" stop-color="#fff2b0" stop-opacity=".9"/><stop offset=".5" stop-color="#ffc85a" stop-opacity=".45"/><stop offset="1" stop-color="#ffb02e" stop-opacity="0"/></radialGradient>
      <linearGradient id="${k}v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".6" stop-color="#ffb84a"/><stop offset="1" stop-color="#e07a1a"/></linearGradient></defs>
    ${sombra(112, 180, 54)}
    <circle class="brillo" cx="78" cy="82" r="46" fill="url(#${k}g)"/>
    ${[[100, 150, 92, 176], [116, 150, 118, 178], [132, 148, 146, 176]].map(([a, b, c, d]) => `<path d="M${a},${b} L${(a + c) / 2 - 4},${d - 12} L${c},${d}" ${L(4)} fill="none"/>`).join('')}
    <path class="tallo" d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="${O}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="#2e2826" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="#e2c25a" stroke-width="10" fill="none" stroke-dasharray="2 9"/>
    <path d="M82,132 C84,116 110,108 136,114 C154,118 160,132 156,146 C142,154 104,156 86,150Z" fill="#2a2420" ${L(2.6)}/><path d="M90,128 C104,118 128,116 148,122" stroke="#e2c25a" stroke-width="2.4" fill="none"/><path d="M118,116 L120,152" stroke="#4a403a" stroke-width="1.6"/>
    <path d="M64,138 C64,126 76,120 86,124 C92,132 90,146 80,150 C72,152 64,148 64,138Z" fill="#e0703a" ${L(2.4)}/><path d="M72,126 C78,124 84,126 86,130 C82,134 76,132 72,126Z" fill="#2a2420"/>
    <path d="M52,144 C46,140 46,150 52,152 C58,154 62,150 64,146Z" fill="#2a2420" ${L(1.8)}/>${ojoAlm(54, 145, 2.6, 1.7, '#1b120e')}
    <path d="M52,140 C44,128 38,124 32,124 M54,140 C50,126 46,120 40,116" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <g class="balanceo" style="transform-origin:80px 50px">
      <path d="M80,50 L80,58" stroke="${O}" stroke-width="3"/>
      <path d="M70,66 L80,56 L90,66Z" fill="#2e2a28" ${L(2)}/>
      <path d="M68,66 L92,66 L96,80 L90,98 L70,98 L64,80Z" fill="url(#${k}v)" ${L(2.4)}/>
      <path d="M80,66 L80,98 M64,80 L96,80" stroke="#2e2a28" stroke-width="2.6"/>
      <path class="llamita" d="M80,74 C76,79 76,86 80,88 C84,86 84,79 80,74Z" fill="#fff6c8" stroke="#e08a2a" stroke-width="1.2"/>
      <path d="M72,98 L88,98 L84,104 L76,104Z" fill="#2e2a28" ${L(1.8)}/><path d="M80,104 L80,110" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g class="rayos" fill="none" stroke="#f2d23a" stroke-width="2.2" stroke-linejoin="round"><path d="M110,70 l6,6 l-4,2 l6,8"/><path d="M44,84 l-6,6 l4,2 l-6,8"/></g>`;
  }
  return `<ellipse cx="104" cy="168" rx="58" ry="5.6" fill="rgba(40,25,10,.2)"/>
  ${escarabajo({ x: 100, y: 134, s: 1.6, rot: 0 })}`;
}

// ───────── UCUMAR (Mito) · hombre oso de las yungas ─────────
function ucumar(v = 'base') {
  const k = nuevoId('uc');
  if (v === 'quebrada') {
    const C = { pe: '#7a3e2a', so: '#552818', lu: '#a65a3a', an: '#f1d9b0' };
    const lomo = peludo(110, 118, 56, 30, 30, 6);
    return `<defs>${clip(k, lomo)}</defs>${sombra(112, 170, 66)}
      ${[[70, 140, 66, 168], [150, 140, 156, 168]].map(([a, b, c, d]) => `<path d="M${a - 8},${b} L${c - 8},${d} L${c + 12},${d} L${a + 10},${b}Z" fill="${C.so}" ${L(2.4)}/>`).join('')}
      <g class="respira" style="transform-origin:110px 150px"><path d="${lomo}" fill="${C.pe}" ${L(2.4)}/><g clip-path="url(#${k})">${['#c9773a', '#e0b05a', '#9a4a2e'].map((c, i) => `<path d="M40,${100 + i * 10} C90,${92 + i * 10} 130,${100 + i * 10} 170,${94 + i * 10}" stroke="${c}" stroke-width="5" fill="none" opacity=".85"/>`).join('')}</g>
      ${[[96, 90], [116, 86], [136, 90], [154, 98]].map(([x, y], i) => `<path d="M${x - 8},${y + 4} L${x - 5},${y - 6} L${x + 4},${y - 8} L${x + 9},${y} L${x + 4},${y + 6}Z" fill="#9a8f80" ${L(2)}/>`).join('')}
      ${[[84, 140, 76, 170], [164, 138, 168, 170]].map(([a, b, c, d]) => `<path d="M${a - 9},${b} L${c - 9},${d} L${c + 12},${d} L${a + 10},${b}Z" fill="${C.pe}" ${L(2.4)}/><path d="M${c - 8},${d} l-3,4 M${c - 2},${d} l-2,5 M${c + 4},${d} l-1,5" ${L(1.8)}/>`).join('')}</g>
      <g class="cabeza" style="transform-origin:66px 120px"><path d="${peludo(58, 112, 24, 22, 16, 4)}" fill="${C.pe}" ${L(2.4)}/><circle cx="62" cy="90" r="7" fill="${C.pe}" ${L(2.2)}/>
        <path d="M44,108 C40,104 40,100 46,98 C52,96 58,100 58,106Z M60,104 C60,98 66,96 70,100 C72,104 70,108 66,108Z" fill="${C.an}" opacity=".9"/>
        <path d="M30,114 C30,104 44,100 52,106 C56,112 54,122 46,128 C38,130 30,124 30,114Z" fill="${C.an}" ${L(2.2)}/>
        <path d="M30,118 C34,130 46,134 54,126 L50,122 C44,126 36,124 32,116Z" fill="#5a1f1a" ${L(2)}/><path d="M36,122 l1,5 l2,-4 M44,124 l1,5 l2,-4" fill="#fff" ${L(1)}/>
        <ellipse cx="30" cy="110" rx="3.6" ry="3" fill="#2a1a14"/>${ojoAlm(52, 102, 3.6, 2.2, '#e0a020')}<path d="M45,96 C50,98 55,100 58,103" ${L(2.4)} fill="none"/></g>`;
  }
  const guard = v === 'monte';
  const C = guard ? { pe: '#3e2e22', so: '#2a1f17', lu: '#5a4434', an: '#e9d6ac' } : { pe: '#4a3426', so: '#322318', lu: '#6a4c38', an: '#ecd9b0' };
  const torso = peludo(100, 112, 36, 46, 26, 5);
  return `<defs>${clip(k, torso)}</defs>${sombra(102, 186, 52)}
  ${guard ? `<g class="lucecitas">${[[30, 60], [170, 50], [160, 120], [36, 130], [60, 30]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3" fill="#e8ff7a" style="animation-delay:${i * 0.4}s"/>`).join('')}</g>
    <path d="M150,184 L146,40" stroke="${O}" stroke-width="10" stroke-linecap="round"/><path d="M150,184 L146,40" stroke="#6a4a2e" stroke-width="6" stroke-linecap="round"/><path d="M147,60 C156,52 164,52 170,56 M146,80 C136,74 130,74 124,76" stroke="#6a4a2e" stroke-width="4" fill="none" stroke-linecap="round"/>${[[168, 54], [124, 74], [148, 38]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="#5f8a3a" ${L(1.4)}/>`).join('')}` : ''}
  <path d="M84,150 C80,166 78,176 74,184 L98,186 C98,176 100,164 102,154Z" fill="${C.so}" ${L(2.4)}/><path d="M112,150 C114,166 116,176 118,184 L140,186 C136,176 130,164 126,154Z" fill="${C.pe}" ${L(2.4)}/>
  <path d="M74,184 l-4,2 M80,186 l-1,3 M134,186 l3,3 M140,186 l4,2" ${L(2)}/>
  <g class="respira" style="transform-origin:100px 156px">
    <path d="${peludo(132, 116, 12, 32, 10, 4)}" fill="${C.so}" ${L(2.4)}/>
    <path d="${torso}" fill="${C.pe}" ${L(2.4)}/>
    <g clip-path="url(#${k})"><path d="M84,96 C90,88 110,88 116,96 C112,104 106,108 100,108 C94,108 88,104 84,96Z" fill="${C.an}" opacity=".85"/><ellipse cx="110" cy="150" rx="40" ry="14" fill="${C.so}" opacity=".6"/></g>
    ${guard ? `<path d="M70,80 C80,70 120,70 132,80 C122,84 114,82 100,84 C86,82 78,86 70,80Z" fill="#6f9a3a" ${L(2)}/>${[[76, 78], [96, 74], [118, 76]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#86b04a"/>`).join('')}
      <path d="M78,84 C74,100 78,116 72,132 M122,84 C128,104 124,120 130,136" stroke="#3f6a2a" stroke-width="2.4" fill="none"/>${[[73, 108], [128, 116], [74, 126]].map(([x, y]) => `<path d="M${x},${y} c-6,-2 -8,-8 -4,-10 c2,4 6,6 4,10Z" fill="#5f8a3a" ${L(1.2)}/>`).join('')}
      <g transform="translate(60 92) rotate(-30)">${[0, 1, 2, 3, 4].map((i) => `<path d="M0,0 C-4,${-8 - i * 3} 0,${-16 - i * 2} ${4 + i},${-20 - i}" stroke="#5f8a3a" stroke-width="2" fill="none"/>`).join('')}</g>` : ''}
    <path d="${peludo(68, 118, 10, 34, 10, 3)}" fill="${C.pe}" ${L(2.4)}/>
    <path d="M60,148 C56,152 58,160 64,160 C70,160 74,154 72,148Z" fill="${C.lu}" ${L(2)}/><path d="M60,158 l-3,4 M64,160 l-1,5 M69,159 l1,4" ${L(1.8)}/>
  </g>
  <g class="cabeza" style="transform-origin:96px 76px">
    <circle cx="86" cy="42" r="7" fill="${C.pe}" ${L(2.2)}/><circle cx="114" cy="44" r="7" fill="${C.so}" ${L(2.2)}/>
    <path d="${peludo(98, 60, 22, 21, 18, 3.5)}" fill="${C.pe}" ${L(2.4)}/>
    ${guard ? `<g transform="translate(100 38)"><path d="M-12,2 L-4,-14 L0,0 L6,-16 L8,0 L16,-10 L12,4Z" fill="#c8461e" ${L(1.6)}/><path d="M-14,4 C-6,-2 6,-2 14,4" fill="#5f8a3a" ${L(1.6)}/></g>` : ''}
    <path d="M80,58 C76,52 78,46 86,46 C92,46 96,52 94,58Z M100,56 C100,50 106,46 112,48 C116,52 114,58 108,60Z" fill="${C.an}"/>
    <path d="M70,70 C70,60 82,56 92,62 C96,68 94,78 86,82 C78,84 70,80 70,70Z" fill="${C.an}" ${L(2.2)}/>
    <ellipse cx="72" cy="66" rx="4" ry="3.2" fill="#2a1a14"/><path d="M72,72 C76,78 84,78 88,74" ${L(1.8)} fill="none"/>
    ${ojoAlm(86, 55, 3.4, 2.1, guard ? '#9a7a2a' : '#c98a2a')}${ojoAlm(105, 54, 3, 1.9, guard ? '#9a7a2a' : '#c98a2a')}
    <path d="${guard ? 'M80,49 C84,47.6 89,47.6 92,49.4 M100,48.6 C103,47.4 107,47.4 110,49' : 'M80,48 C85,49 89,50 92,52 M100,51 C103,49 107,48 110,48'}" ${L(2.4)} fill="none"/>
  </g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). En cada familia, los tres tienen silueta distinta desde el principio.</div>
<section>
<div class="linea"><h3>Veneno · yarará</h3>
${tarjeta('B22', 'Miyurá', 'Yararita', 'Veneno', 'base', miyura(), 'Yarará joven que repta en S, con las manchas en forma de trapecio de la especie. <i>Miyu</i> es veneno en quechua. Tímida: se aleja si la dejan tranquila.')}
${tarjeta('B23', 'Crucera', 'Yarará del monte', 'Veneno', 'camino 1', miyura('monte'), 'Grande y oscura, enroscada y con la cabeza en posición de ataque. Tiene la cruz clara en la cabeza, como la víbora de la cruz.')}
${tarjeta('B24', 'Chicotazo', 'Yarará chica', 'Veneno', 'camino 2', miyura('chica'), 'Chica, gris y con rombos oscuros. Se enrosca bajito y larga la mordida como un chicotazo: el golpe sale tan rápido que chasquea.')}</div>
<div class="linea"><h3>Roca · lagartija de pirca</h3>
${tarjeta('B25', 'Pirkasol', 'Pirquita', 'Roca', 'base', pirkasol(), 'Lagartija que toma sol haciendo "flexiones" con las patas de adelante. Escamas como piedra partida.')}
${tarjeta('B26', 'Pirquero', 'Lagartija de pirca', 'Roca', 'camino 1', pirkasol('pirca'), 'Chata, ancha y de patas abiertas: el lomo se le volvió una pirca de piedras redondas con líquenes. Quieta, parece parte del muro.')}
${tarjeta('B27', 'Quebradón', 'Lagarto de quebrada', 'Roca', 'camino 2', pirkasol('quebrada'), 'Lagarto macizo de la quebrada, rojo como las rocas, con cuernitos en la cabeza y cola de anillos con espinas.')}</div>
<div class="linea"><h3>Rayo · luciérnaga</h3>
${tarjeta('B28', 'Lucerna', 'Luciérnaga', 'Rayo', 'base', lucerna(), 'Bicho de luz caminando: escudo naranja con mancha negra, élitros con borde amarillo y la cola que se prende y se apaga.')}
${tarjeta('B29', 'Destellón', 'Bicho de luz', 'Rayo', 'camino 1', lucerna('destello'), 'En vuelo, con las alas abiertas y chispas eléctricas alrededor; deja una estela de puntos de luz.')}
${tarjeta('B30', 'Farolero', 'Farolito', 'Rayo', 'camino 2', lucerna('farol'), 'El abdomen se le estiró en un tallo de anillos que se arquea por encima del lomo y le cuelga adelante un farol colonial de seis caras con la llama adentro. Ilumina por donde camina.')}</div>
<div class="linea"><h3>Mito · Ucumar</h3>
${tarjeta('B31', 'Ucumar', 'Ucumar', 'Mito', 'base', ucumar(), 'El hombre oso de las yungas: parado, encorvado, brazos largos y la cara con "anteojos" claros como el oso andino. Conserva su nombre de leyenda.')}
${tarjeta('B32', 'Ukuku', 'Guardián del monte', 'Mito', 'camino 1', ucumar('monte'), 'Protector del monte: musgo, helechos y una bromelia en la cabeza; se apoya en un bastón de rama y lo rodean bichitos de luz. <i>Ukuku</i> es el oso de las leyendas andinas.')}
${tarjeta('B33', 'Ucumar de la quebrada', 'Ucumar de la quebrada', 'Mito', 'camino 2', ucumar('quebrada'), 'En cuatro patas, rugiendo; el pelo tiene las franjas de colores de la quebrada y piedras en el lomo.')}</div>
</section>`;
const css = `@keyframes lengua{0%,70%,100%{transform:scaleX(0)}80%,90%{transform:scaleX(1)}}@keyframes acecho{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,2px)}}@keyframes latigo{0%,100%{transform:skewX(0)}50%{transform:skewX(-5deg)}}
@keyframes balanceo{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}@keyframes chasquido{0%,60%,100%{transform:scale(0)}70%{transform:scale(1.2)}80%{transform:scale(.9)}}@keyframes polillas{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-6px)}}@keyframes llamita{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.2)}}@keyframes brillo{0%,100%{opacity:.35}50%{opacity:1}}@keyframes vuela{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-6px)}}@keyframes ala1{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}}
@keyframes rayos{0%,60%,100%{opacity:0}70%,80%{opacity:1}}@keyframes estela{to{stroke-dashoffset:-40}}@keyframes lucecitas{0%,100%{opacity:.2}50%{opacity:1}}
.lengua{animation:lengua 2.4s infinite;transform-box:fill-box;transform-origin:right center}.acecho{animation:acecho 2.2s ease-in-out infinite;transform-box:view-box}.latigo{animation:latigo 1.4s ease-in-out infinite;transform-box:view-box}
.balanceo{animation:balanceo 2.4s ease-in-out infinite;transform-box:view-box}.chasquido{animation:chasquido 1.4s infinite;transform-box:fill-box;transform-origin:center}.polillas path{animation:polillas 1.2s ease-in-out infinite;transform-box:fill-box}.llamita{animation:llamita .6s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom}.brillo{animation:brillo 2s ease-in-out infinite}.vuela{animation:vuela 1.6s ease-in-out infinite;transform-box:view-box}.ala1{animation:ala1 .3s ease-in-out infinite;transform-box:view-box}
.rayos path{animation:rayos 1.8s infinite}.rayos path:nth-child(2){animation-delay:.6s}.rayos path:nth-child(3){animation-delay:1.2s}.estela{animation:estela 1.2s linear infinite}.lucecitas circle{animation:lucecitas 2s ease-in-out infinite}`;
writeFileSync(new URL('./catalogo-3.html', import.meta.url), pagina('Catálogo para aprobar · lote 2b', 'Bichos de Salta: yarará, lagartija de pirca, luciérnaga y Ucumar, con sus dos caminos', cuerpo, css));
console.log('ok');
