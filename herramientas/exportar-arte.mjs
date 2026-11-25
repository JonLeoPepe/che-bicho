// Exporta el arte aprobado (arte/fuente, los catálogos de diseño) a módulos que el juego carga en el navegador.
// Uso: node herramientas/exportar-arte.mjs
// Los catálogos se escribieron para Node: acá se importan solo las funciones de dibujo y se guardan como texto SVG.
import { writeFileSync, mkdirSync } from 'node:fs';
import { jugador, jugadora, maestro } from '../arte/fuente/adultos.mjs';
import { puma } from '../arte/fuente/puma-muestra.mjs';

const destino = new URL('../src/arte/', import.meta.url);
mkdirSync(destino, { recursive: true });

const gente = { jugador: jugador(), jugadora: jugadora(), maestro: maestro() };
const bichosMuestra = { puma: puma() };

const cabecera = '// Generado por herramientas/exportar-arte.mjs. No editar a mano.\n';
writeFileSync(new URL('gente.js', destino), `${cabecera}export const GENTE = ${JSON.stringify(gente)};\n`);
writeFileSync(new URL('muestra.js', destino), `${cabecera}export const MUESTRA = ${JSON.stringify(bichosMuestra)};\n`);
console.log('Arte exportado:', Object.keys(gente).length + Object.keys(bichosMuestra).length, 'dibujos');
