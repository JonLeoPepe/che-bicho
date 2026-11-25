// Service worker: el juego funciona sin internet después de la primera carga.
// La versión la completa la publicación automática con el commit; cada versión nueva usa un caché nuevo.
const VERSION = '__VERSION__';
const CACHE = `che-bicho-${VERSION}`;
const BASE = ['./', 'index.html', 'estilos.css', 'manifest.webmanifest', 'icono.svg', 'icono-192.png', 'icono-512.png',
  'fuentes/bree-serif-400.woff2', 'fuentes/caveat-700.woff2', 'fuentes/nunito-400.woff2', 'fuentes/nunito-800.woff2', 'src/main.js'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('che-bicho-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Red primero (para recibir las versiones nuevas) y, sin conexión, lo guardado.
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => {
    if (r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))));
});
