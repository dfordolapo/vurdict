import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Download, Share, PlusSquare, MoreVertical, Smartphone, Check, Sparkles } from 'lucide-react';

export default function PWAInstallPrompt() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [platform, setPlatform] = useState('desktop'); // 'ios', 'android', 'desktop'
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [step, setStep] = useState('prompt'); // 'prompt', 'instructions'

  useEffect(() => {
    // 1. Standalone / already installed check
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;
    
    if (isStandalone) return;

    // 2. Local storage constraints
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isLocalhost) {
      const isPermanentlyDismissed = localStorage.getItem('vurdict_pwa_dismissed_permanent') === 'true';
      if (isPermanentlyDismissed) return;

      const dismissedAt = localStorage.getItem('vurdict_pwa_dismissed_at');
      if (dismissedAt) {
        const threeDays = 3 * 24 * 60 * 60 * 1000;
        if (Date.now() - parseInt(dismissedAt, 10) < threeDays) {
          return;
        }
      }

      // 4. Session check (Show at most once per session on production)
      if (sessionStorage.getItem('vurdict_pwa_session_shown') === 'true') return;
    }

    // 5. Detect platform
    const ua = navigator.userAgent.toLowerCase();
    const isiOS = /ipad|iphone|ipod/.test(ua) && !window.MSStream;
    const isAndroid = /android/.test(ua);

    if (isiOS) {
      setPlatform('ios');
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // 6. Native install event listener
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 7. Active browsing timer (10 seconds globally)
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('vurdict_pwa_session_shown', 'true');
    }, 10000); // 10 seconds

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android / Desktop native flow
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('vurdict_pwa_dismissed_permanent', 'true');
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS or fallback Android/Desktop instructions
      setStep('instructions');
    }
  };

  const handleDismiss = (permanent = false) => {
    if (permanent) {
      localStorage.setItem('vurdict_pwa_dismissed_permanent', 'true');
    } else {
      localStorage.setItem('vurdict_pwa_dismissed_at', Date.now().toString());
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 flex justify-center md:justify-end animate-in slide-in-from-bottom duration-300">
      <div className="w-full max-w-sm bg-white border border-slate-200 shadow-2xl text-slate-800 rounded-2xl relative overflow-hidden flex flex-col">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={() => handleDismiss(false)}
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer z-20"
          aria-label="Dismiss prompt"
        >
          <X size={16} />
        </button>

        {/* 1. HEADER (White background) */}
        <div className="p-5 pb-3 bg-white z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#172554] shrink-0">
            <Smartphone size={20} />
          </div>
          <h3 className="text-sm font-semibold text-slate-950">
            {step === 'prompt' ? 'Install Vurdict' : 'How to Install Vurdict'}
          </h3>
        </div>

        {/* 2. BODY CONTENT (Navy background with Wave Dividers) */}
        <div className="relative bg-[#172554] text-white overflow-hidden flex-1">
          {/* Top Wave (white transitioning to navy blue) */}
          <div className="w-full overflow-hidden leading-none bg-white -mt-[2px]">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" shapeRendering="geometricPrecision" className="block w-full h-[18px] text-[#172554] fill-current">
              <path d="M0,0 Q360,200 720,0 Q1080,200 1440,0 L1440,200 L0,200 Z" />
            </svg>
          </div>

          {/* Main Content Area */}
          <div className="px-5 py-3 relative z-10">
            {step === 'prompt' ? (
              <p className="text-xs text-sky-100/90 leading-relaxed font-normal">
                Add Vurdict to your home screen for faster access and a seamless app-like experience
              </p>
            ) : (
              <div>
                {platform === 'ios' ? (
                  <ul className="space-y-3 text-xs text-sky-100/90 font-normal">
                    <li className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-blue-900/60 text-[10px] font-bold text-sky-300 flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p>
                        Tap the <strong className="text-white inline-flex items-center gap-1">Share <Share size={12} className="inline text-sky-200" /></strong> button in Safari's bottom toolbar.
                      </p>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-blue-900/60 text-[10px] font-bold text-sky-300 flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p>
                        Scroll down and select <strong className="text-white inline-flex items-center gap-1">Add to Home Screen <PlusSquare size={12} className="inline text-sky-200" /></strong>.
                      </p>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-blue-900/60 text-[10px] font-bold text-sky-300 flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <p>
                        Tap <strong className="text-white font-bold">Add</strong> in the top-right corner.
                      </p>
                    </li>
                  </ul>
                ) : platform === 'android' ? (
                  <ul className="space-y-3 text-xs text-sky-100/90 font-normal">
                    <li className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-blue-900/60 text-[10px] font-bold text-sky-300 flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p>
                        Tap the browser menu button <strong className="text-white inline-flex items-center gap-1">Three Dots <MoreVertical size={12} className="inline text-sky-200" /></strong> next to the address bar.
                      </p>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-blue-900/60 text-[10px] font-bold text-sky-300 flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p>
                        Select <strong className="text-white font-bold">"Install App"</strong> or <strong className="text-white font-bold">"Add to Home Screen"</strong>.
                      </p>
                    </li>
                  </ul>
                ) : (
                  <p className="text-xs text-sky-100/90 leading-relaxed font-normal">
                    To install Vurdict on desktop, look for the install icon in your browser's address bar (often a monitor icon with an arrow, next to the bookmarks star).
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom Wave (navy blue transitioning back to white) */}
          <div className="w-full overflow-hidden leading-none bg-white -mb-[2px]">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" shapeRendering="geometricPrecision" className="block w-full h-[18px] text-[#172554] fill-current rotate-180">
              <path d="M0,0 Q360,200 720,0 Q1080,200 1440,0 L1440,200 L0,200 Z" />
            </svg>
          </div>
        </div>

        {/* 3. CTAS (White background) */}
        <div className="p-5 pt-5 bg-white z-10">
          {step === 'prompt' ? (
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleInstallClick}
                className="w-full py-2.5 rounded-xl bg-[#172554] hover:bg-blue-900 text-white text-xs font-medium transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer outline-none focus:outline-none"
              >
                <Download size={13} />
                <span>Install Vurdict</span>
              </button>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                <button 
                  onClick={() => handleDismiss(false)}
                  className="hover:text-slate-600 transition-colors cursor-pointer"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={() => handleDismiss(true)}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Don't show again
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  localStorage.setItem('vurdict_pwa_dismissed_permanent', 'true');
                  setIsVisible(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#172554] hover:bg-blue-900 text-white text-xs font-medium transition-all shadow cursor-pointer outline-none focus:outline-none"
              >
                Done
              </button>
              <button
                onClick={() => setStep('prompt')}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all border border-slate-200 cursor-pointer outline-none focus:outline-none"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
