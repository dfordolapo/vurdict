import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Link2, Briefcase, Users, Shield, Zap,
  CheckCircle, Star, ChevronDown, ChevronUp, BarChart2, Eye,
  Target, Layers, BookOpen, Code2, Award, Quote, Sparkles,
  Compass, Brain, Palette, FileText, Terminal, Menu, X
} from 'lucide-react'
import heroIllustration from '../assets/hero-illustration.png'
import ctaIllustration from '../assets/cta-illustration.jpg'

/* ─── WAVE COMPONENTS ─── */
function WaveDivider({ fill = '#172554', flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180 -mt-1' : '-mb-px'}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[80px]">
        <path d="M0,0 Q360,90 720,30 Q1080,90 1440,0 L1440,120 L0,120 Z" fill={fill} />
      </svg>
    </div>
  )
}


/* ─── LOGO COMPONENT ─── */
function Logo({ size = "normal" }) {
  const isNormal = size === "normal";
  return (
    <div className="flex items-center gap-2 group cursor-pointer select-none">
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={isNormal ? "w-10 h-8" : "w-8 h-6"}>
        {/* Shadow/Glow under bubble */}
        <ellipse cx="58" cy="32" rx="18" ry="14" fill="rgba(23,37,84,0.06)" />
        
        {/* V checkmark shape with professional filled path and stroke rounding for smooth corners */}
        <path
          d="M20 20 H34 L50 54 H60 L72 34 H86 L66 74 H42 Z"
          fill="#172554"
          stroke="#172554"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        
        {/* Speech bubble touching the inner checkmark vertex */}
        <path
          d="M58 44c9 0 16-5.5 16-12s-7-12-16-12-16 5.5-16 12c0 2.8 1.3 5.3 3.3 7.1L38 48l8.5-3.3c3.6 2 8 3.3 13.5 3.3z"
          fill="#172554"
          stroke="#172554"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Curved double quotes inside the speech bubble */}
        <path
          d="M52 29c0-1.5.7-2.6 2-2.6s2 1.1 2 2.6c0 3-2 4.8-3.5 6l-1.2-1.2c1-1 1.7-2 1.7-3h-1zm6.5 0c0-1.5.7-2.6 2-2.6s2 1.1 2 2.6c0 3-2 4.8-3.5 6l-1.2-1.2c1-1 1.7-2 1.7-3h-1z"
          fill="white"
        />
      </svg>
      <span className={`text-slate-900 font-extrabold tracking-tight ${isNormal ? 'text-xl' : 'text-base'}`}>
        Vurdict<span className="text-brand-900">:</span>
      </span>
    </div>
  )
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Framework', href: '#framework' },
    { label: 'Report Card', href: '#report-card' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Logo size="normal" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-600 hover:text-brand-900 text-sm font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="/analyze"
            className="btn-brand flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold group"
          >
            <span>Analyze Portfolio</span>
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
              <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-600 hover:text-brand-900 text-sm font-semibold transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─── HERO VISUAL (Top Illustration) ─── */
function HeroVisual() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 px-4 animate-fade-in-up">
      <img
        src={heroIllustration}
        alt="Vurdict Portfolio Evaluation"
        className="w-full h-auto object-contain select-none"
        loading="eager"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      />
    </div>
  )
}

/* ─── HERO SECTION ─── */
function HeroSection() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [goal, setGoal] = useState('hired')

  return (
    <section className="relative bg-white pt-24 pb-0 overflow-hidden">
      {/* Top Illustration Showcase */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <HeroVisual />
      </div>

      {/* Top Wave (Transition from White to Navy) */}
      <WaveDivider fill="#172554" flip={false} />

      {/* Navy blue container */}
      <div className="bg-brand-900 py-20 px-6 text-center text-white relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6">
            See Your Portfolio Through<br />
            a <span className="text-sky-300">Hiring Manager's</span> Eyes
          </h1>
          <p className="text-sky-100/70 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium">
            Paste your portfolio URL and get a structured, goal-aware audit scored across six dimensions in minutes.
          </p>

          {/* Form container */}
          <div className="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto text-slate-900">
            <div className="flex-1 flex items-center gap-2.5 px-3">
              <Link2 size={18} className="text-slate-400 shrink-0" />
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && url && navigate(`/analyze?url=${encodeURIComponent(url)}&goal=${goal}`)}
                placeholder="https://yourportfolio.com"
                className="w-full py-2 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            
            {/* Goal Select */}
            <div className="border-t md:border-t-0 md:border-l border-slate-100 px-3 py-2 md:py-0 flex items-center shrink-0">
              <select
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none cursor-pointer w-full md:w-auto"
              >
                <option value="hired">Goal: Get Hired</option>
                <option value="clients">Goal: Win Clients</option>
                <option value="audit">Goal: General Improvement</option>
              </select>
            </div>

            <button
              onClick={() => url && navigate(`/analyze?url=${encodeURIComponent(url)}&goal=${goal}`)}
              className="bg-brand-900 text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs hover:bg-brand-800 transition-colors group"
            >
              <div className="rounded-lg p-1 transition-all duration-200 group-hover:bg-white/10 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]">
                <Sparkles size={14} className="transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <span>Analyze Portfolio</span>
            </button>
          </div>

          {/* Bullet sub-badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: Shield, text: 'No signup required' },
              { icon: Zap, text: 'Results in minutes' },
              { icon: CheckCircle, text: 'Any portfolio URL works' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sky-200/60 text-xs font-semibold group">
                <div className="rounded-lg p-1.5 transition-all duration-200 group-hover:bg-white/10 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                  <Icon size={13} className="text-sky-300 transition-all duration-200 group-hover:text-white group-hover:scale-110" />
                </div>
                <span className="transition-colors duration-200 group-hover:text-sky-200">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave (Transition from Navy to White) */}
      <WaveDivider fill="#172554" flip={true} />
    </section>
  )
}

