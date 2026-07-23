import { GraduationCap, Award } from 'lucide-react'

export default function PremiumAboutUs() {
  return (
    <section id="o-nas" className="py-20 bg-premium-beige border-y border-premium-gold/10 font-serif">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Karol Mastalerz */}
          <div className="bg-premium-cream border border-premium-gold/15 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left">
            <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-14 h-14 rounded-xl bg-premium-beige border border-premium-gold/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7 text-premium-gold-dark" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-premium-charcoal">Karol Mastalerz</h3>
                <p className="text-xs text-premium-gold-dark font-semibold">Matematyka & Analiza Danych</p>
                <p className="text-[11px] text-stone-500 font-light">Politechnika Warszawska</p>
              </div>
            </div>
            
            <div className="px-6 pb-6 space-y-3">
              <span className="text-[9px] font-mono text-premium-gold-dark uppercase tracking-wider block font-bold border-b border-cream-200 pb-1">
                PRZEBIEG AKADEMICKI
              </span>
              <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                <li>Przyjęty na studia na PW na podstawie tytułu laureata (10. miejsce) w Ogólnopolskim Konkursie Matematycznym PW.</li>
                <li>Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.</li>
                <li>Pasjonat technologii z parciem do samokształcenia i rozwoju.</li>
              </ul>
            </div>

            <div className="bg-cream-200/40 px-6 py-3.5 flex justify-end items-center border-t border-premium-gold/5 text-[11px] font-mono text-stone-400">
              <div className="flex space-x-2.5">
                <a href="https://linkedin.com/in/karolmastalerz" target="_blank" className="text-stone-500 hover:text-premium-charcoal" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Aleks Popkowski */}
          <div className="bg-premium-cream border border-premium-gold/15 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left">
            <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-14 h-14 rounded-xl bg-premium-beige border border-premium-gold/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-premium-gold-dark" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-premium-charcoal">Aleks Popkowski</h3>
                <p className="text-xs text-premium-gold-dark font-semibold">Informatyka</p>
                <p className="text-[11px] text-stone-500 font-light">Uniwersytet Warszawski</p>
              </div>
            </div>
            
            <div className="px-6 pb-6 space-y-3">
              <span className="text-[9px] font-mono text-premium-gold-dark uppercase tracking-wider block font-bold border-b border-cream-200 pb-1">
                PRZEBIEG AKADEMICKI
              </span>
              <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                <li>Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).</li>
                <li>Półfinalista Olimpiady Informatycznej (OI, edycje 31. i 32.) oraz Wyróżniony Finalista V edycji STEM PW.</li>
                <li>Interesuje się marketingiem i psychologią.</li>
              </ul>
            </div>

            <div className="bg-cream-200/40 px-6 py-3.5 flex justify-end items-center border-t border-premium-gold/5 text-[11px] font-mono text-stone-400">
              <div className="flex space-x-2.5">
                <a href="https://linkedin.com/in/aleks-popkowski" target="_blank" className="text-stone-500 hover:text-premium-charcoal" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
