// El mundo de la primera etapa: zonas, salidas, gente, negocios y bichos sueltos.
// Posiciones en coordenadas de la pantalla de 360 por 760 (las de los lotes 18c, 19c y 20c).
// Textos aprobados en textos.md; bichos por zona en bichos-por-zona.md.

export const PROVINCIAS = {
  salta: { nombre: 'Salta', estrellas: 1, trato: 'joven', medalla: 'Empanada', herramienta: 'machete', capataz: 'Anselmo', ermitano: 'Higinio', inicio: 'z1' },
  corrientes: { nombre: 'Corrientes', estrellas: 2, trato: 'che', medalla: 'Acordeón de chamamé', herramienta: 'canoa', capataz: 'Rosendo', ermitano: 'Anacleto', inicio: 'z1' },
  jujuy: { nombre: 'Jujuy', estrellas: 3, trato: 'hijito', medalla: 'Cerro de Siete Colores', herramienta: 'soga', capataz: 'Eulogia', ermitano: 'Pascual', inicio: 'z1' },
};
export const HERRAMIENTAS = { machete: 'Machete', canoa: 'Canoa', soga: 'Soga' };

// Bichos sueltos: [familia, rareza, momento, clima, carácter se toma de la familia]
// momento: 'siempre', 'dia', 'manana', 'tarde', 'noche', 'tardenoche'; clima: null o el clima que pide; o: clima con el que sale siempre
const B = (familia, rareza, momento = 'siempre', clima = null, o = null, extra = {}) => ({ familia, rareza, momento, clima, o, ...extra });

