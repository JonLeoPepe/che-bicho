// Catálogo para aprobar, lote 13 (v2): pantalla de combate en el celular. Zonas fijas sin superposiciones.
import { writeFileSync } from 'node:fs';
import { svg, pagina, COLOR_TIPO } from './base-arte.mjs';
import { puma } from './puma-muestra.mjs';
import { tero } from './muestra-bichos.mjs';
import { lucerna } from './luciernaga.mjs';
import { insig, G } from './marcas.mjs';
const O = '#2a1c15';
const T = (x, y, s, txt, { f = 'Nunito', w = 400, c = '#3a2414', a = 'start' } = {}) => `<text x="${x}" y="${y}" font-family="${f}" font-weight="${w}" font-size="${s}" fill="${c}" text-anchor="${a}">${txt}</text>`;
const ico = (k, color, x, y, s = 22, n) => `<g transform="translate(${x} ${y})">${insig(COLOR_TIPO[color] || color, G[k]).replace('<svg ', `<svg width="${s}" height="${s}" `)}${n ? `<circle cx="${s - 2}" cy="${s - 3}" r="6.4" fill="#fbf3e2" stroke="${O}" stroke-width="1.2"/>${T(s - 2, s, 8.5, n, { w: 800, a: 'middle' })}` : ''}</g>`;
const vida = (x, y, w, f) => `<rect x="${x}" y="${y}" width="${w}" height="9" rx="4.5" fill="#5a4636" stroke="${O}" stroke-width="1.4"/><rect x="${x + 1}" y="${y + 1}" width="${Math.max(0, (w - 2) * f)}" height="7" rx="3.5" fill="${f > 0.5 ? '#6fbf5a' : f > 0.2 ? '#e2b83a' : '#d8402a'}"/>`;
const rombos = (x, y, n, max = 6, s = 10) => Array.from({ length: max }, (_, i) => `<rect x="${x + i * (s + 3)}" y="${y}" width="${s}" height="${s}" rx="2.5" transform="rotate(45 ${x + i * (s + 3) + s / 2} ${y + s / 2})" fill="${i < n ? '#e2a72e' : '#5a4636'}" stroke="${O}" stroke-width="1.2"/>`).join('');
const chip = (x, y, tipo) => `<rect x="${x}" y="${y}" width="${tipo.length * 6.4 + 12}" height="15" rx="7.5" fill="${COLOR_TIPO[tipo]}"/>${T(x + 6, y + 11, 9.5, tipo, { w: 800, c: '#fff' })}`;
const panel = (x, y, w, h, fill = '#f4ead2') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${O}" stroke-width="2"/>`;
const libretaBtn = (x, y) => `<g transform="translate(${x} ${y})"><rect width="26" height="26" rx="7" fill="#7a4a2a" stroke="${O}" stroke-width="1.6"/><path d="M6,6 L13,8 L20,6 L20,20 L13,22 L6,20Z" fill="#f4ead2" stroke="${O}" stroke-width="1.2"/><path d="M13,8 L13,22" stroke="${O}" stroke-width="1.2"/><path d="M8,11 L11,12 M8,15 L11,16 M15,12 L18,11 M15,16 L18,15" stroke="#9a7a5a" stroke-width="1"/></g>`;
const ayuda = (x, y, r = 9) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#7a4a2a" stroke="${O}" stroke-width="1.4"/>${T(0, 4.4, 12, '?', { f: 'Bree', a: 'middle', c: '#fbf3e2' })}</g>`;
const relojArena = (x, y, n) => `<g transform="translate(${x} ${y})"><path d="M0,0 L14,0 L14,3 C14,8 9,9 9,11.5 C9,14 14,15 14,20 L14,23 L0,23 L0,20 C0,15 5,14 5,11.5 C5,9 0,8 0,3Z" fill="#f4ead2" stroke="${O}" stroke-width="1.5"/><path d="M3,5 L11,5 C10,8 8,9 7,11 C6,9 4,8 3,5Z M3,20 C5,16 9,16 11,20Z" fill="#e2b83a"/></g>${T(x + 19, y + 17, 13, n, { w: 800 })}`;
const fondo = `<defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ec"/><stop offset="1" stop-color="#eef4e6"/></linearGradient><pattern id="cuero" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#5e351c"/><path d="M0,4 L14,5 M3,11 L11,11" stroke="#4e2a14" stroke-width="1"/></pattern></defs>
  <rect width="360" height="760" rx="26" fill="url(#cielo)"/><path d="M0,250 C80,236 180,240 360,232 L360,400 L0,400Z" fill="#a8c47a"/><path d="M0,300 C120,290 240,296 360,288 L360,400 L0,400Z" fill="#8fb45e"/>
  <ellipse cx="276" cy="382" rx="70" ry="11" fill="#7f9e4e"/><ellipse cx="90" cy="382" rx="74" ry="11" fill="#7f9e4e"/>`;
