// Catálogo para aprobar, lote 24a: prendas de Don Abel, Piedra de la Pachamama, pilchas (jugador y jugadora),
// combate contra salvajes (carácter, paciencia, tiros, Rajá) y aviso de avance de changa.
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { jugador, jugadora, maestro } from './adultos.mjs';
import { pasacan } from './catalogo-1.mjs';
import { kirkallpa, llamaru, mallku } from './catalogo-2.mjs';
import { miyura, pirkasol } from './catalogo-3.mjs';
import { O as O29, T, fondo as fondoCuero, cab, papel, chipTipo, moneda, tel, css as css29 } from './catalogo-29.mjs';
import { boton } from './catalogo-30.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { FONDOS, especieIco } from './catalogo-40.mjs';
import { tecnica, fondoCombate, tagE, vida, rombos, chip, panel, relevos, retrato, pie, msgT, btn, icoCubre, icoRel, H, CU } from './catalogo-60.mjs';

const O = '#2a1c15';
const L = (c = O, w = 2) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0; const id = (p) => `${p}${uid++}`;

// ════════════ 1. Prendas de Don Abel (íconos 40×40, mismo estilo que las de la feria) ════════════
const PR = {
  vicuna: `<path d="M8,6 L32,6 L38,34 L2,34Z" fill="#d9b98a" ${L(O, 1.8)}/><path d="M4,25 L36,25" stroke="#f6ecd8" stroke-width="4"/><path d="M4,22 L36,22 M3.4,28.4 L36.6,28.4" stroke="#8a5a32" stroke-width="1.3"/>${[6, 12, 18, 24, 30].map((x) => `<path d="M${x},25 l2.4,-2 l2.4,2 l-2.4,2Z" fill="#8a5a32"/>`).join('')}<path d="M15,6 C16,11 24,11 25,6" fill="#8a5a32" ${L(O, 1.4)}/>${[4, 9, 14, 19, 24, 29, 34].map((x) => `<path d="M${x},34 L${x - .4},38" stroke="#b8975e" stroke-width="1.6" stroke-linecap="round"/>`).join('')}`,
  palma: `<ellipse cx="20" cy="26" rx="19" ry="7" fill="#e2c98a" ${L(O, 1.8)}/><path d="M9,25 C9,10 31,10 31,25Z" fill="#ecd59a" ${L(O, 1.8)}/><path d="M9.6,21 C14,23 26,23 30.4,21 L31,25 C26,27 14,27 9,25Z" fill="#2f7d5b" ${L(O, 1.2)}/>${[13, 17, 21, 25].map((x) => `<path d="M${x},12.5 L${x + 2},20" stroke="#c9a85e" stroke-width="1.1"/>`).join('')}${[4, 10, 30, 36].map((x) => `<path d="M${x},${x < 20 ? 27 : 27} l2.6,3" stroke="#c9a85e" stroke-width="1.1"/>`).join('')}`,
  aguayo: `<path d="M4,6 C14,4 26,8 36,6 L36,34 C26,36 14,32 4,34Z" fill="#c8302a" ${L(O, 1.8)}/>${[['#2f7d5b', 10], ['#f2b03a', 15], ['#7a3a8a', 20], ['#e85a8a', 25], ['#2f5a9a', 30]].map(([c, y]) => `<path d="M4.4,${y} C14,${y - 2} 26,${y + 2} 35.6,${y}" stroke="${c}" stroke-width="3.2" fill="none"/>`).join('')}${[10, 20, 30].map((x) => `<path d="M${x},${20 + (x === 20 ? 0 : 0)} l2.6,-2.6 l2.6,2.6 l-2.6,2.6Z" fill="#fbf3e2" ${L(O, .8)}/>`).join('')}`,
};
const PRENDAS_ABEL = [
  ['D1', 'vicuna', 'Poncho de vicuña', 'Salta', '+10 % de Defensa y +5 % de Vida.'],
  ['D2', 'palma', 'Sombrero de palma', 'Corrientes', '+1 de Velocidad y +5 % de Ataque.'],
  ['D3', 'aguayo', 'Aguayo', 'Jujuy', '+10 % de Defensa y entra con +1 de aguante.'],
];
const fichaIco = (cod, inner, nom, efecto, extra, vb = '-4 -4 48 48') => `<figure class="ico"><span class="cod">${cod}</span><div>${svg(vb, inner)}</div><figcaption><b>${nom}</b><span>${efecto}</span><i>${extra}</i></figcaption></figure>`;

// D4: el momento en que Don Abel la entrega
const rayos = `<g class="gira" style="transform-origin:180px 330px">${Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, b = a + .1; return `<path d="M180,330 L${(180 + Math.cos(a) * 190).toFixed(1)},${(330 + Math.sin(a) * 190).toFixed(1)} L${(180 + Math.cos(b) * 190).toFixed(1)},${(330 + Math.sin(b) * 190).toFixed(1)}Z" fill="#f2d23a" opacity=".22"/>`; }).join('')}</g>`;
const D4 = svg('0 0 360 760', `${fondoCuero}${cab('Libreta de Salta')}${papel(16, 70, 328, 672)}
  <defs><clipPath id="d4c"><rect x="16" y="70" width="328" height="672" rx="16"/></clipPath></defs><g clip-path="url(#d4c)">${rayos}</g>
  ${T(180, 112, 20, '¡Libreta completa!', { f: 'Bree', a: 'middle', c: '#7a4a2a' })}${T(180, 136, 12.5, 'Las 10 familias de Salta, atrapadas.', { w: 700, a: 'middle', c: '#5a3e28' })}
  <g transform="translate(36 190) scale(.95)">${maestro()}</g>
  <g transform="translate(196 236)"><g class="flota"><g transform="scale(2.6)">${PR.vicuna}</g></g></g>
  ${T(180, 470, 14.5, 'Don Abel te da su prenda:', { f: 'Bree', a: 'middle' })}${T(180, 498, 22, 'Poncho de vicuña', { f: 'Bree', a: 'middle', c: '#8a5a32' })}
  ${T(180, 524, 12.5, '+10 % de Defensa y +5 % de Vida', { w: 800, a: 'middle', c: '#2f7d5b' })}
  ${T(180, 556, 12, 'Es única: no se compra ni se repite.', { a: 'middle', c: '#5a3e28' })}${T(180, 576, 12, 'Se pone a un bicho de nivel 3 o más.', { a: 'middle', c: '#5a3e28' })}
  ${boton(50, 616, 260, 'Ponérsela a un bicho', '#2f7d5b')}${T(180, 702, 12.5, 'Ahora no', { w: 800, a: 'middle', c: '#7a4a2a' })}`);

