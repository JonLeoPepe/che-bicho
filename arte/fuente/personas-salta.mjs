// Gente de Salta en proporción adulta (lote 3a): capataz y domadores. viewBox 0 0 120 220, piso y=212.
import { O, L, cara, rastra, sombraPiso } from './adultos.mjs';

export const mano = (x, y, piel) => `<path d="M${x - 4},${y - 3} C${x - 5},${y + 3} ${x - 2},${y + 6} ${x + 1},${y + 6} C${x + 4},${y + 6} ${x + 5},${y + 1} ${x + 3},${y - 3}Z" fill="${piel}" ${L(1.8)}/>`;
export const bota = (x, c, alta = 180) => `<path d="M${x - 9},${alta} L${x + 7},${alta} L${x + 8},206 L${x - 12},206 C${x - 15},206 ${x - 15},201 ${x - 10},200Z" fill="${c}" ${L()}/><path d="M${x - 14},206 L${x + 8},206" stroke="${O}" stroke-width="2.4"/>`;
export const sombrero = (c, banda, ala = 26, copa = 13, y = 18) => `<path d="M${60 - ala},${y} C${60 - ala},${y - 5} ${60 + ala},${y - 5} ${60 + ala},${y} C${60 + ala},${y + 4} ${60 - ala},${y + 4} ${60 - ala},${y}Z" fill="${c}" ${L()}/><path d="M${60 - copa},${y - 2} C${60 - copa},${y - 15} ${60 + copa},${y - 15} ${60 + copa},${y - 2}Z" fill="${c}" ${L()}/><path d="M${60 - copa},${y - 4} L${60 + copa},${y - 4}" stroke="${banda}" stroke-width="2.6"/>`;

