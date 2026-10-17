// Jedno źródło faktów o firmie. Wolno tu wpisać wyłącznie to, co potwierdził właściciel
// (CONTENT.md, decyzje z 29–30.09.2026). Każda strona, schema i llms.txt czytają stąd.
// Teksty przepisane 30.09.2026 po uwagach właściciela: tylko korzyści klienta, bez powtórzeń.

export const SITE = 'https://mastalex.pl'
export const EMAIL = 'kontakt@mastalex.pl'
// Administrator danych w polityce prywatności (od właściciela, 29.09.2026)
export const ADMIN = { name: 'Kosma Mastalerz', email: 'ten.kosma.mastalerz2@gmail.com' }
// Aplikacja audytu SEO (osobna usługa w Google Cloud, decyzja właściciela 17.10.2026). Po podpięciu subdomeny zmień tylko ten adres.
// true pokazuje sekcję na /optymalizacja-seo i link w stopce. Włącz dopiero, gdy aplikacja przyjmuje prawdziwe płatności
// (Stripe live, SITE_MODE=live): w trybie testowym prawdziwa karta nie przejdzie, a karta testowa dałaby audyt za darmo.
export const AUDYT_ON = false
export const AUDYT_URL = 'https://audyt-api-475079953024.europe-central2.run.app/'
export const AUDYT_PRICE = 299
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

// Autorzy poradników. Opis od właściciela (30.09.2026): bloger i specjalista od tworzenia i pozycjonowania stron.
export const AUTORZY = [
  {
    id: 'kosma-mastalerz',
    name: 'Kosma Mastalerz',
    rola: 'bloger i specjalista od tworzenia i pozycjonowania stron',
    bio: 'Bloger i specjalista od tworzenia i pozycjonowania stron internetowych. W poradnikach Mastalex zbiera dane z cenników i pokazuje, z czego wynika cena strony.',
  },
]

// Sklepy wstrzymane 30.09.2026 do czasu współpracy z prawnikiem (decyzja właściciela).
// true przywraca wszystko naraz: podstronę, menu, kartę usługi, ceny w cenniku i wzmianki w tekstach.
// Przy przywróceniu wróć też opis sklepów do public/llms.txt (tekst w opieka/sklepy-na-pozniej.md).
export const SHOP_ON = false

// Zdanie definicyjne (audyt GEO A1): kto, co, dla kogo, co wyróżnia. Trafia do danych strukturalnych.
// Wygląd od zera, bez gotowych szablonów: potwierdził właściciel 30.09.2026 (Gemini zgadywał „szablon”).
export const DEFINITION =
  (SHOP_ON ? 'Mastalex tworzy strony i sklepy internetowe, przebudowuje strony dla firm' : 'Mastalex tworzy i przebudowuje strony internetowe dla firm') + ' z całej Polski oraz wykonuje SEO, dzięki któremu strony klientów pojawiają się wyżej w Google i częściej w odpowiedziach czatów AI. Wygląd każdej strony projektuje od zera, bez gotowych szablonów. Strona wizytówka kosztuje 500 zł. Założycielami są Karol Mastalerz i Aleks Popkowski. Klient najpierw dostaje bezpłatny projekt i przejrzystą wycenę, a za stronę płaci dopiero po akceptacji projektu.'

