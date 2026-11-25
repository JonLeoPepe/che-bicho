// Catálogo para aprobar, lote 9a: capataza y domadores de Jujuy.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { eulogia, arrieroJ, bagualera, minero, salinero } from './personas-jujuy.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Proporción adulta, pose propia y solo lo que llevan encima o en la mano.</div>
<section><div class="grilla">
${p('P29', 'Capataza Eulogia', 'capataza · Jujuy ★★★', eulogia(), 'Unos 50 años, firme, con la soga enrollada al hombro. Sombrero negro de copa baja, trenzas largas, aguayo de colores cruzado, pollera violeta y ojotas.')}
${p('P30', 'Arriero Saturnino', 'domador · Quebrada', arrieroJ(), 'Unos 55 años, caminando con el atado en el aguayo a la espalda y el chicote en la mano. Chullo de lana bajo el sombrero de paja, poncho colorado con faja y ojotas.')}
${p('P31', 'Bagualera Delfina', 'domadora · Humahuaca', bagualera(), 'Unos 45 años, con la caja en alto junto a la cara y los ojos cerrados, cantando una baguala. Distinta de la Coplera Eusebia de Salta, que toca la caja a la altura del pecho.')}
${p('P32', 'Minero Aniceto', 'domador · mina', minero(), 'Unos 40 años, con el pico al hombro. Casco amarillo con lámpara encendida, mameluco gris manchado de tierra, bigote y botas.')}
${p('P33', 'Salinero Tomás', 'domador · Salinas Grandes', salinero(), 'Unos 35 años, apoyado en la pala junto a un bloque de sal. Sombrero de ala ancha con cubrenuca, anteojos oscuros y ropa clara para el sol de la salina.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes maza{0%,100%{transform:rotate(0)}50%{transform:rotate(-22deg)}}@keyframes chicote{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}@keyframes haz{0%,100%{opacity:.6}50%{opacity:1}}@keyframes nota{0%{opacity:0;transform:translateY(4px)}50%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}
.maza{animation:maza .8s ease-in-out infinite;transform-box:view-box}.chicote{animation:chicote 1.6s ease-in-out infinite;transform-box:view-box;transform-origin:34px 108px}.haz{animation:haz 2s ease-in-out infinite}.nota path{animation:nota 1.6s ease-out infinite;transform-box:view-box}.nota path:nth-child(2){animation-delay:.8s}`;
writeFileSync(new URL('./catalogo-21.html', import.meta.url), pagina('Catálogo para aprobar · lote 9a', 'Gente de Jujuy: la capataza y los cuatro domadores', cuerpo, css));
console.log('ok');
