import { GraduationCap, Award } from 'lucide-react'

export default function AboutUs({ siteStyle, theme }) {
  const isMinimal = siteStyle === 'minimalist' || siteStyle === 'minimalistic'

  return (
    <section id="o-nas" className={`py-16 md:py-20 transition-colors duration-300 ${
      isMinimal 
        ? 'bg-stone-100/60 border-y border-stone-200' 
        : 'bg-premium-beige border-y border-premium-gold/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Karol Mastalerz */}
          <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left transition-all ${
            isMinimal 
              ? 'bg-white border-stone-200 text-stone-900 font-sans' 
              : 'bg-premium-cream border-premium-gold/15 text-premium-charcoal font-serif'
          }`}>
            <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7 text-stone-800" />
              </div>
              
              <div className="space-y-1">
                <h3 className={`text-xl font-bold ${isMinimal ? 'font-sans text-stone-900' : 'font-serif text-premium-charcoal'}`}>
                  Karol Mastalerz
                </h3>
                <p className={`text-xs font-semibold ${isMinimal ? 'text-stone-700 font-mono' : 'text-premium-gold-dark'}`}>
                  Matematyka & Analiza Danych
                </p>
                <p className="text-[11px] text-stone-500 font-light">Politechnika Warszawska</p>
              </div>
            </div>
            
            <div className="px-6 pb-6 space-y-3">
              <span className={`text-[9px] font-mono uppercase tracking-wider block font-bold border-b pb-1 ${
                isMinimal ? 'text-stone-800 border-stone-200' : 'text-premium-gold-dark border-cream-200'
              }`}>
                PRZEBIEG AKADEMICKI
              </span>
              <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                <li>Przyjęty na studia na PW na podstawie tytułu laureata (10. miejsce) w Ogólnopolskim Konkursie Matematycznym PW.</li>
                <li>Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.</li>
                <li>Pasjonat technologii z parciem do samokształcenia i rozwoju.</li>
              </ul>
            </div>

            <div className={`px-6 py-3.5 flex justify-end items-center border-t text-[11px] font-mono text-stone-500 ${
              isMinimal ? 'bg-stone-50 border-stone-200' : 'bg-cream-200/40 border-premium-gold/5'
            }`}>
              <div className="flex space-x-2.5">
                <a href="https://linkedin.com/in/karolmastalerz" target="_blank" className="text-stone-500 hover:text-black" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Aleks Popkowski */}
          <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left transition-all ${
            isMinimal 
              ? 'bg-white border-stone-200 text-stone-900 font-sans' 
              : 'bg-premium-cream border-premium-gold/15 text-premium-charcoal font-serif'
          }`}>
            <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                <Award className="w-7 h-7 text-stone-800" />
              </div>
              
              <div className="space-y-1">
                <h3 className={`text-xl font-bold ${isMinimal ? 'font-sans text-stone-900' : 'font-serif text-premium-charcoal'}`}>
                  Aleks Popkowski
                </h3>
                <p className={`text-xs font-semibold ${isMinimal ? 'text-stone-700 font-mono' : 'text-premium-gold-dark'}`}>
                  Informatyka
                </p>
                <p className="text-[11px] text-stone-500 font-light">Uniwersytet Warszawski</p>
              </div>
            </div>
            
            <div className="px-6 pb-6 space-y-3">
              <span className={`text-[9px] font-mono uppercase tracking-wider block font-bold border-b pb-1 ${
                isMinimal ? 'text-stone-800 border-stone-200' : 'text-premium-gold-dark border-cream-200'
              }`}>
                PRZEBIEG AKADEMICKI
              </span>
              <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                <li>Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).</li>
                <li>Półfinalista Olimpiady Informatycznej (OI, edycje 31. i 32.) oraz Wyróżniony Finalista V edycji STEM PW.</li>
                <li>Interesuje się marketingiem i psychologią.</li>
              </ul>
            </div>

            <div className={`px-6 py-3.5 flex justify-end items-center border-t text-[11px] font-mono text-stone-500 ${
              isMinimal ? 'bg-stone-50 border-stone-200' : 'bg-cream-200/40 border-premium-gold/5'
            }`}>
              <div className="flex space-x-2.5">
                <a href="https://linkedin.com/in/aleks-popkowski" target="_blank" className="text-stone-500 hover:text-black" aria-label="LinkedIn">
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
