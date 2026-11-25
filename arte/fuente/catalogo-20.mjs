// Catálogo para aprobar, lote 8d: Coquena (mito de la Puna jujeña), como criatura.
import { writeFileSync } from 'node:fs';
import { O, L, nuevoId, sombra, clip, ojoAlm, tarjeta, pagina } from './base-arte.mjs';
const f1 = (n) => n.toFixed(1);
const trazo = (d, col, w = 5.6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const peludo = (cx, cy, rx, ry, n = 26, amp = 5) => { let d = ''; for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, r = i % 2 ? 1 : 1 + amp / Math.min(rx, ry); d += (i ? ' L' : 'M') + f1(cx + Math.cos(a) * rx * r) + ',' + f1(cy + Math.sin(a) * ry * r); } return d + 'Z'; };
const copo = (x, y, r = 4) => `<path d="M${x - r},${y} L${x + r},${y} M${x},${y - r} L${x},${y + r} M${x - r * 0.7},${y - r * 0.7} L${x + r * 0.7},${y + r * 0.7} M${x + r * 0.7},${y - r * 0.7} L${x - r * 0.7},${y + r * 0.7}" stroke="#f4fbff" stroke-width="1.6" stroke-linecap="round"/>`;

const C = { la: '#c98a4a', so: '#9a6232', lu: '#e0a868', bl: '#f2ead8', pe: '#3a2a22', ca: '#8a6a52', qu: '#a0442a', qu2: '#d9884e', oj: '#f2b03a', es: '#e6f4fb' };
// cabeza de criatura vicuña: hocico largo, orejas de hoja, copete y barba de lana
const cabezaCoq = (x, y, r = 0, s = 1, { ceno = false, brillo = false, cuernos = false } = {}) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  ${cuernos ? `<path d="M2,-18 C-4,-34 4,-46 16,-48 C10,-40 8,-30 10,-20Z M12,-16 C14,-32 26,-40 36,-38 C28,-32 24,-24 20,-14Z" fill="${C.es}" ${L(1.8)}/>` : ''}
  <path d="M0,-14 C-6,-30 -2,-42 4,-44 C10,-38 10,-26 6,-14Z" fill="${C.la}" ${L(2)}/><path d="M2,-16 C-2,-28 1,-36 4,-38 C7,-32 7,-24 5,-16Z" fill="${C.ca}"/>
  <path d="M8,-12 C10,-28 18,-38 24,-36 C26,-28 20,-18 12,-10Z" fill="${C.so}" ${L(2)}/>
  <path d="M16,-4 C16,-16 6,-22 -4,-19 C-12,-16 -18,-8 -26,-3 C-31,0 -30,7 -24,8 C-12,10 4,10 12,6 C16,3 16,0 16,-4Z" fill="${C.la}" ${L(2.4)}/>
  <path d="M-26,-3 C-31,0 -30,7 -24,8 C-18,8 -14,6 -12,2 C-16,0 -20,-2 -26,-3Z" fill="${C.ca}"/><ellipse cx="-28" cy="1" rx="2" ry="1.6" fill="${C.pe}"/><path d="M-27,5 C-24,7 -20,7 -18,5" ${L(1.3)} fill="none"/>
  <path d="${peludo(4, -16, 10, 5, 10, 3)}" fill="${C.bl}" ${L(1.6)}/>
  <path d="M-10,8 C-12,16 -6,22 0,18 C4,22 10,18 8,10 C2,12 -4,12 -10,8Z" fill="${C.bl}" ${L(1.6)}/>
  ${brillo ? `<circle cx="-6" cy="-6" r="8" fill="${C.oj}" opacity=".3" class="brilla"/>` : ''}${ojoAlm(-6, -6, 4.4, 3, C.oj, 'horizontal')}<path d="M-12,${ceno ? -10 : -11} C-7,-13 -2,-13 1,${ceno ? -9 : -11}" ${L(ceno ? 2.8 : 2)} fill="none"/></g>`;
const pataPezuna = (d, x, y) => `${trazo(d, C.pe, 4.6)}<path d="M${x - 6},${y} L${x - 4},${y - 6} L${x - 1},${y - 6} L${x},${y} Z M${x + 1},${y} L${x + 1},${y - 6} L${x + 4},${y - 6} L${x + 6},${y}Z" fill="${C.pe}" ${L(1.4)}/>`;
const manoC = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})">${trazo('M0,0 L-4,7', C.ca, 2.2)}${trazo('M0,0 L0,8', C.ca, 2.2)}${trazo('M0,0 L4,6', C.ca, 2.2)}<ellipse cx="0" cy="0" rx="4" ry="3.4" fill="${C.ca}" ${L(1.6)}/></g>`;
const queñoa = (x1, y1, x2, y2) => `${trazo(`M${x1},${y1} C${x1 + 4},${(y1 + y2) / 2 - 20} ${x2 - 4},${(y1 + y2) / 2 + 20} ${x2},${y2}`, C.qu, 5)}${[0.25, 0.5, 0.75].map((t) => { const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; return `<path d="M${f1(x - 3)},${f1(y)} l6,-3" stroke="${C.qu2}" stroke-width="2"/>`; }).join('')}`;
const campana = (x, y, s = 1) => `<g class="campana" style="transform-origin:${x}px ${y}px"><g transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 L0,4" ${L(1.4)}/><path d="M-5,14 C-5,6 -3,4 0,4 C3,4 5,6 5,14Z" fill="#c9a84a" ${L(1.6)}/><circle cx="0" cy="15" r="1.6" fill="${O}"/></g></g>`;

