// Catálogo para aprobar, lote 11: las 8 insignias de platería, el cinto y la pantalla del cinto abierto.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { insignias } from './mapa-v3.mjs';
const O = '#2a1c15';
const f1 = (n) => n.toFixed(1);
const I = insignias(svg);
const defs = `<linearGradient id="plata" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".45" stop-color="#c9cfd6"/><stop offset=".7" stop-color="#9aa2ab"/><stop offset="1" stop-color="#e4e8ec"/></linearGradient><linearGradient id="oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffeaa0"/><stop offset=".5" stop-color="#e3b23c"/><stop offset="1" stop-color="#a4741c"/></linearGradient><radialGradient id="gema" cx=".35" cy=".3"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".5" stop-color="#b3261e"/><stop offset="1" stop-color="#5a0f0c"/></radialGradient>`;
const gema = (x, y, r = 4.5) => `<circle cx="${x}" cy="${y}" r="${r + 1.6}" fill="url(#oro)" stroke="${O}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gema)"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff" opacity=".8"/>`;
const brillo = (x, y) => `<g transform="translate(${x} ${y})"><path class="destello" d="M0,0 L6,-2 L0,-4 L-2,-10 L-4,-4 L-10,-2 L-4,0 L-2,6Z" fill="#fff"/></g>`;
const sombraI = (y = 116) => `<ellipse cx="60" cy="${y}" rx="46" ry="6" fill="rgba(0,0,0,.18)"/>`;
const cincel = (d) => `<path d="${d}" fill="none" stroke="#7d858e" stroke-width="1.3" stroke-linecap="round"/>`;

// Mate (Misiones): calabaza de plata cincelada, yerba de esmalte verde y bombilla de oro
const mate = svg('0 0 120 130', `<defs>${defs}</defs>${sombraI()}
  <path d="M74,10 L62,62" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="M74,10 L62,62" stroke="url(#oro)" stroke-width="3.6" stroke-linecap="round"/><path d="M70,8 L80,12" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M70,8 L80,12" stroke="url(#oro)" stroke-width="3" stroke-linecap="round"/>
  <path d="M32,48 C24,62 22,84 32,98 C42,112 78,112 88,98 C98,84 96,62 88,48Z" fill="url(#plata)" stroke="${O}" stroke-width="2.6"/>
  <ellipse cx="60" cy="48" rx="28" ry="8" fill="#4f8a2e" stroke="${O}" stroke-width="2.2"/><path d="M38,46 C46,42 56,44 62,42 M50,50 C58,52 70,50 80,48" stroke="#7ab04a" stroke-width="1.6" fill="none"/>
  <path d="M30,52 L90,52" stroke="url(#oro)" stroke-width="4"/>${cincel('M36,70 C46,64 52,76 60,70 C68,64 74,76 84,70 M38,86 C48,80 54,92 60,86 C66,80 72,92 82,86')}
  <path d="M48,110 L72,110 L70,118 L50,118Z" fill="url(#oro)" stroke="${O}" stroke-width="1.6"/>${gema(60, 78, 4)}
  <path d="M36,62 C38,76 40,88 46,98" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>${brillo(90, 60)}`);

// Alfajor cordobés: dos tapas de plata con baño de esmalte blanco y el dulce de leche en oro
const alfajor = svg('0 0 120 130', `<defs>${defs}</defs>${sombraI(110)}
  <ellipse cx="60" cy="88" rx="48" ry="16" fill="url(#plata)" stroke="${O}" stroke-width="2.4"/>
  <path d="M12,80 L12,88 C12,98 108,98 108,88 L108,80" fill="url(#oro)" stroke="${O}" stroke-width="2"/>
  <path d="M12,74 C12,62 108,62 108,74 L108,80 C108,90 12,90 12,80Z" fill="url(#plata)" stroke="${O}" stroke-width="2.4"/>
  <ellipse cx="60" cy="66" rx="48" ry="16" fill="#f4f1ea" stroke="${O}" stroke-width="2.4"/>${[[30, 62], [46, 58], [62, 56], [80, 58], [92, 64], [40, 70], [72, 70]].map(([x, y]) => `<path d="M${x - 4},${y} q4,-3 8,0" stroke="#d8d2c4" stroke-width="1.6" fill="none"/>`).join('')}
  <path d="M20,72 C30,78 40,80 50,80 C46,84 46,88 48,90 M80,80 C86,82 88,86 86,92" stroke="#f4f1ea" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${gema(60, 64, 4.4)}<path d="M24,60 C36,52 52,50 66,50" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>${brillo(96, 52)}`);

