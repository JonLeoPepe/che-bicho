// Jugador, jugadora y maestro con proporciones adultas (unas 6 cabezas). viewBox 0 0 120 220, piso en y=212.
export const O = '#2a1c15';
export const L = (w = 2.4) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

export const ojos = (y, color = '#2b1a12', xs = [54, 66]) => xs.map((x) => `<g class="ojo"><path d="M${x - 3},${y} C${x - 1.6},${y - 2} ${x + 1.6},${y - 2} ${x + 3},${y - 0.3} C${x + 1.4},${y + 1.3} ${x - 1.6},${y + 1.3} ${x - 3},${y}Z" fill="#f6eedf"/><circle cx="${x + 0.3}" cy="${y - 0.2}" r="1.35" fill="${color}"/><circle cx="${x + 0.8}" cy="${y - 0.7}" r=".4" fill="#fff"/><path d="M${x - 3.2},${y} C${x - 1.6},${y - 2.3} ${x + 1.6},${y - 2.3} ${x + 3.2},${y - 0.3}" stroke="${O}" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>`).join('');
// cara de adulto: mandíbula marcada, nariz con aleta, pómulos
export const cara = (piel, sombra, { cejas = '#2a1a12', barba = '', boca = 'M56,47 C58.5,48 61.5,48 64,46.6', arrugas = false, menton = 0 } = {}) => `
  <path d="M48,24 C48,13 72,13 72,24 L72.5,36 C72,${44 + menton} 66,${49 + menton} 60,${49 + menton} C54,${49 + menton} 48,${44 + menton} 47.5,36Z" fill="${piel}" ${L()}/>
  <path d="M48.5,37 C50,44 55,48 60,48.5 C56,46 52,42 51,36Z" fill="${sombra}" opacity=".55"/>
  <path d="M47.5,30 C45,29 44,33 46,36 C47,37 48,36.5 48.3,35.5" fill="${piel}" ${L(1.8)}/><path d="M72.5,30 C75,29 76,33 74,36 C73,37 72,36.5 71.7,35.5" fill="${piel}" ${L(1.8)}/>
  ${barba}
  ${ojos(33)}
  <path d="M50,28.6 C52.5,27.4 56,27.2 58,28.4 M62,28.4 C64,27.2 67.5,27.4 70,28.6" stroke="${cejas}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M60.5,34 L61.6,40.6 C61,41.6 59.4,41.8 58.4,41.2" stroke="${sombra}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="${boca}" stroke="${O}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  ${arrugas ? `<path d="M49,35 l-2,1.6 M71,35 l2,1.6 M53,23.5 C57,22.6 63,22.6 67,23.5" stroke="${sombra}" stroke-width="1" fill="none"/><path d="M55.5,44 C55,45.5 55.4,46.4 56,47 M64.5,44 C65,45.5 64.6,46.4 64,47" stroke="${sombra}" stroke-width="1" fill="none"/>` : ''}`;

export const rastra = (y) => `<path d="M40,${y} L80,${y} L80,${y + 7} L40,${y + 7}Z" fill="#4a2e1a" ${L(1.8)}/>${[46, 53, 67, 74].map((x) => `<circle cx="${x}" cy="${y + 3.5}" r="2.6" fill="#d9dee3" stroke="${O}" stroke-width="1"/>`).join('')}<rect x="56" y="${y - 1.5}" width="8" height="10" rx="2" fill="#e3e7eb" ${L(1.4)}/><circle cx="60" cy="${y + 3.5}" r="1.6" fill="#b3261e"/>`;
export const boleadoras = `<g transform="translate(83 118)"><path d="M0,0 C3,10 1,18 5,24 M0,0 C-2,10 -5,16 -3,24 M0,0 C3,7 8,10 10,18" stroke="#6b4a2a" stroke-width="1.5" fill="none"/><circle cx="5" cy="25" r="3.2" fill="#8f8b80" ${L(1.3)}/><circle cx="-3" cy="25" r="3.2" fill="#8f8b80" ${L(1.3)}/><circle cx="10" cy="19" r="2.8" fill="#8f8b80" ${L(1.3)}/></g>`;
export const sombraPiso = `<ellipse cx="60" cy="213" rx="30" ry="4" fill="rgba(40,25,10,.2)"/>`;

