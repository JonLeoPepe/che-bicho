// La partida: creación, validación, migraciones y código de partida (GDD v2, sección 2).
// Núcleo puro: no toca el navegador.
export const VERSION = 1;
const MIGRACIONES = { /* 1: (p) => { ...; p.v = 2; return p; } */ };

export const OPCIONES_INICIALES = { musica: 0.7, efectos: 0.8, voces: 0.6, texto: 'normal' };

export function nuevaPartida(nombre, avatar, ahora = Date.now()) {
  return { v: VERSION, nombre, avatar, creada: ahora, guardada: ahora, minutos: 0, dia: 1, chirolas: 0, opciones: { ...OPCIONES_INICIALES } };
}

export function migrar(p) {
  let x = p;
  while (x.v < VERSION) {
    const m = MIGRACIONES[x.v];
    if (!m) throw new Error(`No hay migración desde la versión ${x.v}.`);
    x = m(x);
  }
  return x;
}

const entero = (n, min = 0) => Number.isInteger(n) && n >= min;
const entre = (n, a, b) => typeof n === 'number' && n >= a && n <= b;
/** Valida una partida. Lanza un error con el motivo si algo no cierra. */
export function validar(p) {
  if (!p || typeof p !== 'object') throw new Error('La partida está vacía.');
  if (!entero(p.v, 1) || p.v > VERSION) throw new Error('La partida es de una versión desconocida.');
  if (typeof p.nombre !== 'string' || p.nombre.length < 3 || p.nombre.length > 16) throw new Error('El nombre de la partida no es válido.');
  if (p.avatar !== 'jugador' && p.avatar !== 'jugadora') throw new Error('El personaje no es válido.');
  if (!entero(p.minutos) || !entero(p.dia, 1) || !entero(p.chirolas)) throw new Error('Los números de la partida no son válidos.');
  const o = p.opciones;
  if (!o || !entre(o.musica, 0, 1) || !entre(o.efectos, 0, 1) || !entre(o.voces, 0, 1) || !['lenta', 'normal', 'rapida'].includes(o.texto)) throw new Error('Las opciones no son válidas.');
  return true;
}

// ---------------- Código de partida ----------------
function fnv1a(s) { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
const aBase64 = (s) => { const b = new TextEncoder().encode(s); let t = ''; for (const x of b) t += String.fromCharCode(x); return btoa(t); };
const deBase64 = (s) => new TextDecoder().decode(Uint8Array.from(atob(s), (c) => c.charCodeAt(0)));

export function exportar(p) { const json = JSON.stringify(p); return `CB${VERSION}.${aBase64(json)}.${fnv1a(json)}`; }
export function importar(codigo) {
  const m = /^CB(\d+)\.([A-Za-z0-9+/=]+)\.([0-9a-f]{8})$/.exec(String(codigo).replace(/\s+/g, ''));
  if (!m) throw new Error('El código no tiene el formato correcto.');
  let json; try { json = deBase64(m[2]); } catch { throw new Error('El código está dañado.'); }
  if (fnv1a(json) !== m[3]) throw new Error('El código está incompleto o fue modificado.');
  let p; try { p = JSON.parse(json); } catch { throw new Error('El código está dañado.'); }
  p = migrar(p); validar(p); return p;
}
