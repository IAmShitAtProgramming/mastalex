import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Sparkles, Code, CheckCircle2, ChevronRight } from 'lucide-react'

export default function Cooperation({ siteStyle, theme }) {
  const [activeStep, setActiveStep] = useState(0)
  const isMinimal = siteStyle === 'minimalist'

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
    <section id="wspolpraca" className={`py-16 md:py-24 transition-colors duration-300 ${
      isMinimal ? 'bg-white' : 'bg-premium-cream'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className={`text-xs font-bold tracking-widest uppercase ${
            isMinimal ? 'text-stone-900 font-sans font-black' : `${theme.primary} font-serif`
          }`}>
            PROCES
          </span>
          <h2 className={`text-3xl md:text-4xl ${
            isMinimal ? 'font-sans font-bold text-stone-900' : 'font-serif font-light text-premium-charcoal'
          }`}>
            Jak wygląda współpraca
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed">
            Działamy krok po kroku, dbając o stały kontakt na każdym etapie projektu.
          </p>
        </div>

        {isMinimal ? (
          /* Minimalist Layout: Clean 4-column Grid */
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
        ) : (
          /* Premium Layout: Interactive Tabbed Accordion */
          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            <div className="lg:col-span-5 space-y-2">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                    activeStep === idx 
                      ? `${theme.border} bg-premium-beige shadow-sm scale-[1.01]` 
                      : 'border-transparent bg-transparent hover:bg-cream-200/50'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${activeStep === idx ? `${theme.bg} text-white` : 'bg-cream-200 text-stone-600'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-premium-charcoal">{step.title}</h3>
                    <p className="text-[10px] text-stone-500 font-light">{step.subtitle}</p>
                  </div>
                  <div className="ml-auto">
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeStep === idx ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-premium-beige border border-premium-gold/15 rounded-2xl p-6 shadow-sm min-h-[180px] flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className={`p-2.5 rounded-xl ${theme.bg} text-white`}>
                    {steps[activeStep].icon}
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider text-premium-gold-dark font-semibold">ETAP</span>
                    <h3 className="text-xl font-serif font-bold text-premium-charcoal">{steps[activeStep].title}</h3>
                  </div>
                </div>
                
                <motion.p 
                  key={activeStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-stone-600 font-light leading-relaxed text-left"
                >
                  {steps[activeStep].description}
                </motion.p>
              </div>

              <div className="mt-6 pt-4 border-t border-premium-gold/10 flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>0{activeStep + 1} / 04</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