// P4 · Capataz Anselmo: brazos cruzados, poncho salteño, barbijo
export function anselmo() {
  const piel = '#c08458', ps = '#93603e';
  return `${sombraPiso}
  <path d="M46,124 L44,194 L58,194 L60,126Z" fill="#26211f" ${L()}/><path d="M74,124 L76,194 L62,194 L60,126Z" fill="#1f1b19" ${L()}/>
  ${bota(52, '#1a1614', 182)}${bota(70, '#1a1614', 182)}
  <g class="respira" style="transform-origin:60px 124px">
    <path d="M38,58 C46,52 74,52 82,58 L84,124 L36,124Z" fill="#efe8da" ${L()}/>
    <path d="M36,114 L84,114 L84,126 L36,126Z" fill="#1f1b19" ${L(1.8)}/>${rastra(108)}
    <path d="M34,60 C46,52 74,52 86,60 L94,96 C80,104 40,104 26,96Z" fill="#a42a2a" ${L()}/>
    <path d="M28,90 C44,98 76,98 92,90 L93,94 C76,102 44,102 27,94Z" fill="#1c1716"/><path d="M27,96 C44,104 76,104 93,96" stroke="#1c1716" stroke-width="2.4" fill="none"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<path d="M${30 + i * 7.5},${98 + Math.sin((i / 8) * Math.PI) * 4} l0,5" stroke="#7c1f1f" stroke-width="1.6"/>`).join('')}
    <path d="M40,82 C50,78 70,78 80,82 L82,92 C70,88 50,88 38,92Z" fill="#8e2424" ${L(2)}/><path d="M38,92 C50,86 70,86 82,92 L80,98 C70,94 50,94 40,98Z" fill="#a42a2a" ${L(2)}/>
    ${mano(36, 92, piel)}${mano(84, 86, piel)}
    <path d="M48,54 C53,61 67,61 72,54 L69,52 C66,57 54,57 51,52Z" fill="#efe6d2" ${L(1.6)}/>
    <path d="M55,46 L55,55 L65,55 L65,46Z" fill="${piel}" ${L(2)}/>
    <g transform="translate(86 104)"><path d="M0,0 L8,40" stroke="#3a2a1e" stroke-width="3.4" stroke-linecap="round"/><path d="M8,40 C12,48 8,56 12,62" stroke="#3a2a1e" stroke-width="1.6" fill="none"/></g>
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { cejas: '#1c120c', boca: 'M56,46.4 C58.5,46.8 61.5,46.8 64,46.4', barba: '<path d="M50,41.6 C53,39.6 57,39.4 60,41 C63,39.4 67,39.6 70,41.6 C67,44.6 63,44 60,42.6 C57,44 53,44.6 50,41.6Z" fill="#1d1410" stroke="#2a1c15" stroke-width="1.2"/><path d="M48,30 L48,38 M72,30 L72,38" stroke="#1d1410" stroke-width="3"/>' })}
    <path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="#1d1410"/>
    <path d="M47,24 C46,36 50,48 58,52 M73,24 C74,36 70,48 62,52" stroke="#4a3a2a" stroke-width="1.2" fill="none"/>
    ${sombrero('#1c1716', '#7a1f1f', 28, 14, 18)}
  </g>`;
}

// P5 · Arriero Benito: lazo enrollado al hombro
export function arriero() {
  const piel = '#c98d62', ps = '#9c6440';
  return `${sombraPiso}
  <path d="M48,122 L46,194 L58,194 L60,124Z" fill="#8f8a7e" ${L()}/><path d="M72,122 L74,194 L62,194 L60,124Z" fill="#7f7a6e" ${L()}/>
  <path d="M42,150 L60,150 L60,188 L40,188Z M78,150 L60,150 L60,188 L80,188Z" fill="#8a5a36" ${L(2.2)}/>${[158, 168, 178].map((y) => `<path d="M42,${y} L58,${y} M78,${y} L62,${y}" stroke="#6a4226" stroke-width="1.4"/>`).join('')}
  ${bota(52, '#4a3020', 186)}${bota(70, '#4a3020', 186)}
  <g class="respira" style="transform-origin:60px 122px">
    <path d="M40,58 C47,53 73,53 80,58 L82,122 L38,122Z" fill="#a9c6d6" ${L()}/>
    <path d="M40,58 L38,122 L50,122 L53,64Z M80,58 L82,122 L70,122 L67,64Z" fill="#6b4a2e" ${L(2)}/>
    <path d="M48,54 C52,62 68,62 72,54 L69,52 C66,57 54,57 51,52Z" fill="#2f5a8a" ${L(1.6)}/><path d="M58,60 L56,68 L60,65 L63,70 L62,60Z" fill="#2f5a8a" ${L(1.3)}/>
    ${rastra(112)}
    <path d="M40,60 C34,74 33,92 35,110 L41,112 C41,96 43,80 46,68Z" fill="#a9c6d6" ${L(2)}/><path d="M34,96 L41,98" stroke="#8aa8b8" stroke-width="3"/>
    <path d="M80,60 C88,70 92,82 92,94 L86,96 C84,86 80,76 74,68Z" fill="#a9c6d6" ${L(2)}/><path d="M86,92 L92,90" stroke="#8aa8b8" stroke-width="3"/>
    ${mano(37, 112, piel)}${mano(89, 98, piel)}
    <g class="lazo">${[0, 1, 2].map((i) => `<ellipse cx="${64 + i * 1.5}" cy="${78 + i * 2}" rx="${18 - i * 2}" ry="${24 - i * 2}" transform="rotate(-28 64 78)" fill="none" stroke="${O}" stroke-width="4.2"/><ellipse cx="${64 + i * 1.5}" cy="${78 + i * 2}" rx="${18 - i * 2}" ry="${24 - i * 2}" transform="rotate(-28 64 78)" fill="none" stroke="#c9a86a" stroke-width="2.2"/>`).join('')}
      <path d="M88,100 C96,112 94,126 100,136 C104,142 100,150 96,152" stroke="${O}" stroke-width="4" fill="none"/><path d="M88,100 C96,112 94,126 100,136 C104,142 100,150 96,152" stroke="#c9a86a" stroke-width="2" fill="none"/></g>
    <path d="M55.5,46 L55.5,55 L64.5,55 L64.5,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    ${cara(piel, ps, { boca: 'M56,45.6 C58.6,47 61.6,47 64.2,45.2', barba: '<path d="M48.5,36 C50,46 56,50 60,50 C64,50 70,46 71.5,36 C70,42 66,46 60,46 C54,46 50,42 48.5,36Z" fill="#5a3a24" opacity=".35"/>' })}
    <path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="#4a2e1a"/>
    ${sombrero('#c9ae7a', '#6a4a2a', 22, 12, 18)}
  </g>`;
}

// P6 · Puestero Cirilo: viejo, apoyado en el cayado con las dos manos
export function puestero() {
  const piel = '#b57b52', ps = '#8a5a38';
  return `${sombraPiso}
  <path d="M86,40 L84,208" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M86,40 L84,208" stroke="#8a6a46" stroke-width="3.6" stroke-linecap="round"/><path d="M86,40 C86,30 96,30 96,38" stroke="${O}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M86,40 C86,30 96,30 96,38" stroke="#8a6a46" stroke-width="3.6" fill="none" stroke-linecap="round"/>
  <path d="M46,126 L44,198 L56,198 L58,128Z" fill="#5a4a3a" ${L()}/><path d="M70,126 L72,198 L60,198 L58,128Z" fill="#4e4032" ${L()}/>
  <path d="M42,198 L58,198 L58,206 L40,206 C38,206 38,201 42,200Z M74,198 L60,198 L60,206 L76,206 C78,206 78,201 74,200Z" fill="${piel}" ${L(2)}/><path d="M40,206 L58,206 M76,206 L60,206" stroke="#5a3a24" stroke-width="3"/><path d="M48,200 L54,198 M68,200 L64,198" stroke="#5a3a24" stroke-width="1.6"/>
  <g class="respira" style="transform-origin:58px 126px">
    <path d="M38,62 C45,56 71,56 78,62 L80,126 L36,126Z" fill="#e2d8c4" ${L()}/>
    <path d="M32,64 C44,54 72,54 84,64 L90,104 C74,112 42,112 26,104Z" fill="#7a5a3e" ${L()}/>
    ${[0, 1, 2, 3].map((i) => `<path d="M${30 + i * 2},${92 + i * 3} C50,${98 + i * 3} 66,${98 + i * 3} ${86 - i * 2},${92 + i * 3}" stroke="${i % 2 ? '#5e432c' : '#a07a52'}" stroke-width="1.6" fill="none"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${30 + i * 8},${106 + Math.sin((i / 7) * Math.PI) * 4} l0,5" stroke="#5e432c" stroke-width="1.6"/>`).join('')}
    <path d="M80,70 C86,58 88,48 86,42 L80,44 C80,52 76,60 72,66Z" fill="#7a5a3e" ${L(2)}/>${mano(86, 40, piel)}${mano(86, 50, piel)}
    <path d="M54,48 L54,58 L64,58 L64,48Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:58px 54px" transform="translate(-2 4)">
    ${cara(piel, ps, { cejas: '#cfc8bd', arrugas: true, boca: 'M56,46 C58.5,46.8 61.5,46.8 64,46', barba: '<path d="M50,42 C53,40 57,39.8 60,41.4 C63,39.8 67,40 70,42 C67,45.4 63,44.6 60,43 C57,44.6 53,45.4 50,42Z" fill="#d8d2c8" stroke="#2a1c15" stroke-width="1.2"/>' })}
    <path d="M46,22 C46,10 74,10 74,22 C74,24 46,24 46,22Z" fill="#2a2624" ${L()}/><path d="M58,10 l2,-4" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>
  </g>`;
}

// P7 · Coplera (domadora): canta tocando la caja
export function copleraSalta() {
  const piel = '#c48a60', ps = '#98603e';
  return `${sombraPiso}
  <path d="M52,180 L52,198 L58,198 L58,180Z M68,180 L68,198 L62,198 L62,180Z" fill="${piel}" ${L(2)}/>
  <path d="M46,198 L58,198 L58,206 L44,206 C42,206 42,201 46,200Z M74,198 L62,198 L62,206 L76,206 C78,206 78,201 74,200Z" fill="#3a2a22" ${L(2)}/>
  <g class="respira" style="transform-origin:60px 180px">
    <path d="M40,108 C34,134 30,160 28,184 C48,190 72,190 92,184 C90,160 86,134 80,108Z" fill="#26386a" ${L()}/>
    <path d="M30,172 C48,178 72,178 90,172 L91,177 C72,183 48,183 29,177Z" fill="#c8362b"/>
    <path d="M42,60 C48,54 72,54 78,60 L80,110 L40,110Z" fill="#f4efe4" ${L()}/>${[0, 1, 2].map((i) => `<circle cx="${52 + i * 8}" cy="${70 + (i % 2) * 4}" r="1.8" fill="#c8362b"/>`).join('')}
    <path d="M38,62 C46,74 60,86 82,100 L86,92 C70,82 58,72 50,60Z" fill="#b3261e" ${L(2)}/><path d="M82,60 C76,72 66,82 46,96 L40,90 C56,80 66,70 72,60Z" fill="#c8362b" ${L(2)}/>
    <path d="M42,62 C36,76 34,92 38,106 L44,104 C42,92 44,78 47,70Z" fill="#f4efe4" ${L(2)}/>${mano(40, 106, piel)}
    <g transform="translate(26 94)"><ellipse cx="14" cy="14" rx="15" ry="15" fill="#efe4c8" ${L(2.4)}/><ellipse cx="14" cy="14" rx="10" ry="10" fill="none" stroke="#c8a77a" stroke-width="1.4"/>${[0, 1, 2].map((i) => `<path d="M${6 + i * 8},28 C${4 + i * 8},40 ${8 + i * 8},48 ${4 + i * 8},56" stroke="${['#c8362b', '#e2a72e', '#2f7d5b'][i]}" stroke-width="2.4" fill="none"/>`).join('')}</g>
    <path d="M78,62 C86,70 92,80 92,90 L86,92 C84,84 80,76 74,70Z" fill="#f4efe4" ${L(2)}/>
    <g class="maza" style="transform-origin:88px 92px"><path d="M88,92 L76,104" stroke="#7a4a2a" stroke-width="3" stroke-linecap="round"/><circle cx="75" cy="105" r="3.6" fill="#efe6d2" ${L(1.6)}/>${mano(89, 91, piel)}</g>
    <path d="M55.5,46 L55.5,56 L64.5,56 L64.5,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:60px 52px">
    <path d="M70,28 C78,38 78,58 72,70 C70,74 66,72 67,68 C72,56 70,42 66,34Z" fill="#20140e" ${L(2)}/>
    ${cara(piel, ps, { cejas: '#1c120c', menton: -1, boca: 'M56.5,45 C57.5,48.6 62.5,48.6 63.5,45 C61.5,46 58.5,46 56.5,45Z' })}
    <path d="M47.5,30 C45,18 52,13 61,13 C70,13 76,19 72.5,30 C70,22 64,19 60,20 C55,20 50,23 47.5,30Z" fill="#20140e" ${L(2)}/>
    ${sombrero('#d9c08a', '#c8362b', 24, 12, 18)}<path d="M44,18 L42,24 M76,18 L78,24" stroke="#b89a62" stroke-width="1.2"/>
  </g>`;
}

// P8 · Baqueano Fermín: agachado, lee las huellas
export function baqueano() {
  const piel = '#b97c50', ps = '#8f5a36';
  return `${sombraPiso}
  <path d="M66,170 L80,170 L84,202 L70,204Z" fill="#6a6450" ${L()}/><path d="M80,196 C88,198 96,200 100,204 L100,208 L76,208Z" fill="#4a3424" ${L(2)}/>
  <path d="M42,168 L60,170 L54,186 L38,184Z" fill="#7a7460" ${L()}/><path d="M38,182 L54,184 L52,200 L40,200Z" fill="#7a7460" ${L()}/>
  <path d="M36,196 L54,196 L56,208 L32,208 C30,208 30,203 34,202Z" fill="#4a3424" ${L()}/>
  <g transform="translate(0 26)"><g class="respira" style="transform-origin:62px 150px">
    <path d="M44,92 C50,86 76,86 82,92 L84,148 L40,148Z" fill="#6f7a4a" ${L()}/>
    <path d="M44,92 L40,148 L50,148 L54,98Z" fill="#5a643a"/>${rastra(140)}
    <path d="M50,88 C54,96 70,96 74,88 L71,86 C68,91 56,91 53,86Z" fill="#b3261e" ${L(1.6)}/>
    <path d="M46,96 C40,120 34,150 30,174 L36,176 C40,152 46,124 52,104Z" fill="#6f7a4a" ${L(2)}/>${mano(33, 178, piel)}
    <path d="M80,96 C88,110 90,124 86,140 L80,140 C82,128 80,116 74,104Z" fill="#6f7a4a" ${L(2)}/>${mano(83, 142, piel)}
    <path d="M57,80 L57,90 L67,90 L67,80Z" fill="${piel}" ${L(2)}/>
  </g></g>
  <g transform="translate(2 60)"><g class="cabeza" style="transform-origin:62px 52px">
    ${cara(piel, ps, { boca: 'M56,46 C58.5,46.8 61.5,46.8 64,45.6', barba: '<path d="M48.5,36 C50,46 56,50 60,50 C64,50 70,46 71.5,36 C70,42 66,46 60,46 C54,46 50,42 48.5,36Z" fill="#3a2418" opacity=".4"/>' })}
    <path d="M47,26 C46,20 52,16 60,16 C68,16 74,20 73,26 C70,22 64,20 60,21 C55,20 50,22 47,26Z" fill="#3a2418"/>
    ${sombrero('#d4ba84', '#5a3a22', 30, 12, 18)}
  </g></g>`;
}
