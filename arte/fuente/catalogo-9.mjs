// Catálogo para aprobar, lote 5a: iniciales de Corrientes (coatí-mburucuyá, hornero de fuego y yacaré).
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
import { yacare } from './muestra-bichos.mjs';

// ───────── flor de mburucuyá ─────────
const flor = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="flor">${Array.from({ length: 10 }, (_, i) => `<ellipse rx="3" ry="8" transform="rotate(${i * 36}) translate(0 -8)" fill="#f4f1ee" stroke="${O}" stroke-width="1"/>`).join('')}${Array.from({ length: 20 }, (_, i) => `<path d="M0,0 L0,-10" transform="rotate(${i * 18})" stroke="${i % 2 ? '#5a3a8a' : '#8a6ad0'}" stroke-width="1.6"/>`).join('')}<circle r="3.4" fill="#9ac25a" stroke="${O}" stroke-width="1"/><path d="M-2,-1 L2,-1 M0,-3 L0,1" stroke="#5a3a1a" stroke-width="1"/></g></g>`;
const zarcillo = (d) => `<path d="${d}" stroke="${O}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#6fae3a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
const hoja = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0,0 C-8,-4 -10,-14 -4,-20 C0,-14 6,-14 10,-20 C14,-12 10,-4 0,0Z" fill="#5f9a3a" ${L(1.6)}/><path d="M0,0 L0,-16" stroke="#3f6a2a" stroke-width="1"/></g>`;

