// El mapa: una pantalla por zona (lotes 18c, 19c y 20c), HUD H1, gente, negocios, bichos sueltos, tiempo y clima.
// Se camina tocando el destino o con flechas y WASD; Enter o Espacio tocan lo que está adelante; Esc abre el Menú.
import { h, en } from '../ui.js';
import { MAPAS } from '../arte/mapas.js';
import { PERSONAS } from '../arte/personas.js';
import { GENTE as ADULTOS } from '../arte/gente.js';
import { EDIFICIOS } from '../arte/edificios.js';
import { PILCHAS, MOM, CLI, MONEDA, FOGON, FOGON_APAGADO } from '../arte/ui-arte.js';
import * as A from '../arte/combate-arte.js';
import { CLIMA_MAPA } from '../arte/fondos.js';
import { ZONAS, GENTE, PROVINCIAS, NEGOCIOS, EXTRA, RUTA9, SALUDOS, ATIENDE, trato } from '../datos/mundo.js';
import { FAMILIAS, CARACTER } from '../datos/familias.js';
import { CHANGUEROS } from '../datos/changas.js';
import { momento, dia, climaDe, climaZona, enSuMomento, delEquipo, NOMBRE_MOMENTO } from '../nucleo/progreso.js';
import { actualizarOferta, fogonPrendido } from '../nucleo/changas.js';
import { Rng } from '../nucleo/rng.js';
import { dialogo, avisoMapa } from './dialogo.js';
import { cargarBichos, arteBicho, pelearSalvaje, puedeDesafiar } from './pelea.js';
import { hablarCon, entrarA } from './gente.js';
import { musica, sonar } from './sonido.js';

const T = A.T, O = A.O;
const ESC = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LIM = { x0: 12, x1: 348, y0: 100, y1: 664 };
const CEL = 8;
const VEL = 96; // px por segundo
const PERSONA_S = 0.3; // gente a escala 0,3 (36 por 65)
const mil = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Lo que queda de la zona al ir a pelear y volver (bichos sueltos y domadores que ya te vieron).
let memoria = { clave: null, salvajes: [], vistos: new Set(), hasta: 0 };

