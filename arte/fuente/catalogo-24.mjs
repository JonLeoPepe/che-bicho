// Catálogo para aprobar, lote 10b: edificios de Jujuy (2 de 2).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { terminalJ, pagoJ, puestoPastora, refugio, ranchoYungas } from './edificios-jujuy.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Sin letras.</div>
<section><div class="linea">
${e('E30', 'Terminal', 'terminal · Jujuy', terminalJ(), 'Terminal de materiales de la Quebrada: zócalo alto de pirca, techo grande de chapa a un agua sobre vigas de madera, torre de piedra con reloj y andén con pérgola de cardón. Distinta de la de Salta y la de Corrientes.')}
${e('E31', 'Pago de la capataza', 'pago · Purmamarca', pagoJ(), 'Casona de adobe con un frontón escalonado en el centro donde está tallado el Cerro de Siete Colores de la insignia, portón de cardón en arco, balconcitos de madera, dos alas con techo de torta y tinajas.')}
${e('E32', 'Puesto de la pastora', 'puesto de la Puna', puestoPastora(), 'Casita de piedra con techo de paja brava a dos aguas, puerta de cardón, un aguayo colgado afuera y el corral de pirca con tranquera de cardón.')}
</div><div class="linea">
${e('E33', 'Campamento de la andinista', 'campamento en el cerro', refugio(), 'Refugio de piedra con techo de chapa curva y antena, y al lado una carpa de montaña amarilla con la mochila y la piqueta apoyadas.')}
${e('E34', 'Rancho de Don Fidel', 'rancho en las yungas', ranchoYungas(), 'Casa de madera pintada sobre pilotes bajos, con techo de chapa a dos aguas, jardineras con flores rojas, una enredadera florida y un picaflor.')}
</div></section>`;
const css = `.lienzo.ed{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}
@keyframes picaflor{0%,100%{transform:translate(0,0)}50%{transform:translate(-3px,-2px)}}.picaflor{animation:picaflor .5s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-24.html', import.meta.url), pagina('Catálogo para aprobar · lote 10b', 'Edificios de Jujuy (2 de 2)', cuerpo, css));
console.log('ok');
