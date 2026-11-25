// Catálogo para aprobar, lote 15d: changueros en el mapa, dos por provincia.
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { jugador, maestro } from './adultos.mjs';
import { puestero, baqueano } from './personas-salta.mjs';
import { pescador, guardaparque } from './personas-corrientes.mjs';
import { pastora, bagualera } from './personas-jujuy.mjs';
import { puestoPuna, ranchoMaestro } from './edificios2.mjs';
import { ranchoOrilla, guardaparques } from './edificios-corrientes.mjs';
import { puestoPastora, ranchoYungas } from './edificios-jujuy.mjs';
import { hud } from './catalogo-35.mjs';
import { O, T, tel, css, moneda } from './catalogo-29.mjs';
import { IC as ICM } from './catalogo-30.mjs';
import { N as N32 } from './catalogo-32.mjs';
import { P as PR } from './catalogo-31.mjs';
import { FINAL } from './catalogo-38.mjs';
import { atoq } from './catalogo-17.mjs';
import { fogon, cssFogon } from './marca-changa.mjs';

// ---------- piezas del mapa ----------
const mata = (x, y, c) => `<path d="M${x},${y} l3,-6 l3,6" stroke="${c}" stroke-width="1.4" fill="none"/>`;
const matas = (c, n = 34) => Array.from({ length: n }, (_, i) => mata((i * 83) % 350 + 5, (i * 137) % 400 + 70, c)).join('');
const cardon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="16" ry="5" fill="rgba(30,30,10,.22)"/><path d="M-6,0 L-6,-56 C-6,-64 6,-64 6,-56 L6,0Z" fill="#6a8a3a" stroke="${O}" stroke-width="2"/><path d="M-6,-24 L-16,-24 C-20,-24 -20,-28 -20,-30 L-20,-42 C-20,-48 -12,-48 -12,-42 L-12,-32 L-6,-32Z M6,-30 L14,-30 L14,-46 C14,-52 22,-52 22,-46 L22,-26 C22,-22 18,-22 16,-22 L6,-22Z" fill="#6a8a3a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M-2,-50 L-2,-6 M2,-50 L2,-6" stroke="#4f6e2a" stroke-width="1.2"/></g>`;
const palma = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="14" ry="4" fill="rgba(30,40,10,.22)"/><path d="M-2,0 C-3,-30 0,-50 4,-70" stroke="${O}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-2,0 C-3,-30 0,-50 4,-70" stroke="#8a6a46" stroke-width="4.4" fill="none" stroke-linecap="round"/>${[-150, -115, -75, -40, -10].map((a) => { const r = a * Math.PI / 180, ex = 4 + Math.cos(r) * 30, ey = -70 + Math.sin(r) * 30 + 16; return `<path d="M4,-70 Q${4 + Math.cos(r) * 18},${-70 + Math.sin(r) * 22} ${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M4,-70 Q${4 + Math.cos(r) * 18},${-70 + Math.sin(r) * 22} ${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#4f8a2e" stroke-width="3.6" fill="none" stroke-linecap="round"/>`; }).join('')}</g>`;
const arbol = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="18" ry="5" fill="rgba(30,40,10,.22)"/><path d="M-4,0 L-3,-30 L3,-30 L4,0Z" fill="#7a5a3a" stroke="${O}" stroke-width="1.8"/>${[[-12, -40, 14], [12, -42, 14], [0, -56, 16], [-4, -38, 12]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3f7a34" stroke="${O}" stroke-width="1.8"/>`).join('')}<path d="M-6,-58 C-2,-62 4,-62 8,-58" stroke="#6aa04a" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
const piedras = (x, y, n, c) => Array.from({ length: n }, (_, i) => `<ellipse cx="${x + i * 14}" cy="${y + (i % 2) * 3}" rx="8" ry="6" fill="${i % 3 ? c : '#948a78'}" stroke="${O}" stroke-width="1.5"/>`).join('');
const camino = (c, borde) => `<path d="M-10,470 C60,440 120,380 190,372 C250,366 300,340 380,330" stroke="${c}" stroke-width="34" fill="none"/><path d="M-10,470 C60,440 120,380 190,372 C250,366 300,340 380,330" stroke="${borde}" stroke-width="2" stroke-dasharray="8 10" fill="none"/>`;

// alambrado con un poste del que cuelga el pañuelo rojo
export const alambrado = (x0, x1, y, conPanuelo) => {
  const [c1, c2] = conPanuelo === 'amarillo' ? ['#f2c23a', '#d8a21e'] : ['#d23a2a', '#b82a1e'];
  const postes = []; for (let x = x0; x <= x1; x += 30) postes.push(x);
  const hilos = [8, 16, 24].map((d) => `<path d="M${x0},${y - d} L${x1},${y - d}" stroke="#6a6a66" stroke-width="1.2"/>`).join('');
  const p = postes.map((x) => `<rect x="${x - 3}" y="${y - 30}" width="6" height="32" rx="1.5" fill="#7a5a3a" stroke="${O}" stroke-width="1.5"/>`).join('');
  const px = postes[postes.length - 1];
  const pan = conPanuelo ? `<g transform="translate(${px} ${y - 26})"><path d="M-4,0 C-4,-4 4,-4 4,0 C4,3 -4,3 -4,0Z" fill="${c1}" stroke="${O}" stroke-width="1.3"/><path d="M2,1 C8,6 10,14 8,22 L3,19 C5,13 3,7 1,3Z" fill="${c1}" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/><path d="M4,1 C11,4 15,9 16,15 L11,15 C10,10 7,6 3,3Z" fill="${c2}" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/><circle cx="6" cy="10" r="1" fill="#f4ead2"/></g>` : '';
  return `${hilos}${p}${pan}`;
};

const globo = (x, y, w, txt, haciaX) => `<g><path d="M${x + 14},${y} L${x + w - 14},${y} Q${x + w},${y} ${x + w},${y + 14} L${x + w},${y + 22} Q${x + w},${y + 36} ${x + w - 14},${y + 36} L${haciaX + 8},${y + 36} L${haciaX},${y + 48} L${haciaX - 4},${y + 36} L${x + 14},${y + 36} Q${x},${y + 36} ${x},${y + 22} L${x},${y + 14} Q${x},${y} ${x + 14},${y}Z" fill="#fffaf0" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>${T(x + w / 2, y + 23, 12.5, txt, { w: 800, a: 'middle' })}</g>`;

// ---------- íconos de pedido ----------
export const tipoIco = (k) => `<g><circle cx="24" cy="24" r="21" fill="${COLOR_TIPO[k]}" stroke="${O}" stroke-width="3"/><circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.6"/>${FINAL[k]}</g>`;
export const domadorIco = `<g><circle cx="24" cy="24" r="21" fill="#e8dcc0" stroke="${O}" stroke-width="2.4"/><clipPath id="dmc"><circle cx="24" cy="24" r="19"/></clipPath><g clip-path="url(#dmc)"><g transform="translate(6 6) scale(.3)" filter="url(#silD)">${maestro()}</g></g></g>`;
export const nocheIco = `<g><circle cx="24" cy="24" r="21" fill="#23365a" stroke="${O}" stroke-width="2.4"/><path d="M27,10 C19,11 15,18 18,25 C21,31 28,32 33,28 C25,28 21,19 27,10Z" fill="#f4ead2" stroke="${O}" stroke-width="1.4"/><circle cx="33" cy="15" r="1.6" fill="#f4ead2"/><circle cx="14" cy="14" r="1.2" fill="#f4ead2"/></g>`;
const pedidoIco = { tipo: tipoIco, domador: () => domadorIco, noche: () => nocheIco, mate: () => `<g transform="translate(4 2)">${ICM.mate}</g>` };

// ---------- diálogo R2 con la changa ----------
let idC = 0;
export const busto = (dib, id, w, h, s = 2.1, cx = 60, cy = 38) => `<defs><clipPath id="${id}"><rect width="${w}" height="${h}" rx="10"/></clipPath></defs><g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="#e9d9b8"/><g transform="translate(${w / 2 - cx * s} ${h * .52 - cy * s}) scale(${s})">${dib}</g></g>`;
const tarjeta = (quien, nombre, dice1, dice2, ico, l1, l2, paga, extra, cy = 38) => {
  idC += 1; const k = `cr${idC}`;
  const premio = extra ? `<g transform="translate(150 176)"><rect width="164" height="40" rx="10" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(6 2) scale(.9)">${extra[0]}</g>${T(48, 25, 12.5, extra[1], { w: 800 })}</g>` : '';
  return `<g transform="translate(8 330)">${busto(quien, k, 120, 140, 2.1, 60, cy)}<rect width="120" height="140" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></g>
  <g transform="translate(10 462)"><rect width="340" height="288" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.6"/>
  ${T(18, 30, 15, nombre, { f: 'Bree', c: '#7a4a2a' })}${T(18, 56, 14, dice1, { w: 800 })}${T(18, 78, 14, dice2, { w: 800 })}
  <g transform="translate(12 94)"><rect width="316" height="66" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(8 9)">${ico}</g>${T(66, 28, 14, l1, { w: 800 })}${T(66, 48, 13, l2, { w: 600, c: '#5a4636' })}</g>
  ${T(16, 202, 13, 'Paga', { w: 800, c: '#6a5440' })}<g transform="translate(66 182)"><g transform="translate(0 2)">${moneda(14, 14)}</g>${T(34, 25, 17, paga, { f: 'Bree' })}</g>${premio}
  <g transform="translate(12 230)"><rect width="150" height="44" rx="14" fill="#fffaf0" stroke="${O}" stroke-width="2"/>${T(75, 28, 14, 'Ahora no', { w: 800, a: 'middle', c: '#6a5440' })}</g>
  <g transform="translate(178 230)"><rect width="150" height="44" rx="14" fill="#2f7d5b" stroke="${O}" stroke-width="2"/><rect x="4" y="4" width="142" height="8" rx="4" fill="#fff" opacity=".18"/>${T(75, 28, 14, 'Acepto', { w: 800, a: 'middle', c: '#fff' })}</g></g>`;
};
export const especieIco = (dib, id) => `<g><circle cx="24" cy="24" r="21" fill="#e8dcc0" stroke="${O}" stroke-width="2.4"/><clipPath id="${id}"><circle cx="24" cy="24" r="19"/></clipPath><g clip-path="url(#${id})"><g transform="translate(-2 -2) scale(.26)">${dib}</g></g></g>`;

// ---------- escena ----------
export const escena = ({ panuelo = true, fondo, deco, casa, casaS = .72, casaX = 166, quien, frase, lugarHud, mom = 'tarde', clima = 'despejado', card }) => svg('0 0 360 760', `<defs><clipPath id="t${idC}"><rect width="360" height="760" rx="26"/></clipPath><filter id="silD"><feFlood flood-color="#5a4434"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs><g clip-path="url(#t${idC})">
  ${fondo}${deco}
  <g transform="translate(${casaX} 112) scale(${casaS})">${casa}</g>
  ${fogon(104, 292, 1.3, panuelo)}
  <g transform="translate(140 222) scale(.32)">${quien}</g>
  <g transform="translate(196 300) scale(.3)">${jugador()}</g>
  ${hud(lugarHud, 9, mom, clima)}
  ${card}</g>`);

export const FONDOS = {
  salta: `<rect width="360" height="760" fill="#c9b46a"/>${matas('#9a8a4a')}${camino('#d7b685', '#c9a46a')}`,
  corrientes: `<rect width="360" height="760" fill="#8fb85a"/>${matas('#5f8a3a')}${camino('#c9a46a', '#b08a52')}`,
  jujuy: `<rect width="360" height="760" fill="#c99a6a"/>${matas('#9a6a44')}${camino('#e0c08a', '#c49a62')}`,
};
const estero = `<path d="M-10,330 C40,320 70,350 60,390 C50,430 10,440 -10,436Z" fill="#5aa0c8" stroke="${O}" stroke-width="2"/><path d="M6,362 C18,360 30,364 40,362 M4,392 C16,390 26,394 36,392" stroke="#cfe6f0" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[[58, 350], [64, 380], [52, 410]].map(([x, y]) => `<path d="M${x},${y} l-2,-14 M${x + 4},${y} l1,-16 M${x + 8},${y} l3,-12" stroke="#4f7a2e" stroke-width="2" stroke-linecap="round"/>`).join('')}`;
const pirca = (x, y, n) => piedras(x, y, n, '#b89a7a');

export const S = [
  { prov: 'Salta', cod: 'CH1', nom: 'Don Cirilo, puestero', txt: 'Puesto de cabras al costado de la ruta. Pide vencer bichos de un tipo.',
    e: { fondo: FONDOS.salta, deco: `${cardon(40, 150, .9)}${cardon(320, 430, .8)}${piedras(230, 420, 5, '#a59a88')}`, casa: puestoPuna(), quien: puestero(), frase: '¿Me da una mano, joven?', lugarHud: 'Puesto, Ruta 68',
      card: tarjeta(puestero(), 'Don Cirilo', 'Los bichos de Tierra me revuelven', 'el corral. ¿Me da una mano, joven?', tipoIco('Tierra'), 'Vencé a 3 bichos', 'de tipo Tierra', '150') } },
  { prov: 'Salta', cod: 'CH2', nom: 'Don Fermín, baqueano', txt: 'Rancho junto al río, lejos de Cerrillos. Pide ganarle a la coplera Eusebia, domadora del río.',
    e: { fondo: FONDOS.salta, deco: `${cardon(36, 140, .85)}${cardon(330, 440, .75)}<path d="M250,480 C262,440 300,420 380,410" stroke="${O}" stroke-width="30" fill="none"/><path d="M250,480 C262,440 300,420 380,410" stroke="#5aa0c8" stroke-width="26" fill="none"/><path d="M272,446 C286,436 300,430 316,426" stroke="#cfe6f0" stroke-width="1.8" fill="none" stroke-linecap="round"/>`, casa: ranchoMaestro(), quien: baqueano(), frase: '¿Me da una mano, joven?', lugarHud: 'Río Arenales', mom: 'manana',
      card: tarjeta(baqueano(), 'Don Fermín', 'Esa Eusebia se cree la dueña del río.', 'Bajale los humos, joven.', domadorIco, 'Ganale a Eusebia,', 'la coplera del río', '200', [N32.pista, 'y una pista'], 93) } },
  { prov: 'Corrientes', cod: 'CH3', nom: 'Don Ramón, pescador', txt: 'Rancho de palos en la orilla del estero. Pide atrapar un bicho de Agua de noche.',
    e: { fondo: FONDOS.corrientes, deco: `${estero}${palma(334, 440, .8)}${palma(26, 160, .8)}`, casa: ranchoOrilla(), quien: pescador(), frase: 'Che, ¿me ayudás?', lugarHud: 'Orilla del estero',
      card: tarjeta(pescador(), 'Don Ramón', 'De noche el estero se pone bravo,', 'che. ¿Te animás?', `<g>${nocheIco}<g transform="translate(26 26) scale(.46)">${tipoIco('Agua')}</g></g>`, 'Atrapá un bicho de Agua', 'de noche', '180') } },
  { prov: 'Corrientes', cod: 'CH4', nom: 'Sol, guardaparque', txt: 'Seccional en el monte. Pide atrapar peleando solo con bichos de tipo Común.',
    e: { fondo: FONDOS.corrientes, deco: `${palma(30, 170, .85)}${palma(322, 450, .75)}`, casa: guardaparques(), quien: guardaparque(), frase: 'Che, ¿me ayudás?', lugarHud: 'Seccional Iberá', mom: 'manana',
      card: tarjeta(guardaparque(), 'Sol', 'Dicen que con bichos comunes no se', 'llega a nada. Demostrame que no.', tipoIco('Común'), 'Atrapá un bicho peleando', 'solo con bichos de tipo Común', '200', [N32.pista, 'y una pista']) } },
  { prov: 'Jujuy', cod: 'CH5', nom: 'Doña Juana, pastora', txt: 'Puesto de llamas en la quebrada. Pide vencer a una especie que le ronda las llamas.',
    e: { fondo: FONDOS.jujuy, deco: `${cardon(40, 150, .9)}${cardon(326, 440, .8)}${pirca(220, 422, 6)}`, casa: puestoPastora(), quien: pastora(), frase: '¿Me ayudaría, hijito?', lugarHud: 'Quebrada, Jujuy',
      card: tarjeta(pastora(), 'Doña Juana', 'Los atoq me andan rondando las', 'llamas. ¿Me ayudaría, hijito?', especieIco(atoq(), 'ea1'), 'Vencé a 2 Atoq', 'en la Quebrada', '160') } },
  { prov: 'Jujuy', cod: 'CH6', nom: 'Doña Delfina, de las Yungas', txt: 'Rancho en las Yungas. Changa grande: tres domadores, paga con una pilcha exclusiva.',
    e: { fondo: FONDOS.jujuy.replace('#c99a6a', '#8fae5a').replace('#9a6a44', '#5f7a3a'), deco: `${arbol(36, 160, .9)}${arbol(330, 450, .9)}${arbol(290, 470, .7)}${piedras(200, 424, 5, '#8a8a78')}`, casa: ranchoYungas(), quien: bagualera(), frase: '¿Me ayudaría, hijito?', lugarHud: 'Yungas, Jujuy',
      card: tarjeta(bagualera(), 'Doña Delfina', 'Los domadores de acá no respetan', 'a nadie. Enséñeles, hijito.', domadorIco, 'Ganale a 3 domadores', 'de las Yungas', '250', [`<g transform="translate(2 2) scale(.9)">${PR.poncho}</g>`, 'y una pilcha']) } },
];

const css2 = css + cssFogon + `.tres{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:10px}h4{font-family:Bree,serif;margin:12px 0 6px}`;
const filas = ['Salta', 'Corrientes', 'Jujuy'].map((p) => `<h4>${p}</h4><div class="tres">${S.filter((s) => s.prov === p).map((s) => tel(s.cod, s.nom, escena(s.e), s.txt)).join('')}</div>`).join('');
const cuerpo = `<div class="como">Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Changueros: dos por provincia, lejos del pueblo</h3><p class="nota">Cada changuero está parado al lado de su casa; la casa es decorado, no se entra. Si el fogón está prendido (llama y humo), tiene changa. Al tocarlo sale el diálogo aprobado (R2) con la changa adentro. Una changa por vez; cuando la cumplís, el fogón queda apagado hasta la mañana siguiente.</p>${filas}</section>`;
if (process.argv[1].endsWith('catalogo-40.mjs')) writeFileSync(new URL('./catalogo-40.html', import.meta.url), pagina('Catálogo para aprobar, lote 15d', 'Changueros', cuerpo, css2));
console.log('ok 40');
