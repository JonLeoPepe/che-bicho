// Las 35 familias (105 especies) aprobadas en fichas-especies y bichos-por-zona.
// Mismos datos que el simulador (roster_v5.py), con los caracteres y nombres de técnicas.

// [base, camino 1, camino 2, provincia, tipo, animal, rol, ritmo, cobertura, efecto del camino 2, inmune a, aura, golpe liviano, pasivas del nivel 3]
const FILAS = [
  ['Ajinina', 'Quituchón', 'Montají', 'Salta', 'Fuego', 'iguana', 'detonador', 'parejo', 'Tierra', 'furia', 'Chamuscado', null, 'Coletazo', ['coraje', 'guapo']],
  ['Pasacán', 'Cerrocán', 'Florcán', 'Salta', 'Flora', 'pecarí', 'golpeador', 'parejo', 'Tierra', 'furia', 'Enredado', null, 'Hocicazo', ['coraje', 'tozudo']],
  ['Yakusapo', 'Arroyaku', 'Paraku', 'Salta', 'Agua', 'sapo', 'marcador', 'parejo', 'Hielo', 'empaque', 'Mojado', null, 'Lengüetazo', ['gambeta', 'aguantador']],
  ['Kirkallpa', 'Socavón', 'Murallón', 'Salta', 'Tierra', 'quirquincho', 'muralla', 'parejo', 'Roca', 'empaque', 'Embarrado', null, 'Rodada', ['aguantador', 'tozudo']],
  ['Llamarú', 'Tropero', 'Floreada', 'Salta', 'Común', 'llama', 'apoyo', 'parejo', 'Agua', 'sueno', 'Apestado', 'afilado', 'Escupida', ['guapo', 'tozudo']],
  ['Mallku', 'Cumbrero', 'Achachila', 'Salta', 'Viento', 'cóndor', 'detonador', 'filoso', 'Fuego', 'furia', 'Polvareda', null, 'Aletazo', ['ojovivo', 'rematador']],
  ['Escarchuña', 'Puneña', 'Nevaduña', 'Salta', 'Hielo', 'vicuña', 'veloz', 'veloz', 'Roca', 'sueno', 'Escarcha', null, 'Coz', ['baqueano', 'gambeta']],
  ['Miyurá', 'Crucera', 'Chicotazo', 'Salta', 'Veneno', 'yarará', 'marcador', 'filoso', 'Tierra', 'sueno', 'Apestado', null, 'Mordisco', ['ojovivo', 'rematador']],
  ['Pirkasol', 'Pirquero', 'Quebradón', 'Salta', 'Roca', 'lagartija', 'veloz', 'veloz', 'Fuego', 'empaque', 'Polvareda', null, 'Rasguño', ['baqueano', 'gambeta']],
  ['Lucerna', 'Destellón', 'Farolero', 'Salta', 'Rayo', 'luciérnaga', 'apoyo', 'escurridizo', 'Fuego', 'sueno', 'Cargado', 'rastreador', 'Zumbido', ['gambeta', 'guapo']],
  ['Mburucoa', 'Zarcillón', 'Pasionaria', 'Corrientes', 'Flora', 'coatí', 'apoyo', 'escurridizo', 'Veneno', 'empaque', 'Enredado', 'pialador', 'Uñazo', ['gambeta', 'guapo']],
  ['Tatakú', 'Tatakuá', 'Brasaguazú', 'Corrientes', 'Fuego', 'hornero', 'muralla', 'parejo', 'Tierra', 'empaque', 'Chamuscado', null, 'Picotazo', ['aguantador', 'guapo']],
  ['Yacarón', 'Hocicón', 'Yacarehú', 'Corrientes', 'Agua', 'yacaré', 'golpeador', 'parejo', 'Tierra', 'furia', 'Mojado', null, 'Dentellada', ['rematador', 'tozudo']],
  ['Kapiyvá', 'Pachorra', 'Chapuzón', 'Corrientes', 'Común', 'carpincho', 'muralla', 'parejo', 'Agua', 'empaque', 'Mojado', null, 'Empujón', ['aguantador', 'tozudo']],
  ['Ventero', 'Gritón', 'Espolón', 'Corrientes', 'Viento', 'tero', 'veloz', 'veloz', 'Tierra', 'furia', 'Polvareda', null, 'Chillido', ['baqueano', 'ojovivo']],
  ['Pajonero', 'Zancón', 'Barrero', 'Corrientes', 'Tierra', 'aguará guazú', 'detonador', 'parejo', 'Fuego', 'empaque', 'Embarrado', null, 'Tarascón', ['baqueano', 'rematador']],
  ['Guasú', 'Pantanero', 'Ramazón', 'Corrientes', 'Flora', 'ciervo', 'veloz', 'veloz', 'Veneno', 'sueno', 'Enredado', null, 'Cornada', ['baqueano', 'gambeta']],
  ['Mbarigüí', 'Nubarrón', 'Siestero', 'Corrientes', 'Veneno', 'jején', 'marcador', 'escurridizo', 'Viento', 'sueno', 'Apestado', null, 'Picadura', ['gambeta', 'ojovivo']],
  ['Rayajá', 'Vigía', 'Tronador', 'Corrientes', 'Rayo', 'chajá', 'detonador', 'parejo', 'Viento', 'furia', 'Cargado', null, 'Espuelazo', ['coraje', 'ojovivo']],
  ['Pirayú', 'Correntón', 'Dentuda', 'Corrientes', 'Agua', 'palometa', 'golpeador', 'parejo', 'Tierra', 'furia', 'Mojado', null, 'Mordisquito', ['rematador', 'ojovivo']],
  ['Papacuy', 'Chuñucuy', 'Ocacuy', 'Jujuy', 'Flora', 'cuy', 'apoyo', 'escurridizo', 'Tierra', 'sueno', 'Enredado', 'guardian', 'Roedura', ['gambeta', 'aguantador']],
  ['Atoq', 'Atoqnina', 'Wayratoq', 'Jujuy', 'Fuego', 'zorro colorado', 'detonador', 'escurridizo', 'Viento', 'empaque', 'Chamuscado', null, 'Mordiscón', ['gambeta', 'rematador']],
  ['Pariwana', 'Qochawana', 'Puyuwana', 'Jujuy', 'Agua', 'parina', 'apoyo', 'parejo', 'Hielo', 'sueno', 'Mojado', 'tropilla', 'Picazo', ['guapo', 'baqueano']],
  ['Mayuq', 'Torrentero', 'Totorero', 'Jujuy', 'Agua', 'pato de torrente', 'veloz', 'veloz', 'Viento', 'empaque', 'Mojado', null, 'Zambullida', ['baqueano', 'aguantador']],
  ['Suri', 'Zancadón', 'Hatunsuri', 'Jujuy', 'Común', 'suri', 'golpeador', 'parejo', 'Tierra', 'furia', 'Polvareda', null, 'Pechazo', ['baqueano', 'coraje']],
  ['Chinchay', 'Rasuchay', 'Ventisca', 'Jujuy', 'Hielo', 'chinchilla', 'marcador', 'escurridizo', 'Roca', 'sueno', 'Escarcha', null, 'Brinco', ['gambeta', 'guapo']],
  ['Wiskacha', 'Rumiwiska', 'Solera', 'Jujuy', 'Roca', 'vizcacha', 'muralla', 'parejo', 'Tierra', 'empaque', 'Polvareda', null, 'Escarbada', ['aguantador', 'gambeta']],
  ['Allpuma', 'Apu Puma', 'Qaqapuma', 'Jujuy', 'Tierra', 'puma', 'golpeador', 'parejo', 'Roca', 'furia', 'Embarrado', null, 'Zarpazo', ['rematador', 'coraje']],
  ['Quinti', 'Hatunquinti', 'Centella', 'Jujuy', 'Rayo', 'picaflor', 'veloz', 'veloz', 'Viento', 'furia', 'Cargado', null, 'Pinchazo', ['ojovivo', 'gambeta']],
  ['Aguijón', 'Lajero', 'Punzón', 'Jujuy', 'Veneno', 'alacrán', 'detonador', 'filoso', 'Tierra', 'furia', 'Apestado', null, 'Pinzazo', ['ojovivo', 'coraje']],
  ['Tolvanera', 'Remolino', 'Torbellino', 'Jujuy', 'Viento', 'remolino de la Puna', 'marcador', 'parejo', 'Roca', 'empaque', 'Polvareda', null, 'Soplido', ['gambeta', 'baqueano']],
];
// Mitos: [base, camino 1, camino 2, provincia, rol, ritmo, cobertura, leyenda, golpe liviano, pasivas]
const MITOS = [
  ['Ucumar', 'Ukuku', 'Ucumar de la quebrada', 'Salta', 'golpeador', 'filoso', 'Tierra', 'atado', 'Manotazo', ['coraje', 'tozudo']],
  ['Pombero', 'Pombero del monte', 'Pombero silbador', 'Corrientes', 'marcador', 'parejo', 'Flora', 'encandilado', 'Pellizco', ['gambeta', 'guapo']],
  ['Yasí Yateré', 'Yasí del bastón', 'Yasí de la siesta', 'Corrientes', 'apoyo', 'escurridizo', 'Rayo', 'sueno', 'Bastonazo', ['gambeta', 'baqueano']],
  ['Coquena', 'Coquena pastor', 'Coquena de las cumbres', 'Jujuy', 'apoyo', 'parejo', 'Roca', 'granizo', 'Honda', ['aguantador', 'tozudo']],
];

