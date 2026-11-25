// Peleas desde el mapa: salvajes (con captura), domadores, capataces, ermitaños, mitos y torneo.
// Arma los lados con los bichos propios (con la vida que les queda), sortea los mates y reparte lo ganado.
import { h, en, cabecera, papel } from '../ui.js';
import { fondoCuero, dibujo } from '../arte/escenas.js';
import { GUAYACA, MATE_NEGRO } from '../arte/ui-arte.js';
import { combate } from '../pantallas/combate.js';
import { crearBicho, nuevoLado, entrar, Rng } from '../nucleo/combate.js';
import { FAMILIAS } from '../datos/familias.js';
import { RIVALES } from '../datos/rivales.js';
import { INGRESOS, REVANCHA } from '../datos/tienda.js';
import { PROVINCIAS, ZONAS, DERROTA, trato } from '../datos/mundo.js';
import { delEquipo, paraCombate, expVencido, darExp, atrapar, momento, dia, curarTodos, nombreDe, especie, marcarVisto } from '../nucleo/progreso.js';
import { registrar, truequePendiente } from '../nucleo/changas.js';
import { CHANGUEROS } from '../datos/changas.js';
import { sonar, musica } from './sonido.js';

let BICHOS = null;
export const cargarBichos = async () => (BICHOS ??= (await import('../arte/bichos.js')).BICHOS);
export const arteBicho = (nombre) => BICHOS?.[nombre] || '';
export const rivalPorIA = (ia) => RIVALES.find((r) => r.ia === ia);

const promedio = (xs) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);

/** Lo que se muestra al volver al mapa: avisos en cola. */
function avisar(app, ...txt) { (app.temporal.avisos ??= []).push(...txt.filter(Boolean)); }

/** Experiencia para los que pelearon, con la Piedra de la Pachamama. */
function repartirExp(app, info, rareza, tipoRival) {
  const P = app.partida; const eq = delEquipo(P);
  const alto = Math.max(...P.bichos.map((b) => b.nivel));
  const total = new Map();
  for (const k of info.kos) {
    const b = P.bichos.find((x) => x.id === k.por); if (!b) continue;
    let e = expVencido(k.nivel, b.nivel, rareza, tipoRival);
    if (P.piedra > 0 && b.nivel <= alto - 2) e *= 2;
    total.set(b, (total.get(b) || 0) + e);
  }
  for (const [b, e] of total) {
    const sube = darExp(b, e);
    for (const n of sube) {
      sonar('nivel'); avisar(app, `¡${nombreDe(b)} subió a nivel ${n}!`);
      if (n === 3 && !b.pasiva) avisar(app, `${nombreDe(b)} puede elegir su pasiva.`);
      if (n === 4 && !b.camino) avisar(app, `${nombreDe(b)} puede elegir su camino.`);
    }
  }
  if (P.piedra > 0) { P.piedra -= 1; if (P.piedra > 0) avisar(app, `Piedra de la Pachamama: quedan ${P.piedra} combates.`); }
  void eq;
  return [...total.values()].reduce((a, b) => a + b, 0);
}
function avisosChanga(app, av) {
  for (const a of av) {
    const n = CHANGUEROS[a.id].nombre;
    if (a.cumplida) { sonar('changa'); avisar(app, `✓ Changa cumplida. Andá a cobrarle a ${n}.`); }
    else if (a.reinicio) avisar(app, 'Pasaste por la posta: la changa de aguante vuelve a 0.');
    else {
      const r = CHANGUEROS[a.id].lista[app.partida.changas[a.id].activa.i].regla;
      const sub = r.familia ? `${r.familia} vencidos` : r.tipo ? `De tipo ${r.tipo}, vencidos` : r.vencer ? `Vencidos${r.momento ? ` ${{ noche: 'de noche', manana: 'de mañana', tarde: 'de tarde' }[r.momento]}` : ''}` : r.atrapar ? 'Atrapados' : r.reventones ? 'Reventones' : r.aguante ? 'Domadores ganados' : 'Hecho';
      const dib = r.familia ? `<svg viewBox="0 0 200 200">${arteBicho(r.familia)}</svg>` : '';
      avisar(app, { titulo: `Changa de ${n}`, sub, dib, n: a.n, total: a.total });
    }
  }
}
function guardarVida(P, info) { for (const [id, f] of Object.entries(info.vida || {})) { const b = P.bichos.find((x) => x.id === Number(id)); if (b) b.vida = f; } }