const tope = `<rect x="12" y="10" width="232" height="28" rx="14" fill="#2f7d5b" stroke="${O}" stroke-width="1.6"/>${T(26, 29, 12.5, 'Salvaje, Esteros del Iberá', { w: 800, c: '#fff' })}<rect x="252" y="10" width="96" height="28" rx="14" fill="#e2b83a" stroke="${O}" stroke-width="1.6"/>${T(300, 29, 12, '☀ Siesta', { w: 800, a: 'middle' })}`;
// zona del rival: panel 10–210 × 48–138; dibujo 214–350 × 70–232
const rival = (marcas, f, ps = '') => `<g transform="translate(176 0)">${panel(10, 48, 164, 96)}${T(22, 68, 16, 'Ventero', { f: 'Bree' })}${T(162, 68, 11.5, 'Nv 5', { w: 800, a: 'end', c: '#5a3e28' })}${chip(22, 76, 'Viento')}${libretaBtn(136, 74)}${vida(22, 100, 140, f)}${marcas}${relojArena(118, 112, '4')}${ps}</g>`;
const bichoRival = (cls = '') => `<g class="${cls}"><g transform="translate(206 232) scale(.7)">${tero()}</g></g>`;
// zona propia: dibujo 14–170 × 236–392; panel 172–350 × 296–392
const yo = (nom, tipo, marcas, f, num, ag) => `<g transform="translate(-162 -248)">${panel(172, 296, 164, 96)}${T(184, 317, 16, nom, { f: 'Bree' })}${T(324, 317, 11.5, 'Nv 6', { w: 800, a: 'end', c: '#5a3e28' })}${chip(184, 324, tipo)}${T(324, 336, 11, num, { w: 800, a: 'end', c: '#5a3e28' })}${vida(184, 344, 140, f)}${rombos(186, 366, ag)}${marcas}</g>`;
const pumaYo = `<g transform="translate(168 236) scale(-.76 .76)">${puma()}</g>`;
const lucernaYo = `<g transform="translate(166 246) scale(-.74 .74)">${lucerna()}</g>`;

const retratos = (paseEn, act) => { const tipos = ['Tierra', 'Agua', 'Fuego', 'Rayo', 'Flora', 'Común']; return `${tipos.map((t, i) => `<g transform="translate(${28 + i * 40} 426)"><circle r="16" fill="${COLOR_TIPO[t]}" stroke="${i === act ? '#fbf3e2' : O}" stroke-width="${i === act ? 3 : 1.6}"/>${T(0, 5, 13, ['A', 'Y', 'T', 'L', 'M', 'K'][i], { w: 800, a: 'middle', c: '#fff' })}${i === paseEn ? `<circle r="20" fill="none" stroke="#f2d23a" stroke-width="3" class="late"/>${ico('mojado', 'Agua', 7, -24, 16)}` : ''}</g>`).join('')}
  <g transform="translate(262 414)">${T(0, 0, 9.5, 'ENVIÓN', { w: 800, c: '#f4ead2' })}${[0, 1, 2].map((i) => `<rect x="${i * 26}" y="6" width="22" height="13" rx="3" fill="${i < 2 ? '#f2b03a' : '#5a4636'}" stroke="${O}" stroke-width="1.4"/>`).join('')}</g>`; };
