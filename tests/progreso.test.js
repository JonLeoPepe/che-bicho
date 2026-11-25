import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nuevaPartida, migrar, validar, exportar, importar } from '../src/nucleo/partida.js';
import { expVencido, darExp, expParaSubir, momento, dia, tomarMate, armarCarpa, climaDe, climaZona, atrapar, nuevoPropio, libretaCompleta, enSuMomento, paraCombate } from '../src/nucleo/progreso.js';
import { actualizarOferta, aceptar, registrar, cobrarChanga, fogonPrendido, truequePendiente } from '../src/nucleo/changas.js';
import { CHANGUEROS } from '../src/datos/changas.js';
import { ZONAS, GENTE } from '../src/datos/mundo.js';
import { FAMILIAS } from '../src/datos/familias.js';
import { RIVALES } from '../src/datos/rivales.js';

test('la partida nueva trae la aventura y la vieja se migra', () => {
  const p = nuevaPartida('Jonathan', 'jugador', 5);
  assert.equal(p.v, 2); assert.equal(p.pos.zona, 'z1'); validar(p);
  const vieja = { v: 1, nombre: 'Jonathan', avatar: 'jugadora', creada: 1, guardada: 1, minutos: 0, dia: 1, chirolas: 10, opciones: { musica: 1, efectos: 1, voces: 1, texto: 'normal' } };
  const m = migrar(vieja); validar(m); assert.equal(m.chirolas, 10); assert.deepEqual(m.bichos, []);
  assert.deepEqual(importar(exportar(p)), p);
});

test('experiencia: 60 × N por nivel y 2.700 hasta el 10; pasiva en el 3 y camino en el 4', () => {
  let total = 0; for (let n = 1; n < 10; n++) total += expParaSubir(n);
  assert.equal(total, 2700);
  assert.equal(expVencido(3, 3), 30);
  assert.equal(expVencido(5, 3), 60);           // +10 % por nivel arriba
  assert.equal(expVencido(1, 10), 3);           // piso ×0,25
  assert.equal(expVencido(4, 4, 'raro', 'domador'), 90);
  const b = { nivel: 2, exp: 0 };
  assert.deepEqual(darExp(b, 120 + 180), [3, 4]);
  assert.equal(b.pendiente, 'pasiva');
});

test('reloj: franjas de 8 minutos, mate y carpa', () => {
  assert.equal(momento(0), 'manana'); assert.equal(momento(8.5), 'tarde'); assert.equal(momento(23.9), 'noche');
  assert.equal(dia(24), 2);
  assert.equal(tomarMate(3), 8); assert.equal(tomarMate(17), null);
  assert.equal(armarCarpa(5), null); assert.equal(armarCarpa(20), 24);
  assert.ok(enSuMomento('dia', 'tarde') && !enSuMomento('dia', 'noche') && enSuMomento('tardenoche', 'noche'));
});

test('clima: siempre el mismo, en Corrientes no nieva y en Jujuy nieva un día de cada dos', () => {
  assert.equal(climaDe(7, 'salta', 3, 'tarde'), climaDe(7, 'salta', 3, 'tarde'));
  for (let d = 1; d < 200; d++) for (const m of ['manana', 'tarde', 'noche']) assert.notEqual(climaDe(9, 'corrientes', d, m), 'nieve');
  for (let d = 2; d < 40; d += 2) assert.equal(climaDe(9, 'jujuy', d, 'manana'), 'nieve');
  assert.equal(climaZona('nieve', { nieve: false }), 'nublado');
  const n = { sol: 0, nublado: 0, lluvia: 0, viento: 0, nieve: 0 };
  for (let d = 1; d < 3000; d++) n[climaDe(3, 'salta', d, 'manana')]++;
  assert.ok(n.sol > 700 && n.lluvia > 300 && n.nieve > 150);
});

test('atrapar: al equipo, después al corral, repetido se amadrina, corral lleno vuelve al mapa', () => {
  const P = nuevaPartida('Ana', 'jugadora', 1);
  const a = atrapar(P, 'Kirkallpa', 2, 0, 'Valle'); assert.ok(a.alEquipo);
  const r = atrapar(P, 'Kirkallpa', 4, 1, 'Valle'); assert.equal(r.amadrina.nivel, 4); assert.equal(P.bichos.length, 1);
  assert.ok(P.libreta.formas.Socavón && P.libreta.formas.Kirkallpa);
  for (const f of ['Llamarú', 'Mallku', 'Miyurá', 'Lucerna', 'Pirkasol']) atrapar(P, f, 2, 0, 'Valle');
  assert.equal(P.equipo.length, 6);
  P.corralCap = 1; assert.equal(atrapar(P, 'Escarchuña', 3, 0, 'Puna').alEquipo, false);
  assert.ok(atrapar(P, 'Pasacán', 3, 0, 'Yungas').lleno);
  assert.equal(libretaCompleta(P, 'Salta'), false);
  const b = paraCombate(P.bichos[0]); assert.equal(b.hp, b.hpmax);
});

