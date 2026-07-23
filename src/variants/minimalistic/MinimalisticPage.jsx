import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Target, Sparkles, Code, CheckCircle2, ChevronRight, Mail, GraduationCap, Award } from 'lucide-react'

export default function MinimalisticPage({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0)

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
    <div className="bg-white text-stone-900 font-sans min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-28 border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-8">
          
          <div className="inline-flex items-center space-x-2 bg-stone-100 border border-stone-200 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-stone-700">
            <span>WEB DEVELOPMENT</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-900 tracking-tight leading-none">
            Twoja wizja.<br />
            <span className="text-stone-500 font-normal">Nasze wykonanie.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-stone-600 font-light max-w-xl leading-relaxed">
            Strony internetowe dla firm. Bez szablonów.
          </p>

          {/* Minimal Motto Display */}
          <div className="grid grid-cols-2 gap-x-8 py-4 px-8 border border-stone-200 w-full max-w-md bg-stone-50 rounded-xl font-mono">
            <div className="text-left text-[11px] font-bold uppercase leading-relaxed text-stone-900">
              <span className="block text-stone-500">TWOJA</span> strona<br />
              <span className="block text-stone-500">TWOJA</span> wizja<br />
              <span className="block text-stone-500">TWOJA</span> wygoda
            </div>
            <div className="text-left border-l border-stone-200 pl-6 text-[11px] font-bold uppercase leading-relaxed text-stone-900">
              <span className="block text-stone-400">NASZ</span> wysiłek<br />
              <span className="block text-stone-400">NASZ</span> czas<br />
              <span className="block text-stone-400">NASZE</span> doświadczenie
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <button 
              onClick={() => {
                const el = document.getElementById('kontakt')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-7 py-3.5 bg-black text-white hover:bg-stone-800 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>Napisz do nas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => onNavigate('showcase')}
              className="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-900 hover:bg-stone-100 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Pokaz Komponentów</span>
            </button>
          </div>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="o-nas" className="py-16 md:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Karol Mastalerz */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left bg-white text-stone-900">
              <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-stone-800" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-sans text-stone-900">
                    Karol Mastalerz
                  </h3>
                  <p className="text-xs font-semibold text-stone-700 font-mono">
                    Matematyka & Analiza Danych
                  </p>
                  <p className="text-[11px] text-stone-500 font-light">Politechnika Warszawska</p>
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-wider block font-bold border-b pb-1 text-stone-800 border-stone-200">
                  PRZEBIEG AKADEMICKI
                </span>
                <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                  <li>Przyjęty na studia na PW na podstawie tytułu laureata (10. miejsce) w Ogólnopolskim Konkursie Matematycznym PW.</li>
                  <li>Ukończył liceum w klasie o profilu matematyczno-fizycznym realizując olimpijski program nauczania matematyki.</li>
                  <li>Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.</li>
                </ul>
              </div>

              <div className="px-6 py-3.5 flex justify-end items-center border-t text-[11px] font-mono text-stone-500 bg-stone-50 border-stone-200">
                <a href="https://linkedin.com/in/karolmastalerz" target="_blank" className="text-stone-500 hover:text-black" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Aleks Popkowski */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-full text-left bg-white text-stone-900">
              <div className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-stone-800" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-sans text-stone-900">
                    Aleks Popkowski
                  </h3>
                  <p className="text-xs font-semibold text-stone-700 font-mono">
                    Informatyka
                  </p>
                  <p className="text-[11px] text-stone-500 font-light">Uniwersytet Warszawski</p>
                </div>
              </div>
              
              <div className="px-6 pb-6 space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-wider block font-bold border-b pb-1 text-stone-800 border-stone-200">
                  PRZEBIEG AKADEMICKI
                </span>
                <ul className="text-xs text-stone-600 font-light space-y-2 list-disc list-inside">
                  <li>Zrealizował kurs Programowania Funkcjonalnego z 3. roku studiów już na 1. roku nauki.</li>
                  <li>Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).</li>
                  <li>Półfinalista Olimpiady Informatycznej (OI, edycje 31. i 32.) oraz Wyróżniony Finalista V edycji STEM PW.</li>
                </ul>
              </div>

              <div className="px-6 py-3.5 flex justify-end items-center border-t text-[11px] font-mono text-stone-500 bg-stone-50 border-stone-200">
                <a href="https://linkedin.com/in/aleks-popkowski" target="_blank" className="text-stone-500 hover:text-black" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COOPERATION SECTION */}
      <section id="wspolpraca" className="py-16 md:py-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500">
              PROCES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">
              Jak wygląda współpraca
            </h2>
            <p className="text-sm text-stone-600 font-light">
              Działamy krok po kroku, dbając o stały kontakt na każdym etapie projektu.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            <div className="lg:col-span-5 space-y-2.5">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center space-x-3.5 cursor-pointer ${
                    activeStep === idx 
                      ? 'border-black bg-stone-900 text-white shadow-md' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeStep === idx ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-700'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{step.title}</h3>
                    <p className={`text-[10px] ${activeStep === idx ? 'text-stone-400' : 'text-stone-500'}`}>{step.subtitle}</p>
                  </div>
                  <div className="ml-auto">
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeStep === idx ? 'rotate-90 text-white' : 'text-stone-400'}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-2xl p-8 shadow-sm min-h-[220px] flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-black text-white shadow-sm">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold font-mono">ETAP</span>
                    <h3 className="text-2xl font-bold text-stone-900">{steps[activeStep].title}</h3>
                  </div>
                </div>
                
                <motion.p 
                  key={activeStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-stone-600 leading-relaxed mt-4"
                >
                  {steps[activeStep].description}
                </motion.p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>0{activeStep + 1} / 04</span>
                <span className="font-bold text-stone-900">PRZEBIEG PROJEKTU</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="kontakt" className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 max-w-4xl mx-auto items-stretch">
            
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-stone-500">
                  KONTAKT
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-1 mb-3 text-stone-900">
                  Napisz do nas
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  Skontaktuj się z nami bezpośrednio na podany adres e-mail lub skorzystaj z formularza obok.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3.5 bg-white border border-stone-200 p-4 rounded-xl shadow-sm">
                    <Mail className="w-5 h-5 text-stone-700" />
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-medium font-mono">Adres e-mail</span>
                      <a href="mailto:kontakt@mastalex.pl" className="text-sm font-bold text-stone-900 hover:underline">
                        kontakt@mastalex.pl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-[10px] font-mono text-stone-500">
                <span>Warszawa / Online</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <form 
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.target
                  const data = {
                    name: form.elements[0].value,
                    email: form.elements[1].value,
                    message: form.elements[2].value
                  }
                  try {
                    await fetch('https://formsubmit.co/ajax/kontakt@mastalex.pl', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                      body: JSON.stringify(data)
                    })
                  } catch (err) {}
                  alert('Wiadomość została wysłana do kontakt@mastalex.pl!')
                  form.reset()
                }} 
                className="space-y-3 text-left"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider font-mono">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jan Kowalski" 
                      className="w-full p-2.5 rounded-lg border text-xs bg-stone-50 border-stone-200 text-stone-900 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider font-mono">Adres e-mail</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jan@firma.pl" 
                      className="w-full p-2.5 rounded-lg border text-xs bg-stone-50 border-stone-200 text-stone-900 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-700 uppercase tracking-wider font-mono">Treść wiadomości</label>
                  <textarea 
                    rows="3" 
                    required
                    placeholder="Opisz krótko swoje wymagania..." 
                    className="w-full p-2.5 rounded-lg border text-xs bg-stone-50 border-stone-200 text-stone-900 focus:outline-none focus:border-black transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 bg-black text-white hover:bg-stone-800 rounded-lg cursor-pointer mt-1"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-8 text-xs border-t border-stone-200 text-stone-600 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('kontakt')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center space-x-2 text-lg tracking-widest font-bold text-stone-900 bg-transparent border-transparent cursor-pointer"
          >
            <span>MASTALEX</span>
            <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
          </button>
          
          <div className="flex space-x-6 text-[11px] font-medium tracking-wider uppercase text-stone-700">
            <button onClick={() => { const el = document.getElementById('o-nas'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer bg-transparent border-transparent">O nas</button>
            <button onClick={() => { const el = document.getElementById('wspolpraca'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer bg-transparent border-transparent">Współpraca</button>
            <button onClick={() => onNavigate('showcase')} className="hover:text-black transition-colors cursor-pointer bg-transparent border-transparent">Showcase</button>
            <button onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer bg-transparent border-transparent">Kontakt</button>
          </div>

          <div className="text-[11px] font-mono text-stone-500">
            © {new Date().getFullYear()} Mastalex. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>

    </div>
  )
}
