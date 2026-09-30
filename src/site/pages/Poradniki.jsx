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
        lead="Sprawdzamy ceny i oferty na rynku, żeby łatwiej było Ci ocenić, ile zapłacić i na co patrzeć. Każda liczba ma źródło i datę sprawdzenia." />
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
