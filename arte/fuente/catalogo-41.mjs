// Catálogo para aprobar, lote 15e: changas activas, aviso de cumplida, fogón apagado y cobro.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { puestero } from './personas-salta.mjs';
import { pescador } from './personas-corrientes.mjs';
import { pastora } from './personas-jujuy.mjs';
import { O, T, tel, css, moneda, fondo, cab, papel } from './catalogo-29.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { atoq } from './catalogo-17.mjs';
import { cssFogon } from './marca-changa.mjs';
import { S, escena, busto, tipoIco, nocheIco, especieIco, FONDOS } from './catalogo-40.mjs';

const panu = (c1, c2) => `<path d="M-4,0 C-4,-4 4,-4 4,0 C4,3 -4,3 -4,0Z" fill="${c1}" stroke="${O}" stroke-width="1.3"/><path d="M2,1 C8,6 10,14 8,22 L3,19 C5,13 3,7 1,3Z" fill="${c1}" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/><path d="M4,1 C11,4 15,9 16,15 L11,15 C10,10 7,6 3,3Z" fill="${c2}" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/>`;
const AMA = panu('#f2c23a', '#d8a21e');
const ROJO = panu('#d23a2a', '#b82a1e');
const cara = (dib, id, cx, cy, r = 24, s = .82, hy = 38) => `<g transform="translate(${cx} ${cy})"><clipPath id="${id}"><circle r="${r}"/></clipPath><circle r="${r}" fill="#e9d9b8"/><g clip-path="url(#${id})"><g transform="translate(${-60 * s} ${-hy * s}) scale(${s})">${dib}</g></g><circle r="${r}" fill="none" stroke="${O}" stroke-width="2.2"/></g>`;

// ---------- P1: Mochila, pestaña Changas ----------
const tabs = [['Remedios', 78], ['Equipo', 64], ['Herramientas', 100], ['Changas', 76]];
const pestanas = tabs.map(([n, w], i) => { const x = [14, 98, 168, 274][i]; return `<g transform="translate(${x} 70)"><rect width="${w}" height="32" rx="16" fill="${i === 3 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${T(w / 2, 21, 12, n, { w: 800, a: 'middle' })}</g>`; }).join('');
const chip = (cobrar) => cobrar
  ? `<g transform="translate(226 10)"><rect width="88" height="26" rx="13" fill="#2f7d5b" stroke="${O}" stroke-width="1.6"/>${T(44, 18, 11.5, 'A cobrar', { w: 800, a: 'middle', c: '#fff' })}</g>`
  : `<g transform="translate(226 10)"><rect width="88" height="26" rx="13" fill="#2f7fb8" stroke="${O}" stroke-width="1.6"/>${T(44, 18, 11.5, 'En curso', { w: 800, a: 'middle', c: '#fff' })}</g>`;
const fila = (y, quien, id, nombre, lugar, ico, pedido, hecho, total, paga, cobrar) => `<g transform="translate(16 ${y})">
  <rect width="328" height="116" rx="14" fill="${cobrar ? '#e4f0dc' : '#f4ead2'}" stroke="${cobrar ? '#2f7d5b' : O}" stroke-width="${cobrar ? 2.8 : 2.2}"/>
  ${cara(quien, id, 38, 34)}${T(72, 28, 14.5, nombre, { f: 'Bree' })}${T(72, 46, 11.5, lugar, { w: 700, c: '#6a5440' })}
  ${chip(cobrar)}<g transform="translate(258 40) scale(.55)">${moneda(14, 14)}</g>${T(314, 54, 13, paga, { f: 'Bree', a: 'end' })}
  <path d="M14,64 L314,64" stroke="#e2d6bc" stroke-width="1.4"/>
  <g transform="translate(14 70) scale(.62)">${ico}</g>${T(56, 86, 13, pedido, { w: 800 })}
  <rect x="56" y="94" width="196" height="10" rx="5" fill="#e2d6bc" stroke="${O}" stroke-width="1.2"/><rect x="57" y="95" width="${194 * hecho / total}" height="8" rx="4" fill="#2f7d5b"/>${T(314, 104, 12, `${hecho} de ${total}`, { w: 800, a: 'end', c: '#5a4636' })}
</g>`;
const P1 = svg('0 0 360 760', `${fondo}${cab('Mochila')}${pestanas}
  ${T(180, 130, 13, 'Changas activas: 3 de 3', { w: 800, a: 'middle', c: '#f4ead2' })}
  ${fila(144, puestero(), 'f1', 'Don Cirilo', 'Puesto de cabras, Ruta 68', tipoIco('Tierra'), 'Vencé a 3 bichos de tipo Tierra', 3, 3, '150', true)}
  ${fila(272, pescador(), 'f2', 'Don Ramón', 'Orilla del estero, Iberá', `<g>${nocheIco}<g transform="translate(26 26) scale(.46)">${tipoIco('Agua')}</g></g>`, 'Atrapá un bicho de Agua de noche', 0, 1, '180', false)}
  ${fila(400, pastora(), 'f3', 'Doña Juana', 'Puesto de llamas, Quebrada', especieIco(atoq(), 'fa'), 'Vencé a 2 Atoq en la Quebrada', 1, 2, '160', false)}
  ${T(180, 552, 12, 'Tocá una changa para verla en el mapa', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 572, 12, 'o para largarla.', { w: 800, a: 'middle', c: '#f4ead2' })}
  ${T(180, 600, 11.5, 'Para tomar otra, cobrá o largá una.', { a: 'middle', c: '#e9d9b8' })}`);

