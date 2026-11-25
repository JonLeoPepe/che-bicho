// I1, T2 y T3 (lote 14a aprobado): inicio, nueva aventura y continuar aventura.
import { h, en, boton, cabecera, papel, campo } from '../ui.js';
import { fondoInicio, fondoBajo, dibujo } from '../arte/escenas.js';
import { GENTE } from '../arte/gente.js';
import { normalizarNombre, validarClave, crearCredencial, verificarClave, esperaTrasFallos } from '../nucleo/cuentas.js';
import { nuevaPartida, importar } from '../nucleo/partida.js';

export function inicio(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoInicio() }));
  p.append(en(boton('Iniciar aventura', { onclick: () => app.ir('nueva') }), 40, 584, 280));
  p.append(en(boton('Continuar aventura', { color: 'verde', onclick: () => app.ir('continuar') }), 40, 650, 280));
  p.append(en(h('div', { class: 'pie-inicio' }, 'Prototipo v1.0. By J. Pepe'), 70, 718, 220, 30));
  p.foco = p.querySelector('button');
  return p;
}

const error = () => h('p', { class: 'error', role: 'alert' });

export function nueva(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoBajo(594, .55, 'cieloT2') }), cabecera('Nueva aventura', () => app.volver()));
  let avatar = 'jugador';
  const tarjeta = (quien) => h('button', { type: 'button', class: `avatar${quien === avatar ? ' elegido' : ''}`, 'aria-label': quien === 'jugador' ? 'Jugador' : 'Jugadora', 'data-quien': quien, html: dibujo(GENTE[quien]) });
  const avatares = h('div', { class: 'avatares' }, tarjeta('jugador'), tarjeta('jugadora'));
  avatares.addEventListener('click', (e) => {
    const b = e.target.closest('.avatar'); if (!b) return;
    avatar = b.dataset.quien;
    avatares.querySelectorAll('.avatar').forEach((x) => x.classList.toggle('elegido', x === b));
  });
  const nombre = campo('Nombre', { maxlength: 16, autocomplete: 'username' });
  const clave = campo('Contraseña', { type: 'password', autocomplete: 'new-password', maxlength: 64 });
  const repetir = campo('Repetir', { type: 'password', autocomplete: 'new-password', maxlength: 64 });
  const err = error();
  const enviar = boton('¡A la aventura!', { tipo: 'submit' });
  const form = h('form', { class: 'formulario', novalidate: true },
    h('p', { class: 'rotulo' }, 'Elegí quién sos'), avatares, nombre.el,
    h('div', { class: 'dos' }, clave.el, repetir.el),
    h('p', { class: 'nota' }, 'Se guarda en este navegador. Para jugar en otro, usá el código de partida de Opciones.'),
    err, enviar);
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); err.textContent = '';
    try {
      const n = normalizarNombre(nombre.input.value);
      validarClave(clave.input.value, repetir.input.value);
      if (await app.almacen.cuenta(n)) throw new Error('Ya hay una aventura con ese nombre en este navegador.');
      enviar.disabled = true; enviar.textContent = 'Preparando...';
      const cred = await crearCredencial(clave.input.value);
      await app.almacen.guardarCuenta({ nombre: n, avatar, cred, fallos: 0, bloqueo: 0, ultima: Date.now() });
      const partida = await app.almacen.guardarPartida(nuevaPartida(n, avatar));
      app.entrar(partida);
    } catch (x) { err.textContent = x.message; enviar.disabled = false; enviar.textContent = '¡A la aventura!'; }
  });
  p.append(papel(80, 590, form));
  p.foco = avatares.querySelector('.avatar');
  return p;
}

