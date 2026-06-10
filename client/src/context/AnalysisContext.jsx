import React, { createContext, useState, useEffect, useContext } from 'react';

const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.port === '5173') {
      return 'http://localhost:3001';
    }
    return '';
  }
  return '';
};

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
  { min: 86, max: 100, label: 'Exceptional', description: 'Represents outstanding quality and differentiation.' },
  { min: 71, max: 85, label: 'Strong', description: 'Demonstrates strong execution and hiring readiness.' },
  { min: 51, max: 70, label: 'Competitive', description: 'Shows a solid foundation with room for improvement.' },
  { min: 31, max: 50, label: 'Early Foundation', description: 'Some fundamentals are present, but important gaps remain.' },
  { min: 0, max: 30, label: 'Significant Gaps', description: 'Major weaknesses were identified. Substantial improvements are needed.' },
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
        ? `The Hiring Manager's perspective (${expLabel} Calibration): Good framing of user and product problems with clear boundaries. ${experience === 'senior' ? 'For a Senior role, we need deeper business integration details.' : 'Foundation matches expectations.'}`
        : `The Client's perspective (${expLabel} Calibration): The target client can understand what problems you solve, though the messaging should focus more on business value.`
    },
    process_visibility: {
      score: experience === 'senior' ? 75 : experience === 'mid' ? 80 : 65,
      explanation: isGetHired
        ? `The Hiring Manager's perspective (${expLabel} Calibration): Decisions are mapped out systematically. ${experience === 'junior' ? 'Show why basic sketches were selected.' : 'Move to advanced level by documenting why specific iterations failed.'}`
        : `The Client's perspective (${expLabel} Calibration): Process shows you are competent, but clients want a smoother summary. Condense complex maps into value steps.`
    },
    outcome_impact: {
      score: experience === 'senior' ? 50 : experience === 'mid' ? 60 : 70,
      explanation: isGetHired
        ? `The Hiring Manager's perspective (${expLabel} Calibration): ${experience === 'senior' ? 'Senior standard requires quantitative business metrics. Mention metric shifts, conversions, or revenue.' : 'Add outcome metrics to support case study.'}`
        : `The Client's perspective (${expLabel} Calibration): Clients want to see how your design generated revenue or saved costs. Frame outcomes as business wins.`
    },
    visual_quality: {
      score: experience === 'senior' ? 88 : experience === 'mid' ? 82 : 75,
      explanation: isGetHired
        ? `The Hiring Manager's perspective (${expLabel} Calibration): Typography and grids are solid. ${experience === 'junior' ? 'Basic styling is clean but can be modernized.' : 'Adherence to spacing systems looks extremely premium.'}`
        : `The Client's perspective (${expLabel} Calibration): Visually stunning landing page. Sleek Linear-style dark mode aesthetics establish strong credibility.`
    },
    niche_positioning: {
      score: experience === 'senior' ? 85 : experience === 'mid' ? 75 : 65,
      explanation: isGetHired
        ? `The Hiring Manager's perspective (${expLabel} Calibration): Clear role definition as a Product Designer. ${experience === 'junior' ? 'Focus on founding your niche.' : 'Highlight SaaS, complex systems, or mobile-first design.'}`
        : `The Client's perspective (${expLabel} Calibration): Highly optimized. You clearly target startups seeking fractional leadership, which attracts quality inquiries.`
    },
    trust_cta: {
      score: experience === 'senior' ? 80 : experience === 'mid' ? 70 : 60,
      explanation: isGetHired
        ? `The Hiring Manager's perspective (${expLabel} Calibration): Resume link is present. ${experience === 'junior' ? 'Add a cleaner contact block.' : 'Recruiter response rate will increase with a direct scheduling widget.'}`
        : `The Client's perspective (${expLabel} Calibration): Excellent placement of contact options. Having a direct scheduling link and testimonial stubs creates immediate trust.`
    }
  };

  const weights = isGetHired 
    ? { problem_framing: 0.25, process_visibility: 0.25, outcome_impact: 0.25, visual_quality: 0.1, niche_positioning: 0.1, trust_cta: 0.05 }
    : { problem_framing: 0.1, process_visibility: 0.1, outcome_impact: 0.1, visual_quality: 0.25, niche_positioning: 0.25, trust_cta: 0.2 };

  const overall_score = Math.round(
    Object.keys(categories).reduce((acc, key) => acc + (categories[key].score * (weights[key] || 1/6)), 0)
  );

  const fix_this_first = isGetHired ? {
    title: experience === 'senior' ? "Validate Strategic Business Value" : "Document Measurable Success Metrics",
    description: experience === 'senior'
      ? "As a Senior candidate, your case study needs to prove strategic revenue and conversion impact. Detail the business parameters of your work."
      : "Your 'Outcome & Impact' score is currently bottlenecking your hireability. Add specific business and user outcomes (e.g. conversion rates, task time reduction) to your fintech case study to increase shortlisting odds.",
    priority_score: 9
  } : {
    title: "Sharpen Client-Facing CTAs",
    description: "Make it easier for potential clients to hire you. Move from contact forms to a direct 'Book a 15min discovery call' calendar scheduler directly below your work grid.",
    priority_score: 8
  };

  const priority_action_plan = {
    critical_fixes: [
      {
        title: isGetHired ? "Add Quantifiable Business Metrics" : "Add Clear Service Packages & Pricing",
        description: isGetHired
          ? "Hiring managers need to see measurable outcomes. Add specific metrics (conversion rates, time savings, revenue impact) to your case studies."
          : "Clients want to know what they're buying. Clearly outline your service tiers, deliverables, and pricing to reduce friction in the decision process."
      },
      {
        title: "Strengthen Problem Validation",
        description: "Show evidence that the problem you solved was real and validated. Include user quotes, survey data, or analytics that drove your design decisions."
      },
      {
        title: "Improve Narrative Structure",
        description: "Restructure case studies to follow a clear arc: Context → Problem → Process → Outcome. Lead with results to hook readers immediately."
      }
    ],
    medium_priority: [
      {
        title: "Enhance Visual Consistency",
        description: "Standardize typography, spacing, and color usage across all case studies for a cohesive brand experience."
      },
      {
        title: "Add Process Artifacts",
        description: "Include sketches, wireframes, and iteration documentation to demonstrate your thinking process, not just polished final outputs."
      },
      {
        title: "Incorporate Social Proof",
        description: "Add testimonials, client logos, or recognition badges to build credibility and trust with evaluators."
      }
    ],
    nice_to_have: [
      {
        title: "Add Interactive Prototypes",
        description: "Embed clickable prototypes (Figma, ProtoPie) so evaluators can experience the interaction design firsthand."
      },
      {
        title: "Include a Personal Touch",
        description: "Add a brief 'Why I Design' section to humanize your portfolio and create an emotional connection with readers."
      },
      {
        title: "Optimize for Mobile Viewing",
        description: "Ensure case studies are fully readable and visually appealing on mobile devices, where many initial screenings happen."
      }
    ]
  };

  return {
    overall_score,
    categories,
    fix_this_first,
    priority_action_plan,
    summary: isGetHired
      ? `Strong ${expLabel} case study overall. The major blocker is outcomes: case studies lack quantitative metrics indicating how your designs improved business or usability goals.`
      : `Excellent premium ${expLabel} presentation. You communicate a strong niche and make booking inquiries low-friction.`
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
        setState(JSON.parse(saved));
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
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 seconds max timeout

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

  return (
    <AnalysisContext.Provider value={{ state, startAnalysis, resetAnalysis, toggleMockFallback }}>
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
