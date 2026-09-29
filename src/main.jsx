import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { parseRoute } from './App.jsx'

const rootEl = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// index.html is prerendered with the default homepage (premium/home) so crawlers see the content.
// Hydrate it when that is the requested view; otherwise render the requested variant from scratch.
const { style, tab } = parseRoute()
if (rootEl.hasChildNodes() && style === 'premium' && tab === 'home') {
  hydrateRoot(rootEl, app)
} else {
  rootEl.textContent = ''
  createRoot(rootEl).render(app)
}
