if (navigator.serviceWorker) {

    navigator.serviceWorker.register('./sw.js', {scope: './'}).then(function (registration) {
        "use strict";
        console.log("Service Worker Registered", registration);
    })
        .catch(function (err) {
            "use strict";
            console.log("Service Worker Failed to Register", err);
        });
}
