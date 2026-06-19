import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowRight, Globe, Briefcase, Users, Lock, Zap,
  CheckCircle, Star, ChevronDown, ChevronUp, TrendingUp, Eye,
  Target, Layers, BookOpen, Code2, Quote, Sparkles,
  Workflow, Brain, SwatchBook, Feather, Menu, X
} from 'lucide-react'
import heroIllustration from '../assets/hero-illustration.webp'
import ctaIllustration from '../assets/cta-illustration.webp'
import Logo from '../components/Logo'
import WaveDivider from '../components/WaveDivider'
import BetaTicker from '../components/BetaTicker'




/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['why-vurdict', 'how-it-works', 'framework', 'report-card', 'faq']
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { label: 'Why Vurdict', href: '#why-vurdict' },
    { label: 'Framework', href: '#framework' },
    { label: 'Report Card', href: '#report-card' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className={`transition-all duration-300 bg-white/95 backdrop-blur-lg border-b border-slate-100 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo size="normal" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-normal transition-all pb-1 pt-1 border-b-2 ${
                activeSection === link.href 
                  ? 'text-blue-600 border-blue-600 font-normal' 
                  : 'text-slate-500 hover:text-brand-900 border-transparent hover:border-slate-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3.5 md:gap-3">
          <Link
            to="/analyze"
            className="btn-brand flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-medium group whitespace-nowrap shrink-0"
          >
            <span>Analyze Portfolio</span>
            <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
              <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

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
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-y border-slate-200 shadow-sm">
          <div className="py-1 flex flex-col">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-normal transition-all py-3.5 border-b border-slate-100 last:border-0 hover:bg-slate-50/70 hover:text-brand-900 ${
                  activeSection === link.href 
                    ? 'text-blue-600 bg-blue-50/50 border-l-4 border-l-blue-600 pl-5 font-normal' 
                    : 'text-slate-600 border-l-4 border-l-transparent pl-5 active:bg-brand-900 active:text-white'
                }`}
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
  const [count, setCount] = useState(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    fetch(`${apiUrl}/api/analysis-count`)
      .then(r => r.json())
      .then(data => setCount(data.count))
      .catch(() => setCount(50))
  }, [])

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 px-4 animate-fade-in-up">
      <img
        src={heroIllustration}
        alt="Vurdict Portfolio Evaluation"
        className="w-full h-auto object-contain select-none"
        loading="eager"
        fetchpriority="high"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      />
      {count !== null && (
        <div className="absolute bottom-3 right-3 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 py-2 md:px-5 md:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-2 md:gap-3 animate-fade-in-up">
          <div className="flex flex-col items-start">
            <span className="text-lg md:text-3xl font-bold text-brand-900 leading-none tabular-nums">{count.toLocaleString()}</span>
            <span className="text-[9px] md:text-[11px] text-slate-500 font-medium mt-0.5 md:mt-1 leading-tight">analyses<br />completed</span>
          </div>
          <div className="w-px h-7 md:h-10 bg-slate-200" />
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Live</span>
            <span className="text-[8px] md:text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 md:gap-1 mt-0.5">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Updating
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function HeroSection() {
  const navigate = useNavigate()
  const [url, setUrl] = useState('')
  const [goal, setGoal] = useState('get_hired')
  const [experience, setExperience] = useState('junior')
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false)

  const goalsList = {
    get_hired: { label: 'Get Hired', icon: Briefcase },
    win_clients: { label: 'Win Clients', icon: Users }
  }

  const selectedGoal = goalsList[goal];
  const SelectedIcon = selectedGoal.icon;

  return (
    <section className="relative bg-white pt-16 pb-0 overflow-hidden">
      {/* Top Illustration Showcase */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <HeroVisual />
      </div>

      {/* Top Wave (Transition from White to Navy) */}
      <WaveDivider fill="#172554" flip={false} />

      {/* Navy blue container */}
      <div className="bg-brand-900 py-12 px-6 text-center text-white relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-tight">
            <span className="md:whitespace-nowrap">See Your Portfolio Through</span> <br className="hidden md:inline" />
            <span className="md:whitespace-nowrap">a <span className="text-sky-300">Hiring Manager's</span> Eyes</span>
          </h1>
          <p className="text-sky-100/70 font-normal max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
            Paste your case study link, select your goal,<br /> and get feedback on what to fix.
          </p>

          {/* Form container */}
          <div className="bg-white p-2.5 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto text-slate-900 relative">
            <div className="flex-1 flex items-center gap-2.5 px-3">
              <Globe size={18} className="text-slate-400 shrink-0" />
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && url) {
                    const mappedGoal = goal === 'win_clients' ? 'win_clients' : 'get_hired';
                    navigate(`/analyzing?url=${encodeURIComponent(url)}&goal=${mappedGoal}&experience=${experience}`);
                  }
                }}
                placeholder="https://notion.so/your-case-study"
                className="w-full py-2 bg-transparent text-base sm:text-sm text-slate-800 placeholder:text-xs sm:placeholder:text-sm placeholder-slate-400 focus:outline-none"
              />
            </div>
            
            {/* Goal Select (Custom Premium Dropdown) */}
            <div className="relative border-t md:border-t-0 md:border-l border-slate-100 px-3 py-2 md:py-0 flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setGoalDropdownOpen(!goalDropdownOpen)}
                className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200 transition-all w-full md:w-auto md:min-w-[11rem] whitespace-nowrap shrink-0"
              >
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <SelectedIcon size={14} className="text-brand-900" />
                  {selectedGoal.label}
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${goalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {goalDropdownOpen && (
                <div className="absolute left-0 right-0 md:left-auto top-full mt-2 w-full md:w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl z-30 text-left">
                  {Object.keys(goalsList).map((key) => {
                    const item = goalsList[key];
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setGoal(key);
                          setGoalDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                          goal === key 
                            ? 'bg-brand-900/5 text-brand-900' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                        }`}
                      >
                        <ItemIcon size={13} className="text-brand-900" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (url) {
                  const mappedGoal = goal === 'win_clients' ? 'win_clients' : 'get_hired';
                  navigate(`/analyzing?url=${encodeURIComponent(url)}&goal=${mappedGoal}&experience=${experience}`);
                }
              }}
              className="bg-brand-900 text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-xs hover:bg-brand-800 transition-colors group cursor-pointer whitespace-nowrap shrink-0 w-full md:w-auto"
            >
              <span>Analyze Portfolio</span>
              <div className="rounded-md p-0.5 transition-all duration-200 group-hover:bg-white/20">
                <ArrowRight size={14} className="transition-all duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          {/* Bullet sub-badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {/* Experience toggle */}
            <div className="flex items-center gap-1.5">
              {[
                { key: 'junior', label: 'Junior' },
                { key: 'mid',    label: 'Mid' },
                { key: 'senior', label: 'Senior' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setExperience(key)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    experience === key
                      ? 'bg-white text-brand-900 border-white'
                      : 'bg-white/10 text-sky-200/70 border-white/20 hover:bg-white/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              { icon: Lock, text: 'No signup required' },
              { icon: Zap, text: 'Results in minutes' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sky-200/60 text-[10px] font-normal group">
                <Icon size={15} className="text-sky-300 transition-all duration-200 group-hover:text-white group-hover:scale-110" />
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
  const rows = [
    {
      dimension: 'Context Awareness',
      generic: 'Surface level only',
      community: 'Subjective & inconsistent',
      vurdict: 'Goal-Aware (Hiring vs. Freelance)',
    },
    {
      dimension: 'Reviewer Profile',
      generic: 'Algorithmic / Generalist',
      community: 'Random peer skill levels',
      vurdict: 'Role-Specific (Design Lead perspective)',
    },
    {
      dimension: 'Specificity',
      generic: 'Vague text blocks',
      community: '"Looks great!" / "Not for me"',
      vurdict: 'Figma-style pixel annotations',
    },
    {
      dimension: 'Turnaround',
      generic: 'Instant',
      community: 'Days to Weeks',
      vurdict: <>2-5 Minutes <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md ml-1 align-middle whitespace-nowrap">+ Human Review</span></>,
    },
  ]

  return (
    <section id="why-vurdict" className="py-12 md:py-20 bg-white relative scroll-mt-1">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight text-balance">
            Most portfolio feedback is <br className="hidden md:inline" />{" "}
            <span className="text-red-500 line-through decoration-red-300">too vague</span> to be helpful
          </h2>
          <p className="text-slate-500 font-normal max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Vurdict replaces the guesswork with a structured evaluation <br className="hidden md:inline" />{" "}
            so you can improve with confidence
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-4 md:p-8 relative mr-4 md:mr-0">
          <div className="overflow-x-auto scrollbar-thin pr-4 md:pr-0">
            <table className="w-full text-left border-separate border-spacing-0 min-w-[768px] md:min-w-[850px] table-fixed">
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[28%]" />
                <col className="w-[26%]" />
                <col className="w-[24%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="py-6 text-xs font-semibold text-slate-800 uppercase tracking-wider pl-4 border-b border-slate-100">
                    Dimension
                  </th>
                  <th className="py-6 text-xs font-semibold text-blue-600 uppercase tracking-wider px-6 bg-[#e6f0ff]/85 border-l-2 border-l-blue-500 border-r-2 border-r-blue-500 border-t-2 border-t-blue-500 border-b border-b-blue-200/60 rounded-t-2xl">
                    Vurdict Intelligence
                  </th>
                  <th className="py-6 text-xs font-bold text-slate-400 uppercase tracking-wider px-4 border-b border-slate-100">
                    Generic AI
                  </th>
                  <th className="py-6 text-xs font-bold text-slate-400 uppercase tracking-wider px-4 border-b border-slate-100">
                    Community Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const isLast = i === rows.length - 1;
                  return (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="py-6 text-xs font-medium text-slate-800 pl-4 border-b border-slate-100/80">
                        {row.dimension}
                      </td>
                      <td className={`py-6 text-xs text-blue-600 px-6 font-medium leading-relaxed bg-[#e6f0ff]/85 border-l-2 border-l-blue-500 border-r-2 border-r-blue-500 ${
                        isLast 
                          ? 'border-b-2 border-b-blue-500 rounded-b-2xl' 
                          : 'border-b border-b-blue-200/60'
                      }`}>
                        {row.vurdict}
                      </td>
                      <td className="py-6 text-xs text-slate-500 px-4 leading-relaxed font-medium border-b border-slate-100/80">
                        {row.generic}
                      </td>
                      <td className="py-6 text-xs text-slate-500 px-4 leading-relaxed font-medium border-b border-slate-100/80">
                        {row.community}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Scroll Tip for Mobile */}
          <div className="md:hidden flex items-center justify-center gap-1.5 mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Swipe to compare</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIAL SECTION ─── */
function TestimonialSection() {
  const testimonials = [
    {
      quote: "While it's clearly targeted at designers, its feedback on a UX writing case study was valuable. My favourite feature is the strength, weakness analysis and focus fix recommendations.",
      name: 'Judith Eke-efeme',
      role: 'UX Writer & Content Designer',
    },
    {
      quote: "I'd been meaning to rework my portfolio but wasn't sure where to start. Vurdict helped me see which sections needed the most attention, which made the whole thing less overwhelming.",
      name: 'Samuel Olusola',
      role: 'Product Designer',
    },
    {
      quote: "The dimension breakdown gave me a much clearer picture of where my case study was falling short. It's not a magic fix, but it gave me a practical starting point.",
      name: 'Amara Okafor',
      role: 'Senior Product Designer',
    },
  ]

  return (
    <section className="py-14 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight">Authentic Designer Stories</h2>
          <p className="text-slate-500 font-normal max-w-xl mx-auto text-sm md:text-base leading-relaxed">What users are saying about <span className="text-sky-500 font-medium">Vurdict</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
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
      icon: Workflow,
      title: 'Structural Logic',
      desc: 'Evaluates the flow of your case study, ensuring problem statements connect logically to delivered solutions.',
    },
    {
      icon: Brain,
      title: 'Critical Thinking',
      desc: 'Checks for evidence of research-driven decisions rather than purely aesthetic choices.',
    },
    {
      icon: SwatchBook,
      title: 'Visual Execution',
      desc: 'Analysis of spacing, typography, hierarchy, and adherence to modern UI principles and accessibility.',
    },
    {
      icon: TrendingUp,
      title: 'Impact Evidence',
      desc: 'Scans for quantifiable metrics and business outcomes that demonstrate the value of your work.',
    },
    {
      icon: Feather,
      title: 'Narrative Tone',
      desc: 'Assesses professional voice and clarity, ensuring your writing is concise yet persuasive.',
    },
    {
      icon: Target,
      title: 'Positioning Clarity',
      desc: 'Verifies whether the case study communicates who the designer is and what they specialize in.',
    },
  ]

  return (
    <section id="framework" className="py-10 md:py-16 bg-white scroll-mt-1">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight">
            The 6-Dimension Evaluation Framework
          </h2>
          <p className="text-slate-500 font-normal max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            We review what actually determines your portfolio's success
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-md hover:border-blue-100 transition-all flex flex-col text-left group">
                <Icon size={22} className="text-blue-600 transition-all duration-200 group-hover:text-blue-500 group-hover:scale-110" />
                <h3 className="text-slate-950 font-semibold text-base mb-2 mt-3">{dim.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">{dim.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── REPORT CARD SHOWCASE (Inside Navy Waves) ─── */
function ReportCardSection() {
  const scores = [
    { label: 'Critical Thinking', score: 88, color: 'bg-emerald-500' },
    { label: 'Structural Logic', score: 85, color: 'bg-sky-500' },
    { label: 'Impact Evidence', score: 62, color: 'bg-amber-500' },
    { label: 'Visual Execution', score: 80, color: 'bg-indigo-500' },
    { label: 'Positioning Clarity', score: 72, color: 'bg-violet-500' },
    { label: 'Narrative Tone', score: 82, color: 'bg-sky-400' },
  ]

  return (
    <section id="report-card" className="relative bg-white pt-10 scroll-mt-1">
      {/* Heading area on White background */}
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight">
          The <span className="text-[#3b82f6]">Vurdict</span> Report Card
        </h2>

      </div>

      {/* Wave top */}
      <WaveDivider fill="#172554" flip={false} />

      {/* Navy block containing mockup */}
      <div className="bg-brand-900 py-16 px-6 text-white text-center">
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
                  <h4 className="text-sm font-bold text-slate-900">vurdict.site/analysis</h4>
                  <p className="text-[10px] text-slate-400 font-medium">May 2026 · Structured Review</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Report ID</span>
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
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700">{s.label}</span>
                        <span className="text-slate-700">{s.score}/100</span>
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
              <Sparkles className="text-amber-600 transition-all duration-200 group-hover:scale-110 group-hover:text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <h6 className="text-xs font-bold text-amber-900 mb-0.5">Top Recommendation</h6>
                <p className="text-xs text-amber-800/80 leading-relaxed">
                  Your Impact Evidence score (62/100) is the biggest drag on your overall result. This case study describes what you did but doesn't show what happened. Add specific metrics — conversion rates, task time reductions, or user satisfaction scores — to prove your design drove real outcomes.
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
      q: 'What kinds of case study URLs does Vurdict support?',
      a: 'Any publicly accessible case study link works: Notion, Framer, Webflow, personal websites, or a dedicated case study page. Full portfolio analysis is coming in v2.',
    },
    {
      q: 'How is Vurdict different from just asking ChatGPT to review my case study?',
      a: 'ChatGPT uses general knowledge. Vurdict is calibrated against a specific 6-dimension design rubric with context settings for either full-time job seeking or client-winning freelance work.',
    },
    {
      q: 'Is my case study data stored or shared?',
      a: 'No. We only scrape and inspect your publicly available content. We do not store or share your designs or case study details.',
    },
    {
      q: 'How accurate is the AI scoring?',
      a: 'The analysis evaluates key signals and metrics common in successful product designer portfolios. It serves as a rapid automated audit, not a complete replacement for human mentors.',
    },
    {
      q: 'If my portfolio has won awards, will Vurdict score it higher?',
      a: 'Not necessarily. Awards typically judge aesthetic polish or narrative craft, while Vurdict evaluates how effectively your portfolio signals the specific competencies hiring managers look for: problem-framing, process visibility, and measurable impact. A visually stunning portfolio can still score low on structural logic or positioning clarity if those signals are buried. Think of Vurdict as the hiring manager who reads case studies, not the award judge who flips through hero shots.',
    },
    {
      q: 'Could optimizing for Vurdict make my portfolio worse for real humans?',
      a: 'Only if you blindly optimize for scores over storytelling. Vurdict\'s dimensions (structural logic, visual hierarchy, business impact) align with what top design leaders actually look for when hiring. The difference is Vurdict is explicit about what human reviewers often leave unsaid. The portfolios that score highest on Vurdict tend to be the same ones that convert in real interviews because they communicate clearly, show process, and prove value, which is exactly what makes a portfolio memorable to both an AI and a person.',
    },
  ]

  return (
    <section id="faq" className="py-10 md:py-16 bg-white relative scroll-mt-1">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-slate-50/50 rounded-2xl border transition-all overflow-hidden ${open === i ? 'border-brand-900/20 bg-white shadow-sm' : 'border-slate-100'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-sm text-slate-800 group"
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
                  <p className="text-slate-500 text-xs leading-relaxed font-normal">{faq.a}</p>
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
      <div className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-slate-900 tracking-tight text-balance">
            See What Recruiters See Before They Do
          </h2>
          <p className="text-slate-500 font-normal max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Great portfolios don't happen by accident
          </p>
      </div>

      {/* Wave divider into dark blue section */}
      <WaveDivider fill="#111d43" flip={false} />

      {/* Dark blue illustration block with absolute button overlay */}
      <div className="relative bg-[#111d43] pt-0 pb-28 md:pb-36 px-6 flex flex-col items-center">
        <div className="relative w-full max-w-4xl mx-auto mt-[1px] md:mt-[1px]">
          <div className="relative flex flex-col items-center md:-ml-32">
            <img
              src={ctaIllustration}
              alt="Pedestal Spotlight Evaluation"
              className="w-full h-auto object-contain select-none"
              loading="lazy"
            />
          </div>

          {/* Centered CTA button — outside shifted wrapper so it stays page-centered */}
          <div className="absolute bottom-0 translate-y-[80%] left-1/2 -translate-x-1/2 w-full max-w-2xl sm:max-w-3xl z-20 px-6">
            <button
              onClick={() => navigate('/analyze')}
              className="w-full bg-white text-brand-900 flex items-center justify-center gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-5 rounded-xl font-medium text-sm md:text-base hover:bg-sky-50 transition-colors shadow-xl cursor-pointer group whitespace-nowrap shrink-0"
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
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-normal text-slate-500 justify-items-center md:flex md:gap-6">
          <Link to="/privacy" className="hover:text-brand-900 transition-colors whitespace-nowrap">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-brand-900 transition-colors whitespace-nowrap">Terms of Use</Link>
          <Link to="/support" className="hover:text-brand-900 transition-colors whitespace-nowrap">Support Us</Link>
          <Link to="/revurdict" className="text-indigo-500 hover:text-indigo-700 transition-colors font-semibold whitespace-nowrap">Re:Vurdict</Link>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
        <BetaTicker />
      </div>
      <div className="h-[5.5rem]" />
      <main>
        <HeroSection />
        <ProblemSection />
        <TestimonialSection />
        <FrameworkSection />
        <ReportCardSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
