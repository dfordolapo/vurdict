import { WifiOff, RotateCw } from 'lucide-react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between select-none font-sans relative overflow-hidden">
      {/* Navy squiggly accent */}
      <svg
        className="absolute top-6 right-6 opacity-15 pointer-events-none select-none"
        width="120" height="48" viewBox="0 0 120 48" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 24 C14 8, 26 40, 40 24 C54 8, 66 40, 80 24 C94 8, 106 40, 116 24"
          stroke="#172554" strokeWidth="3.5" strokeLinecap="round" fill="none"
        />
        <path
          d="M4 36 C14 20, 26 52, 40 36 C54 20, 66 52, 80 36 C94 20, 106 52, 116 36"
          stroke="#172554" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"
        />
      </svg>

      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6 md:px-12 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-md w-full text-center space-y-8">
          
          {/* Branded Icon with Pulse/Glow */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand-900/5 animate-ping" />
            <div className="relative rounded-3xl bg-white border border-slate-100 p-6 shadow-md">
              <WifiOff className="w-12 h-12 text-brand-900" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Connection Lost
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              Vurdict requires an active internet connection to generate high-fidelity feedback.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReload}
              className="btn-brand inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold text-sm shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>Retry Connection</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6 px-6 text-center text-xs text-slate-400 bg-white">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3 font-normal text-slate-500 justify-items-center md:flex md:gap-6">
          <Link to="/privacy" className="hover:text-brand-900 transition-colors whitespace-nowrap">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-900 transition-colors whitespace-nowrap">Terms of Use</Link>
          <Link to="/partnerships" className="hover:text-brand-900 transition-colors whitespace-nowrap">Partnerships</Link>
          <Link to="/revurdict" className="text-indigo-500 hover:text-indigo-700 transition-colors font-semibold whitespace-nowrap">Re:Vurdict</Link>
        </div>
        <p>© {new Date().getFullYear()} Vurdict. Offline Mode.</p>
      </footer>
    </div>
  );
}
