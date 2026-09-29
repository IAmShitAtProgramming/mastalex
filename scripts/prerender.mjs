// Injects the server-rendered homepage into dist/index.html so search engines and AI crawlers
// get the full text without running JavaScript. Runs after `vite build` and `vite build --ssr`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrEntry = path.resolve('dist-ssr/entry-server.js')
const placeholder = '<div id="root"></div>'

const { render } = await import(pathToFileURL(ssrEntry).href)
const indexPath = path.join(dist, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')
if (!html.includes(placeholder)) throw new Error(`prerender: ${placeholder} not found in dist/index.html`)

const appHtml = render()
fs.writeFileSync(indexPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`))
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`prerender: dist/index.html (+${(appHtml.length / 1024).toFixed(1)} kB HTML)`)
