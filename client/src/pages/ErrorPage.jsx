import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCw } from 'lucide-react'
import Logo from '../components/Logo'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="normal" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-200">500</h1>
          <p className="text-sm text-slate-500 font-normal">Something went wrong on our end. Please try again.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-medium hover:bg-brand-800 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-all cursor-pointer"
          >
            <RotateCw size={14} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  )
}
