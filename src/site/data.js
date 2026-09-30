// Jedno źródło faktów o firmie. Wolno tu wpisać wyłącznie to, co potwierdził właściciel
// (CONTENT.md, decyzje z 29–30.09.2026). Każda strona, schema i llms.txt czytają stąd.
// Teksty przepisane 30.09.2026 po uwagach właściciela: tylko korzyści klienta, bez powtórzeń.

export const SITE = 'https://mastalex.pl'
export const EMAIL = 'kontakt@mastalex.pl'
// Administrator danych w polityce prywatności (od właściciela, 29.09.2026)
export const ADMIN = { name: 'Kosma Mastalerz', email: 'ten.kosma.mastalerz2@gmail.com' }
export const UPDATED = '2026-09-30'
export const UPDATED_LABEL = 'wrzesień 2026'

export const FOUNDERS = [
  {
    id: 'karol-mastalerz',
    name: 'Karol Mastalerz',
    role: 'Współzałożyciel',
    school: 'Politechnika Warszawska',
    field: 'Matematyka i Analiza Danych',
    linkedin: 'https://www.linkedin.com/in/karolmastalerz',
    facts: [
      'Przyjęty na Politechnikę Warszawską na podstawie tytułu laureata Ogólnopolskiego Konkursu Matematycznego PW (10. miejsce).',
      'Uczestnik Mistrzostw Polski w Algorytmice i Programowaniu.',
    ],
  },
  {
    id: 'aleks-popkowski',
    name: 'Aleks Popkowski',
    role: 'Współzałożyciel',
    school: 'Uniwersytet Warszawski',
    field: 'Informatyka',
    linkedin: 'https://www.linkedin.com/in/aleks-popkowski',
    facts: [
      'Finalista Akademickich Mistrzostw Polski w Programowaniu Zespołowym (AMPPZ 2023).',
      'Półfinalista Olimpiady Informatycznej (31. i 32. edycja) i wyróżniony finalista V edycji STEM PW.',
    ],
  },
]

// Zdanie definicyjne (audyt GEO A1): kto, co, dla kogo, co wyróżnia. Trafia do danych strukturalnych.
export const DEFINITION =
  'Mastalex tworzy i przebudowuje strony internetowe dla firm z całej Polski oraz wykonuje SEO, dzięki któremu strony klientów pojawiają się wyżej w Google i częściej w odpowiedziach czatów AI. Strona wizytówka kosztuje 500 zł. Założycielami są Karol Mastalerz i Aleks Popkowski. Klient najpierw dostaje bezpłatny projekt i przejrzystą wycenę, a za stronę płaci dopiero po akceptacji projektu.'

// Cennik. Wszystkie ceny od właściciela: wizytówka 500 zł (motyw przewodni strony), SEO od 300 zł (29.09.2026),
// strona firmowa do 5 podstron 1500 zł, przebudowa wizytówki 400 zł i strony firmowej 1200 zł (30.09.2026).
// Ceny nie obejmują domeny ani hostingu (dotyczy tylko nowych stron).
export const PRICES = [
  { id: 'wizytowka', name: 'Strona wizytówka', price: 500, text: 'Jedna strona z ofertą, opisem firmy i kontaktem. Dobry start dla małej firmy.', href: '/tworzenie-stron-internetowych#jak-powstaje', link: 'Jak powstaje Twoja strona' },
  { id: 'firmowa', name: 'Strona firmowa', price: 1500, text: 'Do 5 podstron, z osobną podstroną dla każdej usługi. Klient z Google trafia prosto do oferty, której szuka.' },
  { id: 'przebudowa', name: 'Przebudowa strony', price: 400, from: true, text: 'Wizytówka 400 zł, strona firmowa do 5 podstron 1200 zł. Nowy wygląd i aktualna oferta.', href: '/przebudowa-strony-internetowej', link: 'Więcej o przebudowie' },
  { id: 'seo', name: 'Optymalizacja SEO', price: 300, from: true, text: 'Wyżej w Google, więcej odwiedzin i częstsze polecenia w czatach AI.', href: '/optymalizacja-seo', link: 'Więcej o SEO' },
]
// Porównanie z rynkiem: najniższa cena wejścia za wizytówkę w badanych cennikach (badania/wyniki/03, 29.09.2026).
export const MARKET_MIN_WIZYTOWKA = '1500 zł netto'

