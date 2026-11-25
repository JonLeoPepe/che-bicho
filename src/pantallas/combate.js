// Pantalla de combate (lotes 13, 23a y 24a aprobados): ronda simultánea, cartas que se dan vuelta,
// marcas como caravanas, puño dorado para el reventón, moneda en el empate y reemplazo a la vez.
// Contra salvajes (lote 24a): carácter, paciencia (reloj de arena), tiros del bravo y del mito, Boleadora y Rajá.
import { h, en } from '../ui.js';
import * as A from '../arte/combate-arte.js';
import { acciones, activo, ronda, entrar, mejorReemplazo, vivos, danioBase, eficacia, claseVista, velEf, REAC, MARCA, Rng } from '../nucleo/combate.js';
import { hacerIA, NIVELES_IA } from '../nucleo/ia.js';
import { chanceBoleadora, calidadTiro, nuevaPaciencia, gastarPaciencia, chanceRaja } from '../nucleo/captura.js';
import { TECNICAS, TEC_EFECTO, TEC_MITO, FAMILIAS } from '../datos/familias.js';
import { sonar } from '../juego/sonido.js';
import { COMBATE, CLIMA_COMBATE } from '../arte/fondos.js';

const T = A.T;
const ESC = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NOMBRE_REAC = { descarga: 'Descarga', quemazon: 'Quemazón', quebranto: 'Quebranto', helado: 'Helado', atado: 'Atado', lodazal: 'Lodazal', encandilado: 'Encandilado', humareda: 'Humareda', avivado: 'Avivado', nube: 'Nube', corto: 'Cortocircuito', reventon: 'Reventón' };
const NOMBRE_EF = { sueno: 'se durmió', empaque: 'se empacó', furia: 'se enfureció', atado: 'quedó atado', encandilado: 'quedó encandilado', Escarcha: 'quedó con Escarcha' };
const MARCA_K = (m) => m.toLowerCase();
const CARACTER_TXT = { timido: 'Es tímido: raja pronto.', curioso: 'Es curioso.', manso: 'Es manso.', bravo: '¡Es bravo! Te encara.', mito: '' };

/** Nombre de la técnica de un hueco, según la familia y el tipo. */
export function nombreTecnica(b, hueco) {
  const F = FAMILIAS[b.familia], tec = b.tec[hueco];
  if (hueco === 0) return F.liviano;
  if (F.mito) { const M = TEC_MITO[b.familia]; return hueco === 1 ? M.leyenda : hueco === 2 ? (tec.p === 100 ? M.fuerte : M.golpe) : tec.e ? TEC_EFECTO[tec.e] : TECNICAS[tec.t][3]; }
  if (tec.e) return TEC_EFECTO[tec.e];
  const N = TECNICAS[tec.t];
  if (hueco === 1) return N[0];
  if (hueco === 2) return tec.p === 100 ? N[2] : N[1];
  return N[3];
}

/**
 * Arranca un combate.
 * o: { ladoMio, ladoRival, rival: {nombre, ia}, clima, arte, alTerminar(resultado, info),
 *      salvaje: { rareza, caracter, mejoras, lugar } (solo contra bichos sueltos), lugar }
 */
