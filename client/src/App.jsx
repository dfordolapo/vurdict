import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AnalyzePage from './pages/AnalyzePage.jsx'
import AnalyzingPage from './pages/AnalyzingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import DimensionDetailsPage from './pages/DimensionDetailsPage.jsx'
import { AnalysisProvider } from './context/AnalysisContext'

export default function App() {
  return (
    <AnalysisProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/analyzing" element={<AnalyzingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/:dimSlug" element={<DimensionDetailsPage />} />
      </Routes>
    </AnalysisProvider>
  )
}