// botón de técnica: nombre, tipo, daño en barras, costo en rombos, marca que deja, eficacia contra el rival y botón (?)
const fuerza = (x, y, n, f = '') => `${T(x, y, 10, 'Daño', { c: '#5a3e28' })}${T(x + 28, y, 12, `≈ ${n}`, { w: 800 })}${f ? T(x + 28 + String(n).length * 7 + 16, y, 12, f[0], { w: 800, c: f[0] === '▲' ? '#2f8a3b' : '#b8322a' }) : ''}`;
const tecnica = (x, y, nom, tipo, costo, fz, marca, efic, brilla) => `<g transform="translate(${x} ${y})"><rect width="164" height="70" rx="12" fill="#fbf3e2" stroke="${brilla ? '#f2d23a' : O}" stroke-width="${brilla ? 3.4 : 1.8}"/><rect x="0" y="0" width="9" height="70" rx="4.5" fill="${COLOR_TIPO[tipo]}"/>
  ${T(16, 20, 13.5, nom, { w: 800 })}${rombos(118, 9, costo, costo, 8)}
  ${chip(16, 28, tipo)}${fuerza(tipo.length * 6.4 + 36, 40, fz, efic)}
  ${marca ? `${ico(marca[0], marca[1], 16, 48, 16)}${T(36, 61, 10, marca[2], { c: '#5a3e28' })}` : ''}${ayuda(150, 56, 8)}</g>`;
const tecnicas = (sel) => `${tecnica(12, 494, 'Manotazo', 'Común', 0, 9, null, '')}${tecnica(184, 494, 'Terronazo', 'Tierra', 1, 8, ['embarrado', 'Tierra', 'embarra'], '▼ poco')}
  ${tecnica(12, 570, 'Zarpa de tierra', 'Tierra', 2, 14, null, '▼ poco')}${tecnica(184, 570, 'Pedrada', 'Roca', 2, 24, null, '▲ eficaz', sel)}`;
const acciones = (resalta) => ['Cubrirse', 'Cambiar', 'Boleadora'].map((t, i) => `<g transform="translate(${12 + i * 114} 700)"><rect width="108" height="46" rx="12" fill="${t === resalta ? '#e2b83a' : '#7a4a2a'}" stroke="${O}" stroke-width="1.8" ${t === resalta ? 'class="late"' : ''}/>${T(54, 28, 12.5, t, { w: 800, a: 'middle', c: t === resalta ? '#3a2414' : '#fbf3e2' })}</g>`).join('');
const pie = (msg, extra = '') => `<rect x="0" y="400" width="360" height="360" fill="url(#cuero)"/><path d="M0,400 L360,400" stroke="${O}" stroke-width="2"/>${extra}<rect x="12" y="454" width="336" height="32" rx="10" fill="#3a2010"/>${msg}`;
const msgT = (txt, x = 24) => T(x, 475, 12.5, txt, { w: 800, c: '#fbf3e2' });
const notaPase = `${T(180, 656, 10.5, 'Ninguna técnica de Allpuma explota el Mojado.', { a: 'middle', c: '#f4ead2' })}${T(180, 674, 10.5, 'Tocá el retrato que brilla: Pase a Lucerna (2 de Envión).', { a: 'middle', c: '#f2d23a', w: 800 })}`;

const c1 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival(`${ico('mojado', 'Agua', 22, 112, 22, '3')}${ico('furia', '#a8322a', 50, 112, 22, '2')}`, 0.62)}${pumaYo}${yo('Allpuma', 'Tierra', ico('chamuscado', 'Fuego', 300, 358, 20, '1'), 0.78, '62/80', 4)}
  ${pie(msgT('Ventero está Mojado y con Furia. ¿Qué hacés?'), retratos(3, 0))}${tecnicas()}${notaPase}${acciones('')}`);
// C7: vista previa del daño al tocar una técnica
const previa = `<rect class="titila" x="${23 + 174 * 0.14}" y="101" width="${174 * 0.48}" height="7" rx="3.5" fill="#fff6c0" stroke="#a8322a" stroke-width="1.2"/>`;
const c7 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival(previa, 0.62)}${pumaYo}${yo('Allpuma', 'Tierra', '', 0.78, '62/80', 4)}
  ${pie(msgT('Pedrada: daño ≈ 24 ▲. Tocá de nuevo para usarla.'), retratos(3, 0))}${tecnicas(true)}${acciones('')}`);
