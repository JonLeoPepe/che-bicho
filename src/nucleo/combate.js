// Combate v5 (combate-v5 y fichas-especies, aprobados). Núcleo puro: sin navegador, con azar con semilla.
// Es la misma lógica del simulador validado (sim_v5.py con la configuración FINAL), portada a JavaScript.
// Diferencias a propósito con el simulador, para cumplir el diseño escrito:
//  - el rol Veloz gana los empates de Velocidad (como la boina);
//  - el aura Rastreador solo da +10 % de daño a marcados (no suma precisión a los efectos);
//  - Sueño y Encandilado duran hasta la ronda siguiente: en el simulador vencían en la misma ronda
//    y no hacían nada, contra lo que dice el diseño ("pierde su próxima ronda", "su próximo golpe").
import { FAMILIAS } from '../datos/familias.js';
import { Rng } from './rng.js';

export const REGLAS = {
  K: 0.5, agIni: 3, agMax: 6, cub: 0.5, marcaDur: 3, multGolpe: 1.6, multCtrl: 1.2, relevoIni: 2, relevoMax: 2, freno: 2, tope: 3,
  critBase: 0.03, critPt: 0.025, amaPt: 0.03, reventon: 1.3, bonoEquipo: 0.2, dotCh: 0.04, dotAp: 0.04, enredado: 0.85, detBono: 0.6,
  murRed: 0.15, mitoSt: 1.05, afilado: 0.05, guardian: 0.05, precEfecto: 0.85, nivelPct: 0.06, camino: 1.1,
};
const R = REGLAS;

// Tabla de tipos (Veneno ya no es eficaz contra Agua).
const EF = {
  Común: [[], ['Roca']], Fuego: [['Flora', 'Hielo'], ['Fuego', 'Agua', 'Roca']], Agua: [['Fuego', 'Tierra', 'Roca'], ['Agua', 'Flora', 'Hielo']],
  Flora: [['Agua', 'Tierra', 'Roca'], ['Fuego', 'Flora', 'Veneno', 'Viento']], Tierra: [['Rayo', 'Roca'], ['Flora', 'Viento']], Roca: [['Fuego', 'Viento', 'Hielo'], ['Tierra', 'Roca']],
  Viento: [['Flora', 'Veneno'], ['Rayo', 'Roca']], Rayo: [['Agua', 'Viento'], ['Rayo', 'Flora', 'Tierra']], Hielo: [['Tierra', 'Viento'], ['Fuego', 'Hielo']],
  Veneno: [['Flora'], ['Veneno', 'Tierra', 'Viento']], Mito: [['Mito', 'Veneno'], ['Común']],
};
export const eficacia = (a, d) => (a === 'Neutro' ? 1 : EF[a][0].includes(d) ? 2 : EF[a][1].includes(d) ? 0.5 : 1);

export const MARCA = { Agua: 'Mojado', Fuego: 'Chamuscado', Flora: 'Enredado', Tierra: 'Embarrado', Hielo: 'Escarcha', Rayo: 'Cargado', Veneno: 'Apestado', Viento: 'Polvareda' };
export const REAC = {
  'Mojado|Rayo': 'descarga', 'Enredado|Fuego': 'quemazon', 'Escarcha|Roca': 'quebranto', 'Mojado|Hielo': 'helado', 'Enredado|Tierra': 'atado', 'Embarrado|Agua': 'lodazal',
  'Polvareda|Flora': 'encandilado', 'Chamuscado|Veneno': 'humareda', 'Chamuscado|Viento': 'avivado', 'Apestado|Viento': 'nube', 'Cargado|Agua': 'corto',
};
const GOLPE = new Set(['descarga', 'quemazon', 'quebranto']);
const DET = {};
for (const k of Object.keys(REAC)) { const [mk, tp] = k.split('|'); (DET[mk] ??= new Set()).add(tp); }

