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
