// Catálogo para aprobar, lote 3a: capataz y domadores de Salta.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { anselmo, arriero, puestero, copleraSalta, baqueano } from './personas-salta.mjs';
const p = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo gente">${svg('0 0 120 220', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Todos en proporción adulta, sin objetos alrededor. Cada uno tiene una pose propia para que se distingan de lejos en el mapa.</div>
<section><div class="grilla">
${p('P4', 'Capataz Anselmo', 'capataz · Salta ★', anselmo(), 'Unos 45 años, de brazos cruzados. Poncho salteño rojo con guarda negra, sombrero negro con barbijo, bigote tupido y rebenque en la cintura. Serio, no enojado.')}
${p('P5', 'Arriero Benito', 'domador · valle', arriero(), 'Unos 35 años, con el lazo enrollado al hombro. Camisa celeste arremangada, chaleco de cuero, pañuelo azul, polainas de cuero y barba de tres días.')}
${p('P6', 'Puestero Cirilo', 'domador · quebrada', puestero(), 'Unos 65 años, apoyado con las dos manos en el cayado. Boina, ponchillo marrón con guarda, bigote canoso y ojotas.')}
${p('P7', 'Coplera Eusebia', 'domadora · Puna', copleraSalta(), 'Unos 35 años, cantando con la caja y la maza. Sombrero de paja con cinta roja, chal cruzado y pollera azul. Cambio el nombre: en el juego se llamaba Doña Rosa, igual que la almacenera.')}
${p('P8', 'Baqueano Fermín', 'domador · yungas', baqueano(), 'Unos 40 años, agachado leyendo rastros con la mano en el suelo. Sombrero aludo de paja, camisa verde oliva y pañuelo rojo.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.lienzo.gente{background:radial-gradient(circle at 50% 80%,#e9e2d6,#d9cfbd 70%)}.lienzo.gente svg{max-height:300px}
@keyframes maza{0%,100%{transform:rotate(0)}50%{transform:rotate(-18deg)}}@keyframes lazo{0%,100%{transform:rotate(0)}50%{transform:rotate(2deg)}}
.maza{animation:maza .8s ease-in-out infinite;transform-box:view-box}.lazo{animation:lazo 3s ease-in-out infinite;transform-box:view-box;transform-origin:64px 78px}`;
writeFileSync(new URL('./catalogo-4.html', import.meta.url), pagina('Catálogo para aprobar · lote 3a', 'Gente de Salta: el capataz y los cuatro domadores', cuerpo, css));
console.log('ok');
