import { VurdictReport } from './types';

export const MOCK_REPORT: VurdictReport = {
  id: 'rep_7f10b2a8d3e',
  portfolioUrl: 'alexdesign.co',
  goal: 'get_hired',
  experienceLevel: 'mid',
  analyzedAt: 'June 6, 2026 • 7:30 PM',
  overallScore: 82,
  hiringReadiness: 'High',
  summary: 'Alex shows impressive skills in visual craftsmanship and technical implementation. Case studies are well-structured with highly polished UI mockups. However, the portfolio would benefit from deeper articulation of initial problem framing and hard metrics demonstrating business impact.',
  topStrengths: [
    'Highly refined typography & layout structure',
    'Pixel-perfect high fidelity UI execution',
    'Responsive design and smooth interactions',
  ],
  areasToImprove: [
    'Lack of explicit business impact metrics',
    'Weak problem framing and initial user research detail',
    'Case study write-ups are slightly text-heavy',
  ],
  fixThisFirst: {
    title: 'Add Concrete Outcome Metrics to Case Studies',
    description: 'Highlight specific business and user results (e.g., Conversion increase, Task completion time reduction) rather than just concluding with mockups.',
    stat: 'Case studies showing quantifiable outcomes see a 3.4x higher shortlist rate from hiring managers.',
    dimensionSlug: 'business_impact',
  },
  priorityActionPlan: {
    critical_fixes: [
      { title: 'Add Quantifiable Business Metrics', description: 'Hiring managers need to see measurable outcomes. Add specific metrics (conversion rates, time savings, revenue impact) to your case studies.' },
      { title: 'Strengthen Problem Validation', description: 'Show evidence that the problem you solved was real and validated. Include user quotes, survey data, or analytics that drove your design decisions.' },
      { title: 'Improve Narrative Structure', description: 'Restructure case studies to follow a clear arc: Context → Problem → Process → Outcome. Lead with results to hook readers immediately.' },
    ],
    medium_priority: [
      { title: 'Enhance Visual Consistency', description: 'Standardize typography, spacing, and color usage across all case studies for a cohesive brand experience.' },
      { title: 'Add Process Artifacts', description: 'Include sketches, wireframes, and iteration documentation to demonstrate your thinking process.' },
      { title: 'Incorporate Social Proof', description: 'Add testimonials, client logos, or recognition badges to build credibility and trust with evaluators.' },
    ],
    nice_to_have: [
      { title: 'Add Interactive Prototypes', description: 'Embed clickable prototypes so evaluators can experience the interaction design firsthand.' },
      { title: 'Include a Personal Touch', description: 'Add a brief "Why I Design" section to humanize your portfolio.' },
      { title: 'Optimize for Mobile Viewing', description: 'Ensure case studies are fully readable on mobile devices.' },
    ],
  },
  dimensions: {
    structure_flow: {
      score: 88,
      label: 'Structure & Flow',
      status: 'Strong',
      explanation: 'Your portfolio uses an intuitive global navigation and clear case study layouts. Projects follow a logical structure from problem to solution, which makes scanning quick and easy for recruiters.',
      whatsWorking: [
        'Clear header navigation with explicit contact & work links.',
        'Logical project flow (Context → Problem → Process → Solution).',
        'Effective use of sticky sidebars for quick project scanning.',
      ],
      whereToImprove: [
        'Add a clear table of contents for longer case studies.',
        'Increase visual signposts between process sections.',
      ],
      evidence: [
        {
          id: 'sf_ev_1',
          title: 'Sticky Navigation Bar',
          description: 'Top-level header remains visible on scroll, letting recruiters navigate instantly.',
          location: 'Global Site Layout',
        },
        {
          id: 'sf_ev_2',
          title: 'Chronological Case Studies',
          description: 'Case studies follow a clear progression from design brief to deployment.',
          location: 'Project: Acme Redesign',
        },
      ],
      recommendation: {
        title: 'Introduce Sticky Section Progress Bars',
        description: 'Help readers understand how deep they are in a case study and easily skip between chapters.',
        actionSteps: [
          'Add a left/right sticky outline matching case study milestones (Research, Design, Output).',
          'Ensure outline items light up active as the user scrolls.',
          'Support click-to-jump on all chapter links.',
        ],
      },
    },
    visual_hierarchy: {
      score: 85,
      label: 'Visual Hierarchy',
      status: 'Strong',
      explanation: 'Excellent typography selection and layout pacing. Contrast ratios are highly compliant, and margins/paddings are systematically aligned, creating a premium presentation.',
      whatsWorking: [
        'Harmonious type scale using Inter font family.',
        'Consistent vertical grids and balanced column widths.',
        'Sufficient white space giving elements room to breathe.',
      ],
      whereToImprove: [
        'Some card grids on secondary pages feel slightly cramped.',
        'Improve text contrast on dark blue helper badges.',
      ],
      evidence: [
        {
          id: 'vh_ev_1',
          title: 'Clean Typography Scale',
          description: 'Headings, subheadings, and paragraphs show high visual separation.',
          location: 'Home Page Hero',
        },
        {
          id: 'vh_ev_2',
          title: 'Consistent Grid System',
          description: 'All work items align perfectly to a 12-column layout grid.',
          location: 'Portfolio Grid',
        },
      ],
      recommendation: {
        title: 'Optimize Section Padding and Card Spacing',
        description: 'Ensure a minimum of 48px padding between layout sections and increase grid card spacing.',
        actionSteps: [
          'Change gap-4 class in cards grid to gap-6 or gap-8.',
          'Review background badge colors to satisfy WCAG contrast ratio (4.5:1).',
          'Use responsive padding to give breathing room on tablet and mobile viewports.',
        ],
      },
    },
    research_depth: {
      score: 62,
      label: 'Research Depth',
      status: 'Needs Work',
      explanation: 'While your final designs look beautiful, the user research explanation is thin. You jump quickly from problem brief to UI sketch without explaining how user insights shaped your decisions.',
      whatsWorking: [
        'Mention of user personas and user journey maps.',
        'Clean layout representing research artifacts.',
      ],
      whereToImprove: [
        'Explain the "why" behind design decisions made during research.',
        'Clarify how many users were interviewed and what specific insights were extracted.',
        'Avoid default persona templates; show raw whiteboard sessions or synthesis maps.',
      ],
      evidence: [
        {
          id: 'rd_ev_1',
          title: 'Generic Persona Slides',
          description: 'User personas contain generic descriptions without research backing.',
          location: 'Project: Fintech Wallet',
        },
        {
          id: 'rd_ev_2',
          title: 'Missing Research Summary',
          description: 'No overview explaining user testing or interviews conducted prior to wireframing.',
          location: 'Project: Acme Redesign',
        },
      ],
      recommendation: {
        title: 'Document Your Research Synthesis & Decisions',
        description: 'Rather than showing polished cards, focus on showing the raw process of how research shaped the design requirements.',
        actionSteps: [
          'Add a "Research Synthesis" section detailing the top 3 user insights.',
          'Link each layout decision back to a specific research finding.',
          'Include real photos or screenshots of sticky note clustering or draft workflows.',
        ],
      },
    },
    business_impact: {
      score: 52,
      label: 'Business Impact',
      status: 'Critical',
      explanation: 'Your projects describe deliverables and mockups but fail to specify outcomes. Hiring managers want to see if your designs successfully solved business problems (e.g. signup conversion, retention, revenue).',
      whatsWorking: [
        'Clear list of project constraints and launch timelines.',
      ],
      whereToImprove: [
        'Provide quantifiable business metrics or user performance metrics.',
        'Explain the project success criteria established in the beginning.',
        'If data is NDA-protected, use percentages or comparative progress to show relative growth.',
      ],
      evidence: [
        {
          id: 'bi_ev_1',
          title: 'Output-focused Conclusions',
          description: 'Project ends on "Lessons Learned" rather than quantitative business impact.',
          location: 'Project: Acme Redesign',
        },
      ],
      recommendation: {
        title: 'Include Before/After Metric Callout Cards',
        description: 'Create high-impact UI elements specifically designed to highlight performance metrics.',
        actionSteps: [
          'Add a metric block to case study headers showing 2-3 key metrics (e.g., "+24% Conversion").',
          'Use percentages or ratio changes if absolute numbers are under NDA.',
          'Describe how you would measure success post-launch if the feature is not yet deployed.',
        ],
      },
    },
    narrative_clarity: {
      score: 72,
      label: 'Narrative Tone',
      status: 'Good',
      explanation: 'The tone is professional, clear, and writes with authority. However, some case studies suffer from dense text blocks. Shortening descriptions and adding descriptive subtitles will help keep attention.',
      whatsWorking: [
        'Authoritative and confident tone in the case study write-up.',
        'Strong introductory summaries explaining your role and timeline.',
      ],
      whereToImprove: [
        'Large, unbroken paragraphs of text make scrolling tedious.',
        'Add bold highlights to key terms for skimming.',
        'Make section subheadings summarize the outcome, not just the phase name.',
      ],
      evidence: [
        {
          id: 'nc_ev_1',
          title: 'Dense Paragraph Blocks',
          description: 'Case studies contain 4+ consecutive sentences in a single paragraph block.',
          location: 'Project: Fintech Wallet',
        },
      ],
      recommendation: {
        title: 'Refactor Write-ups into Scannable Storytelling',
        description: 'Edit your paragraphs down and lead with bold headers to make scanning fast and pleasant.',
        actionSteps: [
          'Ensure no paragraph exceeds 3 lines of text.',
          'Use "Action-oriented" headers (e.g., "Synthesizing 20 Interviews into 3 Key Themes" instead of "Research").',
          'Bold the first 2-3 words of key list items to direct reader attention.',
        ],
      },
    },
    technical_execution: {
      score: 82,
      label: 'Technical Execution',
      status: 'Good',
      explanation: 'The portfolio site runs fast and behaves well on most devices. The layouts translate cleanly across screen sizes, and interactions feel natural and snappy.',
      whatsWorking: [
        'Fast page load times and optimized assets.',
        'Responsive layout scaling down correctly to mobile widths.',
        'Accessible hover and active states on interactive elements.',
      ],
      whereToImprove: [
        'A few visual clipping issues on tablet viewports.',
        'Images are not lazy loaded, leading to minor lag on slow connections.',
      ],
      evidence: [
        {
          id: 'te_ev_1',
          title: 'Tablet Layout Clipping',
          description: 'Case study images overlap with text elements on viewports between 768px and 1024px.',
          location: 'Portfolio Grid',
        },
      ],
      recommendation: {
        title: 'Fix Responsive Breakpoints & Apply Lazy Loading',
        description: 'Resolve media queries for mid-sized viewports and optimize visual media assets.',
        actionSteps: [
          'Inspect layout at 800px width and fix grid-col configurations.',
          'Add HTML loading="lazy" attribute to all case study screenshots.',
          'Optimize large PNGs to WebP or SVG format to minimize payload size.',
        ],
      },
    },
  },
};

export const MOCK_REPORTS_BY_URL: Record<string, VurdictReport> = {
  'alexdesign.co': MOCK_REPORT,
  'default': {
    ...MOCK_REPORT,
    portfolioUrl: 'yourportfolio.com',
  }
};

export function getMockReport(url: string, goal: string, level: string): VurdictReport {
  const normalizedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  const base = MOCK_REPORTS_BY_URL[normalizedUrl] || MOCK_REPORTS_BY_URL['default'];
  
  return {
    ...base,
    portfolioUrl: url,
    goal: goal as any,
    experienceLevel: level as any,
    analyzedAt: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}
