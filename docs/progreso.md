# Progreso de la implementación completa (para retomar si se corta)

Pedido de Jonathan (2026-11-25): "Quiero que dejes todo implementado" (etapas 2, 3 y 4).

## Arquitectura elegida para el mundo
- Cada zona aprobada (lotes 18c, 19c, 20c) es una pantalla de 360 por 760. `npm run arte` la exporta sin gente, bichos, jugador, fogón ni HUD, con la posición de cada cosa y la caja de cada edificio (`src/arte/mapas.js`).
- Se camina tocando el destino (o con flechas/WASD). Los edificios no se pisan (parte de abajo de su caja). Se pasa de zona saliendo por un borde con salida.
- Gente, fogones y bichos sueltos se dibujan encima, desde `src/datos/mundo.js`.
- La feria de Salta no está en las zonas: se agrega en Salta capital, abajo al centro. El rincón de Salta (monte cerrado) no tiene zona propia: se usa la de las Yungas oscurecida.

## Orden de trabajo
1. Datos: mundo, textos, changas, precios. 2. Lógica pura con pruebas (partida v2, experiencia, captura, changas, economía, tiempo y clima). 3. Pantalla del mapa. 4. Combate con salvajes, captura y recompensas. 5. Negocios, menú, libreta, corral, mochila. 6. Prólogo, domadores, capataces, desafíos, ermitaños, mitos, changas. 7. Corrientes y Jujuy (mismos sistemas, datos). 8. Torneo, final y créditos. 9. Pruebas de punta a punta.

## Hecho
- (ver los commits)
