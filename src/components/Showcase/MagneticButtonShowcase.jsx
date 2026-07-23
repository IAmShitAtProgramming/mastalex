import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Sliders, RefreshCw, Sparkles } from 'lucide-react'

// Sub-component for individual magnetic item
function MagneticBubble({ text, mouseX, mouseY, pullStrength, radius, damping, stiffness, theme }) {
  const bubbleRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  // Spring configurations
  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })

  useEffect(() => {
    const handleMouseMove = () => {
      if (!bubbleRef.current) return
      
      const rect = bubbleRef.current.getBoundingClientRect()
      const bubbleCenterX = rect.left + rect.width / 2
      const bubbleCenterY = rect.top + rect.height / 2
      
      const dx = mouseX.get() - bubbleCenterX
      const dy = mouseY.get() - bubbleCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < radius) {
        const force = (1 - distance / radius) * pullStrength * 80
        x.set(dx * (force / 100))
        y.set(dy * (force / 100))
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const unsubscribeX = mouseX.on("change", handleMouseMove)
    const unsubscribeY = mouseY.on("change", handleMouseMove)
    
    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, pullStrength, radius, stiffness, damping])

  return (
    <motion.div
      ref={bubbleRef}
      style={{ x: springX, y: springY }}
      className={`px-5 py-3 rounded-2xl shadow-sm border font-bold text-xs flex items-center space-x-2 select-none transition-colors duration-300 ${
        isMinimal 
          ? 'bg-white border-stone-300 text-stone-900 font-sans hover:border-black' 
          : isModern 
          ? 'bg-[#0c1220] border-cyan-400/30 text-cyan-300 font-sans hover:border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
          : 'bg-[#141210] border-[#c5a880]/30 text-[#FDFBF7] font-serif hover:border-[#c5a880]'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        isMinimal ? 'bg-stone-900' : isModern ? 'bg-cyan-400 animate-ping' : 'bg-[#c5a880]'
      }`}></span>
      <span>{text}</span>
    </motion.div>
  )
}

export default function MagneticButtonShowcase({ theme }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  // Configurator States
  const [pullStrength, setPullStrength] = useState(0.5)
  const [radius, setRadius] = useState(150)
  const [stiffness, setStiffness] = useState(150)
  const [damping, setDamping] = useState(15)

  const items = [
    'React', 'Vite', 'TypeScript', 'Tailwind', 'Math', 'Algorithms', 
    'Framer Motion', 'PyTorch', 'Haskell', 'C++', 'Data Science', 'SEO'
  ]

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const handleMouseLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  const resetPhysics = () => {
    setPullStrength(0.5)
    setRadius(150)
    setStiffness(150)
    setDamping(15)
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 ${isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'}`}>
        <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
          Pole magnetyczne
        </h3>
        <p className={`text-xs font-light mt-1 ${isMinimal ? 'text-stone-600' : 'text-stone-300'}`}>
          Zbliż kursor myszy do przycisków, aby zaobserwować przyciąganie pola magnetycznego.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        
        {/* Controls Panel */}
        <div className={`md:col-span-5 p-6 rounded-2xl flex flex-col justify-between space-y-6 border ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200 text-stone-900 font-sans' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/30 text-white font-sans' 
            : 'bg-[#12100E] border-[#c5a880]/20 text-[#FDFBF7] font-serif'
        }`}>
          <div className="space-y-4">
            <div className={`flex items-center space-x-2 border-b pb-2 ${
              isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
            }`}>
              <Sliders className={`w-4 h-4 ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`} />
              <h4 className="text-sm font-bold uppercase tracking-wider">FIZYKA MAGNESU</h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Siła przyciągania</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>
                  {Math.round(pullStrength * 100)}%
                </span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05" 
                value={pullStrength}
                onChange={(e) => setPullStrength(parseFloat(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Zasięg pola (Promień)</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>
                  {radius}px
                </span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="300" 
                step="10" 
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>
          </div>

          <button
            onClick={resetPhysics}
            className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
              isMinimal 
                ? 'bg-black text-white hover:bg-stone-800 border-black' 
                : isModern 
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 border-cyan-400 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                : 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black border-[#c5a880] font-bold'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetuj fizykę</span>
          </button>
        </div>

        {/* Magnetic Canvas Stage */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`md:col-span-7 rounded-3xl p-8 min-h-[380px] flex flex-wrap gap-4 items-center justify-center relative overflow-hidden border ${
            isMinimal 
              ? 'bg-stone-100 border-stone-300' 
              : isModern 
              ? 'bg-[#030509] border-cyan-400/40' 
              : 'bg-[#090807] border-[#c5a880]/20'
          }`}
        >
          {items.map((itemText, idx) => (
            <MagneticBubble
              key={idx}
              text={itemText}
              mouseX={mouseX}
              mouseY={mouseY}
              pullStrength={pullStrength}
              radius={radius}
              stiffness={stiffness}
              damping={damping}
              theme={theme}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
