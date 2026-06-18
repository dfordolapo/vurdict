import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import { AnalysisProvider } from './context/AnalysisContext'
import PullToRefresh from './components/PullToRefresh.jsx'
const AnalyzePage = lazy(() => import('./pages/AnalyzePage.jsx'))
const AnalyzingPage = lazy(() => import('./pages/AnalyzingPage.jsx'))
const ResultsPage = lazy(() => import('./pages/ResultsPage.jsx'))
const DimensionDetailsPage = lazy(() => import('./pages/DimensionDetailsPage.jsx'))
const OfflinePage = lazy(() => import('./pages/OfflinePage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const SupportPage = lazy(() => import('./pages/SupportPage.jsx'))
const ReVurdictPage = lazy(() => import('./pages/ReVurdictPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

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
        <div>
          <ScrollToTop />
          <PullToRefresh />
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
          <Route path="/revurdict" element={<ReVurdictPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </Suspense>
    </AnalysisProvider>
  )
}
