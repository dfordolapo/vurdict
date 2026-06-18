import React, { createContext, useState, useEffect, useContext } from 'react';

const getApiUrl = () => import.meta.env.VITE_API_URL || '';

export const AnalysisContext = createContext(undefined);

// Helper to determine status label
export function getScoreStatus(score) {
  if (score >= 86) return 'Exceptional';
  if (score >= 71) return 'Strong';
  if (score >= 51) return 'Competitive';
  if (score >= 31) return 'Early Foundation';
  return 'Significant Gaps';
}

// Score band framework for interpretation
export const SCORE_BANDS = [
  { min: 86, max: 100, label: 'Exceptional', description: 'Represents outstanding quality and differentiation.', tooltip: 'Scores in this range indicate a portfolio that strongly signals high-level critical thinking, measurable business impact, and exceptional visual craft. Highly competitive for top-tier roles.' },
  { min: 71, max: 85, label: 'Strong', description: 'Demonstrates strong execution and hiring readiness.', tooltip: 'Scores in this range indicate a solid, hireable portfolio. It effectively communicates problem-solving and process, with only minor gaps in outcome metrics or niche positioning.' },
  { min: 51, max: 70, label: 'Competitive', description: 'Shows a solid foundation with room for improvement.', tooltip: 'Scores in this range suggest a good foundation but noticeable gaps. Often this means the case study describes the process well, but fails to prove business value with quantitative metrics.' },
  { min: 31, max: 50, label: 'Early Foundation', description: 'Some fundamentals are present, but important gaps remain.', tooltip: 'Scores in this range indicate significant missing signals. Evaluators may struggle to understand your specific role, the problem validation, or the final business outcomes.' },
  { min: 0, max: 30, label: 'Significant Gaps', description: 'Major weaknesses were identified. Substantial improvements are needed.', tooltip: 'Scores in this range are missing the core signals evaluators look for. Focus on completely restructuring the case study around a clear problem-to-outcome narrative.' },
];

export function getScoreBand(score) {
  return SCORE_BANDS.find(b => score >= b.min && score <= b.max) || SCORE_BANDS[4];
}

