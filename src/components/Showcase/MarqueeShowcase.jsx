import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RefreshCw, Zap } from 'lucide-react'

export default function MarqueeShowcase({ theme }) {
  const [speedLane1, setSpeedLane1] = useState(15) // duration in seconds
  const [speedLane2, setSpeedLane2] = useState(25)
  const [speedLane3, setSpeedLane3] = useState(20)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  const lane1Items = ['Responsywność', 'Błyskawiczne Ładowanie', 'Bezpieczeństwo danych', 'Nowoczesne Animacje', 'Indywidualny Projekt', 'Dedykowane Rozwiązania', 'Optymalizacja SEO']
  const lane2Items = ['React 19', 'Next.js 15', 'Tailwind CSS v4', 'Vite 8', 'Framer Motion', 'TypeScript', 'Python', 'C++']
  const lane3Items = ['Estetyczna Precyzja', 'Brak Szablonów', 'Czysty Kod Źródłowy', 'Maksymalna Optymalizacja', 'Dedykowany Layout', 'Intuicyjne UX']

  const handleReset = () => {
    setSpeedLane1(15)
    setSpeedLane2(25)
    setSpeedLane3(20)
    setIsPaused(false)
  }

  const renderMarquee = (items, duration, reverse = false) => {
    return (
      <div className={`flex overflow-hidden w-full py-3.5 border-y relative ${
        isMinimal 
          ? 'bg-stone-50 border-stone-200' 
          : isModern 
          ? 'bg-[#0a0e1a] border-cyan-400/20' 
          : 'bg-[#12100E] border-[#c5a880]/10'
      }`}>
        <div className={`absolute inset-y-0 left-0 w-12 z-10 ${
          isMinimal 
            ? 'bg-gradient-to-r from-stone-50 to-transparent' 
            : isModern 
            ? 'bg-gradient-to-r from-[#0a0e1a] to-transparent' 
            : 'bg-gradient-to-r from-[#12100E] to-transparent'
        }`} />
        <div className={`absolute inset-y-0 right-0 w-12 z-10 ${
          isMinimal 
            ? 'bg-gradient-to-l from-stone-50 to-transparent' 
            : isModern 
            ? 'bg-gradient-to-l from-[#0a0e1a] to-transparent' 
            : 'bg-gradient-to-l from-[#12100E] to-transparent'
        }`} />

        <div className="flex space-x-8 whitespace-nowrap min-w-full">
          <motion.div
            key={duration + isPaused}
            animate={isPaused ? {} : { 
              x: reverse ? [-1000, 0] : [0, -1000] 
            }}
            transition={isPaused ? {} : { 
              ease: 'linear', 
              duration, 
              repeat: Infinity 
            }}
            className="flex space-x-12 pr-12"
          >
            {items.concat(items).concat(items).map((item, index) => (
              <span 
                key={index} 
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`text-xs font-mono font-semibold transition-all duration-300 cursor-pointer flex items-center space-x-2 ${
                  hoveredItem === item 
                    ? isMinimal
                      ? 'text-stone-900 scale-110 font-bold'
                      : isModern
                      ? 'text-cyan-400 scale-110 font-bold'
                      : 'text-[#c5a880] scale-110 font-bold'
                    : isMinimal
                    ? 'text-stone-600'
                    : isModern
                    ? 'text-stone-300'
                    : 'text-stone-400'
                }`}
              >
                <span>✦</span>
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 ${isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'}`}>
        <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
          Przewijany tekst (Marquee)
        </h3>
        <p className={`text-xs font-light mt-1 ${isMinimal ? 'text-stone-600' : 'text-stone-300'}`}>
          Nieskończenie przewijające się wstęgi tekstowe z niezależnym czasem cyklu i zatrzymaniem.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        
        {/* Controls (left) */}
        <div className={`md:col-span-5 p-6 rounded-2xl flex flex-col justify-between space-y-6 border ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200 text-stone-900 font-sans' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/30 text-white font-sans' 
            : 'bg-[#12100E] border-[#c5a880]/20 text-[#FDFBF7] font-serif'
        }`}>
          <div className="space-y-4">
            <div className={`flex justify-between items-center border-b pb-2 ${
              isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
            }`}>
              <span className="text-xs font-mono font-bold uppercase tracking-wider">KONTROLA PRĘDKOŚCI WSTĘG</span>
              <Zap className={`w-4 h-4 ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`} />
            </div>

            {/* Lane 1 Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Wstęga 1 (Funkcjonalność)</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{speedLane1}s</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={speedLane1} 
                onChange={(e) => setSpeedLane1(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>

            {/* Lane 2 Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Wstęga 2 (Technologie)</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{speedLane2}s</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={speedLane2} 
                onChange={(e) => setSpeedLane2(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>

            {/* Lane 3 Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Wstęga 3 (Standardy)</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{speedLane3}s</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                value={speedLane3} 
                onChange={(e) => setSpeedLane3(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-full py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
                isPaused 
                  ? 'bg-red-500 text-white border-red-500' 
                  : isMinimal 
                  ? 'bg-black text-white hover:bg-stone-800 border-black' 
                  : isModern 
                  ? 'bg-cyan-500 text-black hover:bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                  : 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black border-[#c5a880]'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Wznów przewijanie' : 'Zatrzymaj ruch wstęg'}</span>
            </button>

            <button
              onClick={handleReset}
              className={`w-full py-2 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
                isMinimal 
                  ? 'bg-stone-200 border-stone-300 text-stone-900 hover:bg-stone-300' 
                  : isModern 
                  ? 'bg-[#0c1220] border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20' 
                  : 'bg-[#0A0908] border-[#c5a880]/20 text-stone-300 hover:bg-white/5'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resetuj prędkości</span>
            </button>
          </div>
        </div>

        {/* Marquee Display Container (right) */}
        <div className={`md:col-span-7 rounded-2xl p-6 flex flex-col justify-center space-y-6 overflow-hidden border ${
          isMinimal 
            ? 'bg-white border-stone-300 shadow-md' 
            : isModern 
            ? 'bg-[#030509] border-cyan-400/40 shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
            : 'bg-[#090807] border-[#c5a880]/20 shadow-2xl'
        }`}>
          {renderMarquee(lane1Items, speedLane1, false)}
          {renderMarquee(lane2Items, speedLane2, true)}
          {renderMarquee(lane3Items, speedLane3, false)}
        </div>

      </div>
    </div>
  )
}
