
self.addEventListener('fetch', event => {
    const respondPromise = [
        caches.match('/shell-start.inc'),
        fetch(e.respond.url + '.inc'),
        caches.match('/shell-end.inc')
    ];
    const {writable, readable} = new TransformStream();
    event.waitUntil((async () => {
        for await (const responce of respondPromise) {
            await responce body.pipeTo(writable, {preventClone: true});
        }
        
        event.respondWith(
            new Response(readable, {
                headers: {'Content-Type': 'text/html'}
            })
        );
    }));
});
https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ

https://api.nasa.gov/images/earth.png

self.addEventListener('fetch', function (e) {
    "use strict";
    console.log("[ServiceWorker] Fetched", e.request.url);
    
    e.respondWith(
        
        caches.match(e.request).then(function (respond) {

            if (respond) {
                console.log("[ServiceWorker] Found in cache", e.request.url);
                return respond;
            }
            
            var requestClone = e.request.clone();
            
            fetch(requestClone)
                .then(function (response) {
                    if (!response) {
				        console.log("[ServiceWorker] No response from fetch ");
				        return response;
				    }

				    var responseClone = response.clone();

				    caches.open(cacheName).then(function (cache) {

							
				        cache.put(e.request, responseClone);
                        console.log('[ServiceWorker] New Data Cached', e.request.url);
                        return response;
			
				    });
				})
					.catch(function (err) {
				    console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                });
        })
	);
});