// Generate realistic fallback mock data matching the backend schema
export function getMockReport(url, goal, experience = 'junior') {
  const isGetHired = goal === 'get_hired';
  const expLabel = experience === 'senior' ? 'Senior' : experience === 'mid' ? 'Mid-Level' : 'Junior';
  
  const categories = {
    problem_framing: {
      score: experience === 'senior' ? 70 : experience === 'mid' ? 80 : 85,
      explanation: isGetHired 
        ? `Your case study includes a 'Problem Statement' section that identifies the user pain point — users were struggling to complete onboarding. However, the section does not cite any specific data (e.g., analytics drop-off rates, user interview quotes) that validates this problem as worth solving. From a hiring manager's perspective, this makes the problem framing feel assumed rather than researched, which reduces confidence in your user-centered thinking. Add a specific data point in the 'Problem Statement' section — for example, 'Only 34% of users completed onboarding in Q3 — our goal was to reach 70%' — to prove the problem was real and measurable.`
        : `Your case study mentions a general user problem with onboarding, but does not frame it in business terms that a client would care about. Clients want to know that you understand how design problems connect to revenue or retention. Rewrite the problem statement to include both the user pain point and the business impact, for example: 'Users were abandoning onboarding at step 3, causing a 40% drop in activation rates and an estimated $200K in lost annual revenue.'`
    },
    process_visibility: {
      score: experience === 'senior' ? 75 : experience === 'mid' ? 80 : 65,
      explanation: isGetHired
        ? `Your case study has a 'Process' section that lists the steps taken — research, ideation, prototyping — but it reads as a linear checklist rather than a genuine account of iteration and decision-making. For example, you mention creating wireframes but do not show what changed between the first and final version or why. From a hiring manager's perspective, this hides your critical thinking. Add a specific example of a design decision that changed based on feedback or testing, with a before/after comparison: 'After user testing, we moved the primary CTA from the bottom to the top of the page because 4 out of 5 test participants missed it entirely.'`
        : `The 'Process' section lists your workflow steps clearly, which shows competence. However, clients evaluating freelance designers care most about efficiency and results, not academic process detail. Condense the process into 3-4 key decision points and frame each as a trade-off you resolved: 'Chose a single-page layout over multi-step to reduce development time by 30%.' This positions you as a pragmatic problem-solver, which clients value highly.`
    },
    outcome_impact: {
      score: experience === 'senior' ? 50 : experience === 'mid' ? 60 : 70,
      explanation: isGetHired
        ? `${experience === 'senior' ? 'Your case study describes the final design but does not include any quantitative outcomes — no metrics, no test results, no business impact data. For a Senior-level role, this is the most critical gap. Hiring managers expect to see specific numbers that prove your design drove measurable results. Add at least 2-3 metrics such as conversion rate changes, task completion improvements, or time savings. For example: "After launch, checkout completion increased by 24% and support tickets related to payment errors dropped by 45%."' : 'Your case study mentions user feedback was positive but does not include any specific metrics. From a hiring manager\'s perspective, vague outcomes are nearly as concerning as no outcomes — they suggest the work was not measured. Add at least one concrete data point: a usability test metric, a before/after comparison, or even a "What I Would Measure" section if you do not have live data.'}`
        : `Your case study does not tie the outcome directly to business value. Freelance clients want to see a return on their investment, not just a beautiful design. Frame the outcome section around client-relevant metrics: time saved, revenue increased, or user satisfaction improved. For example: 'The redesigned onboarding flow reduced user errors by 60%, which saved the client an estimated 200 support hours per month.'`
    },
    visual_quality: {
      score: experience === 'senior' ? 88 : experience === 'mid' ? 82 : 75,
      explanation: isGetHired
        ? `${experience === 'junior' ? 'Your case study shows clean, well-structured screens with consistent spacing and a clear typographic hierarchy. The layouts are functional but use a basic color palette (blue + white) that lacks personality. From a hiring manager\'s perspective, the execution is solid for Junior level but does not yet signal the visual craft expected at higher levels. Introduce a more distinct visual identity — a unique accent color, bolder typography choices, or subtle micro-interactions — to elevate the perceived quality.' : 'Your case study demonstrates exceptional attention to typographic detail: consistent 8px grid spacing, a clear type scale, and well-balanced composition. The dark-mode screens feel premium and modern. From a hiring manager\'s perspective, this level of visual execution signals senior-level craft and confidence. One refinement: ensure your screenshots are displayed at high enough resolution that spacing details are clearly visible on Retina displays.'}`
        : `Your portfolio uses a sleek dark-mode theme with consistent spacing and modern typography — this immediately signals quality to potential clients. The visual presentation is strong enough to build trust quickly. To further elevate perceived value, add a brief annotation overlay on 1-2 key screenshots that calls out specific design decisions: '8px grid system applied throughout' or 'Accessible contrast ratio of 4.5:1 maintained on all text.' This positions you as a detail-oriented professional.`
    },
    niche_positioning: {
      score: experience === 'senior' ? 85 : experience === 'mid' ? 75 : 65,
      explanation: isGetHired
        ? `${experience === 'junior' ? 'Your portfolio identifies you as a Product Designer, but the case study does not communicate a specific area of focus or expertise. From a hiring manager\'s perspective, a generalist label without demonstrated depth makes it harder to distinguish you from other candidates. Add a clear positioning statement at the top of your case study: for example, "I specialize in designing B2B SaaS onboarding experiences for fintech companies." Then ensure the case study content reinforces this focus.' : 'Your case study clearly positions you as a Product Designer with a focus on complex B2B systems, and the project content aligns well with this positioning. From a hiring manager\'s perspective, this creates confidence that you have relevant depth. To strengthen further, add a short "Design Philosophy" statement that connects specialization to your approach: "I believe complex enterprise tools should feel as intuitive as consumer apps."'}`
        : `Your portfolio positions you clearly as a senior product designer with a focus on early-stage startups. This niche is well-defined and the case study content supports it. From a client's perspective, this focused positioning signals that you understand their specific needs. Strengthen this by adding a 1-sentence 'Ideal Client' statement: 'I partner with seed-stage B2B SaaS founders to design onboarding experiences that convert and retain users.'`
    },
    trust_cta: {
      score: experience === 'senior' ? 80 : experience === 'mid' ? 70 : 60,
      explanation: isGetHired
        ? `${experience === 'junior' ? "Your case study includes a link to your resume and LinkedIn profile, which is the minimum expected. However, there is no direct CTA for the reader to take the next step — such as scheduling a portfolio chat or viewing more work. From a hiring manager's perspective, a missing CTA creates a passive impression. Add a 'Next Steps' section: \"Interested in my work? I'd love to chat about your team's design needs.\" or \"View my full portfolio for more case studies.\"" : 'Your portfolio has a resume link and LinkedIn profile, which is good. For a Senior role, consider adding a direct scheduling link (Calendly, Cal.com) so hiring managers can book a conversation with you immediately. This eliminates friction in the recruiting process and signals confidence in your candidacy.'}`
        : `Your portfolio includes a contact form and LinkedIn link, but the CTA is passive ('Get in Touch'). For a freelance client, a passive CTA misses the opportunity to convert interest into action while the client's motivation is highest. Replace the generic CTA with a direct, low-friction action: 'Book a Free 15min Discovery Call' with a visible calendar link. Add 2-3 client logos or a testimonial quote above the CTA to reduce hesitation and build trust before the click.`
    }
  };

  const weights = isGetHired 
    ? { problem_framing: 0.25, process_visibility: 0.25, outcome_impact: 0.25, visual_quality: 0.1, niche_positioning: 0.1, trust_cta: 0.05 }
    : { problem_framing: 0.1, process_visibility: 0.1, outcome_impact: 0.1, visual_quality: 0.25, niche_positioning: 0.25, trust_cta: 0.2 };

  const overall_score = Math.round(
    Object.keys(categories).reduce((acc, key) => acc + (categories[key].score * (weights[key] || 1/6)), 0)
  );

  const fix_this_first = isGetHired ? {
    title: experience === 'senior' ? "Validate Strategic Business Value with Outcome Metrics" : "Add Measurable Success Metrics to Your Case Study",
    description: experience === 'senior'
      ? "Your case study walks through the process thoroughly, but the 'Results' section does not include any revenue, conversion, or efficiency metrics. For a Senior-level role, hiring managers expect to see quantified business outcomes that prove your design directly impacted the bottom line. Add 2-3 specific metrics (e.g., 'Checkout conversion increased by 18% after implementing the simplified flow') and state the measurement method (e.g., A/B test, pre/post analysis) to show you think in terms of business impact."
      : "Your case study describes what you designed but the 'Outcome' section lacks concrete numbers. Hiring managers need to see specific metrics — not just 'positive feedback.' Add at least one quantifiable result (e.g., 'Task completion time dropped from 4min to 1.5min in user testing', 'Form abandonment decreased by 30%') and state how it was measured. If you don't have live metrics, include usability test results or a 'What I Would Measure' section that shows you think in terms of impact.",
    priority_score: 9
  } : {
    title: "Add a Direct Booking CTA with Social Proof",
    description: "Your portfolio showcases strong visual work but the path to hiring you is unclear — the most prominent CTA is a generic 'Contact' link. Potential clients want to act immediately when they're impressed. Replace your contact button with a direct 'Book a Free 15min Discovery Call' calendar link (Calendly, Cal.com) and add 2-3 client testimonials or logos above it. This reduces friction from days to seconds and signals that you're actively taking clients.",
    priority_score: 8
  };

  const priority_action_plan = {
    critical_fixes: [
      {
        title: isGetHired ? "Add Quantifiable Business Metrics to Every Case Study" : "Add Clear Service Packages with Pricing",
        description: isGetHired
          ? "Your case study shows screenshots and describes the process, but there are no measurable outcomes. Without metrics, hiring managers cannot assess the real-world impact of your work. Add specific numbers to each case study: conversion rates, time savings, user satisfaction scores, or revenue impact. Even a single data point like 'Reduced onboarding time from 8min to 3min' dramatically increases credibility. If you don't have production metrics, include usability test results and state: 'Based on usability testing with 5 users, task success rate improved from 60% to 90%.'"
          : "Your portfolio showcases strong work but does not communicate what clients will actually get or how much it costs. This creates uncertainty that causes potential clients to hesitate. Add a clear 'Services & Pricing' section that outlines 2-3 service tiers (e.g., 'UX Audit — $2,500', 'Full Redesign — starting at $8,000') with brief descriptions of deliverables. Also add a direct scheduling link so clients can book a call immediately after reading your work."
      },
      {
        title: "Strengthen Problem Validation with User Evidence",
        description: "Your case study jumps quickly into the solution without showing how you validated the problem. Hiring managers and clients need to see evidence that the problem was real, not assumed. Add a 'Problem Validation' subsection that includes 1-2 direct user quotes from research, a data point from analytics (e.g., '70% of users dropped off at this step'), or a screenshot of a survey result. This proves your solution was grounded in real user needs, not just intuition."
      },
      {
        title: "Restructure Case Studies with a Clear Problem-to-Outcome Arc",
        description: "Your case study presents information but lacks a clear narrative structure that guides the reader from problem to outcome. Without this arc, evaluators struggle to follow your thinking. Restructure each case study to follow: Context (project type, timeline, team size) → Problem (user pain point, business goal) → Process (research, iterations, key decisions) → Outcome (metrics, impact, lessons learned). Use visible section headers so evaluators can quickly scan to the parts most relevant to them."
      }
    ],
    medium_priority: [
      {
        title: "Enhance Visual Consistency Across Case Studies",
        description: "Your case studies use inconsistent typography, spacing, and color palettes, which makes the portfolio feel disjointed. A cohesive visual system signals professionalism and attention to detail. Create a simple design system for your portfolio: define 2 heading sizes, 1 body font, a consistent 24px grid, and a 3-color palette. Apply it uniformly across all case studies so the portfolio reads as a single, polished product."
      },
      {
        title: "Show Iteration Artifacts — Not Just Final Designs",
        description: "Your case study shows only polished final mockups, which hides your design thinking process. Hiring managers want to see how you arrived at the solution, not just what the solution looks like. Add 2-3 process artifacts: a sketch photo, a wireframe iteration showing a different layout you considered and rejected, or a screenshot of a usability test finding that changed your direction. Label each artifact with a brief caption explaining why it matters."
      },
      {
        title: "Add Social Proof and Credibility Signals",
        description: "Your portfolio does not include testimonials, client logos, or recognition badges, which reduces trust. Evaluators want to see proof that others have valued your work. Add a 'Press & Recognition' section with logos of companies you've worked with, 1-2 client testimonials with names and titles, and any awards or publications. Position this near your CTA to reduce the perceived risk of hiring or advancing you."
      }
    ],
    nice_to_have: [
      {
        title: "Embed Interactive Prototypes for Key Flows",
        description: "Static screenshots require evaluators to imagine the interaction. Adding clickable prototypes lets them experience the design firsthand, which is far more compelling. Embed Figma or ProtoPie prototypes for 1-2 key user flows in your case study. Even a simple 3-screen flow demonstrating the main interaction pattern will help evaluators understand the quality of your interaction design."
      },
      {
        title: "Add a Personal 'Why I Design' Section",
        description: "Your portfolio presents the work but does not introduce the person behind it. A brief personal section creates an emotional connection that makes evaluators remember you. Add 2-3 sentences at the end of your case study about what drives your design philosophy — for example, 'I'm passionate about simplifying complex financial tools because I believe everyone deserves access to clear financial information.'"
      },
      {
        title: "Optimize the Portfolio for Mobile Viewing",
        description: "Many initial portfolio screenings happen on mobile devices (recruiters checking links during commute). If your case study images or layouts break on small screens, you risk being dismissed. Test every case study page on a 375px-wide viewport. Ensure text is readable without zooming, images scale properly, and interactive elements are tappable with sufficient touch targets."
      }
    ]
  };

  return {
    overall_score,
    categories,
    fix_this_first,
    priority_action_plan,
    scratchpad: `## Step 1 — Content Inventory

The case study was scanned for distinct sections and design artifacts. Here is what was found and what is missing.

**Sections detected:**
- Problem Statement — clearly stated at the beginning of the case study
- User Research — mentions research activity but lacks depth
- Wireframes — included as visual artifacts showing early-stage thinking
- Visual Design — final mockups presented with attention to typography and layout
- Results — outcomes mentioned but only in qualitative terms

**Sections missing:**
- User Flows — not present; would strengthen process visibility
- Interview Results — no synthesized findings from user research
- Iteration Docs — no evidence of design iteration based on testing or feedback

## Step 2 — Evidence Extraction

Each detected section was examined for specific quotes, data points, and project details that could inform scoring.

- Problem Statement: "Users were struggling to complete the onboarding flow within the first session." This establishes a clear design challenge but is not backed by baseline metrics.
- User Research: "Conducted 5 user interviews to understand pain points." Interviews are mentioned but no verbatim quotes, themes, or prioritization frameworks are presented.
- Visual Design: Final mockups show clean typography, consistent spacing, and a modern sans-serif approach. No accessibility annotations or responsive breakpoints are demonstrated.
- Results: "The new design received positive feedback from stakeholders and users." This is purely qualitative — no conversion rates, time savings, or satisfaction scores are provided.

This evidence suggests the designer understands what to include in a case study but has not yet mastered the art of proving impact with data.

## Step 3 — Dimension Mapping

Each of the 6 evaluation dimensions was scored based on the evidence (or lack thereof) extracted in Step 2.

- **problem_framing** → 65: Problem is stated but not validated with user data or market research. The framing is speculative rather than evidence-driven.
- **process_visibility** → 72: Wireframes are present, showing early ideation. However, no user flows, iteration cycles, or testing loops are documented.
- **outcome_impact** → ${experience === 'senior' ? 50 : 60}: No quantitative outcomes are reported. At ${experience} level, hiring managers expect at least directional metrics.
- **visual_quality** → ${experience === 'senior' ? 88 : 80}: Strong typography and layout discipline. Lacks accessibility annotations and responsive edge-case polish.
- **niche_positioning** → ${experience === 'senior' ? 85 : 70}: Work samples show competence but no clear specialization signal. Unclear what type of designer this person is beyond "product designer."
- **trust_cta** → ${experience === 'senior' ? 80 : 65}: Resume and contact are accessible. No direct call to action or project-specific next step for the reader.

## Step 4 — Scoring Rationale

${experience === 'senior'
  ? 'Senior calibration was applied, which raises the bar on outcome metrics and strategic positioning. The overall score is weighted toward process_visibility and problem_framing, as these are the dimensions most critical for a get_hired goal. The lack of quantitative outcomes and unclear specialization prevent this portfolio from scoring higher, despite solid visual execution.'
  : experience === 'mid'
  ? 'Mid-level calibration was applied, with balanced weight across all dimensions. The portfolio shows solid process awareness and clean execution. Leniency was given on outcome metrics, but the absence of any quantified impact prevents the score from crossing into the top band.'
  : 'Junior calibration was applied, with the highest weight on process visibility and visual quality. Outcome expectations were intentionally lowered. The portfolio demonstrates a strong foundation — the primary gap is translating process knowledge into measurable results.'
}`,
    summary: isGetHired
      ? `This case study demonstrates solid design execution and clear process documentation, which meet baseline expectations for a ${expLabel} role. However, the critical gap is in measurable outcomes — the case study describes what was done but does not provide specific metrics (conversion rates, time savings, satisfaction scores) that prove the design had real-world impact. The top priority is adding quantitative results to every case study, starting with the project that has the most accessible data. Once outcomes are documented, the portfolio will move from 'shows competence' to 'proves impact.'`
      : `This portfolio presents a polished, visually cohesive brand that immediately signals quality to potential clients. The niche positioning is clear and the work samples are strong. The main bottleneck is the path from browsing to booking — there is no direct scheduling link and no pricing transparency, which creates hesitation at the critical conversion moment. Adding a direct calendar link and clear service tiers will transform passive interest into active client inquiries.`
  };
}

