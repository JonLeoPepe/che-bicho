// Muestra de la nueva dirección visual: divertido y animado, pero no infantil.
// Genera propuesta/muestra-v2.html con todo el arte dibujado por código (SVG + CSS).
import { readFileSync, writeFileSync } from 'node:fs';
import { mapaV3, insignias } from './mapa-v3.mjs';

const F = (p) => readFileSync('/tmp/fx/node_modules/@fontsource/' + p).toString('base64');
const fuentes = `
@font-face{font-family:Bree;src:url(data:font/woff2;base64,${F('bree-serif/files/bree-serif-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Caveat;font-weight:500;src:url(data:font/woff2;base64,${F('caveat/files/caveat-latin-500-normal.woff2')}) format('woff2')}
@font-face{font-family:Caveat;font-weight:700;src:url(data:font/woff2;base64,${F('caveat/files/caveat-latin-700-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:400;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:800;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-800-normal.woff2')}) format('woff2')}`;

const O = '#2a1c15';           // contorno cálido, no negro puro
const L = (w = 3) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;

// ───────────────────────── BICHOS ─────────────────────────
// Allpuma (Tierra) y su final Apu Puma. est: normal | furioso | agotado
function puma({ fin = false, est = 'normal' } = {}) {
  const k = 'p' + uid++;
  const C = fin ? { pelo: '#b67a3c', som: '#86531f', luz: '#d9a463', crema: '#ecd6ab', marca: '#5a3418' }
                : { pelo: '#cf9a5c', som: '#a06a35', luz: '#e8bd82', crema: '#f1dfb8', marca: '#8a5426' };
  const torso = 'M66,104 C66,88 80,80 98,80 C116,80 136,78 152,84 C166,90 170,104 164,116 C160,124 150,128 140,126 C128,124 112,124 100,128 C88,132 74,128 68,118 C66,114 66,108 66,104 Z';
  const furia = est === 'furioso', cansa = est === 'agotado';
  const vb = 'transform-box:view-box;';
  const roca = (x, y, s, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-10,4 L-7,-7 L3,-10 L11,-3 L9,7 L-2,10 Z" fill="#8d7f6b" ${L(2.2)}/><path d="M-7,-6 L3,-9 L9,-3 L1,-2 Z" fill="#b9ab94"/></g>`;
  const ojoP = 'M37,67 C40,62 47,61 52,64 C49,69 42,70 37,67Z';
  return `<defs><clipPath id="${k}t"><path d="${torso}"/></clipPath><clipPath id="${k}o"><path d="${ojoP}"/></clipPath>
  ${fin ? `<radialGradient id="${k}g"><stop offset="0" stop-color="#ffd36b"/><stop offset="1" stop-color="#ffb52e" stop-opacity="0"/></radialGradient>` : ''}</defs>
  <ellipse cx="108" cy="180" rx="74" ry="6" fill="rgba(40,25,10,.2)"/>
  <g class="cola" style="transform-origin:164px 96px">
    <path d="M162,98 C176,104 182,124 178,146 C176,156 180,164 190,164 C196,162 196,156 192,154 C186,156 186,150 188,144 C192,122 186,100 168,90Z" fill="${C.pelo}" ${L()}/>
    ${fin ? roca(188, 160, 0.75, 15) : `<path d="M178,150 C176,158 181,165 190,164 C196,162 196,156 192,154 C186,156 186,150 187,146Z" fill="${C.marca}"/>`}
  </g>
  <path d="M92,104 C92,116 98,124 102,130 L102,166 C100,170 96,172 96,176 L110,177 C112,176 112,172 110,168 L110,128 C110,118 106,108 100,104Z" fill="${C.som}" ${L()}/>
  <path d="M126,110 C124,122 130,132 136,138 L140,152 C142,160 140,166 138,170 C134,172 134,177 140,177 L150,177 C152,174 150,170 148,168 L146,150 L142,134 C138,126 138,116 136,108Z" fill="${C.som}" ${L()}/>
  <g class="respira" style="transform-origin:110px 130px">
    <path d="${torso}" fill="${C.pelo}"/>
    <g clip-path="url(#${k}t)">
      <path d="M60,118 C90,134 130,120 170,114 L170,140 L60,140Z" fill="${C.som}"/>
      <path d="M82,86 C100,80 128,82 150,86" stroke="${C.luz}" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${fin ? '' : [[100, 92, 0, 1], [118, 90, 18, .9], [134, 95, -12, .8], [110, 104, 8, .7]].map(([x, y, r, e]) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${e})"><path d="M-7,-2 C-5,-5 0,-6 6,-4 C8,-1 6,3 1,4 C-3,4 -7,2 -7,-2Z" fill="${C.marca}" opacity=".7"/><path d="M-3,-4 L0,0 L4,3 M0,0 L-2,3" stroke="${C.luz}" stroke-width=".9" fill="none"/></g>`).join('')}
    </g>
    <path d="${torso}" fill="none" ${L()}/>
    <path d="M132,100 C134,86 156,82 166,96 C172,108 168,122 160,132 L164,150 C166,158 164,166 162,170 C166,172 168,176 164,178 L150,178 C146,178 146,174 150,170 L152,154 L146,138 C138,132 130,116 132,100Z" fill="${C.pelo}" ${L()}/>
    <path d="M140,112 C146,124 154,130 160,132" stroke="${C.som}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M154,178 L154,174 M159,178 L159,174" ${L(1.3)}/>
    <path d="M72,100 C70,112 78,124 84,130 L84,164 C84,168 82,170 78,171 C72,172 70,177 76,178 L92,178 C95,178 96,174 94,170 L92,164 L94,128 C96,118 92,104 86,98 Z" fill="${C.pelo}" ${L()}/>
    <path d="M80,178 L80,174 M85,178 L85,174" ${L(1.3)}/>
    <path d="M86,132 C88,140 88,150 88,160" stroke="${C.som}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
    ${fin ? [[96, 84, 1.1, -15], [110, 80, 1, 10], [124, 80, 0.9, -5], [138, 83, 0.85, 20], [150, 88, 0.8, 0]].map((a) => roca(...a)).join('') : ''}
  </g>
  <g class="cabeza" style="transform-origin:70px 100px">
    <path d="M58,98 C58,86 66,76 80,78 C90,82 92,94 88,104 C80,108 68,108 58,104Z" fill="${C.pelo}" ${L()}/>
    <path d="M60,98 C62,104 68,110 76,108 C72,104 70,100 70,94Z" fill="${C.crema}"/>
    ${fin ? `<path d="M56,104 C50,90 56,72 70,66 C82,64 94,74 96,90 C96,102 88,110 76,112Z" fill="#7a6a56" ${L()}/>${[[64, 72, 0.9, 10], [62, 102, 1, -20], [84, 104, 0.9, 30], [92, 84, 0.8, 0], [78, 70, 0.8, -10]].map((a) => roca(...a)).join('')}` : ''}
    <g style="${vb}transform-origin:68px 58px;transform:rotate(${furia ? 28 : cansa ? 22 : 0}deg)"><path d="M62,56 C64,46 68,40 72,36 C76,44 76,52 72,60Z" fill="${C.som}" ${L()}/></g>
    <path d="M34,60 C40,52 54,48 66,54 C76,60 78,74 72,84 C66,92 54,94 44,92 C36,90 30,86 28,82 C24,80 22,74 24,70 C26,66 30,64 34,60Z" fill="${C.pelo}" ${L()}/>
    <path d="M60,88 C66,92 72,90 74,84 L68,86Z" fill="${C.crema}"/>
    <g style="${vb}transform-origin:55px 54px;transform:rotate(${furia ? 32 : cansa ? 26 : 0}deg)"><path d="M48,55 C46,45 48,37 52,32 C58,38 62,46 62,54Z" fill="${C.pelo}" ${L()}/><path d="M51,51 C50,45 51,41 53,38 C56,42 58,46 58,51Z" fill="#e9c3ad"/></g>
    <path d="M24,70 C26,66 32,66 36,70 C40,76 40,86 44,92 C36,92 30,88 28,84 C24,80 22,74 24,70Z" fill="${C.crema}"/>
    <path d="M34,60 C40,52 54,48 66,54 C76,60 78,74 72,84 C66,92 54,94 44,92 C36,90 30,86 28,82 C24,80 22,74 24,70 C26,66 30,64 34,60Z" fill="none" ${L()}/>
    <path d="M20.5,69 C20.5,65.5 26,65 27.5,68 C26.5,71 22.5,72 20.5,69Z" fill="#4a2a22" ${L(1.2)}/>
    ${furia ? `<path d="M25,78 C29,86 37,89 42,85 L40,92 C34,94 27,89 25,78Z" fill="#5a1f1a" ${L(2)}/><path d="M28,81 L30,87 L32,82 M36,84 L37,89 L39,84" fill="#fff" ${L(1)}/>`
      : cansa ? `<path d="M27,80 C30,83 34,83 38,81" ${L(1.6)} fill="none"/><path d="M30,82 C30,89 36,89 35,82" fill="#d9707a" ${L(1.4)}/>`
      : `<path d="M27,80 C30,83 34,83 38,81" ${L(1.6)} fill="none"/>`}
    <path d="M37,69 C34,73 32,77 31,80" stroke="${C.marca}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g class="ojo">
      <path d="${ojoP}" fill="#f4e7c6"/>
      <g clip-path="url(#${k}o)">${fin ? `<circle cx="45" cy="65.5" r="8" fill="url(#${k}g)"/>` : ''}
        <circle cx="45" cy="65.5" r="3.8" fill="${fin ? '#ffb52e' : '#d99a1c'}"/><ellipse cx="45.4" cy="65.6" rx="1.2" ry="3.1" fill="#1b120e"/><circle cx="46.6" cy="64" r="1" fill="#fff"/>
        ${cansa ? `<path d="M34,56 L56,56 L56,65.5 C49,65 42,65 34,67Z" fill="${C.pelo}"/>` : ''}
      </g>
      <path class="parpado" d="M36.5,67 C40,61.5 47,60.5 52.5,64" ${L(2.4)} fill="none"/>
      <path d="${furia ? 'M35,58 C42,60 48,62 53,64' : cansa ? 'M36,60 C42,58 48,58 53,61' : 'M37,59 C42,56 48,56 53,59'}" ${L(2)} fill="none"/>
    </g>
    ${cansa ? '<path d="M66,62 C64,68 68,70 70,67 C71,65 69,63 66,62Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1.2"/>' : ''}
    <path d="M30,78 L16,76 M30,81 L17,83" stroke="${C.som}" stroke-width="1.1" opacity=".7"/>
  </g>`;
}

function yacare() {
  const k = 'y' + uid++;
  const cuerpo = 'M40,132 C46,118 70,112 100,114 C124,116 140,124 146,136 C148,148 136,158 112,160 L66,160 C50,158 40,148 40,132Z';
  return `<defs><clipPath id="${k}c"><path d="${cuerpo}"/></clipPath></defs>
  <ellipse cx="104" cy="176" rx="88" ry="7" fill="rgba(20,40,40,.22)"/>
  <g class="cola" style="transform-origin:142px 146px">
    <path d="M136,132 C162,130 184,140 197,160 C184,158 166,158 140,158Z" fill="#66743a" ${L()}/>
    <path class="aleta" d="M144,131 C150,120 156,124 158,130 C163,121 169,126 170,133 C175,126 181,131 181,138 C186,134 190,140 189,146 L180,141 L144,134Z" fill="#6fc0de" fill-opacity=".85" ${L(2)}/>
    ${[150, 162, 174].map((x) => `<path d="M${x},134 l4,-5 l4,5" fill="#4e5a2c" ${L(1.5)}/>`).join('')}
  </g>
  <path d="M72,146 C68,156 62,164 56,168 C54,172 62,174 68,172 L76,166 L80,150Z" fill="#4e5a2c" ${L()}/>
  <path d="M128,148 C132,158 132,166 128,170 C128,174 136,175 140,172 L140,160 L136,148Z" fill="#4e5a2c" ${L()}/>
  <g class="respira" style="transform-origin:96px 160px">
    <path d="${cuerpo}" fill="#6f7a3f"/>
    <g clip-path="url(#${k}c)">
      <path d="M40,150 C70,158 120,158 150,148 L150,170 L40,170Z" fill="#d6cc92"/>
      ${[[52, 0], [72, 6], [92, 10], [112, 8], [132, 4]].map(([x]) => `<path d="M${x},116 C${x + 6},126 ${x + 4},138 ${x - 2},148" stroke="#3e4622" stroke-width="7" fill="none" opacity=".75"/>`).join('')}
      <ellipse cx="96" cy="114" rx="60" ry="6" fill="#8b9654"/>
      <path d="M70,122 C80,118 92,118 104,120" stroke="#cfe9f2" stroke-width="2.4" fill="none" opacity=".8" stroke-linecap="round"/>
    </g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    ${[56, 70, 84, 98, 112, 126].map((x, i) => `<path d="M${x - 6},${117 - (i % 2)} C${x - 4},${110 - (i % 2)} ${x + 4},${110 - (i % 2)} ${x + 6},${117 - (i % 2)}" fill="#59652f" ${L(1.8)}/>`).join('')}
    <path d="M96,152 C98,162 96,168 90,172 C88,176 96,177 101,175 L106,166 L104,152Z" fill="#6f7a3f" ${L()}/>
    <path d="M58,150 C54,160 46,166 40,168 C38,172 46,174 52,172 L62,166 L66,152Z" fill="#6f7a3f" ${L()}/>
    <path class="gota" d="M84,121 C83,125 86,126 87,124 C88,122 86,121 84,121Z" fill="#cfe9f2"/>
  </g>
  <g class="cabeza" style="transform-origin:60px 136px">
    <path d="M8,136 C8,128 20,124 34,124 C44,120 58,118 66,122 C72,128 70,140 62,146 C48,150 24,150 12,146 C8,144 8,140 8,136Z" fill="#6f7a3f" ${L()}/>
    <path d="M12,142 C30,145 50,145 64,140 L62,146 C48,150 24,150 12,146Z" fill="#d6cc92"/>
    <path d="M10,139 C30,142 50,142 64,137" ${L(2)} fill="none"/>
    <path d="M14,139 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4" fill="#fbf4dc" stroke="${O}" stroke-width="1.1" stroke-linejoin="round"/>
    <circle cx="14" cy="128" r="2.4" fill="#59652f" ${L(1.4)}/>
    <path d="M24,130 C32,128 40,128 46,130" stroke="#8b9654" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M46,124 C48,112 62,110 66,120Z" fill="#6f7a3f" ${L()}/>
    <g class="ojo"><path d="M50,119 C53,113 61,113 64,118 C60,121 54,122 50,119Z" fill="#efe39a"/><ellipse cx="57.5" cy="117.6" rx="1.3" ry="3" fill="#1b120e"/>
    <path class="parpado" d="M49,119 C53,112 61,112 65,118" ${L(2.6)} fill="none"/></g>
    <path d="M48,111 C54,108 62,109 66,114" ${L(2)} fill="none"/>
  </g>`;
}

function tero() {
  return `<ellipse cx="100" cy="183" rx="42" ry="5" fill="rgba(40,30,20,.2)"/>
  <g class="viento" fill="none" stroke="#9fc8d8" stroke-width="2.2" stroke-linecap="round" opacity=".9">
    <path d="M150,60 C170,56 186,64 182,76 C179,84 168,82 170,74"/><path d="M140,40 C156,34 176,36 190,46"/><path d="M20,120 C34,116 44,122 40,130"/>
  </g>
  <path d="M98,126 L94,172 M112,126 L114,172" stroke="${O}" stroke-width="6" stroke-linecap="round"/>
  <path d="M98,126 L94,172 M112,126 L114,172" stroke="#d6716a" stroke-width="3" stroke-linecap="round"/>
  <path d="M94,172 L84,176 M94,172 L100,177 M114,172 L104,177 M114,172 L122,176" ${L(2.2)}/>
  <g class="respira" style="transform-origin:110px 128px">
    <path d="M150,96 L180,90 L176,102 L150,106Z" fill="#1f1c1c" ${L(2.4)}/><path d="M150,98 L172,95 L170,100 L150,103Z" fill="#f2efe6"/>
    <path d="M60,100 C64,80 86,70 110,74 C138,78 160,92 168,104 C150,108 140,120 120,128 C100,134 72,128 62,116 C58,110 58,104 60,100Z" fill="#8f8b78" ${L()}/>
    <path d="M66,112 C78,126 100,132 120,128 C106,122 92,112 86,100 C78,104 70,108 66,112Z" fill="#f4f1e8"/>
    <path d="M62,98 C64,110 72,120 84,124 C80,110 78,98 76,88Z" fill="#1e1b1b"/>
    <g class="ala" style="transform-origin:96px 88px">
      <path d="M90,86 C110,78 140,84 162,100 C150,110 132,114 112,110 C100,106 92,98 90,86Z" fill="#7d7a66" ${L(2.6)}/>
      <path d="M128,94 C140,96 152,100 162,100 C152,108 142,112 130,112Z" fill="#1f1c1c"/>
      <path d="M98,90 C104,88 110,88 116,90" stroke="#6a8f66" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M104,96 C110,94 118,94 124,96" stroke="#8a6b96" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
      <path d="M92,90 L86,84 L94,86Z" fill="#c8362b" ${L(1.6)}/>
    </g>
  </g>
  <g class="cabeza" style="transform-origin:70px 90px">
    <path d="M62,90 C60,80 62,70 66,64 L78,70 C76,78 74,86 74,94Z" fill="#8f8b78" ${L(2.6)}/>
    <circle cx="60" cy="62" r="16" fill="#9a9785" ${L()}/>
    <path d="M46,56 C50,46 64,44 72,50 C66,52 58,54 52,60Z" fill="#1e1b1b"/>
    <path d="M47,64 C52,70 60,72 68,70" stroke="#f4f1e8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="cresta" style="transform-origin:70px 52px"><path d="M66,52 C78,44 92,40 106,42 C112,42 118,38 120,34 C120,42 114,48 104,48 C92,48 82,52 72,58Z" fill="#1e1b1b" ${L(1.8)}/></g>
    <path d="M46,62 L28,65 L46,68Z" fill="#d6716a" ${L(2.2)}/><path d="M34,64 L28,65 L34,66.5Z" fill="#1e1b1b"/>
    <g class="ojo"><circle cx="56" cy="60" r="5" fill="#c8362b" ${L(1.8)}/><circle cx="55.6" cy="60" r="2.2" fill="#1b120e"/><circle cx="54.6" cy="58.8" r=".9" fill="#fff"/>
    <path class="parpado" d="M50,57 C53,54 59,54 62,57" ${L(2)} fill="none"/></g>
  </g>`;
}

// ───────────────────────── GENTE (unas 4 cabezas de alto) ─────────────────────────
const ojos = (piel, x1 = 53, x2 = 67, y = 43, color = '#2b1a12') => [x1, x2].map((x) => `<g class="ojo"><path d="M${x - 3.6},${y} C${x - 2},${y - 3} ${x + 2},${y - 3} ${x + 3.6},${y} C${x + 2},${y + 2.2} ${x - 2},${y + 2.2} ${x - 3.6},${y}Z" fill="#fbf5ea"/><circle cx="${x + 0.4}" cy="${y - 0.2}" r="1.9" fill="${color}"/><circle cx="${x + 1}" cy="${y - 0.9}" r=".55" fill="#fff"/><path class="parpado" d="M${x - 3.8},${y} C${x - 2},${y - 3.4} ${x + 2},${y - 3.4} ${x + 3.8},${y}" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`).join('');

function domador() {
  const piel = '#c98d5f';
  return `<ellipse cx="60" cy="193" rx="34" ry="5" fill="rgba(40,25,10,.2)"/>
  <path d="M46,126 C44,150 44,170 44,184 L56,184 L58,130Z M74,126 C76,150 76,170 76,184 L64,184 L62,130Z" fill="#8f8673" ${L(2.4)}/>
  <path d="M40,182 C40,178 46,176 56,178 L58,188 L40,189Z M80,182 C80,178 74,176 64,178 L62,188 L80,189Z" fill="#3a2a22" ${L(2.2)}/>
  <path d="M52,140 L54,180 M68,140 L66,180" stroke="#77705f" stroke-width="1.4"/>
  <g class="respira" style="transform-origin:60px 128px">
    <path d="M30,74 C40,64 80,64 90,74 L100,130 C84,140 36,140 20,130Z" fill="#a42a2a" ${L()}/>
    <path d="M24,118 C40,126 80,126 97,118 L98,123 C80,132 40,132 23,123Z M22,126 C40,134 80,134 99,126" fill="#1c1716" stroke="#1c1716" stroke-width="2.4"/>
    <path d="M22,132 l0,5 M28,134 l0,5 M34,135 l0,5 M40,136 l0,5 M46,136 l0,5 M52,137 l0,5 M58,137 l0,5 M64,137 l0,5 M70,137 l0,5 M76,136 l0,5 M82,135 l0,5 M88,134 l0,5 M94,132 l0,5" stroke="#7c1f1f" stroke-width="1.6"/>
    <path d="M40,80 C50,96 54,110 52,124" stroke="#7c1f1f" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M80,82 C72,98 68,112 70,124" stroke="#7c1f1f" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M90,124 C96,126 100,122 100,116 L104,112" fill="none" ${L(2)}/><circle cx="96" cy="122" r="4.5" fill="${piel}" ${L(2)}/>
    <path d="M100,120 L112,150" stroke="#5a3a22" stroke-width="4" stroke-linecap="round"/><path d="M112,150 C116,160 112,170 116,178" stroke="#3a2a22" stroke-width="1.6" fill="none"/>
    <path d="M48,66 C54,74 66,74 72,66 L66,64 L54,64Z" fill="#efe6d2" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 64px">
    <path d="M54,58 L54,66 L66,66 L66,58Z" fill="${piel}" ${L(2)}/>
    <ellipse cx="60" cy="42" rx="17" ry="20" fill="${piel}" ${L()}/>
    <path d="M44,48 C48,60 56,62 60,62 C64,62 72,60 76,48 C72,56 66,58 60,58 C54,58 48,56 44,48Z" fill="#a56d45" opacity=".45"/>
    <path d="M43,36 C42,26 50,22 60,22 C70,22 78,26 77,36 C70,32 50,32 43,36Z" fill="#1d1714"/>
    <path d="M26,30 C26,24 94,24 94,30 C94,35 26,35 26,30Z" fill="#1c1716" ${L(2.6)}/>
    <path d="M42,28 C42,14 78,14 78,28Z" fill="#26201d" ${L(2.6)}/><path d="M42,26 L78,26" stroke="#7a1f1f" stroke-width="3"/>
    ${ojos(piel)}
    <path d="M48,37 C51,35 56,35 58,37 M62,37 C64,35 69,35 72,37" stroke="${O}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M60,44 C59,48 60,50 62,50" stroke="#8a5a3a" stroke-width="1.6" fill="none"/>
    <path d="M51,53 C55,51 58,52 60,53 C62,52 65,51 69,53 C66,55 63,55 60,54 C57,55 54,55 51,53Z" fill="#2a1d17"/>
    <path d="M55,57 C58,58.5 63,58.5 66,56.5" stroke="${O}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>`;
}

