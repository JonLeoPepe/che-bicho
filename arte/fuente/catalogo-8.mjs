// Catálogo para aprobar, lote 4b: terminal, micro, pago, rancho del maestro, carpa y puesto de la Puna.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { terminal, micro, pago, ranchoMaestro, carpa, puestoPuna } from './edificios2.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Mismo estilo que el mapa, sin nada alrededor y sin letras.</div>
<section><div class="grilla">
${e('E7', 'Terminal de ómnibus', 'Don Ernesto · pasajes', terminal(), 'Edificio de los años 50: torre escalonada con reloj, franjas verde agua, boletería con reja y un andén con techo de chapa y banco. El cartel muestra un micro dibujado.')}
${e('E8', 'Micro antiguo', 'viaje entre provincias', micro(), 'Micro de trompa redonda, rojo y crema con franja cromada, parrilla con valijas y ruedas con tazas. Las ruedas giran cuando arranca.')}
${e('E9', 'Pago del capataz', 'pelea por la insignia', pago(), 'Casco de estancia encalado con techo de tejas, arcos laterales y un gran arco de entrada con reja. Arriba, la insignia de plata de la provincia en relieve, y dos faroles.')}
${e('E10', 'Rancho del maestro', 'Don Abel · cura y consejo', ranchoMaestro(), 'Reemplaza a la casa de mamá. Techo de paja, adobe a la vista, galería de palos con boleadoras colgadas, una montura sobre su caballete y el horno de barro humeando.')}
${e('E11', 'Carpa', 'Acampante Martina', carpa(), 'Carpa iglú naranja con varillas grises, puerta enrollada y vientos estaqueados.')}
${e('E12', 'Puesto de la Puna', 'Puestero de la Puna', puestoPuna(), 'Casita de piedra con techo de paja brava, puerta baja y ventanita, y un corralito de pirca al costado.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}.lienzo.ed{background:radial-gradient(circle at 50% 85%,#c9d39a,#e3d2b2 75%)}
@keyframes boleo{0%,100%{transform:rotate(0)}50%{transform:rotate(6deg)}}@keyframes humo{0%{transform:translate(0,0) scale(.6);opacity:.7}100%{transform:translate(8px,-30px) scale(1.8);opacity:0}}@keyframes rueda{to{transform:rotate(-360deg)}}
.boleo{animation:boleo 2.2s ease-in-out infinite;transform-box:view-box}.humo circle{animation:humo 3.3s ease-out infinite;transform-box:fill-box;transform-origin:center}.rueda{animation:rueda 2.4s linear infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-8.html', import.meta.url), pagina('Catálogo para aprobar · lote 4b', 'Edificios de Salta: terminal, micro, pago del capataz, rancho del maestro, carpa y puesto de la Puna', cuerpo, css));
console.log('ok');
