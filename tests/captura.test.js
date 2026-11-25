import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chanceBoleadora, calidadTiro, nuevaPaciencia, gastarPaciencia, chanceRaja, TOPE } from '../src/nucleo/captura.js';

test('boleadora: común con la vida llena y tiro bueno', () => {
  assert.ok(Math.abs(chanceBoleadora({ rareza: 'comun', vidaFrac: 1, tiro: 'bueno' }) - 0.48) < 1e-9);
});
test('boleadora: nunca pasa del tope', () => {
  assert.equal(chanceBoleadora({ rareza: 'comun', vidaFrac: 0, tiro: 'perfecto', efectos: { sueno: 2 }, rendido: true, mejoras: 3 }), TOPE);
});
test('boleadora: el control y las mejoras suben la chance', () => {
  const a = chanceBoleadora({ rareza: 'raro', vidaFrac: 0.5, tiro: 'bueno' });
  assert.ok(chanceBoleadora({ rareza: 'raro', vidaFrac: 0.5, tiro: 'bueno', efectos: { helado: 1 } }) > a);
  assert.ok(chanceBoleadora({ rareza: 'raro', vidaFrac: 0.5, tiro: 'bueno', mejoras: 2 }) > a);
});
test('calidad del tiro según el aro', () => {
  assert.equal(calidadTiro(0.05), 'perfecto'); assert.equal(calidadTiro(0.3), 'bueno'); assert.equal(calidadTiro(0.6), 'flojo'); assert.equal(calidadTiro(0.9), 'malo');
});
test('paciencia: el tímido raja pronto y un tiro fallado gasta 2', () => {
  const p = nuevaPaciencia('timido');
  assert.equal(gastarPaciencia(p), false); assert.equal(p.queda, 3);
  assert.equal(gastarPaciencia(p, { tiroFallado: true }), false); assert.equal(p.queda, 1);
  assert.equal(gastarPaciencia(p), true);
});
test('el bravo y el mito se sueltan al tercer tiro fallado', () => {
  for (const c of ['bravo', 'mito']) {
    const p = nuevaPaciencia(c);
    for (let i = 0; i < 20; i++) assert.equal(gastarPaciencia(p), false);
    assert.equal(gastarPaciencia(p, { tiroFallado: true }), false);
    assert.equal(gastarPaciencia(p, { tiroFallado: true }), false);
    assert.equal(gastarPaciencia(p, { tiroFallado: true }), true);
  }
});
test('Rajá: 50 % parejo, entre 20 y 95 %, y +20 % por intento', () => {
  assert.equal(chanceRaja(3, 3), 0.5);
  assert.equal(chanceRaja(5, 2), 0.95);
  assert.ok(Math.abs(chanceRaja(2, 5) - 0.2) < 1e-9);
  assert.ok(Math.abs(chanceRaja(2, 5, 2) - 0.6) < 1e-9);
});