function almacenera() {
  const piel = '#e3b08a';
  return `<ellipse cx="60" cy="193" rx="34" ry="5" fill="rgba(40,25,10,.2)"/>
  <path d="M48,150 L48,184 L56,184 L57,150Z M72,150 L72,184 L64,184 L63,150Z" fill="#d8b59a" ${L(2.2)}/>
  <path d="M44,182 L57,182 L58,189 L43,189Z M76,182 L63,182 L62,189 L77,189Z" fill="#3b2b2b" ${L(2)}/>
  <g class="respira" style="transform-origin:60px 150px">
    <path d="M32,78 C38,68 82,68 88,78 C94,100 96,130 94,154 L26,154 C24,130 26,100 32,78Z" fill="#3e4f7a" ${L()}/>
    <defs><pattern id="vichy" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#eef3f7"/><rect width="4" height="8" fill="#9cc0dc" opacity=".7"/><rect width="8" height="4" fill="#9cc0dc" opacity=".7"/></pattern></defs>
    <path d="M38,92 C46,88 74,88 82,92 L86,150 L34,150Z" fill="url(#vichy)" ${L(2.2)}/>
    <path d="M44,118 L60,118 L60,132 L44,132Z" fill="none" ${L(1.6)}/>
    <path d="M32,80 C24,96 24,112 30,124 L38,122 C36,110 38,96 40,86Z" fill="#8a8f99" ${L(2.2)}/>
    <path d="M88,80 C96,96 96,112 90,124 L82,122 C84,110 82,96 80,86Z" fill="#8a8f99" ${L(2.2)}/>
    <g transform="translate(70 104) rotate(-12)"><rect x="0" y="0" width="22" height="28" rx="2" fill="#b48c5a" ${L(2)}/><path d="M11,0 L11,28" stroke="#1c1716" stroke-width="2.4"/><rect x="3" y="6" width="7" height="6" fill="#f4ecd8"/></g>
    <circle cx="34" cy="124" r="5" fill="${piel}" ${L(2)}/><circle cx="86" cy="124" r="5" fill="${piel}" ${L(2)}/>
    <path d="M50,70 C54,76 66,76 70,70" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 66px">
    <ellipse cx="60" cy="45" rx="18" ry="20" fill="${piel}" ${L()}/>
    <path d="M42,44 C40,30 48,22 60,22 C72,22 80,30 78,44 C74,34 66,30 60,30 C54,30 46,34 42,44Z" fill="#b9b4ae" ${L(2.4)}/>
    <circle cx="60" cy="18" r="9" fill="#b9b4ae" ${L(2.4)}/><path d="M54,16 C58,14 62,14 66,18" stroke="#8d8781" stroke-width="1.4" fill="none"/>
    <path d="M77,36 L90,26" stroke="#e1b032" stroke-width="3.4" stroke-linecap="round"/><path d="M88,27 L91,25" stroke="#2a1d17" stroke-width="3.4" stroke-linecap="round"/>
    ${ojos(piel, 53, 67, 46, '#5a3b2a')}
    <circle cx="53" cy="46" r="6" fill="none" stroke="#5e4a3a" stroke-width="1.5"/><circle cx="67" cy="46" r="6" fill="none" stroke="#5e4a3a" stroke-width="1.5"/><path d="M59,46 L61,46" stroke="#5e4a3a" stroke-width="1.5"/>
    <path d="M47,48 l-3,2 M73,48 l3,2" stroke="#b07a5a" stroke-width="1.1"/>
    <path d="M49,38 C52,37 56,37 58,38.5 M62,38.5 C64,37 68,37 71,38" stroke="#8d8781" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M60,48 C59,51 60,52 62,52" stroke="#b07a5a" stroke-width="1.5" fill="none"/>
    <path d="M53,56 C57,60 63,60 67,56 C63,58 57,58 53,56Z" fill="#8f3b3b" ${L(1.4)}/>
    <ellipse cx="48" cy="54" rx="3.5" ry="2" fill="#e08a7a" opacity=".45"/><ellipse cx="72" cy="54" rx="3.5" ry="2" fill="#e08a7a" opacity=".45"/>
  </g>`;
}

