import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage.jsx'
import AnalyzePage from './pages/AnalyzePage.jsx'
import AnalyzingPage from './pages/AnalyzingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import DimensionDetailsPage from './pages/DimensionDetailsPage.jsx'
import OfflinePage from './pages/OfflinePage.jsx'
import { AnalysisProvider } from './context/AnalysisContext'

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

  if (!isOnline) {
    return <OfflinePage />
  }

  return (
    <AnalysisProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/analyzing" element={<AnalyzingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/:dimSlug" element={<DimensionDetailsPage />} />
        <Route path="/offline" element={<OfflinePage />} />
      </Routes>
    </AnalysisProvider>
  )
}
