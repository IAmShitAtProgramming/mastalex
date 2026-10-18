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
        lead={`Wpisz adres swojej strony, a audyt sprawdzi, co przeszkadza jej w Google. Dostaniesz raport z listą poprawek, napisany prostym językiem. Audyt kosztuje ${AUDYT_PRICE} zł.`}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={AUDYT_URL} className="btn btn-primary">Zamów audyt</a>
          <a href="#jak-zamowic" className="btn btn-secondary">Jak to działa</a>
        </div>
      </PageHero>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10">
        <div className="prose-m">
          <h2 id="co-sprawdzamy">Co sprawdza audyt</h2>
          <ul>
            <li>Czy Google widzi wszystkie Twoje podstrony i czy nic go przed nimi nie blokuje.</li>
            <li>Czy strona działa bez błędów, które przeszkadzają Google albo klientom.</li>
            <li>Czy tytuły i teksty mówią jasno, czym się zajmujesz, tak żeby klienci znaleźli Cię po słowach, które wpisują w Google.</li>
            <li>Czy Google dobrze rozumie, co oferujesz, np. adres firmy i godziny otwarcia.</li>
          </ul>

          <h2 id="co-dostajesz">Co dostajesz</h2>
          <p>Raport z ogólną oceną strony i listą poprawek ułożoną od najważniejszej. Przeczytasz go w aplikacji albo pobierzesz w PDF. Każdy audyt zostaje w historii Twojego konta, więc po poprawkach łatwo porównasz wyniki.</p>
          <p>Audyt tylko przegląda stronę. Niczego na niej nie zmienia.</p>

          <h2 id="jak-zamowic">Jak zamówić</h2>
          <ol>
            <li>Zakładasz konto adresem e-mail albo kontem Google.</li>
            <li>Wpisujesz adres swojej strony.</li>
            <li>Płacisz online {AUDYT_PRICE} zł. To jednorazowa opłata, bez abonamentu.</li>
            <li>Po kilku, czasem kilkudziesięciu minutach raport jest gotowy.</li>
          </ol>
          <p>Jeśli korzystasz z Google Search Console albo Google Analytics, możesz je podłączyć przy zamówieniu. Raport pokaże wtedy także, po jakich hasłach ludzie trafiają na Twoją stronę i ile osób przychodzi z Google. Bez tego audyt też działa.</p>
        </div>
      </div>
      <Faq items={[
        { q: 'Czy muszę podłączać konto Google?', a: 'Nie. Bez tego audyt sprawdza wszystko, co widać na Twojej stronie. Search Console i Google Analytics dodają tylko dane o tym, jak ludzie znajdują ją w Google.' },
        { q: 'Kto wprowadzi poprawki?', a: <>Możesz zrobić to sam albo zlecić nam. Ceny znajdziesz na stronie <a href="/optymalizacja-seo">Optymalizacja SEO</a>.</> },
        { q: 'Ile trwa audyt?', a: 'Zwykle od kilku do kilkudziesięciu minut. Gdy raport będzie gotowy, zobaczysz go na swoim koncie.' },
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
