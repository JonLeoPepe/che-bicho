import { O, L, nuevoId } from './base-arte.mjs';
let uid = 0;
export function yacare() {
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

export function tero() {
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

