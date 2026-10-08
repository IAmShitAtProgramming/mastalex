import { ROUTES } from '../data.js'

// Wybór powiązań w ROUTES: nowy wpis trafia automatycznie do katalogu,
// a tutaj pokazujemy tylko poradniki dobrane do tematu bieżącej strony.
export default function RelatedGuides({ path, title = 'Powiązane poradniki' }) {
  const paths = ROUTES[path].relatedGuides || []
  if (!paths.length) return null

  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 mt-16" aria-labelledby="powiazane-poradniki-h">
      <h2 id="powiazane-poradniki-h" className="text-[28px] sm:text-[34px] leading-[1.1] font-bold tracking-[-0.02em]">{title}</h2>
      <ul className={`mt-6 grid gap-4${paths.length > 1 ? ' md:grid-cols-2' : ''}`}>
        {paths.map((href) => {
          const guide = ROUTES[href]
          return (
            <li key={href}>
              <a href={href} className="group block h-full rounded-[28px] bg-paper border border-line p-6 sm:p-7 no-underline text-ink transition-transform hover:-translate-y-1">
                <h3 className="text-[22px] sm:text-[24px] font-bold leading-tight tracking-[-0.01em]">{guide.h1 ? guide.h1.join(' ') : guide.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-body">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-deep">Czytaj poradnik <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
