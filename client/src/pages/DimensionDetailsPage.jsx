import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalysis, getScoreStatus } from '../context/AnalysisContext';
import Logo from '../components/Logo';
import WaveDivider from '../components/WaveDivider';
import comingSoonIllustration from '../assets/coming_soon_illustration.png';
import examplesComingSoonIllustration from '../assets/examples_coming_soon_illustration.png';
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
  MessageCircle,
  X
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
          <span className="text-slate-400 font-normal">Loading dimension details...</span>
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
      case 'structural_logic':
        return {
          why: "Your case studies present information but lack a clear narrative arc connecting the problem to your process to the final outcome. Recruiters need to follow your thinking start-to-finish without filling in gaps.",
          working: [
            { title: 'Problem Statements Provided', desc: 'Most projects include a problem statement that establishes context.' },
            { title: 'Process Sections Included', desc: 'Dedicated process sections show how you approached each project.' },
            { title: 'Final Outcomes Shown', desc: 'Final designs and results are displayed for each case study.' }
          ],
          improve: [
            { title: 'Connect Decisions to Problems', desc: 'Every design decision should explicitly reference the user need or constraint that drove it — no unexplained choices.' },
            { title: 'Add Milestone Headers', desc: 'Break your process into 3-5 scannable phases (Discover → Define → Design → Deliver) so recruiters can follow your narrative in seconds.' },
            { title: 'Include Before/After Comparison', desc: 'Add a side-by-side visual showing the problem state vs. your solution for immediate impact.' }
          ],
          evidence: [
            { title: 'Project Flow (All Projects)', desc: 'Most projects follow a logical problem-to-solution sequence.' },
            { title: 'User Flow Diagram (Project 1)', desc: 'Clear information architecture showing user navigation paths.' }
          ],
          recommendation: {
            title: 'Build a Tight Problem-to-Outcome Narrative for Every Case Study',
            desc: 'Recruiters decide whether to keep reading in under 10 seconds. Each case study needs a tight arc: hook them with the outcome, walk them through your key decisions, and prove your impact with specific results.',
            steps: [
              'Open each case study with a 2-sentence hook: "What was the challenge, and what was the result?" This lets readers grasp the value before diving into details.',
              'Organize your process into exactly 3-5 phases with descriptive headers (e.g., "Research → Define → Ideate → Build → Launch"). Each phase should have 2-3 bullet points max.',
              'For every major design decision shown in your screenshots, add a 1-line annotation explaining the reasoning: "Moved the CTA above the fold because heatmaps showed 73% of users never scrolled past the hero."',
              'Close with a results section that includes a before/after comparison (visual or data) and at least 1 quantifiable outcome — even an estimate is better than nothing.'
            ]
          }
        };
      case 'critical_thinking':
        return {
          why: "Your projects show surface-level research but lack depth in user insights, competitive analysis, and problem validation. Recruiters look for evidence that your decisions are research-driven, not assumption-driven.",
          working: [
            { title: 'User Interviews Mentioned', desc: 'You reference user interviews in some projects, establishing a research baseline.' },
            { title: 'Personas Present', desc: 'Personas are included and map to your target audience.' },
            { title: 'Pain Points Outlined', desc: 'User pain points are identified and described clearly.' }
          ],
          improve: [
            { title: 'Add Verbatim Interview Quotes', desc: 'Include 3-5 direct user quotes per project to make insights tangible and credible.' },
            { title: 'Include a Competitor Analysis Matrix', desc: 'Show a simple 2x2 grid comparing 3-5 competitors across key features — this proves market awareness.' },
            { title: 'Document Problem Validation', desc: 'Show how you validated the problem existed before designing — survey data, analytics, support tickets, or usability test findings.' }
          ],
          evidence: [
            { title: 'User Research (Project 1)', desc: '3 user interviews conducted. Good start but lacks synthesized insights.' },
            { title: 'Persona Definition (Project 2)', desc: 'Well-defined persona with goals, pain points, and behaviors documented.' },
            { title: 'Problem Statement (Project 3)', desc: 'Clear problem statement but no data backing up why it matters.' }
          ],
          recommendation: {
            title: 'Validate Every Design Decision with Qualitative and Quantitative Research',
            desc: 'The difference between a good designer and a great one is evidence. Every claim in your case study should be backed by research — user quotes, analytics data, competitive analysis, or usability metrics. Make your thinking visible and provable.',
            steps: [
              'For each project, include at least 3 verbatim user quotes that directly influenced your design decisions. Format them as pull quotes so they\'re scannable.',
              'Create a competitive analysis matrix (columns = competitors, rows = features/approaches). Highlight where your solution differs and why that decision was made.',
              'Add a "Problem Validation" section with specific data points: "14/20 users in our survey reported X" or "Support tickets about Y increased 40% month-over-month."',
              'Show traceability: pick 3 design decisions and draw a line from user insight → design choice → outcome. This demonstrates rigorous thinking better than any process diagram.'
            ]
          }
        };
      case 'visual_execution':
        return {
          why: "Your visual foundations are solid — good typography and grid usage. The gaps are in accessibility compliance, responsive behavior at breakpoints, and micro-interaction polish.",
          working: [
            { title: 'Clean Typography Scale', desc: 'Systematic type scaling using modern sans-serif creates premium readability and hierarchy.' },
            { title: 'Consistent Grid System', desc: 'Alignment to a structured column grid keeps layouts organized and professional.' },
            { title: 'Strong Spacing Discipline', desc: 'Consistent padding and margins give components breathing room.' }
          ],
          improve: [
            { title: 'Fix WCAG Color Contrast', desc: 'Audit all text-on-background pairings against WCAG AA (4.5:1 ratio). Badges, captions, and muted text are common failure points.' },
            { title: 'Test Responsive at 320px, 768px, 1440px', desc: 'Multi-column layouts that look great on desktop often break on mobile. Check every breakpoint with real content.' },
            { title: 'Polish Hover and Focus States', desc: 'Add subtle micro-interactions (scale, shadow, color shift) to interactive elements. These signal craftsmanship.' }
          ],
          evidence: [
            { title: 'Typography System (Home Page)', desc: 'Excellent type scale and contrast ratios on hero and body text.' },
            { title: 'Project Grid (Portfolio Page)', desc: 'Clean card layout with consistent spacing and alignment.' }
          ],
          recommendation: {
            title: 'Audit Your Visual System for Accessibility, Responsiveness, and Micro-Interactions',
            desc: 'You\'re 80% of the way to a polished visual system. The remaining 20% — contrast compliance, responsive edge cases, and interaction design — is what separates good from great. These are quick wins that dramatically improve perceived quality.',
            steps: [
              'Run every color pairing through a WCAG contrast checker (use Stark or axe DevTools). Fix any pairings below 4.5:1 ratio for small text or 3:1 for large text. Start with badges, captions, and placeholder text — those are the most common failures.',
              'Open your portfolio at 320px width. If any layout breaks (overflow, cramped cards, collapsed menus), fix it with responsive utility classes. Test again at 768px and 1440px.',
              'Add micro-interactions to all interactive elements: buttons should scale 1.02 on hover, cards should lift with shadow, links should underline smoothly. These take 30 minutes to implement and dramatically improve the feel.',
              'Standardize your spacing to an 8px grid. Check that all margins, paddings, and gaps are multiples of 8 (or 4 for tight spacing). Inconsistent spacing is the #1 visual tell of an amateur portfolio.'
            ]
          }
        };
      case 'impact_evidence':
        return {
          why: "Your projects describe what you did but rarely show what happened as a result. Recruiters and clients need proof that your work drives measurable business or user impact — not just screenshots.",
          working: [
            { title: 'Project Results Mentioned', desc: 'You reference outcomes in some project descriptions, establishing a results-oriented mindset.' },
            { title: 'Visual Artifacts Shown', desc: 'Final screens, prototypes, and deliverables are displayed clearly.' }
          ],
          improve: [
            { title: 'Add 3+ Metrics Per Project', desc: 'Include specific numbers for each project — time saved, conversion lift, engagement rate, support ticket reduction, NPS score, etc.' },
            { title: 'Show Before/After Data', desc: 'Use a simple comparison (table, inline stat, or visual) so the improvement is instantly visible and undeniable.' },
            { title: 'Include Stakeholder Testimonials with Numbers', desc: 'A client quote like "Revenue grew 25% after the redesign" is infinitely more powerful than "The client was happy with the work."' }
          ],
          evidence: [
            { title: 'Outcome Section (Project 1)', desc: 'References qualitative results but lacks specific metrics.' },
            { title: 'Client Feedback (Project 2)', desc: 'Positive testimonial included but no quantifiable outcomes referenced.' }
          ],
          recommendation: {
            title: 'Quantify Every Outcome — If You Can\'t Measure It, Frame It',
            desc: 'Impact is not subjective. Train yourself to identify concrete metrics for every project. Even qualitative outcomes can be quantified: "Shipped to 50K+ users with zero critical bugs" or "Approved by stakeholders on first presentation." If you don\'t have hard data, use proxy metrics that demonstrate scale or quality.',
            steps: [
              'Audit each project and find at least 3 metrics you can report: time saved, conversion rate change, engagement increase, NPS score, support tickets reduced, pages per session, task success rate, or revenue impact. Look in analytics, client reports, or post-launch data.',
              'Present every metric as a before/after comparison. Template: "Reduced X by Y% (from A to B)" or "Improved Z from A to B in [timeframe]." If exact data is unavailable, use reasonable estimates and label them as such.',
              'Include a 1-line impact summary at the top of each case study — right after the project title. Example: "Redesigned the onboarding flow, resulting in a 34% increase in completed registrations and a 12% decrease in support tickets." This hooks skimmers immediately.',
              'For projects with no accessible metrics, use scale proxies: "Served 200K+ monthly active users," "Used by the design team of 12 across 3 product lines," or "Presented to C-suite stakeholders who approved on first review."'
            ]
          }
        };
      case 'narrative_tone':
        return {
          why: "Your writing is grammatically sound but lacks the persuasive edge needed to turn readers into clients or hires. Your case studies read as reports, not pitches — passive voice, buried outcomes, and no call to action.",
          working: [
            { title: 'Professional Language', desc: 'Your writing is polished with appropriate design terminology and good grammar.' },
            { title: 'Clear Section Organization', desc: 'Case studies are structured into readable, logical sections.' }
          ],
          improve: [
            { title: 'Eliminate Passive Voice', desc: 'Replace "was designed" with "I designed," "was improved" with "I improved." Active voice conveys ownership and confidence.' },
            { title: 'Lead with the Outcome', desc: 'Open every case study with the result, not the process. Hook readers with impact before explaining how you got there.' },
            { title: 'Add a Call to Action', desc: 'Every case study should end with a next step — view the live site, download a PDF, or contact you. Don\'t leave readers hanging.' }
          ],
          evidence: [
            { title: 'Writing Quality (All Projects)', desc: 'Consistent professional tone with strong grammar and vocabulary.' },
            { title: 'Project Introductions', desc: 'Clear opening paragraphs in most case studies, though outcomes are buried.' }
          ],
          recommendation: {
            title: 'Rewrite Every Case Study with Active Voice, Outcome-First Hooks, and Strong CTAs',
            desc: 'Your portfolio is a sales document, not a case study repository. Every sentence should either inform, persuade, or drive action. Strip passive language, lead with results, and always tell the reader what to do next. This single shift transforms how recruiters perceive your work.',
            steps: [
              'Audit every case study and flag every passive construction ("was done," "were created," "was designed"). Replace each one with active voice using "I" or "we." This immediately signals ownership and confidence — it is the highest-leverage edit you can make.',
              'Rewrite the first 2 sentences of each case study using this template: "[Action] resulted in [outcome] for [audience]." Example: "Redesigned the checkout flow, resulting in a 28% increase in completed purchases for 50K+ monthly users." Then explain your process below.',
              'End every case study with a specific call to action: "View the live product," "Read the full case study," or "Interested in a similar project? Let\'s talk." Link to your contact page or a working prototype.',
              'Read each case study aloud. If any sentence feels passive, uncertain, or vague, rewrite it. Your default tone should be: "I identified a problem, I solved it, and here\'s the proof." Confidence is contagious.'
            ]
          }
        };
      case 'positioning_clarity':
        return {
          why: "Your portfolio doesn't clearly communicate what you specialize in or who you design for. Recruiters scanning your work should know your niche within 3 seconds — if they have to guess, they move on.",
          working: [
            { title: 'Projects Well Displayed', desc: 'Your portfolio showcases multiple projects with strong visuals and descriptions.' },
            { title: 'Design Competency Evident', desc: 'Your work clearly demonstrates strong product design skills across projects.' }
          ],
          improve: [
            { title: 'Write a 1-Sentence Positioning Statement', desc: 'Use this template: "I design [type of product] for [specific audience] that [key outcome]." Place it on your homepage hero.' },
            { title: 'Tag Projects by Domain', desc: 'Label each project with its industry (fintech, healthcare, SaaS, e-commerce, etc.) so your specialization is immediately visible.' },
            { title: 'Add a 2-Paragraph About Section', desc: 'Paragraph 1: your specialization and approach. Paragraph 2: your background and what you\'re looking for. Include a professional photo.' }
          ],
          evidence: [
            { title: 'Project Variety', desc: 'Good range of projects but no clear thematic focus or specialization is communicated.' },
            { title: 'Homepage Introduction', desc: 'Basic intro is present but lacks a strong positioning hook that differentiates you.' }
          ],
          recommendation: {
            title: 'Define Your Niche and Make It the First Thing Every Visitor Sees',
            desc: 'The best portfolios answer one question in under 3 seconds: "What does this designer specialize in?" If yours doesn\'t, recruiters will not invest time figuring it out. Decide what you want to be known for — then make it impossible to miss on every page.',
            steps: [
              'Write a 1-sentence positioning statement: "I design [type of product] for [specific audience] that [key outcome]." Example: "I design B2B SaaS platforms for fintech startups that simplify complex financial workflows." This goes in your homepage hero, right below your name.',
              'Categorize every project by industry or domain (fintech, healthtech, e-commerce, etc.). If 3+ projects fall in the same space, that\'s your niche — reorder your portfolio to show those first.',
              'Add a 2-paragraph About section to your portfolio: paragraph 1 states your specialization, design philosophy, and the type of problems you solve best. Paragraph 2 covers your experience, tools, and what you\'re seeking next. Include a professional headshot.',
              'Ensure your portfolio URL, LinkedIn headline, and resume all use the same positioning language. Consistency across channels signals intentionality and builds trust with recruiters.'
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

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [examplesModalOpen, setExamplesModalOpen] = useState(false);

  // Initialize chat with a welcome message explaining the specific context of the active dimension
  useEffect(() => {
    if (chatOpen) {
      setChatMessages([
        {
          sender: 'ai',
          text: `Hey! I'm your Vurdict Design Co-Pilot. I see you're looking at the **${activeDim.label}** dimension, where you scored **${activeData.score}/100**.\n\nAsk me anything about how this score was determined, how to resolve the issues found, or request concrete rewriting examples for your case study!`
        }
      ]);
    }
  }, [chatOpen, activeDim, activeData.score]);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    try {
      // Direct call to Express backend Claude/Gemini API service
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          dimension: activeDim.label,
          score: activeData.score,
          explanation: activeData.explanation,
          context: state.goal === 'win_clients' ? 'Win Freelance Clients' : 'Get Hired',
          experience: state.experience
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      console.error(err);
      // Fallback answers based on the dimension info to preserve reliability
      setTimeout(() => {
        let fallbackReply = `I'm sorry, I encountered a temporary connection issue. However, regarding your **${activeDim.label}** score of **${activeData.score}**, I highly recommend looking at the recommendation to **${details.recommendation.title.toLowerCase()}**. Let me know if you want me to write some text headers or outline blocks to solve this!`;
        setChatMessages(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
      }, 800);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg h-16 px-6 md:px-12 border-b border-slate-100 flex items-center">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <Logo onClick={() => navigate('/')} />
          <button 
            onClick={() => navigate('/results')}
            className="text-xs font-normal text-slate-500 hover:text-brand-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
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
        
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-20 mb-8">
          
          {/* Left Column: Review by Dimension Sidebar (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg space-y-5 flex-1">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Review by Dimension</h3>
                <span className="text-[9px] text-slate-400 font-medium block mt-0.5">Click a dimension to view details</span>
              </div>

              <div className="space-y-3">
                {dimensionsList.map((dim) => {
                  const scoreData = report.categories[dim.key] || { score: 62 };
                  const isSelected = dim.slug === activeDim.slug;
                  const SidebarIcon = dim.icon;
                  const scoreBadge = getBadge(scoreData.score);

                  return (
                    <button
                      key={dim.slug}
                      onClick={() => navigate(`/results/${dim.slug}`)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group ${
                          isSelected 
                          ? 'border-brand-900 bg-brand-900/5 shadow-sm font-semibold text-brand-900' 
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
                          <div className={`text-xs font-medium ${isSelected ? 'text-brand-900' : 'text-slate-700 group-hover:text-slate-950'}`}>{dim.label}</div>
                          <div className={`text-[8px] font-medium uppercase mt-0.5 ${scoreBadge.style.split(' ')[0]}`}>{scoreBadge.label}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-medium text-slate-850">{scoreData.score}/100</span>
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
                  <p className="text-xs text-slate-455 font-normal leading-relaxed max-w-xl mt-1">{activeDim.desc}</p>
                </div>
              </div>

              {/* Score gauges */}
              <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[9px] font-normal uppercase tracking-wide text-slate-455 block">Your Score</span>
                  <span className="text-2xl font-semibold text-slate-900 mt-0.5 block">{activeData.score} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
                  <span className={`inline-block text-[8px] font-normal uppercase tracking-wide px-2 py-0.5 rounded-full border mt-1.5 ${badge.style}`}>
                    {badge.label}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-normal uppercase tracking-wide text-slate-455 block">Industry Benchmark</span>
                  <span className="text-2xl font-semibold text-slate-600 mt-0.5 block">{activeDim.benchmark} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
                  <div className="w-24 h-1.5 rounded bg-slate-100 mt-2.5 overflow-hidden">
                    <div className="h-full bg-slate-400 rounded" style={{ width: `${activeDim.benchmark}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Why this score block */}
            <div className="bg-white text-slate-900 border border-slate-100 p-5 rounded-3xl shadow-lg space-y-2 text-left">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Why this score?</h4>
              <p className="text-xs text-slate-700 font-normal leading-relaxed">
                {details.why}
              </p>
            </div>

            {/* Three columns details (Working, Improve, Evidence) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
              
              {/* What's Working */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase">
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
                        <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where You Can Improve */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase">
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
                        <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Found */}
              <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-lg space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase">
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
                        <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                        <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Row 2: Full-width Recommendation */}
        <div className="max-w-7xl w-full mx-auto relative z-20">
            <div className="bg-blue-50 border border-blue-150 p-6 rounded-3xl text-left space-y-4 text-slate-900">
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-normal uppercase tracking-wide text-blue-700 block">Top Recommendation</span>
                  <h4 className="text-sm font-semibold text-slate-900">{details.recommendation.title}</h4>
                </div>
                <button onClick={() => setExamplesModalOpen(true)} className="rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-normal text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0">
                  <span>See Examples</span>
                  <ExternalLink size={12} />
                </button>
              </div>
              
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                {details.recommendation.desc}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wide block">Actionable Steps:</span>
                <div className="space-y-2">
                  {details.recommendation.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-slate-750 font-normal mt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Wave divider transitioning back to White */}
      <div className="w-full bg-white">
        <WaveDivider fill="#172554" flip={true} />
      </div>

      {/* Examples Coming Soon Modal */}
      {examplesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setExamplesModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-fade-in-up">
            <button
              onClick={() => setExamplesModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="mb-6 flex justify-center">
              <img 
                src={examplesComingSoonIllustration} 
                alt="Examples coming soon" 
                className="w-48 h-auto object-contain select-none"
                loading="lazy"
              />
            </div>

             <h3 className="text-xl font-semibold text-slate-900 mb-1 text-center">Examples coming soon</h3>
             <p className="text-sm text-slate-500 font-normal leading-relaxed text-center">
               We are writing a small handbook of real case studies to show how designers implement these improvements.
             </p>
             <button
               onClick={() => setExamplesModalOpen(false)}
               className="w-full mt-6 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white py-3.5 text-sm font-medium transition-all cursor-pointer shadow-lg shadow-brand-950/10"
             >
               Got it
             </button>
          </div>
        </div>
      )}

      {/* Footer informational banner & bottom bar */}
      <div className="bg-white py-12 px-6 md:px-12 relative z-10 text-slate-900">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-slate-500 text-[10px] font-normal">
          <div className="flex items-center gap-1.5">
            <HelpCircle size={14} className="text-slate-400" />
            <span>Scores are based on our 6-Dimension Framework.</span>
            <a href="/#framework" className="text-brand-900 hover:underline">Learn more about how we evaluate portfolios →</a>
          </div>
          <button 
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>Have questions about your score?</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center">
              <Logo size="small" />
            </div>
            <p className="text-[10px] text-slate-400 font-normal">
              © 2026 Vurdict. The Reviewer's Perspective.
            </p>
          </div>
          <div className="flex gap-6 font-semibold">
            <a href="/" className="hover:text-brand-900 transition-colors">Home</a>
            <a href="/#faq" className="hover:text-brand-900 transition-colors">FAQ</a>
          </div>
        </footer>
      </div>

      {/* Co-Pilot AI Chatbox Drawer (Floating Bubble UI) */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-6rem)] bg-white shadow-[0_20px_50px_rgba(23,37,84,0.15)] border border-slate-100 rounded-[32px] flex flex-col justify-between overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-brand-900 text-white rounded-t-[30px]">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-2xl bg-white/10 flex items-center justify-center">
                <MessageCircle size={16} className="text-sky-300 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-semibold leading-none">Design Co-Pilot</h4>
                <span className="text-[9px] text-sky-100/70 font-normal mt-0.5 block">Your Design Lead Best Friend</span>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="px-3 py-1 rounded-xl text-xs font-normal text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Coming Soon Showcase Inside Chatbox */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white space-y-6">
            <div className="w-48 h-auto flex items-center justify-center">
              <img 
                src={comingSoonIllustration} 
                alt="Co-Pilot Coming Soon" 
                className="w-full h-auto object-contain select-none"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-slate-900">Co-Pilot is coming soon</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
                Your AI design bestie is wrapping up work. We'll be chatting here super soon!
              </p>
            </div>
          </div>

          {/* Disabled Form Input for Coming Soon */}
          <div className="p-4 border-t border-slate-100 bg-white rounded-b-[30px]">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-2.5 opacity-60">
              <input 
                type="text"
                placeholder="Chat disabled during calibration..."
                className="w-full bg-transparent text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                disabled
              />
              <span className="text-[10px] font-normal text-slate-350 uppercase shrink-0 select-none">
                Send
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