// cola anillada que se afina: dos tramos de distinto grosor
const colaAnillada = (d1, d2, w1, w2, base, anillo) => [[d1, w1], [d2, w2]].map(([d, w]) => `<path d="${d}" stroke="${O}" stroke-width="${w + 4}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${anillo}" stroke-width="${w}" fill="none" stroke-dasharray="5 6"/>`).join('');
const C_CO = { pe: '#9c6436', so: '#6e4220', lu: '#c48a52', cr: '#e8d2a8', ma: '#3a2416' };
// cabeza de coatí mirando a la izquierda (hocico largo y respingado, antifaz)
const cabezaCoati = (x, y, r = 0, s = 1, boca = false) => { const C = C_CO; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s * 0.82} ${s})">
  <circle cx="22" cy="-12" r="5.5" fill="${C.so}" ${L(2)}/><circle cx="14" cy="-14" r="5.5" fill="${C.pe}" ${L(2)}/><circle cx="14" cy="-14" r="2.4" fill="${C.cr}"/>
  <path d="M28,2 C26,-10 14,-16 2,-14 C-8,-12 -16,-6 -26,-2 L-40,2 C-46,4 -46,10 -40,10 C-30,10 -18,10 -6,10 C8,12 24,10 28,2Z" fill="${C.pe}" ${L(2.6)}/>
  <path d="M-40,10 C-30,10 -18,10 -6,10 C-4,8 -6,4 -12,4 C-22,4 -32,6 -40,8Z" fill="${C.cr}"/>
  <path d="M-24,-2 C-14,-8 0,-8 8,-4 C6,2 -2,4 -12,2 C-18,2 -22,0 -24,-2Z" fill="${C.ma}"/><path d="M-20,-6 C-10,-12 2,-12 10,-8" stroke="${C.cr}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-4,6 C0,4 6,4 10,6" stroke="${C.cr}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M-46,3 C-48,0 -46,-3 -42,-2 C-40,0 -40,4 -43,5Z" fill="#2a1a14" ${L(1.4)}/>
  ${boca ? `<path d="M-38,10 C-30,16 -20,16 -12,11" fill="#7a2a3a" ${L(1.6)}/>` : `<path d="M-38,9 C-30,11 -20,11 -12,9" ${L(1.3)} fill="none"/>`}
  ${ojoAlm(-6, -2, 3.4, 2, '#2a1a12')}
  <path d="M28,2 C26,-10 14,-16 2,-14 C-8,-12 -16,-6 -26,-2 L-40,2 C-46,4 -46,10 -40,10 C-30,10 -18,10 -6,10 C8,12 24,10 28,2Z" fill="none" ${L(2.6)}/></g>`; };

export function mburucoa(v = 'base') {
  const C = C_CO;
  if (v === 'trepador') {
    return `${sombra(104, 180, 38)}
    <g class="cola" style="transform-origin:112px 146px">${colaAnillada('M112,146 C136,152 152,140 152,118', 'M152,118 C152,102 158,90 170,88', 12, 8, C.lu, C.ma)}${zarcillo('M170,88 C178,84 180,92 174,94 C170,96 172,100 176,98')}</g>
    <path d="M112,134 C124,136 128,150 118,158 L116,168 C122,170 124,176 118,177 L102,177 C100,172 104,170 108,168 L108,156 C102,150 102,140 112,134Z" fill="${C.so}" ${L(2.4)}/>
    <g class="respira" style="transform-origin:104px 172px">
      <path d="M86,146 C76,124 80,94 98,80 C114,70 132,82 130,104 C128,126 122,142 108,148 C100,152 90,152 86,146Z" fill="${C.pe}" ${L()}/>
      <path d="M90,140 C84,120 88,98 100,88 C96,106 96,126 102,146Z" fill="${C.cr}"/>
      <path d="M100,84 C114,80 126,92 126,108" stroke="${C.lu}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${hoja(124, 100, 40, 0.8)}${hoja(128, 124, 70, 0.75)}${hoja(118, 84, 10, 0.7)}
      <path d="M92,136 C82,138 76,152 84,160 L82,170 C76,172 76,177 82,177 L98,177 C100,172 96,170 92,168 L92,158 C98,152 100,142 92,136Z" fill="${C.pe}" ${L(2.4)}/>
      <path d="M100,96 C90,92 80,86 72,78 L78,72 C86,80 96,86 106,88Z" fill="${C.pe}" ${L(2.2)}/>${zarcillo('M74,74 C66,68 62,58 68,52 C74,48 78,56 72,58 C68,60 66,54 70,52')}
      <path d="M118,90 C124,80 128,70 130,58 L122,56 C120,68 116,78 110,86Z" fill="${C.so}" ${L(2.2)}/>${zarcillo('M126,56 C126,46 134,40 140,44 C144,48 138,54 134,50')}
    </g>
    <g class="cabeza" style="transform-origin:100px 84px">${cabezaCoati(96, 72, -18, 0.95, true)}<g transform="translate(104 52) scale(.6)"><g class="flor">${flor(0, 0, 1).replace(/^<g transform="translate\(0 0\) scale\(1\)"><g class="flor">/, '').replace(/<\/g><\/g>$/, '')}</g></g></g>`;
  }
  if (v === 'flor') {
    const florTallo = (x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})"><g class="flor">${flor(0, 0, 1).replace(/^<g transform="translate\(0 0\) scale\(1\)"><g class="flor">/, '').replace(/<\/g><\/g>$/, '')}</g></g>`;
    return `${sombra(104, 182, 70)}
    <g class="respira" style="transform-origin:108px 176px">
      <path d="M62,152 C62,132 86,124 114,126 C140,128 158,138 158,154 C158,168 142,174 118,174 L86,174 C70,174 62,166 62,152Z" fill="${C.pe}" ${L()}/>
      <path d="M68,162 C86,170 120,170 152,162 C146,172 130,176 114,176 L86,176 C74,176 68,170 68,162Z" fill="${C.cr}"/>
      <path d="M84,132 C104,126 130,128 150,140" stroke="${C.lu}" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      <path d="M124,140 C140,138 152,148 150,162 C146,170 134,172 126,168Z" fill="${C.so}" opacity=".5"/>
      ${zarcillo('M100,130 C104,122 112,122 112,128 C112,132 106,132 106,128')}${hoja(118, 130, 10, 0.8)}${hoja(138, 136, 40, 0.75)}
      ${florTallo(96, 128, 0.55)}
    </g>
    <g class="cola" style="transform-origin:154px 160px">${colaAnillada('M154,158 C172,166 170,184 146,186', 'M146,186 C120,188 92,188 70,184', 11, 8, C.lu, C.ma)}${[[164, 176], [138, 186], [112, 187], [86, 186]].map(([x, y], i) => `${hoja(x + 4, y - 4, -30 + i * 20, 0.55)}${florTallo(x, y - 8, 0.42)}`).join('')}</g>
    <path d="M56,172 C50,172 48,178 54,180 L66,180 C70,178 68,172 62,172Z M70,174 C66,174 64,180 70,181 L80,181 C84,179 82,174 78,174Z" fill="${C.pe}" ${L(2)}/>
    <g class="cabeza" style="transform-origin:70px 160px">${cabezaCoati(66, 160, 4, 0.95)}<path d="M57,157 C60,155.5 64,155.5 66,157" stroke="${C.pe}" stroke-width="3.4" stroke-linecap="round"/><path d="M57,158 C60,156.4 64,156.4 66,158" stroke="${O}" stroke-width="1.6" fill="none" stroke-linecap="round"/>${florTallo(72, 140, 0.6)}</g>`;
  }
  return `${sombra(106, 180, 64)}
  <g class="cola" style="transform-origin:146px 112px">${colaAnillada('M146,112 C164,98 170,72 160,52', 'M160,52 C154,38 160,24 172,22', 13, 9, C.lu, C.ma)}${zarcillo('M172,22 C180,20 182,28 176,30 C172,32 174,36 178,34')}${hoja(166, 64, 50, 0.75)}</g>
  <path d="M88,124 L90,170 C90,175 99,176 100,172 L98,126Z M118,124 L116,168 C116,173 125,174 126,170 L128,126Z" fill="${C.so}" ${L(2.4)}/>
  <g class="respira" style="transform-origin:106px 150px">
    <path d="M60,118 C62,100 80,92 102,94 C122,96 140,98 150,110 C156,120 152,132 140,134 C128,136 118,132 104,134 C90,138 76,138 66,132 C60,128 58,124 60,118Z" fill="${C.pe}" ${L()}/>
    <path d="M66,128 C80,136 94,134 106,130 C118,128 130,132 140,132 C130,138 118,136 104,138 C90,140 74,140 66,132Z" fill="${C.cr}"/>
    <path d="M78,100 C96,94 124,96 144,106" stroke="${C.lu}" stroke-width="4.4" fill="none" stroke-linecap="round"/>
    ${zarcillo('M110,98 C114,90 122,90 122,96 C122,100 116,100 116,96')}${hoja(126, 100, -15, 0.75)}${hoja(98, 96, -40, 0.65)}
    <path d="M128,112 C140,112 148,124 144,138 L146,166 C146,172 155,174 156,170 L154,138 C156,126 150,112 138,106Z" fill="${C.pe}" ${L(2.4)}/>
    <path d="M72,120 C70,134 72,150 72,166 C72,172 82,173 83,169 L84,124Z" fill="${C.pe}" ${L(2.4)}/>
  </g>
  <g class="cabeza" style="transform-origin:70px 118px">${cabezaCoati(62, 110, 6, 1)}<g transform="translate(66 92) scale(.55)"><g class="flor">${flor(0, 0, 1).replace(/^<g transform="translate\(0 0\) scale\(1\)"><g class="flor">/, '').replace(/<\/g><\/g>$/, '')}</g></g></g>`;
}

