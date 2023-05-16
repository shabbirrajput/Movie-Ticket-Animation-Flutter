'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"main.dart.js": "a92a13795b19391d145d3877b1819cdb",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"assets/FontManifest.json": "d5140871cc5141101b927cc6f80edb02",
"assets/AssetManifest.json": "f2c3a295f68b88e62ffdba1c6c7a26f7",
"assets/NOTICES": "1137c73c119dc8d1e4b2f4de4e077dd7",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/video/mulanclip.mp4": "5690952508203ed185a7d9976640a7fd",
"assets/assets/video/dolittleclip.mp4": "9b98f6e026398feddc60524bbf58e8f4",
"assets/assets/video/blackwidowclip-reflection.mp4": "bc35404caf027451d3eb257ef301177d",
"assets/assets/video/dolittleclip-reflection.mp4": "0a8edc094fb934ae02da7558b121db7f",
"assets/assets/video/mulanclip-reflection.mp4": "28109f7ee75c441dd328dcae473d0c23",
"assets/assets/video/blackwidowclip.mp4": "1284298786700f84b8ed36c6c105f3c1",
"assets/assets/font/OpenSans-Bold.ttf": "1025a6e0fb0fa86f17f57cc82a6b9756",
"assets/assets/font/OpenSans-ExtraBold.ttf": "fb7e3a294cb07a54605a8bb27f0cd528",
"assets/assets/font/OpenSans-Light.ttf": "2d0bdc8df10dee036ca3bedf6f3647c6",
"assets/assets/font/OpenSans-Regular.ttf": "3ed9575dcc488c3e3a5bd66620bdf5a4",
"assets/assets/font/BebasNeue-Regular.ttf": "21bb70b62317f276f2e97a919ff5bd8c",
"assets/assets/font/OpenSans-SemiBold.ttf": "ba5cde21eeea0d57ab7efefc99596cce",
"assets/assets/image/cast/jetli.jpg": "1aede8f854ae49b5458d08fd83edd79c",
"assets/assets/image/cast/selena.jpg": "1cb580952a5305cbf4aec87ef23a9227",
"assets/assets/image/cast/donnie.jpg": "77e383cf91462e5253e63b1e2657703a",
"assets/assets/image/cast/liu.jpg": "aeff2d1ac89a135d18720be7b80852c8",
"assets/assets/image/cast/florance.jpg": "a10cf357b7ca91bc0825aec27b222632",
"assets/assets/image/cast/rami.jpg": "554b2b85fbb830217bc2110b912614cc",
"assets/assets/image/cast/robert.jpg": "997aaca61ae3e1dc515e984270c71f23",
"assets/assets/image/cast/gongli.jpg": "31b1cb01b31f5c24961bffc6319ca04b",
"assets/assets/image/cast/tom.jpg": "0ed251541faec769f4a5604aa3342329",
"assets/assets/image/cast/david.jpg": "eee78efc44e6ce33224c75593bd0188a",
"assets/assets/image/cast/scarlett.jpg": "e353f11cd85ab95cbedcd6becd64affa",
"assets/assets/image/cast/rachel.jpg": "fddc1ea8489682fb4bdc3aa0dc0e839f",
"assets/assets/image/blackwidow.jpg": "35e60442839c768784f138f1b9c0e06d",
"assets/assets/image/dolittle.jpg": "1b4c4319cf5a02e2cd10c98ebd2fe00b",
"assets/assets/image/chair-light.svg": "373e1f17e13257fa06939a2758227fcb",
"assets/assets/image/chair-dark.svg": "a012b73d0f4d3d8a9ea3aaabe75e4154",
"assets/assets/image/blackwidow-text.png": "b373a2584befb8928dda4aa894989996",
"assets/assets/image/dolittle-text.png": "9b7b169c2d6847af0f392250d2f0099c",
"assets/assets/image/mulan.jpg": "9698a413117b6f597250ef6aedfc1c71",
"assets/assets/image/mulan-text.png": "2b013d9e20051326e64d0a0a64bb1faf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"version.json": "378cde2dd93147ff9b5dec8b6ad957ed",
"index.html": "78c7d1a7023938d0f15f18bff2bae8e7",
"/": "78c7d1a7023938d0f15f18bff2bae8e7",
"manifest.json": "ed9a14149154dab777d8d73bd6b8b2d6"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
