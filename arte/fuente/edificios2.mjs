// Edificios lote 4b: terminal antigua, micro, pago del capataz, rancho del maestro, carpa y puesto de la Puna. Sin letras.
import { O, L } from './base-arte.mjs';
import { defsEd, sombraEd, ventana, puertaMadera } from './edificios.mjs';

const tejas = (x0, y0, w, filas, id) => `<clipPath id="${id}"><path d="M${x0},${y0} L${x0 + w},${y0} L${x0 + w + 4},${y0 + filas * 6 + 4} L${x0 - 4},${y0 + filas * 6 + 4}Z"/></clipPath><path d="M${x0},${y0} L${x0 + w},${y0} L${x0 + w + 4},${y0 + filas * 6 + 4} L${x0 - 4},${y0 + filas * 6 + 4}Z" fill="#b5562e"/><g clip-path="url(#${id})">${Array.from({ length: filas }, (_, r) => Array.from({ length: Math.ceil(w / 12) + 2 }, (_, c) => `<path d="M${x0 - 6 + c * 12 + (r % 2) * 6},${y0 + 8 + r * 6} q6,-7 12,0" fill="${['#c4683a', '#b85a30', '#cf7444'][(r + c) % 3]}" stroke="#7d3519" stroke-width=".8"/>`).join('')).join('')}</g><path d="M${x0},${y0} L${x0 + w},${y0} L${x0 + w + 4},${y0 + filas * 6 + 4} L${x0 - 4},${y0 + filas * 6 + 4}Z" fill="none" ${L(2.4)}/><path d="M${x0},${y0} L${x0 + w},${y0}" stroke="#8a3c1e" stroke-width="5" stroke-linecap="round"/>`;

