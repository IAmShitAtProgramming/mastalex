export function Founders({ people, full }) {
  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-2">
      {people.map((p) => (
        <li key={p.id} id={p.id} className="rounded-[28px] bg-paper border border-line p-6 sm:p-7">
          <div>
            <h3 className="text-[24px] font-bold leading-tight">{p.name}</h3>
            <p className="mt-1 text-[15px] text-body">{p.role} · {p.school}, {p.field}</p>
            <ul className="mt-4 grid gap-2">
              {p.facts.map((f) => <li key={f} className="text-[15px] leading-relaxed text-body pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-2 before:h-2 before:rounded-full before:bg-brand">{f}</li>)}
              {full && p.extra && <li className="text-[15px] leading-relaxed text-body pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-2 before:h-2 before:rounded-full before:bg-brand">{p.extra}</li>}
            </ul>
            <a href={p.linkedin} rel="me noopener" target="_blank" className="mt-2 inline-flex min-h-12 items-center gap-2 text-[15px] font-semibold text-brand-deep underline underline-offset-4">Profil na LinkedIn<span className="sr-only"> ({p.name})</span></a>
          </div>
        </li>
      ))}
    </ul>
  )
}
