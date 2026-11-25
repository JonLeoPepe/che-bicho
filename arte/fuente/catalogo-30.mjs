// Catálogo para aprobar, lote 14c: ficha de mi bicho, árbol de cartas y mochila.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
import { O, T, fondo, cab, papel, chipTipo, barra, pts, tec, sec, tel, css } from './catalogo-29.mjs';

const rolChip = (x, y, r) => `<rect x="${x}" y="${y}" width="${r.length * 6.6 + 14}" height="17" rx="8.5" fill="#fffaf0" stroke="${O}" stroke-width="1.2"/>${T(x + 7, y + 12.5, 10, r, { w: 800 })}`;
const tag = (x, y, t) => T(x, y, 10, t, { w: 800, c: '#2f7d3b' });
export const boton = (x, y, w, txt, c = '#c8562a', h = 44) => `<g transform="translate(${x} ${y})"><rect y="4" width="${w}" height="${h}" rx="14" fill="${O}"/><rect width="${w}" height="${h}" rx="14" fill="${c}" stroke="${O}" stroke-width="2.2"/>${T(w / 2, h / 2 + 5, 14, txt, { f: 'Bree', a: 'middle', c: '#fbf3e2' })}</g>`;

// íconos de prendas (caja 0 a 40)
export const prenda = {
  poncho: `<path d="M8,6 L32,6 L38,34 L2,34Z" fill="#a8322a" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/><path d="M5,22 L35,22 M4,27 L36,27" stroke="#f1ebdd" stroke-width="2"/><path d="M15,6 C16,11 24,11 25,6" fill="#5e351c" stroke="${O}" stroke-width="1.4"/>`,
  rastra: `<rect x="1" y="14" width="38" height="12" rx="3" fill="#5e351c" stroke="${O}" stroke-width="1.6"/><circle cx="20" cy="20" r="8" fill="#d8dde2" stroke="${O}" stroke-width="1.6"/><circle cx="20" cy="20" r="3.4" fill="#9aa4ac"/>${[7, 33].map((x) => `<circle cx="${x}" cy="20" r="3.6" fill="#d8dde2" stroke="${O}" stroke-width="1.2"/>`).join('')}`,
  candado: `<path d="M13,18 L13,12 C13,4 27,4 27,12 L27,18" stroke="#9a8a74" stroke-width="3.4" fill="none"/><rect x="9" y="17" width="22" height="18" rx="4" fill="#c9b48a" stroke="#9a8a74" stroke-width="1.6"/><circle cx="20" cy="25" r="2.6" fill="#9a8a74"/>`,
};
const ranura = (x, y, nv, k, nom, ef) => `<g transform="translate(${x} ${y})"><rect width="92" height="70" rx="10" fill="${k === 'candado' ? '#e4d8bf' : '#fffaf0'}" stroke="${k === 'candado' ? '#c9b48a' : O}" stroke-width="1.6" ${k === 'candado' ? 'stroke-dasharray="4 3"' : ''}/>${T(8, 14, 9.5, `Nv ${nv}`, { w: 800, c: '#8a6a4a' })}<g transform="translate(26 6)">${prenda[k]}</g>${T(46, 54, 11.5, nom, { w: 800, a: 'middle', c: k === 'candado' ? '#9a8a74' : '#3a2414' })}${T(46, 66, 9.5, ef, { a: 'middle', c: '#5a3e28' })}</g>`;

