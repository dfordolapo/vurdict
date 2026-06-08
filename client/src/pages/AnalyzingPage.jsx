import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
import errorIllustration from '../assets/error_illustration.png';
import { 
  Check, 
  Sparkles, 
  Loader2, 
  ServerCrash, 
  AlertTriangle,
  ArrowRight,
  Link2,
  Lock,
  Clock,
  RotateCw,
  Layers,
  Search,
  Eye,
  FileText,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Code,
  Compass,
  Brain,
  Palette,
  BarChart2,
  Terminal,
  Home,
  Mail
} from 'lucide-react';

export default function AnalyzingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, startAnalysis, toggleMockFallback } = useAnalysis();

  const url = searchParams.get('url') || 'yourportfolio.com';
  const goal = searchParams.get('goal') || 'get_hired';
  const experience = searchParams.get('experience') || 'junior';
  const mock = searchParams.get('mock') === 'true';

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const steps = [
    { label: 'Structural Logic', desc: 'Checking how your content is organized and connected.' },
    { label: 'Critical Thinking', desc: 'Assessing evidence of research and insights.' },
    { label: 'Visual Execution', desc: 'Evaluating layout, typography, and visual clarity.' },
    { label: 'Impact Evidence', desc: 'Measuring outcomes, metrics, and real-world impact.' },
    { label: 'Narrative Tone', desc: 'Analyzing storytelling, flow, and writing voice.' },
    { label: 'Positioning Clarity', desc: 'Reviewing specialization, target alignment, and role definition.' }
  ];

  const getErrorConfig = () => {
    const isPrivate = state.errorCode === 'PRIVATE_PORTFOLIO';
    const isInvalidUrl = state.errorCode === 'INVALID_URL';
    const isTimeout = state.errorCode === 'TIMEOUT';
    const isAnalysisUnavailable = state.errorCode === 'ANALYSIS_UNAVAILABLE';

    if (isPrivate) {
      return {
        icon: Lock,
        title: "This portfolio is locked.",
        desc: "We couldn't access the content because this page is private, password-protected, or restricted.",
        advice: "Ensure your portfolio is public and accessible without credentials.",
        primary: {
          label: "Edit URL",
          icon: Link2,
          onClick: () => navigate(`/analyze?url=${encodeURIComponent(url)}&goal=${goal}&experience=${experience}`)
        },
        secondary: {
          label: "Return Home",
          icon: Home,
          onClick: () => navigate('/')
        }
      };
    }

    if (isInvalidUrl) {
      return {
        icon: Link2,
        title: "We couldn’t find that portfolio.",
        desc: "Double-check the spelling of your link. Make sure the website exists and loads correctly in your browser.",
        advice: "Verify the link opens correctly in a browser. Try copy-pasting the exact URL.",
        primary: {
          label: "Edit URL",
          icon: Link2,
          onClick: () => navigate(`/analyze?url=${encodeURIComponent(url)}&goal=${goal}&experience=${experience}`)
        },
        secondary: {
          label: "Return Home",
          icon: Home,
          onClick: () => navigate('/')
        }
      };
    }

    if (isTimeout) {
      return {
        icon: Clock,
        title: "The connection timed out.",
        desc: "The portfolio site took too long to load. Your server might be running slow or temporarily busy.",
        advice: "Please wait a moment and try again. Your portfolio server might be running slowly.",
        primary: {
          label: "Try Again",
          icon: RotateCw,
          onClick: () => startAnalysis(url, goal, experience, mock)
        },
        secondary: {
          label: "Edit URL",
          icon: Link2,
          onClick: () => navigate(`/analyze?url=${encodeURIComponent(url)}&goal=${goal}&experience=${experience}`)
        }
      };
    }

    if (isAnalysisUnavailable) {
      return {
        icon: ShieldAlert,
        title: "Vurdict is currently busy.",
        desc: "We are receiving too many requests right now. Please wait a moment and try again, or bypass using our interactive Mock Mode.",
        advice: "Try again in a few minutes, or use Mock Mode to explore the dashboard instantly.",
        primary: {
          label: "Try Again",
          icon: RotateCw,
          onClick: () => startAnalysis(url, goal, experience, mock)
        },
        secondary: {
          label: "Return Home",
          icon: Home,
          onClick: () => navigate('/')
        },
        // Allow mock bypass as an additional option
        allowMock: true
      };
    }

    // Default Fallback
    return {
      icon: ShieldAlert,
      title: "Something went wrong.",
      desc: "An unexpected issue occurred while analyzing your portfolio. Please try again.",
      advice: "Wait a moment and try again. If the issue persists, contact support.",
      primary: {
        label: "Try Again",
        icon: RotateCw,
        onClick: () => startAnalysis(url, goal, experience, mock)
      },
      secondary: {
        label: "Return Home",
        icon: Home,
        onClick: () => navigate('/')
      }
    };
  };

  const errorConfig = getErrorConfig();


  // Kick off analysis on mount
  useEffect(() => {
    startAnalysis(url, goal, experience, mock);
  }, [url, goal, experience, mock]);

  // Minimum presentation timer (4 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Loading animation progress loops
  useEffect(() => {
    if (state.status === 'error' && minTimeElapsed) return;

    const duration = mock ? 4000 : 25000;
    const progressIntervalTime = 50;
    const totalTicks = duration / progressIntervalTime;
    const stepIntervalTime = duration / steps.length;

    let tick = 0;
    const pInterval = setInterval(() => {
      tick++;
      const val = Math.min((tick / totalTicks) * 100, 98); // hold at 98 until complete
      setProgress(Math.floor(val));
    }, progressIntervalTime);

    const sInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, stepIntervalTime);

    return () => {
      clearInterval(pInterval);
      clearInterval(sInterval);
    };
  }, [mock, state.status, minTimeElapsed]);

  // Navigate to results
  useEffect(() => {
    if (state.status === 'completed' && minTimeElapsed) {
      setProgress(100);
      setCurrentStep(steps.length);
      const timer = setTimeout(() => {
        navigate('/results');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.status, minTimeElapsed, navigate]);

  const renderOrbitNode = (label, iconComponent, idx, positionClass) => {
    const isDone = idx < currentStep;
    const isActive = idx === currentStep;
    const Icon = iconComponent;

    return (
      <div className={`absolute px-3 py-1.5 rounded-xl border shadow-md text-[9px] font-extrabold flex items-center gap-1.5 transition-all duration-300 ${positionClass} ${
        isDone 
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800' 
          : isActive 
            ? 'border-blue-400 bg-blue-50/50 shadow-[0_0_12px_rgba(59,130,246,0.25)] text-blue-900 scale-105 animate-pulse' 
            : 'border-slate-100 bg-white text-slate-400 opacity-40'
      }`}>
        {isActive ? (
          <Loader2 size={10} className="animate-spin text-blue-600" />
        ) : isDone ? (
          <Check size={10} className="text-emerald-600 stroke-[3]" />
        ) : (
          <Icon size={10} className="text-slate-400" />
        )}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      {/* Header Logostrip */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button 
            onClick={() => navigate('/analyze')} 
            className="text-xs font-medium text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </div>
      <div className="h-16 shrink-0" />

      {state.status === 'error' && minTimeElapsed ? (
        /* Light mode Error Page body */
        <div className="bg-slate-50 py-12 px-6 md:px-12 flex-1 relative overflow-hidden z-10 flex flex-col justify-center">
          {/* Subtle light blue background glows */}
          <div className="absolute w-80 h-80 rounded-full bg-blue-500/5 blur-[100px] top-1/4 left-1/4" />
          <div className="absolute w-80 h-80 rounded-full bg-red-500/5 blur-[100px] top-1/2 right-1/4" />
          
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20">
            {/* Left panel */}
            <div className="lg:col-span-6 space-y-6 flex flex-col items-center text-center animate-fade-in-up">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight text-balance">
                  {errorConfig.title}
                </h1>
                <p className="mt-2 text-slate-500 text-xs sm:text-sm font-medium leading-relaxed text-balance max-w-md">
                  {errorConfig.desc}
                </p>
              </div>

              {/* Specific Reason Card */}
              <div className="space-y-3 max-w-md w-full">
                <div className="flex gap-4 p-3.5 border border-red-200 bg-red-50/40 ring-1 ring-red-200 rounded-2xl shadow-sm text-slate-900 text-left">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border text-red-700 bg-red-100/50 border-red-200">
                    {React.createElement(errorConfig.icon, { size: 14 })}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Troubleshooting Guidance</h5>
                    <p className="text-[10px] text-slate-600 font-semibold mt-0.5">{errorConfig.advice}</p>
                  </div>
                </div>
              </div>

              {/* Standard Primary & Secondary Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full max-w-md justify-center">
                {/* Primary Button */}
                <button
                  onClick={errorConfig.primary.onClick}
                  className="w-full sm:w-auto rounded-xl btn-brand flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  {React.createElement(errorConfig.primary.icon, { size: 13, className: "text-white" })}
                  <span>{errorConfig.primary.label}</span>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={errorConfig.secondary.onClick}
                  className="w-full sm:w-auto rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                >
                  {React.createElement(errorConfig.secondary.icon, { size: 13, className: "text-slate-500" })}
                  <span>{errorConfig.secondary.label}</span>
                </button>

                {/* Optional Mock Bypass button if allowed */}
                {errorConfig.allowMock && (
                  <button
                    onClick={toggleMockFallback}
                    className="w-full sm:w-auto rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Sparkles size={13} className="text-brand-900" />
                    <span>Bypass with Mock Report</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right panel warning graphic */}
            <div className="lg:col-span-6 flex items-center justify-center relative py-12">
              <div className="absolute w-72 h-72 rounded-full bg-red-500/5 blur-[80px]" />
              <img 
                src={errorIllustration} 
                alt="Broken magnifying glass illustration" 
                className="w-full max-w-[600px] h-auto select-none animate-float-slow relative z-10" 
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Wave divider transitioning to Navy */}
          <div className="w-full bg-white z-10">
            <WaveDivider fill="#172554" flip={false} />
          </div>

          {/* Navy blue block containing Main Content Grid */}
          <div className="bg-brand-900 text-white pt-2 pb-12 px-6 md:px-12 flex-1 relative overflow-hidden z-10">
            {/* Spotlight blue background circle */}
            <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[100px] top-1/4 left-1/4" />

            {/* Image 4: Active Analyzing State */}
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-20">
              
              {/* Left panel: Timeline Checklist */}
              <div className="lg:col-span-5 space-y-6 flex flex-col items-center text-center animate-fade-in-up">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight text-balance">
                    Reviewing Your Portfolio
                  </h1>
                  <p className="mt-2 text-sky-100/70 text-xs sm:text-sm font-medium leading-relaxed text-balance max-w-sm">
                    We're evaluating your work across six hiring dimensions.
                  </p>
                </div>

                {/* Checklist timeline */}
                <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4 max-w-md">
                  {steps.map((step, idx) => {
                    const isDone = idx < currentStep;
                    const isActive = idx === currentStep;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-4 transition-all duration-300 ${
                          isDone ? 'opacity-100' : isActive ? 'opacity-100 scale-[1.01]' : 'opacity-40'
                        }`}
                      >
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center border shrink-0 mt-0.5 ${
                          isDone 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : isActive 
                              ? 'border-brand-900 text-brand-900' 
                              : 'border-slate-200 bg-white'
                        }`}>
                          {isDone ? (
                            <Check size={12} className="stroke-[3]" />
                          ) : isActive ? (
                            <Loader2 size={10} className="animate-spin" />
                          ) : null}
                        </div>
                        <div>
                          <h4 className={`text-xs font-semibold ${isActive ? 'text-brand-900' : 'text-slate-800'}`}>{step.label}</h4>
                          <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-normal">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10px] text-sky-100/50 font-semibold flex items-center gap-1">
                  <Clock size={12} />
                  <span>This usually takes a few minutes.</span>
                </div>
              </div>

              {/* Right panel circular progress visual */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center relative py-12 min-h-[460px]">
                
                {/* Dramatic Radar Waves */}
                <div className="absolute w-72 h-72 rounded-full border-2 border-sky-400/20 animate-radar-pulse pointer-events-none z-0" />
                <div className="absolute w-72 h-72 rounded-full border-2 border-sky-300/10 animate-radar-pulse pointer-events-none z-0 [animation-delay:0.7s]" />

                {/* Orbital path */}
                <div className="relative h-80 w-80 rounded-full border border-sky-900/50 flex items-center justify-center z-10">
                  
                  {/* Inner Browser Mockup */}
                  <div className="absolute h-40 w-52 rounded-xl border border-sky-950 bg-white shadow-2xl p-2.5 z-10 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center gap-1 border-b border-slate-100 pb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-250" />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-250" />
                    </div>
                    
                    {/* Simulated UI layouts with Scanline */}
                    <div className="flex-1 flex flex-col justify-center gap-2 pt-2 relative text-slate-850">
                      <div className="absolute left-0 right-0 h-0.5 bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,1)] animate-scanline z-20 pointer-events-none" />
                      <div className="h-2 w-16 bg-slate-150 rounded" />
                      <div className="flex gap-2">
                        <div className="flex-1 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                          <span className="text-[8px] text-slate-400 font-bold">Extracting...</span>
                        </div>
                        <div className="w-12 h-12 bg-slate-50 rounded-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Orbiting Labels - Styled for dark bg */}
                  {renderOrbitNode('Structural Logic', Compass, 0, '-top-6')}
                  {renderOrbitNode('Visual Execution', Palette, 2, '-right-12 top-1/4')}
                  {renderOrbitNode('Critical Thinking', Brain, 1, '-right-8 bottom-1/4')}
                  {renderOrbitNode('Impact Evidence', BarChart2, 3, '-left-12 top-1/4')}
                  {renderOrbitNode('Narrative Tone', FileText, 4, '-left-8 bottom-1/4')}
                  {renderOrbitNode('Positioning Clarity', Terminal, 5, '-bottom-6')}

                  <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-sky-500/20 animate-spin-slow" />
                </div>

                {/* Bottom Progress details */}
                <div className="mt-8 flex flex-col items-center gap-2 w-64 z-20">
                  <span className="text-3xl font-bold text-white">{progress}%</span>
                  <div className="w-full h-1.5 rounded bg-sky-950 overflow-hidden relative">
                    <div className="h-full bg-sky-400 rounded transition-all duration-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-[10px] text-sky-200 font-extrabold tracking-wide mt-1 text-center h-4 transition-all duration-300">
                    {currentStep === 0 && "Analyzing Structural Logic..."}
                    {currentStep === 1 && "Verifying Critical Thinking evidence..."}
                    {currentStep === 2 && "Auditing Visual Execution spacing & grids..."}
                    {currentStep === 3 && "Measuring Impact Evidence & outcomes..."}
                    {currentStep === 4 && "Checking Narrative Tone voice..."}
                    {currentStep === 5 && "Evaluating Positioning Clarity..."}
                    {currentStep >= steps.length && "Compilation successful! Preparing dashboard..."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider transitioning back to White */}
          <div className="w-full bg-white">
            <WaveDivider fill="#172554" flip={true} />
          </div>
        </>
      )}

      {/* Bottom Information Strip */}
      <div className="bg-white py-8 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-500 text-xs font-semibold text-left">
          {[
            { icon: Check, text: 'Your portfolio is safe', sub: 'We analyze your publicly available content only. We never store or share your portfolio.' },
            { icon: Sparkles, text: 'No signup required', sub: 'Get your full report instantly. Create an account later if you\'d like to save and track your progress.' }
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                <div className="h-8 w-8 rounded-full bg-brand-900/5 border border-brand-900/10 flex items-center justify-center shrink-0">
                  <ItemIcon size={14} className="text-brand-900" />
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-xs">{item.text}</p>
                  <p className="text-[10px] text-slate-400 font-medium leading-normal mt-0.5">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
