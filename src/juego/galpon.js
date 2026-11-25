// Galpón del capataz (lote 15f y 17a): pelea sin clima, medalla, herramienta y chirolas; después, revancha y desafío.
import { h, en, boton, cabecera, papel } from '../ui.js';
import { fondoCuero, dibujo } from '../arte/escenas.js';
import { PERSONAS } from '../arte/personas.js';
import { PRENDAS_ICO, MEDALLAS, ICONOS } from '../arte/ui-arte.js';
import { COMBATE } from '../arte/fondos.js';
import { DICHOS, PROVINCIAS, DIBUJO_CAPATAZ, trato } from '../datos/mundo.js';
import { PRENDAS, PRENDA_DESAFIO } from '../datos/tienda.js';
import { FAMILIAS } from '../datos/familias.js';
import { delEquipo, dia, especie } from '../nucleo/progreso.js';
import { dialogo } from './dialogo.js';
import { pelearRival, puedeDesafiar, arteBicho, cargarBichos } from './pelea.js';
import { sonar, jingle } from './sonido.js';

const HERR = { salta: 'machete', corrientes: 'canoa', jujuy: 'soga' };

/** Regla del desafío de cada capataz: devuelve qué bichos no valen y si se cumple. */
export function reglaDesafio(P, capataz) {
  const eq = delEquipo(P);
  if (capataz === 'Anselmo') { const malos = eq.filter((b) => b.familia === P.inicial).map((b) => b.id); return { regla: 'Sin tu primer bicho en el equipo.', malos, ok: eq.length >= 6 && !malos.length }; }
  if (capataz === 'Rosendo') {
    const visto = new Set(); const malos = [];
    for (const b of eq) { const t = FAMILIAS[b.familia].tipo; if (visto.has(t)) malos.push(b.id); visto.add(t); }
    return { regla: '6 bichos de 6 tipos distintos.', malos, ok: eq.length >= 6 && !malos.length };
  }
  const malos = eq.filter((b) => b.nivel > 7).map((b) => b.id);
  return { regla: 'Todos de nivel 7 o menos.', malos, ok: eq.length >= 6 && !malos.length };
}