function coplera() {
  const piel = '#b5774d';
  const aguayo = ['#c8362b', '#e2a72e', '#2f7d5b', '#b03a7a', '#2c5aa0', '#e2a72e', '#c8362b'];
  return `<ellipse cx="60" cy="193" rx="36" ry="5" fill="rgba(40,25,10,.2)"/>
  <path d="M50,160 L50,184 L57,184 L57,160Z M70,160 L70,184 L63,184 L63,160Z" fill="${piel}" ${L(2)}/>
  <path d="M46,182 L58,182 L58,189 L45,189Z M74,182 L62,182 L62,189 L75,189Z" fill="#5a3522" ${L(2)}/>
  <g class="respira" style="transform-origin:60px 160px">
    <path d="M36,110 C30,130 24,150 22,166 C46,172 74,172 98,166 C96,150 90,130 84,110Z" fill="#2f5e45" ${L()}/>
    <path d="M24,158 C46,164 74,164 96,158 L97,163 C74,169 46,169 23,163Z" fill="#e2a72e"/>
    <path d="M38,74 C44,68 76,68 82,74 L86,112 L34,112Z" fill="#efe6d2" ${L(2.4)}/>
    <path d="M26,82 C36,70 84,70 94,82 L90,104 C76,98 44,98 30,104Z" fill="${aguayo[0]}" ${L(2.4)}/>
    ${aguayo.map((c, i) => `<path d="M${28 + i * 0.4},${85 + i * 2.6} C44,${78 + i * 2.6} 76,${78 + i * 2.6} ${92 - i * 0.4},${85 + i * 2.6}" stroke="${c}" stroke-width="2.6" fill="none"/>`).join('')}
    <path d="M56,98 L60,108 L64,98" fill="${aguayo[3]}" ${L(1.6)}/>
    <g transform="translate(16 102)"><ellipse cx="12" cy="14" rx="14" ry="14" fill="#e9dcc0" ${L(2.4)}/><ellipse cx="12" cy="14" rx="9" ry="9" fill="none" stroke="#c8a77a" stroke-width="1.4"/><path d="M-2,14 L26,14" stroke="#7a4a2a" stroke-width="1.6"/></g>
    <circle cx="30" cy="112" r="5" fill="${piel}" ${L(2)}/>
    <path d="M90,104 L102,90" stroke="#7a4a2a" stroke-width="3" stroke-linecap="round"/><circle cx="103" cy="89" r="3.6" fill="#efe6d2" ${L(1.6)}/><circle cx="90" cy="106" r="5" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 70px">
    <path d="M44,44 C40,62 42,86 46,98 L50,98 C48,82 48,62 50,48Z M76,44 C80,62 78,86 74,98 L70,98 C72,82 72,62 70,48Z" fill="#1d1714" ${L(2)}/>
    <circle cx="47" cy="100" r="3" fill="${aguayo[1]}" ${L(1.4)}/><circle cx="73" cy="100" r="3" fill="${aguayo[1]}" ${L(1.4)}/>
    <ellipse cx="60" cy="46" rx="17" ry="20" fill="${piel}" ${L()}/>
    <path d="M43,42 C44,32 52,28 60,28 C68,28 76,32 77,42 C70,36 50,36 43,42Z" fill="#1d1714"/>
    <path d="M28,32 C28,26 92,26 92,32 C92,37 28,37 28,32Z" fill="#efe6d2" ${L(2.6)}/>
    <path d="M44,30 C44,16 76,16 76,30Z" fill="#f4ecdc" ${L(2.6)}/><path d="M44,27 L76,27" stroke="#1c1716" stroke-width="3"/>
    <circle cx="72" cy="25" r="4" fill="#c8362b" ${L(1.4)}/><circle cx="72" cy="25" r="1.4" fill="#e2a72e"/>
    ${ojos(piel, 53, 67, 47)}
    <path d="M49,40 C51,38.5 55,38.5 57,40 M63,40 C65,38.5 69,38.5 71,40" stroke="${O}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M60,49 C59,52 60,53 62,53" stroke="#7e4f31" stroke-width="1.5" fill="none"/>
    <ellipse class="canta" cx="60" cy="57.5" rx="3.6" ry="2.8" fill="#6a2a22" ${L(1.6)}/>
    <ellipse cx="48" cy="54" rx="3.5" ry="2" fill="#c0503a" opacity=".35"/><ellipse cx="72" cy="54" rx="3.5" ry="2" fill="#c0503a" opacity=".35"/>
  </g>`;
}

