import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAnalysis, getScoreStatus, getScoreBand } from '../context/AnalysisContext';
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
  Share2,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Sparkle,
  Workflow,
  Microscope,
  SwatchBook,
  Feather,
  Target,
  ClipboardList
} from 'lucide-react';
import Navbar from '../components/Navbar';
import WaveDivider from '../components/WaveDivider';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state, resetAnalysis, toggleMockFallback } = useAnalysis();
  const [copied, setCopied] = useState(false);
  const [shareChip, setShareChip] = useState(null);
  const [animatedScores, setAnimatedScores] = useState({});
  const [animatedOverallScore, setAnimatedOverallScore] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const scoreBarsRef = useRef(null);

  const handleDownload = () => {
    const dims = [
      { label: 'Structural Logic', key: 'process_visibility' },
      { label: 'Critical Thinking', key: 'problem_framing' },
      { label: 'Visual Execution', key: 'visual_quality' },
      { label: 'Impact Evidence', key: 'outcome_impact' },
      { label: 'Narrative Tone', key: 'trust_cta' },
      { label: 'Positioning Clarity', key: 'niche_positioning' },
    ];

    const getScoreColor = (score) => {
      if (score >= 86) return '#8b5cf6';
      if (score >= 71) return '#059669';
      if (score >= 51) return '#2563eb';
      if (score >= 31) return '#d97706';
      return '#e11d48';
    };
    const getBandDesc = (score) => {
      if (score >= 86) return 'Represents outstanding quality and differentiation.';
      if (score >= 71) return 'Demonstrates strong execution and hiring readiness.';
      if (score >= 51) return 'Shows a solid foundation with room for improvement.';
      if (score >= 31) return 'Some fundamentals are present, but important gaps remain.';
      return 'Major weaknesses were identified. Substantial improvements are needed.';
    };
    const bandDesc = getBandDesc(report.overall_score);

    const dimRows = dims.map((d) => {
      const cat = report.categories[d.key];
      const score = cat?.score ?? 0;
      const color = getScoreColor(score);
      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b;font-weight:600;">${d.label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center;">
            <span class="score-badge" style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${color};background:${color}10;border:1px solid ${color}30;">${score}/100</span>
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${cat?.explanation || ''}</td>
        </tr>`;
    }).join('');

    const goalLabel = state.goal === 'win_clients' ? 'Win Freelance Clients' : 'Get Hired';
    const scoreColor = getScoreColor(report.overall_score);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vurdict Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @media (max-width: 480px) {
      .report-body { padding: 20px 16px !important; }
      .report-header { padding: 24px 16px !important; }
      .dim-table td, .dim-table th { padding: 8px !important; font-size: 11px !important; }
      .dim-table td:last-child { font-size: 11px !important; word-break: break-word; }
      .dim-table .score-badge { font-size: 10px !important; padding: 1px 6px !important; }
      .rec-card { padding: 16px !important; }
      .meta-table td { font-size: 12px !important; }
      .outer-wrap { padding: 0 12px !important; margin: 20px auto !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;font-family:'Poppins','Inter',system-ui,sans-serif;background:#f8fafc;color:#0f172a;">
  <div class="outer-wrap" style="max-width:720px;margin:40px auto;padding:0 20px;">

    <!-- Header -->
    <div class="report-header" style="background:#172554;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
      <div style="margin-bottom:12px;">
        <span style="font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.5px;">vurdict</span>
      </div>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Case Study Evaluation</h1>
    </div>

    <!-- Body -->
    <div class="report-body" style="background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:32px 40px;">

      <!-- Meta -->
      <table class="meta-table" style="width:100%;font-size:13px;border-collapse:collapse;">
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
          <span style="margin-top:8px;display:inline-block;padding:4px 16px;border-radius:999px;font-size:12px;font-weight:700;color:${scoreColor};background:${scoreColor}10;border:1px solid ${scoreColor}30;">${statusLabel}</span>
          <span style="margin-top:4px;font-size:11px;color:#94a3b8;font-weight:500;">${bandDesc}</span>
        </div>
      </div>

      <!-- Dimension Scores -->
      <h2 style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">Dimension Breakdown</h2>
      <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">How your case study scored across each evaluation dimension.</p>
      <table class="dim-table" style="width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
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
      <div class="rec-card" style="margin-top:28px;padding:20px 24px;background:#fffbeb;border:1px solid #fde68a;border-radius:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-size:16px;">⭐</span>
          <span style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;">Top Recommendation</span>
        </div>
        <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1e293b;">${report.fix_this_first?.title || 'Improve Your Portfolio'}</h3>
        <p style="margin:0;font-size:13px;color:#78716c;line-height:1.6;">${report.fix_this_first?.description || ''}</p>
        ${report.fix_this_first?.priority_score ? `<span style="display:inline-block;margin-top:10px;font-size:11px;font-weight:600;color:#92400e;">Priority Score: ${report.fix_this_first.priority_score}/10</span>` : ''}
      </div>

      <!-- Priority Action Plan -->
      ${report.priority_action_plan ? `
      <div style="margin-top:28px;">
        <h2 style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">Priority Action Plan</h2>
        <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">Ranked by impact — start here to improve your portfolio.</p>
        ${['critical_fixes', 'medium_priority', 'nice_to_have'].map((tier, ti) => {
          const tierLabels = ['Critical Fixes', 'Medium Priority', 'Nice-to-Have'];
          const tierColors = ['#e11d48', '#d97706', '#64748b'];
          const items = report.priority_action_plan[tier] || [];
          if (items.length === 0) return '';
          return `
            <div style="margin-bottom:12px;padding:16px 20px;border-radius:10px;border:1px solid ${tierColors[ti]}30;background:${tierColors[ti]}08;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:999px;background:${tierColors[ti]}15;border:1px solid ${tierColors[ti]}30;font-size:10px;font-weight:700;color:${tierColors[ti]};">${ti + 1}</span>
                <span style="font-size:11px;font-weight:700;color:${tierColors[ti]};text-transform:uppercase;letter-spacing:0.5px;">${tierLabels[ti]}</span>
              </div>
              ${items.map(item => `
                <div style="margin-bottom:6px;">
                  <div style="font-size:12px;font-weight:600;color:#1e293b;">${item.title}</div>
                  <div style="font-size:11px;color:#64748b;line-height:1.5;">${item.description}</div>
                </div>
              `).join('')}
            </div>
          `;
        }).join('')}
      </div>
      ` : ''}

      <!-- Footer -->
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f1f5f9;text-align:center;font-size:11px;color:#94a3b8;">
        <p style="margin:0;">Generated by <strong style="color:#172554;">Vurdict</strong> • AI Portfolio Feedback for Product Designers</p>
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

  const getShareUrl = () => {
    try {
      const payload = {
        url: state.url,
        goal: state.goal,
        experience: state.experience,
        report: state.report,
        isMock: state.isMock
      };
      const jsonString = JSON.stringify(payload);
      const utf8Bytes = new TextEncoder().encode(jsonString);
      let binString = '';
      for (let i = 0; i < utf8Bytes.length; i++) {
        binString += String.fromCharCode(utf8Bytes[i]);
      }
      const serialized = btoa(binString);
      return `${window.location.origin}/results?share=${serialized}`;
    } catch (e) {
      console.error('Failed to generate share link', e);
      return window.location.origin;
    }
  };

  const handleShare = () => {
    try {
      const shareUrl = getShareUrl();
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      const currentStatus = state.report ? getScoreStatus(state.report.overall_score) : 'Completed';
      setShareChip({ score: state.report?.overall_score, label: currentStatus });
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShareChip(null), 3000);
      console.error('Failed to copy link', e);
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const text = encodeURIComponent(`I just scored an ${state.report?.overall_score || 0}/100 on Vurdict for my Product Design portfolio! See if your portfolio is ready for hiring:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const shareUrl = getShareUrl();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleSavePdf = () => {
    window.print();
  };

  // Direct access safety: seed with mock if empty
  useEffect(() => {
    if (!state.report && state.status === 'idle') {
      toggleMockFallback();
    }
  }, [state.report, state.status, toggleMockFallback]);

  // Animate score bars when they scroll into view
  useEffect(() => {
    if (!scoreBarsRef.current || !state.report) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Calculate scoreboard inside effect to avoid dependency cycles or use state.report
          const cats = state.report.categories || {};
          const dims = [
            { slug: 'structural_logic', score: cats.process_visibility?.score || 88 },
            { slug: 'critical_thinking', score: cats.problem_framing?.score || 78 },
            { slug: 'visual_execution', score: cats.visual_quality?.score || 85 },
            { slug: 'impact_evidence', score: cats.outcome_impact?.score || 80 },
            { slug: 'narrative_tone', score: cats.trust_cta?.score || 82 },
            { slug: 'positioning_clarity', score: cats.niche_positioning?.score || 75 }
          ];
          dims.forEach((dim, i) => {
            setTimeout(() => {
              setAnimatedScores(prev => ({ ...prev, [dim.slug]: dim.score }));
            }, i * 90);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(scoreBarsRef.current);

    // Count up overall score
    const targetScore = state.report.overall_score;
    let startTimestamp = null;
    const duration = 1200; // 1.2s count up
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setAnimatedOverallScore(Math.floor(easeProgress * targetScore));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!state.report]);

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
    if (score >= 86) return { text: 'text-violet-600', border: 'border-violet-200', bg: 'bg-violet-50/50' };
    if (score >= 71) return { text: 'text-blue-600', border: 'border-blue-200', bg: 'bg-blue-50/50' };
    if (score >= 51) return { text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50/30' };
    if (score >= 31) return { text: 'text-orange-600', border: 'border-orange-200', bg: 'bg-orange-50/30' };
    return { text: 'text-rose-600', border: 'border-rose-200', bg: 'bg-rose-50/30' };
  };

  const overallColors = getColors(report.overall_score);

  // Map category slugs to labels and icons
  const categoriesList = [
    { key: 'process_visibility', label: 'Structural Logic', slug: 'structural_logic', icon: Workflow },
    { key: 'problem_framing', label: 'Critical Thinking', slug: 'critical_thinking', icon: Microscope },
    { key: 'visual_quality', label: 'Visual Execution', slug: 'visual_execution', icon: SwatchBook },
    { key: 'outcome_impact', label: 'Impact Evidence', slug: 'impact_evidence', icon: TrendingUp },
    { key: 'trust_cta', label: 'Narrative Tone', slug: 'narrative_tone', icon: Feather },
    { key: 'niche_positioning', label: 'Positioning Clarity', slug: 'positioning_clarity', icon: Target }
  ];

  // Map dimension scores to display on image 3
  const scoreboard = [
    { label: 'Structural Logic', score: report.categories.process_visibility?.score || 88, slug: 'structural_logic', icon: Workflow },
    { label: 'Critical Thinking', score: report.categories.problem_framing?.score || 78, slug: 'critical_thinking', icon: Microscope },
    { label: 'Visual Execution', score: report.categories.visual_quality?.score || 85, slug: 'visual_execution', icon: SwatchBook },
    { label: 'Impact Evidence', score: report.categories.outcome_impact?.score || 80, slug: 'impact_evidence', icon: TrendingUp },
    { label: 'Narrative Tone', score: report.categories.trust_cta?.score || 82, slug: 'narrative_tone', icon: Feather },
    { label: 'Positioning Clarity', score: report.categories.niche_positioning?.score || 75, slug: 'positioning_clarity', icon: Target }
  ];

  // Find lowest score slug for detailed view CTA button
  const sortedScoreboard = [...scoreboard].sort((a, b) => a.score - b.score);
  const lowestSlug = sortedScoreboard[0]?.slug || 'critical_thinking';

  // Dynamic strengths / weaknesses from category data
  const categoryMeta = {
    process_visibility: { label: 'Structural Logic', icon: Workflow },
    problem_framing: { label: 'Critical Thinking', icon: Microscope },
    visual_quality: { label: 'Visual Execution', icon: SwatchBook },
    outcome_impact: { label: 'Impact Evidence', icon: TrendingUp },
    trust_cta: { label: 'Narrative Tone', icon: Feather },
    niche_positioning: { label: 'Positioning Clarity', icon: Target },
  };

  const sortedCategories = Object.entries(report.categories || {})
    .map(([key, val]) => ({
      key,
      score: val.score,
      explanation: val.explanation,
      ...(categoryMeta[key] || { label: key, icon: Workflow }),
    }))
    .sort((a, b) => b.score - a.score);

  const topStrengths = sortedCategories.slice(0, 3);
  const bottomWeaknesses = sortedCategories.slice(-3).reverse();

  const readinessLevel =
    report.overall_score >= 71 ? 'High' :
    report.overall_score >= 51 ? 'Medium' : 'Low';

  const readinessWidth =
    report.overall_score >= 71 ? '100%' :
    report.overall_score >= 51 ? '66%' :
    report.overall_score >= 31 ? '33%' : '10%';

  const summaryText = report.summary || 'Your portfolio shows strong potential. With a few strategic improvements, you will be in a great position to stand out.';
  const scoreBand = getScoreBand(report.overall_score);

  const statusSummary =
    report.overall_score >= 86
      ? { title: 'Outstanding!', text: 'Your portfolio demonstrates exceptional quality and differentiation.' }
      : report.overall_score >= 71
        ? { title: 'Great work!', text: 'Your portfolio shows strong execution and hiring readiness.' }
        : report.overall_score >= 51
          ? { title: 'Solid foundation!', text: 'You have a good base. A few refinements can take it to the next level.' }
          : report.overall_score >= 31
            ? { title: 'Early stage.', text: 'Some fundamentals are present. Focus on closing the important gaps identified below.' }
            : { title: 'Significant gaps.', text: 'Major improvements are needed. Start with the critical fixes below.' };

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
      
      <div className="no-print">
        <Navbar />
      </div>

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
                Analyzed for <span className="text-sky-200 font-semibold">{state.goal === 'win_clients' ? 'winning freelance clients' : 'getting hired'}</span> — {state.experience === 'senior' ? 'Senior' : state.experience === 'mid' ? 'Mid-Level' : 'Junior'} calibration applied.
              </p>
            </div>

            {/* Action buttons (Download, Save, Share) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 w-full no-print">
              <button
                onClick={handleSavePdf}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-transparent rounded-xl text-xs font-medium text-brand-900 shadow-lg shadow-brand-950/10 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <Download size={14} className="text-brand-900" />
                <span>Save as PDF</span>
              </button>
              
              <button
                onClick={handleTwitterShare}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#000000] hover:bg-[#222222] border border-transparent rounded-xl text-xs font-medium text-white shadow-lg shadow-brand-950/10 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="12" height="12" className="fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.975H5.059z"></path></g></svg>
                <span>Share</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0a66c2] hover:bg-[#004182] border border-transparent rounded-xl text-xs font-medium text-white shadow-lg shadow-brand-950/10 transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" width="12" height="12" className="fill-current"><g><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></g></svg>
                <span>Share</span>
              </button>

              <div className="relative">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-[#1e3060] bg-[#121e48] hover:bg-[#162348] rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0 hover:scale-[1.02] active:scale-100"
                >
                  <Share2 size={14} />
                  <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
                {shareChip && (
                  <div className="absolute left-0 top-full mt-2 whitespace-nowrap flex items-center gap-1.5 bg-white border border-slate-200 shadow-lg rounded-xl px-3 py-1.5 text-[11px] font-medium text-slate-700 z-50">
                    <span>🔗</span>
                    <span>Score: <strong>{shareChip.score}</strong> · {shareChip.label} · Copied!</span>
                  </div>
                )}
              </div>
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
                  <div className="text-[10px] font-semibold text-white leading-none tracking-wide truncate drop-shadow-md">
                    {getHostname(state.url)}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">Domain Link</span>
                <a href={getSafeHref(state.url)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-900 hover:underline block truncate">{state.url || 'yourportfolio.com'}</a>
                <span className="text-[9px] text-slate-400 font-medium block pt-1">{formattedDateTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Score Card and scoreboard (Equal height layout) */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-20">
          {/* Column 1: Overall Score Card (lg:col-span-6) */}
          <div className="lg:col-span-6 animate-fade-in-up flex flex-col">
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center relative flex-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Overall Score</span>
              
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
                    strokeDashoffset={263.89 - (animatedOverallScore / 100) * 263.89}
                  />
                </svg>
                <div className="text-center flex flex-col items-center">
                  <span className="text-5xl font-bold text-slate-900 leading-none">{animatedOverallScore}</span>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">/ 100</span>
                </div>
              </div>

              <div className="mt-5 text-center space-y-1">
                <div className="relative inline-flex items-center gap-1.5">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${overallColors.border} ${overallColors.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${overallColors.text.replace('text-', 'bg-')}`} />
                    <span className={`text-xs font-semibold ${overallColors.text}`}>{statusLabel}</span>
                  </div>
                  <button
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                    onFocus={() => setTooltipVisible(true)}
                    onBlur={() => setTooltipVisible(false)}
                    className="h-4 w-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-400 text-[9px] font-bold transition-colors cursor-help"
                    aria-label="What does this score mean?"
                  >?</button>
                  {tooltipVisible && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-slate-900 text-white text-[11px] font-normal leading-relaxed rounded-xl px-3 py-2 shadow-xl z-50 pointer-events-none">
                      <p className="font-semibold text-white mb-0.5">{statusLabel}</p>
                      <p className="text-slate-300">{scoreBand.tooltip}</p>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-normal max-w-xs mx-auto">
                  {scoreBand.description}
                </p>
              </div>

              {/* Hiring readiness progress handle bar */}
              <div className="w-full mt-6 border-t border-slate-100 pt-5 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{state.goal === 'win_clients' ? 'Client Readiness' : 'Hiring Readiness'}</span>
                  <span className={readinessLevel === 'High' ? 'text-emerald-700 font-semibold' : readinessLevel === 'Medium' ? 'text-amber-700 font-semibold' : 'text-rose-700 font-semibold'}>{readinessLevel}</span>
                </div>
                <div className="relative h-2 rounded bg-slate-100 overflow-hidden flex">
                  <div className="h-full bg-blue-600 rounded transition-all" style={{ width: readinessWidth }} />
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-semibold uppercase tracking-wide">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed pt-1">
                  {summaryText}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Scores by Hiring Dimension (lg:col-span-6) */}
          <div className="lg:col-span-6 animate-fade-in-up flex flex-col">
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Scores by {state.goal === 'win_clients' ? 'Client' : 'Hiring'} Dimension
                </h3>

                <div className="space-y-1 pt-3" ref={scoreBarsRef}>
                  {scoreboard.map((dim) => {
                    const animW = animatedScores[dim.slug] ?? 0;
                    return (
                      <div 
                        key={dim.slug}
                        onClick={() => navigate(`/results/${dim.slug}`)}
                        className="group flex flex-col gap-1.5 cursor-pointer rounded-lg px-2 py-1.5 -mx-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 group-hover:text-brand-900 transition-colors group-hover:underline underline-offset-2">{dim.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-medium text-slate-900">{dim.score}/100</span>
                            <ArrowRight size={11} className="text-slate-300 group-hover:text-brand-900 transition-all group-hover:translate-x-0.5" />
                          </div>
                        </div>
                        <div className="w-full h-1.5 rounded bg-slate-100 overflow-hidden relative">
                          <div 
                            className="h-full bg-blue-600 rounded group-hover:bg-blue-700" 
                            style={{ width: `${animW}%`, transition: 'width 700ms cubic-bezier(0.22,1,0.36,1)' }} 
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
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase">
              <CheckCircle size={14} className="text-emerald-500" />
              <span>Top Strengths</span>
            </div>
            <div className="space-y-4">
              {topStrengths.map((str, i) => (
                <div key={i} className="flex gap-2">
                  <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-slate-900">{str.label}</h5>
                    <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{str.score}/100 • {str.explanation.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase">
              <AlertTriangle size={14} className="text-amber-500" />
              <span>Areas to Improve</span>
            </div>
            <div className="space-y-4">
              {bottomWeaknesses.map((weak, i) => (
                <div key={i} className="flex gap-2">
                  <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-slate-900">{weak.label}</h5>
                    <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{weak.score}/100 • {weak.explanation.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recommendation */}
          <div className="bg-blue-50/40 border border-blue-100 p-6 rounded-3xl text-left space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase">
                <Sparkles size={14} className="text-blue-600" />
                <span>Top Recommendation</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900">{fixFirst.title}</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                {fixFirst.description}
              </p>
            </div>

            {fixFirst.priority_score && (
              <div className="bg-white p-3 rounded-xl border border-slate-100 text-[10px] font-normal text-slate-500 flex gap-2">
                <TrendingUp size={14} className="text-blue-600 shrink-0" />
                <span>Priority score: <strong>{fixFirst.priority_score}/10</strong> • Focus on this first for the highest impact.</span>
              </div>
            )}

            <button
              onClick={() => navigate(`/results/${lowestSlug}`)}
              className="text-xs font-semibold text-brand-900 hover:text-brand-800 flex items-center gap-1.5 cursor-pointer self-start whitespace-nowrap shrink-0"
            >
              <span>See how to improve this →</span>
            </button>
          </div>

        </div>

        {/* Priority Action Plan */}
        <div className="max-w-7xl w-full mx-auto animate-fade-in-up mt-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList size={20} className="text-brand-900" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Priority Action Plan</h3>
                <p className="text-[10px] text-slate-400 font-medium">Ranked by impact — start here to improve your portfolio.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Critical Fixes */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase">
                  <span className="h-5 w-5 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-[10px] font-bold text-rose-600">1</span>
                  Critical Fixes
                </div>
                <p className="text-[9px] text-rose-600/70 font-medium">Highest impact. Most likely to affect outcomes.</p>
                <div className="space-y-3">
                  {(report.priority_action_plan?.critical_fixes || []).slice(0, 3).map((item, i) => (
                    <div key={i} className="space-y-0.5">
                      <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 font-normal leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medium Priority */}
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase">
                  <span className="h-5 w-5 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-600">2</span>
                  Medium Priority
                </div>
                <p className="text-[9px] text-amber-600/70 font-medium">Valuable enhancements that strengthen your case study.</p>
                <div className="space-y-3">
                  {(report.priority_action_plan?.medium_priority || []).slice(0, 3).map((item, i) => (
                    <div key={i} className="space-y-0.5">
                      <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 font-normal leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nice-to-Have */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                  <span className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-400">3</span>
                  Nice-to-Have
                </div>
                <p className="text-[9px] text-slate-400/70 font-medium">Optional refinements for further polish.</p>
                <div className="space-y-3">
                  {(report.priority_action_plan?.nice_to_have || []).slice(0, 3).map((item, i) => (
                    <div key={i} className="space-y-0.5">
                      <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                      <p className="text-[10px] text-slate-500 font-normal leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Action Banner */}
        <div className="max-w-7xl w-full mx-auto bg-brand-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up mt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3">
            <Trophy size={24} className="text-yellow-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold">Want a personalized action plan to improve your score?</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 md:mt-0">Get step-by-step recommendations tailored to your portfolio.</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/results/${lowestSlug}`)}
            className="rounded-xl bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 w-full md:w-auto mt-2 md:mt-0"
          >
            <span>View Detailed Recommendations</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="no-print">
        <Footer />
      </div>

    </div>
  );
}
