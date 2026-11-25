// Puma aprobado de la muestra (Allpuma / Apu Puma), extraído para reusar en catálogos.
const O = '#2a1c15';
const L = (w = 3) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 900;
export function puma({ fin = false, est = 'normal' } = {}) {
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
