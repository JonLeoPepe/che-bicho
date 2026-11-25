// Catálogo para aprobar, lote 2a: Quirquincho, Llama, Cóndor y Vicuña de Salta, cada uno con base y dos caminos.
import { readFileSync, writeFileSync } from 'node:fs';
const F = (p) => readFileSync('/tmp/fx/node_modules/@fontsource/' + p).toString('base64');
const O = '#2a1c15';
const L = (w = 3) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;
const svg = (vb, c) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;
const sombra = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx / 11).toFixed(1)}" fill="rgba(40,25,10,.2)"/>`;
const ojoAlm = (cx, cy, w, h, iris, pupila = 'redonda') => {
  const k = 'o' + uid++;
  const d = `M${cx - w},${cy} C${cx - w * 0.5},${cy - h * 1.3} ${cx + w * 0.6},${cy - h * 1.3} ${cx + w},${cy - h * 0.2} C${cx + w * 0.4},${cy + h} ${cx - w * 0.5},${cy + h} ${cx - w},${cy}Z`;
  const pup = pupila === 'horizontal' ? `<ellipse cx="${cx}" cy="${cy}" rx="${(w * 0.45).toFixed(1)}" ry="${(h * 0.32).toFixed(1)}" fill="#1b120e"/>` : `<circle cx="${cx + 0.3}" cy="${cy}" r="${(h * 0.6).toFixed(1)}" fill="#1b120e"/>`;
  return `<g class="ojo"><defs><clipPath id="${k}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="#f4e7c6"/><g clip-path="url(#${k})"><circle cx="${cx + 0.3}" cy="${cy}" r="${(h * 1.05).toFixed(1)}" fill="${iris}"/>${pup}<circle cx="${cx + w * 0.3}" cy="${cy - h * 0.45}" r="${(h * 0.3).toFixed(1)}" fill="#fff"/></g><path d="M${cx - w - 0.5},${cy} C${cx - w * 0.5},${cy - h * 1.35} ${cx + w * 0.6},${cy - h * 1.35} ${cx + w + 0.6},${cy - h * 0.2}" ${L(2.2)} fill="none"/></g>`;
};
const clip = (id, d) => `<clipPath id="${id}"><path d="${d}"/></clipPath>`;