// reacción: sin cartel; destello sobre el rival, número de daño junto a su dibujo y la reacción con su ícono en la barra de mensajes
const chapaReaccion = `<g transform="translate(22 461)"><circle cx="9" cy="9" r="10" fill="#f2d23a" stroke="${O}" stroke-width="1.4"/><path d="M11,2 L5,10 L9,10 L7,16 L13,8 L9,8Z" fill="${O}"/></g>`;
const c2 = svg('0 0 360 760', `${fondo}${tope}<g class="destello"><circle cx="276" cy="300" r="64" fill="#fff6c0" opacity=".7"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i / 8) * Math.PI * 2; return `<path d="M${(276 + Math.cos(a) * 46).toFixed(1)},${(300 + Math.sin(a) * 46).toFixed(1)} L${(276 + Math.cos(a) * 66).toFixed(1)},${(300 + Math.sin(a) * 66).toFixed(1)}" stroke="#f2d23a" stroke-width="4" stroke-linecap="round"/>`; }).join('')}</g>${bichoRival('temblor')}
  ${rival(ico('mareo', '#7a5a9a', 22, 112, 22, '2'), 0.18)}${T(344, 226, 22, '−48', { f: 'Bree', a: 'end', c: '#d8402a' })}
  ${lucernaYo}${yo('Lucerna', 'Rayo', '', 0.9, '58/64', 3)}
  ${pie(`${chapaReaccion}${msgT('Descarga ×1,6. Ventero queda Mareado', 48)}`, retratos(-1, 3))}${tecnicas().replace(/Allpuma/g, '')}${acciones('')}`);
