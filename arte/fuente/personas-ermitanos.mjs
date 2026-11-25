// Ermitaños de los rincones (lote 15f). Proporción adulta, viewBox 0 0 120 215, piso y≈206.
import { O, L, cara, sombraPiso } from './adultos.mjs';
import { mano } from './personas-salta.mjs';

// E1 Salta, monte: Don Higinio, mielero del monte. Barba blanca larga, sombrero aludo de paja gastado, calabaza de miel.
export function higinio() {
  const piel = '#b0764c', ps = '#86563a';
  return `${sombraPiso}
  <path d="M46,128 L44,196 L57,196 L58,130Z" fill="#7a7466" ${L()}/><path d="M70,128 L73,196 L60,196 L58,130Z" fill="#6c665a" ${L()}/>
  <path d="M44,182 L57,182 L57,196 L44,196Z M60,182 L73,182 L73,196 L60,196Z" fill="#8a8476" ${L(1.6)}/>
  <path d="M42,196 L58,196 L58,204 L40,204 C38,204 38,199 42,198Z M75,196 L60,196 L60,204 L77,204 C79,204 79,199 75,198Z" fill="#e2d8c4" ${L(2)}/><path d="M40,204 L58,204 M77,204 L60,204" stroke="#5a4a3a" stroke-width="3"/>
  <g class="respira" style="transform-origin:58px 128px">
    <path d="M36,62 C44,56 72,56 80,62 L82,130 L34,130Z" fill="#6a7a4a" ${L()}/>
    <path d="M40,64 L46,130 M76,64 L70,130" stroke="#55643a" stroke-width="2"/>
    <path d="M40,64 C38,90 40,112 46,130 L34,130 L36,66Z M76,64 C78,90 76,112 70,130 L82,130 L80,66Z" fill="#5a4a36" ${L(2)}/>
    <path d="M58,60 L96,112" stroke="#6b4a2a" stroke-width="3"/><path d="M88,104 C86,114 92,124 100,122 C108,120 108,108 102,102Z" fill="#8a6a3e" ${L(1.8)}/>
    <path d="M34,66 C28,84 28,100 32,112 L40,110 C38,98 40,84 42,72Z" fill="#6a7a4a" ${L(2)}/>${mano(34, 114, piel)}
    <g transform="translate(22 112)"><path d="M6,0 C-2,2 -4,14 2,20 C8,26 18,24 20,16 C22,8 16,0 10,0Z" fill="#c9923a" ${L(1.8)}/><path d="M6,0 C6,-4 10,-6 10,-2Z" fill="#8a6a3e" ${L(1.4)}/><path d="M4,10 C8,12 14,12 18,10" stroke="#e8b85a" stroke-width="1.6" fill="none"/></g>
    <path d="M80,66 C86,82 86,96 84,108 L76,108 C78,96 76,84 74,72Z" fill="#6a7a4a" ${L(2)}/>${mano(80, 110, piel)}
    <path d="M54,48 L54,58 L64,58 L64,48Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:58px 54px" transform="translate(-2 4)">
    ${cara(piel, ps, { cejas: '#e8e4dc', arrugas: true, boca: 'M56,46 C58.5,46.8 61.5,46.8 64,46' })}
    <path d="M48,38 C46,52 50,70 60,78 C70,70 74,52 72,38 C68,44 64,46 60,46 C56,46 52,44 48,38Z" fill="#eeebe4" ${L(1.8)}/>
    <path d="M54,52 C56,60 58,66 60,72 M66,52 C64,60 62,66 60,72" stroke="#c9c4ba" stroke-width="1.2" fill="none"/>
    <path d="M52,44 C55,42 58,42 60,43.5 C62,42 65,42 68,44" stroke="#eeebe4" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M30,24 C30,20 90,20 90,24 C90,29 30,29 30,24Z" fill="#c9a85a" ${L(2)}/><path d="M34,26 l-3,4 M44,27 l-2,4 M78,27 l2,4 M86,26 l3,4" stroke="#a8884a" stroke-width="1.4"/>
    <path d="M46,23 C46,10 74,10 74,23Z" fill="#c9a85a" ${L(2)}/><path d="M47,20 L73,20" stroke="#6b4a2a" stroke-width="3"/>
  </g>`;
}

