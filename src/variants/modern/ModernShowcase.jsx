import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Layers, Droplet, Cpu, Sparkles, HelpCircle, Code, Maximize2, Minimize2 } from 'lucide-react'
import TiltCardShowcase from '../../components/Showcase/TiltCardShowcase'
import WaterRippleShowcase from '../../components/Showcase/WaterRippleShowcase'
import MagneticButtonShowcase from '../../components/Showcase/MagneticButtonShowcase'
import SpotlightShowcase from '../../components/Showcase/SpotlightShowcase'
import CardStackShowcase from '../../components/Showcase/CardStackShowcase'
import MarqueeShowcase from '../../components/Showcase/MarqueeShowcase'

export default function ModernShowcase({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('tilt')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const canvasRef = useRef(null)

  const theme = {
    variant: 'modern',
    primary: 'text-cyan-400',
    bg: 'bg-cyan-400',
    border: 'border-cyan-400/50'
  }

  const items = [
    { id: 'tilt', label: 'Karta 3D (Paralaksa)', component: <TiltCardShowcase theme={theme} />, icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'water', label: 'Tafla Wody', component: <WaterRippleShowcase theme={theme} />, icon: <Droplet className="w-4 h-4 text-cyan-400" /> },
    { id: 'magnetic', label: 'Pole Magnetyczne', component: <MagneticButtonShowcase theme={theme} />, icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { id: 'spotlight', label: 'Latarka i Świetlik', component: <SpotlightShowcase theme={theme} />, icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: 'stack', label: 'Przeciąganie Kart', component: <CardStackShowcase theme={theme} />, icon: <HelpCircle className="w-4 h-4 text-cyan-400" /> },
    { id: 'marquee', label: 'Przewijany Tekst', component: <MarqueeShowcase theme={theme} />, icon: <Code className="w-4 h-4 text-cyan-400" /> }
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

  // PS3 Wave Canvas Background + Floating Particles Effect (Hardware Accelerated)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    let animationId
    let step = 0

    const particleCount = 24
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
      vy: Math.random() * 0.3 + 0.1,
      vx: (Math.random() - 0.5) * 0.2
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      ctx.fillStyle = '#030509'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      step += 0.012

      particles.forEach(p => {
        p.y -= p.vy
        p.x += p.vx
        if (p.y < 0) p.y = canvas.height
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`
        ctx.fill()
      })

      const waves = [
        { amplitude: 55, wavelength: 0.0025, speed: step, color: 'rgba(56, 189, 248, 0.12)', offset: 20 },
        { amplitude: 75, wavelength: 0.0018, speed: step * 0.7, color: 'rgba(197, 168, 128, 0.10)', offset: 120 },
        { amplitude: 40, wavelength: 0.0035, speed: step * 1.3, color: 'rgba(148, 163, 184, 0.15)', offset: -80 }
      ]

      waves.forEach(w => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2 + w.offset)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = Math.sin(x * w.wavelength + w.speed) * w.amplitude +
                    Math.cos(x * 0.0008 + w.speed * 0.6) * (w.amplitude * 0.6) +
                    canvas.height / 2 + w.offset
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = w.color
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#030509] text-white font-sans relative overflow-hidden select-none transform-gpu">
      {/* PS3 Waves & Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8 relative z-10">
        {/* TOP BAR / TITLE SECTION */}
        <div className="border-b border-cyan-400/20 pb-6 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Powrót do menu</span>
            </button>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400/80 bg-black/60 px-3 py-1.5 rounded-full border border-cyan-400/30">
              NOWOCZESNY POKAZ KOMPONENTÓW
            </span>
          </div>

          <div className="space-y-1 pt-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Pokaz Komponentów
            </h1>
            <p className="text-sm font-light text-stone-300 max-w-xl">
              Interaktywne laboratorium komponentów w futurystycznym motywie Modern Cyber-Cyan.
            </p>
          </div>
        </div>

        {/* COMPONENT STAGE GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR TABS */}
          <div className="lg:col-span-4 bg-[#0a0e1a]/85 border border-cyan-400/30 rounded-3xl p-6 space-y-4 shadow-[0_0_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block border-b border-white/10 pb-2 text-left">
              WYBÓR INTERAKCJI
            </span>
            <div className="space-y-2">
              {items.map((item) => {
                const isActive = item.id === activeTab
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-bold uppercase tracking-wider flex items-center space-x-3 transition-all cursor-pointer ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] ring-1 ring-cyan-400/50'
                        : 'border-transparent text-stone-400 hover:bg-white/5 hover:text-stone-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-cyan-400 text-black' : 'bg-stone-900/60 text-cyan-300'}`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ACTIVE COMPONENT CANVAS AREA */}
          <div className="lg:col-span-8 bg-[#0c1220]/95 border border-cyan-400/30 rounded-3xl p-6 md:p-8 min-h-[500px] shadow-[0_0_30px_rgba(56,189,248,0.2)] backdrop-blur-xl relative">
            {/* FULL SCREEN TRIGGER BUTTON */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsFullScreen(true)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 hover:bg-cyan-400 hover:text-black text-cyan-300 text-xs font-mono font-bold uppercase transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.25)]"
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
        <div className="fixed inset-0 z-50 bg-[#030509]/98 overflow-auto flex flex-col p-6 md:p-10 select-none backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-cyan-400/30 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                TRYB PEŁNOEKRANOWY MODERN
              </span>
              <span className="text-xs font-mono font-bold px-3.5 py-1 bg-cyan-400 text-black rounded-full uppercase">
                {activeItem.label}
              </span>
            </div>

            <button
              onClick={() => setIsFullScreen(false)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 font-mono text-xs font-bold uppercase cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Zamknij pełny ekran (ESC)</span>
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center bg-[#0c1220] border border-cyan-400/40 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(56,189,248,0.3)]">
            <div className="w-full">
              {activeItem.component}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
