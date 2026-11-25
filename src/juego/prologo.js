// Prólogo en Cerrillos (GDD v2, sección 6; lote 17a): el rancho de Don Abel, la elección de la inicial con su ficha
// completa antes de confirmar, la libreta vieja y la salida al Valle.
import { h, en, boton } from '../ui.js';
import { dibujo } from '../arte/escenas.js';
import { GENTE as ADULTOS } from '../arte/gente.js';
import { RANCHO } from '../arte/rancho.js';
import { ABEL } from '../datos/mundo.js';
import { FAMILIAS } from '../datos/familias.js';
import { nuevoPropio, marcarAtrapado } from '../nucleo/progreso.js';
import { actualizarOferta } from '../nucleo/changas.js';
import { CHANGUEROS } from '../datos/changas.js';
import { dialogo } from './dialogo.js';
import { cargarBichos, arteBicho } from './pelea.js';
import { fichaEspecie, chipTipo } from './fichas.js';
import { musica, sonar } from './sonido.js';

const INICIALES = ['Ajinina', 'Pasacán', 'Yakusapo'];

export function prologo(app) {
  const P = app.partida;
  const p = h('section', { class: 'pantalla prologo' });
  p.append(h('div', { class: 'fondo', html: `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${RANCHO}</svg>` }));
  const titulo = en(h('div', { class: 'cartel-rancho' }, h('b', {}, 'Elegí tu primer bicho'), h('small', {}, 'Tocá uno para ver su ficha.')), 60, 52, 240);
  const cartas = en(h('div', { class: 'cartas-ini' }), 12, 130, 336);
  p.append(titulo, cartas);
  titulo.style.visibility = 'hidden'; cartas.style.visibility = 'hidden';
  const abel = { quien: 'Don Abel', dibujo: ADULTOS.maestro, tono: 150, tonada: 'salta' };
  musica('titulo');
  (async () => {
    await cargarBichos();
    cartas.replaceChildren(...INICIALES.map((f) => {
      const F = FAMILIAS[f];
      const b = h('button', { class: 'carta-ini', type: 'button' }, h('span', { html: dibujo(arteBicho(f), '0 0 200 200') }), h('b', {}, f), chipTipo(F.tipo));
      b.addEventListener('click', () => verFicha(f));
      return b;
    }));
    await dialogo(p, { ...abel, lineas: ABEL.prologo });
    titulo.style.visibility = ''; cartas.style.visibility = '';
    cartas.querySelector('button')?.focus();
  })();
  function verFicha(f) {
    sonar('boton');
    const capa = h('div', { class: 'ficha-capa' });
    const otro = boton('Ver otro', { color: 'marron', tam: 'medio', onclick: () => capa.remove() });
    const elijo = boton(`Elijo a ${f}`, { color: 'verde', tam: 'medio', onclick: () => { capa.remove(); confirmar(f); } });
    capa.append(en(h('div', { class: 'papel ficha-larga' }, fichaEspecie(f), h('div', { class: 'dos' }, otro, elijo)), 10, 24, 340, 726));
    p.append(capa); elijo.focus({ preventScroll: true });
  }
  async function confirmar(f) {
    titulo.style.visibility = 'hidden'; cartas.style.visibility = 'hidden';
    P.inicial = f;
    const b = nuevoPropio(P, f, { nivel: 2, zona: 'Cerrillos' });
    P.equipo = [b.id];
    marcarAtrapado(P, f, 0, 'Cerrillos');
    sonar('captura');
    await dialogo(p, { ...abel, lineas: ABEL.despues });
    P.prologo = true;
    P.pos = { prov: 'salta', zona: 'z1', x: 82, y: 622 };
    for (const id of Object.keys(CHANGUEROS)) actualizarOferta(P, id);
    await app.guardarCallado();
    app.base('mapa');
  }
  return p;
}