function coquena(v = 'base') {
  const k = nuevoId('cq');
  if (v === 'pastor') {
    const cu = 'M78,176 C66,150 70,112 92,98 C110,88 136,94 144,114 C152,136 150,160 138,178Z';
    return `<defs>${clip(k, cu)}</defs>${sombra(110, 186, 62)}
    ${queñoa(160, 30, 154, 184)}${campana(160, 38)}${campana(158, 60, .9)}${campana(156, 82, .8)}
    <path d="${peludo(140, 92, 30, 24, 18, 5)}" fill="${C.lu}" ${L(2.2)}/><path d="${peludo(150, 74, 22, 16, 14, 4)}" fill="${C.bl}" ${L(2)}/><path d="M126,86 C140,92 156,94 166,88 M132,100 C146,104 160,104 168,98" stroke="${C.so}" stroke-width="2" fill="none"/>
    ${pataPezuna('M96,170 L90,186', 90, 188)}${pataPezuna('M126,170 L132,186', 132, 188)}
    <g class="respira" style="transform-origin:110px 176px">
      <path d="${peludo(110, 138, 36, 42, 22, 5)}" fill="${C.la}" ${L(2.4)}/>
      <path d="${peludo(100, 132, 18, 30, 14, 4)}" fill="${C.bl}"/>
      <g class="cria" transform="translate(-14 20)">${[80, 88, 100, 108].map((x) => trazo(`M${x},144 L${x - 1},160`, C.pe, 2)).join('')}
        <path d="M74,138 C74,126 92,122 108,126 C118,130 118,142 108,146 C94,150 76,148 74,138Z" fill="${C.lu}" ${L(2)}/><path d="M80,144 C92,148 104,148 112,142" stroke="${C.bl}" stroke-width="4" fill="none"/>
        ${trazo('M80,132 C76,124 72,116 72,108', C.lu, 7)}
        <g transform="translate(70 104)"><path d="M-2,-6 L-4,-16 L1,-8Z M3,-6 L4,-16 L6,-7Z" fill="${C.lu}" ${L(1.4)}/><path d="M8,-2 C8,-8 0,-10 -6,-7 C-10,-5 -14,-2 -16,1 C-17,4 -14,6 -10,5 C-2,5 6,4 8,-2Z" fill="${C.lu}" ${L(1.8)}/><circle cx="-15" cy="2" r="1.2" fill="${C.pe}"/>${ojoAlm(-4, -3, 2.6, 1.8, '#3a2216')}</g></g>
      ${trazo('M84,112 C66,128 64,152 78,168', C.la, 9)}${manoC(82, 168, -60)}${trazo('M136,112 C150,104 156,94 158,86', C.la, 9)}${manoC(158, 84, 160)}
    </g>
    <g class="cabeza" style="transform-origin:100px 96px">${cabezaCoq(98, 84, -6, 1.15)}</g>`;
  }
  if (v === 'cumbres') {
    return `${sombra(104, 188, 56)}
    <g class="granizo">${[[30, 40], [176, 34], [22, 110], [186, 104], [50, 160], [160, 150], [104, 14]].map(([x, y]) => copo(x, y, 4.4)).join('')}</g>
    <g class="viento" fill="none" stroke="#c9d6dc" stroke-width="2.4" stroke-linecap="round"><path d="M16,80 C34,70 50,72 62,80"/><path d="M146,70 C160,60 176,62 190,70"/></g>
    ${pataPezuna('M90,160 L80,174 L84,186', 84, 188)}${pataPezuna('M120,160 L132,174 L128,186', 128, 188)}
    <g class="respira" style="transform-origin:104px 170px">
      <path d="${peludo(104, 128, 34, 40, 22, 6)}" fill="${C.so}" ${L(2.4)}/>
      <path d="${peludo(104, 92, 40, 16, 20, 5)}" fill="${C.es}" ${L(2)}/>${[[74, 100], [90, 106], [106, 108], [122, 106], [138, 100]].map(([x, y]) => `<path d="M${x - 3},${y} L${x},${y + 12} L${x + 3},${y}Z" fill="${C.es}" ${L(1.2)}/>`).join('')}
      <path d="${peludo(104, 136, 16, 24, 12, 4)}" fill="${C.bl}"/>
      ${trazo('M76,104 C58,90 46,70 42,48', C.so, 10)}${manoC(42, 44, 170)}${trazo('M132,104 C150,90 162,70 166,48', C.so, 10)}${manoC(166, 44, 190)}
      <g class="brilla"><circle cx="42" cy="38" r="10" fill="${C.es}" opacity=".5"/><circle cx="166" cy="38" r="10" fill="${C.es}" opacity=".5"/></g>
    </g>
    <g class="cabeza" style="transform-origin:104px 80px">${cabezaCoq(108, 70, -2, 1.3, { ceno: true, brillo: true, cuernos: true })}</g>`;
  }
  const cu = 'M84,178 C72,156 74,124 92,110 C108,100 128,104 136,120 C144,138 142,160 132,178Z';
  return `<defs>${clip(k, cu)}</defs>${sombra(108, 186, 48)}
  ${queñoa(64, 64, 70, 184)}${campana(66, 70)}
  ${pataPezuna('M96,168 L90,176 L94,186', 94, 188)}${pataPezuna('M120,168 L128,176 L124,186', 124, 188)}
  <g class="respira" style="transform-origin:108px 176px">
    <path d="${peludo(110, 144, 28, 32, 20, 5)}" fill="${C.la}" ${L(2.4)}/>
    <path d="${peludo(104, 140, 13, 22, 12, 3.6)}" fill="${C.bl}"/>
    ${trazo('M90,128 C80,124 74,114 70,104', C.la, 8)}${manoC(68, 100, 150)}
    ${trazo('M130,128 C140,138 142,150 136,158', C.so, 8)}${manoC(135, 161, -10)}
    <path d="M140,150 C152,146 156,156 150,162 C146,166 140,162 140,150Z" fill="${C.bl}" ${L(1.6)}/>
  </g>
  <g class="cabeza" style="transform-origin:104px 108px">${cabezaCoq(104, 96, -4, 1.15)}</g>`;
}

