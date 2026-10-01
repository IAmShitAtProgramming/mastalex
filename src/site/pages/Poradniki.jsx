import { AUTORZY, EMAIL, ROUTES } from '../data.js'
import { CtaBand, PageHero } from '../ui.jsx'
import { CENNIKI_2026 } from '../zrodla-cen-2026.js'

// Dział Poradniki. Zasada wpisów: każda liczba ma źródło z linkiem i datą odczytu, własny osąd
// podajemy jako wniosek, a braki danych nazywamy wprost. Wpisy pisze Claude, publikacja za zgodą właściciela.

const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
export const dataPL = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MIESIACE[m - 1]} ${y}` }

const WPISY = Object.entries(ROUTES).filter(([, r]) => r.parent === '/poradniki/').map(([path, r]) => ({ path, ...r }))

/* ---------- /poradniki/ ---------- */
export function Poradniki() {
  return (
    <>
      <PageHero eyebrow="Poradniki" title="Poradniki dla firm," accent="które zamawiają stronę"
        lead="Sprawdzamy ceny na rynku i tłumaczymy, jak być wyżej w Google, żeby łatwiej było Ci zdecydować, co zrobić ze stroną. Każda liczba ma źródło i datę sprawdzenia." />
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-6" aria-labelledby="wpisy-h">
        <h2 id="wpisy-h" className="sr-only">Wpisy</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {WPISY.map((w) => (
            <li key={w.path}>
              <a href={w.path} className="group block h-full rounded-[28px] bg-paper border border-line p-7 no-underline text-ink transition-transform hover:-translate-y-1">
                <p className="text-[14px] text-body"><time dateTime={w.article.modified}>{dataPL(w.article.modified)}</time></p>
                <h3 className="mt-2 text-[24px] font-bold leading-tight tracking-[-0.01em]">{w.h1 ? w.h1.join(' ') : w.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-body">{w.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-deep">Czytaj poradnik <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  )
}

/* ---------- Układ wpisu ---------- */
function Naglowek({ path, title, lead }) {
  const r = ROUTES[path]
  const autor = AUTORZY.find((p) => p.id === r.article.author)
  return (
    <header className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-10 sm:pt-14">
      <h1 className="text-[36px] leading-[1.1] sm:text-[48px] lg:text-[56px] sm:leading-[1.05] font-bold tracking-[-0.035em] max-w-[22ch]">
        {r.h1 ? <>{r.h1[0]} <span className="serif block mt-2 text-brand text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.1] tracking-normal text-balance">{r.h1[1]}</span></> : title}
      </h1>
      <p className="mt-6 text-[19px] sm:text-[20px] leading-[1.6] text-ink max-w-[62ch]">{lead}</p>
      <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-body">
        <span>Autor: <a href="#autor" className="text-brand-deep underline underline-offset-4">{autor.name}</a>, {autor.rola}</span>
        <span>Opublikowano: <time dateTime={r.article.published}>{dataPL(r.article.published)}</time></span>
        {r.article.modified !== r.article.published && <span>Zaktualizowano: <time dateTime={r.article.modified}>{dataPL(r.article.modified)}</time></span>}
      </p>
    </header>
  )
}

function SpisTresci({ items }) {
  return (
    <nav aria-label="Spis treści" className="sticky top-24 rounded-[24px] bg-paper border border-line p-6">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-deep">Spis treści</p>
      <ol className="mt-3 grid gap-1 text-[15px]">
        {items.map(([id, t]) => <li key={id}><a href={`#${id}`} className="block py-1.5 text-body no-underline hover:text-ink">{t}</a></li>)}
      </ol>
    </nav>
  )
}

