// Catálogo para aprobar, lote 1: iniciales de Salta con sus dos caminos, jugador y mamá.
import { readFileSync, writeFileSync } from 'node:fs';
import { jugador, jugadora, maestro } from './adultos.mjs';
const F = (p) => readFileSync('/tmp/fx/node_modules/@fontsource/' + p).toString('base64');
const O = '#2a1c15';
const L = (w = 3) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;
const svg = (vb, c) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;
const sombra = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx / 11).toFixed(1)}" fill="rgba(40,25,10,.2)"/>`;
const ojoAlm = (cx, cy, w, h, iris, pupila = 'redonda', k = 'o' + uid++, extra = '') => {
  const d = `M${cx - w},${cy} C${cx - w * 0.5},${cy - h * 1.3} ${cx + w * 0.6},${cy - h * 1.3} ${cx + w},${cy - h * 0.2} C${cx + w * 0.4},${cy + h} ${cx - w * 0.5},${cy + h} ${cx - w},${cy}Z`;
  const pup = pupila === 'vertical' ? `<ellipse cx="${cx + 0.4}" cy="${cy}" rx="${(h * 0.28).toFixed(1)}" ry="${(h * 0.85).toFixed(1)}" fill="#1b120e"/>` : pupila === 'horizontal' ? `<ellipse cx="${cx + 0.4}" cy="${cy}" rx="${(w * 0.42).toFixed(1)}" ry="${(h * 0.3).toFixed(1)}" fill="#1b120e"/>` : `<circle cx="${cx + 0.4}" cy="${cy}" r="${(h * 0.55).toFixed(1)}" fill="#1b120e"/>`;
  return `<g class="ojo"><defs><clipPath id="${k}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="#f4e7c6"/><g clip-path="url(#${k})"><circle cx="${cx + 0.4}" cy="${cy}" r="${(h * 1.05).toFixed(1)}" fill="${iris}"/>${pup}<circle cx="${cx + w * 0.3}" cy="${cy - h * 0.45}" r="${(h * 0.28).toFixed(1)}" fill="#fff"/>${extra}</g>
    <path d="M${cx - w - 0.5},${cy} C${cx - w * 0.5},${cy - h * 1.35} ${cx + w * 0.6},${cy - h * 1.35} ${cx + w + 0.6},${cy - h * 0.2}" ${L(2.3)} fill="none"/></g>`;
};

