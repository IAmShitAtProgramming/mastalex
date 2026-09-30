import { EMAIL, FOUNDERS, STEPS } from '../data.js'
import { ContactForm, DevSlot, Eyebrow, Faq, Process, ServiceCards } from '../ui.jsx'
import { Founders } from './shared.jsx'

// Teksty przepisane 30.09.2026 (Claude, bez Codexa): każdy fakt raz na stronę. Karty usług mówią,
// co robimy, proces mówi o terminie, płatności i własności, a pytania tylko o resztę.
const FAQ = [
  { q: 'Co dostaję za 500 zł?', a: <>Stronę wizytówkę: jedną stronę z ofertą, opisem firmy i kontaktem, gotową do pokazania klientom. Domenę i hosting opłacasz osobno. Potrzebujesz osobnej podstrony dla każdej usługi? Zobacz <a href="/cennik-stron-internetowych">cennik</a>.</> },
  { q: 'Czy projekt jest naprawdę bezpłatny?', a: 'Tak. Jeśli projekt Ci się nie spodoba, nic nie płacisz i niczym się nie zobowiązujesz.' },
  { q: 'Czy muszę się znać na stronach internetowych?', a: 'Nie. Wystarczy, że opowiesz nam o firmie. Wszystkim technicznym zajmujemy się my.' },
  { q: 'Czy przebudowa jest tańsza niż nowa strona?', a: <>Tak. Przebudowa zawsze kosztuje mniej niż nowa strona tej samej wielkości. Więcej: <a href="/przebudowa-strony-internetowej">przebudowa strony internetowej</a>.</> },
  { q: 'Czy pracujecie z firmami z całej Polski?', a: 'Tak. Całą współpracę prowadzimy online, więc nie musisz nigdzie jechać.' },
]

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-10 sm:pt-16 niski:pt-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <Eyebrow>Mastalex | strony internetowe i SEO</Eyebrow>
          <h1 className="mt-5 niski:mt-4 text-[44px] leading-[1.05] sm:text-[60px] lg:text-[72px] niski:text-[56px] lg:leading-[1.02] font-bold tracking-[-0.04em]">
            Strona internetowa dla firmy od 500 zł. <span className="serif text-brand tracking-[-0.02em]">Projekt zobaczysz za darmo.</span>
          </h1>
          <p className="mt-6 niski:mt-4 text-[19px] sm:text-[20px] niski:text-[18px] leading-[1.6] text-body max-w-[54ch]">
            W Mastalex tworzymy i przebudowujemy strony internetowe dla firm oraz wykonujemy SEO, dzięki któremu klienci łatwiej Cię znajdują. Projekt dostajesz razem z przejrzystą wyceną, zanim zdecydujesz się na dalszą współpracę.
          </p>
          <div className="mt-8 niski:mt-6 flex flex-wrap items-center gap-3">
            <a href="/kontakt" className="btn btn-primary">Zamów bezpłatny projekt</a>
            <a href="/cennik-stron-internetowych" className="btn btn-secondary">Zobacz cennik</a>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="uslugi-h">
        <h2 id="uslugi-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">W czym pomagamy</h2>
        <ServiceCards />
        <p className="mt-6"><a href="/cennik-stron-internetowych" className="inline-flex min-h-12 items-center gap-2 text-brand-deep font-semibold underline underline-offset-4">Zobacz pełny cennik <span aria-hidden="true">→</span></a></p>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="seo-h">
        <div className="rounded-[32px] bg-paper border border-line p-6 sm:p-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h2 id="seo-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">Sama strona to za mało. <span className="serif text-brand">Klienci muszą ją znaleźć.</span></h2>
            <p className="mt-5 text-[18px] leading-[1.7] text-body">Kto szuka usługi, wpisuje ją w Google albo pyta czat AI, np. ChatGPT, i wybiera spośród pierwszych odpowiedzi. SEO sprawia, że Twoja firma pojawia się wyżej w wynikach i częściej w odpowiedziach czatów, więc trafia do Ciebie więcej klientów.</p>
            <p className="mt-5"><a href="/optymalizacja-seo#czym-jest-seo" className="inline-flex min-h-12 items-center gap-2 text-brand-deep font-semibold underline underline-offset-4">Czym jest SEO? Wyjaśniamy po ludzku <span aria-hidden="true">→</span></a></p>
          </div>
          <SearchVisual />
        </div>
      </section>

      <Process steps={STEPS} />

      <section className="mt-24 bg-night text-white" aria-labelledby="motto-h">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <h2 id="motto-h" className="text-[44px] sm:text-[64px] leading-[1.02] font-bold tracking-[-0.04em]">Twoja wizja. <span className="serif text-[#b9a8ff]">Nasze wykonanie.</span></h2>
          <div className="grid grid-cols-2 gap-6 text-[18px]">
            <ul className="grid gap-3">{['strona', 'wizja', 'wygoda'].map((w) => <li key={w}><span className="font-bold text-sun">TWOJA</span> {w}</li>)}</ul>
            <ul className="grid gap-3">{[['NASZ', 'wysiłek'], ['NASZ', 'czas'], ['NASZE', 'sprawdzenie']].map(([a, w]) => <li key={w}><span className="font-bold text-[#b9a8ff]">{a}</span> {w}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="zespol-h">
        <h2 id="zespol-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">Kto odpowiada za Twoją stronę</h2>
        <p className="mt-4 text-[18px] leading-relaxed text-body max-w-[60ch]">Założycielami Mastalex są Karol Mastalerz i Aleks Popkowski.</p>
        <Founders people={FOUNDERS} />
        <p className="mt-4"><a href="/o-nas" className="inline-flex min-h-12 items-center text-brand-deep font-semibold underline underline-offset-4">Więcej o nas</a></p>
      </section>

      {/* Sekcja „Opinie i studium przypadku”: pokażemy ją publicznie dopiero z prawdziwą treścią od właściciela. */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-16 grid md:grid-cols-2 gap-4">
        <DevSlot title="Opinie i studium przypadku: opinie prawdziwych klientów">Cytat z imieniem i firmą, za zgodą klienta (np. z Clutch lub rekomendacji na LinkedIn). Uzupełniasz Ty; do tego czasu sekcja jest ukryta na publicznej stronie.</DevSlot>
        <DevSlot title="Opinie i studium przypadku: zakończona realizacja">Problem klienta → co zrobiliśmy → efekt (tylko udokumentowany). Do tego czasu sekcja jest ukryta.</DevSlot>
      </section>

      <Faq items={FAQ} />

      <section id="kontakt" className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10" aria-labelledby="kontakt-h">
        <div>
          <h2 id="kontakt-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">Opowiedz nam o swojej firmie</h2>
          <p className="mt-4 text-[18px] leading-relaxed text-body">Napisz, czym zajmuje się Twoja firma i jakiej strony potrzebujesz. Pytasz o SEO? Podaj adres swojej strony.</p>
          <dl className="mt-8 grid gap-4 text-[17px]">
            <div><dt className="text-body text-[14px]">E-mail</dt><dd><a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center font-semibold text-brand-deep underline underline-offset-4">{EMAIL}</a></dd></div>
          </dl>
        </div>
        <ContactForm button="Zapytaj o stronę lub SEO" />
      </section>
    </>
  )
}

// Ilustracja w hero: szkic strony w oknie przeglądarki (HTML/CSS, bez obrazka = szybki LCP).
function HeroVisual() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-4 sm:-inset-6 rounded-[40px] bg-brand-soft" />
      <div className="relative rounded-[24px] bg-paper border border-line shadow-[0_24px_60px_-24px_rgba(40,20,120,0.35)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 h-11 border-b border-line bg-cream">
          <span className="w-3 h-3 rounded-full bg-[#ff6159]" /><span className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><span className="w-3 h-3 rounded-full bg-[#28c941]" />
          <span className="ml-3 flex-1 h-7 rounded-full bg-paper border border-line text-[12px] text-body flex items-center px-3">twojafirma.pl</span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between"><span className="w-20 h-3 rounded-full bg-ink/80" /><span className="flex gap-2"><span className="w-10 h-2.5 rounded-full bg-line" /><span className="w-10 h-2.5 rounded-full bg-line" /><span className="w-14 h-6 rounded-lg bg-brand" /></span></div>
          <div className="mt-8 w-[85%] h-6 rounded-lg bg-ink/85" />
          <div className="mt-3 w-[60%] h-6 rounded-lg bg-ink/85" />
          <div className="mt-5 w-[90%] h-2.5 rounded-full bg-line" />
          <div className="mt-2 w-[75%] h-2.5 rounded-full bg-line" />
          <div className="mt-6 flex gap-2"><span className="w-28 h-9 rounded-xl bg-brand shadow-[0_3px_0_#3d25b0]" /><span className="w-24 h-9 rounded-xl border-2 border-line" /></div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <span className="h-20 rounded-2xl bg-brand-soft" /><span className="h-20 rounded-2xl bg-mint" /><span className="h-20 rounded-2xl bg-sky" />
          </div>
        </div>
      </div>
      <Chip className="-left-3 sm:-left-8 top-24" color="bg-mint text-mint-ink">✓ Projekt bezpłatnie</Chip>
      <Chip className="-right-2 sm:-right-6 top-44" color="bg-sun text-ink">Wycena bez zobowiązań</Chip>
      <Chip className="left-6 -bottom-5" color="bg-sky text-sky-ink">Projekt w 3 dni</Chip>
    </div>
  )
}

