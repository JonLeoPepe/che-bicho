// Catálogo para aprobar, lote 15f: galpones de capataz y ermitaños de los rincones.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { css } from './catalogo-29.mjs';
import { galponS, galponC, galponJ } from './edificios-galpon.mjs';
import { anselmo } from './personas-salta.mjs';
import { rosendo } from './personas-corrientes.mjs';
import { eulogia } from './personas-jujuy.mjs';
import { higinio, anacleto, pascual } from './personas-ermitanos.mjs';

const fig = (cod, nom, dib, vb, txt, w = '') => `<figure class="pz"><span class="cod">${cod}</span><div class="lz">${svg(vb, dib)}</div><figcaption><b>${nom}</b><p>${txt}</p></figcaption></figure>`;
const G = [
  ['G1', 'Galpón de Salta', galponS(), 'Galpón de estancia de adobe, frontón a dos aguas con tejas coloniales, portón de tablas con flejes, ventanas con barrotes, faroles y fardos de alfalfa. Por dentro es el galpón aprobado: adobe, vigas oscuras y fardos.', 'C1', 'Capataz Anselmo', anselmo()],
  ['G2', 'Galpón de Corrientes', galponC(), 'Ladrillo a la vista y techo de chapa a dos aguas, con galería de chapa sobre postes de quebracho, portón verde y rejas celestes. Por dentro: ladrillo y chapa, como el aprobado.', 'C2', 'Capataz Rosendo', rosendo()],
  ['G3', 'Galpón de Jujuy', galponJ(), 'Bajo y ancho: zócalo de pirca, adobe arriba y techo plano de torta de barro con vigas. Portón doble de cardón, aguayo colgado y corral de pirca pegado al costado. Por dentro: piedra y caña.', 'C3', 'Capataza Eulogia', eulogia()],
];
const E = [
  ['R1', 'Don Higinio, ermitaño del monte (Salta)', higinio(), 'Mielero viejo del monte cerrado. Barba blanca larga, sombrero aludo de paja gastado, calabaza de miel y morral. Pide chipá. Su puesto vende miel de monte.'],
  ['R2', 'Don Anacleto, ermitaño de la isla (Corrientes)', anacleto(), 'Isleño flaco y alto, sombrero de paja de copa redonda, camisa celeste, descalzo y con farol: vive de noche, como el Pombero. Pide tamales.'],
  ['R3', 'Don Pascual, ermitaño de las cumbres (Jujuy)', pascual(), 'Pastor de altura: poncho largo de vicuña, chullo con orejeras y ojotas, bastón de queñoa. Silueta de triángulo. Pide empanadas salteñas.'],
];
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué).</div>
<section><h3>Galpones de capataz (por fuera) y su capataz</h3><p class="nota">Reemplazan al "pago del capataz", que parecía un edificio de pueblo. Cada uno usa los materiales del interior ya aprobado. Los capataces son los aprobados.</p><div class="dos">${G.map(([c, n, d, t, c2, n2, d2]) => `${fig(c, n, d, '0 0 240 200', t)}${fig(c2, n2, d2, '0 0 120 215', 'Aprobado.')}`).join('')}</div></section>
<section><h3>Ermitaños de los rincones</h3><p class="nota">Uno por rincón; pelea con 4 de 6 como el capataz y paga más que un domador. Siluetas distintas: barba larga, farol, poncho en triángulo.</p><div class="tres">${E.map(([c, n, d, t]) => fig(c, n, d, '0 0 120 215', t)).join('')}</div></section>`;
const css2 = css + `.dos{display:grid;grid-template-columns:2fr 1fr;gap:12px}.tres{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.pz{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;position:relative}.pz .lz{background:#efe6d4;border-radius:10px;padding:8px}.pz svg{width:100%;height:auto;display:block;max-height:340px}.pz figcaption p{font-size:13px;margin:4px 0 0}@media (max-width:700px){.dos,.tres{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-42.html', import.meta.url), pagina('Catálogo para aprobar, lote 15f', 'Galpones de capataz y ermitaños', cuerpo, css2));
console.log('ok 42');