// ───────── TATAKÚ (Fuego) · hornero de brasa ─────────
const C_HO = { pl: '#b0602c', so: '#7a3c18', lu: '#dc8a4c', ga: '#f1e6cc', br: '#ffb02e' };
function cabezaHornero(x, y, r, s, k, opts = {}) {
  const C = C_HO;
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
    <path d="M-12,4 C-14,-8 -6,-16 4,-16 C14,-16 20,-8 18,2 C16,10 8,14 0,14 C-6,14 -10,10 -12,4Z" fill="${C.pl}" ${L(2.6)}/>
    <path d="M-10,-8 C-4,-16 8,-16 14,-10 C8,-12 0,-12 -10,-8Z" fill="${C.so}"/>
    <path d="M-12,4 C-10,10 -4,14 2,14 C-2,10 -4,6 -4,2Z" fill="${C.ga}"/>
    <path d="M-12,-2 C-20,-2 -30,0 -38,4 C-30,4 -22,3 -12,3Z" fill="#c9a27a" ${L(1.8)}/>${opts.canta ? '<path d="M-12,4 C-20,6 -28,9 -34,12 C-26,10 -18,8 -12,6Z" fill="#c9a27a" stroke="#2a1c15" stroke-width="1.8" stroke-linejoin="round"/>' : ''}
    <path d="M-4,-7 C1,-9 7,-9 11,-6" stroke="${C.ga}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${ojoAlm(2, -2, 3.4, 2.1, '#e0601a')}
  </g>`;
}
export function tataku(v = 'base') {
  const k = nuevoId('hn'), C = C_HO;
  const grad = `<defs><radialGradient id="${k}b"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#ffb02e"/><stop offset="1" stop-color="#e0601a"/></radialGradient><radialGradient id="${k}g"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".6"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient></defs>`;
  const patas = (x1, x2, top, grue = 3) => [x1, x2].map((x, i) => `<path d="M${x},${top} L${x - 3 + i * 4},${top + 16} L${x - 1 + i * 2},${top + 32}" stroke="${O}" stroke-width="${grue + 2.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x},${top} L${x - 3 + i * 4},${top + 16} L${x - 1 + i * 2},${top + 32}" stroke="#c9a07a" stroke-width="${grue}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${x - 1 + i * 2},${top + 32} l-7,1 M${x - 1 + i * 2},${top + 32} l1,4 M${x - 1 + i * 2},${top + 32} l6,0" stroke="${O}" stroke-width="2" stroke-linecap="round"/>`).join('');
  const chispas = (pts) => `<g class="chispas">${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.6 + (i % 2)}" fill="${i % 2 ? '#ffd36a' : '#ff8a2a'}" style="animation-delay:${i * 0.3}s"/>`).join('')}</g>`;
  if (v === 'guazu') {
    const ala = (sx) => `<path d="M${100 + sx * 8},104 C${100 + sx * 30},90 ${100 + sx * 58},72 ${100 + sx * 88},68 C${100 + sx * 82},78 ${100 + sx * 76},84 ${100 + sx * 70},88 C${100 + sx * 80},88 ${100 + sx * 86},92 ${100 + sx * 90},98 C${100 + sx * 76},100 ${100 + sx * 66},102 ${100 + sx * 58},106 C${100 + sx * 66},108 ${100 + sx * 70},114 ${100 + sx * 72},120 C${100 + sx * 54},118 ${100 + sx * 34},116 ${100 + sx * 12},120Z" fill="${C.pl}" ${L(2.6)}/>
      <path d="M${100 + sx * 88},68 C${100 + sx * 96},58 ${100 + sx * 92},50 ${100 + sx * 96},42 C${100 + sx * 84},52 ${100 + sx * 80},62 ${100 + sx * 80},72Z M${100 + sx * 90},98 C${100 + sx * 100},92 ${100 + sx * 98},84 ${100 + sx * 104},78 C${100 + sx * 90},84 ${100 + sx * 86},90 ${100 + sx * 84},96Z" fill="${C.br}" stroke="#c8461e" stroke-width="1.6"/>
      <path d="M${100 + sx * 20},108 C${100 + sx * 40},98 ${100 + sx * 60},90 ${100 + sx * 80},84" stroke="${C.br}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>`;
    return `${grad}${sombra(102, 186, 44)}<circle cx="100" cy="108" r="60" fill="url(#${k}g)"/>
    <g class="aleteo" style="transform-origin:100px 108px">${ala(-1)}${ala(1)}</g>
    <path d="M90,130 L80,160 L92,152 L100,166 L108,152 L120,160 L110,130Z" fill="${C.so}" ${L(2.4)}/><path d="M92,150 C96,158 104,158 108,150" stroke="${C.br}" stroke-width="3" fill="none"/>
    <path d="M84,110 C82,92 92,84 100,84 C110,84 118,92 116,110 C114,128 108,136 100,136 C92,136 86,128 84,110Z" fill="${C.pl}" ${L()}/>
    <path d="M88,112 C88,100 94,94 100,94 C106,94 112,100 112,112 C112,124 106,130 100,130 C94,130 88,124 88,112Z" fill="url(#${k}b)"/><path d="M92,108 L100,104 L108,108 L100,112Z M92,120 L100,116 L108,120 L100,124Z" fill="#fff0b0" opacity=".7"/>
    <path d="M96,136 L94,148 M104,136 L106,148" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
    <g class="cresta" style="transform-origin:100px 72px"><path d="M94,72 C88,58 96,48 98,36 C102,46 108,52 106,64 C112,58 116,58 118,50 C120,62 112,72 104,74Z" fill="${C.br}" stroke="#c8461e" stroke-width="2"/></g>
    ${cabezaHornero(100, 78, 0, 1.05, k)}
    ${chispas([[60, 50], [150, 46], [72, 34], [132, 30]])}`;
  }
  if (v === 'horno') {
    // cuerpo de barro cocido: placas agrietadas con fuego en las grietas
    const cuerpo = 'M68,118 C66,88 92,70 120,74 C146,78 160,100 156,126 C152,148 132,160 108,158 C84,156 70,142 68,118Z';
    return `${grad}${sombra(110, 184, 56)}
    ${patas(102, 122, 150, 4)}
    <g class="cola" style="transform-origin:150px 132px"><path d="M148,124 L176,140 L168,150 L146,138Z" fill="#9a5a34" ${L(2.4)}/></g>
    <g class="respira" style="transform-origin:110px 158px">
      <path d="${cuerpo}" fill="#b4703f" ${L()}/>
      <defs>${clip(k + 'c', cuerpo)}</defs><g clip-path="url(#${k}c)">
        ${[[92, 92, 18, 12], [120, 86, 20, 13], [146, 100, 16, 12], [84, 118, 16, 13], [110, 112, 20, 14], [138, 124, 18, 13], [96, 142, 18, 12], [124, 146, 18, 12]].map(([x, y, rx, ry], i) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${['#c4844e', '#b4703f', '#cf9460'][i % 3]}" stroke="#ff9a2a" stroke-width="2.4"/><path d="M${x - rx * 0.5},${y - ry * 0.4} q${rx * 0.5},${-ry * 0.4} ${rx},0" stroke="#e0ac7a" stroke-width="2" fill="none"/>`).join('')}
        <ellipse cx="96" cy="120" rx="18" ry="16" fill="url(#${k}g)"/></g>
      <path d="${cuerpo}" fill="none" ${L()}/>
      <path d="M118,98 L118,88 Q128,80 138,88 L138,98Z" fill="#2a1408" ${L(1.8)}/><ellipse cx="128" cy="95" rx="7" ry="4" fill="url(#${k}b)"/>
      <g class="humo">${[0, 1, 2].map((i) => `<circle cx="130" cy="78" r="${4 + i}" fill="#d8d2c8" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>
    </g>
    ${cabezaHornero(78, 84, -4, 1.1, k)}`;
  }
  const cuerpo = 'M80,118 C78,100 92,86 112,88 C130,90 142,104 140,120 C138,134 124,144 106,142 C92,140 82,130 80,118Z';
  return `${grad}${sombra(108, 182, 40)}
  ${patas(102, 116, 140, 3)}
  <g class="cola" style="transform-origin:136px 124px"><path d="M134,118 L160,132 L156,140 L130,130Z" fill="${C.so}" ${L(2.4)}/><path d="M156,134 L162,136" stroke="${C.br}" stroke-width="3" stroke-linecap="round"/></g>
  <g class="respira" style="transform-origin:108px 142px">
    <path d="${cuerpo}" fill="${C.pl}"/><defs>${clip(k + 'c', cuerpo)}</defs><g clip-path="url(#${k}c)"><circle cx="94" cy="122" r="20" fill="url(#${k}b)"/><circle cx="94" cy="122" r="30" fill="url(#${k}g)"/><path d="M100,92 C118,90 132,98 138,112" stroke="${C.lu}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    <path d="M100,100 C118,96 134,104 140,120 C128,126 114,124 104,116Z" fill="${C.so}" ${L(2.4)}/>${[0, 1, 2].map((i) => `<path d="M${112 + i * 8},${104 + i * 4} q6,2 6,8" stroke="${C.lu}" stroke-width="1.6" fill="none"/>`).join('')}<path d="M134,118 L140,122" stroke="${C.br}" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g class="cabeza" style="transform-origin:90px 92px">${cabezaHornero(86, 80, -18, 1, k, { canta: true })}</g>
  ${chispas([[124, 84], [132, 72], [116, 70]])}`;
}

