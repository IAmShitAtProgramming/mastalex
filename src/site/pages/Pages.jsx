import { ADMIN, AFTER, EMAIL, FOUNDERS, MARKET_WIZYTOWKA, PRICES, SHOP, SHOP_ON, UPDATED_LABEL } from '../data.js'
import { ContactForm, Cta, CtaBand, DevSlot, Faq, PageHero, Process, ServiceCards } from '../ui.jsx'
import { Founders } from './shared.jsx'

// Teksty przepisane 30.09.2026 (Claude, bez Codexa) po uwagach właściciela: mówimy, co robimy,
// piszemy tylko o korzyściach klienta i każdy fakt podajemy na danej podstronie raz.

const GOOGLE_DO_I_NEED_SEO = 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl'
const GOOGLE_SEO_STARTER = 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pl'

function Body({ children, aside }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10 grid lg:grid-cols-[1fr_320px] gap-12">
      <div className="prose-m">{children}</div>
      {aside && <aside className="hidden lg:block">{aside}</aside>}
    </div>
  )
}

function StickyCard({ eyebrow = 'Zacznij od formularza', title = 'Bezpłatny projekt strony i wycena', text, label = 'Zamów projekt' }) {
  return (
    <div className="sticky top-24 rounded-[24px] bg-paper border border-line p-6">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-deep">{eyebrow}</p>
      <p className="mt-2 text-[20px] font-bold leading-snug">{title}</p>
      {text && <p className="mt-2 text-[15px] leading-relaxed text-body">{text}</p>}
      <a href="/kontakt" className="btn btn-primary w-full mt-5">{label}</a>
      <p className="mt-4 text-[14px] text-body">albo napisz: <a href={`mailto:${EMAIL}`} className="text-brand-deep underline underline-offset-4">{EMAIL}</a></p>
    </div>
  )
}

// Lista „W ramach usługi”. Właściciel: opisujemy korzyści, bez list „czego nie robimy”.
function Included({ items }) {
  return (
    <div className="not-prose mt-6 rounded-[24px] bg-mint p-6">
      <p className="font-bold text-mint-ink">W cenie</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 sm:gap-x-6">{items.map((t) => <li key={t} className="text-[16px] leading-relaxed text-ink pl-6 relative"><span aria-hidden="true" className="absolute left-0 font-bold text-mint-ink">✓</span>{t}</li>)}</ul>
    </div>
  )
}

function Related({ exclude }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="inne-h">
      <h2 id="inne-h" className="text-[28px] sm:text-[34px] leading-[1.1] font-bold tracking-[-0.02em]">Pozostałe usługi</h2>
      <ServiceCards exclude={exclude} />
    </section>
  )
}

// Proces krok po kroku: w każdym kroku osobno, co robisz Ty, a co my.
function StepsDetailed({ steps }) {
  return (
    <ol className="not-prose mt-6 grid gap-4">
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-[24px] bg-paper border border-line p-6 grid gap-4 sm:grid-cols-[auto_1fr]">
          <span aria-hidden="true" className="grid place-items-center w-11 h-11 rounded-xl bg-brand-soft text-brand-deep text-[18px] font-bold">{i + 1}</span>
          <div>
            <h3 className="mt-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[21px] font-bold leading-tight">
              {s.title}
              {s.tag && <span className="rounded-full bg-sun px-3 py-0.5 text-[14px] font-bold text-ink">{s.tag}</span>}
            </h3>
            <dl className="mt-3 grid gap-2 text-[16px] leading-[1.6]">
              {s.rows.map(([who, text]) => (
                <div key={who}><dt className="inline font-semibold text-ink">{who}: </dt><dd className="inline text-body">{text}</dd></div>
              ))}
            </dl>
          </div>
        </li>
      ))}
    </ol>
  )
}

// Karty z cenami, dane z PRICES (data.js). `wide`: pełna szerokość strony, 4 karty w rzędzie.
function PriceCards({ items, wide }) {
  return (
    <ul className={`not-prose mt-6 grid gap-4 sm:grid-cols-2${wide ? ' lg:grid-cols-4' : ''}`}>
      {items.map((p) => (
        <li key={p.id} className="rounded-[24px] bg-paper border border-line p-6 flex flex-col">
          <h3 className="text-[20px] font-bold leading-tight">{p.name}</h3>
          <p className="mt-3 text-[36px] font-bold leading-none tracking-[-0.02em] text-brand-deep">{p.from && <span className="text-[20px] font-semibold">od </span>}{p.price} zł</p>
          <p className="mt-3 text-[16px] leading-[1.6] text-body">{p.text}</p>
          {p.href && <a href={p.href} className="mt-auto pt-4 inline-flex min-h-12 items-center gap-2 self-start font-semibold text-brand-deep underline underline-offset-4">{p.link} <span aria-hidden="true">→</span></a>}
        </li>
      ))}
    </ul>
  )
}

