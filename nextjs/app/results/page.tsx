'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '../../hooks/use-analysis';
import { DIMENSIONS } from '../../lib/constants';
import { getScoreColor, getScoreStatus, getScoreBand } from '../../lib/utils';
import { MOCK_REPORT } from '../../lib/mock-data';
import { 
  ArrowLeft, 
  ArrowRight,
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Share2,
  Lock,
  Flame,
  Layers, 
  Eye, 
  Search, 
  MessageSquare, 
  Code,
  FileSpreadsheet,
  ClipboardList
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ResultsPage() {
  const router = useRouter();
  const { state, resetAnalysis, setReport } = useAnalysis();
  const [report, setLocalReport] = useState(state.report || MOCK_REPORT);

  useEffect(() => {
    if (state.report) {
      setLocalReport(state.report);
    } else {
      // Fallback: If no report in context (e.g. direct nav), seed context with default mock report
      setReport(MOCK_REPORT);
      setLocalReport(MOCK_REPORT);
    }
  }, [state.report, setReport]);

  const scoreTheme = getScoreColor(report.overallScore);
  const statusLabel = getScoreStatus(report.overallScore);
  const scoreBand = getScoreBand(report.overallScore);

  // Map icon component dynamically
  const getDimensionIcon = (slug: string) => {
    switch (slug) {
      case 'structure_flow': return Layers;
      case 'visual_hierarchy': return Eye;
      case 'research_depth': return Search;
      case 'business_impact': return TrendingUp;
      case 'narrative_clarity': return MessageSquare;
      case 'technical_execution': return Code;
      default: return Sparkles;
    }
  };

  const handleNewAudit = () => {
    resetAnalysis();
    router.push('/analyze');
  };

  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-800/60 pb-6">
          <div className="space-y-1">
            <button 
              onClick={handleNewAudit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 transition-all duration-200 group-hover:-translate-x-1" />
              New Audit Page
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Portfolio Audit Results
              <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold border", scoreTheme.bg, scoreTheme.text, scoreTheme.border)}>
                {scoreBand.label}
              </span>
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-navy-800 bg-navy-900/40 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-navy-800/60 hover:border-navy-700 transition-all group">
              <Download className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110" />
              Download Report
            </button>
            <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-navy-800 bg-navy-900/40 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-navy-800/60 hover:border-navy-700 transition-all group">
              <Share2 className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:scale-110" />
              Share Report
            </button>
          </div>
        </div>

        {/* 3-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Metadata & AI Summary (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Project Meta Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Portfolio Domain</div>
              <div className="text-lg font-bold text-white truncate">{report.portfolioUrl}</div>
              <div className="text-xs font-medium text-slate-400 font-mono">
                Analyzed on {report.analyzedAt}
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-brand-indigo/10 to-transparent blur-lg" />
              <div className="flex items-center gap-2 text-xs font-bold text-brand-indigo uppercase tracking-wider group">
              <Sparkles className="h-5 w-5 transition-all duration-200 group-hover:scale-125 group-hover:rotate-12" />
                Vurdict Review
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                {report.summary}
              </p>
              <div className={cn("rounded-xl px-3 py-2 text-[10px] font-bold border", scoreTheme.bg, scoreTheme.text, scoreTheme.border)}>
                {scoreBand.description}
              </div>
            </div>
          </div>

          {/* Column 2: Score Wheel, Strengths & Readiness (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Score Ring & Status */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Score ring */}
              <div className="relative flex h-28 sm:h-36 w-28 sm:w-36 items-center justify-center mt-2">
                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" className="stroke-navy-900" strokeWidth="6.5" fill="transparent" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    className="stroke-brand-indigo animate-pulse-slow" 
                    strokeWidth="6.5" 
                    fill="transparent" 
                    strokeDasharray="263.89" 
                    strokeDashoffset={263.89 - (report.overallScore / 100) * 263.89}
                  />
                </svg>
                <div className="text-center">
                  <span className="text-5xl font-extrabold text-white">{report.overallScore}</span>
                  <span className="text-xs text-slate-500 block">/ 100</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-5 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Portfolio Status</span>
                <span className={cn("text-lg font-extrabold", scoreTheme.text)}>
                  {statusLabel}
                </span>
              </div>

              {/* Readiness bar */}
              <div className="w-full mt-6 border-t border-navy-800/60 pt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>Hiring Readiness</span>
                  <span className="text-white">{report.hiringReadiness}</span>
                </div>
                <div className="relative h-2 rounded bg-navy-900 overflow-hidden flex">
                  <div className={cn("h-full bg-rose-500", report.hiringReadiness === 'Low' ? 'w-1/3' : 'w-1/3')} />
                  <div className={cn("h-full bg-amber-500", report.hiringReadiness === 'Medium' ? 'w-1/3' : report.hiringReadiness === 'High' ? 'w-1/3' : 'w-0')} />
                  <div className={cn("h-full bg-emerald-500", report.hiringReadiness === 'High' ? 'w-1/3' : 'w-0')} />
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="glass-panel rounded-2xl p-5 space-y-3 border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider group">
              <CheckCircle2 className="h-5 w-5 transition-all duration-200 group-hover:scale-110" />
                  Key Strengths
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-semibold leading-relaxed">
                  {report.topStrengths.map((str, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-500">•</span>
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas to Improve */}
              <div className="glass-panel rounded-2xl p-5 space-y-3 border-amber-500/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider group">
              <AlertTriangle className="h-5 w-5 transition-all duration-200 group-hover:scale-110" />
                  Areas to Improve
                </div>
                <ul className="space-y-2 text-xs text-slate-300 font-semibold leading-relaxed">
                  {report.areasToImprove.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-amber-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Scores board & Fix First Card (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dimension scoreboard */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-navy-800/60 pb-3">
                Scores by Hiring Dimension
              </h3>

              <div className="space-y-4">
                {DIMENSIONS.map((dim) => {
                  const result = report.dimensions[dim.slug as keyof typeof report.dimensions];
                  const colors = getScoreColor(result.score);
                  const Icon = getDimensionIcon(dim.slug);

                  return (
                    <Link
                      key={dim.slug}
                      href={`/results/${dim.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl border border-navy-800 bg-navy-900/10 hover:bg-navy-900/40 hover:border-brand-indigo/30 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-brand-indigo group-hover:scale-110 transition-all duration-200" />
                        <div>
                          <div className="text-xs font-bold text-white">{dim.label}</div>
                          <div className="text-[10px] text-slate-500 font-semibold uppercase">{result.status}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 rounded-full bg-navy-900 overflow-hidden hidden sm:block">
                          <div 
                            className={cn("h-full rounded-full", 
                              result.score >= 80 ? "bg-emerald-500" : result.score >= 70 ? "bg-blue-500" : result.score >= 55 ? "bg-amber-500" : "bg-rose-500"
                            )} 
                            style={{ width: `${result.score}%` }} 
                          />
                        </div>
                        <span className={cn("text-sm font-mono font-bold w-6 text-right", colors.text)}>
                          {result.score}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Fix This First recommendation */}
            <div className="glass-panel rounded-2xl p-5 border-brand-violet/30 bg-gradient-to-r from-navy-900/40 to-navy-900/20 space-y-4 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-24 w-24 bg-brand-violet/10 rounded-full blur-xl" />
              
              <div className="flex items-center gap-2 text-xs font-bold text-brand-violet uppercase tracking-wider group">
              <Flame className="h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-amber-400" />
                Fix This First
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">{report.fixThisFirst.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  {report.fixThisFirst.description}
                </p>
              </div>

              <div className="rounded-xl bg-navy-950/80 p-3 border border-navy-800 text-[11px] font-semibold text-slate-400 leading-relaxed">
                💡 <span className="text-brand-violet">{report.fixThisFirst.stat}</span>
              </div>

              <Link
                href={`/results/${report.fixThisFirst.dimensionSlug}`}
                className="w-full rounded-xl bg-navy-900 hover:bg-navy-850 px-4 py-2.5 text-xs font-bold text-white border border-navy-800/80 flex items-center justify-center gap-1.5 transition-colors group"
              >
                See how to improve this
                <ArrowRight className="h-5 w-5 text-brand-violet transition-all duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Priority Action Plan */}
            {report.priorityActionPlan && (
              <div className="glass-panel rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-brand-indigo" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Priority Action Plan</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">Ranked by impact — start here to improve.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Critical Fixes */}
                  <div className="rounded-xl bg-rose-500/5 border border-rose-500/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                      <span className="h-5 w-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-[9px] font-bold text-rose-400">1</span>
                      Critical Fixes
                    </div>
                    <p className="text-[9px] text-rose-400/60 font-semibold">Highest impact. Most likely to affect outcomes.</p>
                    <div className="space-y-3">
                      {report.priorityActionPlan.critical_fixes.slice(0, 3).map((item, i) => (
                        <div key={i} className="space-y-0.5">
                          <h5 className="text-xs font-bold text-white">{item.title}</h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medium Priority */}
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <span className="h-5 w-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[9px] font-bold text-amber-400">2</span>
                      Medium Priority
                    </div>
                    <p className="text-[9px] text-amber-400/60 font-semibold">Valuable enhancements that strengthen your case study.</p>
                    <div className="space-y-3">
                      {report.priorityActionPlan.medium_priority.slice(0, 3).map((item, i) => (
                        <div key={i} className="space-y-0.5">
                          <h5 className="text-xs font-bold text-white">{item.title}</h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nice-to-Have */}
                  <div className="rounded-xl bg-slate-500/5 border border-slate-500/20 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span className="h-5 w-5 rounded-full bg-slate-500/20 border border-slate-500/30 flex items-center justify-center text-[9px] font-bold text-slate-400">3</span>
                      Nice-to-Have
                    </div>
                    <p className="text-[9px] text-slate-400/60 font-semibold">Optional refinements for further polish.</p>
                    <div className="space-y-3">
                      {report.priorityActionPlan.nice_to_have.slice(0, 3).map((item, i) => (
                        <div key={i} className="space-y-0.5">
                          <h5 className="text-xs font-bold text-white">{item.title}</h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
