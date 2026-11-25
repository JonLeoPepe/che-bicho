// Placa: todo lo que puede haber en la mochila y para qué sirve.
import { writeFileSync } from 'node:fs';
import { pagina } from './base-arte.mjs';
import { O } from './catalogo-29.mjs';
import { IC } from './catalogo-30.mjs';
import { P } from './catalogo-31.mjs';

export const N = {
  palosanto: `<rect x="10" y="26" width="28" height="9" rx="4" fill="#b88a4a" stroke="${O}" stroke-width="1.8" transform="rotate(-18 24 30)"/><path d="M33,22 C29,16 37,12 33,6 M27,24 C23,18 30,15 27,9" stroke="#b8b0a4" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="35" cy="24" r="2.4" fill="#f28a2a"/>`,
  miel: `<path d="M12,16 L36,16 L34,42 L14,42Z" fill="#f2b03a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><rect x="10" y="10" width="28" height="7" rx="2" fill="#8a5a32" stroke="${O}" stroke-width="1.6"/><path d="M18,24 l3,-2 l3,2 l0,4 l-3,2 l-3,-2Z M24,28 l3,-2 l3,2 l0,4 l-3,2 l-3,-2Z" fill="none" stroke="#c87a1a" stroke-width="1.4"/>`,
  chiripa: `<path d="M4,10 L36,10 L33,34 L22,30 L18,36 L7,34Z" fill="#6a5a8a" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/><path d="M5,16 L35,16" stroke="#f1ebdd" stroke-width="2"/>`,
  espuelas: `<path d="M4,22 C10,14 20,14 24,20" stroke="#9aa4ac" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="29" cy="22" r="6" fill="#d8dde2" stroke="${O}" stroke-width="1.6"/>${[0, 72, 144, 216, 288].map((a) => `<path d="M27.5,17 L29,9 L30.5,17Z" fill="#9aa4ac" stroke="${O}" stroke-width="1" transform="rotate(${a} 29 22)"/>`).join('')}<circle cx="29" cy="22" r="2.6" fill="#9aa4ac" stroke="${O}" stroke-width="1"/>`,
  vincha: `<path d="M4,16 C12,10 28,10 36,16 L36,24 C28,18 12,18 4,24Z" fill="#a8322a" stroke="${O}" stroke-width="1.8"/>${[10, 18, 26].map((x) => `<path d="M${x},${17} l3,-3 l3,3 l-3,3Z" fill="#f1ebdd"/>`).join('')}<path d="M34,22 L37,32 M36,21 L40,30" stroke="#a8322a" stroke-width="2.2" stroke-linecap="round"/>`,
  boleadora: `<path d="M14,30 C18,22 26,22 30,16 M14,30 C20,32 28,34 34,32" stroke="#8a5a32" stroke-width="2" fill="none"/>${[[12, 32], [32, 14], [36, 32]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#9aa4ac" stroke="${O}" stroke-width="1.8"/><path d="M${x - 3},${y - 3} C${x - 1},${y - 5} ${x + 2},${y - 5} ${x + 3},${y - 3}" stroke="#d8dde2" stroke-width="1.4" fill="none"/>`).join('')}`,
  machete: `<path d="M8,36 L14,30" stroke="#5e351c" stroke-width="6" stroke-linecap="round"/><path d="M14,30 L36,8 C40,6 42,10 38,14 L18,34Z" fill="#c9ced2" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/>`,
  canoa: `<path d="M2,22 C10,32 30,32 38,22 L34,20 C26,24 14,24 6,20Z" fill="#8a5a32" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/><path d="M26,8 L18,30" stroke="#5e351c" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="17" cy="32" rx="3" ry="5" fill="#5e351c" transform="rotate(20 17 32)"/>`,
  soga: `<ellipse cx="20" cy="22" rx="15" ry="11" fill="none" stroke="#c9a46a" stroke-width="5"/><ellipse cx="20" cy="22" rx="9" ry="6" fill="none" stroke="#c9a46a" stroke-width="4"/><ellipse cx="20" cy="22" rx="15" ry="11" fill="none" stroke="${O}" stroke-width="1"/><path d="M33,28 C36,34 34,38 30,39" stroke="#c9a46a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  pista: `<path d="M6,8 L34,8 L34,36 L6,36Z" fill="#f4ead2" stroke="${O}" stroke-width="1.8"/><path d="M20,8 L20,36" stroke="#c9b48a" stroke-width="1.4"/><path d="M10,30 C14,22 20,26 24,18 C26,14 29,15 30,12" stroke="#c8562a" stroke-width="2" stroke-dasharray="3 3" fill="none"/><circle cx="30" cy="12" r="2.6" fill="#c8562a"/>`,
};
const ico = (d, cuarenta) => `<svg viewBox="${cuarenta ? '-4 -4 48 48' : '0 0 48 48'}" width="64" height="64">${d}</svg>`;
const item = (d, cuarenta, n, uso, donde, precio, lim) => `<div class="it"><div class="ic">${ico(d, cuarenta)}</div><div><b>${n}</b><p>${uso}</p><p class="dt"><span>${donde}</span>${precio ? `<span>${precio}</span>` : ''}${lim ? `<span>${lim}</span>` : ''}</p></div></div>`;
const grupo = (tit, regla, items) => `<section class="gr"><h3>${tit}</h3><p class="regla">${regla}</p><div class="items">${items.join('')}</div></section>`;

