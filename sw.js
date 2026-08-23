var CACHE='tournament-grid-v1';
var ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches['delete'](k)}));
  }).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(hit){
    if(hit)return hit;
    return fetch(e.request).then(function(r){
      var copy=r.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,copy)});
      return r;
    })['catch'](function(){return caches.match('./index.html')});
  }));
});
