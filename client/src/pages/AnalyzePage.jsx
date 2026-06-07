import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Link2,
  Briefcase,
  Users,
  TrendingUp,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Shield,
  Zap,
  Server,
} from 'lucide-react';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
import analyzeIllustration from '../assets/analyze_illustration.png';

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
  {
    key: 'improve_portfolio',
    label: 'Improve Portfolio Quality',
    desc: 'Level up your portfolio regardless of career stage',
    icon: TrendingUp,
  },
];

const EXPERIENCE_LEVELS = ['Junior', 'Mid-Level', 'Senior'];

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [goal, setGoal] = useState(searchParams.get('goal') || 'get_hired');
  const [experience, setExperience] = useState('junior');
  const [error, setError] = useState('');
  const [useMock, setUseMock] = useState(false);

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

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim())) {
      setError('Please enter a valid URL (e.g., alexdesign.co)');
      return;
    }

    navigate(
      `/analyzing?url=${encodeURIComponent(url.trim())}&goal=${goal}&experience=${experience}&mock=${useMock}`
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col relative overflow-hidden select-none font-sans">

      {/* Header */}
    <header className="bg-white py-4 px-6 md:px-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo onClick={() => navigate('/')} />
        <button
          onClick={() => navigate('/')}
          className="text-xs font-bold text-slate-500 hover:text-brand-900 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </header>

      {/* Wave to navy */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={false} />
      </div>

      {/* Navy section */}
      <section className="bg-brand-900 text-white flex-1 flex items-center relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* ─── LEFT COLUMN: FORM ─── */}
            <div className="lg:col-span-5 space-y-7">
              {/* Header */}
              <div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-3 text-white">
                  Analyze Your Portfolio
                </h1>
                <p className="mt-2 text-sky-200 text-sm sm:text-base font-medium leading-relaxed">
                  Paste a portfolio link and choose what you're optimizing for.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* URL Input */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3.5 focus-within:border-sky-300/70 transition-all">
                    <Link2 size={18} className="text-sky-300/70 shrink-0" />
                    <input
                      type="text"
                      placeholder="https://yourportfolio.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-500 focus:outline-none font-semibold"
                    />
                  </div>
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
                              : 'bg-white/10 text-white/85 border-white/20 hover:bg-white/15 hover:border-white/35'
                          }`}
                        >
                          <div
                            className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-brand-900/10 text-brand-900' : 'bg-white/15 text-sky-300'
                            }`}
                          >
                            <Icon size={17} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`block text-sm font-bold leading-tight ${isSelected ? 'text-slate-900' : 'text-white'}`}>
                              {item.label}
                            </span>
                            <span className={`block text-xs mt-0.5 leading-normal font-medium ${isSelected ? 'text-slate-500' : 'text-white/60'}`}>
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
                          className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                            isSelected
                              ? 'bg-white text-slate-900 border-white shadow-sm'
                              : 'bg-white/10 text-white/75 border-white/20 hover:bg-white/15 hover:border-white/35'
                          }`}
                        >
                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-brand-900' : 'border-white/40'
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

                <div className="flex items-center justify-between bg-white border border-white rounded-2xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Server size={14} className="text-slate-600" />
                    <span className="text-[11px] font-bold text-slate-900">Bypass server (use mock data)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseMock(!useMock)}
                    className={`relative h-5 w-9 rounded-full transition-all ${useMock ? 'bg-brand-900' : 'bg-slate-600'}`}>                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${useMock ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={isUrlEmpty}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    isUrlEmpty
                      ? 'bg-white/15 text-white/40 cursor-not-allowed'
                      : 'bg-white text-brand-900 hover:bg-sky-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  <span>Analyze Portfolio</span>
                  <ArrowRight size={16} />
                </button>

                {/* Secondary text */}
                <p className="text-center text-xs text-sky-200/60 font-medium">
                  No signup required. Your review will be generated instantly.
                </p>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-xs text-red-300 font-semibold justify-center bg-red-500/10 border border-red-500/20 p-3 rounded-2xl">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </div>

            {/* ─── RIGHT COLUMN: ILLUSTRATION ─── */}
            <div className="lg:col-span-7 flex items-center justify-end mr-0 overflow-visible">
                <div className="p-6 rounded-lg flex items-center justify-center">
                    <img src={analyzeIllustration} alt="Portfolio analysis illustration" className="w-full max-w-[720px] h-auto select-none animate-float-slow flex-shrink-0" />
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* Wave to white */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={true} />
      </div>

      {/* Bottom strip */}
      <div className="bg-white py-8 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-slate-500 text-xs font-semibold">
          {[
            { icon: CheckCircle, text: 'No signup required', sub: 'Get your results instantly.' },
            { icon: Shield, text: 'Works with any portfolio', sub: 'Personal websites, Notion, Framer, Webflow & more.' },
            { icon: Zap, text: 'Fast & automated', sub: 'Get your full analysis in under a minute.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-brand-900" />
                </div>
                <div>
                  <p className="text-slate-800 font-extrabold">{item.text}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