// E7 · Terminal de ómnibus antigua (años 50): torre escalonada con reloj, boletería y andén techado
export function terminal() {
  return `${defsEd}${sombraEd(14, 226, 176)}
  <path d="M150,96 L232,92 L232,102 L150,104Z" fill="url(#chapa)" ${L(2)}/>${[156, 196, 228].map((x) => `<path d="M${x},102 L${x},178" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M${x},102 L${x},178" stroke="#6a7a7a" stroke-width="3.4" stroke-linecap="round"/>`).join('')}
  <path d="M166,162 L218,162 L218,168 L166,168Z M170,168 L170,176 M214,168 L214,176" fill="#8a6a46" stroke="${O}" stroke-width="2"/>
  <rect x="14" y="80" width="140" height="98" fill="#efe4c8" ${L(2.4)}/>${[96, 104].map((y) => `<path d="M14,${y} L154,${y}" stroke="#7fa89a" stroke-width="3"/>`).join('')}
  <path d="M58,80 L58,40 L66,40 L66,32 L102,32 L102,40 L110,40 L110,80Z" fill="#efe4c8" ${L(2.4)}/><path d="M58,52 L110,52 M58,58 L110,58" stroke="#7fa89a" stroke-width="2.4"/>
  <circle cx="84" cy="66" r="11" fill="#f8f4ea" ${L(2.2)}/><path d="M84,66 L84,59 M84,66 L89,68" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>${[0, 1, 2, 3].map((i) => `<path d="M${84 + Math.cos((i * Math.PI) / 2) * 9},${66 + Math.sin((i * Math.PI) / 2) * 9} l0,0.1" stroke="${O}" stroke-width="2" stroke-linecap="round"/>`).join('')}
  <path d="M72,32 L72,24 L96,24 L96,32" fill="none" ${L(2)}/><path d="M84,24 L84,14" stroke="${O}" stroke-width="2"/>
  <rect x="14" y="80" width="140" height="10" fill="url(#alero)"/>
  ${puertaMadera(70, 120, 28, 58, '#5a7a6a')}<rect x="72" y="124" width="24" height="18" fill="#cfe1e6" fill-opacity=".75" ${L(1.2)}/>
  <rect x="26" y="120" width="30" height="26" fill="#2e2a2a" ${L(2)}/>${[33, 40, 47].map((x) => `<path d="M${x},120 L${x},146" stroke="#8d8a86" stroke-width="1.4"/>`).join('')}<rect x="24" y="146" width="34" height="5" fill="#8a6a46" ${L(1.4)}/>
  ${ventana(118, 120, 22, 26, '#5a7a6a')}
  <g transform="translate(84 110)"><rect x="-16" y="-6" width="32" height="12" rx="2" fill="#e9d9a8" ${L(1.6)}/><path d="M-10,3 L-10,-2 C-10,-4 -8,-5 -6,-5 L8,-5 C10,-5 11,-3 11,-1 L11,3Z" fill="#c8362b" stroke="${O}" stroke-width="1"/><circle cx="-6" cy="3.6" r="1.6" fill="${O}"/><circle cx="7" cy="3.6" r="1.6" fill="${O}"/></g>
  <rect x="14" y="166" width="140" height="12" fill="#b9ad90" ${L(1.6)}/>`;
}

// E8 · Micro antiguo: trompa redonda, dos colores, parrilla con valijas
export function micro() {
  return `${defsEd}<ellipse cx="122" cy="178" rx="100" ry="7" fill="rgba(40,30,15,.22)"/>
  ${[[44, '#7a4a2a', 20], [72, '#2f5a8a', 24], [104, '#8a6a3a', 18], [130, '#5a3a5a', 22]].map(([x, c, w]) => `<rect x="${x}" y="${58 - w * 0.4}" width="${w}" height="${w * 0.6 + 4}" rx="2" fill="${c}" ${L(1.8)}/><path d="M${x + w / 2 - 3},${58 - w * 0.4} q3,-4 6,0" fill="none" ${L(1.4)}/>`).join('')}
  <path d="M36,62 L200,62" stroke="${O}" stroke-width="4"/><path d="M40,62 L40,70 M90,62 L90,70 M140,62 L140,70 M190,62 L190,70" stroke="${O}" stroke-width="2.4"/>
  <path d="M30,70 L206,70 C220,70 228,82 228,100 L228,150 C228,158 222,162 214,162 L30,162 C22,162 16,156 16,148 L16,104 C16,82 20,70 30,70Z" fill="#b3261e" ${L(2.6)}/>
  <path d="M16,112 L228,112 L228,128 L16,128Z" fill="#efe6d0"/><path d="M16,112 L228,112 M16,128 L228,128" stroke="${O}" stroke-width="1.6"/><path d="M16,120 L228,120" stroke="#c9cfd6" stroke-width="2.4"/>
  ${[34, 64, 94, 124, 154].map((x) => `<rect x="${x}" y="78" width="26" height="28" rx="3" fill="#bcd6df" ${L(1.8)}/><path d="M${x + 4},82 L${x + 10},98" stroke="#fff" stroke-width="2" opacity=".7"/>`).join('')}
  <path d="M188,78 L212,78 C220,78 224,88 224,96 L224,106 L188,106Z" fill="#bcd6df" ${L(1.8)}/><path d="M194,82 L200,98" stroke="#fff" stroke-width="2" opacity=".7"/>
  <rect x="184" y="112" width="20" height="40" rx="2" fill="#8a1f1a" ${L(1.6)}/><path d="M194,114 L194,150" stroke="${O}" stroke-width="1"/>
  <circle cx="226" cy="138" r="5" fill="#f6e6a8" ${L(1.6)}/><path d="M214,156 L232,156 L232,162 L212,162Z" fill="#c9cfd6" ${L(1.6)}/><path d="M10,156 L26,156 L26,162 L10,162Z" fill="#c9cfd6" ${L(1.6)}/>
  ${[60, 176].map((x) => `<path d="M${x - 22},162 C${x - 22},144 ${x + 22},144 ${x + 22},162Z" fill="#2a1c15"/><g class="rueda" style="transform-origin:${x}px 162px"><circle cx="${x}" cy="162" r="15" fill="#2e2a28" ${L(2.4)}/><circle cx="${x}" cy="162" r="7" fill="#c9cfd6" ${L(1.6)}/><path d="M${x},155 L${x},169 M${x - 7},162 L${x + 7},162" stroke="#8a9095" stroke-width="1.6"/></g>`).join('')}
  <path d="M30,74 C60,72 120,72 200,74" stroke="#e04a3a" stroke-width="3" fill="none" opacity=".7"/>`;
}

// E9 · Pago del capataz: casco de estancia con arco de entrada y la insignia de la provincia en relieve
export function pago() {
  return `${defsEd}${sombraEd(10, 230, 176)}
  ${tejas(14, 54, 212, 6, 'tjPago')}
  <rect x="18" y="94" width="204" height="84" fill="#f1ebdd" ${L(2.4)}/><rect x="18" y="94" width="204" height="14" fill="url(#alero)"/><rect x="18" y="168" width="204" height="10" fill="#9a4a2e" ${L(1.6)}/>
  ${[24, 64, 160, 200].map((x) => `<path d="M${x},176 L${x},116 Q${x + 8},104 ${x + 16},116 L${x + 16},176Z" fill="#d9cfb8" ${L(1.8)}/>`).join('')}
  <path d="M88,46 L152,46 L156,94 L84,94Z" fill="#f1ebdd" ${L(2.4)}/>${tejas(84, 34, 72, 2, 'tjPago2')}
  <path d="M96,178 L96,120 Q120,92 144,120 L144,178Z" fill="#3a2a22" ${L(2.4)}/><path d="M96,120 Q120,92 144,120" fill="none" stroke="#9a4a2e" stroke-width="5"/>
  <path d="M100,178 L100,124 Q120,100 140,124 L140,178" fill="none" stroke="#2a2420" stroke-width="2"/>${[106, 113, 120, 127, 134].map((x) => `<path d="M${x},${178} L${x},${118 - Math.abs(120 - x) * -0.6 + (Math.abs(120 - x) > 10 ? 4 : 0)}" stroke="#4a4440" stroke-width="2.2"/>`).join('')}
  <g transform="translate(120 70)"><circle r="13" fill="#d9dee3" ${L(2)}/><circle r="10" fill="none" stroke="#9aa2ab" stroke-width="1.2"/><path d="M-8,4 C-8,-6 8,-6 8,4Z" fill="#c9cfd6" ${L(1.4)}/>${[-6, -3, 0, 3, 6].map((x) => `<circle cx="${x}" cy="${-2 - Math.cos(x / 5) * 2}" r="1.4" fill="#e3b23c"/>`).join('')}</g>
  ${[36, 196].map((x) => `<g class="farol"><path d="M${x},100 l0,6" stroke="${O}" stroke-width="1.4"/><rect x="${x - 4}" y="106" width="8" height="10" rx="1.5" fill="#f6d27a" ${L(1.3)}/></g>`).join('')}`;
}

// E10 · Rancho del maestro: galería de palos con monturas, boleadoras colgadas y horno de barro
export function ranchoMaestro() {
  const paja = Array.from({ length: 140 }, (_, i) => { const x = 22 + ((i * 37) % 156), y = 52 + ((i * 53) % 46); return `<path d="M${x},${y} l${(i % 3) - 1},${5 + (i % 4)}" stroke="${['#9c844f', '#d4bd84', '#b59c62', '#8a723f'][i % 4]}" stroke-width="1.3"/>`; }).join('');
  return `${defsEd}${sombraEd(14, 226, 176)}
  <clipPath id="pjM"><path d="M24,48 L176,48 L182,102 L18,102Z"/></clipPath><path d="M24,48 L176,48 L182,102 L18,102Z" fill="#b9a06a" ${L(2.4)}/><g clip-path="url(#pjM)">${paja}</g><path d="M24,48 L176,48" stroke="#7a6436" stroke-width="5" stroke-linecap="round"/>
  ${Array.from({ length: 41 }, (_, i) => `<path d="M${18 + i * 4},102 l${(i % 3) - 1},${4 + (i % 4)}" stroke="#8a723f" stroke-width="1.4"/>`).join('')}
  <rect x="30" y="104" width="140" height="74" fill="url(#adb)" ${L(2.4)}/><rect x="30" y="104" width="140" height="14" fill="url(#alero)"/>
  <path d="M120,110 C136,108 150,116 146,132 C136,136 124,132 120,124Z" fill="#d9b080" opacity=".85"/>${Array.from({ length: 4 }, (_, r) => Array.from({ length: 3 }, (_, c) => `<rect x="${124 + c * 9 + (r % 2) * 4}" y="${118 + r * 5}" width="8" height="4.5" fill="#a0704a" stroke="#7d5234" stroke-width=".6"/>`).join('')).join('')}
  <rect x="70" y="120" width="26" height="58" fill="#2a1f1a" ${L(2)}/><path d="M70,120 L96,120" stroke="#6b4226" stroke-width="4"/><path d="M72,122 C76,140 74,156 78,176 L72,176Z" fill="#8a5a36"/>
  <path d="M14,98 L186,94" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M14,98 L186,94" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/>${[18, 182].map((x) => `<path d="M${x},96 L${x},178" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},96 L${x},178" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>`).join('')}
  <g class="boleo" style="transform-origin:46px 98px"><path d="M46,98 C48,106 44,112 46,118 M46,98 C42,106 40,112 40,118 M46,98 C50,104 54,108 54,114" stroke="#6b4a2a" stroke-width="1.6" fill="none"/>${[[46, 120], [40, 120], [54, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#8f8b80" ${L(1.2)}/>`).join('')}</g>
  <path d="M138,160 L170,160 M142,160 L140,178 M166,160 L168,178" stroke="${O}" stroke-width="4" stroke-linecap="round"/><path d="M138,160 L170,160" stroke="#8a6a46" stroke-width="2"/>
  <path d="M136,160 C136,146 172,146 172,160 C164,154 144,154 136,160Z" fill="#7a4a2a" ${L(1.8)}/><path d="M146,150 C150,144 158,144 162,150" stroke="${O}" stroke-width="2" fill="none"/><path d="M150,160 L150,170 M158,160 L158,170" stroke="#5a3a22" stroke-width="1.6"/>
  <path d="M190,178 C190,144 230,144 230,178Z" fill="#b07a4f" ${L(2.2)}/><path d="M196,166 C198,154 210,150 218,152" stroke="#cf9a6a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M202,178 L202,170 Q210,162 218,170 L218,178Z" fill="#2a1a14" ${L(1.6)}/>
  <g class="humo">${[0, 1, 2].map((i) => `<circle cx="210" cy="140" r="${4 + i}" fill="#e8e4dc" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>`;
}

// E11 · Carpa de la acampante: iglú naranja con doble techo
export function carpa() {
  return `${defsEd}<ellipse cx="120" cy="176" rx="88" ry="7" fill="rgba(40,30,15,.22)"/>
  ${[[40, 176, 70, 120], [200, 176, 170, 120]].map(([a, b, c, d]) => `<path d="M${a},${b} L${c},${d}" stroke="#c9c2b0" stroke-width="1.4"/><path d="M${a - 3},${b} l6,0" stroke="${O}" stroke-width="2"/>`).join('')}
  <path d="M46,174 C52,96 188,96 194,174Z" fill="#e07a2a" ${L(2.6)}/>
  <path d="M60,174 C70,112 170,112 180,174" fill="none" stroke="#b85a1a" stroke-width="2"/><path d="M120,104 L120,174" stroke="#b85a1a" stroke-width="2"/>
  <path d="M46,174 C52,96 188,96 194,174" fill="none" stroke="#6a6e72" stroke-width="5"/>
  <path d="M96,174 C98,140 142,140 144,174Z" fill="#3a3a3a" ${L(2.2)}/><path d="M96,174 C98,140 120,138 120,140 L114,174Z" fill="#e07a2a" ${L(1.8)}/><path d="M120,140 C122,152 124,164 128,174" stroke="#c9cfd6" stroke-width="1.6" fill="none"/>
  <path d="M60,138 C76,118 104,108 120,106" stroke="#ffb86a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`;
}

// E12 · Puesto de la Puna: muros de piedra, techo de paja brava y corralito de pirca
export function puestoPuna() {
  const piedras = (x0, y0, w, h) => Array.from({ length: Math.floor(w / 15) * Math.floor(h / 11) }, (_, i) => { const cols = Math.floor(w / 15), c = i % cols, r = Math.floor(i / cols); return `<ellipse cx="${x0 + 8 + c * 15 + (r % 2) * 7}" cy="${y0 + 6 + r * 11}" rx="7.4" ry="5.2" fill="${['#9a8f7c', '#8b8170', '#a89e8a'][(c + r) % 3]}" stroke="${O}" stroke-width="1.3"/>`; }).join('');
  const paja = Array.from({ length: 120 }, (_, i) => { const x = 40 + ((i * 29) % 118), y = 66 + ((i * 41) % 40); return `<path d="M${x},${y} l${(i % 3) - 1},${6 + (i % 5)}" stroke="${['#d9c07a', '#c4a85a', '#e8d498'][i % 3]}" stroke-width="1.4"/>`; }).join('');
  return `${defsEd}${sombraEd(30, 226, 176)}
  <path d="M150,178 L150,150 L230,150 L230,178Z" fill="#7d7363"/>${piedras(150, 148, 80, 30)}<path d="M150,150 L230,150" stroke="${O}" stroke-width="1.6"/>
  <clipPath id="pjP"><path d="M46,60 L152,60 L160,112 L38,112Z"/></clipPath><path d="M46,60 L152,60 L160,112 L38,112Z" fill="#cdb06a" ${L(2.4)}/><g clip-path="url(#pjP)">${paja}</g>
  ${Array.from({ length: 31 }, (_, i) => `<path d="M${38 + i * 4},112 l${(i % 3) - 1},${5 + (i % 4)}" stroke="#b89a52" stroke-width="1.5"/>`).join('')}<path d="M46,60 L152,60" stroke="#9a8040" stroke-width="5" stroke-linecap="round"/>
  <path d="M44,116 L154,116 L154,178 L44,178Z" fill="#6f6656" ${L(2.4)}/>${piedras(44, 114, 110, 64)}
  <rect x="44" y="116" width="110" height="12" fill="url(#alero)"/>
  <path d="M86,178 L86,138 L108,138 L108,178Z" fill="#2a1f1a" ${L(2)}/><path d="M84,136 L110,136" stroke="#7a5a3a" stroke-width="5"/>
  <rect x="124" y="140" width="12" height="10" fill="#2a1f1a" ${L(1.6)}/>`;
}
