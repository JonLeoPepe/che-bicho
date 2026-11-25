// Gente de Jujuy en proporción adulta (lote 9a): capataza y domadores. viewBox 0 0 120 220, piso y=212.
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano, bota, sombrero } from './personas-salta.mjs';

const brazo = (d, col, w = 10) => `<path d="${d}" stroke="${O}" stroke-width="${w + 4.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cuello = (piel) => `<path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>`;
const pelo = (c) => `<path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="${c}"/>`;
const pelos = (c) => `<path d="M47.5,31 C45,18 52,13 61,13 C70,13 76,19 72.5,31 C70,23 66,19 60,20 C55,20 50,23 47.5,31Z" fill="${c}" ${L(2)}/>`;
const ojota = (x, piel) => `<path d="M${x - 5},186 L${x - 5},198 L${x + 3},198 L${x + 3},186Z" fill="${piel}" ${L(2)}/><path d="M${x - 10},203 C${x - 10},198 ${x + 6},197 ${x + 8},201 L${x + 8},206 L${x - 12},206Z" fill="${piel}" ${L(1.8)}/><path d="M${x - 13},206 L${x + 9},206" stroke="#3a2a22" stroke-width="3"/><path d="M${x - 8},201 L${x - 2},198 L${x + 4},201" stroke="#3a2a22" stroke-width="2" fill="none"/>`;
// aguayo: tela tejida a rayas de colores
const rayasAguayo = ['#c8362b', '#e2a72e', '#2f7d5b', '#7a3a8a', '#e86a3a', '#2f5a8a'];
const aguayo = (d, id) => `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="#c8362b"/><g clip-path="url(#${id})">${Array.from({ length: 22 }, (_, i) => `<rect x="0" y="${30 + i * 5}" width="120" height="${i % 3 ? 3 : 5}" fill="${rayasAguayo[i % 6]}"/>`).join('')}${Array.from({ length: 12 }, (_, i) => `<path d="M${10 + i * 9},${60 + (i % 4) * 22} l3,-3 l3,3 l-3,3Z" fill="#f4efe4" opacity=".8"/>`).join('')}</g><path d="${d}" fill="none" ${L(2.2)}/>`;
const pollera = (c, s, y0 = 112, y1 = 186) => `<path d="M40,${y0} C34,${y0 + 26} 30,${y1 - 26} 28,${y1} C48,${y1 + 6} 72,${y1 + 6} 92,${y1} C90,${y1 - 26} 86,${y0 + 26} 80,${y0}Z" fill="${c}" ${L()}/><path d="M30,${y1 - 10} C48,${y1 - 4} 72,${y1 - 4} 90,${y1 - 10}" stroke="${s}" stroke-width="3" fill="none"/>${[40, 50, 60, 70, 80].map((x) => `<path d="M${x},${y0 + 10} C${x - 2},${y0 + 40} ${x - 4},${y1 - 20} ${x - 6},${y1 - 2}" stroke="${s}" stroke-width="1" opacity=".5" fill="none"/>`).join('')}`;
const trenzas = (c, cinta = '#c8362b') => `<path d="M48,34 C44,50 44,70 46,92 L51,92 C49,70 50,52 52,38Z M72,34 C76,50 76,70 74,92 L69,92 C71,70 70,52 68,38Z" fill="${c}" ${L(1.8)}/>${[46, 56, 66, 76, 86].map((y) => `<path d="M45,${y} l6,3 M75,${y} l-6,3" stroke="#3a2214" stroke-width="1.2"/>`).join('')}<path d="M45,92 L52,92 L51,98 L46,98Z M68,92 L75,92 L74,98 L69,98Z" fill="${cinta}" ${L(1.2)}/>`;
const sombreroNegro = (y = 16) => `<path d="M30,${y + 4} C30,${y} 90,${y} 90,${y + 4} C90,${y + 8} 30,${y + 8} 30,${y + 4}Z" fill="#1c1716" ${L()}/><path d="M46,${y + 2} C46,${y - 14} 74,${y - 14} 74,${y + 2}Z" fill="#1c1716" ${L()}/><path d="M46,${y - 2} L74,${y - 2}" stroke="#7a3a8a" stroke-width="3"/>`;
const chullo = (c1, c2) => `<path d="M46,26 C44,8 76,8 74,26Z" fill="${c1}" ${L(2)}/>${[14, 19, 24].map((y) => `<path d="M46,${y} L74,${y}" stroke="${c2}" stroke-width="2.4"/>`).join('')}${[50, 56, 62, 68].map((x) => `<path d="M${x},16 l3,-3 l3,3" stroke="#f4efe4" stroke-width="1.4" fill="none"/>`).join('')}<path d="M46,24 L44,40 L48,40 Z M74,24 L76,40 L72,40Z" fill="${c1}" ${L(1.6)}/><path d="M46,40 L46,48 M74,40 L74,48" stroke="${c2}" stroke-width="2"/><circle cx="60" cy="7" r="4" fill="${c2}" ${L(1.4)}/>`;

// P29 · Capataza Eulogia: soga enrollada al hombro, mano en la cintura, aguayo cruzado
export function eulogia() {
  const piel = '#b07448', ps = '#86522e';
  return `${sombraPiso}${ojota(54, piel)}${ojota(68, piel)}
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#3a2a5a', '#7a3a8a', 110, 188)}
    <path d="M41,58 C48,53 72,53 79,58 L81,114 L39,114Z" fill="#efe8da" ${L()}/>
    ${aguayo('M38,60 C50,54 70,54 82,60 L86,96 C70,104 50,104 34,96Z', 'agE')}
    ${brazo('M42,64 C30,78 28,92 40,104', '#efe8da', 11)}${mano(42, 104, piel)}
    ${brazo('M78,64 C88,76 90,90 88,104', '#efe8da', 11)}${mano(88, 106, piel)}
    <g class="soga">${[0, 1, 2].map((i) => `<ellipse cx="${84 + i}" cy="${74 + i * 2}" rx="${12 - i * 1.5}" ry="${18 - i * 2}" transform="rotate(-20 84 74)" fill="none" stroke="${O}" stroke-width="4"/><ellipse cx="${84 + i}" cy="${74 + i * 2}" rx="${12 - i * 1.5}" ry="${18 - i * 2}" transform="rotate(-20 84 74)" fill="none" stroke="#b8945a" stroke-width="2"/>`).join('')}<path d="M90,104 C96,120 92,136 98,150" stroke="${O}" stroke-width="3.6" fill="none"/><path d="M90,104 C96,120 92,136 98,150" stroke="#b8945a" stroke-width="1.8" fill="none"/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${trenzas('#1c120c', '#7a3a8a')}
    ${cara(piel, ps, { cejas: '#1c120c', arrugas: true, menton: -1, boca: 'M56,46.4 C58.5,46 61.5,46 64,46.4' })}
    ${pelos('#1c120c')}<path d="M38,20 C38,15 82,15 82,20 C82,24 38,24 38,20Z" fill="#f0ead8" ${L()}/><path d="M46,18 C44,8 50,3 60,3 C70,3 76,8 74,18Z" fill="#f0ead8" ${L()}/><path d="M45.6,12 L74.4,12" stroke="#c8362b" stroke-width="2.4"/><path d="M45.3,15 L74.7,15" stroke="#2f7d5b" stroke-width="2.2"/><g transform="translate(74 11)"><circle r="4.6" fill="#e86a9a" stroke="#2a1c15" stroke-width="1.2"/><circle r="1.8" fill="#f2c23a"/></g><path d="M52,6 C54,4.5 57,4 60,4" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>
  </g>`;
}

// P30 · Arriero Saturnino: camina con el atado en el aguayo a la espalda y el chicote en la mano
export function arrieroJ() {
  const piel = '#a86c44', ps = '#7c4e30';
  return `${sombraPiso}
  <path d="M46,120 L42,194 L56,194 L60,122Z" fill="#5a4a3a" ${L()}/><path d="M74,120 L80,192 L66,192 L60,122Z" fill="#4a3c2e" ${L()}/>
  ${ojota(50, piel)}${ojota(74, piel)}
  ${aguayo('M74,56 C96,60 104,84 100,110 C94,118 80,118 74,112Z', 'agA')}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,122 L38,122Z" fill="#8a3a2a" ${L()}/>
    <path d="M38,104 C50,110 70,110 82,104 L82,112 C70,118 50,118 38,112Z" fill="#e2a72e"/><path d="M38,108 C50,114 70,114 82,108" stroke="#2f5a8a" stroke-width="2" fill="none"/>
    <path d="M52,56 L60,70 L68,56" fill="#e2a72e" ${L(1.4)}/><path d="M56,58 L60,66 L64,58" fill="#8a3a2a"/>
    <path d="M44,60 L72,100" stroke="#5a3a22" stroke-width="3"/>
    ${brazo('M44,62 C34,76 32,90 34,104', '#8a3a2a', 11)}${mano(34, 106, piel)}
    <g class="chicote"><path d="M34,108 L22,96" stroke="#5a3a22" stroke-width="3" stroke-linecap="round"/><path d="M22,96 C12,100 8,112 14,122 C18,128 12,134 8,132" stroke="${O}" stroke-width="1.8" fill="none"/></g>
    ${brazo('M78,62 C82,72 82,78 78,82', '#8a3a2a', 11)}${mano(78, 82, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#5a524a', arrugas: true, boca: 'M56,46.4 C58.5,46.8 61.5,46.8 64,46.4', barba: '<path d="M48.5,36 C50,46 56,50.5 60,50.5 C64,50.5 70,46 71.5,36 C70,43 66,47 60,47 C54,47 50,43 48.5,36Z" fill="#6a625a" opacity=".5"/>' })}
    ${chullo('#7a3a8a', '#e2a72e')}${sombrero('#c9ae7a', '#5a3a22', 24, 12, 12)}
  </g>`;
}

// P31 · Bagualera Delfina: la caja en alto junto a la cara, canta con los ojos cerrados
export function bagualera() {
  const piel = '#b97c50', ps = '#8c5634';
  return `${sombraPiso}${ojota(54, piel)}${ojota(68, piel)}
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#8a2a3a', '#e2a72e', 110, 188)}
    <path d="M41,58 C48,53 72,53 79,58 L81,114 L39,114Z" fill="#2f5a8a" ${L()}/>${[66, 78, 90, 102].map((y) => `<path d="M42,${y} L78,${y}" stroke="#4a78a8" stroke-width="1.4"/>`).join('')}
    ${aguayo('M38,62 C46,58 52,58 56,62 L56,110 L36,110Z', 'agB')}
    ${brazo('M44,62 C36,76 36,90 42,104', '#2f5a8a', 11)}${mano(42, 106, piel)}
    <g class="maza" style="transform-origin:46px 104px"><path d="M44,104 L58,92" stroke="#7a4a2a" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="90" r="4" fill="#efe6d2" ${L(1.6)}/></g>
    ${brazo('M78,62 C90,56 96,46 94,36', '#2f5a8a', 11)}
    <g class="caja"><g transform="translate(94 30) rotate(14)"><ellipse cx="0" cy="0" rx="17" ry="17" fill="#efe4c8" ${L(2.4)}/><ellipse cx="0" cy="0" rx="12" ry="12" fill="none" stroke="#c8a77a" stroke-width="1.4"/><path d="M-17,0 L17,0" stroke="#7a4a2a" stroke-width="1.2"/>${[-12, -6, 0, 6, 12].map((x) => `<path d="M${x},14 L${x + 2},${16 + Math.abs(x) * -0.3}" stroke="#7a4a2a" stroke-width="1"/>`).join('')}${[0, 1, 2].map((i) => `<path d="M${-8 + i * 8},16 C${-10 + i * 8},28 ${-6 + i * 8},36 ${-10 + i * 8},44" stroke="${['#c8362b', '#e2a72e', '#2f7d5b'][i]}" stroke-width="2.4" fill="none"/>`).join('')}</g></g>
    ${mano(92, 40, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px"><g transform="rotate(-8 60 46)">
    ${trenzas('#20140e', '#e2a72e')}
    ${cara(piel, ps, { cejas: '#1c120c', menton: -1, boca: 'M56,44.4 C56.6,49.6 63.4,49.6 64,44.4 C61.6,45.4 58.4,45.4 56,44.4Z' })}
    <path d="M51,33 C53,34.6 56,34.6 58,33 M62,33 C64,34.6 67,34.6 69,33" stroke="${O}" stroke-width="1.8" fill="#${'c48a5c'}"/>
    ${pelos('#20140e')}${sombreroNegro(16)}<path d="M74,10 C80,6 84,8 86,12" stroke="#e2a72e" stroke-width="0" fill="none"/>
  </g></g>
  <g class="nota" fill="none" stroke="#7a1f1a" stroke-width="2" stroke-linecap="round"><path d="M22,26 C16,22 12,24 10,30"/><path d="M28,12 C20,6 14,10 12,16"/></g>`;
}

// P32 · Minero Aniceto: casco con lámpara, pico al hombro, mameluco con tierra
export function minero() {
  const piel = '#a8704a', ps = '#7c4e30';
  return `${sombraPiso}
  <path d="M46,120 L44,192 L58,192 L60,122Z" fill="#4a5a6a" ${L()}/><path d="M74,120 L76,192 L62,192 L60,122Z" fill="#3e4c5a" ${L()}/>
  ${bota(52, '#3a2a1e', 184)}${bota(70, '#3a2a1e', 184)}
  <g class="pico"><path d="M84,92 L106,10" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M84,92 L106,10" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/><path d="M86,6 C96,10 108,12 120,8 C110,16 98,18 88,14Z" fill="#8a9096" ${L(1.8)}/></g>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#4a5a6a" ${L()}/>
    <path d="M46,58 L46,90 L74,90 L74,58" fill="#3e4c5a" ${L(1.8)}/><rect x="52" y="70" width="16" height="12" fill="#4a5a6a" ${L(1.4)}/>
    ${[[50, 100], [70, 112], [56, 118], [66, 76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#8a6a46" opacity=".55"/>`).join('')}
    <path d="M38,114 L82,114 L82,120 L38,120Z" fill="#5a3a22" ${L(1.6)}/>
    ${brazo('M42,62 C34,76 32,92 34,106', '#4a5a6a', 11)}${mano(34, 108, piel)}
    ${brazo('M78,62 C88,72 92,84 88,92', '#4a5a6a', 11)}${mano(87, 92, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M56,46.4 C58.5,47.4 61.5,47.4 64,46', barba: '<path d="M50,41.6 C53,39.6 57,39.4 60,41 C63,39.4 67,39.6 70,41.6 C67,44.6 63,44 60,42.6 C57,44 53,44.6 50,41.6Z" fill="#1d1410" stroke="#2a1c15" stroke-width="1.2"/>' })}
    <ellipse cx="52" cy="38" rx="4" ry="2.4" fill="#5a4a3a" opacity=".35"/><ellipse cx="69" cy="40" rx="3" ry="2" fill="#5a4a3a" opacity=".35"/>
    <path d="M44,26 C44,8 76,8 76,26Z" fill="#e2b83a" ${L()}/><path d="M40,26 L80,26 L80,30 L40,30Z" fill="#d4a830" ${L(1.8)}/><path d="M60,10 L60,24" stroke="#c9a02a" stroke-width="2"/>
    <rect x="54" y="14" width="12" height="9" rx="2" fill="#8a9096" ${L(1.6)}/><circle cx="60" cy="18.5" r="3.4" fill="#fff6c0" ${L(1)}/>
    <g class="haz"><path d="M54,16 L22,4 L24,30 L54,22Z" fill="#fff6c0" opacity=".35"/></g>
  </g>`;
}

// P33 · Salinero Tomás: apoyado en la pala, con un bloque de sal, sombrero con cubrenuca y anteojos oscuros
export function salinero() {
  const piel = '#b06e44', ps = '#844e30';
  return `${sombraPiso}
  <path d="M46,122 L45,194 L58,194 L60,124Z" fill="#e8e4da" ${L()}/><path d="M74,122 L75,194 L62,194 L60,124Z" fill="#d8d2c4" ${L()}/>
  ${bota(52, '#5a4a3a', 186)}${bota(70, '#5a4a3a', 186)}
  <g><path d="M94,48 L98,186" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M94,48 L98,186" stroke="#8a6a46" stroke-width="3.4" stroke-linecap="round"/><path d="M88,44 L100,44" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M90,182 L106,182 L108,206 L88,206Z" fill="#a8adb2" ${L(2)}/></g>
  <g transform="translate(14 176)"><path d="M0,10 L4,0 L28,0 L32,10 L28,30 L4,30Z" fill="#f4f6f8" ${L(2)}/><path d="M4,0 L8,10 L32,10" stroke="#c9d6dc" stroke-width="1.6" fill="none"/><path d="M8,10 L6,30" stroke="#c9d6dc" stroke-width="1.4"/></g>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#6a9ac0" ${L()}/>
    <path d="M38,116 L82,116 L82,122 L38,122Z" fill="#3a2a1e" ${L(1.6)}/>
    ${brazo('M42,62 C36,76 34,90 36,104', '#6a9ac0', 11)}${mano(36, 106, piel)}
    ${brazo('M78,62 C88,60 94,56 96,50', '#6a9ac0', 11)}${mano(96, 48, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M46,24 C42,34 42,48 48,58 L72,58 C78,48 78,34 74,24Z" fill="#f1ebde" ${L(2)}/>
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M56,46 C58.5,47.4 61.5,47.4 64,45.6', barba: '<path d="M48.5,36 C50,46 56,50.5 60,50.5 C64,50.5 70,46 71.5,36 C70,43 66,47 60,47 C54,47 50,43 48.5,36Z" fill="#2a1a12" opacity=".4"/>' })}
    <path d="M49,30.5 L59,30.5 L58,36 L50,36Z M61,30.5 L71,30.5 L70,36 L62,36Z" fill="#1f2a33" ${L(1.6)}/><path d="M59,32 L61,32" stroke="${O}" stroke-width="1.6"/><path d="M51,32 l3,0" stroke="#9fd3ef" stroke-width="1.2"/>
    ${sombrero('#d9c08a', '#6a9ac0', 30, 13, 18)}
  </g>`;
}

// ───────── Vecinos de Jujuy (lote 9b) ─────────
// P34 · Tejedora Dominga: hila lana con el huso colgando y el vellón en la rueca
export function tejedora() {
  const piel = '#b57a50', ps = '#8a5634';
  return `${sombraPiso}${ojota(54, piel)}${ojota(68, piel)}
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#2f6a5a', '#e2a72e', 110, 188)}
    <path d="M41,58 C48,53 72,53 79,58 L81,114 L39,114Z" fill="#c8506a" ${L()}/>${[70, 84, 98].map((y) => `<path d="M42,${y} L78,${y}" stroke="#e2a72e" stroke-width="1.4"/>`).join('')}
    ${aguayo('M40,58 C52,64 68,64 80,58 L84,70 C68,78 52,78 36,70Z', 'agT')}
    <g><path d="M30,26 L44,110" stroke="${O}" stroke-width="4.4" stroke-linecap="round"/><path d="M30,26 L44,110" stroke="#8a6a46" stroke-width="2.2" stroke-linecap="round"/><path d="M${18},20 C${12},6 ${30},0 ${38},10 C${46},4 ${50},22 ${40},28 C${34},34 ${20},32 ${18},20Z" fill="#efe6d4" ${L(1.8)}/></g>
    ${brazo('M44,62 C36,76 36,90 42,104', '#c8506a', 11)}${mano(42, 106, piel)}
    ${brazo('M78,62 C86,72 88,84 84,92', '#c8506a', 11)}${mano(84, 94, piel)}
    <path d="M36,20 C56,40 74,70 84,96" stroke="#efe6d4" stroke-width="1.4" fill="none"/>
    <g class="huso"><path d="M86,98 L86,140" stroke="#8a6a46" stroke-width="2.4"/><ellipse cx="86" cy="128" rx="7" ry="3" fill="#a0442a" ${L(1.4)}/><path d="M84,110 C80,114 80,120 84,124 L88,124 C92,120 92,114 88,110Z" fill="#efe6d4" ${L(1.2)}/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${trenzas('#2a1810', '#c8506a')}
    ${cara(piel, ps, { cejas: '#2a1810', arrugas: true, menton: -1, boca: 'M56,45.4 C58.5,47.6 62,47.6 64.6,44.8' })}
    ${pelos('#2a1810')}${sombreroNegro(16)}
  </g>`;
}

// P35 · Pastora Juana: carga un corderito sobre los hombros, sosteniéndolo de las patas
const lana = (cx, cy, rx, ry, n = 16) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 1 : 1.16; d += (i ? ' L' : 'M') + (cx + Math.cos(a) * rx * r).toFixed(1) + ',' + (cy + Math.sin(a) * ry * r).toFixed(1); } return d + 'Z'; };
export function pastora() {
  const piel = '#a86c44', ps = '#7c4e30';
  return `${sombraPiso}${ojota(54, piel)}${ojota(68, piel)}
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#5a3a22', '#e86a3a', 110, 188)}
    <path d="M41,58 C48,53 72,53 79,58 L81,114 L39,114Z" fill="#e86a3a" ${L()}/>
    ${aguayo('M38,98 C52,104 68,104 82,98 L84,116 C68,122 52,122 36,116Z', 'agP')}
    <g class="cordero">
      <path d="${lana(60, 50, 32, 12)}" fill="#f4efe4" ${L(2)}/>${[40, 52, 64, 76].map((x) => `<path d="M${x},46 c3,-3 6,0 4,3" stroke="#d8d0c0" stroke-width="1.4" fill="none"/>`).join('')}
      <g transform="translate(24 54) rotate(20)"><path d="M6,-4 C2,-10 -4,-10 -8,-6 C-12,-2 -12,4 -8,6 C-4,8 2,8 6,4Z" fill="#f4efe4" ${L(1.8)}/><path d="M2,-6 C6,-12 10,-12 10,-8 C8,-6 6,-4 4,-4Z" fill="#e8d8c8" ${L(1.4)}/><ellipse cx="-10" cy="0" rx="2" ry="1.6" fill="#3a2a22"/><path d="M-4,-2 C-2,-1 0,-1 1,-2" stroke="${O}" stroke-width="1.4" fill="none"/></g>
      ${[[40, 60, 36, 72], [46, 60, 44, 72], [74, 60, 76, 72], [80, 60, 84, 70]].map(([x1, y1, x2, y2]) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M${x1},${y1} L${x2},${y2}" stroke="#f4efe4" stroke-width="2.6" stroke-linecap="round"/><path d="M${x2 - 1},${y2} l2,3" stroke="#3a2a22" stroke-width="2.6" stroke-linecap="round"/>`).join('')}
      <path d="M92,50 C98,48 100,44 98,40" stroke="${O}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M92,50 C98,48 100,44 98,40" stroke="#f4efe4" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    </g>
    ${brazo('M44,64 C34,72 34,80 40,74', '#e86a3a', 10)}${mano(40, 72, piel)}
    ${brazo('M76,64 C86,72 86,80 80,74', '#e86a3a', 10)}${mano(80, 72, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${trenzas('#1c120c', '#2f7d5b')}
    ${cara(piel, ps, { cejas: '#1c120c', menton: -1, boca: 'M56,45.4 C58.5,47.6 62,47.6 64.6,44.8' })}
    ${pelos('#1c120c')}
    <path d="M44,22 C44,10 76,10 76,22 C70,18 50,18 44,22Z" fill="#efe6d4" ${L(2)}/><path d="M40,22 C40,18 80,18 80,22 C80,26 40,26 40,22Z" fill="#efe6d4" ${L(2)}/><path d="M46,18 L74,18" stroke="#2f7d5b" stroke-width="2.6"/>${[48, 56, 64, 72].map((x) => `<circle cx="${x}" cy="18" r="1.4" fill="#e2a72e"/>`).join('')}
  </g>`;
}

// P36 · Andinista Lucía: mochila grande, piqueta en alto señalando la cumbre
export function andinista() {
  const piel = '#d09a6a', ps = '#a06a44';
  return `${sombraPiso}
  <path d="M46,122 L44,194 L58,194 L60,124Z" fill="#3a4a5a" ${L()}/><path d="M74,122 L80,186 L66,188 L60,124Z" fill="#2e3c4a" ${L()}/>
  <path d="M42,182 L58,182 L58,206 L38,206 C36,206 36,198 42,196Z" fill="#c8362b" ${L()}/><path d="M38,206 L58,206" stroke="${O}" stroke-width="3"/><path d="M66,176 L82,174 L86,196 L66,200Z" fill="#c8362b" ${L()}/><path d="M64,200 L88,196" stroke="${O}" stroke-width="3"/>
  <path d="M66,54 C92,52 100,64 100,84 L100,118 C100,124 92,126 84,124 L70,122Z" fill="#2f6a8a" ${L()}/><path d="M74,70 L98,70 M74,96 L98,96" stroke="#24546e" stroke-width="2"/><ellipse cx="86" cy="54" rx="14" ry="7" fill="#e2a72e" ${L(1.8)}/>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#e86a2a" ${L()}/><path d="M60,58 L60,122" stroke="${O}" stroke-width="1.6"/><path d="M38,92 L82,92" stroke="#c4541e" stroke-width="2"/>
    <path d="M46,58 L50,120 M74,58 L70,120" stroke="#2a2a2a" stroke-width="3"/>
    ${brazo('M42,62 C34,74 32,88 36,100', '#e86a2a', 11)}${mano(36, 102, piel)}
    ${brazo('M78,62 C88,52 94,40 96,30', '#e86a2a', 11)}
    <g><path d="M98,26 L100,74" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M98,26 L100,74" stroke="#a8adb2" stroke-width="2.6" stroke-linecap="round"/><path d="M88,22 C94,18 104,18 112,24 L110,28 C104,24 96,24 90,26Z" fill="#6a6e72" ${L(1.6)}/></g>${mano(97, 30, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M68,40 C76,44 78,56 74,64 C70,60 68,50 66,46Z" fill="#7a4a2a" ${L(1.6)}/>
    ${cara(piel, ps, { cejas: '#5a3a22', menton: -1, boca: 'M56,45 C58.5,48 62,48 64.6,44.6' })}
    ${pelos('#7a4a2a')}
    <path d="M46,24 C44,12 76,12 74,24Z" fill="#2f6a8a" ${L(2)}/><path d="M46,22 L74,22" stroke="#e2a72e" stroke-width="3"/>
    <path d="M47,20 L57,20 L56,25 L48,25Z M63,20 L73,20 L72,25 L64,25Z" fill="#1f2a33" ${L(1.4)}/><path d="M57,21.5 L63,21.5" stroke="${O}" stroke-width="1.4"/>
  </g>`;
}

// P37 · Don Fidel: viejo de las yungas que planta flores para los picaflores; regadera y maceta de salvia
export function fidel() {
  const piel = '#a86c44', ps = '#7c4e30';
  return `${sombraPiso}
  <path d="M46,122 L45,194 L58,194 L60,124Z" fill="#6a6a4a" ${L()}/><path d="M74,122 L75,194 L62,194 L60,124Z" fill="#5a5a3e" ${L()}/>
  ${[52, 70].map((x) => `<path d="M${x - 9},196 L${x + 7},196 L${x + 9},206 L${x - 12},206 C${x - 15},206 ${x - 14},200 ${x - 9},196Z" fill="#2a2422" ${L(2)}/>`).join('')}
  <g class="picaflor"><g transform="translate(100 46)"><path d="M-2,0 C-2,-5 6,-6 8,-2 C10,2 4,5 0,4Z" fill="#2f9a6a" ${L(1.2)}/><path d="M-2,0 L-14,2" stroke="${O}" stroke-width="1.4"/><path d="M2,-2 C0,-10 4,-14 8,-14 C8,-8 6,-4 4,-2Z" fill="#6a7a4a" ${L(1)}/><path d="M8,0 L14,4" stroke="${O}" stroke-width="2"/></g></g>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#e8e0cc" ${L()}/><path d="M52,56 L60,70 L68,56" fill="${piel}" ${L(1.4)}/>
    <path d="M40,58 L38,124 L50,124 L53,64Z M80,58 L82,124 L70,124 L67,64Z" fill="#4f7a3a" ${L(2)}/>
    <path d="M38,116 L82,116 L82,122 L38,122Z" fill="#3a2a1e" ${L(1.6)}/>
    ${brazo('M42,62 C34,76 30,90 30,104', '#4f7a3a', 11)}${mano(30, 106, piel)}
    <g transform="translate(10 106)"><path d="M6,4 L26,4 L24,22 L8,22Z" fill="#8a9096" ${L(2)}/><path d="M26,8 L38,0 L40,4 L28,14Z" fill="#8a9096" ${L(1.6)}/><path d="M8,4 C10,-6 22,-6 24,4" stroke="${O}" stroke-width="2.4" fill="none"/><g class="agua">${[0, 1, 2].map((i) => `<circle cx="${42 + i * 2}" cy="${8 + i * 6}" r="1.6" fill="#9fd3ef"/>`).join('')}</g></g>
    ${brazo('M78,62 C88,72 92,84 88,94', '#4f7a3a', 11)}
    <g transform="translate(90 100)"><path d="M-8,0 L8,0 L6,14 L-6,14Z" fill="#b4583a" ${L(1.6)}/>${[-4, 0, 4].map((x, i) => `<path d="M${x},0 C${x - 2},-10 ${x + 2},-18 ${x},-26" stroke="#4f8a2e" stroke-width="2" fill="none"/>${[0, 1, 2].map((j) => `<ellipse cx="${x + (j % 2 ? 2 : -2)}" cy="${-12 - j * 5}" rx="2" ry="3.4" fill="#c8362b" ${L(.8)}/>`).join('')}`).join('')}</g>
    ${mano(88, 98, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#d4d0c8', arrugas: true, boca: 'M55.6,45.4 C58,48.4 62,48.4 64.4,45.4', barba: '<path d="M50,41.6 C53,39.6 57,39.4 60,41 C63,39.4 67,39.6 70,41.6 C67,44.6 63,44 60,42.6 C57,44 53,44.6 50,41.6Z" fill="#e8e4dc" stroke="#2a1c15" stroke-width="1.2"/>' })}
    ${pelo('#d4d0c8')}
    ${sombrero('#d9c08a', '#4f7a3a', 26, 12, 18)}<path d="M36,18 L33,22 M44,20 L42,25 M76,20 L78,25 M84,18 L87,22" stroke="#a88a52" stroke-width="1.2"/>
  </g>`;
}