// ───────── yacarés con la misma construcción que el Yacarón aprobado ─────────
function yacareV({ abierta = false, alto = false, C }) {
  const k = nuevoId('yv'), dy = alto ? -16 : 0;
  const cuerpo = 'M40,132 C46,118 70,112 100,114 C124,116 140,124 146,136 C148,148 136,158 112,160 L66,160 C50,158 40,148 40,132Z';
  const pataT = (x, d) => alto ? `<path d="M${x + 6},${150 + dy} C${x - 2},${152} ${x - 6},${158} ${x - 4},${166} L${x - 12},172 C${x - 14},176 ${x},177 ${x + 4},175 L${x + 4},166 C${x + 4},${160} ${x + 8},${156} ${x + 14},${152 + dy}Z" fill="${d}" ${L(2.6)}/>` : '';
  return `<defs><clipPath id="${k}c"><path d="${cuerpo}"/></clipPath></defs>
  <ellipse cx="104" cy="178" rx="${alto ? 76 : 90}" ry="7" fill="rgba(20,40,40,.22)"/>
  ${alto ? pataT(78, C.so) + pataT(134, C.so) : `<path d="M72,146 C68,156 62,164 56,168 C54,172 62,174 68,172 L76,166 L80,150Z" fill="${C.so}" ${L()}/><path d="M128,148 C132,158 132,166 128,170 C128,174 136,175 140,172 L140,160 L136,148Z" fill="${C.so}" ${L()}/>`}
  <g transform="translate(0 ${dy})">
  <g class="cola" style="transform-origin:142px 146px">
    <path d="${alto ? 'M136,132 C160,126 180,116 194,98 C190,116 172,140 140,158Z' : 'M136,132 C162,130 184,140 197,160 C184,158 166,158 140,158Z'}" fill="${C.pi}" ${L()}/>
    <path class="aleta" d="${alto ? 'M146,128 C150,116 158,118 160,124 C164,112 172,114 172,120 C178,108 186,108 186,114 L170,132Z' : 'M144,131 C150,120 156,124 158,130 C163,121 169,126 170,133 C175,126 181,131 181,138 C186,134 190,140 189,146 L180,141 L144,134Z'}" fill="${C.fi}" fill-opacity=".9" ${L(2)}/>
  </g>
  <g class="respira" style="transform-origin:96px 160px">
    <path d="${cuerpo}" fill="${C.pi}"/>
    <g clip-path="url(#${k}c)"><path d="M40,150 C70,158 120,158 150,148 L150,170 L40,170Z" fill="${C.pa}"/>
      ${C.manchas ? Array.from({ length: 16 }, (_, i) => `<ellipse cx="${56 + (i % 8) * 11}" cy="${126 + Math.floor(i / 8) * 10 + (i % 2) * 3}" rx="3.6" ry="2.6" fill="${C.manchas}"/>`).join('') : [52, 72, 92, 112, 132].map((x) => `<path d="M${x},116 C${x + 6},126 ${x + 4},138 ${x - 2},148" stroke="${C.ba}" stroke-width="7" fill="none" opacity=".75"/>`).join('')}
      <ellipse cx="96" cy="114" rx="60" ry="6" fill="${C.lu}"/></g>
    <path d="${cuerpo}" fill="none" ${L()}/>
    ${[56, 70, 84, 98, 112, 126].map((x, i) => alto ? `<path d="M${x - 6},${117 - (i % 2)} L${x},${106 - (i % 2) * 2} L${x + 6},${117 - (i % 2)}Z" fill="${C.so}" ${L(1.8)}/>` : `<path d="M${x - 6},${117 - (i % 2)} C${x - 4},${110 - (i % 2)} ${x + 4},${110 - (i % 2)} ${x + 6},${117 - (i % 2)}" fill="${C.so}" ${L(1.8)}/>`).join('')}
    ${alto ? [[100, 0], [62, 0]].map(([x]) => `<path d="M${x + 6},150 C${x - 4},154 ${x - 8},${160 - dy * 0.5} ${x - 6},${168 - dy} L${x - 14},${172 - dy} C${x - 16},${176 - dy} ${x - 2},${177 - dy} ${x + 2},${175 - dy} L${x + 2},${166 - dy} C${x + 2},${160 - dy * 0.5} ${x + 8},156 ${x + 14},152Z" fill="${C.pi}" ${L(2.6)}/>`).join('') : `<path d="M96,152 C98,162 96,168 90,172 C88,176 96,177 101,175 L106,166 L104,152Z" fill="${C.pi}" ${L()}/><path d="M58,150 C54,160 46,166 40,168 C38,172 46,174 52,172 L62,166 L66,152Z" fill="${C.pi}" ${L()}/>`}
  </g>
  <g class="cabeza" style="transform-origin:60px 136px">
    <path d="M8,138 C10,132 24,134 40,136 C50,138 60,140 66,138 C70,142 66,148 60,148 C46,150 24,150 12,146 C8,144 7,141 8,138Z" fill="${C.pi}" ${L()}/>
    <path d="M12,142 C30,145 50,145 64,141 L62,147 C48,150 24,150 12,146Z" fill="${C.pa}"/>
    ${abierta ? `<path d="M17,117 C34,124 50,130 63,134 L64,140 C48,142 30,142 13,141Z" fill="#d9707a" ${L(2)}/><path d="M24,132 C36,134 48,136 58,137" stroke="#b04a5a" stroke-width="2" fill="none"/>` : ''}
    <g ${abierta ? 'transform="rotate(24 64 136)"' : ''}>
      <path d="M8,136 C8,128 20,124 34,124 C44,120 58,118 66,122 C72,128 70,136 64,138 C48,140 24,140 12,139 C8,139 8,138 8,136Z" fill="${C.pi}" ${L()}/>
      ${abierta ? `<path d="M10,${C.ancho ? 128 : 130} C${C.ancho ? 6 : 8},132 8,138 12,139Z" fill="${C.pi}"/>` : ''}
      <path d="M14,139 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4" fill="#fbf4dc" stroke="${O}" stroke-width="1.1" stroke-linejoin="round"/>
      <circle cx="14" cy="128" r="2.4" fill="${C.so}" ${L(1.4)}/><path d="M24,130 C32,128 40,128 46,130" stroke="${C.lu}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M46,124 C48,112 62,110 66,120Z" fill="${C.pi}" ${L()}/>
      <g class="ojo"><path d="M50,119 C53,113 61,113 64,118 C60,121 54,122 50,119Z" fill="${C.ojo}"/><ellipse cx="57.5" cy="117.6" rx="1.3" ry="3" fill="#1b120e"/><path d="M49,119 C53,112 61,112 65,118" ${L(2.6)} fill="none"/></g>
      <path d="M48,111 C54,108 62,109 66,114" ${L(2)} fill="none"/>
    </g>
    ${abierta ? `<path d="M14,146 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4" fill="#fbf4dc" stroke="${O}" stroke-width="1.1" stroke-linejoin="round" transform="translate(0 -4)"/>` : ''}
  </g></g>`;
}
const camalote = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-8" cy="4" rx="9" ry="5" fill="#5f9a3a" ${L(1.6)}/><ellipse cx="8" cy="5" rx="8" ry="4.6" fill="#4f8a2e" ${L(1.6)}/><g class="flor">${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse rx="3.4" ry="6.4" transform="rotate(${a}) translate(0 -5)" fill="#b8a0e0" stroke="${O}" stroke-width="1"/>`).join('')}<circle r="3" fill="#6a4ab0"/><circle cx="0" cy="-1" r="1.4" fill="#f2d24a"/></g></g>`;
const hocicon = () => `<g transform="translate(-12 -16) scale(1.1)">${yacareV({ C: { pi: '#6a6c34', so: '#474920', lu: '#8f9250', pa: '#d8cc94', fi: '#5fb0d0', manchas: '#d8b84a', ojo: '#f0c23a' } })}
  ${[56, 68, 80, 92, 104, 116, 128].map((x, i) => `<path d="M${x - 6},${117 - (i % 2)} L${x},${102 - (i % 2) * 3} L${x + 6},${117 - (i % 2)}Z" fill="#474920" stroke="#2a1c15" stroke-width="1.8" stroke-linejoin="round"/>`).join('')}
  <path d="M47,111 L67,118" stroke="#2a1c15" stroke-width="4" stroke-linecap="round"/><path d="M47,111 L67,118" stroke="#8f9250" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M16,146 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4 l3,-4 l3,4" fill="#fbf4dc" stroke="#2a1c15" stroke-width="1.1" stroke-linejoin="round" transform="translate(0 -1)"/>
  <path d="M92,124 l12,7 M98,121 l5,11 M70,138 l9,4" stroke="#c9c08a" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M96,152 C100,164 98,170 92,174 C90,178 100,179 106,177 L110,166 L106,152Z M58,150 C54,162 46,168 38,170 C36,174 46,176 54,174 L64,166 L68,152Z" fill="#6a6c34" stroke="#2a1c15" stroke-width="3" stroke-linejoin="round"/>
  <path d="M38,172 l-4,2 M42,174 l-2,4 M92,176 l-3,3 M98,177 l0,4" stroke="#2a1c15" stroke-width="2" stroke-linecap="round"/></g>`;
