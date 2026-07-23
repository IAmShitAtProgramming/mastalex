import { useState } from 'react'
import TiltCardShowcase from './TiltCardShowcase'
import MagneticButtonShowcase from './MagneticButtonShowcase'
import SpotlightShowcase from './SpotlightShowcase'
import CardStackShowcase from './CardStackShowcase'
import MarqueeShowcase from './MarqueeShowcase'
import WaterRippleShowcase from './WaterRippleShowcase'
import { Sparkles, ArrowLeft, Layers, Cpu, Code, HelpCircle, Droplet } from 'lucide-react'

export default function ShowcaseView({ theme, onBackToHome }) {
  const [activeShowcase, setActiveShowcase] = useState('tilt')
  const activeTheme = theme || { primary: 'text-premium-gold', bg: 'bg-premium-gold', border: 'border-premium-gold/30' }

  const showcases = [
    { id: 'tilt', label: 'Karta 3D (Paralaksa)', component: <TiltCardShowcase />, icon: <Layers className="w-4 h-4" /> },
    { id: 'water', label: 'Tafla wody', component: <WaterRippleShowcase theme={activeTheme} />, icon: <Droplet className="w-4 h-4" /> },
    { id: 'magnetic', label: 'Pole magnetyczne', component: <MagneticButtonShowcase theme={activeTheme} />, icon: <Cpu className="w-4 h-4" /> },
    { id: 'spotlight', label: 'Lupa i reflektor', component: <SpotlightShowcase />, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'stack', label: 'Przeciąganie kart', component: <CardStackShowcase />, icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'marquee', label: 'Przewijany tekst', component: <MarqueeShowcase theme={theme} />, icon: <Code className="w-4 h-4" /> }
  ]

  const currentShowcaseObj = showcases.find(s => s.id === activeShowcase)

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* Back button and page title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-premium-gold/10 pb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToHome}
            className="p-3 bg-cream-200 border border-premium-gold/20 hover:bg-premium-gold/10 hover:text-premium-gold-dark text-stone-600 rounded-full transition-colors duration-200 cursor-pointer flex items-center justify-center"
            title="Powrót do strony głównej"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#a57d30] font-bold">DEDYKOWANE LABORATORIUM</span>
            <h2 className="text-4xl font-serif font-bold text-premium-charcoal">Interaktywny Showcase</h2>
          </div>
        </div>

        <p className="text-xs text-stone-400 font-mono text-left md:text-right max-w-xs">
          Wszystkie komponenty są napisane w czystym React + Tailwind v4 + Framer Motion. Kliknij dowolny z bocznego panelu, aby zobaczyć szczegóły.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (left 4 cols) */}
        <div className="lg:col-span-4 bg-premium-beige border border-premium-gold/15 rounded-3xl p-6 space-y-4">
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block border-b border-premium-gold/10 pb-2">
            WYBÓR INTERAKCJI
          </span>
          <div className="space-y-2">
            {showcases.map((showcase) => (
              <button
                key={showcase.id}
                onClick={() => setActiveShowcase(showcase.id)}
                className={`w-full text-left p-4 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center space-x-3 transition-all duration-300 cursor-pointer ${
                  activeShowcase === showcase.id
                    ? 'border-premium-gold bg-premium-cream text-premium-charcoal shadow-sm scale-102 font-bold'
                    : 'border-transparent text-stone-600 hover:bg-cream-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeShowcase === showcase.id ? `${theme.bg} text-white` : 'bg-cream-200 text-stone-500'}`}>
                  {showcase.icon}
                </div>
                <span>{showcase.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Canvas Area (right 8 cols) */}
        <div className="lg:col-span-8 bg-premium-cream border border-premium-gold/15 rounded-3xl p-8 shadow-sm min-h-[500px]">
          {currentShowcaseObj ? currentShowcaseObj.component : null}
        </div>

      </div>
    </div>
  )
}
