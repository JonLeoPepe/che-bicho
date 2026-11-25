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