// Lista numerowana w treści (prose-m nie ma własnego stylu dla <ol>).
function Numbered({ items }) {
  return (
    <ol className="not-prose mt-6 grid gap-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4 text-[18px] leading-[1.55] text-body">
          <span aria-hidden="true" className="shrink-0 grid place-items-center w-9 h-9 rounded-xl bg-brand-soft text-brand-deep text-[16px] font-bold">{i + 1}</span>
          <span className="pt-1">{t}</span>
        </li>
      ))}
    </ol>
  )
}

/* ---------- /tworzenie-stron-internetowych ---------- */
const STEPS_TWORZENIE = [
  { title: 'Opowiadasz nam o firmie', rows: [
    ['Ty', 'W formularzu opisujesz, czym się zajmujesz, kim są Twoi klienci, co chcesz im pokazać i jakie strony Ci się podobają.'],
    ['My', 'Na tej podstawie planujemy układ strony i piszemy teksty.'],
  ] },
  { title: 'Bezpłatny projekt i wycena', tag: '3 dni', rows: [
    ['My', 'Przygotowujemy wygląd, układ i teksty strony. Jeśli strona wymaga więcej pracy, od razu podamy termin i powód.'],
    ['Ty', 'Oglądasz projekt razem z przejrzystą wyceną i decydujesz, czy chcesz iść dalej.'],
  ] },
  { title: 'Dopracowanie projektu pod Twoją firmę', rows: [
    ['Ty', 'Mówisz, co zmienić: kolory, zdjęcia, kolejność sekcji albo teksty.'],
    ['My', 'Poprawiamy projekt, aż będzie taki, jak chcesz. Płacisz dopiero po akceptacji.'],
  ] },
  { title: 'Uruchomienie', rows: [
    ['My', 'Uruchamiamy stronę pod Twoim adresem.'],
    ['Ty', 'Dostajesz gotową stronę. Ona i wszystkie dostępy do niej należą do Ciebie.'],
  ] },
  { title: 'Więcej klientów z Google', tag: 'dla chętnych', rows: [
    ['My', 'Proponujemy SEO, dzięki któremu strona pojawia się wyżej w Google i częściej w odpowiedziach czatów AI.'],
    ['Ty', 'Decydujesz, czy z niego skorzystasz.'],
  ] },
]

export function Tworzenie() {
  const plans = PRICES.filter((p) => p.id === 'wizytowka' || p.id === 'firmowa').map(({ href, link, ...p }) => p)
  return (
    <>
      <PageHero eyebrow="Usługa" title="Tworzenie stron internetowych" accent="dla Twojej firmy"
        lead="Zaprojektujemy stronę, na której klient od razu widzi, czym się zajmujesz, i szybko się z Tobą kontaktuje. Teksty napiszemy za Ciebie. Strona wizytówka kosztuje 500 zł, a projekt zobaczysz za darmo.">
        <Cta secondary={{ href: '/cennik-stron-internetowych', label: 'Zobacz cennik' }} />
      </PageHero>
      <Body aside={<StickyCard title="Projekt Twojej strony za darmo" />}>
        <h2>Co zyskujesz dzięki nowej stronie</h2>
        <ul>
          <li><strong>Klienci szybciej wybierają Ciebie.</strong> Od razu widzą, co oferujesz i dlaczego warto zadzwonić właśnie do Ciebie.</li>
          <li><strong>Firma budzi zaufanie.</strong> Nowoczesna strona pokazuje, że traktujesz klientów poważnie.</li>
          <li><strong>Więcej zapytań.</strong> Dane kontaktowe są zawsze pod ręką, więc klient odzywa się od razu, zamiast szukać dalej.</li>
          <li><strong>Wygoda na telefonie i komputerze.</strong> Strona dobrze wygląda i sprawnie działa na każdym ekranie.</li>
        </ul>

        <h2 id="jak-powstaje">Jak powstaje Twoja strona — krok po kroku</h2>
        <StepsDetailed steps={STEPS_TWORZENIE} />

        <h2>Wizytówka czy strona z podstronami?</h2>
        <p>Wybierz, ile miejsca potrzebuje Twoja oferta.</p>
        <PriceCards items={plans} />
        <p>Potrzebujesz więcej niż 5 podstron? Każda kolejna kosztuje {AFTER.podstrona} zł. Domenę i hosting opłacasz osobno — ile kosztują, sprawdzisz w <a href="/cennik-stron-internetowych#domena-i-hosting">cenniku</a>.</p>
      </Body>
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-16">
        <DevSlot title="realizacje">Gdy będzie pierwsza realizacja, tu trafi jej opis z linkiem do /realizacje.</DevSlot>
      </section>
      <Faq items={[
        { q: 'Czy zrobicie stronę dla firmy z mojej branży?', a: 'Tak. Każdą stronę projektujemy od podstaw pod konkretną firmę, bez względu na branżę.' },
        { q: 'Czy za projekt trzeba zapłacić, jeśli nie zdecyduję się na stronę?', a: 'Nie. Jeśli projekt Ci się nie spodoba, nic nie płacisz i niczym się nie zobowiązujesz.' },
      ]} />
      <Related exclude="/tworzenie-stron-internetowych" />
      <CtaBand title="Zobacz projekt swojej strony za darmo" />
    </>
  )
}

