/* eslint-disable no-undef, no-console */
importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true,
});

workboxSW.router.registerNavigationRoute('app-shell.html', {
  whitelist: [/./],
  blacklist: [],
});

workboxSW.router.registerRoute(
  /\/flickr-recents(\/?\?{0}|\/?\?{1}.*)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'flickr-cache',
    cacheExpiration: {
      maxEntries: 10,
    },
    cacheableResponse: { statuses: [0, 200] },
  })
);

self.addEventListener('push', evt => {
  const title = 'Welcome to Web Starter Kit';
  const options = {
    body: evt.data.text(),
  };
  evt.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('fetch', evt => {
  console.log(`Fetching: ${evt.request.url}`);
});

workboxSW.precache(['/app-shell.html']);

// Do not remove! This is a placeholder keyword which Workbox injects
// list of files to cache into the array.
workboxSW.precache([]);
