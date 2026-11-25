// Gente nueva de los negocios (proporción adulta, viewBox 0 0 120 220, piso y=212).
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano } from './personas-salta.mjs';

const brazo = (d, col, w = 10) => `<path d="${d}" stroke="${O}" stroke-width="${w + 4.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cuello = (piel) => `<path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>`;
const zapato = (x, c) => `<path d="M${x - 8},198 L${x + 6},198 L${x + 7},206 L${x - 10},206 C${x - 12},206 ${x - 12},201 ${x - 8},200Z" fill="${c}" ${L(2)}/>`;
const alpargata = (x, c) => `<path d="M${x - 9},198 L${x + 7},198 L${x + 9},206 L${x - 12},206 C${x - 15},206 ${x - 14},200 ${x - 9},198Z" fill="${c}" ${L(2)}/><path d="M${x - 13},206 L${x + 9},206" stroke="#e8dcc0" stroke-width="2"/>`;

// Ña Rufina, curandera de Salta (nueva): rebozo negro, rodete blanco, sostiene un atado de ruda con las dos manos
export function curanderaSalta() {
  const piel = '#a8724c', ps = '#7e5032';
  return `${sombraPiso}
  <path d="M52,184 L52,198 L58,198 L58,184Z M68,184 L68,198 L62,198 L62,184Z" fill="${piel}" ${L(2)}/>${zapato(53, '#2a2020')}${zapato(68, '#2a2020')}
  <g class="respira" style="transform-origin:60px 184px">
    <path d="M40,104 C34,130 30,160 30,188 C48,194 72,194 90,188 C90,160 86,130 80,104Z" fill="#4a3a2a" ${L()}/>
    <path d="M48,108 C46,136 46,164 48,186 L72,186 C74,164 74,136 72,108Z" fill="#2f6a8a" ${L(2)}/><path d="M48,176 L72,176" stroke="#e9dcc0" stroke-width="2"/>
    <path d="M42,60 C48,54 72,54 78,60 L80,110 L40,110Z" fill="#e9dcc0" ${L()}/>
    <path d="M34,62 C46,52 74,52 86,62 L90,104 C76,112 44,112 30,104Z" fill="#26201e" ${L()}/>${Array.from({ length: 9 }, (_, i) => `<path d="M${32 + i * 7},${104 + Math.sin((i / 8) * Math.PI) * 6} l0,7" stroke="#26201e" stroke-width="1.8"/>`).join('')}
    ${brazo('M42,70 C40,84 44,96 54,102', '#26201e', 10)}${brazo('M78,70 C80,84 76,96 66,102', '#26201e', 10)}
    <g transform="translate(60 100)"><path d="M0,6 L0,-22" stroke="#4f7a2e" stroke-width="2"/>${[-10, -5, 0, 5, 10].map((d, i) => `<path d="M0,-4 C${d * .5},-12 ${d},-18 ${d},-26" stroke="#4f7a2e" stroke-width="1.8" fill="none"/><ellipse cx="${d}" cy="-27" rx="3.4" ry="2.6" fill="${i % 2 ? '#7fae4a' : '#6a9a3a'}" ${L(.8)}/>`).join('')}<path d="M-6,0 L6,0" stroke="#c9a24a" stroke-width="3"/></g>
    ${mano(54, 102, piel)}${mano(66, 102, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#e2ddd4', arrugas: true, boca: 'M56,45.8 C58.6,47.6 61.4,47.6 64,45.8' })}
    <path d="M46,30 C46,18 74,18 74,30 C72,24 66,21 60,22 C54,21 48,24 46,30Z" fill="#eeeae2" ${L(2)}/><circle cx="60" cy="15" r="6.5" fill="#eeeae2" ${L(2)}/>
    <path d="M44,40 C44,30 46,26 48,24 M76,40 C76,30 74,26 72,24" stroke="#26201e" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>`;
}

// Don Aurelio, maestro de posta de Corrientes: boina negra, camisa blanca, pañuelo rojo, ceba un mate
export function postaCorrientes() {
  const piel = '#b8805a', ps = '#8a5a3a';
  return `${sombraPiso}
  <path d="M44,122 C38,148 38,172 44,192 L58,192 L60,124Z" fill="#8a8f84" ${L()}/><path d="M76,122 C82,148 82,172 76,192 L62,192 L60,124Z" fill="#7a7f74" ${L()}/>
  ${alpargata(52, '#2a3a5a')}${alpargata(70, '#2a3a5a')}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M38,58 C46,52 74,52 82,58 L83,124 L37,124Z" fill="#f4efe4" ${L()}/>
    <path d="M36,110 L84,110 L84,122 L36,122Z" fill="#1f1a18" ${L(1.8)}/>${[44, 52, 60, 68, 76].map((x) => `<circle cx="${x}" cy="116" r="2.2" fill="#d8dde2" ${L(.8)}/>`).join('')}
    <path d="M50,56 L60,72 L70,56 C66,58 54,58 50,56Z" fill="#c8362b" ${L(1.8)}/>
    ${brazo('M40,64 C34,80 34,94 40,104', '#f4efe4', 11)}${mano(42, 106, piel)}
    ${brazo('M80,64 C88,76 88,88 80,96', '#f4efe4', 11)}
    <g transform="translate(70 84)"><path d="M0,10 C-4,22 4,30 10,30 C16,30 24,22 20,10Z" fill="#8a5a32" ${L(1.8)}/><path d="M-1,10 L21,10" stroke="#c9ced2" stroke-width="3" stroke-linecap="round"/><path d="M14,10 L18,0" stroke="#c9ced2" stroke-width="2" stroke-linecap="round"/></g>${mano(78, 98, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#3a2e26', boca: 'M55.5,46.6 C58,48 62,48 64.5,46.6' })}<path d="M54.5,43.6 C57,41.8 59,42.2 60,43.4 C61,42.2 63,41.8 65.5,43.6 C63,45 61,44.6 60,44.2 C59,44.6 57,45 54.5,43.6Z" fill="#3a2e26"/>
    <path d="M44,24 C44,12 76,12 78,22 C78,26 46,28 44,24Z" fill="#1f1a18" ${L(2)}/><path d="M60,13 L61,9" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M46,30 C46,36 47,40 48,42 M74,30 C74,36 73,40 72,42" stroke="#3a2e26" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
}

// Ña Chela, almacenera de Corrientes: delantal a cuadritos, pañuelo en la cabeza, sostiene un paquete de yerba
export function almacenCorrientes() {
  const piel = '#c08a5e', ps = '#946040';
  return `${sombraPiso}
  <path d="M52,184 L52,198 L58,198 L58,184Z M68,184 L68,198 L62,198 L62,184Z" fill="${piel}" ${L(2)}/>${alpargata(53, '#7a3a2a')}${alpargata(69, '#7a3a2a')}
  <g class="respira" style="transform-origin:60px 184px">
    <path d="M40,108 C36,134 34,162 34,186 C50,192 70,192 86,186 C86,162 84,134 80,108Z" fill="#3a6a8a" ${L()}/>
    <path d="M40,60 C46,54 74,54 80,60 C84,80 84,98 80,112 L40,112 C36,98 36,80 40,60Z" fill="#e8b4b0" ${L()}/>${[[48, 72], [70, 70], [56, 90], [74, 96], [46, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#c8362b"/>`).join('')}
    <path d="M46,100 C44,130 46,160 48,184 L72,184 C74,160 76,130 74,100Z" fill="#f4efe4" ${L(2)}/>
    <g opacity=".8">${[0, 1, 2, 3, 4, 5, 6].map((k) => `<path d="M47,${108 + k * 11} L73,${108 + k * 11}" stroke="#3f9a4a" stroke-width="2"/>`).join('')}${[0, 1, 2].map((k) => `<path d="M${52 + k * 8},102 L${52 + k * 8},182" stroke="#3f9a4a" stroke-width="2"/>`).join('')}</g>
    ${brazo('M42,66 C36,80 38,94 46,100', '#e8b4b0', 10)}${brazo('M78,66 C84,80 82,94 74,100', '#e8b4b0', 10)}
    <g transform="translate(50 82)"><rect width="22" height="30" rx="2" fill="#e8dcc0" ${L(1.8)}/><rect y="9" width="22" height="9" fill="#3f9a4a"/><path d="M4,2 L18,2" stroke="#8a5a32" stroke-width="2"/></g>
    ${mano(48, 100, piel)}${mano(72, 100, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#3a2a22', boca: 'M55.5,45 C58,48.4 62,48.4 64.5,45' })}
    <path d="M44,32 C42,14 78,14 76,32 C72,24 66,21 60,21 C54,21 48,24 44,32Z" fill="#e8a23a" ${L(2)}/><path d="M48,22 C56,19 64,19 72,22" stroke="#c8362b" stroke-width="2" fill="none"/>
    <path d="M74,28 C80,30 82,36 78,40" stroke="#e8a23a" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M46,32 C45,38 46,42 47,44" stroke="#3a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
}
