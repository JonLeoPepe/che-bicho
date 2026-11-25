// Catálogo para aprobar, lote 6b: vecinos de Corrientes.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { pocha, canoero, guardaparque, mielera } from './personas-corrientes.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Proporción adulta, pose propia y solo lo que llevan encima o en la mano.</div>
<section><div class="grilla">
${p('P25', 'Doña Pocha', 'vecina · chamamecera', pocha(), 'Unos 60 años, con la canasta de chipá recién horneado en la cadera y saludando con la otra mano. Rodete canoso, aros dorados, blusa amarilla, pollera azul y delantal floreado.')}
${p('P26', 'Canoero Eusebio', 'vecino · rancho en la orilla', canoero(), 'Unos 50 años, remendando la red de pesca estirada entre las manos, con la aguja. Boina azul, camiseta sin mangas, pantalón arremangado y alpargatas.')}
${p('P27', 'Guardaparque Sol', 'vecina · puesto de guardaparques', guardaparque(), 'Unos 30 años, anotando el censo de ciervos en la libreta. Uniforme caqui con escudo de hoja (sin letras), sombrero de ala plana y botas.')}
${p('P28', 'Mielera Ña Elena', 'vecina · casucha en el monte', mielera(), 'Unos 60 años, con el ahumador echando humo en una mano y un frasco de miel en la otra. Sombrero con el velo levantado, guantes y un par de abejas alrededor.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes saluda{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}}@keyframes red{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.03)}}@keyframes lapiz{0%,100%{transform:translate(0,0)}50%{transform:translate(-2px,1px)}}@keyframes humo{0%{opacity:0;transform:translateY(6px)}40%{opacity:.9}100%{opacity:0;transform:translateY(-10px)}}@keyframes abeja{0%,100%{transform:translate(0,0)}25%{transform:translate(3px,-2px)}75%{transform:translate(-2px,2px)}}
.saluda{animation:saluda 1.2s ease-in-out infinite;transform-box:view-box}.red{animation:red 2s ease-in-out infinite;transform-box:view-box;transform-origin:60px 96px}.lapiz{animation:lapiz .6s ease-in-out infinite;transform-box:view-box}.humo circle{animation:humo 2s ease-out infinite;transform-box:view-box}.humo circle:nth-child(2){animation-delay:.6s}.humo circle:nth-child(3){animation-delay:1.2s}.abejas>g{animation:abeja .7s linear infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-14.html', import.meta.url), pagina('Catálogo para aprobar · lote 6b', 'Gente de Corrientes: los cuatro vecinos', cuerpo, css));
console.log('ok');
