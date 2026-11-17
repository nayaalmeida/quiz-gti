/* Service worker do Quiz GTI: deixa o app funcionar offline.
   Estratégia: tenta a rede primeiro (para você sempre ver a versão nova)
   e, se estiver sem internet, usa a cópia guardada. */
var VERSAO = "quizgti-v10";
var NUCLEO = [
  "./", "index.html", "styles.css", "app.js", "questoes.js",
  "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png",
  "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/og.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(NUCLEO); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== VERSAO; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  if (url.origin === self.location.origin) {
    // rede primeiro, cópia guardada se estiver offline
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) { var copia = res.clone(); caches.open(VERSAO).then(function (c) { c.put(req, copia); }); }
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (r) {
          return r || (req.mode === "navigate" ? caches.match("index.html") : Response.error());
        });
      })
    );
    return;
  }

  // fontes do Google: usa a guardada e atualiza em segundo plano
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(
      caches.open(VERSAO).then(function (c) {
        return c.match(req).then(function (r) {
          var rede = fetch(req).then(function (res) { c.put(req, res.clone()); return res; }).catch(function () { return r; });
          return r || rede;
        });
      })
    );
  }
});