// ───────── AJININA (Fuego) · iguana colorada con cáliz de ají ─────────
export function ajinina(v = 'base') {
  const k = 'a' + uid++;
  const q = v === 'quitucho', m = v === 'monte';
  const C = q ? { cu: '#b8231a', so: '#7e1610', lu: '#e2553a', pa: '#f0b25a' } : m ? { cu: `url(#${k}g)`, so: '#5c3a16', lu: '#e39a52', pa: '#ecd08a' } : { cu: '#d2452b', so: '#952a1a', lu: '#ef7a4a', pa: '#f1c27a' };
  const cuerpo = q ? 'M62,134 C62,114 82,104 104,106 C126,108 140,116 142,132 C144,148 128,154 106,154 L82,154 C68,152 60,144 62,134Z' : 'M60,132 C62,116 82,108 104,110 C124,112 140,118 144,130 C146,144 132,152 110,152 L80,152 C66,150 58,142 60,132Z';
  const cola = q ? 'M132,118 C146,122 154,128 160,130 C164,131 168,128 166,124 C172,124 176,130 172,138 C168,144 156,146 146,146 L132,150Z' : m ? 'M132,118 C156,122 172,130 182,130 C188,130 192,124 190,118 C196,118 200,128 196,138 C190,148 174,148 158,147 L132,150Z' : 'M132,118 C150,122 164,128 172,130 C178,131 182,126 180,120 C186,120 192,128 188,136 C184,144 170,146 156,146 C148,146 142,148 132,150Z';
  const punta = q ? [169, 124] : m ? [193, 119] : [184, 120];
  const borde = q ? 'M138,118 C126,108 104,106 104,106 C82,104 62,114 62,134 C60,144 68,152 82,154 L106,154 C116,154 124,152 132,150' : 'M138,120 C128,113 116,111 104,110 C82,108 62,116 60,132 C58,142 66,150 80,152 L110,152 C120,152 128,150 134,148';
  const vaina = (x, y, s = 1, c = C.so) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0,4 C-3,-4 0,-12 5,-15 C7,-8 6,-2 4,4Z" fill="${c}" ${L(1.6)}/><circle class="brasa" cx="4.6" cy="-14" r="2.3" fill="#ffcf4a"/></g>`;
  const hoja = (x, y, r) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0,0 C-4,-6 -2,-14 4,-18 C8,-12 7,-4 0,0Z" fill="#5f9a3a" ${L(1.6)}/><path transform="translate(${x} ${y}) rotate(${r})" d="M0,0 L3,-15" stroke="#3f6a2a" stroke-width="1"/>`;
  return `<defs><clipPath id="${k}c"><path d="${cuerpo}"/></clipPath><linearGradient id="${k}g" x1="0" x2="1"><stop offset="0" stop-color="#6c9a34"/><stop offset=".45" stop-color="#c98a2a"/><stop offset="1" stop-color="#c8361f"/></linearGradient>
  <radialGradient id="${k}e"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#ffb02e" stop-opacity=".8"/><stop offset="1" stop-color="#ff7a1a" stop-opacity="0"/></radialGradient></defs>
  ${sombra(112, 172, 80)}
  <g class="cola" style="transform-origin:140px 132px">
    <path d="${cola}" fill="${m ? '#c8361f' : C.cu}" ${L()}/>
    <circle class="brasa" cx="${punta[0]}" cy="${punta[1]}" r="${q ? 10 : m ? 14 : 9}" fill="url(#${k}e)"/>
    ${m ? `<path class="llama" d="M${punta[0]},${punta[1] - 2} C${punta[0] - 6},${punta[1] - 12} ${punta[0] + 2},${punta[1] - 18} ${punta[0] + 1},${punta[1] - 26} C${punta[0] + 8},${punta[1] - 16} ${punta[0] + 8},${punta[1] - 8} ${punta[0]},${punta[1] - 2}Z" fill="#ffb02e" stroke="#c8361f" stroke-width="1.4"/>` : ''}
  </g>
  <path d="M94,140 C88,144 84,150 82,156 L80,164 C76,166 73,168 75,170 L87,170 C88,167 87,165 86,164 L88,157 C92,152 98,148 102,146Z" fill="${C.so}" ${L(2.4)}/>
  <path d="M136,138 C142,141 148,146 151,152 L153,163 C157,165 160,167 158,170 L146,170 C145,167 146,165 147,164 L145,156 C140,152 134,149 128,147Z" fill="${C.so}" ${L(2.4)}/>
  <g class="respira" style="transform-origin:104px 152px">
    <path d="${cuerpo}" fill="${C.cu}"/>
    <g clip-path="url(#${k}c)"><path d="M56,140 C80,150 120,152 150,140 L150,160 L56,160Z" fill="${C.pa}"/><path d="M56,138 C80,148 120,150 150,138" stroke="${C.so}" stroke-width="3" fill="none" opacity=".5"/>
      <path d="M78,116 C96,110 118,110 136,118" stroke="${C.lu}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
      ${Array.from({ length: 14 }, (_, i) => `<circle cx="${74 + (i % 7) * 10 + (i > 6 ? 5 : 0)}" cy="${124 + (i > 6 ? 8 : 0)}" r="1.5" fill="${C.lu}" opacity=".7"/>`).join('')}</g>
    <path d="${borde}" fill="none" ${L()}/>
    ${m ? [hoja(82, 112, -20), hoja(98, 110, 5), hoja(116, 112, -10), hoja(132, 118, 15), vaina(106, 110, 0.9, '#c8361f')].join('') : q ? [vaina(80, 110, 1.15), vaina(94, 106, 1.25), vaina(108, 106, 1.25), vaina(122, 109, 1.15)].join('') : [vaina(84, 112), vaina(100, 110), vaina(116, 111), vaina(130, 116, 0.85)].join('')}
    <path d="M82,138 C74,142 68,148 66,154 L64,166 C59,167 55,169 57,172 L71,172 C72,169 71,167 70,166 L72,157 C76,152 84,148 90,146Z" fill="${C.cu}" ${L(2.4)}/><path d="M57,172 l-4,1 M61,172 l-2,4 M66,172 l1,4" ${L(1.6)}/>
    <path d="M120,140 C128,142 136,147 140,153 L142,166 C147,167 151,169 149,172 L135,172 C134,169 135,167 136,166 L134,158 C128,154 120,151 114,149Z" fill="${C.cu}" ${L(2.4)}/><path d="M149,172 l4,1 M145,172 l2,4 M140,172 l-1,4" ${L(1.6)}/>
  </g>
  <g class="cabeza" style="transform-origin:64px 132px">
    <path d="M24,124 C26,112 40,106 54,108 C64,110 70,118 68,128 C66,136 56,140 44,140 C34,140 26,136 24,130Z" fill="${m ? '#6c9a34' : C.cu}" ${L()}/>
    <path d="M26,132 C34,138 48,140 60,136 C54,140 44,142 36,140 C30,138 27,136 26,132Z" fill="${C.pa}"/>
    <path d="M24,130 C34,134 46,134 58,131" ${L(1.8)} fill="none"/>
    ${q ? '<path d="M28,131 l2,3 l2,-3 l2,3 l2,-3" stroke="#fff" stroke-width="1.2" fill="none"/>' : ''}
    <circle cx="28" cy="121" r="1.3" fill="${O}"/>
    ${q ? `<g class="humo2"><circle cx="20" cy="116" r="3" fill="#d8d2c8" opacity=".8"/><circle cx="14" cy="110" r="4" fill="#d8d2c8" opacity=".6"/></g>` : ''}
    ${ojoAlm(46, 120, 6.5, 3.6, q ? '#ffcc2e' : '#f0a020')}
    <path d="${q ? 'M37,112 C43,113 49,115 54,118' : 'M38,112 C43,110 50,110 55,113'}" ${L(2.2)} fill="none"/>
    <g class="caliz" style="transform-origin:56px 110px">
      <path d="M50,110 C46,102 50,98 56,100 C58,94 64,94 66,100 C72,98 74,104 70,108 C72,112 68,116 64,114 C60,118 54,116 54,112Z" fill="#4f8a2e" ${L(2)}/>
      <path d="M56,104 C58,102 62,102 64,104" stroke="#8cc05a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M60,100 C60,92 64,88 70,88" stroke="${O}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M60,100 C60,92 64,88 70,88" stroke="#4f8a2e" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
  </g>`;
}