export const ROLES = { golpeador: [90, 125, 85], marcador: [100, 100, 100], detonador: [95, 115, 90], muralla: [120, 80, 100], veloz: [95, 100, 105], apoyo: [110, 85, 105] };
export const RITMO = { veloz: [5, 2, 2], filoso: [3, 5, 1], escurridizo: [2, 2, 5], parejo: [3, 3, 3] };
const RITMO_MITO = { filoso: [3, 5, 2], escurridizo: [3, 2, 5], parejo: [3, 4, 3] };
export const CLIMAS = ['sol', 'nublado', 'lluvia', 'viento', 'nieve'];
const CLIMA_T = { sol: [['Fuego', 'Roca'], ['Mito', 'Veneno']], nublado: [['Mito', 'Veneno'], ['Fuego', 'Roca']], lluvia: [['Agua', 'Flora', 'Rayo'], ['Viento', 'Tierra']], viento: [['Viento', 'Tierra'], ['Agua', 'Flora', 'Rayo']], nieve: [['Hielo'], ['Fuego']] };
const CLIMA_M = { lluvia: { Mojado: 1, Chamuscado: -1 }, sol: { Mojado: -1, Escarcha: -1 }, nieve: { Escarcha: 1, Mojado: -1 }, viento: { Polvareda: 1, Apestado: -1 }, nublado: { Apestado: 1, Polvareda: -1 } };

// Prendas: efectos sobre las estadísticas al armar el bicho (las de combate se ven en el daño).
const PRENDA_ST = { poncho: { df: 1.1 }, faja: { v: 1.15 }, rastra: { a: 1.1 }, boina: { a: 1.05 }, aguayo: { df: 1.1 }, 'poncho de vicuña': { df: 1.1, v: 1.05 }, 'sombrero de palma': { a: 1.05, vel: 1 } };

let siguienteId = 1;
/**
 * Arma un bicho listo para pelear.
 * @param {string} familia  nombre base de la familia
 * @param {object} o  nivel (1 a 10), camino (0 base, 1 o 2), pasiva, prenda, apodo
 */
export function crearBicho(familia, { nivel = 1, camino = 0, pasiva = null, prenda = null } = {}) {
  const F = FAMILIAS[familia];
  if (!F) throw new Error(`Familia desconocida: ${familia}`);
  let [v, a, d] = ROLES[F.rol];
  let [vel, cri, ama] = F.mito ? RITMO_MITO[F.ritmo] : RITMO[F.ritmo];
  if (F.mito) { v *= R.mitoSt; a *= R.mitoSt; d *= R.mitoSt; }
  const etapa = (camino ? R.camino : 1) * (1 + R.nivelPct * (nivel - 1));
  v *= etapa; a *= etapa; d *= etapa;
  const ps = PRENDA_ST[prenda] || {};
  v *= ps.v || 1; a *= ps.a || 1; d *= ps.df || 1; vel += ps.vel || 0;
  if (pasiva === 'ojovivo') cri += 1;
  if (pasiva === 'gambeta') ama += 1;
  const marca = !!MARCA[F.tipo];
  const tipo = F.tipo;
  const hueco2 = F.mito ? { t: 'Mito', p: 55, c: 1, m: false, e: F.leyenda } : { t: tipo, p: marca ? 45 : (tipo === 'Común' ? 55 : 45), c: 1, m: marca, e: null };
  const hueco3 = camino === 1 ? { t: tipo, p: 100, c: 3, m: false, e: null } : { t: tipo, p: 70, c: 2, m: false, e: null };
  const hueco4 = camino === 2 ? { t: 'Común', p: 30, c: 2, m: false, e: F.efecto } : { t: F.cobertura, p: 60, c: 2, m: false, e: null };
  return {
    id: siguienteId++, familia, nombre: camino ? F.caminos[camino - 1] : F.base, tipo, rol: F.rol, mito: F.mito, nivel, camino,
    hpmax: v * 1.6 + 40, hp: v * 1.6 + 40, atk: a, df: d, vel, cri, ama,
    tec: [{ t: 'Neutro', p: 40, c: 0, m: false, e: null, hueco: 0 }, { ...hueco2, hueco: 1 }, { ...hueco3, hueco: 2 }, { ...hueco4, hueco: 3 }],
    inm: F.inmune, aura: F.rol === 'apoyo' ? F.aura : null, pas: pasiva, prenda,
    ag: R.agIni, marca: null, mt: 0, mpor: null, ef: {}, cubprev: false, freno: 0, recien: true,
  };
}

