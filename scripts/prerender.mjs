// Renderuje każdą podstronę do osobnego pliku HTML, żeby wyszukiwarki i roboty AI dostawały
// pełną treść bez uruchamiania JavaScriptu. Tworzy też 404.html (noindex) i sitemap.xml.
// GitHub Pages serwuje /optymalizacja-seo z pliku optymalizacja-seo.html (bez ukośnika na końcu).
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://mastalex.pl'
const dist = path.resolve('dist')
const { render, routes, redirects } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const mark of ['<!--app-head-->', '<div id="root"></div>']) {
  if (!template.includes(mark)) throw new Error(`prerender: brak ${mark} w dist/index.html`)
}

// Polska typografia: linia nie kończy się spójnikiem ani słowem jednoliterowym (a, i, o, u, w, z),
// a myślnik nie zaczyna nowej linii. Twarda spacja skleja je z następnym słowem. Zmieniamy tylko tekst
// między znacznikami (nie atrybuty ani skrypty); w produkcji przeglądarka nie uruchamia Reacta, więc to bezpieczne.
const SPOJNIKI = 'a|i|o|u|w|z|oraz|lub|albo|bądź|czy|ale|lecz|ani|bo|gdyż|więc|zatem|czyli|niż|jak|że|żeby|aby|by|gdy|kiedy|jeśli|jeżeli|zanim|aż|choć|chociaż|ponieważ'
const NBSP = ' '
const glue = (text) => text
  .replace(new RegExp(`(?<=^|[\\s(„"—–])(${SPOJNIKI})\\s+`, 'giu'), `$1${NBSP}`)
  .replace(/(?<=(?:^|\s)(?:od|do|ok\.))\s+(?=\d)/giu, NBSP)
  .replace(/(?<=\d)\s+(?=\p{L})/gu, NBSP)
  .replace(/\s+(?=[—–]\s)/gu, NBSP)
  .replace(/(?<=^|[\s(„"])e-(?=\p{L})/giu, 'e-⁠') // „e-mail” nie łamie się po „e-”
const typografia = (html) => html
  .replace(/<!-- -->/g, '')
  .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/)
  .map((part) => (part.startsWith('<') ? part : glue(part)))
  .join('')

function page(route, { html, head } = render(route)) {
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root" data-path="${route}">${typografia(html)}</div>`)
}

// lastmod = dzień ostatniej istotnej zmiany podstrony, a nie dzień budowania (Google bierze lastmod pod uwagę,
// tylko gdy jest zgodny z prawdą). Odcisk obejmuje treść, linki i dane strukturalne; pomija klasy CSS i rok w stopce,
// więc zmiana wyglądu albo nowy rok nie przesuwają daty. Stan trzymamy w scripts/lastmod.json (do commita).
const LASTMOD = path.resolve('scripts/lastmod.json')
const known = fs.existsSync(LASTMOD) ? JSON.parse(fs.readFileSync(LASTMOD, 'utf8')) : {}
const fingerprint = ({ html, head }) =>
  crypto.createHash('sha256').update(head + html.replace(/ class="[^"]*"/g, '').replace(/©\s*\d{4}/g, '')).digest('hex')

const today = new Date().toISOString().slice(0, 10)
const lastmod = {}
for (const route of routes) {
  const rendered = render(route)
  const hash = fingerprint(rendered)
  lastmod[route] = known[route]?.hash === hash ? known[route] : { hash, date: today }
  // /poradniki/ -> poradniki/index.html, /poradniki/wpis -> poradniki/wpis.html
  const file = route.endsWith('/') ? `${route.slice(1)}index.html` : `${route.slice(1)}.html`
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true })
  fs.writeFileSync(path.join(dist, file), page(route, rendered))
  console.log(`prerender: ${route} -> dist/${file} (lastmod ${lastmod[route].date})`)
}
fs.writeFileSync(LASTMOD, `${JSON.stringify(lastmod, null, 2)}\n`)
fs.writeFileSync(path.join(dist, '404.html'), page('/404'))

// GitHub Pages nie ma konfiguracji przekierowań HTTP. Stare pliki kierują do nowych adresów
// przez location.replace (z zachowaniem parametrów i kotwicy) oraz meta refresh jako fallback.
for (const [oldPath, newPath] of Object.entries(redirects)) {
  if (!routes.includes(newPath) || routes.includes(oldPath)) throw new Error(`prerender: błędne przekierowanie ${oldPath}`)
  const html = `<!doctype html>
<html lang="pl"><head><meta charset="UTF-8">
<title>Nowy adres strony | Mastalex</title>
<link rel="canonical" href="${SITE}${newPath}">
<meta http-equiv="refresh" content="0;url=${newPath}">
<script>location.replace(${JSON.stringify(newPath)} + location.search + location.hash)</script>
</head><body><p>Ta strona ma nowy adres. <a href="${newPath}">Przejdź do strony</a>.</p></body></html>`
  const file = path.join(dist, `${oldPath.slice(1)}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerender: przekierowanie ${oldPath} -> ${newPath}`)
}

const urls = routes.map((r) => `  <url><loc>${SITE}${r}</loc><lastmod>${lastmod[r].date}</lastmod></url>`)
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: ${routes.length} podstron + 404.html + sitemap.xml`)
