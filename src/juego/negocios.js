// Negocios (GDD v2, sección 5; lotes 15c, 14d y 39): arriba el interior con quien atiende y abajo la hoja de la tienda.
// Posta, almacén, curandera, feria, terminal y el puesto escondido de cada ermitaño. Nada se revende.
import { h, en, boton } from '../ui.js';
import { fondoCuero, dibujo } from '../arte/escenas.js';
import { PERSONAS } from '../arte/personas.js';
import { INTERIOR, ICONOS, PRENDAS_ICO, PILCHAS, MONEDA } from '../arte/ui-arte.js';
import { ATIENDE, SALUDOS, PROVINCIAS, ZONAS, trato } from '../datos/mundo.js';
import { ARTICULOS, PRENDAS, PRENDAS_FERIA, PILCHAS_FERIA, PILCHA_ERMITANO, PRECIO_MATE, PRECIO_ENCARGO, PRECIO_PRENDA_FERIA, PRECIO_MEJORA, CORRAL, pasaje } from '../datos/tienda.js';
import { FAMILIAS } from '../datos/familias.js';
import { BICHOS_POR } from './libreta-datos.js';
import { TOPE_REMEDIO, curarTodos, delEquipo, especie } from '../nucleo/progreso.js';
import { registrar } from '../nucleo/changas.js';
import { CHANGUEROS } from '../datos/changas.js';
import { dialogo, avisoMapa } from './dialogo.js';
import { arteBicho, cargarBichos } from './pelea.js';
import { sonar } from './sonido.js';

const FONDO_K = { posta: ['posta', 'posta_c', 'posta_j'], almacen: ['almacen', 'almacen_c', 'almacen_j'], curandera: ['curandera', 'curandera_c', 'curandera_j'], feria: ['feria', 'feria_c', 'feria_j'] };
const IDX = { salta: 0, corrientes: 1, jujuy: 2 };
const TITULO = { posta: 'Posta', almacen: 'Almacén', curandera: 'Curandera', feria: 'Feria' };
const icono = (d, vb = '0 0 48 48') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${d}</svg>`;
const chirola = () => h('span', { class: 'chirola', html: icono(`<g transform="translate(24 24) scale(1.5)">${MONEDA}</g>`) });
const mil = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/** Pantalla de un negocio: interior arriba y la hoja abajo. */
function hoja(app, { tipo, prov, quien, dib, saludo, secciones, extra }) {
  const P = app.partida;
  const p = h('section', { class: 'pantalla negocio' });
  const k = FONDO_K[tipo]?.[IDX[prov]];
  const interior = k ? `<svg viewBox="0 110 360 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${INTERIOR[k]}<g transform="translate(102 128) scale(1.3)">${dib}</g><rect x="24" y="340" width="312" height="74" rx="6" fill="#8a5a34" stroke="#2a1c15" stroke-width="3"/><rect x="18" y="330" width="324" height="16" rx="5" fill="#b07a46" stroke="#2a1c15" stroke-width="3"/></svg>` : '';
  p.append(h('div', { class: 'fondo', html: fondoCuero() }));
  const plata = h('span', { class: 'plata' }, chirola(), h('b', {}, mil(P.chirolas)));
  p.append(en(h('header', { class: 'cabecera cabecera-clara' }, h('button', { class: 'volver volver-claro', type: 'button', 'aria-label': 'Volver', onclick: () => app.volver(), html: '<span><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#7a4a2a" stroke="#2a1c15" stroke-width="2"/><path d="M22,10 L13,18 L22,26" stroke="#fbf3e2" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' }), h('h1', {}, TITULO[tipo] || tipo), plata), 0, 0, 360));
  if (interior) p.append(en(h('div', { class: 'interior', html: interior }), 0, 56, 360, 190));
  const saludoEl = en(h('p', { class: 'saludo-negocio' }, h('b', {}, quien), ' ', saludo), 12, interior ? 252 : 64, 336);
  p.append(saludoEl);
  const lista = en(h('div', { class: 'lista-tienda' }), 12, interior ? 292 : 104, 336, interior ? 456 : 644);
  p.append(lista);
  const repintar = () => { plata.querySelector('b').textContent = mil(P.chirolas); lista.replaceChildren(...secciones().flatMap(([tit, filas]) => [h('p', { class: 'sub' }, tit), ...filas])); };
  repintar();
  p.repintar = repintar;
  if (extra) extra(p);
  p.foco = lista.querySelector('button');
  return p;
}
/** Una fila de la hoja; al tocarla se abre su ficha. */
function fila(app, _p, { ico, nombre, linea, precio, tenes, max, puede = () => true, comprar, motivo, boton: txtBoton, vb }) {
  const P = app.partida;
  const der = h('span', { class: 'der' });
  if (precio !== undefined && precio !== null) der.append(chirola(), h('b', {}, mil(precio)));
  if (tenes !== undefined) der.append(h('i', {}, max ? `tenés ${tenes} de ${max}` : tenes));
  const b = h('button', { class: 'fila-tienda', type: 'button' }, h('span', { class: 'ico', html: icono(ico, vb) }), h('span', { class: 'txt' }, h('b', {}, nombre), h('small', {}, linea)), der);
  b.addEventListener('click', () => ficha());
  function ficha() {
    const p = document.querySelector('.pantalla.negocio');
    const capa = h('div', { class: 'ficha-capa' });
    const falta = precio ? precio - P.chirolas : 0;
    const lleno = max && tenes >= max;
    const no = !puede() ? (motivo?.() || 'No se puede.') : falta > 0 ? `Te faltan ${mil(falta)} chirolas.` : lleno ? `Ya tenés ${max}. No te entran más.` : null;
    const comprarB = boton(txtBoton || 'Comprar', { color: 'verde', tam: 'medio', onclick: async () => {
      if (no) { sonar('no'); return; }
      if (precio) P.chirolas -= precio;
      sonar('chirolas'); await comprar(); capa.remove(); p.repintar(); app.guardarCallado();
    } });
    if (no) comprarB.disabled = true;
    capa.append(en(h('div', { class: 'ficha papel' },
      h('div', { class: 'ficha-ico', html: icono(ico, vb) }), h('h2', {}, nombre), h('p', {}, linea),
      precio ? h('p', { class: 'precio' }, chirola(), h('b', {}, `${mil(precio)} chirolas`)) : null,
      tenes !== undefined ? h('p', { class: 'nota' }, max ? `Tenés ${tenes} de ${max}.` : String(tenes)) : null,
      no ? h('p', { class: 'error' }, no) : null,
      h('div', { class: 'dos' }, boton('Volver', { color: 'marron', tam: 'medio', onclick: () => capa.remove() }), comprarB)), 30, 150, 300));
    p.append(capa); comprarB.focus();
  }
  return b;
}

