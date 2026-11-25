# ¡Che, Bicho! Instrucciones para trabajar en este repositorio

Juego web (después Android) de captura y combate de bichos, ambientado en Argentina. Autor: Jonathan (J. Pepe).
El diseño completo y aprobado vive en el Project de claude.ai "Juego Pokémon": `claude/documento-de-diseno-gdd.md` (GDD v2) manda sobre todo; los anexos tienen el detalle.

## Reglas del autor (no negociables)
- No cambiar nada del diseño aprobado sin permiso. Si algo no cierra al programar, resolverlo de la forma más simple y anotarlo para que Jonathan lo revise.
- Arte y sonido generados por código. Nada de imágenes de IA. Sin copiar diseños de Pokémon.
- Sin letras ni nada que se lea como letra o cruz en el arte. Nada superpuesto. Sin globos sobre la cabeza.
- Sin punto medio (el carácter U+00B7) en ningún texto.
- Textos: una línea, hasta 60 caracteres, voseo regional (Salta de usted y "joven"; Corrientes "che"; Jujuy "hijito" o "hijita").
- Usar siempre los nombres aprobados de personas, bichos y lugares.
- Nunca meter texto del jugador con innerHTML (usar `h()` de `src/ui.js`).

## Estructura
- `index.html`, `estilos.css`, `sw.js`, `manifest.webmanifest`: la página, instalable y sin internet.
- `src/main.js`: escenario de 360 por 760 escalado a la pantalla, pila de pantallas, teclado.
- `src/nucleo/`: reglas puras, sin navegador (cuentas, partida, rng; después el combate). Todo con pruebas.
- `src/plataforma/`: lo que toca el navegador (IndexedDB con 2 copias rotativas).
- `src/pantallas/`: cada pantalla es una función `(app) => elemento`.
- `src/arte/`: arte generado desde `arte/fuente` con `npm run arte`. No editar a mano los generados.
- `arte/fuente/`: los catálogos de diseño aprobados (Node). Algunos escriben un .html al importarlos; están en .gitignore.
- `tests/`: `npm test` (node --test). La publicación corre las pruebas antes de publicar.

## Publicación
Cada push a `main` corre `.github/workflows/publicar.yml`: pruebas y GitHub Pages. Sitio: https://jonleopepe.github.io/che-bicho/
