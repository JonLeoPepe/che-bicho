// Sonido: efectos del lote 22a (provisorios, sonido.md), música chiptune y voces en idioma bicho del prototipo v0.4.
// Todo sintetizado con Web Audio. Arranca con el primer toque (los navegadores lo exigen).
import './sonido-efectos.js';
import { Audio } from './musica-motor.js';

const audio = new Audio();
let opciones = { musica: 0.7, efectos: 0.8, voces: 0.6 };
let listo = false;
const NOMBRES = {
  golpe: 'Común', critico: 'critico', reventon: 'reaccion', carta: 'boton', desmayo: 'vencido', victoria: 'nivel', boleadora: 'lanzar',
  captura: 'atrapado', suelta: 'escapo', rendido: 'marca', puerta: 'puerta', hablar: 'hablar', salvaje: 'salvaje', mate: 'mate', carpa: 'carpa',
  boton: 'boton', no: 'noSe', changa: 'changa', chirolas: 'chirolas', nivel: 'nivel', camino: 'camino', insignia: 'insignia', libreta: 'libreta',
  sacude: 'sacudida', relevo: 'relevo', cubrirse: 'cubrirse', paso: 'pasoTierra', fogon: 'fogon',
};
function iniciar() {
  if (listo) return; listo = true;
  try { audio.iniciar(); aplicar(); } catch { /* sin audio */ }
}
addEventListener('pointerdown', iniciar, { once: false, passive: true });
addEventListener('keydown', iniciar, { once: false });

function aplicar() {
  audio.volumen('musica', opciones.musica * 0.6); audio.volumen('voces', opciones.voces); audio.volumen('efectos', opciones.efectos);
  globalThis.SFX?.volumen(opciones.efectos * 0.8);
}
export function volumenes(o) { opciones = { ...opciones, ...o }; if (listo) aplicar(); }
export function sonar(nombre) {
  if (!listo || !opciones.efectos) return;
  try { globalThis.SFX?.play(NOMBRES[nombre] || nombre); } catch { /* ese efecto no existe */ }
}
export function musica(tema) { try { audio.musica(tema); } catch { /* sin audio */ } }
export function voz(texto, tono = 220, tonada = 'salta') { if (listo && opciones.voces) try { audio.voz(texto, tono, tonada); } catch { /* sin audio */ } }
export function jingle(n) { if (listo) try { audio.jingle(n); } catch { /* sin audio */ } }
