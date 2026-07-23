import { useState, useEffect } from 'react'
import { ArrowLeft, Layers, Droplet, Cpu, Sparkles, HelpCircle, Code, Maximize2, Minimize2 } from 'lucide-react'
import TiltCardShowcase from '../../components/Showcase/TiltCardShowcase'
import WaterRippleShowcase from '../../components/Showcase/WaterRippleShowcase'
import MagneticButtonShowcase from '../../components/Showcase/MagneticButtonShowcase'
import SpotlightShowcase from '../../components/Showcase/SpotlightShowcase'
import CardStackShowcase from '../../components/Showcase/CardStackShowcase'
import MarqueeShowcase from '../../components/Showcase/MarqueeShowcase'

export default function MinimalisticShowcase({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('tilt')
  const [isFullScreen, setIsFullScreen] = useState(false)

  const theme = {
    variant: 'minimalistic',
    primary: 'text-stone-900',
    bg: 'bg-stone-900',
    border: 'border-stone-300'
  }

  const items = [
    { id: 'tilt', label: 'Karta 3D (Paralaksa)', component: <TiltCardShowcase theme={theme} />, icon: <Layers className="w-4 h-4" /> },
    { id: 'water', label: 'Tafla Wody', component: <WaterRippleShowcase theme={theme} />, icon: <Droplet className="w-4 h-4" /> },
    { id: 'magnetic', label: 'Pole Magnetyczne', component: <MagneticButtonShowcase theme={theme} />, icon: <Cpu className="w-4 h-4" /> },
    { id: 'spotlight', label: 'Latarka i Świetlik', component: <SpotlightShowcase theme={theme} />, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'stack', label: 'Przeciąganie Kart', component: <CardStackShowcase theme={theme} />, icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'marquee', label: 'Przewijany Tekst', component: <MarqueeShowcase theme={theme} />, icon: <Code className="w-4 h-4" /> }
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
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 font-sans">
      {/* HEADER */}
      <header className="border-b border-stone-200 sticky top-0 z-40 bg-[#fcfbf9]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Powrót do strony głównej</span>
          </button>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400">
            MINIMALISTYCZNY POKAZ KOMPONENTÓW
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* TITLE SECTION */}
        <div className="border-b border-stone-200 pb-6 space-y-2 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-500">
            LABORATORIUM INTERFEJSU
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Pokaz Komponentów
          </h1>
          <p className="text-sm text-stone-600 max-w-xl">
            Przetestuj przygotowane interaktywne komponenty i animacje w stylu czystego minimalizmu.
          </p>
        </div>

        {/* COMPONENT INSPECTOR GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR TABS */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block border-b border-stone-200 pb-2 text-left">
              WYBÓR KOMPONENTU
            </span>
            <div className="space-y-1.5">
              {items.map((item) => {
                const isActive = item.id === activeTab
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center space-x-3 transition-all cursor-pointer ${
                      isActive
                        ? 'border-black bg-black text-white shadow-sm'
                        : 'border-transparent text-stone-600 hover:bg-stone-200/60'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-700'}`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ACTIVE COMPONENT STAGE */}
          <div className="lg:col-span-8 bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 min-h-[500px] relative">
            {/* FULL SCREEN TRIGGER BUTTON */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsFullScreen(true)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-900 hover:text-white text-xs font-mono font-bold uppercase transition-all cursor-pointer shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-[#fcfbf9] overflow-auto flex flex-col p-6 md:p-10 select-none">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-stone-400">
                TRYB PEŁNOEKRANOWY
              </span>
              <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full uppercase font-mono">
                {activeItem.label}
              </span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-stone-800 transition-colors text-xs font-mono font-bold uppercase cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Zamknij pełny ekran (ESC)</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center bg-stone-50 border border-stone-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="w-full">
              {activeItem.component}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
