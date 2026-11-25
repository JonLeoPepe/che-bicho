// Catálogo para aprobar, lote 7b: edificios de Corrientes (2 de 2).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { terminalC, pagoC, ranchoOrilla, guardaparques, casuchaMiel } from './edificios-corrientes.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Sin letras.</div>
<section><div class="linea">
${e('E19', 'Terminal', 'terminal · Corrientes', terminalC(), 'Terminal de los años 60: alero de hormigón ondulado sobre columnas en V, ventanales, zócalo de azulejos celestes, pilón con reloj y bancos en el andén.')}
${e('E20', 'Estancia del capataz', 'pago · Colonia Pellegrini', pagoC(), 'Casco de estancia con galería y tejas, frontón con el acordeón de la insignia en relieve y un mangrullo de troncos al costado para mirar el estero.')}
${e('E21', 'Rancho del canoero', 'rancho en la orilla', ranchoOrilla(), 'Rancho de tablas sobre pilotes en la orilla, techo de paja, escalera, la red colgada a secar y la canoa varada abajo.')}
</div><div class="linea">
${e('E22', 'Puesto de guardaparques', 'puesto de guardaparques', guardaparques(), 'Cabaña de madera elevada con techo de chapa verde y panel solar, escalera, mangrullo de troncos y cartel con un ciervo pintado.')}
${e('E23', 'Casucha de la mielera', 'casucha en el monte', casuchaMiel(), 'Rancho chico de adobe y paja con frascos de miel en la ventana y tres cajones de colmena al costado, con abejas.')}
</div></section>`;
const css = `.lienzo.ed{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}
@keyframes red{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}@keyframes flota{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}@keyframes abeja{0%,100%{transform:translate(0,0)}25%{transform:translate(3px,-2px)}75%{transform:translate(-2px,2px)}}
.red{animation:red 3s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0%}.flota{animation:flota 2.4s ease-in-out infinite;transform-box:view-box}.abejas>g{animation:abeja .7s linear infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-16.html', import.meta.url), pagina('Catálogo para aprobar · lote 7b', 'Edificios de Corrientes (2 de 2)', cuerpo, css));
console.log('ok');
