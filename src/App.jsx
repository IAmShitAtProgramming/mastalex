import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import PremiumPage from './variants/premium/PremiumPage'
import MinimalisticPage from './variants/minimalistic/MinimalisticPage'
import ModernPage from './variants/modern/ModernPage'
import MinimalisticShowcase from './variants/minimalistic/MinimalisticShowcase'
import PremiumShowcase from './variants/premium/PremiumShowcase'
import ModernShowcase from './variants/modern/ModernShowcase'
import ShowcaseView from './components/Showcase/ShowcaseView'

// Helper to extract style variant from URL hash or pathname
function parseRoute() {
  const hash = window.location.hash.toLowerCase()
  const path = window.location.pathname.toLowerCase()
  const full = hash + path

  let style = 'premium'
  if (full.includes('minimalistic')) style = 'minimalistic'
  else if (full.includes('modern')) style = 'modern'
  else if (full.includes('premium')) style = 'premium'

  const isShowcase = full.includes('showcase')
  return { style, tab: isShowcase ? 'showcase' : 'home' }
}

function App() {
  const [routeState, setRouteState] = useState(parseRoute)

  const siteStyle = routeState.style
  const currentTab = routeState.tab

  const navigateTo = (newStyle, newTab) => {
    const isShowcase = newTab === 'showcase'
    const targetRoute = isShowcase ? `${newStyle}/showcase` : newStyle
    window.location.hash = `/${targetRoute}`
    setRouteState({ style: newStyle, tab: newTab })
  }

  // Listen to hash & popstate changes for bulletproof reloads & navigation
  useEffect(() => {
    const handleRoute = () => {
      setRouteState(parseRoute())
    }
    window.addEventListener('hashchange', handleRoute)
    window.addEventListener('popstate', handleRoute)
    return () => {
      window.removeEventListener('hashchange', handleRoute)
      window.removeEventListener('popstate', handleRoute)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Global Navbar with Route/Variant Switcher (Hidden in full-screen Modern PS3 XMB mode) */}
      {siteStyle !== 'modern' && (
        <Navbar
          siteStyle={siteStyle}
          setSiteStyle={(style) => navigateTo(style, currentTab)}
          currentTab={currentTab}
          onTabChange={(tab) => navigateTo(siteStyle, tab)}
        />
      )}

      {/* Render route variant from separate folders */}
      {currentTab === 'showcase' ? (
        <main>
          {siteStyle === 'minimalistic' ? (
            <MinimalisticShowcase 
              onBackToHome={() => navigateTo('minimalistic', 'home')} 
              onStyleChange={(style) => navigateTo(style, 'showcase')}
            />
          ) : siteStyle === 'premium' ? (
            <PremiumShowcase 
              onBackToHome={() => navigateTo('premium', 'home')} 
              onStyleChange={(style) => navigateTo(style, 'showcase')}
            />
          ) : (
            <ModernShowcase 
              onBackToHome={() => navigateTo('modern', 'home')} 
              onStyleChange={(style) => navigateTo(style, 'showcase')}
            />
          )}
        </main>
      ) : siteStyle === 'minimalistic' ? (
        <MinimalisticPage onNavigate={(tab) => navigateTo(siteStyle, tab)} />
      ) : siteStyle === 'modern' ? (
        <ModernPage 
          onNavigate={(tab) => navigateTo(siteStyle, tab)} 
          onStyleChange={(style) => navigateTo(style, 'home')}
        />
      ) : (
        <PremiumPage onNavigate={(tab) => navigateTo(siteStyle, tab)} />
      )}
    </div>
  )
}

export default App
