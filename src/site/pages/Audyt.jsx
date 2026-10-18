import { AUDYT_PRICE, AUDYT_URL } from '../data.js'
import { AUDYT_DOCS } from '../audyt-docs.js'
import { Faq, PageHero } from '../ui.jsx'

// Strona oferty aplikacji Audyt SEO. Google przy weryfikacji aplikacji wymaga od tej strony tylko dwóch rzeczy:
// opisu, co robi aplikacja, i linku do polityki prywatności w tej samej domenie (developers.google.com,
// „Brand verification”, Home page requirements). Szczegóły o danych z kont Google są w samej polityce.

const PRIVACY = '/audyt-seo/polityka-prywatnosci'
const TERMS = '/audyt-seo/regulamin'

export function Audyt() {
  return (
    <>
      <PageHero eyebrow="Audyt SEO online" title="Sprawdź, co blokuje" accent="Twoją stronę w Google"
        lead={`Gdy ktoś szuka usługi, wpisuje ją w Google i zwykle wybiera jedną z pierwszych stron. Audyt pokaże, co sprawia, że Twoja strona jest niżej, niż mogłaby być, i od czego zacząć poprawki. Kosztuje ${AUDYT_PRICE} zł.`}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={AUDYT_URL} className="btn btn-primary">Zamów audyt</a>
          <a href="#dlaczego" className="btn btn-secondary">Dlaczego to ważne</a>
        </div>
      </PageHero>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10">
        <div className="prose-m">
          <h2 id="dlaczego">Dlaczego warto sprawdzić stronę</h2>
          <p>Google pokazuje wyżej strony, które potrafi łatwo odczytać i które jasno odpowiadają na to, czego szuka klient. Gdy coś mu w tym przeszkadza, Twoja strona spada niżej w wynikach albo w ogóle się w nich nie pojawia. Klient trafia wtedy do konkurencji, nawet jeśli Twoja oferta jest lepsza.</p>
          <p>Takich problemów zwykle nie widać na pierwszy rzut oka. Strona może wyglądać dobrze, a Google i tak pomija część podstron albo źle rozumie, czym się zajmujesz. Audyt wyszukuje te problemy i tłumaczy, jak je usunąć.</p>

          <h2 id="co-sprawdzamy">Co sprawdza audyt</h2>
          <ul>
            <li>Czy Google widzi wszystkie Twoje podstrony i czy coś go przed nimi nie blokuje.</li>
            <li>Czy na stronie są błędy, które przeszkadzają Google albo zniechęcają klientów.</li>
            <li>Czy tytuły i teksty jasno mówią, czym się zajmujesz, żeby klienci znaleźli Cię po słowach, które sami wpisują w Google.</li>
            <li>Czy Google poprawnie odczytuje informacje o firmie, np. adres i godziny otwarcia.</li>
          </ul>

          <h2 id="co-dostajesz">Co dostajesz</h2>
          <p>Raport z oceną strony i listą poprawek ułożoną od najważniejszej. Przy każdej poprawce raport wyjaśnia, czego dotyczy i co zmienić.</p>
          <p>Raport przeczytasz w aplikacji albo pobierzesz w PDF. Każdy audyt zostaje na Twoim koncie, więc po poprawkach sprawdzisz, co się zmieniło. Sam audyt niczego na stronie nie zmienia.</p>

          <h2 id="jak-zamowic">Jak zamówić</h2>
          <ol>
            <li>Zakładasz konto adresem e-mail albo kontem Google.</li>
            <li>Wpisujesz adres swojej strony.</li>
            <li>Płacisz online {AUDYT_PRICE} zł. To jednorazowa opłata, bez abonamentu.</li>
            <li>Po kilku, czasem kilkudziesięciu minutach raport jest gotowy.</li>
          </ol>
          <p>Jeśli korzystasz z Google Search Console albo Google Analytics, możesz je podłączyć przy zamówieniu. Raport pokaże wtedy także, po jakich hasłach ludzie trafiają na Twoją stronę i ile osób przychodzi z Google.</p>
        </div>
      </div>
      <Faq items={[
        { q: 'Czym jest SEO?', a: <>To praca nad stroną, dzięki której Google pokazuje ją wyżej, gdy ktoś szuka Twojej usługi. Więcej przeczytasz na stronie <a href="/optymalizacja-seo">Optymalizacja SEO</a>.</> },
        { q: 'Czy muszę podłączać konto Google?', a: 'Nie. Bez tego audyt sprawdza wszystko, co widać na Twojej stronie. Search Console i Google Analytics dodają dane o tym, jak ludzie znajdują ją w Google.' },
        { q: 'Kto wprowadzi poprawki?', a: <>Możesz zrobić to sam, przekazać raport osobie, która zajmuje się Twoją stroną, albo zlecić poprawki nam. Ceny znajdziesz na stronie <a href="/optymalizacja-seo">Optymalizacja SEO</a>.</> },
      ]} />
      <p className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10 text-[15px] text-body">
        <a href={TERMS} className="underline underline-offset-2">Regulamin</a>
        {' · '}
        <a href={PRIVACY} className="underline underline-offset-2">Polityka prywatności</a>
      </p>
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
