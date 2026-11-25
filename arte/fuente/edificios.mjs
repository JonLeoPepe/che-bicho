// Edificios en el estilo del mapa v2 (vista frontal desde arriba, 3/4). viewBox 0 0 240 200, piso y≈182.
import { O, L } from './base-arte.mjs';
export const sombraEd = (x0, x1, y) => `<path d="M${x0},${y} L${x1},${y} L${x1 + 24},${y + 12} L${x0 + 16},${y + 12}Z" fill="rgba(40,30,15,.22)"/>`;
export const defsEd = `<defs>
  <pattern id="adb" width="20" height="10" patternUnits="userSpaceOnUse"><rect width="20" height="10" fill="#c99a68"/><path d="M0,9.5 L20,9.5 M10,0 L10,9.5" stroke="#b08254" stroke-width="1"/></pattern>
  <pattern id="ladr" width="16" height="8" patternUnits="userSpaceOnUse"><rect width="16" height="8" fill="#b4583a"/><path d="M0,7.5 L16,7.5 M8,0 L8,3.7 M0,3.7 L16,3.7 M4,3.7 L4,7.5 M12,3.7 L12,7.5" stroke="#8e3f26" stroke-width="1"/></pattern>
  <pattern id="chapa" width="8" height="40" patternUnits="userSpaceOnUse"><rect width="8" height="40" fill="#a9aeb2"/><rect width="3" height="40" fill="#c9ced2"/><rect x="6" width="2" height="40" fill="#8a9095"/></pattern>
  <pattern id="cania" width="6" height="40" patternUnits="userSpaceOnUse"><rect width="6" height="40" fill="#b08a54"/><path d="M3,0 L3,40" stroke="#8e6a3a" stroke-width="1.4"/></pattern>
  <linearGradient id="alero" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2410" stop-opacity=".45"/><stop offset="1" stop-color="#3a2410" stop-opacity="0"/></linearGradient>
  <pattern id="rayaR" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="16" height="10" fill="#f4efe4"/><rect width="8" height="10" fill="#c8362b"/></pattern>
  <pattern id="rayaV" width="16" height="10" patternUnits="userSpaceOnUse"><rect width="16" height="10" fill="#f4efe4"/><rect width="8" height="10" fill="#2f7d5b"/></pattern>
</defs>`;
export const ventana = (x, y, w = 22, h = 26, post = '#3f6e5a') => `<rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" fill="#e4dccb" ${L(1.6)}/><rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" fill="#2e2a2a"/>${[0.25, 0.5, 0.75].map((f) => `<path d="M${x + w * f},${y + 2} l0,${h - 4}" stroke="#7d7a78" stroke-width="1.3"/>`).join('')}<rect x="${x - 9}" y="${y}" width="7" height="${h}" fill="${post}" ${L(1.4)}/><rect x="${x + w + 2}" y="${y}" width="7" height="${h}" fill="${post}" ${L(1.4)}/>`;
export const puertaMadera = (x, y, w, h, c = '#6b4226', arco = false) => `<path d="M${x},${y + h} L${x},${y + (arco ? w / 2 : 0)} ${arco ? `Q${x + w / 2},${y - 6} ${x + w},${y + w / 2}` : `L${x + w},${y}`} L${x + w},${y + h}Z" fill="${c}" ${L(2)}/>${[0.33, 0.66].map((f) => `<path d="M${x + w * f},${y + 6} L${x + w * f},${y + h}" stroke="#2a1c15" stroke-width="1" opacity=".5"/>`).join('')}<circle cx="${x + w * 0.8}" cy="${y + h * 0.55}" r="1.4" fill="#d9b06a"/>`;