/* ---------- /tworzenie-sklepow-internetowych ---------- */
// Sklepy w ofercie od 30.09.2026 (właściciel: „pełen zestaw”). Ceny i koszty utrzymania: SHOP w data.js.
const SHOP_GAINS = [
  { title: 'Sprzedajesz całą dobę', text: 'Klient kupuje wtedy, kiedy ma czas, także wieczorem i w weekend. Rano czekają na Ciebie opłacone zamówienia.', tint: 'bg-brand-soft' },
  { title: 'Szybkie płatności online', text: 'Klient płaci BLIKIEM, przelewem albo kartą, a pieniądze trafiają na Twoje konto.', tint: 'bg-mint' },
  { title: 'Wygodne zakupy na telefonie', text: 'Sklep sprawnie działa na telefonie i komputerze, więc klient bez trudu kończy zakupy.', tint: 'bg-sky' },
  { title: 'Produkty dodajesz samodzielnie', text: 'Nowy produkt, cenę albo zdjęcie zmieniasz w kilka minut, bez pomocy informatyka.', tint: 'bg-peach' },
]

const STEPS_SKLEP = [
  { title: 'Opowiadasz nam o sklepie', rows: [
    ['Ty', 'W formularzu piszesz, co sprzedajesz, ile masz produktów i jak chcesz je wysyłać.'],
    ['My', 'Na tej podstawie planujemy układ sklepu i piszemy teksty.'],
  ] },
  { title: 'Bezpłatny projekt i wycena', tag: '3 dni', rows: [
    ['My', 'Przygotowujemy wygląd sklepu, stronę produktu i koszyk. Jeśli sklep wymaga więcej pracy, od razu podamy termin i powód.'],
    ['Ty', 'Oglądasz projekt razem z przejrzystą wyceną i decydujesz, czy chcesz iść dalej.'],
  ] },
  { title: 'Dopracowanie projektu pod Twoją firmę', rows: [
    ['Ty', 'Mówisz, co zmienić: kolory, układ, zdjęcia albo teksty.'],
    ['My', 'Poprawiamy projekt, aż będzie taki, jak chcesz. Płacisz dopiero po akceptacji.'],
  ] },
  { title: 'Uruchomienie sklepu', rows: [
    ['My', 'Uruchamiamy sklep pod Twoim adresem, podłączamy płatności online i wysyłkę, a potem pokazujemy, jak dodawać produkty i obsługiwać zamówienia.'],
    ['Ty', 'Przyjmujesz pierwsze zamówienia. Sklep i wszystkie dostępy do niego należą do Ciebie.'],
  ] },
]

