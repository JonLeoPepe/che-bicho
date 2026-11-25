// Pantalla de combate (lotes 13 y 23a aprobados): ronda simultánea, cartas que se dan vuelta,
// marcas como caravanas, puño dorado para el reventón, moneda en el empate y reemplazo a la vez.
import { h, en } from '../ui.js';
import * as A from '../arte/combate-arte.js';
import { acciones, activo, ronda, entrar, mejorReemplazo, vivos, danioBase, eficacia, claseVista, REAC, MARCA, Rng } from '../nucleo/combate.js';
import { hacerIA, NIVELES_IA } from '../nucleo/ia.js';
import { TECNICAS, TEC_EFECTO, TEC_MITO, FAMILIAS } from '../datos/familias.js';

const T = A.T;
const ESC = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NOMBRE_REAC = { descarga: 'Descarga', quemazon: 'Quemazón', quebranto: 'Quebranto', helado: 'Helado', atado: 'Atado', lodazal: 'Lodazal', encandilado: 'Encandilado', humareda: 'Humareda', avivado: 'Avivado', nube: 'Nube', corto: 'Cortocircuito', reventon: 'Reventón' };
const NOMBRE_EF = { sueno: 'se durmió', empaque: 'se empacó', furia: 'se enfureció', atado: 'quedó atado', encandilado: 'quedó encandilado', Escarcha: 'quedó con Escarcha' };
const MARCA_K = (m) => m.toLowerCase();

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
 * Arranca un combate. o: { mios: [bichos], rivales: [bichos], rival: {nombre, ia}, clima, alTerminar(resultado) }
 */
