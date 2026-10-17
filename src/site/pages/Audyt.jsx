import { AUDYT_PRICE, AUDYT_URL } from '../data.js'
import { AUDYT_DOCS } from '../audyt-docs.js'
import { Faq, PageHero } from '../ui.jsx'

// Strona główna aplikacji Audyt SEO (17.10.2026). Google wymaga jej przy weryfikacji aplikacji: ma opisywać,
// co robi aplikacja i po co prosi o dane z kont Google, oraz linkować tę samą politykę prywatności co ekran zgody.
// Fakty (cena, czas, zakres raportu) są te same co na stronie startowej Aplikacji.

const CONTACT = 'mastalex.kontakt@gmail.com'
const PRIVACY = '/audyt-seo/polityka-prywatnosci'
const TERMS = '/audyt-seo/regulamin'

export function Audyt() {
  return (
    <>
      <PageHero eyebrow="Aplikacja online" title="Audyt SEO" accent="Twojej strony"
        lead={`Sprawdź, co blokuje Twoją stronę w Google. Podajesz adres strony i płacisz ${AUDYT_PRICE} zł. Automatyczny audyt sprawdza publicznie dostępne podstrony witryny i przygotowuje raport z listą poprawek, napisany zrozumiale dla właściciela firmy.`}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={AUDYT_URL} className="btn btn-primary">Zaloguj się i zamów audyt</a>
          <a href="#dane-google" className="btn btn-secondary">Jak używamy danych Google</a>
        </div>
      </PageHero>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10">
        <div className="prose-m">
          <h2 id="co-dostajesz">Co dostajesz</h2>
          <ul>
            <li><strong>Pełny raport</strong> z wynikiem SEO Health Score: technika strony, indeksowanie, treść i dane strukturalne.</li>
            <li><strong>Plan działań</strong>: co poprawić najpierw, żeby strona była lepiej widoczna w wyszukiwarce.</li>
            <li><strong>Raport w PDF</strong> i historia audytów na Twoim koncie.</li>
            <li><strong>Dane z Google, jeśli chcesz</strong>: po podłączeniu konta Google audyt uwzględni Twoje Search Console i Google Analytics 4.</li>
          </ul>

          <h2 id="jak-dziala">Jak działa audyt</h2>
          <ol>
            <li>Zakładasz konto w aplikacji: adresem e-mail albo kontem Google.</li>
            <li>Podajesz adres swojej strony. Jeśli chcesz, podłączasz Search Console i Google Analytics 4.</li>
            <li>Płacisz {AUDYT_PRICE} zł przez Stripe. To cena końcowa i płatność jednorazowa, bez abonamentu.</li>
            <li>Audyt trwa zwykle od kilku do kilkudziesięciu minut. Raport czytasz w aplikacji, pobierasz w PDF i masz go w historii konta.</li>
          </ol>
          <p>Audyt tylko czyta Twoją stronę i Twoje dane. Niczego na stronie nie zmienia i nie publikuje.</p>

          <h2 id="dane-google">Jak używamy danych z kont Google</h2>
          <p>Podłączenie konta Google jest dobrowolne. Audyt działa też bez niego, wtedy korzysta tylko z publicznie dostępnych podstron.</p>
          <ul>
            <li><strong>Google Search Console</strong> (uprawnienie <code>webmasters.readonly</code>, tylko odczyt): lista Twoich witryn, zapytania, wyświetlenia, kliknięcia, średnie pozycje i stan indeksowania wybranej witryny.</li>
            <li><strong>Google Analytics 4</strong> (uprawnienie <code>analytics.readonly</code>, tylko odczyt): lista Twoich usług GA4 i ruch z wyszukiwarek na wybranej stronie.</li>
            <li><strong>Adres e-mail konta Google</strong>: żeby pokazać, które konto jest połączone.</li>
          </ul>
          <p>Tych danych używamy wyłącznie do wykonania audytu, który zlecasz, i do pokazania Ci jego wyników. Nie używamy ich do reklam, nie sprzedajemy ich i nie przekazujemy nikomu poza dostawcami potrzebnymi do wykonania audytu, wymienionymi w polityce prywatności. Token dostępu przechowujemy zaszyfrowany. Konto Google odłączysz w aplikacji jednym przyciskiem albo w <a href="https://myaccount.google.com/permissions" rel="noopener" target="_blank">ustawieniach dostępu konta Google</a>. Po odłączeniu usuwamy token.</p>
          <p>Korzystanie z informacji otrzymanych z interfejsów API Google i ich przekazywanie jest zgodne z <a href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener" target="_blank">Google API Services User Data Policy</a>, w tym z wymogami Limited Use. Szczegóły: <a href={`${PRIVACY}#google`}>Polityka prywatności, punkt 7</a>.</p>

          <h2 id="dokumenty">Dokumenty i kontakt</h2>
          <ul>
            <li><a href={TERMS}>Regulamin aplikacji Audyt SEO</a></li>
            <li><a href={PRIVACY}>Polityka prywatności aplikacji Audyt SEO</a></li>
            <li><a href="/audyt-seo/formularz-odstapienia">Wzór formularza odstąpienia od umowy</a></li>
          </ul>
          <p>Aplikację prowadzi Kosma Mastalerz (mastalex). Kontakt: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>

          <section lang="en" aria-labelledby="in-english">
            <h2 id="in-english">In English</h2>
            <p><strong>Audyt SEO</strong> by mastalex is a paid online tool (PLN {AUDYT_PRICE} per audit) that checks the publicly available pages of a website and produces an SEO report with an action plan. Users may optionally connect their Google account. The app then reads, with read-only access, their Google Search Console data (<code>webmasters.readonly</code>) and Google Analytics 4 data (<code>analytics.readonly</code>) for the site they choose. This data is used only to perform the audit the user orders and to show its results. It is never used for advertising and never sold. Users can disconnect Google at any time.</p>
            <p>Our use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener" target="_blank">Google API Services User Data Policy</a>, including the Limited Use requirements. Privacy policy (Polish): <a href={PRIVACY}>mastalex.pl{PRIVACY}</a>. Contact: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
          </section>
        </div>
      </div>
      <Faq items={[
        { q: 'Czy muszę podłączać konto Google?', a: 'Nie. Bez podłączenia audyt sprawdza publicznie dostępne podstrony Twojej witryny. Dane z Search Console i GA4 dodają do raportu zapytania, kliknięcia i ruch z wyszukiwarki.' },
        { q: 'Czy audyt coś zmienia na mojej stronie?', a: 'Nie. Audyt tylko czyta stronę i dane, do których dajesz dostęp. Poprawki z planu działań wprowadzasz sam albo zlecasz je nam.' },
        { q: 'Ile kosztuje audyt?', a: `${AUDYT_PRICE} zł za jeden audyt. To cena końcowa i płatność jednorazowa przez Stripe, bez abonamentu.` },
      ]} />
    </>
  )
}

// Regulamin, polityka i formularz: treść z Aplikacji (audyt-docs.js), wygląd jak reszta mastalex.pl
function Doc({ title, html }) {
  return (
    <>
      <PageHero eyebrow="Audyt SEO" title={title} />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-4">
        <div className="legal-m" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  )
}

export const AudytRegulamin = () => <Doc title="Regulamin aplikacji Audyt SEO" html={AUDYT_DOCS.regulamin} />
export const AudytPolityka = () => <Doc title="Polityka prywatności aplikacji Audyt SEO" html={AUDYT_DOCS.prywatnosc} />
export const AudytOdstapienie = () => <Doc title="Formularz odstąpienia od umowy" html={AUDYT_DOCS.odstapienie} />
