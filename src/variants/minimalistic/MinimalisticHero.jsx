import { ArrowRight, Zap } from 'lucide-react'

export default function MinimalisticHero({ onNavigate }) {
  return (
    <section className="bg-white py-16 md:py-24 font-sans text-stone-900">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full w-fit bg-stone-100 border border-stone-300 font-sans text-stone-900">
          <Zap className="w-3.5 h-3.5 text-black" />
          <span className="text-[10px] font-bold tracking-widest uppercase">WEB DEVELOPMENT</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-stone-900 leading-tight">
          Twoja wizja.<br />
          <span className="font-light text-stone-600">Nasze wykonanie.</span>
        </h1>
        
        {/* Paragraph */}
        <p className="text-sm sm:text-base max-w-xl leading-relaxed font-sans text-stone-600 font-normal">
          Strony internetowe dla firm. Bez szablonów.
        </p>

        {/* Motto Display */}
        <div className="grid grid-cols-2 gap-x-8 py-4 px-8 border border-stone-200 w-full max-w-md bg-stone-50 rounded-lg text-stone-900 font-sans">
          <div className="text-left text-[11px] font-bold uppercase leading-relaxed tracking-wider">
            TWOJA strona<br />
            TWOJA wizja<br />
            TWOJA wygoda
          </div>
          <div className="text-left border-l border-stone-200 pl-6 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
            NASZ wysiłek<br />
            NASZ czas<br />
            NASZE doświadczenie
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2 font-sans">
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
          
          <button 
            onClick={() => onNavigate('showcase')}
            className="px-7 py-3.5 bg-transparent border border-stone-300 text-stone-900 hover:bg-stone-100 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Eksploruj showcase</span>
          </button>
        </div>

      </div>
    </section>
  )
}