export function combate(app, o) {
  const BICHOS = o.arte;
  const rng = new Rng(Date.now() & 0x7fffffff);
  const iaRival = hacerIA(NIVELES_IA[o.rival.ia] || NIVELES_IA.curioso);
  const S = [o.ladoMio, o.ladoRival];
  const mem = [{ hist: [] }, { hist: [] }];
  const vel = { lenta: 1.35, normal: 1, rapida: 0.65 }[app.partida?.opciones?.texto || 'normal'];
  const pausa = (ms) => new Promise((r) => setTimeout(r, ms * vel));
  let nro = 1, estado = 'elegir', sel = null, accRival = null, mensaje = '¡A pelear! Elegí qué hacer.', capas = '', fin = null;

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
  function svg() {
    const yo = activo(S[0]), el = activo(S[1]);
    const cab = `<rect x="12" y="10" width="232" height="28" rx="14" fill="#7a4a2a" stroke="${A.O}" stroke-width="1.6"/>${T(26, 29, 12.5, ESC(o.rival.nombre), { w: 800, c: '#fbf3e2' })}<rect x="252" y="10" width="96" height="28" rx="14" fill="#e2b83a" stroke="${A.O}" stroke-width="1.6"/>${T(300, 29, 12, `Ronda ${nro}`, { w: 800, a: 'middle' })}`;
    const panelRival = `${A.panel(186, 48, 164, 96)}${T(198, 68, 15.5, ESC(el.nombre), { f: 'Bree' })}${T(338, 68, 11.5, `Nv ${el.nivel}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.chip(198, 76, el.tipo)}${A.vida(198, 100, 140, Math.max(0, el.hp) / el.hpmax)}${marcas(el, 198, 112)}`;
    const preview = estado === 'elegir' && sel && sel[0] === 't' ? (() => { const d = estimar(yo, el, yo.tec[sel[1]]); const f0 = Math.max(0, el.hp) / el.hpmax, f1 = Math.max(0, el.hp - d) / el.hpmax; return `<rect class="titila" x="${198 + 140 * f1}" y="100" width="${140 * (f0 - f1)}" height="9" fill="#fff6c0"/>`; })() : '';
    const panelYo = `${A.panel(10, 48, 164, 96)}${T(22, 68, 15.5, ESC(yo.nombre), { f: 'Bree' })}${T(162, 68, 11.5, `Nv ${yo.nivel}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.chip(22, 76, yo.tipo)}${T(162, 89, 11, `${Math.max(0, Math.ceil(yo.hp))}/${Math.ceil(yo.hpmax)}`, { w: 800, a: 'end', c: '#5a3e28' })}${A.vida(22, 100, 140, Math.max(0, yo.hp) / yo.hpmax)}${A.rombos(26, 118, yo.ag, 6, 9, sel && sel[0] === 't' ? Math.min(yo.ag, yo.tec[sel[1]].c + (yo.marca === 'Cargado' && yo.tec[sel[1]].c ? 1 : 0)) : 0)}${marcas(yo, 102, 112)}`;
    const dorso = estado === 'elegir' && accRival ? `<g transform="translate(300 152)" class="late">${A.dorso(0, 0, 34, 46)}</g>` : '';
    const bichos = `${el.hp > 0 ? dib(el, 206, 232, 0.7, false, capas.includes('golpeRival') ? 'temblor' : '') : ''}${yo.hp > 0 ? dib(yo, 168, 236, 0.76, true, capas.includes('golpeYo') ? 'temblor' : '') : ''}`;
    const eq = S[0].eq.map((b, i) => A.retrato(BICHOS[b.nombre] || '', 30 + i * 42, 430, 16, { act: i === S[0].act, caido: b.hp <= 0, freno: b.freno > 0 ? String(b.freno) : 0 })).join('');
    const vivosR = S[1].eq.map((b, i) => `<circle cx="${304 + i * 14}" cy="430" r="5.5" fill="${b.hp > 0 ? '#e07a5a' : '#5a4636'}" stroke="${A.O}" stroke-width="1.2"/>`).join('');
    const pie = A.pie(A.msgT(ESC(mensaje)), `${eq}${T(206, 418, 9.5, 'RELEVO', { w: 800, c: '#f4ead2' })}${A.relevos(214, 430, S[0].rel)}${T(298, 418, 9.5, 'RIVAL', { w: 800, c: '#f4ead2' })}${vivosR}${A.relevos(306, 446, S[1].rel)}`);
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
    const botones = `${A.btn(12, 164, 'Cubrirse', A.icoCubre, { on: sel?.[0] === 'c', off: !puedeC })}${A.btn(184, 164, 'Relevo', A.icoRel, { on: sel?.[0] === 's' || estado === 'relevo', off: !puedeS && estado !== 'relevo' })}`;
    return `<svg viewBox="0 0 360 760" xmlns="http://www.w3.org/2000/svg" class="fondo-svg">${A.fondo}${cab}${bichos}${panelRival}${preview}${panelYo}${dorso}${pie}${tecs}${botones}${capas.replace(/golpe(Yo|Rival)/g, '')}</svg>`;
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
  const zona = (x, y, w, alto, accion, etiqueta) => { const b = en(h('button', { class: 'zona', type: 'button', 'aria-label': etiqueta }), x, y, w, alto); b.addEventListener('click', accion); toques.append(b); };
  function armarToques() {
    toques.innerHTML = '';
    if (estado === 'fin') return;
    if (estado === 'elegir') {
      const A_ = acciones(S[0]);
      activo(S[0]).tec.forEach((tec, i) => { const x = i % 2 ? 184 : 12, y = i < 2 ? 494 : 570; zona(x, y, 164, 70, () => elegir(['t', i]), `Técnica ${nombreTecnica(activo(S[0]), i)}`); });
      zona(12, 700, 164, 46, () => elegir(['c', 0]), 'Cubrirse');
      zona(184, 700, 164, 46, () => { if (A_.some((a) => a[0] === 's')) { estado = 'relevo'; sel = null; mensaje = 'Tocá el bicho que entra.'; dibujar(); armarToques(); } }, 'Relevo');
      if (A_.length === 1 && A_[0][0] === 'n') { setTimeout(() => confirmar(['n', 0]), 600); }
    }
    if (estado === 'relevo' || estado === 'reemplazo') {
      S[0].eq.forEach((b, i) => zona(30 + i * 42 - 18, 412, 36, 36, () => tocarRetrato(i), b.nombre));
      if (estado === 'relevo') zona(184, 700, 164, 46, () => { estado = 'elegir'; mensaje = 'Elegí qué hacer.'; dibujar(); armarToques(); }, 'Cancelar relevo');
    }
    p.teclas = {
      1: () => elegir(['t', 0]), 2: () => elegir(['t', 1]), 3: () => elegir(['t', 2]), 4: () => elegir(['t', 3]),
      c: () => elegir(['c', 0]), C: () => elegir(['c', 0]), Enter: () => sel && confirmar(sel),
    };
  }
  function permitida(x) { return acciones(S[0]).some((a) => a[0] === x[0] && a[1] === x[1]); }
  function elegir(x) {
    if (estado !== 'elegir' || !permitida(x)) return;
    if (sel && sel[0] === x[0] && sel[1] === x[1]) return confirmar(x);
    sel = x;
    mensaje = x[0] === 'c' ? 'Cubrirse: tocá de nuevo para confirmar.' : 'Tocá de nuevo para confirmar.';
    dibujar();
  }
  function tocarRetrato(i) {
    const b = S[0].eq[i];
    if (estado === 'relevo') { if (permitida(['s', i])) confirmar(['s', i]); else { mensaje = b.hp <= 0 ? 'Ese está desmayado.' : i === S[0].act ? 'Ese ya está peleando.' : b.freno > 0 ? `Vuelve en ${b.freno} rondas.` : 'No te quedan Relevos.'; dibujar(); } }
    else if (estado === 'reemplazo') { if (b.hp > 0) { resolverReemplazo(i); } }
  }

  // ---------- la ronda ----------
  function pensarRival() { accRival = iaRival(S, 1, o.clima, rng, mem[1]); }
  async function confirmar(x) {
    estado = 'resolver'; sel = null; armarToques();
    const acts = [x, accRival];
    mem[1].hist.push(claseVista(S, 0, x)); mem[0].hist.push(claseVista(S, 1, accRival));
    // revelado: las dos cartas se dan vuelta
    const carta = (k, a) => {
      const b = activo(S[k]); const titulo = a[0] === 'c' ? 'Cubrirse' : a[0] === 's' ? 'Relevo' : a[0] === 'n' ? 'Dormido' : nombreTecnica(b, a[1]);
      const color = a[0] === 't' ? (b.tec[a[1]].t === 'Neutro' ? '#9a8e7e' : (A.COLOR_TIPO[b.tec[a[1]].t] || '#7a4a2a')) : a[0] === 'c' ? '#c9a86a' : '#2f7d5b';
      return A.carta(k ? 196 : 14, 170, ESC(titulo), k ? 'Rival' : 'Vos', color, '', 'voltea');
    };
    capas = `${carta(0, x)}${carta(1, accRival)}`; mensaje = '¡Se dan vuelta las cartas!'; dibujar();
    await pausa(1300);
    capas = '';
    const ev = [];
    const ko = ronda(S, acts, o.clima, rng, ev);
    // se muestran los eventos de a uno, con el estado final ya calculado (la vida baja en el último cuadro)
    for (const e of ev) {
      const quien = e.lado === 0 ? 'Tu' : 'El rival:';
      if (e.tipo === 'relevo') mensaje = e.lado === 0 ? `Entra ${S[0].eq.find((b) => b.id === e.entra).nombre}.` : `El rival cambia: entra ${S[1].eq.find((b) => b.id === e.entra).nombre}.`;
      else if (e.tipo === 'cubre') mensaje = e.lado === 0 ? 'Te cubrís.' : 'El rival se cubre.';
      else if (e.tipo === 'moneda') { mensaje = 'Misma Velocidad: decide la moneda.'; capas = `<g transform="translate(180 200)"><g class="gira-moneda"><ellipse rx="24" ry="24" fill="#e2b83a" stroke="${A.O}" stroke-width="2.4"/><ellipse rx="18" ry="18" fill="none" stroke="#a87a1a" stroke-width="1.6"/></g></g>`; }
      else if (e.tipo === 'tecnica') {
        const b = activo(S[e.lado]);
        const nom = nombreTecnica(b, e.hueco);
        if (e.amago) mensaje = `${e.lado ? 'El rival' : 'Vos'}: ${nom}. ¡Lo amagó!`;
        else if (e.frenado) { mensaje = `${nom}: ¡Frenado!`; capas = `<g transform="translate(${e.lado ? 90 : 276} 200)"><rect x="-58" y="-18" width="116" height="36" rx="10" fill="#fbf3e2" stroke="${A.O}" stroke-width="2"/>${T(0, 7, 18, '¡Frenado!', { f: 'Bree', a: 'middle', c: '#7a4a2a' })}</g>`; }
        else {
          const partes = [`${nom}: −${Math.round(e.danio || 0)}`];
          if (e.crit) partes.push('¡golpe justo!');
          if (e.reaccion) partes.push(`¡${NOMBRE_REAC[e.reaccion]}!`);
          if (e.combo) partes.push('combo de equipo');
          if (e.marca) partes.push(`queda ${e.marca}`);
          if (e.efecto) partes.push(NOMBRE_EF[e.efecto] || e.efecto);
          mensaje = partes.join('. ') + '.';
          capas = `${e.lado ? 'golpeYo' : 'golpeRival'}${e.reaccion ? `<g transform="translate(${e.lado ? 118 : 300} 196)">${A.revienta(0, 0)}</g>` : ''}<g class="sube">${T(e.lado ? 100 : 290, 210, 22, `−${Math.round(e.danio || 0)}`, { f: 'Bree', a: 'middle', c: '#b3261e' })}</g>`;
        }
      } else if (e.tipo === 'dot') mensaje = `${e.lado ? 'El rival' : 'Tu bicho'} pierde vida por la marca.`;
      else if (e.tipo === 'ko') mensaje = `${e.lado ? 'El rival' : 'Tu'} ${(e.lado ? S[1] : S[0]).eq.find((b) => b.id === e.id).nombre} se desmayó.`;
      dibujar(); await pausa(1100); capas = '';
      void quien;
    }
    nro++;
    const vivos0 = vivos(S[0]).length, vivos1 = vivos(S[1]).length;
    if (!vivos0 || !vivos1 || nro > 80) return terminar(vivos0 && !vivos1 ? 1 : vivos1 && !vivos0 ? 0 : 0.5);
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
    if (!/Entra/.test(mensaje)) mensaje = `${o.rival.nombre.split(',')[0]} ya eligió. Te toca.`;
    dibujar(); armarToques();
  }
  function terminar(r) {
    estado = 'fin'; fin = r;
    mensaje = r === 1 ? '¡Ganaste!' : r === 0 ? 'Tus bichos se desmayaron.' : 'Empate.';
    dibujar(); armarToques();
    const cartel = en(h('div', { class: 'cartel-fin' }, h('h2', {}, r === 1 ? '¡Ganaste!' : r === 0 ? 'Perdiste' : 'Empate'), h('p', {}, r === 1 ? `Le ganaste a ${o.rival.nombre}.` : 'Probá con otra estrategia.'), h('button', { class: 'boton boton-verde boton-medio', type: 'button', onclick: () => o.alTerminar(r) }, 'Seguir')), 30, 180, 300);
    p.append(cartel); cartel.querySelector('button').focus();
  }

  pensarRival(); dibujar(); armarToques();
  p.foco = toques.querySelector('button');
  return p;
}