const clonB = (b) => ({ ...b, ef: { ...b.ef } });
export const clonar = (S) => S.map((L) => ({ ...L, eq: L.eq.map(clonB) }));
const activo = (L) => L.eq[L.act];
export const vivos = (L) => L.eq.map((b, i) => (b.hp > 0 ? i : -1)).filter((i) => i >= 0);
const auras = (L) => { const s = new Set(); for (const b of L.eq) if (b.hp > 0 && b.aura) s.add(b.aura); return s; };

export function velEf(b, conMarca = true) {
  let v = b.vel + (b.pas === 'baqueano' ? 1 : 0);
  if (conMarca && b.marca === 'Mojado') v -= 1;
  if (b.ef.helado) v -= 2;
  return v;
}
const multClima = (clima, t) => { if (!clima || t === 'Común' || t === 'Neutro') return 1; const [f, c] = CLIMA_T[clima]; return f.includes(t) ? 1.1 : c.includes(t) ? 0.9 : 1; };

export function danioBase(at, de, tec, clima) {
  if (tec.p === 0) return [0, 1];
  let mult = (tec.t === at.tipo ? 1.5 : 1) * eficacia(tec.t, de.tipo) * multClima(clima, tec.t);
  const atk = at.atk * (at.marca === 'Enredado' ? R.enredado : 1) * (at.ef.furia ? 1.2 : 1);
  const df = de.df * (de.marca === 'Escarcha' ? 0.9 : 1) * (de.ef.furia ? 0.8 : 1);
  const d = tec.p * atk / df * R.K;
  if (at.rol === 'marcador' && tec.m) mult *= 1.3;
  if (at.pas === 'coraje' && at.hp < at.hpmax / 3) mult *= 1.2;
  if (at.prenda === 'alpargatas' && tec.c === 0) mult *= 1.5;
  if (at.prenda === 'pañuelo' && tec.m) mult *= 1.1;
  if (at.pas === 'rematador' && de.hp < de.hpmax / 2) mult *= 1.15;
  if (at.ef.encandilado) mult *= 0.7;
  if (at.ef.humareda) mult *= 0.85;
  if (at.marca === 'Polvareda') mult *= 0.9;
  return [d, mult];
}

const costo = (b, tec) => tec.c + (b.marca === 'Cargado' && tec.c > 0 ? 1 : 0);
export const puedeCubrirse = (b) => !b.cubprev && !b.ef.lodazal && !b.ef.empaque && !b.ef.furia && b.marca !== 'Embarrado';
export const puedeRelevo = (L) => { const b = activo(L); return !b.ef.atado && !b.ef.empaque && L.rel > 0; };

/** Acciones posibles: ['t', hueco], ['c'], ['s', índice], o ['n'] si está dormido. */
export function acciones(L) {
  const b = activo(L);
  if (b.ef.sueno) return [['n', 0]];
  const A = [];
  b.tec.forEach((tec, i) => { if (b.ag >= costo(b, tec)) A.push(['t', i]); });
  if (puedeCubrirse(b)) A.push(['c', 0]);
  if (puedeRelevo(L)) for (const j of vivos(L)) if (j !== L.act && L.eq[j].freno <= 0) A.push(['s', j]);
  return A;
}

function ponerMarca(de, mk, por, clima, Lat) {
  if (de.inm === mk || de.prenda === 'chiripá') return false;
  let d = R.marcaDur + (por.prenda === 'pañuelo' ? 1 : 0) + (auras(Lat).has('pialador') ? 1 : 0);
  if (clima && CLIMA_M[clima]) d += CLIMA_M[clima][mk] || 0;
  de.marca = mk; de.mt = Math.max(1, d); de.mpor = por.id;
  return true;
}

