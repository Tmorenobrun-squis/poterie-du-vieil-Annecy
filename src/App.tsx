import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { BackToTop } from './components/ui/BackToTop'
import { SmoothScrollProvider, scrollToTop } from './components/ui/SmoothScrollProvider'
import AccueilPage from './pages/Accueil'
import BoutiquePage from './pages/Boutique'
import UniversPage from './pages/Univers'
import CreateursPage from './pages/Createurs'
import GaleriePage from './pages/Galerie'
import ContactPage from './pages/Contact'
import CommanderPage from './pages/Commander'
import MentionsLegalesPage from './pages/MentionsLegales'
import ConfidentialitePage from './pages/Confidentialite'
import StudioPage from './pages/Studio'

function AnimatedRoutes() {
  const location = useLocation()

  if (location.pathname.startsWith('/studio')) {
    return <Routes><Route path="/studio/*" element={<StudioPage />} /></Routes>
  }

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/boutique" element={<BoutiquePage />} />
        <Route path="/univers" element={<UniversPage />} />
        <Route path="/createurs" element={<CreateursPage />} />
        <Route path="/galerie" element={<GaleriePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commander" element={<CommanderPage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/confidentialite" element={<ConfidentialitePage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-sable focus:rounded-lg focus:font-mulish focus:text-sm"
      >
        Passer au contenu principal
      </a>

      {/* Fixed elements MUST stay outside SmoothScrollProvider.
          CSS transforms break position:fixed containment on children. */}
      <Header />
      <BackToTop />

      <SmoothScrollProvider>
        <main id="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
