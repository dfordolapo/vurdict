import React, { createContext, useState, useEffect, useContext } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const AnalysisContext = createContext(undefined);

// Helper to determine status label
export function getScoreStatus(score) {
  if (score >= 80) return 'Strong';
  if (score >= 70) return 'Good';
  if (score >= 55) return 'Needs Work';
  return 'Critical';
}

// Generate realistic fallback mock data matching the backend schema
export function getMockReport(url, goal) {
  const isGetHired = goal === 'get_hired';
  
  const categories = {
    problem_framing: {
      score: isGetHired ? 85 : 70,
      explanation: isGetHired 
        ? "The Hiring Manager's perspective: Good framing of user and product problems with clear, defined boundaries. However, more emphasis could be placed on the initial user discovery artifacts."
        : "The Client's perspective: The target client can understand what problems you solve, though the messaging feels slightly academic rather than value-driven."
    },
    process_visibility: {
      score: isGetHired ? 80 : 60,
      explanation: isGetHired
        ? "The Hiring Manager's perspective: Decisions are mapped out systematically. You've clearly shown sketches and mid-fi variations. Move from 8 to 10 by documenting why specific iterations failed."
        : "The Client's perspective: Process shows you are competent, but clients want a smoother, high-level summary. Condense complex journey maps into direct value steps."
    },
    outcome_impact: {
      score: isGetHired ? 55 : 65,
      explanation: isGetHired
        ? "The Hiring Manager's perspective: You only concluded with design deliverables. Recruiter feedback indicates a strong demand for quantitative results. Mention metric shifts, conversions, or usability success scores."
        : "The Client's perspective: Clients want to see how your design generated revenue, saved costs, or boosted key client metrics. Frame outcomes as business wins."
    },
    visual_quality: {
      score: isGetHired ? 75 : 85,
      explanation: isGetHired
        ? "The Hiring Manager's perspective: Typography and grid hierarchy are solid, but several responsive break-points show clipping on tablet viewport configurations."
        : "The Client's perspective: Visually stunning landing page. Sleek Linear-style dark mode aesthetics establish strong credibility and look extremely premium."
    },
    niche_positioning: {
      score: isGetHired ? 70 : 88,
      explanation: isGetHired
        ? "The Hiring Manager's perspective: Clear role definition as a Product Designer. You could specialize further by highlighting whether your focus is on SaaS complex systems, mobile-first design, or dev-handoff."
        : "The Client's perspective: Highly optimized. You clearly target startups seeking fractional design leadership, which will attract high-quality inbound inquiries."
    },
    trust_cta: {
      score: isGetHired ? 65 : 82,
      explanation: isGetHired
        ? "The Hiring Manager's perspective: Standard resume link is present. A direct 'Ready to chat?' calendar widget or a cleaner contact block would reduce friction for recruiter outreach."
        : "The Client's perspective: Excellent placement of contact options. Having a direct scheduling link and testimonial stubs creates strong immediate trust."
    }
  };

  const weights = isGetHired 
    ? { problem_framing: 0.25, process_visibility: 0.25, outcome_impact: 0.25, visual_quality: 0.1, niche_positioning: 0.1, trust_cta: 0.05 }
    : { problem_framing: 0.1, process_visibility: 0.1, outcome_impact: 0.1, visual_quality: 0.25, niche_positioning: 0.25, trust_cta: 0.2 };

  const overall_score = Math.round(
    Object.keys(categories).reduce((acc, key) => acc + (categories[key].score * (weights[key] || 1/6)), 0)
  );

  const fix_this_first = isGetHired ? {
    title: "Document Measurable Success Metrics",
    description: "Your 'Outcome & Impact' score is currently bottlenecking your hireability. Add specific business and user outcomes (e.g. conversion rates, task time reduction) to your fintech case study to increase shortlisting odds.",
    priority_score: 9
  } : {
    title: "Sharpen Client-Facing CTAs",
    description: "Make it easier for potential clients to hire you. Move from contact forms to a direct 'Book a 15min discovery call' calendar scheduler directly below your work grid.",
    priority_score: 8
  };

  return {
    overall_score,
    categories,
    fix_this_first,
    summary: isGetHired
      ? "Strong portfolio overall with clean layouts. The major blocker is outcomes: case studies lack quantitative metrics indicating how your designs improved business or usability goals. Documenting these will significantly increase interview conversions."
      : "Excellent premium presentation. You communicate a strong niche and make booking inquiries low-friction. Adding clear before/after business cases of previous engagements will further maximize contract close rates."
  };
}

export function AnalysisProvider({ children }) {
  const [state, setState] = useState({
    status: 'idle',
    url: '',
    goal: 'get_hired',
    report: null,
    error: null,
    isMock: false
  });

  // Load state on mount from sessionStorage
  useEffect(() => {
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

  const startAnalysis = async (url, goal, forceMock = false) => {
    updateState({
      status: 'analyzing',
      url,
      goal,
      report: null,
      error: null,
      isMock: forceMock
    });

    if (forceMock) {
      // Wait 4 seconds to show loading animation
      await new Promise(resolve => setTimeout(resolve, 4000));
      const mock = getMockReport(url, goal);
      updateState({
        status: 'completed',
        report: mock
      });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 seconds max timeout

      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, goal }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.evaluation) {
        updateState({
          status: 'completed',
          report: data.evaluation
        });
      } else {
        throw new Error("Invalid response schema from analysis server.");
      }
    } catch (err) {
      console.error('Analysis error:', err);
      let errMsg = err.message;
      if (err.name === 'AbortError') {
        errMsg = 'The request timed out because portfolio content extraction took too long.';
      }
      
      updateState({
        status: 'error',
        error: errMsg
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
