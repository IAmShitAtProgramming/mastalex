import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { REDIRECTS, ROUTES } from './data.js'
import { head } from './head.js'

export const routes = Object.keys(ROUTES)
export const redirects = REDIRECTS

// Wywoływane przy budowie (scripts/prerender.mjs) dla każdej podstrony i dla 404.
export function render(path) {
  return { html: renderToString(<App path={path} />), head: head(path) }
}
