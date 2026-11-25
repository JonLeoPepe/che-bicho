import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Rng } from '../src/nucleo/rng.js';
import { normalizarNombre, claveDeNombre, validarClave, crearCredencial, verificarClave, esperaTrasFallos } from '../src/nucleo/cuentas.js';
import { nuevaPartida, validar, exportar, importar } from '../src/nucleo/partida.js';
import { memoria, crearAlmacen } from '../src/plataforma/almacen.js';

test('el azar con semilla se repite', () => {
  const a = new Rng(42), b = new Rng(42);
  for (let i = 0; i < 100; i++) assert.equal(a.sig(), b.sig());
  assert.notEqual(new Rng(1).sig(), new Rng(2).sig());
});

test('nombres y contraseñas', () => {
  assert.equal(normalizarNombre('  Jonathan   Pepe '), 'Jonathan Pepe');
  assert.equal(claveDeNombre('Ñandú'), claveDeNombre('ñandu'));
  assert.throws(() => normalizarNombre('ab'));
  assert.throws(() => normalizarNombre('<script>'));
  assert.throws(() => validarClave('12345'));
  assert.throws(() => validarClave('123456', '1234567'));
  validarClave('123456', '123456');
});

test('la contraseña se verifica sin guardarla', async () => {
  const cred = await crearCredencial('mate amargo', 1000);
  assert.ok(!JSON.stringify(cred).includes('mate'));
  assert.equal(await verificarClave('mate amargo', cred), true);
  assert.equal(await verificarClave('mate dulce', cred), false);
});

test('espera creciente tras intentos fallidos', () => {
  assert.equal(esperaTrasFallos(0), 0); assert.equal(esperaTrasFallos(2), 0);
  assert.equal(esperaTrasFallos(3), 2000); assert.equal(esperaTrasFallos(4), 4000);
  assert.equal(esperaTrasFallos(20), 60000);
});

test('código de partida: ida y vuelta, y detecta cambios', () => {
  const p = nuevaPartida('Jonathan', 'jugador', 1);
  const c = exportar(p);
  assert.deepEqual(importar(c), p);
  assert.deepEqual(importar(`  ${c.slice(0, 20)}\n${c.slice(20)} `), p);
  const roto = c.replace(/\.([0-9a-f]{8})$/, '.00000000');
  assert.throws(() => importar(roto), /modificado/);
  assert.throws(() => importar('hola'), /formato/);
});

test('la partida se valida', () => {
  const p = nuevaPartida('Jonathan', 'jugadora');
  assert.ok(validar(p));
  assert.throws(() => validar({ ...p, chirolas: -1 }));
  assert.throws(() => validar({ ...p, avatar: 'otro' }));
});

test('dos copias rotativas: si una se rompe, queda la otra', async () => {
  const back = memoria(); const alm = crearAlmacen(back);
  const p = nuevaPartida('Jonathan', 'jugador', 1);
  await alm.guardarPartida({ ...p, chirolas: 10 }, 100);
  await alm.guardarPartida({ ...p, chirolas: 20 }, 200);
  assert.equal((await alm.cargarPartida('jonathan')).chirolas, 20);
  await alm.guardarPartida({ ...p, chirolas: 30 }, 300); // pisa la copia más vieja
  assert.equal((await alm.cargarPartida('Jonathan')).chirolas, 30);
  // se corrompe la copia nueva: carga la anterior
  const k = claveDeNombre('Jonathan');
  const a = await back.leer('partidas', `${k}:a`); a.datos.chirolas = -5; await back.escribir('partidas', `${k}:a`, a);
  assert.equal((await alm.cargarPartida('Jonathan')).chirolas, 20);
});
