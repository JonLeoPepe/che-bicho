// Cuentas locales: nombre y contraseña, sin correo (GDD v2, sección 2). Seguridad de prototipo:
// la contraseña nunca se guarda, solo su derivación PBKDF2 SHA-256 con sal aleatoria.
export const ITERACIONES = 600000;

/** Normaliza y valida el nombre. Lanza un error con un mensaje para el jugador. */
export function normalizarNombre(n) {
  const s = String(n ?? '').trim().replace(/\s+/g, ' ');
  if (s.length < 3 || s.length > 16) throw new Error('El nombre tiene que tener entre 3 y 16 letras.');
  if (!/^[\p{L}\p{N} ._-]+$/u.test(s)) throw new Error('Usá solo letras, números, espacios, punto o guion.');
  return s;
}
/** Clave de búsqueda: sin mayúsculas ni tildes, para que "Jonathan" y "jonathan" sean la misma cuenta. */
export const claveDeNombre = (n) => normalizarNombre(n).toLocaleLowerCase('es').normalize('NFD').replace(/\p{M}/gu, '');

export function validarClave(c, repetir) {
  if (typeof c !== 'string' || c.length < 6) throw new Error('La contraseña tiene que tener al menos 6 caracteres.');
  if (c.length > 64) throw new Error('La contraseña es demasiado larga.');
  if (repetir !== undefined && c !== repetir) throw new Error('Las contraseñas no coinciden.');
}

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const deHex = (h) => new Uint8Array(h.match(/../g).map((x) => parseInt(x, 16)));

export async function derivar(clave, salHex, iter = ITERACIONES) {
  const c = globalThis.crypto.subtle;
  const k = await c.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveBits']);
  return hex(await c.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: deHex(salHex), iterations: iter }, k, 256));
}
export async function crearCredencial(clave, iter = ITERACIONES) {
  const sal = hex(globalThis.crypto.getRandomValues(new Uint8Array(16)));
  return { sal, iter, hash: await derivar(clave, sal, iter) };
}
/** Compara en tiempo constante. */
export async function verificarClave(clave, cred) {
  const h = await derivar(clave, cred.sal, cred.iter);
  let d = h.length ^ cred.hash.length;
  for (let i = 0; i < h.length; i++) d |= h.charCodeAt(i) ^ (cred.hash.charCodeAt(i) || 0);
  return d === 0;
}
/** Espera creciente tras intentos fallidos: sin espera los 2 primeros, después 2, 4, 8 segundos... hasta 60. */
export const esperaTrasFallos = (n) => (n < 3 ? 0 : Math.min(60000, 1000 * 2 ** (n - 2)));
