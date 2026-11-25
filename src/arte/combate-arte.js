// Generado por herramientas/exportar-arte.mjs. No editar a mano.
export const COLOR_TIPO = { Fuego: '#c8461e', Flora: '#4f8a2e', Agua: '#2f7fb8', Tierra: '#8a5a2a', Común: '#7a7466', Viento: '#5f8fa6', Hielo: '#5aa0c8', Veneno: '#7a3f8a', Roca: '#8a7a62', Rayo: '#c9a020', Mito: '#3a2a4a' };
export const T = (x, y, s, txt, { f = 'Nunito', w = 400, c = '#3a2414', a = 'start', st = '' } = {}) => `<text x="${x}" y="${y}" font-family="${f}" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="${a}" ${st ? `font-style="${st}"` : ''}>${txt}</text>`;
const O = '#2a1c15', H = '#fbf3e2', CU = '#3a2414';
const L = (c = O, w = 2) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const FORMA = 'M17,3 L31,3 C33.5,3 35,4.5 35,7 L35,11 L42,18 C43.3,19.3 44,21 44,23 L44,40 C44,43.5 41.5,46 38,46 L10,46 C6.5,46 4,43.5 4,40 L4,23 C4,21 4.7,19.3 6,18 L13,11 L13,7 C13,4.5 14.5,3 17,3Z';
const caravana = (glifo, { fondo = H, borde = O, color = O } = {}) => `<path d="${FORMA}" fill="${fondo}" stroke="${borde}" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="9" r="2.6" fill="${borde === O ? '#c9b48a' : borde}" stroke="${O}" stroke-width="1.2"/>${glifo(color)}`;
const GL = {
  mojado: (c) => [[17, 22], [29, 20], [23, 33]].map(([x, y]) => `<path d="M${x},${y} C${x - 4},${y + 6} ${x - 4},${y + 9} ${x},${y + 10} C${x + 4},${y + 9} ${x + 4},${y + 6} ${x},${y}Z" fill="${c}" ${L(O, 1.4)}/>`).join(''),
  chamuscado: (c) => `<path d="M11,38 C10,32 15,30 18,32 C19,27 26,26 28,30 C31,28 37,30 36,35 C38,38 35,42 31,41 C28,44 20,44 17,41 C13,42 11,41 11,38Z" fill="#5a5048" ${L(O, 1.5)}/><circle cx="20" cy="37" r="2" fill="${c}"/><circle cx="28" cy="35" r="1.6" fill="#f2b03a"/><path d="M25,26 C21,23 27,20 24,15" fill="none" ${L('#9a948c', 2.4)}/>`,
  enredado: (c) => `<rect x="19" y="17" width="10" height="27" rx="5" fill="#c9a06a" ${L(O, 1.6)}/><path d="M16,24 L32,30 M16,34 L32,40" ${L(c, 3.4)}/>${[[13, 22, -150], [33, 30, 20], [12, 35, -160]].map(([x, y, r]) => `<path d="M0,0 C4,-5 10,-4 11,0 C10,4 4,5 0,0Z" transform="translate(${x} ${y}) rotate(${r})" fill="${c}" ${L(O, 1.1)}/>`).join('')}`,
  embarrado: (c) => `<path d="M10,40 C9,35 14,33 16,36 C16,30 23,28 25,33 C27,29 34,30 33,35 C37,35 38,40 34,41 L12,41 C10,41 10,40 10,40Z" fill="${c}" ${L(O, 1.6)}/><path d="M18,41 L18,45 M27,41 L27,44" ${L(c, 2.6)}/><circle cx="18" cy="24" r="2.4" fill="${c}"/><circle cx="31" cy="22" r="1.8" fill="${c}"/>`,
  escarcha: (c) => `<path d="M9,20 C14,17 34,17 39,20 L39,23 L9,23Z" fill="#ffffff" ${L(O, 1.6)}/>${[[14, 36], [24, 42], [33, 32]].map(([x, y]) => `<path d="M${x - 3.2},23 L${x},${y} L${x + 3.2},23Z" fill="${c}" ${L(O, 1.3)}/>`).join('')}`,
  cargado: (c) => `<path d="M27,16 L17,32 L23,32 L20,44 L32,27 L26,27Z" fill="${c}" ${L(O, 1.6)}/>${[[12, 24], [36, 22], [11, 38], [37, 39]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${c}" ${L(O, .9)}/>`).join('')}`,
  apestado: (c) => `<path d="M11,38 C7,38 7,31 13,31 C13,25 21,23 24,28 C27,24 35,26 34,31 C39,31 39,38 34,38Z" fill="${c}" ${L(O, 1.5)}/><path d="M14,24 C12,21 16,19 14,16 M35,24 C33,21 37,19 35,16" fill="none" ${L(c, 2.2)}/>`,
  polvareda: () => `<circle cx="17" cy="35" r="6.5" fill="#a8a29a" ${L(O, 1.4)}/><circle cx="28" cy="33" r="8" fill="#bdb8b0" ${L(O, 1.4)}/><circle cx="22" cy="28" r="5" fill="#9a948c" ${L(O, 1.4)}/>${[[11, 24], [36, 22], [39, 40], [9, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#8a847c"/>`).join('')}`,
  // efectos y reacciones de control
  sueno: (c) => `<path d="M28,18 C19,20 15,28 18,35 C21,42 30,43 35,37 C28,37 23,32 23,26 C23,22 25,19 28,18Z" fill="${c}" ${L(O, 1.5)}/><circle cx="34" cy="22" r="1.7" fill="${c}"/><circle cx="37" cy="29" r="1.3" fill="${c}"/>`,
  empaque: (c) => `<ellipse cx="22" cy="42" rx="13" ry="3.6" fill="#8a6a46" ${L(O, 1.3)}/><path d="M18,41 L18,22 L22,16 L26,22 L26,41Z" fill="${c}" ${L(O, 1.6)}/><path d="M26,29 C30,27 32,33 36,31 C38,30 39,32 40,34" fill="none" ${L('#e8d8b0', 2.4)}/>`,
  furia: (c) => `<path d="M12,38 C12,28 18,24 24,24 C30,24 36,28 36,38" fill="${c}" ${L(O, 1.6)}/><path d="M16,26 C12,22 12,18 16,16 M32,26 C36,22 36,18 32,16" fill="none" ${L(O, 2.6)}/><path d="M19,33 L22,35 M29,33 L26,35" ${L(O, 2)}/><path d="M20,20 C19,17 21,15 20,12 M28,20 C27,17 29,15 28,12" fill="none" ${L('#e8e4dc', 2.2)}/>`,
  helado: (c) => `<rect x="13" y="21" width="22" height="21" rx="3" fill="${c}" ${L(O, 1.6)}/><path d="M17,26 L22,26 M17,30 L20,30" ${L('#ffffff', 1.8)}/><path d="M28,36 L32,32" ${L('#ffffff', 1.8)}/>`,
  atado: (c) => `<path d="M10,27 C18,22 30,34 38,27 M10,36 C18,31 30,43 38,36" fill="none" ${L(c, 3)}/><circle cx="24" cy="31.5" r="4.4" fill="${c}" ${L(O, 1.4)}/>`,
  lodazal: (c) => `<path d="M8,36 C12,32 16,36 20,33 C24,30 28,36 40,32 L40,43 L8,43Z" fill="${c}" ${L(O, 1.5)}/><circle cx="17" cy="25" r="3" fill="none" ${L(c, 1.8)}/><circle cx="29" cy="22" r="2.2" fill="none" ${L(c, 1.6)}/>`,
  encandilado: (c) => `<path d="M10,32 C16,25 32,25 38,32 C32,39 16,39 10,32Z" fill="${c}" ${L(O, 1.5)}/><path d="M16,32 C20,35 28,35 32,32" fill="none" ${L(O, 2)}/><path d="M24,16 L24,21 M14,19 L16.5,23 M34,19 L31.5,23" ${L(c, 2.2)}/>`,
  humareda: (c) => `<path d="M11,38 C7,38 7,30 13,30 C13,23 22,21 25,26 C29,22 37,25 35,31 C40,32 39,39 34,39Z" fill="${c}" ${L(O, 1.5)}/><circle cx="18" cy="34" r="2" fill="${O}" opacity=".35"/><circle cx="28" cy="33" r="2.4" fill="${O}" opacity=".35"/>`,
  avivado: (c) => `<path d="M17,42 C11,42 9,37 11,33 C13,29 16,28 16,22 C20,26 22,30 21,35 C24,33 24,30 23,27 C29,31 31,36 29,40 C27,43 22,43 17,42Z" fill="${c}" ${L(O, 1.5)}/><path d="M33,22 L37,18 M35,28 L40,27" ${L(c, 2)}/>`,
  nube: (c) => `<path d="M12,32 C8,32 8,25 14,25 C14,19 23,18 25,22 C29,19 36,22 34,27 C39,27 39,33 34,33 L13,33 C12,33 12,32 12,32Z" fill="${c}" ${L(O, 1.5)}/><path d="M17,37 L16,41 M24,37 L24,42 M31,37 L32,41" ${L(c, 2.2)}/>`,
  corto: (c) => [0, 1].map((i) => `<rect x="${13 + i * 13}" y="${25 + i * 3}" width="10" height="10" rx="2" transform="rotate(45 ${18 + i * 13} ${30 + i * 3})" fill="${c}" ${L(O, 1.4)}/>`).join('') + `<path d="M15,23 L19,30 L16,33 L21,40 M28,26 L32,33 L29,36 L34,42" fill="none" ${L(O, 1.6)}/>`,
};
const MARCAS = [
  ['Mojado', 'mojado', 'Agua', '−1 de Velocidad.', 'Rayo (Descarga) y Hielo (Helado)'],
  ['Chamuscado', 'chamuscado', 'Fuego', '−4 % de vida por ronda.', 'Viento (Avivado) y Veneno (Humareda)'],
  ['Enredado', 'enredado', 'Flora', '−15 % de ataque.', 'Fuego (Quemazón) y Tierra (Atado)'],
  ['Embarrado', 'embarrado', 'Tierra', 'No puede cubrirse.', 'Agua (Lodazal)'],
  ['Escarcha', 'escarcha', 'Hielo', '−10 % de defensa.', 'Roca (Quebranto)'],
  ['Cargado', 'cargado', 'Rayo', 'Su próxima técnica cuesta +1.', 'Agua (Cortocircuito)'],
  ['Apestado', 'apestado', 'Veneno', '−4 % de vida por ronda.', 'Viento (Nube)'],
  ['Polvareda', 'polvareda', 'Viento', '−10 % de daño.', 'Flora (Encandilado)'],
];
const EFECTOS = [
  ['Sueño', 'sueno', '#8a9ad0', 'Pierde su próxima ronda.', 'Técnica de efecto'],
  ['Empaque', 'empaque', '#c9a86a', 'No se cubre ni hace Relevo. 2 rondas.', 'Técnica de efecto'],
  ['Furia', 'furia', '#d8503a', 'Pega +20 %, recibe +20 %, no se cubre. 2 rondas.', 'Técnica de efecto o salvaje bravo'],
  ['Helado', 'helado', '#9fd0ea', '−2 de Velocidad. 2 rondas.', 'Mojado + Hielo'],
  ['Atado', 'atado', '#7fb85a', 'No puede hacer Relevo. 2 rondas.', 'Enredado + Tierra'],
  ['Lodazal', 'lodazal', '#a07a4a', 'No puede cubrirse. 2 rondas.', 'Embarrado + Agua'],
  ['Encandilado', 'encandilado', '#e8d07a', 'Su próximo golpe hace −30 %.', 'Polvareda + Flora'],
  ['Humareda', 'humareda', '#a8a49a', '−15 % de daño. 2 rondas.', 'Chamuscado + Veneno'],
  ['Avivado', 'avivado', '#e8892a', '−8 % de vida por ronda. 2 rondas.', 'Chamuscado + Viento'],
  ['Nube', 'nube', '#9ac05a', '−6 % por ronda a quien esté en esa cancha. 3 rondas.', 'Apestado + Viento'],
  ['Cortocircuito', 'corto', '#e2a72e', '−2 de aguante, en el acto.', 'Cargado + Agua'],
];
const BORDE_MARCA = { polvareda: '#8a847c' };
const marcaSvg = (k, tipo) => caravana(GL[k], { fondo: H, borde: BORDE_MARCA[k] || COLOR_TIPO[tipo], color: COLOR_TIPO[tipo] });
const efectoSvg = (k, c) => caravana(GL[k], { fondo: CU, borde: c, color: c });
const tag = (inner, x, y, s = 22, n) => `<g transform="translate(${x} ${y}) scale(${s / 48})">${inner}${n ? `<circle cx="40" cy="42" r="9" fill="${H}" stroke="${O}" stroke-width="2.2"/>${T(40, 47, 14, n, { w: 800, a: 'middle' })}` : ''}</g>`;
const tagM = (k, tipo, x, y, s, n) => tag(marcaSvg(k, tipo), x, y, s, n);
const tagE = (k, x, y, s, n) => tag(efectoSvg(k, EFECTOS.find((e) => e[1] === k)[2]), x, y, s, n);
const vida = (x, y, w, f) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="#5a4636" stroke="${O}" stroke-width="1.4"/><rect x="${x + 1}" y="${y + 1}" width="${Math.max(0, (w - 2) * f)}" height="7" rx="3.5" fill="${f > 0.5 ? '#6fbf5a' : f > 0.2 ? '#e2b83a' : '#d8402a'}"/>`;
const rombos = (x, y, n, max = 6, s = 9, gasto = 0) => Array.from({ length: max }, (_, i) => `<rect x="${x + i * (s + 3.5)}" y="${y}" width="${s}" height="${s}" rx="2.2" transform="rotate(45 ${x + i * (s + 3.5) + s / 2} ${y + s / 2})" fill="${i < n ? '#e2a72e' : i < n + gasto ? '#f6e0a8' : '#5a4636'}" stroke="${O}" stroke-width="1.2" ${i >= n && i < n + gasto ? 'class="late"' : ''}/>`).join('');
const chip = (x, y, tipo) => { const c = tipo === 'Sin tipo' ? '#9a8e7e' : COLOR_TIPO[tipo]; return `<rect x="${x}" y="${y}" width="${tipo.length * 6.2 + 12}" height="15" rx="7.5" fill="${c}"/>${T(x + 6, y + 11, 9.5, tipo, { w: 800, c: '#fff' })}`; };
const panel = (x, y, w, h, fill = '#f4ead2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${O}" stroke-width="2"/>`;
const fondo = `<defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ec"/><stop offset="1" stop-color="#eef4e6"/></linearGradient><pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern></defs>
  <rect width="360" height="760" rx="26" fill="url(#cielo)"/><path d="M0,250 C80,236 180,240 360,232 L360,400 L0,400Z" fill="#a8c47a"/><path d="M0,300 C120,290 240,296 360,288 L360,400 L0,400Z" fill="#8fb45e"/>
  <ellipse cx="276" cy="382" rx="70" ry="11" fill="#7f9e4e"/><ellipse cx="90" cy="382" rx="74" ry="11" fill="#7f9e4e"/>`;
const fichaRel = (x, y, on) => `<g transform="translate(${x} ${y})"><circle r="8" fill="${on ? '#6fbf5a' : '#5a4636'}" stroke="${O}" stroke-width="1.4"/><path d="M-4,-2 L3,-2 M1,-4.5 L3.5,-2 L1,0.5 M4,2.5 L-3,2.5 M-1,0 L-3.5,2.5 L-1,5" fill="none" stroke="${on ? '#fff' : '#9a8a7a'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const relevos = (x, y, n, max = 2) => Array.from({ length: max }, (_, i) => fichaRel(x + i * 19, y, i < n)).join('');
let nclip = 0;
const retrato = (dib, x, y, r, { act = false, caido = false, freno = 0, s = .17, dx = 0, dy = 0 } = {}) => { const id = `rt${nclip++}`; return `<g transform="translate(${x} ${y})"><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#efe6d2" stroke="${act ? '#f2d23a' : O}" stroke-width="${act ? 3.2 : 1.8}"/><g clip-path="url(#${id})" ${caido ? 'opacity=".35"' : ''}><g transform="translate(${-r * 1.05 + dx} ${-r * 1.05 + dy}) scale(${s * r / 16})">${dib}</g></g>${freno ? `<circle cx="${r * .72}" cy="${-r * .72}" r="7.5" fill="#7a4a2a" stroke="${O}" stroke-width="1.2"/>${T(r * .72, -r * .72 + 4, 10, freno, { w: 800, a: 'middle', c: H })}` : ''}</g>`; };
const pie = (msg, extra = '') => `<rect x="0" y="400" width="360" height="360" fill="url(#cuero)"/><path d="M0,400 L360,400" stroke="${O}" stroke-width="2"/>${extra}<rect x="12" y="454" width="336" height="32" rx="10" fill="#3a2010"/>${msg}`;
const msgT = (txt, x = 24, c = H) => T(x, 475, 12.5, txt, { w: 800, c });
const flecha = (f) => f ? (f[0] === '▲' ? `<path d="M0,0 L5,-8 L10,0Z" fill="#2f8a3b"/>` : `<path d="M0,-8 L5,0 L10,-8Z" fill="#b8322a"/>`) : '';
const revienta = (x, y) => `<g transform="translate(${x} ${y})"><path d="M7,-6 L11,-8 M8,-1 L12.5,-1 M7,4 L11,6" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/><rect x="-9" y="-5" width="16" height="13" rx="4" fill="#f2b03a" stroke="${O}" stroke-width="1.3"/>${[-6, -2.2, 1.6, 5.2].map((cx) => `<rect x="${cx - 2}" y="-8.5" width="4" height="7" rx="2" fill="#f2b03a" stroke="${O}" stroke-width="1.1"/>`).join('')}<path d="M-9,1.5 C-6,0 -1,0 2,1.5 C3,2.2 2.6,4.2 1.2,4.2 L-7,4.2" fill="#f6c45a" stroke="${O}" stroke-width="1.1" stroke-linejoin="round"/></g>`;
const tecnica = (x, y, nom, tipo, costo, fz, f, { marca, rev, sel, sello } = {}) => `<g transform="translate(${x} ${y})"><rect width="164" height="70" rx="12" fill="${H}" stroke="${sel ? '#f2d23a' : O}" stroke-width="${sel ? 3.4 : 1.8}"/><rect width="9" height="70" rx="4.5" fill="${tipo === 'Sin tipo' ? '#9a8e7e' : COLOR_TIPO[tipo]}"/>
  ${T(16, 21, 13.5, nom, { w: 800 })}${costo ? rombos(152 - costo * 12.5, 10, costo, costo, 8) : T(152, 20, 10, 'gratis', { w: 800, a: 'end', c: '#5a8a3a' })}
  ${chip(16, 29, tipo)}${T(16, 61, 10.5, 'Daño', { c: '#5a3e28' })}${T(46, 61, 13, `≈ ${fz}`, { w: 800 })}<g transform="translate(${70 + String(fz).length * 7} 61)">${flecha(f)}</g>
  ${marca ? tagM(marca[0], marca[1], 126, 32, 26) : ''}${rev ? `${revienta(136, 46)}` : ''}${sello ? `<g transform="translate(82 35) rotate(-8)"><rect x="-44" y="-13" width="88" height="26" rx="6" fill="none" stroke="#2f7d5b" stroke-width="3"/>${T(0, 6, 14, 'ELEGIDA', { f: 'Bree', a: 'middle', c: '#2f7d5b' })}</g>` : ''}</g>`;
const btn = (x, w, txt, ico, { on = false, off = false } = {}) => `<g transform="translate(${x} 700)" ${off ? 'opacity=".45"' : ''}><rect width="${w}" height="46" rx="12" fill="${on ? '#e2b83a' : '#7a4a2a'}" stroke="${O}" stroke-width="1.8"/>${ico}${T(w / 2 + 12, 28, 13, txt, { w: 800, a: 'middle', c: on ? CU : H })}</g>`;
const icoCubre = `<path d="M22,12 L34,16 L33,27 C32,32 28,35 22,37 C16,35 12,32 11,27 L10,16Z" transform="translate(4 -1)" fill="#c9a86a" stroke="${O}" stroke-width="1.5"/>`;
const icoRel = `<g transform="translate(30 23)">${fichaRel(0, 0, true)}</g>`;
const dorso = (x, y, w = 40, h = 54) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="6" fill="#7a2a2a" stroke="${O}" stroke-width="1.8"/><rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="4" fill="none" stroke="#e2b83a" stroke-width="1.4"/>${[0, 1, 2].map((i) => `<path d="M${w / 2},${12 + i * 12} l6,6 l-6,6 l-6,-6Z" fill="#e2b83a" opacity=".8"/>`).join('')}</g>`;
const carta = (x, y, titulo, sub, color, dib, cls = '') => `<g transform="translate(${x} ${y})"><g class="${cls}"><rect width="150" height="190" rx="14" fill="${H}" stroke="${O}" stroke-width="2.2"/><rect width="150" height="40" rx="14" fill="${color}"/><rect y="26" width="150" height="14" fill="${color}"/>${T(75, 27, 15, titulo, { f: 'Bree', a: 'middle', c: '#fff' })}<g transform="translate(75 108)">${dib}</g>${T(75, 176, 11.5, sub, { w: 800, a: 'middle', c: '#5a3e28' })}</g></g>`;
const CAR = {
  timido: ['#9ab8d0', `<circle cx="9" cy="12.4" r="2" fill="${O}"/><circle cx="17" cy="12.4" r="2" fill="${O}"/><path d="M6.6,9.6 L11,7.8 M19.4,9.6 L15,7.8" ${L(O, 1.3)}/><path d="M10,18 C12,17 14,17 16,18" fill="none" ${L(O, 1.4)}/><path d="M21,7 C22,9 22,10 21,11 C20,10 20,9 21,7Z" fill="#5aa0d8" ${L(O, .8)}/>`],
  curioso: ['#e8c86a', `<circle cx="9" cy="12" r="3.2" fill="#fff" ${L(O, 1.2)}/><circle cx="17" cy="12" r="3.2" fill="#fff" ${L(O, 1.2)}/><circle cx="9.6" cy="11.4" r="1.6" fill="${O}"/><circle cx="17.6" cy="11.4" r="1.6" fill="${O}"/><path d="M6,6.5 C7.5,5 10,5 11.5,6.5 M14.5,6.5 C16,5 18.5,5 20,6.5" fill="none" ${L(O, 1.3)}/><circle cx="13" cy="19" r="1.8" fill="${O}"/>`],
  manso: ['#9ac07a', `<path d="M6.5,12 C8,10 10.5,10 12,12 M14,12 C15.5,10 18,10 19.5,12" fill="none" ${L(O, 1.5)}/><path d="M9,17 C11,19.5 15,19.5 17,17" fill="none" ${L(O, 1.5)}/>`],
  bravo: ['#e07a5a', `<path d="M5.5,8 L11,11 M20.5,8 L15,11" ${L(O, 1.8)}/><circle cx="9.5" cy="13" r="1.8" fill="${O}"/><circle cx="16.5" cy="13" r="1.8" fill="${O}"/><path d="M8,19 L18,19" ${L(O, 1.6)}/><path d="M10,17.6 L10,20.4 M13,17.6 L13,20.4 M16,17.6 L16,20.4" ${L(O, 1)}/>`],
  mito: ['#9a7ac8', `<path d="M13,4 L15.4,10.2 L22,10.6 L16.8,14.6 L18.6,21 L13,17.4 L7.4,21 L9.2,14.6 L4,10.6 L10.6,10.2Z" fill="#f2d23a" ${L(O, 1.2)}/>`],
};
const carIco = (k, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="13" cy="13" r="12" fill="${CAR[k][0]}" stroke="${O}" stroke-width="1.8"/>${CAR[k][1]}</g>`;
const reloj = (x, y, n, { alerta = false, s = 1 } = {}) => `<g transform="translate(${x} ${y}) scale(${s})" ${alerta ? 'class="late"' : ''}><path d="M2,1 L18,1 M2,27 L18,27" ${L(O, 2.4)}/><path d="M4,2 L16,2 C16,8 11,11 11,14 C11,17 16,20 16,26 L4,26 C4,20 9,17 9,14 C9,11 4,8 4,2Z" fill="#fdf6e4" ${L(O, 1.6)}/><path d="M6.4,6 L13.6,6 C12.6,9 10.6,10.6 10,12.6 C9.4,10.6 7.4,9 6.4,6Z" fill="#e2b83a"/><path d="M6,25 C7,21 13,21 14,25Z" fill="#e2b83a"/><circle cx="25" cy="22" r="8.5" fill="${alerta ? '#d8402a' : H}" stroke="${O}" stroke-width="1.8"/>${T(25, 26.4, 11.5, n, { w: 800, a: 'middle', c: alerta ? '#fff' : CU })}</g>`;
const bolea = (on) => `<path d="M3,12 C5,8 9,8 11,5 M3,12 C6,13 10,14 13,13" stroke="${on ? '#8a5a32' : '#9a8a7a'}" stroke-width="1.2" fill="none"/>${[[3, 12], [11, 5], [13, 13]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="${on ? '#9aa4ac' : '#6a5a4a'}" stroke="${O}" stroke-width="1"/>`).join('')}`;
const tiros = (x, y, quedan) => `<g transform="translate(${x} ${y})">${[0, 1, 2].map((i) => `<g transform="translate(${i * 17} 0)">${bolea(i < quedan)}</g>`).join('')}</g>`;
const icoBolea = `<g transform="translate(8 7) scale(1.7)">${bolea(true)}</g>`;
const icoRaja = `<g transform="translate(8 10)"><circle cx="7" cy="20" r="5" fill="#c9b48a" ${L(O, 1.2)}/><circle cx="14" cy="22" r="4" fill="#d9c89e" ${L(O, 1.2)}/><path d="M14,12 L28,12 M23,6 L29,12 L23,18" fill="none" ${L('#fbf3e2', 3)}/></g>`;

export { O, H, CU, L, caravana, GL, MARCAS, EFECTOS, marcaSvg, efectoSvg, tag, tagM, tagE, vida, rombos, chip, panel, fondo, fichaRel, relevos, retrato, pie, msgT, flecha, revienta, tecnica, btn, icoCubre, icoRel, dorso, carta, carIco, reloj, bolea, tiros, icoBolea, icoRaja };
