// Negocios: al tocar la puerta se abre directo la lista del negocio (como la feria).
import { svg, COLOR_TIPO } from './base-arte.mjs';
import { O, T, fondo, cab, papel, moneda } from './catalogo-29.mjs';
import { IC } from './catalogo-30.mjs';
import { puma } from './puma-muestra.mjs';
import { tero, yacare } from './muestra-bichos.mjs';
import { lucerna } from './luciernaga.mjs';
import { kapiyva } from './catalogo-10.mjs';
import { pasacan, ajinina } from './catalogo-1.mjs';
import { kirkallpa } from './catalogo-2.mjs';

const plata = `${moneda(262, 70)}${T(326, 75, 14, '1.250', { f: 'Bree', a: 'end', c: '#fbf3e2' })}`;
const sub = (y, t) => T(30, y, 14, t, { f: 'Bree', c: '#f4ead2' });
const boton = (x, y, w, t, c = '#2f7d5b', h = 34) => `<g transform="translate(${x} ${y})"><rect y="3" width="${w}" height="${h}" rx="11" fill="${O}"/><rect width="${w}" height="${h}" rx="11" fill="${c}" stroke="${O}" stroke-width="1.8"/>${T(w / 2, h / 2 + 5, 12.5, t, { w: 800, a: 'middle', c: '#fbf3e2' })}</g>`;
const fila = (y, ico, n, d, der) => `<g transform="translate(16 ${y})"><rect width="328" height="62" rx="12" fill="#f4ead2" stroke="${O}" stroke-width="1.8"/><g transform="translate(8 7)"><rect width="48" height="48" rx="9" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.2"/><g transform="translate(1 1) scale(.95)">${ico}</g></g>${T(66, 26, 14, n, { f: 'Bree' })}${T(66, 46, 11, d, { c: '#5a3e28' })}${der}</g>`;
const precio = (p) => `${moneda(258, 31)}${T(316, 36, 14, p, { f: 'Bree', a: 'end' })}`;
export const ICN = {
  boleadora: `<path d="M14,30 C18,22 26,22 30,16 M14,30 C20,32 28,34 34,32" stroke="#8a5a32" stroke-width="2" fill="none"/>${[[12, 32], [32, 14], [36, 32]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#9aa4ac" stroke="${O}" stroke-width="1.8"/>`).join('')}`,
  carpa: `<path d="M4,40 C7,22 16,10 24,10 C32,10 41,22 44,40Z" fill="#c9a46a" stroke="${O}" stroke-width="2"/><path d="M16,40 C17,30 31,30 32,40" fill="#6a4a2e"/>`,
  empanada: `<path d="M6,32 C6,18 42,18 42,32Z" fill="#e2b86a" stroke="${O}" stroke-width="2"/>${[12, 18, 24, 30, 36].map((x) => `<path d="M${x},32 l2,4" stroke="#a8743a" stroke-width="2.4" stroke-linecap="round"/>`).join('')}`,
  pizarra: `<rect x="4" y="8" width="40" height="32" fill="#2f3a32" stroke="#8a5a32" stroke-width="3"/><path d="M10,18 L36,18 M10,28 L28,28" stroke="#e8e4dc" stroke-width="2" stroke-dasharray="4 3"/>`,
  corral: `<rect x="4" y="12" width="40" height="28" fill="#c9a46a" stroke="${O}" stroke-width="1.8"/><path d="M4,22 L44,22 M4,32 L44,32" stroke="#6a4a2e" stroke-width="3"/>`,
};

// NP1 Posta: el estado del equipo y curar a todos
const eq = [[puma({ fin: true }), 'Apu Puma', 62, 80], [lucerna('destello'), 'Destellón', 54, 54], [kapiyva('tranquilo'), 'Pachorra', 30, 88], [tero(), 'Ventero', 0, 50], [yacare(), 'Yacarón', 30, 66], [pasacan(), 'Pasacán', 44, 44]];
const mini = (x, y, [d, n, v, m]) => `<g transform="translate(${x} ${y})"><rect width="100" height="96" rx="12" fill="${v ? '#fffaf0' : '#e4d8bf'}" stroke="#c9b48a" stroke-width="1.4"/><g transform="translate(20 0) scale(.3)" ${v ? '' : 'opacity=".45"'}>${d}</g>${T(50, 70, 10.5, n, { w: 800, a: 'middle' })}<rect x="10" y="78" width="80" height="7" rx="3.5" fill="#d9ccb4"/>${v ? `<rect x="10" y="78" width="${80 * v / m}" height="7" rx="3.5" fill="${v / m < .5 ? '#d8932a' : '#3f9a4a'}"/>` : ''}</g>`;
export const NP1 = svg('0 0 360 760', `${fondo}${cab('Posta')}${T(180, 72, 12, 'Cerrillos, Salta', { w: 800, a: 'middle', c: '#f2d9a8' })}
  ${papel(16, 86, 328, 248)}${T(30, 110, 14, 'Tu equipo', { f: 'Bree' })}${eq.map((b, i) => mini(26 + (i % 3) * 104, 120 + Math.floor(i / 3) * 104, b)).join('')}
  ${boton(16, 346, 328, 'Curar a todos, gratis', '#2f7d5b', 48)}
  ${fila(414, ICN.corral, 'Corral', '9 de 20 lugares', boton(232, 14, 86, 'Abrir', '#7a4a2a'))}
  ${T(180, 520, 11.5, 'Curar no gasta nada: los remedios son para el camino.', { a: 'middle', c: '#e9d9b8' })}`);

// NP2 Almacén: encargo del día, changas y lo que vende
export const NP2 = svg('0 0 360 760', `${fondo}${cab('Almacén')}${plata}
  ${sub(108, 'Encargo del día')}<g transform="translate(16 118)"><rect width="328" height="96" rx="12" fill="#f4ead2" stroke="#f2b03a" stroke-width="2.4"/><g transform="translate(8 4) scale(.42)" filter="url(#sil)">${kirkallpa()}</g>${T(104, 30, 15, 'Kirkallpa', { f: 'Bree' })}${T(104, 50, 11, 'Quebradas, de noche', { c: '#5a3e28' })}${T(104, 70, 11, 'Todavía no lo atrapaste', { w: 800, c: '#a8322a' })}${precio('120').replace('translate(258 31)', 'translate(258 44)').replace('T(316, 36', 'T(316, 49')}</g>
  ${sub(244, 'Changas')}${fila(254, ICN.pizarra, 'Llevar un recado al puesto', 'De la Ruta 68 a la Puna', `${precio('80')}`)}${fila(324, ICN.pizarra, 'Juntar tres fardos', 'Campo de Don Ernesto', `${precio('60')}`)}
  ${sub(418, 'Vende')}${fila(428, IC.mate, 'Mate amargo', 'Pasa a la franja siguiente del día', precio('60'))}${fila(498, ICN.empanada, 'Empanadas salteñas', 'Convite para un ermitaño', precio('80'))}`.replace("${fila(254, IC.pista || ''", '${fila(254, ""'));

// NP3 Curandera: remedios y limpia de ruda
const rem = [['peperina', 'Hojita de peperina', 'Cura 20 de vida', '40'], ['cedron', 'Té de cedrón', 'Cura 50 de vida', '90'], ['jarilla', 'Ungüento de jarilla', 'Cura toda la vida', '200'], ['sahumerio', 'Sahumerio', 'Despierta a un desmayado', '150']];
export const NP3 = svg('0 0 360 760', `${fondo}${cab('Curandera')}${plata}${sub(108, 'Remedios')}
  ${rem.map(([k, n, d, p], i) => fila(118 + i * 70, IC[k], n, d, `${precio(p)}${T(316, 54, 9.5, `tenés ${[4, 2, 1, 1][i]} de 5`, { w: 800, a: 'end', c: '#8a6a4a' })}`)).join('')}
  ${sub(422, 'Limpia de ruda')}${fila(432, IC.ruda, 'Limpia de ruda', 'Borra el árbol de un bicho', `${precio('300')}`)}${boton(16, 508, 328, 'Elegir el bicho para la limpia', '#7a4a2a', 40)}`);

// NP4 Talabartería: boleadora y carpa
const puntos = (n) => [0, 1, 2].map((i) => `<circle cx="${70 + i * 18}" cy="62" r="6" fill="${i < n ? '#f2b03a' : '#d9ccb4'}" stroke="${O}" stroke-width="1.2"/>`).join('');
export const NP4 = svg('0 0 360 760', `${fondo}${cab('Talabartería')}${plata}${sub(108, 'Boleadora')}
  <g transform="translate(16 118)"><rect width="328" height="110" rx="12" fill="#f4ead2" stroke="${O}" stroke-width="1.8"/><g transform="translate(8 7)"><rect width="48" height="48" rx="9" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.2"/>${ICN.boleadora}</g>${T(66, 26, 14, 'Mejora 2 de 3', { f: 'Bree' })}${T(66, 46, 11, '+8 % de chance de atrapar', { c: '#5a3e28' })}<g transform="translate(-4 0)">${puntos(1)}</g>${precio('900')}${boton(206, 66, 112, 'Mejorar', '#2f7d5b')}</g>
  ${sub(258, 'Carpa')}${fila(268, ICN.carpa, 'Carpa', 'Para dormir de noche. 5 usos.', precio('250'))}${T(30, 350, 11, 'Tenés una carpa con 3 usos.', { w: 800, c: '#f2d9a8' })}`);
