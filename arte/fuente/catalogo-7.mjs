// Catálogo para aprobar, lote 4a: edificios de Salta (almacén, curandera, talabartería, feria).
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { almacen, curanderaCasa, talabarteria, feria } from './edificios.mjs';
const e = (cod, nom, rol, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo ed">${svg('0 0 240 200', dib)}</div><figcaption><b>${nom}</b><span class="tag">${rol}</span><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Mismo estilo y vista que el mapa aprobado, sin nada alrededor y sin letras en los carteles. La posta (E1) y el rancho (E2) ya los aprobaste en el mapa.</div>
<section><div class="grilla">
${e('E3', 'Almacén de ramos generales', 'Doña Rosa · encargos y libreta', almacen(), 'Casa larga encalada con techo de tejas y zócalo bordó. Galería con alero de chapa curva sobre columnas de hierro verde, tres puertas con vidrios, bolsas de harina apiladas, un banco y un farol. El cartel no tiene letras: muestra un mate, una lata de yerba y una naranja pintados.')}
${e('E4', 'Casa de la curandera', 'Ña Rufina · yuyos y limpia', curanderaCasa(), 'Rancho de adobe con techo de caña y barro, puerta turquesa con cruz de palma y una ramada de la que cuelgan atados de yuyos que se mueven con el viento. Ruda en latas en la puerta.')}
${e('E5', 'Talabartería', 'Don Ramiro · mejoras de equipo', talabarteria(), 'Ladrillo a la vista y techo de chapa. Portón de madera abierto con una montura adentro, cartel con forma de montura (sin letras) y un cuero estaqueado en la pared.')}
${e('E6', 'Feria', 'Marga · objetos y comida', feria(), 'Dos puestos con toldo a rayas rojo y verde, cajones de tomates, zapallos, choclos, uvas y duraznos, y una balanza de colgar que se balancea.')}
</div></section>`;
const css = `.grilla{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}.lienzo.ed{background:radial-gradient(circle at 50% 85%,#c9d39a,#e3d2b2 75%)}
@keyframes yuyo{0%,100%{transform:rotate(0)}50%{transform:rotate(6deg)}}.yuyo,.balanza{animation:yuyo 2.2s ease-in-out infinite;transform-box:view-box}`;
writeFileSync(new URL('./catalogo-7.html', import.meta.url), pagina('Catálogo para aprobar · lote 4a', 'Edificios de Salta: almacén, curandera, talabartería y feria', cuerpo, css));
console.log('ok');
