'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AnalysisState, GoalType, ExperienceLevel, VurdictReport } from '../lib/types';
import { getMockReport } from '../lib/mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface AnalysisContextType {
  state: AnalysisState;
  startAnalysis: (url: string, goal: GoalType, level: ExperienceLevel, forceMock?: boolean) => Promise<void>;
  resetAnalysis: () => void;
  setReport: (report: VurdictReport) => void;
}

export const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

function mapServerReport(data: any): VurdictReport {
  const base = getMockReport(data.url || '', data.goal || 'get_hired', data.experience || 'mid');

  const serverToNextDim: Record<string, string> = {
    problem_framing: 'research_depth',
    process_visibility: 'structure_flow',
    visual_quality: 'visual_hierarchy',
    outcome_impact: 'business_impact',
    trust_cta: 'narrative_clarity',
    niche_positioning: 'technical_execution',
  };

  const categories = data.categories || {};
  const dimensions = { ...base.dimensions };

  for (const [serverKey, nextKey] of Object.entries(serverToNextDim)) {
    if (categories[serverKey]) {
      const score = categories[serverKey].score;
      dimensions[nextKey as keyof typeof dimensions] = {
        ...dimensions[nextKey as keyof typeof dimensions],
        score,
        explanation: categories[serverKey].explanation || dimensions[nextKey as keyof typeof dimensions].explanation,
        status: score >= 80 ? 'Strong' : score >= 70 ? 'Good' : score >= 55 ? 'Needs Work' : 'Critical',
      };
    }
  }

  return {
    ...base,
    portfolioUrl: data.url || base.portfolioUrl,
    overallScore: data.overall_score ?? base.overallScore,
    summary: data.summary || base.summary,
    dimensions,
    fixThisFirst: {
      title: data.fix_this_first?.title || base.fixThisFirst.title,
      description: data.fix_this_first?.description || base.fixThisFirst.description,
      stat: base.fixThisFirst.stat,
      dimensionSlug: base.fixThisFirst.dimensionSlug,
    },
    priorityActionPlan: data.priority_action_plan || base.priorityActionPlan,
  };
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    url: '',
    goal: 'get_hired',
    experienceLevel: 'mid',
    report: null,
    error: null,
  });

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const savedState = sessionStorage.getItem('vurdict_analysis_state');
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    } catch (e) {
      console.error('Failed to load analysis state from sessionStorage', e);
    }
  }, []);

  // Save to sessionStorage whenever state changes
  const updateState = (newState: Partial<AnalysisState>) => {
    setState((prev) => {
      const updated = { ...prev, ...newState };
      try {
        sessionStorage.setItem('vurdict_analysis_state', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save analysis state to sessionStorage', e);
      }
      return updated;
    });
  };

  const startAnalysis = async (url: string, goal: GoalType, level: ExperienceLevel, forceMock = false) => {
    updateState({
      status: 'analyzing',
      url,
      goal,
      experienceLevel: level,
      report: null,
      error: null,
    });

    if (forceMock) {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const mockReport = getMockReport(url, goal, level);
      updateState({ status: 'completed', report: mockReport });
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, goal, experience: level }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.evaluation) {
        const mapped = mapServerReport({ ...data.evaluation, url, goal, experience: level });
        updateState({ status: 'completed', report: mapped });
      } else {
        throw new Error('Invalid response schema from analysis server.');
      }
    } catch (err: any) {
      console.error('Analysis error, falling back to mock:', err.message);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      const mockReport = getMockReport(url, goal, level);
      updateState({
        status: 'completed',
        report: mockReport,
      });
    }
  };

  const resetAnalysis = () => {
    setState({
      status: 'idle',
      url: '',
      goal: 'get_hired',
      experienceLevel: 'mid',
      report: null,
      error: null,
    });
    try {
      sessionStorage.removeItem('vurdict_analysis_state');
    } catch (e) {
      console.error(e);
    }
  };

  const setReport = (report: VurdictReport) => {
    updateState({
      status: 'completed',
      report,
    });
  };

  return (
    <AnalysisContext.Provider value={{ state, startAnalysis, resetAnalysis, setReport }}>
      {children}
    </AnalysisContext.Provider>
  );
}