export function AnalysisProvider({ children }) {
  const [state, setState] = useState({
    status: 'idle',
    url: '',
    goal: 'get_hired',
    experience: 'junior',
    report: null,
    error: null,
    errorCode: null,
    isMock: false
  });

  // Load state on mount (from share query param or sessionStorage)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shareData = params.get('share');
      if (shareData) {
        // Safe Base64 decoding (supporting UTF-8 characters)
        const binString = atob(shareData);
        const bytes = new Uint8Array(binString.length);
        for (let i = 0; i < binString.length; i++) {
          bytes[i] = binString.charCodeAt(i);
        }
        const jsonString = new TextDecoder().decode(bytes);
        const decoded = JSON.parse(jsonString);

        updateState({
          status: 'completed',
          url: decoded.url || 'yourportfolio.com',
          goal: decoded.goal || 'get_hired',
          experience: decoded.experience || 'junior',
          report: decoded.report,
          error: null,
          errorCode: null,
          isMock: decoded.isMock || false
        });
        return;
      }
    } catch (e) {
      console.error('Failed to parse share data from URL:', e);
    }

    try {
      const saved = sessionStorage.getItem('vurdict_analysis');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Backfill priority_action_plan for reports cached before the feature was added
        if (parsed.report && !parsed.report.priority_action_plan) {
          parsed.report.priority_action_plan = {
            critical_fixes: [
              { title: 'Add Quantifiable Business Metrics', description: 'Your case study describes the work but does not include any measurable outcomes. Without metrics, hiring managers cannot assess real-world impact. Add specific numbers — conversion rates, time savings, satisfaction scores — to every case study. Even a single data point dramatically increases credibility.' },
              { title: 'Strengthen Problem Validation with Data', description: 'Your case study jumps into the solution without showing how you validated the problem. Add a "Problem Validation" subsection with user quotes, analytics data, or survey results that prove the problem was real. This grounds your solution in evidence rather than intuition.' },
              { title: 'Improve Narrative Structure with Clear Section Headers', description: 'Your case study lacks a clear narrative arc from problem to outcome. Restructure it to follow: Context → Problem → Process → Outcome → Impact. Use visible section headers so evaluators can quickly scan to the parts most relevant to them.' }
            ],
            medium_priority: [
              { title: 'Enhance Visual Consistency', description: 'Your case studies use inconsistent typography, spacing, and color palettes. A cohesive visual system signals professionalism. Define a simple design system with consistent heading sizes, body font, grid spacing, and a 3-color palette applied across all studies.' },
              { title: 'Show Iteration Artifacts', description: 'Your case study shows only polished final mockups. Add 2-3 process artifacts — sketches, wireframe iterations, usability test findings — with brief captions explaining why each matters. This reveals your design thinking process.' },
              { title: 'Incorporate Social Proof', description: 'Your portfolio lacks testimonials, client logos, or recognition badges. Add a "Press & Recognition" section with 1-2 client testimonials and company logos near your CTA to reduce perceived risk for evaluators.' }
            ],
            nice_to_have: [
              { title: 'Add Interactive Prototypes', description: 'Static screenshots require evaluators to imagine interactions. Embed a Figma or ProtoPie prototype for a key user flow to let them experience the design firsthand. Even a simple 3-screen flow is compelling.' },
              { title: 'Include a Personal Touch', description: 'Add a brief "Why I Design" section that shares your design philosophy. This creates an emotional connection and makes evaluators remember you.' },
              { title: 'Optimize for Mobile Viewing', description: 'Many screenings happen on mobile. Test every case study on a 375px viewport. Ensure text is readable, images scale, and touch targets are large enough.' }
            ]
          };
        }
        setState(parsed);
      }
    } catch (e) {
      console.error('Failed to load session state', e);
    }
  }, []);

  const updateState = (updates) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      try {
        sessionStorage.setItem('vurdict_analysis', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save session state', e);
      }
      return next;
    });
  };

  const startAnalysis = async (url, goal, experience = 'junior', forceMock = false) => {
    updateState({
      status: 'analyzing',
      url,
      goal,
      experience,
      report: null,
      error: null,
      errorCode: null,
      isMock: forceMock
    });

    if (forceMock) {
      // Wait 4 seconds to show loading animation
      await new Promise(resolve => setTimeout(resolve, 4000));
      const mock = getMockReport(url, goal, experience);
      updateState({
        status: 'completed',
        report: mock
      });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds max timeout — thorough extraction + analysis

      const apiEndpoint = `${getApiUrl()}/api/analyze`;
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, goal, experience }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errObj = new Error(data.error || 'Something went wrong while analyzing this portfolio. Please try again.');
        errObj.code = data.code || 'UNEXPECTED_FAILURE';
        throw errObj;
      }

      const data = await response.json();
      if (data.success && data.evaluation) {
        updateState({
          status: 'completed',
          report: data.evaluation
        });
      } else {
        const errObj = new Error("Something went wrong while analyzing this portfolio. Please try again.");
        errObj.code = 'UNEXPECTED_FAILURE';
        throw errObj;
      }
    } catch (err) {
      console.error('Analysis error:', err);
      let errMsg = err.message;
      let errCode = err.code || 'UNEXPECTED_FAILURE';
      if (err.name === 'AbortError') {
        errMsg = 'This portfolio took too long to analyze. Please try again.';
        errCode = 'TIMEOUT';
      }
      
      updateState({
        status: 'error',
        error: errMsg,
        errorCode: errCode
      });
    }
  };

  const resetAnalysis = () => {
    updateState({
      status: 'idle',
      url: '',
      goal: 'get_hired',
      report: null,
      error: null,
      errorCode: null,
      isMock: false
    });
    try {
      sessionStorage.removeItem('vurdict_analysis');
    } catch (e) {}
  };

  const toggleMockFallback = () => {
    const mock = getMockReport(state.url || 'yourportfolio.com', state.goal);
    updateState({
      status: 'completed',
      report: mock,
      error: null,
      errorCode: null,
      isMock: true
    });
  };

  const restoreFromHistory = (entry) => {
    updateState({
      status: 'completed',
      url: entry.url,
      goal: entry.goal,
      experience: entry.experience,
      report: entry.report,
      error: null,
      errorCode: null,
      isMock: entry.isMock || false
    });
  };

  return (
    <AnalysisContext.Provider value={{ state, startAnalysis, resetAnalysis, toggleMockFallback, restoreFromHistory }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
