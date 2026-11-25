// Catálogo para aprobar, lote 22b: técnica nueva de sonido (procedural, modelando cómo se produce cada sonido).
import { writeFileSync, readFileSync } from 'node:fs';
import { pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';

const VIEJO = readFileSync(new URL('./sonido-efectos.js', import.meta.url), 'utf8');
const NUEVO = readFileSync(new URL('./sonido-proc.js', import.meta.url), 'utf8');

const M = [
  ['N1', 'mate', 'mate', 'Mate', 'Dos sorbos por la bombilla. El aire pasa por un tubo angosto (que tiene sus propias resonancias) y arrastra líquido que burbujea; en el segundo sorbo se llega al fondo: aire entrecortado y gorgoteo.'],
  ['N2', 'rayo', 'Rayo', 'Rayo', 'El chasquido de la descarga (una onda de choque y un chisporroteo de cientos de impulsos) y después el trueno que rueda, más oscuro y con eco de campo abierto.'],
  ['N3', 'pasto', 'pasoPasto', 'Caminar entre pastos', 'Cuatro pasos. Cada uno es una pisada blanda y entre 70 y 110 granitos de roce de hojas, de largos y fuerzas distintas, que crecen y se apagan.'],
  ['N4', 'fuego', 'Fuego', 'Llamarada', 'Un rugido cuyo brillo se abre y se cierra, el soplido del encendido, la llama que titila y chasquidos de brasas.'],
  ['N5', 'roca', 'Roca', 'Golpe de piedras', 'Cada golpe hace sonar las resonancias de la roca (no armónicas, por eso suena a piedra y no a campana); rebota dos veces y caen cascotes y ripio.'],
  ['N6', 'agua', 'Agua', 'Chapuzón', 'El golpe contra el agua, el salpicón y una nube de burbujas de todos los tamaños, cada una con su tono que sube al achicarse; al final, gotas.'],
];
const play = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5 L19 12 L8 19Z" fill="currentColor"/></svg>`;
const cuerpo = `<div class="como">Comparalos con el volumen del teléfono prendido (en iPhone, sin el modo silencio). Respondé si la técnica nueva va por buen camino, y qué cambiarías de cada uno con su código.</div>
<section><h3>Antes y ahora</h3><p class="nota">A la izquierda, lo del lote 22a (tonos de sintetizador). A la derecha, la técnica nueva: <b>sonido procedural</b>. En vez de tocar notas, el código imita cómo se produce cada sonido en la realidad: granos de ruido para el roce, burbujas que suben de tono para el líquido, resonancias de un sólido golpeado para la piedra, impulsos y retumbo para el rayo. Sigue sin haber archivos: el juego calcula cada sonido al cargar, en una fracción de segundo.</p>
<div class="grilla">${M.map(([cod, n, v, tit, txt]) => `<div class="par"><span class="cod">${cod}</span><b class="t">${tit}</b><p>${txt}</p><div class="btns"><button class="b viejo" data-v="${v}">${play}Antes</button><button class="b nuevo" data-n="${n}">${play}Ahora</button></div></div>`).join('')}</div></section>
<section><h3>Cómo seguiría</h3><p class="nota">Si la técnica te convence, rehago los 49 efectos del lote 22a con este método, manteniendo en lo posible el mismo largo de cada uno. Los que son de interfaz (botón, volver, chirolas, insignia) siguen siendo tonos cortos, porque ahí el sonido musical es lo que se espera.</p></section>
<script>${VIEJO}
${NUEVO}
let AC, cache = {};
const GAN = { mate: .55, rayo: .75, pasto: .9, fuego: .8, roca: 1, agua: .6 };
function nuevo(n) {
  AC = AC || new (window.AudioContext || window.webkitAudioContext)(); AC.resume && AC.resume();
  if (!cache[n]) { const x = SP.render(n), b = AC.createBuffer(1, x.length, SP.SR); b.getChannelData(0).set(x); cache[n] = b; }
  const s = AC.createBufferSource(), g = AC.createGain(); g.gain.value = GAN[n]; s.buffer = cache[n]; s.connect(g); g.connect(AC.destination); s.start();
  return cache[n].duration;
}
SFX.volumen(1);
const marcar = (b, d) => { b.classList.add('suena'); setTimeout(() => b.classList.remove('suena'), d * 1000); };
document.querySelectorAll('.viejo').forEach((b) => b.addEventListener('click', () => marcar(b, SFX.play(b.dataset.v))));
document.querySelectorAll('.nuevo').forEach((b) => b.addEventListener('click', () => marcar(b, nuevo(b.dataset.n))));
</script>`;
const css2 = css + `.grilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.par{position:relative;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:32px 14px 14px}.par .t{font:19px Bree,serif;display:block}.par p{font-size:13px;line-height:1.4;margin:4px 0 12px;color:#5a4636}
.btns{display:grid;grid-template-columns:1fr 1.4fr;gap:8px}.b{display:flex;align-items:center;justify-content:center;gap:8px;font:800 15px Nunito;border-radius:12px;padding:12px;cursor:pointer;border:2px solid #2a1c15}.b svg{width:16px;height:16px}
.viejo{background:#efe6d4;color:#7a6a58;border-color:#bfae92}.nuevo{background:#f2b03a;color:#2a1c15}.b.suena{background:#2f7d5b;color:#fff}`;
writeFileSync(new URL('./catalogo-59.html', import.meta.url), pagina('Catálogo para aprobar, lote 22b', 'Sonido: técnica nueva', cuerpo, css2));
console.log('ok 59');
