// Gente de Salta en proporción adulta (lote 3b): vecinos. viewBox 0 0 120 220, piso y=212.
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano, bota, sombrero } from './personas-salta.mjs';

const zapato = (x, c) => `<path d="M${x - 8},198 L${x + 6},198 L${x + 7},206 L${x - 10},206 C${x - 12},206 ${x - 12},201 ${x - 8},200Z" fill="${c}" ${L(2)}/>`;
const piernas = (c1, c2, y0 = 124, y1 = 198) => `<path d="M48,${y0} L47,${y1} L58,${y1} L60,${y0 + 2}Z" fill="${c1}" ${L()}/><path d="M72,${y0} L73,${y1} L62,${y1} L60,${y0 + 2}Z" fill="${c2}" ${L()}/>`;
const cuello = (piel) => `<path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>`;
const pelo = (c) => `<path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="${c}"/>`;

// P9 · Doña Rosa, almacenera: anota en la libreta de fiado
export function rosa() {
  const piel = '#dcaa84', ps = '#ad7a58';
  return `${sombraPiso}
  <path d="M50,176 L50,198 L57,198 L57,176Z M70,176 L70,198 L63,198 L63,176Z" fill="#d9b8a0" ${L(2)}/>${zapato(53, '#3b2b2b')}${zapato(68, '#3b2b2b')}
  <g class="respira" style="transform-origin:60px 176px">
    <path d="M38,62 C45,56 75,56 82,62 C88,96 90,140 88,180 L32,180 C30,140 32,96 38,62Z" fill="#3e4f7a" ${L()}/>
    <defs><pattern id="vichy2" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#eef3f7"/><rect width="3.5" height="7" fill="#9cc0dc" opacity=".7"/><rect width="7" height="3.5" fill="#9cc0dc" opacity=".7"/></pattern></defs>
    <path d="M42,78 C50,74 70,74 78,78 L82,174 L38,174Z" fill="url(#vichy2)" ${L(2.2)}/><path d="M46,120 L62,120 L62,136 L46,136Z" fill="none" ${L(1.6)}/>
    <path d="M38,64 C32,80 32,96 40,108 L48,104 C42,94 42,82 44,72Z" fill="#8a8f99" ${L(2.2)}/>
    <path d="M82,64 C90,80 88,96 78,106 L72,100 C78,92 80,82 78,72Z" fill="#8a8f99" ${L(2.2)}/>
    <g transform="translate(50 92) rotate(-8)"><rect x="0" y="0" width="30" height="22" rx="1.5" fill="#f3ead2" ${L(1.8)}/><path d="M15,0 L15,22" stroke="#b48c5a" stroke-width="2.4"/>${[5, 10, 15].map((y) => `<path d="M3,${y} L12,${y} M18,${y} L27,${y}" stroke="#9ab" stroke-width=".9"/>`).join('')}</g>
    ${mano(48, 106, piel)}
    <g class="escribe" style="transform-origin:74px 100px"><path d="M74,104 L84,92" stroke="#e1b032" stroke-width="3" stroke-linecap="round"/>${mano(74, 102, piel)}</g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px" transform="translate(0 2)">
    ${cara(piel, ps, { cejas: '#9a948c', arrugas: true, boca: 'M56,45.6 C58.6,47.6 61.4,47.6 64,45.6' })}
    <circle cx="54" cy="33" r="4.6" fill="none" stroke="#5e4a3a" stroke-width="1.4"/><circle cx="66" cy="33" r="4.6" fill="none" stroke="#5e4a3a" stroke-width="1.4"/><path d="M58.6,33 L61.4,33" stroke="#5e4a3a" stroke-width="1.4"/>
    <path d="M47,30 C44,16 52,12 60,12 C68,12 76,16 73,30 C70,22 64,19 60,20 C55,19 50,22 47,30Z" fill="#b9b4ae" ${L(2)}/><circle cx="60" cy="9" r="6.4" fill="#b9b4ae" ${L(2)}/>
    <path d="M73,24 L82,16" stroke="#e1b032" stroke-width="2.6" stroke-linecap="round"/>
  </g>`;
}

