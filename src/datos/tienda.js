// Precios y artículos de los negocios (economia-v1, pilchas; GDD v2, sección 11).
export const INGRESOS = {
  salta: { domador: 100, capataz: 400, ermitano: 250 },
  corrientes: { domador: 150, capataz: 600, ermitano: 380 },
  jujuy: { domador: 200, capataz: 800, ermitano: 500 },
};
export const TORNEO_PREMIO = 1000;
export const REVANCHA = 0.1;
const POR_PROV = (s, c, j) => ({ salta: s, corrientes: c, jujuy: j });
export const PRECIO_MATE = POR_PROV(80, 100, 130);
export const PRECIO_ENCARGO = { 'poco comun': POR_PROV(40, 60, 80), raro: POR_PROV(80, 120, 160) };
export const PRECIO_PRENDA_FERIA = POR_PROV(250, 350, 450);
export const PRECIO_MEJORA = [400, 700, 1000];
export const PRENDAS_FERIA = { salta: ['poncho', 'faja'], corrientes: ['rastra', 'pañuelo'], jujuy: ['boina', 'alpargatas'] };
export const PILCHAS_FERIA = { salta: [['P2', 150], ['P3', 300]], corrientes: [['P4', 200], ['P5', 400]], jujuy: [['P6', 250], ['P7', 500]] };
export const PILCHA_ERMITANO = { Higinio: ['P11', 300], Anacleto: ['P12', 400], Pascual: ['P13', 500] };
export const CORRAL = [[40, 600], [60, 1500]];
export const PASAJE = { 'salta|corrientes': 200, 'corrientes|jujuy': 250, 'salta|jujuy': 80 };
export const pasaje = (a, b) => PASAJE[`${a}|${b}`] ?? PASAJE[`${b}|${a}`];

export const ARTICULOS = {
  peperina: { nombre: 'Hojita de peperina', uso: 'Cura un cuarto de la vida de un bicho.', precio: 20, remedio: 0.25 },
  cedron: { nombre: 'Té de cedrón', uso: 'Cura la mitad de la vida de un bicho.', precio: 40, remedio: 0.5 },
  jarilla: { nombre: 'Ungüento de jarilla', uso: 'Cura toda la vida de un bicho.', precio: 80, remedio: 1 },
  sahumerio: { nombre: 'Sahumerio', uso: 'Despierta a un desmayado con la mitad de la vida.', precio: 120, reanima: 0.5 },
  palosanto: { nombre: 'Palo santo', uso: 'Su humo aleja a los salvajes un rato.', precio: 50 },
  miel: { nombre: 'Miel de monte', uso: 'Atrae salvajes un rato.', precio: 50 },
  ruda: { nombre: 'Ruda', uso: 'Para la limpia: borra la pasiva y el camino de un bicho.', precio: 300 },
  mate: { nombre: 'Mate amargo', uso: 'Pasa a la franja siguiente del día. No cruza la medianoche.' },
  carpa: { nombre: 'Carpa', uso: 'De noche y fuera del pueblo: dormís hasta la mañana.' },
  chipa: { nombre: 'Chipá', uso: 'Convite para un ermitaño.', precio: 80, convite: true },
  tamales: { nombre: 'Tamales', uso: 'Convite para un ermitaño.', precio: 80, convite: true },
  empanadas: { nombre: 'Empanadas salteñas', uso: 'Convite para un ermitaño.', precio: 80, convite: true },
};
export const PRENDAS = {
  poncho: ['Poncho', '+10 % de Defensa.'],
  faja: ['Faja', '+15 % de Vida.'],
  rastra: ['Rastra', '+10 % de Ataque.'],
  'pañuelo': ['Pañuelo', 'Su marcadora pega +10 % y sus marcas duran +1 ronda.'],
  boina: ['Boina', 'Gana los empates de Velocidad y +5 % de Ataque.'],
  alpargatas: ['Alpargatas', 'Su golpe liviano pega +50 %.'],
  espuelas: ['Espuelas', 'La primera técnica después de entrar, +40 %.'],
  vincha: ['Vincha', '+0,5 a sus reventones y reacciones.'],
  'chiripá': ['Chiripá', 'No recibe marcas.'],
  'poncho de vicuña': ['Poncho de vicuña', '+10 % de Defensa y +5 % de Vida.'],
  'sombrero de palma': ['Sombrero de palma', '+1 de Velocidad y +5 % de Ataque.'],
  aguayo: ['Aguayo', '+10 % de Defensa y entra con +1 de aguante.'],
};
export const PRENDA_ABEL = { salta: 'poncho de vicuña', corrientes: 'sombrero de palma', jujuy: 'aguayo' };
export const PRENDA_DESAFIO = { Anselmo: 'espuelas', Rosendo: 'vincha', Eulogia: 'chiripá' };