// short: karta na stronie głównej (problem klienta → rozwiązanie); other: karta „Pozostałe usługi”;
// about: opis usługi w danych strukturalnych i llms.txt; priceFrom: cena „od” na karcie i w danych strukturalnych.
export const SERVICES = [
  {
    id: 'service-websites',
    path: '/tworzenie-stron-internetowych',
    name: 'Tworzenie stron internetowych',
    short: 'Nie masz jeszcze strony albo nie wiesz, od czego zacząć? Zaprojektujemy ją pod Twoją firmę i napiszemy teksty za Ciebie.',
    other: 'Nowa strona zaprojektowana pod Twoją firmę, z tekstami, które napiszemy za Ciebie.',
    about: 'Projektowanie i tworzenie stron internetowych dla firm, z tekstami przygotowanymi dla klienta. Strona wizytówka 500 zł, strona firmowa do 5 podstron 1500 zł. Bezpłatny projekt i przejrzysta wycena w 3 dni, płatność dopiero po akceptacji projektu.',
    serviceType: 'Projektowanie i tworzenie stron internetowych',
    priceFrom: 500,
    tint: 'lav',
  },
  {
    id: 'service-redesign',
    path: '/przebudowa-strony-internetowej',
    name: 'Przebudowa strony internetowej',
    short: 'Strona wygląda na starą, a oferta jest nieaktualna? Odświeżymy ją według najnowszych standardów, żeby Twoja firma dogoniła i wyprzedziła konkurencję.',
    other: 'Nowy wygląd, aktualna oferta i strona na miarę dzisiejszych standardów. Taniej niż nowa strona.',
    about: 'Przebudowa i odświeżenie strony internetowej: nowy wygląd, aktualna oferta i dostosowanie do najnowszych standardów. Przebudowa wizytówki 400 zł, strony firmowej do 5 podstron 1200 zł, zawsze taniej niż nowa strona tej samej wielkości. Bezpłatny projekt nowej wersji.',
    serviceType: 'Przebudowa i odświeżenie strony internetowej',
    priceFrom: 400,
    tint: 'mint',
  },
  {
    id: 'service-seo',
    path: '/optymalizacja-seo',
    name: 'Optymalizacja SEO',
    short: 'Klienci nie znajdują Cię w Google? Wykonujemy SEO i wdrażamy poprawki na Twojej stronie, także jeśli zrobiła ją inna firma.',
    other: 'Wyżej w Google, więcej odwiedzin i częstsze polecenia w czatach AI.',
    about: 'Wykonujemy SEO i wdrażamy poprawki na stronie klienta, żeby była wyżej w Google, miała więcej odwiedzin i częściej pojawiała się w odpowiedziach czatów AI. Od 300 zł, także dla stron wykonanych przez inne firmy.',
    serviceType: 'Optymalizacja SEO strony internetowej',
    priceFrom: 300,
    tint: 'sky',
  },
]

// Kroki współpracy na stronie głównej. Podstrony mają własne, inaczej opisane kroki (pages/Pages.jsx).
export const STEPS = [
  {
    n: 1,
    title: 'Opowiedz nam o firmie',
    text: 'Wypełniasz krótki formularz: czym zajmuje się firma i czego potrzebujesz. Im więcej szczegółów podasz, tym lepiej projekt trafi w Twoje potrzeby.',
  },
  {
    n: 2,
    title: 'Bezpłatny projekt i wycena',
    text: 'W 3 dni dostajesz projekt strony i przejrzystą wycenę. Jeśli strona wymaga więcej pracy, od razu podamy termin i powód.',
  },
  {
    n: 3,
    title: 'Dopracowanie projektu pod Twoją firmę',
    text: 'Mówisz, co zmienić, a my poprawiamy projekt, aż będzie taki, jak chcesz. Płacisz dopiero po akceptacji.',
  },
  {
    n: 4,
    title: 'Uruchomienie',
    text: 'Strona startuje pod Twoim adresem. Strona i wszystkie dostępy do niej należą do Ciebie.',
  },
]

