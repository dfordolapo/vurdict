import { WifiOff, RotateCw } from 'lucide-react';
import Logo from '../components/Logo';

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between select-none font-sans relative overflow-hidden">
      {/* Light Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6 md:px-12 backdrop-blur-lg bg-white/95 sticky top-0 z-50">
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Connection Lost
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              Vurdict requires an active internet connection to crawl your portfolio and generate high-fidelity AI feedback.
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
        <p>© {new Date().getFullYear()} Vurdict. Offline Mode.</p>
      </footer>
    </div>
  );
}
