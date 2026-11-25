// Menú de la partida, Opciones y Cómo se juega.
// En la etapa 0 todavía no hay mapa: esta pantalla hace de Menú del juego para probar cuenta y guardado.
import { h, en, boton, cabecera, papel } from '../ui.js';
import { fondoBajo, fondoCuero, dibujo } from '../arte/escenas.js';
import { GENTE } from '../arte/gente.js';
import { MUESTRA } from '../arte/muestra.js';
import { exportar } from '../nucleo/partida.js';

export function menu(app) {
  const pa = app.partida;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoBajo(560, .7, 'cieloM') }));
  const estado = h('p', { class: 'nota centro', 'aria-live': 'polite' }, `Guardado: ${new Date(pa.guardada).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`);
  const panel = h('div', { class: 'formulario' },
    h('div', { class: 'saludo' }, h('div', { class: 'retrato', html: dibujo(GENTE[pa.avatar]) }), h('div', {}, h('p', { class: 'rotulo' }, 'Rancho de Don Abel'), h('h2', {}, pa.nombre), h('p', { class: 'nota' }, `Día ${pa.dia}. ${pa.chirolas} chirolas.`))),
    h('p', { class: 'nota' }, 'El mapa llega en la próxima etapa. Por ahora podés probar el combate en la Cancha de prueba, y guardar tu aventura y pasarla a otro navegador con el código.'),
    boton('Guardar', { onclick: async () => { app.partida = await app.almacen.guardarPartida(app.partida); estado.textContent = 'Guardado recién.'; app.aviso('Aventura guardada.'); } }),
    boton('Cancha de prueba', { color: 'verde', onclick: () => app.ir('cancha') }),
    boton('Opciones', { color: 'marron', onclick: () => app.ir('opciones') }),
    boton('Cómo se juega', { color: 'marron', onclick: () => app.ir('como') }),
    estado);
  p.append(en(h('h1', { class: 'titulo-menu' }, 'Menú'), 0, 22, 360));
  p.append(papel(80, 580, panel));
  p.foco = panel.querySelector('button');
  return p;
}

export function opciones(app) {
  const pa = app.partida;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Opciones', () => app.volver(), true));
  const deslizador = (etq, clave) => {
    const r = h('input', { type: 'range', min: 0, max: 100, value: Math.round(pa.opciones[clave] * 100), 'aria-label': etq });
    r.addEventListener('change', () => { pa.opciones[clave] = Number(r.value) / 100; app.guardarCallado(); });
    return h('label', { class: 'deslizador' }, h('span', {}, etq), r);
  };
  const velocidades = [['lenta', 'Lenta'], ['normal', 'Normal'], ['rapida', 'Rápida']];
  const seg = h('div', { class: 'segmentos', role: 'radiogroup', 'aria-label': 'Velocidad del texto' }, velocidades.map(([v, t]) => {
    const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(pa.opciones.texto === v) }, t);
    b.addEventListener('click', () => { pa.opciones.texto = v; seg.querySelectorAll('button').forEach((x) => x.setAttribute('aria-checked', String(x === b))); app.guardarCallado(); });
    return b;
  }));
  const panel = h('div', { class: 'formulario' },
    h('h2', {}, 'Sonido'), deslizador('Música', 'musica'), deslizador('Efectos', 'efectos'), deslizador('Voces', 'voces'), h('hr'),
    h('h2', {}, 'Juego'), h('p', { class: 'rotulo' }, 'Velocidad del texto'), seg, h('hr'),
    h('h2', {}, 'Partida'),
    boton('Copiar código de partida', { color: 'verde', tam: 'medio', onclick: () => app.ir('codigo') }),
    boton('Cerrar sesión', { color: 'marron', tam: 'medio', onclick: () => app.salir() }),
    h('p', { class: 'nota centro' }, 'El código sirve de respaldo y para jugar en otro navegador.'));
  p.append(papel(96, 570, panel));
  p.foco = panel.querySelector('input');
  return p;
}

