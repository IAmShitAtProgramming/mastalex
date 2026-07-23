import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { RotateCcw, ArrowRight, Layers, HelpCircle, CheckCircle2 } from 'lucide-react'

// Individual Swipeable Card Component
function SwipeCard({ card, active, onSwipe, theme }) {
  const x = useMotionValue(0)
  
  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  const rotate = useTransform(x, [-150, 150], [-12, 12])
  const opacity = useTransform(x, [-150, 0, 150], [0.6, 1, 0.6])
  const likeOpacity = useTransform(x, [0, 60], [0, 1])
  const rejectOpacity = useTransform(x, [-60, 0], [1, 0])

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 90) {
      onSwipe(card, 'right')
    } else if (info.offset.x < -90) {
      onSwipe(card, 'left')
    }
  }

  if (!active) return null

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03 }}
      className={`absolute w-80 h-96 rounded-3xl p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing select-none border transition-all ${
        isMinimal 
          ? 'bg-white border-stone-300 text-stone-900 font-sans shadow-lg' 
          : isModern 
          ? 'bg-[#0c1220] border-cyan-400/40 text-white font-sans shadow-[0_0_25px_rgba(56,189,248,0.25)]' 
          : 'bg-[#141210] border-[#c5a880]/30 text-[#FDFBF7] font-serif shadow-2xl'
      }`}
    >
      {/* Swipe Badge overlays */}
      <motion.div 
        style={{ opacity: likeOpacity }} 
        className="absolute top-8 left-8 border-2 border-green-500 text-green-500 font-mono font-bold text-xs uppercase px-3 py-1 rounded-md rotate-[-10deg] tracking-widest pointer-events-none"
      >
        Zapisz
      </motion.div>
      <motion.div 
        style={{ opacity: rejectOpacity }} 
        className="absolute top-8 right-8 border-2 border-red-500 text-red-500 font-mono font-bold text-xs uppercase px-3 py-1 rounded-md rotate-[10deg] tracking-widest pointer-events-none"
      >
        Pomiń
      </motion.div>

      {/* Card Header */}
      <div className={`flex justify-between items-center border-b pb-3 ${
        isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
      }`}>
        <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${
          isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'
        }`}>
          {card.label}
        </span>
        <Layers className={`w-4 h-4 ${isMinimal ? 'text-stone-400' : isModern ? 'text-cyan-400/60' : 'text-[#c5a880]/60'}`} />
      </div>

      {/* Card Body */}
      <div className="space-y-4 my-auto text-left">
        <h4 className={`text-2xl font-bold leading-tight ${
          isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-white font-serif'
        }`}>
          {card.title}
        </h4>
        <p className={`text-xs font-light leading-relaxed ${
          isMinimal ? 'text-stone-600' : 'text-stone-300'
        }`}>
          {card.description}
        </p>

        {/* Visual representations */}
        <div className={`p-3.5 rounded-xl space-y-2 border ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/20' 
            : 'bg-[#0A0908] border-[#c5a880]/20'
        }`}>
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span>Struktura:</span>
            <span className="font-bold">{card.structure}</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${
            isMinimal ? 'bg-stone-200' : isModern ? 'bg-cyan-950' : 'bg-stone-800'
          }`}>
            <div 
              className={`h-full rounded-full ${
                isMinimal ? 'bg-stone-900' : isModern ? 'bg-cyan-400' : 'bg-[#c5a880]'
              }`}
              style={{ width: `${card.complexity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className={`flex justify-between items-center text-[10px] font-mono border-t pt-4 ${
        isMinimal ? 'border-stone-200 text-stone-500' : isModern ? 'border-cyan-400/20 text-stone-400' : 'border-[#c5a880]/20 text-stone-400'
      }`}>
        <span>Przeciągnij w bok &larr; &rarr;</span>
        <span className={`font-bold ${isMinimal ? 'text-stone-900' : isModern ? 'text-cyan-400' : 'text-[#c5a880]'}`}>
          ID: #{card.id}
        </span>
      </div>
    </motion.div>
  )
}

export default function CardStackShowcase({ theme }) {
  const isMinimal = theme?.variant === 'minimalistic'
  const isModern = theme?.variant === 'modern'

  const initialCards = [
    { 
      id: 1, 
      label: 'UKŁAD TYPU A', 
      title: 'Minimalistyczny układ symetryczny', 
      description: 'Klasyczna, wyśrodkowana struktura tekstu z mocnym naciskiem na dużą czcionkę szeryfową. Idealna do prezentacji nagłówków wizerunkowych.', 
      structure: 'CENTRAL / GRID', 
      complexity: 40 
    },
    { 
      id: 2, 
      label: 'UKŁAD TYPU B', 
      title: 'Asymetryczny Układ Kafelkowy', 
      description: 'Zróżnicowane wysokości modułów generują dynamiczne napięcie wizualne i prowadzą wzrok użytkownika w dół sekcji.', 
      structure: 'MASONRY / FLEX', 
      complexity: 75 
    },
    { 
      id: 3, 
      label: 'UKŁAD TYPU C', 
      title: 'Pełnoekranowy Split-Screen', 
      description: 'Dwa niezależne panele przewijania. Lewy reprezentuje statyczny opis nawigacyjny, a prawy interaktywną część roboczą.', 
      structure: 'SPLIT / FULL', 
      complexity: 90 
    }
  ]

  const [cards, setCards] = useState(initialCards)
  const [savedCards, setSavedCards] = useState([])
  const [history, setHistory] = useState([])

  const handleSwipe = (swipedCard, direction) => {
    setHistory(prev => [...prev, { card: swipedCard, direction }])
    setCards(prev => prev.filter(c => c.id !== swipedCard.id))
    
    if (direction === 'right') {
      setSavedCards(prev => [...prev, swipedCard])
    }
  }

  const handleUndo = () => {
    if (history.length === 0) return
    const lastAction = history[history.length - 1]
    setHistory(prev => prev.slice(0, -1))
    
    setCards(prev => [lastAction.card, ...prev])
    if (lastAction.direction === 'right') {
      setSavedCards(prev => prev.filter(c => c.id !== lastAction.card.id))
    }
  }

  const resetDeck = () => {
    setCards(initialCards)
    setSavedCards([])
    setHistory([])
  }

  return (
    <div className={`space-y-6 text-left ${isMinimal ? 'font-sans' : isModern ? 'font-sans' : 'font-serif'}`}>
      <div className={`border-b pb-4 ${isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'}`}>
        <h3 className={`text-3xl font-bold ${isMinimal ? 'text-stone-900 font-sans' : isModern ? 'text-white font-sans' : 'text-[#FDFBF7] font-serif'}`}>
          Przeciąganie kart
        </h3>
        <p className={`text-xs font-light mt-1 ${isMinimal ? 'text-stone-600' : 'text-stone-300'}`}>
          Przeciągaj karty w lewo (pomiń) lub w prawo (zapisz na liście obok).
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        
        {/* Card Stage area (left) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center min-h-[420px] relative">
          <div className="relative w-80 h-96 flex items-center justify-center">
            <AnimatePresence>
              {cards.map((card, index) => (
                <SwipeCard
                  key={card.id}
                  card={card}
                  active={index === 0}
                  onSwipe={handleSwipe}
                  theme={theme}
                />
              ))}
            </AnimatePresence>

            {cards.length === 0 && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-center space-y-3 p-8 rounded-3xl border ${
                  isMinimal 
                    ? 'bg-stone-50 border-stone-200 text-stone-900' 
                    : isModern 
                    ? 'bg-[#0a0e1a] border-cyan-400/30 text-white' 
                    : 'bg-[#12100E] border-[#c5a880]/20 text-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                  isMinimal ? 'bg-stone-200 text-stone-900' : isModern ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[#c5a880]/20 text-[#c5a880]'
                }`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className={`font-bold text-xl ${isMinimal || isModern ? 'font-sans' : 'font-serif'}`}>Talia wyczerpana</h5>
                <p className="text-xs text-stone-400 font-light max-w-[240px] mx-auto">Wszystkie warianty układów zostały posortowane.</p>
                <button
                  onClick={resetDeck}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold cursor-pointer transition-colors ${
                    isMinimal 
                      ? 'bg-black text-white hover:bg-stone-800' 
                      : isModern 
                      ? 'bg-cyan-400 text-black hover:bg-cyan-300' 
                      : 'bg-[#c5a880] text-black hover:bg-[#b09268]'
                  }`}
                >
                  Resetuj talię
                </button>
              </motion.div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className={`p-3 border rounded-full transition-all cursor-pointer ${
                history.length === 0 
                  ? 'border-stone-700 text-stone-600 pointer-events-none opacity-40'
                  : isMinimal
                  ? 'border-stone-400 text-stone-900 hover:bg-stone-200'
                  : isModern
                  ? 'border-cyan-400/40 text-cyan-400 hover:bg-cyan-500/20'
                  : 'border-[#c5a880]/30 hover:bg-[#c5a880]/10 text-[#c5a880]'
              }`}
              title="Cofnij gest"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Saved List Dashboard (right) */}
        <div className={`md:col-span-6 rounded-3xl p-6 flex flex-col justify-between border ${
          isMinimal 
            ? 'bg-stone-50 border-stone-200 text-stone-900' 
            : isModern 
            ? 'bg-[#0a0e1a] border-cyan-400/30 text-white' 
            : 'bg-[#12100E] border-[#c5a880]/20 text-[#FDFBF7]'
        }`}>
          <div>
            <div className={`flex justify-between items-center border-b pb-4 mb-4 text-left ${
              isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
            }`}>
              <div>
                <h4 className={`text-xl font-bold ${isMinimal || isModern ? 'font-sans' : 'font-serif'}`}>Wybrane układy (Zapisane)</h4>
                <p className="text-xs text-stone-400 font-light mt-0.5">Lista kart przesuniętych w prawą stronę.</p>
              </div>
              <span className={`font-mono text-xs font-bold border px-2.5 py-0.5 rounded-full ${
                isMinimal 
                  ? 'bg-white border-stone-300 text-stone-900' 
                  : isModern 
                  ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-400' 
                  : 'bg-[#0A0908] border-[#c5a880]/30 text-[#c5a880]'
              }`}>
                Ilość: {savedCards.length}
              </span>
            </div>

            <div className="space-y-3 min-h-[220px]">
              <AnimatePresence>
                {savedCards.map((card) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-3 rounded-xl flex justify-between items-center text-xs text-left border ${
                      isMinimal 
                        ? 'bg-white border-stone-200 text-stone-900' 
                        : isModern 
                        ? 'bg-[#0c1220] border-cyan-400/20 text-white' 
                        : 'bg-[#0A0908] border-[#c5a880]/20 text-[#FDFBF7]'
                    }`}
                  >
                    <div>
                      <span className="font-bold block">{card.title}</span>
                      <span className="text-[9px] text-stone-400 font-mono mt-0.5 block">{card.structure}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-full ${
                      isMinimal 
                        ? 'bg-stone-100 border-stone-300 text-stone-900' 
                        : isModern 
                        ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-400' 
                        : 'bg-[#12100E] border-[#c5a880]/30 text-[#c5a880]'
                    }`}>
                      Złożoność: {card.complexity}%
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {savedCards.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 py-16">
                  <Layers className="w-8 h-8 opacity-30 mb-2" />
                  <span className="text-xs font-light">Przeciągnij karty w prawo, aby zapisać je tutaj.</span>
                </div>
              )}
            </div>
          </div>

          <div className={`pt-4 border-t flex justify-between items-center text-[10px] font-mono text-stone-400 ${
            isMinimal ? 'border-stone-200' : isModern ? 'border-cyan-400/20' : 'border-[#c5a880]/20'
          }`}>
            <span>Framer Motion Drag Engine</span>
            <span className="uppercase tracking-widest text-[9px] font-semibold text-stone-500">Pure UX Mechanics</span>
          </div>
        </div>

      </div>
    </div>
  )
}