export function jugador() {
  const piel = '#cf9a72', ps = '#a8714c';
  return `${sombraPiso}
  <path d="M50,122 L48,196 L59,196 L60,124Z" fill="#b9a681" ${L()}/><path d="M70,122 L72,196 L61,196 L60,124Z" fill="#a8956f" ${L()}/>
  <path d="M53,140 C52,160 52,176 52,190 M67,140 C68,160 68,176 68,190" stroke="#8f7d5a" stroke-width="1.2" fill="none"/>
  <path d="M44,186 L59,186 L60,206 L42,206 C40,206 40,201 44,200Z M76,186 L61,186 L60,206 L78,206 C80,206 80,201 76,200Z" fill="#5a3a24" ${L()}/><path d="M42,206 L60,206 M78,206 L60,206" stroke="#2a1c15" stroke-width="2.4"/>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M42,56 C48,52 72,52 78,56 L80,120 L40,120Z" fill="#e9e1cf" ${L()}/>
    <path d="M42,56 L40,120 L52,120 L54,62Z M78,56 L80,120 L68,120 L66,62Z" fill="#7a4e2c" ${L(2)}/><circle cx="52" cy="88" r="1.2" fill="#c9a24a"/><circle cx="52" cy="100" r="1.2" fill="#c9a24a"/>
    <path d="M48,54 C52,62 68,62 72,54 L69,52 C66,57 54,57 51,52Z" fill="#b3261e" ${L(1.6)}/><path d="M58,60 L55,70 L60,66 L64,72 L62,60Z" fill="#b3261e" ${L(1.4)}/>
    <path d="M78,58 L44,108" stroke="#5a3a22" stroke-width="4"/><path d="M44,108 C40,112 36,118 38,124 C42,126 46,120 48,114Z" fill="#7a4e2c" ${L(1.8)}/>
    ${rastra(112)}
    <path d="M42,58 C36,72 34,92 36,112 L42,114 C42,96 44,78 47,66Z" fill="#e9e1cf" ${L(2)}/><path d="M36,104 L42,106" stroke="#c9bfa8" stroke-width="2"/>
    <path d="M78,58 C84,72 86,92 84,112 L78,114 C78,96 76,78 73,66Z" fill="#e9e1cf" ${L(2)}/>
    <path d="M36,110 C35,116 37,120 40,120 C43,120 43,115 42,112Z" fill="${piel}" ${L(1.8)}/><path d="M84,110 C85,116 83,120 80,120 C77,120 77,115 78,112Z" fill="${piel}" ${L(1.8)}/>
    ${boleadoras}
    <path d="M55,46 L55,54 L65,54 L65,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { boca: 'M56,45.6 C58.5,46.8 61.5,46.8 64.2,45.2' })}
    <path d="M47,26 C46,18 52,14 60,14 C68,14 74,18 73,26 C70,21 64,19 60,20 C55,19 50,21 47,26Z" fill="#3a2418"/>
    <path d="M34,19 C34,14 86,14 86,19 C86,23 34,23 34,19Z" fill="#6b4a2e" ${L()}/><path d="M46,17 C46,4 74,4 74,17Z" fill="#7a5636" ${L()}/><path d="M46,15 L74,15" stroke="#3a2418" stroke-width="2.6"/><path d="M54,7 C58,5 64,5 68,8" stroke="#9a7650" stroke-width="1.6" fill="none"/>
  </g>`;
}

export function jugadora() {
  const piel = '#c08a62', ps = '#9a6644';
  return `${sombraPiso}
  <path d="M51,122 L50,196 L59,196 L60,124Z" fill="#4e3b2e" ${L()}/><path d="M69,122 L70,196 L61,196 L60,124Z" fill="#44332a" ${L()}/>
  <path d="M46,176 L59,176 L60,206 L44,206 C42,206 42,201 46,200Z M74,176 L61,176 L60,206 L76,206 C78,206 78,201 74,200Z" fill="#6a4228" ${L()}/><path d="M47,180 L59,180 M73,180 L61,180" stroke="#8a5a36" stroke-width="1.4"/>
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M45,58 C50,54 70,54 75,58 L77,120 L43,120Z" fill="#3f6e5a" ${L()}/>
    <path d="M45,58 L43,120 L53,120 L55,64Z M75,58 L77,120 L67,120 L65,64Z" fill="#8a5a36" ${L(2)}/>
    ${[0, 1, 2, 3].map((i) => `<path d="M44,${74 + i * 10} l9,1" stroke="#c9a46a" stroke-width="1"/>`).join('')}
    <path d="M50,55 C53,62 67,62 70,55 L68,53 C65,58 55,58 52,53Z" fill="#e2a72e" ${L(1.6)}/>
    ${rastra(112)}
    <path d="M45,60 C40,74 38,92 39,112 L45,114 C45,96 47,80 49,68Z" fill="#3f6e5a" ${L(2)}/><path d="M75,60 C80,74 82,92 81,112 L75,114 C75,96 73,80 71,68Z" fill="#3f6e5a" ${L(2)}/>
    <path d="M39,110 C38,116 40,120 43,120 C46,120 46,115 45,112Z" fill="${piel}" ${L(1.8)}/><path d="M81,110 C82,116 80,120 77,120 C74,120 74,115 75,112Z" fill="${piel}" ${L(1.8)}/>
    ${boleadoras}
    <path d="M55.5,46 L55.5,55 L64.5,55 L64.5,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M70,30 C78,40 80,58 74,76 C72,80 68,80 68,76 C72,60 70,44 66,36Z" fill="#20140e" ${L(2)}/>${[0, 1, 2, 3].map((i) => `<path d="M${70 + (i % 2)},${44 + i * 8} q4,3 0,7" stroke="#3a261a" stroke-width="1.3" fill="none"/>`).join('')}<path d="M68,76 L72,78" stroke="#b3261e" stroke-width="3" stroke-linecap="round"/>
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M56.5,45.4 C58.8,46.8 61.4,46.8 63.8,45.2', menton: -1 })}
    <path d="M47.5,30 C45,18 52,13 61,13 C70,13 76,19 72.5,30 C70,22 64,19 60,20 C55,20 50,23 47.5,30Z" fill="#20140e" ${L(2)}/>
    <path d="M36,18 C36,13 84,13 84,18 C84,22 36,22 36,18Z" fill="#2e2622" ${L()}/><path d="M47,16 C47,5 73,5 73,16Z" fill="#3a302b" ${L()}/><path d="M47,14 L73,14" stroke="#b3261e" stroke-width="2.4"/>
  </g>`;
}

