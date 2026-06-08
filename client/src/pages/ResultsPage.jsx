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
  FileText,
  X,
  Mail,
  Lock
} from 'lucide-react';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, resetAnalysis, toggleMockFallback } = useAnalysis();
  const [copied, setCopied] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveEmail, setSaveEmail] = useState('');
  const [saveSubmitted, setSaveSubmitted] = useState(false);

  const handleDownload = () => {
    const dims = [
      { label: 'Structural Logic', key: 'process_visibility' },
      { label: 'Critical Thinking', key: 'problem_framing' },
      { label: 'Visual Execution', key: 'visual_quality' },
      { label: 'Impact Evidence', key: 'outcome_impact' },
      { label: 'Narrative Tone', key: 'trust_cta' },
      { label: 'Positioning Clarity', key: 'niche_positioning' },
    ];

    const dimRows = dims.map((d) => {
      const cat = report.categories[d.key];
      const score = cat?.score ?? 0;
      const color = score >= 80 ? '#059669' : score >= 70 ? '#2563eb' : score >= 55 ? '#d97706' : '#e11d48';
      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b;font-weight:600;">${d.label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center;">
            <span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${color};background:${color}10;border:1px solid ${color}30;">${score}/100</span>
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${cat?.explanation || ''}</td>
        </tr>`;
    }).join('');

    const goalLabel = state.goal === 'win_clients' ? 'Win Freelance Clients' : 'Get Hired';
    const scoreColor = report.overall_score >= 80 ? '#059669' : report.overall_score >= 70 ? '#2563eb' : report.overall_score >= 55 ? '#d97706' : '#e11d48';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vurdict Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;font-family:'Inter',system-ui,sans-serif;background:#f8fafc;color:#0f172a;">
  <div style="max-width:720px;margin:40px auto;padding:0 20px;">

    <!-- Header -->
    <div style="background:#172554;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
      <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,0.12);font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.5px;">V</div>
        <span style="font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.3px;">vurdict</span>
      </div>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Portfolio Report</h1>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.6);">AI-Powered Portfolio Evaluation</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:32px 40px;">

      <!-- Meta -->
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748b;">URL</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${state.url || 'N/A'}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">Date</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${formattedDateTime}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">Goal</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${goalLabel}</td></tr>
        <tr><td style="padding:6px 0;border-bottom:2px solid #f1f5f9;color:#64748b;">Experience</td><td style="padding:6px 0;border-bottom:2px solid #f1f5f9;font-weight:500;color:#0f172a;">${state.experience || 'Junior'}</td></tr>
      </table>

      <!-- Overall Score -->
      <div style="text-align:center;padding:28px 0 24px;">
        <div style="display:inline-flex;flex-direction:column;align-items:center;">
          <span style="font-size:52px;font-weight:800;color:${scoreColor};line-height:1;">${report.overall_score}</span>
          <span style="font-size:13px;color:#94a3b8;font-weight:600;margin-top:2px;">out of 100</span>
          <span style="margin-top:8px;display:inline-block;padding:4px 16px;border-radius:999px;font-size:12px;font-weight:700;color:${scoreColor};background:${scoreColor}10;border:1px solid ${scoreColor}30;">${statusLabel} Portfolio</span>
        </div>
      </div>

      <!-- Dimension Scores -->
      <h2 style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">Dimension Breakdown</h2>
      <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">How your portfolio scored across each evaluation dimension.</p>
      <table style="width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Dimension</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Score</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Analysis</th>
          </tr>
        </thead>
        <tbody>${dimRows}</tbody>
      </table>

      <!-- Top Recommendation -->
      <div style="margin-top:28px;padding:20px 24px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:16px;">⭐</span>
          <span style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;">Top Recommendation</span>
        </div>
        <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1e293b;">${report.fix_this_first?.title || 'Improve Your Portfolio'}</h3>
        <p style="margin:0;font-size:13px;color:#78716c;line-height:1.6;">${report.fix_this_first?.description || ''}</p>
        ${report.fix_this_first?.priority_score ? `<span style="display:inline-block;margin-top:10px;font-size:11px;font-weight:600;color:#92400e;">Priority Score: ${report.fix_this_first.priority_score}/10</span>` : ''}
      </div>

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f1f5f9;text-align:center;font-size:11px;color:#94a3b8;">
        <p style="margin:0;">Generated by <strong style="color:#172554;">Vurdict</strong> — AI Portfolio Feedback for Product Designers</p>
        <p style="margin:4px 0 0;">vurdict.vercel.app</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vurdict-report-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (saveEmail.trim()) {
      setSaveSubmitted(true);
    }
  };

  const handleShare = () => {
    try {
      const payload = {
        url: state.url,
        goal: state.goal,
        experience: state.experience,
        report: state.report,
        isMock: state.isMock
      };
      
      // Safe UTF-8 to Base64 serialization
      const jsonString = JSON.stringify(payload);
      const utf8Bytes = new TextEncoder().encode(jsonString);
      let binString = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        binString += String.fromCharCode(utf8Bytes[i]);
      }
      const serialized = btoa(binString);
      const shareUrl = `${window.location.origin}/results?share=${serialized}`;
      
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to generate share link', e);
    }
  };

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

  const getSafeHref = (urlStr) => {
    if (!urlStr) return '#';
    try {
      const cleanUrl = /^https?:\/\//i.test(urlStr) ? urlStr : 'https://' + urlStr;
      const parsed = new URL(cleanUrl);
      if (['http:', 'https:'].includes(parsed.protocol)) {
        return parsed.toString();
      }
    } catch {}
    return '#';
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
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight text-balance">
                Your <span className="text-sky-300">Vurdict</span> Report Card
              </h1>
              <p className="mt-2 text-sky-100/70 text-xs sm:text-sm font-normal leading-relaxed text-balance">
                Here's how your portfolio performs across the six hiring dimensions.
              </p>
            </div>

            {/* Action buttons (Download, Save, Share) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 w-full">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-brand-900 shadow-lg shadow-brand-950/10 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <Download size={14} className="text-brand-900" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setSaveModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#1e3060] bg-[#121e48] hover:bg-[#162348] rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <Bookmark size={14} />
                <span>Save</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 border border-[#1e3060] bg-[#121e48] hover:bg-[#162348] rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <Share2 size={14} />
                <span>{copied ? 'Link Copied!' : 'Share Review'}</span>
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
                <a href={getSafeHref(state.url)} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-900 hover:underline block truncate">{state.url || 'yourportfolio.com'}</a>
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

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setSaveModalOpen(false); setSaveSubmitted(false); setSaveEmail(''); }} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
            <button
              onClick={() => { setSaveModalOpen(false); setSaveSubmitted(false); setSaveEmail(''); }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {!saveSubmitted ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-brand-900 flex items-center justify-center mb-5">
                  <Bookmark size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">Save Your Report</h3>
                <p className="text-sm text-slate-500 font-normal mb-6 leading-relaxed">
                  Create a free account to save your results and track your portfolio progress over time.
                </p>

                <form onSubmit={handleSaveSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Email address</label>
                    <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:border-brand-900/30 focus-within:bg-white transition-all">
                      <Mail size={16} className="text-slate-400 shrink-0" />
                      <input
                        type="email"
                        value={saveEmail}
                        onChange={(e) => setSaveEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-brand flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium cursor-pointer"
                  >
                    <Lock size={14} />
                    <span>Create Account & Save</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 font-normal text-center mt-4 leading-relaxed">
                  Already have an account?{' '}
                  <button className="text-brand-900 font-semibold hover:underline cursor-pointer">Log in</button>
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  <CheckCircle size={22} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">Check your inbox</h3>
                <p className="text-sm text-slate-500 font-normal leading-relaxed">
                  We sent a confirmation link to <strong className="text-slate-700 font-semibold">{saveEmail}</strong>. Click it to activate your account and save your report.
                </p>
                <button
                  onClick={() => { setSaveModalOpen(false); setSaveSubmitted(false); setSaveEmail(''); }}
                  className="w-full mt-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 py-3 text-sm font-medium transition-all cursor-pointer"
                >
                  Got it
                </button>
              </>
            )}
          </div>
        </div>
      )}

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
            <a href="/" className="hover:text-brand-900 transition-colors">Home</a>
            <a href="/#faq" className="hover:text-brand-900 transition-colors">FAQ</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
