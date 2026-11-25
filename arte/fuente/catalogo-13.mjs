// Catálogo para aprobar, lote 6a: capataz y domadores de Corrientes.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { rosendo, pescador, guia, acordeonista, peona } from './personas-corrientes.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Proporción adulta, pose propia y solo lo que llevan encima o en la mano.</div>
<section><div class="grilla">
${p('P20', 'Capataz Rosendo', 'capataz · Corrientes ★★', rosendo(), 'Unos 50 años, firme y con la mano en el remo de su canoa. Camisa blanca, chaleco negro, faja roja, pañuelo verde, sombrero negro aludo, bigote y patillas canosas.')}
${p('P21', 'Pescador Ramón', 'domador · costa del Paraná', pescador(), 'Unos 55 años, con la caña al hombro y el canasto de mimbre con una palometa. Camisa celeste gastada, pantalón arremangado, descalzo, sombrero de paja deshilachado y barba canosa.')}
${p('P22', 'Guía Aníbal', 'domador · esteros', guia(), 'Unos 35 años, señalando el camino. Camisa verde oliva con bolsillos, largavista al pecho, machete en la vaina, botas de goma y sombrero con barbijo.')}
${p('P23', 'Acordeonista Tito', 'domador · monte', acordeonista(), 'Unos 40 años, tocando el acordeón con la cabeza para atrás y el pie marcando el compás, a punto de largar el sapucai. Pañuelo rojo, bombacha gris y alpargatas.')}
${p('P24', 'Peona Ramona', 'domadora · estancia', peona(), 'Unos 30 años, con el mate en la mano y el termo bajo el brazo. Camisa a cuadros arremangada, trenza larga, pañuelo celeste, bombacha de campo y botas.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes cania{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}@keyframes fuelle{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.06)}}@keyframes pie{0%,100%{transform:rotate(0)}50%{transform:rotate(-10deg)}}@keyframes nota{0%{opacity:0;transform:translateY(4px)}50%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}
.cania{animation:cania 3s ease-in-out infinite;transform-box:view-box;transform-origin:84px 84px}.fuelle{animation:fuelle 1s ease-in-out infinite;transform-box:view-box;transform-origin:60px 98px}.pie{animation:pie .5s ease-in-out infinite;transform-box:view-box;transform-origin:64px 202px}.nota path{animation:nota 1.6s ease-out infinite;transform-box:view-box}.nota path:nth-child(2){animation-delay:.8s}`;
writeFileSync(new URL('./catalogo-13.html', import.meta.url), pagina('Catálogo para aprobar · lote 6a', 'Gente de Corrientes: el capataz y los cuatro domadores', cuerpo, css));
console.log('ok');
