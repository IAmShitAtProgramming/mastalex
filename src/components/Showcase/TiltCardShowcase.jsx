import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sliders, RefreshCw, Layers } from 'lucide-react'

export default function TiltCardShowcase({ theme }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  // Configurator states
  const [maxTilt, setMaxTilt] = useState(15) // maximum tilt angle
  const [depth, setDepth] = useState(60) // translateZ distance for parallax layers

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    const tiltX = (y / (rect.height / 2)) * -maxTilt
    const tiltY = (x / (rect.width / 2)) * maxTilt
    
    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleReset = () => {
    setMaxTilt(15)
    setDepth(60)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 ${isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'}`}>
        <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
          Karta 3D
        </h3>
        <p className={`text-xs font-light mt-1 ${isMinimal ? 'text-stone-600 font-sans' : 'text-stone-300'}`}>
          Przesuwaj myszką nad kartą, aby zobaczyć efekt głębi trójwymiarowej.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Controls Panel (left) */}
        <div className={`md:col-span-5 p-6 rounded-2xl flex flex-col justify-between space-y-6 border ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200 text-stone-900' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/30 text-white' 
            : 'bg-[#12100E] border-[#c5a880]/25 text-[#FDFBF7]'
        }`}>
          <div className="space-y-4">
            <div className={`flex items-center space-x-2 border-b pb-2 ${
              isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
            }`}>
              <Sliders className={`w-4 h-4 ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">USTAWIENIA EFEKTU</span>
            </div>

            {/* Max Tilt Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Maksymalny kąt wychylenia</span>
                <span className={`font-mono ${isMinimal ? 'text-black font-bold' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{maxTilt}°</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={maxTilt} 
                onChange={(e) => setMaxTilt(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>

            {/* Parallax Depth Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span>Głębokość paralaksy (Z-axis)</span>
                <span className={`font-mono ${isMinimal ? 'text-black font-bold' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{depth}px</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={depth} 
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            className={`w-full py-3 transition-all rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer ${
              isMinimal 
                ? 'bg-black text-white hover:bg-stone-800' 
                : isModern 
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                : 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black hover:opacity-90'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetuj ustawienia</span>
          </button>
        </div>

        {/* 3D Card Display (right) */}
        <div className="md:col-span-7 flex justify-center py-6">
          <div
            className="perspective-[1000px] w-80 h-96 cursor-pointer select-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={cardRef}
              style={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y
              }}
              transition={isHovered ? { type: 'just' } : { type: 'spring', stiffness: 200, damping: 20 }}
              className={`w-full h-full rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border ${
                isMinimal 
                  ? 'bg-white border-stone-300 text-stone-900 shadow-lg' 
                  : isModern 
                  ? 'bg-[#0c1220] border-cyan-400/40 text-white shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
                  : 'bg-[#141210] border-[#c5a880]/30 text-white'
              }`}
            >
              {/* Background Layer (Depth -20px) */}
              <div 
                className={`absolute inset-0 [background-size:16px_16px] opacity-10 pointer-events-none ${
                  isMinimal 
                    ? 'bg-[radial-gradient(#000_1px,transparent_1px)]' 
                    : isModern 
                    ? 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)]' 
                    : 'bg-[radial-gradient(#c5a880_1px,transparent_1px)]'
                }`}
                style={{
                  transform: `translateZ(-20px)`,
                }}
              />

              {/* Top accent elements */}
              <div className="flex justify-between items-start">
                <span 
                  className={`text-[9px] font-mono border px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isMinimal 
                      ? 'text-stone-900 border-stone-400 font-bold' 
                      : isModern 
                      ? 'text-cyan-400 border-cyan-400/40 bg-cyan-500/10' 
                      : 'text-[#c5a880] border-[#c5a880]/30'
                  }`}
                  style={{ transform: `translateZ(${depth / 2}px)` }}
                >
                  3D Render Engine
                </span>
                <Layers className={`w-5 h-5 ${isMinimal ? 'text-stone-400' : isModern ? 'text-cyan-400/60' : 'text-[#c5a880]/50'}`} />
              </div>

              {/* Middle Layer: Glowing Abstract Geometry (Depth +Depth px) */}
              <div 
                className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center mx-auto my-auto relative ${
                  isMinimal 
                    ? 'border-stone-300' 
                    : isModern 
                    ? 'border-cyan-400/30' 
                    : 'border-[#c5a880]/20'
                }`}
                style={{ 
                  transform: `translateZ(${depth}px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`absolute w-24 h-24 rounded-full border ${
                  isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/40' : 'border-[#c5a880]/30'
                }`} />
                <div className={`absolute w-12 h-12 rounded-full blur-sm ${
                  isMinimal ? 'bg-stone-200' : isModern ? 'bg-cyan-400/20' : 'bg-[#c5a880]/10'
                }`} />
                <div className={`w-2.5 h-2.5 rounded-full animate-ping ${
                  isMinimal ? 'bg-stone-900' : isModern ? 'bg-cyan-400' : 'bg-[#c5a880]'
                }`} />
              </div>

              {/* Front Info Layer (Depth +30px) */}
              <div 
                className="space-y-1.5 text-left"
                style={{ transform: `translateZ(${depth * 0.7}px)` }}
              >
                <span className={`text-[9px] font-mono uppercase tracking-widest block ${
                  isMinimal ? 'text-stone-500' : isModern ? 'text-cyan-300' : 'text-stone-400'
                }`}>
                  CSS Transform: preserve-3d
                </span>
                <h4 className={`text-xl font-bold tracking-wide ${
                  isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-white font-serif'
                }`}>
                  EFEKT PARALAKSY
                </h4>
                <p className={`text-[10px] font-light leading-relaxed ${
                  isMinimal ? 'text-stone-600' : isModern ? 'text-stone-300' : 'text-stone-400'
                }`}>
                  Trzy płaszczyzny o różnych głębokościach Z poruszają się z różną prędkością podczas wychylania karty.
                </p>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </div>
  )
}
