import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAnalysis, getScoreStatus, getScoreBand } from '../context/AnalysisContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WaveDivider from '../components/WaveDivider';
import WaitlistForm from '../components/WaitlistForm';
import PaywallOverlay from '../components/PaywallOverlay';
import comingSoonIllustration from '../assets/coming_soon_illustration.png';
import examplesComingSoonIllustration from '../assets/examples_coming_soon_illustration.png';
import {
  Workflow,
  Microscope,
  SwatchBook,
  TrendingUp,
  ArrowLeft,
  Feather,
  Target,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  FileText,
  Search,
  Users,
  Layers,
  GitBranch,
  BarChart3,
  X
} from 'lucide-react';


const evidenceIconMap = {
  'flow': Layers,
  'user flow': GitBranch,
  'research': Search,
  'persona': Users,
  'problem statement': HelpCircle,
  'typography': SwatchBook,
  'layout': Workflow,
  'outcome': TrendingUp,
  'feedback': MessageCircle,
  'writing': Feather,
  'introduction': FileText,
  'focus': Target,
  'structure': Layers,
};

function getEvidenceIcon(title) {
  const lower = title.toLowerCase();
  for (const [keyword, icon] of Object.entries(evidenceIconMap)) {
    if (lower.includes(keyword)) return icon;
  }
  return FileText;
}

function EvidenceIcon({ title }) {
  const Icon = getEvidenceIcon(title);
  return (
    <Icon size={18} className="text-indigo-500 shrink-0 mt-0.5" />
  );
}