export function maestro() {
  const piel = '#b98058', ps = '#8f5a3a';
  return `${sombraPiso}
  <path d="M49,124 L47,194 L59,194 L60,126Z" fill="#2c2826" ${L()}/><path d="M71,124 L73,194 L61,194 L60,126Z" fill="#25211f" ${L()}/>
  <path d="M44,186 C44,180 50,178 59,180 L60,206 L42,206 C40,206 40,200 44,198Z M76,186 C76,180 70,178 61,180 L60,206 L78,206 C80,206 80,200 76,198Z" fill="#d9c7a4" ${L()}/><path d="M44,196 L59,196 M76,196 L61,196" stroke="#a8936c" stroke-width="1.4"/>
  <g class="respira" style="transform-origin:60px 124px">
    <path d="M42,58 C48,54 72,54 78,58 L80,122 L40,122Z" fill="#d8d0bf" ${L()}/>
    <path d="M40,112 L80,112 L80,124 L40,124Z" fill="#6a2a2a" ${L(1.8)}/>${rastra(106)}
    <path d="M78,56 C90,62 96,84 94,118 L84,124 C76,104 72,84 70,64Z" fill="#a37a52" ${L()}/>
    <path d="M42,56 C30,62 26,84 30,114 L40,118 C44,100 46,80 50,64Z" fill="#a37a52" ${L()}/>
    <path d="M30,108 C40,114 46,114 46,110 M94,112 C86,118 80,118 80,114" stroke="#7a5636" stroke-width="1.6" fill="none"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${30 + i * 2},${114 + (i % 2)} l-1,6 M${94 - i * 2},${118 - (i % 2)} l1,6" stroke="#7a5636" stroke-width="1.2"/>`).join('')}
    <path d="M36,114 C34,120 36,124 40,124 C43,124 43,118 42,116Z" fill="${piel}" ${L(1.8)}/>
    <g transform="translate(86 92)"><path d="M0,0 L10,104" stroke="#5a3a22" stroke-width="4" stroke-linecap="round"/><path d="M0,0 L10,104" stroke="#8a6a46" stroke-width="2" stroke-linecap="round"/><path d="M-1,-2 C2,-6 6,-4 5,0" fill="none" ${L(1.6)}/></g>
    <path d="M86,100 C88,106 86,110 83,110 C80,110 80,105 81,102Z" fill="${piel}" ${L(1.8)}/>
    <path d="M55,46 L55,56 L65,56 L65,46Z" fill="${piel}" ${L(2)}/>
    <path d="M48,56 C53,62 67,62 72,56 L69,54 C66,58 54,58 51,54Z" fill="#efe6d2" ${L(1.6)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 54px">
    ${cara(piel, ps, { cejas: '#d8d2c8', arrugas: true, boca: 'M56,45.8 C58.5,46.8 61.5,46.8 64,45.8', barba: '<path d="M48,36 C48,48 54,55 60,55 C66,55 72,48 72,36 C70,42 66,44 60,44 C54,44 50,42 48,36Z" fill="#e2ddd4" stroke="#2a1c15" stroke-width="2" stroke-linejoin="round"/><path d="M53,43.6 C56,42 64,42 67,43.6 C64,45 56,45 53,43.6Z" fill="#cfc9be"/><path d="M54,49 l1,4 M60,50 l0,4 M66,49 l-1,4" stroke="#bdb6aa" stroke-width="1"/>' })}
    <path d="M47,28 C46,22 50,18 54,17 M73,28 C74,22 70,18 66,17" stroke="#d8d2c8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M30,20 C30,14 90,14 90,20 C90,25 30,25 30,20Z" fill="#1f1a18" ${L()}/><path d="M45,18 C45,4 75,4 75,18Z" fill="#26201d" ${L()}/><path d="M45,16 L75,16" stroke="#6a2a2a" stroke-width="2.6"/>
  </g>`;
}