// Cennik. Wszystkie ceny od właściciela: wizytówka 500 zł (motyw przewodni strony), SEO od 300 zł (29.09.2026),
// strona firmowa do 5 podstron 1500 zł, przebudowa wizytówki 400 zł i strony firmowej 1200 zł (30.09.2026).
// Ceny nie obejmują domeny ani hostingu (dotyczy tylko nowych stron).
export const PRICES = [
  { id: 'wizytowka', name: 'Strona wizytówka', price: 500, text: 'Jedna strona z ofertą, opisem firmy i kontaktem. Dobry start dla małej firmy.', href: '/strony-internetowe-od-500-zl#jak-powstaje', link: 'Jak powstaje Twoja strona' },
  { id: 'firmowa', name: 'Strona firmowa', price: 1500, text: 'Do 5 podstron, z osobną podstroną dla każdej usługi. Klient z Google trafia prosto do oferty, której szuka.' },
  { id: 'przebudowa', name: 'Przebudowa strony', price: 400, from: true, text: 'Wizytówka 400 zł, strona firmowa do 5 podstron 1200 zł. Nowy wygląd i aktualna oferta.', href: '/przebudowa-strony-internetowej', link: 'Więcej o przebudowie' },
  { id: 'seo', name: 'Optymalizacja SEO', price: 300, from: true, text: 'Wyżej w Google, więcej odwiedzin i częstsze polecenia w czatach AI.', href: '/optymalizacja-seo', link: 'Więcej o SEO' },
]
// Sklepy internetowe: w ofercie od 30.09.2026 (właściciel: „pełen zestaw”, ceny niższe od rynku w tej samej proporcji
// co strony). Ceny i koszty utrzymania: opieka/raporty/2026-09-30/codex-sklepy-i-wsparcie.md.
// Karty cen sklepu (plans): na podstronie sklepu i osobnym rzędem w cenniku.
// Ceny = mediana rynku × ok. 0,42 (średnia naszych proporcji: wizytówka 0,33, firmowa 0,50), zaokrąglone:
// sklep 4700 → 2000, większy sklep 6990 → 3000, podstrona 297 → 150, zmiana 150 zł/h → 50 zł.
// Wsparcie 12 mies. = najdłuższy okres w próbie (3 z 11 ofert; najczęściej 30 dni).
export const AFTER = {
  podstrona: 150,
  wsparcie: 12,
  zmiana: 50,
}
export const SHOP = {
  from: 2000,
  plans: [
    { id: 'sklep', name: 'Sklep internetowy', price: 2000, text: 'Do 100 produktów. Sprawdzi się, gdy zaczynasz sprzedawać online.' },
    { id: 'sklep-wiekszy', name: 'Większy sklep', price: 3000, from: true, text: 'Ponad 100 produktów, wybór rozmiaru lub koloru i kody rabatowe.' },
  ],
  included: [
    'Bezpłatny projekt i przejrzysta wycena w 3 dni',
    'Wygląd zaprojektowany od zera, bez gotowych szablonów',
    'Płatności online: BLIK, przelew i karta',
    'Wysyłka kurierem, do paczkomatu i odbiór osobisty',
    'Dodanie Twoich pierwszych produktów',
    'Pokazujemy, jak dodawać produkty i obsługiwać zamówienia',
    'Sklep i wszystkie dostępy należą do Ciebie',
  ],
  // Stawki prowizji i hostingu sklepu: luka w raporcie, dlatego bez kwot.
  upkeep: 'Za oprogramowanie sklepu nie płacisz. Co roku opłacasz domenę i hosting, a od każdej płatności online operator płatności pobiera prowizję. Wszystkie te kwoty znajdziesz w bezpłatnej wycenie.',
  faq: [
    { q: 'Czy sklep można później rozbudować?', a: 'Tak. Kody rabatowe, nowe metody dostawy czy kolejne kategorie dodamy, kiedy będą Ci potrzebne. Cenę każdej zmiany poznasz, zanim ją zlecisz.' },
    { q: 'Co, jeśli w sklepie coś przestanie działać?', a: `Przez ${AFTER.wsparcie} miesięcy od uruchomienia bezpłatnie naprawiamy każdy błąd sklepu.` },
  ],
}

// Po uruchomieniu: odpowiedzi na wątpliwości Gemini (rozbudowa, wsparcie techniczne, ukryte koszty), 30.09.2026.
// Kwoty według badania (plik jak wyżej), zobowiązania czekają na akceptację właściciela.

// Porównanie z rynkiem: opieka/raporty/2026-09-30/weryfikacja-cen-wizytowek.md (każda cena sprawdzona u źródła 30.09.2026).
// 24 cenniki wizytówek, w 14 cena wejścia wynosi co najmniej 1500 zł.
export const MARKET_WIZYTOWKA = { cenniki: 24, prog: '1500 zł' }