// P10 · Maestra Inés: guardapolvo blanco, toca la campana
export function maestra() {
  const piel = '#d29a72', ps = '#a46e4c';
  return `${sombraPiso}
  ${piernas('#d6b49a', '#cfac92', 160)}${zapato(53, '#2e2a33')}${zapato(68, '#2e2a33')}
  <g class="respira" style="transform-origin:60px 160px">
    <path d="M40,58 C47,53 73,53 80,58 C84,90 86,130 86,166 L34,166 C34,130 36,90 40,58Z" fill="#f7f6f2" ${L()}/>
    <path d="M60,60 L60,166" stroke="#d8d6d0" stroke-width="1.6"/>${[80, 100, 120, 140].map((y) => `<circle cx="62" cy="${y}" r="1.6" fill="#c9c6be"/>`).join('')}
    <path d="M44,112 L56,112 M66,112 L78,112" stroke="#d8d6d0" stroke-width="1.6"/>
    <path d="M50,56 C54,62 66,62 70,56 L60,66Z" fill="#2f5a8a" ${L(1.4)}/><path d="M54,64 L60,60 L66,64 L60,68Z" fill="#2f5a8a" ${L(1.4)}/>
    <path d="M40,60 C34,74 32,92 36,108 L42,108 C40,94 42,80 45,70Z" fill="#f7f6f2" ${L(2)}/>
    <g transform="translate(26 106)"><rect x="0" y="0" width="20" height="26" rx="1.5" fill="#8a3a2a" ${L(1.8)}/><rect x="3" y="-4" width="20" height="26" rx="1.5" fill="#2f5a8a" ${L(1.8)}/></g>${mano(40, 108, piel)}
    <g class="campana" style="transform-origin:82px 62px"><path d="M80,60 C88,52 94,42 96,32 L90,30 C88,40 84,48 76,54Z" fill="#f7f6f2" ${L(2)}/>${mano(94, 28, piel)}
      <path d="M92,22 L98,10" stroke="#6a4a2a" stroke-width="3.4" stroke-linecap="round"/><path d="M90,10 C90,0 106,0 106,10 L108,18 L88,18Z" fill="#d9a62a" ${L(2)}/><circle cx="98" cy="20" r="2" fill="#8a6a1a"/></g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { menton: -1, boca: 'M56,45.4 C58.6,47.2 61.4,47.2 64,45.4' })}
    <path d="M47.5,30 C45,18 52,13 61,13 C70,13 76,19 72.5,30 C70,22 64,19 60,20 C55,20 50,23 47.5,30Z" fill="#4a2a1a" ${L(2)}/><circle cx="60" cy="10" r="6" fill="#4a2a1a" ${L(2)}/>
    <path d="M50.5,33 L57.5,33 M62.5,33 L69.5,33" stroke="#3a3a3a" stroke-width="1"/>
  </g>`;
}

