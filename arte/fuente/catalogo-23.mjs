// Catálogo para aprobar, lote 10a: edificios de Jujuy (1 de 2).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { postaJ, almacenJ, casaJ, curanderaJ, talabarteriaJ, feriaJ } from './edificios-jujuy.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Arquitectura de la Quebrada y la Puna: adobe, techos planos de torta de barro con vigas, puertas de cardón y pircas. Sin letras.</div>
<section><div class="linea">
${e('E24', 'Posta', 'posta · Jujuy', postaJ(), 'Casa larga de adobe con techo plano de torta de barro y las vigas asomando, galería sobre postes de algarrobo, zócalo de pirca, puerta de cardón, campana y tinajas.')}
${e('E25', 'Almacén', 'almacén', almacenJ(), 'Adobe encalado con zócalo azul, puerta doble de cardón, reja de despacho, cartel pintado con pan y queso, y banco de adobe con una planta.')}
${e('E26', 'Casa', 'casa de vecino', casaJ(), 'Adobe con techo de torta donde se secan papas de colores, escalera de cardón para subir al techo, chimenea que humea y horno de barro al costado.')}
</div><div class="linea">
${e('E27', 'Curandera', 'casa de la curandera', curanderaJ(), 'Casita de pirca con techo de paja brava, puerta de cardón, ramada con atados de yuyos y un sahumerio que humea.')}
${e('E28', 'Talabartería', 'talabartería', talabarteriaJ(), 'Adobe con alero de caña, riendas trenzadas colgando, un recado con pellón tejido en el caballete y cartel de madera con un estribo.')}
${e('E29', 'Feria', 'feria', feriaJ(), 'Puestos de pirca con techo de aguayo: papas andinas de colores, tejidos y cerámica.')}
</div></section>`;
const css = `.lienzo.ed{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}
@keyframes yuyo{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}@keyframes humo{0%{opacity:0;transform:translateY(0)}40%{opacity:.8}100%{opacity:0;transform:translateY(-24px)}}@keyframes lazo{0%,100%{transform:rotate(0)}50%{transform:rotate(1.5deg)}}@keyframes campana{0%,100%{transform:rotate(0)}50%{transform:rotate(10deg)}}
.yuyo{animation:yuyo 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0%}.humo circle{animation:humo 3.3s ease-out infinite;transform-box:view-box}.lazo{animation:lazo 3s ease-in-out infinite;transform-box:view-box;transform-origin:120px 100px}.campana{animation:campana 1.6s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-23.html', import.meta.url), pagina('Catálogo para aprobar · lote 10a', 'Edificios de Jujuy (1 de 2)', cuerpo, css));
console.log('ok');