// Racimo de uvas (Mendoza): uvas de esmalte morado en marco de plata, hoja y zarcillo de oro
const uva = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="url(#plata)" stroke="${O}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="7" fill="#6a2a6a"/><circle cx="${x - 2.4}" cy="${y - 2.4}" r="2" fill="#d8a8e0"/>`;
const racimo = svg('0 0 120 130', `<defs>${defs}</defs>${sombraI(120)}
  <path d="M60,26 C58,16 64,10 70,12" stroke="${O}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M60,26 C58,16 64,10 70,12" stroke="url(#oro)" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M62,26 C74,14 96,12 104,22 C100,26 102,32 96,36 C96,42 88,46 82,42 C76,46 68,40 70,34 C64,32 62,28 62,26Z" fill="url(#oro)" stroke="${O}" stroke-width="2"/><path d="M66,28 C76,26 88,28 98,26 M82,28 L84,40" stroke="#a4741c" stroke-width="1.2" fill="none"/>
  <path d="M100,36 C108,40 106,50 100,48 C96,46 98,42 102,44" stroke="url(#oro)" stroke-width="2" fill="none"/>
  ${[[42, 38], [60, 36], [78, 40], [34, 54], [52, 54], [70, 54], [86, 56], [42, 70], [60, 70], [78, 72], [50, 86], [68, 86], [60, 102]].map(([x, y]) => uva(x, y)).join('')}
  ${gema(60, 54, 3.6)}${brillo(30, 36)}`);

// Caldén (La Pampa): árbol de copa ancha de esmalte verde, tronco retorcido de plata y raíces de oro
const calden = svg('0 0 120 130', `<defs>${defs}</defs>${sombraI(116)}
  <path d="M54,110 C56,96 50,86 56,74 C58,68 54,60 50,56 M66,110 C64,96 70,86 64,74 C62,68 66,60 72,56" stroke="${O}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M54,110 C56,96 50,86 56,74 C58,68 54,60 50,56 M66,110 C64,96 70,86 64,74 C62,68 66,60 72,56" stroke="url(#plata)" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M60,74 C52,66 40,62 30,62 M60,72 C70,64 82,62 92,62" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M60,74 C52,66 40,62 30,62 M60,72 C70,64 82,62 92,62" stroke="url(#plata)" stroke-width="3.6" fill="none" stroke-linecap="round"/>
  <path d="M10,58 C12,40 34,26 60,24 C86,26 108,40 110,58 C100,64 84,62 76,58 C68,62 52,62 44,58 C36,62 20,64 10,58Z" fill="#4f7a3a" stroke="${O}" stroke-width="2.4"/>${[[24, 50], [40, 40], [60, 34], [80, 40], [96, 50], [50, 50], [72, 50]].map(([x, y]) => `<path d="M${x - 6},${y} q6,-5 12,0" stroke="#7aa05a" stroke-width="1.6" fill="none"/>`).join('')}
  <path d="M10,58 C20,64 36,62 44,58 C52,62 68,62 76,58 C84,62 100,64 110,58" stroke="url(#oro)" stroke-width="3" fill="none"/>
  <path d="M40,112 C46,106 52,108 56,110 M80,112 C74,106 68,108 64,110" stroke="url(#oro)" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${gema(60, 92, 3.8)}<path d="M22,46 C32,34 46,28 58,28" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>${brillo(100, 34)}`);

// Cola de ballena (Chubut): aleta de plata saliendo de una ola de esmalte azul, gotas de oro
const ballena = svg('0 0 120 130', `<defs>${defs}</defs>${sombraI(118)}
  <path d="M56,96 C56,74 50,56 36,44 C30,38 18,34 10,36 C18,30 34,28 46,34 C54,38 58,44 60,50 C62,44 66,38 74,34 C86,28 102,30 110,36 C102,34 90,38 84,44 C70,56 64,74 64,96Z" fill="url(#plata)" stroke="${O}" stroke-width="2.6"/>
  ${cincel('M60,52 L60,92 M44,42 C50,46 54,52 58,60 M76,42 C70,46 66,52 62,60')}
  <path d="M8,102 C20,92 32,92 42,100 C52,108 68,108 78,100 C88,92 100,92 112,102 L112,112 L8,112Z" fill="#2f6a9a" stroke="${O}" stroke-width="2.4"/><path d="M14,104 C24,98 32,98 40,104 M80,104 C88,98 98,98 106,104" stroke="#8ac0e0" stroke-width="2" fill="none"/>
  <path d="M8,102 C20,92 32,92 42,100 C52,108 68,108 78,100 C88,92 100,92 112,102" stroke="url(#oro)" stroke-width="3" fill="none"/>
  ${[[30, 22], [44, 14], [80, 16], [92, 24]].map(([x, y]) => `<path d="M${x},${y} C${x - 3},${y + 5} ${x + 3},${y + 8} ${x + 4},${y + 3} C${x + 4},${y} ${x + 2},${y - 2} ${x},${y}Z" fill="url(#oro)" stroke="${O}" stroke-width="1"/>`).join('')}
  ${gema(60, 104, 3.6)}<path d="M20,38 C30,36 40,38 46,42" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/>${brillo(86, 50)}`);

