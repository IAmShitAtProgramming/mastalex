import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Grid, Code, Layers } from 'lucide-react'

export default function SpotlightShowcase({ theme }) {
  const gridRef = useRef(null)
  const cardRefs = useRef({})

  const [spotlightPos, setSpotlightPos] = useState({ x: 250, y: 200 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mode, setMode] = useState('latarka') // 'latarka' | 'firefly'
  const [cardOffsets, setCardOffsets] = useState({})

  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  // Accent styling for controls & indicators
  const accentText = isMinimal ? 'text-stone-900 font-extrabold' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'
  const accentBorder = isMinimal ? 'border-stone-400' : isModern ? 'border-cyan-400/40' : 'border-[#c5a880]/30'
  const accentBg = isMinimal ? 'bg-stone-200' : isModern ? 'bg-cyan-400/20' : 'bg-[#c5a880]/15'

  // Autonomous Fireflies physics state (traversing whole grid between panels)
  const firefliesRef = useRef([
    { x: 180, y: 150, vx: 1.2, vy: -1.0, maxSpeed: 3.2, wanderAngle: 0, tetherRadius: 110, lightRadius: 105 },
    { x: 350, y: 120, vx: -1.4, vy: 0.8, maxSpeed: 3.6, wanderAngle: 1.2, tetherRadius: 130, lightRadius: 115 },
    { x: 120, y: 320, vx: 0.9, vy: 1.5, maxSpeed: 2.8, wanderAngle: 2.4, tetherRadius: 95, lightRadius: 100 },
    { x: 420, y: 280, vx: -1.5, vy: -0.9, maxSpeed: 3.8, wanderAngle: 3.6, tetherRadius: 140, lightRadius: 120 },
    { x: 280, y: 220, vx: 1.1, vy: -1.4, maxSpeed: 3.4, wanderAngle: 4.8, tetherRadius: 120, lightRadius: 110 }
  ])

  const [renderFireflies, setRenderFireflies] = useState(firefliesRef.current)

  // Measure card offsets inside grid container
  const updateCardOffsets = () => {
    if (!gridRef.current) return
    const gridRect = gridRef.current.getBoundingClientRect()
    const offsets = {}

    Object.keys(cardRefs.current).forEach((id) => {
      const el = cardRefs.current[id]
      if (el) {
        const r = el.getBoundingClientRect()
        offsets[id] = {
          left: r.left - gridRect.left,
          top: r.top - gridRect.top,
          width: r.width,
          height: r.height
        }
      }
    })
    setCardOffsets(offsets)
  }

  useEffect(() => {
    updateCardOffsets()
    window.addEventListener('resize', updateCardOffsets)
    return () => window.removeEventListener('resize', updateCardOffsets)
  }, [])

  // Fireflies autonomous physics loop across the entire grid
  useEffect(() => {
    if (mode !== 'firefly') return
    let animationId

    const updatePhysics = () => {
      const mouseX = spotlightPos.x
      const mouseY = spotlightPos.y

      firefliesRef.current = firefliesRef.current.map((f) => {
        let { x, y, vx, vy, maxSpeed, wanderAngle, tetherRadius } = f

        // Organic wandering force
        wanderAngle += (Math.random() - 0.5) * 0.45
        const wanderFx = Math.cos(wanderAngle) * 0.4
        const wanderFy = Math.sin(wanderAngle) * 0.4

        // Tether force towards mouse position in grid space
        const dx = mouseX - x
        const dy = mouseY - y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1

        let tetherFx = 0
        let tetherFy = 0
        if (dist > tetherRadius) {
          const pull = (dist - tetherRadius) * 0.04
          tetherFx = (dx / dist) * pull
          tetherFy = (dy / dist) * pull
        } else {
          tetherFx = (dx / dist) * 0.07
          tetherFy = (dy / dist) * 0.07
        }

        // Apply forces to velocity
        vx += wanderFx + tetherFx
        vy += wanderFy + tetherFy

        // Limit velocity to maxSpeed
        const currentSpeed = Math.sqrt(vx * vx + vy * vy)
        if (currentSpeed > maxSpeed) {
          vx = (vx / currentSpeed) * maxSpeed
          vy = (vy / currentSpeed) * maxSpeed
        }

        x += vx
        y += vy

        return { ...f, x, y, vx, vy, wanderAngle }
      })

      setRenderFireflies([...firefliesRef.current])
      animationId = requestAnimationFrame(updatePhysics)
    }

    updatePhysics()
    return () => cancelAnimationFrame(animationId)
  }, [mode, spotlightPos])

  const patterns = [
    {
      id: 1,
      title: 'Siatka Węzłowa',
      type: 'GEOMETRIA',
      description: 'Precyzyjna siatka pozycjonowania 6x6.',
      icon: <Grid className={`w-4 h-4 ${accentText}`} />
    },
    {
      id: 2,
      title: 'Podział Proporcji',
      type: 'PROPORCJE',
      description: 'Współśrodkowe okręgi proporcji.',
      icon: <Layers className={`w-4 h-4 ${accentText}`} />
    },
    {
      id: 3,
      title: 'Typografia',
      type: 'TYPOGRAFIA',
      description: 'Liniowy podział interwałowy tekstu.',
      icon: <Eye className={`w-4 h-4 ${accentText}`} />
    },
    {
      id: 4,
      title: 'Struktura Kodowa',
      type: 'PROGRAMOWANIE',
      description: 'Wektorowe przetwarzanie komponentu.',
      icon: <Code className={`w-4 h-4 ${accentText}`} />
    }
  ]

  const handleGridMouseMove = (e) => {
    if (!gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Calculate illumination mask relative to each card
  const getMaskStyle = (cardId) => {
    const card = cardOffsets[cardId]
    if (!card) {
      return {
        WebkitMaskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)',
        maskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)'
      }
    }

    if (mode === 'latarka') {
      if (hoveredCard !== cardId) {
        return {
          WebkitMaskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)',
          maskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)'
        }
      }
      const relX = spotlightPos.x - card.left
      const relY = spotlightPos.y - card.top
      const beamRadius = isMinimal ? 150 : 135
      const mask = `radial-gradient(${beamRadius}px circle at ${relX}px ${relY}px, black 35%, transparent 100%)`
      return {
        WebkitMaskImage: mask,
        maskImage: mask
      }
    } else {
      // Świetlik mode: fireflies fly BETWEEN panels across the grid and illuminate any card they hover over!
      const overlappingBeams = renderFireflies
        .map(f => {
          const relX = f.x - card.left
          const relY = f.y - card.top
          // Check if firefly light beam hits this card bounds
          if (
            relX >= -f.lightRadius &&
            relX <= card.width + f.lightRadius &&
            relY >= -f.lightRadius &&
            relY <= card.height + f.lightRadius
          ) {
            return `radial-gradient(${f.lightRadius}px circle at ${relX}px ${relY}px, black 30%, transparent 100%)`
          }
          return null
        })
        .filter(Boolean)

      if (overlappingBeams.length === 0) {
        return {
          WebkitMaskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)',
          maskImage: 'radial-gradient(0px circle at 0px 0px, transparent 0%, transparent 100%)'
        }
      }

      const mask = overlappingBeams.join(', ')
      return {
        WebkitMaskImage: mask,
        maskImage: mask
      }
    }
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 flex flex-col md:flex-row md:justify-between md:items-end gap-4 ${
        isMinimal ? 'border-stone-300' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
      }`}>
        <div className="text-left">
          <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
            Latarka i świetlik
          </h3>
          <p className={`text-xs font-medium mt-1 ${isMinimal ? 'text-stone-700' : 'text-stone-300'}`}>
            Najeżdżaj myszką na kafelki, aby oświetlać schematy latarką lub tańczącymi świetlikami krążącymi między panelami.
          </p>
        </div>

        {/* Mode selector */}
        <div className={`flex p-1.5 rounded-full w-fit border shadow-sm ${
          isMinimal 
            ? 'bg-stone-200 border-stone-400' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/30' 
            : 'bg-[#12100E] border-[#c5a880]/20'
        }`}>
          <button
            onClick={() => setMode('latarka')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              mode === 'latarka' 
                ? isMinimal 
                  ? 'bg-black text-white font-extrabold shadow-md' 
                  : isModern 
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]' 
                  : 'bg-[#c5a880] text-black font-bold shadow-sm'
                : isMinimal
                ? 'text-stone-800 font-bold hover:text-black'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Latarka
          </button>
          <button
            onClick={() => setMode('firefly')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              mode === 'firefly' 
                ? isMinimal 
                  ? 'bg-black text-white font-extrabold shadow-md' 
                  : isModern 
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]' 
                  : 'bg-[#c5a880] text-black font-bold shadow-sm'
                : isMinimal
                ? 'text-stone-800 font-bold hover:text-black'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Świetlik
          </button>
        </div>
      </div>

      {/* Grid of elements (fireflies travel across this grid between panels!) */}
      <div 
        ref={gridRef}
        onMouseMove={handleGridMouseMove}
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto relative"
      >
        {patterns.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[item.id] = el
            }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative h-64 rounded-3xl p-6 overflow-hidden border cursor-none flex flex-col justify-between transition-all ${
              isMinimal 
                ? 'bg-white border-stone-300 text-stone-900 shadow-md hover:border-black' 
                : isModern 
                ? 'bg-[#0a0e1a] border-cyan-400/30 text-white' 
                : 'bg-[#0A0908] border-stone-800 text-white'
            }`}
          >
            {/* Unilluminated Base Header text */}
            <div className="z-0 text-left">
              <span className={`text-[10px] font-mono uppercase tracking-widest block font-extrabold ${accentText}`}>
                {item.type}
              </span>
              <h4 className={`text-xl font-extrabold mt-1 ${
                isMinimal ? 'text-stone-950 font-sans' : isModern ? 'text-white font-sans' : 'text-white font-serif'
              }`}>
                {item.title}
              </h4>
              <p className={`text-xs mt-1 max-w-xs ${isMinimal ? 'text-stone-700 font-medium' : 'text-stone-400 font-light'}`}>
                {item.description}
              </p>
            </div>

            {/* Illuminated Blueprint Geometry Layer with High-Contrast Masking */}
            <div 
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={getMaskStyle(item.id)}
            >
              <div className={`w-full h-full relative p-6 flex flex-col justify-between ${
                isMinimal ? 'bg-black text-white font-bold' : 'bg-stone-950/95 text-white font-bold'
              }`}>
                {item.id === 1 && (
                  <div className={`w-full h-full border grid grid-cols-6 grid-rows-6 ${
                    isMinimal ? 'border-stone-400 text-white' : accentBorder
                  }`}>
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className={`border flex items-center justify-center text-[8px] font-mono font-extrabold ${
                        isMinimal ? 'border-stone-400 text-white' : `${accentBorder} ${accentText}`
                      }`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}
                {item.id === 2 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-48 h-48 border-2 rounded-full flex items-center justify-center ${
                      isMinimal ? 'border-white' : accentBorder
                    }`}>
                      <div className={`w-32 h-32 border-2 rounded-full flex items-center justify-center ${
                        isMinimal ? 'border-white' : accentBorder
                      }`}>
                        <div className={`w-20 h-20 border-2 rounded-full flex items-center justify-center ${
                          isMinimal ? 'border-white' : accentBorder
                        }`}>
                          <div className={`w-10 h-10 rounded-full border ${
                            isMinimal ? 'bg-white/20 border-white' : `${accentBg} ${accentBorder}`
                          }`} />
                        </div>
                      </div>
                    </div>
                    <div className={`absolute w-56 h-[2px] rotate-45 ${isMinimal ? 'bg-white' : isModern ? 'bg-cyan-400/80' : 'bg-[#c5a880]/80'}`} />
                    <div className={`absolute w-56 h-[2px] -rotate-45 ${isMinimal ? 'bg-white' : isModern ? 'bg-cyan-400/80' : 'bg-[#c5a880]/80'}`} />
                  </div>
                )}
                {item.id === 3 && (
                  <div className={`w-full h-full p-6 font-mono text-[9px] leading-relaxed font-bold flex flex-col justify-center space-y-1.5 text-left ${
                    isMinimal ? 'text-white' : accentText
                  }`}>
                    <span className={`px-2 py-0.5 rounded border ${isMinimal ? 'bg-white/20 border-white text-white' : `${accentBg} ${accentBorder}`}`}>|-- Baseline 12px -------------------------</span>
                    <span className={`px-2 py-0.5 rounded border ${isMinimal ? 'bg-white/20 border-white text-white' : `${accentBg} ${accentBorder}`}`}>|-- Line spacing 150% --------------------</span>
                    <span className={`px-2 py-0.5 rounded border ${isMinimal ? 'bg-white/20 border-white text-white' : `${accentBg} ${accentBorder}`}`}>|-- Letter spacing 0.05em ---------------</span>
                    <span className={`px-2 py-0.5 rounded border ${isMinimal ? 'bg-white/20 border-white text-white' : `${accentBg} ${accentBorder}`}`}>|-- Align-self: flex-start ----------------</span>
                  </div>
                )}
                {item.id === 4 && (
                  <div className={`w-full h-full p-6 font-mono text-[9px] font-bold overflow-hidden text-left flex flex-col justify-center space-y-1 ${
                    isMinimal ? 'text-white font-extrabold' : isModern ? 'text-cyan-300' : 'text-amber-300'
                  }`}>
                    <span>const Spotlight = &#123;</span>
                    <span className="pl-4">mode: "{mode}",</span>
                    <span className="pl-4">x: {Math.round(spotlightPos.x)}px,</span>
                    <span className="pl-4">y: {Math.round(spotlightPos.y)}px,</span>
                    <span className="pl-4">status: "ACTIVE"</span>
                    <span>&#125;</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer indicator */}
            <div className={`z-30 flex justify-between items-center border-t pt-3 text-[9px] font-mono ${
              isMinimal ? 'border-stone-300 text-stone-800' : 'border-stone-800 text-stone-400'
            }`}>
              <div className="flex items-center space-x-1.5">
                {item.icon}
                <span>DETALE</span>
              </div>
              <span className={`font-extrabold ${accentText}`}>
                {hoveredCard === item.id ? (mode === 'latarka' ? 'LATARKA WŁĄCZONA' : 'ŚWIETLIKI OBECNE') : 'NAJEDŹ MYSZKĄ'}
              </span>
            </div>
          </div>
        ))}

        {/* Świetlik Autonomous Flying Orbs: rendered at grid container level so they fly BETWEEN panels! */}
        {mode === 'firefly' && (
          <>
            {renderFireflies.map((f, idx) => (
              <div
                key={idx}
                style={{
                  left: f.x - 6,
                  top: f.y - 6,
                }}
                className={`absolute w-3.5 h-3.5 rounded-full pointer-events-none z-30 transition-transform duration-75 animate-pulse ${
                  isMinimal 
                    ? 'bg-black shadow-[0_0_18px_#000000] border border-white' 
                    : isModern 
                    ? 'bg-cyan-300 shadow-[0_0_22px_#38bdf8]' 
                    : 'bg-amber-300 shadow-[0_0_22px_#f59e0b]'
                }`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
