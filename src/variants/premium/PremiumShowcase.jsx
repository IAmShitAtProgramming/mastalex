import { useState, useEffect } from 'react'
import { ArrowLeft, Layers, Droplet, Cpu, Sparkles, HelpCircle, Code, Maximize2, Minimize2 } from 'lucide-react'
import TiltCardShowcase from '../../components/Showcase/TiltCardShowcase'
import WaterRippleShowcase from '../../components/Showcase/WaterRippleShowcase'
import MagneticButtonShowcase from '../../components/Showcase/MagneticButtonShowcase'
import SpotlightShowcase from '../../components/Showcase/SpotlightShowcase'
import CardStackShowcase from '../../components/Showcase/CardStackShowcase'
import MarqueeShowcase from '../../components/Showcase/MarqueeShowcase'

export default function PremiumShowcase({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('tilt')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const theme = {
    variant: 'premium',
    primary: 'text-[#c5a880]',
    bg: 'bg-[#c5a880]',
    border: 'border-[#c5a880]/40'
  }

  const items = [
    { id: 'tilt', label: 'Karta 3D (Paralaksa)', component: <TiltCardShowcase theme={theme} />, icon: <Layers className="w-4 h-4 text-[#c5a880]" /> },
    { id: 'water', label: 'Tafla Wody', component: <WaterRippleShowcase theme={theme} />, icon: <Droplet className="w-4 h-4 text-[#c5a880]" /> },
    { id: 'magnetic', label: 'Pole Magnetyczne', component: <MagneticButtonShowcase theme={theme} />, icon: <Cpu className="w-4 h-4 text-[#c5a880]" /> },
    { id: 'spotlight', label: 'Latarka i Świetlik', component: <SpotlightShowcase theme={theme} />, icon: <Sparkles className="w-4 h-4 text-[#c5a880]" /> },
    { id: 'stack', label: 'Przeciąganie Kart', component: <CardStackShowcase theme={theme} />, icon: <HelpCircle className="w-4 h-4 text-[#c5a880]" /> },
    { id: 'marquee', label: 'Przewijany Tekst', component: <MarqueeShowcase theme={theme} />, icon: <Code className="w-4 h-4 text-[#c5a880]" /> }
  ]

  const activeItem = items.find(i => i.id === activeTab) || items[0]

  // Close full screen on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullScreen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#070605] text-[#FDFBF7] font-serif relative overflow-hidden transform-gpu">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#c5a880]/15 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <header className="border-b border-[#c5a880]/20 sticky top-0 z-40 bg-[#070605]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold uppercase tracking-widest text-[#c5a880] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Powrót do strony głównej</span>
          </button>
          <span className="text-xs font-serif italic text-stone-400">
            MASTALEX PREMIUM
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8 relative z-10">
        {/* TITLE SECTION */}
        <div className="border-b border-[#c5a880]/20 pb-6 space-y-2 text-left">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#c5a880]">
            EKSKLUZYWNY POKAZ
          </span>
          <h1 className="text-3xl md:text-5xl font-normal text-white">
            Pokaz Komponentów
          </h1>
          <p className="font-sans text-sm text-stone-300 max-w-xl">
            Interaktywna prezentacja zaawansowanych efektów wizualnych w luksusowej oprawie Premium.
          </p>
        </div>

        {/* COMPONENT STAGE GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR TABS */}
          <div className="lg:col-span-4 bg-[#12100E] border border-[#c5a880]/25 rounded-3xl p-6 space-y-4 shadow-xl">
            <span className="text-[10px] font-sans font-bold text-[#c5a880] uppercase tracking-widest block border-b border-white/10 pb-2 text-left">
              WYBÓR EFEKTU
            </span>
            <div className="space-y-2">
              {items.map((item) => {
                const isActive = item.id === activeTab
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-3 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#c5a880] bg-[#1d1914] text-white shadow-md font-bold'
                        : 'border-transparent text-stone-400 hover:bg-white/5 hover:text-stone-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-[#c5a880] text-black' : 'bg-white/10 text-stone-400'}`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ACTIVE COMPONENT CANVAS AREA */}
          <div className="lg:col-span-8 bg-[#0c0a08] border border-[#c5a880]/25 rounded-3xl p-6 md:p-8 min-h-[500px] shadow-2xl relative">
            {/* FULL SCREEN TRIGGER BUTTON */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsFullScreen(true)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-[#c5a880]/30 bg-[#12100E] hover:bg-[#c5a880] hover:text-black text-[#c5a880] text-xs font-sans font-bold uppercase transition-all cursor-pointer shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Pełny ekran</span>
              </button>
            </div>

            {activeItem.component}
          </div>
        </div>
      </main>

      {/* FULL SCREEN OVERLAY MODAL */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#070605] overflow-auto flex flex-col p-6 md:p-10 select-none">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-[#c5a880]/20 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-400">
                TRYB PEŁNOEKRANOWY PREMIUM
              </span>
              <span className="text-xs font-bold px-3.5 py-1 bg-[#c5a880] text-black rounded-full uppercase font-sans">
                {activeItem.label}
              </span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black font-sans text-xs font-bold uppercase cursor-pointer hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Zamknij pełny ekran (ESC)</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center bg-[#0c0a08] border border-[#c5a880]/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="w-full">
              {activeItem.component}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
