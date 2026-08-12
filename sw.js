// كل تحديث حقيقي للتطبيق يتطلب تغيير هذا الرقم (مثلاً v2, v3...)
// هذا يضمن أن كل الأجهزة تحصل تلقائيًا على أحدث نسخة من الكود
// عند فتح التطبيق التالي، بدل أن تبقى عالقة على نسخة قديمة مخزّنة.
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'driver-cards-' + CACHE_VERSION;

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// شبكة أولًا لملف الصفحة الرئيسية (index.html) — يضمن دائمًا أحدث نسخة من كود التطبيق
// عند توفر الإنترنت، ويستخدم النسخة المخزّنة فقط عند انقطاع الاتصال.
// أما الملفات الثابتة (أيقونات) فتُقرأ من الكاش أولًا لأنها لا تتغيّر تقريبًا.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
  } else {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
  }
});