// E3 · Almacén de ramos generales: galería con alero de chapa curva y columnas de hierro, bolsas y cartel pintado sin letras
export function almacen() {
  const col = (x) => `<path d="M${x},92 L${x},176" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},92 L${x},176" stroke="#3f5a4a" stroke-width="4" stroke-linecap="round"/><path d="M${x - 6},96 C${x - 2},92 ${x + 2},92 ${x + 6},96" stroke="#3f5a4a" stroke-width="2.4" fill="none"/><rect x="${x - 4}" y="170" width="8" height="6" fill="#3f5a4a" ${L(1.2)}/>`;
  const bolsa = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-9,0 C-11,-12 -8,-20 -6,-22 L6,-22 C8,-20 11,-12 9,0Z" fill="#efe6d0" ${L(1.6)}/><path d="M-6,-22 C-2,-26 2,-26 6,-22" fill="none" ${L(1.4)}/><path d="M-5,-12 L5,-12" stroke="#c9bfa4" stroke-width="2"/></g>`;
  return `${defsEd}${sombraEd(14, 226, 176)}
  <clipPath id="techoAlm"><path d="M18,44 L222,44 L226,70 L14,70Z"/></clipPath><path d="M18,44 L222,44 L226,70 L14,70Z" fill="#b5562e" ${L(2.4)}/><g clip-path="url(#techoAlm)">${Array.from({ length: 4 }, (_, r) => Array.from({ length: 18 }, (_, c) => `<path d="M${16 + c * 12 + (r % 2) * 6},${54 + r * 5} q6,-6 12,0" fill="${['#c4683a', '#b85a30', '#cf7444'][(r + c) % 3]}" stroke="#7d3519" stroke-width=".8"/>`).join('')).join('')}</g><path d="M18,44 L222,44 L226,70 L14,70Z" fill="none" ${L(2.4)}/>
  <path d="M18,44 L222,44" stroke="#8a3c1e" stroke-width="5" stroke-linecap="round"/>
  <rect x="20" y="70" width="200" height="108" fill="#f1ebdd" ${L(2.4)}/><rect x="20" y="70" width="200" height="34" fill="url(#alero)"/><rect x="20" y="160" width="200" height="18" fill="#7a2a2a" ${L(1.8)}/>
  <ellipse cx="44" cy="136" rx="14" ry="6" fill="#e2d8c2"/><ellipse cx="190" cy="122" rx="10" ry="5" fill="#e2d8c2"/>
  <path d="M8,92 C60,80 180,80 232,92 L232,98 C180,88 60,88 8,98Z" fill="url(#chapa)" ${L(2)}/>
  ${[0, 1, 2].map((i) => `${puertaMadera(44 + i * 62, 108, 30, 52, '#2f6a52')}<rect x="${46 + i * 62}" y="112" width="26" height="16" fill="#cfe1e6" fill-opacity=".75" ${L(1.2)}/><path d="M${59 + i * 62},112 L${59 + i * 62},128" stroke="${O}" stroke-width="1"/>`).join('')}
  <g transform="translate(120 74)"><rect x="-24" y="-2" width="48" height="16" rx="2" fill="#e9d9a8" ${L(1.8)}/><path d="M-12,10 C-14,2 -6,0 -4,4 C-4,8 -8,10 -12,10Z" fill="#7a9a3a" ${L(1)}/><path d="M-6,3 L-2,-3" stroke="#c9cfd6" stroke-width="1.6"/><path d="M4,10 L4,1 L12,1 L12,10Z M2,1 L14,1" fill="#c8362b" ${L(1)}/><circle cx="18" cy="6" r="3" fill="#e2a72e" ${L(1)}/></g>
  ${[14, 70, 132, 196, 226].map(col).join('')}
  ${bolsa(34, 176, 1)}${bolsa(48, 176, 0.9)}${bolsa(41, 160, 0.85)}
  <path d="M176,168 L208,168 L208,176 L176,176Z" fill="#8a6a46" ${L(1.6)}/><path d="M178,176 L178,180 M206,176 L206,180" stroke="${O}" stroke-width="2"/>
  <path d="M166,98 l0,8" stroke="${O}" stroke-width="1.4"/><rect x="163" y="106" width="7" height="9" rx="1.5" fill="#f6d27a" ${L(1.3)}/>`;
}

