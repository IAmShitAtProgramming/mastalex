import { EMAIL, NAV, SERVICES, trail } from './data.js'

export function Logo({ className = '' }) {
  return (
    <a href="/" className={`flex min-h-12 items-center gap-2.5 font-bold text-[21px] tracking-tight text-ink no-underline ${className}`} aria-label="Mastalex – strona główna">
      <LogoMark size={34} />
      <span>mastalex</span>
    </a>
  )
}

export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#5b3fe8" />
      <path d="M8.5 22.5V10l7.5 8 7.5-8v12.5" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Pozycja menu jest zaznaczona na swojej podstronie i na podstronach swojego działu (np. wpis w Poradnikach).
const current = (path, href) => (path === href ? 'page' : href.endsWith('/') && path.startsWith(href) ? 'true' : undefined)

export function Header({ path }) {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-line/70">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Główna" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} aria-current={current(path, n.href)}
                  className={`px-3 py-2 rounded-full text-[15px] font-medium whitespace-nowrap no-underline transition-colors ${current(path, n.href) ? 'bg-brand-soft text-brand-deep' : 'text-body hover:text-ink hover:bg-paper'}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/kontakt" className="btn btn-primary btn-sm hidden sm:inline-flex">Bezpłatny projekt</a>
          <details className="mnav xl:hidden relative">
            <summary className="w-12 h-12 grid place-items-center rounded-xl border-2 border-line bg-paper cursor-pointer" aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </summary>
            <nav aria-label="Menu mobilne" className="absolute right-0 top-14 w-[min(88vw,320px)] rounded-2xl bg-paper border border-line shadow-xl p-2">
              <ul>
                {NAV.concat([{ href: '/kontakt', label: 'Kontakt' }]).map((n) => (
                  <li key={n.href}><a href={n.href} aria-current={current(path, n.href)} className="block px-4 py-3 rounded-xl text-[17px] font-medium text-ink no-underline hover:bg-cream aria-[current]:bg-brand-soft aria-[current]:text-brand-deep">{n.label}</a></li>
                ))}
              </ul>
              <a href="/kontakt" className="btn btn-primary w-full mt-2">Zamów bezpłatny projekt</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-night text-[#cfcadf] mt-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="/" className="inline-flex min-h-12 items-center gap-2.5 font-bold text-[21px] tracking-tight text-white no-underline" aria-label="Mastalex – strona główna"><LogoMark size={34} /><span>mastalex</span></a>
          <p className="mt-3 text-[15px] leading-relaxed max-w-[34ch]">Mastalex — strony internetowe od 500 zł, sklepy internetowe i SEO dla firm z całej Polski.</p>
          <p className="mt-2"><a className="inline-flex min-h-12 items-center text-white underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
        <FooterCol title="Usługi" links={SERVICES.map((s) => ({ href: s.path, label: s.name }))} />
        <FooterCol title="Informacje" links={[{ href: '/cennik-stron-internetowych', label: 'Ile kosztuje strona?' }, { href: '/o-nas', label: 'O nas' }, { href: '/kontakt', label: 'Kontakt' }]} />
        <FooterCol title="Zespół" links={[{ href: 'https://www.linkedin.com/in/karolmastalerz', label: 'Karol Mastalerz · LinkedIn' }, { href: 'https://www.linkedin.com/in/aleks-popkowski', label: 'Aleks Popkowski · LinkedIn' }]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-3 flex flex-wrap items-center gap-x-6 justify-between text-[14px]">
          <span>© {__BUILD_YEAR__} Mastalex</span>
          <a href="/polityka-prywatnosci" className="inline-flex min-h-12 items-center text-[#cfcadf] underline underline-offset-4">Polityka prywatności</a>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h2 className="text-white font-semibold text-[15px]">{title}</h2>
      <ul className="mt-2 grid text-[15px]">
        {links.map((l) => (
          <li key={l.href}><a href={l.href} className="inline-flex min-h-12 min-w-12 items-center text-[#cfcadf] hover:text-white no-underline" {...(l.href.startsWith('http') ? { rel: 'me noopener', target: '_blank' } : {})}>{l.label}</a></li>
        ))}
      </ul>
    </div>
  )
}

export function Breadcrumbs({ path }) {
  const items = trail(path)
  return (
    <nav aria-label="Okruszki" className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-6 text-[14px] text-body">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (i < items.length - 1
          ? [<li key={c.path}><a href={c.path} className="inline-block py-3.5 -my-3.5 text-body underline underline-offset-4">{c.name}</a></li>, <li key={`${c.path}›`} aria-hidden="true">›</li>]
          : <li key={c.path} aria-current="page" className="text-ink font-medium">{c.name}</li>))}
      </ol>
    </nav>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`inline-flex items-center gap-2 rounded-full bg-paper border border-line px-3.5 py-1.5 text-[14px] font-semibold text-brand-deep ${className}`}>{children}</p>
}

export function PageHero({ eyebrow, title, accent, lead, children }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-10 sm:pt-14 pb-6">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-5 text-[40px] leading-[1.08] sm:text-[56px] lg:text-[64px] sm:leading-[1.05] font-bold tracking-[-0.035em] max-w-[18ch]">
        {title}{accent && <> <span className="serif text-brand">{accent}</span></>}
      </h1>
      {lead && <p className="mt-6 text-[19px] sm:text-[20px] leading-[1.6] text-body max-w-[60ch]">{lead}</p>}
      {children}
    </section>
  )
}

export function Cta({ secondary, label = 'Zamów bezpłatny projekt' }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a href="/kontakt" className="btn btn-primary">{label}</a>
      {secondary && <a href={secondary.href} className="btn btn-secondary">{secondary.label}</a>}
    </div>
  )
}

export function Faq({ items, title = 'Częste pytania' }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="faq-h">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8">
        <h2 id="faq-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">{title}</h2>
        <div className="faq border-t border-line">
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process({ steps, title = 'Jak wygląda współpraca', intro }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24" aria-labelledby="proc-h">
      <h2 id="proc-h" className="text-[32px] sm:text-[40px] leading-[1.1] font-bold tracking-[-0.03em]">{title}</h2>
      {intro && <p className="mt-4 text-[18px] leading-relaxed text-body max-w-[60ch]">{intro}</p>}
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className={`rounded-[24px] p-6 border ${s.n === 2 ? 'bg-brand text-white border-brand' : 'bg-paper border-line'}`}>
            <span className={`inline-grid place-items-center w-11 h-11 rounded-xl text-[18px] font-bold ${s.n === 2 ? 'bg-white text-brand' : 'bg-brand-soft text-brand-deep'}`}>{s.n}</span>
            {s.lead && <p className={`mt-5 text-[13px] font-semibold uppercase tracking-[0.08em] ${s.n === 2 ? 'text-white/90' : 'text-body'}`}>{s.lead}</p>}
            <h3 className={`${s.lead ? 'mt-1' : 'mt-5'} text-[21px] font-bold leading-tight`}>{s.title}</h3>
            <p className={`mt-3 text-[16px] leading-[1.6] ${s.n === 2 ? 'text-white/90' : 'text-body'}`}>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CtaBand({ title = 'Zobacz swoją stronę, zanim zapłacisz', text = 'Opisz firmę w formularzu, a przygotujemy bezpłatny projekt i przejrzystą wycenę.', label = 'Zamów bezpłatny projekt' }) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-24">
      <div className="rounded-[32px] bg-brand text-white px-6 py-12 sm:px-12 sm:py-16 relative overflow-hidden">
        <div aria-hidden="true" className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute right-24 -bottom-20 w-48 h-48 rounded-full bg-sun/30" />
        <h2 className="relative text-[32px] sm:text-[44px] leading-[1.08] font-bold tracking-[-0.03em] max-w-[20ch]">{title}</h2>
        <p className="relative mt-4 text-[18px] leading-relaxed text-white/90 max-w-[52ch]">{text}</p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <a href="/kontakt" className="btn btn-light">{label}</a>
          <a href={`mailto:${EMAIL}`} className="btn text-white underline underline-offset-4 px-2">{EMAIL}</a>
        </div>
      </div>
    </section>
  )
}

// Na stronie głównej pełny opis usługi (short), na podstronach krótszy (other).
export function ServiceCards({ exclude }) {
  const tints = { lav: 'bg-brand-soft', mint: 'bg-mint', sky: 'bg-sky', peach: 'bg-peach' }
  const items = SERVICES.filter((s) => s.path !== exclude)
  // 4 usługi na stronie głównej: 2×2, bo opisy są długie; 3 na podstronach: jeden rząd.
  return (
    <ul className={`mt-10 grid gap-4 ${items.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {items.map((s) => (
        <li key={s.id}>
          <a href={s.path} className={`group block h-full rounded-[28px] ${tints[s.tint]} p-7 no-underline text-ink transition-transform hover:-translate-y-1`}>
            <h3 className="text-[24px] font-bold leading-tight tracking-[-0.01em]">{s.name}</h3>
            <p className="mt-3 inline-flex rounded-full bg-paper px-3 py-1 text-[15px] font-bold text-ink">od {s.priceFrom} zł</p>
            <p className="mt-3 text-[16px] leading-[1.6] text-body">{exclude ? s.other : s.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-deep">Szczegóły usługi <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// Formularz: sam HTML. Wysyłkę obsługuje form.js (FormSubmit AJAX, sukces tylko po potwierdzeniu
// z serwera). Bez JavaScriptu formularz i tak działa: zwykły POST do FormSubmit.
export function ContactForm({ button = 'Wyślij wiadomość' }) {
  const field = 'mt-2 w-full rounded-xl border-2 border-line bg-paper px-4 py-3 text-[17px] text-ink outline-none focus:border-brand'
  return (
    <form data-contact action={`https://formsubmit.co/${EMAIL}`} method="POST" className="rounded-[28px] bg-paper border border-line p-6 sm:p-8">
      <div className="grid gap-5">
        <label className="block text-[15px] font-semibold">Imię i nazwisko
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-[15px] font-semibold">Adres e-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-[15px] font-semibold">Treść wiadomości
          <textarea name="message" required rows={5} className={field} placeholder="Np. Prowadzę firmę remontową. Potrzebuję strony z ofertą, zdjęciami realizacji i kontaktem." />
        </label>
        <input type="hidden" name="_subject" value="Nowe zapytanie ze strony mastalex.pl" />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <p className="text-[14px] leading-relaxed text-body">Wysyłając formularz, przekazujesz nam swoje imię i nazwisko, adres e-mail i treść wiadomości, żebyśmy mogli odpowiedzieć. Szczegóły: <a href="/polityka-prywatnosci" className="text-brand-deep underline underline-offset-4">polityka prywatności</a>.</p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto whitespace-normal text-center leading-snug py-3">{button}</button>
        <p role="status" aria-live="polite" className="text-[16px] font-semibold min-h-[1.5em]"></p>
      </div>
    </form>
  )
}

export function DevSlot({ title, children }) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="rounded-[24px] border-2 border-dashed border-brand/50 bg-brand-soft/50 p-6 text-[15px] text-brand-deep">
      <p className="font-bold">Miejsce do uzupełnienia (widoczne tylko na podglądzie): {title}</p>
      <div className="mt-2 text-body">{children}</div>
    </div>
  )
}
