// Exporta el arte aprobado (arte/fuente, los catálogos de diseño) a módulos que el juego carga en el navegador.
// Uso: node herramientas/exportar-arte.mjs
// Los catálogos se escribieron para Node: acá se importan las funciones de dibujo y se guardan como texto SVG.
// Para los bichos se leen las tarjetas B1 a B105 de los catálogos (la última versión de cada una manda).
import { writeFileSync, readFileSync, readdirSync, unlinkSync, mkdirSync } from 'node:fs';
import { jugador, jugadora, maestro } from '../arte/fuente/adultos.mjs';
import { puma } from '../arte/fuente/puma-muestra.mjs';

const fuente = new URL('../arte/fuente/', import.meta.url);
const destino = new URL('../src/arte/', import.meta.url);
mkdirSync(destino, { recursive: true });
const cabecera = '// Generado por herramientas/exportar-arte.mjs. No editar a mano.\n';

writeFileSync(new URL('gente.js', destino), `${cabecera}export const GENTE = ${JSON.stringify({ jugador: jugador(), jugadora: jugadora(), maestro: maestro() })};\n`);
writeFileSync(new URL('muestra.js', destino), `${cabecera}export const MUESTRA = ${JSON.stringify({ puma: puma() })};\n`);

// Bichos: en cada catálogo, las tarjetas dicen qué función dibuja cada especie.
const RE = /tarjeta\('B(\d+)', '([^']+)', '[^']*', '[^']*', '[^']*', ([a-zA-Z]+\((?:[^()]|\{[^}]*\})*\))/g;
const catalogos = readdirSync(fuente).filter((f) => /^catalogo-\d+\.mjs$/.test(f)).sort((a, b) => parseInt(a.slice(9)) - parseInt(b.slice(9)));
const bichos = {};
for (const f of catalogos) {
  const txt = readFileSync(new URL(f, fuente), 'utf8');
  const llamadas = [...txt.matchAll(RE)];
  if (!llamadas.length) continue;
  const tmp = new URL(`_exportar-${f}`, fuente);
  writeFileSync(tmp, `${txt}\nexport const __B = {${llamadas.map(([, n, nom, exp]) => `${JSON.stringify(nom)}: () => ${exp}`).join(',')}};\n`);
  try {
    const m = await import(tmp.href);
    for (const [nom, fn] of Object.entries(m.__B)) bichos[nom] = fn();
  } finally { unlinkSync(tmp); }
}
writeFileSync(new URL('bichos.js', destino), `${cabecera}export const BICHOS = ${JSON.stringify(bichos)};\n`);
console.log('Arte exportado: gente, muestra y', Object.keys(bichos).length, 'bichos');

// Piezas de la pantalla de combate (lotes 23a y 24a): se copian tal cual del código de los catálogos aprobados.
function extraer(archivo, nombres) {
  const lineas = readFileSync(new URL(archivo, fuente), 'utf8').split('\n');
  const inicio = /^(const|let) ([A-Za-z_]+)\b/;
  const fin = /^(const|let|function|export|import|\/\/|writeFileSync|console)/;
  const salida = [];
  for (let i = 0; i < lineas.length; i++) {
    const m = inicio.exec(lineas[i]);
    if (!m || !nombres.includes(m[2])) continue;
    const bloque = [lineas[i]];
    for (let j = i + 1; j < lineas.length && !fin.test(lineas[j]) && lineas[j].trim() !== ''; j++) bloque.push(lineas[j]);
    salida.push(bloque.join('\n'));
  }
  return salida.join('\n');
}
const base = readFileSync(new URL('base-arte.mjs', fuente), 'utf8').split('\n').find((l) => l.startsWith('export const COLOR_TIPO'));
const de60 = extraer('catalogo-60.mjs', ['O', 'L', 'FORMA', 'caravana', 'GL', 'MARCAS', 'EFECTOS', 'BORDE_MARCA', 'marcaSvg', 'efectoSvg', 'tag', 'tagM', 'tagE', 'vida', 'rombos', 'chip', 'panel', 'fondo', 'fichaRel', 'relevos', 'nclip', 'retrato', 'pie', 'msgT', 'flecha', 'revienta', 'tecnica', 'btn', 'icoCubre', 'icoRel', 'dorso', 'carta']);
const de61 = extraer('catalogo-61.mjs', ['CAR', 'carIco', 'reloj', 'bolea', 'tiros', 'icoBolea', 'icoRaja']);
const T29 = readFileSync(new URL('catalogo-29.mjs', fuente), 'utf8').split('\n').find((l) => l.startsWith('export const T ='));
writeFileSync(new URL('combate-arte.js', destino), `${cabecera}${base}\n${T29}\n${de60}\n${de61}\n
export { O, H, CU, L, caravana, GL, MARCAS, EFECTOS, marcaSvg, efectoSvg, tag, tagM, tagE, vida, rombos, chip, panel, fondo, fichaRel, relevos, retrato, pie, msgT, flecha, revienta, tecnica, btn, icoCubre, icoRel, dorso, carta, carIco, reloj, bolea, tiros, icoBolea, icoRaja };\n`);
console.log('Piezas de combate exportadas');