export async function abrirNegocio(app, pMapa, tipo, ctx) {
  const P = app.partida, prov = ctx.prov, tr = (t) => trato(t, P.avatar);
  if (tipo === 'terminal') return terminal(app, pMapa, ctx);
  const [quien, dibN] = ATIENDE[prov][tipo] || ['', ''];
  const dib = PERSONAS[dibN] || '';
  const saludo = tr(SALUDOS[prov][tipo] || '');
  await cargarBichos();
  if (tipo === 'posta') {
    P.posta = { prov, zona: ctx.zonaId };
    const av = registrar(P, { t: 'posta' });
    for (const a of av) if (a.reinicio) await avisoMapa(pMapa, 'Pasaste por la posta: la changa de aguante vuelve a 0.');
    void CHANGUEROS;
  }
  app.ir(() => hoja(app, { tipo, prov, quien, dib, saludo, secciones: () => SECCIONES[tipo](app, prov, () => document.querySelector('.negocio')) }));
}

const SECCIONES = {
  posta(app, prov, pag) {
    const P = app.partida; const p = { get repintar() { return pag()?.repintar; } };
    const eq = delEquipo(P);
    const vidaTxt = eq.length ? eq.map((b) => `${especie(b)} ${Math.round(b.vida * 100)} %`).join(', ') : 'Todavía no tenés bichos.';
    const curar = fila(app, pag(), { ico: ICONOS.jarilla, nombre: 'Curar a todos, gratis', linea: vidaTxt, puede: () => eq.length > 0, boton: 'Curar', comprar: () => { curarTodos(P); app.aviso('Tus bichos se curaron.'); } });
    const corral = fila(app, pag(), { ico: ICONOS.corral, nombre: 'Corral', linea: `${P.bichos.length - P.equipo.length} de ${P.corralCap} lugares. Cambiá el equipo.`, boton: 'Abrir', comprar: () => { app.temporal.enPosta = true; app.ir('bichos'); } });
    const sig = CORRAL.find(([n]) => n > P.corralCap);
    const filas = [curar, corral];
    if (sig) filas.push(fila(app, pag(), { ico: ICONOS.corral, nombre: `Agrandar el corral a ${sig[0]}`, linea: 'El alambrador le agrega lugares.', precio: sig[1], boton: 'Agrandar', comprar: () => { P.corralCap = sig[0]; } }));
    void p;
    return [['Tu equipo', filas]];
  },
  almacen(app, prov, pag) {
    const P = app.partida;
    const enc = BICHOS_POR[prov].filter((b) => (b.rareza === 'poco comun' || b.rareza === 'raro') && P.libreta.vistos[b.familia] && !P.libreta.pistas[b.familia] && !P.libreta.atrapados[b.familia]);
    const uniq = [...new Map(enc.map((b) => [b.familia, b])).values()];
    const filasEnc = uniq.map((b) => fila(app, pag(), { ico: '', nombre: b.familia, linea: 'Te digo dónde y cuándo sale.', precio: PRECIO_ENCARGO[b.rareza][prov], boton: 'Pagar', comprar: () => { P.libreta.pistas[b.familia] = true; app.aviso(`Pista en la libreta: ${b.familia}.`); } }));
    for (const [i, b] of uniq.entries()) filasEnc[i].querySelector('.ico').innerHTML = dibujo(arteBicho(b.familia), '0 0 200 200');
    const vende = ['mate', 'carpa', 'chipa', 'tamales', 'empanadas'].map((k) => fila(app, pag(), {
      ico: ICONOS[k], nombre: ARTICULOS[k].nombre, linea: ARTICULOS[k].uso, precio: ARTICULOS[k].precio ?? PRECIO_MATE[prov], tenes: P.mochila[k], max: TOPE_REMEDIO, comprar: () => { P.mochila[k] += 1; },
    }));
    return [...(filasEnc.length ? [['Encargo: pistas de bichos que viste', filasEnc]] : []), ['Vende', vende]];
  },
  curandera(app, prov, pag) {
    const P = app.partida;
    const rem = ['peperina', 'cedron', 'jarilla', 'sahumerio'].map((k) => fila(app, pag(), { ico: ICONOS[k], nombre: ARTICULOS[k].nombre, linea: ARTICULOS[k].uso, precio: ARTICULOS[k].precio, tenes: P.mochila[k], max: TOPE_REMEDIO, comprar: () => { P.mochila[k] += 1; } }));
    const otros = ['palosanto', 'miel', 'ruda'].map((k) => fila(app, pag(), { ico: ICONOS[k], nombre: ARTICULOS[k].nombre, linea: ARTICULOS[k].uso, precio: ARTICULOS[k].precio, tenes: P.mochila[k], max: TOPE_REMEDIO, comprar: () => { P.mochila[k] += 1; } }));
    const limpia = fila(app, pag(), { ico: ICONOS.ruda, nombre: 'Limpia de ruda', linea: 'Borra la pasiva y el camino. Elegí el bicho.', boton: 'Elegir', comprar: () => { app.temporal.limpia = true; app.ir('bichos'); } });
    return [['Remedios', rem], ['Para el camino', otros], ['Limpia', [limpia]]];
  },
  feria(app, prov, pag) {
    const P = app.partida;
    const prendas = PRENDAS_FERIA[prov].map((k) => fila(app, pag(), { ico: PRENDAS_ICO[k], vb: '-4 -4 48 48', nombre: PRENDAS[k][0], linea: PRENDAS[k][1], precio: PRECIO_PRENDA_FERIA[prov], tenes: P.prendas.includes(k) ? 'Ya la tenés' : 'Una sola por partida', puede: () => !P.prendas.includes(k), motivo: () => 'Ya la tenés.', comprar: () => { P.prendas.push(k); } }));
    const n = P.mejoras;
    const bol = fila(app, pag(), { ico: ICONOS.boleadora, nombre: n < 3 ? `Mejora de la boleadora (${n + 1} de 3)` : 'Boleadora mejorada', linea: '+8 % de chance en cada tiro.', precio: n < 3 ? PRECIO_MEJORA[n] : null, puede: () => n < 3, motivo: () => 'Ya tiene las 3 mejoras.', comprar: () => { P.mejoras += 1; } });
    const pil = PILCHAS_FERIA[prov].map(([cod, pr]) => fila(app, pag(), { ico: PILCHAS[cod][P.avatar], vb: '20 0 80 216', nombre: PILCHAS[cod].nombre, linea: 'Pilcha para tu personaje. Se cambia en el Ropero.', precio: pr, tenes: P.pilchas.includes(cod) ? 'Ya la tenés' : '', puede: () => !P.pilchas.includes(cod), motivo: () => 'Ya la tenés.', comprar: () => { P.pilchas.push(cod); } }));
    return [['Prendas', prendas], ['Talabartería', [bol]], ['Pilchas', pil]];
  },
};