function protagonista() {
  const piel = '#d9a17a';
  return `<ellipse cx="60" cy="193" rx="30" ry="5" fill="rgba(40,25,10,.25)"/>
  <g class="pierna1"><path d="M50,128 L50,182 L59,182 L59,128Z" fill="#3c4d6b" ${L(2.4)}/><path d="M46,180 L60,180 L60,189 L45,189Z" fill="#e9e2d2" ${L(2.2)}/></g>
  <g class="pierna2"><path d="M70,128 L70,182 L61,182 L61,128Z" fill="#33435f" ${L(2.4)}/><path d="M74,180 L60,180 L60,189 L75,189Z" fill="#e9e2d2" ${L(2.2)}/></g>
  <path d="M30,78 L28,120 L44,122 L44,80Z M90,78 L92,120 L76,122 L76,80Z" fill="#7a5a3a" ${L(2.4)}/>
  <path d="M36,72 C44,66 76,66 84,72 L88,132 L32,132Z" fill="#d8752e" ${L()}/>
  <path d="M60,72 L60,132" stroke="#9b4f1c" stroke-width="2"/><path d="M36,100 L84,100" stroke="#9b4f1c" stroke-width="1.6" opacity=".6"/>
  <circle cx="34" cy="126" r="5" fill="${piel}" ${L(2)}/><circle cx="86" cy="126" r="5" fill="${piel}" ${L(2)}/>
  <ellipse cx="60" cy="45" rx="17" ry="19" fill="${piel}" ${L()}/>
  <path d="M42,44 C40,28 50,22 62,22 C74,22 80,30 78,44 C74,36 66,34 58,34 C52,34 46,38 42,44Z" fill="#3a2418" ${L(2.4)}/>
  <path d="M40,32 C42,18 78,18 80,32 C70,28 50,28 40,32Z" fill="#2c6a8a" ${L(2.4)}/><path d="M40,32 C30,32 26,36 30,38 C36,38 40,36 44,33Z" fill="#245a76" ${L(2)}/>
  ${ojos(piel, 53, 67, 46)}
  <path d="M49,39 C51,37.5 55,37.5 57,39 M63,39 C65,37.5 69,37.5 71,39" stroke="${O}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M55,56 C58,58 63,58 66,55.5" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
}

const svg = (vb, cuerpo, extra = '') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${extra}>${cuerpo}</svg>`;

// ───────────────────────── MAPA ─────────────────────────
function pastoAlto(x, y, n = 7, s = 1) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const bx = x + i * 6 * s, h = (14 + ((i * 7) % 6)) * s, c = i % 2 ? '#5c8a34' : '#73a043';
    out += `<path d="M${bx},${y} C${bx - 2},${y - h * 0.5} ${bx + 1},${y - h * 0.8} ${bx + 4 * s},${y - h} C${bx + 3},${y - h * 0.6} ${bx + 5},${y - h * 0.3} ${bx + 6 * s},${y}Z" fill="${c}" stroke="#2f4a1c" stroke-width="1.1" stroke-linejoin="round"/>`;
  }
  return `<g class="pastizal" style="transform-origin:${x + n * 3 * s}px ${y}px;animation-delay:${((x * 7 + y) % 10) / 10}s">${out}</g>`;
}
function persona(fn, x, y, s, clase = '') { return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${clase}">${fn()}</g></g>`; }

function mapa() {
  const pasto = `<pattern id="mp" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#88a94f"/><path d="M3,8 l2,-4 l2,4 M14,17 l2,-4 l2,4" stroke="#6e9140" stroke-width="1.4" fill="none"/><circle cx="17" cy="5" r="1.1" fill="#a7c464"/><circle cx="6" cy="18" r=".9" fill="#a7c464"/></pattern>
  <pattern id="mt" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#d7b685"/><ellipse cx="6" cy="7" rx="2.2" ry="1.5" fill="#c09a68"/><ellipse cx="19" cy="18" rx="1.8" ry="1.2" fill="#c09a68"/><circle cx="15" cy="6" r="1" fill="#e9d0a6"/><circle cx="5" cy="20" r="1" fill="#e9d0a6"/></pattern>
  <pattern id="adobe" width="20" height="10" patternUnits="userSpaceOnUse"><rect width="20" height="10" fill="#d1a06c"/><path d="M0,9.5 L20,9.5 M10,0 L10,9.5" stroke="#b98656" stroke-width="1"/></pattern>
  <pattern id="techo" width="8" height="40" patternUnits="userSpaceOnUse"><rect width="8" height="40" fill="#b28150"/><path d="M4,0 L4,40" stroke="#9c6d40" stroke-width="1.2"/></pattern>
  <linearGradient id="luzM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3c8" stop-opacity=".25"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></linearGradient>`;
  const casa = (x, y, w, pared, puerta, cartel) => `
    <rect x="${x - 4}" y="${y + 66}" width="${w + 8}" height="10" fill="rgba(30,20,10,.18)"/>
    <rect x="${x}" y="${y}" width="${w}" height="70" fill="${pared}" stroke="${O}" stroke-width="2.4"/>
    <rect x="${x}" y="${y}" width="${w}" height="16" fill="rgba(40,25,10,.22)"/>
    <rect x="${x + w * 0.36}" y="${y + 22}" width="24" height="46" rx="2" fill="${puerta}" stroke="${O}" stroke-width="2.2"/><path d="M${x + w * 0.36 + 12},${y + 22} L${x + w * 0.36 + 12},${y + 68}" stroke="${O}" stroke-width="1.4"/>
    <rect x="${x + w * 0.72}" y="${y + 24}" width="22" height="20" fill="#3b3330" stroke="${O}" stroke-width="2.2"/><path d="M${x + w * 0.72 + 5.5},${y + 24} l0,20 M${x + w * 0.72 + 11},${y + 24} l0,20 M${x + w * 0.72 + 16.5},${y + 24} l0,20" stroke="#8d8a86" stroke-width="1.4"/>
    <rect x="${x + w * 0.72 - 2}" y="${y + 44}" width="26" height="7" fill="#9c5a32" stroke="${O}" stroke-width="1.6"/>${[4, 11, 18].map((d) => `<circle cx="${x + w * 0.72 + d}" cy="${y + 41}" r="3.4" fill="#d6463a" stroke="${O}" stroke-width="1"/>`).join('')}
    <path d="M${x - 8},${y - 52} L${x + w + 8},${y - 52} L${x + w + 4},${y + 6} L${x - 4},${y + 6}Z" fill="url(#techo)" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M${x - 4},${y + 6} L${x + w + 4},${y + 6}" stroke="#7b5236" stroke-width="4"/>
    ${Array.from({ length: Math.floor(w / 18) }, (_, i) => `<rect x="${x + 6 + i * 18}" y="${y + 5}" width="5" height="6" fill="#5a3a22" stroke="${O}" stroke-width="1"/>`).join('')}
    ${[x + 6, x + w - 10].map((px) => `<rect x="${px}" y="${y + 10}" width="5" height="58" fill="#7b5236" stroke="${O}" stroke-width="1.6"/>`).join('')}
    ${cartel ? `<rect x="${x + w * 0.08}" y="${y - 14}" width="${w * 0.84}" height="15" rx="2" fill="#efe3c4" stroke="${O}" stroke-width="2"/><text x="${x + w / 2}" y="${y - 3}" font-family="Bree" font-size="9" fill="#7a2a1a" text-anchor="middle">${cartel}</text>` : ''}`;
  const arbol = (x, y) => `<ellipse cx="${x}" cy="${y + 4}" rx="42" ry="12" fill="rgba(30,30,10,.22)"/>
    <path d="M${x - 6},${y} C${x - 4},${y - 20} ${x - 14},${y - 30} ${x - 10},${y - 44} L${x + 2},${y - 40} C${x},${y - 28} ${x + 8},${y - 20} ${x + 6},${y}Z" fill="#6a4a2e" stroke="${O}" stroke-width="2.2"/>
    <g class="copa" style="transform-origin:${x}px ${y - 30}px">${[[-26, -52, 22], [2, -64, 26], [26, -50, 20], [-8, -40, 20], [16, -36, 16]].map(([dx, dy, r], i) => `<circle cx="${x + dx}" cy="${y + dy}" r="${r}" fill="${['#5f7f32', '#6f9038', '#5a7a2e', '#7a9a42', '#66863a'][i]}" stroke="${O}" stroke-width="2.2"/>`).join('')}
    ${[[-30, -58], [0, -74], [22, -58], [-10, -48]].map(([dx, dy]) => `<path d="M${x + dx},${y + dy} q6,-4 12,0" stroke="#9dbb5c" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    ${[[-20, -40], [8, -46], [30, -40]].map(([dx, dy]) => `<path d="M${x + dx},${y + dy} q2,6 -2,10 M${x + dx + 4},${y + dy} q2,6 -2,10" stroke="#c9a24a" stroke-width="2" fill="none"/>`).join('')}</g>`;
  const pirca = Array.from({ length: 9 }, (_, i) => `<ellipse cx="${14 + i * 15}" cy="${378 + (i % 2) * 2}" rx="9" ry="7" fill="${i % 3 ? '#a59a88' : '#948a78'}" stroke="${O}" stroke-width="1.8"/>`).join('');
  const alambrado = `<path d="M214,384 L214,640 M214,396 L214,640" />` + Array.from({ length: 6 }, (_, i) => `<rect x="210" y="${388 + i * 44}" width="7" height="26" fill="#8a6a46" stroke="${O}" stroke-width="1.6"/>`).join('') + `<path d="M213,394 L213,640 M216,404 L216,640" stroke="#6b6b6b" stroke-width="1"/>`;
  const hud = (() => {
    const caps = [['☰ Menú', '#b8382a', '#fff', 64], ['Cerrillos', '#3f6e34', '#fff', 70], ['☀ 08:10', '#2f7fb8', '#fff', 62], ['Despejado', '#e7b93a', '#3a2a10', 70], ['● 150', '#b8862a', '#fff', 54]];
    let x = 6; return caps.map(([t, bg, fg, w]) => { const s = `<g><rect x="${x}" y="10" width="${w}" height="24" rx="12" fill="${bg}" stroke="${O}" stroke-width="2"/><rect x="${x + 3}" y="12.5" width="${w - 6}" height="6" rx="3" fill="#fff" opacity=".18"/>${t.startsWith('●') ? `<circle cx="${x + 14}" cy="22" r="6.5" fill="#e9c35a" stroke="#6e4f12" stroke-width="1.6"/><circle cx="${x + 14}" cy="22" r="2.6" fill="none" stroke="#a37a22" stroke-width="1.2"/><text x="${x + 26}" y="26" font-family="Nunito" font-weight="800" font-size="11.5" fill="${fg}">150</text>` : `<text x="${x + w / 2}" y="26" font-family="Nunito" font-weight="800" font-size="11.5" fill="${fg}" text-anchor="middle">${t}</text>`}</g>`; x += w + 5; return s; }).join('');
  })();
  const mini = `<g transform="translate(286 560)"><circle r="40" fill="#e9dcc0" stroke="${O}" stroke-width="2.6"/><clipPath id="mc"><circle r="36"/></clipPath><g clip-path="url(#mc)"><rect x="-40" y="-40" width="80" height="80" fill="#88a94f"/><rect x="-40" y="-8" width="80" height="10" fill="#d7b685"/><rect x="-8" y="-8" width="10" height="50" fill="#d7b685"/><rect x="-34" y="-30" width="22" height="16" fill="#b28150"/><rect x="8" y="-28" width="20" height="14" fill="#b28150"/><path d="M-40,-12 L40,-12" stroke="#4b8db0" stroke-width="3"/><circle cx="24" cy="16" r="7" fill="#5f7f32"/></g><path d="M-3,6 L0,-2 L3,6Z" fill="#d8752e" stroke="${O}" stroke-width="1.4"/><text y="-28" font-family="Bree" font-size="8" text-anchor="middle" fill="${O}">N</text></g>`;
  const equipo = `<g transform="translate(10 572)">${['#cf9a5c', '#6f7a3f', '#8f8b78'].map((c, i) => `<g transform="translate(${i * 40} 0)"><circle cx="18" cy="18" r="17" fill="#efe6d2" stroke="${O}" stroke-width="2.2"/><circle cx="18" cy="18" r="11" fill="${c}" stroke="${O}" stroke-width="1.6"/><rect x="4" y="34" width="28" height="5" rx="2.5" fill="#3a2a22"/><rect x="5" y="35" width="${[24, 16, 22][i]}" height="3" rx="1.5" fill="${['#5fb346', '#e2a72e', '#5fb346'][i]}"/></g>`).join('')}</g>`;
  return svg('0 0 360 640', `<defs>${pasto}</defs>
    <rect width="360" height="640" fill="url(#mp)"/>
    <path d="M0,96 C60,92 120,100 180,94 C240,88 300,96 360,92 L360,0 L0,0Z" fill="#b5835a" stroke="${O}" stroke-width="2.6"/>
    <path d="M0,70 C70,66 140,74 200,68 C260,62 310,70 360,66" stroke="#c99a6a" stroke-width="10" fill="none"/><path d="M0,48 C80,44 150,52 220,46 C280,40 320,48 360,44" stroke="#9d6c46" stroke-width="8" fill="none"/>
    <path d="M0,96 C60,92 120,100 180,94 C240,88 300,96 360,92 L360,104 C300,108 240,100 180,106 C120,112 60,104 0,108Z" fill="#8a5a3a"/>
    <rect x="0" y="300" width="360" height="62" fill="url(#mt)"/><rect x="150" y="362" width="54" height="278" fill="url(#mt)"/>
    <path d="M0,300 L360,300 M0,362 L150,362 M204,362 L360,362 M150,362 L150,640 M204,362 L204,640" stroke="#b8956a" stroke-width="2"/>
    <rect x="0" y="286" width="360" height="12" fill="#9c907c" stroke="${O}" stroke-width="1.6"/><rect x="0" y="289" width="360" height="6" fill="#4b8db0"/>
    <path class="ondas" d="M0,292 L360,292" stroke="#bfe0ef" stroke-width="1.6" stroke-dasharray="6 14"/>
    ${casa(24, 196, 126, 'url(#adobe)', '#2f7f83', 'ALMACÉN LA ESQUINA')}${casa(216, 206, 116, '#efe7d6', '#5c8a46', '')}
    ${arbol(300, 452)}
    ${alambrado}
    <g opacity=".95">${pastoAlto(16, 450, 8)}${pastoAlto(30, 478, 9)}${pastoAlto(12, 506, 10)}${pastoAlto(60, 530, 8)}${pastoAlto(96, 470, 6)}${pastoAlto(20, 540, 6)}${pastoAlto(100, 500, 5)}${pastoAlto(232, 420, 5)}${pastoAlto(240, 470, 6)}</g>
    <g class="bicho-mapa" transform="translate(66 458) scale(.27)">${puma()}</g>
    <g>${pastoAlto(54, 500, 7)}</g>
    <g class="alerta"><path d="M88,430 C88,420 106,420 106,430 C106,438 100,440 97,446 C94,440 88,438 88,430Z" fill="#fff" stroke="${O}" stroke-width="2"/><text x="97" y="436" font-family="Bree" font-size="13" text-anchor="middle" fill="#c8362b">!</text></g>
    ${pirca}
    ${[[250, 600], [120, 410], [330, 380], [20, 620]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="3" fill="#f2d24a" stroke="${O}" stroke-width="1"/><circle cx="${x + 7}" cy="${y + 4}" r="2.6" fill="#e86a8a" stroke="${O}" stroke-width="1"/></g>`).join('')}
    ${persona(almacenera, 46, 214, 0.27)}${persona(domador, 236, 300, 0.3)}${persona(protagonista, 160, 440, 0.3, 'camina')}
    <rect width="360" height="640" fill="url(#luzM)"/>
    ${hud}${equipo}${mini}`, 'class="telefono"');
}

// ───────────────────────── LIBRETA ─────────────────────────
function tapa() {
  return svg('0 0 300 420', `<defs><pattern id="kraft" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#b48d5c"/><path d="M0,2 L6,3 M1,5 L5,5" stroke="#a37e4e" stroke-width=".6"/></pattern></defs>
    <rect x="8" y="8" width="284" height="404" rx="10" fill="url(#kraft)" stroke="${O}" stroke-width="3"/>
    <path d="M8,30 C8,14 14,8 30,8 L60,8 C40,14 20,26 8,50Z" fill="#cba777" opacity=".7"/><path d="M292,390 C292,406 286,412 270,412 L240,412 C262,404 280,394 292,372Z" fill="#cba777" opacity=".7"/>
    <rect x="230" y="8" width="14" height="404" fill="#1f1b1a" stroke="${O}" stroke-width="1.6"/><path d="M233,8 L233,412" stroke="#3a3433" stroke-width="2"/>
    <rect x="40" y="70" width="170" height="120" rx="6" fill="#f3ead2" stroke="${O}" stroke-width="2.4" transform="rotate(-2 125 130)"/>
    <g transform="rotate(-2 125 130)" font-family="Caveat"><text x="125" y="106" font-size="34" font-weight="700" text-anchor="middle" fill="#1f2f5a">LIBRETA</text>
    <text x="125" y="132" font-size="16" text-anchor="middle" fill="#5b5b5b">Almacén La Esquina</text>
    <text x="96" y="160" font-size="20" fill="#5b5b5b">Doña Rosa</text><path d="M90,154 L170,152" stroke="#5b5b5b" stroke-width="2"/>
    <text x="104" y="182" font-size="22" font-weight="700" fill="#8a1f1f">Bichos de Juli</text></g>
    <circle cx="150" cy="320" r="34" fill="none" stroke="#7d5a32" stroke-width="5" opacity=".35"/><circle cx="154" cy="318" r="30" fill="none" stroke="#7d5a32" stroke-width="2" opacity=".25"/>`);
}

function pagina() {
  const rengl = Array.from({ length: 21 }, (_, i) => `<path d="M10,${62 + i * 22} L330,${62 + i * 22}" stroke="#b6c8de" stroke-width="1"/>`).join('');
  const t = (x, y, s, txt, c = '#1f2f5a', w = 500, extra = '') => `<text x="${x}" y="${y}" font-family="Caveat" font-weight="${w}" font-size="${s}" fill="${c}" ${extra}>${txt}</text>`;
  const dato = (y, k, v) => `<text x="210" y="${y}" font-family="Nunito" font-weight="800" font-size="12" fill="#3a3a3a">${k}</text><text x="318" y="${y}" font-family="Nunito" font-weight="800" font-size="13" fill="#1f2f5a" text-anchor="end">${v}</text><path d="M210,${y + 4} L318,${y + 4}" stroke="#d0c6ac" stroke-dasharray="2 3"/>`;
  return svg('0 0 340 520', `<rect x="4" y="4" width="332" height="512" rx="4" fill="#f6eedb" stroke="#c9bb98" stroke-width="2"/>${rengl}
    <path d="M44,4 L44,516" stroke="#d98080" stroke-width="1.6"/><path d="M48,4 L48,516" stroke="#d98080" stroke-width=".8"/>
    ${t(54, 34, 18, 'Juárez: 1 kg yerba, ½ fideos …… pagó', '#6b6b6b')}<path d="M52,28 L300,30" stroke="#6b6b6b" stroke-width="1.8"/>
    ${t(54, 57, 30, 'N.º 004 · Allpuma', '#1f2f5a', 700)}
    <g transform="translate(46 64) scale(.78)" style="filter:grayscale(1) contrast(1.15) brightness(1.08);mix-blend-mode:multiply;opacity:.9">${puma()}</g>
    ${t(54, 236, 21, 'Tipo: <tspan fill="#8a5a2a" font-weight="700">Tierra</tspan>')}
    ${t(54, 258, 21, 'Dónde: pastizal del Valle de Lerma')}
    ${t(54, 280, 21, 'Cuándo: de día, más a la mañana')}
    ${t(54, 302, 21, 'Mañas: tímido. Si te ve, se raja;')}
    ${t(54, 324, 21, 'acercarse escondido en el pasto alto.')}
    ${t(54, 352, 21, 'Le gana a: <tspan fill="#2e7d32" font-weight="700">Rayo ▲ Fuego ▲</tspan>')}
    ${t(54, 374, 21, 'Le cuesta: <tspan fill="#b03a2e" font-weight="700">Agua ▼ Flora ▼</tspan>')}
    ${t(210, 82, 22, 'La cuenta', '#1f2f5a', 700)}
    ${dato(104, 'PS', '45')}${dato(126, 'Fuerza', '52')}${dato(148, 'Defensa', '40')}${dato(170, 'Velocidad', '61')}${dato(192, 'Aguante', '5')}
    ${t(54, 418, 20, '«Lo boleé en la acequia', '#4a4a4a')}${t(54, 440, 20, 'de los Juárez. Mansito no era.»', '#4a4a4a')}${t(54, 462, 20, '— Juli', '#4a4a4a')}
    <g transform="translate(270 470) rotate(-14)" opacity=".85"><circle r="40" fill="none" stroke="#b3261e" stroke-width="3.5"/><circle r="33" fill="none" stroke="#b3261e" stroke-width="1.4"/>
    <text y="-6" font-family="Bree" font-size="13" text-anchor="middle" fill="#b3261e">ATRAPADO</text><text y="12" font-family="Bree" font-size="11" text-anchor="middle" fill="#b3261e">12 · III</text></g>
    <circle cx="120" cy="486" r="28" fill="none" stroke="#8b6a3a" stroke-width="4" opacity=".22"/>
    <path d="M300,4 L336,4 L336,40Z" fill="#e9dec2" stroke="#c9bb98" stroke-width="1.6"/>`);
}

// ───────────────────────── ESTRELLAS Y MEDALLAS ─────────────────────────
const estrella = (cx, cy, r) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`); } return p.join(' '); };
function chapita(nombre, n, fondo, borde) {
  const k = 'c' + uid++;
  const dientes = Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2; return `${(60 + 54 * Math.cos(a)).toFixed(1)},${(60 + 54 * Math.sin(a)).toFixed(1)} ${(60 + 49 * Math.cos(a + Math.PI / 24)).toFixed(1)},${(60 + 49 * Math.sin(a + Math.PI / 24)).toFixed(1)}`; }).join(' ');
  const pos = n === 1 ? [[60, 58, 22]] : n === 2 ? [[42, 58, 17], [78, 58, 17]] : [[36, 64, 14], [60, 50, 16], [84, 64, 14]];
  return svg('0 0 120 150', `<defs><linearGradient id="${k}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#e8b53e"/><stop offset="1" stop-color="#a8761c"/></linearGradient>
    <radialGradient id="${k}f" cx=".35" cy=".3"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <polygon points="${dientes}" fill="#cfd3d6" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>
    <circle cx="60" cy="60" r="44" fill="${borde}" stroke="${O}" stroke-width="2.2"/><circle cx="60" cy="60" r="38" fill="${fondo}" stroke="${O}" stroke-width="1.6"/>
    ${pos.map(([x, y, r]) => `<polygon points="${estrella(x, y + 2, r)}" fill="rgba(0,0,0,.3)"/><polygon class="brilla" points="${estrella(x, y, r)}" fill="url(#${k}o)" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/>`).join('')}
    <circle cx="60" cy="60" r="44" fill="url(#${k}f)"/>
    <path d="M24,84 C40,96 80,96 96,84" stroke="#fff" stroke-width="1" opacity=".0"/>
    <text x="60" y="88" font-family="Bree" font-size="11" text-anchor="middle" fill="#fff" stroke="${O}" stroke-width=".6">${nombre.toUpperCase()}</text>
    <text x="60" y="140" font-family="Nunito" font-weight="800" font-size="11" text-anchor="middle" fill="#4a3a2a">${['', 'Para arrancar', 'Se pone bravo', 'Para baqueanos'][n]}</text>`);
}
function medalla(tipo) {
  const cinta = { empanada: ['#74acdf', '#fff', '#74acdf'], acordeon: ['#c8362b', '#fff', '#2f7d5b'], cerro: ['#c8362b', '#e2a72e', '#2f7d5b'] }[tipo];
  const dibujo = {
    empanada: `<path d="M30,82 C30,58 90,58 90,82Z" fill="#d79a46" stroke="${O}" stroke-width="2.4"/><path d="M30,82 ${Array.from({ length: 8 }, (_, i) => `q3.75,-6 7.5,0`).join(' ')}" fill="#e7b15c" stroke="${O}" stroke-width="2"/><path d="M44,72 C52,68 68,68 76,72" stroke="#f3d08a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    acordeon: `<rect x="30" y="62" width="14" height="30" rx="2" fill="#2a2a2a" stroke="${O}" stroke-width="2"/><rect x="76" y="62" width="14" height="30" rx="2" fill="#2a2a2a" stroke="${O}" stroke-width="2"/><path d="M44,64 L50,92 L56,64 L62,92 L68,64 L76,92 M44,92 L50,64 L56,92 L62,64 L68,92 L76,64" stroke="#c8362b" stroke-width="2.4" fill="none"/>${[0, 1, 2].map((i) => `<circle cx="37" cy="${68 + i * 9}" r="2.2" fill="#efe6d2"/>`).join('')}`,
    cerro: `<clipPath id="cc${uid}"><path d="M26,94 L50,60 L62,72 L74,56 L96,94Z"/></clipPath><g clip-path="url(#cc${uid++})">${['#c8362b', '#e08a3a', '#e7c15a', '#7fae5a', '#b05a8a', '#8a5a3a', '#d6a0b0'].map((c, i) => `<path d="M20,${66 + i * 5} C50,${60 + i * 5} 70,${70 + i * 5} 100,${62 + i * 5} L100,${68 + i * 5} C70,${76 + i * 5} 50,${66 + i * 5} 20,${72 + i * 5}Z" fill="${c}"/>`).join('')}</g><path d="M26,94 L50,60 L62,72 L74,56 L96,94Z" fill="none" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>`,
  }[tipo];
  const nombre = { empanada: 'Empanada', acordeon: 'Acordeón de chamamé', cerro: 'Cerro de Siete Colores' }[tipo];
  return svg('0 0 120 150', `<path d="M40,4 L54,44 L60,40 L66,44 L80,4Z" fill="${cinta[0]}" stroke="${O}" stroke-width="2"/><path d="M50,4 L57,38 L63,38 L70,4Z" fill="${cinta[1]}"/><path d="M57,4 L59,38 L61,38 L63,4Z" fill="${cinta[2]}"/>
    <circle cx="60" cy="78" r="40" fill="#b98a3a" stroke="${O}" stroke-width="2.6"/><circle cx="60" cy="78" r="34" fill="#f1e6c8" stroke="#8a6420" stroke-width="2"/>
    <g>${dibujo}</g><path d="M34,60 C42,48 60,44 74,48" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>
    <text x="60" y="140" font-family="Nunito" font-weight="800" font-size="10.5" text-anchor="middle" fill="#4a3a2a">${nombre}</text>`);
}