export function Sklep() {
  return (
    <>
      <PageHero eyebrow="Usługa" title="Sklep internetowy" accent="dla Twojej firmy"
        lead={`Zaprojektujemy sklep, w którym klient szybko znajduje produkt, płaci online i czeka na przesyłkę. Sklep kosztuje od ${SHOP.from} zł, a projekt zobaczysz za darmo.`}>
        <Cta secondary={{ href: '/cennik-stron-internetowych', label: 'Zobacz cennik' }} />
      </PageHero>
      <Body aside={<StickyCard title="Projekt Twojego sklepu za darmo" />}>
        <h2>Co zyskujesz dzięki sklepowi internetowemu</h2>
        <ul className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
          {SHOP_GAINS.map((g) => (
            <li key={g.title} className={`rounded-[24px] ${g.tint} p-6`}>
              <h3 className="mt-0 text-[20px] font-bold leading-tight">{g.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-body">{g.text}</p>
            </li>
          ))}
        </ul>

        <h2>Ile kosztuje sklep internetowy</h2>
        <PriceCards items={SHOP.plans} />
        <Included items={SHOP.included} />

        <h2 id="utrzymanie-sklepu">Ile kosztuje utrzymanie sklepu</h2>
        <p>{SHOP.upkeep}</p>

        <h2 id="jak-powstaje">Jak powstaje Twój sklep — krok po kroku</h2>
        <StepsDetailed steps={STEPS_SKLEP} />
      </Body>
      <Faq items={SHOP.faq} />
      <Related exclude="/tworzenie-sklepow-internetowych" />
      <CtaBand title="Zobacz projekt swojego sklepu za darmo" text="Opisz, co sprzedajesz, a przygotujemy bezpłatny projekt sklepu i przejrzystą wycenę." />
    </>
  )
}

/* ---------- /przebudowa-strony-internetowej ---------- */
const GAINS = [
  { title: 'Lepsze pierwsze wrażenie', text: 'Klient ocenia firmę po wyglądzie strony. Nowoczesny wygląd sprawia, że zostaje i czyta dalej.', tint: 'bg-brand-soft' },
  { title: 'Aktualna oferta', text: 'Pokazujesz to, co sprzedajesz dziś: aktualne usługi, ceny i zdjęcia.', tint: 'bg-mint' },
  { title: 'Najnowsze standardy', text: 'Strona szybko się wczytuje i wygodnie działa na telefonie, więc klienci nie uciekają do konkurencji.', tint: 'bg-sky' },
  { title: 'Przewaga nad konkurencją', text: 'Doganiasz firmy z nowoczesnymi stronami, a dzięki SEO wyprzedzasz je w Google.', tint: 'bg-peach' },
]

const STEPS_PRZEBUDOWA = [
  { n: 1, title: 'Pokaż nam obecną stronę', text: 'Podaj adres strony i napisz, co chcesz zmienić: wygląd, ofertę albo wszystko naraz.' },
  { n: 2, title: 'Projekt nowej wersji i wycena', text: 'W 3 dni dostajesz projekt odświeżonej strony i przejrzystą wycenę. Jeśli strona wymaga więcej pracy, od razu podamy termin i powód.' },
  { n: 3, title: 'Dopracowanie projektu pod Twoją firmę', text: 'Mówisz, co poprawić. Zmieniamy projekt, aż będzie taki, jak chcesz, a płacisz dopiero po akceptacji.' },
  { n: 4, title: 'Nowa wersja w sieci', text: 'Uruchamiamy nową stronę pod Twoim dotychczasowym adresem. Strona i wszystkie dostępy należą do Ciebie.' },
]

export function Przebudowa() {
  return (
    <>
      <PageHero eyebrow="Usługa" title="Przebudowa i odświeżenie" accent="strony internetowej"
        lead="Stara strona odstrasza klientów. Przebudujemy ją tak, żeby ich przyciągała — od 400 zł. Projekt nowej wersji zobaczysz za darmo.">
        <Cta secondary={{ href: '/cennik-stron-internetowych', label: 'Zobacz cennik' }} />
      </PageHero>
      <Body aside={<StickyCard eyebrow="Zacznij od adresu strony" title="Projekt nowej wersji Twojej strony za darmo" />}>
        <h2>Kiedy warto przebudować stronę</h2>
        <ul>
          <li>Strona źle wygląda albo jest niewygodna na telefonie.</li>
          <li>Oferta, ceny lub zdjęcia są nieaktualne.</li>
          <li>Strona długo się wczytuje.</li>
          <li>Konkurencja jest wyżej w Google.</li>
          <li>Wolisz nie podawać klientom adresu swojej strony.</li>
        </ul>
        <p>Jeśli rozpoznajesz choć jeden punkt, czas na przebudowę.</p>

        <h2>Co zyskujesz dzięki przebudowie</h2>
        <ul className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
          {GAINS.map((g) => (
            <li key={g.title} className={`rounded-[24px] ${g.tint} p-6`}>
              <h3 className="mt-0 text-[20px] font-bold leading-tight">{g.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.6] text-body">{g.text}</p>
            </li>
          ))}
        </ul>

        <h2>Ile kosztuje przebudowa strony</h2>
        <p>Przebudowa wizytówki kosztuje 400 zł, a strony firmowej do 5 podstron 1200 zł. To zawsze mniej niż nowa strona tej samej wielkości. Większą stronę wycenimy razem z projektem nowej wersji. Ceny wszystkich usług znajdziesz w <a href="/cennik-stron-internetowych">cenniku</a>.</p>
      </Body>
      <Process steps={STEPS_PRZEBUDOWA} title="Jak wygląda przebudowa" />
      <Faq items={[
        { q: 'Czy mogę zostawić część obecnej strony?', a: 'Tak. Napisz w formularzu, co zostawić, a co zmienić. Uwzględnimy to w projekcie i wycenie.' },
        { q: 'Czy przebudujecie stronę zrobioną przez inną firmę?', a: 'Tak. Przebudowujemy każdą stronę, bez względu na to, kto ją zrobił.' },
        { q: 'Czy muszę pisać teksty od nowa?', a: 'Nie. Nowe teksty przygotujemy za Ciebie.' },
      ]} />
      <Related exclude="/przebudowa-strony-internetowej" />
      <CtaBand title="Zobacz nową wersję swojej strony za darmo" text="Wypełnij formularz, a pokażemy Ci, jak będzie wyglądać Twoja strona po przebudowie." />
    </>
  )
}

/* ---------- /optymalizacja-seo ---------- */
// Lista działań to wniosek Claude'a (typowy zakres SEO), do potwierdzenia przez właściciela.
const SEO_WORK = [
  'Robimy audyt SEO, czyli sprawdzamy stronę i znajdujemy wszystko, co obniża jej pozycję w Google.',
  'Dobieramy hasła, które wpisują Twoi klienci, i dopasowujemy do nich teksty.',
  'Poprawiamy tytuły i opisy, które klient widzi w wynikach Google, żeby chętniej w nie klikał.',
  'Przyspieszamy stronę i poprawiamy jej działanie na telefonie.',
  'Przygotowujemy opis firmy i usług tak, żeby czaty AI chętniej polecały Twoją firmę.',
  'Zgłaszamy stronę do Google, żeby szybciej uwzględnił zmiany.',
]

export function Seo() {
  return (
    <>
      <PageHero eyebrow="Usługa" title="Optymalizacja SEO" accent="strony internetowej"
        lead="Wykonujemy SEO i wdrażamy poprawki na Twojej stronie — od 300 zł. Efekt: wyżej w Google, więcej odwiedzin i częstsze polecenia w czatach AI.">
        <Cta label="Zapytaj o SEO swojej strony" secondary={{ href: '#czym-jest-seo', label: 'Czym jest SEO?' }} />
      </PageHero>
      <Body aside={<StickyCard eyebrow="Pierwszy krok" title="Podaj adres swojej strony" label="Zapytaj o SEO" />}>
        <h2 id="czym-jest-seo">Czym jest SEO? Wyjaśniamy po ludzku</h2>
        <p>Gdy ktoś szuka usługi, wpisuje ją w Google. Google decyduje, które strony pokaże na górze, a klient zwykle wybiera spośród pierwszych wyników.</p>
        <p>SEO (od angielskiego <i>search engine optimization</i>, czyli optymalizacja pod wyszukiwarki) to praca nad stroną, dzięki której Google pokazuje ją wyżej. Nazywa się ją też pozycjonowaniem strony.</p>
        <p>Strona bez SEO jest jak sklep na zapleczu budynku: może mieć świetną ofertę, ale mało kto do niego trafia. SEO przenosi go na główną ulicę, którą klienci przechodzą codziennie.</p>
        <p>Coraz więcej osób prosi też o polecenie firmy czaty AI, np. ChatGPT. SEO sprawia, że Twoja firma częściej pojawia się również w ich odpowiedziach.</p>
        <p>Jeśli chcesz poczytać więcej, Google opisuje SEO w <a href={GOOGLE_SEO_STARTER} rel="noopener" target="_blank">poradniku dla początkujących</a> i wyjaśnia, <a href={GOOGLE_DO_I_NEED_SEO} rel="noopener" target="_blank">kiedy warto je zlecić</a>.</p>

        <h2>Co wykonujemy w ramach usługi</h2>
        <Numbered items={SEO_WORK} />

        <h2>Jak sprawdzisz efekty</h2>
        <p>Podłączamy do strony bezpłatne narzędzie Google Search Console. Zobaczysz w nim, na jakie hasła pojawia się Twoja strona, na którym miejscu i ile osób w nią klika. Dostęp do niego należy do Ciebie.</p>
      </Body>
      <Faq items={[
        { q: 'Czy wykonacie SEO strony zrobionej przez inną firmę?', a: 'Tak. SEO wykonujemy dla każdej strony, bez względu na to, kto ją zrobił.' },
        { q: 'Czym różni się SEO od reklamy w Google?', a: 'Reklama działa, dopóki płacisz za każde kliknięcie. SEO podnosi stronę w zwykłych wynikach wyszukiwania, a za kliknięcia w nie nie płacisz.' },
        { q: 'Od czego zależy cena SEO?', a: 'Od wielkości strony i tego, ile trzeba na niej poprawić. Dokładną cenę poznasz w przejrzystej wycenie, zanim zdecydujesz się na dalszą współpracę.' },
      ]} />
      <Related exclude="/optymalizacja-seo" />
      <CtaBand title="Sprawdź, co podniesie Twoją stronę w Google" text="Sprawdzimy Twoją stronę i przygotujemy przejrzystą wycenę SEO." label="Zapytaj o SEO" />
    </>
  )
}

/* ---------- /cennik-stron-internetowych ---------- */
export function Cennik() {
  return (
    <>
      <PageHero eyebrow={`Aktualizacja: ${UPDATED_LABEL}`} title="Ile kosztuje strona internetowa?"
        lead="Strona wizytówka kosztuje 500 zł. Sprawdź ceny wszystkich usług i to, co dostajesz w cenie.">
        <Cta />
      </PageHero>
      {/* Karty na pełną szerokość, reszta w Body z kartą boczną: bez pustego pasa po prawej (uwaga właściciela 30.09.2026). */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10" aria-labelledby="ceny-h">
        <h2 id="ceny-h" className="text-[28px] sm:text-[34px] leading-[1.1] font-bold tracking-[-0.02em]">Ceny usług</h2>
        <PriceCards items={PRICES} wide />
        <p className="mt-6 max-w-[68ch] text-[16px] leading-[1.6] text-body">Dla porównania: w ponad połowie z {MARKET_WIZYTOWKA.cenniki} cenników innych firm, które sprawdziliśmy we wrześniu 2026, strona wizytówka kosztuje co najmniej {MARKET_WIZYTOWKA.prog}.</p>
        {SHOP_ON && <>
          <h2 id="sklepy" className="mt-16 text-[28px] sm:text-[34px] leading-[1.1] font-bold tracking-[-0.02em]">Ceny sklepów internetowych</h2>
          <PriceCards items={SHOP.plans} />
          <p className="mt-6 max-w-[68ch] text-[16px] leading-[1.6] text-body">Co dostajesz w cenie sklepu i ile kosztuje jego utrzymanie, sprawdzisz na stronie <a href="/tworzenie-sklepow-internetowych" className="text-brand-deep underline underline-offset-4">sklepy internetowe</a>.</p>
        </>}
      </section>
      <Body aside={<StickyCard />}>
        <h2>Co jest w cenie strony</h2>
        <Included items={['Bezpłatny projekt i przejrzysta wycena w 3 dni', 'Wygląd zaprojektowany od zera, bez gotowych szablonów', 'Teksty napisane za Ciebie', 'Poprawki projektu, aż będzie taki, jak chcesz', 'Uruchomienie strony pod Twoim adresem', 'Strona i wszystkie dostępy należą do Ciebie']} />

        <h2 id="domena-i-hosting">Domena i hosting przy nowej stronie</h2>
        <p>Nowa strona potrzebuje własnego adresu, czyli domeny (np. twojafirma.pl), i hostingu, czyli miejsca w internecie, w którym działa. Domenę i hosting opłacasz osobno i to jedyne coroczne koszty strony. Przy przebudowie i SEO korzystasz z tych, które już masz.</p>
        <p>Orientacyjne ceny z VAT według cenników popularnych polskich firm (wrzesień 2026):</p>
        <ul>
          <li><strong>Domena .pl:</strong> w pierwszym roku <span className="whitespace-nowrap">ok. 1–20 zł</span>, w kolejnych latach <span className="whitespace-nowrap">ok. 70–220 zł</span> rocznie.</li>
          <li><strong>Hosting małej strony:</strong> w pierwszym roku <span className="whitespace-nowrap">ok. 60–100 zł</span>, w kolejnych latach <span className="whitespace-nowrap">ok. 160–310 zł</span> rocznie.</li>
        </ul>
        <p>Nie mamy podpisanej współpracy reklamowej z żadną firmą, która sprzedaje domeny lub hosting. Dlatego dobieramy je wyłącznie pod kątem korzyści dla Ciebie, np. hosting z bezpłatną kłódką bezpieczeństwa przy adresie strony (certyfikatem SSL).</p>

        <h2>Kiedy płacisz</h2>
        <p>Dopiero po akceptacji projektu. Do tego momentu nic nie płacisz i niczym się nie zobowiązujesz. Cena z wyceny się nie zmienia: bez Twojej zgody nic do niej nie dopiszemy.</p>

        <h2 id="rozbudowa">Rozbudowa strony</h2>
        <p>Stronę rozbudujesz, kiedy tylko zechcesz. Każda kolejna podstrona kosztuje {AFTER.podstrona} zł, także przy stronie większej niż 5 podstron.</p>

        <h2 id="wsparcie">Wsparcie po uruchomieniu</h2>
        <p>Przez {AFTER.wsparcie} miesięcy od uruchomienia bezpłatnie naprawiamy każdy błąd strony. Drobną zmianę, np. nowy numer telefonu, cenę albo zdjęcie, wprowadzimy za {AFTER.zmiana} zł. Zmiany możesz też zlecić, komu chcesz — to Ty decydujesz, kto zajmuje się Twoją stroną.</p>
      </Body>
      <Faq items={[
        { q: 'Czy SEO jest w cenie strony?', a: <>SEO to osobna usługa. Zaproponujemy ją po uruchomieniu strony, a decyzja należy do Ciebie. Więcej: <a href="/optymalizacja-seo">optymalizacja SEO</a>.</> },
        { q: 'Czy przebudowa jest tańsza niż nowa strona?', a: <>Tak. Przebudowa zawsze kosztuje mniej niż nowa strona tej samej wielkości. Więcej: <a href="/przebudowa-strony-internetowej">przebudowa strony internetowej</a>.</> },
      ]} />
      <CtaBand title="Poznaj dokładną cenę swojej strony" />
    </>
  )
}

/* ---------- /o-nas ---------- */
export function ONas() {
  const people = FOUNDERS.map((p, i) => ({ ...p, extra: i === 0 ? 'Pasjonat technologii, stawia na samokształcenie i rozwój.' : 'Interesuje się marketingiem i psychologią.' }))
  return (
    <>
      <PageHero eyebrow="O nas" title="Ludzie, którzy odpowiadają" accent="za Twoją stronę"
        lead="Założycielami Mastalex są Karol Mastalerz i Aleks Popkowski." />
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6" aria-labelledby="zalozyciele-h">
        <h2 id="zalozyciele-h" className="sr-only">Założyciele</h2>
        <Founders people={people} full />
      </section>
      <Body>
        <h2>Jak pracujemy</h2>
        <ul>
          <li><strong>Najpierw projekt, potem płatność.</strong> Projekt i wycenę dostajesz za darmo, a płacisz dopiero po akceptacji.</li>
          <li><strong>Odpowiadamy za efekt.</strong> Prowadzimy projekt od pierwszej wiadomości do uruchomienia strony.</li>
          <li><strong>Strona jest Twoja.</strong> Po uruchomieniu strona i wszystkie dostępy do niej należą do Ciebie.</li>
          <li><strong>Przejrzyste ceny.</strong> Strona wizytówka kosztuje 500 zł, a ceny pozostałych usług znajdziesz w <a href="/cennik-stron-internetowych">cenniku</a>.</li>
        </ul>
        <h2>Nasze usługi</h2>
        <p><a href="/tworzenie-stron-internetowych">Tworzymy strony internetowe</a>, <a href="/przebudowa-strony-internetowej">przebudowujemy istniejące</a> i <a href="/optymalizacja-seo">wykonujemy SEO</a> dla firm z całej Polski. Całą współpracę prowadzimy online.</p>
      </Body>
      <CtaBand title="Opowiedz nam o swojej firmie" />
    </>
  )
}

/* ---------- /kontakt ---------- */
const WHAT_TO_WRITE = [
  'Czym zajmuje się Twoja firma i kim są Twoi klienci.',
  'Czy masz już stronę. Jeśli tak, podaj jej adres: przyda się przy przebudowie i SEO.',
  'Co ma być na stronie, np. oferta, cennik, zdjęcia.',
  'Strony, które Ci się podobają.',
]

const NEXT_STEPS = [
  ['Oglądasz projekt i wycenę', 'Decydujesz, czy chcesz iść dalej. Jeśli nie, nic nie płacisz.'],
  ['Dopracowanie projektu pod Twoją firmę', 'Mówisz, co zmienić, a my poprawiamy. Płacisz dopiero po akceptacji.'],
  ['Uruchomienie', 'Strona startuje, a ona i wszystkie dostępy do niej należą do Ciebie.'],
]

export function Kontakt() {
  return (
    <>
      <PageHero eyebrow="Kontakt" title="Opowiedz nam" accent="o swojej firmie"
        lead="Napisz kilka zdań o firmie i o tym, czego potrzebujesz. W 3 dni dostaniesz bezpłatny projekt strony i przejrzystą wycenę." />
      {/* Na telefonie formularz od razu pod nagłówkiem, na komputerze po prawej (audyt końcowy, PV-01). */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-4 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10">
        <div className="grid lg:col-start-2 lg:row-start-1">
          <ContactForm button="Wyślij zapytanie o stronę lub SEO" />
        </div>
        <div className="lg:col-start-1 lg:row-start-1">
          <dl className="grid gap-6 text-[17px]">
            <div><dt className="text-body text-[14px]">E-mail</dt><dd><a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center text-[22px] font-bold text-brand-deep underline underline-offset-4">{EMAIL}</a></dd></div>
          </dl>
          <h2 className="mt-12 text-[24px] font-bold">Co warto napisać</h2>
          <ul className="mt-4 grid gap-3">
            {WHAT_TO_WRITE.map((t) => (
              <li key={t} className="relative pl-7 text-[17px] leading-relaxed text-body"><span aria-hidden="true" className="absolute left-0 font-bold text-brand">✓</span>{t}</li>
            ))}
          </ul>
          <p className="mt-4 text-[17px] leading-relaxed text-body">Nie masz wszystkiego? Kilka zdań wystarczy. Im więcej szczegółów podasz, tym lepiej projekt trafi w Twoje potrzeby.</p>
          <h2 className="mt-12 text-[24px] font-bold">Co dalej</h2>
          <ol className="mt-4 grid gap-4">
            {NEXT_STEPS.map(([t, d], i) => (
              <li key={t} className="flex gap-4"><span aria-hidden="true" className="shrink-0 grid place-items-center w-9 h-9 rounded-xl bg-brand-soft text-brand-deep font-bold">{i + 1}</span><span><b>{t}.</b> <span className="text-body">{d}</span></span></li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

/* ---------- /polityka-prywatnosci ---------- */
export function Polityka() {
  return (
    <>
      <PageHero title="Polityka prywatności" lead="Jak przetwarzamy dane, które nam przekazujesz przez formularz kontaktowy lub e-mail." />
      <Body>
        <h2>Administrator danych</h2>
        <p>Administratorem danych osobowych jest {ADMIN.name}, prowadzący Mastalex. Kontakt w sprawie danych: <a href={`mailto:${ADMIN.email}`}>{ADMIN.email}</a>.</p>
        <h2>Jakie dane zbieramy i po co</h2>
        <p>Przez formularz kontaktowy zbieramy imię i nazwisko, adres e-mail i treść wiadomości. Używamy ich wyłącznie, żeby odpowiedzieć na Twoje zapytanie i przygotować projekt lub wycenę, o które prosisz. Podstawą jest podjęcie działań na Twoje żądanie przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).</p>
        <h2>Kto jeszcze ma dostęp do danych</h2>
        <p>Dane mogą trafić do firm, które świadczą dla nas usługi informatyczne: obsługę formularza, poczty e-mail, serwera strony i narzędzi do obsługi wiadomości. Przetwarzają je tylko w naszym imieniu i tylko w celu obsługi Twojego zapytania. Wiadomości z formularza przekazuje nam na e-mail usługa FormSubmit (formsubmit.co). Strona jest udostępniana przez GitHub Pages, który jako dostawca serwera może zapisywać techniczne dane o połączeniu, np. adres IP.</p>
        <h2>Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
        <p>Część tych dostawców ma siedzibę poza Europejskim Obszarem Gospodarczym, w USA. GitHub, Inc. (GitHub Pages) uczestniczy w programie EU-U.S. Data Privacy Framework, dla którego Komisja Europejska stwierdziła odpowiedni stopień ochrony danych, i stosuje standardowe klauzule umowne zatwierdzone przez Komisję. Zasady przetwarzania danych przez FormSubmit opisuje jego polityka prywatności na stronie formsubmit.co. Więcej informacji o zabezpieczeniach możesz otrzymać, pisząc na adres podany wyżej.</p>
        <h2>Jak długo przechowujemy dane</h2>
        <p>Korespondencję przechowujemy tak długo, jak jest potrzebna do obsługi zapytania i ewentualnej współpracy, a potem ją usuwamy.</p>
        <h2>Twoje prawa</h2>
        <p>Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz sprzeciwu. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych. W sprawie swoich danych napisz na <a href={`mailto:${ADMIN.email}`}>{ADMIN.email}</a>.</p>
        <h2>Pliki cookies</h2>
        <p>Strona nie używa plików cookies analitycznych ani reklamowych. Czcionki są wczytywane z naszego serwera, bez łączenia z zewnętrznymi usługami.</p>
        <p className="text-[15px]">Aktualizacja: {UPDATED_LABEL}.</p>
      </Body>
    </>
  )
}

/* ---------- 404 ---------- */
export function NotFound() {
  return (
    <PageHero eyebrow="Zły adres" title="Nie ma takiej strony." lead="Adres mógł się zmienić albo zawierać literówkę. Sprawdź nasze usługi albo wróć na stronę główną.">
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/" className="btn btn-primary">Strona główna</a>
        <a href="/tworzenie-stron-internetowych" className="btn btn-secondary">Tworzenie stron</a>
        <a href="/kontakt" className="btn btn-secondary">Kontakt</a>
      </div>
    </PageHero>
  )
}