export function continuar(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoBajo(560, .7, 'cieloT3') }), cabecera('Continuar aventura', () => app.volver()));
  const err = error();
  const lista = h('div', { class: 'lista-partidas', role: 'radiogroup' });
  const clave = campo('Contraseña', { type: 'password', autocomplete: 'current-password', maxlength: 64 });
  const entrar = boton('Entrar', { color: 'verde', tipo: 'submit' });
  let elegida = null;
  const form = h('form', { class: 'formulario', novalidate: true }, h('p', { class: 'rotulo' }, 'Elegí tu aventura'), lista, clave.el, err, entrar,
    h('hr'), h('p', { class: 'nota centro' }, '¿Venís de otro navegador?'), boton('Pegar código de partida', { color: 'marron', tam: 'chico', onclick: () => app.ir('importar') }));
  app.almacen.cuentas().then((cs) => {
    if (!cs.length) { lista.append(h('p', { class: 'nota' }, 'Todavía no hay aventuras en este navegador.')); entrar.disabled = true; return; }
    for (const c of cs) {
      const b = h('button', { type: 'button', class: 'partida', role: 'radio', 'aria-checked': 'false' }, h('b', {}, c.nombre), h('span', {}, `Última vez: ${new Date(c.ultima).toLocaleDateString('es-AR')}`));
      b.addEventListener('click', () => { elegida = c; lista.querySelectorAll('.partida').forEach((x) => x.setAttribute('aria-checked', String(x === b))); clave.input.focus(); });
      lista.append(b);
    }
    lista.firstChild.click();
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); err.textContent = '';
    if (!elegida) return;
    const c = await app.almacen.cuenta(elegida.nombre);
    const falta = (c.bloqueo || 0) - Date.now();
    if (falta > 0) { err.textContent = `Esperá ${Math.ceil(falta / 1000)} segundos y probá de nuevo.`; return; }
    entrar.disabled = true; entrar.textContent = 'Entrando...';
    const ok = await verificarClave(clave.input.value, c.cred);
    if (!ok) {
      c.fallos = (c.fallos || 0) + 1; c.bloqueo = Date.now() + esperaTrasFallos(c.fallos);
      await app.almacen.guardarCuenta(c);
      err.textContent = 'La contraseña no es esa.'; entrar.disabled = false; entrar.textContent = 'Entrar'; return;
    }
    c.fallos = 0; c.bloqueo = 0; c.ultima = Date.now(); await app.almacen.guardarCuenta(c);
    const partida = await app.almacen.cargarPartida(c.nombre);
    if (!partida) { err.textContent = 'No se pudo leer la partida. Probá cargarla con su código.'; entrar.disabled = false; entrar.textContent = 'Entrar'; return; }
    app.entrar(partida);
  });
  p.append(papel(80, 590, form));
  p.foco = clave.input;
  return p;
}

export function importarCodigo(app) {
  const p = h('section', { class: 'pantalla' });
  p.append(h('div', { class: 'fondo', html: fondoBajo(560, .7, 'cieloT4') }), cabecera('Código de partida', () => app.volver()));
  const area = h('textarea', { class: 'campo codigo', rows: 6, spellcheck: 'false', 'aria-label': 'Código de partida', placeholder: 'Pegá acá el código que copiaste en el otro navegador.' });
  const clave = campo('Contraseña nueva', { type: 'password', autocomplete: 'new-password', maxlength: 64 });
  const repetir = campo('Repetir', { type: 'password', autocomplete: 'new-password', maxlength: 64 });
  const err = error();
  const cargar = boton('Cargar partida', { color: 'verde', tipo: 'submit' });
  const form = h('form', { class: 'formulario', novalidate: true }, h('p', { class: 'rotulo' }, 'Pegá tu código'), area,
    h('p', { class: 'nota' }, 'Elegí una contraseña para este navegador.'), h('div', { class: 'dos' }, clave.el, repetir.el), err, cargar);
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); err.textContent = '';
    try {
      const partida = importar(area.value);
      validarClave(clave.input.value, repetir.input.value);
      if (await app.almacen.cuenta(partida.nombre)) throw new Error(`Ya hay una aventura de ${partida.nombre} en este navegador. Entrá con ella.`);
      cargar.disabled = true; cargar.textContent = 'Cargando...';
      const cred = await crearCredencial(clave.input.value);
      await app.almacen.guardarCuenta({ nombre: partida.nombre, avatar: partida.avatar, cred, fallos: 0, bloqueo: 0, ultima: Date.now() });
      app.entrar(await app.almacen.guardarPartida(partida));
    } catch (x) { err.textContent = x.message; cargar.disabled = false; cargar.textContent = 'Cargar partida'; }
  });
  p.append(papel(80, 590, form));
  p.foco = area;
  return p;
}
