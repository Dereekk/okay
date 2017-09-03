'use strict';
if (navigator.serviceWorker) {
    
      navigator.serviceWorker.register('./sw-v2.js', { scope: './' }).then(function(registration) {
          console.log("Service Worker Registered");
        })
        .catch(function(err) {
          console.log("Service Worker Failed to Register", err);
        })
    
    }
    
