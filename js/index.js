if(navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw_3.js')
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}