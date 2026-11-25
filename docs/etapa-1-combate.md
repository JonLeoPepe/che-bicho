# Etapa 1: núcleo de combate v5

El combate de `combate-v5` y `fichas-especies` (aprobados), portado del simulador validado (`sim_v5.py` con la configuración `FINAL`) a JavaScript puro, con azar con semilla: `src/nucleo/combate.js`, `src/nucleo/ia.js`, `src/nucleo/batalla.js`.

## Diferencias a propósito con el simulador
Para cumplir el diseño escrito, que manda sobre el simulador:
- **El rol Veloz gana los empates de Velocidad** (combate-v5, sección 6). El simulador no lo aplicaba.
- **El aura Rastreador** da solo +10 % de daño a marcados (fichas-especies, sección 5). El simulador además le sumaba precisión a los efectos.
- **Sueño y Encandilado duran hasta la ronda siguiente.** En el simulador vencían al final de la misma ronda en que se ponían, así que no hacían nada; el diseño dice "pierde su próxima ronda" y "su próximo golpe hace −30 %".

## Comparación con el simulador (escalera de equipos-y-niveles)
`node herramientas/balance.mjs 300`: 300 peleas por casilla, en las dos posiciones. Porcentaje de peleas que gana el jugador; entre paréntesis, el simulador (unas 80 peleas por casilla, así que su número varía unos 6 puntos).

| Rival | Novato | Intermedio | Experto |
|---|---|---|---|
| Benito | 77 (68) | 87 (85) | 92 (92) |
| Eusebia | 84 (81) | 90 (85) | 94 (85) |
| Martina | 71 (64) | 83 (85) | 88 (91) |
| Anselmo | 61 (50) | 80 (65) | 87 (79) |
| Higinio | 41 (32) | 63 (59) | 72 (74) |
| Eusebio | 77 (76) | 88 (85) | 91 (92) |
| Ireneo | 68 (74) | 85 (81) | 91 (91) |
| Aníbal | 61 (54) | 78 (74) | 91 (76) |
| Rosendo | 41 (32) | 59 (54) | 75 (72) |
| Anacleto | 36 (32) | 50 (52) | 63 (61) |
| Zenón | 54 (57) | 70 (69) | 81 (81) |
| Lucía | 55 (55) | 75 (59) | 85 (81) |
| Aniceto | 71 (72) | 79 (81) | 90 (91) |
| Eulogia | 47 (39) | 66 (61) | 72 (62) |
| Pascual | 27 (31) | 52 (50) | 58 (55) |

- **Diferencia media: 4,8 puntos.** La meta del plan era menos de 2; no se cumple del todo.
- La mayor parte es ruido del simulador (80 peleas por casilla), pero hay un sesgo de unos 3 a 4 puntos a favor del jugador, sobre todo en los galpones (Anselmo, Rosendo, Eulogia). Las tres correcciones de arriba explican una parte; el resto no lo encontré.
- Para cerrarlo hay dos caminos: correr el simulador de Python con 300 peleas por casilla (para saber cuánto es ruido) o aflojar un poco menos la IA de los capataces. **Queda para que Jonathan decida.**

## Cancha de prueba
Desde el Menú: elegir rival (los 15 de las tres provincias y las 3 rondas del Torneo), equipo de 6 al azar de las provincias que ya recorriste, sorteo de mates (4 de cada lado) y elegir con cuál arrancás. La pantalla sigue los lotes 13 y 23a: cartas que se dan vuelta, "Daño ≈" con flecha, vista previa en la barra del rival (tocar una vez muestra, tocar de nuevo confirma), caravanas con las rondas que quedan, puño dorado en el reventón, "¡Frenado!", moneda en el empate, Relevo tocando un retrato y reemplazo a la vez.

Teclado en la PC: 1 a 4 eligen técnica, C cubrirse, Enter confirma, Esc vuelve.
