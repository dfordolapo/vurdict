import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Briefcase,
  Users,
  Sparkles,
  AlertCircle,
  Lock,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
import BetaTicker from '../components/BetaTicker';
import PWAInstallPrompt from '../components/PWAInstallPrompt';
import { getHistory } from '../utils/history';
import analyzeIllustration from '../assets/analyze_illustration.webp';

const GOALS = [
  {
    key: 'get_hired',
    label: 'Get Hired',
    desc: 'Land a full-time product design role',
    icon: Briefcase,
  },
  {
    key: 'win_clients',
    label: 'Win Freelance Clients',
    desc: 'Attract and convert more freelance opportunities',
    icon: Users,
  },
];

const EXPERIENCE_LEVELS = ['Junior', 'Mid-Level', 'Senior'];

export default function AnalyzePage() {
  const navigate = useNavigate();
  const { restoreFromHistory } = useAnalysis();
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [goal, setGoal] = useState(searchParams.get('goal') || 'get_hired');
  const [experience, setExperience] = useState('junior');
  const [error, setError] = useState('');
  const [showPWA, setShowPWA] = useState(false);
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    setRecentHistory(getHistory());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPWA(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const isUrlEmpty = !url.trim();
  const selectedGoal = GOALS.find((g) => g.key === goal);
  const SelectedIcon = selectedGoal?.icon || Briefcase;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter your portfolio URL');
      return;
    }

    let trimmedUrl = url.trim();
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      trimmedUrl = 'https://' + trimmedUrl;
    }

    try {
      const parsedUrl = new URL(trimmedUrl);
      if (!parsedUrl.hostname || !parsedUrl.hostname.includes('.')) {
        setError('Please enter a valid URL (e.g., alexdesign.co)');
        return;
      }
    } catch {
      setError('Please enter a valid URL (e.g., alexdesign.co)');
      return;
    }

    navigate(
      `/analyzing?url=${encodeURIComponent(url.trim())}&goal=${goal}&experience=${experience}`
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative overflow-x-hidden select-none font-sans">

      {/* Fixed header stack */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <header className="bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
            <Logo onClick={() => navigate('/')} />
            <button
              onClick={() => navigate('/')}
              className="text-xs font-normal text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>← Back to Home</span>
            </button>
          </div>
        </header>
        <BetaTicker />
      </div>
      <div className="h-[5.5rem] shrink-0" />

      {/* Wave to navy */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={false} />
      </div>

      {/* Navy section */}
      <section className="bg-brand-900 text-white pt-2 pb-3 md:pb-5 px-6 md:px-12 flex-1 relative overflow-hidden">

        <div className="max-w-7xl w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ─── LEFT COLUMN: FORM ─── */}
            <div className="lg:col-span-5 space-y-7">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight text-balance">
                  Analyze Your Portfolio
                </h1>
                <p className="mt-2 text-sky-100/70 text-xs sm:text-sm font-normal leading-relaxed text-balance max-w-sm">
                  Paste a case study link and choose what you're optimizing for.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* URL Input */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3.5 focus-within:border-sky-300/70 transition-all">
                    <Globe size={18} className="text-sky-300/70 shrink-0" />
                    <input
                      type="text"
                      placeholder="https://yourportfolio.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  {!url && (
                    <p className="text-xs text-sky-200/50 font-normal mt-2 px-1">
                      Works with Notion, Framer, Webflow, Behance, personal sites, or any public link
                    </p>
                  )}
                </div>

                {/* Goal Cards */}
                <div>
                  <p className="text-xs font-bold text-sky-200 tracking-wide mb-2.5">
                    What's your goal?
                  </p>
                  <div className="grid gap-2.5">
                    {GOALS.map((item) => {
                      const isSelected = goal === item.key;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setGoal(item.key)}
                          className={`flex items-center gap-3.5 w-full text-left p-3.5 rounded-2xl border transition-all ${
                            isSelected
                              ? 'bg-white text-slate-900 border-white shadow-sm'
                              : 'bg-[#121e48] text-white border-[#1e3060] hover:bg-[#162348] hover:border-[#264070]'
                          }`}
                        >
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-brand-900/10 text-brand-900' : 'bg-[#162348] text-sky-300'
                            }`}
                          >
                            <Icon size={17} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`block text-sm font-semibold leading-tight ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                              {item.label}
                            </span>
                            <span className={`block text-xs mt-0.5 leading-normal font-normal ${isSelected ? 'text-slate-500' : 'text-white/60'}`}>
                              {item.desc}
                            </span>
                          </div>
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-brand-900 bg-brand-900' : 'border-white/40'
                            }`}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <p className="text-xs font-bold text-sky-200 tracking-wide mb-2.5">
                    Experience Level
                  </p>
                  <div className="flex gap-2">
                    {[
                      { key: 'junior', label: 'Junior' },
                      { key: 'mid', label: 'Mid-Level' },
                      { key: 'senior', label: 'Senior' },
                    ].map((item) => {
                      const isSelected = experience === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setExperience(item.key)}
                          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                            isSelected
                              ? 'bg-white text-slate-900 border-white shadow-sm'
                              : 'bg-[#121e48] text-white border-[#1e3060] hover:bg-[#162348] hover:border-[#264070]'
                          }`}
                        >
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-brand-900' : 'border-white/60'
                            }`}
                          >
                            {isSelected && <div className="h-2 w-2 rounded-full bg-brand-900" />}
                          </div>
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={isUrlEmpty}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    isUrlEmpty
                      ? 'bg-white/15 text-white/40 cursor-not-allowed'
                      : 'bg-white text-brand-900 hover:bg-sky-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <span>                  Analyze Portfolio</span>
                  <ArrowRight size={16} />
                </button>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-xs text-red-300 font-normal justify-center bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </form>

              {/* Recent Reviews */}
              {recentHistory.length > 0 && (
                <div className="pt-4 border-t border-white/10 animate-fade-in-up">
                  <p className="text-[10px] text-sky-200/50 font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock size={12} />
                    Recent Reviews
                  </p>
                  <div className="flex flex-col gap-2">
                    {recentHistory.map((h, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (h.report) {
                            restoreFromHistory(h);
                            navigate('/results');
                          } else {
                            navigate(`/analyzing?url=${encodeURIComponent(h.url)}&goal=${h.goal}&experience=${h.experience}`);
                          }
                        }}
                        className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-left transition-colors group cursor-pointer w-full"
                      >
                        <div className="flex items-center gap-3 overflow-hidden min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                            h.score >= 71 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 
                            h.score >= 51 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 
                            'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {h.score}
                          </div>
                          <div className="truncate min-w-0">
                            <p className="text-xs font-medium text-white truncate">{h.url.replace(/^https?:\/\//, '')}</p>
                            <p className="text-[10px] text-sky-200/60 truncate">
                              <TrendingUp size={10} className="inline mr-0.5 -mt-0.5" />
                              {new Date(h.date).toLocaleDateString()} • {h.goal === 'win_clients' ? 'Win Clients' : 'Get Hired'} • {h.experience}
                            </p>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-white/30 group-hover:text-white/80 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ─── RIGHT COLUMN: ILLUSTRATION ─── */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="flex items-center justify-center w-full max-w-[500px] lg:max-w-none">
                <img src={analyzeIllustration} alt="Portfolio analysis illustration" loading="lazy" className="w-full h-auto select-none animate-float-slow max-h-[320px] sm:max-h-[400px] lg:max-h-none" />
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Wave to white */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={true} />
      </div>


      {showPWA && <PWAInstallPrompt />}
    </div>
  );
}
