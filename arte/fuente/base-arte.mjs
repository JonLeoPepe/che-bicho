// Utilidades comunes de los catálogos de diseño.
import { readFileSync } from 'node:fs';
export const O = '#2a1c15';
export const L = (w = 3) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
let uid = 0;
export const nuevoId = (p = 'i') => p + uid++;
export const svg = (vb, c) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;
export const sombra = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx / 11).toFixed(1)}" fill="rgba(40,25,10,.2)"/>`;
export const clip = (id, d) => `<clipPath id="${id}"><path d="${d}"/></clipPath>`;
export const ojoAlm = (cx, cy, w, h, iris, pupila = 'redonda') => {
  const k = nuevoId('o');
  const d = `M${cx - w},${cy} C${cx - w * 0.5},${cy - h * 1.3} ${cx + w * 0.6},${cy - h * 1.3} ${cx + w},${cy - h * 0.2} C${cx + w * 0.4},${cy + h} ${cx - w * 0.5},${cy + h} ${cx - w},${cy}Z`;
  const pup = pupila === 'vertical' ? `<ellipse cx="${cx + 0.3}" cy="${cy}" rx="${(h * 0.28).toFixed(1)}" ry="${(h * 0.9).toFixed(1)}" fill="#1b120e"/>` : pupila === 'horizontal' ? `<ellipse cx="${cx}" cy="${cy}" rx="${(w * 0.45).toFixed(1)}" ry="${(h * 0.32).toFixed(1)}" fill="#1b120e"/>` : `<circle cx="${cx + 0.3}" cy="${cy}" r="${(h * 0.6).toFixed(1)}" fill="#1b120e"/>`;
  return `<g class="ojo"><defs><clipPath id="${k}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="#f4e7c6"/><g clip-path="url(#${k})"><circle cx="${cx + 0.3}" cy="${cy}" r="${(h * 1.05).toFixed(1)}" fill="${iris}"/>${pup}<circle cx="${cx + w * 0.3}" cy="${cy - h * 0.45}" r="${(h * 0.3).toFixed(1)}" fill="#fff"/></g><path d="M${cx - w - 0.5},${cy} C${cx - w * 0.5},${cy - h * 1.35} ${cx + w * 0.6},${cy - h * 1.35} ${cx + w + 0.6},${cy - h * 0.2}" ${L(2.2)} fill="none"/></g>`;
};
const F = (p) => readFileSync('/tmp/fx/node_modules/@fontsource/' + p).toString('base64');
export const COLOR_TIPO = { Fuego: '#c8461e', Flora: '#4f8a2e', Agua: '#2f7fb8', Tierra: '#8a5a2a', Común: '#7a7466', Viento: '#5f8fa6', Hielo: '#5aa0c8', Veneno: '#7a3f8a', Roca: '#8a7a62', Rayo: '#c9a020', Mito: '#3a2a4a' };
export const tarjeta = (cod, nom, ant, tipo, tag, dib, txt) => `<figure class="ficha"><span class="cod">${cod}</span><div class="lienzo">${svg('0 0 200 200', dib)}</div><figcaption><b>${nom}</b><span class="tipo" style="background:${COLOR_TIPO[tipo]}">${tipo}</span><span class="tag">${tag}</span><small>hoy: ${ant}</small><p>${txt}</p></figcaption></figure>`;
export function pagina(titulo, sub, cuerpo, cssExtra = '') {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>¡Che, Bicho! — ${titulo}</title><style>
@font-face{font-family:Bree;src:url(data:font/woff2;base64,${F('bree-serif/files/bree-serif-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Caveat;font-weight:700;src:url(data:font/woff2;base64,${F('caveat/files/caveat-latin-700-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:400;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:Nunito;font-weight:800;src:url(data:font/woff2;base64,${F('nunito/files/nunito-latin-800-normal.woff2')}) format('woff2')}
*{box-sizing:border-box}body{margin:0;background:#f4eee3;color:${O};font:16px/1.5 Nunito,system-ui,sans-serif}
header{background:#2b2420;color:#f4eee3;padding:24px 18px 18px;text-align:center;border-bottom:6px solid #a42a2a}header h1{font:28px/1.1 Bree,serif;margin:0 0 6px}header p{margin:0;opacity:.85;font-size:14px}
main{max-width:1000px;margin:0 auto;padding:6px 14px 50px}section{margin:24px 0}
.linea{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}.linea h3{grid-column:1/-1;margin:6px 0 -4px;font:19px Bree,serif}
@media (max-width:720px){.linea{grid-template-columns:1fr 1fr}.linea .ficha:first-of-type{grid-column:1/-1}}
.ficha{position:relative;margin:0;background:#fff;border:2px solid #e2d6c2;border-radius:16px;overflow:hidden}.cod{position:absolute;top:8px;left:8px;background:${O};color:#fff;font:800 12px Nunito;padding:2px 8px;border-radius:99px;z-index:2}
.lienzo{background:radial-gradient(circle at 50% 75%,#efe2c8,#e3d2b2 70%);padding:4px}.lienzo svg{display:block;width:100%;height:auto;max-height:230px}
figcaption{padding:8px 12px 12px}figcaption b{font:19px Bree,serif;font-weight:400;margin-right:6px}figcaption small{display:block;color:#8a7a6a;font-size:12px}figcaption p{margin:4px 0 0;font-size:13.5px;color:#5a4a3a}
.tipo,.tag{display:inline-block;font:800 11px Nunito;color:#fff;padding:2px 8px;border-radius:99px;vertical-align:3px;margin-right:4px}.tag{background:#6a5a4a}
.como{background:#fff;border:2px dashed #c9b79a;border-radius:14px;padding:12px 14px;font-size:14.5px}
@keyframes respira{0%,100%{transform:scale(1,1)}50%{transform:scale(1.012,1.03)}}@keyframes cola{0%,100%{transform:rotate(0)}50%{transform:rotate(-6deg)}}@keyframes cabeza{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@keyframes parpadeo{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}@keyframes viento{to{stroke-dashoffset:-60}}
.respira{animation:respira 3.2s ease-in-out infinite;transform-box:view-box}.cola{animation:cola 2.6s ease-in-out infinite;transform-box:view-box}.cabeza{animation:cabeza 4.5s ease-in-out infinite;transform-box:view-box}
.ojo{animation:parpadeo 4.8s infinite;transform-box:fill-box;transform-origin:center}.viento path{stroke-dasharray:14 10;animation:viento 2.4s linear infinite}
${cssExtra}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body><header><h1>${titulo}</h1><p>${sub}</p></header><main>${cuerpo}</main></body></html>`;
}
