import { ArrowRight, Zap } from 'lucide-react'
import MagneticButton from './Common/MagneticButton'

export default function Hero({ siteStyle, theme, onNavigate }) {
  const isMinimal = siteStyle === 'minimalist'

  return (
    <section className={`relative overflow-hidden transition-colors duration-300 ${
      isMinimal ? 'bg-white py-16 md:py-24' : 'bg-premium-cream pt-16 pb-20 md:py-28'
    }`}>
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-8">
        
        {/* Badge */}
        <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full w-fit ${
          isMinimal 
            ? 'bg-stone-100 border border-stone-300 text-stone-900 font-sans' 
            : 'bg-cream-200 border border-premium-gold/30 text-stone-700'
        }`}>
          <Zap className={`w-3.5 h-3.5 ${isMinimal ? 'text-black' : theme.primary}`} />
          <span className="text-[10px] font-bold tracking-widest uppercase">WEB DEVELOPMENT</span>
        </div>
        
        {/* Headline */}
        <h1 className={`text-4xl sm:text-6xl lg:text-7xl leading-tight ${
          isMinimal ? 'font-sans font-black tracking-tight text-stone-900' : 'font-serif font-light text-premium-charcoal'
        }`}>
          Twoja wizja.<br />
          <span className={isMinimal ? 'font-light text-stone-600' : 'italic font-normal'}>Nasze wykonanie.</span>
        </h1>
        
        {/* Paragraph */}
        <p className={`text-sm sm:text-base max-w-xl leading-relaxed ${
          isMinimal ? 'font-sans text-stone-600 font-normal' : 'font-serif text-stone-600 font-light'
        }`}>
          Strony internetowe dla firm. Bez szablonów.
        </p>

        {/* Motto Display */}
        <div className={`grid grid-cols-2 gap-x-8 py-4 px-8 border w-full max-w-md ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200 rounded-lg text-stone-900 font-sans' 
            : 'bg-premium-beige/30 border-premium-gold/15 rounded-lg text-premium-charcoal font-serif'
        }`}>
          <div className="text-left text-[11px] font-bold uppercase leading-relaxed tracking-wider">
            TWOJA strona<br />
            TWOJA wizja<br />
            TWOJA wygoda
          </div>
          <div className={`text-left border-l pl-6 text-[11px] font-bold uppercase leading-relaxed tracking-wider ${
            isMinimal ? 'border-stone-200' : 'border-premium-gold/15'
          }`}>
            NASZ wysiłek<br />
            NASZ czas<br />
            NASZE doświadczenie
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
          {isMinimal ? (
            <button
              onClick={() => {
                const el = document.getElementById('kontakt')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-7 py-3.5 bg-black text-white rounded-md text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-stone-800 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Napisz do nas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
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
          )}
          
          <button 
            onClick={() => onNavigate('showcase')}
            className={`px-7 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
              isMinimal 
                ? 'bg-transparent border border-stone-300 text-stone-900 hover:bg-stone-100 rounded-md' 
                : 'bg-transparent border border-premium-charcoal text-premium-charcoal hover:bg-cream-200 rounded-full'
            }`}
          >
            <span>Eksploruj showcase</span>
          </button>
        </div>

      </div>
    </section>
  )
}
