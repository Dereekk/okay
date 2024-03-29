(global => {
    'use strict';
  
    // Load the sw-toolbox library.
    importScripts('sw-toolbox/sw-toolbox.js');
    
    // Ensure that our service worker takes control of the page as soon as possible.
    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
    toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
        cache: {
          name: 'nasa',
          maxEntries: 10,
          maxAgeSeconds: 86400
        },
        origin: /\.nasa\.gov$/
      });
      toolbox.router.get('/', global.toolbox.cacheFirst, {
        cache: {
          name: 'index',
          maxEntries: 10,
          maxAgeSeconds: 86400
        },
        origin: /\$/
      });
    toolbox.precache([ 'index.html', 'css/style.css', 'js/app.js', 'js/detabinator.js', 'js/side-Nav.js', 'js/nasa.js' ]);
  })(self);