// short: karta na stronie głównej (problem klienta → rozwiązanie); other: karta „Pozostałe usługi”;
// about: opis usługi w danych strukturalnych i llms.txt; priceFrom: cena „od” na karcie i w danych strukturalnych.
export const SERVICES = [
  {
    id: 'service-websites',
    path: '/strony-internetowe-od-500-zl',
    name: 'Tworzenie stron internetowych',
    short: 'Nie masz jeszcze strony albo nie wiesz, od czego zacząć? Zaprojektujemy ją pod Twoją firmę i napiszemy teksty za Ciebie.',
    other: 'Nowa strona zaprojektowana pod Twoją firmę, z tekstami, które napiszemy za Ciebie.',
    about: 'Projektowanie i tworzenie stron internetowych dla firm, z wyglądem zaprojektowanym od zera, bez gotowych szablonów, i z tekstami przygotowanymi dla klienta. Strona wizytówka 500 zł, strona firmowa do 5 podstron 1500 zł. Bezpłatny projekt i przejrzysta wycena w 3 dni, płatność dopiero po akceptacji projektu.',
    serviceType: 'Projektowanie i tworzenie stron internetowych',
    priceFrom: 500,
    tint: 'lav',
  },
  ...(SHOP_ON ? [{
    id: 'service-shop',
    path: '/tworzenie-sklepow-internetowych',
    name: 'Tworzenie sklepów internetowych',
    short: 'Chcesz sprzedawać online? Zaprojektujemy sklep, w którym klient szybko znajduje produkt, płaci BLIKIEM, przelewem albo kartą i czeka na przesyłkę.',
    other: 'Sklep z płatnościami online i wysyłką, w którym produkty dodajesz samodzielnie.',
    about: `Projektowanie i tworzenie sklepów internetowych dla firm: wygląd zaprojektowany od zera, bez gotowych szablonów, płatności online (BLIK, przelew, karta), wysyłka i dodanie pierwszych produktów. Sklep od ${SHOP.from} zł. Sklep i wszystkie dostępy należą do klienta. Bezpłatny projekt i przejrzysta wycena, płatność dopiero po akceptacji projektu.`,
    serviceType: 'Projektowanie i tworzenie sklepów internetowych',
    priceFrom: SHOP.from,
    tint: 'peach',
  }] : []),
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
    about: 'Wykonujemy SEO i wdrażamy poprawki na stronie klienta: audyt całej strony, dobór haseł i dopasowanie tekstów, tytuły i opisy w wynikach Google, szybkość i działanie na telefonie, opis firmy dla czatów AI oraz zgłoszenie zmian do Google. Efekt: strona wyżej w Google, więcej odwiedzin i częstsze polecenia w odpowiedziach czatów AI. Od 300 zł, także dla stron wykonanych przez inne firmy.',
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
    text: 'Strona startuje pod Twoim adresem. Strona i wszystkie dostępy do niej należą do Ciebie, więc to Ty decydujesz, kto się nią zajmuje.',
  },
]

