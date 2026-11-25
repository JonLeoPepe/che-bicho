// Arranque: escenario de 360 por 760 escalado a la pantalla, pila de pantallas, teclado y guardado.
import { crearAlmacen, indexedDB_, memoria, pedirPersistencia } from './plataforma/almacen.js';
import { inicio, nueva, continuar, importarCodigo } from './pantallas/inicio.js';
import { menu, opciones, codigo, como } from './pantallas/menu.js';
import { cancha, sorteo, pantallaCombate } from './pantallas/cancha.js';
import { mapa } from './juego/mapa.js';
import { prologo } from './juego/prologo.js';
import { menuJuego, libreta, mochila, bichos, personaje, cinto, carta } from './juego/menus.js';
import { aviso } from './ui.js';
import { volumenes } from './juego/sonido.js';
import { paisajeAncho } from './arte/escenas.js';

const PANTALLAS = { inicio, nueva, continuar, importar: importarCodigo, menu, opciones, codigo, como, cancha, sorteo, combate: pantallaCombate, mapa, prologo, menuJuego, libreta, mochila, bichos, personaje, cinto, carta };
const ANCHO = 360, ALTO = 760;

const escenario = document.getElementById('escenario');
document.getElementById('costados').innerHTML = paisajeAncho();

// ---------------- Escala: el celular ve la pantalla entera; la PC, una columna centrada al alto del monitor ----------------
function escalar() {
  const s = Math.min(innerWidth / ANCHO, innerHeight / ALTO);
  escenario.style.transform = `translate(-50%, -50%) scale(${s})`;
  document.documentElement.classList.toggle('angosto', innerWidth / ANCHO <= innerHeight / ALTO + 0.02);
}
addEventListener('resize', escalar); escalar();

// ---------------- Guardado ----------------
let back;
try { back = indexedDB_(); await back.todos('cuentas'); } catch { back = memoria(); }
const almacen = crearAlmacen(back);

const app = {
  almacen, partida: null, pila: [], temporal: {},
  /** Va a una pantalla, por nombre o con una función (app) => elemento. */
  ir(nombre, { reemplazar = false } = {}) {
    if (reemplazar) this.pila.pop();
    this.pila.push(nombre); mostrar(nombre);
  },
  /** Deja la pila con una sola pantalla (por ejemplo, el mapa después de un combate). */
  base(nombre = 'mapa') { this.pila = [nombre]; mostrar(nombre); },
  volver() {
    if (this.pila.length <= 1) return;
    this.pila.pop(); mostrar(this.pila.at(-1));
  },
  async entrar(partida) {
    this.partida = partida; pedirPersistencia(); volumenes(partida.opciones);
    this.base(partida.prologo ? 'mapa' : 'prologo');
    aviso(escenario, `¡Hola, ${partida.nombre}!`);
  },
  salir() { this.partida = null; this.pila = ['inicio']; mostrar('inicio'); },
  aviso: (t, o) => aviso(escenario, t, o),
  async guardarCallado() { if (this.partida) { const g = await almacen.guardarPartida(this.partida); this.partida.guardada = g.guardada; } },
  get escenario() { return escenario; },
};

let actual = null;
function mostrar(nombre) {
  const p = typeof nombre === 'function' ? nombre(app) : PANTALLAS[nombre](app);
  if (actual) actual.remove();
  escenario.append(p); actual = p;
  requestAnimationFrame(() => p.foco?.focus?.({ preventScroll: true }));
}

// ---------------- Teclado (PC): Esc vuelve, Enter y Espacio tocan lo que tiene el foco ----------------
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { e.preventDefault(); if (actual?.teclasDialogo?.Escape) actual.teclasDialogo.Escape(); else if (actual?.alEscape) actual.alEscape(); else app.volver(); return; }
  const f = actual?.teclasDialogo ? actual.teclasDialogo[e.key] : actual?.teclas?.[e.key];
  if (f && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); f(); }
});

// Guarda al esconder la pestaña o cerrar el navegador.
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') app.guardarCallado(); });

// ---------------- Instalable y sin internet ----------------
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./sw.js').catch(() => {});

app.ir('inicio');