// E2 Corrientes, isla: Don Anacleto, isleño. Flaco y alto, sombrero de paja de copa redonda, camisa celeste, descalzo, farol en la mano.
export function anacleto() {
  const piel = '#9a6640', ps = '#74482c';
  return `${sombraPiso}
  <path d="M48,126 L47,182 L57,182 L58,128Z" fill="#f2ece0" ${L()}/><path d="M68,126 L70,182 L60,182 L58,128Z" fill="#e8e0d2" ${L()}/>
  <path d="M47,182 L57,182 L57,198 L47,198Z M60,182 L70,182 L70,198 L60,198Z" fill="${piel}" ${L(1.8)}/>
  <path d="M45,198 L58,198 C59,204 56,206 52,206 L44,206 C41,206 41,201 45,199Z M72,198 L60,198 C59,204 62,206 66,206 L74,206 C77,206 77,201 73,199Z" fill="${piel}" ${L(1.8)}/>
  <path d="M46,180 L58,180 M59,180 L71,180" stroke="#d8cfbe" stroke-width="3"/>
  <g class="respira" style="transform-origin:58px 126px">
    <path d="M40,60 C46,55 70,55 76,60 L78,128 L38,128Z" fill="#8ec4d8" ${L()}/>
    <path d="M52,58 L58,76 L64,58" fill="#f2ece0" ${L(1.6)}/><path d="M58,76 L58,126" stroke="#6aa4ba" stroke-width="1.6"/>${[86, 100, 114].map((y) => `<circle cx="61" cy="${y}" r="1.4" fill="#f2ece0" stroke="${O}" stroke-width=".8"/>`).join('')}
    <path d="M40,122 L78,122 L78,128 L40,128Z" fill="#2a2624" ${L(1.6)}/>
    <path d="M40,62 C34,78 32,96 34,106 L42,106 C42,94 44,80 46,70Z" fill="#8ec4d8" ${L(2)}/>${mano(38, 108, piel)}
    <path d="M76,62 C84,76 90,88 92,98 L84,102 C82,92 78,82 72,72Z" fill="#8ec4d8" ${L(2)}/>${mano(90, 102, piel)}
    <g transform="translate(90 104)"><path d="M0,0 L0,8" stroke="${O}" stroke-width="2"/><path d="M-6,8 L6,8 L7,26 L-7,26Z" fill="#f2c25a" ${L(1.6)}/><path d="M-3,12 L-3,22 M3,12 L3,22" stroke="#c8962a" stroke-width="1.2"/><path d="M-8,26 L8,26 L8,30 L-8,30Z" fill="#3a3a3a" ${L(1.4)}/><path d="M-5,8 C-5,4 5,4 5,8" fill="#3a3a3a" ${L(1.4)}/><circle cx="0" cy="17" r="16" fill="#ffd27a" opacity=".18"/></g>
    <path d="M54,46 L54,58 L64,58 L64,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:58px 52px" transform="translate(-2 2)">
    ${cara(piel, ps, { cejas: '#9a948a', arrugas: true, boca: 'M56,46 C58.5,46.8 61.5,46.8 64,46', barba: '<path d="M49,38 C50,46 55,50 60,50.5 C65,50 70,46 71,38 C68,43 64,44 60,44 C56,44 52,43 49,38Z" fill="#a8a29a" stroke="#2a1c15" stroke-width="1.2" opacity=".9"/>' })}
    <path d="M34,25 C34,20 86,20 86,25 C86,30 34,30 34,25Z" fill="#e0c88a" ${L(2)}/><path d="M46,24 C44,8 76,8 74,24Z" fill="#e0c88a" ${L(2)}/><path d="M46,21 L74,21" stroke="#2f6a8a" stroke-width="3.4"/>${[40, 52, 68, 80].map((x) => `<path d="M${x},23 l2,3" stroke="#b8a060" stroke-width="1.2"/>`).join('')}
  </g>`;
}