export const ZONAS = {
  salta: {
    z1: { nombre: 'Cerrillos', lugar: 'Cerrillos, Salta', pueblo: true, salidas: { arriba: 'z2' }, nivel: [2, 3], bichos: [] },
    z2: { nombre: 'Valle de Lerma', lugar: 'Ruta 68, Salta', salidas: { abajo: 'z1', arriba: 'z3' }, nivel: [2, 3],
      bichos: [B('Kirkallpa', 'comun', 'dia'), B('Llamarú', 'comun', 'dia'), B('Miyurá', 'poco comun', 'tarde'), B('Lucerna', 'poco comun', 'noche'), B('Mallku', 'poco comun', 'manana'), B('Yakusapo', 'raro', 'siempre', 'lluvia', null, { inicial: true })] },
    z3: { nombre: 'Salta capital', lugar: 'Salta capital', pueblo: true, salidas: { abajo: 'z2', izquierda: 'z4', derecha: 'z6', arriba: 'ruta9' }, nivel: [2, 4], bichos: [] },
    z4: { nombre: 'Quebrada de las Conchas', lugar: 'Quebrada de las Conchas', salidas: { derecha: 'z3', arriba: 'z5' }, nivel: [2, 4],
      bichos: [B('Pirkasol', 'comun', 'dia'), B('Mallku', 'comun', 'dia'), B('Ajinina', 'raro', 'tarde', null, null, { inicial: true })] },
    z5: { nombre: 'Puna', lugar: 'Puna, San Antonio', salidas: { abajo: 'z4' }, nivel: [3, 5], nieve: true,
      bichos: [B('Escarchuña', 'poco comun', 'manana', null, 'nieve'), B('Llamarú', 'comun', 'dia'), B('Mallku', 'comun', 'dia')] },
    z6: { nombre: 'Yungas', lugar: 'Yungas, Salta', salidas: { izquierda: 'z3', arriba: 'rincon' }, nivel: [3, 5], rinconArriba: 'machete',
      bichos: [B('Pasacán', 'raro', 'manana', null, null, { inicial: true })] },
    rincon: { nombre: 'Monte cerrado', lugar: 'Monte cerrado', fondo: 'z6', oscuro: true, rincon: true, salidas: { abajo: 'z6' }, nivel: [5, 5],
      bichos: [B('Ucumar', 'mito', 'noche', null, null, { nivel: 5 })] },
  },
  corrientes: {
    z1: { nombre: 'Corrientes capital', lugar: 'Corrientes capital', salidas: { arriba: 'z2' }, nivel: [4, 6],
      bichos: [B('Pirayú', 'comun'), B('Kapiyvá', 'comun'), B('Tatakú', 'raro', 'dia', 'sol')] },
    z2: { nombre: 'Campo y lomadas', lugar: 'Campo, Corrientes', salidas: { abajo: 'z1', arriba: 'z3' }, nivel: [4, 6],
      bichos: [B('Ventero', 'comun', 'dia'), B('Pajonero', 'poco comun', 'tardenoche')] },
    z3: { nombre: 'Mercedes', lugar: 'Mercedes, Corrientes', pueblo: true, salidas: { abajo: 'z2', derecha: 'z4', izquierda: 'z6' }, nivel: [4, 6], bichos: [] },
    z4: { nombre: 'Colonia Pellegrini', lugar: 'Colonia Pellegrini', salidas: { izquierda: 'z3', arriba: 'z5' }, nivel: [5, 7],
      bichos: [B('Rayajá', 'comun', 'dia')] },
    z5: { nombre: 'Esteros del Iberá', lugar: 'Esteros del Iberá', salidas: { abajo: 'z4', arriba: 'z7' }, nivel: [5, 7], rinconArriba: 'canoa',
      bichos: [B('Guasú', 'poco comun', 'manana'), B('Mbarigüí', 'poco comun', 'tardenoche'), B('Kapiyvá', 'comun'), B('Yacarón', 'raro', 'tarde', 'sol')] },
    z6: { nombre: 'Monte', lugar: 'Monte, Corrientes', salidas: { derecha: 'z3' }, nivel: [5, 7],
      bichos: [B('Mburucoa', 'raro', 'manana')] },
    z7: { nombre: 'Isla del estero', lugar: 'Isla del estero', rincon: true, salidas: { abajo: 'z5' }, nivel: [8, 8],
      bichos: [B('Pombero', 'mito', 'noche', null, null, { nivel: 8 }), B('Yasí Yateré', 'mito', 'tarde', null, null, { nivel: 8 })] },
  },
  jujuy: {
    z1: { nombre: 'San Salvador de Jujuy', lugar: 'San Salvador, Jujuy', salidas: { izquierda: 'z2', arriba: 'z3', abajo: 'ruta9' }, nivel: [6, 8], bichos: [] },
    z2: { nombre: 'Yungas de Calilegua', lugar: 'Yungas, Jujuy', salidas: { derecha: 'z1' }, nivel: [6, 8],
      bichos: [B('Mayuq', 'comun'), B('Papacuy', 'raro', 'manana')] },
    z3: { nombre: 'Purmamarca', lugar: 'Purmamarca, Jujuy', pueblo: true, salidas: { abajo: 'z1', arriba: 'z4' }, nivel: [7, 8], bichos: [] },
    z4: { nombre: 'Quebrada', lugar: 'Quebrada, Jujuy', salidas: { abajo: 'z3', arriba: 'z5' }, nivel: [7, 8],
      bichos: [B('Wiskacha', 'comun', 'dia'), B('Aguijón', 'comun'), B('Allpuma', 'poco comun', 'tardenoche'), B('Atoq', 'raro', 'dia', 'sol')] },
    z5: { nombre: 'Humahuaca', lugar: 'Humahuaca, Jujuy', salidas: { abajo: 'z4', arriba: 'z6' }, nivel: [7, 9],
      bichos: [B('Quinti', 'comun', 'dia'), B('Wiskacha', 'comun', 'dia')] },
    z6: { nombre: 'Puna', lugar: 'Puna, Abra Pampa', salidas: { abajo: 'z5', derecha: 'z7' }, nivel: [8, 9], nieve: true, rinconDerecha: 'soga',
      bichos: [B('Suri', 'comun', 'dia'), B('Tolvanera', 'poco comun', 'tarde', null, 'viento'), B('Chinchay', 'poco comun', 'manana', null, 'nieve'), B('Pariwana', 'raro', 'manana')] },
    z7: { nombre: 'Cumbres del Chañi', lugar: 'Cumbres del Chañi', rincon: true, nieve: true, salidas: { izquierda: 'z6' }, nivel: [9, 9],
      bichos: [B('Chinchay', 'poco comun'), B('Coquena', 'mito', 'manana', 'nieve', null, { nivel: 10 })] },
  },
};
// Ruta 9 a pie: salir por arriba de Salta capital lleva a San Salvador, y por abajo de San Salvador, a Salta capital.
export const RUTA9 = { salta: ['jujuy', 'z1', 'abajo'], jujuy: ['salta', 'z3', 'arriba'] };

