import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis, getScoreStatus } from '../context/AnalysisContext';
import { 
  ArrowLeft, 
  Sparkles, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Layers, 
  Search, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Code,
  Download,
  Bookmark,
  Share2,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Sparkle,
  Compass,
  Brain,
  Palette,
  BarChart2,
  Terminal,
  FileText
} from 'lucide-react';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, resetAnalysis, toggleMockFallback } = useAnalysis();

  // Direct access safety: seed with mock if empty
  useEffect(() => {
    if (!state.report && state.status === 'idle') {
      toggleMockFallback();
    }
  }, [state.report, state.status, toggleMockFallback]);

  const report = state.report;
  if (!report) {
    return (
      <div className="min-h-screen bg-white text-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="text-slate-400 font-semibold">Generating report view...</span>
        </div>
      </div>
    );
  }

  const statusLabel = getScoreStatus(report.overall_score);
  
  // Dynamic color helper
  const getColors = (score) => {
    if (score >= 80) return { text: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50/50' };
    if (score >= 70) return { text: 'text-blue-500', border: 'border-blue-150', bg: 'bg-blue-50/30' };
    if (score >= 55) return { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50/30' };
    return { text: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50/30' };
  };

  const overallColors = getColors(report.overall_score);

  // Map category slugs to labels and icons
  const categoriesList = [
    { key: 'process_visibility', label: 'Structural Logic', slug: 'structural_logic', icon: Compass },
    { key: 'problem_framing', label: 'Critical Thinking', slug: 'critical_thinking', icon: Brain },
    { key: 'visual_quality', label: 'Visual Execution', slug: 'visual_execution', icon: Palette },
    { key: 'outcome_impact', label: 'Impact Evidence', slug: 'impact_evidence', icon: BarChart2 },
    { key: 'trust_cta', label: 'Narrative Tone', slug: 'narrative_tone', icon: FileText },
    { key: 'niche_positioning', label: 'Positioning Clarity', slug: 'positioning_clarity', icon: Terminal }
  ];

  // Map dimension scores to display on image 3
  const scoreboard = [
    { label: 'Structural Logic', score: report.categories.process_visibility?.score || 88, slug: 'structural_logic', icon: Compass },
    { label: 'Critical Thinking', score: report.categories.problem_framing?.score || 78, slug: 'critical_thinking', icon: Brain },
    { label: 'Visual Execution', score: report.categories.visual_quality?.score || 85, slug: 'visual_execution', icon: Palette },
    { label: 'Impact Evidence', score: report.categories.outcome_impact?.score || 80, slug: 'impact_evidence', icon: BarChart2 },
    { label: 'Narrative Tone', score: report.categories.trust_cta?.score || 82, slug: 'narrative_tone', icon: FileText },
    { label: 'Positioning Clarity', score: report.categories.niche_positioning?.score || 75, slug: 'positioning_clarity', icon: Terminal }
  ];

  // Find lowest score slug for detailed view CTA button
  const sortedScoreboard = [...scoreboard].sort((a, b) => a.score - b.score);
  const lowestSlug = sortedScoreboard[0]?.slug || 'critical_thinking';

  // Dynamic strengths / weaknesses from category data
  const categoryMeta = {
    process_visibility: { label: 'Structural Logic', icon: Compass },
    problem_framing: { label: 'Critical Thinking', icon: Brain },
    visual_quality: { label: 'Visual Execution', icon: Palette },
    outcome_impact: { label: 'Impact Evidence', icon: BarChart2 },
    trust_cta: { label: 'Narrative Tone', icon: FileText },
    niche_positioning: { label: 'Positioning Clarity', icon: Terminal },
  };

  const sortedCategories = Object.entries(report.categories || {})
    .map(([key, val]) => ({
      key,
      score: val.score,
      explanation: val.explanation,
      ...(categoryMeta[key] || { label: key, icon: Compass }),
    }))
    .sort((a, b) => b.score - a.score);

  const topStrengths = sortedCategories.slice(0, 3);
  const bottomWeaknesses = sortedCategories.slice(-3).reverse();

  const readinessLevel =
    report.overall_score >= 80 ? 'High' :
    report.overall_score >= 70 ? 'Medium' : 'Low';

  const readinessWidth =
    report.overall_score >= 80 ? '100%' :
    report.overall_score >= 70 ? '66%' :
    report.overall_score >= 55 ? '33%' : '10%';

  const summaryText = report.summary || 'Your portfolio shows strong potential. With a few strategic improvements, you will be in a great position to stand out.';
  const statusSummary =
    report.overall_score >= 80
      ? { title: 'Great work!', text: 'Your portfolio shows strong potential and a clear point of view.' }
      : report.overall_score >= 70
        ? { title: 'Solid foundation!', text: 'You are on the right track. A few refinements can help you stand out even more.' }
        : { title: 'Room for growth.', text: 'Focus on the areas below to strengthen your portfolio and attract better opportunities.' };

  const fixFirst = report.fix_this_first || { title: 'Improve Your Portfolio', description: 'Review the detailed breakdown below for specific recommendations.', priority_score: 5 };

  const formattedDateTime = (() => {
    const date = state.timestamp ? new Date(state.timestamp) : new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    return `Analyzed on ${date.toLocaleDateString('en-US', optionsDate)} • ${date.toLocaleTimeString('en-US', optionsTime)}`;
  })();

  const getHostname = (urlStr) => {
    try {
      const cleanUrl = /^https?:\/\//i.test(urlStr) ? urlStr : 'https://' + urlStr;
      return new URL(cleanUrl).hostname;
    } catch {
      return urlStr || 'yourportfolio.com';
    }
  };

  const getThumbnailUrl = (urlStr) => {
    let cleanUrl = urlStr || 'https://react.dev';
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    return `https://image.thum.io/get/width/400/crop/800/${cleanUrl}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => { resetAnalysis(); navigate('/'); }} />
          <button 
            onClick={() => {
              resetAnalysis();
              navigate('/analyze');
            }}
            className="text-xs font-medium text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Home</span>
          </button>
        </div>
      </div>
      <div className="h-16 shrink-0" />

      {/* Wave divider transitioning to Navy */}
      <div className="w-full bg-white z-10">
        <WaveDivider fill="#172554" flip={false} />
      </div>

      {/* Navy blue block containing Core Report Cards */}
      <div className="bg-brand-900 text-white pt-2 pb-12 px-6 md:px-12 relative overflow-hidden z-10">
        {/* Spotlight blue background circle */}
        <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[100px] top-1/4 left-1/4" />
        
        {/* Row 1: Title and Domain Link Card */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 mb-8 animate-fade-in-up">
          <div className="lg:col-span-8 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight text-balance">
                Your <span className="text-sky-300">Vurdict</span> Report Card
              </h1>
              <p className="mt-2 text-sky-100/70 text-xs sm:text-sm font-medium leading-relaxed text-balance">
                Here's how your portfolio performs across the six hiring dimensions.
              </p>
            </div>

            {/* Action buttons (Download, Save, Share) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 w-full">
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-brand-900 shadow-lg shadow-brand-950/10 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100">
                <Download size={14} className="text-brand-900" />
                <span>Download</span>
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 border border-[#1e3060] bg-[#121e48] hover:bg-[#162348] rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100">
                <Bookmark size={14} />
                <span>Save</span>
              </button>
              <button className="flex items-center justify-center p-2 border border-[#1e3060] bg-[#121e48] hover:bg-[#162348] rounded-xl text-white/80 hover:text-white transition-all cursor-pointer hover:scale-[1.02] active:scale-100">
                <Share2 size={14} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 w-full">
            {/* Domain card */}
            <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-lg space-y-4 text-slate-900">
              <div className="h-28 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-between">
                <img 
                  src={getThumbnailUrl(state.url)} 
                  alt="Portfolio thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover object-top z-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
                <div className="relative z-20 p-3 flex flex-col justify-between h-full w-full">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50 shadow" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/30 shadow" />
                  </div>
                  <div className="text-[10px] font-bold text-white leading-none tracking-wide truncate drop-shadow-md">
                    {getHostname(state.url)}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Domain Link</span>
                <a href={state.url || "#"} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-900 hover:underline block truncate">{state.url || 'yourportfolio.com'}</a>
                <span className="text-[9px] text-slate-400 font-semibold block pt-1">{formattedDateTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Score Card and scoreboard (Equal height layout) */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-20">
          {/* Column 1: Overall Score Card (lg:col-span-6) */}
          <div className="lg:col-span-6 animate-fade-in-up flex flex-col">
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center relative flex-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Overall Score</span>
              
              {/* Trophy circle indicator */}
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6.5" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    className="stroke-blue-600" 
                    strokeWidth="6.5" 
                    fill="transparent" 
                    strokeDasharray="263.89" 
                    strokeDashoffset={263.89 - (report.overall_score / 100) * 263.89}
                  />
                </svg>
                <div className="text-center flex flex-col items-center">
                  <span className="text-5xl font-bold text-slate-900 leading-none">{report.overall_score}</span>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">/ 100</span>
                </div>
              </div>

              <div className={`mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-250 bg-emerald-50`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500`} />
                <span className={`text-xs font-bold text-emerald-700`}>{statusLabel} Portfolio</span>
              </div>

              <p className="text-[10px] text-slate-500 font-bold max-w-xs mt-3 leading-normal">
                {statusSummary.title} {statusSummary.text}
              </p>

              {/* Hiring readiness progress handle bar */}
              <div className="w-full mt-6 border-t border-slate-100 pt-5 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Hiring Readiness</span>
                  <span className={readinessLevel === 'High' ? 'text-emerald-700 font-bold' : readinessLevel === 'Medium' ? 'text-amber-700 font-bold' : 'text-rose-700 font-bold'}>{readinessLevel}</span>
                </div>
                <div className="relative h-2 rounded bg-slate-100 overflow-hidden flex">
                  <div className="h-full bg-blue-600 rounded transition-all" style={{ width: readinessWidth }} />
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-wide">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed pt-1">
                  {summaryText}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Scores by Hiring Dimension (lg:col-span-6) */}
          <div className="lg:col-span-6 animate-fade-in-up flex flex-col">
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Scores by Hiring Dimension
                </h3>

                <div className="space-y-3.5 pt-3">
                  {scoreboard.map((dim) => {
                    return (
                      <div 
                        key={dim.slug}
                        onClick={() => navigate(`/results/${dim.slug}`)}
                        className="group flex flex-col gap-1.5 cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 group-hover:text-brand-900 transition-colors">{dim.label}</span>
                          <span className="font-mono font-medium text-slate-900">{dim.score}/100</span>
                        </div>
                        <div className="w-full h-1.5 rounded bg-slate-100 overflow-hidden relative">
                          <div 
                            className="h-full bg-blue-600 rounded transition-all duration-300 group-hover:bg-blue-700" 
                            style={{ width: `${dim.score}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider transitioning back to White */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={true} />
      </div>

      {/* White background block containing Strengths, Weaknesses, Recommendations, and Footer */}
      <div className="bg-white py-12 px-6 md:px-12 relative z-10 text-slate-900">
        
        {/* Middle Grid Row: Strengths, Areas to Improve, Recommendation card */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-6 animate-fade-in-up">
          
          {/* Strengths */}
          <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase">
              <CheckCircle size={14} className="text-emerald-500" />
              <span>Top Strengths</span>
            </div>
            <div className="space-y-4">
              {topStrengths.map((str, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-4 w-4 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={10} className="text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{str.label}</h5>
                    <p className="text-[9px] text-slate-450 font-semibold leading-relaxed mt-0.5">{str.score}/100 — {str.explanation.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase">
              <AlertTriangle size={14} className="text-amber-500" />
              <span>Areas to Improve</span>
            </div>
            <div className="space-y-4">
              {bottomWeaknesses.map((weak, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-4 w-4 rounded bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle size={10} className="text-amber-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{weak.label}</h5>
                    <p className="text-[9px] text-slate-450 font-semibold leading-relaxed mt-0.5">{weak.score}/100 — {weak.explanation.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recommendation */}
          <div className="bg-blue-50/40 border border-blue-100 p-6 rounded-3xl text-left space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase">
                <Sparkles size={14} className="text-blue-600" />
                <span>Top Recommendation</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{fixFirst.title}</h4>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                {fixFirst.description}
              </p>
            </div>

            {fixFirst.priority_score && (
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-[10px] font-semibold text-slate-500 flex gap-2">
                <TrendingUp size={14} className="text-blue-600 shrink-0" />
                <span>Priority score: <strong>{fixFirst.priority_score}/10</strong> — Focus on this first for the highest impact.</span>
              </div>
            )}

            <button
              onClick={() => navigate(`/results/${lowestSlug}`)}
              className="text-xs font-bold text-brand-900 hover:text-brand-800 flex items-center gap-1.5 cursor-pointer self-start whitespace-nowrap shrink-0"
            >
              <span>See how to improve this →</span>
            </button>
          </div>

        </div>

        {/* Bottom Row: Action Banner */}
        <div className="max-w-7xl w-full mx-auto bg-brand-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold">Want a personalized action plan to improve your score?</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Get step-by-step recommendations tailored to your portfolio.</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/results/${lowestSlug}`)}
            className="rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>View Detailed Recommendations</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white text-slate-500 z-10">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center">
              <Logo size="small" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              © 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" className="hover:text-brand-900 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
