// Changas: oferta de cada mañana, avance y cobro (anexo changas). Puro, sin navegador.
import { CHANGUEROS, DOMADORES, MAX_ACTIVAS } from '../datos/changas.js';
import { FAMILIAS } from '../datos/familias.js';
import { dia } from './progreso.js';

const estado = (P, id) => (P.changas[id] ??= { idx: 0, vuelta: false, oferta: null, ofertaDia: 0, activa: null, cobradoDia: 0, premios: {} });

export function total(regla) {
  if (regla.vencer) return regla.vencer;
  if (regla.atrapar) return regla.atrapar;
  if (regla.reventones) return regla.reventones;
  if (regla.aguante) return 3;
  return 1;
}
function sePuede(P, c) {
  const d = c.desde;
  if (d === 'siempre') return true;
  if (d === 'seis') return P.equipo.length >= 6;
  if (d.vencido) return !!P.rivales[d.vencido]?.vencido;
  if (d.medalla) return !!P.medallas[d.medalla];
  return true;
}
/** Cada mañana, si no hay una changa suya en curso, prende el fogón con la siguiente que se pueda hacer. */
export function actualizarOferta(P, id) {
  const E = estado(P, id), L = CHANGUEROS[id].lista, hoy = dia(P.reloj);
  if (E.activa || E.oferta !== null) return E;
  if (E.ofertaDia === hoy || E.cobradoDia === hoy) return E;
  for (let k = 0; k < L.length; k++) {
    let i = (E.idx + k) % L.length;
    if (E.vuelta && i === 0 && L[0].premio?.mito) continue;
    if (sePuede(P, L[i])) { E.oferta = i; E.ofertaDia = hoy; return E; }
  }
  return E;
}
export const fogonPrendido = (P, id) => estado(P, id).oferta !== null && !estado(P, id).activa;
export const activas = (P) => Object.entries(P.changas).filter(([, E]) => E.activa).map(([id, E]) => ({ id, E, c: CHANGUEROS[id].lista[E.activa.i] }));

export function aceptar(P, id) {
  const E = estado(P, id);
  if (E.oferta === null) return { error: 'sin' };
  if (activas(P).length >= MAX_ACTIVAS) return { error: 'llenas' };
  const c = CHANGUEROS[id].lista[E.oferta];
  E.activa = { i: E.oferta, n: 0, total: total(c.regla), hechas: [], lista: false };
  E.oferta = null;
  if (c.regla.aguante) P.aguante[c.regla.aguante] = [];
  return { ok: true };
}
export function largar(P, id) { const E = estado(P, id); E.activa = null; }

/** Cobra una changa cumplida: chirolas y, la primera vez, su premio. */
export function cobrarChanga(P, id) {
  const E = estado(P, id); if (!E.activa?.lista) return null;
  const i = E.activa.i, c = CHANGUEROS[id].lista[i];
  const res = { paga: c.paga, premio: null };
  if (c.premio && !E.premios[i]) { E.premios[i] = true; res.premio = c.premio; }
  P.chirolas += c.paga;
  E.activa = null; E.cobradoDia = dia(P.reloj);
  E.idx = (i + 1) % CHANGUEROS[id].lista.length; if (E.idx === 0) E.vuelta = true;
  return res;
}

/**
 * Registra lo que pasó y devuelve los avisos de avance.
 * ev: { t: 'vence', familia, momento, zona } | { t: 'atrapa', familia, momento, clima, zona, equipo }
 *   | { t: 'gana', rival, sinDesmayos, prov } | { t: 'pelea', reventones, reacciones } | { t: 'posta' } | { t: 'trueque', familia }
 */
export function registrar(P, ev) {
  const avisos = [];
  for (const { id, E, c } of activas(P)) {
    const A = E.activa, r = c.regla; if (A.lista) continue;
    const antes = A.n;
    if (ev.t === 'vence' && r.vencer) {
      if ((!r.familia || r.familia === ev.familia) && (!r.tipo || FAMILIAS[ev.familia].tipo === r.tipo) && (!r.momento || r.momento === ev.momento) && (!r.zona || r.zona === ev.zona)) A.n++;
    }
    if (ev.t === 'atrapa' && r.atrapar) {
      const okMom = !r.momento || r.momento === ev.momento, okCli = !r.clima || r.clima === ev.clima, okZona = !r.zona || r.zona === ev.zona;
      const okTipo = !r.soloTipo || ev.equipo.every((f) => FAMILIAS[f].tipo === r.soloTipo);
      const okProv = !r.soloProv || ev.equipo.every((f) => FAMILIAS[f].provincia === r.soloProv);
      const okDist = !r.distintos || !A.hechas.includes(ev.familia);
      if (okMom && okCli && okZona && okTipo && okProv && okDist) { A.n++; A.hechas.push(ev.familia); }
    }
    if (ev.t === 'trueque' && r.trueque === ev.familia) A.n = 1;
    if (ev.t === 'gana' && r.ganar === ev.rival && (!r.sinDesmayos || ev.sinDesmayos)) A.n = 1;
    if (ev.t === 'gana' && r.aguante && DOMADORES[r.aguante].includes(ev.rival)) {
      const L = (P.aguante[r.aguante] ??= []); if (!L.includes(ev.rival)) L.push(ev.rival); A.n = L.length;
    }
    if (ev.t === 'pelea') {
      if (r.reventones) A.n += ev.reventones;
      if (r.reaccion && ev.reacciones.includes(r.reaccion)) A.n = 1;
      if (r.reaccionesPelea && ev.reacciones.length >= r.reaccionesPelea) A.n = 1;
    }
    if (ev.t === 'posta' && r.aguante && A.n > 0) { A.n = 0; P.aguante[r.aguante] = []; avisos.push({ id, reinicio: true }); }
    A.n = Math.min(A.n, A.total);
    if (A.n !== antes && A.n > antes) {
      if (A.n >= A.total) { A.lista = true; avisos.push({ id, cumplida: true }); } else avisos.push({ id, n: A.n, total: A.total });
    }
  }
  return avisos;
}
/** ¿Esta captura va directo a un changuero (trueque en curso)? */
export function truequePendiente(P, familia) {
  return activas(P).find(({ E, c }) => c.regla.trueque === familia && !E.activa.lista)?.id || null;
}