test('changas: oferta de la mañana, avance, cobro una vez del premio y trueque', () => {
  const P = nuevaPartida('Ana', 'jugadora', 1);
  actualizarOferta(P, 'cirilo'); assert.ok(fogonPrendido(P, 'cirilo'));
  aceptar(P, 'cirilo'); assert.ok(!fogonPrendido(P, 'cirilo'));
  assert.deepEqual(registrar(P, { t: 'vence', familia: 'Miyurá', momento: 'tarde', zona: 'salta:z2' }), [{ id: 'cirilo', n: 1, total: 2 }]);
  assert.deepEqual(registrar(P, { t: 'vence', familia: 'Kirkallpa', momento: 'tarde', zona: 'salta:z2' }), []);
  assert.deepEqual(registrar(P, { t: 'vence', familia: 'Miyurá', momento: 'tarde', zona: 'salta:z2' }), [{ id: 'cirilo', cumplida: true }]);
  const antes = P.chirolas; const c = cobrarChanga(P, 'cirilo'); assert.equal(P.chirolas - antes, 50); assert.equal(c.premio, null);
  actualizarOferta(P, 'cirilo'); assert.ok(!fogonPrendido(P, 'cirilo'), 'una por día');
  P.reloj = 24; actualizarOferta(P, 'cirilo'); assert.ok(fogonPrendido(P, 'cirilo'));
  // Fermín: la del mito da la pista una sola vez
  actualizarOferta(P, 'fermin'); aceptar(P, 'fermin');
  for (let i = 0; i < 3; i++) registrar(P, { t: 'vence', familia: 'Lucerna', momento: 'noche', zona: 'salta:z2' });
  assert.deepEqual(cobrarChanga(P, 'fermin').premio, { mito: 'Ucumar' });
  // trueque
  P.changas.cirilo.idx = 3; P.changas.cirilo.oferta = null; P.reloj = 48; actualizarOferta(P, 'cirilo'); aceptar(P, 'cirilo');
  assert.equal(truequePendiente(P, 'Llamarú'), 'cirilo');
  // aguante: se corta si pasás por la posta
  P.medallas.salta = true; P.changas.fermin.idx = 6; P.changas.fermin.oferta = null; P.reloj = 72; actualizarOferta(P, 'fermin'); aceptar(P, 'fermin');
  registrar(P, { t: 'gana', rival: 'Benito' }); registrar(P, { t: 'gana', rival: 'Eusebia' });
  assert.deepEqual(registrar(P, { t: 'posta' }), [{ id: 'fermin', reinicio: true }]);
});

test('el mundo está bien armado: salidas de ida y vuelta, bichos y rivales que existen', () => {
  const opuesto = { arriba: 'abajo', abajo: 'arriba', izquierda: 'derecha', derecha: 'izquierda' };
  for (const [prov, zs] of Object.entries(ZONAS)) for (const [z, Z] of Object.entries(zs)) {
    for (const [lado, dest] of Object.entries(Z.salidas)) if (dest !== 'ruta9') assert.equal(zs[dest]?.salidas[opuesto[lado]], z, `${prov} ${z} ${lado}`);
    for (const b of Z.bichos) assert.ok(FAMILIAS[b.familia], b.familia);
  }
  for (const zs of Object.values(GENTE)) for (const L of Object.values(zs)) for (const g of L) if (g.tipo === 'domador' || g.tipo === 'ermitano') assert.ok(RIVALES.some((r) => r.ia === g.id), g.id);
  assert.equal(Object.values(CHANGUEROS).reduce((a, c) => a + c.lista.length, 0), 42);
  // las familias no míticas de cada provincia salen en algún lado (para completar la libreta)
  for (const [prov, zs] of Object.entries(ZONAS)) {
    const salen = new Set(Object.values(zs).flatMap((Z) => Z.bichos.map((b) => b.familia)));
    const nombre = { salta: 'Salta', corrientes: 'Corrientes', jujuy: 'Jujuy' }[prov];
    for (const [k, F] of Object.entries(FAMILIAS)) if (F.provincia === nombre) assert.ok(salen.has(k), `${k} no sale en ${prov}`);
  }
});

test('nuevoPropio guarda la zona y el día', () => {
  const P = nuevaPartida('Ana', 'jugadora', 1); P.reloj = 30;
  const b = nuevoPropio(P, 'Suri', { nivel: 7, zona: 'Puna' }); assert.equal(b.dia, 2); assert.equal(b.zona, 'Puna');
});