const bolas = [0, 1, 2].map((i) => { const a = (i / 3) * Math.PI * 2; return `<g transform="translate(${(Math.cos(a) * 100).toFixed(1)} ${(Math.sin(a) * 100).toFixed(1)})"><circle r="9" fill="#8a7a6a" stroke="${O}" stroke-width="1.8"/><path d="M-6,-3 C-3,-5 3,-5 6,-3" stroke="#c9a86a" stroke-width="1.6" fill="none"/></g>`; }).join('');
const c3 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival('', 0.02, T(22, 131, 11, '1 de vida', { w: 800, c: '#d8402a' }))}${pumaYo}${yo('Allpuma', 'Tierra', '', 0.66, '53/80', 2)}
  <defs><mask id="foco"><rect width="360" height="400" fill="#fff"/><circle cx="180" cy="236" r="122" fill="#000"/></mask></defs>
  <rect y="44" width="360" height="356" fill="rgba(20,10,5,.62)" mask="url(#foco)"/>
  <g transform="translate(180 236)"><circle r="122" fill="#eef4e6"/><ellipse cx="0" cy="62" rx="70" ry="10" fill="#7f9e4e"/>
    <circle r="86" fill="none" stroke="#6fbf5a" stroke-width="18" opacity=".55"/><circle r="86" fill="none" stroke="#fbf3e2" stroke-width="2.6" stroke-dasharray="6 5"/>
    <g transform="translate(-72 -78) scale(.72)">${tero()}</g>
    <g class="aro"><circle r="100" fill="none" stroke="${O}" stroke-width="6"/><circle r="100" fill="none" stroke="#e2b83a" stroke-width="3.4"/><g class="giro">${bolas}</g></g></g>
  <rect x="0" y="400" width="360" height="360" fill="url(#cuero)"/><path d="M0,400 L360,400" stroke="${O}" stroke-width="2"/>
  <rect x="12" y="414" width="336" height="58" rx="12" fill="#3a2010"/>${T(180, 438, 15, '¡Se rindió! ¡Boleala!', { f: 'Bree', a: 'middle', c: '#f2d23a' })}${T(180, 460, 11.5, 'Soltá cuando las bolas pisen la línea blanca.', { a: 'middle', c: '#fbf3e2' })}
  <g transform="translate(12 484)">${panel(0, 0, 336, 66)}${[['#fbf3e2', 'Sobre la línea', 'perfecto'], ['#6fbf5a', 'En la franja verde', 'bueno'], ['#8a7a6a', 'Afuera', 'flojo o malo']].map(([c, a, b], i) => `<g transform="translate(${14 + i * 108} 18)"><circle cx="8" cy="8" r="8" fill="${c}" stroke="${O}" stroke-width="1.4"/>${T(22, 7, 10.5, a, { c: '#5a3e28' })}${T(22, 22, 11, b, { w: 800 })}</g>`).join('')}</g>
  <g transform="translate(12 558)">${panel(0, 0, 336, 128)}${T(14, 24, 13.5, 'Chance de atraparlo', { f: 'Bree' })}${[['Base (poco común)', '35 %'], ['Vida que le falta', '×2'], ['Rendido', '×1,5'], ['Mejoras de talabartería', '+8 %'], ['Con tiro bueno', '≈ 85 %']].map(([a, b], i) => `${T(14, 46 + i * 18, 11.5, a, { c: i === 4 ? '#3a2414' : '#5a3e28', w: i === 4 ? 800 : 400 })}${T(322, 46 + i * 18, 11.5, b, { w: 800, a: 'end' })}`).join('')}</g>
  ${acciones('Boleadora')}`);
// ayuda de una técnica (al tocar ?)
const c4 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival(`${ico('mojado', 'Agua', 22, 112, 22, '3')}`, 0.62)}${pumaYo}${yo('Allpuma', 'Tierra', '', 0.78, '62/80', 4)}${pie(msgT('Ventero está Mojado. ¿Qué hacés?'), retratos(3, 0))}${tecnicas()}${acciones('')}
  <rect width="360" height="760" rx="26" fill="rgba(20,10,5,.55)"/>
  <g transform="translate(20 300)">${panel(0, 0, 320, 300, '#fbf3e2')}<rect x="0" y="0" width="320" height="48" rx="12" fill="${COLOR_TIPO.Tierra}"/>${T(18, 31, 18, 'Terronazo', { f: 'Bree', c: '#fff' })}${T(302, 30, 12, 'Tierra', { w: 800, a: 'end', c: '#fff' })}
    ${T(18, 76, 12.5, 'Tira un terrón que embarra al rival.', { w: 800 })}
    ${T(18, 102, 12, 'Daño', { c: '#5a3e28' })}${T(96, 102, 12, '45 de base; contra Ventero ≈ 8 ▼', { w: 800 })}
    ${T(18, 126, 12, 'Aguante', { c: '#5a3e28' })}${rombos(98, 117, 1, 1, 9)}${T(118, 126, 12, 'cuesta 1 de los 6', { c: '#5a3e28' })}
    ${T(18, 150, 12, 'Contra Ventero', { c: '#5a3e28' })}${T(108, 150, 11.5, '▼ poco eficaz: Tierra contra Viento', { w: 800, c: '#8a6a5a' })}
    <rect x="12" y="166" width="296" height="96" rx="10" fill="#f4ead2" stroke="#d9ccb4"/>${ico('embarrado', 'Tierra', 22, 178, 30)}${T(62, 190, 13, 'Deja la marca Embarrado', { w: 800 })}${T(62, 208, 11.5, 'Durante 3 turnos el rival no puede cubrirse.', { c: '#5a3e28' })}${T(22, 232, 11.5, 'Si después lo golpea un bicho de Agua, explota:', { c: '#5a3e28' })}${T(22, 250, 11.5, 'Lodazal: no puede huir ni cambiar por 2 turnos.', { w: 800 })}
    <g transform="translate(110 270)"><rect width="100" height="22" rx="11" fill="#7a4a2a"/>${T(50, 15, 11.5, 'Entendido', { w: 800, a: 'middle', c: '#fbf3e2' })}</g></g>`);
