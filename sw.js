/* Trader Drill service worker — cache-first, offline-capable.
   Bump CACHE_VERSION whenever index.html changes so clients refresh. */
const CACHE_VERSION = "trader-drill-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

// Pre-cache the shell on install.
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Drop stale caches on activate.
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first: serve from cache, fall back to network, then cache the result.
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(hit => {
      if (hit) return hit;
      return fetch(event.request).then(resp => {
        if (resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, copy));
        }
        return resp;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
