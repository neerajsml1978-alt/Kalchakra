const CACHE_NAME = 'hwjh-calendar-v3'; // <--- यहाँ वर्जन बदलते रहें!

self.addEventListener('install', (event) => {
  self.skipWaiting(); // नया वर्कर आते ही पुराना हट जाए
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['./', './index.html', './style.css', './script.js']);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // पुराना कैश डिलीट करें
          }
        })
      );
    })
  );
  return self.clients.claim(); // नए वर्कर का कंट्रोल तुरंत लें
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // नेटवर्क से नई फाइल लाएं
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // अगर कैश में है तो दिखाएं, वरना नेटवर्क का इंतज़ार करें
      return cachedResponse || fetchPromise;
    })
  );
});
