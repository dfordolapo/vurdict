'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '../../hooks/use-analysis';
import { GoalType, ExperienceLevel } from '../../lib/types';
import { GOALS } from '../../lib/constants';
import { 
  ArrowRight, 
  Link2, 
  Briefcase, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Server,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import MicroscopeIllustration from '../../components/MicroscopeIllustration';

const GOAL_LIST = [
  { key: 'get_hired' as GoalType, label: 'Get Hired', desc: 'Land a full-time product design role', icon: Briefcase },
  { key: 'win_clients' as GoalType, label: 'Win Freelance Clients', desc: 'Attract and convert more freelance opportunities', icon: Users },
];

export default function AnalyzePage() {
  const router = useRouter();
  const { startAnalysis } = useAnalysis();
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState<GoalType>('get_hired');
  const [experience, setExperience] = useState<ExperienceLevel>('mid');
  const [useMock, setUseMock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isUrlEmpty = !url.trim();

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
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

    setLoading(true);
    router.push(`/analyzing?url=${encodeURIComponent(url)}&goal=${goal}&level=${experience}&mock=${useMock}`);
  };

  return (
    <div className="flex-1 bg-navy-950 flex items-center py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left column — Form */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                Analyze Your Portfolio
              </h1>
              <p className="mt-2 text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                Paste a portfolio link and choose what you're optimizing for.
              </p>
            </div>

            <form onSubmit={handleAnalyzeSubmit} className="space-y-5">

              {/* URL Input */}
              <div>
                <div className="flex items-center gap-3 rounded-2xl border border-navy-600 bg-navy-900/80 px-4 py-3.5 focus-within:border-brand-indigo/70 focus-within:bg-navy-900 transition-all">
                  <Link2 size={18} className="text-brand-indigo/60 shrink-0" />
                  <input
                    type="text"
                    placeholder="https://yourportfolio.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Goal Cards */}
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wide mb-2.5">
                  What's your goal?
                </p>
                <div className="grid gap-2.5">
                  {GOAL_LIST.map((item) => {
                    const isSelected = goal === item.key;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setGoal(item.key)}
                        className={cn(
                          "flex items-center gap-3.5 w-full text-left p-3.5 rounded-2xl border transition-all",
                          isSelected
                            ? "bg-white text-slate-900 border-white"
                            : "bg-white/10 text-white/85 border-white/20 hover:bg-white/15 hover:border-white/35"
                        )}
                      >
                        <div className={cn(
                          "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                          isSelected ? "bg-brand-indigo/10 text-brand-indigo" : "bg-white/15 text-brand-indigo/70"
                        )}>
                          <Icon size={17} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={cn("block text-sm font-bold leading-tight", isSelected ? "text-slate-900" : "text-white")}>
                            {item.label}
                          </span>
                          <span className={cn("block text-xs mt-0.5 leading-normal font-medium", isSelected ? "text-slate-500" : "text-white/60")}>
                            {item.desc}
                          </span>
                        </div>
                        <div className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0",
                          isSelected ? "border-brand-indigo bg-brand-indigo" : "border-white/40"
                        )}>
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wide mb-2.5">
                  Experience Level
                </p>
                <div className="flex gap-2">
                  {[
                    { key: 'junior' as ExperienceLevel, label: 'Junior' },
                    { key: 'mid' as ExperienceLevel, label: 'Mid-Level' },
                    { key: 'senior' as ExperienceLevel, label: 'Senior' },
                  ].map((item) => {
                    const isSelected = experience === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setExperience(item.key)}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-bold transition-all",
                          isSelected
                            ? "bg-white text-slate-900 border-white"
                            : "bg-white/10 text-white/75 border-white/20 hover:bg-white/15 hover:border-white/35"
                        )}
                      >
                        <div className={cn(
                          "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                          isSelected ? "border-brand-indigo" : "border-white/40"
                        )}>
                          {isSelected && <div className="h-2 w-2 rounded-full bg-brand-indigo" />}
                        </div>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mock toggle */}
              <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Server size={14} className="text-brand-indigo/60" />
                  <span className="text-[11px] font-bold text-slate-300">Bypass server (use mock data)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUseMock(!useMock)}
                  className={cn("relative h-5 w-9 rounded-full transition-all", useMock ? "bg-brand-indigo" : "bg-white/25")}
                >
                  <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", useMock ? "translate-x-[18px]" : "translate-x-0.5")} />
                </button>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isUrlEmpty || loading}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold transition-all",
                    isUrlEmpty
                      ? "bg-white/15 text-white/40 cursor-not-allowed"
                      : "bg-white text-brand-indigo hover:bg-sky-50 hover:-translate-y-0.5 active:translate-y-0"
                  )}
              >
                <span>{loading ? 'Starting audit...' : 'Analyze Portfolio'}</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-slate-400 font-medium">
                No signup required. Your review will be generated instantly.
              </p>

              {error && (
                <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold justify-center bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right column — Illustration */}
          <div className="lg:col-span-7 flex items-center justify-end mr-0">
            <MicroscopeIllustration className="w-full max-w-[460px] h-auto select-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