// libreta del rival (al tocar el ícono de libreta): sirve antes de pelear y durante el combate
const barraStat = (x, y, nom, v) => `${T(x, y, 11.5, nom, { c: '#5a3e28' })}<rect x="${x + 64}" y="${y - 9}" width="120" height="9" rx="4.5" fill="#d9ccb4"/><rect x="${x + 64}" y="${y - 9}" width="${(v - 60) / 80 * 120}" height="9" rx="4.5" fill="#c8562a"/>`;
const puntos = (x, y, nom, n) => `${T(x, y, 11.5, nom, { c: '#5a3e28' })}${[0, 1, 2, 3, 4].map((i) => `<circle cx="${x + 70 + i * 13}" cy="${y - 4}" r="4.6" fill="${i < n ? '#2f6a8a' : '#d9ccb4'}"/>`).join('')}`;
const c5 = svg('0 0 360 760', `${fondo}${tope}${bichoRival()}${rival('', 0.62)}${pumaYo}${yo('Allpuma', 'Tierra', '', 0.78, '62/80', 4)}${pie(msgT('Ventero'), retratos(3, 0))}${acciones('')}
  <rect width="360" height="760" rx="26" fill="rgba(20,10,5,.55)"/>
  <g transform="translate(14 54)"><rect width="332" height="652" rx="16" fill="#efe2c2" stroke="${O}" stroke-width="2.4"/>
    ${T(18, 34, 20, 'Ventero', { f: 'Bree' })}${T(314, 34, 12, 'Nv 5, poco común ★★', { w: 800, a: 'end', c: '#5a3e28' })}${chip(18, 44, 'Viento')}${T(100, 56, 11.5, 'Tero de Corrientes', { c: '#5a3e28' })}
    <g transform="translate(98 66) scale(.7)">${tero()}</g>
    ${T(18, 222, 13, 'Fuerzas', { f: 'Bree' })}${barraStat(18, 244, 'Vida', 95)}${barraStat(18, 262, 'Ataque', 110)}${barraStat(18, 280, 'Defensa', 95)}
    ${puntos(18, 304, 'Velocidad', 5)}${puntos(18, 322, 'Crítico', 2)}${puntos(18, 340, 'Amague', 2)}
    ${T(18, 370, 13, 'Marcas', { f: 'Bree' })}${ico('enredado', 'Flora', 18, 380, 24)}${T(48, 397, 11.5, 'Inmune a Enredado', { c: '#5a3e28' })}${ico('polvareda', 'Viento', 176, 380, 24)}${T(206, 397, 11.5, 'Resiste Polvareda', { c: '#5a3e28' })}
    ${T(18, 432, 13, 'Contra tu equipo', { f: 'Bree' })}${T(18, 452, 11.5, '▲ Le pegan fuerte: Roca, Rayo, Hielo', { w: 800, c: '#2f7d3b' })}${T(18, 470, 11.5, '▼ Le hacen poco: Tierra, Flora', { w: 800, c: '#8a5a4a' })}${T(18, 488, 11.5, '⚠ Pega fuerte a: Flora, Veneno', { w: 800, c: '#a8322a' })}
    ${T(18, 518, 13, 'Técnicas que le viste', { f: 'Bree' })}${T(18, 538, 11.5, 'Picotazo (Común), Grito del estero (Viento, deja Polvareda)', { c: '#5a3e28' })}${T(18, 556, 11.5, '2 sin ver todavía', { c: '#8a7a6a' })}
    ${T(18, 586, 13, 'Salvaje', { f: 'Bree' })}${T(18, 606, 11.5, 'Temperamento: curioso, paciencia de 6 turnos', { c: '#5a3e28' })}${T(18, 624, 11.5, 'Experiencia si lo vencés: ≈ 66', { c: '#5a3e28' })}
    <g transform="translate(250 612)"><rect width="66" height="26" rx="13" fill="#7a4a2a"/>${T(33, 17, 11.5, 'Volver', { w: 800, a: 'middle', c: '#fbf3e2' })}</g></g>`);