export function mapa(app) {
  const P = app.partida;
  const prov = P.pos.prov, zonaId = P.pos.zona;
  const Z = ZONAS[prov][zonaId];
  const M = MAPAS[prov][Z.fondo || zonaId];
  const clave = `${prov}:${zonaId}`;
  P.visitadas[clave] = true;
  const rng = new Rng((Date.now() ^ (P.reloj * 997)) & 0x7fffffff);

  // ---------- escena ----------
  const p = h('section', { class: 'pantalla mapa' });
  const fondo = h('div', { class: 'fondo' });
  const capaCosas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  capaCosas.setAttribute('viewBox', '0 0 360 760'); capaCosas.setAttribute('class', 'fondo-svg cosas');
  const capaClima = h('div', { class: 'fondo clima' });
  const capaSuelo = h('div', { class: 'fondo clima' });
  const hud = h('div', { class: 'fondo hud' });
  const toques = h('div', { class: 'toques-mapa' });
  p.append(fondo, capaSuelo, capaCosas, capaClima, hud, toques);

  const extra = (EXTRA[clave] || []);
  const edificios = [...M.cosas.filter((c) => c.que === 'edificio'), ...extra].map((e) => ({ ...e, negocio: NEGOCIOS[`${clave}:${e.quien}`] || NEGOCIOS[e.quien] || null }));
  const extraSvg = extra.map((e) => `<g transform="translate(${e.x} ${e.y}) scale(${e.s})">${EDIFICIOS[e.quien] || ''}</g>`).join('');
  fondo.innerHTML = `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${M.svg}${extraSvg}${Z.oscuro ? '<rect width="360" height="760" fill="#0c1a10" opacity=".38"/>' : ''}</svg>`;

  // gente de la zona (posición de los lotes aprobados cuando el dibujo está ahí)
  const gente = (GENTE[prov][zonaId] || []).map((g) => {
    const c = M.cosas.find((k) => k.que === 'gente' && k.quien === g.dibujo);
    return { ...g, x: c ? c.x : g.x, y: c ? c.y : g.y, flip: c ? c.flip : !!g.flip };
  });
  const pies = (g) => [g.x + 18, g.y + 64];

  // ---------- obstáculos y camino ----------
  const cols = Math.ceil(360 / CEL), filas = Math.ceil(760 / CEL);
  const bloq = new Uint8Array(cols * filas);
  const marcar = (x0, y0, x1, y1) => { for (let cy = Math.max(0, Math.floor(y0 / CEL)); cy <= Math.min(filas - 1, Math.floor(y1 / CEL)); cy++) for (let cx = Math.max(0, Math.floor(x0 / CEL)); cx <= Math.min(cols - 1, Math.floor(x1 / CEL)); cx++) bloq[cy * cols + cx] = 1; };
  for (const e of edificios) if (e.caja) { const [x, y, w, hh] = e.caja; marcar(x - 4, y - 2, x + w + 4, y + hh + 6); }
  for (const g of gente) { const [fx, fy] = pies(g); marcar(fx - 32, fy - 58, fx + 32, fy + 60); if (g.fogon) marcar(g.fogon[0] - 24, g.fogon[1] - 10, g.fogon[0] + 24, g.fogon[1] + 62); }
  const libre = (x, y) => x >= LIM.x0 && x <= LIM.x1 && y >= LIM.y0 && y <= LIM.y1 && !bloq[Math.floor(y / CEL) * cols + Math.floor(x / CEL)];
  function masCercaLibre(x, y) {
    if (libre(x, y)) return [x, y];
    for (let r = CEL; r < 300; r += CEL) for (let a = 0; a < 16; a++) { const nx = x + Math.cos(a * Math.PI / 8) * r, ny = y + Math.sin(a * Math.PI / 8) * r; if (libre(nx, ny)) return [nx, ny]; }
    return [180, 400];
  }
  function camino(x0, y0, x1, y1) {
    const c0 = [Math.floor(x0 / CEL), Math.floor(y0 / CEL)]; let c1 = [Math.floor(x1 / CEL), Math.floor(y1 / CEL)];
    if (!libre(x1, y1)) { const [a, b] = masCercaLibre(x1, y1); c1 = [Math.floor(a / CEL), Math.floor(b / CEL)]; }
    const idx = (c) => c[1] * cols + c[0];
    const ok = (cx, cy) => { const x = cx * CEL + CEL / 2, y = cy * CEL + CEL / 2; return libre(x, y); };
    const abiertos = [[...c0, 0]]; const g = new Map([[idx(c0), 0]]); const de = new Map();
    const hcost = (c) => Math.hypot(c[0] - c1[0], c[1] - c1[1]);
    let n = 0;
    while (abiertos.length && n++ < 6000) {
      abiertos.sort((a, b) => (a[2]) - (b[2]));
      const [cx, cy] = abiertos.shift();
      if (cx === c1[0] && cy === c1[1]) break;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const nx = cx + dx, ny = cy + dy; if (!ok(nx, ny)) continue;
        if (dx && dy && (!ok(cx + dx, cy) || !ok(cx, cy + dy))) continue;
        const k = ny * cols + nx, ng = g.get(cy * cols + cx) + Math.hypot(dx, dy);
        if (ng < (g.get(k) ?? Infinity)) { g.set(k, ng); de.set(k, cy * cols + cx); abiertos.push([nx, ny, ng + hcost([nx, ny])]); }
      }
    }
    let k = idx(c1); if (!de.has(k) && k !== idx(c0)) return null;
    const pts = []; while (k !== undefined && k !== idx(c0)) { pts.push([(k % cols) * CEL + CEL / 2, Math.floor(k / cols) * CEL + CEL / 2]); k = de.get(k); }
    return pts.reverse();
  }

  // ---------- jugador ----------
  const jug = { x: 0, y: 0, ruta: [], mira: 1, paso: 0, objetivo: null };
  (function ubicar() {
    if (P.pos.enPosta || P.pos.enTerminal || P.pos.x == null) {
      const posta = P.pos.enTerminal ? edificios.find((e) => e.negocio === 'terminal') : (edificios.find((e) => e.negocio === 'posta') || edificios.find((e) => e.negocio === 'rancho'));
      if ((P.pos.enPosta || P.pos.enTerminal) && posta) { const [x, y, w, hh] = posta.caja; [jug.x, jug.y] = masCercaLibre(x + w / 2, y + hh + 16); }
      else { const c = M.cosas.find((k) => k.que === 'jugador'); [jug.x, jug.y] = masCercaLibre(c ? c.x + 18 : 180, c ? c.y + 64 : 450); }
      delete P.pos.enPosta; delete P.pos.enTerminal;
    } else [jug.x, jug.y] = masCercaLibre(P.pos.x, P.pos.y);
    P.pos.x = jug.x; P.pos.y = jug.y;
  })();

  // ---------- bichos sueltos ----------
  const reciente = memoria.clave === clave && Date.now() < memoria.hasta;
  let salvajes = reciente ? memoria.salvajes.filter((s) => !s.fuera) : [];
  const vistos = reciente ? memoria.vistos : new Set();
  // hábitat: el color del suelo donde los lotes aprobados pusieron a cada bicho
  let pix = null;
  (async function muestrearSuelo() {
    try {
      const img = new Image(); const svgTxt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 760" width="90" height="190">${M.svg}</svg>`;
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgTxt)}`;
      await img.decode();
      const c = document.createElement('canvas'); c.width = 90; c.height = 190; const x = c.getContext('2d'); x.drawImage(img, 0, 0, 90, 190);
      pix = x.getImageData(0, 0, 90, 190).data;
    } catch { pix = null; }
  })();
  const colorEn = (x, y) => { if (!pix) return null; const i = (Math.max(0, Math.min(189, Math.floor(y / 4))) * 90 + Math.max(0, Math.min(89, Math.floor(x / 4)))) * 4; return [pix[i], pix[i + 1], pix[i + 2]]; };
  const parecido = (a, b) => a && b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < 60;
  const azul = (c) => c && c[2] > 110 && c[2] > c[0] + 25 && c[2] >= c[1] - 6;
  const sinTilde = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const lugarCatalogo = (fam) => M.cosas.find((k) => k.que === 'bicho' && k.quien && sinTilde(k.quien) === sinTilde(fam));
  const pieDe = (c) => [c.x + 100 * (c.s || 0.42), c.y + 180 * (c.s || 0.42)];
  const refAgua = () => M.cosas.filter((k) => k.que === 'bicho' && FAMILIAS[Object.keys(FAMILIAS).find((f) => sinTilde(f) === sinTilde(k.quien || ''))]?.tipo === 'Agua').map((k) => colorEn(...pieDe(k)));
  function climaAhora() { return Z.interior ? null : climaZona(climaDe(P.semilla, prov, dia(P.reloj), momento(P.reloj)), Z); }
  function candidatos() {
    const mom = momento(P.reloj), cli = climaAhora();
    return Z.bichos.filter((b) => {
      if (P.ausentes[`${clave}:${b.familia}`] > P.reloj) return false;
      if (b.inicial && P.inicial === b.familia) return false;
      if (b.rareza === 'mito') { if (P.libreta.atrapados[b.familia]) return false; return enSuMomento(b.momento, mom) && (!b.clima || b.clima === cli); }
      const conO = b.o && b.o === cli; // con su clima sale siempre
      if (!conO && !enSuMomento(b.momento, mom)) return false;
      if (b.clima && b.clima !== cli) return false;
      return true;
    });
  }
  // nada superpuesto: la caja del bicho no pisa gente, fogones, edificios ni otros bichos
  function choca(x, y, lado, yo = null) {
    const a = [x + lado * 0.12, y + lado * 0.15, x + lado * 0.88, y + lado * 0.95];
    const pisa = (b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
    for (const g of gente) { if (pisa([g.x - 4, g.y - 2, g.x + 40, g.y + 68])) return true; if (g.fogon && pisa([g.fogon[0] - 16, g.fogon[1] - 22, g.fogon[0] + 16, g.fogon[1] + 8])) return true; }
    for (const e of edificios) if (e.caja && pisa([e.caja[0], e.caja[1], e.caja[0] + e.caja[2], e.caja[1] + e.caja[3]])) return true;
    for (const o of salvajes) { if (o === yo) continue; const l = 200 * o.s; if (pisa([o.x + l * 0.12, o.y + l * 0.15, o.x + l * 0.88, o.y + l * 0.95])) return true; }
    return false;
  }
  function lugarPara(fam, s) {
    const F = FAMILIAS[fam]; const lado = 200 * s;
    const c = lugarCatalogo(fam);
    const ref = c ? colorEn(...pieDe(c)) : null;
    const aguas = refAgua();
    const esAgua = (col) => azul(col) || aguas.some((r) => parecido(col, r));
    for (let t = 0; t < 80; t++) {
      let x, y;
      if (c && (t < 10 || !pix)) { x = c.x + (rng.sig() - 0.5) * 70; y = c.y + (rng.sig() - 0.5) * 70; }
      else { x = LIM.x0 + rng.sig() * (LIM.x1 - LIM.x0 - lado); y = 76 - lado * 0.15 + rng.sig() * (LIM.y1 - lado * 0.9 - 76); }
      y = Math.max(76 - lado * 0.15, Math.min(LIM.y1 - lado * 0.9, y));
      const fx = x + lado / 2, fy = y + lado * 0.9;
      if (!libre(fx, fy) && F.tipo !== 'Agua') continue;
      if (Math.hypot(fx - jug.x, fy - jug.y) < 170) continue;
      if (choca(x, y, lado)) continue;
      const col = colorEn(fx, fy - lado * 0.2);
      if (pix && t < 70) {
        if (ref && !parecido(col, ref)) continue;
        if (!ref && F.tipo === 'Agua' && !esAgua(col)) continue;
        if (!ref && F.tipo !== 'Agua' && esAgua(col)) continue;
      }
      return [x, y];
    }
    return null;
  }
  function aparecer() {
    if (P.olor?.tipo === 'palosanto' && P.olor.hasta > P.reloj) return;
    const tope = P.olor?.tipo === 'miel' && P.olor.hasta > P.reloj ? 8 : 5;
    if (salvajes.length >= tope) return;
    const C = candidatos(); if (!C.length) return;
    const peso = { comun: 6, 'poco comun': 3, raro: 1, mito: 50 };
    const cuenta = (f) => salvajes.filter((s) => s.familia === f).length;
    const lista = C.filter((b) => (b.rareza === 'comun' ? cuenta(b.familia) < 3 : b.rareza === 'poco comun' ? cuenta(b.familia) < 2 : cuenta(b.familia) < 1) && !(b.rareza === 'raro' && salvajes.some((s) => s.rareza === 'raro')));
    if (!lista.length) return;
    const tot = lista.reduce((a, b) => a + peso[b.rareza], 0); let x = rng.sig() * tot; let elegido = lista[0];
    for (const b of lista) { x -= peso[b.rareza]; if (x <= 0) { elegido = b; break; } }
    if (elegido.rareza === 'raro' && rng.sig() < 0.6) return; // los raros cuestan más
    const F = FAMILIAS[elegido.familia];
    const nivel = elegido.nivel || (Z.nivel[0] + Math.floor(rng.sig() * (Z.nivel[1] - Z.nivel[0] + 1)));
    const camino = nivel >= 4 && !F.mito ? 1 + Math.floor(rng.sig() * 2) : 0;
    const s = elegido.rareza === 'mito' ? 0.5 : 0.42;
    const pos = lugarPara(elegido.familia, s); if (!pos) return;
    const col = colorEn(pos[0] + 100 * s, pos[1] + 180 * s - 40 * s);
    salvajes.push({ col, id: rng.sig(), familia: elegido.familia, rareza: elegido.rareza, caracter: F.mito ? 'mito' : (CARACTER[elegido.familia] || 'curioso'), nivel, camino, x: pos[0], y: pos[1], s, flip: rng.sig() < 0.5, t: 0, nuevo: true });
    dibujarCosas();
  }

  // ---------- dibujo de las cosas (gente, fogones, bichos y el jugador), ordenadas por los pies ----------
  const nodos = new Map();
  function nodo(id, svg) {
    let g = nodos.get(id);
    if (!g) { g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.innerHTML = svg; nodos.set(id, g); }
    return g;
  }
  function cosas() {
    const L = [];
    for (const g of gente) {
      const dib = PERSONAS[g.dibujo] || ADULTOS[g.dibujo] || '';
      L.push({ id: `g:${g.id}`, y: g.y + 64, svg: `<g transform="translate(${g.x} ${g.y}) scale(${g.flip ? -PERSONA_S : PERSONA_S} ${PERSONA_S})${g.flip ? ' translate(-120 0)' : ''}">${dib}</g>` });
      if (g.fogon && g.tipo === 'changuero') { const pr = fogonPrendido(P, g.id); L.push({ id: `f:${g.id}:${pr}`, y: g.fogon[1] + 4, svg: `<g transform="translate(${g.fogon[0]} ${g.fogon[1]})">${pr ? FOGON : FOGON_APAGADO}</g>` }); }
    }
    for (const s of salvajes) {
      const nom = s.camino ? FAMILIAS[s.familia].caminos[s.camino - 1] : s.familia;
      L.push({ id: `b:${s.id}`, y: s.y + 200 * s.s * 0.9, mov: s, svg: `<g class="flip">${`<g transform="scale(${s.s})">${arteBicho(nom)}</g>`}</g>` });
    }
    L.push({ id: 'jug', y: jug.y, mov: jug, svg: `<g class="flip"><g class="anda"><g transform="scale(${PERSONA_S})">${(PILCHAS[P.pilcha] || PILCHAS.P1)[P.avatar]}</g></g></g>` });
    return L;
  }
  function dibujarCosas() {
    const L = cosas().sort((a, b) => a.y - b.y);
    const usados = new Set(L.map((c) => c.id));
    for (const [id, g] of nodos) if (!usados.has(id)) { g.remove(); nodos.delete(id); }
    for (const c of L) { const g = nodo(c.id, c.svg); c.g = g; capaCosas.append(g); }
    ubicarMoviles(L);
  }
  function ubicarMoviles(L = null) {
    const j = nodos.get('jug');
    if (j) { const bob = jug.ruta.length || jug.tecla ? Math.abs(Math.sin(jug.paso * 9)) * 2 : 0; j.setAttribute('transform', `translate(${jug.x - 18} ${jug.y - 64 - bob})`); j.firstChild.setAttribute('transform', jug.mira < 0 ? 'scale(-1 1) translate(-36 0)' : ''); }
    for (const s of salvajes) { const g = nodos.get(`b:${s.id}`); if (!g) continue; const lado = 200 * s.s; g.setAttribute('transform', `translate(${s.x} ${s.y})`); g.firstChild.setAttribute('transform', s.flip ? `scale(-1 1) translate(${-lado} 0)` : ''); }
    void L;
  }

  // ---------- clima y noche ----------
  let climaVisto = null, momVisto = null;
  function pintarClima() {
    const c = climaAhora(), m = momento(P.reloj);
    if (c === climaVisto && m === momVisto) return;
    if (climaVisto && c !== climaVisto) { if (c === 'lluvia') avisoMapa(p, 'Empezó a llover.'); if (c === 'nieve') avisoMapa(p, 'Está nevando en la Puna.'); }
    climaVisto = c; momVisto = m;
    let s = '';
    if (m === 'noche') s += '<rect width="360" height="760" fill="#0a1430" opacity=".36"/>';
    if (m === 'tarde') s += '<rect width="360" height="760" fill="#f2a03a" opacity=".07"/>';
    if (c && CLIMA_MAPA[c]) s += CLIMA_MAPA[c];
    // charcos y manchas de nieve del lote 15a, sin pisar edificios ni gente
    const sobreAlgo = (x, y, r) => edificios.some((e) => e.caja && x + r > e.caja[0] && x - r < e.caja[0] + e.caja[2] && y + 8 > e.caja[1] && y - 8 < e.caja[1] + e.caja[3]) || gente.some((g) => Math.abs(g.x + 18 - x) < r + 18 && Math.abs(g.y + 64 - y) < 14);
    let suelo = '';
    if (c === 'lluvia') suelo = `<g fill="#8ab4c8" opacity=".75" stroke="#6a94a8" stroke-width="1.2">${[[120, 470], [210, 430], [70, 560], [260, 360]].filter(([x, y]) => !sobreAlgo(x, y, 18)).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="6"/>`).join('')}</g>`;
    if (c === 'nieve') suelo = `<g fill="#fff" opacity=".85">${[[190, 250, 40], [140, 330, 30], [120, 660, 32], [40, 610, 26], [320, 430, 26]].filter(([x, y, r]) => !sobreAlgo(x, y, r)).map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.4}"/>`).join('')}</g>`;
    capaSuelo.innerHTML = `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${suelo}</svg>`;
    capaClima.innerHTML = `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${s}</svg>`;
  }

  // ---------- HUD H1 ----------
  const cap = (x, y, w, fill, cont) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="26" rx="13" fill="${fill}" stroke="${O}" stroke-width="2"/><rect x="3" y="3" width="${w - 6}" height="6" rx="3" fill="#fff" opacity=".18"/>${cont}</g>`;
  function pintarHud() {
    const mom = momento(P.reloj), cli = climaAhora() || 'sol';
    const cliK = cli === 'sol' ? 'despejado' : cli;
    const eq = delEquipo(P);
    const equipo = `<g transform="translate(10 680)">${Array.from({ length: 6 }, (_, i) => {
      const b = eq[i]; const f = b ? b.vida : 0;
      const dib = b ? `<clipPath id="eqm${i}"><circle cx="16" cy="16" r="13.6"/></clipPath><g clip-path="url(#eqm${i})"><g transform="translate(1 1) scale(.15)">${arteBicho(b.camino ? FAMILIAS[b.familia].caminos[b.camino - 1] : b.familia)}</g></g>` : '';
      return `<g transform="translate(${i * 37} 0)"><circle cx="16" cy="16" r="15" fill="#efe6d2" stroke="${O}" stroke-width="2"/>${dib}${b && f <= 0 ? '<circle cx="16" cy="16" r="14" fill="#2a1c15" opacity=".45"/>' : ''}<rect x="3" y="33" width="26" height="5" rx="2.5" fill="#3a2a22"/><rect x="4" y="34" width="${24 * f}" height="3" rx="1.5" fill="${f > 0.5 ? '#5fb346' : f > 0.2 ? '#e2b83a' : '#d8402a'}"/></g>`;
    }).join('')}</g>`;
    hud.innerHTML = `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">
      ${cap(8, 10, 60, '#b8382a', `<g transform="translate(10 8)"><path d="M0,1 L12,1 M0,5 L12,5 M0,9 L12,9" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>${T(38, 18, 11.5, 'Menú', { w: 800, a: 'middle', c: '#fff' })}`)}
      ${cap(74, 10, 196, '#3f6e34', T(98, 18, 12, ESC(Z.lugar || Z.nombre), { w: 800, a: 'middle', c: '#fff' }))}
      ${cap(276, 10, 76, '#b8862a', `<g transform="translate(14 13) scale(.7)">${MONEDA}</g>${T(66, 18, 12, mil(P.chirolas), { w: 800, a: 'end', c: '#fff' })}`)}
      ${cap(49, 40, 150, mom === 'noche' ? '#23365a' : '#2f7fb8', `<g transform="translate(8 3)">${MOM[mom]}</g>${T(34, 18, 11.5, `Día ${dia(P.reloj)}, ${NOMBRE_MOMENTO[mom]}`, { w: 800, c: '#fff' })}`)}
      ${Z.interior ? '' : cap(205, 40, 106, '#e7b93a', `${cliK === 'despejado' ? '' : `<g transform="translate(8 3)">${CLI[cliK]}</g>`}${T(cliK === 'despejado' ? 53 : 32, 18, 11, cliK[0].toUpperCase() + cliK.slice(1), { w: 800, a: cliK === 'despejado' ? 'middle' : 'start', c: '#3a2a10' })}`)}
      ${equipo}${minimapa()}</svg>`;
  }
  function minimapa() {
    // las zonas de la provincia como un plano chico, armado por sus salidas
    const zs = ZONAS[prov]; const pos = { [PROVINCIAS[prov].inicio]: [0, 0] }; const cola = [PROVINCIAS[prov].inicio];
    const D = { arriba: [0, -1], abajo: [0, 1], izquierda: [-1, 0], derecha: [1, 0] };
    while (cola.length) { const z = cola.shift(); for (const [lado, dest] of Object.entries(zs[z].salidas)) if (zs[dest] && !pos[dest]) { pos[dest] = [pos[z][0] + D[lado][0], pos[z][1] + D[lado][1]]; cola.push(dest); } }
    const xs = Object.values(pos).map((v) => v[0]), ys = Object.values(pos).map((v) => v[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const k = 13;
    const lineas = Object.entries(pos).flatMap(([z, [x, y]]) => Object.values(zs[z].salidas).filter((d) => pos[d]).map((d) => `<path d="M${(x - cx) * k},${(y - cy) * k} L${(pos[d][0] - cx) * k},${(pos[d][1] - cy) * k}" stroke="#d7b685" stroke-width="5" stroke-linecap="round"/>`)).join('');
    const puntos = Object.entries(pos).map(([z, [x, y]]) => `<circle cx="${(x - cx) * k}" cy="${(y - cy) * k}" r="${z === zonaId ? 5 : 3.4}" fill="${z === zonaId ? '#c8362b' : P.visitadas[`${prov}:${z}`] ? '#7a5a3a' : '#c9b48a'}" stroke="${O}" stroke-width="1.2"/>`).join('');
    return `<g transform="translate(304 700)"><circle r="40" fill="#e9dcc0" stroke="${O}" stroke-width="2.6"/><clipPath id="mcz"><circle r="36"/></clipPath><g clip-path="url(#mcz)"><rect x="-40" y="-40" width="80" height="80" fill="#a8b86a"/>${lineas}${puntos}</g></g>`;
  }

  // ---------- interacción ----------
  let ocupado = false, vivo = true;
  const enEscenario = (e) => { const r = p.getBoundingClientRect(); return [(e.clientX - r.left) * 360 / r.width, (e.clientY - r.top) * 760 / r.height]; };
  function queHay(x, y) {
    if (y < 70 && x < 70) return { menu: true };
    if (y > 672 && x < 236) { const i = Math.floor((x - 10) / 37); return { equipo: i }; }
    if (Math.hypot(x - 304, y - 700) < 42) return { carta: true };
    for (const s of salvajes) { const l = 200 * s.s; if (x > s.x + l * 0.15 && x < s.x + l * 0.85 && y > s.y + l * 0.2 && y < s.y + l * 0.95) return { bicho: s }; }
    for (const g of gente) if (x > g.x - 4 && x < g.x + 40 && y > g.y && y < g.y + 68) return { persona: g };
    for (const e of edificios) if (e.caja) { const [ex, ey, w, hh] = e.caja; if (x > ex && x < ex + w && y > ey && y < ey + hh) return { edificio: e }; }
    return { piso: [x, y] };
  }
  function irA(x, y, objetivo = null) {
    const r = camino(jug.x, jug.y, x, y);
    if (!r) { jug.ruta = []; return; }
    jug.ruta = r; jug.objetivo = objetivo;
  }
  toques.addEventListener('pointerdown', (e) => {
    if (ocupado) return;
    const [x, y] = enEscenario(e); const q = queHay(x, y);
    if (q.menu) return abrirMenu();
    if (q.equipo !== undefined) return app.ir('bichos');
    if (q.carta) return app.ir('carta');
    if (q.bicho) return irA(q.bicho.x + 100 * q.bicho.s, q.bicho.y + 180 * q.bicho.s, { bicho: q.bicho });
    if (q.persona) { const [fx, fy] = pies(q.persona); return irA(fx + (jug.x < fx ? -40 : 40), fy, { persona: q.persona }); }
    if (q.edificio) { const [ex, ey, w, hh] = q.edificio.caja; return irA(ex + w / 2, ey + hh + 12, { edificio: q.edificio }); }
    // salir por un borde
    const lado = y < LIM.y0 + 14 ? 'arriba' : y > LIM.y1 - 6 ? 'abajo' : x < LIM.x0 + 14 ? 'izquierda' : x > LIM.x1 - 14 ? 'derecha' : null;
    if (lado && Z.salidas[lado]) return irA(Math.max(LIM.x0, Math.min(LIM.x1, x)), Math.max(LIM.y0, Math.min(LIM.y1, y)), { salida: lado });
    irA(x, y);
  });
  async function llegar(obj) {
    if (obj.bicho) return encuentro(obj.bicho);
    if (obj.persona) return hablar(obj.persona);
    if (obj.edificio) return entrar(obj.edificio);
    if (obj.salida) return salir(obj.salida);
  }
  async function hablar(g) {
    ocupado = true; jug.ruta = []; guardarPos();
    await hablarCon(app, p, g, { prov, zonaId, clave, clima: climaAhora(), reanudar: () => { pintarHud(); dibujarCosas(); } });
    ocupado = false; pintarHud(); dibujarCosas();
  }
  async function entrar(e) {
    if (!e.negocio) return;
    ocupado = true; jug.ruta = []; sonar('puerta');
    guardarPos();
    await entrarA(app, p, e, { prov, zonaId, clave, clima: climaAhora() });
    ocupado = false; pintarHud();
  }
  function guardarPos() { P.pos = { prov, zona: zonaId, x: jug.x, y: jug.y }; memoria = { clave, salvajes, vistos, hasta: Date.now() + 120000 }; }
  async function encuentro(s) {
    if (ocupado || !vivo) return;
    if (!delEquipo(P).some((b) => b.vida > 0)) { ocupado = true; await dialogo(p, { quien: '', dibujo: '', lineas: ['Tus bichos están desmayados. Pasá por la posta.'] }); ocupado = false; return; }
    ocupado = true; jug.ruta = [];
    s.fuera = true; guardarPos(); vivo = false;
    const lugar = Z.lugar || Z.nombre;
    if (s.caracter === 'bravo') await avisoMapa(p, '¡Es bravo! Te encara.', { ms: 700 });
    pelearSalvaje(app, s, { clave, lugar, clima: climaAhora(), prov });
  }
  async function salir(lado) {
    const dest = Z.salidas[lado];
    const herr = Z.rinconArriba && lado === 'arriba' ? Z.rinconArriba : Z.rinconDerecha && lado === 'derecha' ? Z.rinconDerecha : null;
    if (herr && !P.herramientas[herr]) {
      const txt = { machete: 'La maleza no deja pasar.', canoa: 'El canal es muy hondo.', soga: 'El risco es muy alto.' }[herr];
      jug.ruta = []; ocupado = true; await avisoMapa(p, txt); ocupado = false;
      [jug.x, jug.y] = masCercaLibre(jug.x + (lado === 'derecha' ? -30 : 0), jug.y + (lado === 'arriba' ? 30 : 0)); ubicarMoviles(); return;
    }
    let nProv = prov, nZona = dest, entra = { arriba: 'abajo', abajo: 'arriba', izquierda: 'derecha', derecha: 'izquierda' }[lado];
    if (dest === 'ruta9') { [nProv, nZona, entra] = RUTA9[prov]; }
    const x = entra === 'izquierda' ? LIM.x0 + 16 : entra === 'derecha' ? LIM.x1 - 16 : jug.x;
    const y = entra === 'arriba' ? LIM.y0 + 16 : entra === 'abajo' ? LIM.y1 - 16 : jug.y;
    P.pos = { prov: nProv, zona: nZona, x, y };
    if (nProv !== prov) avisar(`Llegaste a ${PROVINCIAS[nProv].nombre}.`);
    vivo = false; memoria = { clave: null, salvajes: [], vistos: new Set(), hasta: 0 };
    app.guardarCallado();
    app.base('mapa');
  }
  function avisar(t) { (app.temporal.avisos ??= []).push(t); }
  function abrirMenu() { if (ocupado) return; guardarPos(); app.ir('menuJuego'); }
  p.alEscape = () => { if (p.teclasDialogo) p.teclasDialogo.Escape?.(); else abrirMenu(); };

  // ---------- teclado ----------
  const teclas = new Set();
  const DIR = { ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0] };
  const kd = (e) => { if (DIR[e.key] && !ocupado && !p.teclasDialogo) { teclas.add(e.key); jug.ruta = []; e.preventDefault(); } };
  const ku = (e) => teclas.delete(e.key);
  addEventListener('keydown', kd); addEventListener('keyup', ku);
  p.teclas = { Enter: () => tocarAdelante(), ' ': () => tocarAdelante() };
  function tocarAdelante() {
    if (ocupado) return;
    const x = jug.x + jug.mira * 26, y = jug.y - 20;
    let mejor = null, d = 60;
    for (const g of gente) { const [fx, fy] = pies(g); const dd = Math.hypot(fx - jug.x, fy - jug.y); if (dd < d) { d = dd; mejor = { persona: g }; } }
    for (const s of salvajes) { const dd = Math.hypot(s.x + 100 * s.s - jug.x, s.y + 180 * s.s - jug.y); if (dd < d) { d = dd; mejor = { bicho: s }; } }
    for (const e of edificios) if (e.caja && e.negocio) { const [ex, ey, w, hh] = e.caja; const dd = Math.hypot(ex + w / 2 - jug.x, ey + hh - jug.y); if (dd < Math.max(d, 50)) { d = dd; mejor = { edificio: e }; } }
    if (mejor) llegar(mejor); void x; void y;
  }

  // ---------- bucle ----------
  let t0 = performance.now(), acumAparece = 0, acumOrden = 0, acumGuardar = 0, diaVisto = dia(P.reloj);
  function paso(t) {
    if (!vivo || !p.isConnected) { removeEventListener('keydown', kd); removeEventListener('keyup', ku); return; }
    const dt = Math.min(0.05, (t - t0) / 1000); t0 = t;
    const quieto = ocupado || !!p.teclasDialogo || document.visibilityState !== 'visible';
    if (!quieto) {
      P.reloj += dt / 60;
      if (dia(P.reloj) !== diaVisto) { diaVisto = dia(P.reloj); for (const id of Object.keys(CHANGUEROS)) actualizarOferta(P, id); dibujarCosas(); }
      moverJugador(dt); moverSalvajes(dt);
      acumAparece += dt; if (acumAparece > (salvajes.length < 2 ? 1.2 : 3.5)) { acumAparece = 0; aparecer(); }
      acumOrden += dt; if (acumOrden > 0.25) { acumOrden = 0; dibujarCosas(); pintarClima(); }
      acumGuardar += dt; if (acumGuardar > 1) { acumGuardar = 0; pintarHud(); }
      domadores();
    }
    ubicarMoviles();
    requestAnimationFrame(paso);
  }
  function moverJugador(dt) {
    let dx = 0, dy = 0;
    for (const k of teclas) { dx += DIR[k][0]; dy += DIR[k][1]; }
    jug.tecla = !!(dx || dy);
    if (dx || dy) {
      const n = Math.hypot(dx, dy); const nx = jug.x + (dx / n) * VEL * dt, ny = jug.y + (dy / n) * VEL * dt;
      if (dx) jug.mira = dx;
      const lado = ny < LIM.y0 ? 'arriba' : ny > LIM.y1 ? 'abajo' : nx < LIM.x0 ? 'izquierda' : nx > LIM.x1 ? 'derecha' : null;
      if (lado && Z.salidas[lado]) { teclas.clear(); return salir(lado); }
      if (libre(nx, ny)) { jug.x = nx; jug.y = ny; } else if (libre(nx, jug.y)) jug.x = nx; else if (libre(jug.x, ny)) jug.y = ny;
      jug.paso += dt; tocarCerca(); return;
    }
    if (!jug.ruta.length) return;
    let queda = VEL * dt;
    while (queda > 0 && jug.ruta.length) {
      const [tx, ty] = jug.ruta[0]; const d = Math.hypot(tx - jug.x, ty - jug.y);
      if (tx !== jug.x) jug.mira = tx > jug.x ? 1 : -1;
      if (d <= queda) { jug.x = tx; jug.y = ty; jug.ruta.shift(); queda -= d; } else { jug.x += (tx - jug.x) / d * queda; jug.y += (ty - jug.y) / d * queda; queda = 0; }
    }
    jug.paso += dt;
    if (tocarCerca()) return;
    if (!jug.ruta.length && jug.objetivo) { const o = jug.objetivo; jug.objetivo = null; llegar(o); }
  }
  function tocarCerca() {
    for (const s of salvajes) { const d = Math.hypot(s.x + 100 * s.s - jug.x, s.y + 180 * s.s - jug.y); if (d < 30) { encuentro(s); return true; } }
    return false;
  }
  function moverSalvajes(dt) {
    for (const s of salvajes) {
      const lado = 200 * s.s, fx = s.x + lado / 2, fy = s.y + lado * 0.9;
      const d = Math.hypot(fx - jug.x, fy - jug.y); s.t += dt;
      let vx = 0, vy = 0, v = 0;
      if (s.caracter === 'timido' && d < 90) { vx = fx - jug.x; vy = fy - jug.y; v = 52; }
      else if (s.caracter === 'curioso' && d < 170 && d > 52) { vx = jug.x - fx; vy = jug.y - fy; v = 26; }
      else if (s.caracter === 'bravo' && d < 120 && s.t > 2) { vx = jug.x - fx; vy = jug.y - fy; v = 70; }
      else if (s.caracter !== 'mito') { vx = Math.cos(s.t * 0.7 + s.id * 9); vy = Math.sin(s.t * 0.5 + s.id * 5); v = 7; }
      if (!v) continue;
      const n = Math.hypot(vx, vy) || 1; const nx = s.x + vx / n * v * dt, ny = s.y + vy / n * v * dt;
      const mismoSuelo = !s.col || parecido(colorEn(nx + lado / 2, ny + lado * 0.9 - lado * 0.2), s.col);
      if ((libre(nx + lado / 2, ny + lado * 0.9) || FAMILIAS[s.familia].tipo === 'Agua') && mismoSuelo && !choca(nx, ny, lado, s) && ny > 76 - lado * 0.15 && ny + lado * 0.9 < LIM.y1) { s.x = nx; s.y = ny; }
      if (vx) s.flip = vx < 0;
      if (s.caracter === 'bravo' && d < 34) { encuentro(s); return; }
    }
  }
  function domadores() {
    if (ocupado || !puedeDesafiar(P)) return;
    for (const g of gente) {
      if (g.tipo !== 'domador' || vistos.has(g.id) || P.rivales[g.id]?.vencido) continue;
      const [fx, fy] = pies(g);
      if (Math.hypot(fx - jug.x, fy - jug.y) < 150) { vistos.add(g.id); hablar(g); return; }
    }
  }

  // ---------- arranque ----------
  musica('salta');
  for (const id of Object.keys(CHANGUEROS)) actualizarOferta(P, id);
  cargarBichos().then(() => { if (!salvajes.length) { aparecer(); aparecer(); } dibujarCosas(); pintarHud(); });
  pintarClima(); pintarHud(); dibujarCosas();
  requestAnimationFrame((t) => { t0 = t; requestAnimationFrame(paso); });
  // avisos que quedaron (de un combate o de un viaje) y la derrota
  (async () => {
    const der = app.temporal.derrota; app.temporal.derrota = null;
    const av = app.temporal.avisos || []; app.temporal.avisos = [];
    if (der) {
      ocupado = true;
      const [nom, dib] = ATIENDE[prov].posta;
      await dialogo(p, { quien: nom, dibujo: PERSONAS[dib] || '', lineas: der, detalle: 'No perdiste chirolas.' });
      ocupado = false;
    }
    const charlas = app.temporal.charlas || []; app.temporal.charlas = [];
    if (charlas.length) { ocupado = true; for (const c of charlas) await dialogo(p, { quien: c.quien, dibujo: PERSONAS[c.dibujo] || ADULTOS[c.dibujo] || '', lineas: c.lineas }); ocupado = false; }
    for (const t of av) await avisoMapa(p, t);
  })();
  void SALUDOS; void trato;
  p.__debug = { salvajes: () => salvajes, jug, gente, edificios, P, recargar: () => { vivo = false; app.base('mapa'); } };
  p.foco = toques;
  return p;
}