export function galpon(app, prov) {
  const P = app.partida, tr = (t) => trato(t, P.avatar);
  const cap = PROVINCIAS[prov].capataz, D = DICHOS[cap];
  const dib = PERSONAS[DIBUJO_CAPATAZ[cap]] || '';
  const nombre = `${prov === 'jujuy' ? 'Capataza' : 'Capataz'} ${cap}`;
  const p = h('section', { class: 'pantalla galpon' });
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg"><rect width="360" height="760" fill="#a8845a"/>${COMBATE[cap] || ''}<rect y="400" width="360" height="360" fill="#a8845a"/><path d="M0,400 L360,400" stroke="#2a1c15" stroke-width="2"/><g transform="translate(120 196) scale(1.1)">${dib}</g></svg>` }));
  p.append(cabecera(`Galpón de ${cap}`, () => app.volver(), true));
  const caja = en(h('div', { class: 'galpon-ops' }), 18, 560, 324, 180);
  p.append(caja);
  const R = () => P.rivales[cap];
  async function pelear(desafio = false) {
    if (!puedeDesafiar(P)) { await dialogo(p, { quien: nombre, dibujo: dib, lineas: [tr({ salta: 'Junte 6 bichos y venga, joven.', corrientes: 'Traé 6 bichos y peleamos, che.', jujuy: 'Con 6 bichos te espero, {hijito}.' }[prov])] }); return; }
    const primera = !R()?.vencido;
    if (!desafio) await dialogo(p, { quien: nombre, dibujo: dib, lineas: [tr(D.antes)] });
    pelearRival(app, { ia: cap, nombre, tipo: 'capataz', prov, revancha: !primera && !desafio, clima: null, sinPago: desafio,
      alFin: (res) => {
        const charlas = (app.temporal.charlas ??= []);
        if (res === 'gano' && desafio) {
          const pr = PRENDA_DESAFIO[cap];
          if (!P.prendas.includes(pr)) { P.prendas.push(pr); P.rivales[cap].desafio = true; sonar('insignia'); charlas.push({ quien: nombre, dibujo: DIBUJO_CAPATAZ[cap], lineas: [tr(D.desafioGanado)] }); }
        } else if (res === 'gano' && primera) {
          P.medallas[prov] = true; P.herramientas[HERR[prov]] = true; jingle('medalla'); sonar('insignia');
          charlas.push({ quien: nombre, dibujo: DIBUJO_CAPATAZ[cap], lineas: [tr(D.pierde), tr(D.herramienta)] });
          (app.temporal.avisos ??= []).push(`✓ Medalla: ${PROVINCIAS[prov].medalla}.`);
        } else charlas.push({ quien: nombre, dibujo: DIBUJO_CAPATAZ[cap], lineas: [tr(res === 'gano' ? D.pierde : D.gana)] });
        app.base('mapa');
      } });
  }
  function opciones() {
    caja.replaceChildren();
    const r = R();
    if (!r?.vencido) caja.append(boton(`Pelear con ${cap}`, { onclick: () => pelear() }));
    else {
      const hoy = r.revancha === dia(P.reloj);
      const rb = boton(hoy ? 'Revancha: volvé mañana' : 'Revancha', { onclick: () => pelear() }); rb.disabled = hoy; caja.append(rb);
      if (!r.desafio) caja.append(boton('Desafío', { color: 'verde', onclick: () => app.ir(() => pantallaDesafio(app, prov, cap, nombre, dib, () => pelear(true)), {}) }));
    }
    caja.append(boton('Salir', { color: 'marron', onclick: () => app.volver() }));
  }
  opciones();
  setTimeout(() => dialogo(p, { quien: nombre, dibujo: dib, lineas: [tr(R()?.vencido && !R()?.desafio ? D.desafio : D.entrar)] }), 200);
  p.foco = caja.querySelector('button');
  void MEDALLAS; void ICONOS;
  return p;
}

/** Pantalla del desafío (lote 17a, DC1): la regla, tu equipo con lo que no vale en rojo y el premio. */
function pantallaDesafio(app, prov, cap, nombre, dib, pelear) {
  const P = app.partida;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera(`Desafío de ${cap}`, () => app.volver(), true));
  const { regla, malos, ok } = reglaDesafio(P, cap);
  const pr = PRENDA_DESAFIO[cap];
  const eq = delEquipo(P);
  const grilla = h('div', { class: 'mini-equipo' }, eq.map((b) => h('div', { class: `mini${malos.includes(b.id) ? ' no-vale' : ''}` }, h('span', { html: dibujo(arteBicho(especie(b)), '0 0 200 200') }), h('i', {}, `${especie(b)} ${b.nivel}`))));
  const peleaB = boton('Pelear', { onclick: () => { app.volver(); pelear(); } }); peleaB.disabled = !ok;
  p.append(papel(80, 600, h('div', { class: 'formulario' },
    h('p', { class: 'rotulo' }, 'La regla'), h('h2', {}, regla),
    h('p', { class: 'rotulo' }, 'Tu equipo'), grilla,
    !ok ? h('p', { class: 'error' }, eq.length < 6 ? 'Hacen falta 6 bichos en el equipo.' : 'Lo marcado en rojo no vale.') : h('p', { class: 'nota' }, 'Tu equipo cumple la regla.'),
    h('p', { class: 'rotulo' }, 'El premio'), h('div', { class: 'premio' }, h('span', { html: `<svg viewBox="-4 -4 48 48">${PRENDAS_ICO[pr]}</svg>` }), h('div', {}, h('b', {}, PRENDAS[pr][0]), h('small', {}, PRENDAS[pr][1]))),
    h('div', { class: 'dos' }, boton('Cambiar equipo', { color: 'marron', tam: 'medio', onclick: () => { app.temporal.enPosta = true; app.ir('bichos'); } }), peleaB))));
  cargarBichos();
  void nombre; void dib;
  p.foco = peleaB.disabled ? p.querySelector('button.boton') : peleaB;
  return p;
}
