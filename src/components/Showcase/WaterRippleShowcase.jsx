import { useEffect, useRef, useState } from 'react'
import { Sliders, RefreshCw, Droplet } from 'lucide-react'

export default function WaterRippleShowcase({ theme }) {
  const canvasRef = useRef(null)
  
  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  // High-Definition buffer dimensions for razor-sharp rendering
  const width = 480
  const height = 320
  const size = width * height
  
  const buffer1Ref = useRef(new Float32Array(size))
  const buffer2Ref = useRef(new Float32Array(size))
  
  const textureRef = useRef(null)
  const outputDataRef = useRef(null)

  const [damping, setDamping] = useState(0.85)
  const [brushRadius, setBrushRadius] = useState(6)

  const dampingRef = useRef(0.85)

  useEffect(() => {
    dampingRef.current = damping
  }, [damping])

  // Initialize high-res texture based on active variant style
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = width
    tempCanvas.height = height
    const tCtx = tempCanvas.getContext('2d')

    // Background gradient
    const grad = tCtx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width/1.1)
    if (isMinimal) {
      grad.addColorStop(0, '#FFFFFF')
      grad.addColorStop(0.6, '#F5F5F4')
      grad.addColorStop(1, '#E7E5E4')
    } else if (isModern) {
      grad.addColorStop(0, '#0A0E1A')
      grad.addColorStop(0.6, '#0C1220')
      grad.addColorStop(1, '#030509')
    } else {
      grad.addColorStop(0, '#1C1917')
      grad.addColorStop(0.6, '#12100E')
      grad.addColorStop(1, '#090807')
    }
    tCtx.fillStyle = grad
    tCtx.fillRect(0, 0, width, height)

    // Concentric accent lines
    tCtx.strokeStyle = isMinimal ? 'rgba(0, 0, 0, 0.15)' : isModern ? 'rgba(56, 189, 248, 0.3)' : 'rgba(197, 168, 128, 0.25)'
    tCtx.lineWidth = 1.5
    tCtx.beginPath()
    tCtx.arc(width/2, height/2, 90, 0, Math.PI * 2)
    tCtx.stroke()
    tCtx.beginPath()
    tCtx.arc(width/2, height/2, 130, 0, Math.PI * 2)
    tCtx.stroke()

    // Crisp text
    tCtx.fillStyle = isMinimal ? '#1c1917' : isModern ? '#38bdf8' : '#C5A880'
    tCtx.font = isMinimal || isModern ? "bold 28px sans-serif" : "italic 28px serif"
    tCtx.textAlign = 'center'
    tCtx.textBaseline = 'middle'
    tCtx.fillText("MASTALEX", width/2, height/2 - 12)
    
    tCtx.fillStyle = isMinimal ? 'rgba(0,0,0,0.5)' : isModern ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)'
    tCtx.font = "bold 10px monospace"
    tCtx.fillText("INTERAKTYWNA TAFLA", width/2, height/2 + 16)

    textureRef.current = tCtx.getImageData(0, 0, width, height)
    outputDataRef.current = ctx.createImageData(width, height)
  }, [theme])

  // Trigger ripple at coordinate
  const drop = (x, y, radius, strength) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const scaleX = width / rect.width
    const scaleY = height / rect.height
    
    const bx = Math.floor(x * scaleX)
    const by = Math.floor(y * scaleY)
    
    const b1 = buffer1Ref.current

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = bx + dx
        const ny = by + dy
        if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < radius) {
            const intensity = Math.cos((dist / radius) * Math.PI * 0.5) * strength
            b1[ny * width + nx] += intensity
          }
        }
      }
    }
  }

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    drop(x, y, brushRadius, 2.0)
  }

  const handleClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    drop(x, y, brushRadius * 2.2, 6.0)
  }

  // Ripple simulation loop
  useEffect(() => {
    let animationId

    const renderRipples = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      const b1 = buffer1Ref.current
      const b2 = buffer2Ref.current
      const texture = textureRef.current
      const output = outputDataRef.current
      if (!texture || !output) return

      const tData = texture.data
      const oData = output.data
      const currentDamping = dampingRef.current

      // Wave propagation algorithm with energy dissipation & noise cleanup
      for (let y = 1; y < height - 1; y++) {
        const row = y * width
        for (let x = 1; x < width - 1; x++) {
          const i = row + x
          
          let val = (
            b1[i - 1] +
            b1[i + 1] +
            b1[i - width] +
            b1[i + width]
          ) * 0.5 - b2[i]

          val *= currentDamping
          if (Math.abs(val) < 0.001) val = 0
          b2[i] = val

          let xoff = Math.floor((b1[i - 1] - b1[i + 1]))
          let yoff = Math.floor((b1[i - width] - b1[i + width]))

          if (xoff !== 0 || yoff !== 0) {
            let px = Math.min(Math.max(x + xoff, 0), width - 1)
            let py = Math.min(Math.max(y + yoff, 0), height - 1)

            let pPos = (py * width + px) * 4
            let oPos = i * 4

            let shading = (xoff + yoff) * 3

            oData[oPos]     = Math.min(Math.max(tData[pPos] + shading, 0), 255)
            oData[oPos + 1] = Math.min(Math.max(tData[pPos + 1] + shading, 0), 255)
            oData[oPos + 2] = Math.min(Math.max(tData[pPos + 2] + shading, 0), 255)
            oData[oPos + 3] = 255
          } else {
            let oPos = i * 4
            let pPos = i * 4
            oData[oPos]     = tData[pPos]
            oData[oPos + 1] = tData[pPos + 1]
            oData[oPos + 2] = tData[pPos + 2]
            oData[oPos + 3] = 255
          }
        }
      }

      ctx.putImageData(output, 0, 0)

      buffer1Ref.current = b2
      buffer2Ref.current = b1
    }

    const tick = () => {
      renderRipples()
      animationId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const handleReset = () => {
    buffer1Ref.current.fill(0)
    buffer2Ref.current.fill(0)
    setDamping(0.85)
    setBrushRadius(6)
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 ${isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'}`}>
        <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
          Tafla wody
        </h3>
        <p className={`text-xs font-light mt-1 ${isMinimal ? 'text-stone-600' : 'text-stone-300'}`}>
          Poruszaj myszką po powierzchni lub kliknij, aby wywołać fale.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        
        {/* Controls Panel */}
        <div className={`md:col-span-4 p-6 rounded-2xl flex flex-col justify-between text-left space-y-6 border ${
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
              <h4 className="text-sm font-bold uppercase tracking-wider">PARAMETRY</h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Tłumienie fal (Wyciszanie)</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{Math.round(damping * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.70" 
                max="0.94" 
                step="0.01" 
                value={damping}
                onChange={(e) => setDamping(parseFloat(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Promień uderzenia</span>
                <span className={`font-mono font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>{brushRadius}px</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="12" 
                step="1" 
                value={brushRadius}
                onChange={(e) => setBrushRadius(parseInt(e.target.value))}
                className={`w-full cursor-pointer ${isMinimal ? 'accent-black' : isModern ? 'accent-cyan-400' : 'accent-[#c5a880]'}`}
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            className={`w-full py-2.5 rounded-xl text-xs font-mono flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
              isMinimal 
                ? 'bg-black text-white hover:bg-stone-800 border-black' 
                : isModern 
                ? 'bg-cyan-500 text-black hover:bg-cyan-400 border-cyan-400 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                : 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black border-[#c5a880] font-bold'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resetuj taflę</span>
          </button>
        </div>

        {/* Canvas Display */}
        <div className={`md:col-span-8 rounded-2xl overflow-hidden relative shadow-lg flex items-center justify-center border ${
          isMinimal ? 'bg-stone-100 border-stone-300' : isModern ? 'bg-[#030509] border-cyan-400/40' : 'bg-[#090807] border-[#c5a880]/20'
        }`}>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            className="w-full h-full object-cover cursor-crosshair"
          />
          <div className={`absolute top-4 right-4 pointer-events-none px-3 py-1 rounded-full border flex items-center space-x-2 backdrop-blur ${
            isMinimal 
              ? 'bg-white/80 border-stone-300 text-stone-900' 
              : isModern 
              ? 'bg-black/60 border-cyan-400/40 text-cyan-400' 
              : 'bg-black/60 border-[#c5a880]/30 text-[#c5a880]'
          }`}>
            <Droplet className="w-3.5 h-3.5 animate-bounce" />
            <span className="text-[10px] font-mono font-bold">RUCH MYSZKĄ / KLIKNIĘCIE</span>
          </div>
        </div>

      </div>
    </div>
  )
}
