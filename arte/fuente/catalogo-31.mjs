// Catálogo para aprobar, lote 14d: Equipo, Corral y Feria (lista y ficha).
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
import { tero, yacare } from './muestra-bichos.mjs';
import { lucerna } from './luciernaga.mjs';
import { kapiyva } from './catalogo-10.mjs';
import { pasacan } from './catalogo-1.mjs';
import { kirkallpa, llamaru, mallku, escarchuna } from './catalogo-2.mjs';
import { miyura, pirkasol } from './catalogo-3.mjs';
import { papacuy, atoq } from './catalogo-17.mjs';
import { suri } from './catalogo-18.mjs';
import { O, T, fondo, cab, papel, chipTipo, moneda, tel, css } from './catalogo-29.mjs';
import { prenda, boton } from './catalogo-30.mjs';

export const P = {
  ...prenda,
  faja: `<path d="M2,14 L38,14 L38,26 L2,26Z" fill="#a8322a" stroke="${O}" stroke-width="1.6"/><path d="M2,18 L38,18 M2,22 L38,22" stroke="#f2b03a" stroke-width="1.4"/><path d="M30,26 L28,36 M33,26 L33,37 M36,26 L38,35" stroke="#a8322a" stroke-width="2" stroke-linecap="round"/>`,
  boina: `<ellipse cx="20" cy="24" rx="18" ry="8" fill="#2a3a5a" stroke="${O}" stroke-width="1.8"/><path d="M4,26 C10,31 30,31 36,26" fill="none" stroke="#1a2236" stroke-width="2.4"/><path d="M20,16 L21,11" stroke="${O}" stroke-width="2.4" stroke-linecap="round"/>`,
  panuelo: `<path d="M20,4 L36,20 L20,36 L4,20Z" fill="#c8562a" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/><path d="M20,10 L30,20 L20,30 L10,20Z" fill="none" stroke="#fbf3e2" stroke-width="2"/><path d="M20,15 L25,20 L20,25 L15,20Z" fill="#f2b03a"/><path d="M31,31 C34,35 33,38 30,39 M33,29 C38,31 39,35 37,37" stroke="#c8562a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  alpargatas: `${[[3, 0], [19, 4]].map(([x, d]) => `<path d="M${x},${30 + d} C${x},${22 + d} ${x + 4},${18 + d} ${x + 9},${18 + d} C${x + 15},${18 + d} ${x + 18},${24 + d} ${x + 18},${30 + d}Z" fill="#3a4a6a" stroke="${O}" stroke-width="1.6"/><path d="M${x},${30 + d} L${x + 18},${30 + d}" stroke="#d9c09a" stroke-width="3.4"/>`).join('')}`,
};
const NOMBRE = { poncho: 'Poncho', faja: 'Faja', rastra: 'Rastra', boina: 'Boina', panuelo: 'Pañuelo', alpargatas: 'Alpargatas' };
const EFECTO = { poncho: '+10 % de Defensa', faja: '+10 % de Vida', rastra: '+10 % de Ataque', boina: '+1 de Velocidad', panuelo: '+1 de Crítico', alpargatas: 'Entra al combate con +1 de aguante' };

// ---------- T13 Equipo (desde el Menú) ----------
const eq = [[puma({ fin: true }), 'Apu Puma', 7, 'Tierra', 62, 80, 'poncho'], [lucerna('destello'), 'Destellón', 6, 'Rayo', 54, 54, 'panuelo'], [kapiyva('tranquilo'), 'Pachorra', 6, 'Común', 70, 88, 'faja'], [tero(), 'Ventero', 5, 'Viento', 0, 50, null], [yacare(), 'Yacarón', 5, 'Agua', 30, 66, 'boina'], [pasacan(), 'Pasacán', 3, 'Flora', 44, 44, null]];
const filaEq = (y, [d, n, nv, t, v, vm, pr], i) => `<g transform="translate(16 ${y})"><rect width="328" height="84" rx="14" fill="${v ? '#f4ead2' : '#e4d8bf'}" stroke="${O}" stroke-width="2"/>
  ${T(16, 22, 12, i + 1, { w: 800, c: '#8a6a4a' })}<g transform="translate(26 6)"><rect width="72" height="72" rx="12" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(4 2) scale(.32)" ${v ? '' : 'opacity=".45"'}>${d}</g></g>
  ${T(110, 26, 15, n, { f: 'Bree' })}${chipTipo(110, 34, t)}${T(250, 26, 12, `Nv ${nv}`, { w: 800, a: 'end' })}
  <rect x="110" y="60" width="140" height="9" rx="4.5" fill="#d9ccb4"/>${v ? `<rect x="110" y="60" width="${140 * v / vm}" height="9" rx="4.5" fill="${v / vm < .5 ? '#d8932a' : '#3f9a4a'}"/>` : ''}${T(250, 80, 9.5, v ? `${v} de ${vm}` : 'Desmayado', { w: 800, a: 'end', c: v ? '#8a6a4a' : '#a8322a' })}
  <g transform="translate(264 14)"><rect width="52" height="56" rx="10" fill="${pr ? '#fffaf0' : 'none'}" stroke="${pr ? '#c9b48a' : '#b8a88c'}" stroke-width="1.4" ${pr ? '' : 'stroke-dasharray="4 3"'}/>${pr ? `<g transform="translate(6 2)">${P[pr]}</g>${T(26, 50, 9, NOMBRE[pr], { w: 800, a: 'middle' })}` : `${T(26, 32, 9.5, 'sin', { w: 800, a: 'middle', c: '#9a8a74' })}${T(26, 44, 9.5, 'prenda', { w: 800, a: 'middle', c: '#9a8a74' })}`}</g></g>`;
const equipo = svg('0 0 360 760', `${fondo}${cab('Equipo')}${eq.map((b, i) => filaEq(72 + i * 92, b, i)).join('')}
  ${T(180, 636, 12, 'Tocá un bicho para ver su ficha.', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 656, 11.5, 'Tocá la prenda para cambiarla o sacarla.', { a: 'middle', c: '#e9d9b8' })}${T(180, 676, 11.5, 'Mantené apretado y arrastrá para ordenar:', { a: 'middle', c: '#e9d9b8' })}${T(180, 694, 11.5, 'el primero arranca contra los salvajes.', { a: 'middle', c: '#e9d9b8' })}`);

// ---------- T14 Corral (desde la posta) ----------
const corralB = [[kirkallpa(), 'Kirkallpa'], [llamaru(), 'Llamarú'], [mallku(), 'Mallku'], [escarchuna(), 'Escarchuña'], [miyura(), 'Miyurá'], [pirkasol(), 'Pirkasol'], [papacuy(), 'Papacuy'], [atoq(), 'Atoq'], [suri(), 'Suri']];
const caja = (x, y, d, n, sel) => `<g transform="translate(${x} ${y})"><rect width="74" height="74" rx="10" fill="${d ? '#fffaf0' : 'none'}" stroke="${sel ? '#f2b03a' : d ? '#c9b48a' : '#8a6a4a'}" stroke-width="${sel ? 3.4 : 1.4}" ${d ? '' : 'stroke-dasharray="4 3"'}/>${d ? `<g transform="translate(9 0) scale(.28)">${d}</g>${T(37, 68, 9.5, n, { w: 800, a: 'middle' })}` : ''}</g>`;
const corral = svg('0 0 360 760', `${fondo}${cab('Corral')}${T(180, 70, 12, 'Posta de Cerrillos, 9 de 20 lugares', { w: 800, a: 'middle', c: '#f2d9a8' })}
  ${papel(16, 82, 328, 80)}${T(30, 102, 12, 'Tu equipo', { f: 'Bree' })}${eq.map(([d, , , , v], i) => `<g transform="translate(${28 + i * 51} 110)"><rect width="46" height="44" rx="8" fill="#fffaf0" stroke="${i === 5 ? '#f2b03a' : '#c9b48a'}" stroke-width="${i === 5 ? 3 : 1.2}"/><g transform="translate(3 -1) scale(.2)" ${v ? '' : 'opacity=".45"'}>${d}</g></g>`).join('')}
  ${['Todos', 'Salta', 'Corrientes', 'Jujuy'].map((p, i) => { const w = [62, 62, 96, 62][i], x = [20, 90, 160, 264][i]; return `<g transform="translate(${x} 176)"><rect width="${w}" height="28" rx="14" fill="${i === 0 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.6"/>${T(w / 2, 19, 11.5, p, { w: 800, a: 'middle' })}</g>`; }).join('')}
  ${Array.from({ length: 20 }, (_, i) => { const b = corralB[i]; return caja(20 + (i % 4) * 81, 216 + Math.floor(i / 4) * 80, b && b[0], b && b[1], i === 1); }).join('')}
  <g transform="translate(16 620)"><rect width="328" height="56" rx="12" fill="#4e2a14" stroke="#f2b03a" stroke-width="1.6"/>${T(164, 24, 12, 'Elegiste a Llamarú (Nv 4) y a Pasacán (Nv 3).', { w: 800, a: 'middle', c: '#f4ead2' })}${T(164, 43, 11, 'El que vuelve al corral deja su prenda en la mochila.', { a: 'middle', c: '#e9d9b8' })}</g>
  ${boton(24, 690, 150, 'Ver ficha', '#7a4a2a', 40)}${boton(186, 690, 150, 'Cambiar', '#2f7d5b', 40)}`);

// ---------- T15 Feria (lista) y T16 ficha ----------
const lista = [['poncho', 300, 'tenes'], ['faja', 300], ['boina', 350], ['panuelo', 350], ['alpargatas', 300]];
const feria = svg('0 0 360 760', `${fondo}${cab('Feria')}${moneda(262, 70)}${T(326, 75, 14, '1.250', { f: 'Bree', a: 'end', c: '#fbf3e2' })}${T(20, 75, 12, 'Cerrillos, Salta', { w: 800, c: '#f2d9a8' })}
  ${[['Prendas', 100], ['Pilchas', 100]].map(([n, w], i) => `<g transform="translate(${20 + i * 108} 94)"><rect width="${w}" height="30" rx="15" fill="${i === 0 ? '#f2b03a' : '#f4ead2'}" stroke="${O}" stroke-width="1.8"/>${T(w / 2, 20, 12.5, n, { w: 800, a: 'middle' })}</g>`).join('')}
  ${papel(16, 136, 328, 352)}${lista.map(([k, p, t], i) => { const y = 144 + i * 68; return `${i ? `<path d="M30,${y} L330,${y}" stroke="#e2d6bc" stroke-width="1.4"/>` : ''}<g transform="translate(28 ${y + 8})"><rect width="52" height="52" rx="10" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(6 6)">${P[k]}</g></g>${T(92, y + 30, 14, NOMBRE[k], { f: 'Bree' })}${T(92, y + 50, 11, EFECTO[k], { c: '#5a3e28' })}${t ? `<rect x="262" y="${y + 16}" width="66" height="22" rx="11" fill="#2f9a5b"/>${T(295, y + 31.5, 10.5, 'La tenés', { w: 800, a: 'middle', c: '#fff' })}` : `${moneda(278, y + 26)}${T(326, y + 31, 14, p, { f: 'Bree', a: 'end' })}`}`; }).join('')}
  ${T(180, 520, 12, 'Tocá una prenda para ver su ficha.', { w: 800, a: 'middle', c: '#f4ead2' })}${T(180, 540, 11.5, 'De cada prenda se puede tener una sola.', { a: 'middle', c: '#e9d9b8' })}${T(180, 558, 11.5, 'Cada provincia vende un surtido distinto.', { a: 'middle', c: '#e9d9b8' })}`);
const ficha = svg('0 0 360 760', `${fondo}${cab('Feria')}${moneda(262, 70)}${T(326, 75, 14, '1.250', { f: 'Bree', a: 'end', c: '#fbf3e2' })}
  ${papel(16, 94, 328, 520)}<ellipse cx="180" cy="270" rx="70" ry="10" fill="#d9ccb4"/><g transform="translate(120 130) scale(3)">${P.boina}</g>
  ${T(180, 316, 24, 'Boina', { f: 'Bree', a: 'middle' })}${T(180, 344, 14, '+1 de Velocidad', { w: 800, a: 'middle', c: '#2f6a8a' })}
  ${T(180, 372, 12, 'Con Velocidad más alta, el bicho actúa primero', { a: 'middle', c: '#5a3e28' })}${T(180, 390, 12, 'al entrar y le cuesta menos huir.', { a: 'middle', c: '#5a3e28' })}
  <path d="M40,410 L320,410" stroke="#d9ccb4" stroke-width="1.4"/>
  ${T(40, 436, 12, 'Ranura', { w: 800, c: '#8a6a4a' })}${T(130, 436, 12.5, 'la de cualquier bicho desde Nv 3', { w: 800 })}${T(40, 460, 12, 'Tenés', { w: 800, c: '#8a6a4a' })}${T(130, 460, 12.5, 'ninguna (se puede tener una)', { w: 800 })}${T(40, 484, 12, 'Precio', { w: 800, c: '#8a6a4a' })}${moneda(140, 480)}${T(156, 485, 14, '350', { f: 'Bree' })}
  ${boton(40, 520, 280, 'Comprar', '#2f7d5b', 48)}${T(180, 600, 11, 'Te quedan 900 chirolas después de comprarla.', { a: 'middle', c: '#5a3e28' })}
  ${boton(110, 640, 140, 'Volver', '#7a4a2a', 40)}`);

const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Las pilchas (ropa del protagonista) van en el próximo lote.</div>
<section><div class="tres">
${tel('T13', 'Equipo', equipo, 'Desde el Menú. Tus 6 bichos con nivel, tipo, vida y prenda. El desmayado se ve apagado. Se ordenan arrastrando.')}
${tel('T14', 'Corral', corral, 'Desde cualquier posta. Arriba tu equipo, abajo los lugares del corral. Tocás un bicho para elegirlo; Ver ficha abre su ficha completa (como T10) para decidir. Con uno elegido de cada lado, Cambiar los intercambia.')}
${tel('T15', 'Feria', feria, 'Lista de prendas con efecto y precio. La que ya tenés aparece marcada: de cada una se puede tener una sola.')}
${tel('T16', 'Ficha de una prenda', ficha, 'Dibujo grande, efecto explicado, ranura, cuántas tenés y precio. La misma ficha se ve desde la mochila, sin Comprar.')}
</div></section>`;
writeFileSync(new URL('./catalogo-31.html', import.meta.url), pagina('Catálogo para aprobar, lote 14d', 'Equipo, corral y feria', cuerpo, css));