// ───────── KIRKALLPA (Tierra) · quirquincho ─────────
function socavon() {
  const C = { ca: '#a8804e', so: '#76573a', lu: '#cfa874', pi: '#dcb594', ps: '#a98062', un: '#ece2c8' };
  const una = (x, y, a, len, w = 4) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M0,${-w} C${len * 0.5},${-w - 1} ${len * 0.9},${-w * 0.3} ${len},${w * 0.9} C${len * 0.75},${w * 0.4} ${len * 0.4},${w * 0.7} 0,${w}Z" fill="${C.un}" ${L(1.8)}/><path transform="translate(${x} ${y}) rotate(${a})" d="M${len * 0.2},${-w * 0.5} C${len * 0.5},${-w * 0.7} ${len * 0.75},${-w * 0.2} ${len * 0.9},${w * 0.4}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>`;
  const banda = (i) => { const y = 82 + i * 10; return `<path d="M${106 - i * 0.5},${y} C${122},${y - 3} ${140 + Math.min(i, 3) * 2},${y + 2} ${150 - Math.max(0, i - 3) * 2},${y + 8}" stroke="${C.so}" stroke-width="2.4" fill="none"/>`; };
  return `${sombra(108, 181, 62)}
  ${sombra(104, 180, 50)}
  <g class="terrones">${[[50, 150, 4], [162, 146, 5], [60, 132, 3], [172, 156, 3.5]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8a6a46" ${L(1.3)} style="animation-delay:${i * 0.35}s"/>`).join('')}</g>
  <path d="M136,156 C150,164 166,170 184,178 C174,182 156,180 140,174 C132,170 128,164 130,158Z" fill="${C.ca}" ${L(2.4)}/>${[148, 158, 168].map((x) => `<path d="M${x},${163 + (x - 148) * 0.4} l-3,${9 - (x - 148) * 0.2}" stroke="${C.so}" stroke-width="1.8"/>`).join('')}
  <path d="M122,150 C126,160 128,168 132,174 L148,176 C146,170 142,166 138,164 C138,158 136,152 134,148Z" fill="${C.ps}" ${L(2.4)}/>
  <g class="respira" style="transform-origin:110px 176px">
    <path d="M100,56 C128,52 150,80 152,114 C154,142 140,162 118,162 C108,162 102,156 100,148 C112,128 114,90 104,60Z" fill="${C.ca}" ${L()}/>
    ${Array.from({ length: 16 }, (_, i) => `<circle cx="${112 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4}" cy="${62 + Math.floor(i / 4) * 5}" r="1.7" fill="${C.lu}"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6].map(banda).join('')}
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="${112 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4}" cy="${150 + Math.floor(i / 4) * 4}" r="1.6" fill="${C.lu}"/>`).join('')}
    <path d="M116,70 C130,70 142,82 146,96" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M96,62 C80,72 74,96 76,122 C78,144 86,156 98,160 L118,160 C106,134 106,96 112,64Z" fill="${C.pi}" ${L()}/>
    ${[0, 1, 2, 3].map((i) => `<path d="M82,${104 + i * 13} C88,${106 + i * 13} 96,${106 + i * 13} 102,${103 + i * 13}" stroke="${C.ps}" stroke-width="1.4" fill="none"/>`).join('')}
    <path d="M96,148 C90,158 88,166 82,172 C78,176 82,180 88,180 L108,180 C110,176 106,172 104,170 C106,164 108,158 108,152Z" fill="${C.pi}" ${L(2.4)}/>${una(84, 178, 175, 8, 2.4)}${una(90, 179, 165, 8, 2.4)}
    <path d="M106,88 C98,88 90,90 84,94 L86,100 C94,98 102,96 108,96Z" fill="${C.ps}" ${L(2.2)}/>${una(84, 96, 118, 20, 3.8)}${una(84, 98, 138, 18, 3.8)}
    <path d="M102,94 C94,98 84,104 76,110 L78,118 C88,114 98,108 106,104Z" fill="${C.pi}" ${L(2.4)}/>
    ${una(76, 112, 100, 28, 4.6)}${una(75, 115, 122, 28, 4.6)}${una(77, 118, 144, 25, 4.6)}
  </g>
  <g class="cabeza" style="transform-origin:100px 76px">
    <path d="M90,56 L90,38 L98,52Z" fill="${C.ps}" ${L(2)}/><path d="M96,58 L101,38 L107,58Z" fill="${C.pi}" ${L(2)}/><path d="M99,54 L101,44 L104,55Z" fill="${C.ps}"/>
    <path d="M108,68 C102,56 90,52 80,56 C70,60 58,72 50,84 C48,88 52,92 56,90 C70,84 86,80 100,80 C106,78 110,74 108,68Z" fill="${C.pi}" ${L()}/>
    <path d="M78,57 C90,52 104,58 108,68 C98,70 86,66 78,57Z" fill="${C.ca}" ${L(2)}/><path d="M84,58 l2,5 M90,58 l2,6 M96,60 l2,6 M102,63 l1,5" stroke="${C.so}" stroke-width="1.3"/>
    <ellipse cx="51" cy="87" rx="3" ry="2.4" fill="#4a2a22" transform="rotate(-35 51 87)"/>
    <path d="M56,90 C66,88 76,86 86,84" ${L(1.4)} fill="none"/>
    ${ojoAlm(80, 68, 4, 2.3, '#3a2416')}<path d="M74,62 C79,62.5 84,64 88,66.5" ${L(2)} fill="none"/>
  </g>`;
}

export function kirkallpa(v = 'base') {
  if (v === 'cavador') return socavon();
  const k = 'k' + uid++, cav = false, mur = v === 'muralla';
  const C = mur ? { ca: '#9a8a70', so: '#6f6250', lu: '#c2b498', pi: '#c9a888', ps: '#9a7a5e' } : { ca: '#b08a5a', so: '#7f6040', lu: '#d5b27c', pi: '#d9b08e', ps: '#a8805e' };
  const conc = mur ? 'M44,140 C44,96 82,74 118,78 C152,82 172,108 170,142Z' : 'M50,140 C50,104 82,86 112,88 C142,90 160,112 158,140Z';
  const bandas = Array.from({ length: mur ? 0 : 7 }, (_, i) => { const x = 70 + i * 12; return `<path d="M${x},${140} C${x - 4},120 ${x - 2},100 ${x + 6},92" stroke="${C.so}" stroke-width="2.4" fill="none"/>`; }).join('');
  const escamas = Array.from({ length: 30 }, (_, i) => `<circle cx="${62 + (i % 10) * 9 + (Math.floor(i / 10) % 2) * 4}" cy="${104 + Math.floor(i / 10) * 11}" r="2" fill="${C.lu}" opacity=".7"/>`).join('');
  const piedras = mur ? [[64, 120, 13, 10], [88, 104, 15, 11], [116, 98, 16, 12], [144, 112, 13, 11], [80, 130, 12, 9], [108, 126, 14, 10], [136, 132, 12, 9], [96, 86, 10, 7], [126, 84, 10, 7]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#a89c84" ${L(2)}/><path d="M${x - rx * 0.6},${y - ry * 0.3} q${rx * 0.5},${-ry * 0.5} ${rx},0" stroke="#d2c8b2" stroke-width="2" fill="none"/>`).join('') + '<ellipse cx="100" cy="116" rx="7" ry="3" fill="#7d9a45"/><ellipse cx="140" cy="100" rx="6" ry="2.5" fill="#7d9a45"/>' : '';
  const garra = (x, y, s = 1) => `<path d="M${x},${y} l${-5 * s},${4 * s} M${x + 2},${y + 1} l${-3 * s},${6 * s} M${x + 5},${y + 1} l${-1 * s},${7 * s}" stroke="#efe3c6" stroke-width="${2.2 * s}" stroke-linecap="round"/><path d="M${x},${y} l${-5 * s},${4 * s} M${x + 2},${y + 1} l${-3 * s},${6 * s} M${x + 5},${y + 1} l${-1 * s},${7 * s}" stroke="${O}" stroke-width=".8" stroke-linecap="round" opacity=".6"/>`;
  return `<defs>${clip(k, conc)}</defs>${sombra(108, 174, mur ? 84 : 72)}
  ${cav ? `<g class="polvo">${[0, 1, 2].map((i) => `<circle cx="${40 - i * 10}" cy="${166 - i * 6}" r="${6 + i * 3}" fill="#c9ab7d" opacity="${0.6 - i * 0.15}" style="animation-delay:${i * 0.4}s"/>`).join('')}</g>` : ''}
  <g class="cola" style="transform-origin:158px 136px"><path d="M156,132 C170,134 182,142 190,152 C182,152 168,146 156,144Z" fill="${C.ca}" ${L(2.4)}/>${[164, 172, 180].map((x) => `<path d="M${x},${136 + (x - 164) / 2} l-2,${8 - (x - 164) / 6}" stroke="${C.so}" stroke-width="1.6"/>`).join('')}</g>
  <path d="M132,136 L134,162 C134,168 142,170 146,166 L144,136Z" fill="${C.ps}" ${L(2.4)}/>${garra(140, 166, 0.8)}
  <g class="respira" style="transform-origin:106px 150px">
    <path d="${conc}" fill="${C.ca}"/><g clip-path="url(#${k})">${escamas}${bandas}<ellipse cx="104" cy="144" rx="70" ry="14" fill="${C.so}" opacity=".6"/><path d="M70,98 C90,88 120,88 140,96" stroke="${C.lu}" stroke-width="5" fill="none" stroke-linecap="round"/>${piedras}</g>
    <path d="${conc}" fill="none" ${L()}/>
    <path d="M${mur ? 44 : 50},140 L${mur ? 170 : 158},140" ${L(2.4)}/>
    <path d="M${mur ? 54 : 58},140 C60,150 70,152 80,150 L130,150 C140,152 150,148 ${mur ? 160 : 150},140Z" fill="${C.pi}" ${L(2.2)}/>${Array.from({ length: 6 }, (_, i) => `<path d="M${70 + i * 12},142 l0,6" stroke="${C.ps}" stroke-width="1.4"/>`).join('')}
    <path d="M${cav ? 70 : 74},146 C${cav ? 64 : 70},156 ${cav ? 58 : 66},162 ${cav ? 54 : 64},168 C${cav ? 52 : 62},172 ${cav ? 62 : 70},173 ${cav ? 66 : 74},170 L${cav ? 80 : 82},150Z" fill="${C.pi}" ${L(2.4)}/>${garra(cav ? 54 : 63, cav ? 168 : 170, cav ? 1.6 : 0.9)}
    <path d="M118,148 L120,166 C120,172 128,174 132,170 L130,148Z" fill="${C.pi}" ${L(2.4)}/>${garra(126, 170, 0.9)}
  </g>
  <g class="cabeza" style="transform-origin:62px 132px">
    <path d="M${mur ? 50 : 56},${mur ? 108 : 112} C40,106 26,114 14,126 C10,130 12,136 18,136 C30,138 46,138 ${mur ? 58 : 62},134Z" fill="${C.pi}" ${L()}/>
    ${mur ? `<path d="M54,106 C44,102 30,108 22,118 C34,116 46,116 56,118Z" fill="#a89c84" ${L(2)}/>` : `<path d="M56,112 C46,108 34,112 26,120 C36,118 48,118 58,122Z" fill="${C.ca}" ${L(2)}/>`}
    <path d="M${mur ? 50 : 56},${mur ? 104 : 110} L${mur ? 54 : 60},${mur ? 92 : 98} L${mur ? 62 : 66},${mur ? 106 : 112}Z" fill="${C.ps}" ${L(2)}/>
    <ellipse cx="13" cy="130" rx="3" ry="2.6" fill="#4a2a22"/>
    <path d="M18,134 C26,136 34,136 42,134" ${L(1.6)} fill="none"/>
    ${ojoAlm(40, 122, 4.2, 2.4, '#3a2416')}
    <path d="${cav ? 'M33,116 C38,117 42,118 46,120' : 'M34,117 C38,115 43,115 46,117'}" ${L(1.8)} fill="none"/>
    ${Array.from({ length: 4 }, (_, i) => `<path d="M${20 + i * 6},${132} l1,-3" stroke="${C.ps}" stroke-width="1"/>`).join('')}
  </g>`;
}

// ───────── LLAMARÚ (Común) · llama ─────────
export function llamaru(v = 'base') {
  const k = 'l' + uid++, tro = v === 'tropera', fi = v === 'fiesta';
  const C = tro ? { la: '#8a5a36', so: '#5f3c22', lu: '#b07a4e', pa: '#e9dcc4' } : { la: '#efe5d2', so: '#c9b998', lu: '#fffaf0', pa: '#7a4e2c' };
  const cuerpo = 'M70,110 C70,92 88,86 112,86 C140,86 160,92 162,110 C164,126 150,134 130,134 L100,134 C82,134 70,126 70,110Z';
  const lana = Array.from({ length: 22 }, (_, i) => `<circle cx="${80 + (i % 8) * 11 + (Math.floor(i / 8) % 2) * 5}" cy="${94 + Math.floor(i / 8) * 13}" r="${6 + (i % 3)}" fill="${C.lu}" opacity=".55"/>`).join('');
  const pata = (x, y, c) => `<path d="M${x},${y} C${x - 1},${y + 14} ${x},${y + 26} ${x - 1},${y + 38} L${x - 5},${y + 42} L${x + 8},${y + 42} L${x + 7},${y + 38} C${x + 8},${y + 26} ${x + 8},${y + 14} ${x + 8},${y}Z" fill="${c}" ${L(2.4)}/><path d="M${x + 1},${y + 42} l0,-3" stroke="${O}" stroke-width="1.4"/>`;
  const borla = (x, y, c, r = 4.5) => `<g class="borla" style="transform-origin:${x}px ${y - 4}px">${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${x + Math.cos(i) * r * 0.6}" cy="${y + Math.sin(i) * r * 0.6}" r="${r * 0.55}" fill="${c}"/>`).join('')}<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${O}" stroke-width="1.2"/></g>`;
  const manchas = tro ? '' : `<path d="M120,90 C130,86 142,92 140,104 C132,108 122,102 120,90Z" fill="#9a6a42" opacity=".85"/>`;
  return `<defs>${clip(k, cuerpo)}</defs>${sombra(112, 180, 66)}
  ${pata(84, 128, C.so)}${pata(144, 128, C.so)}
  <g class="respira" style="transform-origin:116px 134px">
    <path d="M158,98 C168,96 172,104 168,112 C164,110 160,106 158,104Z" fill="${C.la}" ${L(2.2)}/>
    <path d="${cuerpo}" fill="${C.la}"/><g clip-path="url(#${k})">${lana}${manchas}<ellipse cx="116" cy="136" rx="56" ry="12" fill="${C.so}" opacity=".7"/></g><path d="${cuerpo}" fill="none" ${L()}/>
    ${tro ? `<path d="M96,86 L100,136 M136,86 L132,136" stroke="#5a3a22" stroke-width="3"/><path d="M82,90 L104,90 L106,128 L80,128Z" fill="#b3261e" ${L(2.2)}/><path d="M81,100 L105,100 M81,110 L105,110 M81,120 L105,120" stroke="#e2a72e" stroke-width="3"/><path d="M81,105 L105,105 M81,115 L105,115" stroke="#2f5e45" stroke-width="2"/><path d="M128,90 L150,90 L152,128 L126,128Z" fill="#b3261e" ${L(2.2)}/><path d="M127,100 L151,100 M127,110 L151,110 M127,120 L151,120" stroke="#e2a72e" stroke-width="3"/><path d="M127,105 L151,105 M127,115 L151,115" stroke="#2f5e45" stroke-width="2"/><path d="M92,84 C108,78 124,78 140,84" stroke="#6b4a2a" stroke-width="3" fill="none"/>` : ''}
    ${fi ? `<path d="M100,88 C110,94 120,94 130,88" stroke="#c23a7a" stroke-width="3" fill="none"/>${borla(104, 92, '#c23a7a', 5)}${borla(116, 95, '#e2a72e', 5)}${borla(128, 92, '#2f8a5b', 5)}` : ''}
    ${pata(94, 128, C.la)}${pata(152, 126, C.la)}
  </g>
  <g class="cabeza" style="transform-origin:82px 110px">
    <path d="M72,112 C66,96 62,78 62,62 L80,58 C80,74 84,92 92,104Z" fill="${C.la}" ${L()}/>
    <path d="M66,70 C68,84 72,96 78,106" stroke="${C.so}" stroke-width="3" fill="none" opacity=".7"/>
    ${fi ? `${borla(68, 78, '#e2a72e', 4)}${borla(70, 90, '#c23a7a', 4)}` : ''}${tro ? '<path d="M60,72 L82,68" stroke="#6b4a2a" stroke-width="3"/>' : ''}
    <path d="M58,46 L54,26 C56,22 62,24 63,30 L64,44Z" fill="${C.la}" ${L(2.2)}/><path d="M70,44 L72,24 C75,20 80,24 78,30 L76,46Z" fill="${C.la}" ${L(2.2)}/>
    ${fi ? `${borla(56, 26, '#c23a7a', 4)}${borla(74, 24, '#2f8a5b', 4)}` : ''}
    <path d="M44,62 C42,52 50,42 62,42 C74,42 82,50 80,62 C78,70 72,72 64,72 L50,72 C44,72 44,66 44,62Z" fill="${C.la}" ${L()}/>
    <path d="M44,62 C42,66 44,72 50,72 L58,72 C56,68 54,64 52,60Z" fill="${tro ? '#6a4228' : '#d8cab0'}"/><path d="M44,62 C42,52 50,42 62,42 C74,42 82,50 80,62 C78,70 72,72 64,72 L50,72 C44,72 44,66 44,62Z" fill="none" ${L()}/>
    <path d="M45,64 C47,66 50,66 52,64" ${L(1.4)} fill="none"/><ellipse cx="46.5" cy="59" rx="1.3" ry="2" fill="${O}"/>
    ${ojoAlm(62, 54, 5, 3, '#2a1a12')}
    <path d="M56,48.6 C60,47 65,47 68,49" ${L(1.8)} fill="none"/>
    <path d="M52,46 C56,40 66,38 72,42" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>`;
}