// ════════════ 2. Piedra de la Pachamama ════════════
const piedra = (s = 1) => `<g transform="scale(${s})"><path d="M6,30 C3,20 10,9 20,8 C31,7 38,16 36,27 C35,34 28,38 20,38 C12,38 7,35 6,30Z" fill="#8a7a66" ${L(O, 2)}/><path d="M10,30 C9,22 14,14 21,13" fill="none" stroke="#a8987e" stroke-width="2.2" stroke-linecap="round"/><circle cx="22" cy="24" r="4.2" fill="#e2b83a" stroke="#a87a1a" stroke-width="1"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((g) => `<path d="M22,17.2 L22,15" stroke="#e2b83a" stroke-width="2" stroke-linecap="round" transform="rotate(${g} 22 24)"/>`).join('')}<path d="M28,9 C28,5 31,3 33,4 C32,6 31,8 28,9Z M28,9 C27,6 24,5 23,6 C24,8 26,9 28,9Z" fill="#6fae4a" ${L(O, 1.1)}/></g>`;
const badgePiedra = (x, y, n) => `<g transform="translate(${x} ${y})"><g transform="translate(-13 -14) scale(.66)">${piedra()}</g><circle cx="11" cy="9" r="8" fill="${H}" stroke="${O}" stroke-width="1.6"/>${T(11, 13, 10.5, n, { w: 800, a: 'middle' })}</g>`;
const filaP = (y, dib, nom, nv, tipo, exp, piedraN) => `<g transform="translate(16 ${y})"><rect width="328" height="96" rx="14" fill="#f4ead2" stroke="${O}" stroke-width="2"/>
  <g transform="translate(14 10)"><rect width="76" height="76" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(4 4) scale(.34)">${dib}</g></g>
  ${T(104, 30, 15.5, nom, { f: 'Bree' })}${chipTipo(104, 38, tipo)}${T(236, 30, 12, `Nv ${nv}`, { w: 800, a: 'end' })}
  ${T(104, 74, 10, 'Experiencia', { w: 800, c: '#8a6a4a' })}<rect x="104" y="80" width="132" height="9" rx="4.5" fill="#d9ccb4"/>
  <rect x="104" y="80" width="${132 * exp}" height="9" rx="4.5" fill="${piedraN ? '#e2b83a' : '#2f7fb8'}" ${piedraN ? 'class="brilla"' : ''}/>
  ${piedraN ? `${badgePiedra(276, 40, piedraN)}${T(276, 76, 12, '×2', { f: 'Bree', a: 'middle', c: '#a87a1a' })}` : `${T(276, 50, 10, 'Tu bicho', { w: 800, a: 'middle', c: '#9a8a74' })}${T(276, 64, 10, 'más alto', { w: 800, a: 'middle', c: '#9a8a74' })}`}
</g>`;
const E2 = svg('0 0 360 760', `${fondoCuero}${cab('Equipo')}
  <g transform="translate(16 70)"><rect width="328" height="74" rx="14" fill="#efe1bf" stroke="#a87a1a" stroke-width="2.4"/><g transform="translate(12 10) scale(1.2)">${piedra()}</g>
  ${T(70, 30, 14.5, 'Piedra de la Pachamama', { f: 'Bree' })}${T(70, 50, 11, 'Doble a los que están 2 niveles abajo del más alto.', { c: '#5a3e28' })}${T(70, 66, 11.5, 'Quedan 7 combates.', { w: 800, c: '#a87a1a' })}</g>
  ${filaP(158, pasacan(), 'Pasacán', 4, 'Flora', .62, '7')}${filaP(264, llamaru(), 'Llamarú', 3, 'Común', .35, '7')}${filaP(370, mallku(), 'Mallku', 6, 'Viento', .5, '')}
  ${T(180, 500, 12, 'La piedra con el número va junto a cada bicho', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 518, 12, 'que la aprovecha: son los combates que quedan.', { w: 800, a: 'middle', c: '#f4ead2' })}
  ${T(180, 546, 11.5, 'La barra de experiencia se pone dorada y titila.', { a: 'middle', c: '#e9d9b8' })}`);
// E1: la piedra en la Mochila, lista para usar
const E1 = svg('0 0 360 760', `${fondoCuero}${cab('Mochila')}${papel(16, 70, 328, 672)}
  <g transform="translate(110 104) scale(3.4)">${piedra()}</g>
  ${T(180, 268, 20, 'Piedra de la Pachamama', { f: 'Bree', a: 'middle', c: '#7a4a2a' })}${T(180, 292, 12, 'Tenés 2', { w: 800, a: 'middle', c: '#8a6a4a' })}
  ${T(180, 334, 13, 'Durante 10 combates, experiencia doble', { w: 700, a: 'middle' })}${T(180, 354, 13, 'para los bichos que están 2 niveles o más', { w: 700, a: 'middle' })}${T(180, 374, 13, 'por debajo de tu bicho más alto.', { w: 700, a: 'middle' })}
  ${T(180, 410, 12, 'Sirve para poner al día a uno que atrapaste tarde.', { a: 'middle', c: '#5a3e28' })}
  ${T(180, 446, 12, 'La da el ermitaño de cada provincia', { a: 'middle', c: '#5a3e28' })}${T(180, 464, 12, 'la primera vez que le ganás.', { a: 'middle', c: '#5a3e28' })}
  ${boton(50, 600, 260, 'Usar ahora', '#a87a1a')}${T(180, 686, 12.5, 'Volver', { w: 800, a: 'middle', c: '#7a4a2a' })}`);

