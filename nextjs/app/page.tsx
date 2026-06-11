'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '../hooks/use-analysis';
import { GoalType } from '../lib/types';
import { GOALS, FAQS } from '../lib/constants';
import { 
  ArrowRight, 
  Link2, 
  Layers, 
  Eye, 
  Search, 
  TrendingUp, 
  MessageSquare, 
  Code,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Briefcase,
  Users,
  Sparkles,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import BetaTicker from '../components/BetaTicker';

export default function LandingPage() {
  const router = useRouter();
  const { startAnalysis } = useAnalysis();
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState<GoalType>('get_hired');
  const [isGoalDropdownOpen, setIsGoalDropdownOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleGoalSelect = (selectedGoal: GoalType) => {
    setGoal(selectedGoal);
    setIsGoalDropdownOpen(false);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!url.trim()) {
      setValidationError('Please enter your portfolio URL');
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
    if (!urlPattern.test(url.trim())) {
      setValidationError('Please enter a valid URL (e.g., alexdesign.co)');
      return;
    }

    setLoading(true);
    // Trigger analysis and navigate to analyzing page
    // We navigate to analyzing with query parameters so we can trigger it in the context
    router.push(`/analyzing?url=${encodeURIComponent(url)}&goal=${goal}`);
  };

  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern">
      <BetaTicker />
      {/* Hero Visual Block */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-indigo/30 bg-brand-indigo/10 px-3.5 py-1.5 text-xs font-semibold text-brand-indigo animate-pulse-slow group hover:bg-brand-indigo/20 hover:border-brand-indigo/50 transition-all duration-300 cursor-default">
            <Sparkles className="h-5 w-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
            Vurdict AI Audit v1.0
          </div>
          
          {/* Main Visual: Floating Mockup of Portfolio & AI Feedback */}
          <div className="relative mt-12 w-full max-w-4xl h-[200px] md:h-[340px] lg:h-[420px] rounded-2xl border border-navy-800/80 bg-navy-900/60 p-4 shadow-2xl shadow-brand-indigo/10">
            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b border-navy-800 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="h-3.5 w-3.5 rounded-full bg-rose-500/80" />
                <span className="h-3.5 w-3.5 rounded-full bg-amber-500/80" />
                <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-sm rounded-lg bg-navy-950/80 px-4 py-1 text-center text-xs text-slate-500 font-mono tracking-wide">
                alexdesign.co/work/fintech-wallet
              </div>
            </div>

            {/* Simulated Layout */}
            <div className="grid grid-cols-3 gap-4 h-[calc(100%-3rem)]">
              {/* Portfolio Side */}
              <div className="col-span-2 space-y-4 pr-4 border-r border-navy-800/40">
                <div className="h-8 w-32 rounded bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-6 w-full rounded bg-slate-700/60" />
                  <div className="h-6 w-3/4 rounded bg-slate-700/60" />
                </div>
                <div className="h-40 w-full rounded-xl bg-slate-800/40 border border-slate-700/30 flex items-center justify-center">
                  <span className="text-xs text-slate-600">Case Study Image Grid</span>
                </div>
              </div>

              {/* Annotation Side */}
              <div className="space-y-4 pl-2 flex flex-col justify-center relative">
                {/* Floating Quote 1 */}
                <div className="hidden md:block absolute top-8 -left-40 bg-navy-950/90 border border-brand-indigo/40 rounded-2xl p-3 shadow-xl max-w-[200px] animate-float">
                  <div className="flex items-center gap-1.5 text-xs text-brand-indigo font-bold mb-1 group">
                    <MessageSquare className="h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-white" />
                    Hiring Manager Feedback
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed italic">
                    "This case study flow is great, but where are the user testing metrics?"
                  </p>
                </div>

                {/* Floating Quote 2 */}
                <div className="hidden md:block absolute bottom-8 -left-20 bg-navy-950/90 border border-brand-violet/40 rounded-2xl p-3 shadow-xl max-w-[220px] animate-float-delayed">
                  <div className="flex items-center gap-1.5 text-xs text-brand-violet font-bold mb-1 group">
                    <MessageSquare className="h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-white" />
                    Recruiter Insight
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed italic">
                    "Awesome visual polish. Typography choices look solid and readable."
                  </p>
                </div>

                {/* Central Icon */}
                <MessageSquare className="h-14 w-14 text-white/90 mx-auto animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Navy Section (Wavy top) with headline & Input Form */}
      <section id="overview" className="wave-top bg-navy-900 pb-24 relative z-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            <span className="whitespace-nowrap">See Your Portfolio Through</span><br />
            <span className="whitespace-nowrap">a <span className="text-gradient-brand">Hiring Manager's</span> Eyes</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Submit your portfolio link and get instant, goal-aware feedback designed to make your work stand out.
          </p>

          {/* Form */}
          <form onSubmit={handleAnalyze} className="mt-12 mx-auto max-w-2xl space-y-4">
            <div className="flex flex-col md:flex-row gap-3 rounded-2xl border border-navy-800 bg-navy-950/90 p-2.5 shadow-xl group">
              {/* Input Area */}
              <div className="flex-1 flex items-center gap-2.5 px-3">
                <Link2 className="h-5 w-5 text-brand-indigo shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:text-white" />
                <input
                  type="text"
                  placeholder="Enter your portfolio URL (e.g., alexdesign.co)"
                  className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500 font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* Goal Dropdown */}
              <div className="relative shrink-0 border-t border-navy-800 md:border-t-0 md:border-l md:pl-2.5 pt-2.5 md:pt-0">
                <button
                  type="button"
                  onClick={() => setIsGoalDropdownOpen(!isGoalDropdownOpen)}
                  className="flex w-full md:w-44 items-center justify-between gap-2 rounded-xl bg-navy-900/50 px-4 py-2.5 text-sm font-semibold text-slate-200 border border-navy-800/40 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-1.5">
                    {goal === 'get_hired' && <Briefcase className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110" />}
                    {goal === 'win_clients' && <Users className="h-5 w-5 text-brand-violet transition-all duration-200 group-hover:scale-110" />}
                    {GOALS[goal].label}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform duration-200", isGoalDropdownOpen && "rotate-180")} />
                </button>

                {isGoalDropdownOpen && (
                  <div className="absolute right-0 mt-2 z-30 w-56 rounded-xl border border-navy-800 bg-navy-900 p-1.5 shadow-2xl">
                    {(Object.keys(GOALS) as GoalType[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleGoalSelect(key)}
                        className={cn(
                          "flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors duration-150",
                          goal === key 
                            ? "bg-brand-indigo/10 text-white" 
                            : "text-slate-400 hover:bg-navy-800 hover:text-slate-200"
                        )}
                      >
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          {key === 'get_hired' && <Briefcase className="h-3.5 w-3.5" />}
                          {key === 'win_clients' && <Users className="h-3.5 w-3.5" />}
                          {GOALS[key].label}
                        </span>
                        <span className="text-[10px] text-slate-500 leading-tight">
                          {GOALS[key].description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-indigo hover:to-brand-indigo/90 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-indigo/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 group"
              >
                {loading ? 'Processing...' : 'Analyze My Portfolio'}
                <ArrowRight className="h-5 w-5 transition-all duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="flex items-center gap-2 justify-center text-xs text-rose-400 font-semibold mt-2 animate-pulse">
                <AlertCircle className="h-4 w-4" />
                {validationError}
              </div>
            )}
          </form>

          {/* Social Proof Strip */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 group cursor-default">
              <CheckCircle className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110 group-hover:text-emerald-400" />
              Free portfolio audit
            </span>
            <span className="flex items-center gap-1.5 group cursor-default">
              <CheckCircle className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110 group-hover:text-emerald-400" />
              Goal-aware feedback
            </span>
            <span className="flex items-center gap-1.5 group cursor-default">
              <CheckCircle className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110 group-hover:text-emerald-400" />
              Standard results in minutes
            </span>
          </div>
        </div>
      </section>

      {/* Section 2: Vague vs. Actionable Feedback */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Most portfolio feedback is <br />
              <span className="text-rose-500">too vague</span> to be helpful
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Vurdict replaces the guesswork with a structured evaluation so you can improve with confidence.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column: Vague */}
            <div className="rounded-2xl border border-navy-800/60 bg-navy-900/40 p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-400 border-b border-navy-800 pb-4">
                Typical Vague Feedback
              </h3>
              <ul className="mt-6 space-y-5">
                {[
                  '“Make it look cleaner and more professional.”',
                  '“You need to add more details to your project writeups.”',
                  '“I want to see more of your design process here.”',
                  '“Make your typography choices pop a bit more.”',
                ].map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-500 font-medium leading-relaxed italic flex gap-3">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Actionable */}
            <div className="rounded-2xl border border-brand-indigo/35 bg-navy-900/80 p-6 md:p-8 shadow-xl shadow-brand-indigo/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-brand-indigo/10 to-brand-violet/10 blur-xl" />
              <h3 className="text-lg font-bold text-brand-indigo border-b border-navy-800 pb-4 flex items-center gap-2 group">
                <Sparkles className="h-5 w-5 transition-all duration-200 group-hover:scale-125 group-hover:rotate-12" />
                Vurdict's Actionable Feedback
              </h3>
              <ul className="mt-6 space-y-5">
                {[
                  '“Increase type hierarchy by using a 48px header and 16px body text.”',
                  '“Include 3 quantifiable outcome metrics in your Acme case study.”',
                  '“Add a chronological phase roadmap at the top of the Fintech case study.”',
                  '“Apply consistent 24px grid padding and verify contrast ratio compliance.”',
                ].map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-200 font-semibold leading-relaxed flex gap-3">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 6-Dimension Framework */}
      <section className="py-16 md:py-24 bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The 6-Dimension Evaluation Framework
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Each portfolio is evaluated across six key areas that matter most to hiring managers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Layers,
                title: 'Structure & Flow',
                desc: 'Evaluation of overall layout, navigation clarity, and readable case study structures.',
              },
              {
                icon: Eye,
                title: 'Visual Hierarchy',
                desc: 'Review of typography scale, padding/spacing, contrast, and layout balance.',
              },
              {
                icon: Search,
                title: 'Research Depth',
                desc: 'Assessment of user research, problem framing, methodology, and designer-decision logic.',
              },
              {
                icon: TrendingUp,
                title: 'Business Impact',
                desc: 'Look at metrics, user outcomes, and business value demonstrated in case studies.',
              },
              {
                icon: MessageSquare,
                title: 'Narrative Clarity',
                desc: 'Analysis of storytelling, case study flow, tone of voice, and readable writeups.',
              },
              {
                icon: Code,
                title: 'Technical Execution',
                desc: 'Assessment of responsive design, interactions, details, and frontend execution.',
              },
            ].map((dim, idx) => (
              <div key={idx} className="glass-panel-interactive rounded-2xl p-6 flex gap-4 group">
                <dim.icon className="h-6 w-6 text-brand-indigo shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110" />
                <div>
                  <h3 className="text-base font-bold text-white">{dim.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{dim.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Report Card Preview (Wavy Section) */}
      <section className="wave-top bg-navy-900 pb-28 pt-16 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The Vurdict Report Card
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Get a comprehensive, color-coded dashboard of your portfolio's performance.
            </p>
          </div>

          {/* Interactive Report Card Preview Mockup */}
          <div className="mt-16 mx-auto max-w-4xl rounded-2xl border border-navy-800 bg-navy-950 p-6 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/5 to-brand-violet/5 rounded-2xl pointer-events-none" />
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800/80 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Portfolio Audit Report</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                  alexdesign.co
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400 font-bold border border-emerald-500/20">
                    Active Audit
                  </span>
                </h3>
              </div>
              <div className="text-sm font-semibold text-slate-400 font-mono">
                Overall score evaluated: June 6, 2026
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score section */}
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-navy-800 bg-navy-900/30">
                <div className="relative flex h-36 w-36 items-center justify-center">
                  {/* SVG Arc Progress Ring */}
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" className="stroke-navy-800" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="42" 
                      className="stroke-brand-indigo" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray="263.89" 
                      strokeDashoffset="47.5" // 82% score
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-5xl font-extrabold text-white">82</span>
                    <span className="text-xs text-slate-500 block">/ 100</span>
                  </div>
                </div>
                <span className="mt-4 text-xs font-bold text-slate-400">Hiring Readiness</span>
                <span className="text-base font-bold text-emerald-400 mt-1">High Readiness</span>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-navy-800 bg-navy-900/20">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Top Strength</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      Excellent typography scaling & layout consistency across all project listings.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-navy-800 bg-navy-900/20">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">Fix This First</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      Case studies lack business impact details and key outcome metrics.
                    </p>
                  </div>
                </div>

                {/* Score bar chart */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-slate-400">Dimensions Scoreboard</span>
                  <div className="space-y-2">
                    {[
                      { label: 'Structure & Flow', score: 88, color: 'bg-emerald-500' },
                      { label: 'Visual Hierarchy', score: 85, color: 'bg-emerald-500' },
                      { label: 'Research Depth', score: 62, color: 'bg-amber-500' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold text-slate-400 w-28 truncate">{row.label}</span>
                        <div className="flex-1 h-2 rounded bg-navy-800 overflow-hidden">
                          <div className={cn("h-full rounded", row.color)} style={{ width: `${row.score}%` }} />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-white w-8 text-right">{row.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ Accordion */}
      <section id="faq" className="py-16 md:py-24 bg-navy-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2 group">
              <HelpCircle className="h-7 w-7 text-brand-indigo transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Clear answers to help you get started with Vurdict portfolio audits.
            </p>
          </div>

          <div className="mt-16 space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden",
                    isOpen 
                      ? "border-brand-indigo/40 bg-navy-900/60" 
                      : "border-navy-800/40 bg-navy-900/20 hover:border-navy-800"
                  )}
                >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm sm:text-base font-bold text-white focus:outline-none group/faq"
                    >
                      {faq.question}
                      {isOpen ? (
                        <ChevronUp className="h-6 w-6 text-slate-500 shrink-0 transition-all duration-200 group-hover/faq:scale-110 group-hover/faq:text-white" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-500 shrink-0 transition-all duration-200 group-hover/faq:scale-110 group-hover/faq:text-white" />
                      )}
                    </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed font-medium border-t border-navy-800/40 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA Spotlight Pedestal */}
      <section className="py-16 md:py-24 bg-navy-900/50 border-t border-navy-900/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            See What Recruiters See Before They Do
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl">
            Submit your link and get your audit in minutes.
          </p>

          {/* Visual: Pedestal spotlight effect */}
          <div className="relative mt-16 w-full max-w-md h-64 flex flex-col items-center justify-end">
            {/* Spotlight Glow */}
            <div className="absolute top-0 w-44 h-44 rounded-full bg-brand-indigo/10 blur-[60px] animate-pulse-slow pointer-events-none" />
            <div className="absolute -top-12 w-28 h-56 bg-gradient-to-b from-brand-indigo/20 to-transparent blur-2xl origin-top rotate-12 transform pointer-events-none" />
            
            {/* Glowing Panel */}
            <div className="z-10 w-48 h-36 rounded-xl border border-brand-indigo/30 bg-navy-950 p-3 shadow-2xl shadow-brand-indigo/10 flex flex-col items-center justify-center gap-2 animate-float">
              <div className="relative flex h-14 w-14 items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" className="stroke-navy-900" strokeWidth="7" fill="transparent" />
                  <circle cx="50" cy="50" r="42" className="stroke-brand-indigo" strokeWidth="7" fill="transparent" strokeDasharray="263.89" strokeDashoffset="47.5" />
                </svg>
                <span className="text-lg font-extrabold text-white">82</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wide uppercase">Report Ready</span>
            </div>

            {/* Pedestal Base */}
            <div className="w-64 h-8 rounded-full border border-navy-800 bg-navy-950/80 shadow-2xl mt-4 flex items-center justify-center">
              <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-brand-indigo/30 to-transparent" />
            </div>
          </div>

          <Link
            href="/analyze"
            className="mt-12 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet hover:from-brand-indigo hover:to-brand-indigo/90 px-8 py-3 text-sm font-bold text-white shadow-xl shadow-brand-indigo/20 transition-all duration-200 hover:scale-[1.01] flex items-center gap-1.5 group"
          >
            Analyze Your Portfolio
            <ArrowRight className="h-5 w-5 transition-all duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