// P11 · Puestero de la Puna: chullo, poncho de llama, toca la quena
export function puesteroPuna() {
  const piel = '#a86c44', ps = '#7e4e30';
  return `${sombraPiso}
  ${piernas('#3e3a36', '#36322e', 126)}
  <path d="M40,198 L58,198 L58,206 L38,206 C36,206 36,201 40,200Z M80,198 L62,198 L62,206 L82,206 C84,206 84,201 80,200Z" fill="${piel}" ${L(2)}/><path d="M38,206 L58,206 M82,206 L62,206" stroke="#3a2a1e" stroke-width="3"/>
  <g class="respira" style="transform-origin:60px 126px">
    <path d="M28,64 C42,54 78,54 92,64 L98,128 C80,138 40,138 22,128Z" fill="#8a6a4e" ${L()}/>
    ${['#c8362b', '#e2a72e', '#2f7d5b', '#c8362b'].map((c, i) => `<path d="M${24 + i},${112 + i * 4} C44,${120 + i * 4} 76,${120 + i * 4} ${96 - i},${112 + i * 4}" stroke="${c}" stroke-width="2.4" fill="none"/>`).join('')}
    <path d="M60,62 L60,132" stroke="#6e5238" stroke-width="1.4" opacity=".6"/>
    <path d="M44,74 C52,80 58,82 64,80 L60,86 C54,86 48,84 42,80Z" fill="#8a6a4e" ${L(2)}/><path d="M76,74 C70,80 66,82 62,80 L66,86 C70,86 74,84 78,80Z" fill="#8a6a4e" ${L(2)}/>
    ${mano(60, 78, piel)}${mano(66, 82, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M57,46 C58.6,46.6 61.4,46.6 63,46', barba: '' })}
    <path d="M58,44 L60,90" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M58,44 L60,90" stroke="#c9a86a" stroke-width="3" stroke-linecap="round"/><circle cx="59.4" cy="62" r=".9" fill="${O}"/><circle cx="59.6" cy="70" r=".9" fill="${O}"/>
    <path d="M46,28 C44,10 76,10 74,28 L74,32 L46,32Z" fill="#c8362b" ${L()}/>${['#e2a72e', '#2f7d5b', '#f4efe2'].map((c, i) => `<path d="M46,${18 + i * 5} C56,${15 + i * 5} 64,${15 + i * 5} 74,${18 + i * 5}" stroke="${c}" stroke-width="2.4" fill="none"/>`).join('')}
    <path d="M46,30 L44,46 L50,44 L50,32Z M74,30 L76,46 L70,44 L70,32Z" fill="#c8362b" ${L(1.8)}/><path d="M44,46 L42,54 M76,46 L78,54" stroke="#e2a72e" stroke-width="2"/><circle cx="60" cy="6" r="3.4" fill="#e2a72e" ${L(1.4)}/>
  </g>`;
}

// P12 · Acampante Martina: mochila grande, saluda
export function acampante() {
  const piel = '#e0b08a', ps = '#b07e5a';
  return `${sombraPiso}
  ${piernas('#4a5a6a', '#425262', 124, 194)}${bota(52, '#6a4a32', 188)}${bota(70, '#6a4a32', 188)}<path d="M44,192 L58,192 M76,192 L62,192" stroke="#c8362b" stroke-width="2"/>
  <g class="respira" style="transform-origin:60px 124px">
    <path d="M78,58 C96,54 102,70 100,110 C98,124 92,128 84,126 L80,70Z" fill="#c4682a" ${L()}/><path d="M86,72 L100,74 M84,96 L100,98" stroke="#8a4a1e" stroke-width="2"/><path d="M90,46 C90,38 100,38 100,46 L100,58 L90,58Z" fill="#3a6a5a" ${L(2)}/>
    <path d="M40,58 C47,53 73,53 80,58 L82,126 L38,126Z" fill="#2f7d5b" ${L()}/><path d="M60,58 L60,126" stroke="#1f5a40" stroke-width="2"/><path d="M42,94 L54,94 M66,94 L78,94" stroke="#1f5a40" stroke-width="1.6"/>
    <path d="M46,60 L50,110 M74,60 L70,110" stroke="#5a3a22" stroke-width="3.4"/>
    <path d="M40,60 C34,74 33,92 35,110 L41,112 C41,96 43,80 46,68Z" fill="#2f7d5b" ${L(2)}/>${mano(37, 112, piel)}<path d="M36,116 L30,206" stroke="${O}" stroke-width="4" stroke-linecap="round"/><path d="M36,116 L30,206" stroke="#9aa3ab" stroke-width="2" stroke-linecap="round"/>
    <g class="saluda" style="transform-origin:78px 62px"><path d="M78,62 C86,52 90,42 90,30 L84,28 C84,40 80,48 74,56Z" fill="#2f7d5b" ${L(2)}/>${mano(87, 26, piel)}</g>
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M68,30 C76,36 78,48 74,56 C72,58 70,56 70,54 C72,46 70,40 66,34Z" fill="#7a4a24" ${L(1.8)}/>
    ${cara(piel, ps, { menton: -1, boca: 'M56,45 C58.4,48 61.6,48 64,45 C61.6,46 58.4,46 56,45Z' })}
    <path d="M45,28 C44,10 76,10 75,28 C70,24 50,24 45,28Z" fill="#e2a72e" ${L()}/><path d="M45,28 C50,25 70,25 75,28 L75,31 C70,28 50,28 45,31Z" fill="#c8362b" ${L(1.6)}/><circle cx="60" cy="8" r="4" fill="#c8362b" ${L(1.4)}/>
    <path d="M47,28 C48,32 50,34 52,34 M73,28 C72,32 70,34 68,34" stroke="#7a4a24" stroke-width="2.4" fill="none"/>
  </g>`;
}

