// Torneo del Norte y final (lote 17b): llave de rondas, festejo, libreta de campeones, Don Abel y créditos.
// También la entrega de la prenda única de Don Abel por libreta completa (lote 24a, D4).
import { h, en, boton, cabecera, papel } from '../ui.js';
import { fondoCuero } from '../arte/escenas.js';
import { PERSONAS } from '../arte/personas.js';
import { GENTE as ADULTOS } from '../arte/gente.js';
import { PILCHAS, MEDALLAS, PRENDAS_ICO } from '../arte/ui-arte.js';
import { RAYOS, ESTALLIDOS, MATE_COPA, PUBLICO, BRILLOS } from '../arte/festejo.js';
import * as A from '../arte/combate-arte.js';
import { ABEL, PROVINCIAS } from '../datos/mundo.js';
import { PRENDAS, TORNEO_PREMIO } from '../datos/tienda.js';
import { FAMILIAS } from '../datos/familias.js';
import { delEquipo, dia, especie, nombreDe } from '../nucleo/progreso.js';
import { pelearRival, puedeDesafiar, arteBicho, cargarBichos } from './pelea.js';
import { dialogo } from './dialogo.js';
import { jingle, sonar, musica } from './sonido.js';

const T = A.T, O = A.O;
const ESC = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const RONDAS = [['Anselmo', 'Torneo 1', 'salta', 'anselmo'], ['Rosendo', 'Torneo 2', 'corrientes', 'rosendo'], ['Eulogia', 'Torneo 3', 'jujuy', 'eulogia']];
const LINEA_TORNEO = { Anselmo: 'Esta vez no me agarra desprevenido.', Rosendo: 'En el torneo no hay chamamé que te salve.', Eulogia: 'Llegaste lejos. Acá se termina.' };

export function torneo(app) {
  const P = app.partida;
  const ronda = P.torneo ?? 0;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Torneo del Norte', () => app.volver(), true));
  const filas = RONDAS.map(([cap, , prov, dib], i) => h('div', { class: `ronda ${i < ronda ? 'ganada' : i === ronda ? 'sigue' : 'falta'}` },
    h('span', { class: 'cara', html: `<svg viewBox="0 0 60 60"><clipPath id="tc${i}"><circle cx="30" cy="30" r="28"/></clipPath><circle cx="30" cy="30" r="28" fill="#e9d9b8"/><g clip-path="url(#tc${i})"><g transform="translate(-34 -8) scale(1)">${PERSONAS[dib] || ''}</g></g><circle cx="30" cy="30" r="28" fill="none" stroke="#2a1c15" stroke-width="2.4"/></svg>` }),
    h('div', {}, h('small', {}, `Ronda ${i + 1}`), h('b', {}, cap)),
    h('span', { class: 'insig', html: `<svg viewBox="0 0 26 26">${MEDALLAS[prov]}</svg>` }),
    h('i', {}, i < ronda ? 'Ganada' : i === ronda ? 'Sigue' : 'Falta')));
  const mitos = delEquipo(P).filter((b) => FAMILIAS[b.familia].mito).length;
  const pelear = boton(`Pelear la ronda ${ronda + 1}`, { onclick: () => empezar() });
  p.append(papel(74, 672, h('div', { class: 'formulario' },
    h('p', { class: 'nota centro' }, 'Torneo del Norte. Ganá tres rondas seguidas.'), ...filas,
    h('ul', { class: 'reglas' }, h('li', {}, 'Entre ronda y ronda, tus bichos se curan.'), h('li', {}, 'Si perdés, el torneo vuelve a la ronda 1.'), h('li', {}, 'Podés salir y volver cuando quieras.')),
    mitos > 1 ? h('p', { class: 'error' }, 'En el torneo va un solo mito entre los 6.') : null,
    pelear, boton('Salir del torneo', { color: 'marron', onclick: () => app.volver() }))));
  if (mitos > 1 || !puedeDesafiar(P)) pelear.disabled = true;
  async function empezar() {
    const [cap, ia] = RONDAS[ronda];
    await dialogo(p, { quien: cap, dibujo: PERSONAS[RONDAS[ronda][3]] || '', lineas: [LINEA_TORNEO[cap]] });
    pelearRival(app, { ia, nombre: `Torneo, ronda ${ronda + 1}: ${cap}`, tipo: 'torneo', prov: 'salta', clima: null, curar: true, sinPago: true, galpon: cap, reemplazar: false,
      alFin: (res) => {
        if (res !== 'gano') { P.torneo = 0; (app.temporal.avisos ??= []).push('Se vuelve a la ronda 1. Probá cuando quieras.'); app.base('mapa'); return; }
        P.torneo = ronda + 1;
        if (P.torneo < 3) { app.base('mapa'); app.ir(() => entreRondas(app)); return; }
        P.torneo = 0;
        const primera = !P.campeon;
        P.campeon = { dia: dia(P.reloj), equipo: delEquipo(P).map((b) => ({ nombre: nombreDe(b), especie: especie(b), nivel: b.nivel })) };
        if (primera) P.chirolas += TORNEO_PREMIO;
        app.guardarCallado();
        app.base('mapa'); app.ir(() => campeon(app));
      } });
  }
  p.foco = pelear;
  return p;
}
function entreRondas(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Torneo del Norte', () => app.volver(), true));
  const seguir = boton('Seguir', { onclick: () => { app.volver(); app.ir(() => torneo(app)); } });
  p.append(papel(200, 300, h('div', { class: 'formulario' }, h('h2', { class: 'centro' }, `Ronda ${app.partida.torneo} ganada`), h('p', { class: 'nota centro' }, 'Tus bichos se curaron. ¿Seguís?'), seguir, boton('Salir', { color: 'marron', onclick: () => app.volver() }))));
  p.foco = seguir;
  return p;
}

