// Las 42 changas de los 6 changueros (anexo changas, aprobado 2026-11-24).
// regla: lo que hay que hacer; desde: cuándo se puede ofrecer; premio: pista o pilcha (una sola vez).
const C = (texto, dif, paga, regla, desde = 'siempre', premio = null) => ({ texto, dif, paga, regla, desde, premio });

export const CHANGUEROS = {
  cirilo: { nombre: 'Cirilo', prov: 'salta', lista: [
    C('Las víboras me espantan las cabras. Venza a 2 Miyurá, joven.', 'facil', 50, { vencer: 2, familia: 'Miyurá' }),
    C('Los quirquinchos me llenan el corral de pozos. Venza a 3 de tipo Tierra.', 'facil', 50, { vencer: 3, tipo: 'Tierra' }),
    C('De noche se oye de todo. Atrape un bicho de noche, joven.', 'normal', 60, { atrapar: 1, momento: 'noche' }),
    C('Me falta una llama para la tropa. Tráigame un Llamarú.', 'normal', 60, { trueque: 'Llamarú' }),
    C('A ver cómo anda sin ayuda: atrape uno peleando solo con bichos de tipo Común.', 'normal', 60, { atrapar: 1, soloTipo: 'Común' }, 'seis'),
    C('Benito se agranda en la ruta. Gánele sin que se le desmaye ninguno.', 'dificil', 90, { ganar: 'Benito', sinDesmayos: true }, { vencido: 'Benito' }),
    C('Que no lo agarre la noche en la Quebrada. Venza a 3 de tipo Viento.', 'normal', 60, { vencer: 3, tipo: 'Viento' }),
  ] },
  fermin: { nombre: 'Fermín', prov: 'salta', lista: [
    C('En el monte cerrado anda algo grande de noche. Venza a 3 bichos de noche y le cuento.', 'normal', 60, { vencer: 3, momento: 'noche' }, 'siempre', { mito: 'Ucumar' }),
    C('Gánele a Eusebia, la coplera del río.', 'normal', 60, { ganar: 'Eusebia' }, 'seis'),
    C('Haga 2 reventones, que quiero ver cómo pega.', 'facil', 50, { reventones: 2 }),
    C('Con lluvia salen cosas raras. Atrape un bicho con lluvia.', 'normal', 60, { atrapar: 1, clima: 'lluvia' }, 'siempre', { raroSalta: true }),
    C('En la Quebrada las piedras caminan. Venza a 3 de tipo Roca.', 'facil', 50, { vencer: 3, tipo: 'Roca' }),
    C('Haga una Nube: marque con Veneno y reviente con Viento.', 'dificil', 90, { reaccion: 'nube' }, 'seis'),
    C('Gánele a los 3 domadores de Salta sin pasar por la posta.', 'dificil', 90, { aguante: 'salta' }, { medalla: 'salta' }, { pilcha: 'P8' }),
  ] },
  ramon: { nombre: 'Ramón', prov: 'corrientes', lista: [
    C('Algo me silba de noche en la isla y me esconde las cosas, che. Vencé a 3 de tipo Agua y te cuento.', 'normal', 80, { vencer: 3, tipo: 'Agua' }, 'siempre', { mito: 'Pombero' }),
    C('Las palometas me rompen la red. Vencé a 3 Pirayú.', 'facil', 65, { vencer: 3, familia: 'Pirayú' }),
    C('Me hace falta un carpincho manso. Traeme un Kapiyvá.', 'normal', 80, { trueque: 'Kapiyvá' }),
    C('A la siesta, con sol, sale lo mejor. Atrapá un bicho a la siesta con sol.', 'normal', 80, { atrapar: 1, momento: 'tarde', clima: 'sol' }, 'siempre', { pista: 'Tatakú' }),
    C('Mojalo y dale con un rayo, che. Hacé una Descarga.', 'normal', 80, { reaccion: 'descarga' }, 'seis'),
    C('Eusebio se cree el dueño del río. Ganale sin que se te desmaye ninguno.', 'dificil', 120, { ganar: 'Eusebio', sinDesmayos: true }, { vencido: 'Eusebio' }),
    C('De noche el estero es otro. Vencé a 4 bichos de noche en el estero.', 'normal', 80, { vencer: 4, momento: 'noche', zona: 'corrientes:z5' }, 'siempre', { pista: 'Yacarón' }),
  ] },
  sol: { nombre: 'Sol', prov: 'corrientes', lista: [
    C('Los chicos del paraje dicen que a la siesta los llama un silbido. Atrapá un bicho a la siesta.', 'normal', 80, { atrapar: 1, momento: 'tarde' }, 'siempre', { mito: 'Yasí Yateré' }),
    C('Estoy haciendo el censo, che. Atrapá 2 bichos distintos en el estero.', 'facil', 65, { atrapar: 2, distintos: true, zona: 'corrientes:z5' }),
    C('A ver si te arreglás con lo de acá: atrapá uno peleando solo con bichos de Corrientes.', 'normal', 80, { atrapar: 1, soloProv: 'Corrientes' }, 'seis'),
    C('Embarralo y después mojalo. Hacé un Lodazal.', 'normal', 80, { reaccion: 'lodazal' }, 'seis'),
    C('A la mañana el monte se despierta. Atrapá un bicho de mañana.', 'normal', 80, { atrapar: 1, momento: 'manana' }, 'siempre', { pista: 'Mburucoa' }),
    C('Los jejenes no dejan vivir a nadie. Vencé a 5 de tipo Veneno.', 'dificil', 120, { vencer: 5, tipo: 'Veneno' }),
    C('Ganale a los 3 domadores de Corrientes sin pasar por la posta.', 'dificil', 120, { aguante: 'corrientes' }, { medalla: 'corrientes' }, { pilcha: 'P9' }),
  ] },
  juana: { nombre: 'Juana', prov: 'jujuy', lista: [
    C('Coquena cuida a las vicuñas, {hijito}. Vencé a 3 bichos de mañana y te cuento dónde lo vi.', 'normal', 100, { vencer: 3, momento: 'manana' }, 'siempre', { mito: 'Coquena' }),
    C('El puma me come los corderos. Vencé a 2 Allpuma.', 'facil', 80, { vencer: 2, familia: 'Allpuma' }),
    C('Me falta uno para la tropa. Traeme un Suri, {hijito}.', 'normal', 100, { trueque: 'Suri' }),
    C('Escarchalo y dale con piedra. Hacé un Quebranto.', 'normal', 100, { reaccion: 'quebranto' }, 'seis'),
    C('Cuando nieva, salen los que no ves nunca. Atrapá un bicho con nieve.', 'normal', 100, { atrapar: 1, clima: 'nieve' }),
    C('Lucía sube los cerros como cabra. Ganale sin que se te desmaye ninguno.', 'dificil', 150, { ganar: 'Lucía', sinDesmayos: true }, { vencido: 'Lucía' }),
    C('En la Puna hace un frío que pela. Vencé a 3 de tipo Hielo.', 'normal', 100, { vencer: 3, tipo: 'Hielo' }, 'siempre', { pista: 'Pariwana' }),
  ] },
  delfina: { nombre: 'Delfina', prov: 'jujuy', lista: [
    C('El río baja bravo, {hijito}. Vencé a 3 de tipo Agua.', 'facil', 80, { vencer: 3, tipo: 'Agua' }),
    C('Ganale a Zenón, el cañero.', 'normal', 100, { ganar: 'Zenón' }, 'seis'),
    C('De noche el monte canta. Atrapá un bicho de noche en las yungas.', 'normal', 100, { atrapar: 1, momento: 'noche', zona: 'jujuy:z2' }, 'siempre', { pista: 'Papacuy' }),
    C('A ver qué tan de acá sos: atrapá uno peleando solo con bichos de Jujuy.', 'normal', 100, { atrapar: 1, soloProv: 'Jujuy' }, 'seis', { pista: 'Atoq' }),
    C('Hacé 2 reacciones en una misma pelea.', 'dificil', 150, { reaccionesPelea: 2 }, 'seis'),
    C('Lo seco de la Quebrada tiene lo suyo. Vencé a 3 de tipo Veneno.', 'facil', 80, { vencer: 3, tipo: 'Veneno' }),
    C('Ganale a los 3 domadores de Jujuy sin pasar por la posta.', 'dificil', 150, { aguante: 'jujuy' }, { medalla: 'jujuy' }, { pilcha: 'P10' }),
  ] },
};
// Primera pista de cada mito (textos.md, sección 8) y las de los raros.
export const PISTA_MITO = {
  Ucumar: 'Pasando la maleza del monte, se oye un bramido.',
  Pombero: 'En la isla, de noche, algo silba y cuida a los pájaros.',
  'Yasí Yateré': 'A la siesta, en la isla, se ve un brillo chiquito.',
  Coquena: 'Coquena cuida a las vicuñas, allá en las cumbres.',
};
export const DOMADORES = { salta: ['Benito', 'Eusebia', 'Martina'], corrientes: ['Eusebio', 'Ireneo', 'Aníbal'], jujuy: ['Zenón', 'Lucía', 'Aniceto'] };
export const MAX_ACTIVAS = 3;