// E3 Jujuy, cumbres: Don Pascual, pastor de altura. Poncho largo de vicuña, chullo con orejeras, ojotas y bastón de queñoa.
export function pascual() {
  const piel = '#a86a42', ps = '#7e4a2c';
  return `${sombraPiso}
  <path d="M50,150 L49,194 L58,194 L58,152Z" fill="#3a3a44" ${L()}/><path d="M66,150 L68,194 L60,194 L59,152Z" fill="#33333c" ${L()}/>
  <path d="M46,194 L59,194 L59,202 L44,202 C42,202 42,198 46,197Z M71,194 L59,194 L59,202 L73,202 C75,202 75,198 71,197Z" fill="${piel}" ${L(1.8)}/><path d="M44,203 L59,203 M73,203 L59,203" stroke="#4a3a2a" stroke-width="3"/><path d="M50,196 L56,200 M68,196 L62,200" stroke="#4a3a2a" stroke-width="1.6"/>
  <path d="M94,38 L92,204" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M94,38 L92,204" stroke="#9a7a52" stroke-width="4" stroke-linecap="round"/>${[60, 120, 170].map((y) => `<path d="M${94 - y * 0.012},${y} l-1,3" stroke="#6a4a2a" stroke-width="1.4"/>`).join('')}
  <g class="respira" style="transform-origin:58px 150px">
    <path d="M58,56 C40,56 28,70 22,152 L94,152 C88,70 76,56 58,56Z" fill="#b89068" ${L()}/>
    ${[0, 1, 2].map((i) => `<path d="M${25 + i * 1.5},${136 + i * 5} L${91 - i * 1.5},${136 + i * 5}" stroke="${['#7a3a2a', '#e8c23a', '#7a3a2a'][i]}" stroke-width="2.6"/>`).join('')}
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${24 + i * 6},152 l0,5" stroke="#8a6a46" stroke-width="1.6"/>`).join('')}
    <path d="M50,58 L58,74 L66,58" fill="#7a3a2a" ${L(1.6)}/>
    <path d="M80,96 C84,96 88,98 90,100 L88,106 C86,104 82,103 80,103Z" fill="#9a7452" ${L(1.6)}/>${mano(92, 100, piel)}
  </g>
  <g class="cabeza" style="transform-origin:58px 52px" transform="translate(-2 4)">
    ${cara(piel, ps, { cejas: '#5a4a3a', arrugas: true, boca: 'M56,46.4 C58.5,47 61.5,47 64,46.4' })}
    <path d="M46,30 C44,8 76,8 74,30 C74,22 46,22 46,30Z" fill="#c8362b" ${L(2)}/>
    <path d="M47,22 L73,22 M46.5,26 L73.5,26" stroke="#e8c23a" stroke-width="2.4"/>${[51, 57, 63, 69].map((x) => `<circle cx="${x}" cy="16.5" r="1.5" fill="#f4ead2"/>`).join('')}
    <path d="M46,28 C44,34 44,40 46,44 L50,44 C49,38 49,33 50,29Z M74,28 C76,34 76,40 74,44 L70,44 C71,38 71,33 70,29Z" fill="#c8362b" ${L(1.8)}/>
    <path d="M46,44 C44,50 44,54 43,58 M74,44 C76,50 76,54 77,58" stroke="#e8c23a" stroke-width="2" fill="none"/><circle cx="43" cy="59" r="2.4" fill="#e8c23a" ${L(1)}/><circle cx="77" cy="59" r="2.4" fill="#e8c23a" ${L(1)}/>
    <circle cx="60" cy="9" r="3.4" fill="#e8c23a" ${L(1.4)}/>
  </g>`;
}

// Domador de las yungas de Jujuy: Cañero Zenón, zafrero. Sombrero de paja aludo, camisa celeste arremangada, pañuelo rojo, atado de cañas al hombro.
export function zenon() {
  const piel = '#9a6a42', ps = '#744a2c';
  const canas = [0, 1, 2, 3].map((i) => `<path d="M${30 + i * 4},${150 - i * 2} L${96 + i * 4},${10 - i * 2}" stroke="${O}" stroke-width="7" stroke-linecap="round"/><path d="M${30 + i * 4},${150 - i * 2} L${96 + i * 4},${10 - i * 2}" stroke="${['#c8b86a', '#b8a85a', '#d8c87a', '#a8984a'][i]}" stroke-width="4.4" stroke-linecap="round"/>${[.3, .55, .8].map((t) => `<path d="M${(30 + i * 4 + 66 * t).toFixed(1)},${(150 - i * 2 - 140 * t).toFixed(1)} l3,1.4" stroke="#7a6a2a" stroke-width="1.6"/>`).join('')}`).join('');
  const hojas = [0, 1, 2].map((i) => `<path d="M${98 + i * 4},${8 - i * 2} C${104 + i * 4},${-2} ${112 + i * 6},${-2} ${118 + i * 2},${6}" stroke="#5f8a3a" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');
  return `${sombraPiso}
  <path d="M47,128 L46,190 L57,190 L58,130Z" fill="#7a5a3e" ${L()}/><path d="M69,128 L72,190 L60,190 L59,130Z" fill="#6a4e36" ${L()}/>
  <path d="M44,190 L58,190 L58,200 L42,200 C40,200 40,196 44,195Z M74,190 L60,190 L60,200 L76,200 C78,200 78,196 74,195Z" fill="#e2d8c4" ${L(2)}/><path d="M42,201 L58,201 M76,201 L60,201" stroke="#5a4a3a" stroke-width="3"/>
  <g class="respira" style="transform-origin:58px 128px">
    ${canas}${hojas}
    <path d="M38,60 C44,55 72,55 78,60 L80,130 L36,130Z" fill="#8ec4d8" ${L()}/>
    <path d="M50,58 L58,72 L66,58" fill="#c8362b" ${L(1.6)}/><path d="M36,122 L80,122 L80,130 L36,130Z" fill="#3a2a22" ${L(1.6)}/>
    <path d="M38,62 C32,80 30,96 32,106 L40,106 C40,94 42,80 44,70Z" fill="#8ec4d8" ${L(2)}/><path d="M31,100 L41,100" stroke="#6aa4ba" stroke-width="2"/>${mano(36, 108, piel)}
    <path d="M78,62 C86,70 90,78 90,86 L82,90 C80,82 78,76 72,70Z" fill="#8ec4d8" ${L(2)}/>${mano(88, 88, piel)}
    <path d="M54,46 L54,58 L64,58 L64,46Z" fill="${piel}" ${L(2)}/>
  </g>
  <g class="cabeza" style="transform-origin:58px 52px" transform="translate(-2 2)">
    ${cara(piel, ps, { cejas: '#2a1c15', boca: 'M56,46 C58.5,47 61.5,47 64,46', barba: '<path d="M49,40 C51,46 55,48 60,48.5 C65,48 69,46 71,40" stroke="#4a3a2a" stroke-width="1.2" fill="none" opacity=".6"/>' })}
    <path d="M28,24 C28,19 92,19 92,24 C92,29 28,29 28,24Z" fill="#d8c48a" ${L(2)}/><path d="M45,23 C44,9 76,9 75,23Z" fill="#d8c48a" ${L(2)}/><path d="M45,20 L75,20" stroke="#5a3a22" stroke-width="3"/>${[34, 44, 76, 86].map((x) => `<path d="M${x},26 l1,3" stroke="#b8a060" stroke-width="1.2"/>`).join('')}
  </g>`;
}
