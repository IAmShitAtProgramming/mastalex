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
          <p>Audyt patrzy na Twoją stronę tak, jak robi to Google, i ocenia ją w siedmiu sprawach. Każda dostaje swoją ocenę, a cała strona wynik od 0 do 100.</p>
          <h3>Czy Google widzi całą stronę</h3>
          <p>Czasem Google nie zagląda do części strony, na przykład do zakładki z cennikiem. Tej zakładki nikt wtedy nie znajdzie w wyszukiwarce. Audyt sprawdza, czy Google dociera wszędzie i czy dwie zakładki nie opisują tego samego, bo wtedy Google nie wie, którą pokazać. Sprawdza też, czy strona jest bezpieczna dla osób, które ją odwiedzają.</p>
          <p>Gdy Google widzi każdą zakładkę, klient znajdzie w wyszukiwarce także Twój cennik albo opis konkretnej usługi, a przeglądarka nie odstraszy go ostrzeżeniem o niebezpiecznej stronie.</p>
          <h3>Teksty</h3>
          <p>Google chętniej poleca strony, na których widać, że firma zna się na swojej pracy. Audyt czyta Twoje teksty i ocenia, czy łatwo się je czyta i czy mówią o ofercie dość, żeby klient Ci zaufał. Zwraca też uwagę, czy ten sam tekst nie powtarza się w kilku miejscach.</p>
          <p>Po poprawkach Google ma więcej powodów, żeby pokazać Twoją stronę. Klientowi, który na nią trafi, łatwiej będzie zadzwonić albo napisać.</p>
          <h3>Wygląd w wynikach Google</h3>
          <p>Kiedy klient szuka usługi, widzi w Google tylko tytuł strony i krótki opis pod nim. Na tej podstawie decyduje, czy kliknie. Audyt sprawdza, czy te teksty zachęcają i jasno mówią, czym się zajmujesz. Ocenia też, czy strona jest przejrzyście ułożona i czy łatwo przejść z jednej zakładki do drugiej.</p>
          <p>Dobry tytuł i opis pomagają klientowi wybrać właśnie Ciebie spośród kilku podobnych wyników. Kiedy już wejdzie, szybko znajdzie to, po co przyszedł.</p>
          <h3>Dane firmy</h3>
          <p>Google potrafi pokazać przy wyniku dodatkowe informacje o firmie, jeśli strona poda mu je w formie, którą rozumie. Audyt sprawdza, czy takie informacje są na stronie i czy nie ma w nich błędów.</p>
          <p>Dzięki temu klient może zobaczyć ważne informacje o Twojej firmie już w Google, zanim w ogóle wejdzie na stronę.</p>
          <h3>Szybkość</h3>
          <p>Gdy strona długo się otwiera, część osób nie czeka i wraca do wyników wyszukiwania. Audyt sprawdza, ile waży Twoja strona i jak szybko zaczyna się otwierać. Wskazuje też, co może ją spowalniać, na przykład za duże zdjęcia.</p>
          <p>Szybsza strona zatrzyma klientów, którzy dziś zamykają ją, zanim się otworzy, i wybierają konkurencję.</p>
          <h3>ChatGPT i inne czaty AI</h3>
          <p>Część osób pyta o usługi ChatGPT zamiast Google. Audyt sprawdza, czy taki czat może przeczytać Twoją stronę i wspomnieć o niej w odpowiedzi.</p>
          <p>Jeśli czat może ją przeczytać, ma szansę wymienić Twoją firmę, gdy ktoś zapyta go o usługi takie jak Twoje.</p>
          <h3>Zdjęcia</h3>
          <p>Duże zdjęcia potrafią mocno spowolnić stronę. Audyt sprawdza, czy zdjęcia nie są za ciężkie i czy mają krótkie opisy, z których Google dowie się, co przedstawiają.</p>
          <p>Lżejsze zdjęcia przyspieszą stronę, a z dobrymi opisami klienci znajdą je również w wyszukiwarce grafik Google.</p>

          <h2 id="co-dostajesz">Co dostajesz</h2>
          <p>Raport zaczyna się od podsumowania: ocena strony, 5 najpilniejszych problemów i 5 poprawek, które zrobisz najszybciej. Dalej są wyniki każdego obszaru i plan poprawek podzielony na etapy, od pilnych napraw po dalsze ulepszenia. Przy każdej poprawce raport wyjaśnia, czego dotyczy i co zmienić.</p>
          <p>Od razu wiesz, od czego zacząć, i nie wydajesz pieniędzy na poprawki, które niewiele zmienią.</p>
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
