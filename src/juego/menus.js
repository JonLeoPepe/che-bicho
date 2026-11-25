// Menú del juego (T6) y sus pantallas: Libreta, Bichos (equipo, corral y ficha), Mochila, Personaje y Ropero, Cinto y Mapa.
import { h, en, boton, cabecera, papel } from '../ui.js';
import { fondoCuero, dibujo } from '../arte/escenas.js';
import { ICONOS, PRENDAS_ICO, PILCHAS, MEDALLAS, MONEDA } from '../arte/ui-arte.js';
import { FAMILIAS, PASIVAS } from '../datos/familias.js';
import { DATO } from '../datos/libreta.js';
import { PROVINCIAS, ZONAS, GENTE, trato } from '../datos/mundo.js';
import { ARTICULOS, PRENDAS } from '../datos/tienda.js';
import { CHANGUEROS, PISTA_MITO } from '../datos/changas.js';
import { delEquipo, enCorral, especie, nombreDe, expParaSubir, eleccionPendiente, momento, dia, tomarMate, armarCarpa, libretaCompleta, NOMBRE_MOMENTO, TOPE_REMEDIO } from '../nucleo/progreso.js';
import { activas, largar, fogonPrendido } from '../nucleo/changas.js';
import { cuandoSale } from './libreta-datos.js';
import { arteBicho, cargarBichos } from './pelea.js';
import { fichaEspecie, chipTipo } from './fichas.js';
import { sonar } from './sonido.js';

