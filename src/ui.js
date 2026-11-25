// Ayudas para armar pantallas con HTML sobre el escenario de 360 por 760.
// Nunca se mete texto del jugador con innerHTML: para eso está texto().

/** Crea un elemento. Los hijos de texto se agregan como nodos de texto, nunca como HTML. */
export function h(tag, attrs = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v; // solo para arte propio, nunca para texto del jugador
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of hijos.flat()) if (c !== undefined && c !== null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}

/** Posiciona un elemento en coordenadas del escenario. */
export const en = (el, x, y, w, alto) => { Object.assign(el.style, { position: 'absolute', left: `${x}px`, top: `${y}px`, width: w ? `${w}px` : undefined, height: alto ? `${alto}px` : undefined }); return el; };

export const boton = (txt, { color = 'naranja', tam = 'grande', onclick, tipo = 'button', id } = {}) => h('button', { class: `boton boton-${color} boton-${tam}`, type: tipo, onclick, id }, txt);

/** Botón Volver de la cabecera (oscuro sobre el cielo, claro sobre el cuero). */
export const volver = (onclick, claro = false) => h('button', { class: `volver${claro ? ' volver-claro' : ''}`, type: 'button', onclick, 'aria-label': 'Volver' }, h('span', { html: '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#7a4a2a" stroke="#2a1c15" stroke-width="2"/><path d="M22,10 L13,18 L22,26" stroke="#fbf3e2" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>' }), h('b', {}, 'Volver'));

export const cabecera = (titulo, onVolver, claro = false) => h('header', { class: `cabecera${claro ? ' cabecera-clara' : ''}` }, volver(onVolver, claro), h('h1', {}, titulo));

export const papel = (y, alto, ...hijos) => en(h('div', { class: 'papel' }, ...hijos), 18, y, 324, alto);

export function campo(etiqueta, attrs = {}) {
  const input = h('input', { class: 'campo', autocomplete: 'off', spellcheck: 'false', ...attrs });
  return { el: h('label', { class: 'etiqueta' }, h('span', {}, etiqueta), input), input };
}

/** Aviso corto que aparece arriba y se va solo. */
export function aviso(escenario, txt, { tipo = 'info', ms = 2400 } = {}) {
  const a = h('div', { class: `aviso aviso-${tipo}`, role: 'status' }, txt);
  escenario.append(a);
  setTimeout(() => a.classList.add('aviso-fuera'), ms);
  setTimeout(() => a.remove(), ms + 400);
}