export function combate(app, o) {
  const BICHOS = o.arte;
  let cerrado = false; const alTerminar = o.alTerminar; o = { ...o, alTerminar: (r, i) => { if (!cerrado) { cerrado = true; alTerminar(r, i); } } };
  const rng = new Rng(Date.now() & 0x7fffffff);
  const W = o.salvaje || null;
  const iaRival = hacerIA(NIVELES_IA[o.rival.ia] || NIVELES_IA.curioso);
  const S = [o.ladoMio, o.ladoRival];
  const mem = [{ hist: [] }, { hist: [] }];
  const vel = { lenta: 1.35, normal: 1, rapida: 0.65 }[app.partida?.opciones?.texto || 'normal'];
  const pausa = (ms) => new Promise((r) => setTimeout(r, ms * vel));
  let nro = 1, estado = 'elegir', sel = null, accRival = null, capas = '', ocultoRival = false;
  const info = { kos: [], reventones: 0, reacciones: [], capturado: false, huyo: false, rajo: false, tiros: 0 };
  // contra salvajes
  const pac = W ? nuevaPaciencia(W.caracter) : null;
  let rendidoUsado = false, rendidoTurno = false, furiaDada = false, rajaFallos = 0;
  let mensaje = W ? `¡Un ${activo(S[1]).nombre} salvaje! ${CARACTER_TXT[W.caracter]}`.trim() : `${o.rival.nombre.split(',')[0]} te desafía.`;

  const p = h('section', { class: 'pantalla combate' });
  const lienzo = h('div', { class: 'fondo' });
  const toques = h('div', { class: 'toques' });
  p.append(lienzo, toques);

  // ---------- dibujo ----------
  const dib = (b, x, y, s, espejo, cls = '') => `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${espejo ? -s : s} ${s})">${BICHOS[b.nombre] || ''}</g></g>`;
  const marcas = (b, x, y) => {
    let s = '', i = 0;
    if (b.marca) s += A.tagM(MARCA_K(b.marca), Object.keys(MARCA).find((t) => MARCA[t] === b.marca), x + i++ * 26, y, 22, String(b.mt));
    for (const [k, n] of Object.entries(b.ef)) if (['sueno', 'empaque', 'furia', 'helado', 'atado', 'lodazal', 'encandilado', 'humareda', 'avivado'].includes(k) && A.EFECTOS.some((e) => e[1] === k)) s += A.tagE(k, x + i++ * 26, y, 22, String(n));
    return s;
  };
  const btnEn = (x, y, w, txt, ico, op) => A.btn(x, w, txt, ico, op).replace(`translate(${x} 700)`, `translate(${x} ${y})`);
  function rajaTxt() { const yo = activo(S[0]), el = activo(S[1]); return `${Math.round(chanceRaja(velEf(yo), velEf(el), rajaFallos) * 100)} %`; }
  function svg() {
    const yo = activo(S[0]), el = activo(S[1]);
    const cab = W
      ? `<rect x="12" y="10" width="232" height="28" rx="14" fill="#5f7f32" stroke="${A.O}" stroke-width="1.6"/>${T(26, 29, 12.5, ESC(`Salvaje, ${W.lugar}`), { w: 800, c: '#fff' })}`
      : `<rect x="12" y="10" width="232" height="28" rx="14" fill="#7a4a2a" stroke="${A.O}" stroke-width="1.6"/>${T(26, 29, 12.5, ESC(o.rival.nombre), { w: 800, c: '#fbf3e2' })}`;
    const ronda_ = `<rect x="252" y="10" width="96" height="28" rx="14" fill="#e2b83a" stroke="${A.O}" stroke-width="1.6"/>${T(300, 29, 12, `Ronda ${nro}`, { w: 800, a: 'middle' })}`;
    let derecha = '';
    if (W && W.caracter !== 'bravo' && W.caracter !== 'mito') derecha = A.reloj(298, 114, String(Math.max(0, pac.queda)), { alerta: pac.queda <= 1, s: 0.9 });
    else if (W) derecha = A.tiros(298, 118, 3 - pac.tirosFallados);
    const xNom = W ? 222 : 198;
    const panelRival = `${A.panel(186, 48, 164, 96)}${W ? A.carIco(W.caracter, 196, 52, 0.86) : ''}${T(xNom, 68, 15.5, ESC(el.nombre), { f: 'Bree' })}${T(338, 68, 11.5, `Nv ${el.nivel}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.chip(198, 76, el.tipo)}${A.vida(198, 100, 140, Math.max(0, el.hp) / el.hpmax)}${marcas(el, 198, 112)}${derecha}`;
    const preview = estado === 'elegir' && sel && sel[0] === 't' ? (() => { const d = estimar(yo, el, yo.tec[sel[1]]); const f0 = Math.max(0, el.hp) / el.hpmax, f1 = Math.max(0, el.hp - d) / el.hpmax; return `<rect class="titila" x="${198 + 140 * f1}" y="100" width="${140 * (f0 - f1)}" height="9" fill="#fff6c0"/>`; })() : '';
    const panelYo = `${A.panel(10, 48, 164, 96)}${T(22, 68, 15.5, ESC(yo.apodo || yo.nombre), { f: 'Bree' })}${T(162, 68, 11.5, `Nv ${yo.nivel}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.chip(22, 76, yo.tipo)}${T(162, 89, 11, `${Math.max(0, Math.ceil(yo.hp))}/${Math.ceil(yo.hpmax)}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.vida(22, 100, 140, Math.max(0, yo.hp) / yo.hpmax)}${A.rombos(26, 118, yo.ag, 6, 9, sel && sel[0] === 't' ? yo.tec[sel[1]].c : 0)}${marcas(yo, 22, 132)}`;
    const dorso = estado === 'elegir' && accRival ? `<g transform="translate(300 152)" class="late">${A.dorso(0, 0, 34, 46)}</g>` : '';
    const bichos = `${el.hp > 0 && !ocultoRival ? dib(el, 206, 232, 0.7, false, capas.includes('golpeRival') ? 'temblor' : '') : ''}${yo.hp > 0 ? dib(yo, 168, 236, 0.76, true, capas.includes('golpeYo') ? 'temblor' : '') : ''}`;
    const paso = W ? 32 : 42, x0 = W ? 26 : 30, r = W ? 13 : 16;
    const eq = S[0].eq.map((b, i) => A.retrato(BICHOS[b.nombre] || '', x0 + i * paso, 430, r, { act: i === S[0].act, caido: b.hp <= 0, freno: b.freno > 0 ? String(b.freno) : 0, s: W ? 0.14 : 0.17 })).join('');
    const vivosR = W ? '' : S[1].eq.map((b, i) => `<circle cx="${304 + i * 14}" cy="430" r="5.5" fill="${b.hp > 0 ? '#e07a5a' : '#5a4636'}" stroke="${A.O}" stroke-width="1.2"/>`).join('');
    const pie = A.pie(A.msgT(ESC(mensaje)), W
      ? `${eq}${T(226, 426, 10, 'RELEVO', { w: 800, c: '#f4ead2' })}${A.relevos(234, 438, S[0].rel)}`
      : `${eq}${T(206, 418, 9.5, 'RELEVO', { w: 800, c: '#f4ead2' })}${A.relevos(214, 430, S[0].rel)}${T(298, 418, 9.5, 'RIVAL', { w: 800, c: '#f4ead2' })}${vivosR}${A.relevos(306, 446, S[1].rel)}`);
    const A_ = acciones(S[0]);
    const tecs = yo.tec.map((tec, i) => {
      const x = i % 2 ? 184 : 12, y = i < 2 ? 494 : 570;
      const tipo = tec.t === 'Neutro' ? 'Sin tipo' : tec.t;
      const d = estimar(yo, el, tec);
      const f = flecha(yo, el, tec);
      const rev = tec.p > 0 && el.marca && (REAC[`${el.marca}|${tec.t}`] || (tec.c >= 2 && !tec.e));
      const puede = estado === 'elegir' && A_.some((a) => a[0] === 't' && a[1] === i);
      const g = A.tecnica(x, y, ESC(nombreTecnica(yo, i)), tipo, tec.c, Math.round(d), f, { marca: tec.m ? [MARCA_K(MARCA[tec.t]), tec.t] : null, rev, sel: sel && sel[0] === 't' && sel[1] === i });
      return puede ? g : `<g opacity=".45">${g}</g>`;
    }).join('');
    const puedeC = estado === 'elegir' && A_.some((a) => a[0] === 'c'), puedeS = estado === 'elegir' && A_.some((a) => a[0] === 's');
    const yC = W ? 704 : 700;
    let botones = `${btnEn(12, yC, 164, 'Cubrirse', A.icoCubre, { on: sel?.[0] === 'c', off: !puedeC })}${btnEn(184, yC, 164, 'Relevo', A.icoRel, { on: sel?.[0] === 's' || estado === 'relevo', off: !puedeS && estado !== 'relevo' })}`;
    if (W) botones += `${btnEn(12, 650, 164, 'Boleadora', A.icoBolea, { on: estado === 'tiro', off: estado !== 'elegir' && estado !== 'tiro' })}${btnEn(184, 650, 164, `Rajá ${rajaTxt()}`, A.icoRaja, { on: sel?.[0] === 'r', off: estado !== 'elegir' || !!yo.ef.atado })}`;
    const paisaje = o.fondo && COMBATE[o.fondo] ? `${COMBATE[o.fondo]}${o.momento === 'noche' && !/^[A-Z]/.test(o.fondo) ? CLIMA_COMBATE.noche : ''}${o.clima && CLIMA_COMBATE[o.clima] ? CLIMA_COMBATE[o.clima] : ''}` : '';
    return `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${A.fondo}${paisaje}${cab}${ronda_}${bichos}${panelRival}${preview}${panelYo}${dorso}${pie}${tecs}${botones}${capas.replace(/golpe(Yo|Rival)/g, '')}</svg>`;
  }
  function dibujar() { lienzo.innerHTML = svg(); }

  function estimar(a, d, tec) {
    if (tec.p === 0) return 0;
    let [x, m] = danioBase(a, d, tec, o.clima);
    if (d.marca && tec.p > 0 && !tec.e) { const r = REAC[`${d.marca}|${tec.t}`]; if (r) m *= (['descarga', 'quemazon', 'quebranto'].includes(r) ? 1.6 : 1.2) + (a.rol === 'detonador' ? 0.6 : 0); else if (tec.c >= 2) m *= 1.3 + (a.rol === 'detonador' ? 0.6 : 0); }
    if (d.rol === 'muralla') m *= 0.85;
    return x * Math.min(m, 3);
  }
  function flecha(a, d, tec) {
    if (tec.p === 0 || tec.t === 'Neutro') return '';
    const e = eficacia(tec.t, d.tipo);
    return e > 1 ? '▲' : e < 1 ? '▼' : '';
  }

  // ---------- toques ----------
  const zona = (x, y, w, alto, accion, etiqueta) => { const b = en(h('button', { class: 'zona', type: 'button', 'aria-label': etiqueta }), x, y, w, alto); b.addEventListener('click', accion); toques.append(b); return b; };
  function armarToques() {
    toques.innerHTML = '';
    p.teclas = {};
    if (estado === 'fin' || estado === 'resolver') return;
    const yC = W ? 704 : 700, paso = W ? 32 : 42, x0 = W ? 26 : 30;
    if (estado === 'elegir') {
      const A_ = acciones(S[0]);
      activo(S[0]).tec.forEach((tec, i) => { const x = i % 2 ? 184 : 12, y = i < 2 ? 494 : 570; zona(x, y, 164, 70, () => elegir(['t', i]), `Técnica ${nombreTecnica(activo(S[0]), i)}`); });
      zona(12, yC, 164, 46, () => elegir(['c', 0]), 'Cubrirse');
      zona(184, yC, 164, 46, () => { if (A_.some((a) => a[0] === 's')) { estado = 'relevo'; sel = null; mensaje = 'Tocá el bicho que entra.'; dibujar(); armarToques(); } }, 'Relevo');
      if (W) {
        zona(12, 650, 164, 46, () => tirar(), 'Boleadora');
        zona(184, 650, 164, 46, () => { if (!activo(S[0]).ef.atado) elegir(['r', 0]); }, 'Rajá');
      }
      if (A_.length === 1 && A_[0][0] === 'n') { setTimeout(() => confirmar(['n', 0]), 600); }
      p.teclas = {
        1: () => elegir(['t', 0]), 2: () => elegir(['t', 1]), 3: () => elegir(['t', 2]), 4: () => elegir(['t', 3]),
        c: () => elegir(['c', 0]), C: () => elegir(['c', 0]), b: () => W && tirar(), r: () => W && elegir(['r', 0]), Enter: () => sel && confirmar(sel), ' ': () => sel && confirmar(sel),
      };
    }
    if (estado === 'relevo' || estado === 'reemplazo') {
      S[0].eq.forEach((b, i) => zona(x0 + i * paso - 18, 412, 36, 36, () => tocarRetrato(i), b.nombre));
      if (estado === 'relevo') zona(184, yC, 164, 46, () => { estado = 'elegir'; mensaje = 'Elegí qué hacer.'; dibujar(); armarToques(); }, 'Cancelar relevo');
      S[0].eq.forEach((b, i) => { p.teclas[String(i + 1)] = () => tocarRetrato(i); });
    }
    if (estado === 'tiro') {
      zona(0, 0, 360, 760, () => soltarTiro(), 'Tirar la boleadora');
      p.teclas = { Enter: () => soltarTiro(), ' ': () => soltarTiro(), b: () => soltarTiro() };
    }
  }
  function permitida(x) { return x[0] === 'r' ? !!W && !activo(S[0]).ef.atado : acciones(S[0]).some((a) => a[0] === x[0] && a[1] === x[1]); }
  function elegir(x) {
    if (estado !== 'elegir' || !permitida(x)) return;
    if (sel && sel[0] === x[0] && sel[1] === x[1]) return confirmar(x);
    sel = x;
    mensaje = x[0] === 'c' ? 'Cubrirse: tocá de nuevo para confirmar.' : x[0] === 'r' ? `Rajá: ${rajaTxt()}. Tocá de nuevo para rajar.` : 'Tocá de nuevo para confirmar.';
    dibujar();
  }
  function tocarRetrato(i) {
    const b = S[0].eq[i];
    if (estado === 'relevo') { if (permitida(['s', i])) confirmar(['s', i]); else { mensaje = b.hp <= 0 ? 'Ese está desmayado.' : i === S[0].act ? 'Ese ya está peleando.' : b.freno > 0 ? `Vuelve en ${b.freno} rondas.` : 'No te quedan Relevos.'; dibujar(); } }
    else if (estado === 'reemplazo') { if (b.hp > 0) { resolverReemplazo(i); } }
  }

  // ---------- boleadora (lote 15b y 24a): un aro dorado se achica; se toca cuando coincide con el aro fijo ----------
  let aro = null;
  function tirar() {
    if (estado !== 'elegir' || !W) return;
    estado = 'tiro'; sel = null; mensaje = '¡Ahora! Tocá cuando el aro dorado llegue al otro.'; dibujar(); armarToques();
    const svgEl = lienzo.querySelector('svg');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `<circle cx="276" cy="300" r="24" fill="none" stroke="#fbf3e2" stroke-width="3" stroke-dasharray="5 4"/><circle class="aro" cx="276" cy="300" r="70" fill="none" stroke="#e2b83a" stroke-width="5"/>`;
    svgEl.append(g);
    const c = g.querySelector('.aro'); const t0 = performance.now();
    aro = { r: 70, vivo: true };
    const paso = (t) => { if (!aro?.vivo) return; const f = ((t - t0) % 1150) / 1150; aro.r = 70 - 62 * f; c.setAttribute('r', aro.r.toFixed(1)); requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  }
  async function soltarTiro() {
    if (estado !== 'tiro' || !aro) return;
    aro.vivo = false;
    const d = Math.min(1, Math.abs(aro.r - 24) / 38); aro = null;
    const tiro = calidadTiro(d);
    const el = activo(S[1]);
    const chance = chanceBoleadora({ rareza: W.rareza, vidaFrac: Math.max(0, el.hp) / el.hpmax, tiro, efectos: el.ef, rendido: !!el.rendido, mejoras: W.mejoras || 0 });
    const atrapa = rng.sig() < chance;
    estado = 'resolver'; armarToques(); info.tiros++;
    sonar('boleadora');
    const nombreTiro = { perfecto: '¡Tiro perfecto!', bueno: 'Buen tiro.', flojo: 'Tiro flojo.', malo: 'Tiro malo.' }[tiro];
    // bolas que vuelan y la guayaca que se sacude
    capas = `<g class="vuela-bolas"><g transform="translate(276 300) scale(2.4)">${A.bolea(true)}</g></g>`; mensaje = nombreTiro; dibujar();
    await pausa(700);
    ocultoRival = true;
    capas = `<g transform="translate(276 330)"><g class="sacude">${o.guayaca || ''}</g></g>`; mensaje = nombreTiro; dibujar();
    await pausa(1500);
    if (atrapa) {
      info.capturado = true; sonar('captura');
      capas = `<g transform="translate(276 330)"><g>${o.guayaca || ''}</g></g><g class="sube">${T(276, 270, 22, '¡Atrapado!', { f: 'Bree', a: 'middle', c: '#2f7d5b' })}</g>`; mensaje = '¡Atrapado!'; dibujar();
      await pausa(1200);
      return terminar('capturado');
    }
    ocultoRival = false; capas = ''; mensaje = '¡Se soltó!'; sonar('suelta'); dibujar();
    await pausa(900);
    return resolverRonda(['n', 0], { tiroFallado: true });
  }

  // ---------- la ronda ----------
  function pensarRival() {
    if (W && rendidoTurno) { accRival = ['n', 0]; return; }
    accRival = iaRival(S, 1, o.clima, rng, mem[1]);
  }
  async function confirmar(x) {
    if (x[0] === 'r') {
      estado = 'resolver'; sel = null; armarToques();
      const chance = chanceRaja(velEf(activo(S[0])), velEf(activo(S[1])), rajaFallos);
      if (rng.sig() < chance) { info.rajo = true; mensaje = '¡Rajaste!'; dibujar(); await pausa(900); return terminar('rajo'); }
      rajaFallos++; mensaje = 'No pudiste rajar. El próximo, +20 %.'; dibujar(); await pausa(1100);
      return resolverRonda(['n', 0], {});
    }
    return resolverRonda(x, { relevo: x[0] === 's' });
  }
  async function resolverRonda(x, extra) {
    estado = 'resolver'; sel = null; armarToques();
    const acts = [x, accRival];
    mem[1].hist.push(claseVista(S, 0, x[0] === 'n' ? ['c', 0] : x)); mem[0].hist.push(claseVista(S, 1, accRival));
    if (x[0] !== 'n' || accRival[0] !== 'n') {
      const carta = (k, a) => {
        const b = activo(S[k]); const titulo = a[0] === 'c' ? 'Cubrirse' : a[0] === 's' ? 'Relevo' : a[0] === 'n' ? (k === 0 ? (extra.tiroFallado ? 'Boleadora' : W ? 'Rajá' : 'Dormido') : b.rendido ? 'Rendido' : 'Dormido') : nombreTecnica(b, a[1]);
        const color = a[0] === 't' ? (b.tec[a[1]].t === 'Neutro' ? '#9a8e7e' : (A.COLOR_TIPO[b.tec[a[1]].t] || '#7a4a2a')) : a[0] === 'c' ? '#c9a86a' : '#2f7d5b';
        return A.carta(k ? 196 : 14, 170, ESC(titulo), k ? (W ? 'Salvaje' : 'Rival') : 'Vos', color, '', 'voltea');
      };
      capas = `${carta(0, x)}${carta(1, accRival)}`; mensaje = '¡Se dan vuelta las cartas!'; sonar('carta'); dibujar();
      await pausa(1300);
    }
    capas = '';
    const ev = [];
    const ko = ronda(S, acts, o.clima, rng, ev);
    const el = activo(S[1]);
    if (W && rendidoTurno) { rendidoTurno = false; el.rendido = false; }
    // Rendido: el golpe que lo desmayaría lo deja en 1 de vida (una vez, no los mitos)
    if (W && ko[1] && !rendidoUsado && W.caracter !== 'mito') {
      rendidoUsado = true; rendidoTurno = true; el.hp = 1; el.rendido = true; ko[1] = false;
      const i = ev.findIndex((e) => e.tipo === 'ko' && e.lado === 1); if (i >= 0) ev[i] = { tipo: 'rendido' };
    }
    if (W && W.caracter === 'bravo' && !furiaDada && el.hp > 0 && el.hp < el.hpmax / 2) { furiaDada = true; el.ef.furia = 2; ev.push({ tipo: 'furia' }); }
    for (const e of ev) {
      if (e.tipo === 'relevo') mensaje = e.lado === 0 ? `Entra ${S[0].eq.find((b) => b.id === e.entra).nombre}.` : `El rival cambia: entra ${S[1].eq.find((b) => b.id === e.entra).nombre}.`;
      else if (e.tipo === 'cubre') mensaje = e.lado === 0 ? 'Te cubrís.' : `${W ? activo(S[1]).nombre : 'El rival'} se cubre.`;
      else if (e.tipo === 'moneda') { mensaje = 'Misma Velocidad: decide la moneda.'; capas = `<g transform="translate(180 200)"><g class="gira-moneda"><ellipse rx="24" ry="24" fill="#e2b83a" stroke="${A.O}" stroke-width="2.4"/><ellipse rx="18" ry="18" fill="none" stroke="#a87a1a" stroke-width="1.6"/></g></g>`; }
      else if (e.tipo === 'tecnica') {
        const b = activo(S[e.lado]);
        const nom = nombreTecnica(b, e.hueco);
        if (e.amago) mensaje = `${e.lado ? (W ? b.nombre : 'El rival') : 'Vos'}: ${nom}. ¡Lo amagó!`;
        else if (e.frenado) { mensaje = `${nom}: ¡Frenado!`; capas = `<g transform="translate(${e.lado ? 90 : 276} 200)"><rect x="-58" y="-18" width="116" height="36" rx="10" fill="#fbf3e2" stroke="${A.O}" stroke-width="2"/>${T(0, 7, 18, '¡Frenado!', { f: 'Bree', a: 'middle', c: '#7a4a2a' })}</g>`; }
        else {
          const partes = [`${nom}: −${Math.round(e.danio || 0)}`];
          if (e.crit) partes.push('¡golpe justo!');
          if (e.reaccion) { partes.push(`¡${NOMBRE_REAC[e.reaccion]}!`); if (e.lado === 0) { if (e.reaccion === 'reventon') info.reventones++; else info.reacciones.push(e.reaccion); } }
          if (e.combo) partes.push('combo de equipo');
          if (e.marca) partes.push(`queda ${e.marca}`);
          if (e.efecto) partes.push(NOMBRE_EF[e.efecto] || e.efecto);
          mensaje = partes.join('. ') + '.';
          sonar(e.reaccion ? 'reventon' : e.crit ? 'critico' : 'golpe');
          capas = `${e.lado ? 'golpeYo' : 'golpeRival'}${e.reaccion ? `<g transform="translate(${e.lado ? 118 : 300} 196)">${A.revienta(0, 0)}</g>` : ''}<g class="sube">${T(e.lado ? 100 : 290, 210, 22, `−${Math.round(e.danio || 0)}`, { f: 'Bree', a: 'middle', c: '#b3261e' })}</g>`;
        }
      } else if (e.tipo === 'dot') mensaje = `${e.lado ? activo(S[1]).nombre : 'Tu bicho'} pierde vida por la marca.`;
      else if (e.tipo === 'rendido') { mensaje = '¡Se rindió! ¡Bolealo!'; sonar('rendido'); }
      else if (e.tipo === 'furia') mensaje = `¡${el.nombre} se enfureció!`;
      else if (e.tipo === 'ko') {
        const b = (e.lado ? S[1] : S[0]).eq.find((x2) => x2.id === e.id);
        mensaje = `${b.nombre} se desmayó.`; sonar('desmayo');
        if (e.lado === 1) info.kos.push({ por: activo(S[0]).propio, nivel: b.nivel, familia: b.familia });
      }
      dibujar(); await pausa(1100); capas = '';
    }
    nro++;
    const vivos0 = vivos(S[0]).length, vivos1 = vivos(S[1]).length;
    if (!vivos0 || !vivos1 || nro > 80) return terminar(vivos0 && !vivos1 ? 1 : vivos1 && !vivos0 ? 0 : 0.5);
    // paciencia del salvaje
    if (W) {
      const raja = gastarPaciencia(pac, extra);
      if (raja) { info.huyo = true; mensaje = W.caracter === 'mito' ? `${el.nombre} se fue. Va a volver otro día.` : `${el.nombre} rajó.`; dibujar(); await pausa(1300); return terminar('huyo'); }
      if (pac.queda === 1) mensaje = `${el.nombre} se está poniendo nervioso.`;
    }
    if (ko[1] && !ko[0]) { entrar(S[1], mejorReemplazo(S, 1, o.clima)); mensaje = `Entra ${activo(S[1]).nombre}.`; }
    if (ko[0]) {
      estado = 'reemplazo'; mensaje = 'Elegí quién entra.';
      if (ko[1]) pendienteRival = mejorReemplazo(S, 1, o.clima); // el rival elige a la vez, sin ver el tuyo
      dibujar(); armarToques(); return;
    }
    nuevaRonda();
  }
  let pendienteRival = null;
  function resolverReemplazo(i) {
    entrar(S[0], i);
    if (pendienteRival !== null) { entrar(S[1], pendienteRival); pendienteRival = null; }
    mensaje = `Entra ${activo(S[0]).nombre}. Elegí qué hacer.`;
    nuevaRonda();
  }
  function nuevaRonda() {
    estado = 'elegir'; sel = null; pensarRival();
    if (!/Entra|nervioso|Rendido|rindió/.test(mensaje)) mensaje = W ? 'Te toca.' : `${o.rival.nombre.split(',')[0]} ya eligió. Te toca.`;
    dibujar(); armarToques();
  }
  function terminar(r) {
    estado = 'fin';
    const res = r === 'capturado' || r === 'rajo' || r === 'huyo' ? r : r === 1 ? 'gano' : r === 0 ? 'perdio' : 'empate';
    info.vida = Object.fromEntries(S[0].eq.map((b) => [b.propio, Math.max(0, b.hp) / b.hpmax]));
    info.desmayados = S[0].eq.filter((b) => b.hp <= 0).length;
    info.rival = activo(S[1]); info.activo = activo(S[0]).propio;
    if (res === 'gano') sonar('victoria');
    const titulo = { gano: '¡Ganaste!', perdio: 'Perdiste', empate: 'Empate', capturado: '¡Atrapado!', rajo: '¡Rajaste!', huyo: W?.caracter === 'mito' ? 'Se fue' : 'Rajó' }[res];
    mensaje = res === 'perdio' ? 'Tus 6 bichos se desmayaron.' : titulo;
    dibujar(); armarToques();
    if (res === 'perdio' && W) { setTimeout(() => o.alTerminar(res, info), 900 * vel); return; }
    const sub = { gano: W ? `Venciste a ${info.rival.nombre}.` : `Le ganaste a ${o.rival.nombre}.`, perdio: 'Probá con otra estrategia.', empate: 'Nadie quedó en pie.', capturado: `${info.rival.nombre} va a tu guayaca.`, rajo: 'Te fuiste a tiempo.', huyo: W?.caracter === 'mito' ? `${info.rival.nombre} se fue. Va a volver otro día.` : `${info.rival.nombre} rajó.` }[res];
    const cartel = en(h('div', { class: 'cartel-fin' }, h('h2', {}, titulo), h('p', {}, sub), h('button', { class: 'boton boton-verde boton-medio', type: 'button', onclick: () => o.alTerminar(res, info) }, 'Seguir')), 30, 180, 300);
    p.append(cartel); cartel.querySelector('button').focus();
    p.teclas = { Enter: () => o.alTerminar(res, info) };
  }

  pensarRival(); dibujar(); armarToques();
  p.foco = toques.querySelector('button');
  return p;
}
