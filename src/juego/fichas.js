// Ficha de una especie (lote 17a, IN2, y lote 14b): dibujo, tipo, rol, estadísticas, técnicas, eficacias y caminos.
import { h } from '../ui.js';
import { dibujo } from '../arte/escenas.js';
import { ICO_TIPO } from '../arte/rancho.js';
import { FAMILIAS, PASIVAS } from '../datos/familias.js';
import { crearBicho, eficacia, ROLES, RITMO } from '../nucleo/combate.js';
import { nombreTecnica } from '../pantallas/combate.js';
import { arteBicho } from './pelea.js';
import { COLOR_TIPO } from '../arte/combate-arte.js';

const COLOR = { ...COLOR_TIPO, Neutro: '#9a8e7e' };
const TIPOS = ['Común', 'Fuego', 'Agua', 'Flora', 'Tierra', 'Roca', 'Viento', 'Rayo', 'Hielo', 'Veneno'];
const ROL_TXT = { golpeador: 'golpeador', marcador: 'marcador', detonador: 'detonador', muralla: 'muralla', veloz: 'veloz', apoyo: 'apoyo' };
const ROL_PASIVA = { golpeador: 'Rompeguardia: sus técnicas de 2 y 3 pasan la cubierta a la mitad.', marcador: 'Marca pesada: su marcadora pega +30 %.', detonador: 'Mecha corta: +0,6 a sus reventones y reacciones.', muralla: 'Cuero duro: −15 % de daño recibido.', veloz: 'Gana los empates de Velocidad.', apoyo: 'Su aura ayuda al equipo, aunque esté en el banco.' };
const AURA = { afilado: 'Afilado: +5 % de crítico', pialador: 'Pialador: marcas +1 ronda', guardian: 'Guardián: −5 % de daño recibido', rastreador: 'Rastreador: +10 % de daño a marcados', tropilla: 'Tropilla: el que entra recibe −30 %' };

export const tipoIco = (t) => `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="${COLOR[t] || '#9a8e7e'}" stroke="#2a1c15" stroke-width="3"/>${ICO_TIPO[t] || ''}</svg>`;
export const chipTipo = (t) => h('span', { class: 'chip-tipo', style: { background: COLOR[t] || '#9a8e7e' } }, t);
const barra = (n, v) => h('div', { class: 'est' }, h('span', {}, n), h('i', {}, h('b', { style: { width: `${Math.min(100, v)}%` } })), h('em', {}, String(Math.round(v))));

/** La ficha completa de una familia. opciones: nivel, camino, propio (para mostrar sus datos). */
export function fichaEspecie(familia, { camino = 0, nivel = 1, pasiva = null } = {}) {
  const F = FAMILIAS[familia];
  const b = crearBicho(familia, { nivel, camino, pasiva });
  const [v, a, d] = ROLES[F.rol];
  const vel = (F.mito ? 3 : RITMO[F.ritmo][0]);
  const nom = camino ? F.caminos[camino - 1] : F.base;
  const fuerte = TIPOS.filter((t) => eficacia(F.tipo, t) > 1), cuesta = TIPOS.filter((t) => eficacia(F.tipo, t) < 1);
  return h('div', { class: 'ficha-especie' },
    h('div', { class: 'cab-especie' }, h('span', { class: 'dib', style: { background: `${COLOR[F.tipo]}33` }, html: dibujo(arteBicho(nom), '0 0 200 200') }),
      h('div', {}, h('h2', {}, nom), h('div', { class: 'chips' }, chipTipo(F.tipo), h('span', { class: 'chip-prov' }, F.provincia)), h('p', { class: 'rotulo' }, `Rol: ${ROL_TXT[F.rol]}`), h('p', { class: 'nota' }, F.rol === 'apoyo' && F.aura ? AURA[F.aura] || ROL_PASIVA.apoyo : ROL_PASIVA[F.rol]))),
    barra('Vida', v / 1.3), barra('Ataque', a / 1.3), barra('Defensa', d / 1.3), barra('Velocidad', vel * 20),
    h('p', { class: 'sub' }, 'Técnicas'),
    ...b.tec.map((t, i) => h('div', { class: 'tec-fila' }, h('span', { html: tipoIco(t.t === 'Neutro' ? 'Común' : t.t) }), h('b', {}, nombreTecnica(b, i)), h('i', {}, t.e && t.p <= 30 ? 'Efecto' : `Potencia ${t.p}`), h('em', {}, `${t.c} de aguante`))),
    h('div', { class: 'eficacias' }, h('span', {}, 'Le pega fuerte a'), ...fuerte.map((t) => h('span', { class: 'ico-tipo', title: t, html: tipoIco(t) })), h('span', {}, 'Le cuesta'), ...cuesta.map((t) => h('span', { class: 'ico-tipo', title: t, html: tipoIco(t) }))),
    F.pasivas ? h('p', { class: 'nota' }, `En el nivel 3 elige su pasiva: ${PASIVAS[F.pasivas[0]][0]} o ${PASIVAS[F.pasivas[1]][0]}.`) : null,
    !camino ? h('p', { class: 'sub' }, 'En el nivel 4 elegís su camino') : null,
    !camino ? h('div', { class: 'caminos' }, F.caminos.map((c) => h('div', {}, h('span', { html: dibujo(arteBicho(c), '0 0 200 200') }), h('b', {}, c)))) : null);
}