const cuerpo = `<div class="como">Placa de la mochila. Respondé <b>Aprobado</b> o <b>Cambiar</b> (y qué). Precios y efectos son de partida: se ajustan con el simulador.</div>
${grupo('1. Remedios', 'Se usan fuera de combate, desde la mochila, sobre un bicho del equipo. En combate no se usa nada, para ningún lado. Se llevan hasta 5 de cada uno.', [
  item(IC.peperina, 0, 'Hojita de peperina', 'Cura 20 de vida.', 'Curandera, y tirada en el camino', '40 chirolas'),
  item(IC.cedron, 0, 'Té de cedrón', 'Cura 50 de vida.', 'Curandera', '90 chirolas'),
  item(IC.jarilla, 0, 'Ungüento de jarilla', 'Cura toda la vida.', 'Curandera', '200 chirolas'),
  item(IC.sahumerio, 0, 'Sahumerio', 'Despierta a un desmayado con la mitad de la vida.', 'Curandera', '150 chirolas'),
])}
${grupo('2. Para el camino', 'Se usan antes de salir o de pelear. Duran un rato o un combate. No valen en torneos ni revanchas. Se llevan hasta 5 de cada uno.', [
  item(IC.mate, 0, 'Mate amargo', 'Tu equipo arranca el próximo combate con +2 de aguante.', 'Pulpería', '60 chirolas'),
  item(N.palosanto, 0, 'Palo santo', 'Su humo aleja a los salvajes durante 100 pasos. Para cruzar rápido.', 'Curandera', '80 chirolas'),
  item(N.miel, 0, 'Miel de monte', 'Atrae salvajes durante 100 pasos y suben un poco las chances de un poco común. Para buscar especies.', 'Mielera de Corrientes', '80 chirolas'),
  item(IC.ruda, 0, 'Ruda', 'La curandera hace la limpia de ruda: borra todo el árbol de un bicho para elegir de nuevo.', 'Curandera', '300 chirolas'),
])}
${grupo('3. Prendas', 'Una ranura por bicho, desde Nv 3. Se pasan de un bicho a otro fuera de combate. De cada prenda se tiene una sola. Ninguna sube el Amague. Todas valen parecido: ninguna es mejor que otra, sirven para cosas distintas.', [
  item(P.poncho, 1, 'Poncho', '+10 % de Defensa.', 'Feria', '300 chirolas'),
  item(P.faja, 1, 'Faja', '+10 % de Vida.', 'Feria', '300 chirolas'),
  item(P.rastra, 1, 'Rastra', '+10 % de Ataque.', 'Feria', '300 chirolas'),
  item(P.boina, 1, 'Boina', '+1 de Velocidad.', 'Feria', '350 chirolas'),
  item(P.panuelo, 1, 'Pañuelo', '+1 de Crítico.', 'Feria', '350 chirolas'),
  item(P.alpargatas, 1, 'Alpargatas', 'Cada vez que entra al combate, arranca con +1 de aguante.', 'Feria', '300 chirolas'),
  item(N.espuelas, 1, 'Espuelas', 'La primera técnica después de entrar pega +20 %.', 'Capataz Anselmo (Salta)', 'premio'),
  item(N.vincha, 1, 'Vincha', 'Las reacciones que detona este bicho pegan +10 %. Para el detonador del equipo.', 'Capataz Rosendo (Corrientes)', 'premio'),
  item(N.chiripa, 1, 'Chiripá', 'Recibe −20 % de daño de las reacciones. Contra los equipos de combos.', 'Capataza Eulogia (Jujuy)', 'premio'),
])}
${grupo('4. Herramientas y papeles', 'No se gastan, no se compran y no ocupan lugar. Las herramientas abren rincones del mapa en otras provincias.', [
  item(N.boleadora, 0, 'Boleadora', 'Para atrapar bichos. Muestra cuántas mejoras tiene (de 0 a 3).', 'Desde el comienzo; se mejora en la talabartería', '400, 900 y 1.800 por mejora'),
  item(N.machete, 1, 'Machete', 'Abre paso en el monte cerrado.', 'Capataz Anselmo (Salta)', 'premio'),
  item(N.canoa, 1, 'Canoa', 'Cruza los canales y las lagunas.', 'Capataz Rosendo (Corrientes)', 'premio'),
  item(N.soga, 1, 'Soga', 'Sube y baja por las laderas empinadas.', 'Capataza Eulogia (Jujuy)', 'premio'),
  item(N.pista, 1, 'Pistas y encargos', 'Los papeles de las changas: dónde buscar un raro o un mito, y qué especie pide hoy el pulpero.', 'Changas y pulpería', ''),
])}`;
const css = `.gr{background:#fbf6ea;border:2px solid #e2d6c2;border-radius:18px;padding:14px 16px;margin-bottom:16px}.gr h3{margin:0 0 4px;font-family:Bree,serif;font-size:20px}.regla{margin:0 0 12px;font-size:13.5px;color:#5a4636}.items{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.it{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1.5px solid #e9dfcc;border-radius:14px;padding:8px}.ic{flex:0 0 64px;height:64px;background:#fffaf0;border:1.5px solid #d9ccb4;border-radius:12px}.it b{font-family:Bree,serif;font-size:16px}.it p{margin:2px 0 0;font-size:13px;color:#3a2414}.it .dt{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}.dt span{font-size:11px;font-weight:800;color:#5a3e28;background:#f1e6cf;border-radius:8px;padding:2px 7px}@media (max-width:640px){.items{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-32.html', import.meta.url), pagina('Placa de la mochila', 'Todo lo que se puede llevar y para qué sirve', cuerpo, css));