function Chip({ children, className, color }) {
  return <span className={`absolute ${className} ${color} rounded-full px-4 py-2 text-[14px] font-bold shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] border-2 border-white`}>{children}</span>
}

// Ilustracja pasa o SEO: wyniki wyszukiwania z Twoją firmą na górze (HTML/CSS, dekoracja).
function SearchVisual() {
  return (
    <div aria-hidden="true" className="select-none rounded-[24px] bg-cream border border-line p-5 sm:p-6">
      <div className="flex items-center gap-3 rounded-full bg-paper border border-line px-4 h-11 text-[14px] text-ink">
        <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        remont łazienki kraków
      </div>
      <div className="mt-4 rounded-2xl bg-mint border-2 border-mint-ink/30 p-4">
        <div className="flex items-center justify-between gap-3"><span className="text-[13px] text-mint-ink font-semibold">twojafirma.pl</span><span className="rounded-full bg-paper px-2.5 py-0.5 text-[12px] font-bold text-mint-ink">1. miejsce</span></div>
        <p className="mt-1 text-[17px] font-bold text-sky-ink leading-snug">Remont łazienki w Krakowie — Twoja Firma</p>
        <span className="mt-2 block w-[85%] h-2.5 rounded-full bg-mint-ink/20" />
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="mt-3 rounded-2xl bg-paper border border-line p-4 opacity-70">
          <span className="block w-24 h-2.5 rounded-full bg-line" />
          <span className="mt-2 block w-[70%] h-3.5 rounded-full bg-line" />
          <span className="mt-2 block w-[85%] h-2.5 rounded-full bg-line" />
        </div>
      ))}
    </div>
  )
}