/** El puesto escondido del ermitaño: miel de monte y su pilcha exclusiva. */
export function puesto(app, ermitano, prov) {
  const P = app.partida;
  const [cod, pr] = PILCHA_ERMITANO[ermitano];
  const dib = PERSONAS[ermitano.toLowerCase()] || '';
  return hoja(app, { tipo: 'puesto', prov, quien: `Don ${ermitano}`, dib, saludo: 'Pase, vea lo que hay.', secciones: () => {
    const pg = () => document.querySelector('.negocio');
    return [['Puesto escondido', [
      fila(app, pg(), { ico: ICONOS.miel, nombre: ARTICULOS.miel.nombre, linea: ARTICULOS.miel.uso, precio: ARTICULOS.miel.precio, tenes: P.mochila.miel, max: TOPE_REMEDIO, comprar: () => { P.mochila.miel += 1; } }),
      fila(app, pg(), { ico: PILCHAS[cod][P.avatar], vb: '20 0 80 216', nombre: PILCHAS[cod].nombre, linea: 'Solo se consigue acá.', precio: pr, tenes: P.pilchas.includes(cod) ? 'Ya la tenés' : '', puede: () => !P.pilchas.includes(cod), motivo: () => 'Ya la tenés.', comprar: () => { P.pilchas.push(cod); } }),
    ]]];
  } });
}

