'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnalysis } from '../../../hooks/use-analysis';
import { DIMENSIONS } from '../../../lib/constants';
import { getScoreColor, getScoreStatus } from '../../../lib/utils';
import { MOCK_REPORT } from '../../../lib/mock-data';
import { 
  ArrowLeft, 
  ArrowRight,
  TrendingUp, 
  Sparkles, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  Layers, 
  Eye, 
  Search, 
  MessageSquare, 
  Code,
  FileText
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DimensionPageProps {
  params: Promise<{ dim: string }>;
}

export default function DimensionPage({ params }: DimensionPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const dimSlug = resolvedParams.dim;

  const { state, setReport, resetAnalysis } = useAnalysis();
  const [report, setLocalReport] = useState(state.report || MOCK_REPORT);

  useEffect(() => {
    if (state.report) {
      setLocalReport(state.report);
    } else {
      setReport(MOCK_REPORT);
      setLocalReport(MOCK_REPORT);
    }
  }, [state.report, setReport]);

  const activeDim = DIMENSIONS.find(d => d.slug === dimSlug) || DIMENSIONS[0];
  const dimResult = report.dimensions[activeDim.slug as keyof typeof report.dimensions];
  const scoreTheme = getScoreColor(dimResult.score);
  
  // Set benchmark scores based on dimension difficulty
  const getBenchmark = (slug: string) => {
    switch (slug) {
      case 'structure_flow': return 75;
      case 'visual_hierarchy': return 78;
      case 'research_depth': return 70;
      case 'business_impact': return 65;
      case 'narrative_clarity': return 72;
      case 'technical_execution': return 74;
      default: return 70;
    }
  };

  const benchmark = getBenchmark(activeDim.slug);

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

  const handleRestartAudit = () => {
    resetAnalysis();
    router.push('/analyze');
  };

  return (
    <div className="flex-1 bg-navy-950 bg-grid-pattern py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 border-b border-navy-800/60 pb-5">
          <Link 
            href="/results"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:-translate-x-1" />
            Back to Report Card
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-2 flex items-center gap-2">
            Detailed Dimension Review
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-gradient-brand">{activeDim.label}</span>
          </h1>
        </div>

        {/* 2-Column Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Sidebar) - lg:col-span-4 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Dimensions Directory */}
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-navy-800/60 pb-3 mb-2">
                Hiring Dimensions
              </h3>
              <div className="space-y-1.5">
                {DIMENSIONS.map((dim) => {
                  const isActive = dim.slug === activeDim.slug;
                  const res = report.dimensions[dim.slug as keyof typeof report.dimensions];
                  const Icon = getDimensionIcon(dim.slug);
                  const colors = getScoreColor(res.score);

                  return (
                    <Link
                      key={dim.slug}
                      href={`/results/${dim.slug}`}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border transition-all duration-200",
                        isActive 
                          ? "border-brand-indigo bg-brand-indigo/5 text-white" 
                          : "border-transparent text-slate-400 hover:bg-navy-900/40 hover:text-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-4 w-4", isActive ? "text-brand-indigo" : "text-slate-500")} />
                        <span className="text-xs font-bold">{dim.label}</span>
                      </div>
                      <span className={cn("text-xs font-mono font-bold px-2 py-0.5 rounded", colors.bg, colors.text)}>
                        {res.score}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Improve Card */}
            <div className="glass-panel rounded-2xl p-5 border-brand-violet/20 bg-gradient-to-br from-navy-900/30 to-navy-900/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-violet uppercase tracking-wider group">
              <Award className="h-5 w-5 transition-all duration-200 group-hover:scale-110 group-hover:text-amber-400" />
                Want to improve?
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Implement the recommendations, push changes live, and re-run the audit to update your scorecard.
              </p>
              <button
                onClick={handleRestartAudit}
                className="w-full rounded-xl bg-navy-900 hover:bg-navy-850 px-4 py-2.5 text-xs font-bold text-white border border-navy-800/80 flex items-center justify-center gap-1.5 transition-colors group"
              >
                Re-analyze Portfolio
                <ArrowRight className="h-5 w-5 text-brand-violet transition-all duration-200 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column (Main Review panel) - lg:col-span-8 */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Dimension Overview & Score */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-navy-800/60 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{activeDim.label}</h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 font-semibold">{activeDim.description}</p>
                </div>
                
                {/* Score badge & benchmark */}
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 bg-navy-900/40 p-4 rounded-xl border border-navy-800/50">
                  <div className="text-center">
                    <span className={cn("text-3xl font-extrabold block leading-none", scoreTheme.text)}>
                      {dimResult.score}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Your Score</span>
                  </div>
                  <div className="h-8 w-px bg-navy-800" />
                  <div className="text-center">
                    <span className="text-xl font-bold text-slate-400 block leading-none">
                      {benchmark}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">Benchmark</span>
                  </div>
                </div>
              </div>

              {/* Explainer card */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Why this score?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {dimResult.explanation}
                </p>
              </div>
            </div>

            {/* Findings Subgrid (Working, Improve, Evidence) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* What's Working */}
              <div className="glass-panel rounded-2xl p-5 space-y-3 border-emerald-500/10 bg-navy-900/10">
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider group">
                  <CheckCircle className="h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110" />
                  What's Working
                </h3>
                <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-semibold">
                  {dimResult.whatsWorking.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Where to Improve */}
              <div className="glass-panel rounded-2xl p-5 space-y-3 border-amber-500/10 bg-navy-900/10">
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider group">
                  <AlertTriangle className="h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110" />
                  Where to Improve
                </h3>
                <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-semibold">
                  {dimResult.whereToImprove.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evidence Found */}
              <div className="glass-panel rounded-2xl p-5 space-y-3 border-navy-800 bg-navy-900/10">
                <h3 className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider group">
                  <Search className="h-5 w-5 shrink-0 transition-all duration-200 group-hover:scale-110" />
                  Evidence Found
                </h3>
                <div className="space-y-3">
                  {dimResult.evidence.length > 0 ? (
                    dimResult.evidence.map((item) => (
                      <div key={item.id} className="rounded-lg bg-navy-950 p-2.5 border border-navy-850 space-y-1">
                        <div className="text-[10px] font-bold text-white leading-tight">{item.title}</div>
                        <div className="text-[9px] text-slate-400 leading-normal">{item.description}</div>
                        {item.location && (
                          <div className="text-[8px] text-brand-indigo font-bold font-mono uppercase tracking-wide pt-0.5">
                            📍 {item.location}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 leading-relaxed italic block pt-2">
                      No direct evidence modules logged.
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Recommendation Detail card */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border-brand-indigo/30 bg-gradient-to-r from-navy-900/40 to-navy-900/20 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-indigo uppercase tracking-wider group">
              <Lightbulb className="h-6 w-6 text-brand-indigo transition-all duration-200 group-hover:scale-110 group-hover:text-amber-400" />
                Actionable Recommendation
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-white">{dimResult.recommendation.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {dimResult.recommendation.description}
                </p>
              </div>

              <div className="border-t border-navy-800/60 pt-5 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Suggested Action Steps</h4>
                <ol className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                  {dimResult.recommendation.actionSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="h-5 w-5 rounded-full bg-brand-indigo/15 border border-brand-indigo/30 text-brand-indigo font-mono text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-2 flex justify-end">
                <a 
                  href="#"
                  className="rounded-xl bg-navy-900 hover:bg-navy-850 px-5 py-2.5 text-xs font-bold text-white border border-navy-800/80 flex items-center gap-1.5 transition-all group"
                >
                  See Real-World Examples
                  <ArrowRight className="h-5 w-5 text-brand-indigo transition-all duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