// ════════════ 3. Pilchas ════════════
const SOMB = {
  boina: `<path d="M42,20 C42,9 78,9 80,18 C80,22 44,24 42,20Z" fill="#23304a" stroke="${O}" stroke-width="2.2"/><path d="M60,10 L61,6" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>`,
  chullo: `<path d="M45,24 C44,8 76,8 75,24Z" fill="#c8562a" stroke="${O}" stroke-width="2.2"/><path d="M46,18 L74,18" stroke="#f2b03a" stroke-width="3"/><path d="M47,13 L73,13" stroke="#2f7d5b" stroke-width="2.4"/><path d="M45,24 L43,36 L48,34 L48,24Z M75,24 L77,36 L72,34 L72,24Z" fill="#c8562a" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="60" cy="7" r="4" fill="#f2b03a" stroke="${O}" stroke-width="1.6"/>`,
  negro: `<path d="M32,19 C32,14 88,14 88,19 C88,23 32,23 32,19Z" fill="#1f1a18" stroke="${O}" stroke-width="2.2"/><path d="M46,17 L47,6 L73,6 L74,17Z" fill="#2a2420" stroke="${O}" stroke-width="2.2"/><path d="M46,15 L74,15" stroke="#a8322a" stroke-width="2.6"/>`,
  // nuevos
  paja: `<path d="M34,19 C34,14 86,14 86,19 C86,23 34,23 34,19Z" fill="#e2c98a" stroke="${O}" stroke-width="2.2"/><path d="M47,17 C47,7 73,7 73,17Z" fill="#ecd59a" stroke="${O}" stroke-width="2.2"/><path d="M47,15 L73,15" stroke="#1f1a18" stroke-width="2.6"/>${[38, 46, 74, 82].map((x) => `<path d="M${x},17.5 l2,3" stroke="#c9a85e" stroke-width="1.1"/>`).join('')}`,
  pajaAncha: `<path d="M26,20 C26,13 94,13 94,20 C94,25 26,25 26,20Z" fill="#e2c98a" stroke="${O}" stroke-width="2.2"/><path d="M46,18 C46,8 74,8 74,18Z" fill="#ecd59a" stroke="${O}" stroke-width="2.2"/><path d="M46,16 L74,16" stroke="#6a8a3a" stroke-width="2.4"/>${[32, 40, 80, 88].map((x) => `<path d="M${x},18.5 l2,3" stroke="#c9a85e" stroke-width="1.1"/>`).join('')}`,
  pajaChato: `<path d="M36,19 C36,15 84,15 84,19 C84,22 36,22 36,19Z" fill="#e8d29a" stroke="${O}" stroke-width="2.2"/><path d="M47,18 L47,10 C47,8 73,8 73,10 L73,18Z" fill="#f0dca8" stroke="${O}" stroke-width="2.2"/><path d="M47,14.5 L73,14.5" stroke="#2f5a9a" stroke-width="3"/>`,
  cuero: `<path d="M30,20 C30,14 90,14 90,20 C90,25 30,25 30,20Z" fill="#6a4226" stroke="${O}" stroke-width="2.2"/><path d="M46,18 C45,9 50,6 60,6 C70,6 75,9 74,18Z" fill="#7a4e2c" stroke="${O}" stroke-width="2.2"/><path d="M47,15 L73,15" stroke="#3a2418" stroke-width="2.4"/><path d="M40,21 C46,23 52,23 56,22" stroke="#4a2e1a" stroke-width="1.2" fill="none"/>`,
  flores: `<path d="M33,19 C33,14 87,14 87,19 C87,23 33,23 33,19Z" fill="#c9b48a" stroke="${O}" stroke-width="2.2"/><path d="M46,17 C46,6 74,6 74,17Z" fill="#d6c39a" stroke="${O}" stroke-width="2.2"/><path d="M46,15 L74,15" stroke="#7a3a8a" stroke-width="2.6"/>${[[52, '#e85a8a'], [60, '#f2b03a'], [68, '#e8e4dc']].map(([x, c]) => `<g transform="translate(${x} 13)">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos(a * Math.PI / 180) * 2.6).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 2.6).toFixed(1)}" r="2" fill="${c}" stroke="${O}" stroke-width=".6"/>`).join('')}<circle r="1.4" fill="#c87a1a"/></g>`).join('')}`,
  velo: `<path d="M34,19 C34,14 86,14 86,19 C86,23 34,23 34,19Z" fill="#e2c98a" stroke="${O}" stroke-width="2.2"/><path d="M47,17 C47,7 73,7 73,17Z" fill="#ecd59a" stroke="${O}" stroke-width="2.2"/>
    <path d="M38,22 C37,34 40,46 44,54 L76,54 C80,46 83,34 82,22Z" fill="#f6f4ee" opacity=".42" stroke="#d8d4cc" stroke-width="1.4"/>${[28, 34, 40, 46].map((y) => `<path d="M${39 + (y - 22) * .12},${y} L${81 - (y - 22) * .12},${y}" stroke="#d8d4cc" stroke-width=".7" opacity=".8"/>`).join('')}${[46, 53, 60, 67, 74].map((x) => `<path d="M${x},23 L${x + (x - 60) * .1},54" stroke="#d8d4cc" stroke-width=".7" opacity=".8"/>`).join('')}`,
  nada: '',
  gorra: `<path d="M46,20 C46,8 74,8 74,20Z" fill="#c8302a" stroke="${O}" stroke-width="2.2"/><path d="M72,19 C80,17 87,18 90,21 C85,24 76,23 72,22Z" fill="#a8261e" stroke="${O}" stroke-width="2"/><path d="M60,9 L60,19" stroke="#a8261e" stroke-width="1.4"/>`,
  piluso: `<path d="M40,22 C42,16 78,16 80,22 C80,25 40,25 40,22Z" fill="#7a8a5a" stroke="${O}" stroke-width="2.2"/><path d="M46,19 C46,9 74,9 74,19Z" fill="#8a9a6a" stroke="${O}" stroke-width="2.2"/><path d="M47,16 L73,16" stroke="#5a6a3e" stroke-width="1.6" stroke-dasharray="2 2"/>`,
  lana: `<path d="M45,24 C43,10 77,10 75,24Z" fill="#8a6a4a" stroke="${O}" stroke-width="2.2"/><path d="M44,24 C44,20 76,20 76,24 C76,28 44,28 44,24Z" fill="#7a5a3a" stroke="${O}" stroke-width="2"/>${[50, 55, 60, 65, 70].map((x) => `<path d="M${x},13 L${x},20" stroke="#6a4a2e" stroke-width="1.2"/>`).join('')}`,
};
const poncho = (c, g, largo = 0) => { const b = 102 + largo; return `<path d="M48,54 C52,59 68,59 72,54 L${92 + largo * .3},${b} C78,${b + 10} 42,${b + 10} ${28 - largo * .3},${b}Z" fill="${c}" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${33 - largo * .3},${b - 6} C46,${b + 1} 74,${b + 1} ${87 + largo * .3},${b - 6}" stroke="${g}" stroke-width="3.4" fill="none"/><path d="M${31 - largo * .3},${b - 2} C46,${b + 5} 74,${b + 5} ${89 + largo * .3},${b - 2}" stroke="#1f1a18" stroke-width="1.6" fill="none"/>${[-28, -20, -12, -4, 4, 12, 20, 28].map((dx) => `<path d="M${60 + dx * (1 + largo / 100)},${b + 6 - Math.abs(dx) / 8} l-.5,6" stroke="${c}" stroke-width="1.8"/>`).join('')}`; };
const faja = `<path d="M41,104 L79,104 L79,111 L41,111Z" fill="#1f1a18" ${L(O, 1.6)}/><path d="M74,111 L76,122 M78,111 L80,120" stroke="#1f1a18" stroke-width="2.2" stroke-linecap="round"/>`;
const bordado = `${[[48, 68], [48, 80], [72, 68], [72, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#c8302a"/><circle cx="${x + 2.6}" cy="${y + 1.6}" r="1.4" fill="#2f7d5b"/>`).join('')}`;
const antebrazos = (piel) => `<path d="M35.4,86 L44.4,86 L42.6,112 L35.8,112Z M75.6,86 L84.6,86 L84.2,112 L77.4,112Z" fill="${piel}" ${L(O, 1.8)}/><path d="M35,86.5 L44.8,86.5 M75.2,86.5 L85,86.5" stroke="#e8e0c8" stroke-width="5"/><path d="M35,84 L44.8,84 M75.2,84 L85,84" stroke="${O}" stroke-width="1.4"/>`;
const pantorrillas = (piel) => `<path d="M49,176 L59,176 L59,186 L49,186Z M61,176 L71,176 L71,186 L61,186Z" fill="${piel}" ${L(O, 1.4)}/><path d="M48.6,176 L59.4,176 M60.6,176 L71.4,176" stroke="#3a5a8a" stroke-width="3"/>`;
const botasGoma = `<path d="M46,166 L59,166 L60,206 L42,206 C40,206 40,201 44,200 L46,190Z M74,166 L61,166 L60,206 L78,206 C80,206 80,201 76,200 L74,190Z" fill="#2f4a3a" ${L(O, 2)}/><path d="M46,170 L59,170 M74,170 L61,170" stroke="#4a6a5a" stroke-width="2"/>`;
const ojotas = `<path d="M44,200 L58,200 M62,200 L76,200 M50,194 L53,200 M70,194 L67,200" stroke="#3a2418" stroke-width="2.2" stroke-linecap="round"/>`;
const cuadros = (pid, [fondo, c] = ['#f2ece0', '#c8302a']) => `<defs><pattern id="${pid}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${fondo}"/><rect width="4" height="8" fill="${c}" opacity=".6"/><rect width="8" height="4" fill="${c}" opacity=".6"/></pattern></defs>`;
const pechera = `<path d="M49,74 L71,74 L72,111 L48,111Z" fill="#3a5a8a" ${L(O, 1.8)}/><path d="M50,74 L47,58 M70,74 L73,58" stroke="#3a5a8a" stroke-width="3.6" stroke-linecap="round"/><circle cx="51" cy="77" r="1.6" fill="#e2b83a"/><circle cx="69" cy="77" r="1.6" fill="#e2b83a"/><rect x="55" y="82" width="10" height="8" rx="1.5" fill="#32507e" ${L(O, 1.1)}/>`;
const tiradores = `<path d="M50,57 L53,111 M70,57 L67,111" stroke="#a8261e" stroke-width="3.4" stroke-linecap="round"/><circle cx="53" cy="109" r="1.6" fill="#d8dde2"/><circle cx="67" cy="109" r="1.6" fill="#d8dde2"/>`;
const bolsillos = `${[[44, 74], [67, 74], [44, 90], [67, 90]].map(([x, y]) => `<rect x="${x}" y="${y}" width="9" height="9" rx="1.5" fill="#6a7a4a" ${L(O, 1.1)}/><path d="M${x},${y + 3} L${x + 9},${y + 3}" stroke="${O}" stroke-width=".9"/>`).join('')}`;
const botasAltas = `<path d="M46,168 L59,168 L60,206 L42,206 C40,206 40,201 44,200 L46,190Z M74,168 L61,168 L60,206 L78,206 C80,206 80,201 76,200 L74,190Z" fill="#6a4226" ${L(O, 2)}/>${[174, 180, 186].map((y) => `<path d="M49,${y} L56,${y} M64,${y} L71,${y}" stroke="#c9a46a" stroke-width="1.2"/>`).join('')}`;
const PIEL = { j: '#cf9a72', a: '#c08a62' };
const HAT = { j: '<path d="M34,19 C34,14 86,14', a: '<path d="M36,18 C36,13 84,13' };
// colores de la ropa de base de cada uno
const ROPA = { j: { camisa: '#e9e1cf', chaleco: '#7a4e2c', pan1: '#b9a681', pan2: '#a8956f', calzado: '#5a3a24', cuello: '#b3261e' }, a: { camisa: '#3f6e5a', chaleco: '#8a5a36', pan1: '#4e3b2e', pan2: '#44332a', calzado: '#6a4228', cuello: '#e2a72e' } };
function vestir(q, p = {}) {
  let s = q === 'j' ? jugador() : jugadora(); const R = ROPA[q]; const piel = PIEL[q]; let defs = '';
  if (p.somb !== undefined) { const i = s.indexOf(HAT[q]); const f = s.lastIndexOf('</g>'); s = s.slice(0, i) + (q === 'a' ? `<g transform="translate(0 -1)">${SOMB[p.somb]}</g>` : SOMB[p.somb]) + s.slice(f); }
  const camisa = p.cuadros ? (() => { const pid = id('cua'); defs = cuadros(pid, p.cuadros === true ? undefined : p.cuadros); return `url(#${pid})`; })() : p.camisa;
  const swap = { [R.camisa]: camisa, [R.chaleco]: p.chaleco === 'camisa' ? camisa : p.chaleco, [R.pan1]: p.pan?.[0], [R.pan2]: p.pan?.[1], [R.calzado]: p.calzado === 'piel' ? piel : p.calzado, [R.cuello]: p.cuello };
  for (const [a, b] of Object.entries(swap)) if (b) s = s.split(`fill="${a}"`).join(`fill="${b}"`);
  const k = s.lastIndexOf('</g>', s.indexOf('<g class="cabeza"'));
  const torso = [p.antebrazos ? antebrazos(piel) : '', p.bordado ? bordado : '', p.pechera ? pechera : '', p.tiradores ? tiradores : '', p.bolsillos ? bolsillos : '', p.faja ? faja : '', p.poncho ? poncho(...p.poncho) : ''].join('');
  s = s.slice(0, k) + torso + s.slice(k);
  const piernas = [p.pantorrillas ? pantorrillas(piel) : '', p.botas ? botasGoma : '', p.botasAltas ? botasAltas : '', p.ojotas ? ojotas : ''].join('');
  const r = s.indexOf('<g class="respira"'); s = s.slice(0, r) + piernas + s.slice(r);
  return defs + s;
}
const PILCHAS = [
  ['P1', 'De arranque', 'Desde el inicio', '', {}, false],
  ['P2', 'De granjero', 'Feria de Salta, sencilla', '150', { somb: 'gorra', camisa: '#e8d8b0', chaleco: 'camisa', pan: ['#3a5a8a', '#324f7a'], pechera: true }, true],
  ['P3', 'De gala', 'Feria de Salta, de lujo', '300', { somb: 'negro', chaleco: '#1f1a18', pan: ['#3a3434', '#2e2a2a'], camisa: null }, false, { a: { camisa: '#efe9dc', pan: ['#2e2a2a', '#262222'], cuello: '#a8322a' } }],
  ['P4', 'Boina y bombacha', 'Feria de Corrientes, sencilla', '200', { somb: 'boina', camisa: '#cfe2ee', pan: ['#8a8f7a', '#7a7f6a'], chaleco: '#3a4a6a' }, false],
  ['P5', 'De chamamé', 'Feria de Corrientes, de lujo', '400', { somb: 'paja', camisa: '#f6f2ea', chaleco: 'camisa', pan: ['#2e2a2a', '#262222'], cuello: '#c8202a', faja: true, bordado: true }, true],
  ['P6', 'Chullo', 'Feria de Jujuy, sencilla', '250', { somb: 'chullo', chaleco: '#7a3a6a' }, false],
  ['P7', 'De leñador', 'Feria de Jujuy, de lujo', '500', { somb: 'nada', cuadros: ['#2f5a3a', '#1f1a18'], chaleco: 'camisa', pan: ['#5a4a3a', '#4e4032'], tiradores: true, botasAltas: true }, true],
  ['P8', 'De baqueano', 'Changa de Fermín, Salta', '', { somb: 'cuero', camisa: '#d8cdb4', chaleco: '#8a5a32', cuello: '#d8a21e' }, true],
  ['P9', 'De estero', 'Changa de Sol, Corrientes', '', { somb: 'pajaAncha', camisa: '#e8e0c8', chaleco: 'camisa', pan: ['#6a7a5a', '#5e6e4e'], antebrazos: true, botas: true }, true],
  ['P10', 'De pescador', 'Changa de Delfina, Jujuy', '', { somb: 'piluso', camisa: '#d8e0e4', chaleco: '#7a8a5a', pan: ['#6a6a5a', '#5e5e4e'], bolsillos: true }, true],
  ['P11', 'De mielero', 'Puesto de Don Higinio', '300', { somb: 'velo', camisa: '#f2eee4', chaleco: 'camisa', pan: ['#d8d0bc', '#ccc4ae'] }, true],
  ['P12', 'De isleño', 'Puesto de Don Anacleto', '400', { somb: 'pajaChato', cuadros: true, chaleco: 'camisa', pan: ['#3a5a8a', '#324f7a'], pantorrillas: true }, true],
  ['P13', 'De pastor', 'Puesto de Don Pascual', '500', { somb: 'lana', poncho: ['#7a6a52', '#4a3a2a', 36], calzado: 'piel', ojotas: true }, true],
];
const cartaPilcha = ([cod, nom, de, precio, spec, nueva, extra]) => `<figure class="pil"><span class="cod">${cod}</span>${nueva ? '<span class="nueva">Nueva</span>' : ''}<div class="par">${svg('20 0 80 216', vestir('j', spec))}${svg('20 0 80 216', vestir('a', { ...spec, ...(extra?.a || {}) }))}</div><figcaption><b>${nom}</b><span>${de}</span>${precio ? `<span class="pr">${precio} chirolas</span>` : '<span class="pr">No se compra</span>'}</figcaption></figure>`;

