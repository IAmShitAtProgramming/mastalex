// <head> każdej podstrony + graf JSON-LD (audyt schema SCH-01..04, badania 01 sekcja E).
// Do danych strukturalnych trafiają wyłącznie fakty z data.js: bez ocen i FAQPage; ceny „od” tylko te widoczne na stronie.
import { AUTORZY, DEFINITION, EMAIL, FOUNDERS, NOT_FOUND, ROUTES, SERVICES, SITE, trail } from './data.js'

const ORG = `${SITE}/#organization`
const WEBSITE = `${SITE}/#website`
const url = (path) => (path === '/' ? `${SITE}/` : `${SITE}${path}`)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG,
    name: 'Mastalex',
    alternateName: 'Mastalex — strony internetowe',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: `${SITE}/logo.png`, width: 512, height: 512, caption: 'Mastalex' },
    image: { '@id': `${SITE}/#logo` },
    email: EMAIL,
    description: DEFINITION,
    areaServed: { '@type': 'Country', name: 'Polska' },
    knowsLanguage: 'pl',
    founder: FOUNDERS.map((p) => ({ '@id': `${SITE}/o-nas#${p.id}` })),
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: EMAIL, availableLanguage: 'pl', areaServed: 'PL' },
    makesOffer: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': `${SITE}/#${s.id}` } })),
  }
}

function people() {
  return FOUNDERS.map((p) => ({
    '@type': 'Person',
    '@id': `${SITE}/o-nas#${p.id}`,
    name: p.name,
    jobTitle: 'Współzałożyciel',
    worksFor: { '@id': ORG },
    alumniOf: { '@type': 'CollegeOrUniversity', name: p.school },
    knowsAbout: ['tworzenie stron internetowych', 'SEO', p.field],
    sameAs: [p.linkedin],
    url: `${SITE}/o-nas#${p.id}`,
  }))
}

function services() {
  return SERVICES.map((s) => ({
    '@type': 'Service',
    '@id': `${SITE}/#${s.id}`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.about,
    url: url(s.path),
    provider: { '@id': ORG },
    offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: s.priceFrom, priceCurrency: 'PLN' } },
    areaServed: { '@type': 'Country', name: 'Polska' },
    availableLanguage: 'pl',
  }))
}

export function graph(path) {
  const r = ROUTES[path]
  const nodes = [
    organization(),
    { '@type': 'WebSite', '@id': WEBSITE, url: `${SITE}/`, name: 'Mastalex', inLanguage: 'pl-PL', publisher: { '@id': ORG } },
    {
      '@type': r.type || 'WebPage',
      '@id': `${url(path)}#webpage`,
      url: url(path),
      name: r.title,
      description: r.description,
      inLanguage: 'pl-PL',
      isPartOf: { '@id': WEBSITE },
      about: { '@id': r.service ? `${SITE}/#${r.service}` : ORG },
      ...(path === '/' ? { mainEntity: { '@id': ORG } } : {}),
      ...(path !== '/' ? { breadcrumb: { '@id': `${url(path)}#breadcrumb` } } : {}),
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/og.png` },
    },
  ]
  if (path !== '/') {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url(path)}#breadcrumb`,
      itemListElement: trail(path).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: url(c.path) })),
    })
  }
  // Wpis w Poradnikach: autor i daty takie same jak widoczne pod tytułem.
  if (r.article) {
    const author = AUTORZY.find((p) => p.id === r.article.author)
    nodes.push({
      '@type': 'Article',
      '@id': `${url(path)}#article`,
      headline: r.h1 ? r.h1.join(' ') : r.title,
      description: r.description,
      datePublished: r.article.published,
      dateModified: r.article.modified,
      author: { '@type': 'Person', '@id': `${SITE}/poradniki/#${author.id}`, name: author.name, description: author.bio, url: `${url(path)}#autor` },
      publisher: { '@id': ORG },
      mainEntityOfPage: { '@id': `${url(path)}#webpage` },
      isPartOf: { '@id': `${url(r.parent)}#webpage` },
      image: `${SITE}/og.png`,
      inLanguage: 'pl-PL',
    })
  }
  // Pełne opisy usług i osób tam, gdzie są na stronie widoczne; na innych podstronach tylko odwołania @id.
  if (path === '/' || r.service) nodes.push(...services().filter((s) => path === '/' || s['@id'].endsWith(r.service)))
  if (path === '/' || path === '/o-nas') nodes.push(...people())
  return { '@context': 'https://schema.org', '@graph': nodes }
}

export function head(path) {
  const r = ROUTES[path]
  const title = r ? r.title : NOT_FOUND.title
  const description = r ? r.description : NOT_FOUND.description
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
  ]
  if (!r) {
    lines.push('<meta name="robots" content="noindex" />')
    return lines.join('\n    ')
  }
  lines.push(
    `<link rel="canonical" href="${url(path)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    `<meta property="og:type" content="${r.article ? 'article' : 'website'}" />`,
    ...(r.article ? [`<meta property="article:published_time" content="${r.article.published}" />`, `<meta property="article:modified_time" content="${r.article.modified}" />`] : []),
    '<meta property="og:locale" content="pl_PL" />',
    '<meta property="og:site_name" content="Mastalex" />',
    `<meta property="og:url" content="${url(path)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${SITE}/og.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Mastalex — tworzymy strony internetowe dla firm. Najpierw bezpłatny projekt." />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.png" />`,
    '<meta name="twitter:image:alt" content="Mastalex — tworzymy strony internetowe dla firm. Najpierw bezpłatny projekt." />',
    `<script type="application/ld+json">${JSON.stringify(graph(path)).replace(/</g, '\\u003c')}</script>`,
  )
  return lines.join('\n    ')
}
