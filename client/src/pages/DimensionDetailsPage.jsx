import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAnalysis, getScoreStatus } from '../context/AnalysisContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WaveDivider from '../components/WaveDivider';
import WaitlistForm from '../components/WaitlistForm';
import examplesComingSoonIllustration from '../assets/examples_coming_soon_illustration.png';
import {
  Workflow,
  Microscope,
  SwatchBook,
  TrendingUp,
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

function renderBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

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
    if (score >= 86) return { label: 'Exceptional', style: 'text-violet-700 bg-violet-50 border-violet-100' };
    if (score >= 71) return { label: 'Strong', style: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
    if (score >= 51) return { label: 'Competitive', style: 'text-amber-700 bg-amber-50 border-amber-100' };
    if (score >= 31) return { label: 'Early Foundation', style: 'text-orange-700 bg-orange-50 border-orange-100' };
    return { label: 'Significant Gaps', style: 'text-rose-700 bg-rose-50 border-rose-100' };
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

  const allDimensionsData = dimensionsList.map(dim => {
    const dimData = report.categories[dim.key] || { score: 62, explanation: '' };
    const dimDetails = getDetails(dim.slug, state.goal, state.experience);
    return {
      label: dim.label,
      score: dimData.score,
      explanation: dimData.explanation,
      improve: dimDetails.improve,
      working: dimDetails.working,
      recommendation: dimDetails.recommendation,
    };
  });

  const overallScore = report.overall_score || 0;
  const allImproveItems = allDimensionsData.flatMap(d => d.improve);
  const allWorkingItems = allDimensionsData.flatMap(d => d.working);

  const [chatOpen, setChatOpen] = useState(false);
  const [examplesModalOpen, setExamplesModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const lastTopicRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  useEffect(() => {
    if (chatOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current.focus(), 100);
    }
  }, [chatOpen]);

  useEffect(() => {
    if (messagesEndRef.current && (messages.length > 0 || chatLoading)) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatLoading]);

  const getApiUrl = () => import.meta.env.VITE_API_URL || '';

  const generateFallbackReply = (question, isFirst, history) => {
    const q = question.toLowerCase().trim();
    const dim = activeDim.label;
    const dimScore = activeData.score;
    const goalLabel = state.goal === 'get_hired' ? 'getting hired' : 'winning clients';
    const prefix = isFirst ? 'Hi, bestie. ' : '';
    const recSteps = details?.recommendation?.steps || [];
    const improveData = details?.improve || [];
    const workingData = details?.working || [];
    const prevTopic = lastTopicRef.current;

    const asstMessages = history ? history.filter(m => m.role === 'assistant') : [];
    const lastAsst = asstMessages[asstMessages.length - 1];
    const lastAsstContent = lastAsst?.content?.toLowerCase() || '';
    const prevAsst = asstMessages[asstMessages.length - 2];
    const prevAsstContent = prevAsst?.content?.toLowerCase() || '';

    const pickItem = (arr, usedKey) => {
      const used = asstMessages.map(m => m.content?.toLowerCase() || '');
      const fresh = arr.filter((_, i) => !used.some(u => u.includes(arr[i][usedKey || 'title']?.toLowerCase()?.slice(0, 30) || '')));
      return fresh.length > 0 ? fresh[0] : arr[0];
    };

    const wordCount = q.split(/\s+/).length;
    const deepWords = ['how', 'what', 'why', 'tell', 'explain', 'elaborate', 'detail', 'dive', 'walk', 'break', 'describe', 'show', 'go', 'can you', 'could you', 'would you'];
    const wordDepth = deepWords.filter(d => q.includes(d)).length;
    const isFirstQuery = asstMessages.length === 0;
    const isDeepQuery = wordCount > 8 || wordDepth >= 2 || deepWords.slice(0, 3).some(d => q.startsWith(d));
    const isTerse = wordCount <= 3 && wordDepth === 0 && !isFirstQuery;
    const depth = isTerse ? 0 : isDeepQuery ? 2 : 1;

    const intents = [
      {
        name: 'greeting', weight: 12,
        keywords: ['hello', 'hi', 'hey', 'howdy', 'good morning', 'good evening', 'sup', 'yo', 'whats up', 'what\'s up'],
        response: (depth) => {
          lastTopicRef.current = 'greeting';
          const bench = activeDim.benchmark;
          const diff = dimScore - bench;
          if (depth === 0) {
            const greet = isFirst ? 'Hi! ' : 'Hey! ';
            return `${greet}You're looking at **${dim}** (${dimScore}/100). What do you want to know?`;
          }
          if (depth === 2) {
            const gapStr = diff < 0 ? Math.abs(diff) + ' points below the ' + bench + ' benchmark' : diff + ' points above the ' + bench + ' benchmark \u2014 nice!';
            const workNote = workingData[0] ? 'One thing working well: **' + workingData[0].title + '**' : '';
            const improveNote = improveData[0] ? 'Biggest opportunity: **' + improveData[0].title + '**' : '';
            return prefix + 'Great to see you digging into **' + dim + '**! Here\'s the lay of the land:\n\nYour score: **' + dimScore + '/100** \u2014 that\'s ' + gapStr + '.\n\n' + workNote + (workNote && improveNote ? '\n\n' : '') + improveNote + '\n\nWant to explore where to improve first, or understand why you scored what you did?';
          }
          const gap = diff < 0 ? `you're **${Math.abs(diff)} points** below the benchmark of **${bench}/100**, so there's real room to grow.` : `you're beating the benchmark by **${diff} points** — nice work!`;
          return `${prefix}Welcome to the **${dim}** deep-dive. You scored **${dimScore}/100** here — ${gap}\n\nWant to explore where you can improve, or do you want the full breakdown of what's working?`;
        },
      },
      {
        name: 'joke', weight: 25,
        keywords: ['joke', 'funny', 'make me laugh', 'humor', 'crack me', 'tell me a joke', 'hilarious', 'something funny'],
        response: (_depth) => {
          const jokes = [
            'Why did the designer break up with their grid? Too many constraints. It was a spaced-out relationship anyway.',
            'How many designers does it take to change a lightbulb? Just one, but they\'ll spend 3 hours debating whether it should be 8px or 12px from the ceiling, then ask "what\'s the user intent for turning it on?"',
            'A UX designer walks into a bar… then leaves because the door was confusing. Comes back, tries to pull a door that clearly says PUSH. Files a usability report.',
            'Why was the case study sad? It had no call to action. It just sat there, waiting for someone to care.',
            'What does a hiring manager say to a portfolio with no metrics? "I\'ll keep your resume on file." (They won\'t.)',
            'Why did the button get rejected? Low contrast. The hiring manager couldn\'t see the point.',
            'A UI walks into a bar and says "I\'ll have a beer." The bartender says "That\'ll be $4." The UI says "Make it pop. And can you move the logo 2px left?"',
            'Why don\'t designers ever play hide and seek? Because good visibility is their whole thing. Also, they\'d spend too long defining the game rules.',
            'What\'s a designer\'s favorite color? Doesn\'t matter, as long as it\'s on brand and passes WCAG AA.',
            'Why did the UX researcher break up with the developer? They weren\'t on the same page. Literally. The dev was on page 12 of the spec, the researcher was still recruiting participants.',
            'What do you call a designer who doesn\'t use a grid? A layout casualty.',
            'Why did the senior designer get promoted? They knew when to use 16px and when to use 20px. The juniors were still asking.',
            'A designer\'s favorite exercise? Running user tests. Their least favorite? Running out of font licenses.',
            'Why did the portfolio reviewer cry? There was too much Lorem Ipsum and not enough context.',
            'What\'s a hiring manager\'s favorite GitHub repo? The one with a README that actually explains the design decisions.',
            'Why don\'t designers trust atoms? They make up everything — including the 8px grid.',
            'What did the button say to the CTA? "Stop pushing me, I\'m already converting."',
            'Why did the wireframe go to therapy? It felt too boxed in and lacked visual hierarchy.',
            'How do you know a designer has been working too late? They start kern-ing their grocery list.',
            'A junior designer\'s portfolio: "Here\'s what I did." A senior designer\'s portfolio: "Here\'s why it mattered. And here\'s the revenue lift."',
            'Why was the Figma file stressed? Too many unsolved conflicts and a component that turned into a nightmare.',
            'What\'s the difference between a junior and a senior designer? The senior knows when to break the grid. The junior doesn\'t know there IS a grid.',
            'A designer\'s love letter: "Roses are #FF0000, violets are #0000FF, my portfolio is responsive, and I\'d love to work with you."',
            'What do you say to a designer who only uses auto-layout? "You\'ve got your life together, huh."',
            'Why did the design system break up with the developer? The developer kept overriding its variables. That\'s not how relationships work.',
          ];
          lastTopicRef.current = 'joke';
          const tip = pickItem(improveData, 'title') || recSteps[0] || null;
          const action = tip
            ? `Now back to business — here's one real thing you can do right now: **${tip.title || tip}**`
            : `Alright, back to work — want me to walk through how to improve your **${dim}** score?`;
          return `${prefix}${jokes[Math.floor(Math.random() * jokes.length)]}\n\n${action}`;
        }
      },
      {
        name: 'score', weight: 20,
        keywords: ['score', 'scores', 'scored', 'rating', 'grade', 'rank', 'how did i do', 'how\'d i do', 'did i do', 'is this good', 'is that good', 'what does this mean', 'explain my', 'explain the', 'breakdown', 'analysis', 'result', 'results', 'overview', 'summary', 'interpret', 'understand', 'make sense', 'tell me about it', 'tell me about my', 'how is my', 'what\'s my', 'what is my', 'how am i doing', 'where do i stand', 'what do you think'],
        response: (depth) => {
          lastTopicRef.current = 'score';
          const tip = pickItem(improveData, 'title');
          const explanation = activeData.explanation || '';
          const bench = activeDim.benchmark;
          const status = dimScore >= 86 ? 'exceptional' : dimScore >= 71 ? 'strong' : dimScore >= 51 ? 'competitive' : 'early-stage';
          if (depth === 0) {
            return `${prefix}**${dimScore}/100** — ${status}. ${tip ? `Try: **${tip.title}**` : ''} Anything else?`;
          }
          if (depth === 2) {
            const summary = explanation.split('. ').slice(0, 3).join('. ') || '';
            const benchNote = dimScore >= bench
              ? `You're **above** the **${bench}** benchmark — that's a strong position to optimize from.`
              : `The **${bench}** benchmark is **${bench - dimScore} points** ahead — here's how to close that.`;
            const tipNote = tip
              ? `\n\nHighest-leverage move: **${tip.title}**\n${tip.desc}`
              : '';
            const steps = recSteps.length > 0 ? `\n\nQuick action plan:\n${recSteps.slice(0, 2).map((s, i) => `${i + 1}. ${s}`).join('\n')}` : '';
            return `${prefix}Let's break down your **${dim}** score of **${dimScore}/100**.\n\n**${status}**. ${summary} ${benchNote}${tipNote}${steps}\n\nWant to dive deeper into any of these points, or move to another dimension?`;
          }
          const summary = explanation.split('. ').slice(0, 2).join('. ') || '';
          const benchNote = dimScore >= bench
            ? `You're actually **above** the industry benchmark of **${bench}/100**, which is a great sign.`
            : `The industry benchmark is **${bench}/100**, so you've got **${bench - dimScore} points** of headroom.`;
          const tipNote = tip
            ? `\n\nIf you want to close that gap, start here: **${tip.title}** — ${tip.desc}`
            : '';
          return `${prefix}Your **${dim}** score is **${dimScore}/100** — that's **${status}**. ${summary} ${benchNote}${tipNote}\n\nWant me to walk you through the specific improvement steps, or compare this to another dimension?`;
        },
      },
      {
        name: 'improve', weight: 20,
        keywords: ['improve', 'improvement', 'fix', 'better', 'how can i', 'how do i', 'what should i', 'tip', 'tips', 'advice', 'suggest', 'suggestion', 'recommend', 'recommendation', 'level up', 'upgrade', 'grow', 'enhance', 'strengthen', 'next step', 'next steps', 'where to start', 'what now', 'what next', 'what\'s next', 'action', 'actionable', 'priority', 'most important', 'biggest', 'weakness', 'weak', 'gaps', 'gap', 'what to do', 'what do i do', 'action plan', 'plan'],
        response: (depth) => {
          lastTopicRef.current = 'improve';
          const fresh = pickItem(improveData, 'title');
          if (depth === 0 && improveData.length > 0) {
            return `${prefix}Quick win: **${improveData[0].title}**. ${improveData[0].desc.split('.')[0]}. Want more?`;
          }
          if (improveData.length > 0) {
            const items = depth === 2 ? improveData : improveData.slice(0, 2);
            const steps = items.map((i, idx) => `${idx + 1}. **${i.title}** — ${i.desc}`).join('\n\n');
            const note = fresh ? '' : '\n\nI shared some of these before, but they\'re worth repeating — each one is impactful.';
            const closer = depth === 2
              ? `\n\nPick one and try it this week. Come back and tell me how it went — I can help you iterate.`
              : `\n\nWhich one feels most relevant to your situation? I can break down exactly how to apply it.`;
            return `${prefix}Here's your improvement roadmap for **${dim}**:\n\n${steps}${note}${closer}`;
          }
          if (recSteps.length > 0) {
            const steps = recSteps.slice(0, depth === 2 ? undefined : 2).map((s, idx) => `${idx + 1}. ${s}`).join('\n\n');
            return `${prefix}Here's where I'd start:\n\n${steps}\n\nPick any step and I'll walk you through it in detail.`;
          }
          return `${prefix}The key lever for **${dim}** is making your thinking visible. Focus on showing **why** you made each decision, not just **what** you did. Want me to give you a specific example?`;
        },
      },
      {
        name: 'elaborate', weight: 18,
        keywords: ['elaborate', 'tell me more', 'go deeper', 'expand', 'more detail', 'more details', 'explain more', 'about that', 'can you explain', 'walk me', 'dive', 'dive deeper', 'break it down', 'break down', 'further', 'specific', 'particular', 'elaboration', 'in detail', 'details on', 'tell me about the', 'what does that', 'how does that', 'why is that', 'what do you mean', 'can you tell', 'i don\'t understand', "i don't understand", 'not sure what', 'confused'],
        response: (depth) => {
          lastTopicRef.current = 'elaborate';
          if (depth === 0) {
            if (improveData.length > 0) {
              return `${prefix}Quick summary: **${improveData[0].title}** — ${improveData[0].desc.split('.')[0]}. Want the full breakdown?`;
            }
            return `${prefix}The core idea: show your reasoning behind every design choice. Want me to go deeper?`;
          }
          if (prevTopic === 'improve' && improveData.length > 0) {
            const item = pickItem(improveData, 'title');
            const extra = depth === 2
              ? `\n\nHere's the deeper play: instead of just adding annotations, restructure your case study so every major section opens with the insight that drove it. Like: "Users told us X → so we did Y → which resulted in Z." That's the narrative arc hiring managers remember.`
              : '';
            return `${prefix}Let's go deeper on **${improveData[0].title}**. The idea is:\n\n${improveData[0].desc}\n\nHere's a concrete way to apply it: start by looking at your case study and identifying one place where you made a decision without explaining the reasoning. Add a single sentence that connects it to user research, business goals, or usability data. One small annotation can change how a hiring manager reads your entire case study.${extra}\n\nWant me to elaborate on another area?`;
          }
          if (prevTopic === 'score' || prevTopic === 'greeting') {
            if (recSteps.length > 0) {
              if (depth === 2) {
                return `${prefix}Here's the full action plan with context:\n\n${recSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n\n')}\n\nEach step builds on the previous one. Step 1 sets the foundation — once you have a clear narrative arc, the metrics and positioning naturally fall into place. Want to start executing step 1 together?`;
              }
              return `${prefix}Here's the full action plan:\n\n${recSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n\n')}\n\nStep 1 is usually the highest-leverage move. Want to start there?`;
            }
          }
          if (prevTopic === 'hiring') {
            const extra = depth === 2
              ? `\n\nLet me give you a concrete example. Instead of saying "I redesigned the onboarding flow," say "I redesigned the onboarding flow, which reduced drop-off by 34% and increased daily active users by 18%." See the difference? One describes activity, the other proves impact.`
              : '';
            return `${prefix}For hiring specifically, here's what matters most:\n\nHiring managers scan portfolios for **3 things** in under 10 seconds: (1) Do they solve real problems? (2) Can they measure impact? (3) Is their thinking clear?\n\nYour **${dim}** score of **${dimScore}/100** suggests ${dimScore >= 70 ? 'you\'re solid on clarity — now focus on quantifying your outcomes.' : 'there\'s an opportunity to make your thinking more explicit.'}${extra}\n\nWant me to show you a before/after example of how to reframe a case study section?`;
          }
          if (prevTopic === 'clients') {
            const extra = depth === 2
              ? `\n\nHere's a template you can copy-paste: "I help [type of company] solve [specific problem] through [your approach]. My work has resulted in [specific outcome] for [client name or industry]." Drop that at the top of your portfolio and watch how much faster clients reach out.`
              : '';
            return `${prefix}For winning clients, positioning is everything. Clients care about:\n\n1. **Can you solve my specific problem?** — niche expertise\n2. **Have you done this before?** — relevant case studies\n3. **Can I trust you?** — testimonials, process clarity\n\nYour portfolio signals quality but doesn't answer #1 fast enough. Add a one-liner at the top: "I design [X] for [Y] that achieve [Z]."${extra}\n\nWant me to help you draft that positioning statement?`;
          }
          if (recSteps.length > 0) {
            const steps = depth === 2 ? recSteps : recSteps.slice(0, depth === 0 ? 1 : 3);
            return `${prefix}Here's the breakdown:\n\n${steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n\n')}\n\n${depth === 2 ? 'Each step is designed to compound — do them in order for maximum impact.' : 'Start with step 1 — it\'s the highest-leverage move.'} Want to dive into how to execute it?`;
          }
          if (improveData.length > 0) {
            return `${prefix}Sure! Here's more depth on each area:\n\n${improveData.map((i, idx) => `${idx + 1}. **${i.title}**: ${i.desc}`).join('\n\n')}\n\nPick the one that resonates most and I'll give you a playbook.`;
          }
          return `${prefix}The secret to improving **${dim}** is making your reasoning visible. Every design choice should answer: "Why this, and why now?" Start by picking one decision in your case study that you made intuitively and write out the reasoning. That single habit transforms how evaluators read your work.`;
        },
      },
      {
        name: 'example', weight: 15,
        keywords: ['example', 'show me', 'sample', 'template', 'reference', 'inspiration', 'similar', 'demonstrate', 'demo', 'mockup', 'real world', 'real-world', 'like this', 'for instance', 'preview', 'look like', 'show an', 'give an', 'show some'],
        response: (depth) => {
          lastTopicRef.current = 'example';
          const work = workingData.length > 0 ? workingData[0] : null;
          const improve = improveData.length > 0 ? improveData[0] : null;
          if (depth === 0 && improve) {
            return `${prefix}Here's the gist: **${improve.title}**. Want a full walkthrough?`;
          }
          const workNote = work ? `\n\nHere's something you're already doing well: **${work.title}** — ${work.desc}` : '';
          const improveNote = improve ? `\n\nAnd here's what would level it up: **${improve.title}** — ${improve.desc}` : '';
          return `${prefix}Great question! I can't show a live example in this chat, but I can describe exactly what a **${dim}**-strong case study looks like.\n\nA strong example would:${workNote}${improveNote}\n\nIf you want, I can walk you through step 1 of the recommendation above. Ready?`;
        },
      },
      {
        name: 'affirmation', weight: 8,
        keywords: ['yes', 'sure', 'yeah', 'yep', 'absolutely', 'definitely', 'let\'s', 'lets', 'please do', 'go ahead', 'i want to', 'i would love', 'i\'d love', 'tell me'],
        response: (depth) => {
          lastTopicRef.current = 'affirmation';

          if (prevTopic === 'joke') {
            const tip = pickItem(improveData, 'title');
            return `${prefix}Alright, back to business! Let's focus on **${dim}**. ${tip ? `Here's a concrete action: **${tip.title}** — ${tip.desc}` : `What aspect of **${dim}** do you want to tackle first?`}\n\nWant me to break it down further?`;
          }

          if (prevTopic === 'improve' || prevTopic === 'elaborate') {
            const step = improveData.length > 1 ? improveData[1] : improveData[0];
            if (step) {
              return `${prefix}Perfect! Let's keep going. Here's another improvement area:\n\n**${step.title}** — ${step.desc}\n\nTry implementing this one next. Need help figuring out where to start?`;
            }
          }

          if (lastAsstContent.includes('want me to walk you through') || lastAsstContent.includes('want to dive into') || lastAsstContent.includes('want me to elaborate')) {
            const step = recSteps[0] || improveData[0];
            if (step) {
              const text = step.title || step;
              const desc = step.desc || '';
              return `${prefix}Great, let's do this. Here's the first move:\n\n**${text}**${desc ? ` — ${desc}` : ''}\n\nOnce you've made that change, come back and tell me how it went — or ask me about the next step.`;
            }
          }

          if (lastAsstContent.includes('step 1') || lastAsstContent.includes('first step')) {
            const step = recSteps[1] || recSteps[0];
            return `${prefix}You're on a roll! Here's step 2:\n\n**${step}**\n\nHow does that sound? Want me to adjust based on your specific situation?`;
          }

          if (prevTopic === 'hiring' || prevTopic === 'clients') {
            return `${prefix}Alright! Let's make this practical. Here's what I'd do first:\n\n**${recSteps[0] || improveData[0]?.title || 'Review your case study with a fresh pair of eyes'}**\n\nOnce you've done that, let me know how it felt and we'll refine further.`;
          }

          const step = recSteps[0] || improveData[0] || workingData[0];
          const text = step?.title || step || 'Start by re-reading your case study and identifying one section that feels unclear.';
          return `${prefix}Love the energy! Let's start here:\n\n**${text}**\n\nWhat do you think — does this feel like the right focus area?`;
        }
      },
      {
        name: 'hiring', weight: 16,
        keywords: ['hire', 'hiring', 'hiring manager', 'recruit', 'recruiter', 'job', 'interview', 'hm', 'role', 'position', 'apply', 'application', 'career', 'promotion', 'senior', 'junior', 'mid-level', 'mid level', 'offer', 'land a', 'get hired', 'get a job', 'stand out', 'resume', 'cv', 'applicant', 'candidate', 'compete', 'competitive', 'portfolio for jobs'],
        response: (depth) => {
          lastTopicRef.current = 'hiring';
          const tip = pickItem(improveData, 'title');
          const exp = state.experience === 'senior' ? 'Senior-level' : state.experience === 'mid' ? 'Mid-level' : 'Junior-level';
          if (depth === 0) {
            const m = tip ? `Focus on: **${tip.title}**` : 'Hiring managers want metrics, not process.';
            return `${prefix}${m} Want the full hiring breakdown?`;
          }
          const actionStep = tip
            ? `\n\nFor hiring specifically, the sharpest move: **${tip.title}** — ${tip.desc}`
            : recSteps[0]
              ? `\n\nHigh-impact start: **${recSteps[0]}**`
              : '';
          if (depth === 2) {
            return `${prefix}For **${exp}** roles, here's the unfiltered truth:\n\nHiring managers spend **6-10 seconds** on a case study before deciding. In that window, they're looking for:\n- Did they solve a real problem? (problem framing)\n- Can they prove it worked? (impact metrics)\n- Do they think strategically? (decision rationale)\n\nYour **${dim}** score (**${dimScore}/100**) suggests ${dimScore >= 70 ? 'you\'ve got the basics down. Now it\'s about proving impact with numbers.' : 'there\'s a gap in how clearly you communicate your thinking.'}${actionStep}\n\nHere's an exercise: pick one section of your case study and rewrite it as: "We discovered [insight] → which led us to [decision] → resulting in [outcome]." That structure alone will double your hit rate.\n\nWant to try it together?`;
          }
          return `${prefix}For **${exp}** roles, hiring managers are scanning for **signal, not process**. They want proof you can deliver impact, not a play-by-play of your workflow.\n\nYour **${dim}** score of **${dimScore}/100** tells me ${dimScore >= 70 ? 'you\'re in a good spot — the question is whether you\'re communicating that signal clearly.' : 'there\'s an opportunity to sharpen how you present your impact.'}${actionStep}\n\nWant me to reframe one of your case study sections through a hiring manager's eyes?`;
        },
      },
      {
        name: 'clients', weight: 16,
        keywords: ['client', 'clients', 'freelance', 'freelancer', 'contract', 'gig', 'rate', 'pricing', 'proposal', 'pitch', 'sell', 'convince', 'win', 'portfolio for', 'business', 'revenue', 'income', 'pay', 'paying', 'customer', 'side project', 'agency'],
        response: (depth) => {
          lastTopicRef.current = 'clients';
          const tip = pickItem(improveData, 'title');
          if (depth === 0) {
            const m = tip ? `Quick move: **${tip.title}**` : 'Clients want speed and confidence.';
            return `${prefix}${m} Want the full client playbook?`;
          }
          const actionStep = tip
            ? `\n\nClient-winning move: **${tip.title}** — ${tip.desc}`
            : recSteps[0]
              ? `\n\nTry this to convert faster: **${recSteps[0]}**`
              : '';
          if (depth === 2) {
            return `${prefix}Clients are simple: they want to know you can solve their problem **faster and better** than they could themselves.\n\nHere's what they're thinking when they land on your portfolio:\n1. **"Do you understand my industry?"** — niche expertise signals this instantly\n2. **"Can you deliver?"** — case studies with outcomes prove capability\n3. **"How fast can we start?"** — a clear CTA with calendar link removes friction\n\nYour **${dim}** score (**${dimScore}/100**) ${dimScore >= 70 ? 'is strong. Now make sure your first sentence screams "I solve [your problem]."' : 'needs to reframe around outcomes, not process.'}${actionStep}\n\nWant to draft a client-facing one-paragraph pitch together? I'll help you write it.`;
          }
          return `${prefix}Clients buy **confidence and speed**. They want to know: "Can this person solve my problem without hand-holding?"\n\nYour **${dim}** of **${dimScore}/100** ${dimScore >= 70 ? 'says yes — now the trick is making that obvious in 3 seconds flat.' : 'needs to be framed around client outcomes, not design process.'}${actionStep}\n\nWant me to help you write a one-paragraph pitch for this case study?`;
        },
      },
      {
        name: 'gratitude', weight: 14,
        keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'you\'re helpful', 'that helps', 'that helped', 'good advice', 'great', 'perfect', 'awesome', 'got it', 'understood', 'makes sense', 'i see', 'clear'],
        response: (depth) => {
          lastTopicRef.current = 'gratitude';
          if (depth === 0) {
            const short = [`You got it! 🙌`, `Anytime!`, `Glad it helped!`];
            return `${short[Math.floor(Math.random() * short.length)]}`;
          }
          const followups = [
            `You're welcome! Keep iterating on **${dim}** — those small refinements compound into a much stronger portfolio. What else can I help you with?`,
            `Glad that clicked! The more you refine, the more confident you'll feel. Want to tackle another dimension or go deeper on **${dim}**?`,
            `Happy to help! That's literally why I'm here. Want to dig into another part of your analysis while we're at it?`,
            `Anytime! One step at a time. What's next on your mind — another dimension or a specific question about your portfolio?`,
            `Awesome, love that reaction! Remember, every portfolio is a work in progress. Want to explore a different angle?`,
          ];
          return `${followups[Math.floor(Math.random() * followups.length)]}`;
        },
      },
      {
        name: 'dismissal', weight: 30,
        keywords: ['nah', 'nope', 'no thanks', 'no thank you', 'not really', 'not now', "i'm good", 'i am good', "i'm fine", 'i am fine', 'maybe later', 'stop', 'enough', "that's all", 'that is all', "i'll pass", 'ill pass', 'never mind', 'forget it', "don't worry", 'leave it', "don't bother"],
        response: (_depth) => {
          lastTopicRef.current = 'dismissal';
          const replies = [
            "No problem at all — I'm here whenever you want to pick this up.",
            "Got it! I'll be right here when you need me.",
            "Of course — no pressure at all. Just give me a shout when you're ready.",
            "Totally understand. Your portfolio isn't going anywhere — come back anytime.",
          ];
          return `${prefix}${replies[Math.floor(Math.random() * replies.length)]}`;
        },
      },
    ];

    const bareNo = /^no[.!]?$/i.test(q);
    if (bareNo) {
      lastTopicRef.current = 'dismissal';
      const replies = [
        "No problem at all — I'm here whenever you want to pick this up.",
        "Got it! I'll be right here when you need me.",
        "Of course — no pressure at all. Just give me a shout when you're ready.",
        "Totally understand. Your portfolio isn't going anywhere — come back anytime.",
      ];
      return `${prefix}${replies[Math.floor(Math.random() * replies.length)]}`;
    }

    const scored = intents.map(intent => {
      let score = 0;
      for (const kw of intent.keywords) {
        if (q.includes(kw)) score += intent.weight;
      }
      return { ...intent, score };
    });

    const best = scored.reduce((a, b) => (a.score > b.score ? a : b));

    if (best.score > 0) {
      return best.response(depth);
    }

    const socialClues = ['how are you', "how's it going", 'how have you been', "what's up", 'are you ai', 'are you real', 'who are you', "what's your name", 'tell me about yourself', 'are you sentient', 'do you have feelings'];
    if (socialClues.some(s => q.includes(s))) {
      return `${prefix}I'm your Design Co-Pilot! I'm here to help with your portfolio — specifically your **${dim}** score. What would you like to explore?`;
    }

    const outWords = [
      'weather', 'temperature', 'rain', 'sunny', 'cloudy', 'storm',
      'recipe', 'cook', 'bake', 'food', 'drink', 'eat', 'dinner', 'lunch',
      'news', 'politics', 'election', 'president', 'war',
      'sport', 'sports', 'game', 'team', 'nba', 'nfl', 'soccer', 'football',
      'movie', 'movies', 'film', 'show', 'tv', 'netflix',
      'music', 'song', 'singer', 'album', 'spotify',
      'code', 'program', 'programming', 'coding', 'python', 'javascript',
      'math', 'calculate', 'translate', 'language',
      'poem', 'poetry', 'story', 'draw', 'art',
      'travel', 'vacation', 'trip',
    ];
    const words = q.split(/\s+/);
    if (words.some(w => outWords.includes(w))) {
      return `${prefix}I'm your portfolio co-pilot, so I stick to design career advice. Want to talk about your **${dim}** score instead?`;
    }

    const tip = pickItem(improveData, 'title');
    const otherDim = allDimensionsData.find(d => d.label !== dim && d.improve.length > 0);
    const crossTip = otherDim ? otherDim.improve[Math.floor(Math.random() * otherDim.improve.length)] : null;
    if (depth === 0) {
      return `${prefix}I can help with that. For **${goalLabel}**, your **${dim}** score is **${dimScore}/100**. ${tip ? `Try **${tip.title}**` : ''} Want to go deeper?`;
    }
    let action;
    if (tip) {
      action = `Here's a move that would help: **${tip.title}** — ${tip.desc}`;
    } else if (crossTip) {
      action = `Across your portfolio, one strong next step: **${crossTip.title}** (from **${otherDim.label}**) — ${crossTip.desc}`;
    } else {
      action = `The recommendations on this page have concrete next steps for **${dim}**.`;
    }
    const crossNote = (tip && crossTip)
      ? `\n\nAcross your portfolio, also worth looking at **${crossTip.title}** in **${otherDim.label}**.`
      : '';
    const lastTopicRefNote = prevTopic ? `\n\nWe were just talking about **${prevTopic}** — want to pick up where we left off?` : '';
    const deeper = depth === 2 ? `\n\nTell me more about what you're working on and I can tailor this further.` : '';
    return `${prefix}For **${goalLabel}**, your **${dim}** score of **${dimScore}/100** is ${dimScore >= 70 ? 'solid, with clear room to go from good to exceptional.' : 'a foundation to build on — and I can help you level it up.'} ${action}${crossNote}${lastTopicRefNote}${deeper}`;
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatLoading(true);
    let replied = false;
    try {
      const res = await fetch(`${getApiUrl()}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          dimension: activeDim.label,
          score: activeData.score,
          explanation: activeData.explanation,
          context: state.goal === 'get_hired' ? 'Get Hired at a top-tier company' : 'Win Freelance Clients',
          experience: state.experience,
          allDimensions: allDimensionsData,
          overallScore: overallScore,
          priorityActionPlan: report.priority_action_plan || [],
          fixThisFirst: report.fix_this_first || null,
        }),
        signal: AbortSignal.timeout(15000),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        data = { error: text || `Server returned ${res.status}` };
      }
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        replied = true;
      } else if (res.status === 503) {
        // Gemini unavailable — use local fallback
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || data.reply || `Server error (${res.status}). Please try again.` }]);
        replied = true;
      }
    } catch {
      // Server unreachable — use local fallback
    } finally {
      if (!replied) {
        const isFirst = !messages.some(m => m.role === 'assistant');
        const reply = generateFallbackReply(userMsg, isFirst, messages);
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      }
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-x-hidden select-none font-sans">
      
      <Navbar />

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

          {/* Right Column: Dimension Details Main Panel (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Main header block */}
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
                  <span className="text-2xl font-semibold text-slate-900 mt-0.5 block">{activeData.score} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
                  <span className={`inline-block text-[8px] font-normal uppercase tracking-wide px-2 py-0.5 rounded-full border mt-1.5 ${badge.style}`}>
                    {badge.label}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-1 max-w-[140px] leading-tight">
                    {badge.label === 'Exceptional' ? 'Outstanding quality and differentiation.' : badge.label === 'Strong' ? 'Strong execution and hiring readiness.' : badge.label === 'Competitive' ? 'Solid foundation with room to grow.' : badge.label === 'Early Foundation' ? 'Fundamentals present, gaps remain.' : 'Major improvements needed.'}
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

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 px-4">
                <MessageCircle size={32} className="text-sky-300" />
                <p className="text-xs text-slate-400 font-normal max-w-xs">
                  Ask me anything about your <span className="font-semibold text-slate-600">{activeDim.label}</span> score or how to improve it.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-900 text-white rounded-br-md'
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-sm'
                }`}>
                  {msg.content.split('\n').map((line, j) => (
                    <span key={j}>{renderBold(line)}<br /></span>
                  ))}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="shrink-0 p-3 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
              <input
                ref={chatInputRef}
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask for advice..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-300 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="rounded-xl bg-brand-900 hover:bg-brand-800 disabled:bg-slate-200 disabled:text-slate-400 text-white px-4 py-2.5 text-xs font-medium transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