// ---------- P2: aviso de changa cumplida ----------
const cardon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="16" ry="5" fill="rgba(30,30,10,.22)"/><path d="M-6,0 L-6,-56 C-6,-64 6,-64 6,-56 L6,0Z" fill="#6a8a3a" stroke="${O}" stroke-width="2"/><path d="M-6,-24 L-16,-24 C-20,-24 -20,-28 -20,-30 L-20,-42 C-20,-48 -12,-48 -12,-42 L-12,-32 L-6,-32Z M6,-30 L14,-30 L14,-46 C14,-52 22,-52 22,-46 L22,-26 C22,-22 18,-22 16,-22 L6,-22Z" fill="#6a8a3a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/></g>`;
const tildeC = `<circle cx="24" cy="24" r="21" fill="#2f7d5b" stroke="${O}" stroke-width="2.4"/><path d="M14,25 L21,32 L35,16" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const aviso = `<g transform="translate(14 80)"><rect width="332" height="66" rx="16" fill="#f4ead2" stroke="#2f7d5b" stroke-width="2.8"/><g transform="translate(12 9)">${tildeC}</g>${T(70, 28, 16, 'Changa cumplida', { f: 'Bree', c: '#7a4a2a' })}${T(70, 50, 12.5, 'Andá a cobrarle a Don Cirilo.', { w: 700 })}</g>`;
const P2 = svg('0 0 360 760', `<defs><clipPath id="tp2"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#tp2)">${FONDOS.salta}${cardon(60, 260)}${cardon(300, 560, .9)}${cardon(280, 230, .85)}
  <g transform="translate(162 360) scale(.3)">${jugador()}</g>${hud('Ruta 68, Salta', 9, 'tarde', 'despejado')}${aviso}${equipoMini}${mini.replace('</g></g>', '</g></g>')}</g>`);

// ---------- P3: Don Cirilo con el fogón apagado ----------

// ---------- P4: cobro ----------
const tilde = `<circle cx="24" cy="24" r="21" fill="#2f7d5b" stroke="${O}" stroke-width="2.4"/><path d="M14,25 L21,32 L35,16" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cobro = `<g transform="translate(8 330)">${busto(puestero(), 'cb1', 120, 140, 2.1)}<rect width="120" height="140" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></g>
  <g transform="translate(10 462)"><rect width="340" height="288" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.6"/>
  ${T(18, 30, 15, 'Don Cirilo', { f: 'Bree', c: '#7a4a2a' })}${T(18, 56, 14, 'Ya no me revuelven más el corral.', { w: 800 })}${T(18, 78, 14, 'Acá tiene lo suyo, joven.', { w: 800 })}
  <g transform="translate(12 94)"><rect width="316" height="66" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(8 9)">${tilde}</g>${T(66, 28, 14, 'Vencé a 3 bichos', { w: 800 })}${T(66, 48, 13, 'de tipo Tierra, cumplida', { w: 600, c: '#5a4636' })}</g>
  <g transform="translate(100 172)"><g transform="translate(0 4) scale(1.3)">${moneda(14, 14)}</g>${T(48, 32, 24, '+150', { f: 'Bree', c: '#7a4a2a' })}</g>
  <g transform="translate(12 230)"><rect width="316" height="44" rx="14" fill="#2f7d5b" stroke="${O}" stroke-width="2"/><rect x="4" y="4" width="308" height="8" rx="4" fill="#fff" opacity=".18"/>${T(158, 28, 15, 'Cobrar', { w: 800, a: 'middle', c: '#fff' })}</g></g>`;
const P3 = escena({ ...S[0].e, panuelo: false, card: cobro });
const sinChanga = `<g transform="translate(8 470)">${busto(puestero(), 'sc1', 132, 150, 2.1)}<rect width="132" height="150" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></g><g transform="translate(10 612)"><rect width="340" height="128" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.6"/>${T(18, 28, 15, 'Don Cirilo', { f: 'Bree', c: '#7a4a2a' })}${T(18, 58, 14, 'No tengo changas por hoy, joven.', { w: 800 })}${T(18, 80, 14, 'Vuelva mañana.', { w: 800 })}<path d="M318,110 l8,0 l-4,6Z" fill="#7a4a2a"/></g>`;
const P4 = escena({ ...S[0].e, panuelo: false, card: sinChanga });

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Changas: seguirlas y cobrarlas</h3><div class="cuatro">
${tel('CA1', 'Mochila, pestaña Changas', P1, 'Hasta 3 activas. Arriba las que están para cobrar ("A cobrar" en verde); después las que siguen en curso con su avance. Tocar una la muestra en el mapa o permite largarla.')}
${tel('CA2', 'Aviso de changa cumplida', P2, 'Aparece unos segundos debajo del HUD apenas se cumple la condición (por ejemplo, al terminar el combate). No tapa nada del equipo ni del minimapa.')}
${tel('CA3', 'Cobrar', P3, 'El fogón del changuero está apagado. Al tocarlo, el mismo diálogo R2: una línea de agradecimiento, la changa con tilde y la paga. Un solo botón. La changa cumplida no vence.')}
${tel('CA4', 'Sin changas por hoy', P4, 'Si se le vuelve a hablar, una línea y nada más, hasta la mañana siguiente, cuando se vuelve a prender el fogón. Variantes: Salta "No tengo changas por hoy, joven. Vuelva mañana."; Corrientes "Hoy no hay nada, che. Pasate mañana."; Jujuy "Por hoy nada, hijito. Mañanita capaz."')}
</div></section>`;
const css2 = css + cssFogon + `.cuatro{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media (max-width:760px){.cuatro{grid-template-columns:1fr 1fr}}`;
writeFileSync(new URL('./catalogo-41.html', import.meta.url), pagina('Catálogo para aprobar, lote 15e', 'Changas activas y cobro', cuerpo, css2));
console.log('ok 41');
