import { Target, Sparkles, Code, CheckCircle2 } from 'lucide-react'

export default function MinimalisticCooperation() {
  const steps = [
    {
      title: '1. Konsultacja i plan',
      subtitle: 'Określenie celów',
      icon: <Target className="w-5 h-5" />,
      description: 'Rozmawiamy o Twoich potrzebach i celach. Tworzymy jasny plan działania dopasowany do Twojej firmy.'
    },
    {
      title: '2. Darmowy projekt i wycena',
      subtitle: 'Wstępny widok bez zobowiązań',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Przygotowujemy wstępny, bezpłatny projekt strony oraz przejrzystą wycenę. Widzisz efekt, zanim podejmiesz decyzję.'
    },
    {
      title: '3. Rozbudowa i dalsze prace',
      subtitle: 'Dopracowanie szczegółów',
      icon: <Code className="w-5 h-5" />,
      description: 'Uzupełniamy wszystkie treści, dopracowujemy wygląd i szlifujemy stronę tak, aby zachwycała Twoich klientów.'
    },
    {
      title: '4. Postawienie strony',
      subtitle: 'Uruchomienie i wsparcie',
      icon: <CheckCircle2 className="w-5 h-5" />,
      description: 'Uruchamiamy gotową witrynę pod Twoim adresem internetowym i dbamy o sprawne działanie od pierwszego dnia.'
    }
  ]

  return (
    <section id="wspolpraca" className="py-16 md:py-24 bg-white font-sans text-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-stone-900 font-sans font-black">
            PROCES
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-stone-900">
            Jak wygląda współpraca
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed">
            Działamy krok po kroku, dbając o stały kontakt na każdym etapie projektu.
          </p>
        </div>

        {/* Minimalist 4-column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left font-sans">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-stone-50 border border-stone-200 p-6 rounded-xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-md bg-stone-900 text-white flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <span className="text-[10px] font-mono text-stone-400 font-bold block uppercase">
                  0{idx + 1} ETAP
                </span>
                <h3 className="text-base font-bold text-stone-900 mt-1">{step.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 font-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
