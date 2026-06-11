import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Home">
            <Logo size="normal" />
          </Link>
          <Link
            to="/analyze"
            className="btn-brand flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-medium group whitespace-nowrap shrink-0"
            aria-label="Analyze a portfolio"
          >
            <span>Analyze Portfolio</span>
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20" aria-hidden="true">
              <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </nav>
      <div className="h-16 shrink-0" />
    </>
  )
}