// ───────── PASACÁN (Flora) · chancho quimilero con tunas y cardón ─────────
export function pasacan(v = 'base') {
  const k = 'q' + uid++;
  const c = v === 'cerro', f = v === 'florido';
  const C = c ? { pe: '#6d6a58', so: '#4a4838', lu: '#8f8b74', ho: '#b08a6a' } : f ? { pe: '#7d8a5a', so: '#5a6640', lu: '#a3ad78', ho: '#c09a7a' } : { pe: '#75785a', so: '#51543c', lu: '#9a9c78', ho: '#b8907a' };
  const cuerpo = c ? 'M52,118 C52,92 80,80 112,82 C142,84 162,100 162,122 C162,142 146,152 120,152 L82,152 C62,150 52,138 52,118Z' : 'M56,120 C56,98 80,88 110,90 C138,92 156,104 156,124 C156,140 142,148 120,148 L84,148 C66,146 56,136 56,120Z';
  const pata = (x, y, col) => `<path d="M${x},${y} L${x - 2},${y + 26} L${x + 8},${y + 26} L${x + 10},${y}Z" fill="${col}" ${L(2.4)}/><path d="M${x - 3},${y + 24} L${x + 9},${y + 24} L${x + 9},${y + 30} L${x - 3},${y + 30}Z" fill="#3a2e26" ${L(2)}/><path d="M${x + 3},${y + 24} l0,6" stroke="#6a5a4a" stroke-width="1.2"/>`;
  const penca = (x, y, rx, ry, r, flor = false, tuna = false) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="${rx}" ry="${ry}" fill="#5f9a4a" ${L(2.2)}/><ellipse cx="${-rx * 0.25}" cy="${-ry * 0.3}" rx="${rx * 0.5}" ry="${ry * 0.45}" fill="#7fb85a"/>
    ${[[-0.4, -0.3], [0.3, -0.45], [0, 0.1], [-0.35, 0.45], [0.4, 0.35]].map(([a, b]) => `<circle cx="${(a * rx).toFixed(1)}" cy="${(b * ry).toFixed(1)}" r="1.4" fill="#e9dfb8"/><path d="M${(a * rx).toFixed(1)},${(b * ry).toFixed(1)} l-3,-2 M${(a * rx).toFixed(1)},${(b * ry).toFixed(1)} l2,-3" stroke="#f1ead0" stroke-width=".8"/>`).join('')}
    ${tuna ? `<ellipse cx="${rx * 0.4}" cy="${-ry - 4}" rx="4" ry="5.5" fill="#c23a4a" ${L(1.6)}/>` : ''}${flor ? `<g class="flor" transform="translate(${-rx * 0.2} ${-ry - 5})">${[0, 72, 144, 216, 288].map((a) => `<ellipse rx="3" ry="6" transform="rotate(${a}) translate(0 -4)" fill="#fbf3f0" stroke="#c98aa0" stroke-width="1"/>`).join('')}<circle r="2.6" fill="#f2c84a"/></g>` : ''}</g>`;
  const columna = (x, y, h, w) => `<path d="M${x - w},${y} L${x - w},${y - h + w} Q${x - w},${y - h} ${x},${y - h} Q${x + w},${y - h} ${x + w},${y - h + w} L${x + w},${y}Z" fill="#6f9a52" ${L(2.2)}/><path d="M${x},${y - h + 3} L${x},${y} M${x + w * 0.55},${y - h + 5} L${x + w * 0.55},${y}" stroke="#4f7a3a" stroke-width="1.5"/><path d="M${x - w * 0.5},${y - h + 4} L${x - w * 0.5},${y}" stroke="#97bf72" stroke-width="2"/>`;
  return `<defs><clipPath id="${k}c"><path d="${cuerpo}"/></clipPath></defs>
  ${sombra(108, 180, c ? 82 : 74)}
  ${pata(c ? 90 : 92, c ? 144 : 140, C.so)}${pata(c ? 136 : 132, c ? 144 : 140, C.so)}
  <g class="respira" style="transform-origin:106px 150px">
    <path d="${cuerpo}" fill="${C.pe}"/>
    <g clip-path="url(#${k}c)"><ellipse cx="108" cy="${c ? 158 : 152}" rx="70" ry="20" fill="${C.so}"/>
      ${Array.from({ length: 26 }, (_, i) => `<path d="M${64 + (i % 13) * 7},${100 + Math.floor(i / 13) * 14 + (i % 2) * 4} l-2,6" stroke="${C.lu}" stroke-width="1.3" opacity=".8"/>`).join('')}</g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    <path d="M${c ? 70 : 72},${c ? 92 : 98} C${c ? 64 : 66},${c ? 112 : 114} ${c ? 66 : 68},${c ? 132 : 128} ${c ? 74 : 76},${c ? 146 : 142}" stroke="#e4dcc4" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${pata(c ? 72 : 74, c ? 144 : 140, C.pe)}${pata(c ? 148 : 142, c ? 142 : 138, C.pe)}
    ${c ? [columna(96, 92, 34, 8), columna(116, 88, 46, 9), columna(136, 94, 28, 7)].join('') + '<path d="M104,74 L112,70 M122,58 L130,54" stroke="#f1e9d6" stroke-width="2.2" stroke-linecap="round"/>'
      : f ? [penca(98, 88, 13, 9, -20, true), penca(120, 84, 15, 10, 10, true, true), penca(140, 94, 11, 8, 30, false, true), penca(108, 72, 9, 7, -5, true)].join('')
      : [penca(102, 88, 12, 8, -15), penca(124, 86, 14, 9, 15, false, true)].join('')}
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${74 + i * 8},${c ? 86 + Math.abs(4 - i) : 92 + Math.abs(4 - i)} l${-1 + (i % 3)},-7" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>`).join('')}
  </g>
  <g class="cabeza" style="transform-origin:62px 120px">
    <path d="M60,104 C50,98 36,102 28,110 C22,116 18,124 22,130 C28,136 44,136 58,132 C68,126 70,112 60,104Z" fill="${C.pe}" ${L()}/>
    <path d="M30,128 C38,134 50,134 58,130 C50,136 38,138 28,134Z" fill="${C.so}" opacity=".7"/>
    <ellipse cx="20" cy="122" rx="5" ry="7.5" fill="${C.ho}" ${L(2.2)}/><ellipse cx="19" cy="120" rx="1.2" ry="2" fill="${O}"/><ellipse cx="20" cy="126" rx="1.2" ry="2" fill="${O}"/>
    ${c || v === 'base' ? `<path d="M30,132 C28,${c ? 124 : 128} 32,${c ? 118 : 124} 36,${c ? 116 : 122}" fill="none" stroke="${O}" stroke-width="${c ? 6 : 4.5}" stroke-linecap="round"/><path d="M30,132 C28,${c ? 124 : 128} 32,${c ? 118 : 124} 36,${c ? 116 : 122}" fill="none" stroke="#f1e6c8" stroke-width="${c ? 3.4 : 2.4}" stroke-linecap="round"/>` : ''}
    <path d="M24,130 C32,133 40,133 48,131" ${L(1.6)} fill="none"/>
    <path d="M56,100 L60,88 L68,100Z" fill="${C.so}" ${L(2.2)}/>
    ${ojoAlm(44, 112, 5, 2.8, f ? '#8a5a2a' : '#6a3a1a')}
    <path d="${c ? 'M36,104 C42,106 48,108 52,110' : f ? 'M37,107 C42,104 48,104 52,106' : 'M37,106 C42,104 48,104 52,107'}" ${L(2.2)} fill="none"/>
    ${c ? '<path d="M50,118 l6,6 M54,116 l4,8" stroke="#d8cbb0" stroke-width="1.4"/>' : ''}
  </g>`;
}

// ───────── YAKUSAPO (Agua) · sapo de las yungas ─────────
export function yakusapo(v = 'base') {
  const k = 's' + uid++;
  const a = v === 'arroyo', l = v === 'lluvia';
  const C = a ? { pi: '#3f8a86', so: '#2a5f5c', lu: '#79c2b4', ma: '#24504d', pa: '#e6e0bc' } : l ? { pi: '#5d7a86', so: '#3e5560', lu: '#a9c2cc', ma: '#36505c', pa: '#e2dcc4' } : { pi: '#5f8a5a', so: '#3e6040', lu: '#93bb7a', ma: '#2f4f32', pa: '#ece0b4' };
  const cuerpo = a ? 'M48,146 C46,122 70,104 102,104 C134,104 152,124 150,146 C146,160 124,164 100,164 C76,164 50,160 48,146Z' : l ? 'M40,148 C36,112 66,86 104,86 C142,86 166,114 162,148 C158,168 130,174 102,174 C72,174 44,168 40,148Z' : 'M50,150 C46,120 70,96 104,96 C136,96 156,120 154,148 C150,164 126,170 102,170 C76,170 52,166 50,150Z';
  const top = a ? 104 : l ? 86 : 96;
  return `<defs><clipPath id="${k}c"><path d="${cuerpo}"/></clipPath><radialGradient id="${k}s" cx=".4" cy=".35"><stop offset="0" stop-color="#e6f8fc"/><stop offset="1" stop-color="#7cc6dc" stop-opacity=".85"/></radialGradient></defs>
  ${sombra(104, 178, l ? 76 : 70)}
  ${l ? `<g class="lluvia">${Array.from({ length: 9 }, (_, i) => `<path d="M${50 + i * 14},${20 + (i % 3) * 14} l-3,9" stroke="#7cc6dc" stroke-width="2" stroke-linecap="round" style="animation-delay:${(i * 0.17).toFixed(2)}s"/>`).join('')}</g>` : ''}
  <path d="M128,${a ? 136 : 140} C${a ? 160 : 150},${a ? 132 : 140} ${a ? 176 : 162},${a ? 152 : 156} ${a ? 172 : 156},168 C${a ? 166 : 150},174 132,174 120,170 L118,160Z" fill="${C.so}" ${L()}/>
  <path d="M${a ? 168 : 152},170 l${a ? 12 : 8},-2 M${a ? 166 : 150},172 l${a ? 10 : 7},4 M${a ? 160 : 146},173 l2,6" ${L(2)}/>
  ${a ? `<path d="M164,170 L180,166 L176,176 Z" fill="#79c2b4" fill-opacity=".7" stroke="${O}" stroke-width="1.4"/>` : ''}
  <g class="respira" style="transform-origin:100px 168px">
    <path d="${cuerpo}" fill="${C.pi}"/>
    <g clip-path="url(#${k}c)"><path d="M40,152 C70,162 130,164 166,150 L166,180 L40,180Z" fill="${C.pa}"/>
      ${l ? Array.from({ length: 8 }, (_, i) => `<circle cx="${70 + i * 11}" cy="${100 + (i % 3) * 6}" r="${9 + (i % 2) * 3}" fill="#c4d2d8" opacity=".55"/>`).join('') : ''}
      ${a ? [0, 1, 2].map((i) => `<path d="M60,${118 + i * 10} C80,${112 + i * 10} 96,${124 + i * 10} 116,${116 + i * 10} C130,${110 + i * 10} 142,${118 + i * 10} 150,${114 + i * 10}" stroke="#a6e0d4" stroke-width="2.4" fill="none" opacity=".75"/>`).join('') : ''}
      ${Array.from({ length: 12 }, (_, i) => `<circle cx="${66 + (i % 6) * 14 + (i > 5 ? 7 : 0)}" cy="${(top + 22) + (i > 5 ? 14 : 0)}" r="${2 + (i % 3)}" fill="${C.ma}" opacity=".75"/><circle cx="${65 + (i % 6) * 14 + (i > 5 ? 7 : 0)}" cy="${(top + 21) + (i > 5 ? 14 : 0)}" r="1" fill="${C.lu}"/>`).join('')}
      <path d="M70,${top + 10} C90,${top + 2} 120,${top + 4} 138,${top + 14}" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/></g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    <path d="M66,150 C62,160 56,166 50,170 C48,174 54,176 60,174 L68,168 C72,162 74,156 74,150Z" fill="${C.pi}" ${L(2.4)}/><path d="M50,172 l-5,1 M53,174 l-2,5 M58,174 l2,4" ${L(1.6)}/>
    <ellipse class="saco" cx="${l ? 48 : 54}" cy="${l ? 144 : 142}" rx="${l ? 13 : 9}" ry="${l ? 9 : 6}" fill="url(#${k}s)" ${L(1.8)} style="transform-origin:${l ? 48 : 54}px ${l ? 136 : 136}px"/>
    <path d="M${l ? 34 : 44},${l ? 124 : 128} C60,${l ? 136 : 138} 80,${l ? 136 : 138} ${l ? 100 : 96},${l ? 126 : 130}" ${L(2)} fill="none"/>
    <circle cx="${l ? 40 : 48}" cy="${l ? 112 : 118}" r="1.5" fill="${O}"/>
    ${(() => { const ex = l ? 58 : a ? 66 : 64, ey = top + (l ? 22 : 12), iris = a ? '#e6c229' : l ? '#c9d6dc' : '#d8a62a';
      return `<path d="M${ex + 12},${ey + 2} C${ex + 12},${ey - 12} ${ex + 28},${ey - 14} ${ex + 30},${ey}Z" fill="${C.so}" ${L(2.2)}/><path d="M${ex + 17},${ey - 4} C${ex + 20},${ey - 8} ${ex + 25},${ey - 8} ${ex + 27},${ey - 3}" ${L(1.8)} fill="none"/>
      <path d="M${ex - 12},${ey + 6} C${ex - 12},${ey - 12} ${ex + 12},${ey - 14} ${ex + 14},${ey + 4}Z" fill="${C.pi}" ${L(2.4)}/>${ojoAlm(ex + 1, ey - 1, 8, 4.6, iris, 'horizontal')}
      <path d="M${ex - 8},${ey - 9} C${ex - 2},${ey - 12} ${ex + 6},${ey - 12} ${ex + 10},${ey - 7}" ${L(2.2)} fill="none"/>`; })()}
  </g>`;
}

// ───────── JUGADOR Y MAMÁ (unas 4 cabezas) ─────────
const ojosP = (x1, x2, y, color = '#2b1a12') => [x1, x2].map((x) => `<g class="ojo"><path d="M${x - 3.6},${y} C${x - 2},${y - 3} ${x + 2},${y - 3} ${x + 3.6},${y} C${x + 2},${y + 2.2} ${x - 2},${y + 2.2} ${x - 3.6},${y}Z" fill="#fbf5ea"/><circle cx="${x + 0.4}" cy="${y - 0.2}" r="1.9" fill="${color}"/><circle cx="${x + 1}" cy="${y - 0.9}" r=".55" fill="#fff"/><path d="M${x - 3.8},${y} C${x - 2},${y - 3.4} ${x + 2},${y - 3.4} ${x + 3.8},${y}" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`).join('');
const boleadora = `<g transform="translate(78 118)"><path d="M0,0 C4,8 2,14 6,18 M0,0 C-2,8 -6,12 -4,18 M0,0 C3,6 8,8 10,14" stroke="#6b4a2a" stroke-width="1.6" fill="none"/><circle cx="6" cy="19" r="3.4" fill="#8f8b80" ${L(1.4)}/><circle cx="-4" cy="19" r="3.4" fill="#8f8b80" ${L(1.4)}/><circle cx="10" cy="15" r="3" fill="#8f8b80" ${L(1.4)}/></g>`;
function chico() {
  const piel = '#d9a17a';
  return `${sombra(60, 193, 30)}
  <path d="M50,128 L50,182 L59,182 L59,128Z" fill="#3c4d6b" ${L(2.4)}/><path d="M70,128 L70,182 L61,182 L61,128Z" fill="#33435f" ${L(2.4)}/><path d="M53,140 l0,30 M67,140 l0,30" stroke="#2a3850" stroke-width="1.2"/>
  <path d="M45,180 L60,180 L60,189 L44,189Z M75,180 L60,180 L60,189 L76,189Z" fill="#e9e2d2" ${L(2.2)}/><path d="M44,186 L60,186 M76,186 L60,186" stroke="#8a7a62" stroke-width="1.6"/>
  <g class="respira" style="transform-origin:60px 130px">
    <path d="M86,76 C96,80 98,100 96,118 L84,120Z" fill="#7a5a3a" ${L(2.4)}/><path d="M88,88 L96,90" stroke="#5a3e26" stroke-width="2"/>
    <path d="M34,74 C42,66 78,66 86,74 L90,132 L30,132Z" fill="#d8752e" ${L()}/>
    <path d="M60,72 L60,132" stroke="#9b4f1c" stroke-width="2"/><path d="M40,90 L50,90 L50,100 L40,100Z M70,90 L80,90 L80,100 L70,100Z" fill="none" stroke="#9b4f1c" stroke-width="1.6"/>
    <path d="M30,124 L90,124 L90,132 L30,132Z" fill="#5a3a22" ${L(2)}/><rect x="56" y="124" width="8" height="8" fill="#c9a24a" ${L(1.4)}/>
    <path d="M34,76 C28,92 28,110 32,122 L40,122 C38,108 40,92 42,82Z" fill="#c4682a" ${L(2.2)}/><path d="M86,76 C92,92 92,110 88,122 L80,122 C82,108 80,92 78,82Z" fill="#c4682a" ${L(2.2)}/>
    <circle cx="36" cy="126" r="5" fill="${piel}" ${L(2)}/><circle cx="84" cy="126" r="5" fill="${piel}" ${L(2)}/>
    <path d="M50,70 C54,76 66,76 70,70 L70,74 C66,80 54,80 50,74Z" fill="#2c6a8a" ${L(1.8)}/>
    ${boleadora}
  </g>
  <g class="cabeza" style="transform-origin:60px 66px">
    <path d="M54,58 L54,68 L66,68 L66,58Z" fill="${piel}" ${L(2)}/>
    <ellipse cx="60" cy="45" rx="17" ry="19" fill="${piel}" ${L()}/>
    <path d="M42,44 C40,28 50,22 62,22 C74,22 80,30 78,44 C74,36 66,34 58,34 C52,34 46,38 42,44Z" fill="#3a2418" ${L(2.4)}/>
    <path d="M40,32 C42,18 78,18 80,32 C70,28 50,28 40,32Z" fill="#2c6a8a" ${L(2.4)}/><path d="M40,32 C30,32 26,36 30,38 C36,38 40,36 44,33Z" fill="#245a76" ${L(2)}/><circle cx="60" cy="20" r="2.4" fill="#245a76" ${L(1.2)}/>
    ${ojosP(53, 67, 46)}
    <path d="M49,39 C51,37.5 55,37.5 57,39 M63,39 C65,37.5 69,37.5 71,39" stroke="${O}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M60,48 C59,51 60,52 62,52" stroke="#a8704a" stroke-width="1.5" fill="none"/>
    <path d="M55,56 C58,58 63,58 66,55.5" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>`;
}
function chica() {
  const piel = '#c98d64';
  return `${sombra(60, 193, 30)}
  <path d="M50,128 L50,182 L59,182 L59,128Z" fill="#6a4a32" ${L(2.4)}/><path d="M70,128 L70,182 L61,182 L61,128Z" fill="#5a3e2a" ${L(2.4)}/>
  <path d="M45,174 L60,174 L60,189 L44,189Z M75,174 L60,174 L60,189 L76,189Z" fill="#4a3226" ${L(2.2)}/><path d="M46,178 L59,178 M74,178 L61,178" stroke="#7a5a3e" stroke-width="1.4"/>
  <g class="respira" style="transform-origin:60px 130px">
    <path d="M34,76 C26,82 26,100 30,112 L40,110Z" fill="#7a5a3a" ${L(2.2)}/>
    <path d="M34,74 C42,66 78,66 86,74 L90,132 L30,132Z" fill="#4f7d4a" ${L()}/>
    <path d="M60,72 L60,132" stroke="#355a32" stroke-width="2"/><path d="M42,104 L52,104 M68,104 L78,104" stroke="#355a32" stroke-width="2"/>
    <path d="M44,70 C50,82 70,82 76,70 L72,68 C66,76 54,76 48,68Z" fill="#c8362b" ${L(1.8)}/><path d="M58,80 L54,92 L60,88 L64,94 L62,80Z" fill="#c8362b" ${L(1.6)}/>
    <path d="M30,124 L90,124 L90,132 L30,132Z" fill="#5a3a22" ${L(2)}/><rect x="56" y="124" width="8" height="8" fill="#c9a24a" ${L(1.4)}/>
    <path d="M34,76 C28,92 28,110 32,122 L40,122 C38,108 40,92 42,82Z" fill="#456e40" ${L(2.2)}/><path d="M86,76 C92,92 92,110 88,122 L80,122 C82,108 80,92 78,82Z" fill="#456e40" ${L(2.2)}/>
    <circle cx="36" cy="126" r="5" fill="${piel}" ${L(2)}/><circle cx="84" cy="126" r="5" fill="${piel}" ${L(2)}/>
    ${boleadora}
  </g>
  <g class="cabeza" style="transform-origin:60px 66px">
    <path d="M76,44 C84,58 86,78 82,96 C80,100 76,100 76,96 C78,80 76,62 72,50Z" fill="#2a1a12" ${L(2)}/>${[0, 1, 2, 3].map((i) => `<path d="M${77 + (i % 2)},${58 + i * 9} q4,4 0,8" stroke="#4a3022" stroke-width="1.4" fill="none"/>`).join('')}<circle cx="79" cy="98" r="3" fill="#c8362b" ${L(1.2)}/>
    <path d="M54,58 L54,68 L66,68 L66,58Z" fill="${piel}" ${L(2)}/>
    <ellipse cx="60" cy="45" rx="17" ry="19" fill="${piel}" ${L()}/>
    <path d="M42,46 C38,28 50,22 62,22 C76,22 82,32 78,46 C76,38 70,32 62,32 C54,32 46,38 42,46Z" fill="#2a1a12" ${L(2.4)}/>
    <path d="M28,30 C28,25 92,25 92,30 C92,35 28,35 28,30Z" fill="#8a5a32" ${L(2.4)}/><path d="M44,28 C44,16 76,16 76,28Z" fill="#9a6a3a" ${L(2.4)}/><path d="M44,26 L76,26" stroke="#c8362b" stroke-width="2.6"/>
    ${ojosP(53, 67, 46)}
    <path d="M49,39.5 C51,38 55,38 57,39.5 M63,39.5 C65,38 69,38 71,39.5" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M60,48 C59,51 60,52 62,52" stroke="#9a6a48" stroke-width="1.5" fill="none"/>
    <path d="M55,56 C58,58.5 63,58.5 66,55.5" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>`;
}
function mama() {
  const piel = '#d6a07a';
  return `${sombra(60, 193, 32)}
  <path d="M50,152 L50,184 L57,184 L57,152Z M70,152 L70,184 L63,184 L63,152Z" fill="${piel}" ${L(2)}/>
  <path d="M45,182 L58,182 L58,189 L44,189Z M75,182 L62,182 L62,189 L76,189Z" fill="#8a6a4a" ${L(2)}/><path d="M45,186 L58,186 M75,186 L62,186" stroke="#5a4232" stroke-width="1.2"/>
  <g class="respira" style="transform-origin:60px 152px">
    <path d="M34,76 C40,68 80,68 86,76 L94,156 L26,156Z" fill="#b5523e" ${L()}/>
    ${Array.from({ length: 6 }, (_, i) => `<circle cx="${40 + (i % 3) * 18}" cy="${96 + Math.floor(i / 3) * 30}" r="2.4" fill="#f1d27a"/>`).join('')}
    <path d="M40,94 C48,90 72,90 80,94 L84,154 L36,154Z" fill="#efe6d2" ${L(2.2)}/><path d="M40,94 L36,90 M80,94 L84,90" stroke="${O}" stroke-width="1.6"/><path d="M48,120 L72,120 L72,134 L48,134Z" fill="none" stroke="#c9bfa8" stroke-width="1.6"/>
    <path d="M34,78 C26,96 26,112 30,124 L38,122 C36,110 38,96 40,86Z" fill="#a24634" ${L(2.2)}/><path d="M86,78 C94,96 94,112 90,124 L82,122 C84,110 82,96 80,86Z" fill="#a24634" ${L(2.2)}/>
    <g transform="translate(84 110)"><path d="M-4,4 C-6,16 6,18 8,8 C9,2 -3,-2 -4,4Z" fill="#a8743f" ${L(1.8)}/><path d="M2,2 L8,-12" stroke="#c9c2b6" stroke-width="2.4" stroke-linecap="round"/><path d="M-3,4 C0,0 5,0 7,4" fill="#5a8a3a"/></g>
    <circle cx="34" cy="124" r="5" fill="${piel}" ${L(2)}/><circle cx="84" cy="122" r="5" fill="${piel}" ${L(2)}/>
    <path d="M50,70 C54,76 66,76 70,70" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 66px">
    <path d="M40,40 C36,62 40,80 46,86 L52,80 C46,70 46,56 48,46Z M80,40 C84,62 80,80 74,86 L68,80 C74,70 74,56 72,46Z" fill="#3a2418" ${L(2)}/>
    <ellipse cx="60" cy="45" rx="17" ry="20" fill="${piel}" ${L()}/>
    <path d="M42,44 C40,28 50,22 60,22 C70,22 80,28 78,44 C72,32 64,30 60,36 C56,30 48,32 42,44Z" fill="#3a2418" ${L(2.4)}/>
    ${ojosP(53, 67, 46, '#4a2e1e')}
    <path d="M49,39 C51,37.5 55,37.5 57,39 M63,39 C65,37.5 69,37.5 71,39" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M60,48 C59,51 60,52 62,52" stroke="#a8704a" stroke-width="1.5" fill="none"/>
    <path d="M54,56 C58,59.5 63,59.5 67,56" stroke="${O}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M47,50 l-3,1.5 M73,50 l3,1.5" stroke="#b07a5a" stroke-width="1"/>
  </g>`;
}

// ───────── PÁGINA ─────────
const T = { Fuego: '#c8461e', Flora: '#4f8a2e', Agua: '#2f7fb8' };
const tarjeta = (cod, nom, ant, tipo, tag, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><span class="ok">✔ aprobado</span><div class="lienzo">${svg('0 0 200 200', dib)}</div><figcaption><b>${nom}</b><span class="tipo" style="background:${T[tipo]}">${tipo}</span><span class="tag">${tag}</span><small>hoy: ${ant}</small><p>${txt}</p></figcaption></figure>`;
const persona = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const fuentes = `@font-face{font-family:Bree;src:url(data:font/woff2;base64,${F('bree-serif/files/bree-serif-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:400;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:800;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-800-normal.woff2')}) format('woff2')}`;
const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>¡Che, Bicho! — Catálogo para aprobar · lote 1</title><style>${fuentes}
*{box-sizing:border-box}body{margin:0;background:#f4eee3;color:${O};font:16px/1.5 Nunito,system-ui,sans-serif}
header{background:#2b2420;color:#f4eee3;padding:24px 18px 18px;text-align:center;border-bottom:6px solid #a42a2a}header h1{font:28px/1.1 Bree,serif;margin:0 0 6px}header p{margin:0;opacity:.85;font-size:14px}
main{max-width:1000px;margin:0 auto;padding:6px 14px 50px}section{margin:30px 0}h2{font:23px/1.2 Bree,serif;margin:0 0 4px}.intro{margin:0 0 14px;color:#5a4a3a;max-width:72ch;font-size:15px}
.linea{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}.linea h3{grid-column:1/-1;margin:6px 0 -4px;font:19px Bree,serif}
@media (max-width:720px){.linea{grid-template-columns:1fr 1fr}.linea .ficha:first-of-type{grid-column:1/-1}}
.gente-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.ficha{position:relative;margin:0;background:#fff;border:2px solid #e2d6c2;border-radius:16px;overflow:hidden}
.cod{position:absolute;top:8px;left:8px;background:${O};color:#fff;font:800 12px Nunito;padding:2px 8px;border-radius:99px;z-index:2}
.lienzo{background:radial-gradient(circle at 50% 75%,#efe2c8,#e3d2b2 70%);padding:4px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo svg{display:block;width:100%;height:auto;max-height:230px}
figcaption{padding:8px 12px 12px}figcaption b{font:19px Bree,serif;font-weight:400;margin-right:6px}figcaption small{display:block;color:#8a7a6a;font-size:12px}figcaption p{margin:4px 0 0;font-size:13.5px;color:#5a4a3a}
.ok{position:absolute;top:8px;right:8px;background:#3f6e34;color:#fff;font:800 11px Nunito;padding:2px 8px;border-radius:99px;z-index:2}.lienzo.gente svg{max-height:300px}
.tipo,.tag{display:inline-block;font:800 11px Nunito;color:#fff;padding:2px 8px;border-radius:99px;vertical-align:3px;margin-right:4px}.tag{background:#6a5a4a}
.como{background:#fff;border:2px dashed #c9b79a;border-radius:14px;padding:12px 14px;font-size:14.5px}
@keyframes respira{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,1.03)}}@keyframes cola{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes cabeza{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@keyframes parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}@keyframes brasa{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.8)}}
@keyframes llama{0%,100%{transform:scaleY(1) skewX(0)}50%{transform:scaleY(1.15) skewX(-6deg)}}@keyframes humo2{0%{transform:translate(0,0);opacity:.8}100%{transform:translate(-10px,-12px);opacity:0}}
@keyframes saco{0%,70%,100%{transform:scale(1)}80%{transform:scale(1.35)}}@keyframes lluvia{0%{transform:translateY(-10px);opacity:0}30%{opacity:1}100%{transform:translateY(60px);opacity:0}}
@keyframes caliz{0%,100%{transform:rotate(0)}50%{transform:rotate(5deg)}}@keyframes flor{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.respira{animation:respira 3.2s ease-in-out infinite;transform-box:view-box}.cola{animation:cola 2.6s ease-in-out infinite;transform-box:view-box}.cabeza{animation:cabeza 4.5s ease-in-out infinite;transform-box:view-box}
.ojo{animation:parpadeo 4.8s infinite;transform-box:fill-box;transform-origin:center}.brasa{animation:brasa 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.llama{animation:llama .9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.humo2{animation:humo2 1.8s ease-out infinite;transform-box:fill-box}
.saco{animation:saco 3s ease-in-out infinite;transform-box:view-box}.lluvia path{animation:lluvia 1.6s linear infinite;transform-box:fill-box}.caliz{animation:caliz 3s ease-in-out infinite;transform-box:view-box}.flor{animation:flor 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body>
<header><h1>Catálogo para aprobar · lote 1</h1><p>Iniciales de Salta con sus dos caminos · jugador y maestro</p></header><main>
<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Por ejemplo: «B1 sí, B2 no: más grande, B3 sí». Los nombres son borradores y también se aprueban.</div>
<section><h2>Bichos iniciales de Salta</h2><p class="intro">Cada inicial tiene su forma base y dos caminos, que se eligen en el árbol de cartas (hoy se llaman «aspectos»). Los caminos cambian la silueta, no solo el color.</p>
<div class="linea"><h3>Fuego · iguana colorada con cáliz de ají</h3>
${tarjeta('B1', 'Ajinina', 'Ajicito', 'Fuego', 'base', ajinina(), 'Iguana colorada joven: el cáliz de ají en la cabeza y vainas secas en el lomo que arden en la punta. <i>Nina</i> es fuego en quechua.')}
${tarjeta('B2', 'Quituchón', 'Ají quitucho', 'Fuego', 'camino 1', ajinina('quitucho'), 'Más compacto y más picante: vainas gordas, rojo intenso, humo por la nariz y cara de pocos amigos.')}
${tarjeta('B3', 'Montají', 'Ají del monte', 'Fuego', 'camino 2', ajinina('monte'), 'Más largo y tranquilo; verde adelante y rojo atrás como el ají que madura, con hojas en el lomo y llama en la cola.')}</div>
<div class="linea"><h3>Flora · chancho quimilero con tunas y cardón</h3>
${tarjeta('B4', 'Pasacán', 'Cardoncito', 'Flora', 'base', pasacan(), 'Pecarí joven del monte salteño, el «quimilero» que come cactus; le crecen pencas con tunas en el lomo. De <i>pasacana</i>, el cardón de la Puna.')}
${tarjeta('B5', 'Cerrocán', 'Cardón del cerro', 'Flora', 'camino 1', pasacan('cerro'), 'Macizo, de pelo gris piedra, colmillos largos y tres columnas de cardón en el lomo, como un cerro que camina.')}
${tarjeta('B6', 'Florcán', 'Cardón florido', 'Flora', 'camino 2', pasacan('florido'), 'Más verde y sereno, sin colmillos a la vista; las pencas florecen y dan tunas. Cura más de lo que pega.')}</div>
<div class="linea"><h3>Agua · sapo de las yungas</h3>
${tarjeta('B7', 'Yakusapo', 'Sapucho', 'Agua', 'base', yakusapo(), 'Sapo de las yungas con verrugas y saco de agua que se infla. <i>Yaku</i> es agua en quechua.')}
${tarjeta('B8', 'Arroyaku', 'Sapo de arroyo', 'Agua', 'camino 1', yakusapo('arroyo'), 'Más fino y rápido: patas largas con membrana y rayas como corriente de arroyo.')}
${tarjeta('B9', 'Paraku', 'Sapo de lluvia', 'Agua', 'camino 2', yakusapo('lluvia'), 'Grande y redondo, con el lomo como nube; cuando canta, llueve. <i>Para</i> es lluvia en quechua.')}</div></section>
<section><h2>Jugador y maestro <small style="font:800 12px Nunito;color:#8a6a4a">versión 2 · adultos</small></h2>
<p class="intro">Sin mamá: el protagonista es un joven de unos 20 años que arranca como aprendiz de un baqueano viejo. Proporciones de adulto (unas seis cabezas de alto), cara con mandíbula, nariz y ojos chicos. El cinto lleva una rastra de plata: ahí se cuelgan las insignias de los capataces.</p>
<div class="gente-g">
${persona('P1', 'Jugador', 'unos 20 años', jugador(), 'Sombrero de fieltro, camisa arremangada, chaleco de cuero, pañuelo rojo, bombacha de campo y botas. Morral cruzado y boleadoras en la cintura.')}
${persona('P2', 'Jugadora', 'unos 20 años', jugadora(), 'Sombrero negro con cinta roja, trenza larga, saco verde con pecheras de cuero, pantalón de montar y botas altas. Misma rastra y boleadoras.')}
${persona('P3', 'Don Abel', 'maestro · baqueano', maestro(), 'Reemplaza a la mamá. Domador retirado y baqueano de los cerros: barba canosa, poncho de vicuña, faja roja, botas de potro y bastón. Te da tu primer bicho y te enseña a bolear. El nombre es un borrador.')}
</div></section>
</main></body></html>`;
writeFileSync(new URL('./catalogo-1.html', import.meta.url), html);
console.log('ok', (html.length / 1024).toFixed(0), 'KB');