export const FAMILIAS = Object.fromEntries(FILAS.map(([base, c1, c2, provincia, tipo, animal, rol, ritmo, cobertura, efecto, inmune, aura, liviano, pasivas]) =>
  [base, { base, caminos: [c1, c2], provincia, tipo, animal, rol, ritmo, cobertura, efecto, inmune, aura, liviano, pasivas, mito: false }]));
for (const [base, c1, c2, provincia, rol, ritmo, cobertura, leyenda, liviano, pasivas] of MITOS) {
  FAMILIAS[base] = { base, caminos: [c1, c2], provincia, tipo: 'Mito', animal: 'mito', rol, ritmo, cobertura, efecto: 'sueno', inmune: null, aura: rol === 'apoyo' ? 'guardian' : null, liviano, pasivas, mito: true, leyenda };
}

// Nombres de técnicas por tipo (fichas-especies, sección 2).
export const TECNICAS = {
  Fuego: ['Chamuscón', 'Llamarada', 'Fogonazo', 'Brasazo'],
  Agua: ['Salpicón', 'Chorro', 'Correntada', 'Chapoteo'],
  Flora: ['Enredo', 'Ramazo', 'Quebrachazo', 'Espinazo'],
  Tierra: ['Terronazo', 'Pisotón', 'Temblor', 'Polvazo'],
  Roca: ['Piedrazo', 'Pedrada', 'Derrumbe', 'Cascotazo'],
  Viento: ['Tierral', 'Ráfaga', 'Zonda', 'Ventarrón'],
  Rayo: ['Chispazo', 'Rayazo', 'Relámpago', 'Chispero'],
  Hielo: ['Escarchazo', 'Carámbano', 'Nevazón', 'Helazo'],
  Veneno: ['Vaharada', 'Ponzoña', 'Ponzoñazo', 'Púa'],
  Común: ['Atropellada', 'Embestida', 'Estampida', null],
};
export const TEC_EFECTO = { sueno: 'Arrullo', empaque: 'Pialada', furia: 'Chicana' };
export const TEC_MITO = {
  Ucumar: { leyenda: 'Abrazo', golpe: 'Garrón', fuerte: 'Bramido' },
  Pombero: { leyenda: 'Silbido', golpe: 'Chistido', fuerte: 'Monte cerrado' },
  'Yasí Yateré': { leyenda: 'Siesta', golpe: 'Resplandor', fuerte: 'Solazo' },
  Coquena: { leyenda: 'Granizo', golpe: 'Pedregal', fuerte: 'Alud' },
};

