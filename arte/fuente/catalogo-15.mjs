// Catálogo para aprobar, lote 7a: edificios de Corrientes.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { postaC, almacenC, casaC, curanderaC, talabarteriaC, feriaC } from './edificios-corrientes.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Arquitectura correntina: cal, tejas musleras, galerías sobre horcones, tierra colorada y paja. Sin letras.</div>
<section><div class="linea">
${e('E13', 'Posta', 'posta · Corrientes', postaC(), 'Casona colonial de cal con galería larga sobre horcones de madera, techo de tejas musleras, puerta de arco y postigos azules, campana en la viga y palenque al frente.')}
${e('E14', 'Almacén', 'almacén de esquina', almacenC(), 'Almacén de esquina en ochava: cornisa y pretil con pilastras y jarrones, puerta alta con banderola en la esquina, toldo de lona a rayas sobre la reja de despacho, banco en la vereda y cartel pintado con mate y chipá.')}
${e('E15', 'Casa', 'casa de vecino', casaC(), 'Casa de tierra colorada con galería de tejas, postigos verdes y una mburucuyá trepando por el horcón.')}
</div><div class="linea">
${e('E16', 'Curandera', 'casa de la curandera', curanderaC(), 'Rancho de estanteo con techo de paja y ramada con atados de yuyos colgando; ollas de barro con un fuego que humea.')}
${e('E17', 'Talabartería', 'talabartería', talabarteriaC(), 'Ladrillo visto con alero de chapa, lazos y riendas colgando, un recado con matra en el caballete y cartel pintado con un estribo.')}
${e('E18', 'Feria', 'feria', feriaC(), 'Tres puestos con techo de hoja de palma: chipá, naranjas y mamones, y pescado del río colgado.')}
</div></section>`;
const css = `.lienzo.ed{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}
@keyframes yuyo{0%,100%{transform:rotate(0)}50%{transform:rotate(4deg)}}@keyframes humo{0%{opacity:0;transform:translateY(0)}40%{opacity:.8}100%{opacity:0;transform:translateY(-24px)}}@keyframes lazo{0%,100%{transform:rotate(0)}50%{transform:rotate(1.5deg)}}@keyframes campana{0%,100%{transform:rotate(0)}50%{transform:rotate(10deg)}}
.yuyo{animation:yuyo 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0%}.humo circle{animation:humo 3.3s ease-out infinite;transform-box:view-box}.lazo{animation:lazo 3s ease-in-out infinite;transform-box:view-box;transform-origin:120px 100px}.campana{animation:campana 1.6s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-15.html', import.meta.url), pagina('Catálogo para aprobar · lote 7a', 'Edificios de Corrientes (1 de 2)', cuerpo, css));
console.log('ok');