// ───────── MALLKU (Viento) · cóndor andino ─────────
export function mallku(v = 'base') {
  const cum = v === 'cumbres', vie = v === 'viejo';
  const C = cum || vie ? { pl: '#26221f', so: '#141210', lu: '#4a4540', ca: '#b98a7a' } : { pl: '#6b5440', so: '#4a3a2c', lu: '#8c7258', ca: '#8a7a70' };
  const viento = `<g class="viento" fill="none" stroke="#a9c9d6" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M150,40 C170,36 186,44 182,56 C179,64 168,62 170,54"/><path d="M14,70 C30,64 46,68 44,78"/><path d="M120,24 C140,18 160,20 176,30"/></g>`;
  if (cum) return `${sombra(104, 186, 50)}${viento}
  <g class="aleteo" style="transform-origin:100px 100px">
    <path d="M96,96 C70,80 40,74 8,82 C14,88 22,90 30,90 C24,94 20,98 18,102 C30,100 40,100 50,102 C46,106 44,110 44,114 C60,108 78,106 96,108Z" fill="${C.pl}" ${L()}/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${16 + i * 7},${86 + i * 4} l-10,${4 + i}" ${L(2.4)} />`).join('')}<path d="M54,92 C66,90 80,94 92,100" stroke="#e8e4dc" stroke-width="5" fill="none" opacity=".9"/>
    <path d="M110,96 C136,80 166,74 196,82 C190,88 182,90 174,90 C180,94 184,98 186,102 C174,100 164,100 154,102 C158,106 160,110 160,114 C144,108 126,106 110,108Z" fill="${C.so}" ${L()}/><path d="M150,92 C138,90 124,94 112,100" stroke="#cfcac0" stroke-width="5" fill="none" opacity=".8"/>
  </g>
  <path d="M86,96 C86,86 96,82 106,82 C118,82 126,92 124,106 C122,118 112,124 102,124 C92,124 86,114 86,96Z" fill="${C.pl}" ${L()}/>
  <path d="M118,118 L132,134 L120,130 L126,140 L112,126Z" fill="${C.pl}" ${L(2)}/>
  <path d="M88,92 C92,82 112,80 118,90 C110,94 96,96 88,92Z" fill="#f1ede6" ${L(2)}/>
  <path d="M90,90 C88,78 92,70 98,68 C104,66 108,70 108,76 L104,84Z" fill="${C.ca}" ${L(2.4)}/><path d="M92,72 C96,66 102,64 106,68 C100,68 96,70 92,72Z" fill="#7a3a34"/>
  <path d="M90,74 L80,76 C78,80 82,82 86,80 L90,80Z" fill="#e8dcc4" ${L(1.8)}/>${ojoAlm(98, 74, 3.6, 2.2, '#a8321e')}
  <path d="M100,124 L98,136 M108,122 L110,136" ${L(2.4)}/>`;
  const cuerpo = vie ? 'M70,120 C64,92 82,72 108,72 C134,72 152,92 150,124 C148,146 132,156 110,156 C88,156 74,144 70,120Z' : 'M74,120 C68,96 84,78 106,78 C130,78 146,96 144,122 C142,142 128,150 108,150 C88,150 76,140 74,120Z';
  const alasMedio = `<g class="aleteo" style="transform-origin:110px 104px"><path d="M96,100 C78,94 58,102 44,122 C56,120 62,122 68,126 C60,130 56,136 54,144 C68,136 82,132 94,128Z" fill="${C.so}" ${L(2.6)}/>${[0, 1, 2].map((i) => `<path d="M${50 + i * 6},${130 + i * 5} l-8,6" ${L(2)}/>`).join('')}
    <path d="M126,104 C146,96 166,104 180,122 C168,120 160,124 156,128 C162,132 166,138 168,146 C152,138 140,134 128,130Z" fill="${C.so}" ${L(2.6)}/>${[0, 1, 2].map((i) => `<path d="M${172 - i * 6},${132 + i * 5} l8,6" ${L(2)}/>`).join('')}</g>`;
  const capa = `<path d="M92,94 C70,100 54,122 46,170 C56,164 64,166 72,172 C74,152 82,130 94,118Z" fill="${C.so}" ${L(2.6)}/><path d="M60,130 C66,122 74,116 84,112" stroke="#ece8e0" stroke-width="7" fill="none" stroke-linecap="round"/>${[0, 1, 2, 3].map((i) => `<path d="M${50 + i * 6},${160 + i * 2} l-4,10" ${L(2.2)}/>`).join('')}
    <path d="M128,94 C150,100 166,122 174,170 C164,164 156,166 148,172 C146,152 138,130 126,118Z" fill="${C.so}" ${L(2.6)}/><path d="M160,130 C154,122 146,116 136,112" stroke="#ece8e0" stroke-width="7" fill="none" stroke-linecap="round"/>${[0, 1, 2, 3].map((i) => `<path d="M${170 - i * 6},${160 + i * 2} l4,10" ${L(2.2)}/>`).join('')}`;
  const piedra = `<path d="M60,186 C62,170 80,162 106,162 C132,162 150,170 152,186Z" fill="#8b8172" ${L(2.4)}/><path d="M74,172 C86,166 104,166 116,168" stroke="#b2a894" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const nieveCerro = `<path d="M40,190 C46,168 70,158 108,158 C146,158 170,168 176,190Z" fill="#9a958c" ${L(2.4)}/><path d="M56,172 C70,162 96,160 118,162 C134,164 150,168 160,176 C140,172 120,172 100,174 C84,176 68,176 56,172Z" fill="#f4f7f9" ${L(1.6)}/>`;
  if (v === 'base') return `${sombra(106, 180, 42)}<g transform="translate(20 30) scale(.82)">${alasMedio}${cuerpoCondor(C, cuerpo, false, false)}${Array.from({ length: 6 }, (_, i) => `<circle cx="${92 + (i % 3) * 9}" cy="${114 + Math.floor(i / 3) * 10}" r="4" fill="#a48a6e" opacity=".8"/>`).join('')}</g>`;
  if (vie) return `${sombra(108, 186, 54)}${viento}<g transform="translate(-2 20)">${capa}${cuerpoCondor(C, cuerpo, false, true)}</g>`;
  return '';
}
function cuerpoCondor(C, cuerpo, cum, vie) {
  return `${vie ? '' : sombra(108, 184, 52)}
  <path d="M96,150 L94,172 M90,172 L100,172 M118,150 L120,172 M114,172 L126,172" ${L(3.4)}/><path d="M96,150 L94,172 M118,150 L120,172" stroke="#a89a8a" stroke-width="2" stroke-linecap="round"/>
  <g class="respira" style="transform-origin:108px 150px">
    <path d="M136,130 L162,170 L148,166 L150,178 L130,150Z" fill="${C.so}" ${L(2.4)}/>
    <path d="${cuerpo}" fill="${C.pl}" ${L()}/>
    <path d="M96,${vie ? 92 : 96} C120,86 148,98 158,122 C164,138 164,154 160,168 C150,162 136,152 124,142 C108,130 98,114 96,${vie ? 92 : 96}Z" fill="${C.so}" ${L(2.6)}/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${108 + i * 10},${108 + i * 8} q6,4 4,10" stroke="${C.lu}" stroke-width="1.6" fill="none" opacity=".8"/>`).join('')}
    <path d="M106,${vie ? 102 : 106} C124,102 142,112 150,128" stroke="${cum || vie ? '#ece8e0' : C.lu}" stroke-width="${cum || vie ? 9 : 6}" fill="none" stroke-linecap="round" opacity=".9"/>
    <path d="M150,150 l8,14 M146,154 l6,14 M142,156 l3,12" stroke="${C.so}" stroke-width="3" stroke-linecap="round"/>
    ${vie ? '<path d="M150,138 l6,6 M146,142 l4,8" stroke="#8a847a" stroke-width="2"/><path d="M128,104 l-4,6" stroke="#8a847a" stroke-width="1.6"/>' : ''}
    ${Array.from({ length: 5 }, (_, i) => `<path d="M${132 + i * 4},${144 + i * 2} l${4},${10 - i}" stroke="${C.so}" stroke-width="2.4" stroke-linecap="round"/>`).join('')}
    <path d="M${vie ? 76 : 82},${vie ? 96 : 100} C${vie ? 80 : 86},${vie ? 80 : 86} ${vie ? 112 : 108},${vie ? 76 : 82} ${vie ? 124 : 118},${vie ? 92 : 96} C${vie ? 114 : 110},${vie ? 104 : 104} ${vie ? 90 : 94},${vie ? 106 : 106} ${vie ? 76 : 82},${vie ? 96 : 100}Z" fill="${vie || cum ? '#f1ede6' : '#8c7258'}" ${L(2.2)}/>
    ${vie ? Array.from({ length: 6 }, (_, i) => `<path d="M${84 + i * 6},${100 + (i % 2) * 2} l-1,4" stroke="#cfcac0" stroke-width="1.4"/>`).join('') : ''}
  </g>
  <g class="cabeza" style="transform-origin:96px 92px">
    <path d="M${vie ? 90 : 92},${vie ? 88 : 92} C${vie ? 86 : 88},${vie ? 70 : 76} ${vie ? 88 : 90},${vie ? 58 : 64} ${vie ? 96 : 98},${vie ? 54 : 60} C${vie ? 104 : 106},${vie ? 52 : 58} ${vie ? 112 : 112},${vie ? 56 : 62} ${vie ? 112 : 112},${vie ? 64 : 70} L${vie ? 106 : 106},${vie ? 86 : 90}Z" fill="${C.ca}" ${L(2.6)}/>
    ${vie ? '<path d="M94,58 C98,48 106,46 110,52 C104,52 98,54 94,58Z" fill="#7a3a34" stroke="#2a1c15" stroke-width="1.8"/><path d="M98,66 l4,1 M97,72 l5,0" stroke="#7a5a54" stroke-width="1"/>' : cum ? '<path d="M96,62 C100,54 106,54 110,58 C104,58 100,60 96,62Z" fill="#7a3a34"/>' : ''}
    <path d="M${vie ? 92 : 94},${vie ? 62 : 68} L${vie ? 78 : 80},${vie ? 64 : 70} C${vie ? 74 : 76},${vie ? 66 : 72} ${vie ? 74 : 76},${vie ? 72 : 78} ${vie ? 80 : 82},${vie ? 72 : 78} L${vie ? 92 : 94},${vie ? 70 : 76}Z" fill="#e8dcc4" ${L(2)}/><path d="M${vie ? 76 : 78},${vie ? 66 : 72} C${vie ? 74 : 76},${vie ? 70 : 76} ${vie ? 76 : 78},${vie ? 72 : 78} ${vie ? 78 : 80},${vie ? 72 : 78}" stroke="#6a5a4a" stroke-width="1.6" fill="none"/>
    ${ojoAlm(vie ? 100 : 102, vie ? 63 : 69, 3.8, 2.3, vie || cum ? '#a8321e' : '#6a4a2a')}
    <path d="M${vie ? 95 : 97},${vie ? 58 : 64} C${vie ? 99 : 101},${vie ? 57 : 63} ${vie ? 104 : 106},${vie ? 58 : 64} ${vie ? 106 : 108},${vie ? 61 : 67}" ${L(2)} fill="none"/>
  </g>`;
}

// ───────── ESCARCHUÑA (Hielo) · vicuña ─────────
function punena() {
  // Centinela de la tropilla: adulta, parada en una peña, cuello alto, una mano levantada y el vellón largo al viento.
  const k = 'v' + uid++, C = { la: '#b97a40', so: '#86532a', lu: '#d9a066', ba: '#f3ead8', es: '#d8eef8', fl: '#f1e2c2' };
  const cuerpo = 'M80,108 C80,94 94,88 116,88 C138,88 156,94 156,108 C156,122 144,128 126,128 L104,128 C90,128 80,122 80,108Z';
  const pata = (x, y, c) => `<path d="M${x},${y} C${x},${y + 16} ${x + 1},${y + 28} ${x},${y + 40} L${x - 3},${y + 44} L${x + 6},${y + 44} L${x + 6},${y + 40} C${x + 7},${y + 28} ${x + 6},${y + 16} ${x + 6},${y}Z" fill="${c}" ${L(2.2)}/>`;
  const flecos = (pts) => `<g class="flecos">${pts.map(([x, y, l]) => `<path d="M${x},${y} C${x + 1},${y + l * 0.6} ${x + 7},${y + l} ${x + 12},${y + l + 1} C${x + 9},${y + l * 0.6} ${x + 8},${y + 3} ${x + 6},${y}Z" fill="${C.fl}" stroke="${O}" stroke-width="1.5" stroke-linejoin="round"/>`).join('')}</g>`;
  return `<defs>${clip(k, cuerpo)}</defs>
  <g class="viento" fill="none" stroke="#bcd6e2" stroke-width="2.2" stroke-linecap="round" opacity=".9"><path d="M8,40 C30,34 50,38 64,46"/><path d="M150,52 C170,48 188,54 194,64"/><path d="M14,96 C30,92 44,96 50,104"/></g>
  ${sombra(118, 186, 46)}
  <g transform="translate(0 18)">
  ${pata(92, 124, C.so)}${pata(140, 124, C.so)}
  <g class="respira" style="transform-origin:118px 128px">
    <path d="M152,96 C160,92 166,98 162,104 C158,102 154,100 152,100Z" fill="${C.la}" ${L(2)}/>
    <path d="${cuerpo}" fill="${C.la}"/><g clip-path="url(#${k})"><path d="M70,116 C100,126 130,126 162,114 L162,140 L70,140Z" fill="${C.ba}"/><path d="M92,94 C112,90 132,92 150,98" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    ${flecos([[96, 122, 10], [108, 124, 11], [120, 124, 10], [132, 122, 9]])}
    ${pata(146, 122, C.la)}
    <path d="M102,124 C100,134 98,140 96,144 C94,148 98,152 104,150 L108,144 C108,138 110,132 110,126Z" fill="${C.la}" ${L(2.2)}/><path d="M96,144 C92,148 92,152 96,154 L102,154 C104,152 104,150 104,150Z" fill="#3a2a22" ${L(1.6)}/>
  </g>
  <g class="cabeza" style="transform-origin:90px 112px">
    <path d="M84,116 C80,100 80,80 82,58 L98,58 C96,80 96,96 100,110Z" fill="${C.la}" ${L()}/>
    <path d="M84,72 C82,88 84,102 88,114 L94,112 C90,100 90,86 90,74Z" fill="${C.ba}"/>
    ${flecos([[84, 80, 12], [85, 92, 13], [87, 104, 11]])}
    <path d="M84,116 C80,100 80,80 82,58 L98,58 C96,80 96,96 100,110Z" fill="none" ${L()}/>
    <g transform="translate(0 14)">
    <path d="M78,30 L78,14 C80,10 85,12 85,16 L84,30Z" fill="${C.la}" ${L(2)}/><path d="M90,28 L94,12 C97,9 101,12 99,16 L96,30Z" fill="${C.la}" ${L(2)}/>
    <g class="destello2">${[[83, 8], [92, 6], [100, 10]].map(([x, y]) => `<path transform="translate(${x} ${y}) scale(.5)" d="M0,-6 L0,6 M-5,-3 L5,3 M-5,3 L5,-3" stroke="${C.es}" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>
    <path d="M64,40 C62,32 70,24 80,24 C90,24 98,32 96,42 C94,48 88,50 82,50 L70,50 C64,50 64,44 64,40Z" fill="${C.la}" ${L()}/>
    <path d="M64,40 C63,45 65,50 70,50 L74,50 C72,46 70,42 69,39Z" fill="${C.ba}"/><path d="M64,40 C62,32 70,24 80,24 C90,24 98,32 96,42 C94,48 88,50 82,50 L70,50 C64,50 64,44 64,40Z" fill="none" ${L()}/>
    <ellipse cx="66.5" cy="38" rx="1.2" ry="1.8" fill="${O}"/><path d="M65,43 C67,44.5 69,44.5 71,43" ${L(1.3)} fill="none"/>
    ${ojoAlm(80, 34, 4.8, 2.8, '#1f140e')}<path d="M74,29 C78,27.6 82,27.6 86,29.4" ${L(1.9)} fill="none"/>
    <g class="vaho">${[0, 1].map((i) => `<circle cx="${56 - i * 7}" cy="${42 - i * 3}" r="${3 + i * 1.5}" fill="#eaf4f8" opacity="${0.75 - i * 0.25}"/>`).join('')}</g>
  </g></g></g>`;
}

export function escarchuna(v = 'base') {
  if (v === 'puna') return punena();
  const k = 'v' + uid++, pu = false, ni = v === 'nieve';
  const C = ni ? { la: '#e9eff4', so: '#a9bccb', lu: '#ffffff', ba: '#f6f9fb', es: '#cfe6f2' } : { la: '#c98d52', so: '#9a6638', lu: '#e0aa6e', ba: '#f3ead8', es: '#d8eef8' };
  const cuerpo = ni ? 'M74,112 C72,92 90,84 114,84 C140,84 160,92 160,112 C160,130 146,136 128,136 L102,136 C84,136 74,128 74,112Z' : 'M78,110 C78,96 92,90 114,90 C136,90 154,96 154,110 C154,124 142,130 124,130 L102,130 C88,130 78,124 78,110Z';
  const pata = (x, y, c, inc = 0) => `<path d="M${x},${y} C${x + inc * 0.3},${y + 16} ${x + inc * 0.6},${y + 30} ${x + inc},${y + 44} L${x + inc - 3},${y + 48} L${x + inc + 6},${y + 48} L${x + inc + 6},${y + 44} C${x + 6 + inc * 0.6},${y + 30} ${x + 6 + inc * 0.3},${y + 16} ${x + 6},${y}Z" fill="${c}" ${L(2.2)}/>`;
  const cristal = (x, y, s) => `<g class="destello2" transform="translate(${x} ${y}) scale(${s})"><path d="M0,-6 L0,6 M-5,-3 L5,3 M-5,3 L5,-3" stroke="${C.es}" stroke-width="1.6" stroke-linecap="round"/></g>`;
  return `<defs>${clip(k, cuerpo)}</defs>${sombra(112, 182, 60)}
  ${ni ? `<g class="nieve">${Array.from({ length: 10 }, (_, i) => `<circle cx="${30 + i * 16}" cy="${20 + (i % 4) * 12}" r="${1.6 + (i % 3) * 0.6}" fill="#fff" style="animation-delay:${(i * 0.3).toFixed(1)}s"/>`).join('')}</g>` : ''}
  ${pata(90, ni ? 130 : 126, C.so, pu ? -12 : 0)}${pata(142, ni ? 130 : 126, C.so, pu ? 12 : 0)}
  <g class="respira" style="transform-origin:116px 130px">
    <path d="M152,100 C160,98 164,104 160,110 C156,108 154,106 152,104Z" fill="${C.la}" ${L(2)}/>
    <path d="${cuerpo}" fill="${C.la}"/><g clip-path="url(#${k})"><path d="M70,${ni ? 122 : 118} C100,${ni ? 132 : 128} 130,${ni ? 132 : 128} 162,${ni ? 120 : 116} L162,140 L70,140Z" fill="${C.ba}"/>${pu ? '<path d="M90,96 L150,94 M86,104 L146,100" stroke="#e0aa6e" stroke-width="3" opacity=".8"/>' : ''}
      ${ni ? Array.from({ length: 16 }, (_, i) => `<circle cx="${84 + (i % 8) * 10}" cy="${94 + Math.floor(i / 8) * 12}" r="7" fill="#fff" opacity=".6"/>`).join('') : ''}</g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    ${[96, 112, 128, 144].map((x, i) => `<path d="M${x},${ni ? 85 : 91} l${pu ? 6 : 2},-3" stroke="${C.es}" stroke-width="2" stroke-linecap="round"/>`).join('')}
    ${ni ? '<path d="M96,136 l-1,6 l2,0Z M120,136 l0,8 l2,-1Z M138,136 l1,6 l2,-1Z" fill="#cfe6f2" stroke="#7aa6c0" stroke-width="1"/>' : ''}
    ${pata(100, ni ? 130 : 126, C.la, pu ? 10 : 0)}${pata(150, ni ? 128 : 124, C.la, pu ? -10 : 0)}
  </g>
  <g class="cabeza" style="transform-origin:86px 110px">
    <path d="M80,114 C74,98 72,80 72,62 L88,60 C88,78 92,96 98,106Z" fill="${C.la}" ${L()}/>
    <path d="M76,78 C76,92 80,104 86,112 L92,110 C86,100 82,90 82,78Z" fill="${C.ba}"/><path d="M78,96 C74,100 74,106 78,108" stroke="${C.ba}" stroke-width="5" stroke-linecap="round"/>
    <path d="M80,114 C74,98 72,80 72,62 L88,60 C88,78 92,96 98,106Z" fill="none" ${L()}/>
    <path d="M68,46 L66,32 C68,28 72,30 73,34 L74,46Z" fill="${C.la}" ${L(2)}/><path d="M78,44 L80,30 C83,27 86,30 85,34 L83,46Z" fill="${C.la}" ${L(2)}/>
    <path d="M56,58 C54,50 62,42 72,42 C82,42 90,50 88,60 C86,66 80,68 74,68 L62,68 C56,68 56,62 56,58Z" fill="${C.la}" ${L()}/>
    <path d="M56,58 C55,63 57,68 62,68 L66,68 C64,64 62,60 61,57Z" fill="${C.ba}"/><path d="M56,58 C54,50 62,42 72,42 C82,42 90,50 88,60 C86,66 80,68 74,68 L62,68 C56,68 56,62 56,58Z" fill="none" ${L()}/>
    <ellipse cx="58.5" cy="56" rx="1.2" ry="1.8" fill="${O}"/><path d="M57,61 C59,62.5 61,62.5 63,61" ${L(1.3)} fill="none"/>
    ${ojoAlm(72, 52, 4.8, 3, '#1f140e')}
    <path d="M66.5,47.6 C70,46 74,46 77.5,47.8" ${L(1.7)} fill="none"/>
    ${pu || ni ? `<g class="vaho">${[0, 1].map((i) => `<circle cx="${50 - i * 6}" cy="${60 - i * 4}" r="${3 + i * 1.5}" fill="#eaf4f8" opacity="${0.75 - i * 0.25}"/>`).join('')}</g>` : ''}
    ${cristal(64, 40, 0.6)}${ni ? cristal(86, 40, 0.7) + cristal(78, 76, 0.6) : ''}
  </g>`;
}

const T = { Tierra: '#8a5a2a', Común: '#7a7466', Viento: '#5f8fa6', Hielo: '#5aa0c8' };
const tarjeta = (cod, nom, ant, tipo, tag, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo">${svg('0 0 200 200', dib)}</div><figcaption><b>${nom}</b><span class="tipo" style="background:${T[tipo]}">${tipo}</span><span class="tag">${tag}</span><small>hoy: ${ant}</small><p>${txt}</p></figcaption></figure>`;
const fuentes = `@font-face{font-family:Bree;src:url(data:font/woff2;base64,${F('bree-serif/files/bree-serif-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:400;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:800;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-800-normal.woff2')}) format('woff2')}`;
const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>¡Che, Bicho! — Catálogo para aprobar · lote 2a</title><style>${fuentes}
*{box-sizing:border-box}body{margin:0;background:#f4eee3;color:${O};font:16px/1.5 Nunito,system-ui,sans-serif}
header{background:#2b2420;color:#f4eee3;padding:24px 18px 18px;text-align:center;border-bottom:6px solid #a42a2a}header h1{font:28px/1.1 Bree,serif;margin:0 0 6px}header p{margin:0;opacity:.85;font-size:14px}
main{max-width:1000px;margin:0 auto;padding:6px 14px 50px}section{margin:24px 0}.intro{margin:0 0 14px;color:#5a4a3a;max-width:72ch;font-size:15px}
.linea{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}.linea h3{grid-column:1/-1;margin:6px 0 -4px;font:19px Bree,serif}
@media (max-width:720px){.linea{grid-template-columns:1fr 1fr}.linea .ficha:first-of-type{grid-column:1/-1}}
.ficha{position:relative;margin:0;background:#fff;border:2px solid #e2d6c2;border-radius:16px;overflow:hidden}.cod{position:absolute;top:8px;left:8px;background:${O};color:#fff;font:800 12px Nunito;padding:2px 8px;border-radius:99px;z-index:2}
.lienzo{background:radial-gradient(circle at 50% 75%,#efe2c8,#e3d2b2 70%);padding:4px}.lienzo svg{display:block;width:100%;height:auto;max-height:230px}
figcaption{padding:8px 12px 12px}figcaption b{font:19px Bree,serif;font-weight:400;margin-right:6px}figcaption small{display:block;color:#8a7a6a;font-size:12px}figcaption p{margin:4px 0 0;font-size:13.5px;color:#5a4a3a}
.tipo,.tag{display:inline-block;font:800 11px Nunito;color:#fff;padding:2px 8px;border-radius:99px;vertical-align:3px;margin-right:4px}.tag{background:#6a5a4a}
.como{background:#fff;border:2px dashed #c9b79a;border-radius:14px;padding:12px 14px;font-size:14.5px}
@keyframes respira{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,1.03)}}@keyframes cola{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes cabeza{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@keyframes parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}@keyframes polvo{0%{transform:translate(0,0) scale(.6);opacity:.7}100%{transform:translate(-14px,-10px) scale(1.4);opacity:0}}
@keyframes borla{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}@keyframes viento{to{stroke-dashoffset:-60}}@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.86)}}
@keyframes galope{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-5px) rotate(-1.5deg)}}@keyframes terrones{0%{transform:translate(0,0);opacity:1}100%{transform:translate(0,-18px);opacity:0}}@keyframes flecos{0%,100%{transform:skewX(0)}50%{transform:skewX(-10deg)}}@keyframes nieve{0%{transform:translateY(-10px);opacity:0}20%{opacity:1}100%{transform:translateY(120px);opacity:0}}@keyframes vaho{0%{transform:translate(0,0);opacity:.8}100%{transform:translate(-10px,-6px);opacity:0}}@keyframes destello2{0%,80%,100%{opacity:.3}90%{opacity:1}}
.respira{animation:respira 3.2s ease-in-out infinite;transform-box:view-box}.cola{animation:cola 2.6s ease-in-out infinite;transform-box:view-box}.cabeza{animation:cabeza 4.5s ease-in-out infinite;transform-box:view-box}
.ojo{animation:parpadeo 4.8s infinite;transform-box:fill-box;transform-origin:center}.polvo circle{animation:polvo 1.6s ease-out infinite;transform-box:fill-box;transform-origin:center}
.borla{animation:borla 1.8s ease-in-out infinite;transform-box:view-box}.viento path{stroke-dasharray:14 10;animation:viento 2.4s linear infinite}.aleteo{animation:aleteo 2.4s ease-in-out infinite;transform-box:view-box}
.galope{animation:galope .55s ease-in-out infinite;transform-box:view-box}.terrones circle{animation:terrones 1.2s ease-out infinite;transform-box:fill-box}.flecos{animation:flecos 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:top}.nieve circle{animation:nieve 4s linear infinite;transform-box:fill-box}.vaho{animation:vaho 2.2s ease-out infinite;transform-box:fill-box}.destello2{animation:destello2 2.6s infinite}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body>
<header><h1>Catálogo para aprobar · lote 2a</h1><p>Bichos de Salta: quirquincho, llama, cóndor y vicuña, con sus dos caminos</p></header><main>
<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Los nombres son borradores y también se aprueban. El lote 2b trae la yarará, la lagartija de pirca, el bicho de luz y el Ucumar.</div>
<section>
<div class="linea"><h3>Tierra · quirquincho</h3>
${tarjeta('B10', 'Kirkallpa', 'Quirqui', 'Tierra', 'base', kirkallpa(), 'Quirquincho de la Puna, con las bandas de la caparazón llenas de tierra. <i>Allpa</i> es tierra en quechua. Tímido: se hace bolita.')}
${tarjeta('B11', 'Socavón', 'Quirquincho cavador', 'Tierra', 'camino 1', kirkallpa('cavador'), 'Se para en dos patas con garras de minero, gruesas y curvas, y cava túneles para salir por atrás del rival.')}
${tarjeta('B12', 'Murallón', 'Quirquincho acorazado', 'Tierra', 'camino 2', kirkallpa('muralla'), 'Más grande y lento: la caparazón se volvió una pirca de piedras con musgo. Aguanta como un muro.')}</div>
<div class="linea"><h3>Común · llama</h3>
${tarjeta('B13', 'Llamarú', 'Llamita', 'Común', 'base', llamaru(), 'Llama joven de lana crema con una mancha marrón. Curiosa: se acerca a mirar.')}
${tarjeta('B14', 'Tropero', 'Llama tropera', 'Común', 'camino 1', llamaru('tropera'), 'Llama de carga, oscura y fuerte, con alforjas tejidas a rayas. Lleva peso y no se cansa.')}
${tarjeta('B15', 'Floreada', 'Llama de fiesta', 'Común', 'camino 2', llamaru('fiesta'), 'Adornada como en la señalada: borlas de lana de colores en las orejas, el cuello y el lomo.')}</div>
<div class="linea"><h3>Viento · cóndor andino</h3>
${tarjeta('B16', 'Mallku', 'Mallku', 'Viento', 'base', mallku(), 'Cóndor joven, todavía pardo y sin collar blanco. <i>Mallku</i> es cóndor en aimara (nombre que se mantiene).')}
${tarjeta('B17', 'Cumbrero', 'Cóndor de las cumbres', 'Viento', 'camino 1', mallku('cumbres'), 'Adulto en vuelo: alas abiertas con las plumas de la punta separadas como dedos, collar blanco.')}
${tarjeta('B18', 'Achachila', 'Cóndor viejo', 'Viento', 'camino 2', mallku('viejo'), 'Cóndor viejo y enorme, con cresta y cicatrices en las alas. <i>Achachila</i> es el espíritu abuelo de los cerros.')}</div>
<div class="linea"><h3>Hielo · vicuña</h3>
${tarjeta('B19', 'Escarchuña', 'Vicuñita', 'Hielo', 'base', escarchuna(), 'Vicuña de la Puna: lomo canela, pecho y babero blancos, escarcha en la punta del pelo.')}
${tarjeta('B20', 'Puneña', 'Vicuña de la Puna', 'Hielo', 'camino 1', escarchuna('puna'), 'La centinela de la tropilla: adulta, parada con el cuello en alto y una mano levantada. El vellón largo del pecho y la panza flamea con el viento helado, y le brilla escarcha entre las orejas.')}
${tarjeta('B21', 'Nevaduña', 'Vicuña de nieve', 'Hielo', 'camino 2', escarchuna('nieve'), 'Lana espesa blanca y celeste, carámbanos en la panza y nevada alrededor.')}</div>
</section></main></body></html>`;
writeFileSync(new URL('./catalogo-2.html', import.meta.url), html);
console.log('ok', (html.length / 1024).toFixed(0), 'KB');
