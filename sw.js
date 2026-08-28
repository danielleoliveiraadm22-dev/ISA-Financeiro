// ---------------------------------------------------------------
// sw.js — faz o app abrir mesmo sem internet.
// IMPORTANTE: ao publicar uma versão nova do index.html,
// troque o número da versão abaixo (v1 -> v2 -> v3...).
// ---------------------------------------------------------------
const VERSAO = 'financeiro-v9';

const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', evento => {
  self.skipWaiting();
  evento.waitUntil(
    caches.open(VERSAO).then(cache =>
      // addAll falha inteiro se um item falhar; add individual é mais tolerante
      Promise.allSettled(ESSENCIAIS.map(url => cache.add(url)))
    )
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evento => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Nunca cachear chamadas do Google (API e login) — precisam ser sempre ao vivo
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('googleusercontent.com') ||
      url.hostname.includes('google.com') ||
      url.hostname.includes('gstatic.com')) {
    return;
  }

  // Rede primeiro, cache como reserva.
  // Assim o app sempre pega a versão mais nova quando há internet,
  // e continua abrindo quando não há.
  evento.respondWith(
    fetch(req)
      .then(resposta => {
        if (resposta && resposta.status === 200 && resposta.type === 'basic') {
          const copia = resposta.clone();
          caches.open(VERSAO).then(c => c.put(req, copia)).catch(() => {});
        }
        return resposta;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
