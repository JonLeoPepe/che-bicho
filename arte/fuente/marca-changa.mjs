// Señal de changa aprobada (lote 21a, opción D): fogón prendido con humo junto al changuero.
// Sin changa (o con la changa para cobrar) el fogón queda apagado: piedras y leña negra, sin llama ni humo.
import { O } from './catalogo-29.mjs';

const INK = '#5a3a22';

export const fogon = (x, y, s = 1, prendido = true) => {
  const piedras = [-10, -4, 3, 9].map((dx) => `<ellipse cx="${dx}" cy="0" rx="5" ry="3" fill="#948a78" stroke="${O}" stroke-width="1"/>`).join('');
  const lena = `<path d="M-8,-2 L8,-3 M-6,-6 L7,-6" stroke="${prendido ? '#6b4a2e' : '#3a3430'}" stroke-width="3" stroke-linecap="round"/>`;
  if (!prendido) return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="15" ry="4" fill="#000" opacity=".12"/>${piedras}${lena}<ellipse cx="0" cy="-3" rx="5" ry="1.6" fill="#8a8478" opacity=".7"/></g>`;
  const llama = `<g class="llama"><path d="M-5,-4 C-6,-12 -1,-14 0,-22 C3,-14 7,-12 5,-4Z" fill="#f2a83a" stroke="${O}" stroke-width="1.2"/><path d="M-2,-5 C-2,-10 0,-12 1,-15 C2,-11 3,-9 2,-5Z" fill="#ffe08a"/></g>`;
  const humo = [0, 1, 2].map((i) => `<circle class="humo" style="animation-delay:${i * 1.1}s" cx="0" cy="-26" r="4" fill="#d8d4cc" opacity="0"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="15" ry="4" fill="#000" opacity=".12"/><circle cx="0" cy="-8" r="16" fill="#ffd27a" opacity=".22"/>${piedras}${lena}${llama}${humo}</g>`;
};

// Ícono de la carta antigua: llamita a tinta sobre dos leños.
export const fogonI = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-7,1 L7,0 M-5,-2 L6,-3" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/><path d="M-4,-2 C-5,-8 -1,-10 0,-16 C2,-10 6,-8 4,-2Z" fill="#e8892a" stroke="${INK}" stroke-width="1.1" stroke-linejoin="round"/><path d="M-1,-3 C-1,-7 0,-8 1,-10 C2,-7 2,-6 1,-3Z" fill="#ffd27a"/></g>`;

// Animaciones que necesita el fogón (sumar al CSS de cada página que lo use).
export const cssFogon = `.humo{animation:humo 3.3s ease-out infinite}@keyframes humo{0%{opacity:0;transform:translate(0,0)}20%{opacity:.8}100%{opacity:0;transform:translate(6px,-30px) scale(2)}}.llama{animation:llama .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:bottom}@keyframes llama{to{transform:scaleY(1.15)}}`;
