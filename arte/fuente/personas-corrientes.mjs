// Gente de Corrientes en proporción adulta (lote 6a): capataz y domadores. viewBox 0 0 120 220, piso y=212.
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano, bota, sombrero } from './personas-salta.mjs';

const brazo = (d, col, w = 10) => `<path d="${d}" stroke="${O}" stroke-width="${w + 4.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const alpargata = (x, c) => `<path d="M${x - 9},198 L${x + 7},198 L${x + 9},206 L${x - 12},206 C${x - 15},206 ${x - 14},200 ${x - 9},198Z" fill="${c}" ${L(2)}/><path d="M${x - 13},206 L${x + 9},206" stroke="#e8dcc0" stroke-width="2"/>`;
const bombacha = (c, s, y0 = 122, y1 = 192) => `<path d="M44,${y0} C38,${y0 + 26} 38,${y1 - 20} 44,${y1} L58,${y1} L60,${y0 + 2}Z" fill="${c}" ${L()}/><path d="M76,${y0} C82,${y0 + 26} 82,${y1 - 20} 76,${y1} L62,${y1} L60,${y0 + 2}Z" fill="${s}" ${L()}/><path d="M46,${y0 + 20} C44,${y0 + 36} 45,${y1 - 22} 48,${y1 - 6} M74,${y0 + 20} C76,${y0 + 36} 75,${y1 - 22} 72,${y1 - 6}" stroke="${O}" stroke-width="1" opacity=".35" fill="none"/>`;
const cuello = (piel) => `<path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>`;
const pelo = (c) => `<path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="${c}"/>`;

// P20 · Capataz Rosendo: firme junto al remo de la canoa, mano en la faja
export function rosendo() {
  const piel = '#b87a50', ps = '#8a5636';
  return `${sombraPiso}
  <g><path d="M96,28 L98,176" stroke="${O}" stroke-width="6.6" stroke-linecap="round"/><path d="M96,28 L98,176" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M98,168 C90,176 90,196 98,208 C106,196 106,176 98,168Z" fill="#a06a3a" ${L(2.2)}/><path d="M98,174 L98,204" stroke="#7a4a26" stroke-width="1.4"/><path d="M92,28 L100,28" stroke="${O}" stroke-width="5" stroke-linecap="round"/></g>
  ${bombacha('#2a2522', '#1f1b19')}
  ${bota(52, '#3a2418', 184)}${bota(70, '#3a2418', 184)}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M38,58 C46,52 74,52 82,58 L83,124 L37,124Z" fill="#f1ebde" ${L()}/>
    <path d="M38,58 L37,124 L50,124 L52,64Z M82,58 L83,124 L70,124 L68,64Z" fill="#2c2826" ${L(2)}/>
    <path d="M36,108 L84,108 L84,122 L36,122Z" fill="#a8322a" ${L(1.8)}/><path d="M36,113 L84,113 M36,117 L84,117" stroke="#7a1f1a" stroke-width="1"/>
    <path d="M49,54 C53,62 67,62 71,54 L68,52 C65,57 55,57 52,52Z" fill="#2f5a3a" ${L(1.6)}/><path d="M58,60 L55,70 L60,66 L64,71 L62,60Z" fill="#2f5a3a" ${L(1.3)}/>
    ${brazo('M42,62 C30,74 26,86 30,98 L40,110', '#f1ebde', 11)}${mano(41, 108, piel)}
    ${brazo('M78,62 C86,72 92,82 94,94', '#f1ebde', 11)}${mano(95, 96, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#3a2e28', arrugas: true, menton: 1, boca: 'M56,47 C58.5,47.4 61.5,47.4 64,47', barba: '<path d="M50,42 C53,39.6 57,39.6 60,41.4 C63,39.6 67,39.6 70,42 C68,45.6 63,45 60,43.4 C57,45 52,45.6 50,42Z" fill="#5a524c" stroke="#2a1c15" stroke-width="1.2"/><path d="M48,28 L48,38 M72,28 L72,38" stroke="#8a8480" stroke-width="3"/>' })}
    ${pelo('#3a332e')}
    <path d="M52,44 C50,36 46,30 44,22 M68,44 C70,36 74,30 76,22" stroke="#3a2a1a" stroke-width="1.4" fill="none"/><path d="M28,21 C28,15 46,12 60,8 C74,12 92,15 92,21 C92,26 28,26 28,21Z" fill="#cdb48a" ${L()}/><path d="M47,19 C46,9 50,3 60,3 C70,3 74,9 73,19Z" fill="#cdb48a" ${L()}/><path d="M56,4 C58,6.5 62,6.5 64,4" stroke="#a8905e" stroke-width="1.6" fill="none"/><path d="M47,14 L73,14" stroke="#2a1c15" stroke-width="3.4"/><path d="M34,22 C46,18 74,18 86,22" stroke="#e2cfa6" stroke-width="1.6" fill="none"/>
  </g>`;
}

// P21 · Pescador Ramón: caña al hombro y canasto de mimbre
export function pescador() {
  const piel = '#b9784a', ps = '#8c5634';
  return `${sombraPiso}
  <path d="M46,122 L44,166 L58,166 L60,124Z" fill="#9a8a62" ${L()}/><path d="M74,122 L76,166 L62,166 L60,124Z" fill="#8a7a54" ${L()}/>
  <path d="M43,160 L59,160 L59,168 L43,168Z M77,160 L61,160 L61,168 L77,168Z" fill="#b3a274" ${L(1.8)}/>
  <path d="M47,168 L48,200 L56,200 L56,168Z M73,168 L72,200 L64,200 L64,168Z" fill="${piel}" ${L(2)}/>
  <path d="M44,200 C44,196 56,196 58,200 L58,206 L42,206 C40,206 41,201 44,200Z M76,200 C76,196 64,196 62,200 L62,206 L78,206 C80,206 79,201 76,200Z" fill="${piel}" ${L(2)}/>
  <g class="cania"><path d="M84,84 L116,6" stroke="${O}" stroke-width="4.4" stroke-linecap="round"/><path d="M84,84 L116,6" stroke="#c9a86a" stroke-width="2.2" stroke-linecap="round"/><path d="M116,6 C118,30 116,50 112,64" stroke="#5a5a5a" stroke-width="1" fill="none"/><path d="M112,64 c-2,3 0,6 3,5" stroke="#7a7a7a" stroke-width="1.4" fill="none"/></g>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#9cc0d4" ${L()}/>
    <path d="M52,56 L60,72 L68,56" fill="${piel}" ${L(1.6)}/><path d="M60,72 L60,122" stroke="#7aa0b6" stroke-width="1.6"/>${[84, 98, 112].map((y) => `<circle cx="62.5" cy="${y}" r="1.4" fill="#e8eef2"/>`).join('')}
    <path d="M38,116 L82,116 L82,122 L38,122Z" fill="#5a3a24" ${L(1.6)}/>
    ${brazo('M42,62 C38,76 36,88 36,100', '#9cc0d4', 11)}${brazo('M36,100 L34,116', piel, 7)}
    <g transform="translate(14 112)"><path d="M4,10 C4,4 30,4 30,10 L28,34 C26,38 8,38 6,34Z" fill="#c9a060" ${L(2.2)}/>${[16, 22, 28].map((y) => `<path d="M6,${y} C14,${y + 2} 22,${y + 2} 29,${y}" stroke="#9a7438" stroke-width="1.4" fill="none"/>`).join('')}${[10, 16, 22].map((x) => `<path d="M${x},10 L${x},35" stroke="#9a7438" stroke-width="1" fill="none"/>`).join('')}<path d="M8,10 C10,-4 24,-4 26,10" stroke="${O}" stroke-width="3.4" fill="none"/><path d="M8,10 C10,-4 24,-4 26,10" stroke="#c9a060" stroke-width="1.6" fill="none"/><path d="M12,8 C16,2 22,4 24,9" fill="#b4bcc0" ${L(1.4)}/></g>
    ${mano(33, 114, piel)}
    ${brazo('M78,62 C88,70 90,78 86,84', '#9cc0d4', 11)}${mano(84, 86, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#5a524a', arrugas: true, boca: 'M55.5,45.6 C58,48.4 62,48.4 64.5,45.6', barba: '<path d="M48.5,36 C50,46 56,50.5 60,50.5 C64,50.5 70,46 71.5,36 C70,43 66,47 60,47 C54,47 50,43 48.5,36Z" fill="#8a8480" opacity=".55"/>' })}
    ${pelo('#6a625a')}
    ${sombrero('#d9c08a', '#8a6a3a', 26, 12, 18)}<path d="M36,18 L33,22 M44,20 L42,25 M76,20 L78,25 M84,18 L87,22" stroke="#a88a52" stroke-width="1.2"/>
  </g>`;
}

// P22 · Guía Aníbal: señala el camino por el estero, largavista al pecho
export function guia() {
  const piel = '#c48a5c', ps = '#96603c';
  return `${sombraPiso}
  ${bombacha('#a89468', '#968256', 122, 176)}
  <path d="M42,168 L58,168 L58,198 L60,206 L40,206 C38,206 38,200 42,198Z M78,168 L62,168 L62,198 L60,206 L80,206 C82,206 82,200 78,198Z" fill="#2e3a2a" ${L()}/><path d="M42,172 L58,172 M62,172 L78,172" stroke="#4a5a42" stroke-width="2"/>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#6b7a3e" ${L()}/>
    <path d="M44,70 L56,70 L56,82 L44,82Z M64,70 L76,70 L76,82 L64,82Z" fill="#5c6a34" ${L(1.4)}/>
    <path d="M38,114 L82,114 L82,122 L38,122Z" fill="#4a3220" ${L(1.6)}/><rect x="56" y="113" width="8" height="10" rx="1.5" fill="#b8a070" ${L(1.2)}/>
    <path d="M36,116 L28,150 L34,152 L42,120Z" fill="#5a3a22" ${L(1.8)}/><path d="M30,146 L26,164" stroke="#c9ced2" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M50,56 C52,72 56,84 60,90 C64,84 68,72 70,56" stroke="#3a2a1e" stroke-width="1.6" fill="none"/>
    <g transform="translate(60 92)"><rect x="-10" y="-5" width="9" height="12" rx="2.5" fill="#2a2a2a" ${L(1.6)}/><rect x="1" y="-5" width="9" height="12" rx="2.5" fill="#2a2a2a" ${L(1.6)}/><circle cx="-5.5" cy="6" r="2.6" fill="#7aa8c0"/><circle cx="5.5" cy="6" r="2.6" fill="#7aa8c0"/></g>
    ${brazo('M42,62 C36,78 36,94 40,106', '#6b7a3e', 11)}${mano(41, 108, piel)}
    ${brazo('M78,62 C90,58 102,54 108,52', '#6b7a3e', 11)}
    <g transform="translate(112 51)"><path d="M-4,-4 C2,-6 6,-4 6,0 C6,4 2,5 -4,4Z" fill="${piel}" ${L(1.6)}/><path d="M5,-2 L14,-3" stroke="${O}" stroke-width="4" stroke-linecap="round"/><path d="M5,-2 L14,-3" stroke="${piel}" stroke-width="2" stroke-linecap="round"/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <g transform="rotate(8 60 34)">
    ${cara(piel, ps, { cejas: '#2a1a12', boca: 'M56,46 C58.5,47.6 61.5,47.6 64.4,45.6', barba: '<path d="M48.5,36 C50,47 56,51 60,51 C64,51 70,47 71.5,36 C70,44 66,48 60,48 C54,48 50,44 48.5,36Z" fill="#3a2618"/><path d="M53,43 C56,41.6 64,41.6 67,43" stroke="#3a2618" stroke-width="2.2" fill="none"/>' })}
    ${pelo('#2a1a12')}
    ${sombrero('#b8a070', '#5c6a34', 26, 12, 18)}<path d="M48,20 C46,32 50,46 58,52" stroke="#4a3220" stroke-width="1.2" fill="none"/>
    </g>
  </g>`;
}

// P23 · Acordeonista Tito: toca el acordeón con la cabeza para atrás, larga el sapucai
export function acordeonista() {
  const piel = '#c08458', ps = '#93603e';
  return `${sombraPiso}
  ${bombacha('#7a746a', '#6a645a', 122, 194)}
  ${alpargata(52, '#2a2422')}
  <g class="pie"><path d="M62,194 L76,194 L80,200 C82,204 76,206 72,204 L64,202Z" fill="#2a2422" ${L(2)}/></g>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,124 L38,124Z" fill="#f1ebde" ${L()}/>
    <path d="M38,116 L82,116 L82,124 L38,124Z" fill="#1f1b19" ${L(1.6)}/>
    <path d="M48,54 C52,62 68,62 72,54 L69,52 C66,57 54,57 51,52Z" fill="#b3261e" ${L(1.6)}/><path d="M58,60 L55,70 L60,66 L64,71 L62,60Z" fill="#b3261e" ${L(1.3)}/>
    ${brazo('M42,62 C32,74 28,88 32,98', '#f1ebde', 11)}${brazo('M78,62 C88,74 92,86 88,96', '#f1ebde', 11)}
    <g class="fuelle">
      <path d="M30,80 L46,80 L46,116 L30,116Z" fill="#7a1f1a" ${L(2.2)}/>${[84, 90, 96, 102, 108].map((y) => `<circle cx="38" cy="${y}" r="1.8" fill="#efe6d2"/>`).join('')}
      <path d="M46,82 L74,82 L74,114 L46,114Z" fill="#2a2422" ${L(2.2)}/>${[50, 55, 60, 65, 70].map((x) => `<path d="M${x},82 L${x + 2.5},98 L${x},114" stroke="#c9b48a" stroke-width="1.6" fill="none"/>`).join('')}
      <path d="M74,78 L92,78 L92,118 L74,118Z" fill="#7a1f1a" ${L(2.2)}/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${80 + (i % 2) * 6}" cy="${84 + Math.floor(i / 2) * 10 + (i % 2) * 5}" r="2.2" fill="#efe6d2" ${L(1)}/>`).join('')}
      <path d="M74,78 L92,78 L92,82 L74,82Z" fill="#c9a84a"/></g>
    ${mano(30, 98, piel)}${mano(90, 96, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <g transform="rotate(-10 60 46)">
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M55.5,44 C56,49.4 64,49.4 64.5,44 C61.5,45 58.5,45 55.5,44Z', barba: '<path d="M51,41.4 C54,39.4 57,39.6 60,41 C63,39.6 66,39.4 69,41.4 C67,43 63,43 60,42.4 C57,43 53,43 51,41.4Z" fill="#1d1410"/>' })}
    ${pelo('#1d1410')}
    <g transform="translate(0 -3) rotate(-8 60 18)">${sombrero('#3a2e26', '#b3261e', 27, 13, 18)}</g>
    </g>
  </g>
  <g class="nota" fill="none" stroke="#7a1f1a" stroke-width="2" stroke-linecap="round"><path d="M86,22 C92,18 96,20 98,26"/><path d="M92,10 C100,4 106,8 108,14"/></g>`;
}

// P24 · Peona Ramona: mate en la mano, termo bajo el brazo, trenza larga
export function peona() {
  const piel = '#c9905e', ps = '#9c643e';
  return `${sombraPiso}
  ${bombacha('#c4b08a', '#b39e78', 122, 186)}
  ${bota(52, '#5a3a22', 186)}${bota(70, '#5a3a22', 186)}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M41,58 C48,53 72,53 79,58 L81,124 L39,124Z" fill="#b8423a" ${L()}/>
    <g opacity=".55">${[64, 76, 88, 100, 112].map((y) => `<path d="M40,${y} L80,${y}" stroke="#2f5a3a" stroke-width="2.4"/>`).join('')}${[46, 54, 62, 70, 78].map((x) => `<path d="M${x},58 L${x},122" stroke="#2f5a3a" stroke-width="2.4"/>`).join('')}</g>
    <path d="M41,58 C48,53 72,53 79,58 L81,124 L39,124Z" fill="none" ${L()}/>
    <path d="M38,114 L82,114 L82,122 L38,122Z" fill="#5a3a24" ${L(1.6)}/>
    <path d="M50,54 C53,61 67,61 70,54 L67,52 C64,57 56,57 53,52Z" fill="#8ab8d4" ${L(1.6)}/>
    <g transform="translate(26 78) rotate(-14)"><rect x="0" y="0" width="12" height="40" rx="4" fill="#3a5a8a" ${L(2)}/><rect x="1" y="-6" width="10" height="7" rx="2" fill="#2a2a2a" ${L(1.6)}/><path d="M2,12 L10,12" stroke="#c9ced2" stroke-width="2"/></g>
    ${brazo('M42,62 C34,72 32,82 38,92 L48,96', '#b8423a', 11)}${brazo('M48,96 L52,98', piel, 7)}${mano(52, 98, piel)}
    ${brazo('M78,62 C86,72 86,84 80,90', '#b8423a', 11)}${brazo('M80,90 L74,92', piel, 7)}
    <g transform="translate(72 82)"><path d="M-7,0 C-9,8 -6,14 0,14 C6,14 9,8 7,0Z" fill="#8a5a32" ${L(1.8)}/><path d="M-7,0 L7,0" stroke="#c9a84a" stroke-width="2.4"/><path d="M2,0 L6,-12" stroke="#c9ced2" stroke-width="2" stroke-linecap="round"/><path d="M-5,-1 C-3,-4 3,-4 5,-1" fill="#4f8a2e"/></g>
    ${mano(76, 92, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M68,40 C76,48 76,62 72,76 C70,84 72,92 70,98 L64,98 C66,90 64,82 66,74 C68,62 68,52 64,46Z" fill="#2a1810" ${L(2)}/>${[58, 66, 74, 82, 90].map((y) => `<path d="M${66},${y} C${69},${y + 2} ${71},${y + 1} ${73},${y - 1}" stroke="#4a2e1e" stroke-width="1.2" fill="none"/>`).join('')}<path d="M64,98 L70,98 L69,102 L65,102Z" fill="#8ab8d4" ${L(1.2)}/>
    ${cara(piel, ps, { cejas: '#1c120c', menton: -1, boca: 'M56,45.4 C58.5,47.6 62,47.6 64.6,44.6' })}
    <path d="M47.5,31 C45,18 52,13 61,13 C70,13 76,19 72.5,31 C70,23 66,19 60,20 C55,20 50,23 47.5,31Z" fill="#2a1810" ${L(2)}/>
    <path d="M50,24 C48,34 50,46 56,54 M70,24 C72,34 70,46 64,54" stroke="#7a5a3a" stroke-width="1.2" fill="none"/>
  </g>`;
}

// ───────── Vecinos de Corrientes (lote 6b) ─────────
const pelos = (c) => `<path d="M47.5,31 C45,18 52,13 61,13 C70,13 76,19 72.5,31 C70,23 66,19 60,20 C55,20 50,23 47.5,31Z" fill="${c}" ${L(2)}/>`;
const pollera = (c, s, y0 = 112, y1 = 186) => `<path d="M40,${y0} C34,${y0 + 26} 30,${y1 - 26} 28,${y1} C48,${y1 + 6} 72,${y1 + 6} 92,${y1} C90,${y1 - 26} 86,${y0 + 26} 80,${y0}Z" fill="${c}" ${L()}/><path d="M30,${y1 - 10} C48,${y1 - 4} 72,${y1 - 4} 90,${y1 - 10}" stroke="${s}" stroke-width="3" fill="none"/>`;
const piernasF = (piel, zap) => `<path d="M52,186 L52,198 L58,198 L58,186Z M68,186 L68,198 L62,198 L62,186Z" fill="${piel}" ${L(2)}/><path d="M46,198 L58,198 L58,206 L44,206 C42,206 42,201 46,200Z M74,198 L62,198 L62,206 L76,206 C78,206 78,201 74,200Z" fill="${zap}" ${L(2)}/>`;

// P25 · Doña Pocha: canasta de chipá en la cadera, la otra mano saludando
export function pocha() {
  const piel = '#c08a5e', ps = '#946040';
  return `${sombraPiso}${piernasF(piel, '#3a2a22')}
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#3a6a8a', '#2a4a62', 110, 188)}
    <path d="M44,112 C42,140 44,166 48,184 L72,184 C76,166 78,140 76,112Z" fill="#f1ebde" ${L(2)}/>${[[52, 130], [66, 144], [56, 160], [68, 124], [60, 174]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#d9694a"/><circle cx="${x + 3}" cy="${y + 2}" r="1.4" fill="#4f8a2e"/>`).join('')}
    <path d="M40,60 C46,54 74,54 80,60 C84,80 84,100 80,114 L40,114 C36,100 36,80 40,60Z" fill="#e7d9a8" ${L()}/>
    <path d="M50,56 C53,63 67,63 70,56" stroke="#c9b47a" stroke-width="2" fill="none"/>
    ${brazo('M42,64 C32,76 28,90 30,104', '#e7d9a8', 11)}${brazo('M30,104 L36,116', piel, 7)}
    <g transform="translate(10 106)"><path d="M2,6 C2,2 40,2 40,6 L36,24 C34,28 8,28 6,24Z" fill="#c9a060" ${L(2.2)}/>${[10, 16].map((y) => `<path d="M4,${y} C16,${y + 2} 28,${y + 2} 38,${y}" stroke="#9a7438" stroke-width="1.4" fill="none"/>`).join('')}${[8, 16, 24, 32].map((x) => `<ellipse cx="${x}" cy="3" rx="5" ry="4" fill="#e6b45a" ${L(1.4)}/>`).join('')}<path d="M2,4 C14,-4 28,-4 40,4" fill="none" stroke="#f1ebde" stroke-width="2"/></g>
    ${mano(36, 116, piel)}
    <g class="saluda" style="transform-origin:78px 62px">${brazo('M78,64 C88,56 94,44 94,32', '#e7d9a8', 11)}<path d="M89,32 C88,22 90,16 94,16 C98,16 100,22 99,32Z" fill="${piel}" ${L(1.8)}/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#6a625a', arrugas: true, menton: -1, boca: 'M55.5,45 C58,48.6 62,48.6 64.5,45' })}
    ${pelos('#8a847c')}<circle cx="60" cy="11" r="7" fill="#8a847c" ${L(2)}/><path d="M55,10 C58,8 62,8 65,10" stroke="#6a645c" stroke-width="1.2" fill="none"/>
    <path d="M48,37 C46,38 46,40 48,41" stroke="#c9a84a" stroke-width="1.6" fill="none"/><circle cx="46.5" cy="40" r="1.4" fill="#e2b83a"/><circle cx="73.5" cy="40" r="1.4" fill="#e2b83a"/>
  </g>`;
}

// P26 · Canoero Eusebio: remienda la red estirada entre las manos
export function canoero() {
  const piel = '#a86e44', ps = '#7c4e30';
  return `${sombraPiso}
  <path d="M46,122 L44,170 L58,170 L60,124Z" fill="#3a4a5a" ${L()}/><path d="M74,122 L76,170 L62,170 L60,124Z" fill="#2e3c4a" ${L()}/>
  <path d="M43,164 L59,164 L59,172 L43,172Z M77,164 L61,164 L61,172 L77,172Z" fill="#4a5a6a" ${L(1.8)}/>
  <path d="M47,172 L48,200 L56,200 L56,172Z M73,172 L72,200 L64,200 L64,172Z" fill="${piel}" ${L(2)}/>${alpargata(52, '#5a4a3a')}${alpargata(70, '#5a4a3a')}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M42,58 C48,54 72,54 78,58 L81,124 L39,124Z" fill="#e9e4d8" ${L()}/>
    <path d="M48,56 C52,66 68,66 72,56" fill="${piel}" ${L(1.6)}/>
    <path d="M38,116 L82,116 L82,122 L38,122Z" fill="#3a2a1e" ${L(1.6)}/>
    ${brazo('M44,62 C36,74 32,86 32,96', piel, 10)}${brazo('M76,62 C84,74 88,86 88,96', piel, 10)}
    <g class="red"><path d="M30,94 C40,104 50,108 60,108 C70,108 80,104 90,94 L94,150 C80,160 40,160 26,150Z" fill="#c9b48a" fill-opacity=".2" stroke="#8a7a5a" stroke-width="1.2"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<path d="M${30 + i * 10},${94 + Math.abs(3 - i) * -3 + 10} L${28 + i * 11},154" stroke="#8a7a5a" stroke-width="1.2"/>`).join('')}${[110, 122, 134, 146].map((y) => `<path d="M28,${y} C48,${y + 6} 72,${y + 6} 92,${y}" stroke="#8a7a5a" stroke-width="1.2" fill="none"/>`).join('')}
      <path d="M52,128 L64,118 L70,132" stroke="#3a6a8a" stroke-width="1.6" fill="none"/>${[[36, 150], [48, 156], [72, 156], [86, 150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.6" fill="#d9c08a" ${L(1.2)}/>`).join('')}</g>
    ${mano(32, 98, piel)}${mano(88, 98, piel)}<path d="M88,98 L94,90" stroke="#c9ced2" stroke-width="2" stroke-linecap="round"/>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#2a1a12', arrugas: true, boca: 'M56,46.4 C58.5,46.8 61.5,46.8 64,46.4', barba: '<path d="M48.5,36 C50,46 56,50.5 60,50.5 C64,50.5 70,46 71.5,36 C70,43 66,47 60,47 C54,47 50,43 48.5,36Z" fill="#2a1a12" opacity=".45"/><path d="M52,42 C55,40 65,40 68,42" stroke="#2a1a12" stroke-width="2.4" fill="none"/>' })}
    <path d="M46,24 C46,14 74,14 74,24 C70,20 50,20 46,24Z" fill="#2a3a4a" ${L(2)}/><path d="M44,22 C46,12 74,10 78,20 C80,24 74,24 72,22 C64,18 54,18 46,24Z" fill="#2a3a4a" ${L(2)}/><circle cx="62" cy="11" r="2" fill="#2a3a4a" ${L(1.2)}/>
  </g>`;
}

// P27 · Guardaparque Sol: anota el censo de ciervos en la libreta
export function guardaparque() {
  const piel = '#c9905e', ps = '#9c643e';
  return `${sombraPiso}
  <path d="M46,122 L45,194 L58,194 L60,124Z" fill="#6a5a3a" ${L()}/><path d="M74,122 L75,194 L62,194 L60,124Z" fill="#5a4a2e" ${L()}/>
  ${bota(52, '#3a2a1e', 184)}${bota(70, '#3a2a1e', 184)}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M42,58 C48,53 72,53 78,58 L80,124 L40,124Z" fill="#b8a478" ${L()}/>
    <path d="M44,70 L56,70 L56,80 L44,80Z M64,70 L76,70 L76,80 L64,80Z" fill="#a8946a" ${L(1.4)}/>
    <g transform="translate(40 66)"><path d="M-4,0 L6,0 L6,10 C6,14 1,16 1,16 C1,16 -4,14 -4,10Z" fill="#3f6a2a" ${L(1.4)}/><path d="M1,3 L-1,9 L3,9Z" fill="#e8d8a0"/></g>
    <path d="M38,116 L82,116 L82,122 L38,122Z" fill="#4a3220" ${L(1.6)}/>
    <path d="M50,54 C53,61 67,61 70,54 L67,52 C64,57 56,57 53,52Z" fill="#3f6a2a" ${L(1.6)}/>
    ${brazo('M44,62 C36,74 36,86 44,94', '#b8a478', 11)}${brazo('M44,94 L54,96', piel, 7)}
    <g transform="translate(56 88) rotate(-12)"><rect x="-8" y="-6" width="22" height="18" rx="1.5" fill="#efe6d2" ${L(1.8)}/><path d="M-8,-6 L-8,12" stroke="#6a4a2a" stroke-width="3"/>${[0, 4, 8].map((y) => `<path d="M-3,${y - 1} L${10 - y},${y - 1}" stroke="#8a7a62" stroke-width="1"/>`).join('')}</g>
    ${mano(54, 98, piel)}
    ${brazo('M76,62 C84,72 82,84 74,90', '#b8a478', 11)}<g class="lapiz"><path d="M70,90 L60,80" stroke="#e2b83a" stroke-width="2.6" stroke-linecap="round"/><path d="M60,80 L58,78" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/>${mano(72, 92, piel)}</g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M66,40 C74,40 78,46 76,52 C74,56 68,54 66,50Z" fill="#3a2214" ${L(1.8)}/>
    <g transform="rotate(6 60 40)">${cara(piel, ps, { cejas: '#2a1810', menton: -1, boca: 'M56,45.6 C58.5,46.4 61.5,46.4 64,45.6' })}</g>
    ${pelos('#3a2214')}
    <path d="M30,19 C30,15 90,15 90,19 C90,23 30,23 30,19Z" fill="#8a7448" ${L()}/><path d="M46,18 C46,4 52,2 60,6 C68,2 74,4 74,18Z" fill="#8a7448" ${L()}/><path d="M46,14 L74,14" stroke="#3f6a2a" stroke-width="3"/><path d="M54,6 C57,9 63,9 66,6" stroke="#6a5a34" stroke-width="1.6" fill="none"/>
  </g>`;
}

// P28 · Mielera Ña Elena: ahumador en una mano, frasco de miel en la otra, velo levantado
export function mielera() {
  const piel = '#c48a5c', ps = '#96603c';
  return `${sombraPiso}${piernasF(piel, '#4a3a2a')}
  <g class="humo" fill="#e8e2d6" stroke="#b8b2a6" stroke-width="1.2"><circle cx="16" cy="70" r="6"/><circle cx="10" cy="58" r="7"/><circle cx="16" cy="44" r="8"/></g>
  <g class="abejas">${[[96, 40], [104, 56], [90, 70], [24, 120]].map(([x, y], i) => `<g style="animation-delay:${i * 0.3}s"><ellipse cx="${x}" cy="${y}" rx="3" ry="2.2" fill="#e2b83a" ${L(1)}/><path d="M${x - 1},${y - 2} L${x - 1},${y + 2} M${x + 1},${y - 2} L${x + 1},${y + 2}" stroke="${O}" stroke-width=".8"/><path d="M${x},${y - 2} c-2,-4 -5,-3 -4,0 M${x},${y - 2} c2,-4 5,-3 4,0" fill="#fff" stroke="#999" stroke-width=".6"/></g>`).join('')}</g>
  <g class="respira" style="transform-origin:60px 180px">
    ${pollera('#8a8478', '#6a6458', 112, 188)}
    <path d="M40,60 C46,54 74,54 80,60 C84,80 84,100 80,114 L40,114 C36,100 36,80 40,60Z" fill="#f1ebde" ${L()}/>
    <path d="M44,100 C42,130 44,160 48,184 L72,184 C76,160 78,130 76,100Z" fill="#d9c9a0" ${L(2)}/><path d="M52,140 L68,140 L68,156 L52,156Z" fill="#c9b88a" ${L(1.4)}/>
    ${brazo('M42,64 C32,76 26,86 24,94', '#f1ebde', 11)}
    <g transform="translate(14 92)"><path d="M0,0 L16,0 L16,24 L0,24Z" fill="#a8adb2" ${L(2)}/><path d="M0,0 C2,-8 14,-8 16,0Z" fill="#8a9096" ${L(1.8)}/><path d="M6,-6 L4,-12 L10,-12 L10,-6" fill="#8a9096" ${L(1.4)}/><path d="M16,6 L26,4 L26,18 L16,16Z" fill="#8a5a32" ${L(1.6)}/></g>
    <path d="M18,86 C14,86 12,92 16,96 L28,96 C32,92 30,86 26,86Z" fill="#e8dcc0" ${L(1.8)}/>
    ${brazo('M78,64 C88,74 92,86 90,96', '#f1ebde', 11)}
    <g transform="translate(90 108)"><path d="M-9,-8 L9,-8 L10,12 C10,16 -10,16 -10,12Z" fill="#e8a024" fill-opacity=".9" ${L(2)}/><path d="M-10,-12 L10,-12 L10,-7 L-10,-7Z" fill="#7a4a2a" ${L(1.6)}/><path d="M-6,-2 C-6,4 -4,8 -2,10" stroke="#fff2a8" stroke-width="2" fill="none"/></g>
    <path d="M84,94 C80,94 78,100 82,104 L94,104 C98,100 96,94 92,94Z" fill="#e8dcc0" ${L(1.8)}/>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#6a625a', arrugas: true, menton: -1, boca: 'M56,45.6 C58.5,47.6 61.5,47.6 64,45.6' })}
    ${pelos('#a8a29a')}
    <path d="M30,18 C30,13 90,13 90,18 C90,23 30,23 30,18Z" fill="#e8dcb8" ${L()}/><path d="M46,16 C46,4 74,4 74,16Z" fill="#e8dcb8" ${L()}/>
    <path d="M44,8 C40,0 80,0 76,8 C70,2 50,2 44,8Z" fill="#f4f0e4" fill-opacity=".85" ${L(1.6)}/><path d="M48,6 L50,1 M56,4 L57,0 M64,4 L63,0 M72,6 L70,1" stroke="#b8b2a6" stroke-width="1"/>
  </g>`;
}
