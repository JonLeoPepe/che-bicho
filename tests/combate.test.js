import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crearBicho, nuevoLado, ronda, acciones, eficacia, Rng, REGLAS } from '../src/nucleo/combate.js';
import { FAMILIAS } from '../src/datos/familias.js';
import { pelear, sorteo } from '../src/nucleo/batalla.js';
import { hacerIA, JUGADORES, NIVELES_IA } from '../src/nucleo/ia.js';

const lado = (...fams) => nuevoLado(fams.map((f) => crearBicho(f, { nivel: 5, camino: 1 })));
const sinAzar = () => ({ sig: () => 0.99, elegir: (l) => l[0], entero: (a) => a }); // sin críticos ni amagues

test('las 35 familias se arman y suman 300 en la base', () => {
  assert.equal(Object.keys(FAMILIAS).length, 35);
  for (const f of Object.keys(FAMILIAS)) {
    const b = crearBicho(f); assert.equal(b.tec.length, 4);
    if (!b.mito) assert.equal(Math.round((b.hpmax - 40) / 1.6 + b.atk + b.df), 300);
  }
});

test('tabla de tipos: Veneno ya no es eficaz contra Agua; el liviano es sin tipo', () => {
  assert.equal(eficacia('Veneno', 'Agua'), 1);
  assert.equal(eficacia('Agua', 'Fuego'), 2);
  assert.equal(eficacia('Neutro', 'Roca'), 1);
});

test('cubrirse frena por completo un golpe de 2 o más y recibe la mitad de uno barato', () => {
  const S = [lado('Yakusapo'), lado('Kirkallpa')];
  const hp = S[1].eq[0].hp;
  ronda(S, [['t', 2], ['c', 0]], null, sinAzar());
  assert.equal(S[1].eq[0].hp, hp);
  const T = [lado('Yakusapo'), lado('Kirkallpa')];
  const U = [lado('Yakusapo'), lado('Kirkallpa')];
  ronda(T, [['t', 0], ['c', 0]], null, sinAzar()); ronda(U, [['t', 0], ['n', 0]], null, sinAzar());
  const dCub = hp - T[1].eq[0].hp, dLibre = hp - U[1].eq[0].hp;
  assert.ok(Math.abs(dCub / dLibre - 0.5 * 0.5) < 1e-9 || Math.abs(dCub / dLibre - 0.5) < 1e-9); // muralla: la mitad de la mitad
});

test('no se puede cubrir dos rondas seguidas', () => {
  const S = [lado('Yakusapo'), lado('Kirkallpa')];
  ronda(S, [['t', 0], ['c', 0]], null, sinAzar());
  assert.ok(!acciones(S[1]).some((x) => x[0] === 'c'));
});

test('la marcadora marca, y un golpe de 2 la revienta', () => {
  const S = [lado('Yakusapo', 'Mallku'), lado('Pirkasol')];
  ronda(S, [['t', 1], ['n', 0]], null, sinAzar());
  assert.equal(S[1].eq[0].marca, 'Mojado');
  const ev = [];
  ronda(S, [['t', 2], ['n', 0]], null, sinAzar(), ev);
  assert.equal(ev.find((x) => x.tipo === 'tecnica').reaccion, 'reventon');
  assert.equal(S[1].eq[0].marca, null);
});

test('reacción especial: Mojado y Rayo hacen Descarga', () => {
  const S = [lado('Yakusapo', 'Lucerna'), lado('Mallku')];
  ronda(S, [['t', 1], ['n', 0]], null, sinAzar());
  const ev = [];
  ronda(S, [['s', 1], ['n', 0]], null, sinAzar(), ev);
  ronda(S, [['t', 2], ['n', 0]], null, sinAzar(), ev);
  const t = ev.filter((x) => x.tipo === 'tecnica').at(-1);
  assert.equal(t.reaccion, 'descarga'); assert.equal(t.combo, true);
});

test('Relevo: arranca en 2, gasta 1 y el que sale no vuelve por 2 rondas', () => {
  const S = [lado('Yakusapo', 'Mallku', 'Pirkasol'), lado('Kirkallpa')];
  assert.equal(S[0].rel, REGLAS.relevoIni);
  ronda(S, [['s', 1], ['n', 0]], null, sinAzar());
  assert.equal(S[0].rel, 1); assert.equal(S[0].act, 1);
  assert.ok(!acciones(S[0]).some((x) => x[0] === 's' && x[1] === 0));
  ronda(S, [['n', 0], ['n', 0]], null, sinAzar());
  ronda(S, [['n', 0], ['n', 0]], null, sinAzar());
  assert.ok(acciones(S[0]).some((x) => x[0] === 's' && x[1] === 0));
});

test('Sueño: pierde la ronda siguiente', () => {
  const S = [nuevoLado([crearBicho('Llamarú', { nivel: 5, camino: 2 })]), lado('Kirkallpa')];
  ronda(S, [['t', 3], ['n', 0]], null, { sig: () => 0.5, elegir: (l) => l[0] });
  assert.deepEqual(acciones(S[1]), [['n', 0]]);
});

test('el multiplicador total nunca pasa de ×3', () => {
  for (let s = 0; s < 200; s++) {
    const r = new Rng(s); const ev = [];
    const a = crearBicho('Rayajá', { nivel: 5, camino: 1 }), d = crearBicho('Yacarón', { nivel: 5, camino: 1 });
    const S = [nuevoLado([crearBicho('Yakusapo', { nivel: 5, camino: 1 }), a]), nuevoLado([d])];
    ronda(S, [['t', 1], ['n', 0]], 'lluvia', r); ronda(S, [['s', 1], ['n', 0]], 'lluvia', r);
    ronda(S, [['t', 2], ['n', 0]], 'lluvia', r, ev);
    const t = ev.find((x) => x.tipo === 'tecnica');
    if (t?.danio) assert.ok(t.danio <= 100 * S[0].eq[1].atk / S[1].eq[0].df * 0.5 * 3 + 1e-6);
  }
});

test('una pelea completa termina, y con la misma semilla da lo mismo', () => {
  const r = new Rng(7); const a = sorteo(r, ['Ajinina', 'Pasacán', 'Yakusapo', 'Kirkallpa', 'Llamarú', 'Mallku'], 4); const b = sorteo(r, ['Pirkasol', 'Mallku', 'Escarchuña', 'Kirkallpa', 'Lucerna', 'Pasacán'], 4);
  const ia = hacerIA(NIVELES_IA.Anselmo);
  const x = pelear(a, b, [JUGADORES.experto, ia], 99), y = pelear(a, b, [JUGADORES.experto, ia], 99);
  assert.deepEqual(x, y); assert.ok(x.rondas < 80);
});

test('balance rápido: el experto le gana al novato', () => {
  let g = 0; const N = 40;
  for (let i = 0; i < N; i++) {
    const r = new Rng(300 + i); const f = Object.keys(FAMILIAS).filter((k) => !FAMILIAS[k].mito);
    const a = sorteo(r, f, 5), b = sorteo(r, f, 5);
    g += pelear(a, b, [JUGADORES.experto, JUGADORES.novato], i).resultado;
  }
  assert.ok(g / N > 0.6, `el experto ganó ${g}/${N}`);
});