/**
 * Resuelve una ronda simultánea. S = [lado0, lado1]; acts = [acción0, acción1].
 * ev (opcional) recibe los eventos para animar la pantalla. forzar fija quién gana un empate (para la IA).
 * Devuelve [desmayó0, desmayó1].
 */
export function ronda(S, acts, clima, rng, ev = null, forzar = null) {
  const e = (x) => ev && ev.push(x);
  for (const k of [0, 1]) { const b = activo(S[k]); b.ag = Math.min(R.agMax, b.ag + 1); }
  // 1. relevos
  for (const k of [0, 1]) {
    if (acts[k][0] !== 's') continue;
    const L = S[k]; const sale = activo(L);
    sale.marca = null; sale.ef = {}; sale.cubprev = false; sale.freno = R.freno + 1;
    L.act = acts[k][1];
    if (auras(L).has('tropilla')) activo(L).ef.entrada = 1;
    activo(L).recien = true; L.rel -= 1;
    e({ tipo: 'relevo', lado: k, sale: sale.id, entra: activo(L).id });
  }
  // 2. cubrirse
  const cub = [false, false];
  for (const k of [0, 1]) {
    if (acts[k][0] !== 'c') continue;
    const b = activo(S[k]); cub[k] = true;
    if (b.pas === 'aguantador') b.ag = Math.min(R.agMax, b.ag + 1);
    e({ tipo: 'cubre', lado: k });
  }
  // 3. técnicas, de la más rápida a la más lenta
  const orden = [0, 1].filter((k) => acts[k][0] === 't');
  const desemp = forzar === null ? { 0: rng.sig() * 0.5, 1: rng.sig() * 0.5 } : { [forzar]: 0.4, [1 - forzar]: 0.1 };
  let va = { 0: velEf(activo(S[0])), 1: velEf(activo(S[1])) };
  const empate = Math.abs(va[0] - va[1]) < 1;
  if (empate) va = { 0: 0, 1: 0 };
  for (const k of [0, 1]) { const b = activo(S[k]); if (b.prenda === 'boina' || (empate && b.rol === 'veloz')) va[k] += 0.3; }
  orden.sort((x, y) => (va[y] + desemp[y]) - (va[x] + desemp[x]));
  if (orden.length === 2 && empate && va[0] === va[1]) e({ tipo: 'moneda', gana: orden[0] });
  for (const k of orden) {
    const Lat = S[k], Lde = S[1 - k], at = activo(Lat), de = activo(Lde);
    if (at.hp <= 0 || de.hp <= 0) continue;
    let tec = at.tec[acts[k][1]];
    let c = costo(at, tec);
    if (at.ag < c) { tec = at.tec[0]; c = 0; }
    at.ag -= c;
    if (at.marca === 'Cargado' && tec.c > 0) at.marca = null;
    const base = { tipo: 'tecnica', lado: k, hueco: tec.hueco, frenado: false };
    const control = ['helado', 'atado', 'sueno', 'lodazal'].some((x) => de.ef[x]);
    if (!cub[1 - k] && !control && tec.p > 0 && rng.sig() < de.ama * R.amaPt) { e({ ...base, amago: true }); continue; }
    if (tec.e) { // técnica de efecto o de leyenda
      const [d, mult] = danioBase(at, de, tec, clima);
      const dd = d * mult * (cub[1 - k] ? R.cub : 1); de.hp -= dd;
      let efecto = null;
      if (!cub[1 - k] && rng.sig() < R.precEfecto && !de.mito && !de.ef['inm_' + tec.e] && de.pas !== 'tozudo') {
        if (tec.e === 'granizo') { if (ponerMarca(de, 'Escarcha', at, clima, Lat)) efecto = 'Escarcha'; }
        else { de.ef[tec.e] = 2; if (tec.e === 'sueno') de.ef.inm_sueno = 5; efecto = tec.e; }
      }
      e({ ...base, danio: dd, efecto, frenado: cub[1 - k] });
      continue;
    }
    let [d, mult] = danioBase(at, de, tec, clima);
    let reac = null;
    if (de.marca && !cub[1 - k]) {
      const r = REAC[`${de.marca}|${tec.t}`];
      if (r) reac = r; else if (tec.p > 0 && tec.c >= 2) reac = 'reventon';
    }
    let combo = false;
    if (reac) {
      let rm = reac === 'reventon' ? R.reventon + (auras(Lat).has('pialador') ? 0.1 : 0) : GOLPE.has(reac) ? R.multGolpe : R.multCtrl;
      if (de.mpor !== at.id) { rm += R.bonoEquipo; combo = Lat.eq.some((x) => x.id === de.mpor); }
      if (at.prenda === 'vincha') rm += 0.5;
      if (at.rol === 'detonador') rm += R.detBono;
      mult *= rm;
      de.marca = null; de.mt = 0;
      if (reac === 'corto') de.ag = Math.max(0, de.ag - 2);
      else if (reac === 'nube') Lde.nube = 3;
      else if (['helado', 'atado', 'lodazal', 'encandilado', 'humareda', 'avivado'].includes(reac)) de.ef[reac] = 2;
    }
    if (at.prenda === 'espuelas' && at.recien) mult *= 1.4;
    at.recien = false;
    const crit = rng.sig() < R.critBase + R.critPt * at.cri + (auras(Lat).has('afilado') ? R.afilado : 0);
    if (crit) mult *= 1.5;
    mult = Math.min(mult, R.tope);
    let frenado = false;
    if (cub[1 - k]) {
      let cm = tec.c < 2 ? R.cub : 0;
      if (tec.c >= 2 && at.rol === 'golpeador') cm = 0.5;
      if (cm === 0) frenado = true;
      mult *= de.rol === 'muralla' ? cm * 0.5 : cm;
    }
    if (auras(Lde).has('guardian')) mult *= 1 - R.guardian;
    if (auras(Lat).has('rastreador') && de.marca) mult *= 1.1;
    if (de.ef.entrada) mult *= 0.7;
    if (de.rol === 'muralla') mult *= 1 - R.murRed;
    const dd = d * mult; de.hp -= dd;
    if (at.ef.encandilado && tec.p > 0) delete at.ef.encandilado;
    let marco = null;
    if (de.hp > 0 && !reac) {
      if (tec.m) { if (ponerMarca(de, MARCA[tec.t], at, clima, Lat)) marco = MARCA[tec.t]; }
      else if (tec.c === 0 && de.marca && Lat.eq.some((x) => x.id === de.mpor)) de.mt = Math.max(de.mt, R.marcaDur);
    }
    e({ ...base, danio: dd, crit, reaccion: reac, combo, marca: marco, frenado, cubierto: cub[1 - k] });
  }
  // 4. fin de ronda
  for (const k of [0, 1]) {
    const L = S[k], b = activo(L); b.cubprev = acts[k][0] === 'c';
    if (b.hp > 0) {
      let dot = 0;
      if (b.marca === 'Chamuscado') dot += R.dotCh * b.hpmax;
      if (b.marca === 'Apestado') dot += R.dotAp * b.hpmax;
      if (b.ef.avivado) dot += 0.08 * b.hpmax;
      if (L.nube > 0) dot += 0.06 * b.hpmax;
      if (dot) { b.hp -= dot; e({ tipo: 'dot', lado: k, danio: dot }); }
    }
    if (b.marca && --b.mt <= 0) b.marca = null;
    for (const x of Object.keys(b.ef)) if (--b.ef[x] <= 0) delete b.ef[x];
    if (L.nube > 0) L.nube -= 1;
    for (const x of L.eq) if (x.freno > 0) x.freno -= 1;
  }
  const ko = [activo(S[0]).hp <= 0, activo(S[1]).hp <= 0];
  ko.forEach((v, k) => v && e({ tipo: 'ko', lado: k, id: activo(S[k]).id }));
  for (const k of [0, 1]) if (ko[1 - k]) S[k].rel = Math.min(S[k].rel + 1, Math.max(S[k].rel, R.relevoMax));
  return ko;
}