// ---------- Mapas: las zonas aprobadas (lotes 18c, 19c y 20c) ----------
// Se dibuja cada zona sin la gente, los bichos, el jugador, el fogón ni el HUD, y se anota dónde estaba cada cosa.
const ZONAS = { salta: 'catalogo-50.mjs', corrientes: 'catalogo-53.mjs', jujuy: 'catalogo-56.mjs' };
const mapas = {};
for (const [prov, archivo] of Object.entries(ZONAS)) {
  let txt = readFileSync(new URL(archivo, fuente), 'utf8');
  const reemplazar = (re, nuevo) => { if (!re.test(txt)) throw new Error(`${archivo}: no encuentro ${re}`); txt = txt.replace(re, nuevo); };
  reemplazar(/^const marco = .*$/m, "const __Z = {}; let __R = []; const marco = (id, cont) => { __Z[id] = { svg: cont, cosas: __R }; __R = []; return ''; };");
  reemplazar(/^const pj = .*$/m, "const pj = (x, y) => { __R.push({ que: 'jugador', x, y }); return ''; };");
  reemplazar(/^const gente = .*$/m, "const gente = (x, y, f, flip) => { __R.push({ que: 'gente', x, y, quien: f.name, flip: !!flip }); return ''; };");
  reemplazar(/^const bicho = .*$/m, "const bicho = (x, y, f, s = .42, flip) => { __R.push({ que: 'bicho', x, y, quien: f.name, s, flip: !!flip }); return ''; };");
  reemplazar(/^const ed = .*$/m, "const ed = (x, y, f, s = .7) => { __R.push({ que: 'edificio', x, y, s, quien: f.name || (String(f).match(/conMicro\\((\\w+)/) || [])[1] || 'otro' }); return `<g data-ed=\"${__R.length - 1}\" transform=\"translate(${x} ${y}) scale(${s})\">${f()}</g>`; };");
  reemplazar(/^const pie = .*$/m, "const pie = '';");
  txt = txt.replace(/\$\{hud\(/g, '${__hud(').replace(/\$\{fogon\(/g, '${__fogon(');
  txt += "\nfunction __hud() { return ''; }\nfunction __fogon(x, y, s) { __R.push({ que: 'fogon', x, y, s }); return ''; }\nexport { __Z };\n";
  const tmp = new URL(`_exportar-${archivo}`, fuente);
  writeFileSync(tmp, txt);
  try { mapas[prov] = (await import(tmp.href)).__Z; } finally { unlinkSync(tmp); }
}
// Medidas de cada edificio en pantalla, para que no se camine por encima (hace falta Chrome sin pantalla).
try {
  const { default: puppeteer } = await import('/home/claude/chebicho/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js');
  const nav = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const pag = await nav.newPage();
  for (const zonas of Object.values(mapas)) for (const z of Object.values(zonas)) {
    await pag.setContent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 760" width="360" height="760">${z.svg}</svg>`);
    const cajas = await pag.evaluate(() => [...document.querySelectorAll('[data-ed]')].map((g) => { const r = g.getBoundingClientRect(); return [Number(g.dataset.ed), Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; }));
    for (const [i, x, y, w, h] of cajas) z.cosas[i].caja = [x, y, w, h];
  }
  await nav.close();
} catch (e) { console.log('Sin medidas de edificios:', e.message); }
writeFileSync(new URL('mapas.js', destino), `${cabecera}export const MAPAS = ${JSON.stringify(mapas)};\n`);
console.log('Mapas exportados:', Object.entries(mapas).map(([p, z]) => `${p} ${Object.keys(z).length}`).join(', '));

// ---------- Gente ----------
const modsGente = ['personas-salta.mjs', 'personas-salta2.mjs', 'personas-salta3.mjs', 'personas-corrientes.mjs', 'personas-jujuy.mjs', 'personas-ermitanos.mjs', 'personas-tiendas.mjs'];
const personas = {};
for (const m of modsGente) {
  const mod = await import(new URL(m, fuente).href);
  for (const [k, f] of Object.entries(mod)) if (typeof f === 'function' && !['mano', 'bota', 'sombrero'].includes(k)) { try { const s = f(); if (typeof s === 'string' && s.length > 200) personas[k] = s; } catch { /* no es un dibujo */ } }
}
writeFileSync(new URL('personas.js', destino), `${cabecera}export const PERSONAS = ${JSON.stringify(personas)};\n`);
console.log('Personas exportadas:', Object.keys(personas).length);

// ---------- Edificios sueltos que el juego agrega (la feria de Salta, que no está en las zonas) ----------
const { feria } = await import(new URL('edificios.mjs', fuente).href);
writeFileSync(new URL('edificios.js', destino), `${cabecera}export const EDIFICIOS = ${JSON.stringify({ feria: feria() })};\n`);

// ---------- Interfaz del juego: íconos, pilchas, interiores, HUD y medallas (lotes 14b a 24a) ----------
let nAbrir = 0;
async function abrir(archivo, nombres) {
  let txt = readFileSync(new URL(archivo, fuente), 'utf8');
  const ya = new Set([...txt.matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1]));
  const faltan = nombres.filter((n) => !ya.has(n));
  if (faltan.length) txt += `\nexport { ${faltan.join(', ')} };\n`;
  const tmp = new URL(`_exportar-ui${nAbrir++}-${archivo}`, fuente);
  writeFileSync(tmp, txt);
  try { return await import(tmp.href); } finally { unlinkSync(tmp); }
}
const c29 = await abrir('catalogo-29.mjs', ['moneda']);
const c30 = await abrir('catalogo-30.mjs', ['IC']);
const c31 = await abrir('catalogo-31.mjs', ['P']);
const c32 = await abrir('catalogo-32.mjs', ['N']);
const c35 = await abrir('catalogo-35.mjs', ['MOM', 'CLI', 'NOMMOM']);
const c37 = await abrir('catalogo-37.mjs', ['guayaca', 'mateN']);
const c38 = await abrir('catalogo-38.mjs', ['FONDO']);
const c39 = await abrir('catalogo-39.mjs', ['ICN']);
const c46 = await abrir('catalogo-46.mjs', ['chipa', 'tamal', 'empanada']);
const c47 = await abrir('catalogo-47.mjs', ['insignia', 'MOT']);
const c61 = await abrir('catalogo-61.mjs', ['PR', 'piedra', 'vestir', 'PILCHAS']);
const { fogon } = await import(new URL('marca-changa.mjs', fuente).href);
const ICONOS = {
  peperina: c30.IC.peperina, cedron: c30.IC.cedron, jarilla: c30.IC.jarilla, sahumerio: c30.IC.sahumerio, ruda: c30.IC.ruda, mate: c30.IC.mate,
  carpa: c39.ICN.carpa, corral: c39.ICN.corral, palosanto: c32.N.palosanto, miel: c32.N.miel, pista: c32.N.pista, boleadora: c32.N.boleadora,
  machete: c32.N.machete, canoa: c32.N.canoa, soga: c32.N.soga, chipa: c46.chipa, tamales: c46.tamal, empanadas: c46.empanada,
  piedra: `<g transform="translate(4 4)">${c61.piedra()}</g>`,
};
const PRENDAS_ICO = { poncho: c31.P.poncho, faja: c31.P.faja, rastra: c31.P.rastra, 'pañuelo': c31.P.panuelo, boina: c31.P.boina, alpargatas: c31.P.alpargatas, espuelas: c32.N.espuelas, vincha: c32.N.vincha, 'chiripá': c32.N.chiripa, 'poncho de vicuña': c61.PR.vicuna, 'sombrero de palma': c61.PR.palma, aguayo: c61.PR.aguayo };
const MEDALLAS = { salta: c47.insignia(0, 0, c47.MOT.empanada), corrientes: c47.insignia(0, 0, c47.MOT.acordeon), jujuy: c47.insignia(0, 0, c47.MOT.cerro) };
const PILCHAS = {};
for (const [cod, nom, , , spec, , extra] of c61.PILCHAS) PILCHAS[cod] = { nombre: nom, jugador: c61.vestir('j', spec), jugadora: c61.vestir('a', { ...spec, ...(extra?.a || {}) }) };
const ui = {
  ICONOS, PRENDAS_ICO, MEDALLAS, PILCHAS, MOM: c35.MOM, CLI: c35.CLI, MONEDA: c29.moneda(0, 0), INTERIOR: c38.FONDO,
  GUAYACA: c37.guayaca(0, 0, 1, false), GUAYACA_ABIERTA: c37.guayaca(0, 0, 1, true), MATE_NEGRO: c37.mateN,
  FOGON: fogon(0, 0, 1, true), FOGON_APAGADO: fogon(0, 0, 1, false),
};
writeFileSync(new URL('ui-arte.js', destino), `${cabecera}${Object.entries(ui).map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`).join('\n')}\n`);
console.log('Interfaz exportada: CLI', Object.keys(c35.CLI).join(' '), 'interiores', Object.keys(c38.FONDO).length, 'pilchas', Object.keys(PILCHAS).length);

// ---------- Fondos de combate por provincia, galpones y clima animado (lote 15a) ----------
const c36 = await abrir('catalogo-36.mjs', ['SALTA', 'CORR', 'JUJUY', 'GALP_S', 'GALP_C', 'GALP_J', 'publico', 'capaLluvia', 'capaNieve', 'capaViento', 'capaNublado', 'NOCHE', 'NIEVE', 'charcos', 'manchas', 'rodadora']);
const fondos = {
  COMBATE: { salta: c36.SALTA('cfs'), corrientes: c36.CORR('cfc'), jujuy: c36.JUJUY('cfj'), Anselmo: c36.GALP_S('cgs'), Rosendo: c36.GALP_C('cgc'), Eulogia: c36.GALP_J('cgj') },
  CLIMA_COMBATE: { noche: c36.NOCHE, lluvia: c36.capaLluvia(360, 400), nieve: c36.NIEVE, viento: c36.capaViento(360, 400), nublado: c36.capaNublado(360, 400) },
  CLIMA_MAPA: { lluvia: c36.capaLluvia(360, 760) + c36.charcos, nieve: c36.capaNieve(360, 760) + c36.manchas, viento: c36.capaViento(360, 760) + `<g transform="translate(0 520)">${c36.rodadora}</g>`, nublado: c36.capaNublado(360, 760, true) },
};
writeFileSync(new URL('fondos.js', destino), `${cabecera}${Object.entries(fondos).map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`).join('\n')}\n`);
console.log('Fondos exportados');

// ---------- Festejo del Torneo (lote 17b) ----------
const c47b = await abrir('catalogo-47.mjs', ['rayos', 'estallido', 'mateCopa', 'publicoC', 'brillos']);
const festejo = {
  RAYOS: c47b.rayos, ESTALLIDOS: `${c47b.estallido(46, 52, '#f2d27a', 0)}${c47b.estallido(314, 56, '#e86a5a', 0.8)}${c47b.estallido(40, 230, '#8ec4d8', 1.6)}${c47b.estallido(320, 236, '#a8d86a', 2.2)}`,
  MATE_COPA: c47b.mateCopa, PUBLICO: c47b.publicoC, BRILLOS: c47b.brillos,
};
writeFileSync(new URL('festejo.js', destino), `${cabecera}${Object.entries(festejo).map(([k, v]) => `export const ${k} = ${JSON.stringify(v)};`).join('\n')}\n`);
console.log('Festejo exportado');

// ---------- Rancho de Don Abel (lote 17a) e íconos de tipo (lote 15c) ----------
const c46b = await abrir('catalogo-46.mjs', ['rancho']);
const c38b = await abrir('catalogo-38.mjs', ['FINAL']);
writeFileSync(new URL('rancho.js', destino), `${cabecera}export const RANCHO = ${JSON.stringify(c46b.rancho)};\nexport const ICO_TIPO = ${JSON.stringify(c38b.FINAL)};\n`);
console.log('Rancho exportado');
