export default function MinimalisticFooter({ onNavigate }) {
  const handleNavClick = (tab, targetId = null) => {
    onNavigate(tab)
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <footer className="py-10 text-xs transition-colors duration-300 border-t bg-white border-stone-200 text-stone-600 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 text-xl tracking-widest font-bold bg-transparent border-transparent cursor-pointer font-sans text-stone-900"
        >
          <span>MASTALEX</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
        </button>
        
        <div className="flex space-x-6 text-[11px] font-medium tracking-wider uppercase">
          <button onClick={() => handleNavClick('home', 'o-nas')} className="hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-transparent">O nas</button>
          <button onClick={() => handleNavClick('home', 'wspolpraca')} className="hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-transparent">Współpraca</button>
          <button onClick={() => handleNavClick('showcase')} className="hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-transparent">Showcase</button>
          <button onClick={() => handleNavClick('home', 'kontakt')} className="hover:text-stone-900 transition-colors cursor-pointer bg-transparent border-transparent">Kontakt</button>
        </div>

        <div className="text-[11px] font-mono opacity-60">
          © {new Date().getFullYear()} Mastalex. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  )
}