export function codigo(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Código de partida', () => app.volver(), true));
  const texto = exportar(app.partida);
  const area = h('textarea', { class: 'campo codigo', rows: 9, readonly: true, spellcheck: 'false', 'aria-label': 'Código de partida' });
  area.value = texto;
  const copiar = boton('Copiar', { color: 'verde', onclick: async () => {
    try { await navigator.clipboard.writeText(texto); app.aviso('Código copiado.'); } catch { area.select(); app.aviso('Seleccionalo y copialo a mano.'); }
  } });
  p.append(papel(96, 520, h('div', { class: 'formulario' }, h('p', { class: 'rotulo' }, 'Tu aventura en un código'), area,
    h('p', { class: 'nota' }, 'Guardalo como respaldo, o pegalo en otro navegador con "Continuar aventura" y "Pegar código de partida".'), copiar)));
  p.foco = copiar;
  return p;
}

// Las 5 tarjetas de Cómo se juega (textos aprobados, sección 12).
const TARJETAS = [
  ['Explorá y tocá', 'Caminá con la cruceta o tocando el piso. Tocá a la gente, los edificios y los bichos.', () => dibujo(GENTE.jugadora)],
  ['La ronda es a la vez', 'Vos y el rival eligen sin verse: técnica, cubrirse o relevo. Después se dan vuelta las cartas.', () => dibujo(`<g transform="translate(10 60)">${[0, 1].map((i) => `<g transform="translate(${i * 52} ${i * 6}) rotate(${i ? 8 : -8} 24 36)"><rect width="48" height="72" rx="8" fill="${i ? '#c8562a' : '#2f7d5b'}" stroke="#2a1c15" stroke-width="2.4"/><rect x="6" y="6" width="36" height="60" rx="5" fill="none" stroke="#fbf3e2" stroke-width="1.6"/></g>`).join('')}</g>`)],
  ['Marcá y reventá', 'La marcadora deja una marca. Un golpe de 2 o más la revienta y pega más.', () => dibujo(MUESTRA.puma, '0 0 200 200')],
  ['Boleá en el momento justo', 'Bajale la vida y tirá cuando el aro dorado se achica. Cada tiro fallado lo pone nervioso.', () => dibujo(`<circle cx="60" cy="100" r="40" fill="none" stroke="#e2b83a" stroke-width="5"/><circle cx="60" cy="100" r="22" fill="none" stroke="#e2b83a" stroke-width="3" opacity=".6"/>${[[44, 92], [74, 88], [60, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#9aa4ac" stroke="#2a1c15" stroke-width="2"/>`).join('')}`)],
  ['Armá tu equipo de 6', 'Contra domadores salen 4 al azar de los 6. Ganá medallas y llená la libreta de Don Abel.', () => dibujo(GENTE.maestro)],
];
export function como(app) {
  let i = 0;
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoCuero() }), cabecera('Cómo se juega', () => app.volver(), true));
  const cuenta = h('p', { class: 'rotulo centro' }); const tit = h('h2', { class: 'centro' }); const dib = h('div', { class: 'tarjeta-dibujo' }); const txt = h('p', { class: 'tarjeta-texto' });
  const puntos = h('div', { class: 'puntos' }, TARJETAS.map(() => h('i')));
  const ant = boton('Anterior', { color: 'marron', tam: 'medio', onclick: () => mostrar(i - 1) });
  const sig = boton('Siguiente', { tam: 'medio', onclick: () => (i === TARJETAS.length - 1 ? app.volver() : mostrar(i + 1)) });
  function mostrar(n) {
    i = Math.max(0, Math.min(TARJETAS.length - 1, n));
    const [t, x, d] = TARJETAS[i];
    cuenta.textContent = `Tarjeta ${i + 1} de ${TARJETAS.length}`; tit.textContent = t; txt.textContent = x; dib.innerHTML = d();
    puntos.querySelectorAll('i').forEach((el, k) => el.classList.toggle('activo', k === i));
    ant.disabled = i === 0; sig.textContent = i === TARJETAS.length - 1 ? 'Listo' : 'Siguiente';
  }
  p.append(papel(96, 570, h('div', { class: 'formulario tarjeta' }, cuenta, tit, dib, txt, puntos, h('div', { class: 'dos' }, ant, sig))));
  p.teclas = { ArrowLeft: () => mostrar(i - 1), ArrowRight: () => mostrar(i + 1) };
  mostrar(0);
  p.foco = sig;
  return p;
}
