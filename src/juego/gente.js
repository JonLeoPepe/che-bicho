// Charlas con la gente del mapa (vecinos, domadores, changueros, ermitaños) y entrada a los edificios.
import { PERSONAS } from '../arte/personas.js';
import { GENTE as ADULTOS } from '../arte/gente.js';
import { DICHOS, SIN_SEIS, SIN_CHANGA, PROVINCIAS, DIBUJO_CAPATAZ, ABEL, trato } from '../datos/mundo.js';
import { CHANGUEROS, PISTA_MITO } from '../datos/changas.js';
import { PRENDA_ABEL, INGRESOS } from '../datos/tienda.js';
import { FAMILIAS } from '../datos/familias.js';
import { dia, libretaCompleta } from '../nucleo/progreso.js';
import { actualizarOferta, aceptar, cobrarChanga } from '../nucleo/changas.js';
import { dialogo, avisoMapa } from './dialogo.js';
import { pelearRival, puedeDesafiar } from './pelea.js';
import { abrirNegocio, puesto } from './negocios.js';
import { galpon } from './galpon.js';
import { torneo, prendaAbel } from './final.js';
import { sonar } from './sonido.js';

const dib = (n) => PERSONAS[n] || ADULTOS[n] || '';
const TONO = { maestro: 150, domador: 190, changuero: 210, ermitano: 140, vecino: 260 };
const tonada = (prov) => prov;

/** Después de un combate, al volver al mapa, el rival dice su línea. */
function despues(app, quien, dibujo, lineas) { (app.temporal.charlas ??= []).push({ quien, dibujo, lineas }); }

export async function hablarCon(app, p, g, ctx) {
  const P = app.partida, prov = ctx.prov, tr = (t) => trato(t, P.avatar);
  const base = { quien: g.nombre, dibujo: dib(g.dibujo), tono: TONO[g.tipo] || 220, tonada: tonada(prov) };
  const charla = (P.charlas ??= {});
  if (g.tipo === 'vecino') {
    const n = charla[g.id] || 0; charla[g.id] = n + 1;
    await dialogo(p, { ...base, lineas: [tr(g.lineas[n % g.lineas.length])] });
    return;
  }
  if (g.tipo === 'domador') {
    const D = DICHOS[g.id], R = P.rivales[g.id];
    if (!puedeDesafiar(P)) { await dialogo(p, { ...base, lineas: [tr(SIN_SEIS[prov])] }); return; }
    if (R?.vencido) {
      if (R.revancha === dia(P.reloj)) { await dialogo(p, { ...base, lineas: [tr(D.pierde)] }); return; }
      const r = await dialogo(p, { ...base, lineas: [tr(D.revancha)], opciones: [['Pelear', 'si'], ['Ahora no', 'no', 'marron']] });
      if (r !== 'si') return;
    } else await dialogo(p, { ...base, lineas: [tr(D.ver)] });
    await avisoMapa(p, '¡A los mates! Salen 4 de cada lado.', { ms: 900 });
    pelearRival(app, { ia: g.id, nombre: g.nombre, tipo: 'domador', prov, revancha: !!R?.vencido, clima: ctx.clima,
      alFin: (res) => { despues(app, g.nombre, g.dibujo, [tr(res === 'gano' ? D.pierde : D.gana)]); app.base('mapa'); } });
    return new Promise(() => {});
  }
  if (g.tipo === 'changuero') {
    const E = actualizarOferta(P, g.id), L = CHANGUEROS[g.id].lista;
    if (E.activa?.lista) {
      const c = L[E.activa.i];
      const r = await dialogo(p, { ...base, lineas: [tr(c.texto)], detalle: `Paga ${c.paga} chirolas.`, opciones: [['Cobrar', 'si']] });
      if (r !== 'si') return;
      const res = cobrarChanga(P, g.id); sonar('chirolas');
      await avisoMapa(p, `✓ +${res.paga} chirolas`);
      if (res.premio?.mito) { P.libreta.mitos[res.premio.mito] = Math.max(1, P.libreta.mitos[res.premio.mito] || 0); await dialogo(p, { ...base, lineas: [tr(PISTA_MITO[res.premio.mito])] }); }
      if (res.premio?.pista) { P.libreta.pistas[res.premio.pista] = true; await avisoMapa(p, `Pista en la libreta: ${res.premio.pista}.`); }
      if (res.premio?.raroSalta) { const f = ['Ajinina', 'Pasacán', 'Yakusapo'].find((x) => !P.libreta.atrapados[x] && x !== P.inicial); if (f) { P.libreta.pistas[f] = true; await avisoMapa(p, `Pista en la libreta: ${f}.`); } }
      if (res.premio?.pilcha && !P.pilchas.includes(res.premio.pilcha)) { P.pilchas.push(res.premio.pilcha); await avisoMapa(p, '✓ Pilcha nueva en el Ropero.'); }
      app.guardarCallado();
      return;
    }
    if (E.activa) {
      const c = L[E.activa.i];
      const r = await dialogo(p, { ...base, lineas: [tr(c.texto)], detalle: `Llevás ${E.activa.n} de ${E.activa.total}.`, opciones: [['Seguir', 'ok'], ['Largarla', 'largar', 'marron']] });
      if (r === 'largar') { E.activa = null; E.oferta = null; }
      return;
    }
    if (E.oferta !== null) {
      const c = L[E.oferta];
      const r = await dialogo(p, { ...base, lineas: [tr(c.texto)], detalle: `Paga ${c.paga} chirolas.`, opciones: [['Acepto', 'si'], ['Ahora no', 'no', 'marron']] });
      if (r === 'si') { const a = aceptar(P, g.id); if (a.error === 'llenas') await avisoMapa(p, 'Ya tenés 3 changas. Terminá una antes.'); }
      return;
    }
    await dialogo(p, { ...base, lineas: [tr(SIN_CHANGA[prov])] });
    return;
  }
  if (g.tipo === 'ermitano') return ermitano(app, p, g, ctx, base);
  if (g.tipo === 'maestro') return rancho(app, p, ctx);
}

