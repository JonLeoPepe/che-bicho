// Catálogo para aprobar, lote 22a: efectos de sonido (Web Audio, sin archivos).
import { writeFileSync, readFileSync } from 'node:fs';
import { pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';

const JS = readFileSync(new URL('./sonido-efectos.js', import.meta.url), 'utf8');

const GRUPOS = [
  ['Caminar por el mapa', 'Cuatro pasos seguidos. El sonido cambia según el suelo que pisa el personaje.', [
    ['S1', 'pasoTierra', 'Tierra', 'Golpe sordo y polvo. Huellas y caminos de tierra.'],
    ['S2', 'pasoPasto', 'Pasto', 'Roce suave de hojas. Campo, pajonal y pasto alto.'],
    ['S3', 'pasoRipio', 'Ripio y piedra', 'Crujido de piedritas. Quebradas, Puna y cerros.'],
    ['S4', 'pasoArena', 'Arena', 'Arrastre blando. Costa del Paraná.'],
    ['S5', 'pasoAgua', 'Agua y barro', 'Chapoteo con una burbuja. Esteros, vados y orillas.'],
    ['S6', 'pasoNieve', 'Nieve', 'Pisada que se hunde y cruje. Cumbres y nevados.'],
    ['S7', 'pasoEmpedrado', 'Empedrado y adoquín', 'Taco duro. Calles de los pueblos.'],
  ]],
  ['Mundo', 'Lo que suena al moverse entre pueblos, gente y bichos.', [
    ['S8', 'puerta', 'Entrar a un negocio', 'Soplido que sube, junto con el iris.'],
    ['S9', 'hablar', 'Tocar a alguien', 'Dos notas cortas al abrir el diálogo R2.'],
    ['S10', 'vozGrave', 'Voz grave', 'Idioma bicho para hombres mayores, como Don Abel o los capataces.'],
    ['S11', 'vozMedia', 'Voz media', 'Para la mayoría de la gente. Cada persona tiene su nota base.'],
    ['S12', 'vozAguda', 'Voz aguda', 'Para mujeres y gente joven, como Doña Rosa o Sol.'],
    ['S13', 'salvaje', 'Aparece un bicho', 'Alerta de tres notas antes de entrar al combate.'],
    ['S14', 'fogon', 'Fogón prendido', 'Chisporroteo que se oye al acercarse a un changuero con changa.'],
    ['S15', 'mate', 'Mate amargo', 'Sorbo de bombilla al usarlo para pasar la franja del día.'],
    ['S16', 'carpa', 'Carpa', 'Notas que bajan mientras gira la rueda y pasa la noche.'],
  ]],
  ['Captura', 'De la boleadora al resultado, en orden.', [
    ['S17', 'boleadora', 'Boleadora girando', 'Tres vueltas que zumban, cada vez más rápido.'],
    ['S18', 'lanzar', 'Lanzamiento', 'Silbido que se aleja.'],
    ['S19', 'guayaca', 'Golpe de la guayaca', 'Golpe seco y la soga que se enrolla.'],
    ['S20', 'sacudida', 'Sacudidas', 'Tres golpecitos de madera con pausa: la tensión.'],
    ['S21', 'atrapado', 'Atrapado', 'Arpegio que sube y brillo.'],
    ['S22', 'escapo', 'Se escapó', 'Chasquido y dos notas que bajan.'],
  ]],
  ['Golpes por tipo', 'Uno por cada tipo. Suena cuando pega la técnica.', [
    ['S23', 'Fuego', 'Fuego', 'Llamarada que sube con un rugido grave.'],
    ['S24', 'Flora', 'Flora', 'Látigo de hojas y tres notas de madera.'],
    ['S25', 'Agua', 'Agua', 'Chapuzón con burbujas.'],
    ['S26', 'Tierra', 'Tierra', 'Golpe grave que retumba dos veces.'],
    ['S27', 'Roca', 'Roca', 'Crujido de piedra que se parte y cascotes.'],
    ['S28', 'Viento', 'Viento', 'Ráfaga que sube y se va.'],
    ['S29', 'Rayo', 'Rayo', 'Chispazo eléctrico que cae.'],
    ['S30', 'Hielo', 'Hielo', 'Cristales que tintinean y se quiebran.'],
    ['S31', 'Veneno', 'Veneno', 'Burbujeo espeso y siseo.'],
    ['S32', 'Común', 'Común', 'Golpe simple y redondo.'],
    ['S33', 'Mito', 'Mito', 'Dos notas desafinadas que se estiran, con eco.'],
  ]],
  ['Combate', 'Lo que no depende del tipo.', [
    ['S34', 'critico', 'Crítico', 'El golpe con un destello agudo arriba.'],
    ['S35', 'amague', 'Amague', 'Soplido que pasa de largo.'],
    ['S36', 'cubrirse', 'Cubrirse', 'Golpe metálico que resuena.'],
    ['S37', 'marca', 'Marca puesta', 'Sello y dos notas.'],
    ['S38', 'reaccion', 'Reacción', 'Escalera rápida que termina en estallido.'],
    ['S39', 'vencido', 'Bicho vencido', 'Nota que cae y golpe en el piso.'],
    ['S40', 'relevo', 'Relevo', 'Silbido de campo para llamar al que entra.'],
  ]],
  ['Avisos y menú', 'Cortos y suaves: se oyen muchas veces.', [
    ['S41', 'boton', 'Tocar un botón', 'Clic corto.'],
    ['S42', 'volver', 'Volver', 'Clic que baja.'],
    ['S43', 'noSe', 'No se puede', 'Dos zumbidos graves (sin chirolas, mochila llena).'],
    ['S44', 'changa', 'Changa cumplida', 'Dos campanitas, junto con el aviso del tilde verde.'],
    ['S45', 'chirolas', 'Cobrar chirolas', 'Monedas que caen.'],
    ['S46', 'nivel', 'Sube de nivel', 'Arpegio y acorde.'],
    ['S47', 'camino', 'Cambio de camino', 'Brillo que crece y acorde final, con la animación K1 a K4.'],
    ['S48', 'insignia', 'Insignia ganada', 'Fanfarria corta al ganarle al capataz.'],
    ['S49', 'libreta', 'Nuevo en la libreta', 'Lápiz que anota y una campanita.'],
  ]],
];

const play = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5 L19 12 L8 19Z" fill="currentColor"/></svg>`;
const cuerpo = `<div class="como">Tocá cada tarjeta para escucharla (con el volumen del teléfono prendido). Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Todo sale del código, sin archivos de audio.</div>
<div class="vol"><label>Volumen <input id="vol" type="range" min="0" max="1" step="0.05" value="0.8"></label></div>
${GRUPOS.map(([tit, nota, items], gi) => `<section><div class="cab"><h3>${tit}</h3><button class="todos" data-g="${gi}">Escuchar todos</button></div><p class="nota">${nota}</p><div class="grilla">
${items.map(([cod, s, n, d]) => `<button class="sfx" data-s="${s}" data-g="${gi}"><span class="cod">${cod}</span><span class="ic">${play}</span><b>${n}</b><span class="d">${d}</span></button>`).join('')}
</div></section>`).join('')}
<section><h3>Cómo se usan</h3><p class="nota">Volumen propio de los efectos en Opciones, aparte de la música. La música baja un poco mientras suena un aviso. En combate, el golpe por tipo suena junto con la pausa de golpe y el destello; el crítico y la reacción lo pisan. Ningún efecto dura más de un segundo y medio, salvo el cambio de camino y el fogón.</p></section>
<script>${JS}
document.getElementById('vol').addEventListener('input', (e) => SFX.volumen(+e.target.value));
const marcar = (b, dur) => { b.classList.add('suena'); setTimeout(() => b.classList.remove('suena'), dur * 1000); };
document.querySelectorAll('.sfx').forEach((b) => b.addEventListener('click', () => marcar(b, SFX.play(b.dataset.s))));
document.querySelectorAll('.todos').forEach((t) => t.addEventListener('click', async () => {
  for (const b of document.querySelectorAll('.sfx[data-g="' + t.dataset.g + '"]')) { const d = SFX.play(b.dataset.s); marcar(b, d); await new Promise((r) => setTimeout(r, (d + .35) * 1000)); }
}));
</script>`;

const css2 = css + `.vol{margin:14px 0}.vol input{vertical-align:middle;width:180px;margin-left:8px}.cab{display:flex;align-items:center;justify-content:space-between;gap:10px}.cab h3{margin:0}
.todos{font:800 13px Nunito;background:#2f7d5b;color:#fff;border:0;border-radius:99px;padding:7px 14px;cursor:pointer}
.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}
.sfx{position:relative;text-align:left;font:inherit;color:inherit;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:30px 12px 12px 56px;cursor:pointer;min-height:96px;transition:transform .1s,border-color .2s}
.sfx:active{transform:scale(.98)}.sfx b{display:block;font:17px Bree,serif}.sfx .d{display:block;font-size:12.5px;line-height:1.35;margin-top:2px;color:#5a4636}
.sfx .ic{position:absolute;left:12px;top:34px;width:34px;height:34px;border-radius:50%;background:#f2b03a;color:#2a1c15;display:grid;place-items:center;border:2px solid #2a1c15}.sfx .ic svg{width:16px;height:16px}
.sfx.suena{border-color:#2f7d5b;background:#eef6ef}.sfx.suena .ic{background:#2f7d5b;color:#fff;animation:late .35s ease-in-out infinite alternate}@keyframes late{to{transform:scale(1.12)}}`;

writeFileSync(new URL('./catalogo-58.html', import.meta.url), pagina('Catálogo para aprobar, lote 22a', 'Efectos de sonido', cuerpo, css2));
console.log('ok 58');