const tel = (cod, nom, dib, txt) => `<figure class="tel"><span class="cod">${cod}</span>${dib}<figcaption><b>${nom}</b><p>${txt}</p></figcaption></figure>`;
const cuerpo = `<div class="como">Respondé con el código y <b>sí</b> o <b>no</b> (y qué cambiar). Cada elemento tiene su zona fija y nada se tapa. Los nombres de técnicas y los retratos con inicial son provisorios.</div>
<section><div class="tres">
${tel('C1', 'Turno', c1, 'Rival arriba con sus marcas, reloj de paciencia y el botón de libreta. Las técnicas ya no dicen "pot": dicen el daño contra ese rival (≈) con ▲ o ▼ si algo lo sube o lo baja, el costo en rombos, la marca que dejan con su ícono, si le pegan fuerte o poco al rival (▲ ▼) y un (?) para leer qué hacen.')}
${tel('C2', 'Reacción', c2, 'Sin cartel grande: destello y temblor sobre el rival, el daño junto a él y la reacción con su ícono en la barra de mensajes. La marca nueva aparece en su lugar.')}
${tel('C3', 'Rendido y boleadora', c3, 'Al tocar Boleadora, la pantalla se oscurece y queda solo el bicho en un círculo. Las bolas giran y se cierran: la línea blanca punteada es el blanco y la franja verde la zona buena. Abajo, qué tiro es cada zona y la chance. La velocidad del aro depende del bicho.')}
${tel('C4', 'Ayuda de una técnica (?)', c4, 'Explica en criollo qué hace, cuánto daño tiene, cuánto aguante cuesta, si le sirve contra el rival que tenés adelante, qué marca deja y con qué explota.')}
${tel('C7', 'Vista previa del daño', c7, 'Cada técnica dice el daño que le haría al rival que tenés adelante, con todo sumado: Ataque, Defensa, tipo, clima, lugar y marcas. La flecha ▲ avisa que algo lo favorece y la ▼ que algo lo baja (por ejemplo, el rival resiste ese tipo); el (?) dice qué. Al tocarla, el pedazo de vida que le sacaría titila en la barra del rival; se confirma tocando de nuevo. Ya no hay botón de objetos: en combate no se usan.')}
${tel('C5', 'Libreta del rival', c5, 'Se abre con el ícono de libreta, antes de pelear o durante el combate. Muestra lo que sabés del bicho: fuerzas, ritmo, inmunidad y resistencia, contra qué es débil, a qué le pega fuerte, técnicas vistas, temperamento, paciencia y experiencia. Si nunca lo atrapaste, lo que no viste aparece como "sin ver".')}
</div></section>`;
const css = `@keyframes titila{0%,100%{opacity:1}50%{opacity:.25}}.titila{animation:titila .8s infinite}.tres{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.tel{margin:0;position:relative}.tel svg{width:100%;height:auto;border-radius:22px;box-shadow:0 8px 22px rgba(0,0,0,.25)}.tel .cod{position:absolute;top:-10px;left:-6px;z-index:2}.tel figcaption b{font-family:Bree,serif;font-size:17px}.tel p{font-size:13px;color:#5a4636;margin:4px 0 0}
@keyframes late{0%,100%{opacity:1}50%{opacity:.45}}@keyframes temblor{0%,100%{transform:translate(0,0)}25%{transform:translate(-3px,1px)}75%{transform:translate(3px,-1px)}}@keyframes destello{0%,100%{opacity:0}10%,35%{opacity:1}}@keyframes halo{0%,100%{opacity:.5}50%{opacity:1}}@keyframes aro{0%{transform:scale(1.2)}100%{transform:scale(.55)}}
.late{animation:late 1s ease-in-out infinite}.temblor{animation:temblor .25s linear infinite;transform-box:view-box}.destello{animation:destello 1.6s ease-out infinite}.halo{animation:halo 1.2s ease-in-out infinite}.aro{animation:aro 1.3s linear infinite;transform-box:fill-box;transform-origin:center}.giro{animation:giro 1s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes giro{to{transform:rotate(360deg)}}
@media (max-width:760px){.tres{grid-template-columns:1fr}}`;
writeFileSync(new URL('./catalogo-27.html', import.meta.url), pagina('Catálogo para aprobar, lote 13', 'Pantalla de combate en el celular', cuerpo, css));
console.log('ok');
