export type GoalType = 'get_hired' | 'win_clients';
export type ExperienceLevel = 'junior' | 'mid' | 'senior';

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  location?: string; // e.g. "Case Study 1" or "Home Page"
}

export interface DimensionResult {
  score: number;
  label: string;
  status: 'Strong' | 'Good' | 'Needs Work' | 'Critical';
  explanation: string;
  whatsWorking: string[];
  whereToImprove: string[];
  evidence: EvidenceItem[];
  recommendation: {
    title: string;
    description: string;
    actionSteps: string[];
  };
}

export interface VurdictReport {
  id: string;
  portfolioUrl: string;
  goal: GoalType;
  experienceLevel: ExperienceLevel;
  analyzedAt: string;
  overallScore: number;
  hiringReadiness: 'High' | 'Medium' | 'Low';
  summary: string;
  topStrengths: string[];
  areasToImprove: string[];
  fixThisFirst: {
    title: string;
    description: string;
    stat: string;
    dimensionSlug: string;
  };
  dimensions: {
    structure_flow: DimensionResult;
    visual_hierarchy: DimensionResult;
    research_depth: DimensionResult;
    business_impact: DimensionResult;
    narrative_clarity: DimensionResult;
    technical_execution: DimensionResult;
  };
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'completed' | 'error';
  url: string;
  goal: GoalType;
  experienceLevel: ExperienceLevel;
  report: VurdictReport | null;
  error: string | null;
}