// P13 · Pulpero Cacho: panzón, mano en la cintura, sifón en alto y repasador al hombro
export function pulpero() {
  const piel = '#d49a70', ps = '#a46e4c';
  return `${sombraPiso}
  <defs><pattern id="repa" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#f4efe4"/><rect width="3" height="6" fill="#c8362b" opacity=".75"/><rect width="6" height="3" fill="#c8362b" opacity=".75"/></pattern>
    <linearGradient id="vidrio" x1="0" x2="1"><stop offset="0" stop-color="#4f9a90"/><stop offset=".45" stop-color="#8fd0c4"/><stop offset="1" stop-color="#3f8078"/></linearGradient></defs>
  ${piernas('#3a3a3a', '#333333', 140)}${zapato(53, '#2a2020')}${zapato(68, '#2a2020')}
  <g class="respira" style="transform-origin:60px 140px">
    <path d="M40,58 C47,53 73,53 80,58 C92,78 96,108 88,142 L32,142 C24,108 28,78 40,58Z" fill="#e6e0d2" ${L()}/>
    <path d="M44,70 L76,70 C86,92 88,124 84,160 L36,160 C32,124 34,92 44,70Z" fill="#fbf8f0" ${L(2.2)}/>
    <path d="M44,70 L50,58 M76,70 L70,58" stroke="#d8d2c4" stroke-width="2"/><path d="M32,112 C50,116 70,116 88,112" stroke="#d8d2c4" stroke-width="2.4" fill="none"/><path d="M86,112 C92,116 92,124 88,128 M86,112 C92,114 96,120 94,126" stroke="#d8d2c4" stroke-width="2" fill="none"/>
    <path d="M48,128 L60,128 L60,140 L48,140Z" fill="none" stroke="#d8d2c4" stroke-width="1.6"/>
    <path d="M40,60 C30,70 24,82 24,92 L32,96 C32,86 36,76 44,68Z" fill="#e6e0d2" ${L(2)}/><path d="M24,90 L32,94 L33,98 L23,95Z" fill="#d8d2c4" ${L(1.4)}/>
    <path d="M28,96 C28,104 32,110 38,114 L42,108 C38,106 36,102 34,96Z" fill="${piel}" ${L(2)}/>${mano(41, 112, piel)}
    <path d="M70,54 C78,58 84,62 86,70 L84,98 L76,96 L78,72 C76,66 72,62 66,60Z" fill="url(#repa)" ${L(1.8)}/>
    <path d="M80,60 C88,68 92,80 90,92 L84,92 C84,84 82,76 76,70Z" fill="#e6e0d2" ${L(2)}/><path d="M84,90 L91,90 L92,94 L84,95Z" fill="#d8d2c4" ${L(1.4)}/>
    <path d="M86,94 C88,100 88,104 86,108 L80,106 C80,102 80,98 82,94Z" fill="${piel}" ${L(2)}/>
    <g class="sifon" style="transform-origin:86px 106px">
      <rect x="78" y="74" width="16" height="32" rx="3" fill="url(#vidrio)" ${L(2)}/><path d="M81,78 L81,102" stroke="#e8fbf6" stroke-width="2" opacity=".8"/>${[80, 88, 96].map((y) => `<path d="M78,${y} L94,${y}" stroke="#3f8078" stroke-width=".8" opacity=".6"/>`).join('')}
      <path d="M79,74 L79,64 C79,60 93,60 93,64 L93,74Z" fill="#c9cfd6" ${L(1.8)}/><path d="M82,64 L82,72" stroke="#eef2f5" stroke-width="1.6"/>
      <path d="M93,66 L104,62 L105,66 L93,70Z" fill="#c9cfd6" ${L(1.4)}/><path d="M84,60 C86,54 92,52 98,54 L97,58 C92,57 88,58 87,61Z" fill="#a9b0b8" ${L(1.4)}/>
    </g>
    ${mano(85, 104, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M48,24 C46,34 47,44 52,50 C56,53 64,53 68,50 C73,44 74,34 72,24Z" fill="${piel}"/>
    ${cara(piel, ps, { cejas: '#2a1a12', menton: 1, boca: 'M55.6,46.6 C58.4,49.4 61.6,49.4 64.4,46.6', barba: '<path d="M49,41 C52.6,38.6 57,38.4 60,40.4 C63,38.4 67.4,38.6 71,41 C67.4,44.8 63,44 60,42.4 C57,44 52.6,44.8 49,41Z" fill="#3a2418" stroke="#2a1c15" stroke-width="1.1"/>' })}
    <ellipse cx="50" cy="40" rx="3" ry="2" fill="#e08a7a" opacity=".45"/><ellipse cx="70" cy="40" rx="3" ry="2" fill="#e08a7a" opacity=".45"/>
    <path d="M47,28 C46,20 50,18 53,18 M73,28 C74,20 70,18 67,18" stroke="#3a2418" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M52,17 C56,15 64,15 68,17" stroke="#c98a64" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>`;
}

