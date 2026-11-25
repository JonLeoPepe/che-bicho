// Catálogo para aprobar, lote 9b: vecinos de Jujuy.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { tejedora, pastora, andinista, fidel } from './personas-jujuy.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Proporción adulta, pose propia y solo lo que llevan encima o en la mano.</div>
<section><div class="grilla">
${p('P34', 'Tejedora Dominga', 'vecina · Tilcara', tejedora(), 'Unos 60 años, hilando lana con el huso que gira colgando y el vellón en la rueca. Sombrero negro, trenzas, aguayo al cuello y pollera verde. Cambio el nombre: en el juego era Rufina, igual que Ña Rufina de Salta.')}
${p('P35', 'Pastora Juana', 'vecina · puesto de la Puna', pastora(), 'Unos 30 años, con un corderito cruzado sobre los hombros, sosteniéndolo de las patas. Sombrero blanco de lana con cinta verde, blusa naranja, aguayo en la cintura, pollera marrón y ojotas.')}
${p('P36', 'Andinista Lucía', 'vecina · campamento en el cerro', andinista(), 'Unos 30 años, con la mochila grande y la piqueta en alto señalando la cumbre. Campera naranja, gorro con anteojos de nieve y botas rojas, con un pie más arriba como si subiera.')}
${p('P37', 'Don Fidel', 'vecino · rancho en las yungas', fidel(), 'Unos 70 años, planta flores para los picaflores: regadera en una mano y maceta de salvia roja en la otra, con un picaflor cerca. Sombrero de paja, chaleco verde y barba blanca.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes huso{0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}}@keyframes cordero{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}@keyframes picaflor{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,-2px)}}@keyframes agua{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(8px)}}
.huso{animation:huso .6s linear infinite;transform-box:fill-box;transform-origin:50% 50%}.cordero{animation:cordero 2.4s ease-in-out infinite;transform-box:view-box;transform-origin:60px 56px}.picaflor{animation:picaflor .5s ease-in-out infinite;transform-box:view-box}.agua{animation:agua 1s ease-in infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-22.html', import.meta.url), pagina('Catálogo para aprobar · lote 9b', 'Gente de Jujuy: los cuatro vecinos', cuerpo, css));
console.log('ok');