const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Como el Yasí, el Coquena es una criatura y no una persona; conserva su nombre de leyenda.</div>
<section>
<div class="linea"><h3>Mito · Coquena</h3>
${tarjeta('B103', 'Coquena', 'Coquena', 'Mito', 'base', coquena(), 'Espíritu de la Puna con cara de vicuña: orejas de hoja, ojos dorados, copete y barba de lana blanca, patas de pezuña. Lleva un bastón de queñoa con una campanita para arrear.')}
${tarjeta('B104', 'Coquena pastor', 'Coquena pastor', 'Mito', 'camino 1', coquena('pastor'), 'Más grande, carga un fardo de lana a la espalda y una cría de vicuña en brazos; el bastón tiene tres campanitas. Protege a la tropilla.')}
${tarjeta('B105', 'Coquena de las cumbres', 'Coquena de las cumbres', 'Mito', 'camino 2', coquena('cumbres'), 'Enorme y oscuro, con cuernos de hielo, gorguera de escarcha y ojos que brillan; levanta los brazos y llama al viento y al granizo contra el que caza de más.')}</div>
</section>`;
const css = `@keyframes campana{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg)}}@keyframes brilla{0%,100%{opacity:.25}50%{opacity:.7}}@keyframes granizo{0%{transform:translateY(-4px)}100%{transform:translateY(6px)}}
.campana{animation:campana 1.2s ease-in-out infinite;transform-box:view-box}.brilla{animation:brilla 2s ease-in-out infinite}.granizo{animation:granizo 1s linear infinite alternate;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-20.html', import.meta.url), pagina('Catálogo para aprobar · lote 8d', 'Mito de Jujuy: Coquena, con sus dos caminos', cuerpo, css));
console.log('ok');