// Trasy: tytuł ≤60 znaków, opis ≤160, H1 zgodny z mapą fraz (badania 04).
export const ROUTES = {
  '/': {
    title: 'Strony internetowe od 500 zł dla firm | Mastalex',
    description:
      'Strony internetowe od 500 zł dla firm z całej Polski. Indywidualny projekt i teksty w cenie. Bezpłatny projekt, płatność po akceptacji.',
    crumb: 'Strona główna',
  },
  '/strony-internetowe-od-500-zl': {
    title: 'Strony internetowe od 500 zł — tworzenie stron | Mastalex',
    description:
      'Tworzenie stron internetowych: wizytówka 500 zł, strona firmowa do 5 podstron 1500 zł. Projekt i wycena bezpłatnie. Współpraca online w całej Polsce.',
    crumb: 'Tworzenie stron internetowych',
    service: 'service-websites',
  },
  ...(SHOP_ON && { '/tworzenie-sklepow-internetowych': {
    title: `Sklep internetowy dla Twojej firmy od ${SHOP.from} zł | Mastalex`,
    description:
      `Sklep internetowy od ${SHOP.from} zł z płatnościami BLIK, przelewem i kartą oraz wysyłką. Bezpłatny projekt w 3 dni, a płacisz dopiero po akceptacji.`,
    crumb: 'Tworzenie sklepów internetowych',
    service: 'service-shop',
  } }),
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
  '/cennik-tworzenia-stron-internetowych-2026': {
    title: 'Cennik tworzenia stron internetowych 2026 | Mastalex',
    description:
      'Cennik tworzenia stron internetowych 2026: wizytówka 500 zł, strona firmowa do 5 podstron 1500 zł. Zakres wykonania i koszty domeny oraz hostingu.',
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
  // Poradniki (blog). Adres działu kończy się ukośnikiem, bo GitHub Pages serwuje go z poradniki/index.html.
  // Wpis: parent daje trzeci poziom okruszków, article daje daty i autora (widoczne na stronie i w danych strukturalnych).
  '/poradniki/': {
    title: 'Poradniki o stronach internetowych dla firm | Mastalex',
    description:
      'Poradniki dla właścicieli firm: jak być wyżej w Google, ile kosztuje strona internetowa i na co patrzeć w cenniku. Każda liczba ma źródło i datę sprawdzenia.',
    crumb: 'Poradniki',
    type: 'CollectionPage',
  },
  '/poradniki/jak-byc-wyzej-w-google': {
    title: 'Jak być wyżej w Google? 8 kroków dla firmy z okolicy',
    h1: ['Jak być wyżej w Google?', '8 kroków dla firmy z okolicy'],
    description:
      'Jak być wyżej w Google? 8 kroków dla lokalnej firmy: Profil Firmy, opinie, szybkość i indeksowanie strony. Poradnik oparty na oficjalnych źródłach Google.',
    crumb: 'Twoja firma wyżej w Google',
    parent: '/poradniki/',
    article: { published: '2026-10-01', modified: '2026-10-11', author: 'kosma-mastalerz' },
  },
  '/poradniki/ile-kosztuje-strona-internetowa-2026': {
    // title: krótki, do wyników Google (do 60 znaków); h1: nagłówek na stronie i w danych wpisu.
    title: 'Ile kosztuje strona internetowa w 2026? Ceny ponad 50 firm',
    h1: ['Ile kosztuje strona internetowa w 2026 roku?', 'Ceny z cenników 52 polskich firm'],
    description:
      'Ile kosztuje strona internetowa w 2026? Porównanie 52 cenników polskich firm: wizytówka, strona firmowa, zakres wykonania i koszty utrzymania.',
    crumb: 'Ile kosztuje strona internetowa',
    parent: '/poradniki/',
    article: { published: '2026-09-30', modified: '2026-09-30', author: 'kosma-mastalerz' },
  },
  '/poradniki/strona-internetowa-od-500-zl': {
    title: 'Strona internetowa od 500 zł — zakres i koszty | Mastalex',
    h1: ['Strona internetowa od 500 zł', 'Co obejmuje wizytówka i za co płacisz osobno?'],
    description:
      'Strona internetowa od 500 zł: zakres wizytówki, projekt, teksty, domena i hosting. Sprawdź ofertę Mastalex oraz pytania do wykonawcy przed zamówieniem.',
    crumb: 'Strona internetowa od 500 zł',
    parent: '/poradniki/',
    article: { published: '2026-10-11', modified: '2026-10-11', author: 'kosma-mastalerz' },
  },
  '/poradniki/najlepsze-firmy-tworzace-strony-internetowe-polska': {
    title: 'Jak wybrać firmę tworzącą strony internetowe? Kryteria i pytania',
    h1: ['Jak wybrać firmę tworzącą strony internetowe?', 'Kryteria i pytania do wykonawcy'],
    description:
      'Jak wybrać firmę tworzącą strony internetowe? Sprawdź realizacje, opinie, zakres prac, ceny i pytania do wyceny. Poradnik dla firm z całej Polski.',
    crumb: 'Jak wybrać firmę tworzącą strony',
    parent: '/poradniki/',
    article: { published: '2026-10-11', modified: '2026-10-11', author: 'kosma-mastalerz' },
  },
}

// Dawne adresy zachowują przejście do nowych stron; sitemap i linki używają tylko nowych adresów.
export const REDIRECTS = {
  '/tworzenie-stron-internetowych': '/strony-internetowe-od-500-zl',
  '/cennik-stron-internetowych': '/cennik-tworzenia-stron-internetowych-2026',
  '/poradniki/ile-kosztuje-strona-internetowa': '/poradniki/ile-kosztuje-strona-internetowa-2026',
}

// Ścieżka okruszków: strona główna, dział (jeśli jest) i bieżąca podstrona. Te same poziomy trafiają do danych strukturalnych.
export function trail(path) {
  const parent = ROUTES[path].parent
  return [{ path: '/', name: 'Strona główna' }, ...(parent ? [{ path: parent, name: ROUTES[parent].crumb }] : []), { path, name: ROUTES[path].crumb }]
}

export const NOT_FOUND = {
  title: 'Nie znaleziono strony | Mastalex',
  description: 'Ta strona nie istnieje. Przejdź do strony głównej Mastalex albo do usług.',
}

export const NAV = [
  { href: '/strony-internetowe-od-500-zl', label: 'Tworzenie stron' },
  ...(SHOP_ON ? [{ href: '/tworzenie-sklepow-internetowych', label: 'Sklepy' }] : []),
  { href: '/przebudowa-strony-internetowej', label: 'Przebudowa' },
  { href: '/optymalizacja-seo', label: 'Optymalizacja SEO' },
  { href: '/cennik-tworzenia-stron-internetowych-2026', label: 'Cennik' },
  { href: '/poradniki/', label: 'Poradniki' },
  { href: '/o-nas', label: 'O nas' },
]
