import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 bg-white text-slate-500">
      <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Logo size="small" />
          <p className="text-[10px] text-slate-400 font-medium">&copy; 2026 Vurdict. The Reviewer's Perspective.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-normal text-slate-500 justify-items-center md:flex md:gap-6">
          <Link to="/privacy" className="hover:text-brand-900 transition-colors whitespace-nowrap" aria-label="Privacy Policy">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-900 transition-colors whitespace-nowrap" aria-label="Terms of Use">Terms of Use</Link>
          <Link to="/partnerships" className="hover:text-brand-900 transition-colors whitespace-nowrap" aria-label="Partnerships">Partnerships</Link>
          <Link to="/revurdict" className="text-indigo-500 hover:text-indigo-700 transition-colors font-semibold whitespace-nowrap" aria-label="Re:Vurdict">Re:Vurdict</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
