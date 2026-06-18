import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCw } from 'lucide-react'
import Logo from '../components/Logo'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-8">
          <Logo size="normal" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-slate-900">Something went wrong</h1>
          <p className="text-sm text-slate-500 font-normal leading-relaxed">
            The app encountered an unexpected error. If you were analyzing a portfolio, the scraper may have failed.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left">
          <h3 className="text-xs font-semibold text-slate-800 mb-2">Troubleshooting Steps:</h3>
          <ul className="text-[10px] text-slate-600 space-y-1.5 list-disc pl-4">
            <li>Check the URL format to ensure it is correct.</li>
            <li>Make sure the case study is public and not password-protected.</li>
            <li>Note that PDF uploads are not supported.</li>
            <li>Try a different case study link.</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-medium hover:bg-brand-800 transition-all cursor-pointer"
          >
            <RotateCw size={14} />
            <span>Reload Page</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
