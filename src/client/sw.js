importScripts('workbox-sw.prod.v2.1.2.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true,
});

self.addEventListener('push', function (evt) {
  const title = 'Welcome to Web Starter Kit';
  const options = {
    body: evt.data.text(),
  };
  evt.waitUntil(self.registration.showNotification(title, options));
});

// Do not remove! This is a placeholder keyword which Workbox injects
// list of files to cache into the array.
workbox.precache([]);
