import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar({ siteStyle, setSiteStyle, currentTab, onTabChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (tab, targetId = null) => {
    setIsMobileMenuOpen(false)
    onTabChange(tab)
    
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleStyleChange = (newStyle) => {
    setSiteStyle(newStyle)
    setIsMobileMenuOpen(false)
  }

  const isMinimal = siteStyle === 'minimalistic'

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isMinimal 
        ? 'bg-white border-b border-stone-200 shadow-sm text-stone-900' 
        : 'glassmorphism-dark border-b border-premium-gold/20 text-[#FDFBF7]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Standardized Style Switcher Pills (Identical across all modes) */}
        <div className={`flex items-center p-1 rounded-full text-xs font-semibold border ${
          isMinimal ? 'bg-stone-100 border-stone-300' : 'bg-[#12100E] border-[#c5a880]/30 shadow-md'
        }`}>
          <button
            onClick={() => handleStyleChange('minimalistic')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              siteStyle === 'minimalistic' 
                ? 'bg-black text-white font-bold shadow-sm' 
                : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            Minimalizm
          </button>
          
          <button
            onClick={() => handleStyleChange('premium')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              siteStyle === 'premium' 
                ? 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black font-bold shadow-sm' 
                : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            Premium
          </button>

          <button
            onClick={() => handleStyleChange('modern')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
              siteStyle === 'modern' 
                ? 'bg-cyan-400 text-black font-bold shadow-sm' 
                : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            Nowoczesny
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center space-x-8 text-xs font-medium tracking-wider uppercase ${
          isMinimal ? 'font-sans text-stone-700' : 'font-serif text-stone-300'
        }`}>
          <button 
            onClick={() => handleNavClick('home', 'o-nas')} 
            className="hover:text-amber-500 transition-colors duration-200 cursor-pointer"
          >
            O nas
          </button>
          <button 
            onClick={() => handleNavClick('home', 'wspolpraca')} 
            className="hover:text-amber-500 transition-colors duration-200 cursor-pointer"
          >
            Współpraca
          </button>
          <button 
            onClick={() => handleNavClick('showcase')} 
            className={`hover:text-amber-500 transition-colors duration-200 cursor-pointer ${
              currentTab === 'showcase' ? 'font-bold text-amber-500 border-b-2 border-amber-500' : ''
            }`}
          >
            Pokaz Komponentów
          </button>
          <button 
            onClick={() => handleNavClick('home', 'kontakt')} 
            className="hover:text-amber-500 transition-colors duration-200 cursor-pointer"
          >
            Kontakt
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={() => handleNavClick('home', 'kontakt')} 
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              isMinimal 
                ? 'bg-black text-white hover:bg-stone-800' 
                : 'bg-gradient-to-r from-[#dfba73] via-[#c5a880] to-[#9e8259] text-black hover:shadow-[0_0_20px_rgba(197,168,128,0.4)]'
            }`}
          >
            Napisz do nas
          </button>
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 cursor-pointer text-current">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden fixed top-20 inset-x-0 border-b z-40 p-6 flex flex-col space-y-4 shadow-lg ${
              isMinimal ? 'bg-white border-stone-200 text-stone-900' : 'bg-[#0A0908] border-[#c5a880]/20 text-[#FDFBF7]'
            }`}
          >
            <button onClick={() => handleNavClick('home', 'o-nas')} className="py-2 text-left text-base font-medium border-b border-stone-800 bg-transparent cursor-pointer">O nas</button>
            <button onClick={() => handleNavClick('home', 'wspolpraca')} className="py-2 text-left text-base font-medium border-b border-stone-800 bg-transparent cursor-pointer">Współpraca</button>
            <button onClick={() => handleNavClick('showcase')} className="py-2 text-left text-base font-medium border-b border-stone-800 bg-transparent cursor-pointer">Pokaz Komponentów</button>
            <button onClick={() => handleNavClick('home', 'kontakt')} className="py-2 text-left text-base font-medium border-b border-stone-800 bg-transparent cursor-pointer">Kontakt</button>
            
            <div className="pt-2">
              <button 
                onClick={() => handleNavClick('home', 'kontakt')}
                className="w-full text-center py-3 bg-black text-white rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Napisz do nas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