// ---------------- Evaluación (para la IA) ----------------
function mreac(a, o, tec) {
  if (!o.marca || tec.p === 0) return 1;
  const eq = o.mpor !== a.id ? R.bonoEquipo : 0;
  const r = REAC[`${o.marca}|${tec.t}`];
  if (r) return (GOLPE.has(r) ? R.multGolpe : R.multCtrl) + eq;
  if (tec.c >= 2 && !tec.e) return R.reventon + eq;
  return 1;
}
export function amenazaTec(a, o, tec, clima) {
  if (tec.p === 0) return 0;
  const [d, m] = danioBase(a, o, tec, clima);
  return d * Math.min(m * mreac(a, o, tec), R.tope);
}
export const amenaza = (a, o, clima) => Math.max(0, ...a.tec.map((t) => amenazaTec(a, o, t, clima)));

export function evaluar(S, k, clima) {
  const val = (L, O) => {
    let s = L.eq.reduce((x, b) => x + Math.max(0, b.hp) / b.hpmax, 0) + 0.5 * vivos(L).length;
    const a = activo(L), o = activo(O); s += 0.03 * a.ag + 0.06 * L.rel;
    if (a.hp > 0 && o.hp > 0) {
      s += 0.5 * amenaza(a, o, clima) / o.hpmax * (velEf(a, false) > velEf(o, false) ? 1.15 : 1);
      if (o.marca) {
        const tiene = L.eq.some((b) => b.hp > 0 && b.tec.some((t) => DET[o.marca]?.has(t.t) || (t.c >= 2 && !t.e)));
        s += tiene ? 0.12 * o.mt / 3 : 0.02;
      }
    }
    return s;
  };
  return val(S[k], S[1 - k]) - val(S[1 - k], S[k]);
}

