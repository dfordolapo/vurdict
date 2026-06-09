import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import { AnalysisProvider } from './context/AnalysisContext'
import PWAInstallPrompt from './components/PWAInstallPrompt.jsx'

const AnalyzePage = lazy(() => import('./pages/AnalyzePage.jsx'))
const AnalyzingPage = lazy(() => import('./pages/AnalyzingPage.jsx'))
const ResultsPage = lazy(() => import('./pages/ResultsPage.jsx'))
const DimensionDetailsPage = lazy(() => import('./pages/DimensionDetailsPage.jsx'))
const OfflinePage = lazy(() => import('./pages/OfflinePage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const SupportPage = lazy(() => import('./pages/SupportPage.jsx'))

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    // Visit count tracking for smart PWA prompt
    const currentCount = parseInt(localStorage.getItem('vurdict_visit_count') || '0', 10);
    localStorage.setItem('vurdict_visit_count', (currentCount + 1).toString());
  }, [])

  if (!isOnline) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
        <OfflinePage />
      </Suspense>
    )
  }

  return (
    <AnalysisProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-slate-100 border-t-brand-900 animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/analyzing" element={<AnalyzingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/results/:dimSlug" element={<DimensionDetailsPage />} />
          <Route path="/offline" element={<OfflinePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        <PWAInstallPrompt />
      </Suspense>
    </AnalysisProvider>
  )
}
