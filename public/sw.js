const CACHE = 'cave-v3';

// Install — precache app shell for instant loading
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => 
      cache.addAll(['/', '/index.html', '/logo.png', '/icon-192.png'])
    )
  );
  self.skipWaiting();
});

// Activate — clean old caches + take control
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch — Cache first for assets, network first for HTML
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip API calls, external requests, non-GET
  if (url.pathname.startsWith('/api/') || e.request.method !== 'GET' || url.origin !== location.origin) return;

  // JS/CSS/images: cache first (instant), update in background
  if (url.pathname.match(/\.(js|css|png|jpg|svg|woff2?)$/)) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const fetchUpdate = fetch(e.request).then(res => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          }).catch(() => null);
          return cached || fetchUpdate;
        })
      )
    );
    return;
  }

  // HTML: network first (get latest), cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(c => c || caches.match('/')))
  );
});
