# Etapas 2, 3 y 4: qué quedó hecho (2026-11-25)

Pedido de Jonathan: "Quiero que dejes todo implementado" (etapas 2, 3 y 4), trabajando solo y sin cambiar el diseño aprobado.

## Cómo está armado
- `src/arte/`: todo el arte sale de los catálogos aprobados con `npm run arte` (zonas 18c, 19c y 20c; gente; interiores 15c; fondos de combate y galpones 15a; clima 15a; pilchas, piedra y prendas 24a; rancho y fichas 17a; festejo 17b; íconos 14c, 14d y 32).
- `src/datos/`: mundo (zonas, salidas, bichos por zona, gente, diálogos), changas (las 42), tienda (precios de economia-v1), libreta (datos reales).
- `src/nucleo/`: progreso (experiencia, reloj, clima, captura al corral, libreta), changas (oferta, avance y cobro), partida v2 con migración desde v1. Todo con pruebas (`tests/progreso.test.js`).
- `src/juego/`: mapa, diálogo R2, peleas (salvajes, domadores, capataces, ermitaños, mitos, torneo), negocios, galpón y desafío, menús, prólogo, final, fichas y sonido.

## Hecho
- **Prólogo:** rancho de Don Abel, las 3 iniciales con su ficha completa antes de confirmar, la libreta y la salida a Cerrillos.
- **Mapa de las 3 provincias** (20 zonas y el monte cerrado): se camina tocando el destino, arrastrando el dedo (palanca redonda) o con flechas y WASD; Enter toca lo que está cerca; Esc abre el Menú. Edificios y gente no se pisan. Salidas por los bordes, Ruta 9 a pie entre Salta capital y San Salvador, micro desde las terminales.
- **HUD H1**, reloj (8 minutos por franja, corre solo en el mapa), clima por provincia, día y franja (nieve solo en la Puna y las cumbres; en Jujuy, nieve día por medio), noche y clima animados (15a).
- **Bichos sueltos** según bichos-por-zona: rareza, momento, clima, carácter (tímido huye, curioso se acerca, manso se queda, bravo encara), nivel de la zona y camino desde el nivel 4. Salen en el mismo tipo de suelo donde los puso el lote aprobado.
- **Combate contra salvajes** (24a): carácter, reloj de paciencia, tiros del bravo y del mito, Rendido, Furia del bravo, Boleadora con el aro dorado y la guayaca, Rajá con su chance a la vista.
- **Experiencia** 60 × N, pasiva en el 3 y camino en el 4 (se eligen en la ficha), Piedra de la Pachamama, amadrinar, corral de 20 a 60, equipo de 6 que se cambia en la posta.
- **Negocios** de las 3 provincias con su interior y su gente: posta (cura gratis, corral, alambrador), almacén (mate, carpa, convites, encargo de pistas), curandera (remedios, palo santo, miel, ruda y limpia), feria (prendas, mejoras de la boleadora, pilchas), terminal (pasajes).
- **Changas:** los 6 changueros con sus 42 changas, fogón prendido, una por día, hasta 3 en curso, aviso de avance del lote 24a, cobro con premio (pistas, pilchas) una sola vez.
- **Domadores** (9), **capataces** (3, en su galpón sin clima, con medalla, herramienta y desafío), **ermitaños** (3, con convite, piedra, segunda pista y puesto escondido), **mitos** (4, en su rincón con su condición), **revanchas** una por día al 10 %.
- **Derrota** en la última posta, con las líneas de cada provincia y "No perdiste chirolas".
- **Libreta** por provincia con base y caminos (tilde, color o silueta), dato real, "Cuándo sale" con pistas; libreta completa y prenda única de Don Abel (D4).
- **Torneo del Norte** en el tinglado: 3 rondas con sorteo de mates y curación entre rondas, ¡Campeón!, libreta de campeones, Don Abel, créditos y "Seguir jugando".
- **Menú T6:** Libreta, Bichos, Mochila (remedios, camino, prendas, herramientas, changas), Personaje con Ropero, Cinto y Mapa (carta con niebla).
- **Sonido:** efectos del lote 22a (provisorios), música chiptune del prototipo v0.4 y voces en idioma bicho.

## Simplificaciones (para que Jonathan las revise)
Ver la lista numerada en el informe final y en `estado-de-la-construccion.md` del Project.
