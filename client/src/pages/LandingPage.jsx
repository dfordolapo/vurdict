import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Link2, Briefcase, Users, TrendingUp, Shield, Zap,
  CheckCircle, Star, ChevronDown, ChevronUp, BarChart2, Eye,
  Target, Layers, BookOpen, Code2, Award, Quote, ExternalLink,
  SparkleIcon, Sparkles
} from 'lucide-react'

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-shadow">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">Vurdict</span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Framework', href: '#framework' },
            { label: 'Report Card', href: '#report-card' },
            { label: 'FAQ', href: '#faq' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/analyze"
          className="btn-gradient hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
        >
          <span>Analyze Portfolio</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </nav>
  )
}

/* ─── HERO SECTION ─── */
function HeroSection() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')

  return (
    <section className="relative min-h-screen flex items-center grid-bg overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 mb-8 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-dot" />
              <span className="text-indigo-300 text-xs font-medium">AI-Powered · No Signup · Free</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6 animate-fade-in-up-1">
              See Your Portfolio
              <br />
              Through a{' '}
              <span className="gradient-text">Hiring Manager's</span>
              <br />
              Eyes
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 animate-fade-in-up-2 max-w-lg">
              Paste your portfolio URL and get a structured, goal-aware audit in under 60 seconds — scored across six dimensions by an AI calibrated to think like a Senior Design Lead.
            </p>

            {/* URL input + CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in-up-3">
              <div className="flex-1 relative">
                <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && url && navigate('/analyze')}
                  placeholder="https://yourportfolio.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl glass border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                onClick={() => navigate('/analyze')}
                className="btn-gradient flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm whitespace-nowrap"
              >
                <Sparkles size={15} />
                <span>Analyze Portfolio</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up-3">
              {[
                { icon: Shield, text: 'No signup required' },
                { icon: Zap, text: 'Results in 60 seconds' },
                { icon: CheckCircle, text: 'Any portfolio URL works' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Icon size={12} className="text-indigo-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating mockup */}
          <div className="relative hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <a href="#problem" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group">
        <span className="text-xs font-medium">See how it works</span>
        <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  )
}