const yacarehu = () => yacareV({ alto: true, C: { pi: '#323a36', so: '#1e2422', lu: '#4e5e5a', pa: '#a8a48a', fi: '#3f6a9a', ba: '#161b19', ojo: '#e0b03a' } });

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). En cada familia, tres siluetas distintas y sin escenario. B40 es el Yacarón que ya aprobaste en la muestra.</div>
<section>
<div class="linea"><h3>Flora · coatí del mburucuyá</h3>
${tarjeta('B34', 'Mburucoa', 'Mburucuyá', 'Flora', 'base', mburucoa(), 'Coatí del monte correntino con la flor del mburucuyá en la cabeza, cola anillada que termina en zarcillo y hojas en el lomo. Curioso: se acerca a mirar.')}
${tarjeta('B35', 'Zarcillón', 'Mburucuyá trepador', 'Flora', 'camino 1', mburucoa('trepador'), 'Parado en dos patas, con las manos convertidas en zarcillos que se enroscan y agarran. Trepa por cualquier cosa.')}
${tarjeta('B36', 'Pasionaria', 'Mburucuyá en flor', 'Flora', 'camino 2', mburucoa('flor'), 'Echado a la siesta, con la cola enroscada adelante y florecida de punta a punta; flores también en el lomo y la cabeza. Cura más de lo que pega.')}</div>
<div class="linea"><h3>Fuego · hornero de brasa</h3>
${tarjeta('B37', 'Tatakú', 'Chipacito', 'Fuego', 'base', tataku(), 'Hornero joven cantando con el pico abierto, el pecho de brasa encendida y chispas que le saltan del lomo. De <i>tatakuá</i>, el horno de barro correntino (<i>tata</i> es fuego en guaraní).')}
${tarjeta('B38', 'Tatakuá', 'Chipá de tatakuá', 'Fuego', 'camino 1', tataku('horno'), 'El cuerpo se le volvió barro cocido como el horno: placas agrietadas con fuego en las grietas y una boca de horno en el lomo que humea. Lento pero muy caliente.')}
${tarjeta('B39', 'Brasaguazú', 'Chipá guazú', 'Fuego', 'camino 2', tataku('guazu'), 'En vuelo, grande, con las puntas de las alas y la cola hechas llamaradas, cresta de fuego y placas de brasa en el pecho. <i>Guazú</i> es grande en guaraní.')}</div>
<div class="linea"><h3>Agua · yacaré</h3>
${tarjeta('B40', 'Yacarón', 'Yacarecito', 'Agua', 'base · aprobado', yacare(), 'El de la muestra: yacaré de los esteros con aleta de agua en la cola.')}
${tarjeta('B41', 'Hocicón', 'Yacaré overo', 'Agua', 'camino 1', hocicon(), 'Yacaré overo macizo y más grande, de hocico ancho, con una hilera de escamas como sierra en el lomo, cicatrices de pelea, ceño marcado y los dientes asomando aunque tenga la boca cerrada. Patas gruesas con garras.')}
${tarjeta('B42', 'Yacarehú', 'Yacaré negro', 'Agua', 'camino 2', yacarehu(), 'Casi negro, caminando alto sobre las patas con la cola levantada y escamas como crestas. <i>Hũ</i> es negro en guaraní.')}</div>
</section>`;
const css = `@keyframes flor{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@keyframes brasa{0%,100%{opacity:1}50%{opacity:.5}}@keyframes llamas{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.05)}}@keyframes humo{0%{transform:translate(0,0) scale(.6);opacity:.7}100%{transform:translate(8px,-30px) scale(1.8);opacity:0}}
@keyframes aleta{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}@keyframes gota{0%{transform:translateY(0);opacity:1}100%{transform:translateY(26px);opacity:0}}@keyframes melena{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}
.flor{animation:flor 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}.brasa{animation:brasa 1.2s ease-in-out infinite}.llamas{animation:llamas 1s ease-in-out infinite;transform-box:view-box;transform-origin:106px 100px}.cresta{animation:llamas .8s ease-in-out infinite;transform-box:fill-box;transform-origin:bottom}
.humo circle{animation:humo 3.3s ease-out infinite;transform-box:fill-box;transform-origin:center}.aleta{animation:aleta 1.8s ease-in-out infinite;transform-box:fill-box}.gota{animation:gota 2.2s ease-in infinite;transform-box:fill-box}.chispas circle{animation:brasa 1.2s ease-in-out infinite}@keyframes aleteo{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.9)}}.aleteo{animation:aleteo 1.8s ease-in-out infinite;transform-box:view-box}.melena{animation:melena 3s ease-in-out infinite;transform-box:view-box;transform-origin:96px 92px}`;
writeFileSync(new URL('./catalogo-9.html', import.meta.url), pagina('Catálogo para aprobar · lote 5a', 'Iniciales de Corrientes: coatí del mburucuyá, hornero de brasa y yacaré, con sus dos caminos', cuerpo, css));
console.log('ok');
