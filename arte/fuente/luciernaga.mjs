import { O, L, nuevoId, sombra, ojoAlm } from './base-arte.mjs';
function escarabajo({ x, y, s = 1, rot = 0, vuelo = false, farol = false }) {
  const k = nuevoId('lu');
  const abd = farol ? 'M12,-12 L26,-20 L44,-14 L52,0 L44,14 L26,20 L12,12Z' : 'M14,-6 C30,-8 40,-2 40,4 C40,10 30,14 14,12Z';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><defs><radialGradient id="${k}g"><stop offset="0" stop-color="#fbffc2"/><stop offset=".45" stop-color="#d9f25a" stop-opacity=".85"/><stop offset="1" stop-color="#b8e03a" stop-opacity="0"/></radialGradient>
    <radialGradient id="${k}f"><stop offset="0" stop-color="#fff2b0"/><stop offset=".6" stop-color="#ffb84a"/><stop offset="1" stop-color="#e07a1a"/></radialGradient></defs>
    <circle class="brillo" cx="${farol ? 30 : 32}" cy="${farol ? 3 : 3}" r="${farol ? 42 : 26}" fill="url(#${k}g)"/>
    ${[[-6, 8, -14, 24], [4, 10, 0, 26], [14, 10, 18, 24]].map(([a, b, c, d]) => `<path d="M${a},${b} L${(a + c) / 2 - 3},${d - 6} L${c},${d}" ${L(3.6)} fill="none"/>`).join('')}
    ${vuelo ? `<g class="ala1" style="transform-origin:${x}px ${y}px"><path d="M-4,-10 C10,-50 46,-58 60,-40 C44,-30 20,-18 -2,-8Z" fill="#e8f2f6" fill-opacity=".6" ${L(1.6)}/><path d="M0,-12 C14,-36 36,-44 50,-38" stroke="#9ab" stroke-width="1" fill="none"/></g>
      <path d="M-10,-10 C-6,-32 14,-40 26,-34 C20,-22 8,-12 -6,-6Z" fill="#2a2420" ${L(2)}/><path d="M-6,-12 C0,-26 10,-32 20,-32" stroke="#e2c25a" stroke-width="2" fill="none"/>` : ''}
    <path d="${abd}" fill="${farol ? `url(#${k}f)` : '#f4f6b0'}" ${L(2.4)}/>
    ${farol ? `<path d="M26,-20 L26,20 M44,-14 L44,14 M12,0 L52,0" stroke="#2e2a28" stroke-width="3.2"/><path class="llamita" d="M34,-6 C30,-2 30,4 34,6 C38,4 38,-2 34,-6Z" fill="#fff6c8" stroke="#e08a2a" stroke-width="1.2"/><path d="M52,0 L60,0 M56,-4 L56,4" stroke="${O}" stroke-width="3" stroke-linecap="round"/>` : `<path d="M22,-6 L22,12 M30,-6 L30,12" stroke="#c9d25a" stroke-width="1.4"/>`}
    ${vuelo ? `<path d="M-12,-6 C-6,-12 10,-10 16,-4 C18,4 10,10 0,10 C-8,10 -14,4 -12,-6Z" fill="#2a2420" ${L(2.4)}/>` : `<path d="M-12,-8 C-4,-16 14,-14 22,-6 C24,2 18,10 4,10 C-8,10 -14,4 -12,-8Z" fill="#2a2420" ${L(2.4)}/><path d="M-10,-6 C-2,-12 12,-12 20,-6" stroke="#e2c25a" stroke-width="2" fill="none"/><path d="M4,-12 L6,10" stroke="#4a403a" stroke-width="1.4"/>`}
    <path d="M-26,-4 C-26,-14 -16,-18 -8,-14 C-4,-8 -6,2 -14,4 C-20,5 -26,2 -26,-4Z" fill="#e0703a" ${L(2.2)}/><path d="M-20,-12 C-16,-14 -12,-12 -11,-8 C-14,-6 -18,-8 -20,-12Z" fill="#2a2420"/>
    <path d="M-28,0 C-34,-2 -36,4 -32,6 C-28,7 -26,4 -26,2Z" fill="#2a2420" ${L(1.6)}/>${ojoAlm(-30, 1, 2.4, 1.6, '#1b120e')}
    <path d="M-30,-4 C-38,-16 -44,-20 -50,-20 M-28,-4 C-32,-18 -36,-24 -40,-26" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>`;
}
export function lucerna(v = 'base') {
  if (v === 'destello') return `<g class="rayos" fill="none" stroke="#f2d23a" stroke-width="2.6" stroke-linejoin="round"><path d="M40,40 l8,10 l-6,2 l8,12"/><path d="M162,58 l-8,10 l6,2 l-8,12"/><path d="M150,150 l-10,4 l2,6 l-12,4"/></g>
    <path class="estela" d="M150,120 C170,140 184,150 196,146" stroke="#e8f27a" stroke-width="3" stroke-dasharray="2 8" fill="none" stroke-linecap="round"/>
    ${sombra(110, 184, 30)}<g class="vuela">${escarabajo({ x: 100, y: 106, s: 1.55, rot: -14, vuelo: true })}</g>`;
  if (v === 'farol') {
    const k = nuevoId('fa');
    return `<defs><radialGradient id="${k}g"><stop offset="0" stop-color="#fff2b0" stop-opacity=".9"/><stop offset=".5" stop-color="#ffc85a" stop-opacity=".45"/><stop offset="1" stop-color="#ffb02e" stop-opacity="0"/></radialGradient>
      <linearGradient id="${k}v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".6" stop-color="#ffb84a"/><stop offset="1" stop-color="#e07a1a"/></linearGradient></defs>
    ${sombra(112, 180, 54)}
    <circle class="brillo" cx="78" cy="82" r="46" fill="url(#${k}g)"/>
    ${[[100, 150, 92, 176], [116, 150, 118, 178], [132, 148, 146, 176]].map(([a, b, c, d]) => `<path d="M${a},${b} L${(a + c) / 2 - 4},${d - 12} L${c},${d}" ${L(4)} fill="none"/>`).join('')}
    <path class="tallo" d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="${O}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="#2e2826" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M150,132 C170,110 166,70 140,52 C120,40 96,40 80,50" stroke="#e2c25a" stroke-width="10" fill="none" stroke-dasharray="2 9"/>
    <path d="M82,132 C84,116 110,108 136,114 C154,118 160,132 156,146 C142,154 104,156 86,150Z" fill="#2a2420" ${L(2.6)}/><path d="M90,128 C104,118 128,116 148,122" stroke="#e2c25a" stroke-width="2.4" fill="none"/><path d="M118,116 L120,152" stroke="#4a403a" stroke-width="1.6"/>
    <path d="M64,138 C64,126 76,120 86,124 C92,132 90,146 80,150 C72,152 64,148 64,138Z" fill="#e0703a" ${L(2.4)}/><path d="M72,126 C78,124 84,126 86,130 C82,134 76,132 72,126Z" fill="#2a2420"/>
    <path d="M52,144 C46,140 46,150 52,152 C58,154 62,150 64,146Z" fill="#2a2420" ${L(1.8)}/>${ojoAlm(54, 145, 2.6, 1.7, '#1b120e')}
    <path d="M52,140 C44,128 38,124 32,124 M54,140 C50,126 46,120 40,116" stroke="${O}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <g class="balanceo" style="transform-origin:80px 50px">
      <path d="M80,50 L80,58" stroke="${O}" stroke-width="3"/>
      <path d="M70,66 L80,56 L90,66Z" fill="#2e2a28" ${L(2)}/>
      <path d="M68,66 L92,66 L96,80 L90,98 L70,98 L64,80Z" fill="url(#${k}v)" ${L(2.4)}/>
      <path d="M80,66 L80,98 M64,80 L96,80" stroke="#2e2a28" stroke-width="2.6"/>
      <path class="llamita" d="M80,74 C76,79 76,86 80,88 C84,86 84,79 80,74Z" fill="#fff6c8" stroke="#e08a2a" stroke-width="1.2"/>
      <path d="M72,98 L88,98 L84,104 L76,104Z" fill="#2e2a28" ${L(1.8)}/><path d="M80,104 L80,110" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g class="rayos" fill="none" stroke="#f2d23a" stroke-width="2.2" stroke-linejoin="round"><path d="M110,70 l6,6 l-4,2 l6,8"/><path d="M44,84 l-6,6 l4,2 l-6,8"/></g>`;
  }
  return `<ellipse cx="104" cy="168" rx="58" ry="5.6" fill="rgba(40,25,10,.2)"/>
  ${escarabajo({ x: 100, y: 134, s: 1.6, rot: 0 })}`;
}