// ---------- T10 Ficha de mi bicho ----------
const mio = svg('0 0 360 760', `${fondo}${cab('Mi bicho')}${papel(16, 70, 328, 672)}
  <ellipse cx="82" cy="186" rx="52" ry="7" fill="#d9ccb4"/><g transform="translate(20 66) scale(.62)">${puma({ fin: true })}</g>
  ${T(160, 102, 20, 'Apu Puma', { f: 'Bree' })}${chipTipo(160, 110, 'Tierra')}${rolChip(222, 110, 'Golpeador')}${T(160, 145, 11, 'Camino 1 de Allpuma', { c: '#5a3e28' })}
  ${T(160, 170, 12, 'Nv 7', { w: 800 })}<rect x="196" y="162" width="130" height="9" rx="4.5" fill="#d9ccb4"/><rect x="196" y="162" width="78" height="9" rx="4.5" fill="#2f6a8a"/>${T(326, 184, 9.5, '120 de exp para Nv 8', { w: 800, a: 'end', c: '#8a6a4a' })}
  ${T(160, 204, 12, 'Vida', { w: 800 })}<rect x="196" y="196" width="130" height="9" rx="4.5" fill="#d9ccb4"/><rect x="196" y="196" width="${130 * 62 / 80}" height="9" rx="4.5" fill="#3f9a4a"/>${T(326, 218, 9.5, '62 de 80', { w: 800, a: 'end', c: '#8a6a4a' })}
  <path d="M34,230 L326,230" stroke="#d9ccb4" stroke-width="1.4"/>
  ${sec(252, 'Fuerzas')}${barra(272, 'Vida', 110)}${barra(290, 'Ataque', 109)}${barra(308, 'Defensa', 100)}${tag(262, 308, '+10 %')}
  ${pts(332, 'Velocidad', 4)}${pts(350, 'Crítico', 3)}${pts(368, 'Amague', 2)}${tag(184, 332, '+1 Baqueano')}
  ${sec(398, 'Pasivas')}${T(34, 418, 11.5, 'Fija: Coraje, +20 % de daño con poca vida', { c: '#5a3e28' })}${T(34, 436, 11.5, 'Elegida en Nv 3: Baqueano, +1 de Velocidad', { c: '#5a3e28' })}
  ${sec(466, 'Técnicas')}${T(122, 466, 9.5, 'tipo', { w: 800, c: '#8a7a6a' })}${T(180, 466, 9.5, 'aguante', { w: 800, c: '#8a7a6a' })}${T(226, 466, 9.5, 'marca', { w: 800, c: '#8a7a6a' })}${T(326, 466, 9.5, 'daño', { w: 800, a: 'end', c: '#8a7a6a' })}
  ${tec(488, 'Zarpazo', 'Común', 0, 40)}${tec(508, 'Revolcadero', 'Tierra', 1, 60, 'embarrado')}${tec(528, 'Derrumbe', 'Tierra', 3, 100)}${tec(548, 'Pedrada', 'Roca', 2, 60)}
  ${sec(580, 'Prenda')}<g transform="translate(34 592)"><rect width="292" height="70" rx="12" fill="#fffaf0" stroke="${O}" stroke-width="1.6"/><g transform="translate(12 13) scale(1.1)">${prenda.poncho}</g>${T(70, 30, 15, 'Poncho', { f: 'Bree' })}${T(70, 50, 11.5, '+10 % de Defensa', { c: '#5a3e28' })}<g transform="translate(206 21)"><rect width="74" height="28" rx="14" fill="#7a4a2a" stroke="${O}" stroke-width="1.4"/>${T(37, 19, 11.5, 'Cambiar', { w: 800, a: 'middle', c: '#fbf3e2' })}</g></g>
  ${boton(34, 678, 178, 'Árbol de cartas')}<circle cx="206" cy="680" r="10" fill="#f2b03a" stroke="${O}" stroke-width="1.6"/>${T(206, 684.5, 11, '1', { w: 800, a: 'middle' })}${boton(222, 678, 104, 'Apodo', '#7a4a2a')}`);

