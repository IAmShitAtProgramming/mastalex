import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Home, Users, Cpu, Mail, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Send, ArrowRight, GraduationCap, Award } from 'lucide-react'

export default function ModernPage({ onNavigate, onStyleChange }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const activeCategoryIndexRef = useRef(activeCategoryIndex)

  useEffect(() => {
    activeCategoryIndexRef.current = activeCategoryIndex
  }, [activeCategoryIndex])

  // Preserve active item index per category
  const [categoryItemIndices, setCategoryItemIndices] = useState({
    home: 0,
    about: 0,
    process: 0,
    showcase: 0,
    contact: 0
  })

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Real-time touch drag physics
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const canvasRef = useRef(null)
  const wheelLockRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0 })

  // Categories & Items mapping CONTENT.md
  const categories = [
    {
      id: 'home',
      name: 'Strona Główna',
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
      items: [
        {
          id: 'hero-main',
          type: 'hero',
          badge: 'WEB DEVELOPMENT',
          title: 'Twoja wizja.',
          subtitle: 'Nasze wykonanie.',
          detail: 'Strony internetowe dla firm. Bez szablonów.'
        },
        {
          id: 'motto',
          type: 'motto',
          title: 'Nasze Motto',
          col1: ['TWOJA strona', 'TWOJA wizja', 'TWOJA wygoda'],
          col2: ['NASZ wysiłek', 'NASZ czas', 'NASZE doświadczenie']
        }
      ]
    },
    {
      id: 'about',
      name: 'O nas',
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      items: [
        {
          id: 'karol',
          type: 'person',
          name: 'Karol Mastalerz',
          role: 'Matematyka & Analiza Danych',
          school: 'Politechnika Warszawska',
          personIcon: <GraduationCap className="w-7 h-7 text-cyan-400" />,
          bullets: [
            'Przyjęty na studia na PW na podstawie tytułu laureata (10. miejsce) w Ogólnopolskim Konkursie Matematycznym PW.',
            'Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.',
            'Pasjonat technologii z parciem do samokształcenia i rozwoju.'
          ]
        },
        {
          id: 'aleks',
          type: 'person',
          name: 'Aleks Popkowski',
          role: 'Informatyka',
          school: 'Uniwersytet Warszawski',
          personIcon: <Award className="w-7 h-7 text-cyan-400" />,
          bullets: [
            'Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).',
            'Półfinalista Olimpiady Informatycznej (OI, edycje 31. i 32.) oraz Wyróżniony Finalista V edycji STEM PW.',
            'Interesuje się marketingiem i psychologią.'
          ]
        }
      ]
    },
    {
      id: 'process',
      name: 'Współpraca',
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
      items: [
        {
          id: 'step1',
          type: 'step',
          step: '01 / 04',
          title: '1. Konsultacja i plan',
          subtitle: 'Określenie celów',
          description: 'Rozmawiamy o Twoich potrzebach i celach. Tworzymy jasny plan działania dopasowany do Twojej firmy.'
        },
        {
          id: 'step2',
          type: 'step',
          step: '02 / 04',
          title: '2. Darmowy projekt i wycena',
          subtitle: 'Wstępny widok bez zobowiązań',
          description: 'Przygotowujemy wstępny, bezpłatny projekt strony oraz przejrzystą wycenę. Widzisz efekt, zanim podejmiesz decyzję.'
        },
        {
          id: 'step3',
          type: 'step',
          step: '03 / 04',
          title: '3. Rozbudowa i dalsze prace',
          subtitle: 'Dopracowanie szczegółów',
          description: 'Uzupełniamy wszystkie treści, dopracowujemy wygląd i szlifujemy stronę tak, aby zachwycała Twoich klientów.'
        },
        {
          id: 'step4',
          type: 'step',
          step: '04 / 04',
          title: '4. Postawienie strony',
          subtitle: 'Uruchomienie i wsparcie',
          description: 'Uruchamiamy gotową witrynę pod Twoim adresem internetowym i dbamy o sprawne działanie od pierwszego dnia.'
        }
      ]
    },
    {
      id: 'showcase',
      name: 'Pokaz Komponentów',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      items: [
        {
          id: 's-open',
          type: 'action',
          title: 'Laboratorium Komponentów',
          detail: 'Interaktywne symulacje fizyk, lupy, zagięcia 3D i pętli tekstu',
          onClick: () => onNavigate('showcase')
        }
      ]
    },
    {
      id: 'contact',
      name: 'Kontakt',
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      items: [
        {
          id: 'c-email',
          type: 'contact-info',
          title: 'Oficjalny E-mail',
          value: 'kontakt@mastalex.pl',
          detail: 'Wyślij zapytanie bezpośrednio'
        },
        {
          id: 'c-loc',
          type: 'contact-info',
          title: 'Lokalizacja',
          value: 'Warszawa / Online',
          detail: 'Spotkania stacjonarne oraz współpraca zdalna'
        },
        {
          id: 'c-form',
          type: 'form',
          title: 'Formularz Kontaktowy'
        }
      ]
    }
  ]

  const currentCategory = categories[activeCategoryIndex] || categories[0]
  const activeItemIndex = categoryItemIndices[currentCategory.id] || 0

  const updateActiveItemIndex = (catIdOrUpdater, maybeIdx) => {
    if (typeof catIdOrUpdater === 'string') {
      const catId = catIdOrUpdater
      const idx = maybeIdx
      setCategoryItemIndices(prev => ({ ...prev, [catId]: idx }))
    } else {
      const updater = catIdOrUpdater
      setCategoryItemIndices(prev => {
        const currentIdx = prev[currentCategory.id] || 0
        const newIdx = typeof updater === 'function' ? updater(currentIdx) : updater
        return { ...prev, [currentCategory.id]: newIdx }
      })
    }
  }

  // Strict linear category change (NO LOOPING / WRAP-AROUND)
  const changeCategory = (newCategoryIdx) => {
    const clampedIdx = Math.max(0, Math.min(newCategoryIdx, categories.length - 1))
    if (clampedIdx === activeCategoryIndexRef.current) return
    setActiveCategoryIndex(clampedIdx)
  }

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
      ctx.fillStyle = '#04060b'
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

  // Keyboard navigation logic (Strict linear bounds with Ref to prevent stale closures)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isInputFocused || ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return

      const currCatIdx = activeCategoryIndexRef.current

      if (e.key === 'ArrowRight') {
        changeCategory(currCatIdx + 1)
      } else if (e.key === 'ArrowLeft') {
        changeCategory(currCatIdx - 1)
      } else if (e.key === 'ArrowDown') {
        updateActiveItemIndex(prev => Math.min(prev + 1, currentCategory.items.length - 1))
      } else if (e.key === 'ArrowUp') {
        updateActiveItemIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        const item = currentCategory.items[activeItemIndex]
        if (item && item.onClick) item.onClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeItemIndex, currentCategory.items, isInputFocused])

  // Mouse wheel navigation logic (Strict linear bounds, smooth debounced scroll)
  useEffect(() => {
    const handleWheel = (e) => {
      if (isInputFocused) return
      e.preventDefault()

      if (wheelLockRef.current) return
      wheelLockRef.current = true

      const currCatIdx = activeCategoryIndexRef.current

      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) {
          changeCategory(currCatIdx + 1)
        } else if (e.deltaX < 0) {
          changeCategory(currCatIdx - 1)
        }
      } else {
        if (e.deltaY > 0) {
          updateActiveItemIndex(prev => Math.min(prev + 1, currentCategory.items.length - 1))
        } else if (e.deltaY < 0) {
          updateActiveItemIndex(prev => Math.max(prev - 1, 0))
        }
      }

      setTimeout(() => {
        wheelLockRef.current = false
      }, 120)
    }

    const container = document.getElementById('ps3-xmb-root')
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) container.removeEventListener('wheel', handleWheel)
    }
  }, [currentCategory.items.length, isInputFocused])

  // Real-Time 1:1 Touch Finger Tracking & Pull-To-Refresh Prevention
  const handleTouchStart = (e) => {
    if (isInputFocused) return
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    setIsDragging(true)
    setDragOffset({ x: 0, y: 0 })
  }

  const handleTouchMove = (e) => {
    if (isInputFocused) return
    if (e.cancelable) e.preventDefault() // Prevents mobile browser pull-to-refresh!

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    setDragOffset({ x: deltaX, y: deltaY })
  }

  const handleTouchEnd = () => {
    if (isInputFocused) return
    setIsDragging(false)

    const threshold = 40
    const { x, y } = dragOffset
    const currCatIdx = activeCategoryIndexRef.current

    if (Math.abs(x) > Math.abs(y)) {
      if (x < -threshold) {
        changeCategory(currCatIdx + 1)
      } else if (x > threshold) {
        changeCategory(currCatIdx - 1)
      }
    } else {
      if (y < -threshold) {
        updateActiveItemIndex(prev => Math.min(prev + 1, currentCategory.items.length - 1))
      } else if (y > threshold) {
        updateActiveItemIndex(prev => Math.max(prev - 1, 0))
      }
    }

    setDragOffset({ x: 0, y: 0 })
  }

  // Optimized smooth cubic-bezier motion transition
  const smoothTransition = isDragging 
    ? { type: 'just' } 
    : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }

  return (
    <div 
      id="ps3-xmb-root"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-[#030509] text-white font-sans transform-gpu"
    >
      {/* PS3 Waves & Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* ================= STANDARDIZED STYLE SWITCHER BAR (Identical Pixel Alignment to Navbar) ================= */}
      <div className="absolute top-0 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between pointer-events-auto">
          <div className="flex bg-[#12100E] border border-[#c5a880]/30 p-1 rounded-full text-xs shadow-lg backdrop-blur-md">
            <button
              onClick={() => onStyleChange && onStyleChange('minimalistic')}
              className="px-3.5 py-1.5 rounded-full text-stone-400 hover:text-white transition-all font-semibold cursor-pointer"
            >
              Minimalizm
            </button>
            <button
              onClick={() => onStyleChange && onStyleChange('premium')}
              className="px-3.5 py-1.5 rounded-full text-stone-400 hover:text-white transition-all font-semibold cursor-pointer"
            >
              Premium
            </button>
            <button
              className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(56,189,248,0.6)] cursor-default"
            >
              Nowoczesny
            </button>
          </div>
        </div>
      </div>

      {/* ================= XMB CATEGORIES BAR (Horizontal Axis) ================= */}
      <div className="absolute top-0 inset-x-0 z-40 pt-20 pb-4 bg-[#030509]/85 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-center items-center space-x-4 sm:space-x-12 px-4">
          {categories.map((cat, idx) => {
            const isActive = idx === activeCategoryIndex
            return (
              <button
                key={cat.id}
                onClick={() => changeCategory(idx)}
                className={`flex flex-col items-center space-y-1.5 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'scale-110 text-white opacity-100 drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]' 
                    : 'text-stone-400 opacity-40 hover:opacity-80 scale-90'
                }`}
              >
                <div className={`p-2.5 sm:p-3 rounded-full border transition-all ${
                  isActive 
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)]' 
                    : 'bg-stone-900/40 border-transparent'
                }`}>
                  {cat.icon}
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase">
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ================= MULTI-CATEGORY GLITCH-FREE UNCLIPPED MATRIX ================= */}
      <div className="absolute top-40 inset-x-0 bottom-16 z-20 flex justify-center items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]">
        <div className="relative w-full h-full flex justify-center items-center">
          {categories.map((cat, catIdx) => {
            // Strict linear category distance (NO LOOPING / WRAP-AROUND)
            const catDistance = catIdx - activeCategoryIndex
            const isCatActive = catDistance === 0
            const absDist = Math.abs(catDistance)

            // Smooth horizontal position offset along the linear rail
            const xCategoryOffset = catDistance * 560 + (Math.abs(dragOffset.x) > Math.abs(dragOffset.y) ? dragOffset.x : 0)

            return (
              <motion.div
                key={cat.id}
                animate={{
                  x: xCategoryOffset,
                  opacity: isCatActive ? 1 : (absDist === 1 ? 0.45 : 0),
                  scale: isCatActive ? 1 : 0.85,
                  zIndex: isCatActive ? 30 : (absDist === 1 ? 10 : 0)
                }}
                transition={smoothTransition}
                style={{ willChange: 'transform, opacity' }}
                className="absolute w-full max-w-xl flex flex-col items-center justify-center pointer-events-auto transform-gpu"
              >
                {cat.items.map((item, itemIdx) => {
                  const categoryItemIdx = categoryItemIndices[cat.id] || 0
                  const isItemSelected = itemIdx === categoryItemIdx
                  const itemOffset = itemIdx - categoryItemIdx
                  const itemDistance = Math.abs(itemOffset)

                  const basePos = itemOffset * 190
                  const currentY = basePos + (isCatActive && Math.abs(dragOffset.y) > Math.abs(dragOffset.x) ? dragOffset.y : 0)

                  return (
                    <motion.div
                      key={item.id}
                      animate={{ 
                        y: currentY,
                        opacity: isCatActive 
                          ? (isItemSelected ? 1 : (itemDistance === 1 ? 0.4 : 0))
                          : (isItemSelected ? 0.7 : (itemDistance === 1 ? 0.2 : 0)), 
                        scale: isCatActive 
                          ? (isItemSelected ? 1 : 0.88 - (itemDistance - 1) * 0.08)
                          : (isItemSelected ? 0.9 : 0.8),
                        zIndex: isItemSelected ? 30 : 20 - itemDistance
                      }}
                      transition={smoothTransition}
                      style={{ willChange: 'transform, opacity' }}
                      onClick={() => {
                        if (!isCatActive) {
                          changeCategory(catIdx)
                        } else {
                          updateActiveItemIndex(itemIdx)
                          if (item.onClick) item.onClick()
                        }
                      }}
                      className={`absolute w-full text-left rounded-3xl p-6 transition-colors duration-300 ${
                        isCatActive && isItemSelected
                          ? 'bg-[#0c1220]/95 border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400/40'
                          : 'bg-[#0a0e1a]/70 border border-white/10 cursor-pointer hover:bg-[#0c1220]/80'
                      }`}
                    >
                      {/* HERO ITEM */}
                      {item.type === 'hero' && (
                        <div className="space-y-3 text-center">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/30 inline-block">
                            {item.badge}
                          </span>
                          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            {item.title}
                          </h1>
                          <p className="text-lg font-light text-stone-300 italic">
                            {item.subtitle}
                          </p>
                          <p className="text-xs text-stone-400 font-mono">
                            {item.detail}
                          </p>
                        </div>
                      )}

                      {/* MOTTO ITEM */}
                      {item.type === 'motto' && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-bold tracking-widest uppercase text-cyan-400 text-center border-b border-white/10 pb-2">
                            {item.title}
                          </h3>
                          <div className="grid grid-cols-2 gap-6 text-left font-serif py-1">
                            <div className="space-y-1.5 text-xs font-bold text-white uppercase tracking-wider border-r border-white/10 pr-2">
                              {item.col1.map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                            <div className="space-y-1.5 text-xs font-bold text-stone-300 uppercase tracking-wider pl-2">
                              {item.col2.map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PERSON ITEM */}
                      {item.type === 'person' && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                              {item.personIcon}
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-white">{item.name}</h2>
                              <p className="text-xs text-cyan-300 font-semibold">{item.role}</p>
                              <p className="text-[10px] text-stone-400">{item.school}</p>
                            </div>
                          </div>
                          <div className="space-y-1.5 border-t border-white/10 pt-3">
                            <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">PRZEBIEG AKADEMICKI</span>
                            <ul className="text-xs text-stone-300 space-y-1.5 list-disc list-inside leading-relaxed">
                              {item.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* STEP ITEM */}
                      {item.type === 'step' && (
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-400/30 inline-block">
                            {item.step}
                          </span>
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          <p className="text-xs font-semibold text-stone-400">{item.subtitle}</p>
                          <p className="text-xs text-stone-300 leading-relaxed pt-1.5 border-t border-white/10">
                            {item.description}
                          </p>
                        </div>
                      )}

                      {/* CONTACT INFO ITEM */}
                      {item.type === 'contact-info' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block font-bold">{item.title}</span>
                            <p className="text-sm font-mono font-bold text-cyan-300">{item.value}</p>
                            <p className="text-[10px] text-stone-400">{item.detail}</p>
                          </div>
                          <Mail className="w-5 h-5 text-cyan-400 opacity-60" />
                        </div>
                      )}

                      {/* FORM ITEM */}
                      {item.type === 'form' && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-1.5">{item.title}</h3>
                          {formSubmitted ? (
                            <div className="text-center py-4 text-cyan-300 font-bold text-xs">
                              Wiadomość została wysłana! Dziękujemy.
                            </div>
                          ) : (
                            <form 
                              onSubmit={async (e) => { 
                                e.preventDefault(); 
                                try {
                                  await fetch('https://formsubmit.co/ajax/kontakt@mastalex.pl', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                    body: JSON.stringify(formData)
                                  })
                                } catch (err) {}
                                setFormSubmitted(true); 
                              }}
                              className="space-y-2.5"
                            >
                              <div className="grid sm:grid-cols-2 gap-2.5">
                                <input 
                                  type="text" 
                                  required
                                  placeholder="Imię i Nazwisko" 
                                  value={formData.name}
                                  onFocus={() => setIsInputFocused(true)}
                                  onBlur={() => setIsInputFocused(false)}
                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                  className="w-full p-2 rounded-xl bg-black/60 border border-white/20 text-xs text-white focus:outline-none focus:border-cyan-400"
                                />
                                <input 
                                  type="email" 
                                  required
                                  placeholder="Adres e-mail" 
                                  value={formData.email}
                                  onFocus={() => setIsInputFocused(true)}
                                  onBlur={() => setIsInputFocused(false)}
                                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full p-2 rounded-xl bg-black/60 border border-white/20 text-xs text-white focus:outline-none focus:border-cyan-400"
                                />
                              </div>
                              <textarea 
                                rows="2" 
                                required
                                placeholder="Treść wiadomości..." 
                                value={formData.message}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full p-2 rounded-xl bg-black/60 border border-white/20 text-xs text-white focus:outline-none focus:border-cyan-400"
                              ></textarea>
                              <button 
                                type="submit"
                                className="w-full py-2 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-300 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Wyślij Wiadomość</span>
                              </button>
                            </form>
                          )}
                        </div>
                      )}

                      {/* ACTION ITEM */}
                      {item.type === 'action' && (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                            <p className="text-xs text-stone-400">{item.detail}</p>
                          </div>
                          <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Up/Down Indicators (Hidden on mobile) */}
      <div className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex-col items-center space-y-3 z-30">
        <button 
          onClick={() => updateActiveItemIndex(prev => Math.max(prev - 1, 0))}
          disabled={activeItemIndex === 0}
          className="p-2 rounded-full bg-white/10 hover:bg-white/30 disabled:opacity-20 cursor-pointer"
        >
          <ChevronUp className="w-4 h-4 text-cyan-300" />
        </button>
        <span className="text-[11px] font-mono text-stone-300 font-bold">
          {activeItemIndex + 1} / {currentCategory.items.length}
        </span>
        <button 
          onClick={() => updateActiveItemIndex(prev => Math.min(prev + 1, currentCategory.items.length - 1))}
          disabled={activeItemIndex === currentCategory.items.length - 1}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/30 disabled:opacity-20 cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 text-cyan-300" />
        </button>
      </div>

      {/* Navigation Footer Legend */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex justify-center items-center space-x-6 text-[10px] font-mono text-stone-400 pointer-events-none">
        <div className="flex items-center space-x-1">
          <ChevronLeft className="w-3.5 h-3.5 text-cyan-400" /><ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          <span>KATEGORIE</span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-1">
          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" /><ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>ELEMENTY</span>
        </div>
      </div>
    </div>
  )
}
