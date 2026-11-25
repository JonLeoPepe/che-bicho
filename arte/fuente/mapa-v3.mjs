// Mapa v3 (más realista dentro del estilo) e insignias de platería criolla.
const O = '#2a1c15';
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const f1 = (n) => n.toFixed(1);

// curva suave por puntos (Catmull-Rom → Bézier)
function suave(pts, cerrada = false) {
  const P = cerrada ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f1(P[1][0])},${f1(P[1][1])}`;
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)},${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)},${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d + (cerrada ? 'Z' : '');
}
const distSeg = (x, y, [ax, ay], [bx, by]) => { const dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy))); return Math.hypot(x - ax - t * dx, y - ay - t * dy); };
const dentro = (x, y, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };

export function mapaV3({ puma, tero, domador, protagonista, svg }) {
  const R = rng(20261121), W = 360, H = 760;
  const camino = [[125, 196], [140, 250], [170, 312], [168, 380], [150, 440], [176, 520], [186, 600], [172, 680], [180, 770]];
  const lag = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, r = 58 + Math.sin(i * 1.7) * 10 + Math.cos(i * 2.9) * 6; return [282 + Math.cos(a) * r * 1.15, 392 + Math.sin(a) * r * 0.78]; });
  const enCamino = (x, y, m = 22) => camino.some((p, i) => i && distSeg(x, y, camino[i - 1], p) < m);
  const enLaguna = (x, y, m = 0) => dentro(x, y, lag) || lag.some((p) => Math.hypot(p[0] - x, p[1] - y) < m);
  const ocupado = (x, y) => y < 210 || enCamino(x, y) || enLaguna(x, y, 14) || (x < 40 && y > 660) || (x > 250 && y > 650);

  // ── objetos ordenados por profundidad
  const objs = []; const sombras = [];
  const roca = (x, y, s = 1, musgo = true) => {
    const n = 7, pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + R() * 0.3, r = (12 + R() * 6) * s; return [x + Math.cos(a) * r * 1.2, y - 8 * s + Math.sin(a) * r * 0.85]; });
    const arriba = pts.map(([px, py]) => [x + (px - x) * 0.72 - 2 * s, y - 8 * s + (py - y + 8 * s) * 0.6 - 5 * s]);
    sombras.push(`<ellipse cx="${f1(x + 7 * s)}" cy="${f1(y + 2)}" rx="${f1(18 * s)}" ry="${f1(6 * s)}"/>`);
    objs.push([y, `<g><path d="${suave(pts, true)}" fill="#8b8172" stroke="${O}" stroke-width="2"/><path d="${suave(pts.map(([px, py]) => [px + 3 * s, py + 3 * s]), true)}" fill="#6f665a" opacity=".55" clip-path="none"/>
      <path d="${suave(arriba, true)}" fill="#b2a894"/><path d="M${f1(x - 8 * s)},${f1(y - 16 * s)} q${f1(6 * s)},${f1(-4 * s)} ${f1(12 * s)},0" stroke="#d3cab6" stroke-width="${f1(2 * s)}" fill="none" stroke-linecap="round"/>
      <path d="M${f1(x + 2 * s)},${f1(y - 12 * s)} l${f1(4 * s)},${f1(6 * s)} l${f1(-2 * s)},${f1(5 * s)}" stroke="#6f665a" stroke-width="1.2" fill="none"/>
      ${musgo ? `<ellipse cx="${f1(x - 6 * s)}" cy="${f1(y - 4 * s)}" rx="${f1(5 * s)}" ry="${f1(2.4 * s)}" fill="#7d8f45" opacity=".85"/>` : ''}</g>`]);
  };
  const arbusto = (x, y, s = 1, c = ['#5b7430', '#71893a', '#93a85a']) => {
    sombras.push(`<ellipse cx="${f1(x + 8 * s)}" cy="${f1(y + 2)}" rx="${f1(20 * s)}" ry="${f1(6 * s)}"/>`);
    let g = ''; for (let p = 0; p < 3; p++) for (let i = 0; i < 9; i++) { const a = R() * Math.PI * 2, r = R() * 12 * s; const cx = x + Math.cos(a) * r * 1.3 - (p === 2 ? 4 * s : 0), cy = y - 12 * s + Math.sin(a) * r * 0.7 - p * 3 * s; g += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1((7 - p * 1.8) * s)}" fill="${c[p]}"/>`; }
    objs.push([y, `<g><ellipse cx="${x}" cy="${f1(y - 11 * s)}" rx="${f1(20 * s)}" ry="${f1(13 * s)}" fill="${c[0]}" stroke="${O}" stroke-width="2"/>${g}</g>`]);
  };
  const algarrobo = (x, y, s = 1) => {
    sombras.push(`<ellipse cx="${x + 26 * s}" cy="${y + 4}" rx="${58 * s}" ry="${17 * s}"/>`);
    let copa = ''; const capas = [['#465f27', 26, 9, 1.0], ['#5f7c33', 22, 8, 0.85], ['#7a983f', 16, 6, 0.65], ['#9db65c', 10, 3.5, 0.45]];
    capas.forEach(([c, n, rr, esc], p) => { for (let i = 0; i < n; i++) { const a = R() * Math.PI * 2, r = Math.sqrt(R()); const cx = x - p * 5 * s + Math.cos(a) * r * 50 * s * esc, cy = y - 66 * s - p * 5 * s + Math.sin(a) * r * 28 * s * esc; copa += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(rr * s * (0.8 + R() * 0.5))}" fill="${c}"/>`; } });
    const vainas = Array.from({ length: 7 }, () => { const cx = x + (R() - 0.5) * 80 * s, cy = y - 50 * s + (R() - 0.3) * 30 * s; return `<path d="M${f1(cx)},${f1(cy)} q2,6 -1,11" stroke="#d4b05a" stroke-width="2" fill="none" stroke-linecap="round"/>`; }).join('');
    objs.push([y, `<g><path d="M${x - 9 * s},${y} C${x - 6 * s},${y - 18 * s} ${x - 18 * s},${y - 30 * s} ${x - 14 * s},${y - 52 * s} L${x - 4 * s},${y - 50 * s} C${x - 4 * s},${y - 36 * s} ${x + 2 * s},${y - 30 * s} ${x + 4 * s},${y - 40 * s} L${x + 12 * s},${y - 54 * s} L${x + 16 * s},${y - 48 * s} C${x + 8 * s},${y - 34 * s} ${x + 10 * s},${y - 16 * s} ${x + 9 * s},${y}Z" fill="#5d3f26" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M${x - 4 * s},${y - 4} C${x - 2 * s},${y - 16 * s} ${x - 8 * s},${y - 26 * s} ${x - 8 * s},${y - 40 * s} M${x + 4 * s},${y - 6} C${x + 4 * s},${y - 18 * s} ${x + 4 * s},${y - 26 * s} ${x + 8 * s},${y - 36 * s}" stroke="#3e2a18" stroke-width="1.4" fill="none"/>
      <g class="copa" style="transform-origin:${x}px ${y - 40 * s}px"><ellipse cx="${x - 4 * s}" cy="${y - 68 * s}" rx="${54 * s}" ry="${32 * s}" fill="#465f27" stroke="${O}" stroke-width="2.2"/>${copa}${vainas}</g></g>`]);
  };
  const cardon = (x, y, s = 1) => {
    sombras.push(`<ellipse cx="${x + 14 * s}" cy="${y + 2}" rx="${22 * s}" ry="${6 * s}"/>`);
    const tallo = (cx, top, bot, w) => `<path d="M${cx - w},${bot} L${cx - w},${top + w} Q${cx - w},${top} ${cx},${top} Q${cx + w},${top} ${cx + w},${top + w} L${cx + w},${bot}Z" fill="#6f9a52" stroke="${O}" stroke-width="2"/><path d="M${cx + w * 0.2},${top + 3} L${cx + w * 0.2},${bot} M${cx + w * 0.6},${top + 5} L${cx + w * 0.6},${bot}" stroke="#4f7a3a" stroke-width="1.6"/><path d="M${cx - w * 0.5},${top + 4} L${cx - w * 0.5},${bot}" stroke="#97bf72" stroke-width="2"/>`;
    objs.push([y, `<g>${tallo(x, y - 74 * s, y, 9 * s)}<path d="M${x - 9 * s},${y - 34 * s} L${x - 20 * s},${y - 34 * s} L${x - 20 * s},${y - 50 * s}" stroke="${O}" stroke-width="${15 * s}" fill="none" stroke-linejoin="round"/><path d="M${x - 9 * s},${y - 34 * s} L${x - 20 * s},${y - 34 * s} L${x - 20 * s},${y - 50 * s}" stroke="#6f9a52" stroke-width="${11 * s}" fill="none" stroke-linejoin="round"/>
      <path d="M${x + 9 * s},${y - 24 * s} L${x + 19 * s},${y - 24 * s} L${x + 19 * s},${y - 44 * s}" stroke="${O}" stroke-width="${15 * s}" fill="none" stroke-linejoin="round"/><path d="M${x + 9 * s},${y - 24 * s} L${x + 19 * s},${y - 24 * s} L${x + 19 * s},${y - 44 * s}" stroke="#5f8a46" stroke-width="${11 * s}" fill="none" stroke-linejoin="round"/>
      <circle cx="${x - 2}" cy="${y - 73 * s}" r="${2.6 * s}" fill="#f1e9d6"/><circle cx="${x + 19 * s}" cy="${y - 45 * s}" r="${2.2 * s}" fill="#f1e9d6"/></g>`]);
  };
  const pastizal = (x, y, n = 9) => {
    let g = ''; for (let i = 0; i < n; i++) { const bx = x + i * 4.2 + R() * 2, h = 16 + R() * 10, c = ['#6b8a3a', '#7f9c45', '#a3a45a', '#8a9a4a'][i % 4], tip = R() < 0.4;
      g += `<path d="M${f1(bx)},${y} C${f1(bx - 2)},${f1(y - h * 0.5)} ${f1(bx + 1)},${f1(y - h * 0.8)} ${f1(bx + 3 + R() * 3)},${f1(y - h)} C${f1(bx + 3)},${f1(y - h * 0.6)} ${f1(bx + 5)},${f1(y - h * 0.3)} ${f1(bx + 5)},${y}Z" fill="${c}" stroke="#34481e" stroke-width=".9" stroke-linejoin="round"/>${tip ? `<ellipse cx="${f1(bx + 4)}" cy="${f1(y - h - 1)}" rx="1.4" ry="3.2" fill="#d9c98a" stroke="#7a6a3a" stroke-width=".6"/>` : ''}`; }
    objs.push([y, `<g class="pastizal" style="transform-origin:${x + n * 2}px ${y}px;animation-delay:${f1(R() * 2)}s">${g}</g>`]);
  };
  const juncos = (x, y, n = 6) => {
    let g = ''; for (let i = 0; i < n; i++) { const bx = x + i * 3 + R() * 2, h = 20 + R() * 12; g += `<path d="M${f1(bx)},${y} L${f1(bx + (R() - 0.5) * 4)},${f1(y - h)}" stroke="#3f5a24" stroke-width="2.4" stroke-linecap="round"/><path d="M${f1(bx)},${y} L${f1(bx + (R() - 0.5) * 4)},${f1(y - h)}" stroke="#6d8f3c" stroke-width="1.2" stroke-linecap="round"/>${R() < 0.5 ? `<rect x="${f1(bx - 1.6)}" y="${f1(y - h - 2)}" width="3.2" height="8" rx="1.6" fill="#7a4e2a" stroke="${O}" stroke-width=".7"/>` : ''}`; }
    objs.push([y, `<g class="pastizal" style="transform-origin:${x}px ${y}px;animation-delay:${f1(R() * 2)}s">${g}</g>`]);
  };

  // ── edificios
  const posta = (x0, y0, w) => {
    const yb = y0 + 128; // base del muro
    sombras.push(`<path d="M${x0},${yb} L${x0 + w},${yb} L${x0 + w + 26},${yb + 16} L${x0 + 18},${yb + 16}Z"/>`);
    const vent = (vx) => `<rect x="${vx - 2}" y="${y0 + 82}" width="26" height="30" fill="#e4dccb" stroke="${O}" stroke-width="1.6"/><rect x="${vx + 2}" y="${y0 + 86}" width="18" height="24" fill="#2e2a2a"/><path d="M${vx + 6},${y0 + 86} l0,24 M${vx + 11},${y0 + 86} l0,24 M${vx + 16},${y0 + 86} l0,24 M${vx + 2},${y0 + 97} l18,0" stroke="#7d7a78" stroke-width="1.3"/>
      <rect x="${vx - 10}" y="${y0 + 84}" width="8" height="28" fill="#3f6e5a" stroke="${O}" stroke-width="1.4"/><rect x="${vx + 24}" y="${y0 + 84}" width="8" height="28" fill="#3f6e5a" stroke="${O}" stroke-width="1.4"/><path d="M${vx - 6},${y0 + 86} l0,24 M${vx + 28},${y0 + 86} l0,24" stroke="#2e5242" stroke-width="1"/>`;
    const tejas = Array.from({ length: 9 }, (_, r) => Array.from({ length: Math.ceil(w / 12) + 1 }, (_, c) => { const tx = x0 - 8 + c * 12 + (r % 2) * 6, ty = y0 + 6 + r * 7.5, col = ['#b85a30', '#c4683a', '#a94f2a', '#cf7444'][Math.floor(R() * 4)]; return tx > x0 + w + 4 ? '' : `<path d="M${tx},${f1(ty + 8)} Q${tx + 6},${f1(ty - 2)} ${tx + 12},${f1(ty + 8)}" fill="${col}" stroke="#7d3519" stroke-width=".9"/>`; }).join('')).join('');
    objs.push([yb, `<g>
      <path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4} L${x0 + w + 14},${y0 + 76} L${x0 - 14},${y0 + 76}Z" fill="#a94f2a" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>
      <clipPath id="tj"><path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4} L${x0 + w + 14},${y0 + 74} L${x0 - 14},${y0 + 74}Z"/></clipPath><g clip-path="url(#tj)">${tejas}</g>
      <path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4}" stroke="#8a3c1e" stroke-width="6" stroke-linecap="round"/><path d="M${x0 - 10},${y0 + 3} L${x0 + w + 10},${y0 + 3}" stroke="#d48456" stroke-width="1.6"/>
      <rect x="${x0 + w - 46}" y="${y0 - 14}" width="16" height="26" fill="#e9e1cf" stroke="${O}" stroke-width="2"/><rect x="${x0 + w - 48}" y="${y0 - 18}" width="20" height="6" fill="#a94f2a" stroke="${O}" stroke-width="1.6"/>
      <g class="humo">${[0, 1, 2].map((i) => `<circle cx="${x0 + w - 38}" cy="${y0 - 26}" r="${5 + i}" fill="#e8e4dc" opacity=".7" style="animation-delay:${i * 1.1}s"/>`).join('')}</g>
      <path d="M${x0 - 14},${y0 + 76} L${x0 + w + 14},${y0 + 76} L${x0 + w + 14},${y0 + 82} L${x0 - 14},${y0 + 82}Z" fill="#7a3a1c" stroke="${O}" stroke-width="2"/>
      <rect x="${x0}" y="${y0 + 82}" width="${w}" height="${yb - y0 - 82}" fill="#efe8da" stroke="${O}" stroke-width="2.2"/>
      <ellipse cx="${x0 + w * 0.2}" cy="${y0 + 110}" rx="16" ry="9" fill="#e0d6c0" opacity=".8"/><ellipse cx="${x0 + w * 0.75}" cy="${y0 + 98}" rx="12" ry="6" fill="#e0d6c0" opacity=".8"/>
      <rect x="${x0}" y="${yb - 10}" width="${w}" height="10" fill="#c9b893" stroke="${O}" stroke-width="1.6"/>
      <rect x="${x0}" y="${y0 + 82}" width="${w}" height="16" fill="url(#aleroSombra)"/>
      ${vent(x0 + 22)}${vent(x0 + w - 48)}
      <path d="M${x0 + w / 2 - 16},${yb - 2} L${x0 + w / 2 - 16},${y0 + 98} Q${x0 + w / 2},${y0 + 84} ${x0 + w / 2 + 16},${y0 + 98} L${x0 + w / 2 + 16},${yb - 2}Z" fill="#6b4226" stroke="${O}" stroke-width="2"/>
      <path d="M${x0 + w / 2 - 8},${y0 + 92} L${x0 + w / 2 - 8},${yb - 2} M${x0 + w / 2},${y0 + 89} L${x0 + w / 2},${yb - 2} M${x0 + w / 2 + 8},${y0 + 92} L${x0 + w / 2 + 8},${yb - 2}" stroke="#4e2f1a" stroke-width="1.3"/>
      ${[0, 1, 2].map((i) => `<circle cx="${x0 + w / 2 - 12}" cy="${y0 + 104 + i * 8}" r="1.1" fill="#2a2a2a"/><circle cx="${x0 + w / 2 + 12}" cy="${y0 + 104 + i * 8}" r="1.1" fill="#2a2a2a"/>`).join('')}
      ${[x0 + 6, x0 + w * 0.36, x0 + w * 0.64, x0 + w - 12].map((px) => `<rect x="${f1(px)}" y="${y0 + 80}" width="6" height="${yb - y0 - 78}" fill="#7b5236" stroke="${O}" stroke-width="1.5"/><rect x="${f1(px - 3)}" y="${y0 + 80}" width="12" height="4" fill="#5d3c24" stroke="${O}" stroke-width="1"/>`).join('')}
      <rect x="${x0 + w / 2 - 26}" y="${y0 + 64}" width="52" height="14" rx="1.5" fill="#f2e6c6" stroke="${O}" stroke-width="1.8"/><text x="${x0 + w / 2}" y="${y0 + 75}" font-family="Bree" font-size="10" text-anchor="middle" fill="#7a2a1a" letter-spacing="2">POSTA</text>
      <g class="farol"><path d="M${x0 + w / 2 + 22},${y0 + 84} l0,6" stroke="${O}" stroke-width="1.4"/><rect x="${x0 + w / 2 + 19}" y="${y0 + 90}" width="7" height="9" rx="1.5" fill="#f6d27a" stroke="${O}" stroke-width="1.3"/></g>
    </g>`]);
    // palenque y bebedero
    const py = yb + 30; sombras.push(`<path d="M${x0 + 30},${py + 2} L${x0 + 84},${py + 2} L${x0 + 92},${py + 8} L${x0 + 36},${py + 8}Z"/>`);
    objs.push([py, `<g><rect x="${x0 + 30}" y="${py - 22}" width="5" height="24" fill="#7b5236" stroke="${O}" stroke-width="1.4"/><rect x="${x0 + 80}" y="${py - 22}" width="5" height="24" fill="#7b5236" stroke="${O}" stroke-width="1.4"/><rect x="${x0 + 26}" y="${py - 20}" width="62" height="5" rx="2" fill="#8c6342" stroke="${O}" stroke-width="1.4"/></g>`]);
    const bx = x0 + w - 70; sombras.push(`<rect x="${bx + 6}" y="${py - 2}" width="50" height="8"/>`);
    objs.push([py, `<g><rect x="${bx}" y="${py - 16}" width="48" height="16" rx="2" fill="#9a8f80" stroke="${O}" stroke-width="1.8"/><rect x="${bx + 3}" y="${py - 14}" width="42" height="7" fill="#4b8db0"/><path class="brillo" d="M${bx + 8},${py - 11} l12,0" stroke="#cfe9f2" stroke-width="1.4"/><path d="M${bx},${py - 6} L${bx + 48},${py - 6}" stroke="#7d7466" stroke-width="1"/></g>`]);
  };
  const rancho = (x0, y0, w) => {
    const yb = y0 + 92;
    sombras.push(`<path d="M${x0},${yb} L${x0 + w},${yb} L${x0 + w + 20},${yb + 12} L${x0 + 14},${yb + 12}Z"/>`);
    const paja = Array.from({ length: 160 }, () => { const px = x0 - 8 + R() * (w + 16), py = y0 + 2 + R() * 52; return `<path d="M${f1(px)},${f1(py)} l${f1(-1 + R() * 2)},${f1(5 + R() * 4)}" stroke="${['#9c844f', '#d4bd84', '#b59c62', '#8a723f'][Math.floor(R() * 4)]}" stroke-width="1.3"/>`; }).join('');
    const flecos = Array.from({ length: Math.floor((w + 20) / 4) }, (_, i) => `<path d="M${x0 - 10 + i * 4},${y0 + 56} l${f1(R() * 2 - 1)},${f1(4 + R() * 4)}" stroke="#8a723f" stroke-width="1.4"/>`).join('');
    const adobes = Array.from({ length: 4 }, (_, r) => Array.from({ length: 3 }, (_, c) => `<rect x="${x0 + w - 40 + c * 11 + (r % 2) * 5}" y="${y0 + 70 + r * 5}" width="10" height="4.5" fill="#a0704a" stroke="#7d5234" stroke-width=".6"/>`).join('')).join('');
    objs.push([yb, `<g>
      <path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4} L${x0 + w + 14},${y0 + 58} L${x0 - 14},${y0 + 58}Z" fill="#b9a06a" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
      <clipPath id="pj"><path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4} L${x0 + w + 14},${y0 + 58} L${x0 - 14},${y0 + 58}Z"/></clipPath><g clip-path="url(#pj)">${paja}<path d="M${x0 - 12},${y0 + 22} L${x0 + w + 12},${y0 + 22} M${x0 - 12},${y0 + 40} L${x0 + w + 12},${y0 + 40}" stroke="#7a6436" stroke-width="1.6" opacity=".6"/></g>
      <path d="M${x0 - 10},${y0 + 4} L${x0 + w + 10},${y0 + 4}" stroke="#7a6436" stroke-width="5" stroke-linecap="round"/>
      <rect x="${x0}" y="${y0 + 58}" width="${w}" height="${yb - y0 - 58}" fill="#b98a5c" stroke="${O}" stroke-width="2.2"/>
      <path d="M${x0 + 4},${y0 + 62} C${x0 + 20},${y0 + 60} ${x0 + 34},${y0 + 66} ${x0 + 30},${y0 + 80} C${x0 + 20},${y0 + 86} ${x0 + 8},${y0 + 84} ${x0 + 4},${y0 + 80}Z" fill="#c99c6c" opacity=".9"/>
      ${adobes}<rect x="${x0}" y="${y0 + 58}" width="${w}" height="12" fill="rgba(40,20,5,.28)"/>${flecos}
      <rect x="${x0 + 34}" y="${y0 + 66}" width="22" height="${yb - y0 - 66}" fill="#2a1f1a" stroke="${O}" stroke-width="2"/><path d="M${x0 + 34},${y0 + 66} L${x0 + 56},${y0 + 66}" stroke="#6b4226" stroke-width="4"/>
      <path d="M${x0 + 36},${y0 + 68} C${x0 + 40},${y0 + 80} ${x0 + 38},${y0 + 88} ${x0 + 42},${yb - 1} L${x0 + 36},${yb - 1}Z" fill="#8a5a36"/>
      <rect x="${x0 + 8}" y="${y0 + 70}" width="12" height="10" fill="#2a1f1a" stroke="${O}" stroke-width="1.6"/></g>`]);
  };
  const horno = (x, y) => {
    sombras.push(`<ellipse cx="${x + 10}" cy="${y + 2}" rx="26" ry="7"/>`);
    objs.push([y, `<g><path d="M${x - 22},${y} C${x - 22},${y - 34} ${x + 22},${y - 34} ${x + 22},${y}Z" fill="#b07a4f" stroke="${O}" stroke-width="2.2"/><path d="M${x - 16},${y - 12} C${x - 14},${y - 26} ${x},${y - 30} ${x + 6},${y - 28}" stroke="#cf9a6a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M${x - 8},${y} L${x - 8},${y - 8} Q${x},${y - 16} ${x + 8},${y - 8} L${x + 8},${y}Z" fill="#2a1a14" stroke="${O}" stroke-width="1.6"/><rect x="${x + 10}" y="${y - 30}" width="5" height="6" fill="#8a5a36" stroke="${O}" stroke-width="1.2"/>
      <path d="M${x - 24},${y} L${x + 24},${y}" stroke="#8a6a4a" stroke-width="3"/></g>`]);
  };
  const alambrado = (pts) => { pts.forEach(([x, y], i) => { const t = (R() - 0.5) * 4; sombras.push(`<path d="M${x},${y} l14,6" stroke="rgba(0,0,0,1)" stroke-width="3"/>`); objs.push([y, `<g><path d="M${x},${y} L${f1(x + t)},${y - 26}" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M${x},${y} L${f1(x + t)},${y - 26}" stroke="#8a6a46" stroke-width="3" stroke-linecap="round"/></g>`]); });
    objs.push([pts[pts.length - 1][1] - 1, `<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y - 20}`).join(' ')} M${pts.map(([x, y], i) => `${i ? 'L' : ''}${x},${y - 11}`).join(' ')}" stroke="#7b7b7b" stroke-width="1" fill="none"/>`]); };
  const pirca = (pts) => { pts.forEach(([x, y]) => { for (let k = 0; k < 2; k++) { const cx = x + (R() - 0.5) * 4, cy = y - k * 7, rx = 6 + R() * 3; objs.push([y + 0.1 * k, `<ellipse cx="${f1(cx)}" cy="${f1(cy - 4)}" rx="${f1(rx)}" ry="${f1(5 + R())}" fill="${['#9b917f', '#a89e8a', '#8b8272'][Math.floor(R() * 3)]}" stroke="${O}" stroke-width="1.5"/><path d="M${f1(cx - rx * 0.5)},${f1(cy - 7)} q${f1(rx * 0.5)},-2 ${f1(rx)},0" stroke="#c9c0ad" stroke-width="1.4" fill="none"/>`]); } }); sombras.push(`<path d="${pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x + 6},${y + 2}`).join(' ')}" stroke="#000" stroke-width="9" fill="none"/>`); };
  const persona = (fn, x, y, s, clase = '') => { sombras.push(`<ellipse cx="${x + 6}" cy="${y}" rx="${10}" ry="3"/>`); objs.push([y, `<g transform="translate(${f1(x - 60 * s)} ${f1(y - 192 * s)}) scale(${s})"><g class="${clase}">${fn()}</g></g>`]); };

  // ── escena
  posta(26, 54, 196); rancho(258, 104, 86); horno(330, 226);
  algarrobo(58, 340, 1); arbusto(118, 282, 0.9); arbusto(22, 438, 0.8, ['#6a7a34', '#829546', '#a8b267']); arbusto(338, 312, 0.7);
  roca(232, 474, 1); roca(250, 488, 0.6, false); roca(342, 468, 0.8); roca(36, 650, 1.4); roca(66, 664, 0.8); roca(210, 352, 0.55, false);
  cardon(306, 626, 1); cardon(340, 676, 0.8);
  for (let i = 0; i < 9; i++) pastizal(10 + (i % 3) * 38 + R() * 8, 500 + Math.floor(i / 3) * 34 + R() * 6, 8 + Math.floor(R() * 3));
  pastizal(232, 548, 7); pastizal(250, 572, 6); pastizal(200, 640, 6);
  lag.forEach(([x, y], i) => { if ([0, 1, 5, 6, 7, 11, 12].includes(i)) juncos(x - 8, y + 4, 5 + Math.floor(R() * 3)); });
  alambrado([[212, 712], [238, 694], [264, 676], [290, 658], [316, 640], [342, 622], [368, 604]]);
  pirca([[4, 262], [18, 260], [32, 258], [46, 258], [60, 260], [74, 263], [88, 267]]);
  persona(domador, 160, 400, 0.26); persona(protagonista, 168, 520, 0.27, 'camina');
  objs.push([548, `<g transform="translate(50 486) scale(.27)">${puma()}</g>`]);
  objs.push([550, `<g class="alerta"><path d="M68,466 C68,456 86,456 86,466 C86,474 80,476 77,482 C74,476 68,474 68,466Z" fill="#fff" stroke="${O}" stroke-width="2"/><text x="77" y="472" font-family="Bree" font-size="13" text-anchor="middle" fill="#c8362b">!</text></g>`]);
  objs.push([446, `<g transform="translate(196 398) scale(.24)">${tero()}</g>`]);

  // ── detalle del suelo
  let matas = '', piedritas = '', flores = '';
  for (let i = 0; i < 420; i++) { const x = R() * W, y = 200 + R() * (H - 200); if (ocupado(x, y)) continue; const c = ['#6f8b42', '#7d9a4a', '#97ad5a', '#5f7a38'][Math.floor(R() * 4)];
    matas += `<path d="M${f1(x)},${f1(y)} l${f1(-2 - R() * 2)},${f1(-4 - R() * 3)} M${f1(x)},${f1(y)} l${f1(R() * 1.5)},${f1(-5 - R() * 3)} M${f1(x)},${f1(y)} l${f1(2 + R() * 2)},${f1(-4 - R() * 2)}" stroke="${c}" stroke-width="1.4" stroke-linecap="round"/>`; }
  for (let i = 0; i < 160; i++) { const x = 80 + R() * 160, y = 190 + R() * (H - 190); if (!enCamino(x, y, 15)) continue; piedritas += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(1 + R() * 2)}" ry="${f1(0.8 + R())}" fill="${['#a48961', '#b9a07a', '#8f7652', '#e3d2ac'][Math.floor(R() * 4)]}"/>`; }
  for (let i = 0; i < 40; i++) { const x = R() * W, y = 220 + R() * (H - 260); if (ocupado(x, y)) continue; flores += `<circle cx="${f1(x)}" cy="${f1(y)}" r="1.8" fill="${['#f2d24a', '#e8e2d6', '#c98ad6', '#e86a5a'][Math.floor(R() * 4)]}"/>`; }

  const caminoD = suave(camino);
  const lagD = suave(lag, true);
  const ondas = [0, 1, 2].map((i) => `<ellipse class="onda" cx="${296 - i * 18}" cy="${388 + i * 10}" rx="10" ry="3.5" fill="none" stroke="#d6eef2" stroke-width="1.2" style="animation-delay:${i * 1.3}s"/>`).join('');
  objs.sort((a, b) => a[0] - b[0]);

  // ── HUD aprobado
  const hud = (() => { const caps = [['☰ Menú', '#b8382a', '#fff', 64], ['Cerrillos', '#3f6e34', '#fff', 70], ['☀ 08:10', '#2f7fb8', '#fff', 62], ['Despejado', '#e7b93a', '#3a2a10', 70], ['● 150', '#b8862a', '#fff', 54]];
    let x = 6; return caps.map(([t, bg, fg, w]) => { const s = `<g><rect x="${x}" y="10" width="${w}" height="24" rx="12" fill="${bg}" stroke="${O}" stroke-width="2"/><rect x="${x + 3}" y="12.5" width="${w - 6}" height="6" rx="3" fill="#fff" opacity=".18"/>${t.startsWith('●') ? `<circle cx="${x + 14}" cy="22" r="6.5" fill="#e9c35a" stroke="#6e4f12" stroke-width="1.6"/><circle cx="${x + 14}" cy="22" r="2.6" fill="none" stroke="#a37a22" stroke-width="1.2"/><text x="${x + 26}" y="26" font-family="Nunito" font-weight="800" font-size="11.5" fill="${fg}">150</text>` : `<text x="${x + w / 2}" y="26" font-family="Nunito" font-weight="800" font-size="11.5" fill="${fg}" text-anchor="middle">${t}</text>`}</g>`; x += w + 5; return s; }).join(''); })();
  const mini = `<g transform="translate(310 704)"><circle r="40" fill="#e9dcc0" stroke="${O}" stroke-width="2.6"/><clipPath id="mc3"><circle r="36"/></clipPath><g clip-path="url(#mc3)"><g transform="scale(.32) translate(-170 -470)"><rect x="-200" y="-200" width="800" height="1200" fill="#88a14f"/><path d="${caminoD}" stroke="#cdb183" stroke-width="30" fill="none"/><path d="${lagD}" fill="#4b8db0"/><rect x="26" y="54" width="196" height="128" fill="#a94f2a"/><rect x="258" y="104" width="86" height="92" fill="#b9a06a"/><circle cx="58" cy="280" r="40" fill="#5f7c33"/></g></g><path d="M-3,6 L0,-2 L3,6Z" fill="#d8752e" stroke="${O}" stroke-width="1.4"/><text y="-27" font-family="Bree" font-size="8" text-anchor="middle" fill="${O}">N</text></g>`;
  const equipo = `<g transform="translate(10 690)">${['#cf9a5c', '#6f7a3f', '#8f8b78'].map((c, i) => `<g transform="translate(${i * 40} 0)"><circle cx="18" cy="18" r="17" fill="#efe6d2" stroke="${O}" stroke-width="2.2"/><circle cx="18" cy="18" r="11" fill="${c}" stroke="${O}" stroke-width="1.6"/><rect x="4" y="34" width="28" height="5" rx="2.5" fill="#3a2a22"/><rect x="5" y="35" width="${[24, 16, 22][i]}" height="3" rx="1.5" fill="${['#5fb346', '#e2a72e', '#5fb346'][i]}"/></g>`).join('')}</g>`;

  return svg(`0 0 ${W} ${H}`, `<defs>
    <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter><filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter><filter id="blur10" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="grano" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .18  0 0 0 0 .14  0 0 0 0 .06  .55 0 0 0 -.22"/></filter>
    <filter id="manchas" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .62  0 0 0 0 .6  0 0 0 0 .3  1.4 0 0 0 -.62"/></filter>
    <filter id="manchasOsc" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="2" seed="21"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .36  0 0 0 0 .12  1.3 0 0 0 -.68"/></filter>
    <radialGradient id="agua" cx=".55" cy=".5" r=".6"><stop offset="0" stop-color="#2c6a86"/><stop offset=".7" stop-color="#3f86a0"/><stop offset="1" stop-color="#6fb0b8"/></radialGradient>
    <linearGradient id="cielo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="aleroSombra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2410" stop-opacity=".45"/><stop offset="1" stop-color="#3a2410" stop-opacity="0"/></linearGradient>
    <linearGradient id="luzM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c2" stop-opacity=".22"/><stop offset=".6" stop-color="#fff1c2" stop-opacity="0"/><stop offset="1" stop-color="#3a3020" stop-opacity=".12"/></linearGradient>
    <clipPath id="lagC"><path d="${lagD}"/></clipPath></defs>
    <rect width="${W}" height="${H}" fill="#88a14f"/>
    <rect width="${W}" height="${H}" filter="url(#manchas)"/><rect width="${W}" height="${H}" filter="url(#manchasOsc)"/>
    <ellipse cx="124" cy="214" rx="126" ry="34" fill="#c4a678" filter="url(#blur4)"/><ellipse cx="124" cy="212" rx="110" ry="26" fill="#cfb386" filter="url(#blur2)"/>
    <path d="${caminoD}" stroke="#7f8a45" stroke-width="44" fill="none" stroke-linecap="round" filter="url(#blur4)" opacity=".7"/>
    <path d="${caminoD}" stroke="#bfa274" stroke-width="34" fill="none" stroke-linecap="round" filter="url(#blur2)"/>
    <path d="${caminoD}" stroke="#d3b98d" stroke-width="20" fill="none" stroke-linecap="round" filter="url(#blur4)"/>
    <g transform="translate(-6 0)"><path d="${caminoD}" stroke="#a88c62" stroke-width="2.6" fill="none" opacity=".7"/></g><g transform="translate(7 0)"><path d="${caminoD}" stroke="#a88c62" stroke-width="2.6" fill="none" opacity=".7"/></g>
    <ellipse cx="186" cy="604" rx="12" ry="5" fill="#7a8f96" opacity=".75"/><ellipse cx="183" cy="603" rx="5" ry="1.6" fill="#cfe1e6" opacity=".7"/>
    <path d="${lagD}" fill="#6b5a3e" stroke="#6b5a3e" stroke-width="16" stroke-linejoin="round" filter="url(#blur2)" opacity=".85"/>
    <path d="${lagD}" fill="url(#agua)" stroke="${O}" stroke-width="2"/>
    <g clip-path="url(#lagC)"><path d="${lagD}" fill="none" stroke="#9fd0cf" stroke-width="10" opacity=".55"/>
      <g class="reflejo"><rect x="236" y="368" width="70" height="3" fill="url(#cielo)"/><rect x="262" y="402" width="52" height="2.4" fill="url(#cielo)"/><rect x="246" y="420" width="40" height="2" fill="url(#cielo)"/></g>${ondas}
      <g opacity=".85">${[[316, 360], [328, 372]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="#5f8a3a" stroke="${O}" stroke-width="1"/><path d="M${x},${y} l6,-1" stroke="#3f6a2a" stroke-width="1"/>`).join('')}</g></g>
    <rect width="${W}" height="${H}" filter="url(#grano)" opacity=".9"/>
    <g>${matas}</g><g>${piedritas}</g><g>${flores}</g>
    <g fill="#2a2a10" opacity=".28" filter="url(#blur2)">${sombras.join('')}</g>
    ${objs.map((o) => o[1]).join('\n')}
    <rect width="${W}" height="${H}" fill="url(#luzM)" pointer-events="none"/>
    ${hud}${equipo}${mini}`, 'class="telefono"');
}

// ───────── Insignias de platería criolla (sin cinta) ─────────
export function insignias(svg) {
  const plata = `<linearGradient id="plata" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".45" stop-color="#c9cfd6"/><stop offset=".7" stop-color="#9aa2ab"/><stop offset="1" stop-color="#e4e8ec"/></linearGradient>
    <linearGradient id="oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffeaa0"/><stop offset=".5" stop-color="#e3b23c"/><stop offset="1" stop-color="#a4741c"/></linearGradient>
    <radialGradient id="gema" cx=".35" cy=".3"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".5" stop-color="#b3261e"/><stop offset="1" stop-color="#5a0f0c"/></radialGradient>`;
  const cincel = (cx, cy, r, n) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return `<path d="M${f1(cx + Math.cos(a) * r)},${f1(cy + Math.sin(a) * r)} l${f1(Math.cos(a + 1.2) * 3)},${f1(Math.sin(a + 1.2) * 3)}" stroke="#7d858e" stroke-width="1.2" stroke-linecap="round"/>`; }).join('');
  const gema = (x, y, r = 4.5) => `<circle cx="${x}" cy="${y}" r="${r + 1.6}" fill="url(#oro)" stroke="${O}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gema)"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff" opacity=".8"/>`;
  const brillo = `<path class="destello" d="M0,0 L6,-2 L0,-4 L-2,-10 L-4,-4 L-10,-2 L-4,0 L-2,6Z" fill="#fff"/>`;

  // 1. Empanada (Salta): la insignia tiene forma de empanada; repulgue de oro trenzado
  const bz = (t) => { const u = 1 - t; return [u ** 3 * 10 + 3 * u * u * t * 10 + 3 * u * t * t * 110 + t ** 3 * 110, u ** 3 * 84 + 3 * u * u * t * 40 + 3 * u * t * t * 40 + t ** 3 * 84]; };
  const repulgue = Array.from({ length: 13 }, (_, i) => { const t = 0.04 + (i / 12) * 0.92, [x, y] = bz(t), [x2, y2] = bz(t + 0.01), a = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI; return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="5.6" ry="3.6" transform="rotate(${f1(a + 35)} ${f1(x)} ${f1(y)})" fill="url(#oro)" stroke="${O}" stroke-width="1.2"/>`; }).join('');
  const empanada = svg('0 0 120 130', `<defs>${plata}</defs>
    <ellipse cx="62" cy="96" rx="48" ry="8" fill="rgba(0,0,0,.18)"/>
    <path d="M10,84 C10,40 110,40 110,84 C96,94 24,94 10,84Z" fill="url(#plata)" stroke="${O}" stroke-width="2.6"/>
    <path d="M22,82 C24,54 96,54 98,82 C86,88 34,88 22,82Z" fill="none" stroke="#7d858e" stroke-width="1.4"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${30 + i * 12},${76 - Math.sin((i / 5) * Math.PI) * 10} q4,-6 8,0 q-4,4 -8,0" fill="none" stroke="#7d858e" stroke-width="1.3"/>`).join('')}
    ${repulgue}${gema(60, 70)}
    <path d="M24,62 C34,50 52,46 66,47" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
    <g transform="translate(92 52)">${brillo}</g>`);

  // 2. Acordeón de chamamé (Corrientes): fuelle esmaltado en abanico entre dos tapas de plata
  const pliegues = Array.from({ length: 9 }, (_, i) => { const a1 = -0.95 + i * 0.2111, a2 = a1 + 0.2111, r1 = 16, r2 = 52, cx = 60, cy = 108;
    const p = (a, r) => `${f1(cx + Math.sin(a) * r)},${f1(cy - Math.cos(a) * r)}`; return `<path d="M${p(a1, r1)} L${p(a1, r2)} L${p(a2, r2)} L${p(a2, r1)}Z" fill="${i % 2 ? '#2f7d5b' : '#c8362b'}" stroke="${O}" stroke-width="1.4"/><path d="M${p(a1 + 0.02, r1 + 4)} L${p(a1 + 0.02, r2 - 4)}" stroke="#fff" stroke-width="1" opacity=".45"/>`; }).join('');
  const tapa = (x, rot) => `<g transform="rotate(${rot} 60 108)"><rect x="${x}" y="44" width="22" height="60" rx="5" fill="url(#plata)" stroke="${O}" stroke-width="2.4"/>${[0, 1, 2, 3].map((i) => `<circle cx="${x + 11}" cy="${56 + i * 11}" r="3.6" fill="#f6efe2" stroke="${O}" stroke-width="1.1"/><circle cx="${x + 10}" cy="${55 + i * 11}" r="1.2" fill="#fff"/>`).join('')}${cincel(x + 11, 67, 13, 0)}</g>`;
  const acordeon = svg('0 0 120 130', `<defs>${plata}</defs>
    <ellipse cx="60" cy="122" rx="50" ry="6" fill="rgba(0,0,0,.18)"/>
    ${pliegues}<path d="M${f1(60 + Math.sin(-0.95) * 52)},${f1(108 - Math.cos(-0.95) * 52)} A52,52 0 0 1 ${f1(60 + Math.sin(0.95) * 52)},${f1(108 - Math.cos(0.95) * 52)}" fill="none" stroke="url(#oro)" stroke-width="4"/>
    ${tapa(49, -62)}${tapa(49, 62)}<circle cx="60" cy="108" r="14" fill="url(#plata)" stroke="${O}" stroke-width="2"/>${gema(60, 108, 5)}
    <g transform="translate(26 34)">${brillo}</g>`);

  // 3. Cerro de Siete Colores (Jujuy): cerro de plata con siete franjas de esmalte y un sol de oro
  const franjas = ['#b3261e', '#d9772e', '#e7c15a', '#6f9a4a', '#8a4f8a', '#7a4a2a', '#d99aa8'];
  const sol = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 9 : 13; return `${f1(86 + Math.cos(a) * r)},${f1(30 + Math.sin(a) * r)}`; }).join(' ');
  const cerro = svg('0 0 120 130', `<defs>${plata}<clipPath id="cerroC"><path d="M14,104 L42,50 L54,64 L72,34 L106,104Z"/></clipPath></defs>
    <ellipse cx="60" cy="112" rx="50" ry="7" fill="rgba(0,0,0,.18)"/>
    <polygon points="${sol}" fill="url(#oro)" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/><circle cx="86" cy="30" r="6" fill="#ffe08a" stroke="${O}" stroke-width="1.2"/>
    <path d="M6,108 L42,40 L54,54 L72,22 L114,108Z" fill="url(#plata)" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>
    <g clip-path="url(#cerroC)">${franjas.map((c, i) => `<path d="M0,${58 + i * 7} C30,${50 + i * 7} 50,${66 + i * 7} 80,${56 + i * 7} C96,${51 + i * 7} 110,${58 + i * 7} 120,${54 + i * 7} L120,${62 + i * 7} C110,${66 + i * 7} 96,${59 + i * 7} 80,${64 + i * 7} C50,${74 + i * 7} 30,${58 + i * 7} 0,${66 + i * 7}Z" fill="${c}"/>`).join('')}<path d="M0,40 L120,40" stroke="#fff" stroke-width="0"/></g>
    <path d="M14,104 L42,50 L54,64 L72,34 L106,104Z" fill="none" stroke="${O}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M42,46 L30,70 M72,28 L62,46" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
    ${gema(60, 98, 3.6)}<g transform="translate(40 46)">${brillo}</g>`);

  // el cinto donde se guardan (rastra de cuero con monedas de plata)
  const cinto = svg('0 0 640 120', `<defs>${plata}<pattern id="cuero" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#6b3f22"/><path d="M0,3 L10,4 M2,8 L8,8" stroke="#5a341b" stroke-width=".8"/></pattern></defs>
    <rect x="4" y="34" width="632" height="52" rx="10" fill="url(#cuero)" stroke="${O}" stroke-width="2.6"/>
    <path d="M10,42 L630,42 M10,78 L630,78" stroke="#c9a46a" stroke-width="1.6" stroke-dasharray="5 4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<g transform="translate(${70 + i * 125} 60)"><circle r="34" fill="${i < 3 ? 'url(#plata)' : 'none'}" stroke="${i < 3 ? O : '#c9a46a'}" stroke-width="${i < 3 ? 2.4 : 2}" stroke-dasharray="${i < 3 ? '' : '5 4'}"/>${i < 3 ? cincel(0, 0, 28, 18) + [empanada, acordeon, cerro][i].replace('<svg ', '<svg x="-27" y="-31" width="54" height="58" ') : `<text y="5" font-family="Bree" font-size="14" text-anchor="middle" fill="#c9a46a">?</text>`}</g>`).join('')}`);
  return { empanada, acordeon, cerro, cinto, cincel };
}