// Edificios: qué negocio es cada uno, según el dibujo y la zona.
export const NEGOCIOS = {
  postaSalta: 'posta', postaC: 'posta', postaJ: 'posta', 'salta:z5:puestoPuna': 'posta',
  almacen: 'almacen', almacenC: 'almacen', almacenJ: 'almacen',
  curanderaCasa: 'curandera', curanderaC: 'curandera', curanderaJ: 'curandera',
  feria: 'feria', feriaC: 'feria', feriaJ: 'feria',
  terminal: 'terminal', terminalC: 'terminal', terminalJ: 'terminal',
  galponS: 'galpon', galponC: 'galpon', galponJ: 'galpon', tinglado: 'torneo', ranchoMaestro: 'rancho',
};
// Edificios que agrega el juego (la feria de Salta no está en las zonas aprobadas).
export const EXTRA = { 'salta:z3': [{ que: 'edificio', quien: 'feria', x: 122, y: 590, s: 0.4, caja: [128, 602, 100, 60] }] };

// Quién atiende cada negocio, por provincia: [nombre, dibujo]
export const ATIENDE = {
  salta: { posta: ['Maestra de posta', 'postera'], almacen: ['Pulpero Cacho', 'pulpero'], curandera: ['Ña Rufina', 'curanderaSalta'], feria: ['Feriante', 'feriante'], terminal: ['Boletero', 'boletero'] },
  corrientes: { posta: ['Don Aurelio', 'postaCorrientes'], almacen: ['Ña Chela', 'almacenCorrientes'], curandera: ['Ña Elena', 'mielera'], feria: ['Ramona', 'peona'], terminal: ['Boletero', 'boletero'] },
  jujuy: { posta: ['Don Saturnino', 'arrieroJ'], almacen: ['Don Tomás', 'salinero'], curandera: ['Don Fidel', 'fidel'], feria: ['Dominga', 'tejedora'], terminal: ['Boletero', 'boletero'] },
};

