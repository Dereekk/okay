if(navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw-v2.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}