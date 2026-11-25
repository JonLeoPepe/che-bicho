// Catálogo para aprobar, lote 20c: Cañero Zenón y el mapa de Jujuy dibujado con el kit, una pantalla por zona.
import { writeFileSync } from 'node:fs';
import { svg, pagina } from './base-arte.mjs';
import { jugador } from './adultos.mjs';
import { O, tel, css } from './catalogo-29.mjs';
import { hud, equipoMini, mini } from './catalogo-35.mjs';
import { postaJ, almacenJ, curanderaJ, feriaJ, terminalJ, casaJ, puestoPastora, refugio, ranchoYungas } from './edificios-jujuy.mjs';
import { galponJ, conMicro } from './edificios-galpon.mjs';
import { bagualera, minero, pastora, andinista } from './personas-jujuy.mjs';
import { zenon } from './personas-ermitanos.mjs';
import { suri, wiskacha, mayuq, chinchay } from './catalogo-18.mjs';
import { quinti, aguijon, tolvanera } from './catalogo-19.mjs';
import { puma } from './puma-muestra.mjs';
import { fogon, cssFogon } from './marca-changa.mjs';
import { micro } from './edificios2.mjs';
import { rio } from './kit-salta.mjs';
import * as K from './kit-jujuy.mjs';

const marco = (id, cont) => svg('0 0 360 760', `<defs><clipPath id="t${id}"><rect width="360" height="760" rx="26"/></clipPath></defs><g clip-path="url(#t${id})">${cont}</g>`);
const pj = (x, y) => `<g transform="translate(${x} ${y}) scale(.3)">${jugador()}</g>`;
const gente = (x, y, f, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -.3 : .3} .3)${flip ? ' translate(-120 0)' : ''}">${f()}</g>`;
const bicho = (x, y, f, s = .42, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})${flip ? ' translate(-200 0)' : ''}">${f()}</g>`;
const ed = (x, y, f, s = .7) => `<g transform="translate(${x} ${y}) scale(${s})">${f()}</g>`;
const pie = `${equipoMini}${mini}`;
const fondoP = (k, seed, id) => `<defs>${K.patron('f' + id, k, seed)}</defs><rect width="360" height="760" fill="url(#f${id})"/>`;
const camino = (d, k, id, w = 40) => `<defs>${K.patron('c' + id, k, 9)}</defs><path d="${d}" stroke="url(#c${id})" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
const sogaGris = (x, y) => `<g transform="translate(${x} ${y})"><circle r="13" fill="#8a8478" opacity=".2"/><circle r="12" fill="#f4ead2" stroke="${O}" stroke-width="1.6"/><ellipse rx="7" ry="5" fill="none" stroke="#9a958c" stroke-width="2.6"/><ellipse rx="3.6" ry="2.4" fill="none" stroke="#9a958c" stroke-width="2"/><path d="M2,-5 C5,-2 6,2 5,7" stroke="#9a958c" stroke-width="2" fill="none"/></g>`;

// Z1 San Salvador
const Z1 = marco('z1', `${fondoP('tierraPueblo', 4, 'z1')}${K.rioQuebrada('M-20,560 C80,540 200,580 380,560', 46, 6)}${K.puente(150, 538, 50, 22)}
  ${camino('M175,800 C178,700 176,620 175,560 C174,480 180,380 200,96', 'ripio', 'z1', 34)}
  ${ed(4, 110, () => conMicro(terminalJ, micro, ['#2f5a8a', '#1f3f6a', '#4a7ab8']), .46)}${ed(226, 112, postaJ, .48)}
  ${ed(6, 330, casaJ, .55)}${ed(230, 336, casaJ, .5)}
  ${K.queñoa(320, 460, .7, 15)}${pj(150, 400)}
  ${hud('San Salvador de Jujuy', 12, 'manana', 'despejado')}${pie}`);

// Z2 Yungas
const Z2 = marco('z2', `${fondoP('hojarasca', 5, 'z2')}${rio('M380,120 C300,200 260,300 300,420 C330,520 300,640 380,760', 34)}
  ${camino('M-20,640 C60,600 120,520 150,440 C170,380 160,300 120,200', 'tierraPueblo', 'z2', 30)}
  ${K.cebil(60, 220, .9, 38)}${K.cebil(220, 210, .8, 39)}${K.cebil(40, 720, .8, 40)}${K.helechos(120, 600, 1.1)}${K.helechos(240, 700, 1)}
  ${ed(10, 300, ranchoYungas, .5)}${fogon(108, 438, 1.1)}${gente(130, 370, bagualera)}
  ${bicho(196, 440, mayuq, .34)}${gente(200, 560, zenon, true)}${pj(110, 520)}
  ${hud('Yungas de Calilegua', 12, 'tarde', 'nublado')}${pie}`);

// Z3 Purmamarca (centro)
const Z3 = marco('z3', `${fondoP('tierraPueblo', 6, 'z3')}${K.cerroColores(-20, 96, 400, 150)}
  ${ed(8, 256, galponJ, .5)}${ed(220, 254, postaJ, .5)}
  <defs>${K.patron('pl3', 'ripio', 2)}</defs><rect x="160" y="392" width="186" height="112" rx="16" fill="url(#pl3)" stroke="${O}" stroke-width="2"/>
  ${ed(8, 398, curanderaJ, .46)}${K.queñoa(300, 490, .6, 16)}
  ${ed(8, 532, almacenJ, .5)}${ed(218, 540, feriaJ, .5)}
  ${pj(210, 410)}
  ${hud('Purmamarca, Jujuy', 13, 'manana', 'despejado')}${pie}`);

// Z4 Quebrada alrededor de Purmamarca
const Z4 = marco('z4', `${fondoP('ocre', 7, 'z4')}${camino('M180,800 C170,640 200,520 180,400 C170,300 190,200 180,90', 'ripio', 'z4', 40)}
  ${ed(10, 130, puestoPastora, .55)}${K.corralPirca(190, 170, 140, 70)}${fogon(112, 292, 1.1)}${gente(140, 232, pastora)}
  ${K.cardon(60, 480, 1)}${K.cardon(320, 600, .9)}${K.tola(260, 420, 1.2)}${K.tola(300, 450, 1)}${K.roca(80, 620, 1.4, 63, false)}${K.roca(250, 640, 1.1, 64)}
  ${bicho(250, 360, aguijon, .3)}${bicho(30, 540, wiskacha, .3)}${bicho(240, 520, puma, .34, true)}
  ${pj(160, 470)}
  ${hud('Quebrada, Purmamarca', 13, 'tarde', 'despejado')}${pie}`);

// Z5 Humahuaca y quebrada alta
const Z5 = marco('z5', `${fondoP('ripio', 8, 'z5')}${K.rioQuebrada('M300,96 C296,260 304,420 320,560 C330,660 340,720 350,780', 46, 7)}${K.puente(276, 300, 60, 22)}
  ${camino('M-20,320 C80,316 200,312 380,310', 'ocre', 'z5', 34)}
  ${ed(8, 120, postaJ, .46)}${ed(170, 128, casaJ, .42)}
  ${K.queñoa(60, 470, .9, 17)}${K.queñoa(150, 520, .8, 18)}${K.cardon(240, 470, .9)}${K.cardon(60, 650, .8)}${K.roca(200, 640, 1.2, 65, false)}
  ${bicho(100, 380, quinti, .3)}${bicho(140, 620, wiskacha, .28)}
  ${gente(220, 360, andinista, true)}${pj(160, 430)}
  ${hud('Humahuaca, Jujuy', 14, 'manana', 'viento')}${pie}`);

// Z6 Puna
const Z6 = marco('z6', `${fondoP('ripio', 9, 'z6')}<rect y="96" width="360" height="110" fill="#bcd4e8"/>${K.nevados(-20, 110, 220, 96)}${K.nevados(150, 100, 240, 106)}
  <defs>${K.patron('sal6', 'salar', 9)}${K.patron('veg6', 'vega', 4)}</defs><path d="M170,470 C230,440 330,450 350,500 C360,540 280,570 210,560 C160,550 140,500 170,470Z" fill="url(#sal6)" stroke="${O}" stroke-width="2"/>
  <path d="M-10,560 C50,540 110,560 130,610 C140,650 60,670 -10,660Z" fill="url(#veg6)" stroke="${O}" stroke-width="2"/>${K.ojoDeAgua(40, 600, 1)}${K.ojoDeAgua(90, 630, .8)}
  ${camino('M-20,330 C100,320 200,310 380,300', 'ocre', 'z6', 30)}
  ${ed(220, 210, refugio, .55)}
  ${K.pajaBrava(60, 420, 1.3)}${K.pajaBrava(120, 470, 1.1)}${K.pajaBrava(320, 420, 1.2)}${K.tola(60, 520, 1)}
  ${bicho(60, 220, suri, .36)}${bicho(220, 380, tolvanera, .34)}
  ${gente(120, 260, minero, true)}${pj(170, 330)}
  ${hud('Puna, Abra Pampa', 15, 'tarde', 'viento')}${pie}`);

// Z7 Cumbres del Chañi (rincón cerrado)
const Z7 = marco('z7', `${fondoP('nevado', 10, 'z7')}<rect y="96" width="360" height="120" fill="#bcd4e8"/>${K.nevados(-30, 96, 420, 140)}
  ${K.risco(60, 220, 240, 200, false, 94)}
  ${camino('M180,800 C176,700 190,600 180,440', 'ripio', 'z7', 30)}
  ${K.yareta(60, 520, 1.2)}${K.yareta(300, 560, 1)}${K.roca(260, 480, 1.3, 66, false)}${K.roca(80, 620, 1, 67)}
  ${bicho(250, 600, chinchay, .3)}
  ${sogaGris(180, 340)}${pj(165, 470)}
  ${hud('Cumbres del Chañi', 15, 'manana', 'despejado')}${pie}`);

const tarjetaZ = `<figure class="pz"><span class="cod">P38</span><div class="lz">${svg('0 0 120 215', zenon())}</div><figcaption><b>Cañero Zenón, domador de las yungas</b><p>Zafrero del ingenio: sombrero de paja aludo, camisa celeste arremangada, pañuelo rojo al cuello y un atado de cañas de azúcar al hombro (silueta propia). Lleva bichos de Jujuy.</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>Aprobado</b> o <b>Cambiar</b> (y qué). Cada bicho está donde le corresponde por tipo.</div>
<section><h3>Domador nuevo</h3><div class="uno">${tarjetaZ}</div></section>
<section><h3>Mapa de Jujuy, zona por zona</h3><div class="tres">
${tel('Z1', 'San Salvador de Jujuy', Z1, 'Terminal con su micro azul y posta al llegar por la Ruta 9; casas de adobe. Abajo el río con su puente, por donde sale el sendero a las cumbres.')}
${tel('Z2', 'Yungas de Calilegua', Z2, 'Cebiles, helechos y hojarasca; el río torrentoso con Mayuq en la orilla. El rancho de la bagualera Delfina con su fogón prendido y el domador Cañero Zenón.')}
${tel('Z3', 'Purmamarca (centro)', Z3, 'Al pie del cerro de siete colores: galpón de Eulogia, posta, almacén, curandera y feria alrededor de la plaza.')}
${tel('Z4', 'Quebrada, alrededor de Purmamarca', Z4, 'El puesto de la pastora Juana con su corral de pirca y su fogón prendido. Cardones, tola y rocas: Aguijón en la tola, Wiskacha junto a las rocas y Allpuma en la tierra abierta.')}
${tel('Z5', 'Humahuaca y quebrada alta', Z5, 'Río de quebrada con puente, posta chica y casa. Queñoas con Quinti en lo alto, Wiskacha junto a las piedras y la domadora Andinista Lucía.')}
${tel('Z6', 'Puna, Abra Pampa', Z6, 'Nevados al fondo, salar, vega con ojos de agua, paja brava y tola. El refugio como posta chica, el domador Minero Aniceto, Suri y una Tolvanera.')}
${tel('Z7', 'Cumbres del Chañi (rincón)', Z7, 'El risco corta el paso a las cumbres: la soga en gris hasta tenerla. Yareta, rocas y Chinchay en el frío.')}
</div></section>`;
const css2 = css + cssFogon + `.uno{max-width:260px}.pz{margin:0;background:#fffaf0;border:1.5px solid #d8c8a8;border-radius:14px;padding:10px;position:relative}.pz .lz{background:#efe6d4;border-radius:10px;padding:8px}.pz svg{width:100%;height:auto;display:block;max-height:300px}.pz figcaption p{font-size:13px;margin:4px 0 0}.tres{display:grid;grid-template-columns:repeat(3,minmax(0,360px));gap:16px}@media (max-width:1100px){.tres{grid-template-columns:repeat(2,minmax(0,360px))}}@media (max-width:760px){.tres{grid-template-columns:1fr}}
.mece{animation:mece 2.6s ease-in-out infinite alternate;transform-box:view-box}@keyframes mece{to{transform:skewX(-6deg)}}.copa{animation:copa 5s ease-in-out infinite alternate;transform-box:view-box}@keyframes copa{to{transform:rotate(1.4deg)}}.corre{animation:corre 3s linear infinite}@keyframes corre{to{stroke-dashoffset:-60}}.brilla{animation:brilla 3s ease-in-out infinite}@keyframes brilla{0%,100%{opacity:.3}50%{opacity:1}}`;
writeFileSync(new URL('./catalogo-56.html', import.meta.url), pagina('Catálogo para aprobar, lote 20c', 'Mapa de Jujuy', cuerpo, css2));
console.log('ok 56');