export function Tabela({ caption, head, rows, liczby = [] }) {
  return (
    <div className="tabela not-prose" role="region" aria-label={caption} tabIndex={0}>
      <table>
        <caption>{caption}</caption>
        <thead><tr>{head.map((h, i) => <th key={h} scope="col" className={liczby.includes(i) ? 'liczba' : undefined}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>{row.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i} className={liczby.includes(i) ? 'liczba' : undefined}>{c}</td>))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Autor({ id }) {
  const p = AUTORZY.find((f) => f.id === id)
  return (
    <aside id="autor" aria-label="O autorze" className="not-prose mt-14 rounded-[24px] bg-paper border border-line p-6">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-deep">Autor</p>
      <p className="mt-2 text-[20px] font-bold text-ink">{p.name}</p>
      <p className="mt-1 text-[16px] leading-relaxed text-body">{p.bio}</p>
      <p className="mt-3 text-[15px] text-body">Uwagi do danych? Napisz: <a href={`mailto:${EMAIL}`} className="text-brand-deep underline underline-offset-4">{EMAIL}</a></p>
    </aside>
  )
}

function Wpis({ path, title, lead, toc, children }) {
  return (
    <article>
      <Naglowek path={path} title={title} lead={lead} />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-10 grid lg:grid-cols-[1fr_300px] gap-12">
        <div className="prose-m min-w-0">
          {children}
          <Autor id={ROUTES[path].article.author} />
        </div>
        <div className="hidden lg:block"><SpisTresci items={toc} /></div>
      </div>
    </article>
  )
}

/* ---------- /poradniki/ile-kosztuje-strona-internetowa ---------- */
// Liczby: opieka/raporty/2026-09-30/weryfikacja-cen-2026.md (ceny sprawdzone u źródła 30.09.2026),
// domena i hosting: badania/wyniki/05-domena-hosting-ceny.md. Nasze ceny jak w PRICES (data.js), poza statystyką.
const KOLUMNY = [['w', 'Wizytówka'], ['f', 'Strona firmowa'], ['p', 'Przebudowa'], ['s', 'SEO bez abonamentu'], ['a', 'SEO w abonamencie']]
const zl = (n, mies) => (n ? `${n} zł${mies ? '/mies.' : ''}` : '—')

function ListaCennikow() {
  return (
    <details className="not-prose mt-6">
      <summary className="cursor-pointer text-[17px] font-semibold text-brand-deep underline underline-offset-4">Pokaż wszystkie {CENNIKI_2026.length} cenniki z cenami</summary>
      <div className="tabela" role="region" aria-label="Sprawdzone cenniki" tabIndex={0}>
        <table>
          <caption>Cena wejścia w każdym cenniku, sprawdzona 30 września 2026. Kreska oznacza, że cennik nie podaje ceny tej usługi.</caption>
          <thead><tr><th scope="col">Firma</th>{KOLUMNY.map(([k, h]) => <th key={k} scope="col" className="liczba">{h}</th>)}</tr></thead>
          <tbody>
            {CENNIKI_2026.map((c) => (
              <tr key={c.firma}>
                <th scope="row"><a href={c.url} rel="nofollow noopener noreferrer" target="_blank">{c.firma}</a></th>
                {KOLUMNY.map(([k]) => <td key={k} className="liczba">{zl(c[k], k === 'a')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

// Nasze ceny na tle cenników z CENNIKI_2026: [klucz, zakładka, nasza cena, nasza cena opisem].
const WYKRES_KAT = [['w', 'Wizytówka', 500, '500 zł'], ['f', 'Strona firmowa', 1500, '1500 zł'], ['s', 'SEO bez abonamentu', 300, 'od 300 zł']]

const mediana = (v) => (v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2)

function WykresSvg({ ceny, nasza, naszaTxt, W, H }) {
  const L = 56, R = 8, T = 14, B = 34
  const ymax = Math.ceil(Math.max(...ceny) / 1000) * 1000
  const x = (i) => L + (i * (W - L - R)) / (ceny.length - 1)
  const y = (v) => T + (1 - v / ymax) * (H - T - B)
  const med = mediana(ceny)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
      {Array.from({ length: ymax / 1000 + 1 }, (_, i) => i * 1000).map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-line" />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" className="fill-body text-[12px]">{v} zł</text>
        </g>
      ))}
      <line x1={L} x2={W - R} y1={y(med)} y2={y(med)} className="stroke-body" strokeWidth="1.5" strokeDasharray="5 5" />
      <polyline points={ceny.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')} fill="none" className="stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
      {ceny.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" className="fill-ink" />)}
      <line x1={L} x2={W - R} y1={y(nasza)} y2={y(nasza)} className="stroke-brand" strokeWidth="3" />
      <text x={W - R} y={y(nasza) - 8} textAnchor="end" className="fill-brand-deep text-[14px] font-bold">Mastalex: {naszaTxt}</text>
      <text x={L} y={H - 6} className="fill-body text-[12px]">od najtańszego do najdroższego cennika →</text>
    </svg>
  )
}

function WykresNaTle() {
  return (
    <div id="wykres" className="wykres mt-6 rounded-[20px] bg-paper p-3 sm:p-6">
      <h3 className="!mt-0 px-1 text-[20px] font-bold leading-tight text-ink">Nasze ceny na tle sprawdzonych cenników</h3>
      <p className="mt-2 px-1 text-[15px] leading-[1.55] text-body">Każda kropka to cena wejścia z jednego cennika. Fioletowa linia to nasza cena.</p>
      {WYKRES_KAT.map(([k], i) => <input key={k} type="radio" name="wykres-kat" id={`wk-${k}`} defaultChecked={i === 0} className="sr-only" />)}
      <div className="wk-zakladki mt-4 flex flex-wrap gap-2 px-1">
        {WYKRES_KAT.map(([k, nazwa]) => <label key={k} htmlFor={`wk-${k}`}>{nazwa}</label>)}
      </div>
      {WYKRES_KAT.map(([k, , nasza, naszaTxt]) => {
        const ceny = CENNIKI_2026.map((c) => c[k]).filter(Boolean).sort((a, b) => a - b)
        const drozsze = ceny.filter((v) => v > nasza).length, rowne = ceny.filter((v) => v === nasza).length
        return (
          <div key={k} className={`wk-panel wkp-${k} mt-4`}>
            <div className="sm:hidden"><WykresSvg ceny={ceny} nasza={nasza} naszaTxt={naszaTxt} W={300} H={250} /></div>
            <div className="hidden sm:block"><WykresSvg ceny={ceny} nasza={nasza} naszaTxt={naszaTxt} W={600} H={300} /></div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 px-1 text-[14px] text-body">
              <li className="flex items-center gap-2"><span aria-hidden="true" className="h-[3px] w-5 rounded bg-ink" />Ceny wejścia w {ceny.length} cennikach</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="w-5 border-t-2 border-dashed border-body" />Środkowa cena: {Math.round(mediana(ceny))} zł</li>
              <li className="flex items-center gap-2"><span aria-hidden="true" className="h-[3px] w-5 rounded bg-brand" />Mastalex: {naszaTxt}</li>
            </ul>
            <p className="mt-2 px-1 text-[15px] font-semibold text-ink">Wyższą cenę wejścia ma {drozsze} z {ceny.length} cenników{rowne ? `, a taką samą ${rowne}` : ''}.</p>
          </div>
        )
      })}
      <p className="mt-3 px-1 text-[14px] text-body">Przebudowy nie ma na wykresie, bo cenników z jej ceną jest za mało.</p>
    </div>
  )
}

function NaszeCeny() {
  const wiersze = [['Strona wizytówka', '500 zł'], ['Strona firmowa do 5 podstron', '1500 zł'], ['Przebudowa wizytówki', '400 zł'], ['Przebudowa strony firmowej', '1200 zł'], ['Optymalizacja SEO', 'od 300 zł']]
  return (
    <section aria-labelledby="nasze-ceny" className="not-prose mt-14 rounded-[24px] bg-brand-soft p-6 sm:p-8">
      <h2 id="nasze-ceny" className="mt-0 text-[26px] sm:text-[30px] font-bold leading-tight tracking-[-0.02em]">Ile kosztuje strona w Mastalex</h2>
      <p className="mt-3 text-[17px] leading-[1.6] text-body">Naszych cen nie wliczaliśmy do zestawienia. Pokazujemy je osobno, żeby łatwo było je porównać z rynkiem.</p>
      <ul className="mt-5 grid gap-0">
        {wiersze.map(([n, c]) => (
          <li key={n} className="flex items-baseline justify-between gap-4 border-b border-brand/15 py-3 text-[17px]"><span className="text-ink">{n}</span><strong className="whitespace-nowrap text-ink">{c}</strong></li>
        ))}
      </ul>
      <WykresNaTle />
      <p className="mt-5 text-[17px] leading-[1.6] text-body">Najpierw dostajesz bezpłatny projekt, a płacisz dopiero po jego akceptacji. Teksty piszemy za Ciebie. Przy nowej stronie domenę i hosting opłacasz osobno.</p>
      <a href="/cennik-stron-internetowych" className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-deep no-underline">Zobacz cennik stron internetowych <span aria-hidden="true">→</span></a>
    </section>
  )
}

const PYTANIA = [
  ['Czy ceny stron internetowych zawierają VAT?', 'To zależy od firmy. Wiele cenników podaje ceny netto, czyli bez VAT. Wtedy do ceny doliczasz 23%: strona za 1500 zł netto kosztuje 1845 zł brutto. Jeśli cennik tego nie pisze, zapytaj przed zamówieniem.'],
  ['Ile kosztuje utrzymanie strony co roku?', 'Co roku płacisz za domenę i hosting. W pierwszym roku razem to ok. 60–120 zł, w kolejnych latach ok. 230–530 zł rocznie (ceny z VAT, wrzesień 2026).'],
  ['Jaka jest średnia cena strony internetowej?', 'Średnia cena wejścia strony wizytówki to 1764 zł, a strony firmowej 3268 zł. Średnią podnosi kilka bardzo drogich ofert, dlatego typową cenę lepiej pokazuje środkowa cena z tabeli wyżej.'],
  ['Dlaczego ceny stron tak bardzo się różnią?', 'W sprawdzonych cennikach cenę zmieniają przede wszystkim trzy rzeczy: liczba podstron, teksty i wygląd, czyli gotowy szablon albo projekt od zera. Dwie oferty za tę samą kwotę mogą więc obejmować zupełnie inny zakres.'],
  ['Ile trwa zrobienie strony internetowej?', 'W 5 cennikach, które podają czas, wizytówka jest gotowa w 7–14 dni. W jednym z cenników strona firmowa do 10 podstron powstaje w 14–21 dni.'],
]

export function WpisIleKosztuje() {
  const path = '/poradniki/ile-kosztuje-strona-internetowa'
  const toc = [
    ['w-skrocie', 'W skrócie'], ['tabela', 'Ceny w tabeli'], ['wizytowka', 'Strona wizytówka'], ['firmowa', 'Strona firmowa'],
    ['przebudowa', 'Przebudowa strony'], ['seo', 'SEO'], ['w-cenie', 'Co jest w cenie'], ['domena-i-hosting', 'Domena i hosting'],
    ['kiedy-placisz', 'Kiedy płacisz'], ['jak-czytac-cennik', 'Jak czytać cennik'], ['nasze-ceny', 'Nasze ceny'],
    ['jak-zebralismy-dane', 'Jak zebraliśmy dane'], ['pytania', 'Częste pytania'],
  ]
  return (
    <>
      <Wpis path={path} title={ROUTES[path].title} toc={toc}
        lead="Strona internetowa kosztuje w 2026 roku od kilkuset do kilku tysięcy złotych. Sprawdziliśmy cenniki 52 polskich firm, żeby pokazać, ile najczęściej kosztuje strona, co jest w cenie i za co płacisz osobno.">
        <h2 id="w-skrocie" className="!mt-0">W skrócie</h2>
        <p>Strona wizytówka kosztuje najczęściej od 1200 do 2000 zł, a strona firmowa od 2000 do 4000 zł. W tych przedziałach mieści się 16 z 24 cenników wizytówek i 17 z 25 cenników stron firmowych, które sprawdziliśmy 30 września 2026 roku. To ceny wejścia, czyli najniższe kwoty z cenników. Ile zapłacisz, zależy od zakresu Twojej strony.</p>
        <nav aria-label="Na skróty" className="not-prose mt-5">
          <p className="text-[15px] font-semibold text-ink">Przejdź od razu do:</p>
          <ul className="mt-2 flex flex-wrap gap-2 text-[15px] font-semibold">
            <li><a href="#wykres" className="block rounded-[12px] bg-brand px-3.5 py-2 text-white no-underline hover:bg-brand-deep">Wykres: nasze ceny na tle rynku</a></li>
            {[['tabela', 'Ceny w tabeli'], ['w-cenie', 'Co jest w cenie'], ['pytania', 'Częste pytania']].map(([id, t]) => (
              <li key={id}><a href={`#${id}`} className="block rounded-[12px] bg-brand-soft px-3.5 py-2 text-brand-deep no-underline hover:bg-brand/15">{t}</a></li>
            ))}
          </ul>
        </nav>

        <h2 id="tabela">Ceny stron internetowych 2026 w tabeli</h2>
        <p>Środkowa cena to mediana: połowa cenników jest od niej tańsza, a połowa droższa. Typową cenę pokazuje lepiej niż średnia, bo nie podnoszą jej pojedyncze bardzo drogie oferty.</p>
        <Tabela caption="Ceny wejścia w cennikach polskich firm, sprawdzone 30 września 2026. Kwoty jak w cennikach: część netto, część brutto."
          head={['Usługa', 'Cenniki', 'Najniższa', 'Środkowa', 'Najwyższa']} liczby={[1, 2, 3, 4]}
          rows={[
            ['Strona wizytówka', '24', '649 zł', '1500 zł', '3900 zł'],
            ['Strona firmowa', '25', '949 zł', '2999 zł', '6900 zł'],
            ['Przebudowa strony', '4', '500 zł', '—', '3500 zł'],
            ['SEO bez abonamentu', '16', '290 zł', '1500 zł', '4800 zł'],
            ['SEO w abonamencie', '12', '400 zł/mies.', '700 zł/mies.', '1990 zł/mies.'],
          ]} />
        <p>Przy przebudowie środkowej ceny nie liczymy, bo cenników jest za mało. Kwoty za SEO w abonamencie są miesięczne, pozostałe płacisz raz.</p>

        <h2 id="wizytowka">Ile kosztuje strona wizytówka</h2>
        <p>Strona wizytówka to najprostsza strona firmy. Mówi, czym się zajmujesz, i pozwala szybko się z Tobą skontaktować. Tylko 3 z 24 sprawdzonych cenników schodzą poniżej 1200 zł, a 5 przekracza 2000 zł.</p>
        <p>Sama nazwa niewiele mówi o tym, co dostajesz. W części cenników wizytówka to jedna strona, w innych nawet 5 podstron. Porównuj więc zakres, a nie nazwę pakietu.</p>
        <p>Cenę zmienia też wygląd. W jednym z cenników strona do 5 podstron kosztuje 2400 zł na gotowym szablonie i 3900 zł z projektem przygotowanym od zera. Szablon to gotowy wygląd, z którego mogą korzystać też inne strony.</p>

        <h2 id="firmowa">Ile kosztuje strona firmowa</h2>
        <p>Strona firmowa ma kilka podstron, np. osobną dla każdej usługi. Poniżej 2000 zł kosztuje w 3 z 25 sprawdzonych cenników, a powyżej 4000 zł w 5.</p>
        <p>Koszt strony internetowej dla firmy rośnie razem z liczbą podstron. W jednym z cenników strona do 5 podstron kosztuje 1500 zł, a do 10 podstron z blogiem 3500 zł. Drugą dużą pozycją są teksty, jeśli nie masz ich gotowych (więcej niżej).</p>
        <p><strong>Wniosek:</strong> prosząc o wycenę, podaj liczbę podstron i napisz, czy masz własne teksty. Wtedy oferty różnych firm da się porównać. Jak powstaje strona u nas, od bezpłatnego projektu do uruchomienia, pokazujemy na stronie o <a href="/tworzenie-stron-internetowych">tworzeniu stron internetowych</a>.</p>

        <h2 id="przebudowa">Ile kosztuje przebudowa strony</h2>
        <p>Przebudowa to nowy wygląd i aktualna treść na stronie, którą już masz. Cenę przebudowy znaleźliśmy tylko w 4 cennikach: 500, 2000, 3500 i 3500 zł. Najniższa kwota dotyczy samego odświeżenia wyglądu.</p>
        <p><strong>Wniosek:</strong> o cenę przebudowy pytaj wprost i sprawdź, co z obecnej strony zostanie wykorzystane. Jak wygląda u nas <a href="/przebudowa-strony-internetowej">przebudowa strony internetowej</a>, opisujemy na osobnej stronie.</p>

        <h2 id="seo">Ile kosztuje SEO: raz czy co miesiąc</h2>
        <p>SEO to prace, dzięki którym strona pojawia się wyżej w Google. Płacisz za nie raz albo co miesiąc, w abonamencie.</p>
        <p><strong>Bez abonamentu.</strong> Połowa z 16 cenników mieści się w przedziale 1000–2000 zł. Cztery schodzą poniżej 1000 zł, a cztery przekraczają 2000 zł. W tej grupie są zarówno same audyty, czyli lista rzeczy do poprawy, jak i optymalizacja, w której firma od razu wprowadza poprawki. Zapytaj, co dokładnie obejmuje cena.</p>
        <p><strong>W abonamencie.</strong> W 8 z 12 cenników abonament kosztuje do 1000 zł miesięcznie. Przy środkowej cenie 700 zł miesięcznie rok abonamentu kosztuje 8400 zł.</p>
        <p><strong>Wniosek:</strong> abonament ma sens, gdy firma co miesiąc wykonuje przy stronie konkretne prace. Zanim go wybierzesz, zapytaj, co konkretnie dostajesz każdego miesiąca. Zobacz też, co obejmuje nasza <a href="/optymalizacja-seo">optymalizacja SEO</a>.</p>

        <h2 id="w-cenie">Co jest w cenie, a za co płacisz osobno</h2>
        <p>Znaleźliśmy 9 cenników, które wprost piszą, czy domena, hosting albo teksty są w cenie. Tak to wygląda:</p>
        <Tabela caption="Liczba cenników, które wprost opisują dany koszt (9 cenników, 30 września 2026)."
          head={['Koszt', 'W cenie', 'Płatne osobno']} liczby={[1, 2]}
          rows={[
            ['Domena (adres strony)', '1', '5'],
            ['Hosting (miejsce, w którym strona działa)', '3', '3'],
            ['Teksty na stronę', '1', '4'],
          ]} />
        <p>Najwięcej kosztują zwykle teksty. W sprawdzonych cennikach to od 100 zł za sekcję strony, 150–300 zł za stronę albo od 300 zł netto za podstronę. Przy 5 podstronach i cenie 150–300 zł za stronę dopłata wynosi 750–1500 zł.</p>
        <p>Płatne bywają też drobne dodatki. W jednym z cenników formularz kontaktowy kosztuje dodatkowo 300 zł, a możliwość samodzielnej zmiany treści 500 zł.</p>
        <p><strong>Wniosek:</strong> poproś o wycenę, która wymienia wszystko, co dostajesz. Jeśli czegoś w niej brakuje, zapytaj, czy to dopłata.</p>

        <h2 id="domena-i-hosting">Domena i hosting: ile kosztują co roku</h2>
        <p>Przy nowej stronie za domenę i hosting płacisz co roku. Ceny z VAT według cenników{' '}
          <a href="https://www.ovhcloud.com/pl/domains/tld/pl/" rel="nofollow noopener noreferrer" target="_blank">OVHcloud</a>,{' '}
          <a href="https://cyberfolks.pl/domeny/cennik/" rel="nofollow noopener noreferrer" target="_blank">cyber_Folks</a>,{' '}
          <a href="https://www.lh.pl/hosting" rel="nofollow noopener noreferrer" target="_blank">LH.pl</a> i{' '}
          <a href="https://home.pl/cennik/" rel="nofollow noopener noreferrer" target="_blank">home.pl</a> z 30 września 2026:</p>
        <ul>
          <li><strong>Domena .pl:</strong> w pierwszym roku ok. 1–20 zł, w kolejnych latach ok. 70–220 zł rocznie.</li>
          <li><strong>Hosting małej strony:</strong> w pierwszym roku ok. 60–100 zł, w kolejnych latach ok. 160–310 zł rocznie.</li>
        </ul>
        <p>Pierwszy rok jest wyraźnie tańszy niż kolejne. Sprawdź więc cenę za kolejne lata, bo to ją płacisz najdłużej.</p>

        <h2 id="kiedy-placisz">Kiedy płacisz za stronę</h2>
        <p>Cenniki rzadko o tym piszą. Znaleźliśmy tylko 3, które opisują zaliczkę, i 2, w których projekt widać przed płatnością. Spotkaliśmy trzy sposoby:</p>
        <ul>
          <li><strong>Połowa na start:</strong> 50% przy rozpoczęciu pracy i 50% po akceptacji projektu.</li>
          <li><strong>Mała zaliczka:</strong> 20% na start i 80% po akceptacji gotowej strony.</li>
          <li><strong>Bez zaliczki:</strong> najpierw widzisz projekt, potem decydujesz. W jednym z cenników projekt strony głównej jest gotowy po 2 dniach roboczych.</li>
        </ul>
        <p><strong>Wniosek:</strong> najmniej ryzykujesz, gdy płacisz po zobaczeniu projektu. Jeśli firma chce zaliczki, zapytaj, co się z nią stanie, gdy projekt Ci się nie spodoba.</p>

        <h2 id="jak-czytac-cennik">Jak czytać cennik strony internetowej</h2>
        <p>Zanim porównasz dwie oferty, sprawdź w każdej te same rzeczy:</p>
        <ol>
          <li><strong>Netto czy brutto.</strong> Od tego zależy, ile naprawdę zapłacisz.</li>
          <li><strong>Liczba podstron.</strong> Ta sama nazwa pakietu może oznaczać jedną stronę albo pięć.</li>
          <li><strong>Teksty.</strong> Kto je pisze i czy za nie dopłacasz.</li>
          <li><strong>Domena i hosting.</strong> Czy są w cenie i ile kosztują od drugiego roku.</li>
          <li><strong>Wygląd.</strong> Gotowy szablon czy projekt od zera, przygotowany tylko dla Ciebie.</li>
          <li><strong>Moment płatności.</strong> Przed czy po zobaczeniu projektu.</li>
          <li><strong>Słowo „od”.</strong> Poproś o cenę dla Twojego zakresu, a nie dla najmniejszego pakietu.</li>
          <li><strong>SEO.</strong> Czy cena obejmuje sam audyt, czy także poprawki.</li>
        </ol>

        <NaszeCeny />

        <h2 id="jak-zebralismy-dane">Jak zebraliśmy dane</h2>
        <p>Ceny sprawdziliśmy 30 września 2026 roku na stronach 52 polskich firm, które publikują cennik. Firmy znaleźliśmy, szukając w internecie cenników stron internetowych i SEO. Każdą cenę odczytaliśmy bezpośrednio z cennika firmy.</p>
        <ul>
          <li>Cena wejścia to kwota „od” albo najniższa kwota z przedziału. Liczymy ceny regularne, nie promocyjne.</li>
          <li>Kwoty podajemy tak jak w cennikach, bez przeliczania VAT.</li>
          <li>Pominęliśmy ceny stron promujących jedną ofertę, ceny miesięczne za samą stronę, ceny bez jasnego okresu płatności i ogólne szacunki rynku zamiast cen firmy.</li>
          <li>Dwa cenniki pochodzą z 2025 roku, ale firmy nadal je publikują.</li>
        </ul>
        <ListaCennikow />

        <h2 id="pytania">Częste pytania</h2>
        <div className="faq not-prose mt-4">
          {PYTANIA.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><div className="a">{a}</div></details>
          ))}
        </div>
      </Wpis>
      <CtaBand title="Zobacz projekt swojej strony za darmo" />
    </>
  )
}

/* ---------- /poradniki/jak-byc-wyzej-w-google ---------- */
// Treść poradnika „Twoja firma wyżej w Google” (opieka/reklamy/poradnik-google/poradnik.html), do którego prowadzi
// wiadomość z Instagrama po komentarzu STRONA. Kroki 1–5 mają instrukcję, kroki 6–8 tłumaczą co i po co, bez „jak”.
// Strony Google przeczytane u źródła 1 października 2026.
const ZEW = { rel: 'nofollow noopener noreferrer', target: '_blank' }

function Zrodlo({ children }) {
  return <p className="!text-[15px] !leading-[1.55]">Źródło: {children}, przeczytane 1 października 2026.</p>
}

function Krok({ id, nr, trudne, children }) {
  return (
    <h2 id={id}>
      <span className={`mb-3 block w-fit rounded-full px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.06em] ${trudne ? 'bg-peach text-peach-ink' : 'bg-mint text-mint-ink'}`}>
        Krok {nr}<span className="sr-only">:</span>
      </span>{' '}
      {children}
    </h2>
  )
}

function Uczciwie({ children }) {
  return (
    <aside className="not-prose mt-6 rounded-[20px] bg-brand-soft p-5 sm:p-6">
      <p className="text-[17px] leading-[1.6] text-ink"><strong>Uczciwie:</strong> {children}</p>
      <a href="/optymalizacja-seo" className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-deep no-underline">Zrobimy to za Ciebie <span aria-hidden="true">→</span></a>
    </aside>
  )
}

function Kod({ podpis, children }) {
  return (
    <figure className="not-prose mt-6">
      <pre className="overflow-x-auto rounded-[20px] bg-night p-5 font-mono text-[14px] leading-[1.6] text-white/90"><code>{children}</code></pre>
      <figcaption className="mt-2 text-[14px] leading-[1.5] text-body">{podpis}</figcaption>
    </figure>
  )
}

const KOD_STRONY = `<head>
  <title>Strona główna</title>
  <meta name="robots" content="noindex">
  <script src="slider.js"></script>
</head>
<body>
  <img src="IMG_2041.jpg">
  <div class="btn">…`

const KOD_FIRMY = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Salon Anna",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Długa 5",
    "addressLocality": "Kraków"
  },
  "telephone": "+48 600 000 000",
  "openingHoursSpecification": [ … ]
}
</script>`

const ODHACZ = [
  ['Zrobisz sam', ['Google widzi moją stronę', 'Profil Firmy założony, potwierdzony i uzupełniony', 'Zdjęcia: wejście, wnętrze, zespół, efekty pracy', 'Proszę klientów o opinie i odpowiadam na każdą', 'Firma w katalogach, wszędzie te same dane']],
  ['Kod strony', ['Strona otwiera się od razu, wszystkie wyniki zielone', 'Google czyta każdą podstronę', 'Dane firmy zapisane w kodzie']],
]

function ListaDoOdhaczenia() {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
      {ODHACZ.map(([t, punkty], g) => (
        <div key={t} role="group" aria-labelledby={`odhacz-${g}`} className="rounded-[20px] border border-line bg-paper p-5">
          <p id={`odhacz-${g}`} className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-deep">{t}</p>
          <ul className="mt-3 grid gap-2.5">
            {punkty.map((p) => (
              <li key={p}><label className="flex cursor-pointer gap-3 text-[16px] leading-[1.5] text-ink"><input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-brand" />{p}</label></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const PYTANIA_GOOGLE = [
  ['Czy mogę sam poprawić pozycję firmy w Google?', 'Tak, w dużej części. Kroki 1–5 z tego poradnika zrobisz sam, bez wiedzy technicznej: Profil Firmy, zdjęcia, opinie i wpisy w katalogach. Kroki 6–8 to praca w kodzie strony.'],
  ['Po jakim czasie zobaczę efekty?', 'Według Google jedne zmiany widać po kilku godzinach, a inne dopiero po kilku miesiącach. Daj sobie kilka tygodni, zanim ocenisz wynik.'],
  ['Czy mogę dać klientowi rabat za opinię?', 'Nie. Zasady Map Google zabraniają płacenia za opinie i dawania za nie rabatów, prezentów ani darmowych usług. Takie opinie Google usuwa.'],
  ['Ile kosztuje poprawa kodu strony pod Google?', <>U nas optymalizacja SEO kosztuje od 300 zł. W 16 cennikach polskich firm, które sprawdziliśmy 30 września 2026, środkowa cena SEO bez abonamentu to 1500 zł. Więcej liczb znajdziesz w poradniku <a href="/poradniki/ile-kosztuje-strona-internetowa">Ile kosztuje strona internetowa w 2026?</a></>],
  ['Moja strona ma kilka lat i w teście wypada na czerwono. Poprawiać czy zmienić?', <><strong>Wniosek:</strong> gdy strona jest stara, a test z kroku 6 pokazuje czerwone wyniki, często prościej jest ją przebudować, niż poprawiać po kawałku. Zobacz, jak wygląda <a href="/przebudowa-strony-internetowej">przebudowa strony internetowej</a>.</>],
]

export function WpisWyzejWGoogle() {
  const path = '/poradniki/jak-byc-wyzej-w-google'
  const toc = [
    ['w-skrocie', 'W skrócie'], ['jak-google-wybiera', 'Jak Google wybiera firmy'], ['krok-1', '1. Czy Google widzi stronę'],
    ['krok-2', '2. Profil Firmy w Google'], ['krok-3', '3. Zdjęcia'], ['krok-4', '4. Opinie'], ['krok-5', '5. Inne strony o Tobie'],
    ['kod-strony', 'Czego nie widać: kod strony'], ['krok-6', '6. Szybka strona'], ['krok-7', '7. Każda podstrona w Google'],
    ['krok-8', '8. Dane firmy w kodzie'], ['efekty', 'Kiedy zobaczysz efekty'], ['lista', 'Lista do odhaczenia'], ['pytania', 'Częste pytania'],
  ]
  return (
    <>
      <Wpis path={path} title={ROUTES[path].title} toc={toc}
        lead="Google pokazuje wyżej firmy, które pasują do tego, czego ktoś szuka, i są dobrze znane. Oto 8 kroków opartych na oficjalnych poradach Google. Pięć zrobisz sam od razu, a trzy pozostałe dotyczą kodu strony: wyjaśniamy, co dają i co trzeba w nich zrobić.">
        <h2 id="w-skrocie" className="!mt-0">W skrócie</h2>
        <p>Na to, czy klient z okolicy znajdzie Twoją firmę, wpływają trafność, odległość i renoma. Na odległość nie masz wpływu, na pozostałe dwie masz. Kroki 1–5 zrobisz sam, nawet dziś. Kroki 6–8 to kod strony: najważniejsza część, bo od niego zależy, czy strona jest szybka i czy Google dobrze ją rozumie.</p>
        <nav aria-label="Na skróty" className="not-prose mt-5">
          <p className="text-[15px] font-semibold text-ink">Przejdź od razu do:</p>
          <ul className="mt-2 flex flex-wrap gap-2 text-[15px] font-semibold">
            <li><a href="#lista" className="block rounded-[12px] bg-brand px-3.5 py-2 text-white no-underline hover:bg-brand-deep">Lista do odhaczenia</a></li>
            {[['krok-1', 'Kroki 1–5: zrobisz sam'], ['kod-strony', 'Kroki 6–8: kod strony'], ['pytania', 'Częste pytania']].map(([id, t]) => (
              <li key={id}><a href={`#${id}`} className="block rounded-[12px] bg-brand-soft px-3.5 py-2 text-brand-deep no-underline hover:bg-brand/15">{t}</a></li>
            ))}
          </ul>
        </nav>

        <h2 id="jak-google-wybiera">Jak Google wybiera firmy z okolicy</h2>
        <p>Gdy ktoś wpisuje „fryzjer” albo „mechanik w pobliżu”, Google bierze pod uwagę trzy rzeczy:</p>
        <ul>
          <li><strong>Trafność:</strong> czy Twoja firma pasuje do tego, czego ktoś szuka.</li>
          <li><strong>Odległość:</strong> jak daleko jesteś od osoby, która szuka.</li>
          <li><strong>Renoma:</strong> jak znana jest Twoja firma, czyli między innymi ile stron do niej prowadzi i ile masz opinii.</li>
        </ul>
        <Zrodlo><a href="https://support.google.com/business/answer/7091" {...ZEW}>Google, „Tips to improve your local ranking on Google”</a></Zrodlo>

        <Krok id="krok-1" nr={1}>Sprawdź, czy Google w ogóle widzi Twoją stronę</Krok>
        <p><strong>Dlaczego?</strong> Jeśli Google nie ma Twojej strony w swoich zbiorach, nikt jej tam nie znajdzie, nawet najładniejszej.</p>
        <ol>
          <li>Wpisz w Google: <strong>site:twojastrona.pl</strong> (z adresem swojej strony, bez spacji po dwukropku).</li>
          <li>Policz wyniki. To są podstrony, które Google zna.</li>
          <li>Porównaj z tym, ile podstron naprawdę masz: usługi, cennik, kontakt.</li>
        </ol>
        <p>Pusto albo brakuje ważnych podstron? To znak, że Google ma kłopot z czytaniem Twojej strony. Więcej o tym w <a href="#krok-7">kroku 7</a>. Nie masz jeszcze strony? Zobacz, jak <a href="/tworzenie-stron-internetowych">tworzymy strony internetowe</a>: najpierw dostajesz bezpłatny projekt.</p>
        <Zrodlo><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" {...ZEW}>Google, „SEO Starter Guide”</a></Zrodlo>

        <Krok id="krok-2" nr={2}>Załóż i uzupełnij Profil Firmy w Google</Krok>
        <p><strong>Dlaczego?</strong> To wizytówka, którą klient widzi w Mapach i obok wyników wyszukiwania. Google pisze wprost: firmy z pełnymi i dokładnymi informacjami częściej pojawiają się w lokalnych wynikach.</p>
        <ol>
          <li>Wejdź na <a href="https://www.google.com/business/" {...ZEW}>google.com/business</a> i załóż profil albo przejmij ten, który już istnieje.</li>
          <li>Potwierdź, że firma jest Twoja. Według Google dzięki temu profil częściej pokazuje się w wynikach.</li>
          <li>Uzupełnij wszystko: adres, godziny otwarcia, telefon, stronę, kategorię i udogodnienia, np. parking albo płatność kartą.</li>
          <li>Każdą zmianę wpisuj od razu: godziny w święta, nowy numer, nowa usługa.</li>
        </ol>
        <Zrodlo><a href="https://support.google.com/business/answer/7091" {...ZEW}>Google, „Tips to improve your local ranking on Google”</a></Zrodlo>

        <Krok id="krok-3" nr={3}>Pokaż się na zdjęciach</Krok>
        <p><strong>Dlaczego?</strong> Klient chce zobaczyć, dokąd idzie i co dostanie. Google zachęca, żeby zdjęciami i filmami pokazać, co oferujesz, i opowiedzieć historię firmy.</p>
        <ol>
          <li>Dodaj do Profilu Firmy zdjęcie wejścia z zewnątrz. Wtedy klient łatwo trafi na miejsce.</li>
          <li>Pokaż wnętrze, zespół i efekty pracy: fryzury, naprawione auta, wykończone łazienki.</li>
          <li>Nagraj krótki film z pracy. Wystarczy telefon.</li>
          <li>Dorzucaj nowe zdjęcia co jakiś czas, np. raz w miesiącu. Aktualny profil wygląda na firmę, która działa.</li>
        </ol>
        <Zrodlo><a href="https://support.google.com/business/answer/7091" {...ZEW}>Google, „Tips to improve your local ranking on Google”</a></Zrodlo>

        <Krok id="krok-4" nr={4}>Zbieraj opinie i odpowiadaj na każdą</Krok>
        <p><strong>Dlaczego?</strong> Liczba opinii wpływa na to, jak znana jest Twoja firma w oczach Google. Według Google dobre opinie i pomocne odpowiedzi wyróżniają firmę.</p>
        <ol>
          <li>Proś zadowolonych klientów o opinię, najlepiej od razu po usłudze.</li>
          <li>Wyślij im bezpośredni link do wystawienia opinii. Znajdziesz go w swoim Profilu Firmy.</li>
          <li>Odpowiadaj na każdą opinię, także krytyczną: spokojnie i konkretnie. Google pisze, że odpowiedź pokazuje, że cenisz zdanie klientów.</li>
          <li>Nie płać za opinie i nie dawaj za nie rabatów ani prezentów. Zasady Map Google tego zabraniają, a takie opinie są usuwane.</li>
        </ol>
        <Zrodlo><a href="https://support.google.com/business/answer/7091" {...ZEW}>Google, „Tips to improve your local ranking on Google”</a>; <a href="https://support.google.com/contributionpolicy/answer/7400114" {...ZEW}>zasady treści w Mapach Google</a></Zrodlo>

        <Krok id="krok-5" nr={5}>Niech inne strony mówią o Tobie</Krok>
        <p><strong>Dlaczego?</strong> Google ocenia, jak znana jest Twoja firma, między innymi po tym, ile stron do niej prowadzi.</p>
        <ol>
          <li>Wpisz firmę do katalogów firm, np. Panorama Firm i pkt.pl, oraz na portale swojej branży.</li>
          <li>Poproś partnerów, dostawców i stowarzyszenia, do których należysz, o link do Twojej strony.</li>
          <li>Daj znać lokalnym portalom i mediom o nowej usłudze, akcji albo wydarzeniu.</li>
          <li>Wszędzie podawaj tę samą nazwę, adres i telefon. Wtedy nie ma wątpliwości, że to ta sama firma.</li>
        </ol>
        <Zrodlo><a href="https://support.google.com/business/answer/7091" {...ZEW}>Google, „Tips to improve your local ranking on Google”</a></Zrodlo>

        <h2 id="kod-strony">Kroki 6–8: to, czego nie widać, czyli kod strony</h2>
        <p>Klient widzi zdjęcia, teksty i przyciski. Google widzi coś innego: kod, czyli zapis, z którego przeglądarka składa Twoją stronę.</p>
        <Kod podpis="Tak mniej więcej wygląda strona dla Google. Ten przykład ma kłopot już w trzeciej linijce: każe Google pominąć stronę.">{KOD_STRONY}</Kod>
        <p>Z kodu Google dowiaduje się, czy strona jest szybka, które podstrony ma przeczytać i czym zajmuje się Twoja firma. Możesz mieć świetne usługi, a Google i tak wybierze konkurencję, jeśli jej strona jest szybsza i łatwiejsza do przeczytania. Dlatego kroki 6–8 to najważniejsza część poradnika.</p>

        <Krok id="krok-6" nr={6} trudne>Strona, która otwiera się od razu</Krok>
        <p>Google mierzy, jak Twoja strona działa u prawdziwych osób, które ją odwiedzają. Sprawdza trzy rzeczy:</p>
        <Tabela caption="Dobre wyniki według Google (strona Google zaktualizowana 10 grudnia 2025, przeczytana 1 października 2026)."
          head={['Co mierzy Google', 'Dobry wynik']} liczby={[1]}
          rows={[
            ['Jak szybko pojawia się najważniejsza część strony', 'do 2,5 s'],
            ['Jak szybko strona reaguje na dotknięcie palcem', 'poniżej 0,2 s'],
            ['Czy nic nie skacze podczas wczytywania, np. przycisk, który ucieka spod palca', 'wynik poniżej 0,1'],
          ]} />
        <p><strong>Jak to sobie wyobrazić?</strong> To sklep, w którym drzwi otwierają się dopiero po kilku sekundach, a półki przesuwają się, gdy sięgasz po towar. Klient nie czeka, tylko idzie do sąsiada.</p>
        <p><strong>Co Ci to daje?</strong> Google pisze, że właśnie takie strony chcą nagradzać jego główne systemy oceniające. Do tego mniej klientów zamyka Twoją stronę i klika konkurencję.</p>
        <h3>Sprawdź sam w 2 minuty</h3>
        <p>Wejdź na <a href="https://pagespeed.web.dev/" {...ZEW}>pagespeed.web.dev</a> i wpisz adres swojej strony. Patrz na wynik dla telefonu. Zielony jest dobry. Pomarańczowy albo czerwony oznacza, że Google widzi problem.</p>
        <h3>Co trzeba zrobić, żeby było zielono</h3>
        <ul>
          <li>Przerobić każde zdjęcie: zmniejszyć je i zapisać w lżejszym formacie tak, żeby nie straciło jakości.</li>
          <li>Ustawić kolejność wczytywania: najpierw to, co klient widzi, reszta później.</li>
          <li>Wyciąć z kodu wszystko, czego strona nie używa, a co i tak musi wczytać.</li>
          <li>Zarezerwować miejsce na zdjęcia i przyciski, żeby nic nie skakało.</li>
          <li>Ustawić, żeby przeglądarka zapamiętywała stronę i przy kolejnej wizycie nie pobierała jej od nowa.</li>
          <li>Mierzyć i poprawiać, aż wszystkie trzy wyniki będą zielone.</li>
        </ul>
        <Uczciwie>to praca w kodzie strony. Każdą zmianę trzeba sprawdzić na telefonie i komputerze, bo jedna pomyłka potrafi popsuć wygląd całej strony.</Uczciwie>
        <Zrodlo><a href="https://developers.google.com/search/docs/appearance/core-web-vitals" {...ZEW}>Google, „Understanding Core Web Vitals and Google search results”</a></Zrodlo>

        <Krok id="krok-7" nr={7} trudne>Google musi przeczytać każdą podstronę</Krok>
        <p>Google nie ogląda stron jak człowiek. Wysyła automatycznego czytelnika, czyli robota. Robot przechodzi po Twojej stronie od linku do linku i zapamiętuje, co znalazł. Czego nie przeczyta, tego Google nie pokaże klientom.</p>
        <p><strong>Jak to sobie wyobrazić?</strong> Robot jest jak listonosz, który chodzi tylko tam, gdzie prowadzą ścieżki. Podstrona, do której nie prowadzi żaden link, to dom bez adresu. Listonosz do niego nie trafi.</p>
        <h3>Co zatrzymuje robota</h3>
        <ul>
          <li>Podstrona, do której nie prowadzi żaden link.</li>
          <li>Ustawienie w kodzie, które każe robotowi omijać stronę. Potrafi zostać przez pomyłkę po budowie strony.</li>
          <li>Ta sama treść pod kilkoma adresami. Google nie wie, którą wersję pokazać.</li>
          <li>Linki do podstron, których już nie ma.</li>
        </ul>
        <p><strong>Co Ci to daje?</strong> W Google może pojawić się każda usługa, którą opisałeś, a nie tylko strona główna. Google sprawniej przegląda stronę i szybciej zauważa nowe usługi i ceny.</p>
        <h3>Sprawdź sam</h3>
        <p>Wróć do testu z <a href="#krok-1">kroku 1</a>. Masz 10 podstron, a Google zna 3? Robot nie dociera do reszty. Dokładną listę pokazuje raport „Indeksowanie stron” w bezpłatnym narzędziu <a href="https://search.google.com/search-console" {...ZEW}>Google Search Console</a>. Przy każdej pominiętej podstronie jest powód, na przykład:</p>
        <ul>
          <li>URL zawiera tag „noindex”</li>
          <li>URL zablokowany przez plik robots.txt</li>
          <li>Duplikat, użytkownik nie oznaczył strony kanonicznej</li>
          <li>Strona zeskanowana, ale jeszcze niezindeksowana</li>
          <li>Nie znaleziono (404)</li>
        </ul>
        <h3>Co trzeba zrobić</h3>
        <ul>
          <li>Przygotować mapę strony, czyli spis podstron dla robota, i zgłosić ją Google.</li>
          <li>Sprawdzić ustawienia, które mówią robotom, gdzie mogą wchodzić, a gdzie nie.</li>
          <li>Wskazać Google główną wersję każdej podstrony, która ma kopie.</li>
          <li>Przekierować stare adresy na nowe i połączyć podstrony linkami tak, żeby robot doszedł do każdej.</li>
        </ul>
        <Uczciwie>każdy powód z raportu to inna poprawka w kodzie albo w ustawieniach strony. Jedna źle ustawiona blokada potrafi ukryć przed Google całą stronę.</Uczciwie>
        <Zrodlo><a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" {...ZEW}>Google, „Learn about sitemaps”</a>; <a href="https://support.google.com/webmasters/answer/7440203?hl=pl" {...ZEW}>Pomoc Google Search Console, „Raport Indeksowanie stron”</a></Zrodlo>

        <Krok id="krok-8" nr={8} trudne>Podaj Google dane firmy czarno na białym</Krok>
        <p>Na stronie piszesz dla ludzi: zdania, zdjęcia, cennik. Google musi z tego sam wyłowić, jak się nazywasz, gdzie jesteś i kiedy masz otwarte.</p>
        <p>Można mu to podać wprost. W kodzie strony zapisuje się dane firmy w specjalnym, uporządkowanym formacie. Klient go nie widzi, a Google czyta bez zgadywania.</p>
        <p><strong>Jak to sobie wyobrazić?</strong> To różnica między listem pisanym odręcznie a formularzem wypełnionym drukowanymi literami. Treść ta sama, ale formularz każdy odczyta bez pomyłki.</p>
        <p><strong>Co Ci to daje?</strong> Google pisze, że w ten sposób przekażesz mu godziny otwarcia, działy firmy i inne informacje. Gdy ktoś szuka firm, wyniki mogą pokazać wyróżnioną ramkę z danymi Twojej firmy.</p>
        <Kod podpis="Tak wygląda początek takiego zapisu dla salonu fryzjerskiego.">{KOD_FIRMY}</Kod>
        <h3>Sprawdź sam</h3>
        <p>Wejdź na <a href="https://search.google.com/test/rich-results" {...ZEW}>search.google.com/test/rich-results</a> i wpisz adres strony. Jeśli test nie znajdzie u Ciebie danych firmy, Google musi zgadywać.</p>
        <h3>Co trzeba zrobić</h3>
        <ul>
          <li>Dobrać właściwy rodzaj firmy spośród kilkuset dostępnych.</li>
          <li>Zapisać bez błędu nazwę, adres, telefon, godziny, obszar działania i usługi.</li>
          <li>Sprawdzić w teście Google i pilnować, żeby dane zgadzały się z Profilem Firmy.</li>
        </ul>
        <Uczciwie>jeden brakujący przecinek albo cudzysłów i Google nie odczyta całego zapisu.</Uczciwie>
        <Zrodlo><a href="https://developers.google.com/search/docs/appearance/structured-data/local-business" {...ZEW}>Google, „Local Business structured data”</a></Zrodlo>

        <h2 id="efekty">Kiedy zobaczysz efekty?</h2>
        <p>Według Google jedne zmiany widać po kilku godzinach, inne po kilku miesiącach. Daj sobie kilka tygodni, zanim ocenisz wynik.</p>
        <Zrodlo><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" {...ZEW}>Google, „SEO Starter Guide”</a></Zrodlo>
        <h3>Czego nie ma w tym poradniku</h3>
        <p>Te 8 kroków to fundament. Na mocną pozycję w Google pracuje jeszcze między innymi:</p>
        <ul>
          <li>tytuł i opis każdej podstrony, dobrane do haseł, które naprawdę wpisują Twoi klienci,</li>
          <li>teksty usług, które odpowiadają na pytania klientów, zanim zadzwonią,</li>
          <li>przygotowanie strony tak, żeby czaty AI polecały właśnie Twoją firmę.</li>
        </ul>
        <p>Tym wszystkim zajmujemy się w <a href="/optymalizacja-seo">optymalizacji SEO</a>.</p>

        <h2 id="lista">Lista do odhaczenia</h2>
        <p>Zaznaczaj, co masz już zrobione.</p>
        <ListaDoOdhaczenia />

        <section aria-labelledby="zostaw-nam" className="not-prose mt-14 rounded-[24px] bg-brand-soft p-6 sm:p-8">
          <h2 id="zostaw-nam" className="mt-0 text-[26px] sm:text-[30px] font-bold leading-tight tracking-[-0.02em]">Kroki 6–8 zostaw nam</h2>
          <p className="mt-3 text-[17px] leading-[1.6] text-body">Poprawimy kod Twojej strony tak, żeby otwierała się od razu, a Google czytał każdą podstronę i znał dane Twojej firmy. Do tego zadbamy, żeby czaty AI polecały właśnie Ciebie.</p>
          <p className="mt-4 text-[30px] font-bold text-ink">od 300 zł</p>
          <a href="/optymalizacja-seo" className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-deep no-underline">Zobacz, co obejmuje optymalizacja SEO <span aria-hidden="true">→</span></a>
        </section>

        <h2 id="pytania">Częste pytania</h2>
        <div className="faq not-prose mt-4">
          {PYTANIA_GOOGLE.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><div className="a">{a}</div></details>
          ))}
        </div>
      </Wpis>
      <CtaBand title="Chcesz być wyżej w Google?" text="Napisz, czym zajmuje się Twoja firma, i podaj adres strony. Podpowiemy, od którego kroku zacząć." label="Napisz do nas" />
    </>
  )
}