// Carácter de los salvajes (bichos-por-zona, con los iniciales de Salta curiosos).
export const CARACTER = {
  Ajinina: 'curioso', Pasacán: 'curioso', Yakusapo: 'curioso', Kirkallpa: 'timido', Llamarú: 'curioso', Mallku: 'manso', Escarchuña: 'timido', Miyurá: 'bravo', Pirkasol: 'curioso', Lucerna: 'manso',
  Mburucoa: 'curioso', Tatakú: 'manso', Yacarón: 'bravo', Kapiyvá: 'manso', Ventero: 'bravo', Pajonero: 'timido', Guasú: 'timido', Mbarigüí: 'curioso', Rayajá: 'curioso', Pirayú: 'bravo',
  Papacuy: 'timido', Atoq: 'curioso', Pariwana: 'manso', Mayuq: 'manso', Suri: 'timido', Chinchay: 'timido', Wiskacha: 'curioso', Allpuma: 'bravo', Quinti: 'curioso', Aguijón: 'bravo', Tolvanera: 'manso',
  Ucumar: 'mito', Pombero: 'mito', 'Yasí Yateré': 'mito', Coquena: 'mito',
};

export const PASIVAS = {
  coraje: ['Coraje', '+20 % de daño con menos de un tercio de vida'], baqueano: ['Baqueano', '+1 de Velocidad'], ojovivo: ['Ojo vivo', '+1 de Crítico'],
  gambeta: ['Gambeta', '+1 de Amague'], guapo: ['Guapo', 'Entra con 4 de aguante en vez de 3'], tozudo: ['Tozudo', 'Inmune a Sueño, Empaque y Furia'],
  rematador: ['Rematador', '+15 % de daño a rivales con menos de la mitad de vida'], aguantador: ['Aguantador', 'Cubrirse le da +1 de aguante'],
};