const lista = [
  ['Salta', 1, 'Empanada', I.empanada, 'Capataz Anselmo', 'Machete', 'abre la maleza'],
  ['Corrientes', 2, 'Acordeón de chamamé', I.acordeon, 'Capataz Rosendo', 'Canoa', 'cruza los canales'],
  ['Jujuy', 3, 'Cerro de Siete Colores', I.cerro, 'Capataza Eulogia', 'Soga', 'sube los riscos'],
  ['Misiones', 0, 'Mate', mate], ['Córdoba', 0, 'Alfajor cordobés', alfajor], ['Mendoza', 0, 'Racimo de uvas', racimo], ['La Pampa', 0, 'Caldén', calden], ['Chubut', 0, 'Cola de ballena', ballena],
];
const sombraDe = (s) => s.replace(/fill="url\(#(plata|oro|gema)\)"/g, 'fill="#2e1d12"').replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="#2e1d12"').replace(/stroke="url\(#(oro|plata)\)"/g, 'stroke="#2e1d12"').replace(/stroke="#(?!2a1c15)[0-9a-fA-F]{6}"/g, 'stroke="#2e1d12"').replace(/fill="#fff"/g, 'fill="#2e1d12"').replace(/stroke="#fff"/g, 'stroke="#2e1d12"').replace(/#2e1d12/g, '#170c05').replace('<svg ', '<svg opacity=".7" ');

// cinto cerrado: 8 monedas, las tres primeras con insignia
const cinto = svg('0 0 760 120', `<defs>${defs}<pattern id="cuero2" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#6b3f22"/><path d="M0,3 L10,4 M2,8 L8,8" stroke="#5a341b" stroke-width=".8"/></pattern></defs>
  <rect x="4" y="34" width="752" height="52" rx="10" fill="url(#cuero2)" stroke="${O}" stroke-width="2.6"/><path d="M10,42 L750,42 M10,78 L750,78" stroke="#c9a46a" stroke-width="1.6" stroke-dasharray="5 4"/>
  ${lista.map(([, , , dib], i) => `<g transform="translate(${52 + i * 94} 60)"><circle r="34" fill="${i < 2 ? 'url(#plata)' : '#7a5232'}" stroke="${i < 2 ? O : '#c9a46a'}" stroke-width="${i < 2 ? 2.4 : 2}" stroke-dasharray="${i < 2 ? '' : '5 4'}"/>${(i < 2 ? dib : sombraDe(dib)).replace('<svg ', '<svg x="-27" y="-31" width="54" height="58" ')}</g>`).join('')}`);

// pantalla del cinto abierto (teléfono vertical)
const ranura = ([prov, est, nom, dib], i) => { const x = 22 + (i % 2) * 164, y = 116 + Math.floor(i / 2) * 118, tiene = est > 0 && i < 2;
  return `<g transform="translate(${x} ${y})"><rect width="152" height="108" rx="12" fill="${tiene ? '#7a4a2a' : '#4a2a16'}" stroke="${i === 1 ? '#f2d23a' : '#2a1608'}" stroke-width="${i === 1 ? 3 : 2}"/><circle cx="40" cy="54" r="30" fill="${tiene ? 'url(#plata)' : '#7a5232'}" stroke="${tiene ? O : '#c9a46a'}" stroke-width="2" stroke-dasharray="${tiene ? '' : '5 4'}"/>${(tiene ? dib : sombraDe(dib)).replace('<svg ', '<svg x="16" y="28" width="48" height="52" ')}
    <text x="78" y="40" font-family="Bree" font-size="15" fill="${tiene ? '#fbf3e2' : '#c9a46a'}">${prov}</text><text x="78" y="60" font-family="Nunito" font-weight="800" font-size="13" fill="#e2b83a">${est ? '★'.repeat(est) : ''}</text><text x="78" y="80" font-family="Nunito" font-size="10.5" fill="${tiene ? '#e8d8b8' : '#a88a62'}">${tiene ? 'obtenida' : est ? 'falta' : 'próximamente'}</text></g>`; };
