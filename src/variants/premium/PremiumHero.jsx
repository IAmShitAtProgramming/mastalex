import { ArrowRight, Zap } from 'lucide-react'
import MagneticButton from '../../components/Common/MagneticButton'

export default function PremiumHero({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-premium-cream pt-16 pb-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-cream-200 border border-premium-gold/30 px-4 py-1.5 rounded-full w-fit">
          <Zap className="w-3.5 h-3.5 text-premium-gold" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-stone-700">WEB DEVELOPMENT</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-tight text-premium-charcoal">
          Twoja wizja.<br />
          <span className="italic font-normal">Nasze wykonanie.</span>
        </h1>
        
        {/* Paragraph */}
        <p className="text-sm sm:text-base text-stone-600 font-serif font-light max-w-xl leading-relaxed">
          Strony internetowe dla firm. Bez szablonów.
        </p>

        {/* Motto Display */}
        <div className="grid grid-cols-2 gap-x-8 py-4 px-8 border border-premium-gold/15 w-full max-w-md bg-premium-beige/30 rounded-lg font-serif">
          <div className="text-left text-[11px] font-bold text-premium-charcoal uppercase leading-relaxed tracking-wider">
            TWOJA strona<br />
            TWOJA wizja<br />
            TWOJA wygoda
          </div>
          <div className="text-left border-l border-premium-gold/15 pl-6 text-[11px] font-bold text-premium-charcoal uppercase leading-relaxed tracking-wider">
            NASZ wysiłek<br />
            NASZ czas<br />
            NASZE doświadczenie
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
          <MagneticButton 
            onClick={() => {
              const el = document.getElementById('kontakt')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-7 py-3.5 bg-premium-charcoal text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Napisz do nas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
          
          <button 
            onClick={() => onNavigate('showcase')}
            className="px-7 py-3.5 bg-transparent border border-premium-charcoal text-premium-charcoal rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-cream-200 transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Eksploruj showcase</span>
          </button>
        </div>

      </div>
    </section>
  )
}
