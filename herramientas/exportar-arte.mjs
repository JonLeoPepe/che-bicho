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