// E4 · Casa de la curandera: ramada con atados de yuyos colgando
export function curanderaCasa() {
  const atado = (x, y, c) => `<g class="yuyo" style="transform-origin:${x}px ${y}px"><path d="M${x},${y} L${x},${y + 6}" stroke="#6b4a2a" stroke-width="1.4"/><path d="M${x - 5},${y + 6} L${x + 5},${y + 6} L${x + 3},${y + 22} L${x - 3},${y + 22}Z" fill="${c}" ${L(1.4)}/><path d="M${x - 5},${y + 9} L${x + 5},${y + 9}" stroke="#c9a24a" stroke-width="1.6"/></g>`;
  return `${defsEd}${sombraEd(36, 206, 176)}
  <path d="M30,46 L196,46 L202,104 L24,104Z" fill="url(#cania)" ${L(2.4)}/><path d="M30,46 L196,46" stroke="#7a5a2e" stroke-width="5" stroke-linecap="round"/><path d="M24,104 L202,104 L202,110 L24,110Z" fill="#8e6a3a" ${L(2)}/>
  <rect x="40" y="110" width="150" height="68" fill="url(#adb)" ${L(2.4)}/><rect x="40" y="110" width="150" height="14" fill="url(#alero)"/>
  <path d="M60,118 C74,116 84,124 80,138 C70,142 60,138 58,130Z" fill="#d9b080" opacity=".85"/>
  ${puertaMadera(104, 124, 26, 54, '#2f8a8a')}<path d="M117,127 L117,142" stroke="#5f8a3a" stroke-width="1.6"/>${[[114, 130, -30], [120, 133, 30], [114, 136, -30], [120, 139, 30]].map(([x, y, a]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="1.6" fill="#7aaa4e" transform="rotate(${a} ${x} ${y})"/>`).join('')}
  ${ventana(150, 126, 20, 20, '#7a3a5a')}<path d="M152,128 C156,134 160,134 162,128 C164,134 168,134 168,128" stroke="#e9c3d6" stroke-width="3" fill="none"/>
  <path d="M20,104 L214,96" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M20,104 L214,96" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/>
  ${[24, 210].map((x) => `<path d="M${x},100 L${x},178" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},100 L${x},178" stroke="#7a5a3a" stroke-width="4" stroke-linecap="round"/>`).join('')}
  ${[[44, '#5f8a3a'], [60, '#8a6a3a'], [76, '#7a9a4a'], [170, '#5f8a3a'], [186, '#9a7a4a'], [200, '#6f8a3a']].map(([x, c]) => atado(x, 102 - (x - 20) * 0.04, c)).join('')}
  ${[[86, '#c8a06a'], [140, '#b0705a']].map(([x, c]) => `<path d="M${x - 8},166 L${x + 8},166 L${x + 6},178 L${x - 6},178Z" fill="${c}" ${L(1.6)}/><path d="M${x},166 C${x - 6},156 ${x - 10},152 ${x - 12},150 M${x},166 C${x},156 ${x + 2},150 ${x + 4},146 M${x},166 C${x + 6},158 ${x + 10},154 ${x + 12},152" stroke="#4f7a2e" stroke-width="2" fill="none"/>${[[-12, 150], [4, 146], [12, 152]].map(([a, b]) => `<circle cx="${x + a}" cy="${b}" r="3" fill="#7fae4a"/>`).join('')}`).join('')}`;
}

// E5 · Talabartería: ladrillo a la vista, techo de chapa, montura de cartel y cuero estaqueado
export function talabarteria() {
  return `${defsEd}${sombraEd(28, 214, 176)}
  <path d="M22,52 L218,52 L222,96 L18,96Z" fill="url(#chapa)" ${L(2.4)}/><path d="M18,96 L222,96 L222,102 L18,102Z" fill="#7d8388" ${L(2)}/>
  <rect x="28" y="102" width="186" height="76" fill="url(#ladr)" ${L(2.4)}/><rect x="28" y="102" width="186" height="12" fill="url(#alero)"/>
  <path d="M86,178 L86,124 L156,124 L156,178Z" fill="#2a1f1a" ${L(2)}/><path d="M92,178 L106,134 L136,134 L150,178" fill="#3a2a22"/>
  <path d="M100,150 C104,140 136,140 140,150 L138,156 L102,156Z" fill="#8a5a32" ${L(1.6)}/><path d="M110,144 C114,138 126,138 130,144" stroke="#5a3a22" stroke-width="2" fill="none"/>
  <path d="M86,124 L70,128 L70,178 L86,178Z" fill="#6b4226" ${L(2)}/><path d="M156,124 L172,128 L172,178 L156,178Z" fill="#6b4226" ${L(2)}/>${[136, 150, 164].map((y) => `<path d="M70,${y} L86,${y - 2} M172,${y} L156,${y - 2}" stroke="#4e2f1a" stroke-width="1.2"/>`).join('')}
  <g transform="translate(120 108)"><path d="M-30,0 L30,0" stroke="#3a3430" stroke-width="2"/><path d="M-26,0 L-26,6 M26,0 L26,6" stroke="#3a3430" stroke-width="1.4"/><path d="M-30,6 C-30,24 30,24 30,6 C22,12 -22,12 -30,6Z" fill="#a86a3a" ${L(2)}/><path d="M-24,8 C-20,4 -16,6 -14,10 M24,8 C20,4 16,6 14,10" stroke="${O}" stroke-width="2" fill="none"/><path d="M-10,15 C-4,11 4,11 10,15" stroke="#f4e2c0" stroke-width="1.6" fill="none"/></g>
  <g transform="translate(46 140)"><path d="M-14,-24 L14,24 M14,-24 L-14,24" stroke="#7a5a3a" stroke-width="3.4" stroke-linecap="round"/><path d="M0,-22 C12,-20 16,-8 12,0 C16,10 12,22 0,24 C-12,22 -16,10 -12,0 C-16,-8 -12,-20 0,-22Z" fill="#c9a06a" ${L(1.8)}/><path d="M-4,-10 C2,-12 6,-6 2,-2 C6,4 2,10 -4,8" stroke="#8a5a32" stroke-width="1.6" fill="none"/>${[[0, -22], [12, 0], [0, 24], [-12, 0]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.6" fill="${O}"/>`).join('')}</g>
  ${ventana(184, 124, 20, 22, '#6b4226')}`;
}

// E6 · Feria: dos puestos con toldo a rayas, cajones y balanza
export function feria() {
  const puesto = (x0, w, toldo, cajones) => `${sombraEd(x0 + 4, x0 + w - 4, 176)}
    ${[x0 + 6, x0 + w - 10].map((x) => `<path d="M${x},80 L${x},178" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${x},80 L${x},178" stroke="#8a6a46" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <path d="M${x0 - 6},58 L${x0 + w + 6},58 L${x0 + w + 2},88 L${x0 - 2},88Z" fill="url(#${toldo})" ${L(2.2)}/>${Array.from({ length: Math.floor(w / 12) + 1 }, (_, i) => `<path d="M${x0 - 2 + i * 12},88 q6,8 12,0" fill="${i % 2 ? '#f4efe4' : toldo === 'rayaR' ? '#c8362b' : '#2f7d5b'}" ${L(1.6)}/>`).join('')}
    <path d="M${x0 - 2},128 L${x0 + w + 2},128 L${x0 + w + 2},140 L${x0 - 2},140Z" fill="#a8824e" ${L(2)}/><path d="M${x0 + 2},140 L${x0 + 2},176 M${x0 + w - 2},140 L${x0 + w - 2},176" stroke="${O}" stroke-width="3"/>
    ${cajones.map(([dx, c1, c2], i) => `<rect x="${x0 + dx}" y="112" width="26" height="16" fill="#c9a46a" ${L(1.6)}/><path d="M${x0 + dx},120 L${x0 + dx + 26},120" stroke="#a6824a" stroke-width="1.2"/>${[0, 1, 2, 3].map((j) => `<circle cx="${x0 + dx + 5 + j * 6}" cy="${110 - (j % 2) * 2}" r="4.4" fill="${j % 2 ? c2 : c1}" ${L(1.2)}/>`).join('')}`).join('')}`;
  return `${defsEd}
  ${puesto(14, 100, 'rayaR', [[6, '#d6463a', '#e2553a'], [38, '#e2a72e', '#f2c84a'], [70, '#7fae4a', '#5f9a3a']])}
  ${puesto(130, 96, 'rayaV', [[6, '#b0705a', '#c9a06a'], [36, '#8a4a7a', '#a05a8a'], [66, '#e88a5a', '#f2a86a']])}
  <g class="balanza" style="transform-origin:72px 88px"><path d="M72,88 L72,96" stroke="${O}" stroke-width="1.6"/><circle cx="72" cy="102" r="7" fill="#e4e0d8" ${L(1.6)}/><path d="M72,102 l3,-4" stroke="#c8362b" stroke-width="1.4"/><path d="M66,110 L78,110 L76,114 L68,114Z" fill="#c9cfd6" ${L(1.2)}/></g>`;
}
