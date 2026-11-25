// Gente de Salta en proporción adulta (lote 3c): comerciantes y servicios. viewBox 0 0 120 220, piso y=212.
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano, bota } from './personas-salta.mjs';

const zapato = (x, c) => `<path d="M${x - 8},198 L${x + 6},198 L${x + 7},206 L${x - 10},206 C${x - 12},206 ${x - 12},201 ${x - 8},200Z" fill="${c}" ${L(2)}/>`;
const piernas = (c1, c2, y0 = 124, y1 = 198) => `<path d="M48,${y0} L47,${y1} L58,${y1} L60,${y0 + 2}Z" fill="${c1}" ${L()}/><path d="M72,${y0} L73,${y1} L62,${y1} L60,${y0 + 2}Z" fill="${c2}" ${L()}/>`;
const cuello = (piel) => `<path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>`;
const pollera = (c, borde, y0 = 104) => `<path d="M40,${y0} C34,130 30,160 28,186 C48,192 72,192 92,186 C90,160 86,130 80,${y0}Z" fill="${c}" ${L()}/><path d="M30,176 C48,182 72,182 90,176 L91,181 C72,187 48,187 29,181Z" fill="${borde}"/>`;

// P15 · Curandera Ña Rufina: bendice con un ramito de ruda
export function curandera() {
  const piel = '#a8724c', ps = '#7e5032';
  return `${sombraPiso}
  <path d="M52,184 L52,198 L58,198 L58,184Z M68,184 L68,198 L62,198 L62,184Z" fill="${piel}" ${L(2)}/>${zapato(53, '#2a2020')}${zapato(68, '#2a2020')}
  <g class="respira" style="transform-origin:60px 184px">
    ${pollera('#3a2a3a', '#7a3a5a', 104)}
    <path d="M42,62 C48,56 72,56 78,62 L80,108 L40,108Z" fill="#6a5a4a" ${L()}/>
    <path d="M30,64 C44,54 76,54 90,64 L94,118 C78,126 42,126 26,118Z" fill="#5a4a6a" ${L()}/>${[0, 1, 2].map((i) => `<path d="M${28 + i},${106 + i * 4} C46,${114 + i * 4} 74,${114 + i * 4} ${92 - i},${106 + i * 4}" stroke="${['#c9a24a', '#7a3a5a', '#c9a24a'][i]}" stroke-width="2" fill="none"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${30 + i * 8},${120 + Math.sin((i / 7) * Math.PI) * 3} l0,5" stroke="#3e3250" stroke-width="1.6"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<circle cx="${50 + Math.cos(Math.PI * (0.15 + i * 0.087)) * 12}" cy="${60 + Math.sin(Math.PI * (0.15 + i * 0.087)) * 14}" r="2" fill="${i % 2 ? '#c8362b' : '#e9dcc0'}" ${L(.8)}/>`).join('')}
    <path d="M44,80 C40,92 40,104 44,112 L50,110 C48,102 48,92 50,84Z" fill="#5a4a6a" ${L(2)}/>${mano(47, 112, piel)}
    <g transform="translate(40 112)"><path d="M6,0 C8,8 6,14 8,20" stroke="#7a4a2a" stroke-width="1.6" fill="none"/><path d="M0,-2 C-4,-10 4,-16 10,-10 C12,-6 8,0 4,0Z" fill="#c9cfc0" ${L(1.4)}/></g>
    <g class="bendice" style="transform-origin:78px 66px"><path d="M78,66 C86,58 90,48 88,38 L82,38 C82,46 78,54 72,60Z" fill="#5a4a6a" ${L(2)}/>${mano(85, 36, piel)}
      <g transform="translate(86 30)">${[0, 1, 2, 3].map((i) => `<path d="M0,0 C${-6 + i * 4},-6 ${-8 + i * 5},-14 ${-6 + i * 5},-20" stroke="#4f7a2e" stroke-width="1.8" fill="none"/><circle cx="${-6 + i * 5}" cy="-20" r="2.6" fill="#7fae4a" ${L(.8)}/><circle cx="${-4 + i * 4}" cy="-12" r="2.2" fill="#6f9a3a" ${L(.8)}/>`).join('')}</g></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#cfc8bd', arrugas: true, boca: 'M56,45.8 C58.6,47.4 61.4,47.4 64,45.8' })}
    <path d="M44,34 C42,14 78,14 76,34 C76,40 74,46 72,50 L70,36 C66,26 54,26 50,36 L48,50 C46,46 44,40 44,34Z" fill="#7a3a5a" ${L()}/><path d="M48,22 C56,20 64,20 72,22" stroke="#c9a24a" stroke-width="1.6" fill="none"/>${[0, 1, 2].map((i) => `<circle cx="${52 + i * 8}" cy="${17 + (i % 2)}" r="1.4" fill="#e9dcc0"/>`).join('')}
    <path d="M50,28 C52,26 56,25 58,26 M62,26 C64,25 68,26 70,28" stroke="#d8d2c8" stroke-width="2" fill="none"/>
  </g>`;
}

// P16 · Talabartero Don Ramiro: trenza tientos de cuero
export function talabartero() {
  const piel = '#c4885c', ps = '#96603c';
  return `${sombraPiso}
  ${piernas('#4a4038', '#40362f', 124)}${bota(52, '#3a2418', 186)}${bota(70, '#3a2418', 186)}
  <g class="respira" style="transform-origin:60px 124px">
    <path d="M41,58 C48,53 72,53 79,58 L81,126 L39,126Z" fill="#d9cdb4" ${L()}/>${[70, 84, 98].map((y) => `<path d="M44,${y} L76,${y}" stroke="#c6b898" stroke-width="1"/>`).join('')}
    <path d="M44,68 L76,68 C80,96 82,130 80,166 L40,166 C38,130 40,96 44,68Z" fill="#8a5a32" ${L(2.2)}/><path d="M44,68 L52,56 M76,68 L68,56" stroke="#6a4224" stroke-width="2.4"/><path d="M48,120 L72,120 L72,136 L48,136Z" fill="none" stroke="#6a4224" stroke-width="1.8"/>
    ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${46 + i * 7}" cy="72" r="1.2" fill="#d9b06a"/>`).join('')}
    <path d="M41,60 C34,70 32,82 36,92 L44,92 C42,84 44,76 48,70Z" fill="#d9cdb4" ${L(2)}/><path d="M79,60 C86,70 88,82 84,92 L76,92 C78,84 76,76 72,70Z" fill="#d9cdb4" ${L(2)}/>
    <g class="trenza"><path d="M44,94 C52,100 50,110 58,114 C66,118 64,128 72,132 M76,94 C68,100 70,110 62,114 C54,118 56,128 48,132 M60,94 L60,138" stroke="${O}" stroke-width="5" fill="none"/>
      <path d="M44,94 C52,100 50,110 58,114 C66,118 64,128 72,132" stroke="#c98a4a" stroke-width="3" fill="none"/><path d="M76,94 C68,100 70,110 62,114 C54,118 56,128 48,132" stroke="#a86a32" stroke-width="3" fill="none"/><path d="M60,94 L60,138" stroke="#e0b07a" stroke-width="3"/></g>
    ${mano(42, 96, piel)}${mano(78, 96, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#8a8278', arrugas: true, boca: 'M56,46 C58.6,47 61.4,47 64,46', barba: '<path d="M48.5,36 C50,48 56,53 60,53 C64,53 70,48 71.5,36 C68,44 64,46 60,46 C56,46 52,44 48.5,36Z" fill="#9a948a" stroke="#2a1c15" stroke-width="1.6"/>' })}
    <path d="M49,36.6 L58,36.6 L58,39.8 L49,39.8Z M62,36.6 L71,36.6 L71,39.8 L62,39.8Z" fill="#cfe1e6" fill-opacity=".6" stroke="#4a3a2a" stroke-width="1.2"/><path d="M58,38 L62,38" stroke="#4a3a2a" stroke-width="1.2"/>
    <path d="M47,26 C46,18 52,14 60,14 C68,14 74,18 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="#8a8278"/><path d="M47,26 L46,32 M73,26 L74,32" stroke="#8a8278" stroke-width="3"/>
  </g>`;
}

// P17 · Feriante Marga: canasta a la cadera, ofrece un tomate
export function feriante() {
  const piel = '#c98d64', ps = '#9a6644';
  return `${sombraPiso}
  <path d="M52,184 L52,198 L58,198 L58,184Z M68,184 L68,198 L62,198 L62,184Z" fill="${piel}" ${L(2)}/>${zapato(53, '#5a3a24')}${zapato(68, '#5a3a24')}
  <g class="respira" style="transform-origin:60px 184px">
    ${pollera('#2f6e5a', '#e2a72e', 108)}
    <path d="M44,104 L76,104 L80,176 L40,176Z" fill="#f2e2c4" ${L(2)}/>${[[50, 120], [66, 132], [52, 150], [68, 162], [58, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#d6463a"/><circle cx="${x}" cy="${y}" r="1.2" fill="#f2d24a"/>`).join('')}
    <path d="M42,60 C48,54 72,54 78,60 L80,110 L40,110Z" fill="#e88a5a" ${L()}/><path d="M48,58 C52,66 68,66 72,58" fill="none" stroke="#c4683a" stroke-width="2"/>
    <path d="M42,62 C34,74 30,90 32,104 L40,106 C40,94 42,82 46,72Z" fill="#e88a5a" ${L(2)}/>
    <g transform="translate(14 96)"><path d="M0,10 C0,30 40,30 40,10Z" fill="#c9a46a" ${L(2.2)}/>${[0, 1, 2, 3].map((i) => `<path d="M${4 + i * 9},14 l0,12" stroke="#a6824a" stroke-width="1.4"/>`).join('')}<path d="M0,10 L40,10" stroke="#a6824a" stroke-width="3"/>
      <circle cx="10" cy="6" r="6" fill="#d6463a" ${L(1.6)}/><circle cx="22" cy="4" r="6.4" fill="#e2a72e" ${L(1.6)}/><path d="M30,8 C30,0 38,-4 40,2 C40,8 34,10 30,8Z" fill="#5f9a3a" ${L(1.6)}/><path d="M2,8 C-2,0 4,-4 6,2" fill="#7fae4a" ${L(1.2)}/></g>${mano(34, 106, piel)}
    <g class="ofrece" style="transform-origin:78px 64px"><path d="M78,62 C88,70 94,78 98,84 L92,90 C88,84 82,76 74,70Z" fill="#e88a5a" ${L(2)}/>${mano(97, 88, piel)}<circle cx="99" cy="82" r="6" fill="#d6463a" ${L(1.8)}/><path d="M97,76 l2,2 l3,-2" stroke="#3f6a2a" stroke-width="2" fill="none"/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M70,30 C78,36 78,48 74,54 C70,56 68,52 70,48 C72,42 70,36 66,32Z" fill="#3a2418" ${L(1.8)}/>
    ${cara(piel, ps, { menton: -1, boca: 'M55.6,45 C58.4,48.6 61.6,48.6 64.4,45 C61.6,46 58.4,46 55.6,45Z' })}
    <path d="M45,30 C42,14 78,14 75,30 C70,24 50,24 45,30Z" fill="#2f5a8a" ${L()}/>${[0, 1, 2, 3].map((i) => `<circle cx="${50 + i * 7}" cy="${22 + (i % 2) * 2}" r="1.6" fill="#f4efe2"/>`).join('')}<path d="M74,26 L82,32 L76,34Z" fill="#2f5a8a" ${L(1.6)}/>
  </g>`;
}

// P18 · Doña Cata, encargada de la posta: sirve agua de la jarra
export function postera() {
  const piel = '#d0986e', ps = '#a26a48';
  return `${sombraPiso}
  ${piernas('#5a4a3a', '#4e4032', 150)}${bota(52, '#4a3020', 184)}${bota(70, '#4a3020', 184)}
  <g class="respira" style="transform-origin:60px 150px">
    <path d="M40,58 C47,53 73,53 80,58 C84,86 86,124 86,160 L34,160 C34,124 36,86 40,58Z" fill="#7a3a2a" ${L()}/>
    <path d="M44,60 L76,60 L78,112 L42,112Z" fill="#f4efe4" ${L(2)}/><path d="M60,62 L60,112" stroke="#d8d2c4" stroke-width="1.4"/>
    <path d="M42,62 L48,60 L52,112 L42,112Z M78,62 L72,60 L68,112 L78,112Z" fill="#3a4a3a" ${L(1.8)}/>
    <path d="M38,112 L82,112 L82,120 L38,120Z" fill="#c8362b" ${L(1.8)}/>
    <path d="M40,60 C34,72 32,88 36,100 L44,100 C42,90 42,78 46,70Z" fill="#7a3a2a" ${L(2)}/>
    <g transform="translate(26 92)"><path d="M6,0 L22,0 C26,10 26,22 20,28 L8,28 C2,22 2,10 6,0Z" fill="#b8784a" ${L(2.2)}/><path d="M8,6 C2,6 -2,12 2,18" stroke="${O}" stroke-width="3" fill="none"/><path d="M22,4 L30,0 L28,6Z" fill="#b8784a" ${L(1.6)}/><path d="M10,8 C14,6 18,6 22,8" stroke="#d89a68" stroke-width="2" fill="none"/></g>
    <g class="chorro"><path d="M57,92 C66,90 74,96 80,106" stroke="#7fc0d8" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="4 4"/></g>
    ${mano(38, 100, piel)}
    <path d="M80,60 C88,72 90,86 86,98 L78,98 C80,88 80,78 76,70Z" fill="#7a3a2a" ${L(2)}/><path d="M74,112 C74,104 84,100 90,104 C92,110 88,116 82,118 C76,118 74,116 74,112Z" fill="#e9e1cf" ${L(1.8)}/><path d="M78,112 L86,108" stroke="#c9bfa8" stroke-width="1.4"/>${mano(84, 100, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { boca: 'M56,45.6 C58.6,47.6 61.4,47.6 64,45.6' })}
    <path d="M47.5,30 C45,18 52,13 61,13 C70,13 76,19 72.5,30 C70,22 64,19 60,20 C55,20 50,23 47.5,30Z" fill="#5a3422" ${L(2)}/>
    <path d="M45,24 C46,14 74,14 75,24 C70,20 50,20 45,24Z" fill="#f4efe4" ${L(2)}/><path d="M74,22 C80,24 84,30 82,36 L78,30Z" fill="#f4efe4" ${L(1.6)}/>
  </g>`;
}

// P19 · Boletero Don Ernesto: uniforme viejo, muestra un boleto
export function boletero() {
  const piel = '#d6a27a', ps = '#a8724e';
  return `${sombraPiso}
  ${piernas('#4a5058', '#424850', 124)}${zapato(53, '#1f1b19')}${zapato(68, '#1f1b19')}
  <g class="respira" style="transform-origin:60px 124px">
    <path d="M40,58 C47,53 73,53 80,58 L82,128 L38,128Z" fill="#5a6470" ${L()}/>
    <path d="M52,56 L60,82 L68,56Z" fill="#f4efe4" ${L(1.8)}/><path d="M58,60 L60,80 L62,60Z" fill="#7a1f1f"/>
    <path d="M40,58 L60,92 L80,58" fill="none" stroke="#4a525c" stroke-width="2"/>${[96, 108, 120].map((y) => `<circle cx="60" cy="${y}" r="2" fill="#c9a24a" ${L(.8)}/>`).join('')}
    <path d="M44,88 L54,88 M66,88 L76,88" stroke="#4a525c" stroke-width="2"/><path d="M70,78 L76,78 L76,86 L70,86Z" fill="none" stroke="#c9a24a" stroke-width="1.2"/>
    <path d="M40,60 C34,74 33,92 35,110 L41,112 C41,96 43,80 46,68Z" fill="#5a6470" ${L(2)}/>
    <g transform="translate(28 106)"><rect x="0" y="0" width="16" height="10" rx="1.5" fill="#8a8f96" ${L(1.6)}/><path d="M4,10 L2,18 M12,10 L14,18" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/></g>${mano(37, 112, piel)}
    <g class="boleto" style="transform-origin:80px 62px"><path d="M80,62 C88,56 92,48 92,38 L86,36 C86,44 82,50 76,56Z" fill="#5a6470" ${L(2)}/>${mano(89, 34, piel)}
      <g transform="translate(84 14) rotate(8)"><rect x="0" y="0" width="22" height="13" rx="1" fill="#f2e2a6" ${L(1.6)}/><path d="M3,4 L14,4 M3,8 L18,8" stroke="#8a6a2a" stroke-width="1.2"/><circle cx="19" cy="3.5" r="1.4" fill="#5a4a2a"/></g></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#6a6058', boca: 'M56,46 C58.6,47 61.4,47 64,46', barba: '<path d="M52,41.6 C55,40.4 58,40.4 60,41.6 C62,40.4 65,40.4 68,41.6" stroke="#4a3a2a" stroke-width="1.8" fill="none"/>' })}
    <circle cx="54" cy="33" r="4.4" fill="none" stroke="#3a3430" stroke-width="1.3"/><circle cx="66" cy="33" r="4.4" fill="none" stroke="#3a3430" stroke-width="1.3"/><path d="M58.4,33 L61.6,33" stroke="#3a3430" stroke-width="1.3"/>
    <path d="M47,22 C47,10 73,10 73,22Z" fill="#4a525c" ${L()}/><path d="M46,22 L74,22 L74,26 L46,26Z" fill="#3a4048" ${L(1.8)}/><path d="M44,26 C50,32 62,32 70,26Z" fill="#1f1b19" ${L(1.8)}/><rect x="56" y="14" width="8" height="5" rx="1" fill="#c9a24a" ${L(1)}/>
  </g>`;
}