// ---------- T11 Árbol de cartas ----------
const K = { Técnica: '#2f6a8a', Mejora: '#c8562a', Estadística: '#2f7d5b', Pasiva: '#7a5aa8', Camino: '#7a4a2a' };
const filas = [[2, 'Estadística', '+5 % de Vida', 'Mejorar Zarpazo'], [3, 'Pasiva', 'Baqueano', 'Ojo vivo'], [4, 'Camino', 'Apu Puma', 'Qaqapuma'], [5, 'Técnica', 'Aprender Pedrada', '+5 % Defensa'], [6, 'Mejora', 'Revolcadero +15', '+5 % de Ataque']];
const nodo = (y, n, act) => `<circle cx="46" cy="${y}" r="14" fill="${act ? '#f2b03a' : '#fffaf0'}" stroke="${O}" stroke-width="2"/>${T(46, y + 4.5, 12.5, n, { w: 800, a: 'middle' })}`;
const fila = (y, [n, k, si, no]) => `${nodo(y, n)}<g transform="translate(70 ${y - 18})"><rect width="152" height="36" rx="9" fill="${K[k]}" stroke="${O}" stroke-width="1.6"/>${T(10, 13, 9, k, { w: 800, c: '#f4ead2' })}${T(10, 28, 12, si, { w: 800, c: '#fff' })}</g><g transform="translate(230 ${y - 15})"><rect width="96" height="30" rx="8" fill="none" stroke="#c9b48a" stroke-width="1.4" stroke-dasharray="4 3"/>${T(48, 19.5, 10.5, no, { a: 'middle', c: '#9a8a74' })}</g>`;
const icoCarta = {
  Mejora: `<path d="M-14,8 L0,-6 L14,8 M-14,-4 L0,-18 L14,-4" stroke="#c8562a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  Estadística: `${[[-16, 6, 10], [-4, -2, 18], [8, -12, 28]].map(([x, y, h]) => `<rect x="${x}" y="${y}" width="9" height="${h}" rx="2" fill="#2f7d5b" stroke="${O}" stroke-width="1.4"/>`).join('')}`,
};
const carta = (x, k, tit, l1, l2) => `<g transform="translate(${x} 412)"><rect y="4" width="140" height="168" rx="14" fill="${O}"/><rect width="140" height="168" rx="14" fill="#fffaf0" stroke="${O}" stroke-width="2.2"/><path d="M0,14 C0,6 6,0 14,0 L126,0 C134,0 140,6 140,14 L140,30 L0,30Z" fill="${K[k]}"/>${T(70, 20, 11, k, { w: 800, a: 'middle', c: '#fff' })}<g transform="translate(70 70)">${icoCarta[k]}</g>${T(70, 118, 14, tit, { f: 'Bree', a: 'middle' })}${T(70, 140, 11, l1, { a: 'middle', c: '#5a3e28' })}${T(70, 156, 11, l2, { a: 'middle', c: '#5a3e28' })}</g>`;
const ruda = `<path d="M12,40 C12,28 14,18 18,8" stroke="#3f6a3a" stroke-width="2" fill="none"/>${[[10, 30], [20, 24], [12, 18], [22, 12], [16, 6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.6" fill="#6a9a7a" stroke="${O}" stroke-width="1.2"/>`).join('')}`;
const arbol = svg('0 0 360 760', `${fondo}${cab('Árbol de cartas')}${papel(16, 70, 328, 672)}
  ${T(34, 100, 16, 'Apu Puma, Nv 7', { f: 'Bree' })}${T(326, 100, 10.5, 'elegida y descartada', { w: 800, a: 'end', c: '#8a6a4a' })}
  <path d="M46,128 L46,392" stroke="#c9b48a" stroke-width="3"/>${filas.map((f, i) => fila(128 + i * 52, f)).join('')}
  ${nodo(392, 7, true)}${T(70, 397, 15, 'Elegí una carta', { f: 'Bree' })}
  ${carta(34, 'Mejora', 'Mejorar Derrumbe', '+15 de daño', '(de 100 a 115)')}${carta(186, 'Estadística', '+5 % de Ataque', 'Ataque', '(de 120 a 126)')}
  <g transform="translate(34 604)"><rect width="292" height="56" rx="12" fill="#efe2c2" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(10 8)">${ruda}</g>${T(44, 24, 11.5, '¿Te arrepentiste? La curandera hace', { c: '#5a3e28' })}${T(44, 41, 11.5, 'la limpia de ruda y borra el árbol.', { c: '#5a3e28' })}</g>
  ${Object.entries(K).map(([k, c], i) => { const x = [26, 90, 148, 226, 280][i]; return `<circle cx="${x + 5}" cy="${694}" r="5" fill="${c}"/>${T(x + 13, 698, 10, k, { w: 800, c: '#5a3e28' })}`; }).join('')}
  ${T(180, 724, 11, 'En cada nivel elegís 1 de 2 cartas.', { a: 'middle', c: '#5a3e28' })}`);

// ---------- T12 Mochila ----------
export const IC = {
  peperina: `<path d="M24,44 L24,8" stroke="#4f7a3a" stroke-width="2.4"/>${[[16, 36], [32, 30], [16, 24], [32, 18], [20, 11]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3.6" fill="#7aaa4e" stroke="${O}" stroke-width="1.3" transform="rotate(${i % 2 ? -25 : 25} ${x} ${y})"/>`).join('')}`,
  cedron: `<path d="M10,18 L36,18 L33,40 L13,40Z" fill="#f4ead2" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M12,22 L34,22 L32,30 L14,30Z" fill="#c9a84a"/><path d="M36,22 C44,22 44,32 34,32" stroke="${O}" stroke-width="2" fill="none"/><path d="M18,13 C15,9 21,7 18,3 M27,13 C24,9 30,7 27,3" stroke="#b8a890" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
  jarilla: `<rect x="8" y="18" width="32" height="20" rx="4" fill="#c9ced2" stroke="${O}" stroke-width="2"/><ellipse cx="24" cy="18" rx="16" ry="5" fill="#e2e6e8" stroke="${O}" stroke-width="2"/><rect x="12" y="25" width="24" height="9" rx="2" fill="#d2c25a"/>`,
  mate: `<path d="M12,16 C6,30 14,42 24,42 C34,42 42,30 36,16Z" fill="#8a5a32" stroke="${O}" stroke-width="2"/><path d="M11,16 L37,16" stroke="#c9a84a" stroke-width="3.4" stroke-linecap="round"/><path d="M28,16 L35,2" stroke="#c9ced2" stroke-width="2.6" stroke-linecap="round"/><path d="M15,14 C19,10 29,10 33,14" fill="#4f8a2e"/>`,
  carqueja: `<rect x="15" y="18" width="18" height="24" rx="5" fill="#a8743a" stroke="${O}" stroke-width="2"/><rect x="20" y="10" width="8" height="9" fill="#e2e6e8" stroke="${O}" stroke-width="1.6"/><ellipse cx="24" cy="8" rx="6" ry="4" fill="#3a3a3a" stroke="${O}" stroke-width="1.4"/><rect x="18" y="26" width="12" height="8" rx="2" fill="#f4ead2"/>`,
  sahumerio: `<path d="M8,28 L40,28 C38,38 32,42 24,42 C16,42 10,38 8,28Z" fill="#b8643a" stroke="${O}" stroke-width="2"/><path d="M20,24 C16,18 24,14 20,8 M28,24 C24,18 32,14 28,6" stroke="#b8b0a4" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  ruda: `<g transform="translate(8 4)">${ruda}</g>`,
};
const objetos = [['peperina', 'Hojita de peperina', 4, 'Cura 20 de vida a un bicho.'], ['cedron', 'Té de cedrón', 2, 'Cura 50 de vida a un bicho.'], ['jarilla', 'Ungüento de jarilla', 1, 'Cura toda la vida de un bicho.'], ['mate', 'Mate amargo', 3, 'Recupera 2 de aguante.'], ['carqueja', 'Gotas de carqueja', 2, 'Le saca las marcas a un bicho.'], ['sahumerio', 'Sahumerio', 1, 'Despierta a un desmayado con media vida.'], ['ruda', 'Ruda', 1, 'Para la limpia de ruda de la curandera.']];
const mochila = svg('0 0 360 760', `${fondo}${cab('Mochila')}
  ${[['Remedios', 96], ['Equipo', 84], ['Herramientas', 118]].map(([n, w], i) => { const x = [20, 124, 216][i]; return `<g transform="translate(${x} 70)"><rect width="${w}" height="32" rx="16" fill="${i === 0 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${T(w / 2, 21, 12.5, n, { w: 800, a: 'middle' })}</g>`; }).join('')}
  ${papel(16, 116, 328, 490)}${objetos.map(([k, n, q, d], i) => { const y = 124 + i * 68; return `${i ? `<path d="M30,${y} L330,${y}" stroke="#e2d6bc" stroke-width="1.4"/>` : ''}<g transform="translate(28 ${y + 8})"><rect width="52" height="52" rx="10" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(2 2)">${IC[k]}</g></g>${T(92, y + 30, 14, n, { f: 'Bree' })}${T(92, y + 50, 11.5, d, { c: '#5a3e28' })}${T(326, y + 30, 15, `x${q}`, { f: 'Bree', a: 'end', c: '#7a4a2a' })}`; }).join('')}
  ${T(180, 640, 12, 'Tocá un objeto para ver su ficha.', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 660, 11.5, 'En combate se usan hasta 2 objetos.', { a: 'middle', c: '#e9d9b8' })}${T(180, 678, 11.5, 'Nada se revende.', { a: 'middle', c: '#e9d9b8' })}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Siguen las tiendas y el corral (14d).</div>
<section><div class="tres">
${tel('T10', 'Ficha de mi bicho', mio, 'Nivel, experiencia y vida actual; fuerzas con lo que suman las prendas y la pasiva; rol, pasivas, técnicas y su única ranura de prenda (desde Nv 3), con el botón para cambiarla. El círculo amarillo avisa que hay una carta por elegir.')}
${tel('T11', 'Árbol de cartas', arbol, 'Cada nivel muestra la carta elegida (a color) y la descartada (punteada). En el nivel nuevo se elige entre dos cartas grandes. La limpia de ruda borra el árbol.')}
${tel('T12', 'Mochila', mochila, 'Tres pestañas: Remedios, Equipo y Herramientas. Cada objeto con su dibujo, para qué sirve y cuántos tenés. Los valores de curación son de partida y se ajustan con el simulador.')}
</div></section>`;
writeFileSync(new URL('./catalogo-30.html', import.meta.url), pagina('Catálogo para aprobar, lote 14c', 'Ficha de mi bicho, árbol de cartas y mochila', cuerpo, css));