// Gente en el mapa. tipo: vecino, maestro, domador, changuero, ermitano. dibujo: nombre de la función de arte.
export const GENTE = {
  salta: {
    z1: [
      { id: 'abel', nombre: 'Don Abel', dibujo: 'maestro', x: 150, y: 548, tipo: 'maestro' },
      { id: 'rosa', nombre: 'Doña Rosa', dibujo: 'rosa', x: 214, y: 330, tipo: 'vecino', lineas: ['Con lluvia, en el dique, salen bichos raros.'] },
      { id: 'ines', nombre: 'Maestra Inés', dibujo: 'maestra', x: 252, y: 330, flip: true, tipo: 'vecino', lineas: ['A los tímidos acercate por el pasto alto.'] },
    ],
    z2: [
      { id: 'cirilo', nombre: 'Puestero Cirilo', dibujo: 'puestero', x: 196, y: 166, tipo: 'changuero', fogon: [172, 222] },
      { id: 'fermin', nombre: 'Baqueano Fermín', dibujo: 'baqueano', x: 290, y: 560, flip: true, tipo: 'changuero', fogon: [262, 616] },
      { id: 'Benito', nombre: 'Arriero Benito', dibujo: 'arriero', x: 250, y: 380, flip: true, tipo: 'domador' },
      { id: 'Eusebia', nombre: 'Coplera Eusebia', dibujo: 'copleraSalta', x: 70, y: 250, tipo: 'domador' },
    ],
    z4: [{ id: 'Martina', nombre: 'Acampante Martina', dibujo: 'acampante', x: 110, y: 430, tipo: 'domador' }],
    z5: [{ id: 'puestero-puna', nombre: 'Puestero de la Puna', dibujo: 'puesteroPuna', x: 230, y: 360, tipo: 'vecino', lineas: ['Cuando nieva, la Puna se llena de vicuñas.'] }],
    rincon: [{ id: 'Higinio', nombre: 'Don Higinio', dibujo: 'higinio', x: 150, y: 360, tipo: 'ermitano' }],
  },
  corrientes: {
    z1: [{ id: 'Eusebio', nombre: 'Canoero Eusebio', dibujo: 'canoero', x: 250, y: 290, tipo: 'domador' }],
    z2: [{ id: 'Ireneo', nombre: 'Acordeonista Ireneo', dibujo: 'acordeonista', x: 250, y: 360, tipo: 'domador' }],
    z3: [{ id: 'pocha', nombre: 'Doña Pocha', dibujo: 'pocha', x: 220, y: 330, tipo: 'vecino', lineas: ['A la siesta, con sol, el yacaré sale del agua.', 'Los jejenes salen de tarde. Llevá paciencia, che.'] }],
    z4: [
      { id: 'sol', nombre: 'Guardaparque Sol', dibujo: 'guardaparque', x: 290, y: 410, flip: true, tipo: 'changuero', fogon: [250, 464] },
      { id: 'Aníbal', nombre: 'Guía Aníbal', dibujo: 'guia', x: 250, y: 650, tipo: 'domador' },
    ],
    z5: [{ id: 'ramon', nombre: 'Pescador Ramón', dibujo: 'pescador', x: 190, y: 400, tipo: 'changuero', fogon: [172, 466] }],
    z7: [{ id: 'Anacleto', nombre: 'Don Anacleto', dibujo: 'anacleto', x: 150, y: 360, tipo: 'ermitano' }],
  },
  jujuy: {
    z2: [
      { id: 'delfina', nombre: 'Bagualera Delfina', dibujo: 'bagualera', x: 130, y: 370, tipo: 'changuero', fogon: [108, 438] },
      { id: 'Zenón', nombre: 'Cañero Zenón', dibujo: 'zenon', x: 200, y: 560, tipo: 'domador' },
    ],
    z4: [{ id: 'juana', nombre: 'Pastora Juana', dibujo: 'pastora', x: 140, y: 232, tipo: 'changuero', fogon: [112, 292] }],
    z5: [{ id: 'Lucía', nombre: 'Andinista Lucía', dibujo: 'andinista', x: 220, y: 360, tipo: 'domador' }],
    z6: [{ id: 'Aniceto', nombre: 'Minero Aniceto', dibujo: 'minero', x: 120, y: 270, tipo: 'domador' }],
    z7: [{ id: 'Pascual', nombre: 'Don Pascual', dibujo: 'pascual', x: 150, y: 360, tipo: 'ermitano' }],
  },
};
export const DIBUJO_CAPATAZ = { Anselmo: 'anselmo', Rosendo: 'rosendo', Eulogia: 'eulogia' };