// ════════════ 4. Combate contra salvajes ════════════
// Carácter: caras en una chapita redonda, sin letras
const CAR = {
  timido: ['#9ab8d0', `<circle cx="9" cy="12.4" r="2" fill="${O}"/><circle cx="17" cy="12.4" r="2" fill="${O}"/><path d="M6.6,9.6 L11,7.8 M19.4,9.6 L15,7.8" ${L(O, 1.3)}/><path d="M10,18 C12,17 14,17 16,18" fill="none" ${L(O, 1.4)}/><path d="M21,7 C22,9 22,10 21,11 C20,10 20,9 21,7Z" fill="#5aa0d8" ${L(O, .8)}/>`],
  curioso: ['#e8c86a', `<circle cx="9" cy="12" r="3.2" fill="#fff" ${L(O, 1.2)}/><circle cx="17" cy="12" r="3.2" fill="#fff" ${L(O, 1.2)}/><circle cx="9.6" cy="11.4" r="1.6" fill="${O}"/><circle cx="17.6" cy="11.4" r="1.6" fill="${O}"/><path d="M6,6.5 C7.5,5 10,5 11.5,6.5 M14.5,6.5 C16,5 18.5,5 20,6.5" fill="none" ${L(O, 1.3)}/><circle cx="13" cy="19" r="1.8" fill="${O}"/>`],
  manso: ['#9ac07a', `<path d="M6.5,12 C8,10 10.5,10 12,12 M14,12 C15.5,10 18,10 19.5,12" fill="none" ${L(O, 1.5)}/><path d="M9,17 C11,19.5 15,19.5 17,17" fill="none" ${L(O, 1.5)}/>`],
  bravo: ['#e07a5a', `<path d="M5.5,8 L11,11 M20.5,8 L15,11" ${L(O, 1.8)}/><circle cx="9.5" cy="13" r="1.8" fill="${O}"/><circle cx="16.5" cy="13" r="1.8" fill="${O}"/><path d="M8,19 L18,19" ${L(O, 1.6)}/><path d="M10,17.6 L10,20.4 M13,17.6 L13,20.4 M16,17.6 L16,20.4" ${L(O, 1)}/>`],
  mito: ['#9a7ac8', `<path d="M13,4 L15.4,10.2 L22,10.6 L16.8,14.6 L18.6,21 L13,17.4 L7.4,21 L9.2,14.6 L4,10.6 L10.6,10.2Z" fill="#f2d23a" ${L(O, 1.2)}/>`],
};
const carIco = (k, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="13" cy="13" r="12" fill="${CAR[k][0]}" stroke="${O}" stroke-width="1.8"/>${CAR[k][1]}</g>`;
// reloj de arena (paciencia) con las rondas que quedan
const reloj = (x, y, n, { alerta = false, s = 1 } = {}) => `<g transform="translate(${x} ${y}) scale(${s})" ${alerta ? 'class="late"' : ''}><path d="M2,1 L18,1 M2,27 L18,27" ${L(O, 2.4)}/><path d="M4,2 L16,2 C16,8 11,11 11,14 C11,17 16,20 16,26 L4,26 C4,20 9,17 9,14 C9,11 4,8 4,2Z" fill="#fdf6e4" ${L(O, 1.6)}/><path d="M6.4,6 L13.6,6 C12.6,9 10.6,10.6 10,12.6 C9.4,10.6 7.4,9 6.4,6Z" fill="#e2b83a"/><path d="M6,25 C7,21 13,21 14,25Z" fill="#e2b83a"/><circle cx="25" cy="22" r="8.5" fill="${alerta ? '#d8402a' : H}" stroke="${O}" stroke-width="1.8"/>${T(25, 26.4, 11.5, n, { w: 800, a: 'middle', c: alerta ? '#fff' : CU })}</g>`;
// tiros: tres boleadoras chicas; las gastadas, en gris
const bolea = (on) => `<path d="M3,12 C5,8 9,8 11,5 M3,12 C6,13 10,14 13,13" stroke="${on ? '#8a5a32' : '#9a8a7a'}" stroke-width="1.2" fill="none"/>${[[3, 12], [11, 5], [13, 13]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${on ? '#9aa4ac' : '#6a5a4a'}" stroke="${O}" stroke-width="1"/>`).join('')}`;
const tiros = (x, y, quedan) => `<g transform="translate(${x} ${y})">${[0, 1, 2].map((i) => `<g transform="translate(${i * 17} 0)">${bolea(i < quedan)}</g>`).join('')}</g>`;
const icoBolea = `<g transform="translate(8 7) scale(1.7)">${bolea(true)}</g>`;
const icoRaja = `<g transform="translate(8 10)"><circle cx="7" cy="20" r="5" fill="#c9b48a" ${L(O, 1.2)}/><circle cx="14" cy="22" r="4" fill="#d9c89e" ${L(O, 1.2)}/><path d="M14,12 L28,12 M23,6 L29,12 L23,18" fill="none" ${L('#fbf3e2', 3)}/></g>`;
const tope = (lugar, ronda) => `<rect x="12" y="10" width="232" height="28" rx="14" fill="#5f7f32" stroke="${O}" stroke-width="1.6"/>${T(26, 29, 12.5, lugar, { w: 800, c: '#fff' })}<rect x="252" y="10" width="96" height="28" rx="14" fill="#e2b83a" stroke="${O}" stroke-width="1.6"/>${T(300, 29, 12, `Ronda ${ronda}`, { w: 800, a: 'middle' })}`;
const salvaje = (nom, nv, tipo, car, f, derecha, marcas = '') => `${panel(186, 48, 164, 96)}${carIco(car, 196, 52, .86)}${T(222, 69, 15.5, nom, { f: 'Bree' })}${T(338, 69, 11.5, `Nv ${nv}`, { w: 800, a: 'end', c: '#5a3e28' })}${chip(198, 78, tipo)}${vida(198, 100, 140, f)}${marcas}${derecha}`;
const yo = (nom, tipo, f, num, ag, gasto = 0) => `${panel(10, 48, 164, 96)}${T(22, 68, 16, nom, { f: 'Bree' })}${T(162, 68, 11.5, 'Nv 4', { w: 800, a: 'end', c: '#5a3e28' })}${chip(22, 76, tipo)}${T(162, 88, 11, num, { w: 800, a: 'end', c: '#5a3e28' })}${vida(22, 100, 140, f)}${rombos(26, 120, ag, 6, 9, gasto)}`;
const pasacanYo = `<g transform="translate(172 240) scale(-.74 .74)">${pasacan()}</g>`;
const EQS = [pasacan(), kirkallpa(), llamaru(), mallku(), pirkasol(), miyura()];
const equipoS = (act) => `${EQS.map((d, i) => retrato(d, 26 + i * 32, 430, 13, { act: i === act, s: .14 })).join('')}${T(226, 426, 10, 'RELEVO', { w: 800, c: '#f4ead2' })}${relevos(234, 438, 2)}`;
const tecS = ({ sel } = {}) => `${tecnica(12, 494, 'Hocicazo', 'Sin tipo', 0, 9, '', { sel: sel === 0 })}${tecnica(184, 494, 'Enredo', 'Flora', 1, 14, '▲', { marca: ['enredado', 'Flora'], sel: sel === 1 })}
  ${tecnica(12, 570, 'Ramazo', 'Flora', 2, 24, '▲', { sel: sel === 2 })}${tecnica(184, 570, 'Polvazo', 'Tierra', 2, 12, '', { sel: sel === 3 })}`;
const btnS = (x, y, w, txt, ico, { on = false, off = false } = {}) => btn(x, w, txt, ico, { on, off }).replace(`translate(${x} 700)`, `translate(${x} ${y})`);
const accS = ({ raja = '50 %', rajaOn = false, boleaOn = false } = {}) => `${btnS(12, 650, 164, 'Boleadora', icoBolea, { on: boleaOn })}${btnS(184, 650, 164, `Rajá ${raja}`, icoRaja, { on: rajaOn })}${btnS(12, 704, 164, 'Cubrirse', icoCubre)}${btnS(184, 704, 164, 'Relevo', icoRel)}`;
const kirkR = `<g transform="translate(208 236) scale(.68)">${kirkallpa()}</g>`;
const miyR = (cls = '') => `<g class="${cls}"><g transform="translate(204 232) scale(.7)">${miyura()}</g></g>`;

const S1 = svg('0 0 360 760', `${fondoCombate}${tope('Salvaje, Valle de Lerma', 2)}${kirkR}${salvaje('Kirkallpa', 3, 'Tierra', 'timido', .7, reloj(298, 114, '3', { s: .9 }))}${pasacanYo}${yo('Pasacán', 'Flora', .9, '61/68', 4)}
  ${pie(msgT('Kirkallpa es tímido: se cubre seguido y raja pronto.'), equipoS(0))}${tecS({ sel: 2 })}${accS()}`);
const S2 = svg('0 0 360 760', `${fondoCombate}${tope('Salvaje, Valle de Lerma', 4)}${kirkR}<g transform="translate(276 300)" class="flota"><g transform="scale(2.2)">${bolea(false)}</g></g>${salvaje('Kirkallpa', 3, 'Tierra', 'timido', .28, reloj(298, 114, '1', { alerta: true, s: .9 }))}${pasacanYo}${yo('Pasacán', 'Flora', .82, '56/68', 2)}
  ${pie(msgT('¡Se soltó! Un tiro fallado gasta 2 de paciencia.'), equipoS(0))}${tecS()}${accS({ boleaOn: true })}`);
const S3 = svg('0 0 360 760', `${fondoCombate}${tope('Salvaje, Valle de Lerma', 6)}${miyR()}${salvaje('Miyurá', 3, 'Veneno', 'bravo', .44, `${tiros(298, 118, 2)}`, tagE('furia', 198, 116, 22, '2'))}${pasacanYo}${yo('Pasacán', 'Flora', .55, '37/68', 3)}
  ${pie(msgT('Miyurá es bravo: se suelta al tercer tiro fallado.'), equipoS(0))}${tecS()}${accS()}`);
const S4 = svg('0 0 360 760', `${fondoCombate}${tope('Salvaje, Valle de Lerma', 7)}${miyR('temblor')}${salvaje('Miyurá', 3, 'Veneno', 'bravo', .44, `${tiros(298, 118, 2)}`, tagE('furia', 198, 116, 22, '1'))}${pasacanYo}${yo('Pasacán', 'Flora', .32, '22/68', 4)}
  ${pie(msgT('No pudiste rajar. El próximo intento suma +20 %.'), equipoS(0))}${tecS()}${accS({ raja: '70 %', rajaOn: true })}`);

// ════════════ 5. Aviso de avance de changa ════════════
const avisoAv = `<g transform="translate(14 80)" class="aparece"><rect width="332" height="54" rx="16" fill="#f4ead2" stroke="#7a4a2a" stroke-width="2.2"/><g transform="translate(8 5) scale(.92)">${especieIco(miyura(), 'av1')}</g>${T(62, 24, 14, 'Changa de Cirilo', { f: 'Bree', c: '#7a4a2a' })}${T(62, 43, 12, 'Miyurá vencidos', { w: 700 })}<rect x="170" y="34" width="100" height="9" rx="4.5" fill="#e2d6bc" stroke="${O}" stroke-width="1.1"/><rect x="171" y="35" width="49" height="7" rx="3.5" fill="#2f7d5b"/>${T(318, 43, 13, '1 de 2', { f: 'Bree', a: 'end' })}</g>`;
const A1 = svg('0 0 360 760', `<defs><clipPath id="a1c"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#a1c)">${FONDOS.salta}
  <g transform="translate(162 360) scale(.3)">${jugador()}</g>${hud('Ruta 68, Salta', 2, 'tarde', 'despejado')}${avisoAv}${equipoMini}${mini}</g>`);

// ════════════ Página ════════════
const ICONOS_S = [
  ['K1', carIco('timido', 4, 4, 1.54), 'Tímido', 'Se cubre seguido. Paciencia 4.', 'Cara de susto, con gotita.'],
  ['K2', carIco('curioso', 4, 4, 1.54), 'Curioso', 'Sin preferencia. Paciencia 6.', 'Ojos grandes y cejas arriba.'],
  ['K3', carIco('manso', 4, 4, 1.54), 'Manso', 'Golpe liviano. Paciencia 8.', 'Ojos cerrados y sonrisa.'],
  ['K4', carIco('bravo', 4, 4, 1.54), 'Bravo', 'Pega fuerte, Furia a media vida. No raja: 3 tiros.', 'Ceño y dientes apretados.'],
  ['K5', carIco('mito', 4, 4, 1.54), 'Mito', 'No raja ni se enfurece. 3 tiros por día.', 'Estrella dorada.'],
  ['K6', reloj(10, 9, '4'), 'Paciencia', 'Rondas que aguanta antes de rajar.', 'Cada tiro fallado gasta 2; cada Relevo tuyo, 1 más.'],
  ['K7', `<g transform="translate(-1 12) scale(1.5)">${tiros(0, 0, 2)}</g>`, 'Tiros', 'Solo bravo y mito: al tercero fallado se suelta.', 'Las gastadas, en gris.'],
  ['K8', `<g transform="translate(4 4)"><rect width="40" height="40" rx="10" fill="#7a4a2a" stroke="${O}" stroke-width="1.6"/>${icoRaja.replace('translate(8 10)', 'translate(4 6)')}</g>`, 'Rajá', '50 % ± 15 % por punto de Velocidad, entre 20 y 95 %.', 'Si falla, +20 % al próximo intento.'],
];
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Prendas de Don Abel (libreta completa)</h3><p class="nota">Mismo formato que las prendas de la feria. Se ven en la ranura de prenda del bicho, en Equipo y en Mi bicho.</p>
<div class="grilla">${PRENDAS_ABEL.map(([c, k, n, p, e]) => fichaIco(c, `<g transform="translate(4 4)">${PR[k]}</g>`, n, e, `Libreta de ${p} completa.`)).join('')}</div>
<div class="tres1">${tel('D4', 'Don Abel la entrega', D4, 'Al completar la libreta: rayos dorados que giran, la prenda flotando y Don Abel. Momento grande, con el remate de la chacarera.')}</div><div class="tres1">${tel('E1', 'Piedra en la Mochila', E1, 'Piedra con un sol tallado en oro y un brote. Se guarda en la Mochila y la usás cuando quieras.')}${tel('E2', 'Piedra activa', E2, 'Junto a cada bicho que la aprovecha va la piedra con los combates que quedan; la barra de experiencia se pone dorada. El más alto no la usa.')}</div></section>
<section><h3>Pilchas: jugador y jugadora</h3><p class="nota">Las 13, con jugador y jugadora. Se quedan las 10 que elegiste; De granjero, De leñador y De pescador reemplazan a Poncho salteño, Poncho de llama y De copla.</p>
<div class="pils">${PILCHAS.map(cartaPilcha).join('')}</div></section>
<section><h3>Combate contra salvajes</h3><p class="nota">Pantalla del lote 23a con lo aprobado hoy: el carácter junto al nombre, la paciencia (o los 3 tiros del bravo y del mito) donde el domador tiene sus Relevos, y una fila más de botones: Boleadora y Rajá con su chance.</p>
<div class="grilla">${ICONOS_S.map(([c, d, n, e, x]) => fichaIco(c, d, n, e, x, '0 0 48 48')).join('')}</div>
<div class="tres">${tel('S1', 'Tímido', S1, 'La chapita con la cara dice el carácter. El reloj de arena marca las rondas que le quedan antes de rajar.')}${tel('S2', 'Tiro fallado', S2, 'Las bolas caen al piso, el reloj baja 2 y se pone rojo cuando queda 1.')}${tel('S3', 'Bravo', S3, 'En vez del reloj, los 3 tiros. Con Furia lleva su caravana.')}${tel('S4', 'Rajá fallado', S4, 'El botón muestra la chance nueva y se resalta.')}${tel('A1', 'Aviso de avance', A1, 'Al terminar un combate que suma a una changa: el aviso chico, sin tilde, con la barra. Se va solo en 2 segundos.')}</div></section>`;
const css = css29 + `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:18px}.ico{position:relative;margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:26px 10px 10px;text-align:center}.ico>div svg{width:64px;height:64px}.ico b{display:block;font:16px Bree,serif}.ico span{display:block;font-size:12.5px;margin-top:4px}.ico i{display:block;font-size:11.5px;color:#7a6a54;margin-top:4px;font-style:normal}.ico .cod{position:absolute;top:6px;left:8px}
.tres1{display:grid;grid-template-columns:repeat(2,minmax(0,360px));gap:16px}.tres{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.pils{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px}.pil{position:relative;margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:24px 8px 10px;text-align:center}.pil .par{display:flex;justify-content:center;gap:4px}.pil .par svg{width:78px;height:auto}.pil b{display:block;font:15px Bree,serif}.pil span{display:block;font-size:12px;color:#6a5440}.pil .pr{font-weight:800;color:#3a2414}.pil .cod{position:absolute;top:6px;left:8px}.pil .nueva{position:absolute;top:6px;right:8px;background:#2f7d5b;color:#fff;font-weight:800;font-size:11px;border-radius:10px;padding:1px 8px}
@keyframes late{0%,100%{opacity:1}50%{opacity:.4}}.late{animation:late 1s ease-in-out infinite}
@keyframes temblor{0%,100%{transform:translate(0,0)}25%{transform:translate(-3px,1px)}75%{transform:translate(3px,-1px)}}.temblor{animation:temblor .25s linear infinite}
@keyframes flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}.flota{animation:flota 2s ease-in-out infinite}
@keyframes gira{to{transform:rotate(360deg)}}.gira{animation:gira 24s linear infinite}
@keyframes brilla{0%,100%{opacity:1}50%{opacity:.55}}.brilla{animation:brilla 1.2s ease-in-out infinite}
@keyframes aparece{0%{opacity:0;transform:translateY(-8px)}12%,85%{opacity:1;transform:translateY(0)}100%{opacity:0}}.aparece{animation:aparece 3s ease-out infinite}
@media (max-width:760px){.tres,.tres1{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-61.html', import.meta.url), pagina('Catálogo para aprobar, lote 24a', 'Prendas de Don Abel, Piedra de la Pachamama, pilchas, combate contra salvajes y aviso de changa', cuerpo, css));
console.log('ok 61');