/* ─── HERO VISUAL ─── */
function HeroVisual() {
  const dimensions = [
    { label: 'Problem Framing', score: 88, color: '#6366f1', angle: 0 },
    { label: 'Process Visibility', score: 75, color: '#8b5cf6', angle: 60 },
    { label: 'Outcome & Impact', score: 62, color: '#a78bfa', angle: 120 },
    { label: 'Visual Quality', score: 85, color: '#6366f1', angle: 180 },
    { label: 'Niche & Positioning', score: 70, color: '#8b5cf6', angle: 240 },
    { label: 'Trust & CTA', score: 80, color: '#a78bfa', angle: 300 },
  ]

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Central card */}
      <div className="absolute inset-16 glass-strong rounded-2xl glow-indigo flex flex-col items-center justify-center p-6 animate-float-slow">
        <div className="relative mb-3">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="6" />
            <circle
              cx="40" cy="40" r="32" fill="none"
              stroke="url(#heroGrad)" strokeWidth="6"
              strokeLinecap="round" strokeDasharray="201" strokeDashoffset="50"
              transform="rotate(-90 40 40)"
            />
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-black text-white">82</span>
          </div>
        </div>
        <div className="text-xs text-indigo-300 font-semibold mb-0.5">Overall Score</div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-300 text-xs font-medium">Strong Portfolio</span>
        </div>
      </div>

      {/* Orbiting score chips */}
      {dimensions.map((dim, i) => {
        const rad = (dim.angle * Math.PI) / 180
        const r = 44
        const x = 50 + r * Math.cos(rad)
        const y = 50 + r * Math.sin(rad)
        return (
          <div
            key={dim.label}
            className="absolute glass rounded-lg px-2 py-1 text-center"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
              animation: 'float 4s ease-in-out infinite',
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div className="text-xs font-bold" style={{ color: dim.color }}>{dim.score}</div>
            <div className="text-[9px] text-slate-400 whitespace-nowrap">{dim.label.split(' ')[0]}</div>
          </div>
        )
      })}

      {/* Orbit ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[88%] h-[88%] rounded-full border border-indigo-500/10 border-dashed" />
      </div>
    </div>
  )
}

/* ─── PROBLEM SECTION ─── */
function ProblemSection() {
  const before = [
    ['Friends & Community', 'Too nice', '"Looks great!" (no specifics)', 'Generic praise'],
    ['Generic AI (ChatGPT)', 'Too vague', '"Consider adding outcomes"', 'No design rubric'],
    ['Mentor Sessions', 'Too slow', 'Inconsistent advice', 'Weeks of wait'],
    ['Portfolio Builders', 'No feedback', 'Templates, not critique', 'Wrong tool entirely'],
  ]
  const after = [
    'Scored against a 6-dimension professional rubric',
    'Goal-aware: different lens for "Get Hired" vs "Win Clients"',
    'Specific, direct feedback — not generic suggestions',
    'Results in 60 seconds, anytime',
  ]

  return (
    <section id="problem" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            Most portfolio feedback is{' '}
            <span className="relative">
              <span className="text-red-400 line-through decoration-red-400/60">too vague</span>
            </span>{' '}
            to be helpful
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            You've been getting feedback for months. But nothing is translating to interviews.
            Here's why — and what Vurdict does differently.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Before */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-red-300 text-sm font-semibold">Current Feedback Options</span>
              </div>
            </div>
            <div className="p-2">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {['Source', 'Problem', 'Example Feedback', 'Result'].map(h => (
                      <th key={h} className="text-left px-4 py-2 text-slate-500 text-xs font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {before.map((row, i) => (
                    <tr key={i} className="border-t border-slate-800/60">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* After */}
          <div className="glass rounded-2xl overflow-hidden gradient-border">
            <div className="px-6 py-4 border-b border-indigo-500/20 bg-indigo-500/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-indigo-300 text-sm font-semibold">Vurdict — The Audit You Need</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {after.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={11} className="text-indigo-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
              <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-indigo-200 text-sm italic">
                  "I went from 0 interviews in 3 months to 4 callbacks in 2 weeks — after fixing just the one thing Vurdict flagged."
                </p>
                <p className="text-slate-500 text-xs mt-2">— Product Designer, London</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS ─── */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Paste Your URL',
      desc: 'Drop in your portfolio link — Behance, Notion, Framer, personal site, anything publicly accessible.',
      color: 'indigo',
    },
    {
      number: '02',
      icon: Target,
      title: 'Set Your Goal',
      desc: 'Tell us what you\'re optimizing for: landing a full-time role, winning freelance clients, or improving your overall portfolio.',
      color: 'violet',
    },
    {
      number: '03',
      icon: BarChart2,
      title: 'Get Your Report',
      desc: 'Receive a full six-dimension breakdown with scores, detailed explanations, and your single highest-impact fix.',
      color: 'purple',
    },
  ]

  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 mb-5">
            <Zap size={12} className="text-indigo-400" />
            <span className="text-indigo-300 text-xs font-medium">Portfolio Feedback in Minutes</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            Three steps to your{' '}
            <span className="gradient-text">honest audit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No forms. No account. No wait. Paste, select, receive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector lines */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-indigo-500/30" />

          {steps.map((step, i) => (
            <div key={i} className="glass rounded-2xl p-6 relative group hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
              {/* Number */}
              <div className="text-5xl font-black text-slate-800 absolute top-4 right-5 select-none">{step.number}</div>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl mb-5 flex items-center justify-center
                ${step.color === 'indigo' ? 'bg-indigo-500/20 border border-indigo-500/30' :
                  step.color === 'violet' ? 'bg-violet-500/20 border border-violet-500/30' :
                  'bg-purple-500/20 border border-purple-500/30'}`}>
                <step.icon size={20} className={
                  step.color === 'indigo' ? 'text-indigo-400' :
                  step.color === 'violet' ? 'text-violet-400' : 'text-purple-400'
                } />
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FRAMEWORK SECTION ─── */
function FrameworkSection() {
  const dimensions = [
    {
      icon: Target,
      label: 'Problem Framing',
      desc: 'Does your portfolio clearly explain the problem being solved — with context, research, and a clear hypothesis?',
      weight_hired: 'High',
      weight_freelance: 'Medium',
    },
    {
      icon: Layers,
      label: 'Process Visibility',
      desc: 'Do you show how decisions were made? Failed iterations, user testing insights, and trade-offs made under constraints.',
      weight_hired: 'High',
      weight_freelance: 'Low',
    },
    {
      icon: BarChart2,
      label: 'Outcome & Impact',
      desc: 'Does your work show measurable or observable results? Specific metrics, quotes, or conversion improvements.',
      weight_hired: 'High',
      weight_freelance: 'Medium',
    },
    {
      icon: Eye,
      label: 'Visual Quality',
      desc: 'Does your portfolio communicate professionalism? Typography, spacing, color theory, and premium attention to detail.',
      weight_hired: 'Medium',
      weight_freelance: 'High',
    },
    {
      icon: BookOpen,
      label: 'Niche & Positioning',
      desc: 'Do you communicate a clear area of focus? A strong niche beats a generic "I design anything" portfolio every time.',
      weight_hired: 'Medium',
      weight_freelance: 'High',
    },
    {
      icon: Award,
      label: 'Trust & CTA',
      desc: 'Does your portfolio establish credibility and provide a clear next step? Testimonials, company logos, and a strong call-to-action.',
      weight_hired: 'Low',
      weight_freelance: 'High',
    },
  ]

  const weightColor = (w) =>
    w === 'High' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
    w === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
    'text-slate-400 bg-slate-800 border-slate-700'

  return (
    <section id="framework" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-violet-500/30 mb-5">
            <Layers size={12} className="text-violet-400" />
            <span className="text-violet-300 text-xs font-medium">The 6-Dimension Evaluation Framework</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            An audit calibrated to{' '}
            <span className="gradient-text">real hiring signals</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every dimension is weighted differently based on your goal.
            What a hiring manager cares about differs from what a freelance client needs to see.
          </p>
        </div>

        {/* Goal legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Briefcase size={13} className="text-indigo-400" />
            <span>Get Hired weight →</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Users size={13} className="text-violet-400" />
            <span>Win Freelance Clients weight →</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimensions.map((dim, i) => (
            <div key={i} className="glass rounded-2xl p-5 hover:-translate-y-1 hover:border-indigo-500/25 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center group-hover:bg-indigo-500/25 transition-colors">
                  <dim.icon size={17} className="text-indigo-400" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${weightColor(dim.weight_hired)}`}>
                    Hired: {dim.weight_hired}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${weightColor(dim.weight_freelance)}`}>
                    Freelance: {dim.weight_freelance}
                  </span>
                </div>
              </div>
              <h3 className="text-white font-bold mb-2">{dim.label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{dim.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── REPORT CARD PREVIEW ─── */
function ReportCardSection() {
  const scores = [
    { label: 'Problem Framing', score: 88, icon: Target },
    { label: 'Process Visibility', score: 85, icon: Layers },
    { label: 'Outcome & Impact', score: 62, icon: BarChart2 },
    { label: 'Business Impact', score: 80, icon: TrendingUp },
    { label: 'Narrative Clarity', score: 72, icon: BookOpen },
    { label: 'Technical Execution', score: 82, icon: Code2 },
  ]

  const scoreColor = (s) =>
    s >= 80 ? '#22c55e' : s >= 65 ? '#f59e0b' : '#ef4444'

  return (
    <section id="report-card" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 mb-5">
            <Award size={12} className="text-indigo-400" />
            <span className="text-indigo-300 text-xs font-medium">The Vurdict Report Card</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            Every dimension.{' '}
            <span className="gradient-text">Every score. Every fix.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Not just a number. A full breakdown of what's working, what isn't, and exactly what to do next.
          </p>
        </div>

        {/* Mock report card */}
        <div className="glass-strong rounded-3xl overflow-hidden glow-indigo max-w-4xl mx-auto animate-float-slow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="text-white font-semibold">Vurdict</span>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            {/* Left: title + thumbnail */}
            <div>
              <h3 className="text-white font-black text-lg mb-1">Your Portfolio Report Card</h3>
              <p className="text-slate-500 text-xs mb-4">Here's how your portfolio performs across six dimensions.</p>
              <div className="glass rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-8 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                    <Eye size={10} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-medium">yourportfolio.com</div>
                    <div className="text-slate-500 text-[10px]">Analyzed May 18, 2025 · 2:34 PM</div>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-3 bg-indigo-500/5 border border-indigo-500/15">
                <Sparkles size={13} className="text-indigo-400 mb-2" />
                <p className="text-slate-300 text-xs leading-relaxed">
                  Great work! Your portfolio shows strong potential. A few strategic improvements will get you shortlisted.
                </p>
              </div>
            </div>

            {/* Center: score ring */}
            <div>
              <div className="text-slate-400 text-xs mb-3 font-medium">Overall Score</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="5" />
                    <circle
                      cx="36" cy="36" r="28" fill="none"
                      stroke="url(#rcGrad)" strokeWidth="5"
                      strokeLinecap="round" strokeDasharray="176" strokeDashoffset="32"
                      transform="rotate(-90 36 36)"
                    />
                    <defs>
                      <linearGradient id="rcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-white">82</span>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">82<span className="text-slate-500 text-base">/100</span></div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-300 text-[10px] font-medium">Strong Portfolio</span>
                  </div>
                </div>
              </div>

              {/* Hiring readiness */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Hiring Readiness</span>
                  <span className="text-emerald-400 font-semibold">High</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>Low</span><span>Medium</span><span>High</span>
                </div>
              </div>

              {/* Top strengths */}
              <div className="space-y-1.5">
                {['Clear Visual Design', 'Strong Case Studies'].map(s => (
                  <div key={s} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle size={11} className="text-emerald-400 shrink-0" />
                    {s}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs text-amber-300">
                  <div className="w-2.5 h-2.5 rounded-full border border-amber-400/50 flex items-center justify-center shrink-0">
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                  </div>
                  Deeper Impact Metrics needed
                </div>
              </div>
            </div>

            {/* Right: dimension scores */}
            <div>
              <div className="text-slate-400 text-xs mb-3 font-medium">Scores by Dimension</div>
              <div className="space-y-2.5">
                {scores.map(({ label, score, icon: Icon }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Icon size={10} className="text-slate-500" />
                        <span className="text-slate-300 text-[11px]">{label}</span>
                      </div>
                      <span className="text-[11px] font-bold" style={{ color: scoreColor(score) }}>{score}/100</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score}%`, backgroundColor: scoreColor(score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Fix this first */}
              <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={10} className="text-indigo-400" />
                  <span className="text-indigo-300 text-[10px] font-semibold">Top Recommendation</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-snug">
                  Add specific metrics to your case studies — portfolios with strong impact data are 3.4× more likely to be shortlisted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I'd been applying for 3 months with zero callbacks. Vurdict told me my Outcome & Impact scores were tanking my portfolio. Two days of fixes later — four interview requests.",
      name: 'Adaeze O.',
      role: 'Junior Product Designer',
      location: 'Lagos → London',
      score: 82,
    },
    {
      quote: "The goal-aware scoring is genius. As a freelancer, I didn't need better process docs — I needed stronger trust signals. Vurdict pointed me exactly there.",
      name: 'Marcus T.',
      role: 'Freelance UI/UX Designer',
      location: 'Berlin',
      score: 76,
    },
    {
      quote: "This is what I was booking ADPList sessions for — except instant, consistent, and actually structured. The Fix This First recommendation alone was worth it.",
      name: 'Priya K.',
      role: 'Mid-Level Product Designer',
      location: 'Bangalore → Remote',
      score: 91,
    },
  ]

  return (
    <section className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-indigo-500/30 mb-5">
            <Star size={12} className="text-yellow-400" />
            <span className="text-indigo-300 text-xs font-medium">Designer Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            From{' '}
            <span className="text-slate-500 line-through decoration-slate-500/50">invisible</span>
            {' '}to{' '}
            <span className="gradient-text">shortlisted</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all">
              <div>
                <Quote size={20} className="text-indigo-400/50 mb-4" />
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                  <div className="text-slate-600 text-xs">{t.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black gradient-text">{t.score}</div>
                  <div className="text-slate-600 text-[10px]">/100 score</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQSection() {
  const [open, setOpen] = useState(null)

  const faqs = [
    {
      q: 'What kinds of portfolio URLs does Vurdict support?',
      a: 'Any publicly accessible URL works — Behance, Dribbble, Notion, Framer, Webflow, personal websites, or a direct link to a case study. The only requirement is that the content is publicly viewable without a login.',
    },
    {
      q: 'How is Vurdict different from just asking ChatGPT to review my portfolio?',
      a: 'Generic AI has no design rubric, no professional calibration, and no goal-awareness. Vurdict\'s AI is instructed to act as a Senior Design Lead at a top-tier company, scored against a specific 6-dimension framework, and weighted differently depending on whether you want to get hired or win freelance clients.',
    },
    {
      q: 'Is my portfolio data stored or shared?',
      a: 'No. We only analyze your publicly available content. No data is stored, shared, or used for training. Your portfolio URL and results are not persisted beyond your current session.',
    },
    {
      q: 'What does "Fix This First" mean?',
      a: '"Fix This First" is your single highest-priority recommendation — the one change most likely to improve your score relative to your specific goal. Instead of a list of 20 things, we identify the one bottleneck holding you back.',
    },
    {
      q: 'How accurate is the AI scoring?',
      a: 'Vurdict uses Claude (Anthropic\'s frontier AI model) with a carefully designed prompt calibrated against a professional design rubric. It is not a substitute for a human mentor, but it is significantly more structured, consistent, and goal-aware than any generic AI tool.',
    },
    {
      q: 'Is Vurdict free?',
      a: 'Yes — the MVP is completely free, no account required. You get your full report instantly.',
    },
  ]

  return (
    <section id="faq" className="py-28 relative">
      <div className="section-divider mb-28" />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-5 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-lg">Everything you need to know before you hit Analyze.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-xl overflow-hidden transition-all ${open === i ? 'border-indigo-500/30' : ''}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                {open === i ? (
                  <ChevronUp size={16} className="text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-slate-500 shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL CTA SECTION ─── */
function FinalCTASection() {
  const navigate = useNavigate()

  const floatingCards = [
    { url: 'amaka.design', score: 91, label: 'Strong Portfolio', color: '#22c55e' },
    { url: 'marcus-ux.com', score: 63, label: 'Needs Work', color: '#f59e0b' },
    { url: 'priya.notion.site', score: 78, label: 'Good', color: '#6366f1' },
    { url: 'chen-design.io', score: 55, label: 'Improve Now', color: '#ef4444' },
    { url: 'studio.lena.me', score: 88, label: 'Strong', color: '#22c55e' },
  ]

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="section-divider mb-0" />

      {/* Dark hero bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Floating portfolio cards */}
        <div className="relative h-48 mb-12">
          {floatingCards.map((card, i) => {
            const positions = [
              { left: '5%', top: '10%' },
              { left: '20%', top: '60%' },
              { left: '40%', top: '20%' },
              { left: '65%', top: '55%' },
              { left: '80%', top: '15%' },
            ]
            const pos = positions[i]
            return (
              <div
                key={card.url}
                className="absolute glass rounded-xl px-3 py-2 text-left"
                style={{
                  ...pos,
                  animation: `float ${3.5 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <div className="text-[10px] text-slate-400 mb-0.5">{card.url}</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-white">{card.score}</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ color: card.color, background: `${card.color}15` }}>
                    {card.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <h2 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">
          See What Hirers See
          <br />
          <span className="gradient-text">Before They Do</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
          Stop guessing why your portfolio isn't landing interviews. Get the objective audit you've been waiting for — free, instant, no signup.
        </p>

        <button
          onClick={() => navigate('/analyze')}
          className="btn-gradient inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg shimmer"
        >
          <Sparkles size={18} />
          <span>Analyze My Portfolio →</span>
        </button>

        <p className="text-slate-600 text-xs mt-4">No signup required · Free · Results in 60 seconds</p>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">V</span>
          </div>
          <span className="text-slate-400 text-sm">Vurdict</span>
        </div>
        <p className="text-slate-600 text-xs text-center">
          The brutal honesty of a Senior Design Lead · Instant · Free
        </p>
        <p className="text-slate-700 text-xs">© 2025 Vurdict</p>
      </div>
    </footer>
  )
}

/* ─── LANDING PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FrameworkSection />
        <ReportCardSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
