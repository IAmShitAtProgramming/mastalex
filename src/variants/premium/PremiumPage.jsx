import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Target, Sparkles, Code, CheckCircle2, ChevronRight, Mail, GraduationCap, Award } from 'lucide-react'
import MagneticButton from '../../components/Common/MagneticButton'

export default function PremiumPage({ onNavigate }) {
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
    <div className="bg-[#070605] text-[#FDFBF7] font-serif min-h-screen relative overflow-hidden selection:bg-[#c5a880]/30 selection:text-white transform-gpu">
      
      {/* Optimized Ambient Background Flares */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#c5a880]/12 via-[#94a3b8]/5 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute top-[35%] -left-40 w-[450px] h-[450px] bg-[#c5a880]/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-[65%] -right-40 w-[450px] h-[450px] bg-[#94a3b8]/8 blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(197,168,128,0.1)_1px,transparent_1px)] [background-size:32px_32px] opacity-35 pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-24 md:py-32 border-b border-[#c5a880]/15">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-9 relative z-10">
          
          {/* Shimmer Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#12100E] border border-[#c5a880]/40 px-4 py-1.5 rounded-full w-fit shadow-[0_0_20px_rgba(197,168,128,0.15)]">
            <Zap className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase gold-text-shine">
              WEB DEVELOPMENT
            </span>
          </div>
          
          {/* Metallic Shimmer Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-tight font-serif font-light tracking-tight">
            <span className="gold-text-shine block">Twoja wizja.</span>
            <span className="italic font-normal silver-text-shine block mt-1">Nasze wykonanie.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 font-serif font-light max-w-xl leading-relaxed">
            Strony internetowe dla firm. Bez szablonów.
          </p>

          {/* Luxury Motto Display */}
          <div className="grid grid-cols-2 gap-x-8 py-5 px-8 border border-[#c5a880]/30 w-full max-w-md bg-[#12100E] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] font-serif relative overflow-hidden group">
            <div className="text-left text-[11px] font-bold uppercase leading-relaxed tracking-widest text-[#FDFBF7]">
              <span className="block text-[#c5a880]">TWOJA</span> strona<br />
              <span className="block text-[#c5a880]">TWOJA</span> wizja<br />
              <span className="block text-[#c5a880]">TWOJA</span> wygoda
            </div>
            <div className="text-left border-l border-[#c5a880]/20 pl-6 text-[11px] font-bold uppercase leading-relaxed tracking-widest text-[#FDFBF7]">
              <span className="block text-[#cbd5e1]">NASZ</span> wysiłek<br />
              <span className="block text-[#cbd5e1]">NASZ</span> czas<br />
              <span className="block text-[#cbd5e1]">NASZE</span> doświadczenie
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5 pt-3">
            <MagneticButton 
              onClick={() => {
                const el = document.getElementById('kontakt')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black font-serif font-bold rounded-full text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(197,168,128,0.3)] hover:shadow-[0_0_35px_rgba(197,168,128,0.6)] transition-all flex items-center justify-center space-x-2"
            >
              <span>Napisz do nas</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </MagneticButton>
            
            <button 
              onClick={() => onNavigate('showcase')}
              className="px-8 py-4 bg-[#12100E] border border-[#c5a880]/40 text-[#FDFBF7] rounded-full text-xs font-serif font-semibold uppercase tracking-widest hover:border-[#c5a880] hover:bg-[#1a1714] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Pokaz Komponentów</span>
            </button>
          </div>

        </div>
      </section>

      {/* ================= ABOUT US SECTION ================= */}
      <section id="o-nas" className="py-24 border-b border-[#c5a880]/15 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Karol Mastalerz */}
            <div className="bg-[#12100E] border border-[#c5a880]/30 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full text-left hover:border-[#c5a880]/60 transition-all group">
              <div className="p-7 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#dfba73]/20 via-[#c5a880]/10 to-[#9e8259]/20 border border-[#c5a880]/40 flex items-center justify-center flex-shrink-0 shadow-md">
                  <GraduationCap className="w-8 h-8 text-[#c5a880]" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[#FDFBF7]">Karol Mastalerz</h3>
                  <p className="text-xs gold-text-shine font-semibold">Matematyka & Analiza Danych</p>
                  <p className="text-[11px] text-stone-400 font-light">Politechnika Warszawska</p>
                </div>
              </div>
              
              <div className="px-7 pb-7 space-y-3">
                <span className="text-[9px] font-mono text-[#c5a880] uppercase tracking-widest block font-bold border-b border-[#c5a880]/15 pb-2">
                  PRZEBIEG AKADEMICKI
                </span>
                <ul className="text-xs text-stone-300 font-light space-y-2.5 list-disc list-inside leading-relaxed">
                  <li>Przyjęty na studia na PW na podstawie tytułu laureata (10. miejsce) w Ogólnopolskim Konkursie Matematycznym PW.</li>
                  <li>Ukończył liceum w klasie o profilu matematyczno-fizycznym realizując olimpijski program nauczania matematyki.</li>
                  <li>Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.</li>
                </ul>
              </div>

              <div className="bg-[#0A0908] px-7 py-4 flex justify-end items-center border-t border-[#c5a880]/15 text-[11px] font-mono text-stone-400">
                <a href="https://linkedin.com/in/karolmastalerz" target="_blank" className="text-stone-400 hover:text-[#c5a880] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Aleks Popkowski */}
            <div className="bg-[#12100E] border border-[#c5a880]/30 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full text-left hover:border-[#c5a880]/60 transition-all group">
              <div className="p-7 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cbd5e1]/20 via-[#94a3b8]/10 to-[#64748b]/20 border border-slate-400/40 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award className="w-8 h-8 text-slate-300" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[#FDFBF7]">Aleks Popkowski</h3>
                  <p className="text-xs silver-text-shine font-semibold">Informatyka</p>
                  <p className="text-[11px] text-stone-400 font-light">Uniwersytet Warszawski</p>
                </div>
              </div>
              
              <div className="px-7 pb-7 space-y-3">
                <span className="text-[9px] font-mono text-[#cbd5e1] uppercase tracking-widest block font-bold border-b border-[#c5a880]/15 pb-2">
                  PRZEBIEG AKADEMICKI
                </span>
                <ul className="text-xs text-stone-300 font-light space-y-2.5 list-disc list-inside leading-relaxed">
                  <li>Zrealizował kurs Programowania Funkcjonalnego z 3. roku studiów już na 1. roku nauki.</li>
                  <li>Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).</li>
                  <li>Półfinalista Olimpiady Informatycznej (OI, edycje 31. i 32.) oraz Wyróżniony Finalista V edycji STEM PW.</li>
                </ul>
              </div>

              <div className="bg-[#0A0908] px-7 py-4 flex justify-end items-center border-t border-[#c5a880]/15 text-[11px] font-mono text-stone-400">
                <a href="https://linkedin.com/in/aleks-popkowski" target="_blank" className="text-stone-400 hover:text-[#c5a880] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= COOPERATION SECTION ================= */}
      <section id="wspolpraca" className="py-24 border-b border-[#c5a880]/15 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c5a880]">
              PROCES
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#FDFBF7]">
              Jak wygląda współpraca
            </h2>
            <p className="text-sm text-stone-400 font-light leading-relaxed">
              Działamy krok po kroku, dbając o stały kontakt na każdym etapie projektu.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center space-x-3.5 cursor-pointer ${
                    activeStep === idx 
                      ? 'border-[#c5a880] bg-[#171412] shadow-[0_0_20px_rgba(197,168,128,0.15)] scale-[1.02]' 
                      : 'border-[#c5a880]/20 bg-[#0F0D0B] hover:bg-[#151310]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${activeStep === idx ? 'bg-gradient-to-r from-[#dfba73] to-[#c5a880] text-black' : 'bg-[#1C1917] text-[#c5a880]'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#FDFBF7]">{step.title}</h3>
                    <p className="text-[10px] text-stone-400 font-light">{step.subtitle}</p>
                  </div>
                  <div className="ml-auto">
                    <ChevronRight className={`w-4 h-4 text-[#c5a880] transition-transform ${activeStep === idx ? 'rotate-90' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-[#12100E] border border-[#c5a880]/30 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] min-h-[220px] flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#dfba73] to-[#c5a880] text-black shadow-md">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#c5a880] font-bold">ETAP</span>
                    <h3 className="text-2xl font-serif font-bold text-[#FDFBF7]">{steps[activeStep].title}</h3>
                  </div>
                </div>
                
                <motion.p 
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-stone-300 font-light leading-relaxed mt-4"
                >
                  {steps[activeStep].description}
                </motion.p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#c5a880]/15 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>0{activeStep + 1} / 04</span>
                <span className="text-[#c5a880] font-bold">PRZEBIEG PROJEKTU</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="kontakt" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 max-w-4xl mx-auto items-stretch">
            
            {/* Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#c5a880]">
                  KONTAKT
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-light mt-2 mb-4 text-[#FDFBF7]">
                  Napisz do nas
                </h2>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-6">
                  Skontaktuj się z nami bezpośrednio na podany adres e-mail lub skorzystaj z formularza obok.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3.5 bg-[#12100E] border border-[#c5a880]/30 p-4 rounded-2xl shadow-md">
                    <Mail className="w-5 h-5 text-[#c5a880]" />
                    <div>
                      <span className="text-[9px] text-stone-400 uppercase tracking-widest block font-medium">Adres e-mail</span>
                      <a href="mailto:kontakt@mastalex.pl" className="text-sm font-semibold hover:underline text-[#FDFBF7]">
                        kontakt@mastalex.pl
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#c5a880]/15 text-[10px] font-mono text-stone-400">
                <span>Warszawa / Online</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#12100E] border border-[#c5a880]/30 rounded-3xl p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
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
                className="space-y-4 text-left"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-stone-300 uppercase tracking-wider">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jan Kowalski" 
                      className="w-full p-3 rounded-xl border text-xs bg-[#0A0908] border-[#c5a880]/30 text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-stone-300 uppercase tracking-wider">Adres e-mail</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jan@firma.pl" 
                      className="w-full p-3 rounded-xl border text-xs bg-[#0A0908] border-[#c5a880]/30 text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-stone-300 uppercase tracking-wider">Treść wiadomości</label>
                  <textarea 
                    rows="3" 
                    required
                    placeholder="Opisz krótko swoje wymagania..." 
                    className="w-full p-3 rounded-xl border text-xs bg-[#0A0908] border-[#c5a880]/30 text-white focus:outline-none focus:border-[#c5a880] transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 text-xs font-serif font-bold uppercase tracking-widest transition-all duration-300 bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black hover:shadow-[0_0_25px_rgba(197,168,128,0.5)] rounded-full cursor-pointer mt-2"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER SECTION ================= */}
      <footer className="py-10 text-xs border-t bg-[#050403] border-[#c5a880]/20 text-stone-400 font-serif relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={() => {
              const el = document.getElementById('kontakt')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center space-x-2 text-xl tracking-widest font-bold bg-transparent border-transparent cursor-pointer font-serif text-white"
          >
            <span>MASTALEX</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
          </button>
          
          <div className="flex space-x-6 text-[11px] font-medium tracking-wider uppercase">
            <button onClick={() => { const el = document.getElementById('o-nas'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#c5a880] transition-colors cursor-pointer bg-transparent border-transparent">O nas</button>
            <button onClick={() => { const el = document.getElementById('wspolpraca'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#c5a880] transition-colors cursor-pointer bg-transparent border-transparent">Współpraca</button>
            <button onClick={() => onNavigate('showcase')} className="hover:text-[#c5a880] transition-colors cursor-pointer bg-transparent border-transparent">Showcase</button>
            <button onClick={() => { const el = document.getElementById('kontakt'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-[#c5a880] transition-colors cursor-pointer bg-transparent border-transparent">Kontakt</button>
          </div>

          <div className="text-[11px] font-mono opacity-60">
            © {new Date().getFullYear()} Mastalex. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>

    </div>
  )
}
