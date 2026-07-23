import { Mail } from 'lucide-react'

export default function PremiumContact() {
  return (
    <section id="kontakt" className="py-16 md:py-20 bg-premium-beige border-t border-premium-gold/10 font-serif">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 max-w-4xl mx-auto items-stretch">
          
          {/* Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-premium-gold font-serif">
                KONTAKT
              </span>
              <h2 className="text-3xl font-serif font-light mt-2 mb-4 text-premium-charcoal">
                Napisz do nas
              </h2>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-6">
                Skontaktuj się z nami bezpośrednio na podany adres e-mail lub skorzystaj z formularza obok.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-premium-cream/50 border border-premium-gold/10 p-3.5 rounded-xl">
                  <Mail className="w-4 h-4 text-premium-gold" />
                  <div>
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest block font-medium">Adres e-mail</span>
                    <a href="mailto:kontakt@mastalex.pl" className="text-xs font-semibold hover:underline text-stone-900">
                      kontakt@mastalex.pl
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200 text-[10px] font-mono text-stone-400">
              <span>Warszawa / Online</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-premium-cream border border-premium-gold/15 rounded-2xl p-6 shadow-sm">
            <form 
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.target
                const data = {
                  name: form.elements[0].value,
                  email: form.elements[1].value,
                  message: form.elements[2].value
                }
                try {
                  await fetch('https://formsubmit.co/ajax/kontakt@mastalex.pl', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(data)
                  })
                } catch (err) {}
                alert('Wiadomość została wysłana do kontakt@mastalex.pl!')
                form.reset()
              }} 
              className="space-y-3.5 text-left"
            >
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-stone-600 uppercase tracking-wider">Imię i Nazwisko</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jan Kowalski" 
                    className="w-full p-2.5 rounded-xl border text-xs bg-premium-beige border-premium-gold/15 focus:outline-none focus:border-premium-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-stone-600 uppercase tracking-wider">Adres e-mail</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jan@firma.pl" 
                    className="w-full p-2.5 rounded-xl border text-xs bg-premium-beige border-premium-gold/15 focus:outline-none focus:border-premium-gold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-stone-600 uppercase tracking-wider">Treść wiadomości</label>
                <textarea 
                  rows="3" 
                  required
                  placeholder="Opisz krótko swoje wymagania..." 
                  className="w-full p-2.5 rounded-xl border text-xs bg-premium-beige border-premium-gold/15 focus:outline-none focus:border-premium-gold"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 text-xs font-bold tracking-wide transition-colors duration-300 bg-premium-gold text-white hover:bg-premium-charcoal rounded-full font-serif cursor-pointer"
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
