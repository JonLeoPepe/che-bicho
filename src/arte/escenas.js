// Fondos de las pantallas de inicio, sacados del lote 14a aprobado (catalogo-28): atardecer en los cerros.
import { GENTE } from './gente.js';
import { MUESTRA } from './muestra.js';

export const O = '#2a1c15';
const svg = (vb, cont) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${cont}</svg>`;

const cerros = `<path d="M0,330 L50,270 L90,300 L150,232 L210,292 L260,250 L320,300 L360,278 L360,420 L0,420Z" fill="#a8503a"/><path d="M0,360 L70,310 L130,346 L190,300 L250,350 L310,320 L360,340 L360,440 L0,440Z" fill="#7a3a2a"/>`;
const cielo = (id, medio = '.45') => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e86a3a"/><stop offset="${medio}" stop-color="#f2b05a"/><stop offset="1" stop-color="#f6dca0"/></linearGradient>`;

export const titulo = (y, s = 1) => `<g transform="translate(180 ${y}) scale(${s})"><text y="6" font-family="Bree" font-size="54" text-anchor="middle" fill="${O}" stroke="${O}" stroke-width="10" stroke-linejoin="round">¡Che, Bicho!</text><text font-family="Bree" font-size="54" text-anchor="middle" fill="#f2b03a" stroke="${O}" stroke-width="3" stroke-linejoin="round">¡Che, Bicho!</text></g>`;

/** I1: atardecer con el protagonista y un bicho. */
export const fondoInicio = () => svg('0 0 360 760', `<defs>${cielo('cieloI')}</defs><rect width="360" height="760" fill="url(#cieloI)"/><circle cx="270" cy="250" r="44" fill="#fff0b0" opacity=".8"/>${cerros}
  <path d="M0,420 C90,400 270,404 360,416 L360,760 L0,760Z" fill="#c9a86a"/><path d="M0,470 C120,452 240,458 360,466 L360,760 L0,760Z" fill="#b8945a"/>
  ${titulo(140)}
  <g transform="translate(40 300) scale(.95)">${GENTE.jugador}</g><g transform="translate(214 386) scale(.72)">${MUESTRA.puma}</g>`);

/** T2 y T3: el mismo atardecer, con los cerros bajados al pie. */
export const fondoBajo = (y0 = 594, sy = .55, id = 'cieloB') => svg('0 0 360 760', `<defs>${cielo(id, '.55')}</defs><rect width="360" height="760" fill="url(#${id})"/><circle cx="270" cy="${y0 + 22 * sy}" r="${40 * sy + 6}" fill="#fff0b0" opacity=".8"/>
  <g transform="translate(0 ${y0}) scale(1 ${sy}) translate(0 -232)">${cerros}<path d="M0,420 C90,400 270,404 360,416 L360,900 L0,900Z" fill="#c9a86a"/><path d="M0,470 C120,452 240,458 360,466 L360,900 L0,900Z" fill="#b8945a"/></g>`);

/** Fondo de cuero, para Opciones y Cómo se juega. */
export const fondoCuero = () => svg('0 0 360 760', `<defs><pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern></defs><rect width="360" height="760" fill="url(#cuero)"/>`);

/** Paisaje ancho para los costados en la PC. */
export const paisajeAncho = () => `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs>${cielo('cieloA')}</defs><rect width="1600" height="900" fill="url(#cieloA)"/><circle cx="1220" cy="300" r="70" fill="#fff0b0" opacity=".7"/>
  <path d="M0,420 L120,330 L220,380 L360,300 L480,370 L600,320 L740,390 L860,300 L980,360 L1100,290 L1240,370 L1360,320 L1480,380 L1600,340 L1600,560 L0,560Z" fill="#a8503a"/>
  <path d="M0,470 L160,400 L300,450 L440,390 L580,450 L720,410 L880,460 L1020,400 L1160,450 L1300,410 L1460,460 L1600,420 L1600,600 L0,600Z" fill="#7a3a2a"/>
  <path d="M0,560 C400,520 1200,530 1600,550 L1600,900 L0,900Z" fill="#c9a86a"/><path d="M0,640 C500,610 1100,620 1600,630 L1600,900 L0,900Z" fill="#b8945a"/></svg>`;

export const dibujo = (contenido, vb = '0 0 120 216') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${contenido}</svg>`;