/** Derrota: aparecés en la última posta, con todos curados (GDD v2, sección 6). */
export function derrota(app) {
  const P = app.partida;
  curarTodos(P);
  P.pos = { prov: P.posta.prov, zona: P.posta.zona, x: null, y: null, enPosta: true };
  avisosChanga(app, registrar(P, { t: 'posta' }));
  app.temporal.derrota = DERROTA[P.posta.prov].map((l) => trato(l, P.avatar));
}

/** Pelea con un bicho suelto (o un mito). s: {familia, nivel, camino, rareza, caracter}. */
export async function pelearSalvaje(app, s, ctx, alFin) {
  const P = app.partida; await cargarBichos();
  const mios = delEquipo(P).map(paraCombate);
  const L0 = nuevoLado(mios, { conservarVida: true });
  const F = FAMILIAS[s.familia];
  const rival = crearBicho(s.familia, { nivel: s.nivel, camino: s.camino, pasiva: s.nivel >= 3 ? F.pasivas[s.nivel % 2] : null });
  const L1 = nuevoLado([rival]);
  marcarVisto(P, s.familia, ctx.lugar, rival.nombre);
  musica('combate'); sonar('salvaje');
  app.ir(() => combate(app, {
    ladoMio: L0, ladoRival: L1, rival: { nombre: rival.nombre, ia: s.caracter }, clima: ctx.clima, arte: BICHOS, guayaca: `<g transform="scale(1.6)">${GUAYACA}</g>`,
    salvaje: { rareza: s.rareza, caracter: s.caracter, mejoras: P.mejoras, lugar: ctx.lugar }, fondo: ctx.prov, momento: momento(P.reloj),
    alTerminar: (res, info) => {
      guardarVida(P, info);
      const mom = momento(P.reloj);
      for (const k of info.kos) avisosChanga(app, registrar(P, { t: 'vence', familia: k.familia, momento: mom, zona: ctx.clave }));
      avisosChanga(app, registrar(P, { t: 'pelea', reventones: info.reventones, reacciones: info.reacciones }));
      if (res === 'capturado') {
        info.kos.push({ por: info.activo ?? delEquipo(P).find((b) => b.vida > 0)?.id, nivel: s.nivel, familia: s.familia });
        const ch = truequePendiente(P, s.familia);
        const equipoFam = delEquipo(P).map((b) => b.familia);
        if (ch) {
          avisosChanga(app, registrar(P, { t: 'trueque', familia: s.familia }));
          marcarVisto(P, s.familia, ctx.lugar); P.libreta.atrapados[s.familia] ??= { dia: dia(P.reloj), zona: ctx.lugar };
        } else {
          const nueva = !P.libreta.atrapados[s.familia];
          const r = atrapar(P, s.familia, s.nivel, s.camino, ctx.lugar);
          if (nueva) { sonar('libreta'); avisar(app, `Nueva hoja en la libreta: ${s.camino ? F.caminos[s.camino - 1] : F.base}.`); }
          if (r.amadrina) avisar(app, `${nombreDe(r.amadrina)} amadrina a ${s.camino ? F.caminos[s.camino - 1] : F.base}: sube a nivel ${r.nivel}.`);
          if (r.lleno) avisar(app, 'Se anotó en la libreta, pero no hay lugar en el corral.');
        }
        avisosChanga(app, registrar(P, { t: 'atrapa', familia: s.familia, momento: mom, clima: ctx.clima, zona: ctx.clave, equipo: equipoFam }));
      }
      const exp = res === 'rajo' || res === 'huyo' ? 0 : repartirExp(app, info, s.rareza, 'salvaje');
      if (exp && (res === 'gano' || res === 'capturado')) avisar(app, `+${Math.round(exp)} de experiencia`);
      // la especie no vuelve a esa zona por un rato; el mito, hasta otro día
      const clave = `${ctx.clave}:${s.familia}`;
      if (s.rareza === 'mito' && res !== 'capturado') { P.ausentes[clave] = (dia(P.reloj)) * 24; }
      else if (res === 'gano') P.ausentes[clave] = P.reloj + 1;
      else if (res !== 'capturado') P.ausentes[clave] = P.reloj + 2;
      if (res === 'perdio') derrota(app);
      alFin?.(res, info);
      app.base('mapa');
    },
  }));
}

