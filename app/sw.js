//importScripts('/cache-polyfill.js');

const version = 'v1::';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(`${version}codestar`)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html'
        ]);
      })
  );
});


self.addEventListener('fetch', function(event) {
  const requestURL = new URL(event.request.url);

  if (event.request.method !== 'GET') {
    return;
  }
  // else if(requestURL.hostname) {
  //   console.log(requestURL.hostname);
  // }

  event.respondWith(
    caches
      .match(event.request)
      .then(cached => {
        const networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);

        return cached || networked;

        function fetchedFromNetwork(response) {
          const cacheCopy = response.clone();

          caches
            .open(version + 'pages')
            .then(function add(cache) {
              cache.put(event.request, cacheCopy);
            });
          return response;
        }

        function unableToResolve () {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});