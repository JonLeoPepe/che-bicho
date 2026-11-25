// Guardado detrás de una interfaz intercambiable (GDD v2, sección 2).
// Hoy: IndexedDB en el navegador. Mañana se puede cambiar por un servidor sin tocar el núcleo.
// Cada partida tiene 2 copias rotativas: si una se corrompe, queda la otra.
import { validar, migrar } from '../nucleo/partida.js';
import { claveDeNombre } from '../nucleo/cuentas.js';

/** Backend en memoria: para las pruebas y como respaldo si el navegador no deja usar IndexedDB. */
export function memoria() {
  const tablas = { cuentas: new Map(), partidas: new Map() };
  return {
    async leer(t, k) { const v = tablas[t].get(k); return v === undefined ? undefined : structuredClone(v); },
    async escribir(t, k, v) { tablas[t].set(k, structuredClone(v)); },
    async borrar(t, k) { tablas[t].delete(k); },
    async todos(t) { return [...tablas[t].values()].map((v) => structuredClone(v)); },
  };
}

export function indexedDB_(nombre = 'che-bicho') {
  const abrir = () => new Promise((ok, mal) => {
    const r = indexedDB.open(nombre, 1);
    r.onupgradeneeded = () => { r.result.createObjectStore('cuentas'); r.result.createObjectStore('partidas'); };
    r.onsuccess = () => ok(r.result); r.onerror = () => mal(r.error);
  });
  let db;
  const tx = async (t, modo, f) => {
    db ??= await abrir();
    return new Promise((ok, mal) => {
      const x = db.transaction(t, modo); const s = x.objectStore(t); const r = f(s);
      x.oncomplete = () => ok(r?.result); x.onerror = () => mal(x.error); x.onabort = () => mal(x.error);
    });
  };
  return {
    leer: (t, k) => tx(t, 'readonly', (s) => s.get(k)),
    escribir: (t, k, v) => tx(t, 'readwrite', (s) => s.put(v, k)),
    borrar: (t, k) => tx(t, 'readwrite', (s) => s.delete(k)),
    todos: (t) => tx(t, 'readonly', (s) => s.getAll()),
  };
}

/** Pide almacenamiento persistente, para que el navegador no borre la partida si se queda sin espacio. */
export async function pedirPersistencia() {
  try { return await navigator.storage?.persist?.(); } catch { return false; }
}

export function crearAlmacen(back) {
  return {
    async cuentas() { return (await back.todos('cuentas')).sort((a, b) => b.ultima - a.ultima); },
    async cuenta(nombre) { return back.leer('cuentas', claveDeNombre(nombre)); },
    async guardarCuenta(c) { await back.escribir('cuentas', claveDeNombre(c.nombre), c); },
    async borrarCuenta(nombre) {
      const k = claveDeNombre(nombre);
      await back.borrar('cuentas', k); await back.borrar('partidas', `${k}:a`); await back.borrar('partidas', `${k}:b`);
    },
    /** Guarda en la copia más vieja de las dos, así siempre queda una buena. */
    async guardarPartida(p, ahora = Date.now()) {
      validar(p);
      const k = claveDeNombre(p.nombre);
      const [a, b] = [await back.leer('partidas', `${k}:a`), await back.leer('partidas', `${k}:b`)];
      const ranura = !a ? 'a' : !b ? 'b' : (a.ts <= b.ts ? 'a' : 'b');
      const datos = { ...p, guardada: ahora };
      await back.escribir('partidas', `${k}:${ranura}`, { ts: ahora, datos });
      return datos;
    },
    /** Carga la copia válida más nueva. */
    async cargarPartida(nombre) {
      const k = claveDeNombre(nombre);
      const copias = [await back.leer('partidas', `${k}:a`), await back.leer('partidas', `${k}:b`)].filter(Boolean).sort((x, y) => y.ts - x.ts);
      for (const c of copias) {
        try { const p = migrar(c.datos); validar(p); return p; } catch { /* probar la otra copia */ }
      }
      return null;
    },
  };
}