export default function DimensionDetailsPage() {
  const { dimSlug } = useParams();
  const navigate = useNavigate();
  const { state, toggleMockFallback } = useAnalysis();
  
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedBenchmark, setAnimatedBenchmark] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [examplesModalOpen, setExamplesModalOpen] = useState(false);

  // Paywall state — persisted for the browser session
  const [isPaid, setIsPaid] = useState(() => {
    try { return sessionStorage.getItem('vurdict_paid') === 'true'; }
    catch { return false; }
  });

  const handleUnlock = () => {
    try { sessionStorage.setItem('vurdict_paid', 'true'); } catch {}
    setIsPaid(true);
  };

  // Esc key listener for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setExamplesModalOpen(false);
        setChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Direct access safety: seed with mock if empty
  useEffect(() => {
    if (!state.report && state.status === 'idle') {
      toggleMockFallback();
    }
  }, [state.report, state.status, toggleMockFallback]);

  // Animate scores when dimension changes
  useEffect(() => {
    if (!state.report) return;
    
    // Minimal re-definition of dimensions just for the effect target
    const dimensionsList = [
      { slug: 'structural_logic', key: 'process_visibility', benchmark: 85 },
      { slug: 'critical_thinking', key: 'problem_framing', benchmark: 75 },
      { slug: 'visual_execution', key: 'visual_quality', benchmark: 80 },
      { slug: 'impact_evidence', key: 'outcome_impact', benchmark: 70 },
      { slug: 'narrative_tone', key: 'trust_cta', benchmark: 75 },
      { slug: 'positioning_clarity', key: 'niche_positioning', benchmark: 80 }
    ];
    const activeDim = dimensionsList.find(d => d.slug === dimSlug) || dimensionsList[0];
    const activeData = state.report.categories[activeDim.key] || { score: 62 };

    let startTimestamp = null;
    const duration = 1000;
    const targetScore = activeData.score;
    const targetBench = activeDim.benchmark;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.floor(easeProgress * targetScore));
      setAnimatedBenchmark(Math.floor(easeProgress * targetBench));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [dimSlug, state.report]);

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
    { label: 'Structural Logic', slug: 'structural_logic', key: 'process_visibility', icon: Workflow, desc: 'Evaluates the flow of your case study, ensuring problem statements connect logically to delivered solutions.', benchmark: 85 },
    { label: 'Critical Thinking', slug: 'critical_thinking', key: 'problem_framing', icon: Microscope, desc: 'Checks for evidence of research-driven decisions rather than purely aesthetic choices.', benchmark: 75 },
    { label: 'Visual Execution', slug: 'visual_execution', key: 'visual_quality', icon: SwatchBook, desc: 'Analysis of spacing, typography, hierarchy, and adherence to modern UI principles and accessibility.', benchmark: 80 },
    { label: 'Impact Evidence', slug: 'impact_evidence', key: 'outcome_impact', icon: TrendingUp, desc: 'Scans for quantifiable metrics and business outcomes that demonstrate the value of your work.', benchmark: 70 },
    { label: 'Narrative Tone', slug: 'narrative_tone', key: 'trust_cta', icon: Feather, desc: 'Assesses professional voice and clarity, ensuring your writing is concise yet persuasive.', benchmark: 75 },
    { label: 'Positioning Clarity', slug: 'positioning_clarity', key: 'niche_positioning', icon: Target, desc: 'Verifies whether the portfolio communicates who the designer is and what they specialize in.', benchmark: 80 }
  ];

  const activeDim = dimensionsList.find(d => d.slug === dimSlug) || dimensionsList[0];
  const activeData = report.categories[activeDim.key] || { score: 62, explanation: 'Needs work' };

  // Status badge helper
  const getBadge = (score) => {
    const band = getScoreBand(score);
    let style = 'text-rose-700 bg-rose-50 border-rose-100';
    if (score >= 86) style = 'text-violet-700 bg-violet-50 border-violet-100';
    else if (score >= 71) style = 'text-emerald-700 bg-emerald-50 border-emerald-100';
    else if (score >= 51) style = 'text-amber-700 bg-amber-50 border-amber-100';
    else if (score >= 31) style = 'text-orange-700 bg-orange-50 border-orange-100';
    
    return { label: band.label, tooltip: band.tooltip || band.description, style };
  };

  const badge = getBadge(activeData.score);
  const DimIcon = activeDim.icon;

  // Custom breakdowns depending on selected dimension
  const getDetails = (slug, goal, experience) => {
    const audience = goal === 'win_clients' ? 'client' : 'hiring manager';
    const audienceLabel = goal === 'win_clients' ? 'Potential clients' : 'Recruiters';
    const audiencePlural = goal === 'win_clients' ? 'clients' : 'hiring managers';
    const levelTrait = experience === 'senior' ? 'senior-level' : experience === 'mid' ? 'mid-level' : 'junior-level';

    const roleExpectationWhy = (baseSenior, baseMid, baseJunior) => {
      if (experience === 'senior') return baseSenior;
      if (experience === 'mid') return baseMid;
      return baseJunior;
    };

    switch (slug) {
      case 'structural_logic':
        return {
          why: roleExpectationWhy(
            `As a senior designer, this case study should demonstrate not just what you did but the strategic narrative behind it. Hiring managers expect a clear problem-to-outcome arc that shows leadership thinking.`,
            `This case study presents information but lacks a clear narrative arc connecting the problem to your process to the final outcome. ${audienceLabel} need to follow your thinking start-to-finish without filling in gaps.`,
            `This case study presents information but lacks a clear narrative arc. At a junior level, ${audienceLabel} want to see that you understand the basic structure of a design project: problem → process → outcome. Make it easy to follow.`
          ).replace(/Hiring managers/g, audience === 'client' ? 'Clients' : 'Hiring managers'),
          working: [
            { title: 'Problem Statement Provided', desc: 'The case study includes a problem statement that establishes context.' },
            { title: 'Process Sections Included', desc: 'Dedicated process sections show how you approached the project.' },
            { title: 'Final Outcomes Shown', desc: 'Final designs and results are displayed for this case study.' }
          ],
          improve: [
            { title: 'Connect Decisions to Problems', desc: 'Every design decision should explicitly reference the user need or constraint that drove it, with no unexplained choices.' },
            { title: 'Add Milestone Headers', desc: `Break your process into 3-5 scannable phases (Discover → Define → Design → Deliver) so ${audiencePlural} can follow your narrative in seconds.` },
            { title: 'Include Before/After Comparison', desc: 'Add a side-by-side visual showing the problem state vs. your solution for immediate impact.' }
          ],
          evidence: [
            { title: 'Project Flow', desc: 'The project follows a logical problem-to-solution sequence.' },
            { title: 'User Flow Diagram', desc: 'Clear information architecture showing user navigation paths.' }
          ],
          recommendation: {
            title: 'Build a Tight Problem-to-Outcome Narrative for This Case Study',
            desc: `${audienceLabel} decide whether to keep reading in under 10 seconds. This case study needs a tight arc: hook them with the outcome, walk them through your key decisions, and prove your impact with specific results.`,
            steps: [
              'Open the case study with a 2-sentence hook: "What was the challenge, and what was the result?" This lets readers grasp the value before diving into details.',
              'Organize your process into exactly 3-5 phases with descriptive headers (e.g., "Research → Define → Ideate → Build → Launch"). Each phase should have 2-3 bullet points max.',
              'For every major design decision shown in your screenshots, add a 1-line annotation explaining the reasoning: "Moved the CTA above the fold because heatmaps showed 73% of users never scrolled past the hero."',
              'Close with a results section that includes a before/after comparison (visual or data) and at least 1 quantifiable outcome (even an estimate is better than nothing).'
            ]
          }
        };
      case 'critical_thinking':
        return {
          why: roleExpectationWhy(
            `At a senior level, ${audienceLabel} expect research rigor that drives strategy. This case study mentions research but lacks synthesized insights. Senior designers demonstrate how research directly shaped product direction, not just UI decisions.`,
            `This case study shows surface-level research but lacks depth in user insights and competitive analysis. ${audienceLabel} look for evidence that your decisions are research-driven, not assumption-driven.`,
            `At a junior level, ${audienceLabel} want to see that you understand the value of research. This case study mentions research but doesn't clearly show how it influenced your design decisions. Start connecting the dots between what you learned and what you built.`
          ),
          working: [
            { title: 'User Interviews Mentioned', desc: 'You reference user interviews in the project, establishing a research baseline.' },
            { title: 'Personas Present', desc: 'Personas are included and map to the target audience.' },
            { title: 'Pain Points Outlined', desc: 'User pain points are identified and described clearly.' }
          ],
          improve: [
            { title: 'Add Verbatim Interview Quotes', desc: 'Include 3-5 direct user quotes per project to make insights tangible and credible.' },
            { title: 'Include a Competitor Analysis Matrix', desc: 'Show a simple 2x2 grid comparing 3-5 competitors across key features to prove market awareness.' },
            { title: 'Document Problem Validation', desc: 'Show how you validated the problem existed before designing, such as survey data, analytics, support tickets, or usability test findings.' }
          ],
          evidence: [
            { title: 'User Research', desc: '3 user interviews conducted. Good start but lacks synthesized insights.', image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=120&h=80&fit=crop&auto=format' },
            { title: 'Persona Definition', desc: 'Well-defined persona with goals, pain points, and behaviors documented.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=80&fit=crop&auto=format' },
            { title: 'Problem Statement', desc: 'Clear problem statement but no data backing up why it matters.', image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Validate Every Design Decision with Qualitative and Quantitative Research',
            desc: 'The difference between a good designer and a great one is evidence. Every claim in your case study should be backed by research: user quotes, analytics data, competitive analysis, or usability metrics. Make your thinking visible and provable.',
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
          why: roleExpectationWhy(
            `For a senior designer, visual execution must be pixel-perfect and inclusive. The foundations here are solid but gaps in accessibility, responsiveness, and micro-interaction polish are significant — ${audienceLabel} expect senior-level craftsmanship across all edge cases.`,
            `The visual foundations in this case study are solid, featuring good typography and grid usage. The gaps are in accessibility compliance, responsive behavior at breakpoints, and micro-interaction polish — ${audienceLabel} expect thoroughness at this level.`,
            `Good visual foundations with solid typography and grid usage. At a junior level, ${audienceLabel} want to see that you understand the basics of spacing, hierarchy, and consistency. Closing the gaps on accessibility and responsiveness will show you're ready for the next level.`
          ),
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
            { title: 'Typography System', desc: 'Excellent type scale and contrast ratios on hero and body text.', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=120&h=80&fit=crop&auto=format' },
            { title: 'Layout Structure', desc: 'Clean card layout with consistent spacing and alignment.', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Audit the Visual System for Accessibility, Responsiveness, and Micro-Interactions',
            desc: 'You\'re 80% of the way to a polished visual system. The remaining 20% (contrast compliance, responsive edge cases, and interaction design) is what separates good from great. These are quick wins that dramatically improve perceived quality.',
            steps: [
              'Run every color pairing through a WCAG contrast checker (use Stark or axe DevTools). Fix any pairings below 4.5:1 ratio for small text or 3:1 for large text. Start with badges, captions, and placeholder text, which are the most common failures.',
              'Open the page at 320px width. If any layout breaks (overflow, cramped cards, collapsed menus), fix it with responsive utility classes. Test again at 768px and 1440px.',
              'Add micro-interactions to all interactive elements: buttons should scale 1.02 on hover, cards should lift with shadow, links should underline smoothly. These take 30 minutes to implement and dramatically improve the feel.',
              'Standardize your spacing to an 8px grid. Check that all margins, paddings, and gaps are multiples of 8 (or 4 for tight spacing). Inconsistent spacing is the #1 visual tell of an amateur case study.'
            ]
          }
        };
      case 'impact_evidence':
        return {
          why: roleExpectationWhy(
            `At a senior level, ${audienceLabel} expect to see clear business impact tied to your strategic decisions. This case study describes what you did but doesn't quantify the outcome. Senior designers are expected to track and communicate measurable results.`,
            `This case study describes what you did but rarely shows what happened as a result. ${audienceLabel} need proof that your work drives measurable business or user impact, not just screenshots.`,
            `At a junior level, ${audienceLabel} want to see that you understand the importance of outcomes. This case study focuses on what you did — start practicing how to tie your work to results, even if the metrics are directional.`
          ),
          working: [
            { title: 'Project Results Mentioned', desc: 'You reference outcomes in the project description, establishing a results-oriented mindset.' },
            { title: 'Visual Artifacts Shown', desc: 'Final screens, prototypes, and deliverables are displayed clearly.' }
          ],
          improve: [
            { title: 'Add 3+ Metrics Per Project', desc: 'Include specific numbers for the project: time saved, conversion lift, engagement rate, support ticket reduction, NPS score, etc.' },
            { title: 'Show Before/After Data', desc: 'Use a simple comparison (table, inline stat, or visual) so the improvement is instantly visible and undeniable.' },
            { title: 'Include Stakeholder Testimonials with Numbers', desc: 'A client quote like "Revenue grew 25% after the redesign" is infinitely more powerful than "The client was happy with the work."' }
          ],
          evidence: [
            { title: 'Outcome Section', desc: 'References qualitative results but lacks specific metrics.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop&auto=format' },
            { title: 'Client Feedback', desc: 'Positive testimonial included but no quantifiable outcomes referenced.', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Quantify Every Outcome: If You Can\'t Measure It, Frame It',
            desc: 'Impact is not subjective. Train yourself to identify concrete metrics for every project. Even qualitative outcomes can be quantified: "Shipped to 50K+ users with zero critical bugs" or "Approved by stakeholders on first presentation." If you don\'t have hard data, use proxy metrics that demonstrate scale or quality.',
            steps: [
              'Audit this case study and find at least 3 metrics you can report: time saved, conversion rate change, engagement increase, NPS score, support tickets reduced, pages per session, task success rate, or revenue impact. Look in analytics, client reports, or post-launch data.',
              'Present every metric as a before/after comparison. Template: "Reduced X by Y% (from A to B)" or "Improved Z from A to B in [timeframe]." If exact data is unavailable, use reasonable estimates and label them as such.',
              'Include a 1-line impact summary at the top of the case study, right after the project title. Example: "Redesigned the onboarding flow, resulting in a 34% increase in completed registrations and a 12% decrease in support tickets." This hooks skimmers immediately.',
              'For projects with no accessible metrics, use scale proxies: "Served 200K+ monthly active users," "Used by the design team of 12 across 3 product lines," or "Presented to C-suite stakeholders who approved on first review."'
            ]
          }
        };
      case 'narrative_tone':
        return {
          why: roleExpectationWhy(
            `Senior designers are expected to communicate with authority and strategic clarity. Your writing is grammatically sound but lacks the persuasive edge needed to influence stakeholders. ${audienceLabel} expect senior-level communication that leads with outcomes and drives action.`,
            `Your writing is grammatically sound but lacks the persuasive edge needed to turn readers into ${audience === 'client' ? 'paying clients' : 'hires'}. This case study reads as a report, not a pitch: passive voice, buried outcomes, and no call to action.`,
            `At a junior level, ${audienceLabel} want to see clear, professional communication. Your writing is grammatically sound, but try using more active voice and leading with results to make your case studies more compelling.`
          ),
          working: [
            { title: 'Professional Language', desc: 'Your writing is polished with appropriate design terminology and good grammar.' },
            { title: 'Clear Section Organization', desc: 'The case study is structured into readable, logical sections.' }
          ],
          improve: [
            { title: 'Eliminate Passive Voice', desc: 'Replace "was designed" with "I designed," "was improved" with "I improved." Active voice conveys ownership and confidence.' },
            { title: 'Lead with the Outcome', desc: 'Open the case study with the result, not the process. Hook readers with impact before explaining how you got there.' },
            { title: 'Add a Call to Action', desc: 'The case study should end with a next step — view the live site, download a PDF, or contact you. Don\'t leave readers hanging.' }
          ],
          evidence: [
            { title: 'Writing Quality', desc: 'Consistent professional tone with strong grammar and vocabulary.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=120&h=80&fit=crop&auto=format' },
            { title: 'Project Introduction', desc: 'Clear opening paragraph, though the outcome is buried.', image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Rewrite This Case Study with Active Voice, Outcome-First Hooks, and Strong CTAs',
            desc: `This case study is a sales document. Every sentence should either inform, persuade, or drive action. Strip passive language, lead with results, and always tell the reader what to do next. This single shift transforms how ${audiencePlural} perceive your work.`,
            steps: [
              'Audit the case study and flag every passive construction ("was done," "were created," "was designed"). Replace each one with active voice using "I" or "we." This immediately signals ownership and confidence; it is the highest-leverage edit you can make.',
              'Rewrite the first 2 sentences of this case study using this template: "[Action] resulted in [outcome] for [audience]." Example: "Redesigned the checkout flow, resulting in a 28% increase in completed purchases for 50K+ monthly users." Then explain your process below.',
              'End the case study with a specific call to action: "View the live product," "Read the full case study," or "Interested in a similar project? Let\'s talk." Link to your contact page or a working prototype.',
              'Read the case study aloud. If any sentence feels passive, uncertain, or vague, rewrite it. Your default tone should be: "I identified a problem, I solved it, and here\'s the proof." Confidence is contagious.'
            ]
          }
        };
      case 'positioning_clarity':
        return {
          why: roleExpectationWhy(
            `For a senior designer, your positioning should be sharp and unmistakable. ${audienceLabel} scanning your work should immediately understand your niche, the problems you solve, and the impact you deliver. This case study doesn't communicate a clear specialty.`,
            `This case study doesn't clearly communicate what you specialize in or who you design for. ${audienceLabel} scanning your work should know your niche within 3 seconds. If they have to guess, they move on.`,
            `At a junior level, ${audienceLabel} understand you're still finding your niche. However, even early-career designers benefit from signaling what you're best at. Try framing this project around a specific type of problem you enjoy solving.`
          ),
          working: [
            { title: 'Project Well Displayed', desc: 'The case study showcases your work with strong visuals and descriptions.' },
            { title: 'Design Competency Evident', desc: 'Your work clearly demonstrates strong product design skills.' }
          ],
          improve: [
            { title: 'Write a 1-Sentence Positioning Statement', desc: 'Use this template: "I design [type of product] for [specific audience] that [key outcome]." Place it near the top of your case study.' },
            { title: 'Tag Projects by Domain', desc: 'Label the case study with its industry (fintech, healthcare, SaaS, e-commerce, etc.) so your specialization is immediately visible.' },
            { title: 'Add a Brief About Section', desc: 'Include a short paragraph about your background and what you\'re looking for.' }
          ],
          evidence: [
            { title: 'Project Focus', desc: 'Good project but no clear thematic specialization is communicated.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=80&fit=crop&auto=format' },
            { title: 'Introduction', desc: 'Basic intro is present but lacks a strong positioning hook.', image: 'https://images.unsplash.com/photo-1432889821006-3149403d8c5e?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Define Your Niche and Make It the First Thing Readers See',
            desc: `The best case studies answer one question in under 3 seconds: "What does this designer specialize in?" If yours doesn't, ${audiencePlural} will not invest time figuring it out. Decide what you want to be known for, then make it impossible to miss.`,
            steps: [
              'Write a 1-sentence positioning statement: "I design [type of product] for [specific audience] that [key outcome]." Example: "I design B2B SaaS platforms for fintech startups that simplify complex financial workflows." This goes near the top of your case study.',
              'Categorize the case study by industry or domain (fintech, healthtech, e-commerce, etc.) so your specialization is immediately clear.',
              'Add a 1-paragraph section about your background: your specialization, design philosophy, and the type of problems you solve best.',
              `Ensure your case study URL, LinkedIn headline, and resume all use the same positioning language. Consistency across channels signals intentionality and builds trust with ${audiencePlural}.`
            ]
          }
        };
      default:
        return {
          why: activeData.explanation,
          working: [
            { title: 'Clear Structure', desc: 'The case study is easy to navigate and understand.' },
            { title: 'Professional Formatting', desc: 'Consistent use of sections keeps the writeup organized.' }
          ],
          improve: [
            { title: 'Highlight Key Takeaways', desc: 'Bold key phrases and lead sentences to support rapid scanning.' },
            { title: 'Condense Lengthy Writeups', desc: 'Break down large text paragraphs into bullet lists.' }
          ],
          evidence: [
            { title: 'Chronological Structure', desc: 'Logical chapter outline lets readers navigate the case study.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=80&fit=crop&auto=format' }
          ],
          recommendation: {
            title: 'Refine the Storytelling for Rapid Skimming',
            desc: 'Synthesize details into high-level takeaways. Design for readers who scan rather than read line-by-line.',
            steps: [
              'Keep paragraphs limited to a maximum of 3 sentences.',
              'Use outcome-focused headers instead of generic titles (e.g. "The Redesign That Boosted Conversions by 34%").',
              'Highlight 2-3 key insights in callout boxes.'
            ]
          }
        };
    }
  };

  const details = getDetails(activeDim.slug, state.goal, state.experience);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      <Navbar />

      {/* ── Floating "Back to Results" button ── */}
      <div className="sticky top-40 z-40 w-full h-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-end">
          <button
            onClick={() => navigate('/results')}
            className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200 backdrop-blur-md border border-slate-200/50 shadow-sm text-slate-700 text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={13} />
            <span>Back to Results</span>
          </button>
        </div>
      </div>

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
                        <SidebarIcon size={18} className={`${isSelected ? 'text-brand-900' : 'text-slate-400 group-hover:text-slate-600'} shrink-0`} />
                        <div>
                          <div className={`text-xs font-semibold ${isSelected ? 'text-brand-900 font-semibold' : 'text-slate-700 group-hover:text-slate-950'}`}>{dim.label}</div>
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

          {/* Right Column: Dimension Details Main Panel (lg:col-span-9) — paywalled */}
          <div className="lg:col-span-9 space-y-6 relative">

            {/* ── FREE: Main header block (score + badge — always visible) ── */}
            <div className="bg-white text-slate-900 border border-slate-100 p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <DimIcon size={26} className="text-brand-900 shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{activeDim.label}</h2>
                  <p className="text-xs text-slate-455 font-normal leading-relaxed max-w-xl mt-1">{activeDim.desc}</p>
                </div>
              </div>

              {/* Score gauges */}
              <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-[9px] font-normal uppercase tracking-wide text-slate-455 block">Your Score</span>
                  <span className="text-2xl font-semibold text-slate-900 mt-0.5 block">{animatedScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
                  
                  <div className="mt-1.5 relative inline-flex items-center gap-1.5">
                    <span className={`inline-block text-[8px] font-normal uppercase tracking-wide px-2 py-0.5 rounded-full border ${badge.style}`}>
                      {badge.label}
                    </span>
                    <button
                      onMouseEnter={() => setTooltipVisible(true)}
                      onMouseLeave={() => setTooltipVisible(false)}
                      onFocus={() => setTooltipVisible(true)}
                      onBlur={() => setTooltipVisible(false)}
                      className="h-4 w-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-400 text-[9px] font-bold transition-colors cursor-help"
                      aria-label="What does this score mean?"
                    >?</button>
                    {tooltipVisible && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-slate-900 text-white text-[11px] font-normal leading-relaxed rounded-xl px-3 py-2 shadow-xl z-50 pointer-events-none text-left">
                        <p className="font-semibold text-white mb-0.5">{badge.label}</p>
                        <p className="text-slate-300">{badge.tooltip}</p>
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-900" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-normal uppercase tracking-wide text-slate-455 block">Industry Benchmark</span>
                  <span className="text-2xl font-semibold text-slate-600 mt-0.5 block">{animatedBenchmark} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
                  <div className="w-24 h-1.5 rounded bg-slate-100 mt-2.5 overflow-hidden">
                    <div className="h-full bg-slate-400 rounded" style={{ width: `${animatedBenchmark}%`, transition: 'width 1000ms cubic-bezier(0.22,1,0.36,1)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── LOCKED: Detailed analysis + Recommendation ── */}
            <div className="relative">

              {/* Locked content — rendered but visually hidden behind overlay when !isPaid */}
              <div className={`space-y-6 ${!isPaid ? 'pointer-events-none select-none' : ''}`} aria-hidden={!isPaid}>

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
                          <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
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
                          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
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
                        <div key={i} className="flex gap-3">
                          <EvidenceIcon title={item.title} />
                          <div>
                            <h5 className="text-xs font-semibold text-slate-900">{item.title}</h5>
                            <p className="text-[9px] text-slate-455 font-normal leading-relaxed mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Row 2: Full-width Recommendation */}
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

              </div>{/* end locked content */}

              {/* Paywall overlay — shown until payment is confirmed */}
              {!isPaid && (
                <PaywallOverlay onUnlock={handleUnlock} />
              )}

            </div>{/* end relative wrapper */}

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
                We are compiling real case studies from top designers to show what these improvements look like in practice.
              </p>
              <div className="mt-5">
                <WaitlistForm feature="Example Case Studies" buttonText="Notify Me" placeholder="your@email.com" />
              </div>
             <button
               onClick={() => setExamplesModalOpen(false)}
               className="w-full mt-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 text-sm font-medium transition-all cursor-pointer"
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

        <Footer />
      </div>

      {/* Co-Pilot AI Chatbox Drawer (Floating Bubble UI) */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[calc(100vh-6rem)] bg-white shadow-[0_20px_50px_rgba(23,37,84,0.15)] border border-slate-100 rounded-[32px] flex flex-col justify-between overflow-hidden animate-fade-in-up">
          {/* Header with Wavy top accent styling */}
          <div className="relative pt-6 pb-4 px-6 flex items-center justify-between bg-brand-900 text-white overflow-hidden shrink-0">
            {/* Embedded Wave Accent at bottom of header */}
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[12px] text-white fill-current">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,145.61,42.47,205,52.34,264.48,56.44Z"></path>
              </svg>
            </div>
            
            <div className="flex items-center gap-2.5 relative z-10">
              <MessageCircle size={20} className="text-sky-300 animate-pulse" />
              <div>
                <h4 className="text-xs font-semibold leading-none">Design Co-Pilot</h4>
                <span className="text-[9px] text-sky-100/70 font-normal mt-0.5 block">Your Design Lead Best Friend</span>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="px-3 py-1 rounded-xl text-xs font-normal text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer relative z-10"
            >
              Close
            </button>
          </div>

          {/* Coming Soon Showcase Inside Chatbox */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white space-y-5">
            <div className="w-48 h-auto flex items-center justify-center">
              <img 
                src={comingSoonIllustration} 
                alt="Co-Pilot Coming Soon" 
                className="w-full h-auto object-contain select-none"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-slate-900">Co-Pilot is wrapping up work</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed max-w-xs mx-auto">
                Join the waitlist to be notified when your design bestie is cleared for landing.
              </p>
            </div>

            <div className="w-full max-w-xs">
              <WaitlistForm feature="Co-Pilot" buttonText="Notify Me" placeholder="your@email.com" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