/** TN3a: ¡Campeón! */
export function campeon(app) {
  const P = app.partida; sonar('insignia'); jingle('medalla'); musica('titulo');
  const eq = delEquipo(P);
  const pos = [[2, 372], [266, 372], [2, 478], [266, 478], [84, 556], [184, 556]];
  const p = h('section', { class: 'pantalla festejo' });
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg"><defs><radialGradient id="cielo3" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#8a4a2a"/><stop offset="1" stop-color="#1e1420"/></radialGradient></defs><rect width="360" height="760" fill="url(#cielo3)"/>${RAYOS}${ESTALLIDOS}
    <g class="titulo">${T(180, 74, 15, 'Torneo del Norte', { f: 'Bree', a: 'middle', c: '#f2d27a' })}${T(180, 112, 34, '¡Campeón!', { f: 'Bree', a: 'middle', c: '#fff6dc' })}</g>
    ${T(180, 140, 13.5, 'Le ganaste a Anselmo, Rosendo y Eulogia', { w: 800, a: 'middle', c: '#f4ead2' })}
    <g transform="translate(180 230)"><circle r="70" fill="#f2d27a" opacity=".16"/></g><g class="levanta"><g transform="translate(180 196) scale(.95)">${MATE_COPA}</g></g>
    <g transform="translate(134 262) scale(.78)">${(PILCHAS[P.pilcha] || PILCHAS.P1)[P.avatar]}</g>
    ${eq.map((b, i) => `<g transform="translate(${pos[i][0]} ${pos[i][1]})"><g class="salta" style="animation-delay:${(i * 0.18).toFixed(2)}s"><g transform="scale(.46)">${arteBicho(especie(b))}</g></g></g>`).join('')}
    ${PUBLICO}${T(180, 752, 12, 'Tocá para seguir', { w: 800, a: 'middle', c: '#f2d27a' })}</svg>` }));
  const z = en(h('button', { class: 'zona', type: 'button', 'aria-label': 'Seguir' }), 0, 0, 360, 760);
  z.addEventListener('click', () => app.ir(() => libretaCampeones(app), { reemplazar: true }));
  p.append(z); p.foco = z; p.teclas = { Enter: () => z.click(), ' ': () => z.click() };
  return p;
}
/** TN3b: libreta de campeones, guardada para siempre. */
export function libretaCampeones(app, alSeguir) {
  const P = app.partida, C = P.campeon;
  const p = h('section', { class: 'pantalla' });
  const eq = C.equipo;
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${fondoCuero().replace(/^<svg[^>]*>|<\/svg>$/g, '')}<rect width="360" height="760" fill="#2a2228" opacity=".5"/>
    <g transform="translate(18 60)"><rect width="324" height="560" rx="10" fill="#b8925e" stroke="${O}" stroke-width="2.6"/><rect x="10" y="10" width="304" height="540" rx="6" fill="#f1e3bd" stroke="${O}" stroke-width="1.6"/>
    ${Array.from({ length: 22 }, (_, i) => `<path d="M24,${70 + i * 22} L300,${70 + i * 22}" stroke="#d8c49a" stroke-width="1"/>`).join('')}<path d="M54,20 L54,540" stroke="#d88a7a" stroke-width="1.2"/>
    ${T(66, 50, 22, 'Campeones del Norte', { f: 'Caveat', w: 700, c: '#5a3a22' })}${T(66, 82, 16, ESC(`${P.nombre}, día ${C.dia}`), { f: 'Caveat', w: 700, c: '#5a3a22' })}
    ${eq.map((b, i) => { const x = 30 + (i % 2) * 140, y = 100 + Math.floor(i / 2) * 136; return `<g transform="translate(${x} ${y})"><rect width="128" height="124" rx="8" fill="#fffaf0" stroke="#c9b48a" stroke-width="1.4"/><g class="aparece" style="animation-delay:${(i * 0.5).toFixed(1)}s"><g transform="translate(14 0) scale(.5)">${arteBicho(b.especie)}</g></g>${T(64, 104, 14, ESC(b.nombre), { f: 'Bree', a: 'middle' })}${T(64, 118, 11.5, `Nivel ${b.nivel}`, { w: 800, a: 'middle', c: '#6a5440' })}</g>`; }).join('')}
    <g transform="translate(272 62) rotate(-14)"><g class="sello"><circle r="32" fill="#fff4ec" fill-opacity=".4" stroke="#b8382a" stroke-width="3.4"/><circle r="26" fill="none" stroke="#b8382a" stroke-width="1.4"/>${T(0, -2, 8.5, 'CAMPEÓN', { f: 'Bree', a: 'middle', c: '#b8382a' })}${T(0, 10, 8.5, 'DEL NORTE', { f: 'Bree', a: 'middle', c: '#b8382a' })}</g></g></g>
    ${T(180, 660, 13, 'Queda guardado para siempre en tu libreta.', { w: 800, a: 'middle', c: '#f4ead2' })}</svg>` }));
  const b = en(boton('Seguir', { color: 'verde', tam: 'medio', onclick: () => (alSeguir ? alSeguir() : app.ir(() => creditos(app), { reemplazar: true })) }), 110, 680, 140);
  p.append(b); p.foco = b;
  return p;
}
/** TN3c: Don Abel recibe la libreta y suben los créditos. */
function creditos(app) {
  const P = app.partida;
  const p = h('section', { class: 'pantalla festejo' });
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${fondoCuero().replace(/^<svg[^>]*>|<\/svg>$/g, '')}<rect width="360" height="760" fill="#2a2228" opacity=".55"/>${BRILLOS}
    ${T(180, 70, 15, 'Torneo del Norte', { f: 'Bree', a: 'middle', c: '#f2d27a' })}${T(180, 104, 28, 'Campeón del Norte', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}
    <g transform="translate(70 120) scale(.75)">${ADULTOS.maestro}</g><g transform="translate(200 120) scale(.75)">${(PILCHAS[P.pilcha] || PILCHAS.P1)[P.avatar]}</g>
    <g transform="translate(140 214)"><rect width="34" height="44" rx="3" fill="#b8925e" stroke="${O}" stroke-width="2"/><rect x="4" y="4" width="26" height="36" fill="#e8d4a8" stroke="${O}" stroke-width="1.2"/><path d="M8,12 L26,12 M8,18 L26,18 M8,24 L22,24" stroke="#8a6a3e" stroke-width="1.4"/></g>
    <g class="aparece">${[['Una aventura gaucha', 'Bree', 17, '#f2d27a'], ['Idea y diseño', 'Nunito', 12, '#c9b48a'], ['Jonathan Pepe', 'Bree', 16, '#fbf3e2'], ['Arte, música y sonido', 'Nunito', 12, '#c9b48a'], ['Dibujados y compuestos por código', 'Bree', 14, '#fbf3e2'], ['Gracias por jugar', 'Bree', 17, '#f2d27a']].map(([t, f, z, c], i) => T(180, 470 + i * 34, z, t, { f, w: f === 'Nunito' ? 800 : 400, a: 'middle', c })).join('')}</g></svg>` }));
  const caja = en(h('div', { class: 'dialogo-caja fija' }, h('p', { class: 'dialogo-nombre' }, 'Don Abel'), h('p', { class: 'dialogo-texto' })), 10, 300, 340, 120);
  p.append(caja);
  const seguir = en(boton('Seguir jugando', { color: 'verde', tam: 'medio', onclick: () => { P.finVisto = true; app.guardarCallado(); app.base('mapa'); } }), 70, 690, 220);
  seguir.style.visibility = 'hidden'; p.append(seguir);
  let i = 0; const txt = caja.querySelector('.dialogo-texto');
  const paso = () => { if (i < ABEL.final.length) { txt.textContent = ABEL.final[i++]; setTimeout(paso, 2200); } else { seguir.style.visibility = ''; seguir.focus(); } };
  paso();
  return p;
}

/** D4: Don Abel da su prenda única por la libreta completa. */
export function prendaAbel(app, prov, alFin) {
  const pr = { salta: 'poncho de vicuña', corrientes: 'sombrero de palma', jujuy: 'aguayo' }[prov];
  const n = Object.values(FAMILIAS).filter((F) => F.provincia === PROVINCIAS[prov].nombre && !F.mito).length;
  const p = h('section', { class: 'pantalla festejo' });
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${fondoCuero().replace(/^<svg[^>]*>|<\/svg>$/g, '')}
    <rect x="16" y="70" width="328" height="672" rx="16" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/>
    <defs><clipPath id="d4c"><rect x="16" y="70" width="328" height="672" rx="16"/></clipPath></defs><g clip-path="url(#d4c)">${RAYOS}</g>
    ${T(180, 40, 20, ESC(`Libreta de ${PROVINCIAS[prov].nombre}`), { f: 'Bree', a: 'middle', c: '#f4ead2' })}
    ${T(180, 112, 20, '¡Libreta completa!', { f: 'Bree', a: 'middle', c: '#7a4a2a' })}${T(180, 136, 12.5, `Las ${n} familias de ${PROVINCIAS[prov].nombre}, atrapadas.`, { w: 700, a: 'middle', c: '#5a3e28' })}
    <g transform="translate(36 190) scale(.95)">${ADULTOS.maestro}</g>
    <g transform="translate(196 236)"><g class="flota"><g transform="scale(2.6)">${PRENDAS_ICO[pr]}</g></g></g>
    ${T(180, 470, 14.5, 'Don Abel te da su prenda:', { f: 'Bree', a: 'middle' })}${T(180, 498, 22, PRENDAS[pr][0], { f: 'Bree', a: 'middle', c: '#8a5a32' })}
    ${T(180, 524, 12.5, PRENDAS[pr][1].replace(/\.$/, ''), { w: 800, a: 'middle', c: '#2f7d5b' })}
    ${T(180, 556, 12, 'Es única: no se compra ni se repite.', { a: 'middle', c: '#5a3e28' })}${T(180, 576, 12, 'Se pone a un bicho de nivel 3 o más.', { a: 'middle', c: '#5a3e28' })}</svg>` }));
  const poner = en(boton('Ponérsela a un bicho', { color: 'verde', tam: 'medio', onclick: () => { app.temporal.ponerPrenda = pr; app.ir('bichos', { reemplazar: true }); } }), 50, 616, 260);
  const no = en(boton('Ahora no', { color: 'marron', tam: 'chico', onclick: () => (alFin ? alFin() : app.volver()) }), 110, 680, 140);
  p.append(poner, no); p.foco = poner;
  cargarBichos();
  return p;
}