/** Sorteo de mates: los 6 de cada lado se tapan, se mezclan y salen 4 al azar; el mito ocupa 2 lugares. */
export function sortearCuatro(rng, eq) {
  const bolsa = [...eq], salen = []; let lugares = 4, tiradas = 0;
  while (lugares > 0 && bolsa.length && tiradas++ < 40) {
    const i = Math.floor(rng.sig() * bolsa.length); const b = bolsa[i];
    const ocupa = FAMILIAS[b.familia]?.mito ? 2 : 1;
    if (ocupa > lugares) { if (bolsa.every((x) => FAMILIAS[x.familia]?.mito)) break; continue; }
    bolsa.splice(i, 1); salen.push(b); lugares -= ocupa;
  }
  return salen;
}
/** El equipo de un rival: sus 6, del nivel de referencia a uno menos (o al de tu equipo en la revancha). */
export function equipoRival(def, nivel, rng) {
  return def.familias.map((f) => {
    const nv = Math.max(1, Math.min(10, nivel - (rng.sig() < 0.5 ? 1 : 0)));
    return crearBicho(f, { nivel: nv, camino: nv >= 4 ? 1 + Math.floor(rng.sig() * 2) : 0, pasiva: nv >= 3 ? FAMILIAS[f].pasivas[Math.floor(rng.sig() * 2)] : null });
  });
}

/**
 * Pelea con un rival de sorteo. o: { ia, nombre, tipo: 'domador'|'capataz'|'ermitano'|'torneo', prov, revancha, clima, equipo (opcional, para el desafío), sinPago, alFin(res, info) }
 */
export async function pelearRival(app, o) {
  const P = app.partida; await cargarBichos();
  const def = rivalPorIA(o.ia);
  const rng = new Rng((Date.now() ^ P.reloj * 1000) & 0x7fffffff);
  const miosTodos = (o.equipo || delEquipo(P)).map(paraCombate);
  if (o.curar) for (const b of miosTodos) b.hp = b.hpmax;
  const vivosMios = miosTodos.filter((b) => b.hp > 0);
  const nivelEq = Math.round(promedio(delEquipo(P).map((b) => b.nivel)));
  const nivel = o.revancha ? Math.max(def.nivel, nivelEq) : def.nivel;
  const suyos = equipoRival(def, nivel, rng);
  const misCuatro = sortearCuatro(rng, vivosMios), susCuatro = sortearCuatro(rng, suyos);
  musica(o.tipo === 'domador' ? 'combate' : 'capataz');
  app.ir(() => pantallaSorteo(app, { o, misCuatro, susCuatro, rng, miosTodos }), { reemplazar: !!o.reemplazar });
}

