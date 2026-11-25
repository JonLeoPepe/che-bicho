// Cancha de prueba (etapa 1): elegir rival y equipo, sorteo de mates y combate.
// Sirve para probar el combate v5 antes de que exista el mapa.
import { h, en, boton, cabecera, papel } from '../ui.js';
import { fondoCuero, dibujo } from '../arte/escenas.js';
import { RIVALES } from '../datos/rivales.js';
import { FAMILIAS } from '../datos/familias.js';
import { crearBicho, nuevoLado, entrar, CLIMAS, Rng } from '../nucleo/combate.js';
import { combate } from './combate.js';

let arte = null;
const cargarArte = async () => (arte ??= (await import('../arte/bichos.js')).BICHOS);
const NOMBRE_CLIMA = { sol: 'Sol', nublado: 'Nublado', lluvia: 'Lluvia', viento: 'Viento', nieve: 'Nieve' };

function equipoAlAzar(rng, rival) {
  const pool = Object.values(FAMILIAS).filter((f) => !f.mito && rival.provs.includes(f.provincia)).map((f) => f.base);
  const fams = []; for (let i = 0; i < 6; i++) fams.push(pool.splice(Math.floor(rng.sig() * pool.length), 1)[0]);
  return fams;
}
const armar = (rng, fams, nivel, delta) => fams.map((f) => { const nv = Math.max(1, Math.min(10, nivel + rng.elegir(delta))); return crearBicho(f, { nivel: nv, camino: nv >= 4 ? rng.entero(1, 2) : 0, pasiva: nv >= 3 ? rng.elegir(FAMILIAS[f].pasivas) : null }); });
function sortear(rng, eq) { const p = [...eq], s = []; for (let i = 0; i < 4; i++) s.push(p.splice(Math.floor(rng.sig() * p.length), 1)[0]); return s; }

export function cancha(app) {
  const rng = new Rng(Date.now() & 0x7fffffff);
  let rival = RIVALES[0], mios = equipoAlAzar(rng, rival);
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Cancha de prueba', () => app.volver(), true));
  const lista = h('div', { class: 'lista-partidas' });
  const equipo = h('div', { class: 'mini-equipo' });
  const pintarEquipo = async () => {
    const B = await cargarArte();
    equipo.replaceChildren(...mios.map((f) => h('div', { class: 'mini', title: f }, h('span', { html: dibujo(B[f], '0 0 200 200') }), h('i', {}, f))));
  };
  RIVALES.forEach((r) => {
    const b = h('button', { type: 'button', class: 'partida', role: 'radio', 'aria-checked': String(r === rival) }, h('b', {}, r.nombre), h('span', {}, `${r.provincia}, nivel ${r.nivel}. Llegás con nivel ${r.llega}.`));
    b.addEventListener('click', () => { rival = r; mios = equipoAlAzar(rng, rival); lista.querySelectorAll('.partida').forEach((x) => x.setAttribute('aria-checked', String(x === b))); pintarEquipo(); });
    lista.append(b);
  });
  lista.style.maxHeight = '200px';
  pintarEquipo();
  const panel = h('div', { class: 'formulario' },
    h('p', { class: 'nota' }, 'Probá el combate contra cualquier rival, con 6 bichos al azar de las provincias que ya recorriste.'),
    h('p', { class: 'rotulo' }, 'Rival'), lista,
    h('p', { class: 'rotulo' }, 'Tu equipo'), equipo,
    h('div', { class: 'dos' }, boton('Otro equipo', { color: 'marron', tam: 'medio', onclick: () => { mios = equipoAlAzar(rng, rival); pintarEquipo(); } }),
      boton('¡A los mates!', { tam: 'medio', onclick: async () => {
        const B = await cargarArte();
        const clima = rival.galpon ? null : rng.elegir(CLIMAS);
        const eqMio = sortear(rng, armar(rng, mios, rival.llega, [-1, 0, 0, 1]));
        const eqRival = sortear(rng, armar(rng, rival.familias, rival.nivel, [-1, 0, 0]));
        app.temporal = { rival, clima, eqMio, eqRival, arte: B };
        app.ir('sorteo');
      } })));
  p.append(papel(80, 596, panel));
  p.foco = lista.querySelector('[aria-checked="true"]');
  return p;
}

/** Después del sorteo de mates: cada uno elige con cuál arranca (a la vez, sin ver al otro). */
export function sorteo(app) {
  const t = app.temporal;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Sorteo de mates', () => app.volver(), true));
  const tarjetas = (eq, tuyo) => h('div', { class: 'mates' }, eq.map((b, i) => {
    const el = h(tuyo ? 'button' : 'div', { class: 'mate', type: tuyo ? 'button' : undefined }, h('span', { html: dibujo(t.arte[b.nombre], '0 0 200 200') }), h('b', {}, b.nombre), h('i', {}, `Nv ${b.nivel}`));
    if (tuyo) el.addEventListener('click', () => empezar(i));
    return el;
  }));
  const clima = t.clima ? `Clima: ${NOMBRE_CLIMA[t.clima]}.` : 'En el galpón no hay clima.';
  p.append(papel(80, 596, h('div', { class: 'formulario' },
    h('p', { class: 'rotulo' }, `Salieron estos 4 de ${t.rival.nombre}`), tarjetas(t.eqRival, false),
    h('p', { class: 'rotulo' }, 'Salieron estos 4 tuyos. Tocá con cuál arrancás.'), tarjetas(t.eqMio, true),
    h('p', { class: 'nota centro' }, clima))));
  function empezar(i) {
    const L0 = nuevoLado(t.eqMio), L1 = nuevoLado(t.eqRival);
    entrar(L0, i); entrar(L1, 0);
    app.temporal.combate = { ladoMio: L0, ladoRival: L1 };
    app.ir('combate', { reemplazar: true });
  }
  p.foco = p.querySelector('button.mate');
  return p;
}

export function pantallaCombate(app) {
  const t = app.temporal;
  return combate(app, { ...t.combate, rival: t.rival, clima: t.clima, arte: t.arte, alTerminar: () => app.volver() });
}