// Trasy: tytuł ≤60 znaków, opis ≤160, H1 zgodny z mapą fraz (badania 04).
export const ROUTES = {
  '/': {
    title: 'Strony internetowe dla firm od 500 zł | Mastalex',
    description:
      'Strona internetowa dla firmy od 500 zł, przebudowa strony i SEO. Bezpłatny projekt i przejrzysta wycena w 3 dni, a płacisz dopiero po akceptacji.',
    crumb: 'Strona główna',
  },
  '/tworzenie-stron-internetowych': {
    title: 'Tworzenie stron internetowych dla Twojej firmy | Mastalex',
    description:
      'Strona internetowa dla Twojej firmy od 500 zł, z tekstami, które napiszemy za Ciebie. Bezpłatny projekt w 3 dni, a płacisz dopiero po akceptacji.',
    crumb: 'Tworzenie stron internetowych',
    service: 'service-websites',
  },
  '/przebudowa-strony-internetowej': {
    title: 'Przebudowa i odświeżenie strony internetowej | Mastalex',
    description:
      'Odśwież wygląd, zaktualizuj ofertę i dogoń konkurencję. Przebudowa strony od 400 zł, taniej niż nowa. Projekt nowej wersji dostajesz za darmo w 3 dni.',
    crumb: 'Przebudowa strony internetowej',
    service: 'service-redesign',
  },
  '/optymalizacja-seo': {
    title: 'Optymalizacja SEO strony internetowej dla firm | Mastalex',
    description:
      'Wykonujemy SEO i wdrażamy poprawki na Twojej stronie od 300 zł: wyżej w Google, więcej odwiedzin i polecenia w czatach AI. Także dla stron innych firm.',
    crumb: 'Optymalizacja SEO',
    service: 'service-seo',
  },
  '/cennik-stron-internetowych': {
    title: 'Ile kosztuje strona internetowa? Od 500 zł | Mastalex',
    description:
      'Strona wizytówka 500 zł, strona firmowa do 5 podstron 1500 zł, przebudowa od 400 zł, SEO od 300 zł. Projekt dostajesz za darmo, płacisz po akceptacji.',
    crumb: 'Cennik stron internetowych',
    service: 'service-websites',
  },
  '/o-nas': {
    title: 'O nas — Karol Mastalerz i Aleks Popkowski | Mastalex',
    description:
      'Założycielami Mastalex są Karol Mastalerz i Aleks Popkowski. Poznaj ludzi, którzy odpowiadają za Twoją stronę, i zobacz, jak pracujemy.',
    crumb: 'O nas',
    type: 'AboutPage',
  },
  '/kontakt': {
    title: 'Kontakt — bezpłatny projekt i wycena strony | Mastalex',
    description:
      'Opisz firmę w kilku zdaniach. W 3 dni dostaniesz bezpłatny projekt strony i przejrzystą wycenę. Pytasz o SEO? Podaj adres swojej strony.',
    crumb: 'Kontakt',
    type: 'ContactPage',
  },
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności | Mastalex',
    description:
      'Dowiedz się, jakie dane zbieramy przez formularz kontaktowy i e-mail, po co je wykorzystujemy, jak długo je przechowujemy i jakie prawa Ci przysługują.',
    crumb: 'Polityka prywatności',
  },
}

export const NOT_FOUND = {
  title: 'Nie znaleziono strony | Mastalex',
  description: 'Ta strona nie istnieje. Przejdź do strony głównej Mastalex albo do usług.',
}

export const NAV = [
  { href: '/tworzenie-stron-internetowych', label: 'Tworzenie stron' },
  { href: '/przebudowa-strony-internetowej', label: 'Przebudowa' },
  { href: '/optymalizacja-seo', label: 'Optymalizacja SEO' },
  { href: '/cennik-stron-internetowych', label: 'Cennik' },
  { href: '/o-nas', label: 'O nas' },
]
