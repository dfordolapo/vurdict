import { GoalType, DimensionResult } from './types';

export const DIMENSIONS = [
  {
    slug: 'structure_flow',
    label: 'Structure & Flow',
    icon: 'Layers',
    description: 'Evaluation of overall layout, navigation clarity, and readable case study structures.',
  },
  {
    slug: 'visual_hierarchy',
    label: 'Visual Hierarchy',
    icon: 'Eye',
    description: 'Review of typography scale, padding/spacing, contrast, and layout balance.',
  },
  {
    slug: 'research_depth',
    label: 'Research Depth',
    icon: 'Search',
    description: 'Assessment of user research, problem framing, methodology, and designer-decision logic.',
  },
  {
    slug: 'business_impact',
    label: 'Business Impact',
    icon: 'TrendingUp',
    description: 'Look at metrics, user outcomes, and business value demonstrated in case studies.',
  },
  {
    slug: 'narrative_clarity',
    label: 'Narrative Clarity',
    icon: 'MessageSquare',
    description: 'Analysis of storytelling, case study flow, tone of voice, and readable writeups.',
  },
  {
    slug: 'technical_execution',
    label: 'Technical Execution',
    icon: 'Code',
    description: 'Assessment of responsive design, interactions, details, and frontend execution.',
  },
] as const;

export const GOALS: Record<GoalType, { label: string; description: string; icon: string }> = {
  get_hired: {
    label: 'Get Hired',
    description: 'Optimize for recruiters and hiring managers looking for product designers.',
    icon: 'Briefcase',
  },
  win_clients: {
    label: 'Win Freelance Clients',
    description: 'Focus on highlighting value proposition, testimonials, and clear call-to-actions.',
    icon: 'Users',
  },
};

export const FAQS = [
  {
    question: 'How does Vurdict evaluate my portfolio?',
    answer: 'Vurdict uses advanced AI to parse the content, structure, and layout of your online portfolio. It evaluates your work against industry-standard rubrics and 6 core dimensions that matter most to hiring managers.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. Vurdict provides stateless, instant portfolio feedback. Your analysis results are stored locally in your session or shared via a temporary link. No password or email sign-up required.',
  },
  {
    question: 'Is my portfolio data private?',
    answer: 'Absolutely. We only retrieve public data from your portfolio URL to perform the evaluation. We do not store your data long-term, and your results are completely private unless you choose to share them.',
  },
  {
    question: 'What formats are supported?',
    answer: 'We support any web-based portfolio URL, including custom domains, Notion portfolios, Framer, Webflow, Squarespace, Behance, and Dribbble. PDF files are not supported at this stage.',
  },
  {
    question: 'Can I re-analyze my portfolio after making changes?',
    answer: 'Yes! You can run unlimited evaluations. We encourage you to update your live portfolio based on the suggestions and run it through Vurdict again to see your score improve.',
  },
  {
    question: 'Does a high Vurdict score guarantee I\'ll get hired?',
    answer: 'No, and we\'d be wary of any tool that promised that. A high score means your portfolio effectively communicates the signals that correlate with hiring (clear problem statements, visible process, measurable outcomes). But hiring also depends on culture fit, interview performance, and market timing. Vurdict helps you remove the \'portfolio ambiguity\' variable from the equation so you can focus on everything else.',
  },
  {
    question: 'Why does Vurdict care about business impact when I\'m applying for a purely creative role?',
    answer: 'Even in roles centered on craft, hiring managers need to justify headcount to stakeholders. A portfolio that demonstrates business awareness (conversion lifts, user retention, shipped features) makes you a lower-risk hire. Vurdict flags this not because aesthetics don\'t matter, but because the designers who get offers almost always speak both languages: visual craft and business outcomes.',
  },
];