async function ermitano(app, p, g, ctx, base) {
  const P = app.partida, prov = ctx.prov, D = DICHOS[g.id], tr = (t) => trato(t, P.avatar);
  const R = P.rivales[g.id]; const convite = D.convite;
  const charla = (P.charlas ??= {});
  if (!charla[g.id]) { charla[g.id] = 1; await dialogo(p, { ...base, lineas: [tr(D.primera), tr(D.pide)] }); if (!P.mochila[convite]) return; }
  const ops = [];
  if (P.mochila[convite] > 0 && puedeDesafiar(P) && R?.revancha !== dia(P.reloj)) ops.push(['Pelear', 'pelear']);
  if (R?.vencido) ops.push(['Ver el puesto', 'puesto', 'marron']);
  ops.push(['Ahora no', 'no', 'marron']);
  const linea = P.mochila[convite] > 0 ? (puedeDesafiar(P) ? D.con : SIN_SEIS[prov]) : R?.vencido ? D.revancha : D.pide;
  const r = await dialogo(p, { ...base, lineas: [tr(linea)], opciones: ops });
  if (r === 'puesto') { app.ir(() => puesto(app, g.id, prov)); return new Promise(() => {}); }
  if (r !== 'pelear') return;
  P.mochila[convite] -= 1;
  await avisoMapa(p, '¡A los mates! Salen 4 de cada lado.', { ms: 900 });
  pelearRival(app, { ia: g.id, nombre: g.nombre, tipo: 'ermitano', prov, revancha: !!R?.vencido, clima: ctx.clima,
    alFin: (res, info) => {
      const RR = P.rivales[g.id];
      if (res === 'gano' && RR.primera) {
        RR.primera = false;
        P.piedras[prov] = true; P.puestos[g.id] = true;
        const mitos = prov === 'corrientes' ? ['Pombero', 'Yasí Yateré'] : prov === 'salta' ? ['Ucumar'] : ['Coquena'];
        for (const m of mitos) P.libreta.mitos[m] = 2;
        despues(app, g.nombre, g.dibujo, D.pierde.map(tr));
      } else despues(app, g.nombre, g.dibujo, [tr(res === 'gano' ? D.pierde[0] : D.gana)]);
      void info; app.base('mapa');
    } });
  return new Promise(() => {});
}

/** Al tocar un edificio: los negocios, la terminal, el galpón, el tinglado y el rancho de Don Abel. */
export async function entrarA(app, p, e, ctx) {
  const P = app.partida;
  if (e.negocio === 'rancho') return rancho(app, p, ctx);
  if (e.negocio === 'galpon') { app.ir(() => galpon(app, ctx.prov)); return; }
  if (e.negocio === 'torneo') {
    if (!(P.medallas.salta && P.medallas.corrientes && P.medallas.jujuy)) { await avisoMapa(p, 'El Torneo del Norte se abre con las 3 medallas.'); return; }
    app.ir(() => torneo(app)); return;
  }
  return abrirNegocio(app, p, e.negocio, ctx);
}

async function rancho(app, p, ctx) {
  const P = app.partida;
  const base = { quien: 'Don Abel', dibujo: ADULTOS.maestro, tono: 150, tonada: 'salta' };
  // prenda única por libreta completa (economia-v1, sección 7)
  for (const prov of ['salta', 'corrientes', 'jujuy']) {
    if (libretaCompleta(P, PROVINCIAS[prov].nombre) && !P.prendasAbel[prov]) {
      P.prendasAbel[prov] = true; const pr = PRENDA_ABEL[prov];
      if (!P.prendas.includes(pr)) P.prendas.push(pr);
      sonar('insignia');
      app.ir(() => prendaAbel(app, prov));
      app.guardarCallado();
      return;
    }
  }
  await dialogo(p, { ...base, lineas: [ABEL.otra] });
  void ctx; void FAMILIAS; void INGRESOS; void DIBUJO_CAPATAZ;
}
