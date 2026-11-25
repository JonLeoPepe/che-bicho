// Catálogo para aprobar, lote 8c: puma (tercer camino), picaflor, alacrán y tolvanera (Jujuy).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
const f1 = (n) => n.toFixed(1);
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

// ───────── QAQAPUMA (Tierra) · puma de la quebrada, acechando ─────────
export function qaqapuma() {
  const tono = (t) => t.replaceAll('#cf9a5c', '#bf6a3e').replaceAll('#a06a35', '#8a4428').replaceAll('#e8bd82', '#dc8e5e').replaceAll('#f1dfb8', '#f0d6b4').replaceAll('#8a5426', '#5e2a18');
  const p = tono(puma());
  const defs = p.slice(0, p.indexOf('</defs>') + 7);
  const cabeza = p.slice(p.indexOf('<g class="cabeza"'));
  const C = { pe: '#bf6a3e', so: '#8a4428', lu: '#dc8e5e', cr: '#f0d6b4', ma: '#5e2a18' };
  const k = nuevoId('qp');
  const cu = 'M60,128 C62,108 86,100 110,104 C134,108 156,104 168,114 C180,124 176,140 162,144 C148,148 130,142 112,144 C94,146 74,146 64,140 C60,136 60,132 60,128Z';
  const pata = (d, col) => trazo(d, col, 11);
  const zarpa = (x, y, col) => `<path d="M${x - 9},${y} C${x - 9},${y - 7} ${x + 6},${y - 7} ${x + 7},${y} Z" fill="${col}" ${L(2)}/><path d="M${x - 5},${y} l0,-3 M${x},${y} l0,-3" ${L(1.2)}/>`;
  return `${defs}<defs>${clip(k, cu)}</defs>${sombra(112, 182, 74)}
  <g class="cola" style="transform-origin:166px 124px">${trazo('M164,124 C184,132 194,152 190,168 C188,176 196,180 200,172', C.pe, 10)}<path d="M196,174 C198,168 204,166 204,172 C204,178 198,180 196,174Z" fill="${C.ma}" ${L(1.6)}/></g>
  ${pata('M148,136 L162,150 L150,166 L156,176', C.so)}${zarpa(158, 179, C.so)}${pata('M88,138 L74,156 L84,174', C.so)}${zarpa(84, 179, C.so)}
  <g class="respira" style="transform-origin:112px 144px">
    <path d="${cu}" fill="${C.pe}"/><g clip-path="url(#${k})"><path d="M56,138 C90,148 130,140 180,134 L180,160 L56,160Z" fill="${C.so}"/><path d="M84,108 C104,102 132,106 156,108" stroke="${C.lu}" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${[[100, 116, 0], [120, 114, 16], [140, 118, -10], [112, 128, 8]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-7,-2 C-5,-5 0,-6 6,-4 C8,-1 6,3 1,4 C-3,4 -7,2 -7,-2Z" fill="${C.ma}" opacity=".7"/><path d="M-3,-4 L0,0 L4,3 M0,0 L-2,3" stroke="${C.lu}" stroke-width=".9" fill="none"/></g>`).join('')}</g><path d="${cu}" fill="none" ${L()}/>
    <path d="M78,106 C86,94 100,94 106,104" stroke="${C.pe}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M76,108 C84,94 102,92 108,104" ${L(2.6)} fill="none"/>
    ${[[96, 98, -20], [112, 100, 10]].map(([x, y, r]) => `<path d="M${x - 4},${y + 4} L${x},${y - 8} L${x + 5},${y + 3}Z" transform="rotate(${r} ${x} ${y})" fill="#a8503a" ${L(1.4)}/>`).join('')}
    ${pata('M160,132 L176,150 L164,168 L170,176', C.pe)}${zarpa(172, 179, C.pe)}${pata('M78,132 L62,152 L70,174', C.pe)}${zarpa(70, 179, C.pe)}
  </g>
  <g transform="translate(-12 46) rotate(8 56 76) scale(1.12)">${cabeza}</g>`;
}

// ───────── QUINTI (Rayo) · picaflor ─────────
const C_PF = { lo: '#6a7a4a', lo2: '#4a5a32', ve: '#2f9a6a', ve2: '#5fd0a0', bl: '#f1ece0', ca: '#c98a4a', pa: '#7a5a3a', ra: '#f2d23a' };
const chispa = (x, y, s = 1) => `<g class="chispa" transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 l6,-4 l-2,6 l7,-2" stroke="${C_PF.ra}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const cabezaPf = (x, y, r = 0, s = 1, { largo = 34, gorguera = C_PF.ve, ceno = true } = {}) => { const C = C_PF; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <path d="M-8,-2 L${-8 - largo},1 L-8,3Z" fill="#2a2420" ${L(1.4)}/>
  <path d="M12,-2 C12,-12 2,-14 -6,-10 C-10,-8 -10,-2 -9,2 C-8,8 0,10 6,8 C10,6 12,2 12,-2Z" fill="${C.lo}" ${L(2.2)}/>
  <path d="M-9,2 C-6,10 4,12 10,6 C4,6 -2,4 -9,2Z" fill="${gorguera}" ${L(1.4)}/><path d="M-4,5 C0,7 4,7 7,6" stroke="${C.ve2}" stroke-width="1.4" fill="none"/>
  ${ojoAlm(0, -3, 3, 2.2, '#1a1410')}<path d="M1,-1 L6,1" stroke="${C.bl}" stroke-width="1.6"/>${ceno ? `<path d="M-5,-7 L4,-6" ${L(2)}/>` : ''}</g>`; };
export function quinti(v = 'base') {
  const C = C_PF;
  if (v === 'hatun') {
    const cu = 'M70,96 C76,80 104,74 126,80 C144,86 152,100 146,114 C140,126 120,130 100,126 C84,122 68,112 70,96Z';
    return `${sombra(110, 184, 46)}
    <g class="zumbido"><path d="M100,88 C92,62 94,34 104,8 C110,32 112,62 110,88Z" fill="${C.lo2}" ${L(2)}/><path d="M104,80 L104,20" stroke="#8a9a6a" stroke-width="1.2"/>${chispa(98, 12, 1.1)}<path d="M120,88 C134,62 152,44 174,30 C166,54 150,76 128,94Z" fill="${C.lo}" ${L(2)}/><path d="M126,84 L168,36" stroke="#8a9a6a" stroke-width="1.2"/>${chispa(166, 30, 1.1)}</g>
    <path d="M140,112 L178,132 L170,118 L186,120 L172,106 L184,98 L146,100Z" fill="${C.lo2}" ${L(2)}/><path d="M150,104 L176,104 M150,112 L174,124" stroke="${C.bl}" stroke-width="1.6"/>
    <g class="respira" style="transform-origin:110px 120px"><path d="${cu}" fill="${C.lo}" ${L()}/><path d="M74,108 C90,124 120,128 142,116 C132,128 112,132 96,128 C84,124 76,118 74,108Z" fill="${C.ca}"/><path d="M128,100 C138,104 144,110 146,114" stroke="${C.bl}" stroke-width="5" stroke-linecap="round"/>
      ${trazo('M100,124 L98,140', C.pa, 3)}${trazo('M112,126 L114,140', C.pa, 3)}<path d="M92,142 l8,0 M108,142 l9,0" stroke="${O}" stroke-width="3" stroke-linecap="round"/></g>
    <g class="cabeza" style="transform-origin:76px 92px">${cabezaPf(66, 88, 6, 1.5, { largo: 36, gorguera: C.ca })}</g>
    ${chispa(40, 96)}${chispa(150, 150)}`;
  }
  if (v === 'centella') {
    return `${sombra(96, 184, 34)}
    <path d="M196,20 L170,40 L184,48 L150,74 L164,80 L126,104" stroke="${C.ra}" stroke-width="5" fill="none" stroke-linejoin="round" class="estela"/><path d="M196,20 L170,40 L184,48 L150,74 L164,80 L126,104" stroke="#fff6c0" stroke-width="2" fill="none" stroke-linejoin="round"/>
    <g class="picada"><g transform="rotate(40 100 110)">
      <path d="M122,104 L156,96 L150,104 L160,108 L124,112Z" fill="${C.lo2}" ${L(1.8)}/>
      <path d="M96,100 C110,86 130,82 146,86 C134,94 118,102 104,106Z" fill="${C.lo}" ${L(2)}/>
      <path d="M78,108 C82,98 100,94 116,98 C128,102 130,110 122,116 C112,122 94,122 84,118 C78,116 76,112 78,108Z" fill="${C.lo}" ${L(2.4)}/><path d="M80,112 C92,120 110,120 122,114" stroke="${C.bl}" stroke-width="3" fill="none"/>
      <path d="M100,104 C114,94 132,92 148,96 C134,102 118,108 106,110Z" fill="${C.lo2}" ${L(2)}/>
      ${cabezaPf(74, 106, 0, 1.2, { largo: 30 })}
    </g></g>${chispa(48, 150)}${chispa(36, 120, .8)}`;
  }
  const cu = 'M86,100 C90,86 108,80 124,86 C136,92 140,106 132,118 C124,128 106,130 96,124 C88,118 84,110 86,100Z';
  return `${sombra(108, 184, 30)}
  <g class="zumbido"><path d="M110,92 C104,70 104,46 112,22 C116,44 118,70 116,92Z" fill="${C.lo2}" ${L(1.8)}/><path d="M110,80 L112,30" stroke="#8a9a6a" stroke-width="1"/><path d="M120,92 C132,72 146,56 164,44 C156,62 142,80 126,96Z" fill="${C.lo}" ${L(1.8)}/><path d="M126,88 L158,50" stroke="#8a9a6a" stroke-width="1"/>${chispa(110, 26)}${chispa(156, 44)}</g>
  <path d="M130,116 L152,148 L140,142 L140,154 L126,126Z" fill="${C.lo2}" ${L(1.8)}/>
  <g class="flota"><path d="${cu}" fill="${C.bl}" ${L()}/><path d="M118,86 C132,90 140,104 134,118 C126,112 120,100 118,86Z" fill="${C.lo}"/><path d="M104,104 C106,112 108,120 110,126" stroke="#2a2420" stroke-width="3" fill="none"/>
    ${trazo('M106,126 L104,136', C.pa, 2.4)}${trazo('M114,126 L116,136', C.pa, 2.4)}
    ${cabezaPf(92, 92, 4, 1.25, { largo: 30 })}</g>`;
}

// ───────── AGUIJÓN (Veneno) · alacrán ─────────
const C_AL = { cu: '#c9a25a', so: '#9a7838', lu: '#e2c47e', uv: '#5fd0c0', ne: '#2a2420', pi: '#6a6660', pi2: '#8a857c', ro: '#b8322a', ro2: '#e05a3a' };
const ojosAl = (x, y, col) => `<g class="brillo">${[[x + 2, y - 1, 3.2], [x + 10, y - 2, 2.9]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r * 2.4}" fill="${col}" opacity=".28"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}" stroke="#1a1410" stroke-width="1.2"/><circle cx="${cx - r * 0.3}" cy="${cy - r * 0.3}" r="${r * 0.35}" fill="#fff" opacity=".9"/>`).join('')}</g>`;
const pinza = (x, y, r, s, col, sombra2) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0,0 C-8,-10 -24,-12 -32,-6 C-36,-2 -32,4 -26,2 C-20,0 -14,2 -10,6 C-16,8 -24,10 -28,14 C-24,18 -12,16 -2,8Z" fill="${col}" ${L(2)}/><path d="M-28,-4 C-22,-6 -16,-4 -12,0" stroke="${sombra2}" stroke-width="1.6" fill="none"/></g>`;
const segCola = (pts, col, r0, r1, uv) => pts.map(([x, y], i) => { const r = r0 + ((r1 - r0) * i) / (pts.length - 1); return `<ellipse cx="${x}" cy="${y}" rx="${f1(r)}" ry="${f1(r * 0.82)}" fill="${col}" ${L(2)}/>${uv ? `<path d="M${f1(x - r * 0.6)},${f1(y - r * 0.4)} C${x},${f1(y - r * 0.8)} ${f1(x + r * 0.5)},${f1(y - r * 0.5)} ${f1(x + r * 0.7)},${y}" stroke="${uv}" stroke-width="1.4" fill="none"/>` : ''}`; }).join('');
const patasAl = (x0, y0, col, piso = 180, sep = 13, lejos = false) => [0, 1, 2, 3].map((i) => { const x = x0 + i * sep, dx = [-20, -9, 7, 18][i]; return trazo(`M${x},${y0} L${x + dx},${y0 - 10} L${x + dx * 1.8},${piso - (lejos ? 4 : 0)}`, col, lejos ? 2.2 : 3); }).join('');
export function aguijon(v = 'base') {
  const C = C_AL;
  if (v === 'laja') {
    return `${sombra(106, 184, 76)}
    ${patasAl(84, 166, '#5a5650', 180, 16, true)}
    <g class="cola" style="transform-origin:150px 152px">${segCola([[152, 156], [168, 150], [180, 140], [186, 126], [182, 112]], C.pi2, 9, 7)}<path d="M178,104 C172,94 180,88 186,94 C188,100 184,106 178,104Z M180,96 L172,90" fill="${C.pi}" ${L(2)}/></g>
    <g class="respira" style="transform-origin:110px 160px">
      <path d="M58,158 C58,140 86,132 112,132 C140,132 160,140 160,156 C160,170 138,176 110,176 C82,176 58,172 58,158Z" fill="${C.pi}" ${L()}/>
      ${[[76, 146], [96, 140], [118, 140], [138, 146], [86, 160], [108, 158], [130, 160]].map(([x, y], i) => `<path d="M${x - 10},${y + 6} L${x - 8},${y - 6} L${x + 8},${y - 7} L${x + 10},${y + 5}Z" fill="${i % 2 ? C.pi2 : '#7a766e'}" ${L(1.6)}/><path d="M${x - 3},${y - 3} l3,4 l-1,3" stroke="#4a4640" stroke-width="1" fill="none"/>`).join('')}
      ${patasAl(80, 170, C.pi2, 184, 17)}${pinza(62, 150, -10, 1.3, C.pi2, '#5a5650')}${pinza(64, 166, 14, 1.2, C.pi, '#5a5650')}
      ${ojosAl(60, 146, '#5fe0d0')}
    </g>`;
  }
  if (v === 'roja') {
    const pts = [[134, 132], [148, 116], [156, 98], [158, 78], [152, 58], [140, 44], [124, 38]];
    return `${sombra(100, 184, 54)}
    ${patasAl(84, 140, '#7a5a28', 180, 12, true)}
    <g class="cola2" style="transform-origin:134px 132px">${segCola(pts, C.ro, 10, 8, C.ro2)}<path d="M120,38 C108,34 104,46 110,52 C114,56 120,52 122,46Z" fill="${C.ro}" ${L(2)}/><path d="M110,50 C104,56 98,58 94,58" stroke="${O}" stroke-width="3.4" stroke-linecap="round"/><path d="M110,50 C104,56 98,58 94,58" stroke="#f2e6d0" stroke-width="1.6" stroke-linecap="round"/><g class="gota"><path d="M93,60 C91,64 95,67 96,64 C97,62 95,61 93,60Z" fill="#9adf5a" ${L(1)}/></g></g>
    <g class="respira" style="transform-origin:104px 140px">
      <path d="M62,128 C62,114 84,108 104,108 C124,108 140,116 140,130 C140,142 122,146 102,146 C80,146 62,142 62,128Z" fill="${C.cu}" ${L()}/>${[76, 90, 104, 118].map((x) => `<path d="M${x},110 C${x + 2},124 ${x + 2},136 ${x},144" stroke="${C.so}" stroke-width="2" fill="none"/>`).join('')}
      ${patasAl(80, 144, C.cu, 184, 13)}${pinza(64, 120, -40, 1.25, C.cu, C.so)}${pinza(62, 134, -6, 1.2, C.lu, C.so)}
      ${ojosAl(62, 116, '#ff4a2a')}
    </g>`;
  }
  const pts = [[138, 140], [154, 128], [162, 112], [160, 94], [150, 80], [136, 74]];
  return `${sombra(104, 184, 62)}
  ${patasAl(84, 152, '#7a5a28', 180, 14, true)}
  <g class="cola" style="transform-origin:138px 140px">${segCola(pts, C.cu, 9, 7, C.uv)}<path d="M132,74 C122,68 116,78 122,84 C126,88 132,84 134,78Z" fill="${C.cu}" ${L(2)}/><path d="M122,82 C116,88 110,90 106,90" stroke="${O}" stroke-width="3.4" stroke-linecap="round"/><path d="M122,82 C116,88 110,90 106,90" stroke="#f2e6d0" stroke-width="1.6" stroke-linecap="round"/></g>
  <g class="respira" style="transform-origin:106px 150px">
    <path d="M60,140 C60,124 84,118 106,118 C128,118 146,126 146,140 C146,154 126,158 104,158 C80,158 60,154 60,140Z" fill="${C.cu}" ${L()}/>${[78, 94, 110, 126].map((x) => `<path d="M${x},120 C${x + 2},134 ${x + 2},146 ${x},156" stroke="${C.so}" stroke-width="2" fill="none"/>`).join('')}<path d="M64,132 C80,124 120,122 142,132" stroke="${C.uv}" stroke-width="1.6" fill="none" opacity=".8"/>
    ${patasAl(80, 156, C.cu, 184, 15)}${pinza(62, 132, -18, 1.2, C.cu, C.so)}${pinza(62, 148, 10, 1.15, C.lu, C.so)}
    ${ojosAl(60, 128, '#b8f05a')}
  </g>`;
}

// ───────── TOLVANERA (Viento) · remolino de polvo ─────────
const C_TV = { po: '#d9c09a', po2: '#b89a70', po3: '#8a6e4a', oj: '#f2d23a', pi: '#8f8b80', ra: '#7a8a4a' };
const embudo = (cx, yT, yB, wT, wB, bend, n, cols) => { const P = 14, L1 = [], R1 = [], bandas = []; for (let i = 0; i <= P; i++) { const t = i / P, y = yT + (yB - yT) * t, w = wT + (wB - wT) * Math.pow(t, 0.7), xo = cx + bend * Math.sin(t * Math.PI * 1.4), wob = (i % 2 ? 2.4 : -2.4); L1.push(`${f1(xo - w + wob)},${f1(y)}`); R1.push(`${f1(xo + w - wob)},${f1(y)}`); }
  for (let j = 1; j <= n; j++) { const t = j / (n + 1), y = yT + (yB - yT) * t, w = wT + (wB - wT) * Math.pow(t, 0.7), xo = cx + bend * Math.sin(t * Math.PI * 1.4); bandas.push(`<path d="M${f1(xo - w + 3)},${f1(y - 4)} C${f1(xo - w * 0.4)},${f1(y + 6)} ${f1(xo + w * 0.4)},${f1(y + 6)} ${f1(xo + w - 3)},${f1(y - 6)}" stroke="${cols[j % cols.length]}" stroke-width="${f1(2 + w / 14)}" fill="none" stroke-linecap="round" class="giro" style="animation-delay:${j * 0.1}s"/>`); }
  const d = `M${L1.join(' L')} L${R1.reverse().join(' L')}Z`; const k = nuevoId('tv');
  return `<defs>${clip(k, d)}</defs><path d="${d}" fill="${C_TV.po}"/><g clip-path="url(#${k})">${bandas.join('')}</g><path d="${d}" fill="none" ${L(2.4)}/><ellipse cx="${cx}" cy="${yT}" rx="${wT}" ry="${f1(wT * 0.22)}" fill="${C_TV.po2}" ${L(2.2)}/><ellipse cx="${cx}" cy="${yT - 1}" rx="${f1(wT * 0.7)}" ry="${f1(wT * 0.12)}" fill="${C_TV.po3}" opacity=".6"/>`; };
const ojosPolvo = (x, y, s = 1, ceno = true) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14,0 C-11,-4 -5,-4 -3,0 C-5,3 -11,3 -14,0Z M3,0 C5,-4 11,-4 14,0 C11,3 5,3 3,0Z" fill="${C_TV.oj}" ${L(1.6)}/><ellipse cx="-8.5" cy="0" rx="1.2" ry="2.2" fill="${O}"/><ellipse cx="8.5" cy="0" rx="1.2" ry="2.2" fill="${O}"/>${ceno ? `<path d="M-15,-5 L-3,-2 M3,-2 L15,-5" ${L(2.4)}/>` : ''}</g>`;
const orbitas = (pts) => `<g class="orbita">${pts.map(([x, y, t], i) => t === 'p' ? `<path d="M${x - 5},${y + 3} L${x - 3},${y - 4} L${x + 4},${y - 4} L${x + 5},${y + 3}Z" fill="${C_TV.pi}" ${L(1.4)}/>` : `<path d="M${x - 8},${y} L${x + 8},${y - 3} M${x - 2},${y - 1} l-3,-5 M${x + 3},${y - 2} l2,-5" stroke="${C_TV.ra}" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>`;
export function tolvanera(v = 'base') {
  const C = C_TV;
  if (v === 'remolino') return `${sombra(100, 184, 30)}<g class="balanceo">${embudo(104, 30, 180, 30, 4, 14, 9, [C.po2, C.po3])}${ojosPolvo(106, 52, 1.1)}<path d="M96,64 C102,68 110,68 116,64" ${L(2)} fill="none"/></g>${orbitas([[50, 60, 'r'], [158, 96, 'p'], [56, 134, 'p'], [150, 40, 'r']])}`;
  if (v === 'grande') return `${sombra(104, 186, 52)}<g class="balanceo">
      <path d="M50,58 C28,66 18,88 24,110" stroke="${O}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M50,58 C28,66 18,88 24,110" stroke="${C.po2}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M158,58 C180,66 190,88 184,110" stroke="${O}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M158,58 C180,66 190,88 184,110" stroke="${C.po2}" stroke-width="11" fill="none" stroke-linecap="round"/>
      ${embudo(104, 34, 182, 62, 10, 4, 8, [C.po2, C.po3])}${ojosPolvo(104, 62, 1.6)}<path d="M84,82 C94,94 114,94 124,82 C114,88 94,88 84,82Z" fill="#5a3a22" ${L(2)}/><path d="M88,84 l3,4 l3,-3 l3,4 l3,-3 l3,4 l3,-3 l3,4 l3,-4" stroke="${C.po}" stroke-width="1.4" fill="none"/></g>
    ${orbitas([[28, 128, 'p'], [180, 132, 'p'], [34, 146, 'p'], [174, 150, 'r'], [104, 14, 'p'], [20, 40, 'r']])}`;
  return `${sombra(100, 184, 36)}<g class="balanceo">${embudo(100, 70, 180, 46, 6, 6, 6, [C.po2, C.po3])}${ojosPolvo(100, 94, 1.1)}</g>${orbitas([[46, 100, 'r'], [158, 120, 'p'], [56, 136, 'p'], [150, 70, 'r']])}`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Los nombres también son propuesta.</div>
<section>
<div class="linea"><h3>Tierra · puma</h3>
${tarjeta('B91', 'Allpuma', 'Pumita', 'Tierra', 'base · ya aprobado', puma(), 'Aprobado en la muestra: puma joven con el lomo agrietado como la tierra seca. <i>Allpa</i> es tierra.')}
${tarjeta('B92', 'Apu Puma', 'Puma de las cumbres', 'Tierra', 'camino 1 · ya aprobado', puma({ fin: true }), 'Aprobado en la muestra: más grande, con manto de piedra y ojos que brillan. <i>Apu</i> es el señor de la montaña.')}
${tarjeta('B93', 'Qaqapuma', 'Puma de la quebrada', 'Tierra', 'camino 2 · nuevo', qaqapuma(), 'Acechando agazapado: colorado como los cerros de la quebrada, con las paletas altas, la cola baja que se mueve y lajas rojas en el lomo. <i>Qaqa</i> es peña.')}</div>
<div class="linea"><h3>Rayo · picaflor</h3>
${tarjeta('B94', 'Quinti', 'Picaflor', 'Rayo', 'base', quinti(), 'Picaflor de la Puna suspendido en el aire: gorguera verde, pecho blanco, pico largo y alas que zumban tan rápido que chisporrotean. <i>Q\'inti</i> es picaflor.')}
${tarjeta('B95', 'Hatunquinti', 'Picaflor gigante', 'Rayo', 'camino 1', quinti('hatun'), 'El picaflor más grande del mundo: pardo, pecho canela, rabadilla blanca y cola abierta; las alas largan chispas al batir.')}
${tarjeta('B96', 'Centella', 'Picaflor de quebrada', 'Rayo', 'camino 2', quinti('centella'), 'Baja en picada con las alas pegadas al cuerpo y deja un rayo en zigzag detrás.')}</div>
<div class="linea"><h3>Veneno · alacrán</h3>
${tarjeta('B97', 'Aguijón', 'Alacrán', 'Veneno', 'base', aguijon(), 'Alacrán amarillento con la cola arqueada lista para picar; los bordes le brillan verde azulado, como bajo luz ultravioleta.')}
${tarjeta('B98', 'Lajero', 'Alacrán de piedra', 'Veneno', 'camino 1', aguijon('laja'), 'Chato y ancho, con placas como lajas grises y pinzas de cangrejo; vive debajo de las piedras y tiene la cola de costado.')}
${tarjeta('B99', 'Punzón', 'Alacrán de cola roja', 'Veneno', 'camino 2', aguijon('roja'), 'Parado alto sobre las patas con una cola roja larguísima en alto y una gota de veneno en el aguijón.')}</div>
<div class="linea"><h3>Viento · tolvanera</h3>
${tarjeta('B100', 'Tolvanera', 'Tolvanera', 'Viento', 'base', tolvanera(), 'Remolino de polvo de la Puna con dos ojos amarillos adentro; arrastra piedritas y ramas de tola. Conserva su nombre.')}
${tarjeta('B101', 'Remolino', 'Remolino de la Puna', 'Viento', 'camino 1', tolvanera('remolino'), 'Alto y finito, se retuerce como una víbora de polvo y cruza los campos más rápido que nadie.')}
${tarjeta('B102', 'Torbellino', 'Tolvanera grande', 'Viento', 'camino 2', tolvanera('grande'), 'Ancha y pesada, con brazos de polvo, boca de dientes de arena y piedras girando alrededor.')}</div>
</section>`;
const css = `@keyframes brillo{0%,100%{opacity:.75}50%{opacity:1}}@keyframes zumbido{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.7)}}@keyframes chispa{0%,60%,100%{opacity:0}70%,85%{opacity:1}}@keyframes flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}@keyframes picada{0%,100%{transform:translate(0,0)}50%{transform:translate(-4px,5px)}}@keyframes estela{0%,100%{opacity:.5}50%{opacity:1}}@keyframes cola2{0%,100%{transform:rotate(0)}50%{transform:rotate(-5deg)}}@keyframes gota{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}@keyframes giro{0%,100%{transform:translateX(-3px)}50%{transform:translateX(3px)}}@keyframes balanceo{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}@keyframes orbita{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
.brillo{animation:brillo 1.6s ease-in-out infinite}.zumbido{animation:zumbido .14s linear infinite;transform-box:view-box;transform-origin:112px 92px}.chispa{animation:chispa 1.2s infinite}.flota{animation:flota 1.2s ease-in-out infinite;transform-box:view-box}.picada{animation:picada 1s ease-in-out infinite;transform-box:view-box}.estela{animation:estela .5s infinite}.cola2{animation:cola2 1.6s ease-in-out infinite;transform-box:view-box}.gota{animation:gota 1.6s ease-in infinite;transform-box:fill-box}.giro{animation:giro .6s ease-in-out infinite;transform-box:fill-box}.balanceo{animation:balanceo 2s ease-in-out infinite;transform-box:view-box;transform-origin:100px 180px}.orbita{animation:orbita 8s linear infinite;transform-box:view-box;transform-origin:100px 110px}`;
writeFileSync(new URL('./catalogo-19.html', import.meta.url), pagina('Catálogo para aprobar · lote 8c', 'Bichos de Jujuy: puma, picaflor, alacrán y tolvanera', cuerpo, css));
console.log('ok');