// Diálogos de domadores, capataces y ermitaños (textos.md, secciones 5 a 7).
export const DICHOS = {
  Benito: { ver: '¡Alto ahí, joven! En mi ruta se pelea.', gana: 'Al bicho hay que pegarle fuerte, joven.', pierde: 'Pega fuerte usted. Como yo, pero mejor.', revancha: '¿Otra vuelta? Hoy vengo con todo.' },
  Eusebia: { ver: 'Le canto una copla y le marco el bicho.', gana: 'Primero lo mojo, después le doy el rayo.', pierde: 'Me desafinó la copla, joven.', revancha: 'Tengo copla nueva. ¿Se anima?' },
  Martina: { ver: 'En la Quebrada no se pelea quieto.', gana: 'Cambiar a tiempo es medio combate.', pierde: 'Me leyó los cambios, joven.', revancha: 'Armé la carpa y el equipo. ¿Otra?' },
  Eusebio: { ver: '¡Che, del río no pasás sin pelear!', gana: 'Primero te mojo, después vemos.', pierde: 'Me diste vuelta la canoa, che.', revancha: 'El río está crecido. ¿Otra?' },
  Ireneo: { ver: '¿Bailamos? Acá el que se cubre gana.', gana: 'Me cubro y espero, como en el baile.', pierde: 'Se me cansó el fuelle, che.', revancha: 'Afiné el acordeón. ¿Revancha?' },
  Aníbal: { ver: 'Te llevo al estero, pero antes, pelea.', gana: 'En el estero gana el que se mueve.', pierde: 'Te sabés el camino, che.', revancha: 'Encontré un atajo. ¿Probamos?' },
  Zenón: { ver: 'Corto caña todo el día. Pego fuerte.', gana: 'Golpe y golpe, como en la zafra.', pierde: 'Me cortaste como a la caña.', revancha: 'Terminó la zafra. ¿Otra pelea?' },
  Lucía: { ver: 'Para subir el cerro hay que saber cambiar.', gana: 'En la montaña, cambiás o caés.', pierde: 'Llegaste a la cumbre antes que yo.', revancha: 'Encontré otra ruta. ¿Probamos?' },
  Aniceto: { ver: 'Duro como la piedra de la mina, {hijito}.', gana: 'Me cubro y aguanto, como en la mina.', pierde: 'Me encontraste la veta, {hijito}.', revancha: 'Volví a cavar. ¿Revancha?' },
  Anselmo: { entrar: 'Pase a mi galpón, joven.', antes: 'Acá se gana con la cabeza, no solo con el brazo.', gana: 'Vuelva cuando quiera. El galpón no se va.', pierde: 'Se ganó la Empanada, joven. Y el machete.', herramienta: 'Con el machete se abre el monte cerrado.', desafio: '¿Se anima sin su primer bicho?', desafioGanado: 'Lleve las espuelas. Se las ganó.', torneo: 'Esta vez no me agarra desprevenido.' },
  Rosendo: { entrar: 'Pasá, che. Acá se pelea en serio.', antes: 'Te mojo y te parto con el rayo, che.', gana: 'Volvé cuando quieras, el galpón está abierto.', pierde: 'Te ganaste el Acordeón de chamamé. Y la canoa.', herramienta: 'Con la canoa cruzás el canal del estero.', desafio: '6 bichos, 6 tipos distintos. ¿Te da?', desafioGanado: 'Tomá la vincha, che. Bien ganada.', torneo: 'En el torneo no hay chamamé que te salve.' },
  Eulogia: { entrar: 'Entrá, {hijito}. Afuera hace frío.', antes: 'En la Puna el frío no perdona.', gana: 'Volvé cuando el cerro te deje.', pierde: 'Te ganaste el Cerro de Siete Colores. Y la soga.', herramienta: 'Con la soga se sube el risco de las cumbres.', desafio: 'Con bichos de nivel 7 o menos. Si podés.', desafioGanado: 'Llevate el chiripá, {hijito}.', torneo: 'Llegaste lejos. Acá se termina.' },
  Higinio: { primera: 'Hace años que no como un chipá...', pide: 'Tráigame un chipá y peleamos.', con: '¡Chipá! Ahora sí, joven.', gana: 'El monte enseña. Vuelva con otro chipá.', pierde: ['Bien ganado. Le cuento algo del monte.', 'Sale de noche. Si oye ¡uh, uh!, es él.', 'Tome esta piedra. Es de la Pachamama.', 'Y pase por mi puesto cuando quiera.'], revancha: '¿Trajo chipá? Entonces peleamos.', convite: 'chipa' },
  Anacleto: { primera: 'Unos tamales... eso extraño, che.', pide: 'Traeme tamales y peleamos.', con: '¡Tamales! Ahora sí, che.', gana: 'La isla es brava. Volvé con tamales.', pierde: ['Bien jugado, che. Te cuento algo.', 'Al Pombero lo vas a oír de noche, en la isla. El Yasí sale a la siesta, con su bastón.', 'Llevate esta piedra. Es de la Pachamama.', 'Mi puesto queda abierto para vos.'], revancha: '¿Trajiste tamales? Dale.', convite: 'tamales' },
  Pascual: { primera: 'Unas empanadas salteñas, {hijito}...', pide: 'Traeme empanadas y peleamos.', con: '¡Empanadas! Ahora sí, {hijito}.', gana: 'La cumbre no se sube de una.', pierde: ['Bien, {hijito}. Te cuento algo.', 'Baja con la nieve, de mañana, entre las vicuñas.', 'Esta piedra es de la Pachamama. Cuidala.', 'Mi puesto está abierto, {hijito}.'], revancha: '¿Empanadas? Entonces sí.', convite: 'empanadas' },
};
export const SIN_SEIS = { salta: 'Junte 6 bichos y venga, joven.', corrientes: 'Traé 6 bichos y peleamos, che.', jujuy: 'Con 6 bichos te espero, {hijito}.' };
export const SIN_CHANGA = { salta: 'No tengo changas por hoy, joven. Vuelva mañana.', corrientes: 'Hoy no hay nada, che. Pasate mañana.', jujuy: 'Por hoy nada, {hijito}. Mañanita capaz.' };
export const SALUDOS = {
  salta: { posta: 'Pase, joven. Le curo los bichos.', almacen: '¿Qué lleva, joven? Mate, carpa, convite...', curandera: 'Pase, joven. ¿Remedios o una limpia?', feria: '¡Prendas, pilchas y boleadoras, joven!' },
  corrientes: { posta: 'Pasá, che, que te los curo.', almacen: '¿Qué te llevás, che?', curandera: '¿Remedio o limpia, che?', feria: '¡Mirá lo que traje, che!' },
  jujuy: { posta: 'Pasá, {hijito}, que te los curo.', almacen: '¿Qué vas a llevar, {hijito}?', curandera: 'Remedio, ruda o limpia. Vos decí.', feria: 'Tejido a mano, {hijito}. Mirá nomás.' },
};
export const DERROTA = {
  salta: ['Calma, joven, acá se reponen todos.', 'Los domadores que venció siguen vencidos.'],
  corrientes: ['Ya está, che, acá se cura todo.', 'Los que ganaste siguen ganados.'],
  jujuy: ['Ya pasó, {hijito}. Acá se cura todo.', 'Lo que ganaste no se pierde.'],
};
export const MITO_SE_FUE = (m) => `${m} se fue. Va a volver otro día.`;
export const ABEL = {
  prologo: ['¡Llegaste! Te estaba esperando.', 'En el norte andan bichos por todos lados.', 'Te tengo tres. Elegí uno: va a ser tu compañero.'],
  despues: ['Buena elección. Cuidámelo.', 'Tomá esta libreta. Es vieja, como yo.', 'Las páginas del norte están a medio llenar.', 'Llename esta libreta y traeme las tres medallas.', 'Salí al Valle. A los bichos sueltos los peleás tocándolos.'],
  otra: '¿Cómo va esa libreta? Mostrame cuando la llenes.',
  final: ['Sabía que ibas a llegar lejos.', 'Me trajiste las tres medallas.', 'Y esta libreta ya no es mía: es tuya.'],
};
/** Cambia {hijito} por hijito o hijita según el personaje. */
export const trato = (txt, avatar) => txt.replaceAll('{hijito}', avatar === 'jugadora' ? 'hijita' : 'hijito');
