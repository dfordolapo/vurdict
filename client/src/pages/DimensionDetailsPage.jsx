import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalysis, getScoreStatus } from '../context/AnalysisContext';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
import {
  Compass,
  Brain,
  Palette,
  BarChart2,
  FileText,
  Terminal,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  HelpCircle,
  MessageCircle
} from 'lucide-react';


export default function DimensionDetailsPage() {
  const { dimSlug } = useParams();
  const navigate = useNavigate();
  const { state, toggleMockFallback } = useAnalysis();

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
          <span className="text-slate-400 font-semibold">Loading dimension details...</span>
        </div>
      </div>
    );
  }

  // Dimension specifications mapped
  const dimensionsList = [
    { label: 'Structural Logic', slug: 'structural_logic', key: 'process_visibility', icon: Compass, desc: 'Evaluates the flow of your case study, ensuring problem statements connect logically to delivered solutions.', benchmark: 85 },
    { label: 'Critical Thinking', slug: 'critical_thinking', key: 'problem_framing', icon: Brain, desc: 'Checks for evidence of research-driven decisions rather than purely aesthetic choices.', benchmark: 75 },
    { label: 'Visual Execution', slug: 'visual_execution', key: 'visual_quality', icon: Palette, desc: 'Analysis of spacing, typography, hierarchy, and adherence to modern UI principles and accessibility.', benchmark: 80 },
    { label: 'Impact Evidence', slug: 'impact_evidence', key: 'outcome_impact', icon: BarChart2, desc: 'Scans for quantifiable metrics and business outcomes that demonstrate the value of your work.', benchmark: 70 },
    { label: 'Narrative Tone', slug: 'narrative_tone', key: 'trust_cta', icon: FileText, desc: 'Assesses professional voice and clarity, ensuring your writing is concise yet persuasive.', benchmark: 75 },
    { label: 'Positioning Clarity', slug: 'positioning_clarity', key: 'niche_positioning', icon: Terminal, desc: 'Verifies whether the portfolio communicates who the designer is and what they specialize in.', benchmark: 80 }
  ];

  const activeDim = dimensionsList.find(d => d.slug === dimSlug) || dimensionsList[0];
  const activeData = report.categories[activeDim.key] || { score: 62, explanation: 'Needs work' };

  // Status badge helper
  const getBadge = (score) => {
    if (score >= 80) return { label: 'Strong', style: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
    if (score >= 70) return { label: 'Good', style: 'text-blue-700 bg-blue-50 border-blue-100' };
    if (score >= 55) return { label: 'Needs Improvement', style: 'text-amber-700 bg-amber-50 border-amber-100' };
    return { label: 'Critical', style: 'text-rose-700 bg-rose-50 border-rose-100' };
  };

  const badge = getBadge(activeData.score);
  const DimIcon = activeDim.icon;

  // Custom breakdowns depending on selected dimension
  const getDetails = (slug) => {
    switch (slug) {
      case 'critical_thinking':
        return {
          why: "Your projects show surface-level research but lack depth in user insights, competitive analysis, and problem validation.",
          working: [
            { title: 'User Interviews Mentioned', desc: 'You include user interviews in some projects, creating a baseline context.' },
            { title: 'Personas Present', desc: 'Personas are present and relevant to your target audience.' },
            { title: 'Pain Points Outlined', desc: 'You identify user pain points clearly.' }
          ],
          improve: [
            { title: 'More Interview Quotes', desc: 'Add more user interview quotes to support insights.' },
            { title: 'Include Competitor Analysis', desc: 'Include competitive analysis to strengthen context.' },
            { title: 'Document Validation', desc: 'Show how you validated the problem with data.' }
          ],
          evidence: [
            { title: 'User Interviews (Project 1)', desc: 'Good start with 3 user interviews. Add more depth to responses.' },
            { title: 'User Persona (Project 2)', desc: 'Well-defined persona with goals and pain points.' },
            { title: 'Problem Statement (Project 3)', desc: 'Clear problem statement but lacks validation data.' }
          ],
          recommendation: {
            title: 'Strengthen Your Research Process',
            desc: 'Go beyond basic research. Use multiple methods, gather deeper insights, and validate with data to build stronger project foundations.',
            steps: [
              'Conduct more user interviews and synthesize key themes.',
              'Add competitive analysis to show market understanding.',
              'Validate problems with data, surveys, or real-world evidence.'
            ]
          }
        };
      case 'visual_execution':
        return {
          why: "Visual quality and typography scales are highly refined. Align card alignments and resolve WCAG color contrast issues in badges to reach perfection.",
          working: [
            { title: 'Clean Typography Scale', desc: 'Systematic type scaling using Poppins creates premium readability.' },
            { title: 'Consistent Column Grid', desc: 'Systematic alignment to a 12-column vertical grid system.' },
            { title: 'Excellent Spacing', desc: 'Consistent padding keeps layout items breathing.' }
          ],
          improve: [
            { title: 'Fix Color Contrasts', desc: 'Ensure background badges satisfy WCAG contrast ratio (4.5:1).' },
            { title: 'Optimize Mobile Gaps', desc: 'Some multi-column card rows look cramped on mobile widths.' }
          ],
          evidence: [
            { title: 'Typography Scale (Hero)', desc: 'Perfect contrast and scale matching modern design conventions.' },
            { title: 'Work Grid (Home Page)', desc: 'Clean layout structure and high-fidelity project preview cards.' }
          ],
          recommendation: {
            title: 'Optimize Contrast Ratios & Layout Breathing Room',
            desc: 'Enhance spacing on small viewports and audit color pairings for visual accessibility.',
            steps: [
              'Verify badging contrast using automated WCAG checkers.',
              'Apply padding utility classes to increase gaps on tablet breakpoints.',
              'Ensure media assets align to the vertical column grid.'
            ]
          }
        };
      default:
        return {
          why: activeData.explanation,
          working: [
            { title: 'Clear Navigation Structure', desc: 'Recruiters can navigate cleanly between case studies.' },
            { title: 'Professional Formatting', desc: 'Consistent use of sections keeps writeups organized.' }
          ],
          improve: [
            { title: 'Highlight Key Outtakes', desc: 'Bold key phrases and lead sentences to support rapid scanning.' },
            { title: 'Condense Lengthy Writeups', desc: 'Break down large text paragraphs into bullet lists.' }
          ],
          evidence: [
            { title: 'Chronological Roadmap (Case Study 1)', desc: 'Logical chapter outline lets readers navigate sections.' }
          ],
          recommendation: {
            title: 'Refactor Storytelling for Rapid Recruiter Scanning',
            desc: 'Synthesize details into high-level takeaways. Design for readers who scan rather than read line-by-line.',
            steps: [
              'Keep paragraphs limited to a maximum of 3 sentences.',
              'Use outcome-focused headers instead of generic titles (e.g. "Acme Redesign").',
              'Highlight 2-3 key insights in callout boxes.'
            ]
          }
        };
    }
  };

  const details = getDetails(activeDim.slug);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button 
            onClick={() => navigate('/results')}
            className="text-xs font-medium text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>← Back to Report Card</span>
          </button>
        </div>
      </div>
      <div className="h-16 shrink-0" />

      {/* Wave divider transitioning to Navy */}
      <div className="w-full bg-white z-10">
        <WaveDivider fill="#172554" flip={false} />
      </div>

      {/* Navy blue block containing Split Grid */}
      <div className="bg-brand-900 text-white pt-2 pb-12 px-6 md:px-12 relative overflow-hidden z-10 animate-fade-in-up">
        {/* Spotlight blue background circle */}
        <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[100px] top-1/4 left-1/4" />
        
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
          
          {/* Left Column: Review by Dimension Sidebar (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white text-slate-900 border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Review by Dimension</h3>
                <span className="text-[9px] text-slate-400 font-normal block mt-0.5">Click a dimension to view details</span>
              </div>

              <div className="space-y-2">
                {dimensionsList.map((dim) => {
                  const scoreData = report.categories[dim.key] || { score: 62 };
                  const isSelected = dim.slug === activeDim.slug;
                  const SidebarIcon = dim.icon;
                  const scoreBadge = getBadge(scoreData.score);

                  return (
                    <button
                      key={dim.slug}
                      onClick={() => navigate(`/results/${dim.slug}`)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer group ${
                        isSelected 
                          ? 'border-brand-900 bg-brand-900/5 shadow-sm font-bold text-brand-900' 
                          : 'border-slate-50 bg-slate-50/30 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center border ${
                          isSelected ? 'bg-brand-900/10 border-brand-900/20 text-brand-900' : 'bg-white border-slate-100 text-slate-400 group-hover:text-slate-600'
                        }`}>
                          <SidebarIcon size={14} />
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${isSelected ? 'text-brand-900' : 'text-slate-700 group-hover:text-slate-950'}`}>{dim.label}</div>
                          <div className={`text-[8px] font-bold uppercase mt-0.5 ${scoreBadge.style.split(' ')[0]}`}>{scoreBadge.label}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-850">{scoreData.score}/100</span>
                        <ChevronRight size={12} className={`text-slate-400 ${isSelected ? 'text-brand-900 translate-x-0.5' : 'group-hover:translate-x-0.5'} transition-all`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dimension Details Main Panel (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Main header block */}
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-900/5 border border-brand-900/10 flex items-center justify-center text-brand-900 shrink-0">
                  <DimIcon size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{activeDim.label}</h2>
                  <p className="text-xs text-slate-450 font-normal leading-relaxed max-w-xl mt-1">{activeDim.desc}</p>
                </div>
              </div>

              {/* Score gauges */}
              <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-455 block">Your Score</span>
                  <span className="text-2xl font-bold text-slate-900 mt-0.5 block">{activeData.score} <span className="text-xs text-slate-400 font-bold">/ 100</span></span>
                  <span className={`inline-block text-[8px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border mt-1.5 ${badge.style}`}>
                    {badge.label}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-455 block">Industry Benchmark</span>
                  <span className="text-2xl font-bold text-slate-600 mt-0.5 block">{activeDim.benchmark} <span className="text-xs text-slate-400 font-bold">/ 100</span></span>
                  <div className="w-24 h-1.5 rounded bg-slate-100 mt-2.5 overflow-hidden">
                    <div className="h-full bg-slate-400 rounded" style={{ width: `${activeDim.benchmark}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Why this score block */}
            <div className="bg-white text-slate-900 border border-slate-100 p-5 rounded-3xl shadow-lg space-y-2 text-left">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Why this score?</h4>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {details.why}
              </p>
            </div>

            {/* Three columns details (Working, Improve, Evidence) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
              
              {/* What's Working */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>What's Working</span>
                </div>
                <div className="space-y-4">
                  {details.working.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-4 w-4 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={10} className="text-emerald-600" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-450 font-semibold leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where You Can Improve */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span>Where You Can Improve</span>
                </div>
                <div className="space-y-4">
                  {details.improve.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-4 w-4 rounded bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle size={10} className="text-amber-600" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-450 font-semibold leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Found */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase">
                  <FileText size={14} className="text-blue-500" />
                  <span>Evidence Found</span>
                </div>
                <div className="space-y-4">
                  {details.evidence.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="h-8 w-12 rounded bg-slate-900 border border-slate-200 flex flex-col justify-end p-1 shrink-0 mt-0.5 overflow-hidden">
                        <div className="h-0.5 w-6 bg-slate-750 rounded mb-0.5" />
                        <div className="h-0.5 w-4 bg-slate-750 rounded" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-450 font-semibold leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Recommendation block */}
            <div className="bg-blue-50 border border-blue-150 p-6 rounded-3xl text-left space-y-4 text-slate-900">
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-wide text-blue-700 block">Top Recommendation</span>
                  <h4 className="text-sm font-bold text-slate-900">{details.recommendation.title}</h4>
                </div>
                <button className="rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0">
                  <span>See Examples</span>
                  <ExternalLink size={12} />
                </button>
              </div>
              
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                {details.recommendation.desc}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Actionable Steps:</span>
                <div className="space-y-2">
                  {details.recommendation.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-750 font-semibold mt-0.5">{step}</p>
                    </div>
                  ))}
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

      {/* Footer informational banner & bottom bar */}
      <div className="bg-white py-12 px-6 md:px-12 relative z-10 text-slate-900">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-slate-500 text-[10px] font-semibold">
          <div className="flex items-center gap-1.5">
            <HelpCircle size={14} className="text-slate-400" />
            <span>Scores are based on our 6-Dimension Framework.</span>
            <a href="/#framework" className="text-brand-900 hover:underline">Learn more about how we evaluate portfolios →</a>
          </div>
          <a 
            href="mailto:support@vurdict.com?subject=Questions about my Vurdict portfolio score"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <MessageCircle size={14} />
            <span>Have questions about your score?</span>
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center">
              <Logo size="small" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              © 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex gap-6 font-semibold">
            <a href="/" className="hover:text-brand-900 transition-colors">Home</a>
            <a href="/#faq" className="hover:text-brand-900 transition-colors">FAQ</a>
          </div>
        </footer>
      </div>

    </div>
  );
}
