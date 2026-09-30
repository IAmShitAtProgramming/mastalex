import { enhanceForms } from './form.js'
import './site.css'

// Produkcja: cały HTML powstaje przy budowie (scripts/prerender.mjs), więc przeglądarka nie pobiera Reacta.
// Jedyny skrypt to obsługa formularza. Menu mobilne i FAQ działają na <details>, bez JavaScriptu.
enhanceForms()

const root = document.getElementById('root')
if (import.meta.env.DEV && !root.hasChildNodes()) import('./dev.jsx').then((m) => m.mount(root))