const pantalla = svg('0 0 360 720', `<defs>${defs}<pattern id="cuero3" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern></defs>
  <rect width="360" height="720" rx="26" fill="url(#cuero3)"/><rect x="10" y="10" width="340" height="700" rx="20" fill="none" stroke="#c9a46a" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="180" y="62" font-family="Bree" font-size="26" text-anchor="middle" fill="#fbf3e2">Cinto de insignias</text><text x="180" y="88" font-family="Nunito" font-size="13" text-anchor="middle" fill="#e8d8b8">2 de 8</text>
  <g transform="translate(22 26)"><circle r="16" fill="#3a2010" stroke="#c9a46a" stroke-width="2"/><path d="M4,-7 L-4,0 L4,7" stroke="#fbf3e2" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  ${lista.map(ranura).join('')}
  <g transform="translate(22 590)"><rect width="316" height="108" rx="14" fill="#f4ead2" stroke="#2a1608" stroke-width="2"/><text x="16" y="30" font-family="Bree" font-size="17" fill="#3a2414">Acordeón de chamamé</text><text x="16" y="52" font-family="Nunito" font-size="12.5" fill="#5a3e28">Le ganaste al Capataz Rosendo en Colonia Pellegrini.</text><text x="16" y="72" font-family="Nunito" font-size="12.5" fill="#5a3e28">Herramienta: <tspan font-weight="800">canoa</tspan>: cruza los canales.</text><text x="16" y="92" font-family="Nunito" font-size="12.5" fill="#5a3e28">Día 14, otoño</text></g>`);

const fichaI = (cod, nom, prov, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ins">${dib}</div><figcaption><b>${nom}</b><span class="tag">${prov}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Platería criolla: plata cincelada, esmalte de color, detalles de oro y una piedra roja. Sin banderas.</div>
<section>
<h3>Las 8 insignias</h3>
<div class="linea4">
${fichaI('I1', 'Empanada', 'Salta ★', I.empanada, 'Empanada de plata con el repulgue trenzado en oro.')}
${fichaI('I2', 'Acordeón de chamamé', 'Corrientes ★★', I.acordeon, 'Fuelle en abanico de esmalte rojo y verde entre dos tapas con botones.')}
${fichaI('I3', 'Cerro de Siete Colores', 'Jujuy ★★★', I.cerro, 'Cerro de plata con siete franjas de esmalte y un sol de oro.')}
${fichaI('I4', 'Mate', 'Misiones', mate, 'Mate de plata cincelado con yerba de esmalte verde y bombilla de oro.')}
${fichaI('I5', 'Alfajor cordobés', 'Córdoba', alfajor, 'Dos tapas con baño blanco y el dulce de leche en oro asomando por el borde.')}
${fichaI('I6', 'Racimo de uvas', 'Mendoza', racimo, 'Uvas de esmalte morado engarzadas en plata, con hoja y zarcillo de oro.')}
${fichaI('I7', 'Caldén', 'La Pampa', calden, 'Caldén de copa ancha de esmalte verde, tronco retorcido de plata y raíces de oro.')}
${fichaI('I8', 'Cola de ballena', 'Chubut', ballena, 'Cola de ballena de plata saliendo de una ola de esmalte azul, con gotas de oro.')}
</div>
<h3>I9. El cinto en el Menú</h3>
<div class="ancho">${cinto}</div>
<p class="nota">Las que todavía no ganaste se ven como una sombra con la forma de la insignia, igual que los bichos que faltan en la libreta.</p>
<h3>I10. Pantalla del cinto abierto</h3>
<div class="tel">${pantalla}</div>
<p class="nota">Se abre desde el Menú. Muestra las 8 provincias con sus estrellas; las ganadas en plata, las que faltan en sombra y las provincias que todavía no están en el juego dicen "próximamente". Al tocar una ganada se ve contra quién, dónde, qué herramienta te dieron y qué día fue.</p>
</section>`;
const css = `.linea4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.lienzo.ins{background:radial-gradient(circle at 50% 60%,#f4eee2,#d9cfbd 75%);display:flex;justify-content:center;align-items:center;aspect-ratio:1}.lienzo.ins svg{width:78%;height:auto}.ancho svg{width:100%;height:auto}.tel{max-width:340px;margin:0 auto}.tel svg{width:100%;height:auto;border-radius:24px;box-shadow:0 8px 24px rgba(0,0,0,.25)}.nota{font-size:14px;color:#5a4636;margin:8px 4px 18px}
@keyframes destello{0%,70%,100%{opacity:0;transform:scale(.4)}80%{opacity:1;transform:scale(1)}}.destello{animation:destello 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@media (max-width:700px){.linea4{grid-template-columns:repeat(2,1fr)}}`;
writeFileSync(new URL('./catalogo-25.html', import.meta.url), pagina('Catálogo para aprobar, lote 11', 'Insignias de platería, el cinto y su pantalla', cuerpo, css));
console.log('ok');