// P14 · Alambrador Tito: rollo de alambre al hombro y la pinza
export function alambrador() {
  const piel = '#c08458', ps = '#93603e';
  return `${sombraPiso}
  ${piernas('#5f5a4a', '#55503f', 122)}${bota(52, '#3a2a20', 184)}${bota(70, '#3a2a20', 184)}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M41,58 C48,53 72,53 79,58 L81,122 L39,122Z" fill="#b8a27a" ${L()}/>${[70, 86, 102].map((y) => `<path d="M41,${y} L79,${y}" stroke="#a08a62" stroke-width="1.2"/>`).join('')}
    <path d="M60,58 L60,122" stroke="#8a7650" stroke-width="1.4"/><path d="M38,114 L82,114 L82,122 L38,122Z" fill="#4a3020" ${L(1.8)}/>
    <g class="rollo">${[0, 1, 2, 3].map((i) => `<ellipse cx="${46 + i}" cy="${62 + i}" rx="${17 - i}" ry="${11 - i * 0.6}" transform="rotate(-20 46 62)" fill="none" stroke="${O}" stroke-width="3"/><ellipse cx="${46 + i}" cy="${62 + i}" rx="${17 - i}" ry="${11 - i * 0.6}" transform="rotate(-20 46 62)" fill="none" stroke="#b9bec4" stroke-width="1.4"/>`).join('')}</g>
    <path d="M41,60 C34,66 30,74 32,82 L38,84 C38,76 40,70 46,66Z" fill="#b8a27a" ${L(2)}/>${mano(36, 82, piel)}
    <path d="M79,60 C86,74 88,92 86,106 L80,108 C80,94 78,80 74,70Z" fill="#b8a27a" ${L(2)}/>
    <g transform="translate(80 106) rotate(10)"><path d="M0,0 L-4,22 M4,0 L8,22" stroke="#c8362b" stroke-width="4" stroke-linecap="round"/><path d="M-2,-6 L0,4 L6,4 L4,-6Z" fill="#7d858e" ${L(1.4)}/></g>${mano(83, 108, piel)}
    ${cuello(piel)}
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { boca: 'M56,45.6 C58.6,46.8 61.4,46.8 64,45.8', barba: '<path d="M48.5,36 C50,46 56,50 60,50 C64,50 70,46 71.5,36 C70,42 66,46 60,46 C54,46 50,42 48.5,36Z" fill="#4a2e1a" opacity=".3"/>' })}
    ${pelo('#5a3a22')}
    <path d="M40,20 C40,15 80,15 80,20 C80,24 40,24 40,20Z" fill="#7a6a4a" ${L()}/><path d="M48,19 C48,6 72,6 72,19Z" fill="#8a7a58" ${L()}/><path d="M48,16 L72,16" stroke="#4a3a22" stroke-width="2.2"/>
  </g>`;
}
