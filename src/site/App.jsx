import { REDIRECTS, ROUTES } from './data.js'
import { Breadcrumbs, Footer, Header } from './ui.jsx'
import Home from './pages/Home.jsx'
import { Audyt, AudytOdstapienie, AudytPolityka, AudytRegulamin } from './pages/Audyt.jsx'
import { Cennik, Kontakt, NotFound, ONas, Polityka, Przebudowa, Seo, Sklep, Tworzenie } from './pages/Pages.jsx'
import { Poradniki, WpisIleKosztuje, WpisWyzejWGoogle, WpisStrona500, WpisWyborFirmy } from './pages/Poradniki.jsx'

const PAGES = {
  '/': Home,
  '/strony-internetowe-od-500-zl': Tworzenie,
  '/tworzenie-sklepow-internetowych': Sklep,
  '/przebudowa-strony-internetowej': Przebudowa,
  '/optymalizacja-seo': Seo,
  '/cennik-tworzenia-stron-internetowych-2026': Cennik,
  '/o-nas': ONas,
  '/kontakt': Kontakt,
  '/polityka-prywatnosci': Polityka,
  '/audyt-seo/': Audyt,
  '/audyt-seo/regulamin': AudytRegulamin,
  '/audyt-seo/polityka-prywatnosci': AudytPolityka,
  '/audyt-seo/formularz-odstapienia': AudytOdstapienie,
  '/poradniki/': Poradniki,
  '/poradniki/jak-byc-wyzej-w-google': WpisWyzejWGoogle,
  '/poradniki/ile-kosztuje-strona-internetowa-2026': WpisIleKosztuje,
  '/poradniki/strona-internetowa-od-500-zl': WpisStrona500,
  '/poradniki/najlepsze-firmy-tworzace-strony-internetowe-polska': WpisWyborFirmy,
}

// Działy (np. /poradniki/) mają adres z ukośnikiem na końcu, pozostałe podstrony bez.
export function normalize(path) {
  const p = (path || '/').replace(/\.html$/, '').replace(/\/index$/, '/').replace(/\/+$/, '') || '/'
  const route = REDIRECTS[p] || p
  return ROUTES[`${route}/`] ? `${route}/` : route
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
