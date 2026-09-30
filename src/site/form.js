// Wysyłka formularza kontaktowego (FormSubmit, AJAX). Bez Reacta, żeby publiczna strona nie ładowała
// całej biblioteki dla jednego formularza. Sukces pokazujemy tylko po potwierdzeniu z serwera
// (audyt: dawniej błąd wysyłki kończył się komunikatem „wysłano”); przy błędzie treść zostaje w polach.
const EMAIL = 'kontakt@mastalex.pl'
const MSG = {
  ok: '<span class="text-mint-ink">Dziękujemy, wiadomość dotarła. Odpiszemy na podany adres e-mail.</span>',
  error: `<span class="text-peach-ink">Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na <a class="underline" href="mailto:${EMAIL}">${EMAIL}</a>.</span>`,
}

async function onSubmit(e) {
  const form = e.target
  if (!(form instanceof HTMLFormElement) || !form.matches('form[data-contact]')) return
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))
  if (data._honey) return
  const button = form.querySelector('button[type="submit"]')
  const status = form.querySelector('[role="status"]')
  const label = button.textContent
  button.disabled = true
  button.textContent = 'Wysyłanie…'
  status.innerHTML = ''
  let ok = false
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _subject: 'Nowe zapytanie ze strony mastalex.pl' }),
    })
    const json = await res.json().catch(() => ({}))
    ok = res.ok && String(json.success) === 'true'
  } catch {
    ok = false
  }
  if (ok) form.reset()
  status.innerHTML = ok ? MSG.ok : MSG.error
  button.disabled = false
  button.textContent = label
}

export function enhanceForms() {
  document.addEventListener('submit', onSubmit)
}