const icono = (d, vb = '0 0 48 48') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${d}</svg>`;
const pantalla = (app, titulo, ...hijos) => { const p = h('section', { class: 'pantalla' }); p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera(titulo, () => app.volver(), true), ...hijos); return p; };
const mil = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const PROVS = ['salta', 'corrientes', 'jujuy'];

// ---------------- T6: Menú ----------------
export function menuJuego(app) {
  const P = app.partida;
  const items = [
    ['Libreta', ICONOS.pista, () => app.ir('libreta')], ['Bichos', ICONOS.corral, () => app.ir('bichos')], ['Mochila', ICONOS.carpa, () => app.ir('mochila')],
    ['Personaje', '', () => app.ir('personaje')], ['Cinto', MEDALLAS.salta, () => app.ir('cinto'), '-2 -2 30 30'], ['Mapa', ICONOS.pista, () => app.ir('carta')],
  ];
  const grilla = h('div', { class: 'grilla-menu' }, items.map(([t, ico, f, vb]) => {
    const b = h('button', { class: 'item-menu', type: 'button' }, h('span', { html: t === 'Personaje' ? dibujo((PILCHAS[P.pilcha] || PILCHAS.P1)[P.avatar], '20 0 80 120') : icono(ico, vb) }), h('b', {}, t));
    b.addEventListener('click', () => { sonar('boton'); f(); });
    return b;
  }));
  const p = pantalla(app, 'Menú', papel(80, 596, h('div', { class: 'formulario' },
    h('p', { class: 'nota centro' }, `${P.nombre}. Día ${dia(P.reloj)}, ${NOMBRE_MOMENTO[momento(P.reloj)]}. ${mil(P.chirolas)} chirolas.`),
    grilla,
    boton('Volver al juego', { onclick: () => app.volver() }),
    h('div', { class: 'dos' }, boton('Cómo se juega', { color: 'marron', tam: 'medio', onclick: () => app.ir('como') }), boton('Opciones', { color: 'marron', tam: 'medio', onclick: () => app.ir('opciones') })),
    boton('Guardar', { color: 'verde', tam: 'medio', onclick: async () => { await app.guardarCallado(); app.aviso('Aventura guardada.'); } }))));
  p.foco = grilla.querySelector('button');
  return p;
}

// ---------------- Libreta de campo ----------------
export function libreta(app) {
  const P = app.partida;
  let prov = PROVS.includes(P.pos.prov) ? P.pos.prov : 'salta';
  const cuerpo = h('div', { class: 'libreta' });
  const tabs = h('div', { class: 'segmentos' }, PROVS.map((k) => { const b = h('button', { type: 'button', role: 'radio' }, PROVINCIAS[k].nombre); b.addEventListener('click', () => { prov = k; pintar(); }); return b; }));
  const p = pantalla(app, 'Libreta', papel(70, 676, h('div', { class: 'formulario' }, tabs, cuerpo)));
  async function pintar() {
    await cargarBichos();
    tabs.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-checked', String(PROVS[i] === prov)));
    const nombre = PROVINCIAS[prov].nombre;
    const fams = Object.entries(FAMILIAS).filter(([, F]) => F.provincia === nombre);
    const atr = fams.filter(([k, F]) => !F.mito && P.libreta.atrapados[k]).length, tot = fams.filter(([, F]) => !F.mito).length;
    cuerpo.replaceChildren(
      h('p', { class: 'nota' }, libretaCompleta(P, nombre) ? `¡Libreta de ${nombre} completa!` : `${atr} de ${tot} familias atrapadas.`),
      ...fams.map(([k, F]) => {
        const visto = P.libreta.vistos[k], at = P.libreta.atrapados[k];
        const formas = [F.base, ...F.caminos];
        const fila = h('button', { class: 'fila-libreta', type: 'button' }, ...formas.map((n) => {
          const tiene = P.libreta.formas[n];
          return h('span', { class: `forma ${tiene ? 'tiene' : visto ? 'visto' : 'sin'}`, html: dibujo(arteBicho(n), '0 0 200 200') + (tiene ? '<svg class="tilde" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#2f7d5b"/><path d="M5,10 L9,14 L15,6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>' : '') });
        }), h('b', {}, visto || at ? F.base : 'Sin ver'));
        fila.addEventListener('click', () => hojaFamilia(app, prov, k));
        return fila;
      }));
  }
  pintar();
  return p;
}
function hojaFamilia(app, prov, k) {
  const P = app.partida, F = FAMILIAS[k];
  const visto = P.libreta.vistos[k], at = P.libreta.atrapados[k];
  const capa = h('div', { class: 'ficha-capa' });
  const datos = [];
  if (!visto && !at) datos.push(h('p', { class: 'nota' }, 'Sin ver'));
  else {
    datos.push(h('p', { class: 'nota' }, at ? `Atrapado el día ${at.dia}, en ${at.zona}.` : `Visto en ${visto}.`));
    datos.push(h('p', { class: 'dato' }, DATO[k] || ''));
  }
  if (F.mito) {
    const n = P.libreta.mitos[k] || 0;
    const rincon = Object.values(ZONAS[prov]).find((z) => z.bichos.some((b) => b.familia === k));
    if (n >= 1) datos.push(h('p', { class: 'nota' }, `${rincon?.nombre || ''}. Cuándo sale: ${n >= 2 ? cuandoSale(prov, k).replace(/^[^,]*, /, '') : 'falta una pista'}.`));
  } else if (P.libreta.pistas[k] || at) datos.push(h('p', { class: 'nota' }, `Cuándo sale: ${cuandoSale(prov, k)}.`));
  capa.append(en(h('div', { class: 'papel ficha-larga' }, visto || at ? fichaEspecie(k) : h('div', { class: 'sombra', html: dibujo(arteBicho(k), '0 0 200 200') }), ...datos, boton('Volver', { color: 'marron', tam: 'medio', onclick: () => capa.remove() })), 10, 24, 340, 726));
  document.querySelector('.pantalla').append(capa);
}

// ---------------- Bichos: equipo, corral, ficha, pasiva, camino, prendas, limpia ----------------
export function bichos(app) {
  const P = app.partida;
  const enPosta = !!app.temporal.enPosta; const limpia = !!app.temporal.limpia; const ponerPrenda = app.temporal.ponerPrenda || null;
  app.temporal.enPosta = false; app.temporal.limpia = false; app.temporal.ponerPrenda = null;
  let elegido = null; // para cambiar del corral al equipo
  const cuerpo = h('div', { class: 'formulario' });
  const p = pantalla(app, limpia ? 'Limpia de ruda' : ponerPrenda ? 'Poner la prenda' : 'Bichos', papel(70, 676, cuerpo));
  const tarjeta = (b, onclick, marcado) => {
    const f = b.vida;
    const el = h('button', { class: `tarjeta-bicho${marcado ? ' marcado' : ''}${f <= 0 ? ' caido' : ''}`, type: 'button' },
      h('span', { class: 'dib', html: dibujo(arteBicho(especie(b)), '0 0 200 200') }),
      h('b', {}, nombreDe(b)), h('small', {}, `Nv ${b.nivel}`), h('i', { class: 'vida' }, h('em', { style: { width: `${Math.round(f * 100)}%` } })),
      eleccionPendiente(b) ? h('span', { class: 'punto', title: 'Tiene algo para elegir' }) : null);
    el.addEventListener('click', onclick); return el;
  };
  async function pintar() {
    await cargarBichos();
    const eq = delEquipo(P), co = enCorral(P);
    const nota = limpia ? 'Tocá el bicho para la limpia.' : ponerPrenda ? `Tocá un bicho de nivel 3 o más para ponerle: ${PRENDAS[ponerPrenda][0]}.` : enPosta ? 'Tocá uno del corral y después uno del equipo para cambiarlos.' : 'El equipo se cambia en el corral de cualquier posta.';
    cuerpo.replaceChildren(
      h('p', { class: 'nota' }, nota),
      h('p', { class: 'sub' }, `Equipo (${eq.length} de 6)`),
      h('div', { class: 'grilla-bichos' }, eq.map((b) => tarjeta(b, () => tocar(b, true), elegido === b.id))),
      enPosta || co.length ? h('p', { class: 'sub' }, `Corral (${co.length} de ${P.corralCap})`) : null,
      h('div', { class: 'grilla-bichos' }, co.map((b) => tarjeta(b, () => tocar(b, false), elegido === b.id))),
      boton('Volver', { color: 'marron', tam: 'medio', onclick: () => app.volver() }));
  }
  function tocar(b, enEq) {
    if (limpia) return hacerLimpia(b);
    if (ponerPrenda) { if (b.nivel < 3) { app.aviso('Se pone a un bicho de nivel 3 o más.'); return; } for (const x of P.bichos) if (x.prenda === ponerPrenda) x.prenda = null; b.prenda = ponerPrenda; app.aviso(`${nombreDe(b)} lleva ${PRENDAS[ponerPrenda][0]}.`); app.guardarCallado(); app.volver(); return; }
    if (enPosta && elegido !== null) {
      const otro = P.bichos.find((x) => x.id === elegido); const otroEnEq = P.equipo.includes(otro.id);
      if (otro.id === b.id) { elegido = null; return pintar(); }
      if (otroEnEq !== enEq) {
        const [deEq, deCo] = otroEnEq ? [otro, b] : [b, otro];
        P.equipo = P.equipo.map((id) => (id === deEq.id ? deCo.id : id)); elegido = null; sonar('relevo'); app.guardarCallado(); return pintar();
      }
      elegido = b.id; return pintar();
    }
    if (enPosta && !enEq && P.equipo.length < 6) { P.equipo.push(b.id); app.guardarCallado(); return pintar(); }
    if (enPosta) { elegido = b.id; pintar(); return; }
    fichaPropia(app, b, pintar);
  }
  function hacerLimpia(b) {
    const cuesta = (b.rudas || 0) + 1;
    if (!b.pasiva && !b.camino) { app.aviso('No tiene pasiva ni camino para borrar.'); return; }
    if (P.mochila.ruda < cuesta) { app.aviso(`Hacen falta ${cuesta} rudas.`); return; }
    P.mochila.ruda -= cuesta; b.rudas = cuesta; b.pasiva = null; b.camino = 0; sonar('camino');
    app.aviso(trato({ salta: 'Con la ruda le borro el camino y elige de nuevo.', corrientes: 'Con la ruda le sacamos el camino.', jujuy: 'La ruda le limpia el camino, {hijito}.' }[P.pos.prov] || '', P.avatar));
    app.guardarCallado(); fichaPropia(app, b, pintar);
  }
  if (P.bichos.length && !limpia && !ponerPrenda && !enPosta) { const pend = delEquipo(P).find((b) => eleccionPendiente(b)); if (pend) setTimeout(() => fichaPropia(app, pend, pintar), 50); }
  pintar();
  return p;
}
/** T10: ficha de un bicho propio, con su pasiva y su camino para elegir, su prenda, remedios y apodo. */
function fichaPropia(app, b, alCerrar) {
  const P = app.partida, F = FAMILIAS[b.familia];
  const capa = h('div', { class: 'ficha-capa' });
  const cont = h('div', { class: 'papel ficha-larga' });
  capa.append(en(cont, 10, 24, 340, 726));
  document.querySelector('.pantalla').append(capa);
  const cerrar = () => { capa.remove(); alCerrar?.(); };
  function pintar() {
    const pend = eleccionPendiente(b);
    const apodo = h('input', { class: 'campo', maxlength: 14, placeholder: 'Apodo', 'aria-label': 'Apodo' }); apodo.value = b.apodo || '';
    apodo.addEventListener('change', () => { b.apodo = apodo.value.trim().slice(0, 14); app.guardarCallado(); });
    const elegir = [];
    if (pend === 'pasiva') elegir.push(h('p', { class: 'sub' }, `${nombreDe(b)} puede elegir su pasiva.`), h('div', { class: 'dos' }, F.pasivas.map((k) => boton(PASIVAS[k][0], { color: 'verde', tam: 'medio', onclick: () => { b.pasiva = k; sonar('nivel'); app.guardarCallado(); pintar(); } }))), h('p', { class: 'nota' }, F.pasivas.map((k) => `${PASIVAS[k][0]}: ${PASIVAS[k][1]}.`).join(' ')));
    if (pend === 'camino') elegir.push(h('p', { class: 'sub' }, `${nombreDe(b)} puede elegir su camino.`), h('div', { class: 'caminos' }, F.caminos.map((c, i) => { const bt = h('button', { type: 'button', class: 'camino-op' }, h('span', { html: dibujo(arteBicho(c), '0 0 200 200') }), h('b', {}, c), h('small', {}, i === 0 ? 'Golpe fuerte (100)' : 'Técnica de efecto')); bt.addEventListener('click', () => { b.camino = i + 1; sonar('camino'); app.guardarCallado(); pintar(); }); return bt; })));
    const remedios = ['peperina', 'cedron', 'jarilla', 'sahumerio'].filter((k) => P.mochila[k] > 0 && (k === 'sahumerio' ? b.vida <= 0 : b.vida > 0 && b.vida < 1));
    const prendas = P.prendas;
    cont.replaceChildren(
      ...elegir,
      fichaEspecie(b.familia, { camino: b.camino, nivel: b.nivel, pasiva: b.pasiva }),
      h('p', { class: 'nota' }, `Nivel ${b.nivel}. Experiencia ${b.nivel >= 10 ? 'completa' : `${Math.round(b.exp)} de ${expParaSubir(b.nivel)}`}. Vida ${Math.round(b.vida * 100)} %.`),
      b.pasiva ? h('p', { class: 'nota' }, `Pasiva: ${PASIVAS[b.pasiva][0]}. ${PASIVAS[b.pasiva][1]}.`) : null,
      h('p', { class: 'nota' }, `Prenda: ${b.prenda ? PRENDAS[b.prenda][0] : 'ninguna'}.${b.nivel < 3 ? ' Desde el nivel 3.' : ''}`),
      b.nivel >= 3 && prendas.length ? h('div', { class: 'prendas' }, prendas.map((k) => { const bt = h('button', { type: 'button', class: `prenda-op${b.prenda === k ? ' puesta' : ''}`, title: PRENDAS[k][0], html: icono(PRENDAS_ICO[k], '-4 -4 48 48') }); bt.addEventListener('click', () => { if (b.prenda === k) b.prenda = null; else { for (const x of P.bichos) if (x.prenda === k) x.prenda = null; b.prenda = k; } app.guardarCallado(); pintar(); }); return bt; })) : null,
      remedios.length ? h('div', { class: 'dos' }, remedios.map((k) => boton(`${ARTICULOS[k].nombre} (${P.mochila[k]})`, { color: 'verde', tam: 'chico', onclick: () => { P.mochila[k] -= 1; b.vida = k === 'sahumerio' ? 0.5 : Math.min(1, b.vida + ARTICULOS[k].remedio); sonar('nivel'); app.guardarCallado(); pintar(); } }))) : null,
      h('label', { class: 'etiqueta' }, h('span', {}, 'Apodo'), apodo),
      boton('Volver', { color: 'marron', tam: 'medio', onclick: cerrar }));
  }
  pintar();
}

// ---------------- Mochila ----------------
export function mochila(app) {
  const P = app.partida;
  let tab = 'remedios';
  const cuerpo = h('div', {});
  const tabs = h('div', { class: 'segmentos' }, [['remedios', 'Remedios'], ['camino', 'Camino'], ['equipo', 'Equipo'], ['herr', 'Herram.'], ['changas', 'Changas']].map(([k, t]) => { const b = h('button', { type: 'button', role: 'radio', 'data-k': k }, t); b.addEventListener('click', () => { tab = k; pintar(); }); return b; }));
  const p = pantalla(app, 'Mochila', papel(70, 676, h('div', { class: 'formulario' }, tabs, cuerpo)));
  const fila = (ico, n, l, der, onclick, vb) => { const b = h('button', { class: 'fila-tienda', type: 'button' }, h('span', { class: 'ico', html: icono(ico, vb) }), h('span', { class: 'txt' }, h('b', {}, n), h('small', {}, l)), h('span', { class: 'der' }, der)); if (onclick) b.addEventListener('click', onclick); else b.disabled = true; return b; };
  function pintar() {
    tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.k === tab)));
    const L = [];
    if (tab === 'remedios') {
      L.push(h('p', { class: 'nota' }, 'Se usan fuera de combate, desde la ficha de cada bicho.'));
      for (const k of ['peperina', 'cedron', 'jarilla', 'sahumerio']) L.push(fila(ICONOS[k], ARTICULOS[k].nombre, ARTICULOS[k].uso, `${P.mochila[k]} de ${TOPE_REMEDIO}`, P.mochila[k] ? () => app.ir('bichos') : null));
    }
    if (tab === 'camino') {
      const usar = (k) => async () => {
        if (k === 'mate') { const t = tomarMate(P.reloj); if (t === null) { app.aviso('Ya es de noche: el mate no alcanza.'); return; } P.mochila.mate -= 1; P.reloj = t; sonar('mate'); app.aviso(`Pasó la ${NOMBRE_MOMENTO[momento(P.reloj - 0.01)]}.`); }
        if (k === 'carpa') { const Z = ZONAS[P.pos.prov][P.pos.zona]; const t = armarCarpa(P.reloj); if (t === null || Z.pueblo) { app.aviso('Solo se arma de noche y fuera del pueblo.'); return; } P.mochila.carpa -= 1; sonar('carpa'); await carpa(app); P.reloj = t; }
        if (k === 'palosanto' || k === 'miel') { P.mochila[k] -= 1; P.olor = { tipo: k, hasta: P.reloj + 3 }; app.aviso(k === 'miel' ? 'La miel atrae a los salvajes un rato.' : 'El humo aleja a los salvajes un rato.'); }
        app.guardarCallado(); pintar();
      };
      for (const k of ['mate', 'carpa', 'palosanto', 'miel']) L.push(fila(ICONOS[k], ARTICULOS[k].nombre, ARTICULOS[k].uso, `${P.mochila[k]} de ${TOPE_REMEDIO}`, P.mochila[k] ? usar(k) : null));
      for (const k of ['chipa', 'tamales', 'empanadas', 'ruda']) L.push(fila(ICONOS[k], ARTICULOS[k].nombre, ARTICULOS[k].uso, `${P.mochila[k]}`, null));
    }
    if (tab === 'equipo') {
      if (!P.prendas.length) L.push(h('p', { class: 'nota' }, 'Todavía no tenés prendas. Se compran en las ferias.'));
      for (const k of P.prendas) { const quien = P.bichos.find((b) => b.prenda === k); L.push(fila(PRENDAS_ICO[k], PRENDAS[k][0], PRENDAS[k][1], quien ? nombreDe(quien) : 'Sin poner', () => { app.temporal.ponerPrenda = k; app.ir('bichos'); }, '-4 -4 48 48')); }
    }
    if (tab === 'herr') {
      L.push(fila(ICONOS.boleadora, 'Boleadora', 'Para atrapar bichos. Nunca se gasta.', `${P.mejoras} de 3 mejoras`, null));
      for (const [k, n, d] of [['machete', 'Machete', 'Abre paso en el monte cerrado.'], ['canoa', 'Canoa', 'Cruza el canal del estero.'], ['soga', 'Soga', 'Sube el risco de las cumbres.']]) if (P.herramientas[k]) L.push(fila(ICONOS[k], n, d, '', null));
      for (const prov of PROVS) if (P.piedras[prov]) L.push(fila(ICONOS.piedra, `Piedra de la Pachamama (${PROVINCIAS[prov].nombre})`, 'Durante 10 combates, ×2 de experiencia a los que van 2 niveles abajo.', P.piedra > 0 ? `Activa: quedan ${P.piedra}` : 'Usar', P.piedra > 0 ? null : () => { P.piedras[prov] = false; P.piedra = 10; app.aviso('Piedra de la Pachamama: quedan 10 combates.'); app.guardarCallado(); pintar(); }));
    }
    if (tab === 'changas') {
      const A = activas(P).sort((a, b) => Number(b.E.activa.lista) - Number(a.E.activa.lista));
      if (!A.length) L.push(h('p', { class: 'nota' }, 'No tenés changas en curso. Buscá los fogones prendidos.'));
      for (const { id, E, c } of A) {
        const nom = CHANGUEROS[id].nombre;
        const el = h('div', { class: `changa${E.activa.lista ? ' lista' : ''}` }, h('b', {}, `Changa de ${nom}`), h('small', {}, trato(c.texto, P.avatar)),
          E.activa.lista ? h('em', { class: 'cobrar' }, 'A cobrar') : h('span', { class: 'barra' }, h('span', { class: 'pista' }, h('i', { style: { width: `${100 * E.activa.n / E.activa.total}%` } })), h('em', {}, `${E.activa.n} de ${E.activa.total}`)));
        if (!E.activa.lista) { const lg = boton('Largar', { color: 'marron', tam: 'chico', onclick: () => { largar(P, id); app.guardarCallado(); pintar(); } }); el.append(lg); }
        L.push(el);
      }
    }
    cuerpo.replaceChildren(...L);
  }
  pintar();
  return p;
}
/** Carpa (lote 14g): la rueda del día gira unos 2 segundos y es de mañana. */
function carpa(app) {
  return new Promise((r) => {
    const capa = h('div', { class: 'ficha-capa carpa' }, h('div', { class: 'rueda-dia', html: '<svg viewBox="-60 -60 120 120"><circle r="56" fill="#23365a" stroke="#2a1c15" stroke-width="3"/><path d="M0,0 L0,-56 A56,56 0 0,1 48.5,28Z" fill="#2f7fb8"/><path d="M0,0 L48.5,28 A56,56 0 0,1 -48.5,28Z" fill="#e7b93a"/><circle r="6" fill="#fbf3e2"/></svg>' }));
    document.querySelector('.pantalla').append(capa);
    setTimeout(() => { capa.remove(); app.aviso('Ya es de mañana.'); r(); }, 2000);
  });
}

// ---------------- Personaje y Ropero (T17 y T18) ----------------
export function personaje(app) {
  const P = app.partida;
  const dib = h('div', { class: 'personaje-dib' });
  const ropero = h('div', { class: 'ropero' });
  const p = pantalla(app, 'Personaje', papel(70, 676, h('div', { class: 'formulario' }, dib, h('h2', { class: 'centro' }, P.nombre),
    h('p', { class: 'nota centro' }, `Día ${dia(P.reloj)}. ${Object.values(P.medallas).filter(Boolean).length} de 3 medallas. ${Object.keys(P.libreta.atrapados).length} familias atrapadas.`),
    P.campeon ? boton('Libreta de campeones', { color: 'verde', tam: 'medio', onclick: () => import('./final.js').then((m) => app.ir(() => m.libretaCampeones(app, () => app.volver()))) }) : null,
    h('p', { class: 'sub' }, 'Ropero'), ropero)));
  function pintar() {
    dib.innerHTML = dibujo((PILCHAS[P.pilcha] || PILCHAS.P1)[P.avatar], '0 0 120 216');
    ropero.replaceChildren(...Object.entries(PILCHAS).filter(([k]) => P.pilchas.includes(k)).map(([k, v]) => { const b = h('button', { type: 'button', class: `pilcha-op${P.pilcha === k ? ' puesta' : ''}` }, h('span', { html: dibujo(v[P.avatar], '20 0 80 216') }), h('small', {}, v.nombre)); b.addEventListener('click', () => { P.pilcha = k; app.guardarCallado(); pintar(); }); return b; }));
  }
  pintar();
  return p;
}

// ---------------- Cinto de insignias ----------------
export function cinto(app) {
  const P = app.partida;
  const p = pantalla(app, 'Cinto', papel(70, 400, h('div', { class: 'formulario' }, h('div', { class: 'cinto' }, PROVS.map((k) => h('div', { class: `insignia${P.medallas[k] ? ' ganada' : ''}` }, h('span', { html: icono(MEDALLAS[k], '-2 -2 30 30') }), h('b', {}, PROVINCIAS[k].medalla), h('small', {}, P.medallas[k] ? `Capataz ${PROVINCIAS[k].capataz}, ganada` : PROVINCIAS[k].nombre)))),
    h('p', { class: 'nota centro' }, 'Con las 3 medallas se abre el Torneo del Norte, en el tinglado de Salta capital.'))));
  return p;
}

// ---------------- Mapa: carta antigua de la provincia (lote 16a) ----------------
export function carta(app) {
  const P = app.partida;
  let prov = P.pos.prov;
  const lienzo = h('div', { class: 'carta' });
  const tabs = h('div', { class: 'segmentos' }, PROVS.map((k) => { const b = h('button', { type: 'button', role: 'radio' }, PROVINCIAS[k].nombre); b.addEventListener('click', () => { prov = k; pintar(); }); return b; }));
  const p = pantalla(app, 'Mapa', papel(70, 676, h('div', { class: 'formulario' }, tabs, lienzo, h('p', { class: 'nota' }, 'La niebla de papel tapa lo que no recorriste. La llamita marca un fogón con changa.'))));
  const INK = '#5a3a22';
  function pintar() {
    tabs.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-checked', String(PROVS[i] === prov)));
    const zs = ZONAS[prov]; const pos = { [PROVINCIAS[prov].inicio]: [0, 0] }; const cola = [PROVINCIAS[prov].inicio];
    const D = { arriba: [0, -1], abajo: [0, 1], izquierda: [-1, 0], derecha: [1, 0] };
    while (cola.length) { const z = cola.shift(); for (const [lado, dest] of Object.entries(zs[z].salidas)) if (zs[dest] && !pos[dest]) { pos[dest] = [pos[z][0] + D[lado][0], pos[z][1] + D[lado][1]]; cola.push(dest); } }
    const xs = Object.values(pos).map((v) => v[0]), ys = Object.values(pos).map((v) => v[1]);
    const k = 74, ox = 150 - ((Math.min(...xs) + Math.max(...xs)) / 2) * k, oy = 230 - ((Math.min(...ys) + Math.max(...ys)) / 2) * k;
    const X = (z) => ox + pos[z][0] * k, Y = (z) => oy + pos[z][1] * k;
    const lineas = Object.keys(pos).flatMap((z) => Object.values(zs[z].salidas).filter((d) => pos[d]).map((d) => `<path d="M${X(z)},${Y(z)} L${X(d)},${Y(d)}" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/>`)).join('');
    const nodos = Object.keys(pos).map((z) => {
      const vis = P.visitadas[`${prov}:${z}`], Z = zs[z];
      const fogon = (GENTE[prov][z] || []).some((g) => g.tipo === 'changuero' && fogonPrendido(P, g.id));
      const galpon = z === { salta: 'z3', corrientes: 'z4', jujuy: 'z3' }[prov];
      return `<g transform="translate(${X(z)} ${Y(z)})">${vis ? `<circle r="22" fill="#f1e3bd" stroke="${INK}" stroke-width="2"/>` : `<circle r="24" fill="#d8c8a0" opacity=".95"/><path d="M-20,-6 C-10,-14 8,-14 20,-4 M-18,8 C-6,2 6,4 18,10" stroke="#c9b48a" stroke-width="3" fill="none"/>`}
        ${vis ? `<text y="38" font-family="Caveat" font-size="15" text-anchor="middle" fill="${INK}">${Z.nombre.replace(/[&<>]/g, '')}</text>` : ''}
        ${z === P.pos.zona && prov === P.pos.prov ? `<circle r="6" fill="#c8362b" stroke="${INK}" stroke-width="1.4"/>` : ''}
        ${galpon && vis ? `<g transform="translate(-34 -34) scale(.8)">${MEDALLAS[prov]}</g>${P.medallas[prov] ? '<circle cx="-12" cy="-12" r="6" fill="#2f7d5b"/>' : ''}` : ''}
        ${Z.rincon && vis ? `<g transform="translate(10 -36) scale(.5)" ${P.herramientas[{ salta: 'machete', corrientes: 'canoa', jujuy: 'soga' }[prov]] ? '' : 'opacity=".35"'}>${ICONOS[{ salta: 'machete', corrientes: 'canoa', jujuy: 'soga' }[prov]]}</g>` : ''}
        ${fogon && vis ? `<path d="M14,10 C10,4 16,0 15,-6 C20,-1 22,4 18,10Z" fill="none" stroke="${INK}" stroke-width="2"/>` : ''}</g>`;
    }).join('');
    lienzo.innerHTML = `<svg viewBox="0 0 300 470" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="470" rx="10" fill="#efe0bc" stroke="${INK}" stroke-width="2"/>${lineas}${nodos}</svg>`;
  }
  pintar();
  void MONEDA; void PISTA_MITO; void chipTipo;
  return p;
}
