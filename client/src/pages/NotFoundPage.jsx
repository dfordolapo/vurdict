import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="normal" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-200">404</h1>
          <p className="text-sm text-slate-500 font-normal">This page doesn't exist.</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-medium hover:bg-brand-800 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
