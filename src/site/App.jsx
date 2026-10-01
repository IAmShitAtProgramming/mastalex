import { ROUTES } from './data.js'
import { Breadcrumbs, Footer, Header } from './ui.jsx'
import Home from './pages/Home.jsx'
import { Cennik, Kontakt, NotFound, ONas, Polityka, Przebudowa, Seo, Sklep, Tworzenie } from './pages/Pages.jsx'
import { Poradniki, WpisIleKosztuje, WpisWyzejWGoogle } from './pages/Poradniki.jsx'

const PAGES = {
  '/': Home,
  '/tworzenie-stron-internetowych': Tworzenie,
  '/tworzenie-sklepow-internetowych': Sklep,
  '/przebudowa-strony-internetowej': Przebudowa,
  '/optymalizacja-seo': Seo,
  '/cennik-stron-internetowych': Cennik,
  '/o-nas': ONas,
  '/kontakt': Kontakt,
  '/polityka-prywatnosci': Polityka,
  '/poradniki/': Poradniki,
  '/poradniki/jak-byc-wyzej-w-google': WpisWyzejWGoogle,
  '/poradniki/ile-kosztuje-strona-internetowa': WpisIleKosztuje,
}

// Działy (np. /poradniki/) mają adres z ukośnikiem na końcu, pozostałe podstrony bez.
export function normalize(path) {
  const p = (path || '/').replace(/\.html$/, '').replace(/\/index$/, '/').replace(/\/+$/, '') || '/'
  return ROUTES[`${p}/`] ? `${p}/` : p
}

export default function App({ path }) {
  const Page = PAGES[path] || NotFound
  return (
    <>
      <a href="#tresc" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary btn-sm">Przejdź do treści</a>
      <Header path={path} />
      <main id="tresc">
        {path !== '/' && ROUTES[path] && <Breadcrumbs path={path} />}
        <Page />
      </main>
      <Footer />
    </>
  )
}
