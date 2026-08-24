var CACHE='tournament-grid-v4';
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
  var req=e.request;
  if(req.method!=='GET')return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(function(r){
      var copy=r.clone();caches.open(CACHE).then(function(c){c.put('./index.html',copy)});return r;
    })['catch'](function(){return caches.match('./index.html')}));
    return;
  }
  e.respondWith(caches.match(req).then(function(hit){
    if(hit)return hit;
    return fetch(req).then(function(r){
      var copy=r.clone();caches.open(CACHE).then(function(c){c.put(req,copy)});return r;
    })['catch'](function(){return caches.match('./index.html')});
  }));
});
