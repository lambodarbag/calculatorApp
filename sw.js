const cacheName = "calc-cache-v1";
const assets = [
  "/calculatorApp/",
  "/calculatorApp/index.html",
  "/calculatorApp/style.css",
  "/calculatorApp/script.js",
  "/calculatorApp/manifest.json",
  "/calculatorApp/icon-192.png",
  "/calculatorApp/icon-512.png",
  "/calculatorApp/screenshot-wide.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
