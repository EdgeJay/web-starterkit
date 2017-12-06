importScripts('workbox-sw.prod.v2.1.2.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true,
});

workbox.router.registerRoute(
  /\/flickr-recents(\/?\?{0}|\/?\?{1}.*)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'flickr-cache',
    cacheExpiration: {
      maxEntries: 10,
    },
    cacheableResponse: {statuses: [0, 200]},
  }),
);

self.addEventListener('push', function (evt) {
  const title = 'Welcome to Web Starter Kit';
  const options = {
    body: evt.data.text(),
  };
  evt.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('fetch', function (evt) {
  console.log('Fetching: ' + evt.request.url);
});

// Do not remove! This is a placeholder keyword which Workbox injects
// list of files to cache into the array.
workbox.precache([]);