/* ─── COMPARISON SECTION ─── */
function ProblemSection() {
  const features = [
    { name: 'Specific Score Rubric', friends: 'No', chatgpt: 'No', builders: 'No', vurdict: 'Yes' },
    { name: 'Goal-Aware Context', friends: 'No', chatgpt: 'Partial', builders: 'No', vurdict: 'Yes' },
    { name: 'Actionable Design Fixes', friends: 'Vague', chatgpt: 'Generic', builders: 'No', vurdict: 'Yes' },
    { name: 'Speed & Availability', friends: 'Weeks', chatgpt: 'Instant', builders: 'None', vurdict: 'In Minutes' },
    { name: 'Cost', friends: 'Free', chatgpt: 'Free', builders: '$15+/mo', vurdict: '100% Free' },
  ]

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
            Most portfolio feedback is <br />
            <span className="text-red-500 line-through decoration-red-300">too vague</span> to be helpful
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Vurdict replaces the guesswork with a structured evaluation so you can improve with confidence.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Table (Left column) */}
          <div className="lg:col-span-8 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Features</th>
                    <th className="pb-4 text-xs font-bold text-slate-500">Friends</th>
                    <th className="pb-4 text-xs font-bold text-slate-500">ChatGPT</th>
                    <th className="pb-4 text-xs font-bold text-slate-500">Builders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {features.map((f, i) => (
                    <tr key={i} className="hover:bg-slate-100/10 transition-colors">
                      <td className="py-4 text-xs font-bold text-slate-700">{f.name}</td>
                      <td className="py-4 text-xs text-slate-500">{f.friends}</td>
                      <td className="py-4 text-xs text-slate-500">{f.chatgpt}</td>
                      <td className="py-4 text-xs text-slate-500">{f.builders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vurdict Card (Right column) */}
          <div className="lg:col-span-4 bg-blue-50/80 rounded-2xl border border-blue-100 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-900/10 text-brand-900 text-[10px] font-bold mb-4 group hover:bg-brand-900/20 transition-colors cursor-default">
                <div className="rounded p-0.5 transition-all duration-200 group-hover:bg-brand-900/20 group-hover:shadow-[0_0_8px_rgba(23,37,84,0.15)]">
                  <Sparkles size={10} className="transition-all duration-200 group-hover:scale-125 group-hover:rotate-12" />
                </div>
                <span>The Vurdict Standard</span>
              </div>
              <h3 className="text-slate-900 font-extrabold text-lg mb-2">Vurdict Report Card</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Objective scoring, deep structural analysis, and specific visual instructions compiled in under a minute.
              </p>
            </div>
            
            <ul className="space-y-3">
              {['6-dimension rubric analysis', 'Targeted goal alignment', 'Immediate visual pointers', 'No login required'].map((text, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-brand-900 group cursor-default">
                  <div className="rounded-lg p-1 transition-all duration-200 group-hover:bg-sky-100 group-hover:shadow-[0_0_8px_rgba(2,132,199,0.15)]">
                    <CheckCircle size={14} className="text-sky-600 shrink-0 transition-all duration-200 group-hover:text-sky-500 group-hover:scale-110" />
                  </div>
                  <span className="transition-colors duration-200 group-hover:text-sky-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── HOW IT WORKS (Steps) ─── */
function HowItWorksSection() {
  const steps = [
    {
      num: '1',
      title: 'Paste URL',
      desc: 'Submit your live portfolio or case study link.',
    },
    {
      num: '2',
      title: 'Choose Goal',
      desc: "Tell us if you're job hunting or trying to win freelance clients.",
    },
    {
      num: '3',
      title: 'Receive Review',
      desc: (
        <>
          Receive your comprehensive <strong className="font-bold text-slate-800">Vurdict</strong> Report Card.
        </>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-100/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
            Portfolio Feedback in <span className="text-[#3b82f6]">Minutes</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Identify the changes most likely to improve your chances of getting noticed
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start flex-1 justify-center w-full">
              <div className="flex-1 flex flex-col items-center text-center max-w-[260px] md:max-w-none w-full">
                <div className="w-8 h-8 rounded-xl bg-blue-50/80 border border-blue-100/60 text-blue-600 flex items-center justify-center font-bold text-xs mb-4">
                  {step.num}
                </div>
                <h3 className="text-slate-900 font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
              </div>
              
              {/* Arrow spacer for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center pt-8 text-slate-400 px-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
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
      icon: Compass,
      title: 'Structural Logic',
      desc: 'Evaluates the flow of your case study, ensuring problem statements connect logically to delivered solutions.',
    },
    {
      icon: Brain,
      title: 'Critical Thinking',
      desc: 'Checks for evidence of research-driven decisions rather than purely aesthetic choices.',
    },
    {
      icon: Palette,
      title: 'Visual Execution',
      desc: 'Analysis of spacing, typography, hierarchy, and adherence to modern UI principles and accessibility.',
    },
    {
      icon: BarChart2,
      title: 'Impact Evidence',
      desc: 'Scans for quantifiable metrics and business outcomes that demonstrate the value of your work.',
    },
    {
      icon: FileText,
      title: 'Narrative Tone',
      desc: 'Assesses professional voice and clarity, ensuring your writing is concise yet persuasive.',
    },
    {
      icon: Terminal,
      title: 'Positioning Clarity',
      desc: 'Verifies whether the portfolio communicates who the designer is and what they specialize in.',
    },
  ]

  return (
    <section id="framework" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
            The 6-Dimension Evaluation Framework
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We review what actually determines your portfolio's success
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dimensions.map((dim, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-md hover:border-blue-100 transition-all flex flex-col text-left group">
              <div className="w-fit rounded-xl p-2.5 bg-blue-50/50 border border-blue-100/50 transition-all duration-200 group-hover:bg-blue-100 group-hover:border-blue-200 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]">
                <dim.icon size={20} className="text-blue-600 transition-all duration-200 group-hover:text-blue-500 group-hover:scale-110" />
              </div>
              <h3 className="text-slate-950 font-bold text-base mb-2">{dim.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{dim.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── REPORT CARD SHOWCASE (Inside Navy Waves) ─── */
function ReportCardSection() {
  const scores = [
    { label: 'Problem Framing', score: 88, color: 'bg-emerald-500' },
    { label: 'Process Visibility', score: 85, color: 'bg-sky-500' },
    { label: 'Outcome & Impact', score: 62, color: 'bg-amber-500' },
    { label: 'Visual Quality', score: 80, color: 'bg-indigo-500' },
    { label: 'Niche & Positioning', score: 72, color: 'bg-violet-500' },
    { label: 'Trust & CTA', score: 82, color: 'bg-sky-400' },
  ]

  return (
    <section id="report-card" className="relative bg-white pt-16">
      {/* Heading area on White background */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
          The <span className="text-[#3b82f6]">Vurdict</span> Report Card
        </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Don't settle for "Nice work!" See where you actually stand
          </p>
      </div>

      {/* Wave top */}
      <WaveDivider fill="#172554" flip={false} />

      {/* Navy block containing mockup */}
      <div className="bg-brand-900 py-24 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          {/* High-Fidelity Report Card Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl text-slate-900 text-left p-6 md:p-10 max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">vurdict.com/analysis</h4>
                  <p className="text-[10px] text-slate-400 font-medium">May 2026 · 100% Objective AI Review</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Report ID</span>
                <p className="text-xs font-bold text-slate-700">#VRD-2894</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="grid md:grid-cols-12 gap-8 pt-8">
              {/* Left Column: Big Score */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
                <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center mb-4">
                  {/* Outer radial stroke */}
                  <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="264" strokeDashoffset="48" strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-slate-900">82</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-emerald-700 text-xs font-bold">Strong Portfolio</span>
                </div>
              </div>

              {/* Right Column: Dimension Scores */}
              <div className="md:col-span-7 space-y-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluation Dimensions</h5>
                <div className="space-y-3">
                  {scores.map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{s.label}</span>
                        <span className="text-slate-900">{s.score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Footer Banner inside card */}
            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 group hover:bg-amber-100/80 transition-colors">
              <div className="rounded-lg p-2 bg-amber-100/50 transition-all duration-200 group-hover:bg-amber-200 group-hover:shadow-[0_0_12px_rgba(217,119,6,0.15)]">
                <Sparkles className="text-amber-600 transition-all duration-200 group-hover:scale-110 group-hover:text-amber-500" size={16} />
              </div>
              <div>
                <h6 className="text-xs font-bold text-amber-900 mb-0.5">Top Recommendation</h6>
                <p className="text-xs text-amber-800/80 leading-relaxed font-medium">
                  Your "Outcome & Impact" score is currently bottlenecking your results. Add specific metrics (e.g. conversion rates, user satisfaction scores) to your case studies to increase shortlisting odds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <WaveDivider fill="#172554" flip={true} />
    </section>
  )
}

/* ─── FAQ SECTION ─── */
function FAQSection() {
  const [open, setOpen] = useState(null)

  const faqs = [
    {
      q: 'What kinds of portfolio URLs does Vurdict support?',
      a: 'Any publicly accessible link works — Dribbble, Behance, Notion, Framer, Webflow, personal websites, or a direct link to a case study.',
    },
    {
      q: 'How is Vurdict different from just asking ChatGPT to review my portfolio?',
      a: 'ChatGPT uses general knowledge. Vurdict is calibrated against a specific 6-dimension design rubric with context settings for either full-time job seeking or client-winning freelance work.',
    },
    {
      q: 'Is my portfolio data stored or shared?',
      a: 'No. We only scrape and inspect your publicly available details. We do not store or share your designs or content.',
    },
    {
      q: 'How accurate is the AI scoring?',
      a: 'The analysis evaluates key signals and metrics common in successful product designer portfolios. It serves as a rapid automated audit, not a complete replacement for human mentors.',
    },
    {
      q: 'If my portfolio has won awards, will Vurdict score it higher?',
      a: 'Not necessarily. Awards typically judge aesthetic polish or narrative craft, while Vurdict evaluates how effectively your portfolio signals the specific competencies hiring managers look for — problem-framing, process visibility, and measurable impact. A visually stunning portfolio can still score low on structural logic or positioning clarity if those signals are buried. Think of Vurdict as the hiring manager who reads case studies, not the award judge who flips through hero shots.',
    },
    {
      q: 'Could optimizing for Vurdict make my portfolio worse for real humans?',
      a: 'Only if you blindly optimize for scores over storytelling. Vurdict\'s dimensions — structural logic, visual hierarchy, business impact — align with what top design leaders actually look for when hiring. The difference is Vurdict is explicit about what human reviewers often leave unsaid. The portfolios that score highest on Vurdict tend to be the same ones that convert in real interviews because they communicate clearly, show process, and prove value — which is exactly what makes a portfolio memorable to both an AI and a person.',
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">Everything you need to know about the evaluation.</p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-slate-50/50 rounded-2xl border transition-all overflow-hidden ${open === i ? 'border-brand-900/20 bg-white shadow-sm' : 'border-slate-100'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-sm text-slate-800 group"
              >
                <span>{faq.q}</span>
                <div className="rounded-lg p-1.5 transition-all duration-200 group-hover:bg-slate-200/60 group-hover:shadow-[0_0_8px_rgba(0,0,0,0.05)]">
                  {open === i ? (
                    <ChevronUp size={16} className="text-brand-900 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400 shrink-0 transition-all duration-200 group-hover:text-slate-600 group-hover:scale-110" />
                  )}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL CTA (Spotlight/Lamp Section) ─── */
function FinalCTASection() {
  const navigate = useNavigate()

  return (
    <div className="bg-white">
      {/* Heading area on White background */}
      <div className="pt-24 pb-12 px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
          See What Hirers See Before They Do
        </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Great portfolios don't happen by accident
          </p>
      </div>

      {/* Dark blue illustration block with absolute button overlay */}
      <div className="relative bg-[#111d43] overflow-hidden pt-0 pb-16 px-6 flex flex-col items-center">
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* CTA Illustration Image */}
          <img
            src={ctaIllustration}
            alt="Pedestal Spotlight Evaluation"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
          />

          {/* Absolute centered button overlapping bottom of image */}
          <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-[280px] z-20">
            <button
              onClick={() => navigate('/analyze')}
              className="w-full bg-white text-brand-900 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-extrabold text-sm hover:bg-sky-50 transition-colors shadow-xl cursor-pointer group"
            >
              <span>Analyze Your Portfolio</span>
              <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-brand-900/10">
                <ArrowRight size={16} className="text-brand-900 transition-all duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 md:py-12 bg-white text-slate-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center">
            <Logo size="small" />
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            © 2026 Vurdict. The Reviewer's Perspective.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-500">
          {['Privacy', 'Terms', 'Contact', 'Twitter'].map(link => (
            <a key={link} href="#" className="hover:text-brand-900 transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── LANDING PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FrameworkSection />
        <ReportCardSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
