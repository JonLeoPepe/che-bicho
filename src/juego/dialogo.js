// Diálogo R2 (lote 15a): busto asomado a la izquierda y caja de texto abajo. Se saltea tocando.
// Nunca hay globos sobre la cabeza. El texto va con textContent (nunca innerHTML).
import { h, en } from '../ui.js';
import { voz, sonar } from './sonido.js';

const O = '#2a1c15';
let nclip = 0;
export const busto = (dib, w = 132, alto = 150, s = 2.1, cx = 60, cy = 38) => { const id = `bu${nclip++}`; return `<svg viewBox="0 0 ${w} ${alto}" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="${id}"><rect width="${w}" height="${alto}" rx="10"/></clipPath></defs><g clip-path="url(#${id})"><rect width="${w}" height="${alto}" fill="#e9d9b8"/><g transform="translate(${w / 2 - cx * s} ${alto * 0.52 - cy * s}) scale(${s})">${dib}</g></g><rect width="${w}" height="${alto}" rx="10" fill="none" stroke="${O}" stroke-width="2.6"/></svg>`; };

/** Parte un texto largo en páginas de hasta 2 líneas de unos 40 caracteres. */
export function paginar(txt, porLinea = 40) {
  const pal = String(txt).split(/\s+/); const lineas = []; let l = '';
  for (const w of pal) { if ((l + ' ' + w).trim().length > porLinea && l) { lineas.push(l); l = w; } else l = (l + ' ' + w).trim(); }
  if (l) lineas.push(l);
  const pag = []; for (let i = 0; i < lineas.length; i += 2) pag.push(lineas.slice(i, i + 2).join('\n'));
  return pag;
}

/**
 * Muestra un diálogo sobre la pantalla p. o: { quien, dibujo, lineas: [..], opciones: [[texto, accion, color]], tono, tonada, detalle }
 * Devuelve una promesa que se resuelve con la opción elegida (o null si se cerró sin opciones).
 */
export function dialogo(p, o) {
  return new Promise((resolver) => {
    const paginas = o.lineas.flatMap((l) => paginar(l));
    let i = 0;
    const capa = h('div', { class: 'dialogo' });
    const fondo = en(h('button', { class: 'zona dialogo-fondo', type: 'button', 'aria-label': 'Seguir' }), 0, 0, 360, 760);
    const bu = en(h('div', { class: 'dialogo-busto', html: busto(o.dibujo || '') }), 8, 470, 132, 150);
    const caja = en(h('div', { class: 'dialogo-caja' }), 10, 612, 340, 128);
    const nom = h('p', { class: 'dialogo-nombre' }, o.quien || '');
    const txt = h('p', { class: 'dialogo-texto' });
    const det = h('p', { class: 'dialogo-detalle' });
    const ops = h('div', { class: 'dialogo-opciones' });
    const flecha = h('span', { class: 'dialogo-flecha', 'aria-hidden': 'true', html: '<svg viewBox="0 0 20 14"><path d="M2,2 L10,12 L18,2Z" fill="#7a4a2a"/></svg>' });
    caja.append(nom, txt, det, ops, flecha);
    capa.append(fondo, bu, caja);
    p.append(capa);
    sonar('hablar');
    const cerrar = (v) => { capa.remove(); p.teclasDialogo = null; resolver(v); };
    function mostrar() {
      txt.textContent = paginas[i] || '';
      voz(paginas[i] || '', o.tono || 220, o.tonada || 'salta');
      const ultima = i >= paginas.length - 1;
      ops.replaceChildren(); det.textContent = '';
      flecha.style.display = ultima && o.opciones?.length ? 'none' : '';
      if (ultima && o.detalle) det.textContent = o.detalle;
      if (ultima && o.opciones?.length) {
        for (const [t, accion, color] of o.opciones) {
          const b = h('button', { class: `boton boton-${color || 'verde'} boton-chico`, type: 'button' }, t);
          b.addEventListener('click', (e) => { e.stopPropagation(); cerrar(accion ?? t); });
          ops.append(b);
        }
        requestAnimationFrame(() => ops.querySelector('button')?.focus({ preventScroll: true }));
      }
    }
    function seguir() {
      if (i < paginas.length - 1) { i++; mostrar(); return; }
      if (o.opciones?.length) return;
      cerrar(null);
    }
    fondo.addEventListener('click', seguir);
    caja.addEventListener('click', (e) => { if (!e.target.closest('button')) seguir(); });
    p.teclasDialogo = { Enter: seguir, ' ': seguir, Escape: () => (o.opciones?.length ? cerrar(null) : seguir()) };
    mostrar();
    fondo.focus({ preventScroll: true });
  });
}

/** Aviso chico debajo del HUD (avance de changa y otros), que se va solo. */
export function avisoMapa(p, txt, { ms = 2000 } = {}) {
  const ok = txt.startsWith('✓');
  const a = en(h('div', { class: `aviso-mapa${ok ? ' aviso-ok' : ''}`, role: 'status' }, ok ? txt.slice(1).trim() : txt), 14, 80, 332);
  if (ok) a.prepend(h('span', { class: 'tilde', html: '<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#2f7d5b"/><path d="M5,10 L9,14 L15,6" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' }));
  p.append(a);
  return new Promise((r) => { setTimeout(() => a.classList.add('aviso-fuera'), ms); setTimeout(() => { a.remove(); r(); }, ms + 350); });
}

/** Aviso de avance de changa (lote 24a): dibujo, "Changa de X", qué cuenta, barra y "n de total". */
export function avisoChanga(p, { titulo, sub, dib, n, total }, { ms = 2000 } = {}) {
  const a = en(h('div', { class: 'aviso-mapa aviso-changa', role: 'status' },
    h('span', { class: 'ico', html: dib || '' }),
    h('span', { class: 'txt' }, h('b', {}, titulo), h('small', {}, sub)),
    h('span', { class: 'pista' }, h('i', { style: { width: `${Math.round(100 * n / total)}%` } })),
    h('em', {}, `${n} de ${total}`)), 14, 80, 332);
  p.append(a);
  return new Promise((r) => { setTimeout(() => a.classList.add('aviso-fuera'), ms); setTimeout(() => { a.remove(); r(); }, ms + 350); });
}
