// C6: ficha del bicho rival con prenda y estadísticas (reemplaza a C5).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { tero } from './muestra-bichos.mjs';
import { O, T, fondo, papel, chipTipo, ico, barra, pts, tec, sec, tel, css } from './catalogo-29.mjs';
import { P } from './catalogo-31.mjs';

const tag = (x, y, t) => T(x, y, 10, t, { w: 800, c: '#2f7d3b' });
const rolChip = (x, y, r) => `<rect x="${x}" y="${y}" width="${r.length * 6.6 + 14}" height="17" rx="8.5" fill="#fffaf0" stroke="${O}" stroke-width="1.2"/>${T(x + 7, y + 12.5, 10, r, { w: 800 })}`;
const c6 = svg('0 0 360 760', `${fondo}${T(180, 44, 20, 'Bicho rival', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}${papel(16, 62, 328, 684)}
  ${T(34, 92, 21, 'Ventero', { f: 'Bree' })}${chipTipo(34, 102, 'Viento')}${rolChip(96, 102, 'Veloz')}${T(34, 138, 11.5, 'Del Domador Ramiro, Nv 6', { c: '#5a3e28' })}
  <g transform="translate(206 58) scale(.5)">${tero()}</g>
  <g transform="translate(34 150)"><rect width="292" height="46" rx="10" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(8 4) scale(.95)">${P.panuelo}</g>${T(56, 20, 12.5, 'Prenda: Pañuelo', { w: 800 })}${T(56, 37, 11, '+1 de Crítico (ya sumado abajo)', { c: '#5a3e28' })}</g>
  ${sec(222, 'Fuerzas')}${barra(242, 'Vida', 98)}${barra(260, 'Ataque', 113)}${barra(278, 'Defensa', 98)}
  ${pts(302, 'Velocidad', 5)}${pts(320, 'Crítico', 3)}${pts(338, 'Amague', 2)}${tag(184, 320, '+1 Pañuelo')}${T(326, 302, 10.5, 'actúa primero', { w: 800, a: 'end', c: '#8a6a4a' })}
  ${sec(368, 'Pasivas')}${T(34, 388, 11.5, 'Fija: Guapo, +1 de aguante', { c: '#5a3e28' })}${T(34, 406, 11.5, 'Elegida en Nv 3: Nocturno, +10 % de noche', { c: '#5a3e28' })}
  ${sec(436, 'Marcas')}${ico('enredado', 'Flora', 34, 446, 24)}${T(64, 463, 11.5, 'Inmune a Enredado', { c: '#5a3e28' })}${ico('polvareda', 'Viento', 180, 446, 24)}${T(210, 463, 11.5, 'Resiste Polvareda', { c: '#5a3e28' })}
  ${sec(496, 'Tipos')}${T(34, 516, 11.5, '▲ Le pegan fuerte: Roca, Rayo, Hielo', { w: 800, c: '#2f7d3b' })}${T(34, 534, 11.5, '▼ Le hacen poco: Flora, Tierra, Veneno', { w: 800, c: '#8a5a4a' })}${T(34, 552, 11.5, '⚠ Pega fuerte a: Flora, Veneno', { w: 800, c: '#a8322a' })}
  ${sec(582, 'Técnicas vistas')}${T(180, 582, 9.5, 'aguante', { w: 800, c: '#8a7a6a' })}${T(226, 582, 9.5, 'marca', { w: 800, c: '#8a7a6a' })}${T(326, 582, 9.5, 'daño', { w: 800, a: 'end', c: '#8a7a6a' })}
  ${tec(604, 'Picotazo', 'Común', 0, 40)}${tec(624, 'Gritazo', 'Viento', 1, 45, 'polvareda')}${T(34, 644, 11.5, '2 sin ver todavía', { c: '#8a7a6a' })}
  <g transform="translate(34 666)"><rect y="4" width="292" height="40" rx="13" fill="${O}"/><rect width="292" height="40" rx="13" fill="#7a4a2a" stroke="${O}" stroke-width="2.2"/>${T(146, 26, 14, 'Volver al combate', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}</g>
  ${T(180, 730, 10.5, 'Contra un salvaje, la prenda dice: no lleva.', { a: 'middle', c: '#8a6a4a' })}`);

const cuerpo = `<div class="como">Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><div class="tres">
${tel('C6', 'Ficha del bicho rival', c6, 'Reemplaza a C5. Se abre con el ícono de libreta en combate. Muestra la prenda que lleva, sus fuerzas con números (la prenda ya sumada, en verde), ritmo, pasivas, inmunidad y resistencia, tipos y las técnicas que le viste. Las que no viste quedan ocultas hasta que las use.')}
</div></section>`;
writeFileSync(new URL('./catalogo-33.html', import.meta.url), pagina('Catálogo para aprobar, lote 14e', 'Ficha del bicho rival', cuerpo, css));