/** Terminal: el boletero vende el pasaje y el micro te deja en la terminal de la otra provincia. */
async function terminal(app, p, ctx) {
  const P = app.partida, prov = ctx.prov;
  const [quien, dibN] = ATIENDE[prov].terminal;
  const destinos = Object.keys(PROVINCIAS).filter((x) => x !== prov);
  const nivel = (d) => { const zs = Object.values(ZONAS[d]); return `${Math.min(...zs.map((z) => z.nivel[0]))} a ${Math.max(...zs.map((z) => z.nivel[1]))}`; };
  const r = await dialogo(p, { quien, dibujo: PERSONAS[dibN] || '', lineas: ['¿Para dónde va?'], detalle: destinos.map((d) => `${PROVINCIAS[d].nombre} ${'★'.repeat(PROVINCIAS[d].estrellas)}, nivel ${nivel(d)}`).join('. '), opciones: [...destinos.map((d) => [PROVINCIAS[d].nombre, d]), ['Ahora no', null, 'marron']] });
  if (!r) return;
  const precio = pasaje(prov, r);
  const ok = await dialogo(p, { quien, dibujo: PERSONAS[dibN] || '', lineas: [`Pasaje a ${PROVINCIAS[r].nombre}: ${precio} chirolas.`], opciones: [['Viajar', true], ['Ahora no', false, 'marron']] });
  if (!ok) return;
  if (P.chirolas < precio) { sonar('no'); await avisoMapa(p, `Te faltan ${precio - P.chirolas} chirolas.`); return; }
  P.chirolas -= precio; sonar('chirolas');
  const zonaTerminal = { salta: 'z3', corrientes: 'z1', jujuy: 'z1' }[r];
  P.pos = { prov: r, zona: zonaTerminal, x: null, y: null, enTerminal: true };
  (app.temporal.avisos ??= []).push(`Llegaste a ${PROVINCIAS[r].nombre}.`);
  app.guardarCallado();
  app.base('mapa');
}