// ───────────────────────── PÁGINA ─────────────────────────
const viejo = readFileSync('/tmp/viejo-pumita.svg', 'utf8');
const ficha = (titulo, tipo, color, dib, txt, vb = '0 0 200 200') => `<figure class="ficha"><div class="lienzo">${svg(vb, dib)}</div><figcaption><b>${titulo}</b><span class="tipo" style="background:${color}">${tipo}</span><p>${txt}</p></figcaption></figure>`;
const gente = (nom, rol, dib, txt) => `<figure class="ficha gente"><div class="lienzo">${svg('0 0 120 200', dib)}</div><figcaption><b>${nom}</b><span class="rol">${rol}</span><p>${txt}</p></figcaption></figure>`;

const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>¡Che, Bicho! — Muestra de la nueva dirección visual</title><style>${fuentes}
:root{--tinta:#2a1c15;--papel:#f4eee3;--acento:#a42a2a}
*{box-sizing:border-box}body{margin:0;background:var(--papel);color:var(--tinta);font:16px/1.5 Nunito,system-ui,sans-serif}
header{background:#2b2420;color:#f4eee3;padding:28px 18px 22px;text-align:center;border-bottom:6px solid var(--acento)}
header h1{font:32px/1.1 Bree,serif;margin:0 0 6px}header p{margin:0;opacity:.85;font-size:15px}
main{max-width:980px;margin:0 auto;padding:8px 14px 60px}
section{margin:34px 0}h2{font:24px/1.2 Bree,serif;margin:0 0 6px;display:flex;gap:10px;align-items:baseline}h2 small{font:800 12px Nunito;color:#8a6a4a;letter-spacing:.06em;text-transform:uppercase}
.intro{margin:0 0 16px;color:#5a4a3a;max-width:70ch}
.claves{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin:14px 0 0;padding:0;list-style:none}
.claves li{background:#fff;border:2px solid #e2d6c2;border-radius:12px;padding:10px 12px;font-size:14px}.claves b{display:block;font-family:Bree;font-weight:400;font-size:16px}
.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.ficha{margin:0;background:#fff;border:2px solid #e2d6c2;border-radius:16px;overflow:hidden}
.lienzo{background:radial-gradient(circle at 50% 75%,#efe2c8,#e3d2b2 70%);padding:6px}.ficha.gente .lienzo{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}
.lienzo svg{display:block;width:100%;height:auto;max-height:240px}.ficha.gente .lienzo svg{max-height:280px}
figcaption{padding:10px 14px 14px}figcaption b{font:20px Bree,serif;font-weight:400;margin-right:8px}figcaption p{margin:6px 0 0;font-size:14px;color:#5a4a3a}
.tipo,.rol{display:inline-block;font:800 11px Nunito;color:#fff;padding:2px 9px;border-radius:99px;vertical-align:3px}.rol{background:#6a5a4a}
.antes{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:end}.antes figure{margin:0;text-align:center;background:#fff;border:2px solid #e2d6c2;border-radius:16px;padding:8px}
.antes svg{width:100%;height:auto;max-height:200px}.antes figcaption{padding:4px}
.estados{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.estados figure{margin:0;background:#fff;border:2px solid #e2d6c2;border-radius:14px;text-align:center;padding:4px}.estados svg{width:100%;height:auto}.estados figcaption{font:800 13px Nunito;padding:2px 0 6px}
.mapa{display:grid;grid-template-columns:minmax(0,380px) 1fr;gap:20px;align-items:start}
.telefono{width:100%;height:auto;border-radius:28px;border:8px solid #1f1b1a;box-shadow:0 14px 30px rgba(0,0,0,.25);display:block;background:#88a94f}
.notas{margin:0;padding-left:18px;font-size:15px}.notas li{margin:6px 0}
.libreta{display:grid;grid-template-columns:minmax(0,280px) minmax(0,360px);gap:18px;justify-content:start;align-items:start}.libreta svg{width:100%;height:auto;filter:drop-shadow(0 8px 14px rgba(0,0,0,.22))}
.medallas{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:12px}.medallas svg{width:100%;max-width:150px;height:auto;display:block;margin:0 auto}
.sub{font:20px Bree,serif;margin:22px 0 8px}.medallas figure{margin:0;text-align:center}.medallas figcaption{font:800 13px Nunito;padding:0}.grandes svg{max-width:180px}.cinto{margin-top:14px}.cinto svg{width:100%;height:auto;max-width:640px;display:block}
@keyframes humo{0%{transform:translate(0,0) scale(.6);opacity:.7}100%{transform:translate(10px,-34px) scale(1.8);opacity:0}}@keyframes onda{0%{transform:scale(.3);opacity:.9}100%{transform:scale(2.2);opacity:0}}@keyframes reflejo{0%,100%{transform:translateX(0);opacity:.8}50%{transform:translateX(6px);opacity:.4}}@keyframes destello{0%,80%,100%{transform:scale(0)}88%{transform:scale(1)}}
.humo circle{animation:humo 3.3s ease-out infinite;transform-origin:center}.onda{animation:onda 3.9s ease-out infinite;transform-origin:center}.reflejo{animation:reflejo 4s ease-in-out infinite}.destello{animation:destello 3.5s infinite;transform-origin:center}
footer{text-align:center;color:#8a7a6a;font-size:13px;padding:20px}
@media (max-width:700px){.mapa,.libreta{grid-template-columns:1fr}.telefono{max-width:380px;margin:0 auto}}
/* animación: viva pero contenida */
@keyframes respira{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,1.03)}}
@keyframes cola{0%,100%{transform:rotate(0)}50%{transform:rotate(-7deg)}}
@keyframes cabeza{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@keyframes parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
@keyframes ala{0%,80%,100%{transform:rotate(0)}88%{transform:rotate(-10deg)}}
@keyframes cresta{0%,100%{transform:rotate(0) scaleX(1)}50%{transform:rotate(-4deg) scaleX(1.05)}}
@keyframes viento{to{stroke-dashoffset:-60}}
@keyframes aleta{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes gota{0%{transform:translateY(0);opacity:1}100%{transform:translateY(26px);opacity:0}}
@keyframes pasto{0%,100%{transform:skewX(0)}50%{transform:skewX(-6deg)}}
@keyframes copa{0%,100%{transform:rotate(0)}50%{transform:rotate(1.4deg)}}
@keyframes ondas{to{stroke-dashoffset:-40}}
@keyframes alerta{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes paso{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes brilla{0%,85%,100%{filter:brightness(1)}92%{filter:brightness(1.45)}}
@keyframes canta{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.55)}}
@keyframes asoma{0%,100%{transform:translate(64px,452px) scale(.32)}50%{transform:translate(66px,449px) scale(.32)}}
.ojo,.humo circle,.onda,.destello,.aleta,.gota,.brilla,.canta,.alerta{transform-box:fill-box}
.respira{animation:respira 3.2s ease-in-out infinite}.cola{animation:cola 2.6s ease-in-out infinite;transform-box:view-box}
.cabeza{animation:cabeza 4.5s ease-in-out infinite;transform-box:view-box}.respira{transform-box:view-box}
.ojo{animation:parpadeo 4.8s infinite;transform-origin:center}.ala{animation:ala 5s infinite;transform-box:view-box}
.cresta{animation:cresta 1.6s ease-in-out infinite;transform-box:view-box}.viento path{stroke-dasharray:14 10;animation:viento 2.4s linear infinite}
.aleta{animation:aleta 1.8s ease-in-out infinite}.gota{animation:gota 2.2s ease-in infinite}
.pastizal{animation:pasto 2.8s ease-in-out infinite;transform-box:view-box}.copa{animation:copa 5s ease-in-out infinite;transform-box:view-box}
.ondas{animation:ondas 2s linear infinite}.alerta{animation:alerta 1s ease-in-out infinite}
.camina{animation:paso .5s ease-in-out infinite;transform-box:view-box}.brilla{animation:brilla 4s infinite}.canta{animation:canta .7s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body>
<header><h1>¡Che, Bicho!</h1><p>Muestra de la nueva dirección visual · divertido y animado, pero no infantil</p></header>
<main>
<section><h2>Qué cambia <small>los criterios</small></h2>
<ul class="claves">
<li><b>Proporciones de animal</b>Cabeza de un tercio del cuerpo, patas con largo real, pose de costado. Cada especie con su peso.</li>
<li><b>Ojos con forma</b>Almendrados, con iris y pupila propios de cada animal. Fuera los ojos de punto y los cachetes.</li>
<li><b>Sombra en dos tonos</b>Luz desde arriba a la izquierda, sombra debajo y un brillo. Da volumen sin perder lo caricaturesco.</li>
<li><b>Paleta de tierra</b>Ocres, verdes oliva y rojos de poncho, con un acento saturado por bicho, no todos los colores a la vez.</li>
<li><b>Gente de cuatro cabezas</b>Ropa reconocible: poncho salteño, aguayo, guardapolvo. Gestos de adulto.</li>
<li><b>Animación con intención</b>Respirar, parpadear, mover la cola, el viento en el pasto. Nada salta ni rebota sin motivo.</li>
</ul></section>

<section><h2>Antes y después <small>mismo bicho</small></h2>
<div class="antes"><figure>${svg('0 0 120 120', viejo)}<figcaption>Pumita (hoy)</figcaption></figure><figure>${svg('0 0 200 200', puma())}<figcaption>Allpuma (propuesta)</figcaption></figure></div></section>

<section><h2>Bichos <small>3 especies y una forma final</small></h2>
<p class="intro">Nombres nuevos según las reglas del punto 8: animal + rasgo, en castellano o en una lengua de la región, sin diminutivos. Son borradores.</p>
<div class="grilla">
${ficha('Allpuma', 'Tierra', '#8a5a2a', puma(), 'Puma joven con el lomo agrietado como la tierra seca. <i>Allpa</i> es tierra en quechua. Tímido: hay que acercarse escondido.')}
${ficha('Apu Puma', 'Tierra · final', '#5a3418', puma({ fin: true }), 'La forma final del árbol: más grande, con un manto de piedra y ojos que brillan. <i>Apu</i> es el señor de la montaña.')}
${ficha('Yacarón', 'Agua', '#2f7fb8', yacare(), 'Yacaré de los esteros con aleta de agua en la cola. Manso hasta que lo pisás: muerde y no suelta.')}
${ficha('Ventero', 'Viento', '#5f8fa6', tero(), 'Tero de cresta larga que el viento ondea; grita y alerta a todo el campo. Espolón rojo en el ala, como el tero real.')}
</div>
<h3 class="sub">Los estados cambian la cara, no solo el color</h3>
<div class="estados"><figure>${svg('8 26 110 100', puma())}<figcaption>Normal</figcaption></figure><figure>${svg('8 26 110 100', puma({ est: 'furioso' }))}<figcaption>Furioso</figcaption></figure><figure>${svg('8 26 110 100', puma({ est: 'agotado' }))}<figcaption>Agotado</figcaption></figure></div>
</section>

<section><h2>Gente <small>vecinos y domadores</small></h2>
<div class="grilla">
${gente('Facundo', 'Domador · Salta', domador(), 'Poncho salteño con guarda negra, sombrero de ala plana y rebenque. Serio, pero no enojado.')}
${gente('Doña Rosa', 'Almacenera · Cerrillos', almacenera(), 'Te da su libreta vieja al empezar. Guardapolvo a cuadros, anteojos y el lápiz en la oreja.')}
${gente('Coplera', 'Vecina · Jujuy', coplera(), 'Sombrero de lana, trenzas y aguayo. Canta con la caja; da la changa del carnaval.')}
</div></section>

<section><h2>Mapa <small>Cerrillos, de mañana · versión 2</small></h2>
<div class="mapa">${mapaV3({ puma, tero, domador, protagonista, svg })}
<ul class="notas">
<li><b>Suelo con variación:</b> el pasto cambia de tono por zonas (más seco, más húmedo), con grano fino y matas sueltas; nada de color plano.</li>
<li><b>Camino de tierra de verdad:</b> serpentea, tiene bordes que se funden con el pasto, huellas de carro, piedritas y un charco.</li>
<li><b>Laguna:</b> orilla de barro húmedo, agua más honda en el centro y clara en el borde, reflejo del cielo, ondas, juncos con totora y camalotes.</li>
<li><b>Árboles, arbustos y piedras con volumen:</b> copa en cuatro capas de luz, tronco retorcido con corteza y vainas de algarrobo; piedras facetadas con musgo; cardones con costillas.</li>
<li><b>Todo proyecta sombra</b> hacia el mismo lado (sol de la mañana, arriba a la izquierda), suave y no recortada.</li>
<li><b>Lugares con materiales:</b> la posta es colonial, encalada, con techo de tejas, galería de horcones, ventanas con postigos y rejas, palenque, bebedero y chimenea que humea. El rancho tiene techo de paja, adobe a la vista donde se cayó el revoque, y horno de barro.</li>
<li><b>HUD aprobado</b> sin cambios; el minimapa dibuja el lugar real.</li>
</ul></div></section>

<section><h2>Libreta <small>la "Pokédex" de almacén</small></h2>
<p class="intro">La libreta de fiado de Doña Rosa: tapa de cartón con elástico, hojas rayadas con margen rojo y sus cuentas viejas tachadas. Lo manuscrito va en títulos y notas; los números, en letra clara.</p>
<div class="libreta">${tapa()}${pagina()}</div></section>

<section><h2>Estrellas <small>dificultad · aprobadas</small></h2>
<div class="medallas">${chapita('Salta', 1, '#9b2b2b', '#5a1a1a')}${chapita('Corrientes', 2, '#2f6e45', '#1d4a2d')}${chapita('Jujuy', 3, '#b4561c', '#6e3410')}</div></section>
<section><h2>Insignias de los capataces <small>versión 2 · platería criolla</small></h2>
<p class="intro">Sin cinta ni bandera. Son piezas de platería criolla, como las monedas de una rastra: plata cincelada, oro y una piedra roja. Cada una tiene la silueta de su premio, y se van colgando en tu cinto de cuero.</p>
${(() => { const I = insignias(svg); return `<div class="medallas grandes"><figure>${I.empanada}<figcaption>Empanada · Salta</figcaption></figure><figure>${I.acordeon}<figcaption>Acordeón de chamamé · Corrientes</figcaption></figure><figure>${I.cerro}<figcaption>Cerro de Siete Colores · Jujuy</figcaption></figure></div><div class="cinto">${I.cinto}</div>`; })()}
</section>
</main>
<footer>By J. Pepe · Todo el arte está dibujado por código · Fuentes Bree Serif, Caveat y Nunito (licencia OFL)</footer>
</body></html>`;
writeFileSync(new URL('./muestra-v2.html', import.meta.url), html);
console.log('ok', (html.length / 1024).toFixed(0), 'KB');