function pantallaSorteo(app, { o, misCuatro, susCuatro, rng }) {
  const P = app.partida;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Sorteo de mates', () => app.base('mapa'), true));
  const mates = (eq, tuyo) => h('div', { class: 'mates' }, eq.map((b, i) => {
    const el = h(tuyo ? 'button' : 'div', { class: 'mate tapado', type: tuyo ? 'button' : undefined, 'aria-label': b.nombre },
      h('span', { class: 'tapa', html: `<svg viewBox="0 0 48 48">${MATE_NEGRO}</svg>` }),
      h('span', { class: 'dib', html: dibujo(arteBicho(b.nombre), '0 0 200 200') }), h('b', {}, b.apodo || b.nombre), h('i', {}, `Nv ${b.nivel}`));
    if (tuyo) el.addEventListener('click', () => empezar(i));
    return el;
  }));
  const ellos = mates(susCuatro, false), nos = mates(misCuatro, true);
  for (const b of susCuatro) marcarVisto(P, b.familia, ZONAS[P.pos.prov][P.pos.zona].nombre, b.nombre);
  p.append(papel(80, 596, h('div', { class: 'formulario' },
    h('p', { class: 'rotulo centro' }, '¡A los mates! Salen 4 de cada lado.'),
    h('p', { class: 'rotulo' }, o.nombre), ellos,
    h('p', { class: 'rotulo' }, 'Los tuyos. Tocá con cuál arrancás.'), nos,
    h('p', { class: 'nota centro' }, o.clima ? 'Se pelea afuera, con el clima de hoy.' : 'Adentro no hay clima.'))));
  // se destapan de a uno
  const todos = [...ellos.children, ...nos.children];
  todos.forEach((el, k) => setTimeout(() => { el.classList.remove('tapado'); sonar('carta'); }, 500 + k * 180));
  function empezar(i) {
    const L0 = nuevoLado(misCuatro, { conservarVida: true }), L1 = nuevoLado(susCuatro);
    entrar(L0, i); entrar(L1, Math.floor(rng.sig() * susCuatro.length));
    app.ir(() => combate(app, {
      ladoMio: L0, ladoRival: L1, rival: { nombre: o.nombre, ia: o.ia }, clima: o.clima, arte: BICHOS, fondo: o.tipo === 'capataz' || o.tipo === 'torneo' ? (o.galpon || o.ia) : o.prov, momento: momento(P.reloj),
      alTerminar: (res, info) => terminarRival(app, o, res, info),
    }), { reemplazar: true });
  }
  p.foco = nos.querySelector('button');
  return p;
}

function terminarRival(app, o, res, info) {
  const P = app.partida;
  if (!o.curar) guardarVida(P, info);
  const tipoExp = o.tipo === 'torneo' ? 'capataz' : o.tipo;
  const mom = momento(P.reloj);
  for (const k of info.kos) avisosChanga(app, registrar(P, { t: 'vence', familia: k.familia, momento: mom, zona: `${o.prov}:${P.pos.zona}` }));
  avisosChanga(app, registrar(P, { t: 'pelea', reventones: info.reventones, reacciones: info.reacciones }));
  const exp = repartirExp(app, info, 'comun', tipoExp);
  const ganó = res === 'gano';
  const R = (P.rivales[o.ia] ??= { vencido: false, revancha: 0 });
  if (ganó) {
    let paga = 0;
    if (!o.sinPago) {
      const base = o.tipo === 'torneo' ? 0 : INGRESOS[o.prov][o.tipo === 'ermitano' ? 'ermitano' : o.tipo];
      paga = R.vencido ? Math.round(base * REVANCHA) : base;
    }
    if (R.vencido) R.revancha = dia(P.reloj);
    const primera = !R.vencido; R.vencido = true; R.primera = primera;
    if (paga) { P.chirolas += paga; sonar('chirolas'); avisar(app, `+${paga} chirolas`); }
    if (exp) avisar(app, `+${Math.round(exp)} de experiencia`);
    avisosChanga(app, registrar(P, { t: 'gana', rival: o.ia, sinDesmayos: info.desmayados === 0, prov: o.prov }));
  } else if (R.vencido) R.revancha = dia(P.reloj);
  const todosCaidos = delEquipo(P).every((b) => b.vida <= 0);
  if (!ganó && todosCaidos && !o.curar) derrota(app);
  if (o.alFin) o.alFin(res, info); else app.base('mapa');
}

/** ¿Puede desafiar? Hacen falta 6 bichos en el equipo y alguno en pie. */
export function puedeDesafiar(P) { const eq = delEquipo(P); return eq.length >= 6 && eq.some((b) => b.vida > 0); }
export { especie, ZONAS, PROVINCIAS };
