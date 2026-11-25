// Catálogo para aprobar, lote 14a: inicio, crear perfil, continuar, cómo se juega y opciones.
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { jugador, jugadora, maestro } from './adultos.mjs';
import { almacen } from './edificios.mjs';
import { ranchoMaestro } from './edificios2.mjs';
import { puma } from './puma-muestra.mjs';
import { tero } from './muestra-bichos.mjs';
const O = '#2a1c15';
const T = (x, y, s, txt, { f = 'Nunito', w = 400, c = '#3a2414', a = 'start' } = {}) => `<text x="${x}" y="${y}" font-family="${f}" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="${a}">${txt}</text>`;
const cuero = `<pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern>`;
const boton = (x, y, w, txt, { c = '#c8562a', tc = '#fbf3e2', h = 52, s = 17 } = {}) => `<g transform="translate(${x} ${y})"><rect y="4" width="${w}" height="${h}" rx="16" fill="${O}"/><rect width="${w}" height="${h}" rx="16" fill="${c}" stroke="${O}" stroke-width="2.4"/>${T(w / 2, h / 2 + 6, s, txt, { f: 'Bree', a: 'middle', c: tc })}</g>`;
const campo = (x, y, w, etq, val, oculto) => `${T(x, y, 12.5, etq, { w: 800, c: '#5a3e28' })}<rect x="${x}" y="${y + 8}" width="${w}" height="44" rx="12" fill="#fffaf0" stroke="${O}" stroke-width="2"/>${T(x + 14, y + 36, 16, oculto ? '•'.repeat(val) : val, { w: 800 })}`;
const volver = `<g transform="translate(16 18)"><circle cx="18" cy="18" r="18" fill="#7a4a2a" stroke="${O}" stroke-width="2"/><path d="M22,10 L13,18 L22,26" stroke="#fbf3e2" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>${T(62, 42, 15, 'Volver', { f: 'Bree', c: '#fbf3e2' })}`;
const titulo = (y, s = 1) => `<g transform="translate(180 ${y}) scale(${s})"><text y="6" font-family="Bree" font-size="54" text-anchor="middle" fill="${O}" stroke="${O}" stroke-width="10" stroke-linejoin="round">¡Che, Bicho!</text><text font-family="Bree" font-size="54" text-anchor="middle" fill="#f2b03a" stroke="${O}" stroke-width="3" stroke-linejoin="round">¡Che, Bicho!</text></g>`;
const paisaje = (id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e86a3a"/><stop offset=".45" stop-color="#f2b05a"/><stop offset="1" stop-color="#f6dca0"/></linearGradient>${cuero}</defs>
  <rect width="360" height="760" rx="26" fill="url(#${id})"/><circle cx="270" cy="250" r="44" fill="#fff0b0" opacity=".8"/>
  <path d="M0,330 L50,270 L90,300 L150,232 L210,292 L260,250 L320,300 L360,278 L360,420 L0,420Z" fill="#a8503a"/><path d="M0,360 L70,310 L130,346 L190,300 L250,350 L310,320 L360,340 L360,440 L0,440Z" fill="#7a3a2a"/>
  <path d="M0,420 C90,400 270,404 360,416 L360,760 L0,760Z" fill="#c9a86a"/><path d="M0,470 C120,452 240,458 360,466 L360,760 L0,760Z" fill="#b8945a"/>`;

const pieI = (c) => `<rect x="70" y="718" width="220" height="30" rx="15" fill="rgba(42,28,21,.75)"/>${T(180, 739, 15, 'Prototipo v1.0. By J. Pepe', { w: 800, a: 'middle', c: '#fbf3e2' })}`;
const dosBotones = (y = 584) => `${boton(40, y, 280, 'Iniciar aventura')}${boton(40, y + 66, 280, 'Continuar aventura', { c: '#2f7d5b' })}`;
// I1 atardecer en los cerros
const inicio1 = svg('0 0 360 760', `${paisaje('cieloI')}${titulo(140)}<g transform="translate(40 300) scale(.95)">${jugador()}</g><g transform="translate(214 386) scale(.72)">${puma()}</g>${dosBotones()}${pieI()}`);
// I2 cargada: el pueblo con su gente y sus bichos
const inicio2 = svg('0 0 360 760', `<defs><linearGradient id="cieloC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8e0"/><stop offset="1" stop-color="#e8f2e0"/></linearGradient></defs><rect width="360" height="760" rx="26" fill="url(#cieloC)"/>
  ${[[60, 70], [250, 50], [300, 110]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="34" ry="10" fill="#fff" opacity=".85"/><ellipse cx="16" cy="-6" rx="20" ry="9" fill="#fff" opacity=".85"/></g>`).join('')}
  <path d="M0,300 L60,250 L120,280 L190,220 L260,270 L360,236 L360,420 L0,420Z" fill="#9ab8a0"/><path d="M0,330 C120,312 240,318 360,326 L360,760 L0,760Z" fill="#a8c47a"/>
  <g transform="translate(-14 232) scale(.8)">${almacen()}</g><g transform="translate(186 252) scale(.7)">${ranchoMaestro()}</g>
  <path d="M0,420 C120,404 240,410 360,416 L360,760 L0,760Z" fill="#8fb45e"/><path d="M150,760 C160,600 180,500 200,416 L230,416 C220,500 230,600 250,760Z" fill="#d9c09a"/>
  <g transform="translate(16 330) scale(.78)">${maestro()}</g><g transform="translate(110 340) scale(.86)">${jugadora()}</g>
  <g transform="translate(206 400) scale(.6)">${puma()}</g><g transform="translate(270 360) scale(.42)">${tero()}</g>
  <rect x="0" y="0" width="360" height="200" rx="26" fill="rgba(42,28,21,.0)"/>${titulo(120)}
  <rect x="20" y="586" width="320" height="150" rx="20" fill="rgba(42,28,21,.55)"/>${dosBotones(600)}${pieI('#3a2414')}`);
// I3 minimalista: papel liso, título grande y una boleadora dibujada a pluma
const inicio3 = svg('0 0 360 760', `<rect width="360" height="760" rx="26" fill="#f4ead2"/><rect x="14" y="14" width="332" height="732" rx="18" fill="none" stroke="#c9b48a" stroke-width="2"/>
  ${titulo(250)}<g transform="translate(180 360)" fill="none" stroke="${O}" stroke-width="2.4" stroke-linecap="round"><path d="M0,0 C-30,30 -46,60 -50,90 M0,0 C4,36 2,66 0,96 M0,0 C30,30 46,58 52,88"/><circle cx="-50" cy="102" r="12" fill="#c9b48a"/><circle cx="0" cy="108" r="12" fill="#c9b48a"/><circle cx="52" cy="100" r="12" fill="#c9b48a"/></g>
  ${dosBotones()}${pieI()}`);
// I4 fogón de noche
const inicio4 = svg('0 0 360 760', `<defs><linearGradient id="nocheF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1a33"/><stop offset=".6" stop-color="#23365a"/><stop offset="1" stop-color="#3a3040"/></linearGradient><radialGradient id="luzF"><stop offset="0" stop-color="#ffb84a" stop-opacity=".55"/><stop offset="1" stop-color="#ffb84a" stop-opacity="0"/></radialGradient></defs>
  <rect width="360" height="760" rx="26" fill="url(#nocheF)"/>${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 83) % 360}" cy="${20 + ((i * 47) % 260)}" r="${i % 5 ? 1.2 : 2}" fill="#fff6d8" opacity="${0.5 + (i % 3) * 0.2}"/>`).join('')}<circle cx="290" cy="90" r="26" fill="#f4ecd0"/><circle cx="280" cy="84" r="24" fill="#23365a" opacity=".0"/>
  <path d="M0,360 L80,300 L150,336 L230,280 L300,326 L360,300 L360,760 L0,760Z" fill="#1a2232"/><path d="M0,440 C120,424 240,428 360,436 L360,760 L0,760Z" fill="#2a2a24"/>
  <ellipse cx="180" cy="470" rx="170" ry="110" fill="url(#luzF)"/>
  <g transform="translate(46 300) scale(.9)">${jugador()}</g><g transform="translate(196 400) scale(.6)">${puma()}</g>
  <g transform="translate(180 500)"><path d="M-30,10 L30,-4 M-30,-4 L30,10" stroke="#5a3a22" stroke-width="8" stroke-linecap="round"/><g class="fuego"><path d="M0,-50 C14,-34 20,-20 14,-6 C10,4 -10,4 -14,-6 C-20,-20 -10,-30 0,-50Z" fill="#f28a2a" stroke="${O}" stroke-width="2"/><path d="M0,-30 C8,-20 8,-10 4,-4 C2,0 -2,0 -4,-4 C-8,-12 -4,-20 0,-30Z" fill="#f2d23a"/></g></g>
  ${titulo(150)}${dosBotones()}${pieI('#c9b48a')}`);
const papel = (y, h) => `<rect x="20" y="${y}" width="320" height="${h}" rx="18" fill="#f4ead2" stroke="${O}" stroke-width="2.4"/>`;
const hoja = `<rect width="360" height="760" rx="26" fill="#f4ead2"/><path d="M0,72 L360,72" stroke="#c9b48a" stroke-width="2"/>`;
const volverOsc = `<g transform="translate(16 18)"><circle cx="18" cy="18" r="18" fill="#7a4a2a" stroke="${O}" stroke-width="2"/><path d="M22,10 L13,18 L22,26" stroke="#fbf3e2" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const guarda = (y) => { const m = (x) => `<g transform="translate(${x} ${y})"><rect width="40" height="44" fill="#a8322a"/><path d="M20,6 L34,22 L20,38 L6,22Z" fill="#1f1a18"/><path d="M20,14 L26,22 L20,30 L14,22Z" fill="#f1ebdd"/><path d="M0,0 L8,0 L0,8Z M40,0 L32,0 L40,8Z M0,44 L8,44 L0,36Z M40,44 L32,44 L40,36Z" fill="#f1ebdd"/></g>`; return `<rect x="0" y="${y - 6}" width="360" height="56" fill="#1f1a18"/>${Array.from({ length: 9 }, (_, i) => m(i * 40)).join('')}<path d="M0,${y - 3} L360,${y - 3} M0,${y + 47} L360,${y + 47}" stroke="#f1ebdd" stroke-width="2"/>`; };
// abajo de Comenzar: una tranquera que se abre al camino
const tranquera = `<g transform="translate(0 600)"><path d="M0,40 C120,26 240,30 360,36 L360,160 L0,160Z" fill="#a8c47a"/><path d="M150,160 C160,110 172,70 184,40 L206,40 C206,70 218,110 236,160Z" fill="#d9c09a"/>
  ${[[60, 0], [290, 0]].map(([x]) => `<rect x="${x - 6}" y="-10" width="12" height="70" fill="#7a5a3a" stroke="${O}" stroke-width="2"/>`).join('')}
  <path d="M66,4 L150,10 M66,20 L150,24 M66,36 L150,38 M66,52 L150,52 M66,52 L150,10 M150,8 L150,54" fill="none" stroke="${O}" stroke-width="8" stroke-linecap="round"/><path d="M66,4 L150,10 M66,20 L150,24 M66,36 L150,38 M66,52 L150,52 M66,52 L150,10 M150,8 L150,54" fill="none" stroke="#a8804e" stroke-width="4.4" stroke-linecap="round"/><circle cx="300" cy="10" r="10" fill="#f2b03a" opacity=".9"/></g>`;
// T2 y T3: mismo atardecer de I1, con los cerros bajados al pie y el formulario en un panel
const paisajeBajo = (id, y0, sy = 1) => { return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e86a3a"/><stop offset=".55" stop-color="#f2b05a"/><stop offset="1" stop-color="#f6dca0"/></linearGradient><clipPath id="r${id}"><rect width="360" height="760" rx="26"/></clipPath></defs>
  <g clip-path="url(#r${id})"><rect width="360" height="760" fill="url(#${id})"/><circle cx="270" cy="${y0 + 22 * sy}" r="${40 * sy + 6}" fill="#fff0b0" opacity=".8"/><g transform="translate(0 ${y0}) scale(1 ${sy}) translate(0 -232)">
  <path d="M0,330 L50,270 L90,300 L150,232 L210,292 L260,250 L320,300 L360,278 L360,420 L0,420Z" fill="#a8503a"/><path d="M0,360 L70,310 L130,346 L190,300 L250,350 L310,320 L360,340 L360,440 L0,440Z" fill="#7a3a2a"/>
  <path d="M0,420 C90,400 270,404 360,416 L360,900 L0,900Z" fill="#c9a86a"/><path d="M0,470 C120,452 240,458 360,466 L360,900 L0,900Z" fill="#b8945a"/></g></g>`; };
const cabecera = (txt) => `${volverOsc}<text x="180" y="47" font-family="Bree" font-size="22" text-anchor="middle" fill="${O}" stroke="${O}" stroke-width="6" stroke-linejoin="round">${txt}</text>${T(180, 47, 22, txt, { f: 'Bree', a: 'middle', c: '#fbf3e2' })}`;
const crear = svg('0 0 360 760', `${paisajeBajo('cieloT2', 594, .55)}${cabecera('Nueva aventura')}${papel(80, 482)}
  ${T(36, 110, 13, 'Elegí quién sos', { w: 800, c: '#5a3e28' })}
  <g transform="translate(36 120)"><rect width="138" height="160" rx="14" fill="#fffaf0" stroke="#f2b03a" stroke-width="3.4"/><g transform="translate(33 4) scale(.67)">${jugador()}</g></g><g transform="translate(186 120)"><rect width="138" height="160" rx="14" fill="#fffaf0" stroke="${O}" stroke-width="1.6"/><g transform="translate(33 4) scale(.67)">${jugadora()}</g></g>
  ${campo(36, 302, 288, 'Nombre', 'Jonathan')}${campo(36, 372, 140, 'Contraseña', 6, true)}${campo(184, 372, 140, 'Repetir', 6, true)}
  ${T(36, 450, 11.5, 'Se guarda en este celular. Para jugar en otro,', { c: '#5a3e28' })}${T(36, 466, 11.5, 'usá el código de partida del Menú.', { c: '#5a3e28' })}
  ${boton(36, 484, 288, '¡A la aventura!', { h: 50 })}`);
// abajo de Continuar: el fogón con el mate esperando
const fogonMate = `<g transform="translate(0 560)"><path d="M0,60 C120,46 240,50 360,56 L360,200 L0,200Z" fill="#b8945a"/>
  <g transform="translate(120 120)"><path d="M-34,14 L34,-2 M-34,-2 L34,14" stroke="#5a3a22" stroke-width="9" stroke-linecap="round"/><g class="fuego"><path d="M0,-56 C16,-38 22,-22 16,-6 C12,4 -12,4 -16,-6 C-22,-22 -12,-34 0,-56Z" fill="#f28a2a" stroke="${O}" stroke-width="2"/><path d="M0,-34 C9,-22 9,-12 5,-5 C2,0 -2,0 -5,-5 C-9,-14 -5,-22 0,-34Z" fill="#f2d23a"/></g></g>
  <g transform="translate(236 104)"><path d="M-10,-8 C-14,6 -10,20 0,22 C10,20 14,6 10,-8Z" fill="#8a5a32" stroke="${O}" stroke-width="2"/><path d="M-10,-8 L10,-8" stroke="#c9a84a" stroke-width="3"/><path d="M4,-8 L10,-30" stroke="#c9ced2" stroke-width="2.6" stroke-linecap="round"/><path d="M-8,-10 C-4,-14 4,-14 8,-10" fill="#4f8a2e"/></g>
  <g transform="translate(276 64)"><rect x="0" y="0" width="22" height="60" rx="6" fill="#3a5a8a" stroke="${O}" stroke-width="2"/><rect x="2" y="-8" width="18" height="10" rx="3" fill="#2a2a2a" stroke="${O}" stroke-width="1.6"/></g>
  <g class="humo">${[0, 1, 2].map((i) => `<circle cx="120" cy="40" r="${5 + i * 2}" fill="#e8e4dc" opacity=".6" style="animation-delay:${i * 1.1}s"/>`).join('')}</g></g>`;
const continuar = svg('0 0 360 760', `${paisajeBajo('cieloT3', 548, .7)}${cabecera('Continuar aventura')}${papel(80, 426)}
  ${T(36, 110, 13, 'Elegí tu partida', { w: 800, c: '#5a3e28' })}
  ${[['Jonathan', 'Salta ★, 2 insignias, 14 bichos', true], ['Martina', 'Corrientes ★★, 1 insignia, 9 bichos', false]].map(([n, d, sel], i) => `<g transform="translate(36 ${120 + i * 66})"><rect width="288" height="56" rx="12" fill="#fffaf0" stroke="${sel ? '#f2b03a' : O}" stroke-width="${sel ? 3.4 : 1.6}"/>${T(16, 24, 15, n, { f: 'Bree' })}${T(16, 43, 11.5, d, { c: '#5a3e28' })}</g>`).join('')}
  ${campo(36, 268, 288, 'Contraseña de Jonathan', 6, true)}${boton(36, 340, 288, 'Entrar', { c: '#2f7d5b', h: 50 })}
  <path d="M56,420 L304,420" stroke="#d9ccb4" stroke-width="1.6"/>${T(180, 444, 12, '¿Venís de otro celular?', { a: 'middle', c: '#5a3e28' })}${boton(80, 454, 200, 'Pegar código de partida', { c: '#7a4a2a', s: 13, h: 40 })}`);
// cómo se juega: 5 tarjetas animadas, se pasa deslizando
const comoTarjetas = ['Caminá', 'Bolealos', 'Marcá y explotá', 'El Pase', 'Las insignias'];
const como = svg('0 0 360 760', `<defs>${cuero}</defs><rect width="360" height="760" rx="26" fill="url(#cuero)"/>${volver}
  ${T(180, 96, 22, 'Cómo se juega', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}
  ${papel(116, 520)}${T(180, 150, 13, 'Tarjeta 3 de 5', { w: 800, a: 'middle', c: '#8a6a4a' })}${T(180, 182, 22, 'Marcá y explotá', { f: 'Bree', a: 'middle' })}
  <g transform="translate(200 220) scale(.62)">${tero()}</g><g transform="translate(160 330) scale(-.58 .58)">${puma()}</g>
  <g class="gotas2">${[[246, 236], [262, 230], [280, 240]].map(([x, y]) => `<path d="M${x},${y} C${x - 2},${y + 5} ${x + 2},${y + 8} ${x + 3},${y + 3} C${x + 3},${y} ${x + 1},${y - 2} ${x},${y}Z" fill="#9fd3ef" stroke="#3b6f8f" stroke-width="1"/>`).join('')}</g>
  <g class="rayo2"><path d="M180,300 L210,270 L200,268 L232,240" stroke="#f2d23a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  ${T(180, 500, 14, '1. Un bicho de Agua lo moja.', { w: 800, a: 'middle' })}${T(180, 522, 14, '2. Uno de Rayo lo hace explotar:', { w: 800, a: 'middle' })}${T(180, 544, 14, '¡Descarga!', { f: 'Bree', a: 'middle', c: '#c8562a' })}${T(180, 572, 12, 'Tocá el ícono de una marca para ver con qué explota.', { a: 'middle', c: '#5a3e28' })}
  <g transform="translate(130 600)">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${i * 25}" cy="0" r="${i === 2 ? 7 : 5}" fill="${i === 2 ? '#c8562a' : '#c9b48a'}"/>`).join('')}</g>
  ${boton(30, 660, 140, 'Anterior', { c: '#7a4a2a', s: 15, h: 46 })}${boton(190, 660, 140, 'Siguiente', { s: 15, h: 46 })}`);

// opciones
const desliz = (x, y, etq, f) => `${T(x, y, 13, etq, { w: 800 })}<rect x="${x}" y="${y + 12}" width="240" height="10" rx="5" fill="#d9ccb4"/><rect x="${x}" y="${y + 12}" width="${240 * f}" height="10" rx="5" fill="#c8562a"/><circle cx="${x + 240 * f}" cy="${y + 17}" r="11" fill="#fbf3e2" stroke="${O}" stroke-width="2"/>`;
const elige = (x, y, etq, ops, sel) => `${T(x, y, 13, etq, { w: 800 })}${ops.map((o, i) => `<g transform="translate(${x + i * 84} ${y + 10})"><rect width="78" height="32" rx="10" fill="${i === sel ? '#c8562a' : '#fffaf0'}" stroke="${O}" stroke-width="1.6"/>${T(39, 21, 12, o, { w: 800, a: 'middle', c: i === sel ? '#fbf3e2' : '#3a2414' })}</g>`).join('')}`;
const opciones = svg('0 0 360 760', `<defs>${cuero}</defs><rect width="360" height="760" rx="26" fill="url(#cuero)"/>${volver}${T(180, 96, 22, 'Opciones', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}
  ${papel(116, 600)}${T(40, 150, 15, 'Sonido', { f: 'Bree' })}${desliz(40, 178, 'Música', .6)}${desliz(40, 234, 'Efectos', .8)}${desliz(40, 290, 'Voces', .5)}
  <path d="M40,338 L320,338" stroke="#d9ccb4" stroke-width="1.6"/>${T(40, 368, 15, 'Juego', { f: 'Bree' })}${elige(40, 394, 'Velocidad del texto', ['Lenta', 'Normal', 'Rápida'], 1)}${elige(40, 458, 'Ayudas de Don Abel', ['Sí', 'No'], 0)}
  <path d="M40,520 L320,520" stroke="#d9ccb4" stroke-width="1.6"/>${T(40, 550, 15, 'Partida', { f: 'Bree' })}
  ${boton(40, 566, 280, 'Copiar código de partida', { c: '#2f7d5b', s: 14, h: 42 })}${boton(40, 620, 280, 'Cerrar sesión', { c: '#7a4a2a', s: 14, h: 42 })}${T(180, 694, 11, 'El código sirve de respaldo y para jugar en otro celular.', { a: 'middle', c: '#5a3e28' })}`);

const tel = (cod, nom, dib, txt) => `<figure class="tel"><span class="cod">${cod}</span>${dib}<figcaption><b>${nom}</b><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). La pantalla de inicio tiene solo dos botones; Cómo se juega y Opciones pasan al Menú dentro del juego.</div>
<section><h3>Pantalla de inicio (elegida: atardecer)</h3><div class="tres">
${tel('I1', 'Atardecer en los cerros', inicio1, 'El protagonista y su primer bicho frente a los cerros colorados.')}
${'' && tel('I2', 'Cargada: el pueblo', inicio2, 'Almacén y rancho, Don Abel, la jugadora, un puma y un tero, con el camino que sale del pueblo.')}

</div>
<h3>Perfiles a pantalla completa</h3><div class="tres">
${tel('T2', 'Iniciar aventura', crear, 'Mismo atardecer del inicio, con el formulario en un panel. Sin recuadros abajo: al pie se ven los cerros.')}
${tel('T3', 'Continuar aventura', continuar, 'Mismo atardecer, partidas y contraseña en un panel. Sin recuadros abajo: al pie se ven los cerros.')}
</div>
<h3>Desde el Menú del juego</h3><div class="tres">
${tel('T4', 'Cómo se juega', como, 'Ahora se abre desde el Menú. 5 tarjetas animadas.')}
${tel('T5', 'Opciones', opciones, 'Ahora se abre desde el Menú: sonido, texto, ayudas, código de partida y cerrar sesión.')}
</div></section>`;
const css = `.tres{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:18px}.cuatro{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.tel{margin:0;position:relative}.tel svg{width:100%;height:auto;border-radius:22px;box-shadow:0 8px 22px rgba(0,0,0,.25)}.tel .cod{position:absolute;top:-10px;left:-6px;z-index:2}.tel figcaption b{font-family:Bree,serif;font-size:17px}.tel p{font-size:13px;color:#5a4636;margin:4px 0 0}
@keyframes fuego{0%,100%{transform:scale(1,1)}50%{transform:scale(1.08,.94)}}@keyframes humo{0%{opacity:0;transform:translateY(0)}40%{opacity:.7}100%{opacity:0;transform:translateY(-30px)}}.fuego{animation:fuego .5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.humo circle{animation:humo 3.3s ease-out infinite;transform-box:view-box}@keyframes gotas2{0%{transform:translateY(0);opacity:1}100%{transform:translateY(12px);opacity:0}}@keyframes rayo2{0%,60%,100%{opacity:0}70%,90%{opacity:1}}.gotas2 path{animation:gotas2 1.4s ease-in infinite;transform-box:fill-box}.rayo2{animation:rayo2 2s infinite}
@media (max-width:760px){.tres,.cuatro{grid-template-columns:1fr 1fr}}`;
writeFileSync(new URL('./catalogo-28.html', import.meta.url), pagina('Catálogo para aprobar, lote 14a', 'Pantallas: inicio, perfil, cómo se juega y opciones', cuerpo, css));
console.log('ok');
