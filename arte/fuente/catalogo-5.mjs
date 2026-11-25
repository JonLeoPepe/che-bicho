// Catálogo para aprobar, lote 3b: vecinos de Salta.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { rosa, maestra, puesteroPuna, acampante, pulpero, alambrador } from './personas-salta2.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Proporción adulta, sin objetos alrededor, una pose propia para cada uno.</div>
<section><div class="grilla">
${p('P9', 'Doña Rosa', 'almacenera · Cerrillos', rosa(), 'Unos 65 años, anotando en la libreta de fiado (la que después te regala). Guardapolvo a cuadros, anteojos, rodete y el lápiz en la oreja. Versión adulta de la que aprobaste en la muestra.')}
${p('P10', 'Maestra Inés', 'vecina · Salta', maestra(), 'Unos 35 años, guardapolvo blanco con moño azul, libros bajo el brazo y la campana de la escuela en alto.')}
${p('P11', 'Puestero de la Puna', 'vecino lejano · Puna', puesteroPuna(), 'Unos 50 años, tocando la quena. Chullo de lana con orejeras y borla, poncho de llama con guarda de colores y ojotas.')}
${p('P12', 'Acampante Martina', 'vecina lejana · quebrada', acampante(), 'Unos 25 años, saludando con la mano. Mochila grande con bolsa de dormir, gorro de lana, campera verde, bastón y borceguíes.')}
${p('P13', 'Pulpero Cacho', 'vecino · Salta', pulpero(), 'Unos 50 años, panzón y orgulloso de su pulpería: una mano en la cintura y el sifón de vidrio verde en alto. Delantal largo atado a la cintura, mangas arremangadas, repasador a cuadros al hombro, bigote y pelada.')}
${p('P14', 'Alambrador Tito', 'vecino · ruta', alambrador(), 'Unos 40 años, con el rollo de alambre al hombro y la pinza de mango rojo. Sombrero de ala corta y camisa de trabajo.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes escribe{0%,100%{transform:translate(0,0)}25%{transform:translate(-2px,1px)}75%{transform:translate(2px,-1px)}}@keyframes campana{0%,100%{transform:rotate(0)}50%{transform:rotate(14deg)}}@keyframes saluda{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg)}}
.sifon{animation:campana 2.4s ease-in-out infinite;transform-box:view-box}.escribe{animation:escribe .7s ease-in-out infinite;transform-box:view-box}.campana{animation:campana .5s ease-in-out infinite;transform-box:view-box}.saluda{animation:saluda .9s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-5.html', import.meta.url), pagina('Catálogo para aprobar · lote 3b', 'Vecinos de Salta: almacenera, maestra, puestero de la Puna, acampante, pulpero y alambrador', cuerpo, css));
console.log('ok');
