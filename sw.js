/**
 * Service Worker
 * @author Bruno Politi Romero
 */

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log("Instalando o Service Worker...", event)
    // Pré carregamento em cache
    event.waitUntil(
        // Armazenar em cache:
        caches.open('static')
            .then((cache) => {
                console.log("Pré carregamento dos arquivos do app")
                cache.add('/etagas/')
                cache.add('/etagas/index.html')
                cache.add('/etagas/style.css')
                cache.add('/etagas/app.js')
                cache.add('/etagas/img/flex.png')
                cache.add('/etagas/img/calcflex.png')
                cache.add('/etagas/img/etanol.png')
                cache.add('/etagas/img/gasolina.png')
            })
    )
})

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log("Ativando o Service Worker...", event)
    return self.clients.claim() // Garantir o serviço em todos os documentos do aplicativo
})

// Escutando requisições "buscando algo"
self.addEventListener('fetch', (event) => {
    // console.log("Buscando algo...", event)
    // Armazenar em cache(arquivos estáticos pré-carregados) todas as requisições
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})