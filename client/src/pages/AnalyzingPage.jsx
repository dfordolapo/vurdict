import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
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
  Terminal
} from 'lucide-react';

export default function AnalyzingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, startAnalysis, toggleMockFallback } = useAnalysis();

  const url = searchParams.get('url') || 'yourportfolio.com';
  const goal = searchParams.get('goal') || 'get_hired';
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

  // Kick off analysis on mount
  useEffect(() => {
    startAnalysis(url, goal, mock);
  }, [url, goal, mock]);

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      
      {/* Header Logostrip */}
      <div className="bg-white py-4 px-6 md:px-12 border-b border-slate-100 z-20">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button 
            onClick={() => navigate('/analyze')} 
            className="text-xs font-bold text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </div>

      {/* Wave divider transitioning to Navy */}
      <div className="w-full bg-white z-10">
        <WaveDivider fill="#172554" flip={false} />
      </div>

      {/* Navy blue block containing Main Content Grid */}
      <div className="bg-brand-900 text-white pt-2 pb-12 px-6 md:px-12 flex-1 relative overflow-hidden z-10">
        {/* Spotlight blue background circle */}
        <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[100px] top-1/4 left-1/4" />

        {state.status === 'error' && minTimeElapsed ? (
          /* Image 1: Analysis Failed State */
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-20">
            {/* Left panel */}
            <div className="lg:col-span-6 space-y-6 flex flex-col items-center text-center animate-fade-in-up">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight text-balance">
                  We couldn't analyze this portfolio.
                </h1>
                <p className="mt-2 text-sky-100/70 text-xs sm:text-sm font-medium leading-relaxed text-balance max-w-sm">
                  Something prevented us from accessing or understanding the portfolio at this link.
                </p>
              </div>

              {/* Possible reasons checklist */}
              <div className="space-y-3 max-w-md">
                <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider block">Possible reasons:</span>
                {[
                  { icon: Lock, title: 'Private or Restricted Access', desc: 'The portfolio may be private or behind a login.', color: 'text-red-500 bg-red-50 border-red-100' },
                  { icon: Link2, title: 'Unsupported or Invalid Link', desc: "We couldn't retrieve content from this URL.", color: 'text-red-500 bg-red-50 border-red-100' },
                  { icon: Clock, title: 'Portfolio Still Loading', desc: 'The site may be temporarily unavailable.', color: 'text-red-500 bg-red-50 border-red-100' }
                ].map((reason, idx) => {
                  const ReasonIcon = reason.icon;
                  return (
                    <div key={idx} className="flex gap-4 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-900">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border ${reason.color}`}>
                        <ReasonIcon size={14} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{reason.title}</h5>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{reason.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/analyze')}
                  className="w-full sm:w-auto rounded-xl bg-white hover:bg-slate-50 text-brand-900 flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold shadow-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCw size={14} className="animate-spin-slow text-brand-900" />
                  <span>Try Another URL</span>
                </button>
                
                <button
                  onClick={toggleMockFallback}
                  className="w-full sm:w-auto rounded-xl bg-[#121e48] hover:bg-[#162348] border border-[#1e3060] text-white/80 hover:text-white flex items-center justify-center gap-1.5 px-6 py-3.5 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles size={14} className="text-sky-300" />
                  <span>Bypass with Mock Report</span>
                </button>
              </div>

              <div className="text-[10px] text-sky-100/50 font-semibold flex items-center gap-1">
                <Clock size={12} />
                <span>Need help? Visit our</span>
                <a href="#" className="text-sky-300 hover:underline">Help Center ↗</a>
              </div>
            </div>

            {/* Right panel warning graphic */}
            <div className="lg:col-span-6 flex items-center justify-center relative py-12">
              <div className="absolute w-72 h-72 rounded-full bg-red-500/5 blur-[80px]" />
              <div className="relative h-72 w-80 rounded-xl border border-sky-950 bg-white shadow-2xl p-3 flex flex-col justify-between overflow-hidden text-slate-900">
                <div className="flex items-center gap-1 border-b border-slate-100 pb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                </div>
                <div className="flex-1 flex flex-col justify-center items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 shadow-md">
                    <span className="text-2xl font-black">!</span>
                  </div>
                  <div className="h-2 w-20 bg-slate-100 rounded" />
                  <div className="h-2 w-32 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Image 4: Active Analyzing State */
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
                        <h4 className={`text-xs font-bold ${isActive ? 'text-brand-900' : 'text-slate-800'}`}>{step.label}</h4>
                        <p className="text-[9px] text-slate-500 font-semibold mt-0.5 leading-normal">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] text-sky-100/50 font-semibold flex items-center gap-1">
                <Clock size={12} />
                <span>This usually takes less than a minute.</span>
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
        )}
      </div>

      {/* Wave divider transitioning back to White */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={true} />
      </div>

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
                  <p className="text-slate-800 font-extrabold text-xs">{item.text}</p>
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
