import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { normalize } from './App.jsx'
import { NOT_FOUND, ROUTES } from './data.js'

// Tylko podgląd lokalny (npm run dev): nie ma prerenderu, więc stronę rysuje React w przeglądarce.
export function mount(root) {
  const path = normalize(window.location.pathname)
  createRoot(root).render(<StrictMode><App path={path} /></StrictMode>)
  document.title = (ROUTES[path] || NOT_FOUND).title
}