/** Quién entra cuando cae uno, para la máquina: el que mejor pelea contra el rival que está en la cancha. */
export function mejorReemplazo(S, k, clima) {
  const L = S[k], v = vivos(L), o = activo(S[1 - k]);
  if (!v.length) return null;
  if (o.hp > 0) return v.reduce((m, j) => (puntaje(j) > puntaje(m) ? j : m));
  return v.reduce((m, j) => (L.eq[j].hp / L.eq[j].hpmax + L.eq[j].atk / 300 > L.eq[m].hp / L.eq[m].hpmax + L.eq[m].atk / 300 ? j : m));
  function puntaje(j) { const b = L.eq[j]; return amenaza(b, o, clima) / Math.max(o.hp, 1) - amenaza(o, b, clima) / b.hp; }
}
/** Pone al nuevo en la cancha (reemplazo gratis, a la vez para los dos). */
export function entrar(L, j) {
  L.act = j; const b = activo(L); b.ag = R.agIni + (b.pas === 'guapo' || b.prenda === 'aguayo' ? 1 : 0); b.cubprev = false; b.recien = true;
}
export function reemplazosMaquina(S, clima, lados = [0, 1]) {
  const elec = {};
  for (const k of lados) if (activo(S[k]).hp <= 0) { const j = mejorReemplazo(S, k, clima); if (j !== null) elec[k] = j; }
  for (const [k, j] of Object.entries(elec)) entrar(S[k], j);
}

/** Arma un lado con su equipo (los 4 que salieron del sorteo, o el equipo contra un salvaje). */
export function nuevoLado(eq, { conservarVida = false } = {}) {
  const L = { eq: eq.map(clonB), act: 0, rel: R.relevoIni, nube: 0 };
  for (const b of L.eq) { b.ag = R.agIni + (b.pas === 'guapo' || b.prenda === 'aguayo' ? 1 : 0); if (!conservarVida) b.hp = b.hpmax; b.recien = true; b.marca = null; b.ef = {}; b.freno = 0; b.cubprev = false; }
  const i = L.eq.findIndex((b) => b.hp > 0); L.act = i < 0 ? 0 : i;
  return L;
}

/** Clase de una acción, para la memoria de la IA lectora. */
export function claseVista(S, k, x) {
  if (x[0] === 'c') return 'c';
  if (x[0] === 's') return 's';
  return activo(S[k]).tec[x[1]].c >= 2 ? 'f' : 'l';
}

export { activo, Rng, DET };
