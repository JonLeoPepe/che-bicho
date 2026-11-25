// Catálogo para aprobar, lote 3c: comerciantes y servicios de Salta.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { curandera, talabartero, feriante, postera, boletero } from './personas-salta3.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Son quienes te atienden adentro de cada lugar. Los nombres son borradores.</div>
<section><div class="grilla">
${p('P15', 'Ña Rufina', 'curandera', curandera(), 'Unos 70 años. Te vende yuyos y hace la limpia: bendice con un ramito de ruda. Pañuelo violeta, manta con guarda y collar de semillas.')}
${p('P16', 'Don Ramiro', 'talabartero', talabartero(), 'Unos 60 años, trenzando tientos de cuero. Delantal de cuero con remaches, anteojos y barba canosa. Hace las mejoras de equipo.')}
${p('P17', 'Marga', 'feriante', feriante(), 'Unos 45 años, con la canasta de verduras a la cadera, ofreciéndote un tomate. Pañuelo azul a lunares y delantal floreado.')}
${p('P18', 'Doña Cata', 'encargada de la posta', postera(), 'Unos 50 años: te cura los bichos. Sirve agua de una jarra de barro en un cuenco. Chaleco, faja roja y pañuelo blanco atado.')}
${p('P19', 'Don Ernesto', 'boletero de la terminal', boletero(), 'Unos 60 años, de uniforme gris antiguo, gorra de visera, anteojos y bigote fino. Muestra un boleto y lleva la picadora de boletos.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes mece{0%,100%{transform:rotate(0)}50%{transform:rotate(8deg)}}@keyframes chorro{to{stroke-dashoffset:-16}}@keyframes trenza{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
.bendice,.ofrece,.boleto{animation:mece 1.6s ease-in-out infinite;transform-box:view-box}.chorro path{animation:chorro .6s linear infinite}.trenza{animation:trenza 1s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-6.html', import.meta.url), pagina('Catálogo para aprobar · lote 3c', 'Comerciantes y servicios de Salta: curandera, talabartero, feriante, posta y terminal', cuerpo, css));
console.log('ok');
